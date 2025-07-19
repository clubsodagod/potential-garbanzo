"use client";

import React, { useState } from "react";
import {
    Card,
    CardContent,
    Typography,
    IconButton,
    Collapse,
    Tooltip,
    Divider,
    Box,
    Button,
    Stack,
    TextField,
} from "@mui/material";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";

import PhoneIcon from "@mui/icons-material/Phone";
import TextsmsIcon from "@mui/icons-material/Textsms";
import EmailIcon from "@mui/icons-material/Email";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import MessageActions from "./MessageActions";
import { sanitizeNumber } from "@/_utility/helpers/phone-number.sanitizer";
import { logLeadInteraction } from "@/_utility/fetchers/leads/log-lead-interaction.fetcher";
import textTemplates from "@/_library/const/text-templates";
import preforeclosureEmailTemplates from "@/_library/const/email-templates";

import { IUser } from "@/_database/models/user.model";
import { RealEstateLead } from "@/_database/models/leads/real-estate.model";
import { ICleanLeadRecord } from "@/_library/types-interfaces-classes/leads";
import { motion } from "motion/react"
import { pressAndExpand, springInView } from "@/_library/animations/call-list.animations";

/**
 * Props for the CallListItem component.
 */
interface CallListItemProps {
    /**
     * The lead to render interaction actions and details for.
     */
    lead: RealEstateLead;

    /**
     * Index of the lead in the list (for display ordering).
     */
    index: number;

    /**
     * Pre-fetched interaction history for the lead.
     */
    interactionHistory: ICleanLeadRecord[];
}

/**
 * CallListItem Component
 *
 * Renders a single real estate lead card, including:
 * - Contact actions (call, text, email)
 * - Property details
 * - Notes field
 * - Interaction history
 * - Message template dialog
 *
 * @component
 * @param {CallListItemProps} props
 * @returns {JSX.Element}
 */
const CallListItem: React.FC<CallListItemProps> = ({ lead, index, interactionHistory }) => {
    const [expanded, setExpanded] = useState(false);
    const [note, setNote] = useState("");
    const [messageType, setMessageType] = useState<"text" | "email" | null>(null);
    const [messageDialogOpen, setMessageDialogOpen] = useState(false);
    const [selectedContact, setSelectedContact] = useState<{ phone?: string; email?: string } | null>(null);

    const { data: session } = useSession();
    const currentUser = session?.user as unknown as IUser;

    /**
     * Expands or collapses the lead card.
     */
    const toggleExpanded = () => setExpanded((prev) => !prev);

    /**
     * Initiates a phone call and logs it as a call interaction.
     *
     * @param number - Phone number to dial
     */
    const handleCall = async (number: string): Promise<void> => {
        const clean = sanitizeNumber(number);
        if (!clean) return;

        window.location.href = `tel:${clean}`;

        try {
            await logLeadInteraction({
                leadId: `${lead._id}`,
                user: currentUser,
                actionType: "call",
                note: `Called ${clean}`,
                callCount: 1,
                metadata: { rawNumber: number },
            });
            toast.success(`📞 Call to ${clean} logged.`);
        } catch {
            toast.error("Call logging failed.");
        }
    };

    /**
     * Saves a user note to the lead record.
     */
    const handleSaveNote = async (): Promise<void> => {
        if (!note.trim()) return;

        try {
            const toastId = toast.loading("Saving note...");
            await logLeadInteraction({
                leadId: `${lead._id}`,
                user: currentUser,
                actionType: "note",
                note: note.trim(),
                metadata: {},
            });
            toast.success("Note saved.", { id: toastId });
            setNote("");
        } catch {
            toast.error("Failed to save note.");
        }
    };

    /**
     * Opens text message template dialog.
     *
     * @param number - Phone number to text
     */
    const handleText = (number: string) => {
        setMessageType("text");
        setSelectedContact({ phone: number });
        setMessageDialogOpen(true);
    };

    /**
     * Opens email template dialog.
     *
     * @param email - Email address to send to
     */
    const handleEmail = (email: string) => {
        setMessageType("email");
        setSelectedContact({ email });
        setMessageDialogOpen(true);
    };

    /**
     * Sends the selected template via native SMS or email app.
     *
     * @param message - Final formatted message
     */
    const onSelectTemplate = (message: string) => {
        if (messageType === "text" && selectedContact?.phone) {
            window.location.href = `sms:${selectedContact.phone}?body=${encodeURIComponent(message)}`;
        } else if (messageType === "email" && selectedContact?.email) {
            window.location.href = `mailto:${selectedContact.email}?subject=Regarding your property&body=${encodeURIComponent(message)}`;
        }
    };

    const ownerName =
        lead.owner?.[0]
            ? `${lead.owner[0].firstName ?? ""} ${lead.owner[0].lastName ?? ""}`.trim()
            : "Unknown Owner";

    return (

        <motion.div {...springInView}>
            <motion.div {...pressAndExpand}>
                <Card  variant="outlined" className="transition-shadow duration-150 hover:shadow-md">
                    <CardContent   onClick={toggleExpanded} className="cursor-pointer">
                        <Typography variant="subtitle2" gutterBottom>
                            #{index + 1} — {ownerName}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                            {lead.property.address}, {lead.property.city}, {lead.property.state} {lead.property.zip}
                        </Typography>
                        <Typography variant="caption" color="textSecondary">
                            Status: {lead.leadStatus} | Type: {lead.leadType}
                        </Typography>

                        <IconButton size="small" onClick={(e) => {e.stopPropagation(); toggleExpanded();  }}>
                            <motion.div {...pressAndExpand}>
                                <ExpandMoreIcon fontSize="small" />
                            </motion.div>
                        </IconButton>

                    </CardContent>

                    <Collapse in={expanded} timeout="auto" unmountOnExit>
                        <Divider />
                        <CardContent className="space-y-3 pt-2">
                            {/* Contact Info */}
                            {lead.owner?.map((owner, idx) => (
                                <div key={idx} className="space-y-1">
                                    <Typography variant="subtitle2">📇 Contact Info</Typography>
                                    {owner.phones?.map((phone, i) => (
                                        <div key={i} className="flex items-center gap-2">
                                            <Typography variant="body2">
                                                {phone.number} ({phone.type})
                                            </Typography>
                                            <div className="ml-auto flex gap-2">
                                                <Tooltip title="Call">
                                                    <IconButton size="small" onClick={(e) => {handleCall(phone.number); e.stopPropagation();  }}>
                                                        <PhoneIcon fontSize="small" />
                                                    </IconButton>
                                                </Tooltip>
                                                {phone.type?.toLowerCase() === "mobile" && (
                                                    <Tooltip title="Text">
                                                        <IconButton size="small" onClick={(e) => {handleText(phone.number); e.stopPropagation();  }}>
                                                            <TextsmsIcon fontSize="small"  />
                                                        </IconButton>
                                                    </Tooltip>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                    {owner.emails?.map((email, i) => (
                                        <div key={i} className="flex items-center justify-between gap-2">
                                            <Typography variant="body2">{email}</Typography>
                                            <Tooltip title="Email">
                                                <IconButton size="small" onClick={(e) => { handleEmail(email);e.stopPropagation()  }}>
                                                    <EmailIcon fontSize="small" />
                                                </IconButton>
                                            </Tooltip>
                                        </div>
                                    ))}
                                </div>
                            ))}

                            {/* Property Info */}
                            <div className="pt-2">
                                <Typography variant="subtitle2">🏠 Property Details</Typography>
                                <Typography variant="body2">
                                    Beds: {lead.property.bedroomCount ?? "—"}, Baths: {lead.property.bathroomCount ?? "—"}
                                </Typography>
                                <Typography variant="body2">
                                    Sq Ft: {lead.property.totalBuildingAreaSqFt ?? "—"}, Built: {lead.property.yearBuilt ?? "—"}
                                </Typography>
                                <Typography variant="body2">
                                    Estimated Value: ${lead.property.estimatedValue?.toLocaleString() ?? "—"}
                                </Typography>
                            </div>

                            {/* Notes */}
                            <div className="space-y-2">
                                <Typography variant="subtitle2">📝 Add Note</Typography>
                                <TextField
                                    multiline
                                    minRows={3}
                                    placeholder="Type a note about this lead..."
                                    fullWidth
                                    value={note}
                                    onChange={(e) => setNote(e.target.value)}
                                />
                                <Button variant="outlined" size="small" onClick={handleSaveNote} disabled={!note.trim()}>
                                    Save Note
                                </Button>
                            </div>

                            {/* Interaction History */}
                            {interactionHistory.length > 0 && (
                                <div className="pt-4">
                                    <Typography variant="subtitle2">📜 Interaction History</Typography>
                                    <Stack spacing={1}>
                                        {interactionHistory.map((entry, idx) => (
                                            <Box key={idx} borderLeft={2} borderColor="primary.main" pl={2}>
                                                <Typography variant="caption" color="textSecondary">
                                                    {new Date(entry.createdAt ?? "").toLocaleString()}
                                                </Typography>
                                                <Typography variant="body2">
                                                    {entry.actionType.toUpperCase()}: {entry.note}
                                                </Typography>
                                            </Box>
                                        ))}
                                    </Stack>
                                </div>
                            )}

                            {/* Message Dialog */}
                            {messageType && selectedContact && (
                                <MessageActions
                                    type={messageType}
                                    templates={messageType === "text" ? textTemplates : preforeclosureEmailTemplates}
                                    onSelectTemplate={onSelectTemplate}
                                    lead={{
                                        firstName: lead.owner?.[0]?.firstName ?? "",
                                        address: lead.property?.address ?? "",
                                        phone: selectedContact.phone,
                                        email: selectedContact.email,
                                    }}
                                    open={messageDialogOpen}
                                    onClose={() => setMessageDialogOpen(false)}
                                />
                            )}
                        </CardContent>
                    </Collapse>
                </Card>
            </motion.div>
        </motion.div>

    );
};

export default CallListItem;
