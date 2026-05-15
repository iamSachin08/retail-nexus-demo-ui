import { Box, type BoxProps } from '@mui/material';
import { forwardRef } from 'react';
import { glass } from '../theme/glass';
import { tokens } from '../theme/tokens';

interface GlassCardProps extends BoxProps {
  intensity?: 'low' | 'mid' | 'high';
  accentGradient?: string;
  interactive?: boolean;
}

export const GlassCard = forwardRef<HTMLDivElement, GlassCardProps>(function GlassCard(
  { intensity = 'mid', accentGradient, interactive = false, sx, children, ...rest },
  ref,
) {
  return (
    <Box
      ref={ref}
      sx={[
        theme => ({
          position: 'relative',
          borderRadius: `${tokens.radius.lg}px`,
          overflow: 'hidden',
          transition: 'transform .25s ease, box-shadow .25s ease, border-color .25s ease',
          ...glass(theme, intensity),
          ...(accentGradient && {
            '&::before': {
              content: '""',
              position: 'absolute',
              inset: 0,
              background: accentGradient,
              opacity: theme.palette.mode === 'dark' ? 0.18 : 0.12,
              pointerEvents: 'none',
            },
          }),
          ...(interactive && {
            cursor: 'pointer',
            '&:hover': {
              transform: 'translateY(-2px)',
              boxShadow:
                theme.palette.mode === 'dark'
                  ? '0 16px 40px rgba(0,0,0,0.5)'
                  : '0 14px 36px rgba(11,15,26,0.10)',
            },
            '&:active': { transform: 'translateY(0)' },
          }),
        }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...rest}
    >
      <Box sx={{ position: 'relative', zIndex: 1, height: '100%' }}>{children}</Box>
    </Box>
  );
});
