import connectToDB from "@/_database/connect-to-db.database";
import UserModel, { IUser } from "@/_database/models/user.model";

/**
 * Fetches a user document from the database by their unique username.
 *
 * @param {string} username - The username to query for.
 * @returns {Promise<IUser | null>} The user document if found, otherwise null.
 */
export async function getUserByUsername(username: string): Promise<IUser | null> {
    try {
        if (!username) {
            throw new Error("Username is required");
        }
        await connectToDB()
        const user = await UserModel.findOne({ username });
        console.log(user)
        return user || null;
    } catch (error) {
        console.error(`Error fetching user by username "${username}":`, error);
        return null;
    }
}
