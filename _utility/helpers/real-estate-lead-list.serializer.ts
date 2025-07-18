import { IRealEstateLeadListDocument } from "@/_database/models/leads/list.model";
import { serializeRealEstateLead } from "./real-estate-lead.serializer";

/**
 * Serializes a raw list document into a clean DTO,
 * including its populated leads using nested serialization.
 *
 * @param {any} doc - The raw MongoDB list document.
 * @returns {object} - Serialized list object with leads.
 */

export const serializeRealEstateLeadList = (doc: IRealEstateLeadListDocument) => {
    return {
        _id: doc._id.toString(),
        name: doc.name,
        description: doc.description || null,
        createdAt: doc.createdAt,
        updatedAt: doc.updatedAt,
        leadIds: (doc.leadIds || []).map(serializeRealEstateLead),
    } as IRealEstateLeadListDocument;
};
