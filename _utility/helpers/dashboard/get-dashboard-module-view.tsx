import React, { JSX } from "react";
import { IUser } from "@/_database/models/user.model";
import DashboardSummary from "@/app/dashboard/_components/common/DashboardSummary";
import PrioritizedTasksModule from "@/app/dashboard/_components/admin-dashboard-module/_components/prioritized-tasks-module/PrioritizedTasksModule";

/**
 * Props passed into each dashboard module
 */
interface DashboardModuleProps {
    user: IUser;
    setCurrentModule: React.Dispatch<React.SetStateAction<number>>;
}

/**
 * Returns the correct dashboard module view based on role and index
 *
 * @param currentModule - The currently selected module index
 * @param user - The full user object
 * @param setCurrentModule - State updater to allow module switching
 * @returns {JSX.Element} The rendered component for the dashboard module
 */
export function getDashboardModuleView(
    currentModule: number,
    user: IUser,
    setCurrentModule: React.Dispatch<React.SetStateAction<number>>
): JSX.Element {
    const commonProps: DashboardModuleProps = { user, setCurrentModule };

    switch (currentModule) {
        case 0:
            return <DashboardSummary {...commonProps} />;

        case 1:
            return <PrioritizedTasksModule tasks={user.tasks} setCurrentModule={setCurrentModule} />;

        // Future:
        // case 2:
        //   return <MessagesModule {...commonProps} />;
        // case 3:
        //   return <SettingsModule {...commonProps} />;

        default:
            return <DashboardSummary {...commonProps} />;
    }
}
