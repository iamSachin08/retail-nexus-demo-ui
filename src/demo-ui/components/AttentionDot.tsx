import { Box, keyframes } from '@mui/material';

const pulse = keyframes`
  0% { transform: scale(1); box-shadow: 0 0 0 0 rgba(255,84,112,0.55); }
  70% { transform: scale(1.05); box-shadow: 0 0 0 10px rgba(255,84,112,0); }
  100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(255,84,112,0); }
`;

/**
 * The red "needs attention" notification dot used on tile corners.
 * Sits absolutely positioned in the tile's top-right corner.
 */
export function AttentionDot({ size = 10 }: { size?: number }) {
  return (
    <Box
      sx={{
        position: 'absolute',
        top: 10,
        right: 10,
        width: size,
        height: size,
        borderRadius: '50%',
        background: '#FF5470',
        animation: `${pulse} 2s infinite`,
        zIndex: 4,
      }}
    />
  );
}
