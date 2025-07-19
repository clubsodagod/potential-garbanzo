"use client";
import React, { useState } from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Stack,
    Typography,
    TextField,
} from "@mui/material";
import { EmailTemplate } from "@/_library/const/email-templates";
import { formatTemplate } from "@/_utility/helpers/template-formatter.helper";

/**
 * Props for the MessageActions component.
 */
interface MessageActionsProps {
    /**
     * Controls the visibility of the message dialog.
     */
    open: boolean;

    /**
     * Callback to close the message dialog.
     */
    onClose: () => void;

    /**
     * The message type to be rendered — either "text" or "email".
     */
    type: "text" | "email";

    /**
     * Array of message templates — either strings or labeled EmailTemplate objects.
     */
    templates: string[] | EmailTemplate[];

    /**
     * Callback triggered when a template is finalized and ready to be sent.
     * The formatted message string is passed to this handler.
     */
    onSelectTemplate: (template: string) => void;

    /**
     * Lead data used to personalize the message templates.
     */
    lead: {
        firstName: string;
        address: string;
        phone?: string;
        email?: string;
    };
}

/**
 * MessageActions Component
 *
 * Renders a dialog that allows the user to select a pre-written text or email template,
 * customize it, and trigger an action to send or use the message.
 *
 * @component
 * @param {MessageActionsProps} props - The properties used to control the message selection and formatting flow
 * @returns {JSX.Element}
 */
const MessageActions: React.FC<MessageActionsProps> = ({
    open,
    onClose,
    type,
    templates,
    onSelectTemplate,
    lead,
}) => {
    const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
    const [customMessage, setCustomMessage] = useState<string>("");

    /**
     * Handles selection of a template. Fills in placeholders based on the lead context.
     *
     * @param template - The raw template string selected
     */
    const handleTemplateSelect = (template: string) => {
        const formatted = formatTemplate(template, {
            firstName: lead.firstName,
            address: lead.address,
            propertyAddress: lead.address,
            phoneNumber: "586-863-3038",
            emailAddress: "self@maliek-davis.com",
            optionalWebsite: "https://maliek-davis.com",
        });

        setSelectedTemplate(formatted);
        setCustomMessage(formatted);
    };

    /**
     * Handles submitting the final customized message.
     */
    const handleSend = () => {
        onSelectTemplate(customMessage);
        handleClose();
    };

    /**
     * Resets the state and closes the dialog.
     */
    const handleClose = () => {
        onClose();
        setSelectedTemplate(null);
        setCustomMessage("");
    };

    /**
     * Ensures all templates are in EmailTemplate format regardless of input type.
     */
    const normalizedTemplates: EmailTemplate[] = Array.isArray(templates)
        ? typeof templates[0] === "string"
            ? (templates as string[]).map((t, i) => ({
                label: `Template ${i + 1}`,
                template: t,
            }))
            : (templates as EmailTemplate[])
        : [];

    return (
        <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
            <DialogTitle>
                {selectedTemplate
                    ? `Edit ${type === "text" ? "Text" : "Email"} Message`
                    : `Select a ${type === "text" ? "Text" : "Email"} Template`}
            </DialogTitle>

            <DialogContent dividers>
                {!selectedTemplate ? (
                    <Stack spacing={2}>
                        {normalizedTemplates.map(({ label, template }, i) => (
                            <Button
                                key={i}
                                variant="outlined"
                                fullWidth
                                onClick={() => handleTemplateSelect(template)}
                            >
                                {label}
                            </Button>
                        ))}
                        {normalizedTemplates.length === 0 && (
                            <Typography color="textSecondary">
                                No templates available.
                            </Typography>
                        )}
                    </Stack>
                ) : (
                    <Stack spacing={2}>
                        <Typography variant="subtitle2">Customize your message:</Typography>
                        <TextField
                            multiline
                            minRows={6}
                            value={customMessage}
                            onChange={(e) => setCustomMessage(e.target.value)}
                            fullWidth
                        />
                    </Stack>
                )}
            </DialogContent>

            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                {selectedTemplate && (
                    <Button onClick={handleSend} variant="contained" color="primary">
                        Send
                    </Button>
                )}
            </DialogActions>
        </Dialog>
    );
};

export default MessageActions;
