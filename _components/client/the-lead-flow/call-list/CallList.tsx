"use client";

import React from "react";
import { Typography } from "@mui/material";
import { IRealEstateLeadListDocument } from "@/_database/models/leads/list.model";
import { summarizeInteractions, InteractionSummary } from "@/_utility/helpers/interaction-summary.helper";

import CallListItem from "./_components/CallListItem";
import ContactStatistics from "./_components/ContactStatistics";
import CallListLoadingLottie from "../../layout/loading/CallListLoadingLottie";

interface CallListProps {
    /**
     * The selected real estate lead list (including populated leadIds and interaction histories).
     */
    callList: IRealEstateLeadListDocument | null;

    /**
     * Whether the component is currently loading data.
     */
    isLoading?: boolean;

    /**
     * Optional pre-computed interaction summary.
     * If not provided, it will compute it locally from `callList.leadIds`.
     */
    summary?: InteractionSummary;
}

/**
 * CallList Component
 *
 * Renders a summarized contact performance overview and interactive list of real estate leads.
 * Ideal for use in CRM-style workflows, call blitz dashboards, and agent contact campaigns.
 *
 * Supports optional pre-computed summary (for SSR or parent optimization),
 * and displays a Lottie-based loading UI when `isLoading` is true.
 *
 * @component
 * @example
 * ```tsx
 * <CallList callList={list} isLoading={false} summary={summary} />
 * ```
 */
const CallList: React.FC<CallListProps> = ({ callList, isLoading, summary }) => {

    if (isLoading) return <CallListLoadingLottie />;
    // if (!callList) return null;

    // Null fallback (e.g., invalid list or navigation state)
    if (!callList) return;

    // Fallback: compute interaction summary if not passed in
    const computedSummary =
        summary ??
        summarizeInteractions(
            callList.leadIds.flatMap((lead) => lead.leadInteractionHistory ?? [])
        );

    return (
                        <div className="p-4">

                            <ContactStatistics summary={computedSummary} />

                            <Typography variant="h6" className="pt-5 pb-10">
                                {callList.name} — {callList.leadIds?.length ?? 0} leads
                            </Typography>

                            <div className="space-y-3">
                                {callList.leadIds.map((lead, index) => (
                                    <CallListItem
                                        key={lead._id?.toString() || index}
                                        lead={lead}
                                        index={index}
                                        interactionHistory={
                                            [...(lead.leadInteractionHistory ?? [])].sort(
                                                (a, b) =>
                                                    new Date(b.createdAt ?? "").getTime() -
                                                    new Date(a.createdAt ?? "").getTime()
                                            )
                                        }
                                    />
                                ))}
                            </div>
                        </div>

    );
};

export default CallList;
