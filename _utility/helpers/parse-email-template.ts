"use client"
/**
 * Replaces placeholders in a template string with actual values.
 *
 * Placeholders should be in the format `[Key]`, such as `[First Name]` or `[Property Address]`.
 * The function will replace all matching placeholders with their corresponding values from the
 * replacements object.
 *
 * @param {string} template - The raw email template string containing placeholders.
 * @param {{ [key: string]: string }} replacements - An object where keys match the placeholder names
 *                                                   (without brackets), and values are what should replace them.
 *
 * @returns {string} - The template with all placeholders replaced by their corresponding values.
 *
 * @example
 * const template = "Hi [First Name], your property at [Property Address]...";
 * const replacements = { "First Name": "Maliek", "Property Address": "123 Main St" };
 * const result = parseEmailTemplate(template, replacements);
 * // result: "Hi Maliek, your property at 123 Main St..."
 */
export default function parseEmailTemplate(
    template: string,
    replacements: { [key: string]: string }
): string {
    let parsed = template;
    for (const key in replacements) {
        const pattern = new RegExp(`\\[${key}\\]`, "g");
        parsed = parsed.replace(pattern, replacements[key]);
    }
    return parsed;
}
