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
import { IRealEstateLeadDocument } from "@/_library/types-interfaces-classes/leads";
import { motion } from "motion/react"
import { cardExpandVariants, expandIconVariants, springInView } from "@/_library/animations/call-list.animations";
import { LeadRecordDocument } from "@/_database/models/leads/real-estate-lead-record.model";

/**
 * Props for the CallListItem component.
 */
interface CallListItemProps {
    /**
     * The lead to render interaction actions and details for.
     */
    lead: IRealEstateLeadDocument;

    /**
     * Index of the lead in the list (for display ordering).
     */
    index: number;

    /**
     * Pre-fetched interaction history for the lead.
     */
    interactionHistory: LeadRecordDocument[];
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
    const [detailsExpanded, setDetailsExpanded] = useState(false);

    const { data: session } = useSession();
    const currentUser = session?.user as unknown as IUser;

    /**
     * Expands or collapses the lead card.
     */
    const toggleExpanded = () => setExpanded((prev) => !prev);

    /**
     * Expands or collapses the addtional details of the lead card.
     */
    const toggleDetails = () => setDetailsExpanded(prev => !prev);

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
            <motion.div
                variants={cardExpandVariants}
                animate={expanded ? "expanded" : "collapsed"}
            >
                <Card onClick={(e) => { e.stopPropagation() }} variant="outlined" className="transition-shadow duration-150 hover:shadow-md">
                    <CardContent className="cursor-pointer" onClick={(e) => {
                        if (expanded) {
                            return
                        }; toggleExpanded(); e.stopPropagation();
                    }}>
                        <Typography variant="subtitle2" gutterBottom>
                            #{index + 1} — {ownerName}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                            {lead.property.address}, {lead.property.city}, {lead.property.state} {lead.property.zip}
                        </Typography>
                        <Typography variant="caption" color="textSecondary">
                            Status: {lead.leadStatus} | Type: {lead.leadType}
                        </Typography>

                        <IconButton size="small" onClick={(e) => { toggleExpanded(); e.stopPropagation(); }}>
                            <motion.div
                                animate={expanded ? "expanded" : "collapsed"}
                                variants={expandIconVariants}
                            >
                                <ExpandMoreIcon fontSize="small" />
                            </motion.div>
                        </IconButton>

                    </CardContent>

                    <Collapse onClick={(e) => { e.stopPropagation() }} in={expanded} timeout="auto" unmountOnExit>
                        <Divider />
                        <CardContent onClick={(e) => { e.stopPropagation() }} className="space-y-3 pt-2">
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
                                                    <IconButton size="small" onClick={(e) => { handleCall(phone.number); e.stopPropagation(); }}>
                                                        <PhoneIcon fontSize="small" />
                                                    </IconButton>
                                                </Tooltip>
                                                {phone.type?.toLowerCase() === "mobile" && (
                                                    <Tooltip title="Text">
                                                        <IconButton size="small" onClick={(e) => { handleText(phone.number); e.stopPropagation(); }}>
                                                            <TextsmsIcon fontSize="small" />
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
                                                <IconButton size="small" onClick={(e) => { handleEmail(email); e.stopPropagation() }}>
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
                                                    {entry?.actionType.toUpperCase()}: {entry.note}
                                                </Typography>
                                            </Box>
                                        ))}
                                    </Stack>
                                </div>
                            )}

                            {/* Additional Details */}
                            <Button
                                size="small"
                                onClick={(e) => { e.stopPropagation(); toggleDetails() }}
                                sx={{ mt: 2 }}
                            >
                                {detailsExpanded ? "Hide Full Details" : "Show Full Details"}
                            </Button>

                            <Collapse in={detailsExpanded} timeout="auto" unmountOnExit>
                                <Divider sx={{ my: 2 }} />
                                <Stack spacing={1}>
                                    {/* Mailing Info */}
                                    {lead.mailingInfo && (
                                        <Box>
                                            <Typography variant="subtitle2">📬 Mailing Info</Typography>
                                            <Typography variant="body2">
                                                {lead.mailingInfo.address}, {lead.mailingInfo.city}, {lead.mailingInfo.state} {lead.mailingInfo.zip}
                                            </Typography>
                                            <Typography variant="body2">
                                                County: {lead.mailingInfo.county ?? "—"}
                                            </Typography>
                                            <Typography variant="body2">
                                                Vacant: {lead.mailingInfo.isVacant ? "Yes" : "No"} | Mailing Vacant: {lead.mailingInfo.isMailingVacant ? "Yes" : "No"}
                                            </Typography>
                                            <Typography variant="body2">
                                                Litigator: {lead.mailingInfo.isLitigator ? "Yes" : "No"} | Opt-Out: {lead.mailingInfo.optOut ? "Yes" : "No"}
                                            </Typography>
                                        </Box>
                                    )}

                                    {/* Loan Info */}
                                    {lead.loanInfo && (
                                        <Box>
                                            <Typography variant="subtitle2">💰 Loan Info</Typography>
                                            <Typography variant="body2">
                                                Amount: ${lead.loanInfo.loanAmount?.toLocaleString() ?? "—"} | Balance: ${lead.loanInfo.loanEstBalance?.toLocaleString() ?? "—"}
                                            </Typography>
                                            <Typography variant="body2">
                                                Type: {lead.loanInfo.loanType ?? "—"} | Lender: {lead.loanInfo.loanLenderName ?? "—"}
                                            </Typography>
                                            <Typography variant="body2">
                                                Interest Rate: {lead.loanInfo.loanEstInterestRate ?? "—"}% | Est. Payment: ${lead.loanInfo.loanEstPayment ?? "—"}
                                            </Typography>
                                            <Typography variant="body2">
                                                Recorded: {lead.loanInfo.loanRecordingDate ? new Date(lead.loanInfo.loanRecordingDate).toLocaleDateString() : "—"}
                                            </Typography>
                                        </Box>
                                    )}

                                    {/* Foreclosure Info */}
                                    {lead.foreclosureInfo && (
                                        <Box>
                                            <Typography variant="subtitle2">⚠️ Foreclosure</Typography>
                                            <Typography variant="body2">
                                                Status: {lead.foreclosureInfo.status ?? "—"} | Document: {lead.foreclosureInfo.documentType ?? "—"}
                                            </Typography>
                                            <Typography variant="body2">
                                                Auction: {lead.foreclosureInfo.auctionDate ? new Date(lead.foreclosureInfo.auctionDate).toLocaleDateString() : "—"}
                                            </Typography>
                                            <Typography variant="body2">
                                                Trustee: {lead.foreclosureInfo.trusteeOrAttorney ?? "—"} | Case #: {lead.foreclosureInfo.caseNumber ?? "—"}
                                            </Typography>
                                        </Box>
                                    )}

                                    {/* Metadata */}
                                    {lead.metadata && (
                                        <Box>
                                            <Typography variant="subtitle2">📊 Metadata</Typography>
                                            <Typography variant="body2">
                                                Owner Occupied: {lead.metadata.ownerOccupied ? "Yes" : "No"} | Self-Managed: {lead.metadata.selfManaged ? "Yes" : "No"}
                                            </Typography>
                                            <Typography variant="body2">
                                                Created: {lead.metadata.createdDate ? new Date(lead.metadata.createdDate).toLocaleDateString() : "—"}
                                            </Typography>
                                            {lead.metadata.mlsAgent && (
                                                <Box>
                                                    <Typography variant="body2">
                                                        MLS Agent: {lead.metadata.mlsAgent.fullName ?? "—"} | {lead.metadata.mlsAgent.email ?? ""}
                                                    </Typography>
                                                    <Typography variant="body2">
                                                        Brokerage: {lead.metadata.mlsAgent.brokerageName ?? "—"} | Phone: {lead.metadata.mlsAgent.phone ?? "—"}
                                                    </Typography>
                                                </Box>
                                            )}
                                        </Box>
                                    )}
                                </Stack>
                            </Collapse>

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
