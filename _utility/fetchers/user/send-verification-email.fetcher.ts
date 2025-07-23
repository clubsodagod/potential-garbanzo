import { ResponseStatus } from "@/_library/types-interfaces-classes/common";
import UserRegistrationEmailVerification from "@/app/emails/UserRegistrationEmailVerification";
import { Resend } from "resend";

const EMAIL_FROM = "no-reply@maliek-davis.com";
const EMAIL_SUBJECT = "Verify your email for The Lead Flow App";

/**
 * sendVerificationEmail
 *
 * Sends a registration verification email to the user using the Resend API.
 *
 * @param {string} firstName - User's first name (for personalization)
 * @param {string} email - Recipient's email address
 * @param {string} verificationUrl - Unique verification link
 * @returns {Promise<ResponseStatus>} - Success or failure response with details
 */
export async function sendVerificationEmail(
    firstName: string,
    email: string,
    verificationUrl: string
): Promise<ResponseStatus> {
    const resend = new Resend(process.env.NEXT_PUBLIC_RESEND_API_KEY);

    try {
        // Construct verification email JSX component
        const emailComponent = UserRegistrationEmailVerification({
            name: firstName,
            verificationUrl,
        });

        // Send email via Resend
        const response = await resend.emails.send({
            from: EMAIL_FROM,
            to: [email],
            subject: EMAIL_SUBJECT,
            react: emailComponent as React.ReactElement,
        });

        if (response.error) {
            return {
                error: true,
                message: `Failed to send email: ${response.error.message}`,
            };
        }

        return {
            error: false,
            message: "Verification email sent successfully.",
            data: response,
        };
    } catch (error) {
        console.error("Email verification error:", error);
        return {
            error: true,
            message: `Unexpected error occurred while sending email.`,
        };
    }
}
