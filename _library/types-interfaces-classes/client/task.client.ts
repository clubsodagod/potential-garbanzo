// /types/client/task.client.ts

/**
 * ClientTask
 *
 * Represents a task object formatted for client-side consumption (e.g., in a React app or frontend API).
 * This interface is typically the result of serializing a full server-side task document.
 */
export interface ClientTask {
    /**
     * Unique identifier of the task (stringified MongoDB ObjectId).
     */
    id: string;

    /**
     * Discriminator for the type of task (e.g., "AdminVerification").
     */
    type: string;

    /**
     * Current status of the task (e.g., "pending", "completed").
     */
    status: string;

    /**
     * ID of the user who created the task.
     */
    createdBy: string;

    /**
     * Optional ID of the user currently assigned to complete the task.
     */
    assignedTo?: string;

    /**
     * Optional ISO timestamp string representing the task’s due date.
     */
    dueDate?: string;

    /**
     * Optional short description or comment about the task.
     */
    comments?: string;

    /**
     * Optional list of progress or admin notes associated with the task.
     */
    notes?: string[];

    /**
     * ISO timestamp string indicating when the task was created.
     */
    createdAt?: string;

    /**
     * ISO timestamp string indicating the last time the task was updated.
     */
    updatedAt?: string;
}
