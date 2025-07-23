import bcrypt from "bcryptjs";

type PasswordComparerProps = {
    hashedPassword: string;
    password: string;
};

/**
 * Compares a plain password against a hashed password using bcrypt.
 *
 * @param {PasswordComparerProps} payload - Plain text and hashed password pair.
 * @returns {Promise<boolean>} - True if passwords match, false otherwise.
 */
export async function isAPasswordMatch(payload: PasswordComparerProps): Promise<boolean> {
    const { hashedPassword, password } = payload;
    return await bcrypt.compare(password, hashedPassword);
}
