import { CreateEmailResponse, Resend } from "resend";
import { ReactElement, ReactNode } from "react";

const resend = new Resend(process.env.RESEND_API_KEY);

/**
 * Sends a transactional email using a React component.
 */
export async function sendEmail({
    to,
    subject,
    component,
}: {
    to: string;
    subject: string;
    component: ReactNode|Promise<ReactNode>;
}): Promise<CreateEmailResponse> {
    return await resend.emails.send({
        from: "admin@yourdomain.com",
        to,
        subject,
        react: component as ReactElement,
    });
}
