"use client";

import { useFrame } from "@react-three/fiber";
import { useRef, useEffect, useState } from "react";
import * as THREE from "three";

interface ModelWrapperProps {
    children: React.ReactNode;
}

export const ModelWrapper: React.FC<ModelWrapperProps> = ({ children }) => {
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

    useFrame((_, delta) => {
        if (!ref.current) return;
        const model = ref.current;

        let targetX = 0;
        let targetRotationY = 0;
        let targetScale = 1;

        // Phase 1: slide center -> left (scroll: 0 to 1/6)
        if (scrollProgress < 1 / 6) {
            const t = scrollProgress / (1 / 6);
            targetX = THREE.MathUtils.lerp(0, -60, t);
            targetRotationY = THREE.MathUtils.lerp(0, -Math.PI / 4, t);
            targetScale = THREE.MathUtils.lerp(1, 0.8, t);
        }

        // Phase 2: return left -> center (scroll: 1/6 to 1/3)
        else if (scrollProgress < 1 / 3) {
            const t = (scrollProgress - 1 / 6) / (1 / 6);
            targetX = THREE.MathUtils.lerp(-60, 0, t);
            targetRotationY = THREE.MathUtils.lerp(-Math.PI / 4, 0, t);
            targetScale = THREE.MathUtils.lerp(0.8, 1, t);
        }

        // Phase 3: exit center → right (scroll: 1/3 to 5/6)
        else if (scrollProgress > 3/4) {
            const t = (scrollProgress - 1 / 3) / (0.5); // normalize range from 1/3 to 5/6

            targetX = THREE.MathUtils.lerp(0, 25, t);
            targetRotationY = THREE.MathUtils.lerp(0, Math.PI / 4, t); // optional rotation
            targetScale = THREE.MathUtils.lerp(1, 0.01, t);
        }


        model.position.x = THREE.MathUtils.damp(model.position.x, targetX, 4, delta);
        model.rotation.y = THREE.MathUtils.damp(model.rotation.y, targetRotationY, 4, delta);
        const dampedScale = THREE.MathUtils.damp(model.scale.x, targetScale, 4, delta);
        model.scale.setScalar(dampedScale);
    });

    return <group ref={ref}>{children}</group>;
};
