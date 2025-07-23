"use client";

import React from "react";
import {
    Card,
    CardContent,
    Typography,
    Avatar,
    Stack,
    Divider,
    Box,
} from "@mui/material";
import { IUser } from "@/_database/models/user.model";
import dayjs from "dayjs";

/**
 * Props for ProfileCard
 */
interface ProfileCardProps {
    /** The current user object */
    user: IUser;
    /** Total number of logged calls */
    totalCalls: number;
    /** Total number of sent text messages */
    totalTexts: number;
    /** Total number of sent emails */
    totalEmails: number;
}

/**
 * ProfileCard
 *
 * Displays a user's avatar, join date, and communication stats.
 *
 * @component
 * @param {ProfileCardProps} props - The user object and stat counts
 * @returns {JSX.Element}
 */
const ProfileCard: React.FC<ProfileCardProps> = ({
    user,
    totalCalls,
    totalTexts,
    totalEmails,
}) => {
    const initials = `${user.firstName?.[0] || ""}${user.lastName?.[0] || ""}`.toUpperCase();
    const joined = dayjs(user.createdAt).format("MMM D, YYYY");

    return (
        <Card
            sx={{
                borderRadius:4
            }}
        className="shadow-md dark:bg-[#0f0f0f] border border-gray-200 dark:border-gray-800 w-full">
            <CardContent>
                <Stack spacing={2} alignItems="center">
                    <Avatar sx={{ width: 72, height: 72, bgcolor: "#60abe4" }}>
                        {initials || "👤"}
                    </Avatar>

                    <Box textAlign="center">
                        <Typography variant="h6" fontWeight={600}>
                            {user.firstName} {user.lastName}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                            Joined {joined}
                        </Typography>
                    </Box>

                    <Divider flexItem />

                    <Box display="flex" justifyContent="space-around" width="100%">
                        <Stat label="Calls" value={totalCalls} />
                        <Stat label="Texts" value={totalTexts} />
                        <Stat label="Emails" value={totalEmails} />
                    </Box>
                </Stack>
            </CardContent>
        </Card>
    );
};

/**
 * Subcomponent to display a stat block
 */
const Stat: React.FC<{ label: string; value: number }> = ({ label, value }) => (
    <Box textAlign="center">
        <Typography variant="h6" fontWeight={600}>
            {value}
        </Typography>
        <Typography variant="caption" color="textSecondary">
            {label}
        </Typography>
    </Box>
);

export default ProfileCard;
