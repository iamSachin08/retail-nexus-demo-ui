import { useTheme } from '@mui/material/styles';
import { useMemo } from 'react';
import { shopPalette, type ShopPalette } from '../theme/tokens';

/** Theme-aware ShopOS palette. Re-resolves whenever the demo theme flips. */
export function useShopPalette(): ShopPalette {
  const theme = useTheme();
  const mode = theme.palette.mode === 'dark' ? 'dark' : 'light';
  return useMemo(() => shopPalette(mode), [mode]);
}
