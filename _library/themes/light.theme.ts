'use client';
import { createTheme } from '@mui/material/styles';

const lightTheme = createTheme({
    cssVariables: true,
  typography: {
    fontFamily: 'var(--font-roboto)',
  },
});

export default lightTheme;
