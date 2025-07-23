"use client";

import React, { JSX } from "react";
import { IUser } from "@/_database/models/user.model";
import ProfileCard from "../common/ProfileCard";
import TaskSummaryCard from "../admin-dashboard-module/_components/TaskSummaryCard";

/**
 * Props for DashboardSummary
 */
interface DashboardSummaryProps {
    user: IUser;

    /**
     * Setter function to update the active module in the dashboard
     */
    setCurrentModule: React.Dispatch<React.SetStateAction<number>>;
}

/**
 * DashboardSummary
 *
 * Displays profile, task summary, and admin overview widgets.
 *
 * @param {DashboardSummaryProps} props - The full user document and module setter
 * @returns {JSX.Element}
 */
const DashboardSummary: React.FC<DashboardSummaryProps> = ({
    user,
    setCurrentModule,
}: DashboardSummaryProps): JSX.Element => {
    return (
        <div className="flex flex-col md:flex-row gap-4">
            {/* Left Column: Profile + Tasks */}
            <div className="flex flex-col md:flex-row w-full md:w-2/3 gap-4">
                <div className="md:w-1/4">
                    <ProfileCard
                        user={user}
                        totalCalls={10}
                        totalTexts={230}
                        totalEmails={120}
                    />
                </div>

                <div className="flex flex-col gap-4 md:w-3/4">
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="md:w-1/2 cursor-pointer"
                                onClick={() => setCurrentModule(1)}>
                            <TaskSummaryCard tasks={user.tasks || []} />
                        </div>

                        <div className="md:w-1/2">{/* <AdditionalTasksModule /> */}</div>
                    </div>

                    {/* <TaskProgressBar /> */}
                </div>
            </div>

            {/* Right Column: Showings */}
            <div className="w-full md:w-1/3">{/* <PropertyShowingsSchedule /> */}</div>
        </div>
    );
};

export default DashboardSummary;
