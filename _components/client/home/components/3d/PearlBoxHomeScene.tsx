import { Environment, } from '@react-three/drei'
import { Canvas, } from '@react-three/fiber'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import { KernelSize } from 'postprocessing'
import { useRef, useState } from 'react'
import * as THREE from "three"
import HomeExperience from './HomeExperience'




export default function SceneWrapper() {
    const cubeRef = useRef<THREE.Group|null>(null);
const [itemDisplayed, setItemDisplayed] = useState<'sphere' | 'gear' | 'light-bulb' | 'rocket-ship'>('sphere');



    const [visibleItem, setVisibleItem] = useState(itemDisplayed);
    const onFadeOut = () => setVisibleItem(itemDisplayed);


    return (
        <Canvas>
            <Environment preset="studio" />
            <pointLight position={[10, 10, 10]} intensity={2} />
  
            <HomeExperience itemDisplayed={itemDisplayed} visibleItem={visibleItem} onFadeOut={onFadeOut} setItemDisplayed={setItemDisplayed} cubeRef={cubeRef}           
            />
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
