"use client";

import React from "react";
import { Box, Typography, Button, Stack, Card, CardContent } from "@mui/material";
import Link from "next/link";

/**
 * FeaturedToolSection
 * Highlights the first tool created in the Pearl Bar suite: "The Lead Flow"
 */
const FeaturedToolSection: React.FC = () => (
    <Box py={12}  className="min-h-[60vh] w-fit" id="featured">
        <Card
            sx={{
                background: "linear-gradient(to right, #111, #1f1f1f)",
                color: "#fff",
                boxShadow: "0 0 20px rgba(255,255,255,0.05)",
                borderRadius: 4,
                p: 4,
                maxWidth: "100%",
                mx: "auto",
            }}
        >
            <CardContent>
                <Typography variant="overline" sx={{ color: "#FFDB01", fontWeight: 600 }}>
                    Featured Tool
                </Typography>

                <Typography
                    variant="h4"
                    fontWeight={800}
                    gutterBottom
                    sx={{ mt: 1 }}
                    className="glowText"
                >
                    The Lead Flow
                </Typography>

                <Typography variant="body1" color="#fafafa" maxWidth={700} mb={4}>
                    Our first and flagship app—The Lead Flow—automates your entire lead capture, tracking,
                    and follow-up process. It’s like having a sales assistant that never sleeps.
                </Typography>

                <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                    <Button
                        variant="outlined"
                        size="large"
                        color="primary"
                        component={Link}
                        href="/pearl-bar/the-lead-flow"
                    >
                        Explore The Lead Flow
                    </Button>
                    {/* <Button
                    id="alt"
                        variant="outlined"
                        size="large"
                        color="inherit"
                        component={Link}
                        href="/pearl-bar"
                    >
                        Back to Pearl Bar
                    </Button> */}
                </Stack>
            </CardContent>
        </Card>
    </Box>
);

export default FeaturedToolSection;
