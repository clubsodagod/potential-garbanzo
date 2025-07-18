"use client";

import React, { useState, useEffect } from "react";
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

import { sanitizeNumber } from "@/_utility/helpers/phone-number.sanitizer";
import { logLeadInteraction } from "@/_utility/fetchers/leads/log-lead-interaction.fetcher";
import { getLeadInteractionHistory } from "@/_utility/fetchers/leads/get-lead-interaction-history.fetcher";

import MessageActions from "./MessageActions";
import textTemplates from "@/_library/const/text-templates";

import { IUser } from "@/_database/models/user.model";
import { RealEstateLead } from "@/_database/models/leads/real-estate.model";
import { LeadRecordDocument } from "@/_database/models/leads/real-estate-lead-record.model";
import { ICleanLeadRecord } from "@/_library/types-interfaces-classes/leads";

interface CallListItemProps {
    /**
     * The individual real estate lead to be rendered.
     */
    lead: RealEstateLead;

    /**
     * The index of the lead in the current list, used for display ordering.
     */
    index: number;
}

/**
 * CallListItem Component
 *
 * Renders an expandable card displaying detailed real estate lead information,
 * contact buttons for calling, texting, and emailing, and a timeline of interaction history.
 * Also includes note-taking functionality synced with backend logging.
 *
 * @component
 * @param {CallListItemProps} props - Lead data and index.
 * @returns {JSX.Element}
 */
const CallListItem: React.FC<CallListItemProps> = ({ lead, index }) => {
    const [expanded, setExpanded] = useState(false);
    const [messageDialogOpen, setMessageDialogOpen] = useState(false);
    const [messageType, setMessageType] = useState<"text" | "email" | null>(null);
    const [selectedContact, setSelectedContact] = useState<{ phone?: string; email?: string } | null>(null);
    const [note, setNote] = useState("");
    const [interactionHistory, setInteractionHistory] = useState<ICleanLeadRecord[]>([]);

    const { data: session } = useSession();
    const currentUser = session?.user as IUser | undefined;

    const toggleExpanded = () => setExpanded((prev) => !prev);

    useEffect(() => {
        fetchInteractionHistory();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    /**
     * Fetches and sets interaction history for the current lead.
     */
    const fetchInteractionHistory = async () => {
        try {
            const history = await getLeadInteractionHistory(`${lead._id}`);
            console.log(history);
            
            setInteractionHistory(
                Array.isArray(history)
                    ? history.sort(
                        (a, b) =>
                            new Date(b.createdAt ?? 0).getTime() - new Date(a.createdAt ?? 0).getTime()
                    )
                    : []
            );
        } catch (err) {
            console.error("Failed to fetch interaction history:", err);
            toast.error("Error loading lead history.");
        }
    };

    /**
     * Submits a note to the lead's interaction record.
     */
    const handleSaveNote = async () => {
        if (!note.trim()) return;

        if (!currentUser) {
            toast.error("User not authenticated.");
            return;
        }

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
            fetchInteractionHistory();
        } catch (err) {
            console.error("Failed to save note:", err);
            toast.error("Failed to save note.");
        }
    };

    /**
     * Initiates a phone call and logs the interaction.
     *
     * @param number - The phone number to dial.
     * @param leadId - The ID of the lead being contacted.
     * @param currentUser - The user initiating the call.
     */
    const handleCall = async (
        number: string,
        leadId: string,
        currentUser: IUser
    ): Promise<void> => {
        const clean = sanitizeNumber(number);
        if (!clean) return;

        window.location.href = `tel:${clean}`;

        try {
            await logLeadInteraction({
                leadId,
                user: currentUser,
                actionType: "call",
                note: `Called ${clean}`,
                callCount: 1,
                metadata: {
                    rawNumber: number,
                },
            });
            toast.success(`📞 Call to ${clean} logged.`);
        } catch (err) {
            console.error("Failed to log call interaction:", err);
            toast.error("Call logging failed.");
        }
    };

    const handleText = (number: string): void => {
        setMessageType("text");
        setSelectedContact({ phone: number });
        setMessageDialogOpen(true);
    };

    const handleEmail = (email: string): void => {
        setMessageType("email");
        setSelectedContact({ email });
        setMessageDialogOpen(true);
    };

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
        <Card variant="outlined" className="transition-shadow duration-150 hover:shadow-md">
            <CardContent onClick={toggleExpanded} className="cursor-pointer">
                <Typography variant="subtitle2" gutterBottom>
                    #{index + 1} — {ownerName}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                    {lead.property.address}, {lead.property.city}, {lead.property.state} {lead.property.zip}
                </Typography>
                <Typography variant="caption" color="textSecondary">
                    Status: {lead.leadStatus} | Type: {lead.leadType}
                </Typography>
                <IconButton size="small" onClick={(e) => { e.stopPropagation(); toggleExpanded(); }}>
                    <ExpandMoreIcon fontSize="small" />
                </IconButton>
            </CardContent>

            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <Divider />
                <CardContent className="space-y-3 pt-2">

                    {/* Contact Info */}
                    {lead.owner?.map((owner, ownerIndex) => (
                        <div key={ownerIndex} className="space-y-1">
                            <Typography variant="subtitle2">📇 Contact Info (Owner {ownerIndex + 1})</Typography>

                            {owner.phones?.length > 0 ? (
                                owner.phones.map((phone, i) => (
                                    <div key={i} className="flex items-center gap-2">
                                        <Typography variant="body2">
                                            {phone.number} ({phone.type})
                                        </Typography>

                                        <div className="ml-auto flex gap-2">
                                            <Tooltip title="Call">
                                                <IconButton
                                                    size="small"
                                                    onClick={() => {
                                                        if (currentUser) handleCall(phone.number, `${lead._id}`, currentUser);
                                                    }}
                                                >
                                                    <PhoneIcon fontSize="small" />
                                                </IconButton>
                                            </Tooltip>

                                            {phone.type?.toLowerCase() === "mobile" && (
                                                <Tooltip title="Text">
                                                    <IconButton size="small" onClick={() => handleText(phone.number)}>
                                                        <TextsmsIcon fontSize="small" />
                                                    </IconButton>
                                                </Tooltip>
                                            )}
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <Typography variant="body2" color="textSecondary">
                                    No phone numbers available.
                                </Typography>
                            )}

                            {owner.emails && owner.emails?.length > 0 ? (
                                owner.emails.map((email, i) => (
                                    <div key={i} className="flex items-center justify-between gap-2">
                                        <Typography variant="body2">{email}</Typography>
                                        <Tooltip title="Email">
                                            <IconButton size="small" onClick={() => handleEmail(email)}>
                                                <EmailIcon fontSize="small" />
                                            </IconButton>
                                        </Tooltip>
                                    </div>
                                ))
                            ) : (
                                <Typography variant="body2" color="textSecondary">
                                    No emails available.
                                </Typography>
                            )}
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

                    {/* Notes Section */}
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
                        <Button
                            size="small"
                            variant="outlined"
                            onClick={handleSaveNote}
                            disabled={!note.trim()}
                        >
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
                                            {new Date(entry.createdAt ?? 0).toLocaleString()}
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
                            templates={messageType === "text" ? textTemplates : []}
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
    );
};

export default CallListItem;
