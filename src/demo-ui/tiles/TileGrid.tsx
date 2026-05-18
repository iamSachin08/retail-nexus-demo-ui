import { styled } from '@mui/material/styles';
import {
  DndContext,
  PointerSensor,
  TouchSensor,
  closestCenter,
  useSensor,
  useSensors,
  type DragEndEvent,
} from '@dnd-kit/core';
import {
  SortableContext,
  arrayMove,
  rectSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { TILE_SPANS, type TileSize } from '../types/module';
import { moduleRegistry } from '../modules/registry';
import { ModuleTile } from './ModuleTile';
import { useEditMode } from '../context/EditModeContext';

const GAP_PX = 10;

const tileWidth = (span: number): string =>
  `calc(${(span / 12) * 100}% - ${GAP_PX * (1 - span / 12)}px)`;

// Small ≈ iPhone home-screen app icon — square at the rendered width.
const tileMinHeight = (size: TileSize): number =>
  size === 'large' ? 220 : 180;

const GridRoot = styled('div')({
  display: 'flex',
  flexWrap: 'wrap',
  gap: `${GAP_PX}px`,
  listStyle: 'none',
  padding: 0,
  margin: 0,
});

const TileSlot = styled('div', {
  shouldForwardProp: prop => prop !== 'tileSize' && prop !== 'isEditing' && prop !== 'isDragging',
})<{ tileSize: TileSize; isEditing: boolean; isDragging: boolean }>(
  ({ theme, tileSize, isEditing, isDragging }) => {
    const span = TILE_SPANS[tileSize];
    const isSmall = tileSize === 'small';
    return {
      flexShrink: 0,
      width: tileWidth(span.xs),
      ...(isSmall ? { aspectRatio: '1 / 1' } : { minHeight: tileMinHeight(tileSize) }),
      touchAction: isEditing ? 'none' : 'auto',
      cursor: isEditing ? 'grab' : 'default',
      zIndex: isDragging ? 10 : 'auto',
      opacity: isDragging ? 0.92 : 1,
      '&:active': isEditing ? { cursor: 'grabbing' } : undefined,
      [theme.breakpoints.up('sm')]: { width: tileWidth(span.sm) },
      [theme.breakpoints.up('md')]: { width: tileWidth(span.md) },
    };
  },
);

function SortableTile({
  id,
  size,
  isEditing,
  children,
}: {
  id: string;
  size: TileSize;
  isEditing: boolean;
  children: React.ReactNode;
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id,
    disabled: !isEditing,
  });

  return (
    <TileSlot
      ref={setNodeRef}
      tileSize={size}
      isEditing={isEditing}
      isDragging={isDragging}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
        boxShadow: isDragging ? '0 18px 40px rgba(0,0,0,0.35)' : undefined,
      }}
      {...attributes}
      {...listeners}
    >
      {children}
    </TileSlot>
  );
}

export function TileGrid() {
  const { layout, editing, reorderLayout } = useEditMode();
  const ids = layout.map(l => l.moduleId);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } }),
    useSensor(TouchSensor, { activationConstraint: { delay: 180, tolerance: 6 } }),
  );

  const handleDragEnd = ({ active, over }: DragEndEvent) => {
    if (!over || active.id === over.id) return;
    const oldIndex = ids.indexOf(String(active.id));
    const newIndex = ids.indexOf(String(over.id));
    if (oldIndex === -1 || newIndex === -1) return;
    reorderLayout(arrayMove(ids, oldIndex, newIndex));
  };

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={ids} strategy={rectSortingStrategy}>
        <GridRoot>
          {ids.map(id => {
            const item = layout.find(l => l.moduleId === id);
            const config = moduleRegistry[id];
            if (!item || !config) return null;
            return (
              <SortableTile key={id} id={id} size={item.size} isEditing={editing}>
                <ModuleTile config={config} size={item.size} />
              </SortableTile>
            );
          })}
        </GridRoot>
      </SortableContext>
    </DndContext>
  );
}
