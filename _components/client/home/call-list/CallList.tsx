"use client";

import React from "react";
import { Typography } from "@mui/material";
import { IRealEstateLeadListDocument } from "@/_database/models/leads/list.model";
import { getLeadInteractionHistory } from "@/_utility/fetchers/leads/get-lead-interaction-history.fetcher";
import { InteractionSummary, summarizeInteractions } from "@/_utility/helpers/interaction-summary.helper";
import { ICleanLeadRecord } from "@/_library/types-interfaces-classes/leads";

import CallListItem from "./_components/CallListItem";
import ContactStatistics from "./_components/ContactStatistics";

interface CallListProps {
    callList: IRealEstateLeadListDocument | null;
}

/**
 * CallList Component
 *
 * Displays a selected list of real estate leads with a stats summary and each lead item.
 * Fetches and maps full interaction histories in one batch for performance.
 */
const CallList: React.FC<CallListProps> = ({ callList }) => {
    const [interactionSummary, setInteractionSummary] = React.useState<InteractionSummary>({
        callCount: 0,
        emailCount: 0,
        textCount: 0,
        noteCount: 0,
    });

    const [interactionMap, setInteractionMap] = React.useState<Map<string, ICleanLeadRecord[]>>(new Map());

    React.useEffect(() => {
        const fetchInteractions = async () => {
            if (!callList?.leadIds?.length) return;

            let allRecords: ICleanLeadRecord[] = [];
            const map = new Map<string, ICleanLeadRecord[]>();

            for (const lead of callList.leadIds) {
                try {
                    const history = await getLeadInteractionHistory(`${lead._id}`);
                    allRecords = allRecords.concat(history);

                    map.set(lead._id ?? "", history);
                } catch (err) {
                    console.error("Interaction fetch error:", err);
                }
            }

            setInteractionMap(map);
            setInteractionSummary(summarizeInteractions(allRecords));
        };

        fetchInteractions();
    }, [callList]);

    if (!callList) return null;

    return (
        <div className="p-4">
            <ContactStatistics summary={interactionSummary} />
            <Typography variant="h6" className="pt-5 pb-10">
                {callList.name} — {callList.leadIds?.length ?? 0} leads
            </Typography>

            <div className="space-y-3">
                {callList.leadIds.map((lead, index) => (
                    <CallListItem
                        key={index}
                        lead={lead}
                        index={index}
                        interactionHistory={(interactionMap.get(lead._id ?? "") ?? []).sort(
                            (a, b) => new Date(b.createdAt ?? "").getTime() - new Date(a.createdAt ?? "").getTime()
                        )}
                    />
                ))}
            </div>
        </div>
    );
};

export default CallList;
