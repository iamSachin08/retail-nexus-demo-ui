import { createTheme, type ThemeOptions } from '@mui/material/styles';
import { darkPalette, lightPalette } from './palette';
import { typography } from './typography';
import { tokens } from './tokens';

const sharedOptions: ThemeOptions = {
  shape: { borderRadius: tokens.radius.md },
  typography,
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundAttachment: 'fixed',
        },
        '*::-webkit-scrollbar': { width: 6, height: 6 },
        '*::-webkit-scrollbar-thumb': {
          background: 'rgba(255,255,255,0.12)',
          borderRadius: 999,
        },
      },
    },
    MuiButton: {
      defaultProps: { disableElevation: true },
      styleOverrides: {
        root: { borderRadius: tokens.radius.pill, paddingInline: 18 },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: { borderRadius: tokens.radius.pill, fontWeight: 600 },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: { backgroundImage: 'none' },
      },
    },
  },
};

export const createDemoTheme = (mode: 'light' | 'dark') =>
  createTheme({
    ...sharedOptions,
    palette: mode === 'dark' ? darkPalette : lightPalette,
  });

export { tokens };
export type ThemeMode = 'light' | 'dark';
