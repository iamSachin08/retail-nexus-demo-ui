import { styled } from '@mui/material/styles';
import { SortableContext, rectSortingStrategy, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { type TileSize } from '../types/module';
import { moduleRegistry } from '../modules/registry';
import { ModuleTile } from './ModuleTile';
import { useEditMode } from '../context/EditModeContext';

const GAP_PX = 10;

/**
 * iPhone-style home-screen grid: 4 columns of small app-icons.
 * Medium widget = 2 cols × 2 rows (a 2×2 block, so 4 small icons fit beside it).
 * Large widget  = 4 cols × 2 rows (full width).
 * `grid-auto-flow: dense` lets remaining smalls flow into open cells.
 */
const COL_COUNT = 4;
const tileSpan: Record<TileSize, { col: number; row: number }> = {
  small: { col: 1, row: 1 },
  medium: { col: 2, row: 2 },
  large: { col: COL_COUNT, row: 2 },
};

const GridRoot = styled('div')({
  display: 'grid',
  gridTemplateColumns: `repeat(${COL_COUNT}, 1fr)`,
  gridAutoFlow: 'row dense',
  gap: `${GAP_PX}px`,
  listStyle: 'none',
  padding: 0,
  margin: 0,
});

const TileSlot = styled('div', {
  shouldForwardProp: prop => prop !== 'tileSize' && prop !== 'isEditing' && prop !== 'isDragging',
})<{ tileSize: TileSize; isEditing: boolean; isDragging: boolean }>(
  ({ tileSize, isEditing, isDragging }) => {
    const span = tileSpan[tileSize];
    const isSmall = tileSize === 'small';
    return {
      gridColumn: `span ${span.col}`,
      gridRow: `span ${span.row}`,
      // Smalls stay square; the medium's 2 rows are then ≈ 2 × (small-side) tall.
      ...(isSmall ? { aspectRatio: '1 / 1' } : null),
      touchAction: isEditing ? 'none' : 'auto',
      cursor: isEditing ? 'grab' : 'default',
      zIndex: isDragging ? 10 : 'auto',
      opacity: isDragging ? 0.92 : 1,
      '&:active': isEditing ? { cursor: 'grabbing' } : undefined,
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
  const { layout, editing, removeWidget } = useEditMode();
  const ids = layout.map(l => l.instanceId);

  return (
    <SortableContext items={ids} strategy={rectSortingStrategy}>
      <GridRoot>
        {layout.map(item => {
          const config = moduleRegistry[item.moduleId];
          if (!config) return null;
          return (
            <SortableTile key={item.instanceId} id={item.instanceId} size={item.size} isEditing={editing}>
              <ModuleTile
                config={config}
                size={item.size}
                pinned={item.pinned}
                onRemove={item.pinned ? undefined : () => removeWidget(item.instanceId)}
              />
            </SortableTile>
          );
        })}
      </GridRoot>
    </SortableContext>
  );
}
