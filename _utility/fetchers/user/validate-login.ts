import connectToDB from "@/_database/connect-to-db.database";
import UserModel from "@/_database/models/user.model";
import { isAPasswordMatch } from "./is-password-a-match";
import { Credentials, UserType } from "@/_library/types-interfaces-classes/user";

/**
 * Validates a user login attempt by email or username and password.
 *
 * @param {Credentials} credentials - The login credentials including username/email and password.
 * @returns {Promise<UserType | null>} - The authenticated user or null if login fails.
 */
export default async function validateLogin(credentials: Credentials): Promise<UserType | null> {
    try {
        await connectToDB();
        const { credential, secret } = credentials;

        const isEmail = credential.includes("@");
        const user = await UserModel.findOne(isEmail ? { email: credential } : { username: credential }).populate("tasks");

        if (!user) {
            throw new Error(
                `No user found with that ${isEmail ? "email" : "username"}.`
            );
        }

        const isMatch = await isAPasswordMatch({
            password: secret,
            hashedPassword: user.password,
        });
        
        if (!isMatch) {
            throw new Error("Incorrect password. Please try again.");
        }

        return user.depopulate("password") as UserType;
    } catch (error) {
        console.error("validateLogin error:", error);
        return null;
    }
}
export async function validateLoginAuth(credentials: Credentials): Promise<UserType | null> {
    try {
        await connectToDB();
        const { credential, secret } = credentials;

        const isEmail = credential.includes("@");
        const user = await UserModel.findOne(isEmail ? { email: credential } : { username: credential });

        if (!user) {
            throw new Error(
                `No user found with that ${isEmail ? "email" : "username"}.`
            );
        }

        const isMatch = await isAPasswordMatch({
            password: secret,
            hashedPassword: user.password,
        });
        
        if (!isMatch) {
            throw new Error("Incorrect password. Please try again.");
        }

        return user.depopulate("password") as UserType;
    } catch (error) {
        console.error("validateLogin error:", error);
        return null;
    }
}
