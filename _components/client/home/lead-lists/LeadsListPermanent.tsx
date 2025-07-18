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
    Box,
} from "@mui/material";
import Image from "next/image";
import React from "react";

const drawerWidth = 240;

interface LeadListsPermanentProps {
    leadLists: IRealEstateLeadListDocument[] | null;
    selectedListIndex: number | null;
    setSelectedList: React.Dispatch<React.SetStateAction<number | null>>;
    onAddNewList: () => void;
}

/**
 * LeadListsPermanent Component
 *
 * A sidebar permanently displayed on `md` screens and larger.
 * Used for managing real estate lead list selection and actions.
 */
const LeadListsPermanent: React.FC<LeadListsPermanentProps> = ({
    leadLists,
    selectedListIndex,
    setSelectedList,
    onAddNewList,
}) => {
    const handleSelect = (index: number) => {
        setSelectedList(index);
    };

    return (
        <Drawer
            variant="permanent"
            sx={(theme) => ({
                width: drawerWidth,
                flexShrink: 0,
                display: {
                    xs: "none",
                    md: "block",
                },
                "& .MuiDrawer-paper": {
                    width: drawerWidth,
                    boxSizing: "border-box",
                    backgroundColor:
                        theme.palette.mode === "dark" ? "#FAFAFAe9" : "#232323e9",
                    color: theme.palette.mode === "dark" ? "#232323" : "#FAFAFA",
                    borderRight: "none",
                },
            })}
            open
        >
            <Box className="lead-lists-wrapper flex flex-col h-full">
                <Box className="img-wrapper py-4">
                    <Image
                        src={logoMain}
                        alt={logoAltText}
                        width={9}
                        height={16}
                        sizes="100vw"
                        style={{ objectFit: "contain" }}
                        className="w-[125px] h-[75px] mx-auto"
                    />
                </Box>

                <Divider sx={{ mb: 1 }} />

                <List
                    subheader={
                        <ListSubheader >
                            Lists
                        </ListSubheader>
                    }
                    dense
                >
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
                                            }
                                        }}
                                    />
                                </ListItemButton>
                            </ListItem>
                        ))
                    ) : (
                        <Box className="px-4 py-2">
                            <Typography variant="body2">Loading Lists...</Typography>
                        </Box>
                    )}
                </List>

                <Box className="mt-auto p-4">
                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        onClick={onAddNewList}
                    >
                        + Add New List
                    </Button>
                </Box>
            </Box>
        </Drawer>
    );
};

export default LeadListsPermanent;
