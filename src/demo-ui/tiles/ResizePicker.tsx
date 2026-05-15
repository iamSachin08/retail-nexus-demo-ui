import { Box, Stack, Typography } from '@mui/material';
import type { TileSize } from '../types/module';
import { tokens } from '../theme/tokens';

interface Props {
  current: TileSize;
  supported: TileSize[];
  onPick: (size: TileSize) => void;
}

const labels: Record<TileSize, string> = { small: 'S', medium: 'M', large: 'L' };

/**
 * Floating size picker shown over a tile while in edit mode.
 * Compact S/M/L pill.
 */
export function ResizePicker({ current, supported, onPick }: Props) {
  return (
    <Box
      onClick={e => e.stopPropagation()}
      sx={theme => ({
        position: 'absolute',
        top: 8,
        left: 8,
        zIndex: 5,
        display: 'flex',
        gap: 0.25,
        p: 0.25,
        borderRadius: `${tokens.radius.pill}px`,
        background: theme.palette.mode === 'dark' ? 'rgba(11,15,26,0.75)' : 'rgba(255,255,255,0.92)',
        backdropFilter: 'blur(12px)',
        border: '1px solid rgba(255,255,255,0.12)',
      })}
    >
      <Stack direction="row" spacing={0.25}>
        {supported.map(size => {
          const active = size === current;
          return (
            <Box
              key={size}
              onClick={() => onPick(size)}
              sx={theme => ({
                width: 22,
                height: 22,
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                fontSize: 10,
                fontWeight: 700,
                background: active ? tokens.gradient.aiAurora : 'transparent',
                color: active ? '#fff' : theme.palette.text.secondary,
                transition: 'background .2s ease, color .2s ease',
              })}
            >
              <Typography component="span" sx={{ fontSize: 11, fontWeight: 800 }}>
                {labels[size]}
              </Typography>
            </Box>
          );
        })}
      </Stack>
    </Box>
  );
}
