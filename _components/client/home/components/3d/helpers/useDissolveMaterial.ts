// /components/helpers/useDissolveMaterial.ts
import * as THREE from 'three';
import { useMemo } from 'react';
import { injectDissolveShader } from '@/_library/shaders/dissolve-shader';

/**
 * Returns a base material ready for use in the dissolve shader.
 */
export function useDissolveBaseMaterial(): THREE.MeshStandardMaterial {
    return useMemo(() => {
        const mat = new THREE.MeshStandardMaterial({
            color: 'white',
            metalness: 1,
            roughness: 0,
        });
        mat.transparent = true;
        return mat;
    }, []);
}



export function useDissolveMaterial(baseColor: THREE.ColorRepresentation = '#ffffff') {
    const material = useMemo(() => {
        const mat = new THREE.MeshStandardMaterial({ color: baseColor });
        injectDissolveShader(mat);
        return mat;
    }, [baseColor]);

    return material;
}
