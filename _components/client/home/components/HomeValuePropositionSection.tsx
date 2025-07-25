import React from 'react';
import Link from 'next/link';


/**
 * ValuePropositionSection
 * 3-column layout for Innovate / Simplify / Empower
 */
const HomeValuePropositionSection: React.FC = () => (
    <section className="grid md:grid-cols-3 gap-8 px-6 py-16 text-center">
        {[
            {
                title: 'Innovate Without Limits',
                desc: 'We don’t chase trends. We engineer what’s next. Our tools are built to help you operate ahead of the curve—and stay there.'
            },
            {
                title: 'Simplify the Complex',
                desc: 'Great tech should feel invisible. We strip away friction, eliminate clutter, and give you systems that just work. Intuitively.'
            },
            {
                title: 'Empower the User',
                desc: 'Every product is a power move. We don’t just deliver tools—we deliver edge, speed, clarity, and control.'
            },
        ].map(({ title, desc }) => (
            <div key={title}>
                <h3 className="text-2xl font-semibold mb-2">{title}</h3>
                <p className="text-base text-gray-600">{desc}</p>
            </div>
        ))}
    </section>
);

export default HomeValuePropositionSection