import { IRealEstateLeadListDocumentV2 } from "@/_database/models/leads/list.model";
import { RealEstateLead } from "@/_database/models/leads/real-estate.model";
import { IRealEstateLead, RealEstateLeadDocument } from "@/_library/types-interfaces-classes/leads";

/**
 * Serializes a raw MongoDB document (from `.lean()`) into a typed IRealEstateLead.
 * This ensures type safety and strips out any extra internal MongoDB fields like `__v`.
 *
 * @param {any} doc - The raw MongoDB object from `.lean()`.
 * @returns {IRealEstateLead} - A validated and typed real estate lead object.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const serializeRealEstateLead = (doc: RealEstateLead): IRealEstateLead => {
    
    return {
        _id:doc._id?.toString()||"",
        leadType: doc.leadType,
        leadStatus: doc.leadStatus,
        batchrankScoreCategory: doc.batchrankScoreCategory,
        property: doc.property,
        owner: doc.owner,
        loanInfo: doc.loanInfo,
        foreclosureInfo: doc.foreclosureInfo,
        investmentHighlight: doc.investmentHighlight,
        // You can optionally spread only necessary timestamps:
        createdAt: doc.createdAt,
        updatedAt: doc.updatedAt,
    };
};
