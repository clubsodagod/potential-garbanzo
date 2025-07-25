import {
    Html,
    Heading,
    Text,
    Section,
    Img,
} from "@react-email/components";
import * as React from "react";
import { logoAltText, logoMain } from "@/_library/const/brand-assets";
import { getBaseUrl } from "@/_utility/helpers/get-base-url";

interface UserAccountApprovalStatusEmailProps {
    fullName?: string;
    status: "approved" | "rejected";
}

const UserAccountApprovalStatusEmail: React.FC<UserAccountApprovalStatusEmailProps> = ({
    fullName = "User",
    status,
}) => {
    const isApproved = status === "approved";

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
                        style={{ marginBottom: "16px", marginInline: "auto" }}
                    />

                    <Heading as="h2" style={{ color: "#1e40af" }}>
                        Your account has been {isApproved ? "approved" : "reviewed"}
                    </Heading>

                    <Text style={{ fontSize: "16px", color: "#334155", lineHeight: "1.6" }}>
                        Hi {fullName},
                    </Text>

                    <Text style={{ fontSize: "16px", color: "#334155", lineHeight: "1.6" }}>
                        We’ve reviewed your account. Your request has been{" "}
                        <strong style={{ color: isApproved ? "#16a34a" : "#dc2626" }}>
                            {isApproved ? "approved" : "denied"}
                        </strong>.
                    </Text>

                    {isApproved ? (
                        <Text style={{ fontSize: "16px", color: "#334155", lineHeight: "1.6" }}>
                            You can now log in and access your dashboard.
                        </Text>
                    ) : (
                        <Text style={{ fontSize: "16px", color: "#334155", lineHeight: "1.6" }}>
                            If you believe this was a mistake or want to reapply, feel free to contact us.
                        </Text>
                    )}

                    {isApproved && (
                        <div style={{ marginTop: "24px" }}>
                            <a
                                href={`${getBaseUrl()}/auth/login`}
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
                                Log In
                            </a>
                        </div>
                    )}
                </Section>
            </main>
        </Html>
    );
};

export default UserAccountApprovalStatusEmail;
