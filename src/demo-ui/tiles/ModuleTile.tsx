import { Box, Stack, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { AttentionDot } from '../components/AttentionDot';
import { ResizePicker } from './ResizePicker';
import { useEditMode } from '../context/EditModeContext';
import { tokens } from '../theme/tokens';
import type { ModuleConfig, ModuleSummary, ModuleTileProps, TileSize, CTAButton } from '../types/module';

/* iPhone-style red notification badge, top-right corner of tile. */
function CountBadge({ value }: { value: string | number }) {
  return (
    <Box
      sx={{
        position: 'absolute',
        top: 8,
        right: 8,
        zIndex: 4,
        minWidth: 22,
        height: 22,
        px: 0.75,
        borderRadius: 999,
        background: '#FF3B30',
        color: '#fff',
        fontSize: 11,
        fontWeight: 800,
        lineHeight: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        pointerEvents: 'none',
      }}
    >
      {value}
    </Box>
  );
}

function CtaButton({ cta, full = false }: { cta: CTAButton; full?: boolean }) {
  const bg = cta.tone === 'amber' ? '#F59E0B' : cta.tone === 'success' ? '#22C55E' : '#EF4444';
  return (
    <Box
      sx={{
        mt: 1,
        px: 1.25,
        py: 0.75,
        borderRadius: 1.5,
        background: bg,
        color: '#fff',
        fontSize: 11.5,
        fontWeight: 700,
        textAlign: 'center',
        lineHeight: 1.2,
        width: full ? '100%' : 'auto',
      }}
    >
      {cta.text}
    </Box>
  );
}

const wiggle = {
  rotate: [0, -0.6, 0.6, -0.6, 0],
  transition: { duration: 0.45, repeat: Infinity, repeatType: 'mirror' as const },
};

interface BodyProps {
  config: ModuleConfig;
  data: ModuleSummary | null;
  size: TileSize;
  editing: boolean;
  onClick: () => void;
  setTileSize: (id: string, s: TileSize) => void;
}

/* ────────── LAUNCHER STYLE — solid color, centered icon + title, optional CTA ────────── */
function LauncherBody({ config, data, size, editing, onClick, setTileSize }: BodyProps) {
  const isSmall = size === 'small';
  // iPhone-style app icon: tight square at small, scales up at larger sizes.
  const iconFontSize = isSmall ? 22 : size === 'large' ? 44 : 36;
  const titleFontSize = isSmall ? 10 : size === 'large' ? 18 : 15;
  // Show abbreviated single-line title under the icon at app-icon scale.
  const shortTitle = config.title.split(' ')[0];

  return (
    <Box
      onClick={onClick}
      sx={{
        position: 'relative',
        height: '100%',
        borderRadius: isSmall ? '18px' : `${tokens.radius.lg}px`,
        background: config.solidBg,
        color: '#fff',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        p: isSmall ? 0.75 : 1.75,
        gap: isSmall ? 0.25 : 1,
        cursor: editing ? 'inherit' : 'pointer',
        transition: 'transform .2s ease',
        '&:hover': editing
          ? undefined
          : { transform: 'translateY(-2px)' },
      }}
    >
      {editing && (
        <ResizePicker
          current={size}
          supported={config.supportedSizes}
          onPick={(s: TileSize) => setTileSize(config.id, s)}
        />
      )}
      <Box sx={{ color: '#fff', '& svg': { fontSize: iconFontSize } }}>{config.icon}</Box>
      <Typography
        sx={{
          fontSize: titleFontSize,
          fontWeight: 700,
          lineHeight: 1.15,
          textAlign: 'center',
          whiteSpace: isSmall ? 'nowrap' : config.titleSmall && size !== 'large' ? 'pre-line' : 'normal',
          overflow: isSmall ? 'hidden' : 'visible',
          textOverflow: 'ellipsis',
          maxWidth: '100%',
        }}
      >
        {isSmall
          ? shortTitle
          : size !== 'large' && config.titleSmall
            ? config.titleSmall
            : config.title}
      </Typography>
      {!isSmall && data?.cta && <CtaButton cta={data.cta} />}
    </Box>
  );
}

/* ────────── KPI STYLE — dark surface with rich data ────────── */
function KpiBody({ config, data, size, editing, onClick, setTileSize }: BodyProps) {
  const isLarge = size === 'large';
  const isSmall = size === 'small';

  // Small KPI = iPhone app-icon: solid color tile + 1-word label below.
  if (isSmall) {
    const shortTitle = config.title.split(' ')[0];
    return (
      <Box
        onClick={onClick}
        sx={{
          position: 'relative',
          height: '100%',
          borderRadius: '18px',
          background: config.solidBg,
          color: '#fff',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          p: 0.75,
          gap: 0.25,
          cursor: editing ? 'inherit' : 'pointer',
          transition: 'transform .2s ease',
          '&:hover': editing ? undefined : { transform: 'translateY(-2px)' },
        }}
      >
        {editing && (
          <ResizePicker
            current={size}
            supported={config.supportedSizes}
            onPick={(s: TileSize) => setTileSize(config.id, s)}
          />
        )}
        <Box sx={{ color: '#fff', '& svg': { fontSize: 22 } }}>{config.icon}</Box>
        <Typography
          sx={{
            fontSize: 10,
            fontWeight: 700,
            lineHeight: 1.15,
            textAlign: 'center',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            maxWidth: '100%',
            color: '#fff',
          }}
        >
          {shortTitle}
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      onClick={onClick}
      sx={theme => ({
        position: 'relative',
        height: '100%',
        borderRadius: `${tokens.radius.lg}px`,
        background: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.06)' : '#FFFFFF',
        border:
          theme.palette.mode === 'dark'
            ? '1px solid rgba(255,255,255,0.08)'
            : '1px solid rgba(11,15,26,0.08)',
        color: theme.palette.text.primary,
        display: 'flex',
        flexDirection: 'column',
        p: isLarge ? 2 : 1.75,
        cursor: editing ? 'inherit' : 'pointer',
        transition: 'transform .2s ease',
        '&:hover': editing
          ? undefined
          : {
              transform: 'translateY(-2px)',
            },
      })}
    >
      {editing && (
        <ResizePicker
          current={size}
          supported={config.supportedSizes}
          onPick={(s: TileSize) => setTileSize(config.id, s)}
        />
      )}

      {/* Header */}
      <Stack
        direction="row"
        spacing={1}
        sx={{ alignItems: 'flex-start', justifyContent: 'space-between', mb: 1.25 }}
      >
        <Typography
          sx={{
            fontSize: 11,
            fontWeight: 800,
            letterSpacing: 0.8,
            textTransform: 'uppercase',
            color: 'text.secondary',
            lineHeight: 1.2,
            maxWidth: 'calc(100% - 40px)',
          }}
        >
          {config.title}
        </Typography>
        <Box
          sx={{
            width: 30,
            height: 30,
            borderRadius: 0.75,
            background: config.solidBg,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
            '& svg': { fontSize: 16 },
            flexShrink: 0,
          }}
        >
          {config.icon}
        </Box>
      </Stack>

      <Box sx={{ flex: 1, minHeight: 0 }}>
        {data && config.renderContent ? (
          config.renderContent({ data, size })
        ) : (
          <Stack spacing={0.5}>
            {data?.primary && (
              <Typography sx={{ fontSize: 24, fontWeight: 800 }}>{data.primary}</Typography>
            )}
            {data?.primaryLabel && (
              <Typography sx={{ fontSize: 11, color: 'text.secondary' }}>
                {data.primaryLabel}
              </Typography>
            )}
          </Stack>
        )}
      </Box>
    </Box>
  );
}

export function ModuleTile({ config, size }: ModuleTileProps) {
  const navigate = useNavigate();
  const { editing, setTileSize } = useEditMode();
  const { data } = config.useSummary();

  const hasCta = !!data?.cta;
  const hasBadge = data?.badge !== undefined && data?.badge !== null && !hasCta;
  const showAttention = !!data?.needsAttention && !editing && !hasBadge && !hasCta;
  const isLauncher = config.style === 'launcher';

  const handleClick = () => {
    if (editing) return;
    if (config.route) navigate(config.route);
  };

  const Body = isLauncher ? LauncherBody : KpiBody;

  return (
    <Box sx={{ position: 'relative', height: '100%', ...(size === 'small' ? {} : { minHeight: 150 }) }}>
      {showAttention && <AttentionDot />}
      {hasBadge && !editing && <CountBadge value={data!.badge!} />}
      <Box
        component={motion.div}
        animate={editing ? wiggle : { rotate: 0 }}
        sx={{ height: '100%' }}
      >
        <Body
          config={config}
          data={data}
          size={size}
          editing={editing}
          onClick={handleClick}
          setTileSize={setTileSize}
        />
      </Box>
    </Box>
  );
}

export { tokens };
