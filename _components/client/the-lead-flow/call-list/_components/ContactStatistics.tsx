'use client';

import React from 'react';
import { Grid, Typography, Box } from '@mui/material';
import StatCard from './StatCard';
import { InteractionSummary } from '@/_utility/helpers/interaction-summary.helper';

interface ContactStatisticsProps {
    /**
     * Aggregated stats for a given list of real estate lead interactions.
     */
    summary: InteractionSummary;
}

// Lottie animation URLs mapped to interaction types
const animations = {
    calls: 'https://lottie.host/46576bd5-e61e-437d-ac66-7425ebda2c0d/gbQ14T9jBe.lottie',
    texts: 'https://lottie.host/6986f398-0ae1-4617-a38e-c5f623197db2/6CTAql7Rev.lottie',
    emails: 'https://lottie.host/5bdf7b03-7c4d-4c3d-9527-f2d16feb512c/t1oWfUzMSi.lottie',
    notes: 'https://lottie.host/fca877b5-8e48-4517-a168-6b26c2321872/zAYjlFSYDu.lottie',
};

/**
 * ContactStatistics Component
 *
 * Renders a visual dashboard row/grid of interaction stats, such as calls,
 * emails, texts, and notes. Useful for giving users insight into lead engagement.
 *
 * @component
 * @param {ContactStatisticsProps} props - Object containing interaction summary counts
 * @returns {JSX.Element}
 */
const ContactStatistics: React.FC<ContactStatisticsProps> = ({ summary }) => {
    return (
        <Box my={4} 
        >
            <Typography variant="h6" gutterBottom>
                📊 Lead Interaction Summary
            </Typography>
            <Grid container spacing={2}>
                <Grid size={{xs:6,md:3}}>
                    <StatCard label="Calls" count={summary.callCount} lottieUrl={animations.calls} />
                </Grid>
                <Grid size={{xs:6,md:3}}>
                    <StatCard label="Texts" count={summary.textCount} lottieUrl={animations.texts} />
                </Grid>
                <Grid size={{xs:6,md:3}}>
                    <StatCard label="Emails" count={summary.emailCount} lottieUrl={animations.emails} />
                </Grid>
                <Grid size={{xs:6,md:3}}>
                    <StatCard label="Notes" count={summary.noteCount} lottieUrl={animations.notes} />
                </Grid>
            </Grid>
        </Box>
    );
};

export default ContactStatistics;
