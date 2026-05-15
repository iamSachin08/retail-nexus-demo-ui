import { Box } from '@mui/material';
import type { ReactNode } from 'react';
import { tokens } from '../theme/tokens';

interface Props {
  gradient: string;
  size?: number;
  children: ReactNode;
}

export function GradientIcon({ gradient, size = 36, children }: Props) {
  return (
    <Box
      sx={{
        width: size,
        height: size,
        borderRadius: `${tokens.radius.md}px`,
        background: gradient,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#fff',
        boxShadow: '0 6px 18px rgba(0,0,0,0.18)',
        flexShrink: 0,
        '& svg': { fontSize: size * 0.55 },
      }}
    >
      {children}
    </Box>
  );
}
