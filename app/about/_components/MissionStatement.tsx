import { Typography } from '@mui/material';
import React from 'react';


/**
 * AboutMissionSection
 */
const AboutMissionSection: React.FC = () => (
    <section className=" px-6 text-center max-w-3xl mx-auto min-h-screen flex flex-col justify-center">
        <Typography variant='h2' className="text-4xl font-bold mb-4 glowText">Our Mission</Typography>
        <Typography color='#fafafa' className="text-lg pt-3">
            We exist to empower lives through technology. Not by adding more. But by creating systems that make life feel effortless.
            We believe complexity is a barrier—and we&apos;re here to remove it.
        </Typography>
    </section>
);

export default AboutMissionSection