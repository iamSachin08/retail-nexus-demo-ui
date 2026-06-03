import { Box, ButtonBase, Stack, Tooltip } from '@mui/material';
import AutoAwesomeRoundedIcon from '@mui/icons-material/AutoAwesomeRounded';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDndContext, useDroppable } from '@dnd-kit/core';
import { useDock, MAX_DOCK_ITEMS } from '../context/DockContext';
import { useShopAssistant } from '../assistant/ShopAssistantContext';
import { useEditMode } from '../context/EditModeContext';
import { moduleRegistry } from '../modules/registry';
import { tokens } from '../theme/tokens';
import type { ReactNode } from 'react';

/** Stable id used by the DemoLayout drag handler to detect drops on the dock. */
export const DOCK_DROPPABLE_ID = 'dock';

/* Full-width bottom dock.
 *   [AI]  [Module]  [Module]  [Module]
 * AI is permanent on the left; the next slots are user-picked modules.
 * In edit mode, each module wiggles and shows a minus to remove. Users add
 * apps by dragging a tile from the home screen onto the dock. */

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

const wiggle = {
  rotate: [0, -0.8, 0.8, -0.8, 0],
  transition: { duration: 0.45, repeat: Infinity, repeatType: 'mirror' as const },
};

function RemoveBadge({ onClick }: { onClick: () => void }) {
  return (
    <Box
      onClick={e => {
        e.stopPropagation();
        onClick();
      }}
      sx={{
        position: 'absolute',
        top: -6,
        left: -6,
        zIndex: 6,
        width: 22,
        height: 22,
        borderRadius: '50%',
        background: '#FFFFFF',
        boxShadow: '0 1px 3px rgba(0,0,0,0.25)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        color: '#0B0F1A',
        fontWeight: 900,
        fontSize: 18,
        lineHeight: 1,
        userSelect: 'none',
      }}
    >
      <Box component="span" sx={{ mt: '-2px' }}>−</Box>
    </Box>
  );
}

function DockSlot({
  bg,
  icon,
  label,
  onClick,
  active,
  editing = false,
  onRemove,
}: {
  bg: string;
  icon: ReactNode;
  label: string;
  onClick: () => void;
  active: boolean;
  editing?: boolean;
  onRemove?: () => void;
}) {
  return (
    <Box
      component={motion.div}
      animate={editing ? wiggle : { rotate: 0 }}
      sx={{ position: 'relative' }}
    >
      {editing && onRemove && <RemoveBadge onClick={onRemove} />}
      <Tooltip title={label} placement="top">
        <ButtonBase
          aria-label={label}
          onClick={editing ? undefined : onClick}
          sx={{ ...dockSlotSx(active), background: bg, cursor: editing ? 'inherit' : 'pointer' }}
        >
          {icon}
        </ButtonBase>
      </Tooltip>
    </Box>
  );
}

function isActiveRoute(currentPath: string, route?: string): boolean {
  if (!route) return false;
  return currentPath === route || currentPath.startsWith(`${route}/`);
}

export function AppDock() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { dockIds, setDockIds } = useDock();
  const { openAssistant } = useShopAssistant();
  const { editing } = useEditMode();

  const items = dockIds
    .map(id => moduleRegistry[id])
    .filter((m): m is NonNullable<typeof m> => !!m);

  const removeFromDock = (id: string) => setDockIds(dockIds.filter(x => x !== id));

  const { isOver, setNodeRef } = useDroppable({ id: DOCK_DROPPABLE_ID });
  const { active } = useDndContext();
  const canAcceptMore = dockIds.length < MAX_DOCK_ITEMS;
  // Show the "drop here" affordance whenever a drag is active and we have room.
  const showDropSlot = !!active && canAcceptMore;
  const highlight = isOver && canAcceptMore;

  return (
    <Box
      ref={setNodeRef}
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
            ? highlight
              ? 'rgba(124,92,255,0.22)'
              : 'rgba(20,20,22,0.92)'
            : highlight
              ? 'rgba(124,92,255,0.14)'
              : 'rgba(255,255,255,0.92)',
        backdropFilter: 'blur(22px) saturate(180%)',
        WebkitBackdropFilter: 'blur(22px) saturate(180%)',
        borderTop: highlight
          ? '2px solid #7C5CFF'
          : theme.palette.mode === 'dark'
            ? '1px solid rgba(255,255,255,0.06)'
            : '1px solid rgba(11,15,26,0.06)',
        transition: 'background .15s ease, border-top-color .15s ease, box-shadow .15s ease',
        ...(highlight
          ? {
              boxShadow: '0 -10px 30px rgba(124,92,255,0.45), inset 0 0 0 2px rgba(124,92,255,0.55)',
            }
          : null),
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
        {/* AI — permanent first icon, never editable */}
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
            editing={editing}
            onRemove={() => removeFromDock(m.id)}
          />
        ))}
        {/* Drop slot — only visible while something is being dragged with room to land. */}
        {showDropSlot && <DropSlot highlight={highlight} />}
      </Stack>
    </Box>
  );
}

/** Dashed placeholder that appears in the dock when a drag is active. */
function DropSlot({ highlight }: { highlight: boolean }) {
  return (
    <Box
      sx={{
        width: 52,
        height: 52,
        borderRadius: '14px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
        border: highlight ? '2px dashed #7C5CFF' : '2px dashed rgba(11,15,26,0.28)',
        color: highlight ? '#7C5CFF' : 'rgba(11,15,26,0.45)',
        background: highlight ? 'rgba(124,92,255,0.12)' : 'transparent',
        transform: highlight ? 'scale(1.06)' : 'scale(1)',
        transition: 'all .15s ease',
      }}
    >
      <AddRoundedIcon sx={{ fontSize: 22 }} />
    </Box>
  );
}
