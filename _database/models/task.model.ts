// /models/task.model.ts

import { ITask } from "@/_library/types-interfaces-classes/task";
import { Schema, model, models, Document } from "mongoose";

/**
 * Mongoose schema options for base task model.
 * Enables automatic timestamping and task type discrimination.
 */
const baseOptions = {
    timestamps: true,
    discriminatorKey: "type",
};

/**
 * BaseTaskSchema
 *
 * Defines the common fields shared across all task types.
 * These include metadata, ownership, and workflow tracking fields.
 */
const BaseTaskSchema = new Schema<ITask & Document>(
    {
        /**
         * Type discriminator used to distinguish task variants (e.g., "AdminVerification").
         */
        type: { type: String, required: true },

        /**
         * Status of the task.
         */
        status: {
            type: String,
            enum: ["pending", "approved", "rejected", "completed", "cancelled"],
            default: "pending",
        },

        /**
         * User who created the task.
         */
        createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true },

        /**
         * Optional user assigned to complete the task.
         */
        assignedTo: { type: Schema.Types.ObjectId, ref: "User" },

        /**
         * Optional due date for task completion.
         */
        dueDate: { type: Date },

        /**
         * Optional comment explaining the task.
         */
        comments: { type: String },

        /**
         * Optional array of notes related to the task.
         */
        notes: [{ type: String }],

        /**
         * Flexible metadata container for task-specific information.
         */
        metadata: { type: Schema.Types.Mixed },
    },
    baseOptions
);

/**
 * TaskModel
 *
 * The base Mongoose model for all task documents. Uses `type` as a discriminator key.
 */
const TaskModel = models.Task || model<ITask & Document>("Task", BaseTaskSchema);

/**
 * Registers the "AdminVerification" discriminator if not already registered.
 */
const discriminatorName = "AdminVerification";

// ✅ Check if discriminator is already attached
const hasDiscriminator = TaskModel.discriminators?.[discriminatorName];


/**
 * AdminVerificationSchema
 *
 * Discriminator schema for tasks involving manual admin approval of user accounts.
 * Adds fields specific to the verification process.
 */
if (!hasDiscriminator) {
    const AdminVerificationSchema = new Schema(
        {
            /**
             * ID of the user being verified.
             */
            userToVerifyId: { type: Schema.Types.ObjectId, ref: "User", required: true },

            /**
             * Email address of the user being verified.
             */
            userEmail: { type: String, required: true },

            /**
             * Verification token associated with the user.
             */
            verificationToken: { type: String, required: true },

            /**
             * Optional admin ID of the user who approved or rejected the request.
             */
            approvedBy: { type: Schema.Types.ObjectId, ref: "User" },

            /**
             * Optional timestamp indicating when the decision was made.
             */
            decisionDate: { type: Date },

            /**
             * Optional notes or reasoning for the verification decision.
             */
            decisionNotes: { type: String },
        },
        { _id: false }
    );

    TaskModel.discriminator(discriminatorName, AdminVerificationSchema);
}


export { TaskModel };
