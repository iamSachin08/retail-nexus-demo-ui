import { Box, ButtonBase, Drawer, IconButton, Stack, Tooltip, Typography } from '@mui/material';
import AutoAwesomeRoundedIcon from '@mui/icons-material/AutoAwesomeRounded';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import RestartAltRoundedIcon from '@mui/icons-material/RestartAltRounded';
import { useState, type ReactNode } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDock, MAX_DOCK_ITEMS } from '../context/DockContext';
import { useShopAssistant } from '../assistant/ShopAssistantContext';
import { moduleRegistry } from '../modules/registry';
import { tokens } from '../theme/tokens';

/* Full-width bottom dock.
 *   [AI]  [Module]  [Module]  [Module]  [+]
 * The AI assistant lives on the left as a permanent shortcut, the middle
 * three slots are user-picked modules, and the dashed "+" on the right
 * opens the picker drawer. Home isn't here — `/demo` is itself the home. */

function dockSlotSx(active: boolean) {
  return {
    width: 52,
    height: 52,
    borderRadius: '14px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#fff',
    flexShrink: 0,
    transition: 'transform .15s ease, box-shadow .15s ease',
    '&:active': { transform: 'scale(0.96)' },
    boxShadow: active ? '0 0 0 2px rgba(124,92,255,0.55)' : 'none',
    '& svg': { fontSize: 22 },
  };
}

function DockSlot({
  bg,
  icon,
  label,
  onClick,
  active,
}: {
  bg: string;
  icon: ReactNode;
  label: string;
  onClick: () => void;
  active: boolean;
}) {
  return (
    <Tooltip title={label} placement="top">
      <ButtonBase
        aria-label={label}
        onClick={onClick}
        sx={{ ...dockSlotSx(active), background: bg }}
      >
        {icon}
      </ButtonBase>
    </Tooltip>
  );
}

function isActiveRoute(currentPath: string, route?: string): boolean {
  if (!route) return false;
  return currentPath === route || currentPath.startsWith(`${route}/`);
}

export function AppDock() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { dockIds } = useDock();
  const { openAssistant } = useShopAssistant();
  const [editorOpen, setEditorOpen] = useState(false);

  const items = dockIds
    .map(id => moduleRegistry[id])
    .filter((m): m is NonNullable<typeof m> => !!m);

  return (
    <>
      <Box
        sx={theme => ({
          position: 'fixed',
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: theme.zIndex.appBar,
          pt: 1,
          pb: 'calc(env(safe-area-inset-bottom, 0px) + 10px)',
          px: 2,
          background:
            theme.palette.mode === 'dark'
              ? 'rgba(20,20,22,0.92)'
              : 'rgba(255,255,255,0.92)',
          backdropFilter: 'blur(22px) saturate(180%)',
          WebkitBackdropFilter: 'blur(22px) saturate(180%)',
          borderTop:
            theme.palette.mode === 'dark'
              ? '1px solid rgba(255,255,255,0.06)'
              : '1px solid rgba(11,15,26,0.06)',
        })}
      >
        <Stack
          direction="row"
          sx={{
            alignItems: 'center',
            justifyContent: 'space-around',
            gap: 1,
            maxWidth: 640,
            mx: 'auto',
          }}
        >
          {/* AI — permanent first icon */}
          <DockSlot
            bg={tokens.gradient.aiAurora}
            icon={<AutoAwesomeRoundedIcon />}
            label="Ask AI"
            onClick={() => openAssistant()}
            active={false}
          />
          {items.map(m => (
            <DockSlot
              key={m.id}
              bg={m.solidBg}
              icon={m.icon}
              label={m.title}
              onClick={() => m.route && navigate(m.route)}
              active={isActiveRoute(pathname, m.route)}
            />
          ))}
          <Tooltip title="Customize dock" placement="top">
            <IconButton
              aria-label="Customize dock"
              onClick={() => setEditorOpen(true)}
              sx={theme => ({
                width: 52,
                height: 52,
                color: theme.palette.text.secondary,
                border:
                  theme.palette.mode === 'dark'
                    ? '1px dashed rgba(255,255,255,0.18)'
                    : '1px dashed rgba(11,15,26,0.18)',
                borderRadius: '14px',
                '&:hover': {
                  bgcolor:
                    theme.palette.mode === 'dark'
                      ? 'rgba(255,255,255,0.06)'
                      : 'rgba(11,15,26,0.04)',
                },
              })}
            >
              <AddRoundedIcon sx={{ fontSize: 22 }} />
            </IconButton>
          </Tooltip>
        </Stack>
      </Box>

      <DockEditor open={editorOpen} onClose={() => setEditorOpen(false)} />
    </>
  );
}

function DockEditor({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { dockIds, toggle, reset } = useDock();

  const allModules = Object.values(moduleRegistry).filter(m => !!m.route);
  const selectedCount = dockIds.length;

  return (
    <Drawer
      anchor="bottom"
      open={open}
      onClose={onClose}
      slotProps={{
        backdrop: { sx: { backgroundColor: 'rgba(0,0,0,0.55)' } },
        paper: {
          sx: theme => ({
            borderTopLeftRadius: 24,
            borderTopRightRadius: 24,
            maxHeight: '80dvh',
            display: 'flex',
            flexDirection: 'column',
            /* Solid surface — kill MUI's translucent paper. */
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
      <Stack
        direction="row"
        sx={theme => ({
          alignItems: 'center',
          gap: 1,
          px: 2,
          py: 1.5,
          borderBottom:
            theme.palette.mode === 'dark'
              ? '1px solid rgba(255,255,255,0.06)'
              : '1px solid rgba(11,15,26,0.06)',
        })}
      >
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Typography
            sx={{
              fontSize: 10.5,
              fontWeight: 800,
              letterSpacing: 0.6,
              textTransform: 'uppercase',
              color: 'text.secondary',
              lineHeight: 1,
            }}
          >
            Customize Dock
          </Typography>
          <Typography sx={{ fontSize: 16, fontWeight: 800, letterSpacing: -0.2 }}>
            Pick up to {MAX_DOCK_ITEMS} apps
          </Typography>
          <Typography sx={{ fontSize: 11, color: 'text.disabled', mt: 0.25 }}>
            AI is always pinned · {selectedCount}/{MAX_DOCK_ITEMS} selected
          </Typography>
        </Box>
        <IconButton onClick={reset} aria-label="Reset to defaults" sx={{ color: 'text.secondary' }}>
          <RestartAltRoundedIcon />
        </IconButton>
        <IconButton onClick={onClose} aria-label="Close">
          <CloseRoundedIcon />
        </IconButton>
      </Stack>

      <Box sx={{ flex: 1, minHeight: 0, overflowY: 'auto', p: 2 }}>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
            gap: 1.25,
          }}
        >
          {allModules.map(m => {
            const picked = dockIds.includes(m.id);
            const disabled = !picked && dockIds.length >= MAX_DOCK_ITEMS;
            return (
              <ButtonBase
                key={m.id}
                onClick={() => !disabled && toggle(m.id)}
                disabled={disabled}
                sx={theme => ({
                  position: 'relative',
                  textAlign: 'left',
                  p: 1.5,
                  borderRadius: 2,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  gap: 1,
                  border: picked
                    ? '2px solid #7C5CFF'
                    : theme.palette.mode === 'dark'
                      ? '1px solid rgba(255,255,255,0.08)'
                      : '1px solid rgba(11,15,26,0.08)',
                  bgcolor:
                    theme.palette.mode === 'dark'
                      ? 'rgba(255,255,255,0.03)'
                      : '#fff',
                  opacity: disabled ? 0.4 : 1,
                  '&:hover': {
                    bgcolor:
                      theme.palette.mode === 'dark'
                        ? 'rgba(255,255,255,0.06)'
                        : 'rgba(11,15,26,0.03)',
                  },
                })}
              >
                <Box
                  sx={{
                    width: 36,
                    height: 36,
                    borderRadius: 1.5,
                    background: m.solidBg,
                    color: '#fff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    '& svg': { fontSize: 20 },
                  }}
                >
                  {m.icon}
                </Box>
                <Typography sx={{ fontSize: 13, fontWeight: 700, lineHeight: 1.2 }}>
                  {m.title}
                </Typography>
                {picked && (
                  <Box
                    sx={{
                      position: 'absolute',
                      top: 8,
                      right: 8,
                      width: 22,
                      height: 22,
                      borderRadius: 999,
                      background: '#7C5CFF',
                      color: '#fff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <CheckRoundedIcon sx={{ fontSize: 14 }} />
                  </Box>
                )}
              </ButtonBase>
            );
          })}
        </Box>
      </Box>
    </Drawer>
  );
}
