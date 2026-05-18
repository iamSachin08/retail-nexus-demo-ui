import { Box, ButtonBase, Drawer, IconButton, Stack, Tooltip, Typography } from '@mui/material';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import TuneRoundedIcon from '@mui/icons-material/TuneRounded';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { useDemoTheme } from '../context/DemoThemeContext';
import { useEditMode } from '../context/EditModeContext';
import { useAuth } from '../context/AuthContext';
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
    <Box sx={{ display: 'inline-flex', alignItems: 'center' }}>
      <Box
        component="img"
        src="/Logo Black.svg"
        alt="Storeone"
        sx={theme => ({
          height: 66,
          width: 'auto',
          ml:"-15px",
          mt:-1.3,
          display: 'block',
          filter: theme.palette.mode === 'dark' ? 'none' : 'invert(1)',
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

function ProfilePill() {
  const { user, signOut } = useAuth();
  const [open, setOpen] = useState(false);
  if (!user) return null;

  return (
    <>
      <Tooltip title="Profile">
        <ButtonBase
          onClick={() => setOpen(true)}
          aria-label="Profile"
          sx={theme => ({
            width: 36,
            height: 36,
            borderRadius: 1,
            background: tokens.gradient.aiAurora,
            color: '#fff',
            fontSize: 13,
            fontWeight: 800,
            border: `1px solid ${theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.06)' : 'rgba(11,15,26,0.06)'}`,
            '&:hover': { filter: 'brightness(1.08)' },
          })}
        >
          {user.initial}
        </ButtonBase>
      </Tooltip>
      <Drawer
        anchor="bottom"
        open={open}
        onClose={() => setOpen(false)}
        slotProps={{
          backdrop: { sx: { backgroundColor: 'rgba(0,0,0,0.55)' } },
          paper: {
            sx: theme => ({
              borderTopLeftRadius: 24,
              borderTopRightRadius: 24,
              maxHeight: '60dvh',
              p: 2,
              /* Solid surface — kill the default translucent paper bleed. */
              backgroundColor: theme.palette.mode === 'dark' ? '#161618' : '#FFFFFF',
              backgroundImage: 'none',
              color: theme.palette.text.primary,
              border:
                theme.palette.mode === 'dark'
                  ? '1px solid rgba(255,255,255,0.06)'
                  : '1px solid rgba(11,15,26,0.06)',
              borderBottom: 'none',
              boxShadow:
                theme.palette.mode === 'dark'
                  ? '0 -20px 60px rgba(0,0,0,0.55)'
                  : '0 -20px 60px rgba(11,15,26,0.18)',
            }),
          },
        }}
      >
        <Stack direction="row" sx={{ alignItems: 'center', gap: 1.5, mb: 2 }}>
          <Box
            sx={{
              width: 48,
              height: 48,
              borderRadius: 2,
              background: tokens.gradient.aiAurora,
              color: '#fff',
              fontSize: 18,
              fontWeight: 800,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            {user.initial}
          </Box>
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Typography sx={{ fontSize: 16, fontWeight: 800, letterSpacing: -0.2 }} noWrap>
              {user.name}
            </Typography>
            <Typography sx={{ fontSize: 12, color: 'text.secondary' }} noWrap>
              {user.role} · {user.storeName}
            </Typography>
            <Typography
              sx={{ fontSize: 11, color: 'text.disabled', fontFamily: 'monospace', mt: 0.25 }}
              noWrap
            >
              {user.email}
            </Typography>
          </Box>
        </Stack>

        <ButtonBase
          onClick={() => {
            setOpen(false);
            signOut();
          }}
          sx={theme => ({
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            px: 1.75,
            py: 1.5,
            borderRadius: 1.5,
            border:
              theme.palette.mode === 'dark'
                ? '1px solid rgba(239,68,68,0.32)'
                : '1px solid rgba(239,68,68,0.22)',
            color: '#EF4444',
            '&:hover': { bgcolor: 'rgba(239,68,68,0.08)' },
          })}
        >
          <LogoutRoundedIcon sx={{ fontSize: 18 }} />
          <Typography sx={{ fontSize: 13.5, fontWeight: 700 }}>Sign out</Typography>
        </ButtonBase>
      </Drawer>
    </>
  );
}

export function HomeHeader({ ownerName }: { ownerName?: string } = {}) {
  const { mode, toggle } = useDemoTheme();
  const { editing, toggleEditing } = useEditMode();
  const { user } = useAuth();
  const displayName = ownerName ?? user?.name.split(' ')[0] ?? 'Sachin';

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
          <ProfilePill />
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
          {displayName}
          <Wave />
        </Typography>
      </Box>

    </Stack>
  );
}
