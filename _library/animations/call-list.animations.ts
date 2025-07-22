// @/_library/animations/call-list.animations.ts
import type { MotionProps } from "motion/react"
// call-list.animations.ts
import { Variants } from "framer-motion";

export const springInView: MotionProps = {
    initial: { opacity: 0, x: 250 },
    whileInView: { opacity: 1, x: 0 },
    transition: {
        type: "spring",
        stiffness: 60,
        damping: 15,
    },
    viewport: { once: true, amount: 0.2 }, // Only animate once when 20% in view
};

export const pressAndExpand: MotionProps = {
    whileTap: { scale: 0.5 },
    transition: {
        type: "spring",
        stiffness: 200,
        damping: 12,
    },
};


export const expandIconVariants: Variants = {
    collapsed: { scale: 1 },
    expanded: {
        scale: [1, 0.8, 1.1, 1],
        transition: {
            duration: 0.4,
            times: [0, 0.25, 0.75, 1],
            ease: "easeInOut",
        },
    },
};

export const cardExpandVariants: Variants = {
    collapsed: {
        scale: [1.25, 0.5, 1.125, 1],
        transition: {
            duration: 0.4,
            times: [0, 0.25, 0.75, 1],
            ease: "easeInOut",
        },
    },
    expanded: {
        scale: [0.5, 1.25, 0.875, 1],
        transition: {
            duration: 0.4,
            times: [0, 0.25, 0.75, 1],
            ease: "easeInOut",
        },
    },
};
