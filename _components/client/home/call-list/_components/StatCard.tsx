'use client';

import { Card, CardContent, Typography, Box } from '@mui/material';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import React from 'react';

interface StatCardProps {
    /**
     * Descriptive label shown beneath the animation (e.g., "Calls", "Emails").
     */
    label: string;

    /**
     * The numeric value to display, typically a count of interactions.
     */
    count: number;

    /**
     * URL pointing to a .lottie animation file for the visual.
     */
    lottieUrl: string;
}

/**
 * StatCard Component
 *
 * Displays a compact statistic card with a Lottie animation, a label, and a count.
 * Typically used for summarizing lead contact activity in a dashboard or insights panel.
 *
 * @component
 * @param {StatCardProps} props - Props containing label, count, and lottie animation URL
 * @returns {JSX.Element}
 */
const StatCard: React.FC<StatCardProps> = ({ label, count, lottieUrl }) => {
    return (
        <Card elevation={2} sx={{ borderRadius: 3 }}>
            <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Box sx={{ width: 60, height: 60 }}>
                    <DotLottieReact src={lottieUrl} autoplay loop />
                </Box>
                <Box>
                    <Typography variant="subtitle2" color="textSecondary">
                        {label}
                    </Typography>
                    <Typography variant="h6" fontWeight={600}>
                        {count}
                    </Typography>
                </Box>
            </CardContent>
        </Card>
    );
};

export default StatCard;
