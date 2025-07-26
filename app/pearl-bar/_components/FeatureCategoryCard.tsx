"use client";

import { Card, CardContent, Typography } from "@mui/material";
import React from "react";


const FeatureCategoryCard = ({ icon, title, description }: { icon: string; title: string; description: string }) => (
    <Card sx={{ height: "100%" }}>
        <CardContent>
            <Typography variant="h4" gutterBottom>
                {icon}
            </Typography>
            <Typography variant="h6" fontWeight={600} gutterBottom>
                {title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
                {description}
            </Typography>
        </CardContent>
    </Card>
);

export default FeatureCategoryCard