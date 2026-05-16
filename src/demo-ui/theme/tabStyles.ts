import type { SxProps, Theme } from '@mui/material';

const activeBg = (theme: Theme) =>
  theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.08)' : 'rgba(11,15,26,0.92)';

export const moduleTabsSx: SxProps<Theme> = theme => ({
  minHeight: 36,
  '& .MuiTabs-indicator': { display: 'none' },
  '& .MuiTabs-flexContainer': { gap: 0.25 },
  '& .MuiTabs-scroller': {
    overflowX: 'auto !important',
    '&::-webkit-scrollbar': { display: 'none' },
    scrollbarWidth: 'none',
  },
  '& .MuiTab-iconWrapper': { display: 'none' },
  '& .MuiTab-root': {
    minHeight: 32,
    minWidth: 0,
    py: 0.5,
    px: 1.5,
    borderRadius: 0.75,
    fontSize: 11.5,
    fontWeight: 800,
    letterSpacing: 0.8,
    textTransform: 'uppercase',
    color: theme.palette.text.secondary,
    transition: 'background .2s ease, color .2s ease',
    whiteSpace: 'nowrap',
    '&.Mui-selected': {
      background: activeBg(theme),
      color: '#fff',
    },
  },
});

export const moduleSubTabsSx: SxProps<Theme> = theme => ({
  width: '100%',
  minHeight: 30,
  '& .MuiTabs-indicator': { display: 'none' },
  '& .MuiTab-iconWrapper': { display: 'none' },
  '& .MuiTab-root': {
    minHeight: 28,
    py: 0.25,
    px: 1.25,
    borderRadius: 0.75,
    fontSize: 11,
    fontWeight: 800,
    letterSpacing: 0.7,
    textTransform: 'uppercase',
    color: theme.palette.text.secondary,
    '&.Mui-selected': {
      background: activeBg(theme),
      color: '#fff',
    },
  },
});
