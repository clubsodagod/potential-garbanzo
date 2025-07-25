import { ClientTask } from "@/_library/types-interfaces-classes/client/task.client";
import { ITask, IAdminVerificationTask } from "@/_library/types-interfaces-classes/task";
import { serializeUserSync } from "./user-serializer.sync";

/**
 * serializeTask
 *
 * Converts a server-side `ITask` document into a `ClientTask` object suitable for frontend use.
 * Handles the `AdminVerification` discriminator fields.
 *
 * @param {ITask} task - The full server-side task document (including Mongoose ObjectId, dates, and references).
 * @returns {ClientTask} A plain object containing safe, stringified, and UI-ready task data.
 */
export function serializeTask(task: ITask): ClientTask {
    const base = {
        _id: `${task._id ?? ""}`,
        type: task.type,
        status: task.status,
        createdBy: serializeUserSync(task.createdBy),
        assignedTo: task.assignedTo?.toString(),
        dueDate: task.dueDate?.toISOString(),
        comments: task.comments,
        notes: task.notes,
        createdAt: task.createdAt?.toISOString(),
        updatedAt: task.updatedAt?.toISOString(),
    };

    // Handle discriminator-specific fields
    if (task.type === "AdminVerification") {
        const adminTask = task as IAdminVerificationTask;

        return {
            ...base,
            userToVerifyId: adminTask.userToVerifyId?.toString()||"",
            userEmail: adminTask.userEmail,
            verificationToken: adminTask.verificationToken,
            approvedBy: adminTask.approvedBy?.toString(),
            decisionDate: adminTask.decisionDate?.toISOString(),
            decisionNotes: adminTask.decisionNotes,
        } as unknown as ClientTask;
    }

    return base as unknown as ClientTask;
}
