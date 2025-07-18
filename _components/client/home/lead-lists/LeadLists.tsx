"use client";

import { IRealEstateLeadListDocument } from "@/_database/models/leads/list.model";
import { logoAltText, logoMain } from "@/_library/const/brand-assets";
import {
    Drawer,
    List,
    ListSubheader,
    Typography,
    ListItem,
    ListItemButton,
    ListItemText,
    Button,
    Divider,
} from "@mui/material";
import Image from "next/image";
import React from "react";

const drawerWidth = 240;

interface LeadListsProps {
    /**
     * The list of uploaded real estate lead lists.
     */
    leadLists: IRealEstateLeadListDocument[] | null;

    /**
     * Whether the drawer is currently open (for mobile).
     */
    mobileOpen: boolean;

    /**
     * Callback to toggle the drawer's open/close state.
     */
    handleDrawerToggle: () => void;

    /**
     * Sets the currently selected list index.
     */
    setSelectedList: React.Dispatch<React.SetStateAction<number | null>>;

    /**
     * The currently selected list index.
     */
    selectedListIndex: number | null;

    /**
     * Callback when user clicks "Add New List"
     */
    onAddNewList: () => void;
}

/**
 * LeadLists Component
 *
 * Renders a responsive drawer for selecting real estate lead lists.
 * Supports list selection, highlighting, adding a new list, and drawer behavior by screen size.
 */
const LeadLists: React.FC<LeadListsProps> = ({
    leadLists,
    mobileOpen,
    handleDrawerToggle,
    setSelectedList,
    selectedListIndex,
    onAddNewList,
}) => {
    const handleSelect = (index: number) => {
        setSelectedList(index);
        handleDrawerToggle(); // Close drawer on mobile
    };

    return (
        <Drawer
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            sx={(theme) => ({
                width: drawerWidth,
                flexShrink: 0,
                display: {
                    xs: mobileOpen ? "block" : "none", // hide on mobile when closed
                    md: "block", // always show on md+
                },
                "& .MuiDrawer-paper": {
                    boxSizing: "border-box",
                    width: drawerWidth,
                    backgroundColor:
                        theme.palette.mode === "dark" ? "#FAFAFAe9" : "#232323e9",
                    color: theme.palette.mode === "dark" ? "#232323" : "#FAFAFA",
                },
                "& .MuiBackdrop-root": {
                    backdropFilter: "blur(2.5px)",
                },
            })}
        >
            <div className="lead-lists-wrapper flex flex-col h-full">
                <div className="img-wrapper py-4">
                    <Image
                        src={logoMain}
                        alt={logoAltText}
                        width={9}
                        height={16}
                        sizes="100vw"
                        style={{ objectFit: "contain" }}
                        className="w-[125px] h-[75px] mx-auto"
                    />
                </div>

                <Divider sx={{ mb: 1 }} />

                <List subheader={<ListSubheader>Lists</ListSubheader>} dense>
                    {leadLists && leadLists.length > 0 ? (
                        leadLists.map((list, index) => (
                            <ListItem key={list._id} disablePadding>
                                <ListItemButton
                                    selected={selectedListIndex === index}
                                    onClick={() => handleSelect(index)}
                                >
                                    <ListItemText
                                        primary={list.name}
                                        slotProps={{
                                            primary:{
                                                fontSize: 14,
                                            fontWeight: 500,
                                            noWrap: true,
                                            }
                                        }}
                                    />
                                </ListItemButton>
                            </ListItem>
                        ))
                    ) : (
                        <div className="px-4 py-2">
                            <Typography variant="body2">Loading Lists...</Typography>
                        </div>
                    )}
                </List>

                <div className="mt-auto p-4">
                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        onClick={() => {
                            onAddNewList();
                        }}
                    >
                        + Add New List
                    </Button>
                </div>
            </div>
        </Drawer>
    );
};

export default LeadLists;
