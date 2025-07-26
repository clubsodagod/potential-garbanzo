"use client";

import { Card, CardContent, Typography } from "@mui/material";
import React from "react";

/** Pain Points Section */
const PainPointCard = ({ title, description }: { title: string; description: string }) => (
    <Card variant="outlined" sx={{ height: "100%" }}>
        <CardContent>
            <Typography variant="h6" fontWeight={600} gutterBottom>
                {title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
                {description}
            </Typography>
        </CardContent>
    </Card>
);

export default PainPointCard