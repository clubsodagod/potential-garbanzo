import React from 'react';
import Link from 'next/link';


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
