"use server";

import { taskRepository } from "@/_services/task/task.repository";
import { revalidatePath } from "next/cache";


/**
 * Deletes a task from the database.
 *
 * @param taskId - The task ID to delete
 * @returns True if successfully deleted, false otherwise
 */
export async function deleteTask(taskId: string): Promise<boolean> {
    const result = await taskRepository.delete(taskId);

    if (result) {
        revalidatePath("/dashboard"); // adjust if needed
    }

    return result;
}
