"use server";

import connectToDB from "@/_database/connect-to-db.database";
import { RealEstateLeadListModel } from "@/_database/models/leads/list.model";
import { serializeRealEstateLeadList } from "@/_utility/helpers/real-estate-lead-list.serializer";

/**
 * Fetches all lead lists and populates their associated leads.
 *
 * @returns {Promise<{ success: true; data: any[] } | { success: false; error: unknown }>}
 */
export const getAllLists = async (): Promise<
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    | { success: true; data: any[] }
    | { success: false; error: unknown }
> => {
    try {
        await connectToDB();

        const rawLists = await RealEstateLeadListModel.find()
            .populate({
                path: "leadIds",
                populate: {
                    path: "leadInteractionHistory",
                    model: "LeadRecord", // or the actual model name used
                },
            })
            .lean().exec();

            console.log(rawLists[0].leadIds[0].leadInteractionHistory);
            
        const lists = rawLists.map(serializeRealEstateLeadList);
        console.log(lists[0].leadIds[0]);

        return { success: true, data: lists };
    } catch (error: unknown) {
        console.error("Fetch error:", error);
        return { success: false, error };
    }
};
