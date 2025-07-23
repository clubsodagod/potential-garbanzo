"use client";

import React from "react";
import {
    Card,
    CardContent,
    Typography,
    Button,
    Box,
    Stack,
    Divider,
} from "@mui/material";
import { ITask } from "@/_library/types-interfaces-classes/task";

/**
 * Props for PrioritizedTasksModule
 */
interface PrioritizedTasksModuleProps {
    tasks: ITask[];

    /**
     * Setter to change the current dashboard module (e.g. return to summary)
     */
    setCurrentModule: React.Dispatch<React.SetStateAction<number>>;
}

/**
 * PrioritizedTasksModule
 *
 * Displays a list of prioritized tasks (e.g. user approval).
 * Supports approval or denial of admin-level tasks.
 *
 * @component
 * @param {PrioritizedTasksModuleProps} props
 * @returns {JSX.Element}
 */
const PrioritizedTasksModule: React.FC<PrioritizedTasksModuleProps> = ({
    tasks,
    setCurrentModule,
}) => {
    const adminApprovalTasks = tasks.filter((t) => t.type === "AdminVerification");

    const handleApprove = (task: ITask) => {
        console.log("Approving user:", task.userToVerifyId);
        // TODO: implement approveUser(task._id)
    };

    const handleDeny = (task: ITask) => {
        console.log("Denying user:", task.userToVerifyId);
        // TODO: implement denyUser(task._id)
    };

    return (
        <Box className="space-y-4 w-full">
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <Typography variant="h6" fontWeight={600}>
                    User Approval Tasks
                </Typography>
                <Button variant="outlined" size="small" onClick={() => setCurrentModule(0)}>
                    ← Back to Dashboard
                </Button>
            </Box>

            {adminApprovalTasks.length === 0 ? (
                <Typography variant="body2" color="textSecondary">
                    No admin approval tasks at the moment.
                </Typography>
            ) : (
                adminApprovalTasks.map((task) => {
                    const fullName =
                        task.metadata?.firstName || task.metadata?.lastName
                            ? `${task.metadata?.firstName ?? ""} ${task.metadata?.lastName ?? ""}`.trim()
                            : null;

                    const displayName = fullName || task.metadata?.username || task.userEmail;

                    return (
                        <Card
                            key={task._id}
                            className="shadow-md border border-gray-200 dark:border-gray-800"
                        >
                            <CardContent>
                                <Stack spacing={1}>
                                    <Typography variant="subtitle1" fontWeight={600}>
                                        Approve New User: {displayName}
                                    </Typography>

                                    <Typography variant="body2">
                                        Email: {task.userEmail}
                                    </Typography>

                                    <Typography variant="body2">
                                        Submitted:{" "}
                                        {new Date(task.createdAt || "").toLocaleDateString()}
                                    </Typography>

                                    <Typography variant="caption" color="textSecondary">
                                        Task ID: {task._id}
                                    </Typography>

                                    <Divider />

                                    <Box display="flex" justifyContent="flex-end" gap={1}>
                                        <Button
                                            variant="outlined"
                                            size="small"
                                            color="error"
                                            onClick={() => handleDeny(task)}
                                        >
                                            Deny
                                        </Button>

                                        <Button
                                            variant="contained"
                                            size="small"
                                            color="primary"
                                            onClick={() => handleApprove(task)}
                                        >
                                            Approve
                                        </Button>
                                    </Box>
                                </Stack>
                            </CardContent>
                        </Card>
                    );
                })
            )}
        </Box>
    );
};

export default PrioritizedTasksModule;
