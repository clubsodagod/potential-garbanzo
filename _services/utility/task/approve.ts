"use server";

import { taskRepository } from "@/_services/task/task.repository";


export async function approveTask(taskId: string): Promise<boolean> {
    return taskRepository.updateStatus(taskId, "approved");
}
