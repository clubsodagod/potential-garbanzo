"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import { logoAltText, pearlBoxLogoMain } from "@/_library/const/brand-assets";
import { navItems } from "@/_library/const/nav-items";

/**
 * PearlBoxGlobalNav
 * Responsive navigation bar using MUI AppBar and Next.js routing.
 */
function PearlBoxGlobalNav() {
    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    return (
        <AppBar position="sticky" sx={{ bgcolor: "transparent", boxShadow: "none" }}>
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    {/* Logo */}
                    <Link href="/" passHref>
                        <Box sx={{ display: "flex", alignItems: "center", cursor: "pointer" }}>
                            <Image alt={logoAltText} src={pearlBoxLogoMain} width={75} height={75} />
                            <Typography
                                variant="h6"
                                noWrap
                                sx={{
                                    ml: 1,
                                    display: { xs: "none", md: "flex" },
                                    fontWeight: 700,
                                    color: "inherit",
                                    textDecoration: "none",
                                }}
                            >
                                Pearl Box & Co
                            </Typography>
                        </Box>
                    </Link>

                    {/* Mobile Menu Button */}
                    <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" }, justifyContent: "flex-end" }}>
                        <IconButton size="large" onClick={handleOpenNavMenu} color="inherit">
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                            transformOrigin={{ vertical: "top", horizontal: "left" }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{ display: { xs: "block", md: "none" } }}
                        >
                            {navItems.map((page) => (
                                <MenuItem key={page.label} onClick={handleCloseNavMenu}>
                                    <Link href={page.path} passHref>
                                        <Typography sx={{ textAlign: "center", width: "100%" }}>{page.label}</Typography>
                                    </Link>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>

                    {/* Desktop Nav Links */}
                    <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" }, justifyContent: "flex-end" }}>
                        {navItems.map((page) => (
                            <Link key={page.label} href={page.path} passHref>
                                <Button
                                    onClick={handleCloseNavMenu}
                                    sx={{ my: 2, color: "white", display: "block", textTransform: "none" }}
                                >
                                    {page.label}
                                </Button>
                            </Link>
                        ))}
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}

export default PearlBoxGlobalNav;
