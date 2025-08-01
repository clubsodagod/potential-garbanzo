import React, { JSX } from "react";
import { Box } from "@mui/material";

import PearlBarHero from "./_components/PearlBarHero";
import PearlBarFeatureCategories from "./_components/PearlBarFeatureCategories";
import PearlBarCTA from "./_components/PearlBarCTA";
import PearlBarPainPoints from "./_components/PearlBarPainPoints"; // Currently unused
import { Metadata } from "next";

/**
 * PearlBarPage
 * 
 * A dedicated landing page for the Pearl Bar product offering.
 * This page showcases the hero, features, and CTA for SaaS solutions
 * offered under Pearl Box. Designed for clarity, conversion, and SEO.
 * 
 * @returns {JSX.Element} The PearlBarPage layout
 */
const PearlBarPage = (): JSX.Element => {
    return (
        <Box component="main" sx={{ width: "100%", overflowX: "hidden" }}>
            <PearlBarHero />
            {/* <PearlBarPainPoints /> Uncomment when ready to include pain points section */}
            <PearlBarFeatureCategories />
            <PearlBarCTA />
        </Box>
    );
};

export default PearlBarPage;


export const metadata:Metadata = {
    title: "Pearl Bar | AI SaaS Tools for Business Simplification & Automation",
    description:
        "Explore Pearl Bar by Pearl Box — your intuitive AI-powered SaaS suite that simplifies operations, automates workflows, and helps you scale smarter. Built for creators, startups, and businesses ready to innovate without limits.",
    keywords: [
        "Pearl Bar",
        "AI SaaS",
        "business automation",
        "workflow optimization",
        "Pearl Box",
        "intuitive software",
        "startup tools",
        "AI business platform",
        "creative automation",
        "SaaS productivity tools",
    ],
    openGraph: {
        title: "Pearl Bar | AI SaaS Tools for Business Simplification & Automation",
        description:
            "Pearl Bar helps you scale with smart, user-friendly AI tools that simplify and automate key business operations.",
        url: "https://www.pearlbox.co/pearl-bar",
        siteName: "Pearl Box",
        images: [
            {
                url: "https://res.cloudinary.com/dyfhsjtwo/image/upload/v1753478226/Untitled_design_3_lk8scr.webp",
                width: 1200,
                height: 630,
                alt: "Pearl Bar | AI SaaS Suite by Pearl Box",
            },
        ],
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Pearl Bar by Pearl Box",
        description:
            "Turn complexity into clarity with Pearl Bar — a powerful SaaS suite for business innovation and automation.",
        images: ["https://res.cloudinary.com/dyfhsjtwo/image/upload/v1753478226/Untitled_design_3_lk8scr.webp"],
    },
};
