// components/emails/PreforeclosureEmailRenderer.tsx
"use client";

import { logoMain } from "@/_library/const/brand-assets";
import parseEmailTemplate from "@/_utility/helpers/parse-email-template";
import { Html, Heading, Text } from "@react-email/components";
import * as React from "react";

export interface PreforeclosureEmailRendererProps {
    /**
     * Email subject line (for display purposes only)
     */
    subject: string;

    /**
     * The raw message template with placeholders like [First Name], [Property Address], etc.
     */
    template: string;

    /**
     * Dynamic values to populate in the template (e.g., lead data).
     */
    replacements: { [key: string]: string };
}

/**
 * PreforeclosureEmailRenderer
 *
 * A reusable email preview component for preforeclosure messages.
 * Parses placeholders and renders styled HTML using the provided template and data.
 *
 * @component
 * @param {PreforeclosureEmailRendererProps} props - Email content and replacements
 * @returns {JSX.Element}
 */
const PreforeclosureEmailRenderer: React.FC<PreforeclosureEmailRendererProps> = ({
    subject,
    template,
    replacements,
}: PreforeclosureEmailRendererProps): React.JSX.Element => {
    const parsed = parseEmailTemplate(template, replacements);

    return (
        <Html>
            <div
                style={{
                    fontFamily: "sans-serif",
                    padding: "40px",
                    backgroundColor: "#f5f5f5",
                    backgroundImage: `url(${logoMain})`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "contain",
                    backgroundPosition: "center",
                    textAlign: "left",
                }}
            >
                <div style={{ maxWidth: "600px", margin: "0 auto" }}>
                    <Heading as="h2" style={{ color: "#60abe4" }}>
                        {subject}
                    </Heading>

                    {parsed.split("\n").map((line: string, i: number): React.ReactNode =>
                        line.trim() ? (
                            <Text key={i} style={{ fontSize: "16px", lineHeight: "1.6", color: "#333" }}>
                                {line}
                            </Text>
                        ) : (
                            <br key={i} />
                        )
                    )}
                </div>
            </div>
        </Html>
    );
};

export default PreforeclosureEmailRenderer;
