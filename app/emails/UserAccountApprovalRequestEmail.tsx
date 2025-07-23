import {
    Html,
    Heading,
    Text,
    Section,
    Img,
} from "@react-email/components";
import * as React from "react";
import { IUser } from "@/_database/models/user.model";
import { getBaseUrl } from "@/_utility/helpers/get-base-url";
import { logoAltText, logoMain } from "@/_library/const/brand-assets";

export interface UserAccountApprovalRequestEmailProps {
    /**
     * Verified user data excluding password or token.
     * Fields are optional to allow fallback display.
     */
    user: Partial<
        Pick<
            IUser,
            | "firstName"
            | "lastName"
            | "email"
            | "username"
            | "role"
            | "avatar"
            | "createdAt"
            | "emailVerified"
        >
    >;
}

/**
 * UserAccountApprovalRequestEmail
 *
 * Notification email sent to admin when a user verifies their email,
 * prompting account approval with key user details.
 *
 * @component
 * @param {UserAccountApprovalRequestEmailProps} props - Sanitized user data
 * @returns {JSX.Element}
 */
const UserAccountApprovalRequestEmail: React.FC<UserAccountApprovalRequestEmailProps> = ({
    user,
}) => {
    const dashboardUrl = `${getBaseUrl()}/admin/dashboard/users`;
    
    const fullName = `${user?.firstName ?? "First"} ${user?.lastName ?? "Last"}`;
    const username = user?.username ?? "N/A";
    const email = user?.email ?? "N/A";
    const role = user?.role ?? "customer";
    const joined = user?.createdAt
        ? new Date(user?.createdAt).toLocaleString()
        : "Unknown";
    const verified = user?.emailVerified ? "✅" : "❌";

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
                    <Img
                        src={logoMain}
                        alt={logoAltText ?? "Maliek Davis Brand"}
                        width="120"
                        style={{ marginBottom: "16px", marginInline:"auto" }}
                    />

                    <Heading as="h2" style={{ color: "#1e40af" }}>
                        A new user has verified their email
                    </Heading>

                    <Text style={{ fontSize: "16px", color: "#334155", lineHeight: "1.6" }}>
                        Please review and approve this user from your admin dashboard.
                    </Text>

                    <ul
                        style={{
                            fontSize: "15px",
                            color: "#1e293b",
                            paddingLeft: "1rem",
                            marginTop: "1rem",
                        }}
                    >
                        <li><strong>Name:</strong> {fullName}</li>
                        <li><strong>Username:</strong> {username}</li>
                        <li><strong>Email:</strong> {email}</li>
                        <li><strong>Role:</strong> {role}</li>
                        <li><strong>Verified:</strong> {verified}</li>
                        <li><strong>Joined:</strong> {joined}</li>
                    </ul>

                    <div style={{ marginTop: "24px" }}>
                        <a
                            href={dashboardUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                                backgroundColor: "#2563eb",
                                color: "#ffffff",
                                padding: "12px 20px",
                                borderRadius: "6px",
                                fontWeight: 600,
                                textDecoration: "none",
                                display: "inline-block",
                            }}
                        >
                            Go to Admin Dashboard
                        </a>
                    </div>
                </Section>
            </main>
        </Html>
    );
};

export default UserAccountApprovalRequestEmail;
