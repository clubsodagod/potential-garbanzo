"use client";

import React, { createContext, useState, useCallback } from "react";
import { ITask } from "@/_library/types-interfaces-classes/task";
import { TaskContextState } from "@/_library/types-interfaces-classes/context/task-context";
import { taskService } from "@/_services/task/task-service.implementation";

export const TaskContext = createContext<TaskContextState | undefined>(undefined);

export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [tasks, setTasks] = useState<ITask[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const refreshTasks = useCallback(async (userId: string) => {
        setLoading(true);
        try {
            const res = await fetch(`/api/tasks?userId=${userId}`);
            const data = await res.json();
            if (res.ok) {
                setTasks(data);
                setError(null);
            } else {
                setError(data.message || "Failed to load tasks");
            }
        } catch (err) {
            setError("An unexpected error occurred");
        } finally {
            setLoading(false);
        }
    }, []);

    const contextValue: TaskContextState = {
        task: taskService,
        tasks,
        loading,
        error,
        refreshTasks,
    };

    return <TaskContext.Provider value={contextValue}>{children}</TaskContext.Provider>;
};

