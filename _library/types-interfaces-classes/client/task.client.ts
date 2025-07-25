import { IUser } from "@/_database/models/user.model";

/**
 * ClientTask
 *
 * Represents a task object formatted for client-side consumption (e.g., in a React app or frontend API).
 * This interface includes both shared fields and discriminator-specific fields.
 */
export interface ClientTask {
    /**
     * Unique identifier of the task (stringified MongoDB ObjectId).
     */
    id: string;

    /**
     * Discriminator for the type of task (e.g., "AdminVerification").
     */
    type: "AdminVerification"; // restrict to known types for now

    /**
     * Current status of the task (e.g., "pending", "completed").
     */
    status: "pending" | "approved" | "rejected" | "completed" | "cancelled";

    /**
     * Serialized user object of the task creator.
     */
    createdBy: IUser;

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

    // ----- AdminVerificationTask-specific fields -----

    /**
     * ID of the user being verified.
     */
    userToVerifyId?: string;

    /**
     * Email of the user being verified.
     */
    userEmail: string;

    /**
     * Verification token associated with the user’s email.
     */
    verificationToken: string;

    /**
     * Optional ID of the admin who approved or rejected the verification.
     */
    approvedBy?: string;

    /**
     * Optional ISO string timestamp when the decision was made.
     */
    decisionDate?: string;

    /**
     * Optional reason or summary of the decision outcome.
     */
    decisionNotes?: string;
}
