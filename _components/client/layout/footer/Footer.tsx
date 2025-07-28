'use client';

import React from 'react';
import { Box, Typography, Container } from '@mui/material';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

/**
 * GlassFooter
 * A minimal, accessible footer with glassmorphism styling and motion slide-up on scroll.
 */
const GlassFooter: React.FC = () => {
    const pathname = usePathname();
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-10% 0px' });

    // Hide navbar on nested Pearl Bar routes (e.g., /pearl-bar/tool-name)
    const hideOnSubPearlBar = pathname.startsWith("/pearl-bar/");

    if (hideOnSubPearlBar) return null;

    return (
        <Box
            component="footer"
            ref={ref}
            role="contentinfo"
            aria-label="Site footer"
            sx={{
                backdropFilter: 'blur(12px)',
                background: 'rgba(255, 255, 255, 0.05)',
                borderTop: '1px solid rgba(255, 255, 255, 0.1)',
                color: 'white',
                py: 2,
                mt: 0,
            }}
        >
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, ease: 'easeOut' }}
            >
                <Container maxWidth="lg">
                    <Typography variant="body2" align="center" aria-label="Copyright and credit">
                        © {new Date().getFullYear()} Pearl Box. All rights reserved.{' '}
                        <span role="img" aria-label="heart">❤️</span>{' '}
                        Designed & Developed by{' '}
                        <Link
                            href="https://maliek-davis.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            color="inherit"
                            aria-label="Visit Maliek Davis website"
                        >
                            Maliek Davis
                        </Link>
                    </Typography>
                </Container>
            </motion.div>
        </Box>
    );
};

export default GlassFooter;
