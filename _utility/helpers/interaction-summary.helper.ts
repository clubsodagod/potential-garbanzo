import { LeadRecordDocument } from "@/_database/models/leads/real-estate-lead-record.model";
import { ICleanLeadRecord } from "@/_library/types-interfaces-classes/leads";

export interface InteractionSummary {
    callCount: number;
    emailCount: number;
    textCount: number;
    noteCount: number;
}

/**
 * Generates a summary of interaction types from a list of lead records.
 *
 * @param records - Array of lead interaction records
 * @returns InteractionSummary - Count of each interaction type
 */
export function summarizeInteractions(records: ICleanLeadRecord[]): InteractionSummary {
    const summary: InteractionSummary = {
        callCount: 0,
        emailCount: 0,
        textCount: 0,
        noteCount: 0,
    };

    for (const record of records) {
                console.log(record.actionType);
        switch (record.actionType) {
            case "call":
                
                summary.callCount += record.callCount || 1;
                break;
            case "email":
                summary.emailCount += 1;
                break;
            case "text":
                summary.textCount += 1;
                break;
            case "note":
                summary.noteCount += 1;
                break;
            default:
                break;
        }
    }

    return summary;
}
