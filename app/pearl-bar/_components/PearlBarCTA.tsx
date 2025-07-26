"use client"

import { Typography, Stack, Button, Box } from "@mui/material";
import Link from "next/link";
import React from "react";


/** CTA Section */
const PearlBarCTA: React.FC = () => (
    <Box py={10} textAlign="center" color={"#fafafa"} className="" px={{xs:6,lg:33}} >
        <Typography className="glowText" variant="h4" fontWeight={700} gutterBottom>
            Ready to Work Smarter?
        </Typography>
        <Typography variant="body1" maxWidth="600px" mx="auto"  gutterBottom>
            This isn’t software. This is leverage. Start with the tools that solve your biggest pain points—and expand from there.
        </Typography>
        <Stack direction={{ xs: "column", sm: "row" }} spacing={2} justifyContent="center" mt={4}>
            <Button LinkComponent={Link} variant="outlined" size="large" href="#tools">
                Browse the Pearl Bar
            </Button>
            <Button LinkComponent={Link} id="alt" variant="outlined" size="large" href="/contact">
                Consultation
            </Button>
        </Stack>
    </Box>
);

export default PearlBarCTA