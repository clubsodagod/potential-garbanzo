// PreforeclosureDayOne.tsx
import { logoMain } from "@/_library/const/brand-assets";
import  preforeclosureEmailTemplates  from "../../_library/const/email-templates";
import  parseEmailTemplate  from "../../_utility/helpers/parse-email-template";
import { Html, Heading, Text } from "@react-email/components";
import * as React from "react";

interface Props {
    firstName: string;
    propertyAddress: string;
}

const PreforeclosureDayOne: React.FC<Props> = ({ firstName="SJustin", propertyAddress="123 Klayton St, New York, NY 20344" }) => {
    const raw = preforeclosureEmailTemplates[2].template;
    const parsed = parseEmailTemplate(raw, {
        "First Name": firstName,
        "Property Address": propertyAddress,
        "Phone Number": "313-555-5555",
        "Your Business Name": "Pearl Box Properties",
        "Email Address": "self@maliek-davis.com",
        "Optional Website": "https://www.Maliek-Davis.com",
    });

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
                        Can I help with the situation at {propertyAddress}?
                    </Heading>

                    {parsed.split("\n").map((line, i) =>
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

export default PreforeclosureDayOne;
