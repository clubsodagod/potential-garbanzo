"use server"
import connectToDB from "@/_database/connect-to-db.database";
import { LeadRecordDocument, LeadRecordModel } from "@/_database/models/leads/real-estate-lead-record.model";
import { RealEstateLeadModel } from "@/_database/models/leads/real-estate.model";
import { ICleanLeadRecord } from "@/_library/types-interfaces-classes/leads";
import { serializeLeadRecords } from "@/_utility/helpers/real-estate-lead-record.serializer";

/**
 * Retrieves the full interaction history for a given lead, sorted by most recent first.
 *
 * @param leadId - The ObjectId of the lead
 * @returns Promise<ICleanLeadRecord[]>
 */
export async function getLeadInteractionHistory(
    leadId: string
): Promise<ICleanLeadRecord[]> {
    await connectToDB();
    await RealEstateLeadModel.find()
    const raw = await LeadRecordModel.find({ leadSnapshot: leadId }).populate("leadSnapshot")
        .sort({ timestamp: -1 })
        .lean()
        .exec() as unknown as LeadRecordDocument[];

    return serializeLeadRecords(raw);
}