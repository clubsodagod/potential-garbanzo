"use client";

import React from "react";
import {
    AppBar,
    Toolbar,
    IconButton,
    Box,
    Tooltip,
} from "@mui/material";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import PlaylistAddRoundedIcon from "@mui/icons-material/PlaylistAddRounded";
import Image from "next/image";
import { logoMain } from "@/_library/const/brand-assets";
import { orange } from "@mui/material/colors";

/**
 * Props for the Navbar component.
 */
interface NavbarProps {
    /**
     * Index of the currently selected lead list, or `null` if none is selected.
     * Used to determine whether to show the "Create New List" button.
     */
    selectedList: number | null;

    /**
     * Optional callback to trigger creation of a new lead list.
     */
    onAddNewList?: () => void;

    /**
     * Optional callback fired when the mobile menu button is clicked.
     */
    onMenuClick?: () => void;
}

/**
 * Navbar Component
 *
 * A mobile-only top navigation bar containing:
 * - A hamburger menu button (left)
 * - A centered logo (center)
 * - An "Add New List" button (right, visible only if no list is selected)
 *
 * @param props - Props for Navbar (selected list, handlers)
 * @returns {JSX.Element}
 */
const Navbar: React.FC<NavbarProps> = ({
    selectedList,
    onAddNewList,
    onMenuClick,
}) => {
    return (
        <AppBar
            position="sticky"
            color="default"
            elevation={1}
            sx={{
                display: { md: "none" }, // Show only on mobile
                bgcolor: orange[600],
            }}
        >
            <Toolbar sx={{ px: 2, minHeight: 64, width: "100%" }}>
                {/* Left: Hamburger Menu */}
                <Box sx={{ display: "flex", alignItems: "center" }}>
                    <IconButton
                        edge="start"
                        onClick={onMenuClick}
                        sx={{ mr: 1, display: { md: "none" }, color: "#fafafa" }}
                    >
                        <MenuRoundedIcon />
                    </IconButton>
                </Box>

                {/* Center: Logo */}
                <Box sx={{ flexGrow: 1, display: "flex", justifyContent: "center" }}>
                    <Image
                        src={logoMain}
                        alt="Logo"
                        width={175}
                        height={40}
                        priority
                    />
                </Box>

                {/* Right: New List Button (if no list is selected) */}
                <Box sx={{ display: "flex", alignItems: "center" }}>
                    {!selectedList && onAddNewList && (
                        <Tooltip title="Create New List">
                            <IconButton sx={{ color: "#fafafa" }} onClick={onAddNewList}>
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
