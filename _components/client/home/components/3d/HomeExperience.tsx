"use client";

import React, { RefObject } from "react";
import { Center } from "@react-three/drei";
import Gear from "@/public/3d/home/gear/Gear";
import LightBulb from "@/public/3d/home/light-bulb/LightBulb";
import QuantumCube from "@/public/3d/home/pearl-box/QuantumCube";
import RocketShip from "@/public/3d/home/rocket-ship/RocketShip";
import { ModelWrapper } from "./ModelWrapper";
import * as THREE from "three";
import { useThree } from "@react-three/fiber";

/**
 * Props for the HomeExperience 3D scene component
 */
export interface HomeExperienceProps {
    /** Current item displayed (determines which model is active) */
    itemDisplayed: "sphere" | "gear" | "light-bulb" | "rocket-ship";

    /** Used to control visibility state after dissolve animations complete */
    visibleItem: "sphere" | "gear" | "light-bulb" | "rocket-ship";

    /** Callback fired when the model finishes its dissolve out transition */
    onFadeOut: () => void;

    /** Ref to the cube group (optional; for parent access to manipulation) */
    cubeRef?: RefObject<THREE.Group|null>;

    /** Function to update the displayed item */
    setItemDisplayed: (item: HomeExperienceProps["itemDisplayed"]) => void;
}

/**
 * HomeExperience
 *
 * Renders a 3D Centered scene for the homepage with animated models.
 * Components include a central QuantumCube and conditional child models
 * such as RocketShip, LightBulb, and Gear.
 */
const HomeExperience: React.FC<HomeExperienceProps> = ({
    itemDisplayed,
    visibleItem,
    onFadeOut,
    cubeRef,
    setItemDisplayed,
}) => {
    
        const viewport = useThree((state)=>state.viewport);
        const cubeScalingFactor = Math.min(Math.max(window.innerWidth / 1920,0.5), 1.2);


        const cubePositionFactor = viewport.width / 1920;;

        const isMobile = window.innerWidth < 768;
        
    return (
        <Center position={[7*cubePositionFactor, isMobile?5:0, -12]}>
            <group scale={cubeScalingFactor} ref={cubeRef}>
                <ModelWrapper
                    itemDisplayed={itemDisplayed}
                    setItemDisplayed={setItemDisplayed}
                >
                    <QuantumCube
                        z={visibleItem === "sphere"}
                        onFadeOut={onFadeOut}
                        props={{ position: [0, 0, -35] }}
                    >
                        <RocketShip
                        position={[-2, 0, 0]}

                            visible={visibleItem === "rocket-ship"}
                            scale={0.03}
                            disolveVisible={visibleItem === "rocket-ship"}
                            onFadeOut={onFadeOut}
                        />
                        <LightBulb
                        position={[0, 3, 0]}
                            visible={visibleItem === "light-bulb"}
                            scale={1.5}
                            dissolveVisible={visibleItem === "light-bulb"}
                            onFadeOut={onFadeOut}
                        />
                        <Gear
                        position={[2, 5, 0]}

                            visible={visibleItem === "gear"}
                            scale={0.02}
                            disolveVisible={visibleItem === "gear"}
                            onFadeOut={onFadeOut}
                        />
                    </QuantumCube>
                </ModelWrapper>
            </group>
        </Center>
    );
};

export default HomeExperience;
