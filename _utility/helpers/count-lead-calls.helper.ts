import connectToDB from "@/_database/connect-to-db.database";
import { LeadRecordModel } from "@/_database/models/leads/real-estate-lead-record.model";




/**
 * Counts how many call-type interactions exist for a given lead.
 *
 * @param leadId - The ObjectId of the lead
 * @returns Promise<number>
 */
export async function countLeadCalls(leadId: string): Promise<number> {
    await connectToDB();

    return await LeadRecordModel.countDocuments({
        leadSnapshot: leadId,
        actionType: "call",
    });
}
