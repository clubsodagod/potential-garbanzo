import { TaskModel } from "@/_database/models/task.model";
import { ITask, TaskStatus } from "@/_library/types-interfaces-classes/task";

export const taskRepository = {
    async create(task: Partial<ITask>): Promise<ITask | null> {
        try {
            const created = await TaskModel.create(task);
            return created.toObject();
        } catch (e) {
            console.error("Error creating task:", e);
            return null;
        }
    },

    async edit(taskId: string, updates: Partial<ITask>): Promise<ITask | null> {
        try {
            const updated = await TaskModel.findByIdAndUpdate(taskId, updates, {
                new: true,
            });
            return updated?.toObject() || null;
        } catch (e) {
            console.error("Error updating task:", e);
            return null;
        }
    },

    async delete(taskId: string): Promise<boolean> {
        try {
            await TaskModel.findByIdAndDelete(taskId);
            return true;
        } catch {
            return false;
        }
    },

    async updateStatus(taskId: string, status: TaskStatus): Promise<boolean> {
        try {
            await TaskModel.findByIdAndUpdate(taskId, { status });
            return true;
        } catch {
            return false;
        }
    },
};
