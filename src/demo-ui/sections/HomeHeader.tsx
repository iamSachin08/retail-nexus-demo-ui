import { Box, IconButton, Stack, Tooltip, Typography } from '@mui/material';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import TuneRoundedIcon from '@mui/icons-material/TuneRounded';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import { motion } from 'framer-motion';
import { useDemoTheme } from '../context/DemoThemeContext';
import { useEditMode } from '../context/EditModeContext';
import { greetingFor } from '../utils/format';
import { tokens } from '../theme/tokens';

const BRAND_NAME = 'StoreOS';
const BRAND_TAGLINE = 'Retail Operations Platform';

function Wave() {
  return (
    <Box
      component={motion.span}
      animate={{ rotate: [0, 18, -8, 16, -4, 12, 0] }}
      transition={{ duration: 1.6, ease: 'easeInOut', repeat: Infinity, repeatDelay: 3.5 }}
      sx={{
        display: 'inline-block',
        fontSize: '0.85em',
        ml: 0.75,
        transformOrigin: '70% 70%',
      }}
    >
      👋
    </Box>
  );
}

function BrandMark() {
  return (
    <Stack direction="row" spacing={1.25} sx={{ alignItems: 'center', minWidth: 0 }}>
      <Box
        sx={{
          width: 28,
          height: 28,
          borderRadius: `${tokens.radius.sm}px`,
          background: tokens.gradient.aiAurora,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#fff',
          boxShadow: '0 6px 16px rgba(124,92,255,0.32)',
          flexShrink: 0,
        }}
      >
        <AutoAwesomeIcon sx={{ fontSize: 15 }} />
      </Box>
      <Box sx={{ minWidth: 0 }}>
        <Stack direction="row" spacing={0.75} sx={{ alignItems: 'center' }}>
          <Typography
            sx={{
              fontSize: 16,
              fontWeight: 800,
              letterSpacing: -0.3,
              lineHeight: 1,
              background: tokens.gradient.aiAurora,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            {BRAND_NAME}
          </Typography>
          <Box
            sx={{
              fontSize: 8,
              fontWeight: 700,
              letterSpacing: 0.8,
              textTransform: 'uppercase',
              px: 0.75,
              py: 0.125,
              borderRadius: 999,
              border: '1px solid rgba(124,139,255,0.4)',
              color: '#A48BFF',
              background: 'rgba(124,92,255,0.10)',
            }}
          >
            AI
          </Box>
        </Stack>
        <Typography
          variant="caption"
          color="text.secondary"
          sx={{ fontSize: 10.5, letterSpacing: 0.3, display: 'block', lineHeight: 1.2, mt: 0.25 }}
          noWrap
        >
          {BRAND_TAGLINE}
        </Typography>
      </Box>
    </Stack>
  );
}

function HeaderIconButton({
  children,
  onClick,
  active,
  label,
}: {
  children: React.ReactNode;
  onClick: () => void;
  active?: boolean;
  label: string;
}) {
  return (
    <Tooltip title={label}>
      <IconButton
        size="small"
        onClick={onClick}
        sx={theme => ({
          width: 36,
          height: 36,
          background: active ? tokens.gradient.aiAurora : 'rgba(255,255,255,0.05)',
          border: `1px solid ${theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.06)' : 'rgba(11,15,26,0.06)'}`,
          color: active ? '#fff' : theme.palette.text.primary,
          transition: 'transform .15s ease, background .2s ease',
          '&:hover': {
            transform: 'translateY(-1px)',
            background: active ? tokens.gradient.aiAurora : 'rgba(255,255,255,0.08)',
            filter: active ? 'brightness(1.08)' : 'none',
          },
        })}
      >
        {children}
      </IconButton>
    </Tooltip>
  );
}

export function HomeHeader({ ownerName = 'Sachin' }: { ownerName?: string }) {
  const { mode, toggle } = useDemoTheme();
  const { editing, toggleEditing } = useEditMode();

  return (
    <Stack
      component={motion.div}
      initial={{ opacity: 0, y: -6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      spacing={1.75}
      sx={{ mb: 2.25 }}
    >
      {/* Row 1: brand mark + action icons (icons top-right aligned) */}
      <Stack direction="row" spacing={1} sx={{ alignItems: 'flex-start', justifyContent: 'space-between' }}>
        <BrandMark />
        <Stack direction="row" spacing={0.625} sx={{ flexShrink: 0, ml: 'auto' }}>
          <HeaderIconButton onClick={toggleEditing} active={editing} label={editing ? 'Done' : 'Edit tile sizes'}>
            {editing ? <CheckRoundedIcon fontSize="small" /> : <TuneRoundedIcon fontSize="small" />}
          </HeaderIconButton>
          <HeaderIconButton onClick={toggle} label="Toggle theme">
            {mode === 'dark' ? <LightModeOutlinedIcon fontSize="small" /> : <DarkModeOutlinedIcon fontSize="small" />}
          </HeaderIconButton>
        </Stack>
      </Stack>

      {/* Row 2: hero greeting */}
      <Box sx={{ pt: 0.5 }}>
        <Typography
          variant="caption"
          color="text.secondary"
          sx={{ display: 'block', fontSize: 12, lineHeight: 1.1, mb: 0.25 }}
        >
          {greetingFor()},
        </Typography>
        <Typography
          sx={{
            fontSize: { xs: 28, md: 32 },
            fontWeight: 800,
            letterSpacing: -0.6,
            lineHeight: 1.05,
          }}
        >
          {ownerName}
          <Wave />
        </Typography>
      </Box>

    </Stack>
  );
}
