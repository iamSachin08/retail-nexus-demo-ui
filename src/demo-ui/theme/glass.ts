import type { Theme } from '@mui/material';
import { tokens } from './tokens';

export const glass = (theme: Theme, intensity: 'low' | 'mid' | 'high' = 'mid') => {
  const isDark = theme.palette.mode === 'dark';
  const alpha = intensity === 'high' ? 0.08 : intensity === 'mid' ? 0.05 : 0.03;
  const lightAlpha = intensity === 'high' ? 0.85 : intensity === 'mid' ? 0.7 : 0.55;
  return {
    background: isDark
      ? `rgba(255,255,255,${alpha})`
      : `rgba(255,255,255,${lightAlpha})`,
    backdropFilter: tokens.blur.glass,
    WebkitBackdropFilter: tokens.blur.glass,
    border: isDark
      ? '1px solid rgba(255,255,255,0.06)'
      : '1px solid rgba(11,15,26,0.06)',
    boxShadow: isDark
      ? '0 10px 30px rgba(0,0,0,0.35)'
      : tokens.shadow.soft,
  };
};

export const surfaceBackground = (theme: Theme) =>
  theme.palette.mode === 'dark'
    ? `radial-gradient(1200px 600px at 80% -10%, rgba(124,92,255,0.18), transparent 60%),
       radial-gradient(900px 500px at -10% 10%, rgba(54,209,220,0.12), transparent 60%),
       linear-gradient(180deg, #070A12 0%, #060912 100%)`
    : `radial-gradient(1200px 600px at 80% -10%, rgba(124,92,255,0.16), transparent 60%),
       radial-gradient(900px 500px at -10% 10%, rgba(54,209,220,0.14), transparent 60%),
       linear-gradient(180deg, #F4F6FC 0%, #EEF1F8 100%)`;
