import { patchShaders } from "@/_utility/helpers/patch-shader.-helper";
import { useFrame } from "@react-three/fiber";
import { easing } from "maath";
import * as React from "react";
import * as THREE from "three";
import CSM from "three-custom-shader-material";

interface DissolveMaterialProps {
    baseMaterial: THREE.Material;
    thickness?: number;
    color?: string;
    intensity?: number;
    duration?: number;
    visible?: boolean;
    onFadeOut?: () => void;
}

const vertexShader = /* glsl */ `
  varying vec2 vUv;
  varying vec3 vPosition;
  void main() {
    vUv = uv;
    vPosition = position;
  }
`;

const fragmentShader = patchShaders(/* glsl */ `
  varying vec2 vUv;
  varying vec3 vPosition;
  uniform float uThickness;
  uniform vec3 uColor;
  uniform float uProgress;
  
  
  void main() {
    gln_tFBMOpts opts = gln_tFBMOpts(1.0, 0.3, 2.0, 5.0, 1.0, 5, false, false);
    // float noise = gln_sfbm(vUv, opts); // THE ORIGINAL CODE FROM THE TUTORIAL
    float noise = gln_sfbm(vPosition, opts); //  use the world position instead of the uv for a better effect working on all objects
    noise = gln_normalize(noise);

    float progress = uProgress;

    float alpha = step(1.0 - progress, noise);
    float border = step((1.0 - progress) - uThickness, noise) - alpha;
    
    csm_DiffuseColor.a = alpha + border;
    csm_DiffuseColor.rgb = mix(csm_DiffuseColor.rgb, uColor, border);
  }`, [], []);


/**
 * DissolveMaterial - Applies a dissolve shader to any mesh using a base material.
 */
export function DissolveMaterial({
    baseMaterial,
    thickness = 0.1,
    color = "#eb5a13",
    intensity = 50,
    duration = 1.2,
    visible = true,
    onFadeOut,
}: DissolveMaterialProps): React.ReactElement | null {

    const uniforms = React.useRef({
        uThickness: { value: thickness },
        uColor: { value: new THREE.Color(color).multiplyScalar(intensity) },
        uProgress: { value: 0 },
    });

    React.useEffect(() => {
        uniforms.current.uThickness.value = thickness;
        uniforms.current.uColor.value.set(color).multiplyScalar(intensity);
    }, [thickness, color, intensity]);

    // React.useEffect(() => {
    //     const patched = patchShaders(rawFragmentShader);
    //     setFragmentShader(patched);
    // }, []);

    useFrame((_state, delta) => {
        easing.damp(
            uniforms.current.uProgress,
            "value",
            visible ? 1 : 0,
            duration,
            delta
        );

        if (uniforms.current.uProgress.value < 0.1 && onFadeOut) {
            onFadeOut();
        }
    });

    if (!fragmentShader) return null;

    return (
        <CSM
            baseMaterial={baseMaterial}
            vertexShader={vertexShader}
            fragmentShader={fragmentShader}
            uniforms={uniforms.current}
            toneMapped={false}
            transparent
        />
    );
}
