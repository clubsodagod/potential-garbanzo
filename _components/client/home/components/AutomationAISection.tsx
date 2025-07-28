import React from 'react';
import Link from 'next/link';
import { Box, Container, Typography, Grid, Button, Paper } from '@mui/material';

// Existing sections (HeroSection, ValuePropositionSection, etc.) remain unchanged...

/**
 * AutomationSection
 * AI & Automation for Business
 */
const AutomationAISection: React.FC = () => (
    <Box component="section" aria-labelledby="automation-heading" className='flex flex-col items-center' height={{ xs: "100%", md: "100dvh" }} py={10} px={4} bgcolor="#f9fafb">
        <Container maxWidth="lg" className="my-auto h-fit">
            <Typography id="automation-heading" className="glowText" component="h2" variant="h4" fontWeight="bold" gutterBottom textAlign="center">
                Automate the Grind. Amplify the Genius.
            </Typography>
            <Typography component="p" variant="h6" color="textSecondary" textAlign="center" maxWidth="md" mx="auto" mb={6}>
                You weren’t built for busywork. Your business wasn’t either. Pearl Box automates the repetitive, augments decision-making, and brings AI into your flow—without the friction.
            </Typography>



            <Grid container spacing={4} role="list">
                {[
                    {
                        title: "⚙️ Smart Systems, Custom Logic",
                        desc: "We build automations that understand your operations, not just execute tasks. Every workflow is tailored to how you work best."
                    },
                    {
                        title: "🧠 AI That Thinks Like a Strategist",
                        desc: "Not just chatbots. We deliver intelligent assistants that handle analysis, content, lead scoring, outreach, and more—with precision."
                    },
                    {
                        title: "📈 Scale Without Burnout",
                        desc: "Do more, faster—with fewer resources and higher output. Pearl Box turns manual into magical."
                    }
                ].map(({ title, desc }, index) => (
                    <Grid size={{ xs: 12, md: 4 }} role="listitem" key={index}>
                        <Paper
                            elevation={0}
                            sx={{
                                backdropFilter: "blur(12px)",
                                backgroundColor: "rgba(255, 255, 255, 0.1)",
                                border: "1px solid rgba(255, 255, 255, 0.2)",
                                borderRadius: "34px",
                                padding: 3,
                                height: "100%",
                                boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
                                '&:hover': {
                                    boxShadow: `
                                    0 0 6px #FFDB01,
                                    0 0 10px #FF851F,
                                    0 0 14px #FF3D3D,
                                    0 0 18px #FF0F6F,
                                    0 0 22px #FE01FA
                                `,
                                                },
                                            }}
                        >
                            <Typography variant="h6" fontWeight="medium" gutterBottom>
                                {title}
                            </Typography>
                            <Typography color="textSecondary">{desc}</Typography>
                        </Paper>
                    </Grid>
                ))}
            </Grid>


            <Box mt={6} textAlign="center">
                <Button href="/pearl-bar#tools" LinkComponent={Link} variant="outlined" color="primary" aria-label="Explore automation and AI solutions">
                    Supercharge My Business
                </Button>
            </Box>
        </Container>
    </Box>
);


export default AutomationAISection