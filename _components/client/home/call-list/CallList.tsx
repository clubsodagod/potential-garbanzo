"use client";

import { IRealEstateLeadListDocument } from '@/_database/models/leads/list.model';
import { Typography } from '@mui/material';
import React from 'react';
import CallListItem from './_components/CallListItem';

interface CallListProps {
    /**
     * The selected real estate lead list to be displayed in the call view.
     * If null, a fallback message is shown to prompt list selection.
     */
    callList: IRealEstateLeadListDocument | null;
}

/**
 * CallList Component
 *
 * Displays a selected list of real estate leads for calling, including fallback UI
 * if no list is selected. It renders each lead using the CallListItem component.
 *
 * @component
 * @param {CallListProps} props - Props containing the selected lead list (or null)
 * @returns {JSX.Element} - Rendered component output
 */
const CallList: React.FC<CallListProps> = ({ callList }) => {
    if (!callList) {
        return ;
    }

    const { leadIds, name } = callList;

    return (
        <div className="p-4 ">
            <Typography variant="h6" className="pt-5 pb-10">
                {name} — {leadIds?.length ?? 0} leads
            </Typography>

            <div className="space-y-3">
                {leadIds && leadIds.length > 0 ? (
                    leadIds.map((lead, index) => (
                        <CallListItem key={index} lead={lead} index={index} />
                    ))
                ) : (
                    <Typography variant="body2" color="textSecondary">
                        No leads found in this list.
                    </Typography>
                )}
            </div>
        </div>
    );
};

export default CallList;
