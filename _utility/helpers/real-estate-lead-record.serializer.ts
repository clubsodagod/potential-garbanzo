import { LeadRecordDocument } from "@/_database/models/leads/real-estate-lead-record.model";
import { ICleanLeadRecord } from "@/_library/types-interfaces-classes/leads";

/**
 * Safely serializes nested date fields (including undefined/null support).
 */
function serializeDate(value?: Date | string): string | undefined {
    return value ? new Date(value).toISOString() : undefined;
}

/**
 * Serializes a single lead record document to a clean, JSON-safe structure.
 *
 * @param record - Raw MongoDB lead record
 * @returns Serialized lead record
 */
export function serializeLeadRecord(record: LeadRecordDocument): ICleanLeadRecord {
    const snapshot = record.leadSnapshot;

    return {
        _id: record._id.toString(),
        userId: record.userId.toString(),
        actionType: record.actionType,
        timestamp: serializeDate(record.timestamp)!,
        note: record.note ?? undefined,
        callCount: record.callCount ?? 0,
        metadata: record.metadata ?? {},

        leadSnapshot: {
            _id: snapshot._id?.toString?.(),
            leadType: snapshot.leadType,
            leadStatus: snapshot.leadStatus,
            batchrankScoreCategory: snapshot.batchrankScoreCategory,

            property: {
                ...snapshot.property,
            },

            owner: snapshot.owner.map(owner => ({
                firstName: owner.firstName,
                lastName: owner.lastName,
                phones: owner.phones.map(phone => ({
                    number: phone.number,
                    type: phone.type,
                })),
                emails: owner.emails ?? [],
            })),

            loanInfo: snapshot.loanInfo && {
                ...snapshot.loanInfo,
                loanRecordingDate: serializeDate(snapshot.loanInfo.loanRecordingDate),
                loanDueDate: serializeDate(snapshot.loanInfo.loanDueDate),
            },

            foreclosureInfo: snapshot.foreclosureInfo && {
                ...snapshot.foreclosureInfo,
                auctionDate: serializeDate(snapshot.foreclosureInfo.auctionDate),
                defaultDate: serializeDate(snapshot.foreclosureInfo.defaultDate),
                recordingDate: serializeDate(snapshot.foreclosureInfo.recordingDate),
            },

            investmentHighlight: snapshot.investmentHighlight ?? undefined,

            createdAt: serializeDate(snapshot.createdAt),
            updatedAt: serializeDate(snapshot.updatedAt),
        },

        createdAt: serializeDate(record.createdAt),
        updatedAt: serializeDate(record.updatedAt),
    };
}

/**
 * Serializes an array of lead records.
 *
 * @param records - Raw documents from MongoDB
 * @returns Array of ICleanLeadRecord
 */
export function serializeLeadRecords(records: LeadRecordDocument[]): ICleanLeadRecord[] {
    return records.map(serializeLeadRecord);
}


