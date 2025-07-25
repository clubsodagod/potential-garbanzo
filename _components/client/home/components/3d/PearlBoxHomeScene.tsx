import QuantumCube from '@/public/3d/home/pearl-box/QuantumCube'
import { Center, Text3D } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import { KernelSize } from 'postprocessing'

export default function SceneWrapper() {
    const fontUrl: string = "/fonts/MuseoModerno_Regular.json"
    return (
        <Canvas>
            <ambientLight intensity={0.3} />
            <pointLight position={[10, 10, 10]} intensity={2} />
            <Center position={[7,0,-12]}>
             
                <QuantumCube position={[25, 0, -35]} />
            </Center>

            <EffectComposer>
                <Bloom
                    luminanceThreshold={0.2}
                    luminanceSmoothing={0.025}
                    intensity={0.25}
                    kernelSize={KernelSize.LARGE}
                />
            </EffectComposer>
        </Canvas>
    )
}
