'use client';

import { createTheme, responsiveFontSizes } from '@mui/material/styles';
import { MuseoModerno, Exo_2 } from 'next/font/google';

// Correct font setup with consistent variable names
const museoModerno = MuseoModerno({
  variable: '--font-museo-moderno',
  subsets: ['latin'],
  weight: 'variable',
});

const exo2 = Exo_2({
  variable: '--font-exo-2',
  subsets: ['latin'],
  weight: 'variable',
});

// MUI theme using the font CSS variables
const lightTheme = createTheme({
  cssVariables: true,
  typography: {
    fontFamily: `${museoModerno.style.fontFamily}, ${exo2.style.fontFamily}, "Roboto", "Helvetica", "Arial", sans-serif`,
    h1: {
      fontFamily: museoModerno.style.fontFamily,
      fontWeight: 700,
      lineHeight: 0.75,
    },
    h2: {
      fontFamily: museoModerno.style.fontFamily,
      fontWeight: 700,
    },
    h3: {
      fontFamily: museoModerno.style.fontFamily,
      fontWeight: 700,
    },
    h4: {
      fontFamily: museoModerno.style.fontFamily,
      fontWeight: 700,
    },
    h5: {
      fontFamily: museoModerno.style.fontFamily,
      fontWeight: 700,
    },
    h6: {
      fontFamily: museoModerno.style.fontFamily,
      fontWeight: 400,
    },
    body1: {
      fontFamily: exo2.style.fontFamily,
      fontWeight: 400,
    },
    body2: {
      fontFamily: exo2.style.fontFamily,
      fontWeight: 400,
    },
    overline: {
      fontFamily: exo2.style.fontFamily,
      fontWeight: 400,
    },
    subtitle1: {
      fontFamily: exo2.style.fontFamily,
      fontWeight: 400,
    },
    subtitle2: {
      fontFamily: exo2.style.fontFamily,
      fontWeight: 400,
    },
    caption: {
      fontFamily: exo2.style.fontFamily,
      fontWeight: 400,
    },
  },
});

export default responsiveFontSizes(lightTheme);
