import connectToDB from "@/_database/connect-to-db.database";
import PreforeclosureDayOne from "@/app/emails/PreforeclosureDayOne";
import { Resend } from "resend";

/**
 * Sends a preforeclosure outreach email using the PreforeclosureDayOne email component.
 *
 * @async
 * @function sendPreforeclosureEmail
 * @param {Object} params - Parameters for the email
 * @param {string} params.to - Recipient email address
 * @param {string} params.firstName - Recipient first name for personalization
 * @param {string} params.propertyAddress - Full property address to reference
 * @param {string} [params.from] - Optional sender address (defaults to Maliek)
 * @returns {Promise<{ error: boolean; message: string }>} Email result object
 *
 * @example
 * await sendPreforeclosureEmail({
 *   to: "owner@example.com",
 *   firstName: "Justin",
 *   propertyAddress: "123 Klayton St, New York, NY 20344"
 * });
 */
export async function sendPreforeclosureEmail({
    to,
    firstName,
    propertyAddress,
    from = "Maliek Davis <self@maliek-davis.com>",
}: {
    to: string;
    firstName: string;
    propertyAddress: string;
    from?: string;
}): Promise<{ error: boolean; message: string }> {
    try {
        await connectToDB();

        const resend = new Resend(process.env.RESEND_API_KEY);

        await resend.emails.send({
            from,
            to,
            subject: `Can I help with the situation at ${propertyAddress}?`,
            react: PreforeclosureDayOne({
                firstName,
                propertyAddress,
            }) as React.ReactElement,
        });

        return {
            error: false,
            message: "Preforeclosure email sent successfully.",
        };
    } catch (error) {
        console.error("❌ sendPreforeclosureEmail error:", error);
        return {
            error: true,
            message: "There was a problem sending the email. Please try again later.",
        };
    }
}
