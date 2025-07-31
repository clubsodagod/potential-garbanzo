import React, { useRef } from 'react';
import Link from 'next/link';
import { Button, Typography } from '@mui/material';
import { AnimatePresence, motion, useMotionValue, useTransform } from 'motion/react'
import { BOUNCE_SCALE_Y_ANIMATION } from '@/_library/animations/hero.animations';



/**
 * HeroSection
 * Primary brand message + CTA
 */
const HomeHeroSection: React.FC = () => {

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
            <section className=" min-h-screen  flex items-center justify-center md:justify-start px-6  md:px-30">
                <motion.div
                    style={{
                        transformOrigin: 'top',
                    }}
                    {...BOUNCE_SCALE_Y_ANIMATION}
                >
                    <motion.div
                        ref={containerRef} onMouseMove={handleMouseMove}
                        transition={{
                            type: 'spring',
                            stiffness: 100,
                            damping: 15,
                        }}
                        className="py-10 px-6 relative z-0 flex flex-col justify-center items-center md:max-w-4xl  backdrop-blur-xs bg-white/10 rounded-3xl border border-white/20 shadow-xl transition-all"
                    >
                        <Typography variant={"h2"} fontSize={{xs:"2rem",md:"3rem"}} className="text-5xl font-bold mb-4 glowText text-white text-center">
                            Leverage. Powered by Innovation.
                        </Typography>
                        <p className="text-xl text-center mx-auto mb-8 text-[#fafafa] max-w-2xl">
                            Welcome to Pearl Box: the toolbox for creators, founders, and visionaries.
                            Inside? Precision-built systems designed to make you faster, sharper, and unstoppable.
                        </p>
                        <div className="flex flex-wrap gap-4 w-fit">
                            <Button sx={{ p: 2 }} variant="outlined" LinkComponent={Link} href="/about">
                                See What’s Inside
                            </Button>
                            <Button variant="outlined" id="alt" LinkComponent={Link} href="/pearl-bar">
                                Explore Pearl Bar
                            </Button>
                        </div>
                    </motion.div>
                </motion.div>

            </section>
        </AnimatePresence>
    );
}

export default HomeHeroSection
