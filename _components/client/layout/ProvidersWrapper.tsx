"use client";

import React from "react";
import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "react-hot-toast";
import lightTheme from "@/_library/themes/light.theme";

/**
 * Props for the ProvidersWrapper component.
 */
interface ProvidersWrapperProps {
    /**
     * The root React node (typically your app or layout) that will be wrapped in providers.
     */
    children: React.ReactNode;
}

/**
 * ProvidersWrapper Component
 *
 * Wraps the application with all necessary global providers:
 * - `SessionProvider` for next-auth session management
 * - `AppRouterCacheProvider` for MUI Next.js integration
 * - `ThemeProvider` and `CssBaseline` for consistent theming
 * - `Toaster` for global toast notifications
 *
 * This component is typically used in `layout.tsx` or `app.tsx`.
 *
 * @param props - The child components to wrap in global context
 * @returns {JSX.Element}
 */
const ProvidersWrapper: React.FC<ProvidersWrapperProps> = ({ children }) => {
    return (
        <SessionProvider>
            <AppRouterCacheProvider
                options={{
                    key: "css",
                    enableCssLayer: true,
                }}
            >
                <ThemeProvider theme={lightTheme}>
                    <CssBaseline />
                    <Toaster position="top-right" />
                    {children}
                </ThemeProvider>
            </AppRouterCacheProvider>
        </SessionProvider>
    );
};

export default ProvidersWrapper;
