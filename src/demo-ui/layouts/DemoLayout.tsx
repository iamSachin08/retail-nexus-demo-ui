import { Box, Container } from '@mui/material';
import type { ReactNode } from 'react';
import { surfaceBackground } from '../theme/glass';
import { AppDock } from './AppDock';

/** Demo shell — adds the bottom app-tray dock and the safe padding it needs. */
export function DemoLayout({ children }: { children: ReactNode }) {
  return (
    <Box
      sx={theme => ({
        minHeight: '100dvh',
        position: 'relative',
        color: theme.palette.text.primary,
        background: surfaceBackground(theme),
        // Extra bottom padding so the fixed dock doesn't cover the last row.
        pb: 'calc(96px + env(safe-area-inset-bottom, 0px))',
        overflowX: 'hidden',
      })}
    >
      <Container
        maxWidth="lg"
        sx={{
          pt: { xs: 2.5, md: 3 },
          px: { xs: 1.5, sm: 2.5, md: 3 },
        }}
      >
        {children}
      </Container>
      <AppDock />
    </Box>
  );
}
