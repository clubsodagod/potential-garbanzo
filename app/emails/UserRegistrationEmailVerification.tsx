import {
    Html,
    Heading,
    Text,
    Section,
    Img,
} from "@react-email/components";
import * as React from "react";
import { logoMain } from "@/_library/const/brand-assets";

export interface UserSignUpEmailVerificationEmailProps {
    /** Full name of the user */
    name?: string;
    /** The unique email verification URL */
    verificationUrl: string;
}

/**
 * UserSignUpEmailVerificationEmail
 *
 * Renders a styled and accessible email prompting the user to verify their email after signup.
 * Uses semantic tags, MUI-compatible style, and React Email for safe rendering in clients.
 *
 * @component
 * @param {UserSignUpEmailVerificationEmailProps} props - User details and verification link
 * @returns {JSX.Element}
 */
const UserSignUpEmailVerificationEmail: React.FC<UserSignUpEmailVerificationEmailProps> = ({
    name,
    verificationUrl,
}) => {
    return (
        <Html lang="en">
            <main
                style={{
                    fontFamily: "sans-serif",
                    padding: "40px 16px",
                    backgroundColor: "#f8fafc",
                }}
            >
                <Section
                    style={{
                        maxWidth: "600px",
                        margin: "0 auto",
                        padding: "48px 32px",
                        borderRadius: "12px",
                        backgroundColor: "#ffffff",
                        boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
                        textAlign: "left",
                    }}
                >
                    <div style={{ textAlign: "center", marginBottom: "24px" }}>
                        <Img
                            src={logoMain}
                            alt="Brand Logo"
                            width="160"
                            height="auto"
                            style={{ margin: "0 auto" }}
                        />
                    </div>

                    <Heading as="h2" style={{ color: "#1d4ed8", marginBottom: "12px" }}>
                        Confirm Your Email{name ? `, ${name}` : ""}!
                    </Heading>

                    <Text style={{ fontSize: "16px", lineHeight: "1.6", color: "#334155" }}>
                        Thanks for signing up{name ? `, ${name}` : ""}! Before we can get started, we need you to confirm your email address.
                    </Text>

                    <div className="py-4">
                        <a
                            href={verificationUrl}
                            style={{
                                backgroundColor: "#2563eb",
                                color: "#ffffff",
                                padding: "12px 20px",
                                borderRadius: "6px",
                                fontWeight: 600,
                                textDecoration: "none",
                                display: "inline-block",
                            }}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Verify Email
                        </a>
                    </div>

                    <Text style={{ fontSize: "14px", lineHeight: "1.5", color: "#64748b" }}>
                        If you didn’t sign up for an account, you can safely ignore this email.
                    </Text>
                </Section>
            </main>
        </Html>
    );
};

export default UserSignUpEmailVerificationEmail;
