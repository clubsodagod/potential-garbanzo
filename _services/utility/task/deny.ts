"use server";

import { taskRepository } from "@/_services/task/task.repository";


export async function denyTask(taskId: string): Promise<boolean> {
    return taskRepository.updateStatus(taskId, "rejected");
}
