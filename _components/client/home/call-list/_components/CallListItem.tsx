"use client";

import { IRealEstateLead } from '@/_library/types-interfaces-classes/leads';
import {
    Card,
    CardContent,
    Typography,
    IconButton,
    Collapse,
    Tooltip,
    Divider,
} from '@mui/material';
import React, { useState } from 'react';
import PhoneIcon from '@mui/icons-material/Phone';
import TextsmsIcon from '@mui/icons-material/Textsms';
import EmailIcon from '@mui/icons-material/Email';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { textTemplates } from '@/_library/const/text.templates';
import MessageActions from './MessageActions';
import preforeclosureEmailTemplates from '@/_library/const/email-templates';

interface CallListItemProps {
    /**
     * The individual real estate lead to be rendered.
     */
    lead: IRealEstateLead;

    /**
     * The index of the lead in the current list, used for display ordering.
     */
    index: number;
}

/**
 * CallListItem Component
 *
 * Renders an individual real estate lead with expandable contact and property info.
 * Provides placeholder action handlers for call, text, and email functionality.
 *
 * @component
 * @param {CallListItemProps} props - Props containing a lead and its index
 * @returns {JSX.Element}
 */
const CallListItem: React.FC<CallListItemProps> = ({ lead, index }) => {
    const [expanded, setExpanded] = useState(false);
    const toggleExpanded = () => setExpanded((prev) => !prev);

    const [messageDialogOpen, setMessageDialogOpen] = useState(false);
    const [messageType, setMessageType] = useState<'text' | 'email' | null>(null);
    const [selectedContact, setSelectedContact] = useState<{ phone?: string; email?: string } | null>(null);

    const ownerName = lead.owner?.[0]
        ? `${lead.owner[0].firstName ?? ''} ${lead.owner[0].lastName ?? ''}`.trim()
        : 'Unknown Owner';

    const handleCall = (number: string): void => {
        console.log(`Call initiated to ${number}`);
        // TODO: implement call logic
    };

    const handleText = (number: string): void => {
        setMessageType('text');
        setSelectedContact({ phone: number });
        setMessageDialogOpen(true);
    };

    const handleEmail = (email: string): void => {
        setMessageType('email');
        setSelectedContact({ email });
        setMessageDialogOpen(true);
    };

    const onSelectTemplate = (
        message: string,
        recipient: { phone?: string; email?: string }
    ) => {
        if (messageType === "text" && recipient.phone) {
            window.location.href = `sms:${recipient.phone}?body=${encodeURIComponent(message)}`;
        } else if (messageType === "email" && recipient.email) {
            window.location.href = `mailto:${recipient.email}?subject=Regarding your property&body=${encodeURIComponent(message)}`;
        }
    };

    return (
        <Card variant="outlined" className={` transition-shadow duration-150 hover:shadow-md ${index > 0 && "mt-10"}`}>
            <CardContent onClick={toggleExpanded} className="cursor-pointer">
                <Typography variant="subtitle2" gutterBottom>
                    #{index + 1} — {ownerName || 'No Name'}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                    {lead.property.address}, {lead.property.city}, {lead.property.state} {lead.property.zip}
                </Typography>
                <Typography variant="caption" color="textSecondary">
                    Status: {lead.leadStatus} | Type: {lead.leadType}
                </Typography>
                <IconButton size="small" onClick={(e) => { e.stopPropagation(); toggleExpanded() }}>
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

                            {/* Phones */}
                            {owner.phones?.length > 0 ? (
                                owner.phones.map((phone, i) => (
                                    <div key={i} className={`flex items-center justify-between gap-2 ${i > 0 && "mt-3"}`}>
                                        <Typography variant="body2">
                                            {phone.number} ({phone.type})
                                        </Typography>

                                        <Tooltip title="Call">
                                            <IconButton size="small" onClick={() => handleCall(phone.number)}>
                                                <PhoneIcon fontSize="small" />
                                            </IconButton>
                                        </Tooltip>

                                        {phone.type?.toLowerCase() === 'mobile' && (
                                            <Tooltip title="Text">
                                                <IconButton size="small" onClick={() => handleText(phone.number)}>
                                                    <TextsmsIcon fontSize="small" />
                                                </IconButton>
                                            </Tooltip>
                                        )}
                                    </div>
                                ))
                            ) : (
                                <Typography variant="body2" color="textSecondary">
                                    No phone numbers available.
                                </Typography>
                            )}

                            {/* Emails */}
                            {owner.emails && owner.emails?.length > 0 ? (
                                owner.emails.map((email, i) => (
                                    <div key={i} className="flex items-center gap-2">
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
                            Beds: {lead.property.bedroomCount ?? '—'}, Baths: {lead.property.bathroomCount ?? '—'}
                        </Typography>
                        <Typography variant="body2">
                            Sq Ft: {lead.property.totalBuildingAreaSqFt ?? '—'}, Built: {lead.property.yearBuilt ?? '—'}
                        </Typography>
                        <Typography variant="body2">
                            Estimated Value: ${lead.property.estimatedValue?.toLocaleString() ?? '—'}
                        </Typography>
                    </div>
                </CardContent>
            </Collapse>
            {messageType && selectedContact && (
                <MessageActions
                    open={messageDialogOpen}
                    onClose={() => setMessageDialogOpen(false)}
                    type={messageType || "text"}
                    templates={messageType === "text" ? textTemplates : messageType === "email" ? preforeclosureEmailTemplates : []}
                    onSelectTemplate={(message) =>
                        onSelectTemplate(message, selectedContact)
                    }
                    lead={{
                        firstName: lead.owner?.[0]?.firstName ?? '',
                        address: lead.property?.address ?? '',
                        phone: selectedContact?.phone,
                        email: selectedContact?.email,
                    }}
                />
            )}
        </Card>
    );
};

export default CallListItem;
