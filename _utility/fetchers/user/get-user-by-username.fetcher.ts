"use server"

import connectToDB from "@/_database/connect-to-db.database";
import { TaskModel } from "@/_database/models/task.model";
import UserModel, { IUser }  from "@/_database/models/user.model";
import { serializeUser } from "@/_utility/helpers/user.serializer";

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
        await TaskModel.find()
        const user = await UserModel.findOne({ username }).populate({
            path:"tasks",
            populate:{
                path:"createdBy"
            }
        });
        const data = await serializeUser(user) as unknown as IUser;
        
        return await data || null;
    } catch (error) {
        console.error(`Error fetching user by username "${username}":`, error);
        return null;
    }
}
