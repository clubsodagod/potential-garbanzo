import QuantumCube from '@/public/3d/home/pearl-box/QuantumCube'
import { Center, Environment, ScrollControls } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import { KernelSize } from 'postprocessing'
import { useEffect, useRef, useState } from 'react'
import * as THREE from "three"
import { ModelWrapper } from './ModelWrapper'

import { useControls } from "leva";
import { DissolveMaterial } from './DissolveMaterial'
import RocketShip from '@/public/3d/home/rocket-ship/RocketShip'
import LightBulb from '@/public/3d/home/light-bulb/LightBulb'
import Gear from '@/public/3d/home/gear/Gear'




export default function SceneWrapper() {
    const cubeRef = useRef<THREE.Group>(null);
const [itemDisplayed, setItemDisplayed] = useState<'sphere' | 'gear' | 'light-bulb' | 'rocket-ship'>('sphere');



    const [visibleItem, setVisibleItem] = useState(itemDisplayed);
    const onFadeOut = () => setVisibleItem(itemDisplayed);



    return (
        <Canvas>
            <Environment preset="studio" />
            {/* <pointLight position={[10, 10, 10]} intensity={2} /> */}
            <Center position={[7, 0, -12]}>
                <group ref={cubeRef}>
                    <ModelWrapper itemDisplayed={itemDisplayed} setItemDisplayed={setItemDisplayed}>
                        <QuantumCube  z={visibleItem === "sphere"} onFadeOut={onFadeOut} props={{
                            position: [0, 0, -35],
                            
                        }}>
                            
                            
                                <RocketShip
                                visible={visibleItem === "rocket-ship"}
                                    scale={0.03}
                                    disolveVisible={visibleItem === "rocket-ship"}
                                    onFadeOut={onFadeOut}
                                />
                                <LightBulb
                                visible={visibleItem === "light-bulb"}
                                    scale={1.5}
                                    dissolveVisible={visibleItem === "light-bulb"}
                                    onFadeOut={onFadeOut}
                                />
                                <Gear
                                visible={visibleItem === "gear"}
                                    scale={0.02}
                                    disolveVisible={visibleItem === "gear"}
                                    onFadeOut={onFadeOut}
                                />

                        </QuantumCube>
                    </ModelWrapper>

                </group>
            </Center>
            <EffectComposer>
                <Bloom
                    luminanceThreshold={0.2}
                    luminanceSmoothing={0.25}
                    intensity={0.1}
                    kernelSize={KernelSize.LARGE}
                />
            </EffectComposer>
        </Canvas>
    );
}
