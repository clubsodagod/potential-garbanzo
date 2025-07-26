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
          backgroundColor: 'rgba(0, 0, 0, 0.2)',
          borderRadius: '34px',
          fontWeight: 600,
          border: 'none',
          padding: '0.9375rem 1.5rem',
          zIndex: 1,

          '&:hover': {
            backgroundColor: '#000000',
            boxShadow: `
        0 0 6px #FF5CFF,
        0 0 10px #7BFFFF,
        0 0 14px #5C58FF,
        0 0 18px #FFD5FF,
        0 0 22px #923B66
      `,
            textShadow: '0 0 3px #FF5CFF',
          },

          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: -1,
            padding: '2px',
            background: 'linear-gradient(89.84deg, #FF5CFF -46.23%, #7BFFFF 5.03%, #5C58FF 38.29%, #FFD5FF 74.04%, #923B66 129.67%)',
            WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            WebkitMaskComposite: 'xor',
            maskComposite: 'exclude',
            borderRadius: 'inherit',
            pointerEvents: 'none',
          },

          // Special variant for buttons with id="alt"
          '&[id="alt"]': {
            color: '#000000',
            backgroundColor: 'rgba(255, 255, 255, 0.2)',

            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.4)',
              boxShadow: `
          0 0 6px #FF5CFF,
          0 0 10px #7BFFFF,
          0 0 14px #5C58FF,
          0 0 18px #FFD5FF,
          0 0 22px #923B66
        `,
              textShadow: '0 0 2px #7BFFFF',
            },
          },
        },
      }



    }
  }
});

export default responsiveFontSizes(lightTheme);
