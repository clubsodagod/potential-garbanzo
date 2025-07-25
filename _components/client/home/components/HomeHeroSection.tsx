import React from 'react';
import Link from 'next/link';
import PearlBoxHomeScene from './3d/PearlBoxHomeScene';
import { Button } from '@mui/material';

/**
 * HeroSection
 * Primary brand message + CTA
 */
const HomeHeroSection: React.FC = () => (
    <>
        <section className="  ">


        <div
            className='fixed h-screen w-full z-0 '
        >
            <PearlBoxHomeScene />
        </div>
            <div
                className='py-20 px-6 min-h-screen relative z-0 flex flex-col justify-center md:max-w-3/5'
            >
                <h2 className="text-5xl font-bold mb-4 text-[#fafafa]">Increase Your Leverage with Power of Innovation</h2>
                <p className="text-xl mx-auto mb-8  text-[#fafafa]">
                    Welcome to Pearl Box: the toolbox for creators, founders, and visionaries. Inside? Precision-built systems designed to make you faster, sharper, and unstoppable.
                </p>
                <div className="flex justify-center gap-4 w-fit">
                    <Button sx={{p:2}} variant="outlined" LinkComponent={Link} href="/about" className="">See What’s Inside</Button>
                    <Button variant="outlined" id={"alt"} LinkComponent={Link} href="/pearl-bar" className="">Explore Pearl Bar</Button>
                </div>
            </div>

        </section>
    </>

);

export default HomeHeroSection
