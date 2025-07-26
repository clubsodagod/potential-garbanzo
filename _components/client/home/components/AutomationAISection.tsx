import React from 'react';
import Link from 'next/link';
import { Box, Container, Typography, Grid, Button } from '@mui/material';

// Existing sections (HeroSection, ValuePropositionSection, etc.) remain unchanged...

/**
 * AutomationSection
 * AI & Automation for Business
 */
const AutomationAISection: React.FC = () => (
    <Box component="section" aria-labelledby="automation-heading" className='flex flex-col items-center' height={{xs:"100%",md:"100dvh"}} py={10} px={4} bgcolor="#f9fafb">
        <Container maxWidth="lg" className="my-auto h-fit">
            <Typography id="automation-heading" component="h2" variant="h4" fontWeight="bold" gutterBottom textAlign="center">
                Automate the Grind. Amplify the Genius.
            </Typography>
            <Typography component="p" variant="h6" color="textSecondary" textAlign="center" maxWidth="md" mx="auto" mb={6}>
                You weren’t built for busywork. Your business wasn’t either. Pearl Box automates the repetitive, augments decision-making, and brings AI into your flow—without the friction.
            </Typography>

            <Grid container spacing={4} role="list">
                <Grid size={{xs:12,md:4}} role="listitem">
                    <Typography variant="h6" fontWeight="medium">⚙️ Smart Systems, Custom Logic</Typography>
                    <Typography color="textSecondary">
                        We build automations that understand your operations, not just execute tasks. Every workflow is tailored to how you work best.
                    </Typography>
                </Grid>
                <Grid size={{xs:12,md:4}} role="listitem">
                    <Typography variant="h6" fontWeight="medium">🧠 AI That Thinks Like a Strategist</Typography>
                    <Typography color="textSecondary">
                        Not just chatbots. We deliver intelligent assistants that handle analysis, content, lead scoring, outreach, and more—with precision.
                    </Typography>
                </Grid>
                <Grid size={{xs:12,md:4}} role="listitem">
                    <Typography variant="h6" fontWeight="medium">📈 Scale Without Burnout</Typography>
                    <Typography color="textSecondary">
                        Do more, faster—with fewer resources and higher output. Pearl Box turns manual into magical.
                    </Typography>
                </Grid>
            </Grid>

            <Box mt={6} textAlign="center">
                    <Button  href="/solutions" LinkComponent={Link} variant="outlined" color="primary" aria-label="Explore automation and AI solutions">
                        Supercharge My Business
                    </Button>
            </Box>
        </Container>
    </Box>
);


export default AutomationAISection