import { Box, Container } from '@mui/material';
import type { ReactNode } from 'react';
import { surfaceBackground } from '../theme/glass';

export function DemoLayout({ children }: { children: ReactNode }) {
  return (
    <Box
      sx={theme => ({
        minHeight: '100dvh',
        position: 'relative',
        color: theme.palette.text.primary,
        background: surfaceBackground(theme),
        pb: { xs: 6, md: 6 },
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
    </Box>
  );
}
