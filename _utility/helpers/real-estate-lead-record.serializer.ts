import { ICleanLeadRecord, ISerializedLeadRecord } from "@/_library/types-interfaces-classes/leads";

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
export function serializeLeadRecord(record: ICleanLeadRecord): ISerializedLeadRecord {
    

    return {
        _id: (record._id!).toString(),
        userId: record.userId.toString(),
        actionType: record.actionType,
        timestamp: serializeDate(record.timestamp)!,
        note: record.note ?? undefined,
        callCount: record.callCount ?? 0,
        metadata: record.metadata ?? {},

        leadSnapshot: (record._id!).toString(),

        createdAt: serializeDate(record.createdAt)!,
        updatedAt: serializeDate(record.updatedAt)!,
    };
}

/**
 * Serializes an array of lead records.
 *
 * @param records - Raw documents from MongoDB
 * @returns Array of ICleanLeadRecord
 */
export function serializeLeadRecords(records: ISerializedLeadRecord[]): ISerializedLeadRecord[] {
    return records.map(serializeLeadRecord);
}


