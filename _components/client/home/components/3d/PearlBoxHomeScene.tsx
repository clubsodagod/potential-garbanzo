import QuantumCube from '@/public/3d/home/pearl-box/QuantumCube'
import { Center, ScrollControls } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import { KernelSize } from 'postprocessing'
import { useRef } from 'react'
import * as THREE from "three"
import { ModelWrapper } from './ModelWrapper'

export default function SceneWrapper() {
    const cubeRef = useRef<THREE.Group>(null);



    return (
        <Canvas>
            <ambientLight intensity={0.3} />
            <pointLight position={[10, 10, 10]} intensity={2} />
            <Center position={[7, 0, -12]}>
                <group ref={cubeRef}>
                    <ModelWrapper>
                        <QuantumCube position={[0, 0, -35]} />
                    </ModelWrapper>

                </group>
            </Center>
            <EffectComposer>
                <Bloom
                    luminanceThreshold={0.2}
                    luminanceSmoothing={0.25}
                    intensity={0.15}
                    kernelSize={KernelSize.LARGE}
                />
            </EffectComposer>
        </Canvas>
    );
}
