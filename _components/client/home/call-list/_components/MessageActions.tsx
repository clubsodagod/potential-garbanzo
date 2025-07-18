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

interface MessageActionsProps {
    open: boolean;
    onClose: () => void;
    type: "text" | "email";
    templates: string[] | EmailTemplate[];
    onSelectTemplate: (template: string) => void;
    lead: {
        firstName: string;
        address: string;
        phone?: string;
        email?: string;
    };
}

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

    const formatTemplate = (template: string) =>
        template
            .replace("[First Name]", lead.firstName || "there")
            .replace("[Address]", lead.address || "your property");

    const handleTemplateSelect = (template: string) => {
        const formatted = formatTemplate(template);
        setSelectedTemplate(formatted);
        setCustomMessage(formatted);
    };

    const handleSend = () => {
        onSelectTemplate(customMessage);
        handleClose();
    };

    const handleClose = () => {
        onClose();
        setSelectedTemplate(null);
        setCustomMessage("");
    };

    // Normalize templates to { label, template } format
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
