// @/_library/animations/call-list.animations.ts
import type { MotionProps } from "motion/react"

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
