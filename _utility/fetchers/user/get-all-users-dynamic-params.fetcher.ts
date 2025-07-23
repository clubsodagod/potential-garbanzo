import connectToDB from "@/_database/connect-to-db.database";
import UserModel from "@/_database/models/user.model";

/**
 * Fetches all users from the database, returning only their username and ID.
 *
 * @returns {Promise<Array<{ username: string; id: string }>>}
 */
export async function getAllUsersDynamicParams(): Promise<Array<{ username: string; id: string }>> {
    await connectToDB();

    const users = await UserModel.find({}).select(["username", "_id"]);
    console.log(users);
    
    return users.map((user) => ({
        username: user.username,
        id: `${user._id}`
    }));
}
