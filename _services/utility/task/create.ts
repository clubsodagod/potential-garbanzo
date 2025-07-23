"use server";

import { ITask } from "@/_library/types-interfaces-classes/task";
import { taskRepository } from "@/_services/task/task.repository";

export async function createTask(task: Partial<ITask>): Promise<ITask | null> {
    return taskRepository.create(task);
}
