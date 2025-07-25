import { TaskModel } from "@/_database/models/task.model";
import { ITask } from "@/_library/types-interfaces-classes/task";

export async function getTaskById(taskId: string): Promise<ITask | null> {
    return TaskModel.findById(taskId).populate("createdBy").lean<ITask>().exec();
}
