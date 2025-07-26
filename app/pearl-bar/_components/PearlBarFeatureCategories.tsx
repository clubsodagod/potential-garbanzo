"use client"

import React from "react";
import { Typography, Grid, Box } from "@mui/material";
import FeatureCategoryCard from "./FeatureCategoryCard";
import FeaturedToolSection from "./FeaturedToolSection";
import GlassGlowCard from "./GlassGlowCard";


// Feature categories array
const FEATURE_CATEGORIES: { icon: string, title: string; description: string }[] = [
    {
        icon: "⚙️",
        title: "Business Apps",
        description: "From lead capture to CRM, manage your backend with precision—no tech headaches.",
    },
    {
        icon: "🤖",
        title: "AI Assistants",
        description: "Strategic co-pilots that help you write, plan, think, and execute faster than ever.",
    },
    {
        icon: "📈",
        title: "Growth Engines",
        description: "SEO tools, marketing automations, and optimization frameworks to scale with purpose.",
    },
    {
        icon: "🧠",
        title: "Personal Systems",
        description: "Tools to sharpen your edge—focus trackers, goal mapping, and more.",
    },
];

const PearlBarFeatureCategories: React.FC = () => (
    <Box id="tools" className="min-h-screen" py={10}  px={{xs:3,lg:33}} >
        <Typography className="glowText" variant="h3" fontWeight={700} gutterBottom>
            Latest Pearls
        </Typography>
        <FeaturedToolSection />
        <Typography className="glowText" variant="h4" textAlign="center" fontWeight={700} gutterBottom>
            A Tool for Every Breakthrough.
        </Typography>
        <Grid container spacing={4} mt={4}>

            {FEATURE_CATEGORIES.map((item, i) => (
                <Grid size={{xs:12,sm:6,md:3}} key={i}>
                    <GlassGlowCard {...item} />
                </Grid>
            ))}
        </Grid>
    </Box>
);


export default PearlBarFeatureCategories