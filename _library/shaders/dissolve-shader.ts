
import * as THREE from "three"

export const injectDissolveShader = (material: THREE.ShaderMaterial | THREE.MeshStandardMaterial) => {
  material.transparent = true;
  material.onBeforeCompile = (shader) => {
    shader.uniforms.uProgress = { value: 0 };
    shader.uniforms.uEdge = { value: 0.1 };
    shader.uniforms.uEdgeColor = { value: new THREE.Color('#eb5a13') };
    shader.uniforms.uNoiseFreq = { value: 3.0 };

    shader.fragmentShader = `
      // Simplex noise function (copy/paste glsl or import with glslify)
      // cnoise() definition goes here...
      ${shader.fragmentShader}
    `;

    shader.fragmentShader = shader.fragmentShader.replace(
      '#include <dithering_fragment>',
      `
        float noiseVal = cnoise(vPosition * uNoiseFreq);

        if (noiseVal < uProgress) discard;

        float edgeThreshold = uProgress + uEdge;
        if (noiseVal < edgeThreshold) {
          gl_FragColor = vec4(uEdgeColor, 1.0);
        }

        #include <dithering_fragment>
      `
    );
  };
  material.needsUpdate = true;
};
