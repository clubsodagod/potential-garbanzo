"use client";

import React from "react";
import { Typography, Box } from "@mui/material";

/**
 * Props for the DashboardHeader component.
 */
interface DashboardHeaderProps {
  /** The user's first name for personalized greeting */
  firstName: string;
}

/**
 * DashboardHeader
 *
 * Renders a personalized header inside the dashboard layout using MUI.
 *
 * @param {DashboardHeaderProps} props - Props containing the user's first name
 * @returns {JSX.Element} A styled dashboard greeting header
 */
const DashboardHeader: React.FC<DashboardHeaderProps> = ({ firstName }) => {
  return (
    <Box
      py={2}
      px={3}
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      className="bg-white dark:bg-[#111] border-b border-gray-200 dark:border-gray-800 shadow-sm"
    >
      <Typography variant="h5" fontWeight={600}>
        Welcome back{firstName ? `, ${firstName}` : ""} 👋
      </Typography>
    </Box>
  );
};

export default DashboardHeader;
