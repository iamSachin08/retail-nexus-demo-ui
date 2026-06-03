import { useMemo, useState } from 'react';
import { Box, Drawer, IconButton, InputAdornment, Stack, TextField, Typography } from '@mui/material';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import { moduleRegistry } from '../modules/registry';
import { useEditMode } from '../context/EditModeContext';
import { ModuleTile } from './ModuleTile';
import type { ModuleConfig } from '../types/module';

interface Props {
  open: boolean;
  onClose: () => void;
}

type WidgetSize = 'medium' | 'large';

const sizeLabel: Record<WidgetSize, string> = { medium: 'Medium', large: 'Large' };
// Match the home-screen tile heights so previews look identical to what gets added.
const sizeMinHeight: Record<WidgetSize, number> = { medium: 180, large: 220 };
const sizePreviewMaxWidth: Record<WidgetSize, number> = { medium: 220, large: 360 };

/** Modules that live only as pinned home-screen icons — not surfaced in the widget gallery. */
const GALLERY_EXCLUDED_MODULES = new Set(['procurement', 'know-product', 'know-customer', 'ask-owner']);

/**
 * iPhone-style "Add Widget" gallery.
 *
 * - Step 1: search + grid of home-style icons
 * - Step 2: large preview of the picked module, swap between Medium/Large, "Add Widget" CTA
 *
 * The drawer is translucent + backdrop-blurred so the home screen reads through behind it.
 */
export function WidgetGalleryDrawer({ open, onClose }: Props) {
  const { addWidget } = useEditMode();
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState<ModuleConfig | null>(null);
  const [size, setSize] = useState<WidgetSize>('medium');

  const modules = useMemo(
    () => Object.values(moduleRegistry).filter(m => !GALLERY_EXCLUDED_MODULES.has(m.id)),
    [],
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return modules;
    return modules.filter(m => m.title.toLowerCase().includes(q));
  }, [modules, query]);

  const close = () => {
    setSelected(null);
    setQuery('');
    setSize('medium');
    onClose();
  };

  const goBack = () => {
    setSelected(null);
    setSize('medium');
  };

  const handleAdd = () => {
    if (!selected) return;
    addWidget(selected.id, size);
    close();
  };

  return (
    <Drawer
      anchor="bottom"
      open={open}
      onClose={close}
      slotProps={{
        backdrop: {
          sx: { background: 'rgba(11,15,26,0.35)' },
        },
        paper: {
          sx: theme => ({
            borderTopLeftRadius: 24,
            borderTopRightRadius: 24,
            height: '88dvh',
            maxHeight: '88dvh',
            // Frosted-glass: see-through to the home screen behind.
            background:
              theme.palette.mode === 'dark'
                ? 'rgba(20,20,22,0.55)'
                : 'rgba(255,255,255,0.55)',
            backdropFilter: 'blur(28px) saturate(180%)',
            WebkitBackdropFilter: 'blur(28px) saturate(180%)',
            border:
              theme.palette.mode === 'dark'
                ? '1px solid rgba(255,255,255,0.08)'
                : '1px solid rgba(255,255,255,0.6)',
            boxShadow: '0 -8px 40px rgba(0,0,0,0.25)',
          }),
        },
      }}
    >
      <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        {/* Top handle */}
        <Box sx={{ display: 'flex', justifyContent: 'center', pt: 1 }}>
          <Box sx={{ width: 40, height: 4, borderRadius: 2, background: 'rgba(11,15,26,0.22)' }} />
        </Box>

        {/* Header */}
        <Stack direction="row" sx={{ alignItems: 'center', px: 2, py: 1.25, gap: 1 }}>
          {selected ? (
            <IconButton onClick={goBack} size="small" sx={{ ml: -0.5 }}>
              <ArrowBackIosNewRoundedIcon fontSize="small" />
            </IconButton>
          ) : null}
          <Typography sx={{ flex: 1, fontSize: 17, fontWeight: 800, textAlign: selected ? 'center' : 'left' }}>
            {selected ? selected.title : 'Add Widget'}
          </Typography>
          <IconButton onClick={close} size="small">
            <CloseRoundedIcon fontSize="small" />
          </IconButton>
        </Stack>

        {selected ? (
          <WidgetPreview config={selected} size={size} onSizeChange={setSize} onAdd={handleAdd} />
        ) : (
          <GalleryList
            query={query}
            setQuery={setQuery}
            items={filtered}
            onPick={(cfg, pickedSize) => {
              setSelected(cfg);
              setSize(pickedSize);
            }}
          />
        )}
      </Box>
    </Drawer>
  );
}

function GalleryList({
  query,
  setQuery,
  items,
  onPick,
}: {
  query: string;
  setQuery: (v: string) => void;
  items: ModuleConfig[];
  onPick: (cfg: ModuleConfig, size: WidgetSize) => void;
}) {
  return (
    <Box sx={{ px: 2, pb: 3, overflowY: 'auto', flex: 1 }}>
      <TextField
        size="small"
        fullWidth
        placeholder="Search Widgets"
        value={query}
        onChange={e => setQuery(e.target.value)}
        sx={{
          mb: 2,
          '& .MuiOutlinedInput-root': { borderRadius: 999, background: 'rgba(11,15,26,0.06)' },
        }}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <SearchRoundedIcon fontSize="small" sx={{ color: 'text.secondary' }} />
              </InputAdornment>
            ),
          },
        }}
      />

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          columnGap: 1.5,
          rowGap: 2.25,
        }}
      >
        {items.map((cfg, idx) => {
          // Pattern: 2 mediums, 1 large, 2 mediums, 1 large… → every 3rd card is large.
          // Falls back to the only supported size if the module can't render the patterned one.
          const patterned: WidgetSize = idx % 3 === 2 ? 'large' : 'medium';
          const previewSize: WidgetSize = cfg.supportedSizes.includes(patterned)
            ? patterned
            : cfg.supportedSizes.includes('medium')
              ? 'medium'
              : 'large';
          return (
            <Box
              key={cfg.id}
              onClick={() => onPick(cfg, previewSize)}
              sx={{
                ...(previewSize === 'large' ? { gridColumn: '1 / -1' } : null),
                display: 'flex',
                flexDirection: 'column',
                cursor: 'pointer',
                transition: 'transform .15s ease',
                '&:hover': { transform: 'translateY(-2px)' },
                '&:active': { transform: 'scale(0.97)' },
              }}
            >
              {/* flex: 1 stretches each tile to the tallest in its grid row */}
              <Box sx={{ flex: 1, minHeight: sizeMinHeight[previewSize], mb: 0.75, display: 'flex' }}>
                <Box sx={{ flex: 1, minWidth: 0 }}>
                  <ModuleTile config={cfg} size={previewSize} pinned preview />
                </Box>
              </Box>
              <Typography sx={{ fontSize: 11, fontWeight: 700, color: 'text.secondary', textAlign: 'center' }}>
                {cfg.title}
              </Typography>
            </Box>
          );
        })}
        {items.length === 0 && (
          <Box sx={{ gridColumn: '1 / -1' }}>
            <Typography sx={{ fontSize: 13, color: 'text.secondary', textAlign: 'center', py: 4 }}>
              No widgets match "{query}"
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
}

function WidgetPreview({
  config,
  size,
  onSizeChange,
  onAdd,
}: {
  config: ModuleConfig;
  size: WidgetSize;
  onSizeChange: (s: WidgetSize) => void;
  onAdd: () => void;
}) {
  const availableSizes = config.supportedSizes.filter((s): s is WidgetSize => s === 'medium' || s === 'large');

  return (
    <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
      {/* Preview area */}
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          px: 3,
          gap: 2.5,
        }}
      >
        <Box
          sx={{
            width: '100%',
            maxWidth: sizePreviewMaxWidth[size],
            minHeight: sizeMinHeight[size],
            transition: 'max-width .25s ease',
          }}
        >
          <ModuleTile config={config} size={size} pinned preview />
        </Box>
        <Typography sx={{ fontSize: 13.5, color: 'text.secondary', textAlign: 'center', maxWidth: 320 }}>
          {previewCopy(config, size)}
        </Typography>
      </Box>

      {/* Size switcher dots */}
      {availableSizes.length > 1 && (
        <Stack direction="row" spacing={1} sx={{ justifyContent: 'center', mb: 2 }}>
          {availableSizes.map(s => (
            <Box
              key={s}
              onClick={() => onSizeChange(s)}
              sx={{
                width: s === size ? 8 : 6,
                height: s === size ? 8 : 6,
                borderRadius: '50%',
                background: s === size ? 'text.primary' : 'rgba(11,15,26,0.25)',
                cursor: 'pointer',
                transition: 'all .15s ease',
              }}
            />
          ))}
        </Stack>
      )}

      <Stack direction="row" spacing={1} sx={{ justifyContent: 'center', mb: 1.5 }}>
        {availableSizes.map(s => (
          <Box
            key={s}
            onClick={() => onSizeChange(s)}
            sx={{
              px: 1.5,
              py: 0.5,
              borderRadius: 999,
              fontSize: 12,
              fontWeight: 700,
              cursor: 'pointer',
              background: s === size ? '#0B0F1A' : 'transparent',
              color: s === size ? '#fff' : 'text.secondary',
              border: '1px solid',
              borderColor: s === size ? '#0B0F1A' : 'rgba(11,15,26,0.18)',
              transition: 'all .15s ease',
            }}
          >
            {sizeLabel[s]}
          </Box>
        ))}
      </Stack>

      {/* Add Widget CTA */}
      <Box sx={{ px: 2, pb: 'calc(env(safe-area-inset-bottom, 0px) + 16px)' }}>
        <Box
          onClick={onAdd}
          sx={{
            background: '#0B0F1A',
            color: '#fff',
            fontWeight: 800,
            fontSize: 15,
            textAlign: 'center',
            py: 1.5,
            borderRadius: 999,
            cursor: 'pointer',
            transition: 'filter .15s ease',
            '&:hover': { filter: 'brightness(1.1)' },
          }}
        >
          + Add Widget
        </Box>
      </Box>
    </Box>
  );
}

function previewCopy(config: ModuleConfig, size: WidgetSize): string {
  const noun = config.title;
  return size === 'large'
    ? `A larger ${noun.toLowerCase()} widget with rich at-a-glance information.`
    : `Glanceable ${noun.toLowerCase()} insights right on your home screen.`;
}
