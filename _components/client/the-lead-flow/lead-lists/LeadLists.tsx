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
import { orange } from "@mui/material/colors";
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
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                display: {
                    xs: mobileOpen ? "block" : "none", // hide on mobile when closed
                    md: "block", // always show on md+
                },
                "& .MuiDrawer-paper": {
                    boxSizing: "border-box",
                    width: drawerWidth,
                    backgroundColor: "#FAFAFAe9",
                    color: "#232323",
                },
                "& .MuiBackdrop-root": {
                    backdropFilter: "blur(2.5px)",
                },
            }}
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
                        className="w-[175px] h-fit mx-auto"
                    />
                </div>

                <Divider sx={{ mb: 1 }} />

                <List subheader={<ListSubheader>Lists</ListSubheader>} dense>
                    {leadLists && leadLists.length > 0 ? (
                        leadLists.map((list, index) => (
                            <ListItem key={`${list._id}`} disablePadding>
                                <ListItemButton
                                    selected={selectedListIndex === index}
                                    onClick={() => handleSelect(index)}
                                >
                                    <ListItemText
                                        primary={list.name}
                                        slotProps={{
                                            primary: {
                                                fontSize: 14,
                                                fontWeight: 500,
                                                noWrap: true,
                                            },
                                        }}
                                    />
                                </ListItemButton>
                            </ListItem>
                        ))
                    ) : (
                        <div className="px-4 py-3 text-center">
                            <Typography variant="subtitle2" gutterBottom>
                                No Lists Yet
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component={"p"}>
                                Start by adding your first lead list. Once uploaded, you&apos;ll be able to view and manage your leads here.
                            </Typography>
                        </div>
                    )}

                </List>

                <div className="mt-auto p-4">
                    <Button
                        fullWidth
                        variant="contained"
                        color={"warning"}
                        sx={{
                            bgcolor: orange[600]
                        }}
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
