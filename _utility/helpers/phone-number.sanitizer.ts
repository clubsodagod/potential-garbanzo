/**
 * Sanitizes a phone number string by stripping out non-numeric characters (except +).
 *
 * @param {string} raw - The raw input string.
 * @returns {string} - The cleaned number string.
 */
export const sanitizeNumber = (raw: string): string =>
    raw.replace(/[^0-9+]/g, "");
