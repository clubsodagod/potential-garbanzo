"use client";

import React from "react";
import { Card, CardContent, Typography, LinearProgress, Box } from "@mui/material";
import { ITask } from "@/_library/types-interfaces-classes/task";
import { calculateTaskProgress } from "@/_utility/helpers/calculate-task-stats.helper";

/**
 * Props for TaskSummaryCard
 */
interface TaskSummaryCardProps {
    tasks: ITask[];
    title?: string;
}

/**
 * TaskSummaryCard
 *
 * Displays a summary card of all task types and progress metrics.
 *
 * @component
 * @param {TaskSummaryCardProps} props - List of tasks to summarize
 * @returns {JSX.Element}
 */
const TaskSummaryCard: React.FC<TaskSummaryCardProps> = ({ tasks, title = "Task Summary" }) => {
    const stats = calculateTaskProgress(tasks);

    return (
        <Card sx={{
            borderRadius:4
        }} className="shadow-md dark:bg-[#0f0f0f] border border-gray-200 dark:border-gray-800 rounded-4xl ">
            <CardContent>
                <Typography variant="h6" fontWeight={600} gutterBottom>
                    {title}
                </Typography>

                <Box mb={1}>
                    <LinearProgress
                        variant="determinate"
                        value={stats.progressPercent}
                        sx={{ height: 8, borderRadius: 4 }}
                    />
                </Box>

                <Box display="flex" justifyContent="space-between">
                    <Stat label="Total" value={stats.total} />
                    <Stat label="Completed" value={stats.completed} />
                    <Stat label="Approved" value={stats.approved} />
                    <Stat label="Rejected" value={stats.rejected} />
                </Box>
            </CardContent>
        </Card>
    );
};

const Stat: React.FC<{ label: string; value: number }> = ({ label, value }) => (
    <Box textAlign="center">
        <Typography variant="h6">{value}</Typography>
        <Typography variant="caption" color="textSecondary">
            {label}
        </Typography>
    </Box>
);

export default TaskSummaryCard;
