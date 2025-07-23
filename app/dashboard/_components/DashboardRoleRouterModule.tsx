"use client";

import React, { useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { CircularProgress, Typography, Box } from "@mui/material";
import UserDashboardModule from "./user-dasboard-module/UserDashboardModule";

/**
 * Props for DashboardRoleRouterModule
 */
interface DashboardRoleRouterModuleProps {
    /**
     * The user ID (ObjectId as string) expected for the current dashboard route.
     */
    userId: string;

    /**
     * The username of the current user, used for admin dashboard routing.
     */
    username: string;
}

/**
 * DashboardRoleRouterModule
 *
 * Routes the user to the appropriate dashboard based on session and role:
 * - If the session user ID does not match the passed `userId`, the user is signed out and redirected to registration.
 * - If the user is an admin (role === 0), they are redirected to the admin dashboard route.
 * - If the user is a standard user (role === 1), the user dashboard module is rendered.
 *
 * @param {DashboardRoleRouterModuleProps} props - The expected user ID and username for route validation and redirecting.
 * @returns {JSX.Element} Component that routes or renders based on user session and role.
 */
const DashboardRoleRouterModule: React.FC<DashboardRoleRouterModuleProps> = ({ userId, username }) => {
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (status === "loading") return;

        const handleRouting = async () => {
            if (!session?.user) {
                router.replace("/register");
                return;
            }

            const sessionUserId = session.user._id;

            // If session user does not match route user, force logout and redirect
            if (sessionUserId !== userId) {
                await signOut({ redirect: false });
                router.replace("/register");
                return;
            }

            const userRole = session.user.role;
            if (userRole === "admin") {
                router.push(`/dashboard/${username}/administrator`);
            }
        };

        handleRouting();
    }, [session, status, userId, username, router]);

    if (status === "loading") {
        return (
            <Box display="flex" alignItems="center" justifyContent="center" minHeight="60vh">
                <CircularProgress />
                <Typography variant="body2" ml={2}>
                    Checking credentials...
                </Typography>
            </Box>
        );
    }

    // Standard user dashboard render
    if (session?.user?.role === "partner") {
        return <UserDashboardModule />;
    }

    // Fallback for unhandled role or missing session
    return null;
};

export default DashboardRoleRouterModule;
