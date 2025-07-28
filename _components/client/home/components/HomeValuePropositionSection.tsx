// /components/home/HomeValuePropositionSection.tsx
import { valuePropositions } from '@/_library/const/value-propositions';
import { IValueProposition } from '@/_library/types-interfaces-classes/copy';
import React from 'react';
import ValuePropositionCard from './ValuePropositionCard';
import { Typography } from '@mui/material';

/**
 * ValuePropositionSection
 * 3-column layout for Innovate / Simplify / Empower
 */
const HomeValuePropositionSection: React.FC = () => (
    <section className="px-6 md:px-30 py-16 text-center min-h-screen  flex flex-wrap  justify-center gap-20 items-center">
        <div
            className=" flex flex-wrap  justify-center gap-20 items-center w-fit"
        >
            <div
                className='min-w-full'
            >
                <Typography variant="h5" fontSize={{xs:"2rem",md:"3rem"}} className="glowText md:px-50">
                    What We Strive for When Crafting Solutions
                </Typography>
            </div>
                    {valuePropositions.map(({ title, desc }: IValueProposition) => (
            <ValuePropositionCard 
                key={desc} title={title} desc={desc}
            />
        ))}
        </div>

    </section>
);

export default HomeValuePropositionSection;
