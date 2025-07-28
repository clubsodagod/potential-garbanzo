"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
    AppBar,
    Box,
    Toolbar,
    IconButton,
    Typography,
    Menu,
    MenuItem,
    Container,
    Button,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { logoAltText, pearlBoxLogoMain } from "@/_library/const/brand-assets";
import { navItems } from "@/_library/const/nav-items";

/**
 * PearlBoxGlobalNav
 * Responsive navigation bar using MUI AppBar and Next.js routing.
 * Automatically hides if user is on a nested /pearl-bar/* route.
 */
function PearlBoxGlobalNav() {
    const pathname = usePathname();
    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    // Hide navbar on nested Pearl Bar routes (e.g., /pearl-bar/tool-name)
    const hideOnSubPearlBar = pathname.startsWith("/pearl-bar/");

    if (hideOnSubPearlBar) return null;

    return (
        <AppBar position="sticky" sx={{ bgcolor: "#232323" }}>
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    {/* Logo */}
                    <Link href="/" passHref>
                        <Box sx={{ display: "flex", alignItems: "center", cursor: "pointer" }}>
                            <Image alt={logoAltText} src={pearlBoxLogoMain} width={50} height={50} />
                            <Typography
                                variant="h6"
                                noWrap
                                sx={{
                                    ml: 1,
                                    display: { xs: "none", md: "flex" },
                                    fontWeight: 500,
                                    color: "inherit",
                                    textDecoration: "none",
                                }}
                            >
                                Pearl Box
                            </Typography>
                        </Box>
                    </Link>

                    {/* Mobile Menu */}
                    <Box
                        sx={{
                            flexGrow: 1,
                            display: { xs: "flex", md: "none" },
                            justifyContent: "flex-end",
                        }}
                    >
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

                    {/* Desktop Links */}
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
