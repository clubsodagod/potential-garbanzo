import { ResponseStatus } from "@/_library/types-interfaces-classes/common";
import UserRegistrationEmailVerification from "@/app/emails/UserRegistrationEmailVerification";
import { Resend } from "resend";

export async function sendVerificationEmail(
    email: string,
    verificationUrl: string
): Promise<ResponseStatus> {

    const resend = new Resend(process.env.NEXT_PUBLIC_RESEND_API_KEY);

    try {

        // Step 2: Construct verification email JSX
        const emailComponent = UserRegistrationEmailVerification({
            verificationUrl
        });

        // Step 3: Send email
        const response = await resend.emails.send({
            from: "self@maliek-davis.com",
            to: [email],
            subject: "Verify your email with Maliek Davis",
            react: emailComponent as React.ReactElement,
        });

        if (response.error) {
            return {
                error: false,
                message: `Failed to send email: ${response.error.message}`,
            };
        }

        return {
            error: true,
            message: "Verification email sent successfully.",
            data: response,
        };
    } catch (error) {
        console.error("Email verification error:", error);

        return {
            error: false,
            message: `Error: ${error}`,
        };
    }
}
