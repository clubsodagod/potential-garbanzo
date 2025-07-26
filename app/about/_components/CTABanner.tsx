"use client"
import Link from "next/link";
import React from "react";

/**
 * CallToActionBanner
 */
const CTABanner: React.FC = () => (
    <section className="bg-black text-white py-16 px-6 text-center">
        <h3 className="text-3xl font-bold mb-4">
            You bring the ambition. We bring the system that bends time for you.
        </h3>
        <Link href="/pearl-bar" className="btn-primary mt-4 inline-block">See Pearl Box in Action</Link>
    </section>
);

export default CTABanner