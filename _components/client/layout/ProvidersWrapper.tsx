"use client"

import lightTheme from '@/_library/themes/light.theme';
import { CssBaseline } from '@mui/material';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { ThemeProvider } from '@mui/material/styles';
import React from 'react'


const ProvidersWrapper: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {

    return (
        <AppRouterCacheProvider
            options={{ 
                key: 'css',
                enableCssLayer: true,
            }}
        >
            <ThemeProvider theme={lightTheme}>
                <CssBaseline />
                {children}
            </ThemeProvider>

        </AppRouterCacheProvider>
    )
}



export default ProvidersWrapper;