import { Service, TaskService } from "../services";
import { ITask } from "../task";

export interface TaskContextState {
    task: Service<TaskService>;

    tasks: ITask[];
    loading: boolean;
    error: string | null;

    refreshTasks: (userId: string) => Promise<void>;
}
