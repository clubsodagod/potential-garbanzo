import { serializeRealEstateLead } from "./real-estate-lead.serializer";

/**
 * Serializes a raw list document into a clean DTO,
 * including its populated leads using nested serialization.
 *
 * @param {any} doc - The raw MongoDB list document.
 * @returns {object} - Serialized list object with leads.
 */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const serializeRealEstateLeadList = (doc: any) => {
    return {
        _id: doc._id.toString(),
        name: doc.name,
        description: doc.description || null,
        createdAt: doc.createdAt,
        updatedAt: doc.updatedAt,
        leadIds: (doc.leadIds || []).map(serializeRealEstateLead),
    } ;
};
