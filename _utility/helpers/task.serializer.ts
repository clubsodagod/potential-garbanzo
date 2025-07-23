// /lib/serializers/task.serializer.ts

import { ClientTask } from "@/_library/types-interfaces-classes/client/task.client";
import { ITask } from "@/_library/types-interfaces-classes/task";

/**
 * serializeTask
 *
 * Converts a server-side `ITask` document into a `ClientTask` object suitable for frontend use.
 * Useful for sending clean and simplified task data to the client via API responses or UI rendering.
 *
 * @param {ITask} task - The full server-side task document (including MongoDB ObjectId, dates, and relational references).
 * @returns {ClientTask} A plain object containing safe, stringified, and UI-ready task data.
 */
export function serializeTask(task: ITask): ClientTask {
    return {
        /**
         * Stringified MongoDB ObjectId representing the task.
         */
        id: task._id?.toString() || "",

        /**
         * Discriminator type of the task (e.g., "AdminVerification").
         */
        type: task.type,

        /**
         * Current status of the task.
         */
        status: task.status,

        /**
         * ID of the user who created the task.
         */
        createdBy: task.createdBy?.toString?.() || "",

        /**
         * Optional ID of the user assigned to the task.
         */
        assignedTo: task.assignedTo?.toString?.(),

        /**
         * Optional due date (converted to ISO string).
         */
        dueDate: task.dueDate?.toISOString(),

        /**
         * Optional short description or admin comment for the task.
         */
        comments: task.comments,

        /**
         * Optional list of notes associated with the task.
         */
        notes: task.notes,

        /**
         * Task creation timestamp as ISO string.
         */
        createdAt: task.createdAt?.toISOString(),

        /**
         * Task last update timestamp as ISO string.
         */
        updatedAt: task.updatedAt?.toISOString(),
    };
}
