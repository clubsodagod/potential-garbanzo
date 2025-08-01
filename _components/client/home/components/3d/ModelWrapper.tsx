"use client";

import { useFrame } from "@react-three/fiber";
import { useRef, useEffect, useState } from "react";
import * as THREE from "three";

interface ModelWrapperProps {
    children: React.ReactNode;
    itemDisplayed: string;
    setItemDisplayed: (val: 'sphere' | 'gear' | 'light-bulb' | 'rocket-ship') => void;
}


export const ModelWrapper: React.FC<ModelWrapperProps> = ({ children, itemDisplayed, setItemDisplayed }) => {
    const ref = useRef<THREE.Group>(null);
    const [scrollProgress, setScrollProgress] = useState(0); // 0 to 1

    useEffect(() => {
        const onScroll = () => {
            const scrollTop = window.scrollY;
            const docHeight = document.body.scrollHeight - window.innerHeight;
            const progress = scrollTop / docHeight;
            setScrollProgress(progress);
        };

        onScroll(); // initialize
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);
    useEffect(() => {
        if (scrollProgress) {
            console.log(scrollProgress)
        }
    }, [scrollProgress])


    useFrame((_, delta) => {
        if (!ref.current) return;
        const model = ref.current;

        let targetX = 0;
        let targetY = 0;
        let targetRotationY = 0;
        let targetScale = 1;

        // Phase 1: slide center -> left (scroll: 0 to 1/6)
        if (scrollProgress < 1 / 6) {
    setItemDisplayed('sphere');
            const t = scrollProgress / (1 / 6);
            targetX = THREE.MathUtils.lerp(10, -30, t);
            targetRotationY = THREE.MathUtils.lerp(0, -Math.PI / 4, t);
            targetScale = THREE.MathUtils.lerp(1, 0.8, t);
        }

        // Phase 2: return left -> center (scroll: 1/6 to 1/3)
        else if (scrollProgress < 1 / 3) {
    setItemDisplayed('rocket-ship');
            const t = (scrollProgress - 1 / 6) / (1 / 6);
            targetX = THREE.MathUtils.lerp(-30, 10, t);
            targetRotationY = THREE.MathUtils.lerp(-Math.PI / 4, 0, t);
            targetScale = THREE.MathUtils.lerp(0.8, 1, t);
        }

        // Phase 3: exit center → right (scroll: 1/3 to 5/6)
        else if (scrollProgress < 43 / 100) {
    setItemDisplayed('gear');
            const t = (scrollProgress - 1 / 3) / (0.66); // normalize range from 1/3 to 43/100

            targetX = THREE.MathUtils.lerp(15, 30, t);
            targetRotationY = THREE.MathUtils.lerp(0, Math.PI / 2, t); // optional rotation
            targetScale = THREE.MathUtils.lerp(1, 0.01, t);
        }

        // Phase 3: exit center → right (scroll: 1/3 to 5/6)
        else if (scrollProgress < 53 / 100) {
            // lightbulb
            const t = (scrollProgress - 43 / 100) / (0.55); // normalize range from 1/3 to 5/6

            targetX = THREE.MathUtils.lerp(15, 0, t);
            targetY = THREE.MathUtils.lerp(0, -10, t);
            targetRotationY = THREE.MathUtils.lerp(0, Math.PI / 4, t); // optional rotation
            targetScale = THREE.MathUtils.lerp(1, 0.01, t);
        }

        // Phase 3: exit center → right (scroll: 1/3 to 5/6)
        else if (scrollProgress < 63 / 100) {
            // sphere
    setItemDisplayed('light-bulb');
            const t = (scrollProgress - 43 / 100) / (0.55); // normalize range from 1/3 to 5/6

            targetX = THREE.MathUtils.lerp(0, -2, t);
            targetY = THREE.MathUtils.lerp(-10, -20, t);
            targetRotationY = THREE.MathUtils.lerp(0, Math.PI / 4, t); // optional rotation
            targetScale = THREE.MathUtils.lerp(2, 0.01, t);
        }

        // Phase 3: exit center → right (scroll: 1/3 to 5/6)
        else if (scrollProgress < 73 / 100) {
            // sphere
            const t = (scrollProgress - 33 / 100) / (0.88); // normalize range from 1/3 to 5/6

            targetX = THREE.MathUtils.lerp(-3, -10, t);
            targetY = THREE.MathUtils.lerp(0, 0, t);
            targetRotationY = THREE.MathUtils.lerp(0, Math.PI / 4, t); // optional rotation
            targetScale = THREE.MathUtils.lerp(2, 0.01, t);
        }
        else if (scrollProgress > 4 / 5) {
    setItemDisplayed('rocket-ship');
            const t = (scrollProgress - 33 / 100) / (0.9); // normalize range from 1/3 to 5/6

            targetX = THREE.MathUtils.lerp(-10, -20, t);
            targetY = THREE.MathUtils.lerp(0, 3, t);
            targetRotationY = THREE.MathUtils.lerp(0, Math.PI / 4, t); // optional rotation
            targetScale = THREE.MathUtils.lerp(3, 0.01, t);
        }


        model.position.x = THREE.MathUtils.damp(model.position.x, targetX, 4, delta);
        model.position.y = THREE.MathUtils.damp(model.position.y, targetY, 4, delta);
        model.rotation.y = THREE.MathUtils.damp(model.rotation.y, targetRotationY, 4, delta);
        const dampedScale = THREE.MathUtils.damp(model.scale.x, targetScale, 4, delta);
        model.scale.setScalar(dampedScale);
    });

    return <group ref={ref}>{children}</group>;
};
