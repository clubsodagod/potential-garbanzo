"use server"
import connectToDB from "@/_database/connect-to-db.database";
import { LeadRecordModel } from "@/_database/models/leads/real-estate-lead-record.model";
import { LeadInteractionPayload } from "@/_library/types-interfaces-classes/leads";

/**
 * Logs an interaction with a lead (call, text, email, note, etc.).
 *
 * @param payload - Details of the lead interaction to log
 * @throws Will throw an error if DB connection fails or document save fails
 * @returns Promise<{ error: boolean; message: string }>
 */
export async function logLeadInteraction(
    payload: LeadInteractionPayload
): Promise<{ error: boolean; message: string }> {
    try {
        await connectToDB();

        const {
            leadId,
            user,
            actionType,
            note,
            metadata,
            callCount = 1,
            timestamp = new Date(),
        } = payload;

        const leadRecord = new LeadRecordModel({
            userId: user._id,
            actionType,
            note,
            callCount,
            timestamp,
            metadata,
            leadSnapshot: leadId,
        });

        await leadRecord.save();

        return {
            error: false,
            message: `Interaction of type "${actionType}" logged successfully.`,
        };
    } catch (err) {
        console.error("logLeadInteraction error:", err);
        return {
            error: true,
            message: "Failed to log lead interaction. Please try again.",
        };
    }
}