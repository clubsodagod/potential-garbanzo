import connectToDB from "@/_database/connect-to-db.database";
import UserModel, { IUser } from "@/_database/models/user.model";
import { IResponseStatus } from "@/_library/types-interfaces-classes/common";

/**
 * Fetches all users with the admin role (role === 0).
 *
 * @returns {Promise<IResponseStatus<IUser[]>>} - Result containing admin users or error info
 *
 * @example
 * const res = await fetchAllAdmins();
 * if (res.success) console.log(res.data);
 */
export async function fetchAllAdmins(): Promise<IResponseStatus<IUser[]>> {
    try {
        
        await connectToDB();

        const admins = await UserModel.find({ role: 0 }).lean<IUser[]>().exec();

        return {
            success: true,
            error: false,
            message: "Admin users retrieved successfully",
            data: admins,
        };
    } catch (error: unknown) {
        console.error("Failed to fetch admin users:", error);
        return {
            success: false,
            error: true,
            message:
                error instanceof Error
                    ? error.message
                    : "An unexpected error occurred while retrieving admin users",
        };
    }
}
