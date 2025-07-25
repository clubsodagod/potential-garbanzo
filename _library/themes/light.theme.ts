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
  components: {
    MuiButton: {
      defaultProps: {
        size: 'large',
      },
      styleOverrides: {
        outlined: {
          position: 'relative',
          color: 'white',
          backgroundColor: 'rgba(244, 236, 236, 0.2)',
          minWidth: '11.75rem',
          borderRadius: '34px',
          fontWeight: 600,
          border: 'none',
          padding: '0.9375rem 1.5rem',
          zIndex: 1, // Ensure content is above the pseudo-element

          '&:hover': {
            backgroundColor: '#000000',
            boxShadow: `
    0 0 6px #FFDB01,
    0 0 10px #FF851F,
    0 0 14px #FF3D3D,
    0 0 18px #FF0F6F,
    0 0 22px #FE01FA
  `,
            textShadow: '0 0 3px #FF3D3D',
          },


          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: -1, // Place behind the button content
            padding: '2px', // border size
            background: 'linear-gradient(89.84deg, #FFDB01 -46.23%, #FF851F 5.03%, #FF3D3D 38.29%, #FF0F6F 74.04%, #FE01FA 129.67%)',
            WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            WebkitMaskComposite: 'xor',
            maskComposite: 'exclude',
            borderRadius: 'inherit',
            pointerEvents: 'none', // Ensures clicks go to button, not the pseudo-element
          },
        },
      },


    }
  }
});

export default responsiveFontSizes(lightTheme);
