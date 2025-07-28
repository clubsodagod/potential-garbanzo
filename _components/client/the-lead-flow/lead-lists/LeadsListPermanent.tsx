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
import { orange } from "@mui/material/colors";
import Image from "next/image";
import React from "react";
import AppToDashboardPortal from "../../layout/AppToDashboardPortal";

const drawerWidth = 340;

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
                    backgroundColor: "#FAFAFAe9",
                    color: "#232323",
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
                        className="w-[175px] h-fit mx-auto"
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

                <Box className="mt-auto p-4 flex flex-wrap">
                    <Button
                        fullWidth
                        variant="contained"
                        sx={{
                            bgcolor: orange[600]
                        }}
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
