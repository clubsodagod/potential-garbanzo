// /components/home/HomeValuePropositionSection.tsx
import { valuePropositions } from '@/_library/const/value-propositions';
import { IValueProposition } from '@/_library/types-interfaces-classes/copy';
import React, { useRef } from 'react';
import ValuePropositionCard from './ValuePropositionCard';
import { Typography } from '@mui/material';
import { getWobbleVariant, POSITION_WOBBLE_LOOP, SLIDE_IN_CARD, STAGGER_SLIDE_IN_PARENT } from '@/_library/animations/hero.animations';
import { AnimatePresence, motion, useMotionValue, useTransform } from "motion/react"

/**
 * ValuePropositionSection
 * 3-column layout for Innovate / Simplify / Empower
 */
const HomeValuePropositionSection: React.FC = () => {


    const containerRef = useRef<HTMLDivElement>(null);

    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Map 0–1 to -10px to +10px range for position offset
    const translateX = useTransform(mouseX, [0, 1], [-30, 30]);
    const translateY = useTransform(mouseY, [0, 1], [-30, 30]);

    const handleMouseMove = (e: React.MouseEvent) => {
        const rect = containerRef.current?.getBoundingClientRect();
        if (!rect) return;

        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;

        mouseX.set(x);
        mouseY.set(y);
    };

    return (
        <AnimatePresence
        >
            <section className="px-6 md:px-30 py-16 pb-[33vh] text-center min-h-screen  flex flex-wrap  justify-center gap-20 items-center">
                <motion.div
                    className=" flex flex-wrap  justify-center gap-20 items-center w-fit"
                >
                    <div
                        className='min-w-full'
                    >
                        <Typography variant="h5" fontSize={{ xs: "2rem", md: "3rem" }} className="glowText md:px-50">
                            What We Strive for When Crafting Solutions
                        </Typography>
                    </div>
                    <motion.div
                        variants={STAGGER_SLIDE_IN_PARENT}
                        initial="initial"
                        animate="animate"
                        className="relative flex flex-col md:flex-row  justify-center gap-20  w-fit oxerflow-x-hidden"
                    >
                        {valuePropositions.map(({ title, desc }: IValueProposition, i) => (
                            <motion.div
                                key={desc}
                                variants={SLIDE_IN_CARD}
                                initial="initial"
                                whileInView="animate"
                                className="relative"
                                viewport={{ once: true, amount: 0 }}
                                style={{ paddingTop: `${i * 75}vh` }}
                            >
                                <motion.div {...getWobbleVariant(i)}>
                                    <ValuePropositionCard title={title} desc={desc} />
                                </motion.div>
                            </motion.div>
                        ))}

                    </motion.div>

                </motion.div>

            </section>
        </AnimatePresence>

    )
};

export default HomeValuePropositionSection;
