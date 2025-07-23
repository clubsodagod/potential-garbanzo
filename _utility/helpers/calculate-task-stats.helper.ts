// /lib/helpers/task/calculate-task-stats.ts

import { ITask } from "@/_library/types-interfaces-classes/task";

export interface TaskProgressSummary {
    total: number;
    completed: number;
    approved: number;
    rejected: number;
    progressPercent: number; // % of completed/approved/rejected over total
}

/**
 * Calculates task status summary and progress percentage.
 *
 * @param {ITask[]} tasks - The array of task documents
 * @returns {TaskProgressSummary} Summary stats
 */
export function calculateTaskProgress(tasks: ITask[]): TaskProgressSummary {
    const total = tasks.length;

    const completed = tasks.filter((t) => t.status === "completed").length;
    const approved = tasks.filter((t) => t.status === "approved").length;
    const rejected = tasks.filter((t) => t.status === "rejected" || t.status === "cancelled").length;

    const resolved = completed + approved + rejected;
    const progressPercent = total > 0 ? Math.round((resolved / total) * 100) : 0;

    return {
        total,
        completed,
        approved,
        rejected,
        progressPercent,
    };
}
