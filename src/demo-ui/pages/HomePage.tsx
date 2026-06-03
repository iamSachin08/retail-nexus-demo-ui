import { useState } from 'react';
import { Box, Fade, Stack, Typography } from '@mui/material';
import RestartAltRoundedIcon from '@mui/icons-material/RestartAltRounded';
import { HomeHeader } from '../sections/HomeHeader';
import { TileGrid } from '../tiles/TileGrid';
import { WidgetGalleryDrawer } from '../tiles/WidgetGalleryDrawer';
import { useEditMode } from '../context/EditModeContext';

export function HomePage() {
  const { editing, resetLayout } = useEditMode();
  const [galleryOpen, setGalleryOpen] = useState(false);

  return (
    <Box>
      <HomeHeader onAddWidget={() => setGalleryOpen(true)} />

        <Fade in={editing} unmountOnExit>
        <Stack
          direction="row"
          spacing={1}
          sx={{
            alignItems: 'center',
            justifyContent: 'space-between',
            mb: 1.25,
            px: 1.5,
            py: 1,
            borderRadius: 2,
            background: 'rgba(124,92,255,0.10)',
            border: '1px solid rgba(124,139,255,0.25)',
          }}
        >
          <Typography variant="caption" color="text.secondary">
            <strong>Drag</strong> to reorder · tap <strong>−</strong> to remove a widget.
          </Typography>
          <Stack
            direction="row"
            spacing={0.5}
            onClick={resetLayout}
            sx={{
              alignItems: 'center',
              cursor: 'pointer',
              color: 'text.secondary',
              fontSize: 11,
              fontWeight: 700,
              '&:hover': { color: 'text.primary' },
            }}
          >
            <RestartAltRoundedIcon sx={{ fontSize: 14 }} />
            <Typography component="span" variant="caption" sx={{ fontWeight: 700 }}>
              Reset
            </Typography>
          </Stack>
        </Stack>
      </Fade>

      <TileGrid />

      <WidgetGalleryDrawer open={galleryOpen} onClose={() => setGalleryOpen(false)} />
    </Box>
  );
}
