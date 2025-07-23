/**
 * Generates a full email verification URL with query parameters.
 *
 * @param {string} verificationToken - Unique verification token.
 * @param {string} configUrl - The base URL from environment (domain).
 * @param {string} username - The user's username.
 * @param {string} firstName - The user's first name.
 * @param {string} email - The user's email address.
 * @returns {string} - Fully qualified email verification link.
 */
const generateVerificationLink = (
    verificationToken: string,
    configUrl: string,
    username: string,
    firstName: string,
    email: string
): string => {
    const params = new URLSearchParams({
        token: verificationToken,
        email,
        firstName,
        username,
    });

    return `${configUrl}/register/verify/email-verification?${params.toString()}`;
};

export default generateVerificationLink;
