"use client";

import React, { useEffect, useState } from "react";
import CallList from "./call-list/CallList";
import ListLoader from "./list-loader/ListLoader";
import Navbar from "../layout/navbar/Navbar";
import LeadLists from "./lead-lists/LeadLists";
import { getAllLists } from "@/_utility/fetchers/leads/get-all-lists.fetcher";
import { IRealEstateLeadListDocument } from "@/_database/models/leads/list.model";
import LeadListsPermanent from "./lead-lists/LeadsListPermanent";

/**
 * LeadFlowHomeModule
 *
 * Main page module for managing uploaded real estate lead lists and viewing contactable leads.
 * This component includes:
 * - A responsive mobile drawer for selecting lead lists
 * - A call list preview based on the selected lead list
 * - A list uploader to import new leads
 * - A top navbar for control access
 *
 * @component
 * @returns {JSX.Element}
 */
const LeadFlowHomeModule: React.FC = () => {
    const [leadLists, setLeadLists] = useState<IRealEstateLeadListDocument[] | null>(null);
    const [selectedListIndex, setSelectedListIndex] = useState<number | null>(null);
    const [mobileOpen, setMobileOpen] = useState(false);

    /**
     * Fetches all lead lists from the database.
     */
    const refreshLists = async () => {
        const response = await getAllLists();
        if (response.success) {
            setLeadLists(response.data);
        } else {
            console.error("Failed to fetch lead lists:", response.error);
        }
    };

    useEffect(() => {
        refreshLists();
    }, []);

    /**
     * Toggles the mobile drawer (sidebar) for viewing lead lists.
     */
    const handleDrawerToggle = () => {
        setMobileOpen((prev) => !prev);
    };

    /**
     * Handles request from Navbar to create a new list.
     * For now, just opens the drawer to start uploading.
     */
    const handleAddNewList = () => {
        setSelectedListIndex(null); // Reset selection
        setMobileOpen(false); // Prompt user to upload
    };

    const selectedList =
        selectedListIndex !== null && leadLists ? leadLists[selectedListIndex] : null;

    return (
        <main
            className="min-h-screen w-full flex flex-col"
        >
            <div
                className="flex h-full"
            >

                <div>
                    {/* Lead List Drawer for mobile */}
                    <LeadListsPermanent
                        leadLists={leadLists}
                        setSelectedList={setSelectedListIndex}
                        selectedListIndex={selectedListIndex}
                        onAddNewList={handleAddNewList}
                    />
                </div>

                <div
                    className="w-full h-screen flex flex-col"
                >

                    {/* Top Navbar */}
                    <Navbar
                        selectedList={selectedListIndex}
                        onAddNewList={handleAddNewList}
                        onMenuClick={handleDrawerToggle}
                    />
                    <div
                        className="w-full grow flex flex-col justify-center items-center  px-6"
                    >
                        {/* Main Layout */}

                        {/* Call List View */}
                        {
                            selectedListIndex !== null && (
                                <section className="flex-1">
                                    <CallList callList={selectedList} />
                                </section>
                            )
                        }


                        {/* Upload Section */}
                        {
                            selectedListIndex === null && (
                                <section className="w-full md:max-w-sm">
                                    <ListLoader refreshLists={refreshLists} />
                                </section>
                            )
                        }


                    </div>

                </div>

            </div>


            {/* Lead List Drawer for mobile */}
            <LeadLists
                leadLists={leadLists}
                mobileOpen={mobileOpen}
                handleDrawerToggle={handleDrawerToggle}
                setSelectedList={setSelectedListIndex}
                selectedListIndex={selectedListIndex}
                onAddNewList={handleAddNewList}
            />
        </main>
    );
};

export default LeadFlowHomeModule;
