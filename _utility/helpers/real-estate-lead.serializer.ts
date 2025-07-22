import { IRealEstateLeadDocument, IRELead } from "@/_library/types-interfaces-classes/leads";


/**
 * Serializes a raw MongoDB document (from `.lean()` or `.find()`) into a typed `IRELead`.
 * This ensures type safety and strips out internal MongoDB fields like `__v`.
 *
 * @param {IRealEstateLeadDocument} doc - The raw MongoDB document.
 * @returns {IRELead} - A validated and typed real estate lead object.
 */
export const serializeRealEstateLead = (doc: IRealEstateLeadDocument): IRELead => {
    return {
        _id: doc._id?.toString() || "",
        leadType: doc.leadType,
        leadStatus: doc.leadStatus,
        batchrankScoreCategory: doc.batchrankScoreCategory,

        property: { ...doc.property },
        owner: [...doc.owner],
        loanInfo: doc.loanInfo,
        foreclosureInfo: doc.foreclosureInfo,
        investmentHighlight: doc.investmentHighlight,
        mailingInfo: doc.mailingInfo,
        metadata: doc.metadata,

        leadInteractionHistory: doc.leadInteractionHistory?.map((entry) => ({
            _id: entry._id?.toString(),
            userId: entry.userId?.toString?.() ?? "",
            actionType: entry.actionType,
            note: entry.note,
            callCount: entry.callCount,
            leadSnapshot:entry.leadSnapshot.toString(),
            timestamp: entry.timestamp.toString(),
            metadata: entry.metadata,
            createdAt: entry.createdAt instanceof Date ? entry.createdAt.toISOString() : entry.createdAt,
            updatedAt: entry.updatedAt instanceof Date ? entry.updatedAt.toISOString() : entry.updatedAt,
        })) ?? [],

        additionalData: doc.additionalData,
        createdAt: doc.createdAt,
        updatedAt: doc.updatedAt,
    };
};
