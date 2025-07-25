/* eslint-disable @typescript-eslint/no-explicit-any */

import { serializeTask } from "./task.serializer";
import { IUser } from "@/_database/models/user.model";

/**
 * Serializes a Mongoose user document into a plain JavaScript object with stringified ObjectIds.
 * This synchronous version assumes tasks (and other fields) are already loaded or do not require async operations.
 *
 * @param {IUser} user - The raw user document.
 * @returns {Record<string, any>} - The sanitized and flattened user object.
 */
export function serializeUserSync(user: any): Record<string, any> {
    const toStr = (v: any) => v?.toString?.();
    const serializeObjectId = (id: any) => {
        if (!id || typeof id !== "object" || !id.id) return undefined;
        return Array.from(id.id as Uint8Array)
            .map((byte: number) => byte.toString(16).padStart(2, "0"))
            .join("");
    };

    return {
        _id: serializeObjectId(user._id),
        firstName: user.firstName,
        lastName: user.lastName,
        username: user.username,
        email: user.email,
        emailVerified: user.emailVerified,
        avatar: user.avatar,
        role: user.role,

        verificationToken: user.verificationToken,
        verificationTokenExpiration: toStr(user.verificationTokenExpiration),

        lastLogin: toStr(user.lastLogin),
        loginCount: user.loginCount,
        preferredCategories: Array.isArray(user.preferredCategories)
            ? user.preferredCategories
            : [],
        searchHistory: Array.isArray(user.searchHistory)
            ? user.searchHistory
            : [],
        viewedProducts: user.viewedProducts?.map(toStr),
        purchaseHistory: user.purchaseHistory?.map(toStr),
        abandonedCarts: user.abandonedCarts?.map(toStr),
        wishlist: user.wishlist?.map(toStr),
        favorites: user.favorites?.map(toStr),
        reviewsGiven: user.reviewsGiven?.map(toStr),

        communicationPreferences: {
            emailMarketing: user.communicationPreferences?.emailMarketing ?? true,
            smsMarketing: user.communicationPreferences?.smsMarketing ?? false,
            pushNotifications:
                user.communicationPreferences?.pushNotifications ?? true,
        },

        rewardPoints: user.rewardPoints,
        membershipTier: user.membershipTier,

        defaultShippingAddress: toStr(user.defaultShippingAddress),
        savedAddresses: user.savedAddresses?.map(toStr),
        savedPaymentMethods: user.savedPaymentMethods?.map(toStr),

        createdAt: toStr(user.createdAt),
        updatedAt: toStr(user.updatedAt),

        tasks: Array.isArray(user.tasks)
            ? user.tasks.map((task: any) => {
                // You must ensure `serializeTask` is sync-safe if used here.
                // Use a modified `serializeTaskSync` if needed.
                return {
                    id: `${task._id}`,
                    type: task.type,
                    status: task.status,
                    createdBy: toStr(task.createdBy),
                    assignedTo: toStr(task.assignedTo),
                    dueDate: task.dueDate?.toISOString?.(),
                    comments: task.comments,
                    notes: task.notes,
                    createdAt: task.createdAt?.toISOString?.(),
                    updatedAt: task.updatedAt?.toISOString?.(),
                };
            })
            : [],
    };
}
