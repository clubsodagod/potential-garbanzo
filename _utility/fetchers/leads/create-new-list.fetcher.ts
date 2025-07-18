"use server";

import connectToDB from '@/_database/connect-to-db.database';
import { RealEstateLeadListModel } from '@/_database/models/leads/list.model';
import { RealEstateLeadModel } from '@/_database/models/leads/real-estate.model';
import { IRealEstateLead } from '@/_library/types-interfaces-classes/leads';
import { Types } from 'mongoose';

/**
 * Creates a new list of real estate leads.
 * 1. Saves the given leads using `RealEstateLeadModel`.
 * 2. Creates a new list with the provided name, referencing the inserted lead IDs.
 *
 * @param {IRealEstateLead[]} leads - The array of lead documents to insert.
 * @param {string} name - The name/title of the new list.
 *
 * @returns {Promise<{ success: true; count: number; listId: string } | { success: false; error: unknown }>}
 *
 * @example
 * const result = await createNewLeadList(leads, "Detroit - July 2025");
 */
export const createNewLeadList = async (
    leads: IRealEstateLead[],
    name: string
): Promise<
    | { success: true; count: number; listId: string }
    | { success: false; error: unknown }
> => {
    try {
        await connectToDB();

        // Step 1: Insert leads
        const inserted = await RealEstateLeadModel.insertMany(leads, { ordered: false });

        // Step 2: Extract inserted IDs
        const leadIds: Types.ObjectId[] = inserted.map((doc) => doc._id);

        // Step 3: Create new list
        const listDoc = await RealEstateLeadListModel.create({
            name,
            leadIds,
        });

        return {
            success: true,
            count: inserted.length,
            listId: listDoc._id.toString(),
        };
    } catch (error: unknown) {
        console.error("Create list error:", error);
        return { success: false, error };
    }
};
