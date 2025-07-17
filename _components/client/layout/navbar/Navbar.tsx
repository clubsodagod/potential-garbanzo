"use client";

import React from "react";
import { AppBar, Toolbar, IconButton, Box, Tooltip } from "@mui/material";
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import PlaylistAddRoundedIcon from '@mui/icons-material/PlaylistAddRounded';
import Image from "next/image";
import { logoMain } from "@/_library/const/brand-assets";

interface NavbarProps {
    selectedList: number | null;
    onAddNewList?: () => void;
    onMenuClick?: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ selectedList, onAddNewList, onMenuClick }) => {
    return (
        <AppBar position="static" color="default" elevation={1}
            sx={{
                display:{md:"hidden"}
            }}
        >
            <Toolbar sx={{ justifyContent: "space-between" }}>
                {/* Hamburger Menu */}
                <IconButton edge="start" onClick={onMenuClick} sx={{ mr: 2 }}>
                    <MenuRoundedIcon />
                </IconButton>

                {/* Logo */}
                <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Image src={logoMain} alt="Logo" width={120} height={40} priority />
                </Box>

                {/* Add New List (only if no list is selected) */}
                <Box>
                    {!selectedList && onAddNewList && (
                        <Tooltip title="Create New List">
                            <IconButton color="primary" onClick={onAddNewList}>
                                <PlaylistAddRoundedIcon />
                            </IconButton>
                        </Tooltip>
                    )}
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
