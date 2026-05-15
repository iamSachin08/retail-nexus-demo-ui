import type { PaletteOptions } from '@mui/material';

export const darkPalette: PaletteOptions = {
  mode: 'dark',
  primary: { main: '#7C5CFF', light: '#A48BFF', dark: '#5B3FD9', contrastText: '#fff' },
  secondary: { main: '#36D1DC', contrastText: '#0B0F1A' },
  success: { main: '#16D9A4' },
  warning: { main: '#FFD166' },
  error: { main: '#FF5470' },
  info: { main: '#4E8CFF' },
  background: {
    default: '#070A12',
    paper: 'rgba(255,255,255,0.04)',
  },
  text: {
    primary: '#F5F7FB',
    secondary: 'rgba(245,247,251,0.62)',
    disabled: 'rgba(245,247,251,0.32)',
  },
  divider: 'rgba(255,255,255,0.08)',
};

export const lightPalette: PaletteOptions = {
  mode: 'light',
  primary: { main: '#5B3FD9', light: '#7C5CFF', dark: '#3D2799', contrastText: '#fff' },
  secondary: { main: '#0EA0AA' },
  success: { main: '#0EA47A' },
  warning: { main: '#F2994A' },
  error: { main: '#E5345C' },
  info: { main: '#2F6DF2' },
  background: {
    default: '#F4F6FC',
    paper: 'rgba(255,255,255,0.72)',
  },
  text: {
    primary: '#0B0F1A',
    secondary: 'rgba(11,15,26,0.62)',
    disabled: 'rgba(11,15,26,0.32)',
  },
  divider: 'rgba(11,15,26,0.08)',
};
