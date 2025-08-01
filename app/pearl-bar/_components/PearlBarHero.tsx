"use client";

import React from "react";
import { Box, Button, Typography, Stack } from "@mui/material";
import Link from "next/link";

/** Hero Section */
const PearlBarHero: React.FC = () => (
    <Box pb={10} textAlign="center" className="min-h-screen flex flex-col justify-center  "  px={{xs:6,lg:33}} >
        <Typography className="glowText" variant="h3" fontWeight={700} gutterBottom>
            Pearl Bar. Your Unfair Advantage—On Demand.
        </Typography>
        <Typography variant="subtitle1" fontSize={'1.2rem'} maxWidth="700px" mx="auto" color="#fafafa" gutterBottom>
            A curated ecosystem of intelligent tools—built to eliminate friction, unlock scale, and turn insight into income.
        </Typography>
        <Stack direction={{ xs: "column", sm: "row" }} spacing={2} justifyContent="center" mt={4}>
            <Button variant="outlined" size="large" component={Link} href="#tools">
                Explore the Tools
            </Button>
            {/* <Button id="alt" variant="outlined" size="large" component={Link} href="#results">
                See Real Results
            </Button> */}
        </Stack>
    </Box>
);

export default PearlBarHero