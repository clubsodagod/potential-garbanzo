import { IResponseStatus } from "./common";
import { IAdminVerificationTask, ITask } from "./task";


/**
 * TaskService interface with segmented responsibilities (admin & user)
 * This pattern is extensible and follows the interface segregation principle.
 */
export interface TaskService {
    admin: {
        accounts: {
            approve: (taskId: string) => Promise<IResponseStatus<IAdminVerificationTask | null>>;
            deny: (taskId: string) => Promise<boolean>;
        };
        createTask: (task: Partial<ITask>) => Promise<ITask | null>;
        editTask: (taskId: string, updates: Partial<ITask>) => Promise<ITask | null>;
        deleteTask: (taskId: string) => Promise<boolean>;
    };
    user: {
        createTask: (task: Partial<ITask>) => Promise<ITask | null>;
        editTask: (taskId: string, updates: Partial<ITask>) => Promise<ITask | null>;
    };
}

/**
 * Generic service wrapper for typed dependency injection
 */
export type Service<T> = T;
