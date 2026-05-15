import type { TypographyVariantsOptions } from '@mui/material/styles';

const fontFamily = [
  '"Inter"',
  '"SF Pro Display"',
  '-apple-system',
  'BlinkMacSystemFont',
  '"Segoe UI"',
  'Roboto',
  '"Helvetica Neue"',
  'Arial',
  'sans-serif',
].join(',');

export const typography: TypographyVariantsOptions = {
  fontFamily,
  h1: { fontSize: 32, fontWeight: 700, letterSpacing: -0.4, lineHeight: 1.15 },
  h2: { fontSize: 26, fontWeight: 700, letterSpacing: -0.3, lineHeight: 1.2 },
  h3: { fontSize: 22, fontWeight: 700, letterSpacing: -0.2 },
  h4: { fontSize: 18, fontWeight: 700, letterSpacing: -0.1 },
  h5: { fontSize: 16, fontWeight: 600 },
  h6: { fontSize: 14, fontWeight: 600 },
  subtitle1: { fontSize: 14, fontWeight: 600 },
  subtitle2: { fontSize: 12, fontWeight: 600, letterSpacing: 0.4, textTransform: 'uppercase' },
  body1: { fontSize: 14, lineHeight: 1.5 },
  body2: { fontSize: 13, lineHeight: 1.5 },
  caption: { fontSize: 11, letterSpacing: 0.2 },
  button: { fontWeight: 600, textTransform: 'none', letterSpacing: 0 },
};
