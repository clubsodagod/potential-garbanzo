"use server";

import { taskRepository } from "@/_services/task/task.repository";
import { IResponseStatus } from "@/_library/types-interfaces-classes/common";
import { ITask } from "@/_library/types-interfaces-classes/task";
import { sendEmail } from "@/_utility/helpers/send-email.helper";
import { getTaskById } from "./get-task-by-id";
import  UserAccountApprovalStatusEmail  from "@/app/emails/UserAccountApprovalStatusEmail";

/**
 * approveTask
 *
 * Approves a user account verification task by updating its status
 * and notifying the user via email.
 *
 * @async
 * @param {string} taskId - The ID of the task to approve.
 * @returns {Promise<IResponseStatus<ITask | null>>} - Response object indicating success or failure, and updated task if available.
 *
 * @example
 * const result = await approveTask("64abc12345de");
 * if (result.success) console.log("Task approved!");
 */
export async function approveTask(taskId: string): Promise<IResponseStatus<ITask | null>> {
    try {
        // Step 1: Update the task status
        const updated = await taskRepository.updateStatus(taskId, "approved");

        if (!updated) {
            return {
                success: false,
                message: "Failed to update task status.",
                data: null,
                error:true
            };
        }

        // Step 2: Retrieve the task to access user details
        const task = await getTaskById(taskId);
        if (!task || task.type !== "AdminVerification") {
            return {
                success: false,
                message: "Approved task not found or invalid type.",
                data: null,
                error:true
            };
        }

        const { userEmail, createdBy } = task;

        if (!userEmail) {
            return {
                success: false,
                message: "Task does not have a user email.",
                data: task,
                error:true
            };
        }

        // Step 3: Construct recipient name and send email
        const fullName = `${createdBy?.firstName ?? ""} ${createdBy?.lastName ?? ""}`.trim() || "User";

        try {
            const email = await sendEmail({
                to: userEmail,
                subject: "✅ Your account has been approved",
                component: UserAccountApprovalStatusEmail({
                    status:"approved",
                    fullName:fullName
                }),
            })

            console.log(email);
            
        } catch (emailErr) {
            console.error("Task approved but email failed:", emailErr);
            return {
                success: true,
                message: "Task approved, but email notification failed.",
                data: task,
                error:true
            };
        }

        return {
            success: true,
            message: "Task approved and user notified.",
            data: task,
                error:false
        };
    } catch (error) {
        console.error("Unexpected error in approveTask:", error);
        return {
            success: false,
            message: "Internal server error while approving task.",
            data: null,
                error:true
        };
    }
}
