"use client";

import React, { useEffect, useState, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import DashboardHeader from "../common/DashboardHeader";
import { IUser } from "@/_database/models/user.model";
import { getUserByUsername } from "@/_utility/fetchers/user/get-user-by-username.fetcher";
import { getDashboardModuleView } from "@/_utility/helpers/dashboard/get-dashboard-module-view";

/**
 * AdministratorDashboardModule
 *
 * Fetches and displays the admin dashboard based on the username from URL.
 */
const AdministratorDashboardModule: React.FC<{username:string}> = ({username}) => {

    const [user, setUser] = useState<IUser | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [currentModule, setCurrentModule] = useState<number>(0);

    const refreshUser = useCallback(async () => {
        if (!username) return;
        setLoading(true);
        try {
            const fetchedUser = await getUserByUsername(username);
            if (fetchedUser) {
                setUser(fetchedUser);
                setError(null);
            } else {
                setError("User not found");
            }
        } catch (err) {
            setError("Failed to load user");
        } finally {
            setLoading(false);
        }
    }, [username]);

    useEffect(() => {
        refreshUser();
    }, [refreshUser]);

    if (loading) return <div>Loading dashboard...</div>;
    if (error || !user) return <div>{error || "User not found"}</div>;

    return (
        <section className="w-full">
            <div className="flex flex-col gap-4">
                <DashboardHeader firstName={user.firstName} />
                {getDashboardModuleView(currentModule, user, setCurrentModule, refreshUser)}
            </div>
        </section>
    );
};

export default AdministratorDashboardModule;
