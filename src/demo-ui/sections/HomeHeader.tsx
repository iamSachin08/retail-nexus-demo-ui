import { Box, IconButton, Stack, Tooltip, Typography } from '@mui/material';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import TuneRoundedIcon from '@mui/icons-material/TuneRounded';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import { motion } from 'framer-motion';
import { useDemoTheme } from '../context/DemoThemeContext';
import { useEditMode } from '../context/EditModeContext';
import { greetingFor } from '../utils/format';
import { tokens } from '../theme/tokens';

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
    <Box
      sx={theme => ({
        display: 'inline-flex',
        alignItems: 'center',
        backgroundColor: theme.palette.mode === 'dark' ? '#fff' : '#000',
        borderRadius: 0.625,
        px: 1.25,
        py: 0.75,
      })}
    >
      <Box
        component="img"
        src="/Logo Black.svg"
        alt="Storeone"
        sx={theme => ({
          height: 24,
          width: 'auto',
          display: 'block',
          filter: theme.palette.mode === 'dark' ? 'invert(1)' : 'none',
        })}
      />
    </Box>
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
          borderRadius: 1,
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
