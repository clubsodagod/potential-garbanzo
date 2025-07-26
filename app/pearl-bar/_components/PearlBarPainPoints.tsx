"use client";

import { Box, Grid, Typography } from "@mui/material";
import React from "react";
import PainPointCard from "./PainPointCard";


const PearlBarPainPoints: React.FC = () => (
    <Box py={10} className="min-h-screen">
        <Typography className="glowText" variant="h4" textAlign="center" fontWeight={700} gutterBottom>
            Let’s Talk About What’s Broken.
        </Typography>
        <Grid container spacing={4} mt={4}>
            {[
                {
                    title: "Too many tools. Not enough traction.",
                    description: "You’re juggling apps, subscriptions, and systems that don’t talk. Pearl Bar brings everything under one roof—with clarity and cohesion.",
                },
                {
                    title: "Manual work is costing you momentum.",
                    description: "Every delay, every repetitive task—it adds up. Pearl Bar automates, streamlines, and lets you focus on what actually grows your brand.",
                },
                {
                    title: "Generic solutions don’t fit bold visions.",
                    description: "We don’t do one-size-fits-all. Pearl Bar apps are smart, customizable, and engineered for people who lead from the front.",
                },
            ].map((item, i) => (
                <Grid  size={{xs:12,md:4}}  key={i}>
                    <PainPointCard {...item} />
                </Grid>
            ))}
        </Grid>
    </Box>
);

export default PearlBarPainPoints