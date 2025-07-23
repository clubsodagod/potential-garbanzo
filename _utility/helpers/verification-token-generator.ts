import { v4 as uuidv4 } from "uuid";

/**
 * Generates a secure unique email verification token.
 *
 * @returns {string} - UUID v4 token string.
 */
export function generateVerificationToken(): string {
    return uuidv4();
}
