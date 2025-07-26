// /components/home/HomeValuePropositionSection.tsx
import { valuePropositions } from '@/_library/const/value-propositions';
import { IValueProposition } from '@/_library/types-interfaces-classes/copy';
import React from 'react';
import ValuePropositionCard from './ValuePropositionCard';

/**
 * ValuePropositionSection
 * 3-column layout for Innovate / Simplify / Empower
 */
const HomeValuePropositionSection: React.FC = () => (
    <section className="flex flex-wrap  justify-center gap-20 items-center px-6 py-16 text-center min-h-screen ">
        {valuePropositions.map(({ title, desc }: IValueProposition) => (
            <ValuePropositionCard 
                key={desc} title={title} desc={desc}
            />
        ))}
    </section>
);

export default HomeValuePropositionSection;
