import { Box, Container } from '@mui/material';
import type { ReactNode } from 'react';
import {
  DndContext,
  PointerSensor,
  TouchSensor,
  closestCenter,
  pointerWithin,
  useSensor,
  useSensors,
  type CollisionDetection,
  type DragEndEvent,
} from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
import { surfaceBackground } from '../theme/glass';
import { AppDock, DOCK_DROPPABLE_ID } from './AppDock';
import { useEditMode } from '../context/EditModeContext';
import { useDock, MAX_DOCK_ITEMS } from '../context/DockContext';

/** Demo shell — adds the bottom app-tray dock and the safe padding it needs. */
export function DemoLayout({ children }: { children: ReactNode }) {
  const { layout, reorderLayout } = useEditMode();
  const { dockIds, setDockIds } = useDock();

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } }),
    useSensor(TouchSensor, { activationConstraint: { delay: 180, tolerance: 6 } }),
  );

  // Prefer pointer-within so the dock wins as a drop target when the user drags over it.
  // Fall back to closest-center so in-grid sortable reordering still feels natural.
  const collisionDetection: CollisionDetection = args => {
    const pointer = pointerWithin(args);
    if (pointer.length > 0) {
      const onDock = pointer.find(c => c.id === DOCK_DROPPABLE_ID);
      if (onDock) return [onDock];
      return pointer;
    }
    return closestCenter(args);
  };

  const handleDragEnd = ({ active, over }: DragEndEvent) => {
    if (!over) return;
    const activeId = String(active.id);
    const overId = String(over.id);

    // Drop on dock → add the underlying module to the dock (capped at MAX_DOCK_ITEMS).
    if (overId === DOCK_DROPPABLE_ID) {
      const item = layout.find(l => l.instanceId === activeId);
      if (!item) return;
      if (dockIds.includes(item.moduleId)) return;
      if (dockIds.length >= MAX_DOCK_ITEMS) return;
      setDockIds([...dockIds, item.moduleId]);
      return;
    }

    // Reorder within the home grid.
    if (activeId === overId) return;
    const ids = layout.map(l => l.instanceId);
    const oldIndex = ids.indexOf(activeId);
    const newIndex = ids.indexOf(overId);
    if (oldIndex === -1 || newIndex === -1) return;
    reorderLayout(arrayMove(ids, oldIndex, newIndex));
  };

  return (
    <Box
      sx={theme => ({
        minHeight: '100dvh',
        position: 'relative',
        color: theme.palette.text.primary,
        background: surfaceBackground(theme),
        // Extra bottom padding so the fixed dock doesn't cover the last row.
        pb: 'calc(96px + env(safe-area-inset-bottom, 0px))',
        overflowX: 'hidden',
      })}
    >
      <DndContext sensors={sensors} collisionDetection={collisionDetection} onDragEnd={handleDragEnd}>
        <Container
          maxWidth="lg"
          sx={{
            pt: { xs: 2.5, md: 3 },
            px: { xs: 1.5, sm: 2.5, md: 3 },
          }}
        >
          {children}
        </Container>
        <AppDock />
      </DndContext>
    </Box>
  );
}
