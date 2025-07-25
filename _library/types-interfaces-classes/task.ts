/* eslint-disable @typescript-eslint/no-explicit-any */
// /types/task.ts

import { IUser } from "@/_database/models/user.model";

/**
 * Represents the status of a task during its lifecycle.
 */
export type TaskStatus =
    | "pending"
    | "approved"
    | "rejected"
    | "completed"
    | "cancelled";

/**
 * Defines the types of tasks supported in the system.
 * Add new types here and extend the `ITask` union below.
 */
export type TaskType = "AdminVerification";

/**
 * Base interface for all task types.
 * Provides common fields shared by all tasks.
 */
export interface IBaseTask {
    /**
     * Optional unique identifier of the task (assigned by database).
     */
    _id?: string;

    /**
     * Discriminator key for task type.
     */
    type: TaskType;

    /**
     * The current status of the task.
     */
    status: TaskStatus;

    /**
     * The user who created the task.
     */
    createdBy: IUser;

    /**
     * Optional assignee responsible for completing the task.
     */
    assignedTo?: IUser["_id"];

    /**
     * Timestamp when the task was created.
     */
    createdAt?: Date;

    /**
     * Timestamp when the task was last updated.
     */
    updatedAt?: Date;

    /**
     * Optional due date for task completion.
     */
    dueDate?: Date;

    /**
     * Optional short comment describing the task.
     */
    comments?: string;

    /**
     * Optional array of notes related to task progress or decisions.
     */
    notes?: string[];

    /**
     * Optional flexible field for storing additional data.
     */
    metadata?: Record<string, any>;
}

/**
 * Task interface specifically for verifying user accounts by an admin.
 * Used in workflows where an admin must manually approve or reject a user.
 */
export interface IAdminVerificationTask extends IBaseTask {
    /**
     * The type discriminator for this task.
     */
    type: "AdminVerification";

    /**
     * The ID of the user being verified.
     */
    userToVerifyId: IUser["_id"];

    /**
     * Email of the user being verified.
     */
    userEmail: string;

    /**
     * Verification token associated with the user’s email.
     */
    verificationToken: string;

    /**
     * Optional admin ID who approved or rejected the verification.
     */
    approvedBy?: IUser["_id"];

    /**
     * Optional timestamp when the decision was made.
     */
    decisionDate?: Date;

    /**
     * Optional reason or summary of the decision outcome.
     */
    decisionNotes?: string;
}

/**
 * Union type representing all supported task types.
 * Extend this union as new task interfaces are added.
 */
export type ITask = IAdminVerificationTask;
