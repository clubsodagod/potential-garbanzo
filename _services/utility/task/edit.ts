"use server";

import { revalidatePath } from "next/cache";
import { ITask } from "@/_library/types-interfaces-classes/task";
import { taskRepository } from "@/_services/task/task.repository";

/**
 * Updates a task with new values.
 *
 * @param taskId - MongoDB ID of the task to update
 * @param updates - Partial task fields to update
 * @returns The updated task or null
 */
export async function editTask(
    taskId: string,
    updates: Partial<ITask>
): Promise<ITask | null> {
    const result = await taskRepository.edit(taskId, updates);

    if (result) {
        revalidatePath("/dashboard"); // adjust if needed
    }

    return result;
}
