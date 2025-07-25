"use client"

import React, { useEffect, useRef } from 'react';

import { useAnimations, useGLTF } from "@react-three/drei";
import { Group } from "three";

useGLTF.preload("/3d/home/pearl-box/quantum_cube.glb");

const PearlBoxModel = ({ }) => {

    const group = useRef<Group>(null);
    const { nodes, materials, animations, scene } = useGLTF("/3d/home/pearl-box/quantum_cube.glb");
    const { actions, clips } = useAnimations(animations, scene)

    useEffect(()=> {
        actions["animate"]?.play
    })

    return (
        <group ref={group}>
            <primitive object={scene} materials={materials}  />
        </group>
    )
}



export default PearlBoxModel;