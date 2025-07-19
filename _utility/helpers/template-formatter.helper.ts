/**
 * Replaces placeholders in message/email templates with actual lead and sender data.
 *
 * @param template - The template string with placeholder tags (e.g., "[First Name]")
 * @param context - The dynamic data used for substitution
 * @returns Formatted message with placeholders replaced
 *
 * @example
 * formatTemplate("Hi [First Name]", { firstName: "Maliek" }) // "Hi Maliek"
 */
export function formatTemplate(
    template: string,
    context: {
        firstName?: string;
        address?: string;
        propertyAddress?: string;
        phoneNumber?: string;
        emailAddress?: string;
        optionalWebsite?: string;
    }
): string {
    return template
        .replace(/\[First Name\]/g, context.firstName || "there")
        .replace(/\[Address\]/g, context.address || "your property")
        .replace(/\[Property Address\]/g, context.propertyAddress || context.address || "the property")
        .replace(/\[Phone Number\]/g, context.phoneNumber || "")
        .replace(/\[Email Address\]/g, context.emailAddress || "")
        .replace(/\[Optional Website\]/g, context.optionalWebsite || "");
}
