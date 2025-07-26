"use client"
// Reusable FeatureCategoryCard with glassmorphism and glow

import React from "react"
import { Card, CardContent, Typography } from "@mui/material";

const GlassGlowCard: React.FC<{ icon: string; title: string; description: string }> = ({ icon, title, description }) => (
    <Card
        component="section"
        sx={{
            height: "100%",
            backdropFilter: "blur(16px)",
            background: "rgba(255, 255, 255, 0.15)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            color:"#fafafa",
            borderRadius: 4,
            transition: "0.3s ease",
            boxShadow: "0 0 0 transparent",
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
        <CardContent>
            <Typography variant="h4" component="div" gutterBottom>
                {icon}
            </Typography>
            <Typography variant="h6" component="h3" fontWeight={600} gutterBottom>
                {title}
            </Typography>
            <Typography variant="body2" >
                {description}
            </Typography>
        </CardContent>
    </Card>
);

export default GlassGlowCard