'use client';

import React from 'react';
import { Paper, Typography, Box } from '@mui/material';
import { IValueProposition } from '@/_library/types-interfaces-classes/copy';

/**
 * ValuePropositionCard
 *
 * Displays a single value proposition with a title and description.
 *
 * @param {IValueProposition} props - Props for rendering the card
 * @returns {JSX.Element}
 */
const ValuePropositionCard: React.FC<IValueProposition> = ({ title, desc }) => {
    return (
        <article>
            <div
                className=" backdrop-blur-md bg-white/10 border border-white/20 rounded-[34px]  shadow-lg"
            >
                <Paper
                    elevation={3}
                    sx={{
                        padding: 4,
                        maxHeight: 450,
                        height: { xs: "100%", md: 450 },
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: "space-between",
                        textAlign: 'center',
                        borderRadius: "34px",
                        maxWidth: { xs: "100%", md: 400 },
                        position: "relative",
                        bgcolor: "transparent",
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
                    component="div"
                >
                    <Box component="header" mb={2} >
                        <Typography color="#fafafa" variant="h3" component="h3" fontSize="1.5rem" fontWeight={600}>
                            {title}
                        </Typography>
                    </Box>
                    <Typography component="p" fontSize="1.1rem" color="#fafafa">
                        {desc}
                    </Typography>
                </Paper>
            </div>

        </article>
    );
};

export default ValuePropositionCard;
