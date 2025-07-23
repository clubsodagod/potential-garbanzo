import React from "react";

import AdministratorDashboardModule from "../../_components/admin-dashboard-module/AdministratorDashboardModule";
import { IUser } from "@/_database/models/user.model";
import { fetchAllAdmins } from "@/_utility/fetchers/user/fetch-all-admin-users.fetcher";
import { getUserByUsername } from "@/_utility/fetchers/user/get-user-by-username.fetcher";
import { IResponseStatus } from "@/_library/types-interfaces-classes/common";

/**
 * Generates static params for usernames to support static site generation.
 * @returns Array of route params with usernames
 */
export async function generateStaticParams() {
    // You may want to filter active users only or limit by role
    const users: IResponseStatus<IUser[]> = await fetchAllAdmins(); // you can scope to admin users

    return (users?.data ?? []).map((user) => ({
        username: user.username,
    }));
}




/**
 * AdministratorDashboardPage
 *
 * Loads the administrator dashboard for a specific user via username.
 */

// ✅ Inline prop typing — avoids build mismatch with internal PageProps
export default async function AdministratorDashboardPage({
    params,
// eslint-disable-next-line @typescript-eslint/no-explicit-any
}:any) {
    const user = await getUserByUsername(params.username);

    if (!user) {
        return <div>User not found</div>;
    }

    return <AdministratorDashboardModule user={user} />;
}
