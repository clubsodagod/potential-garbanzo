import UserModel, { IUser } from "@/_database/models/user.model";
import { IResponseStatus } from "@/_library/types-interfaces-classes/common";

/**
 * Payload for updating a user.
 */
export interface UpdateUserPayload {
    /** MongoDB ObjectId as a string */
    userId: string;

    /** Partial fields of the user to update */
    updates: Partial<Omit<IUser, "_id" | "password" | "createdAt" | "updatedAt">>;
}

/**
 * updateUser
 *
 * Updates a user document by ID with the specified fields.
 * Ensures restricted fields like password or timestamps are not overwritten directly.
 *
 * @param {UpdateUserPayload} payload - The user ID and updates to apply
 * @returns {Promise<IResponseStatus<IUser>>} Result of the update operation
 *
 * @example
 * ```ts
 * const res = await updateUser({
 *   userId: "64f27b0...",
 *   updates: { name: "Maliek", emailVerified: true }
 * });
 * ```
 */
export async function updateUser(payload: UpdateUserPayload): Promise<IResponseStatus<IUser>> {
    const { userId, updates } = payload;

    if (!userId) {
        return {
            success: false,
            error: true,
            message: "User ID is required",
        };
    }

    try {
        const updatedUser = await UserModel.findByIdAndUpdate(
            userId,
            { $set: updates },
            { new: true }
        )
            .lean<IUser>()
            .exec();

        if (!updatedUser) {
            return {
                success: false,
                error: true,
                message: "User not found or could not be updated",
            };
        }

        return {
            success: true,
            error: false,
            message: "User updated successfully",
            data: updatedUser,
        };
    } catch (error: unknown) {
        console.error(`Failed to update user ${userId}:`, error);
        return {
            success: false,
            error: true,
            message: error instanceof Error ? error.message : "An unexpected error occurred",
        };
    }
}
