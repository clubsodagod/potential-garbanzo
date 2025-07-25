import React from 'react';
import Link from 'next/link';

/**
 * HeroSection
 * Primary brand message + CTA
 */
export const HeroSection: React.FC = () => (
    <section className="text-center py-20 px-6">
        <h1 className="text-5xl font-bold mb-4">Unlock the Power of Intuitive Tech</h1>
        <p className="text-xl max-w-2xl mx-auto mb-8">
            Welcome to Pearl Box: the toolbox for creators, founders, and visionaries. Inside? Precision-built systems designed to make you faster, sharper, and unstoppable.
        </p>
        <div className="flex justify-center gap-4">
            <Link href="/pearl-bar" className="btn-primary">Explore Pearl Bar</Link>
            <Link href="/about" className="btn-secondary">See What’s Inside</Link>
        </div>
    </section>
);

/**
 * ValuePropositionSection
 * 3-column layout for Innovate / Simplify / Empower
 */
export const ValuePropositionSection: React.FC = () => (
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

/**
 * AboutMissionSection
 */
export const AboutMissionSection: React.FC = () => (
    <section className="py-16 px-6 text-center max-w-3xl mx-auto">
        <h2 className="text-4xl font-bold mb-4">Our Mission</h2>
        <p className="text-lg text-gray-700">
            We exist to empower lives through technology. Not by adding more. But by creating systems that make life feel effortless.
            We believe complexity is a barrier—and we&apos;re here to remove it.
        </p>
    </section>
);

/**
 * AboutCultureQuote
 */
export const AboutCultureQuote: React.FC = () => (
    <section className="bg-gray-100 py-12 px-6 text-center">
        <blockquote className="italic text-2xl max-w-2xl mx-auto">
            “Pearl Box isn’t here to blend in. We’re here to change what’s possible.”
        </blockquote>
    </section>
);

/**
 * CallToActionBanner
 */
export const CallToActionBanner: React.FC = () => (
    <section className="bg-black text-white py-16 px-6 text-center">
        <h3 className="text-3xl font-bold mb-4">
            You bring the ambition. We bring the system that bends time for you.
        </h3>
        <Link href="/pearl-bar" className="btn-primary mt-4 inline-block">See Pearl Box in Action</Link>
    </section>
);
