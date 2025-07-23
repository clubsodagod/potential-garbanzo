"use client"
import React from "react";
import DashboardHeader from "../common/DashboardHeader";
import { IUser } from "@/_database/models/user.model";
import ProfileCard from "../common/ProfileCard";
import TaskSummaryCard from "./_components/TaskSummaryCard";
import DashboardSummary from "../common/DashboardSummary";
import { getDashboardModuleView } from "@/_utility/helpers/dashboard/get-dashboard-module-view";

interface AdministratorDashboardModuleProps {
    /**
     * Full user object passed from the route loader
     */
    user: IUser;
}

/**
 * AdministratorDashboardModule
 *
 * Main module for rendering personalized admin dashboard UI.
 */
const AdministratorDashboardModule: React.FC<AdministratorDashboardModuleProps> = ({
    user,
}) => {

    const [currentModule,setCurrentModule] = React.useState<number>(0);

    return (
        <section className="w-full">
            <div className="flex flex-col gap-4">
                {/* Greeting Header */}

                <DashboardHeader firstName={user.firstName} />

                {/* Main Content */}
                {getDashboardModuleView(currentModule, user, setCurrentModule)}
            </div>
        </section>
    );
};

export default AdministratorDashboardModule;
