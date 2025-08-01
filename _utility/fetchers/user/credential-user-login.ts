import validateLogin from "./validate-login";

/**
 * Attempts to authenticate a user based on credential (email/username) and password.
 *
 * @param {string} password - The plain text password.
 * @param {string} credential - Username or email address.
 * @returns {Promise<any | null>} - The authenticated user object or null on failure.
 */
export default async function credentialUserLogin(password: string, credential: string) {
    try {
        const credentials = { credential, secret: password };
        const user = await validateLogin(credentials);
        console.log("User authenticated:", user);
        
        if (!user) {
            throw new Error("Login failed. Please check your credentials.");
        }

        return user;
    } catch (error) {
        console.error("Login error:", error);
        return null;
    }
}
