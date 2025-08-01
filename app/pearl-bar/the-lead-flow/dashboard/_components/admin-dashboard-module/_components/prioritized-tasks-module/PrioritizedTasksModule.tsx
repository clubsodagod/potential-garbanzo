"use client";

import React, { useState } from "react";
import {
    Card,
    CardContent,
    Typography,
    Button,
    Box,
    Stack,
    Divider,
    MenuItem,
    Select,
    SelectChangeEvent,
    FormControl,
    InputLabel,
    Chip,
} from "@mui/material";
import { ITask, TaskStatus, TaskType } from "@/_library/types-interfaces-classes/task";
import { useTaskContext } from "@/_context/useTaskContext";
import toast from "react-hot-toast";

// Legend color map
const statusColorMap: Record<TaskStatus, string> = {
    pending: "#FFF",
    approved: "#E6F4EA",
    rejected: "#FDEAEA",
    completed: "#EAF4FD",
    cancelled: "#F4F4F4",
};

interface PrioritizedTasksModuleProps {
    tasks: ITask[];
    setCurrentModule: React.Dispatch<React.SetStateAction<number>>;
    refresh: () => Promise<void>;
}

const PrioritizedTasksModule: React.FC<PrioritizedTasksModuleProps> = ({
    tasks,
    setCurrentModule,
    refresh,
}) => {
    const { task } = useTaskContext();
console.log(tasks);

    const [statusFilter, setStatusFilter] = useState<TaskStatus | "all">("all");
    const [typeFilter, setTypeFilter] = useState<TaskType | "all">("all");

    const handleStatusChange = (event: SelectChangeEvent) => {
        setStatusFilter(event.target.value as TaskStatus | "all");
    };

    const handleTypeChange = (event: SelectChangeEvent) => {
        setTypeFilter(event.target.value as TaskType | "all");
    };

    const handleApprove = async (taskObj: ITask) => {
        try {
            await task.admin.accounts.approve(taskObj._id as string);
            toast.success(`User approved: ${taskObj.userEmail}`);
            await refresh();
        } catch (error) {
            console.error(error);
            toast.error("Failed to approve user.");
        }
    };

    const handleDeny = async (taskObj: ITask) => {
        try {
            await task.admin.accounts.deny(taskObj._id as string);
            toast.success(`User denied: ${taskObj.userEmail}`);
            await refresh();
        } catch (error) {
            console.error(error);
            toast.error("Failed to deny user.");
        }
    };

    // Filtered tasks
    const visibleTasks = tasks.filter((t) => {
        console.log(t);
        
        const statusMatch = statusFilter === "all" || t.status === statusFilter;
        const typeMatch = typeFilter === "all" || t.type === typeFilter;
        return statusMatch && typeMatch;
    });

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

            {/* Legend */}
            <Box display="flex" gap={2} flexWrap="wrap">
                {Object.entries(statusColorMap).map(([status, color]) => (
                    <Chip
                        key={status}
                        label={status}
                        style={{
                            backgroundColor: color,
                            border: "1px solid #ccc",
                            fontSize: 12,
                        }}
                    />
                ))}
            </Box>

            {/* Filters */}
            <Box display="flex" gap={2} pt={1}>
                <FormControl size="small" sx={{ minWidth: 150 }}>
                    <InputLabel>Status</InputLabel>
                    <Select value={statusFilter} label="Status" onChange={handleStatusChange}>
                        <MenuItem value="all">All Statuses</MenuItem>
                        {Object.keys(statusColorMap).map((status) => (
                            <MenuItem key={status} value={status}>
                                {status}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <FormControl size="small" sx={{ minWidth: 180 }}>
                    <InputLabel>Task Type</InputLabel>
                    <Select value={typeFilter} label="Task Type" onChange={handleTypeChange}>
                        <MenuItem value="all">All Types</MenuItem>
                        <MenuItem value="AdminVerification">AdminVerification</MenuItem>
                    </Select>
                </FormControl>
            </Box>

            {/* Task List */}
            {visibleTasks.length === 0 ? (
                <Typography variant="body2" color="textSecondary">
                    No matching tasks.
                </Typography>
            ) : (
                visibleTasks.map((task) => {
                    const fullName =
                        task.createdBy?.firstName || task.createdBy?.lastName
                            ? `${task.createdBy?.firstName ?? ""} ${task.createdBy?.lastName ?? ""}`.trim()
                            : null;

                    const displayName = fullName || task.createdBy?.username || task.userEmail;

                    return (
                        <Card
                            key={task._id}
                            className="shadow-md border border-gray-200 dark:border-gray-800"
                            sx={{ backgroundColor: statusColorMap[task.status] }}
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
                                            disabled={task.status !== "pending"}
                                        >
                                            Deny
                                        </Button>

                                        <Button
                                            variant="contained"
                                            size="small"
                                            color="primary"
                                            onClick={() => handleApprove(task)}
                                            disabled={task.status !== "pending"}
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
