"use server";

import connectToDB from "@/_database/connect-to-db.database";
import { IRealEstateLeadListDocument, RealEstateLeadListModel } from "@/_database/models/leads/list.model";
import { serializeRealEstateLeadList } from "@/_utility/helpers/real-estate-lead-list.serializer";

/**
 * Fetches all lead lists and populates their associated leads.
 *
 * @returns {Promise<{ success: true; data: any[] } | { success: false; error: unknown }>}
 */
export const getAllLists = async (): Promise<
    | { success: true; data: IRealEstateLeadListDocument[] }
    | { success: false; error: unknown }
> => {
    try {
        await connectToDB();

        const rawLists = await RealEstateLeadListModel.find()
            .populate('leadIds')
            .lean()
            .exec();

        const lists = rawLists.map(serializeRealEstateLeadList);

        return { success: true, data: lists };
    } catch (error: unknown) {
        console.error("Fetch error:", error);
        return { success: false, error };
    }
};
