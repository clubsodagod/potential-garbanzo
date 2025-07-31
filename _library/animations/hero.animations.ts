import { easeInOut } from "motion/react";
import { MotionProps } from 'framer-motion';

export const getWobbleVariant = (index: number): MotionProps => {
    const directions = [
        {
            x: [0, 1.5, 4, 1.5, 0, -1.5, -4, -1.5, 0],
            y: [0, -1, -2, -1, 0, 1, 2, 1, 0],
        },
        {
            x: [0, -1, -3, -1, 0, 1, 3, 1, 0],
            y: [0, 1, 2, 1, 0, -1, -2, -1, 0],
        },
        {
            x: [0, 0.5, 2, 0.5, 0, -0.5, -2, -0.5, 0],
            y: [0, 1.5, 4, 1.5, 0, -1.5, -4, -1.5, 0],
        },
        {
            x: [0, -2.5, -5, -2.5, 0, 2.5, 5, 2.5, 0],
            y: [0, -0.5, -1, -0.5, 0, 0.5, 1, 0.5, 0],
        },
    ];


    const direction = directions[index % directions.length];

    return {
        animate: direction,
        transition: {
            duration: 2 + (index % 3) * 0.2, // small variation in speed
            repeat: Infinity,
            ease: 'easeInOut',
        },
    };
};


/**
 * Continuous position wobble animation
 * - Subtle left-right + up-down loop
 */
export const POSITION_WOBBLE_LOOP: MotionProps = {
    animate: {
        x: [0, 4, -4, 0],
        y: [0, -2, 2, 0],
    },
    transition: {
        duration: 2,
        repeat: Infinity,
        ease: 'easeInOut',
    },
};


// /lib/animations.ts
export const BOUNCE_SCALE_Y_ANIMATION = {
    initial: { scaleY: 0.01, opacity: 0.33 },
    animate: {
        scaleY: [1.25, 0.9, 1],
        opacity: 1,
        transition: {
            duration: 0.3,
            ease: easeInOut,
            times: [0, 0.4, 1],
            staggerChildren: 0.1, // delays children
        },
    },
};

// lib/animations.ts

export const STAGGER_SLIDE_IN_PARENT = {
    initial: {},
    animate: {
        transition: {
            staggerChildren: 0.15,
            delayChildren: 0.2,
        },
    },
};

export const SLIDE_IN_CARD = {
    initial: { x: 200, opacity: 0.01 },
    animate: {
        x: 0, opacity: 1,
        transition: {
            duration: 0.4,
            ease: easeInOut,
        },
    },
};
