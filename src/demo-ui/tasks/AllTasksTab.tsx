import { Box, ButtonBase, Stack, Typography } from '@mui/material';
import AccessTimeRoundedIcon from '@mui/icons-material/AccessTimeRounded';
import PersonOutlineRoundedIcon from '@mui/icons-material/PersonOutlineRounded';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import { useEffect, useMemo, useState } from 'react';
import { useShopPalette } from '../hooks/useShopPalette';
import type { ShopPalette } from '../theme/tokens';
import {
  allTasks,
  frequencyColor,
  priorityColor,
  taskCategoryColor,
  taskCategorySoft,
  taskCategoryText,
  tasksByCategory,
  type TaskCategory,
  type TaskDefinition,
} from './mock';

const CATEGORIES: TaskCategory[] = [
  'Sales',
  'Inventory',
  'Leads',
  'Customer',
  'Visual',
  'Hygiene',
  'Reporting',
  'Staff',
];

type StatusFilter = 'All' | 'PENDING' | 'PARTIAL' | 'COMPLETE' | 'OVERDUE';

export interface AllTasksFilter {
  category: TaskCategory | 'All';
  status: StatusFilter;
}

function softFor(color: string) {
  return `${color}29`;
}

function CategoryTag({ name, palette }: { name: TaskCategory; palette: ShopPalette }) {
  return (
    <Box
      component="span"
      sx={{
        fontFamily: palette.mono,
        fontSize: 10,
        letterSpacing: '0.08em',
        fontWeight: 600,
        color: taskCategoryText[name],
        background: taskCategorySoft[name],
        px: 1,
        py: 0.5,
        borderRadius: '6px',
        textTransform: 'uppercase',
        whiteSpace: 'nowrap',
      }}
    >
      {name}
    </Box>
  );
}

function FrequencyTag({
  value,
  palette,
}: {
  value: TaskDefinition['frequency'];
  palette: ShopPalette;
}) {
  return (
    <Box
      component="span"
      sx={{
        fontFamily: palette.mono,
        fontSize: 10,
        letterSpacing: '0.08em',
        fontWeight: 600,
        color: frequencyColor[value],
        background: palette.chipNeutralBg,
        px: 1,
        py: 0.5,
        borderRadius: '6px',
        textTransform: 'uppercase',
        whiteSpace: 'nowrap',
      }}
    >
      {value}
    </Box>
  );
}

function PriorityPill({
  value,
  palette,
}: {
  value: 'high' | 'medium' | 'low';
  palette: ShopPalette;
}) {
  const fallback = priorityColor[value];
  const bg = value === 'high'
    ? 'rgba(242,83,60,0.18)'
    : value === 'medium'
      ? 'rgba(244,169,62,0.18)'
      : palette.chipNeutralBg;
  const fg = value === 'high'
    ? '#FF7A66'
    : value === 'medium'
      ? palette.amber
      : palette.fgMuted;
  return (
    <Box
      component="span"
      sx={{
        fontFamily: palette.mono,
        fontSize: 10,
        letterSpacing: '0.1em',
        fontWeight: 700,
        color: fg || fallback,
        background: bg,
        px: 1.125,
        py: 0.5,
        borderRadius: 999,
        whiteSpace: 'nowrap',
        textTransform: 'uppercase',
      }}
    >
      {value}
    </Box>
  );
}

function StatusDot({
  status,
  palette,
}: {
  status: TaskDefinition['status'];
  palette: ShopPalette;
}) {
  const map = {
    PENDING: { fg: palette.fgMuted, bg: palette.chipNeutralBg },
    PARTIAL: { fg: palette.amber, bg: 'rgba(244,169,62,0.18)' },
    COMPLETE: { fg: palette.green, bg: 'rgba(79,203,124,0.18)' },
    OVERDUE: { fg: palette.redSoft, bg: 'rgba(242,83,60,0.18)' },
  } as const;
  const s = map[(status ?? 'PENDING') as keyof typeof map];
  return (
    <Box
      sx={{
        width: 8,
        height: 8,
        borderRadius: 999,
        background: s.fg,
        flexShrink: 0,
        boxShadow: `0 0 0 3px ${s.bg}`,
      }}
    />
  );
}

function CategoryChips({
  value,
  onChange,
  byCat,
  allCount,
  palette,
}: {
  value: TaskCategory | 'All';
  onChange: (v: TaskCategory | 'All') => void;
  byCat: ReturnType<typeof tasksByCategory>;
  allCount: number;
  palette: ShopPalette;
}) {
  const opts: Array<{
    key: TaskCategory | 'All';
    count: string;
    dot?: string;
  }> = [
    { key: 'All', count: String(allCount) },
    ...CATEGORIES.filter(c => byCat[c].total > 0).map(c => ({
      key: c,
      count: `${byCat[c].pending + byCat[c].partial}/${byCat[c].total}`,
      dot: taskCategoryColor[c],
    })),
  ];
  return (
    <Stack
      direction="row"
      sx={{
        gap: 1,
        overflowX: 'auto',
        pb: 0.5,
        mx: -2,
        px: 2,
        scrollbarWidth: 'none',
        '&::-webkit-scrollbar': { display: 'none' },
      }}
    >
      {opts.map(opt => {
        const isActive = value === opt.key;
        return (
          <ButtonBase
            key={opt.key}
            onClick={() => onChange(opt.key)}
            sx={{
              flexShrink: 0,
              display: 'inline-flex',
              alignItems: 'center',
              gap: 0.875,
              background: isActive ? palette.chipActiveBg : 'transparent',
              color: isActive ? palette.chipActiveFg : palette.chipInactiveFg,
              border: isActive
                ? `1px solid ${palette.chipActiveBg}`
                : palette.chipBorder,
              borderRadius: 999,
              px: 1.5,
              py: 0.875,
              fontFamily: palette.mono,
              fontSize: 11.5,
              fontWeight: 600,
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
            }}
          >
            {opt.dot && (
              <Box
                sx={{
                  width: 6,
                  height: 6,
                  borderRadius: 999,
                  background: opt.dot,
                  opacity: isActive ? 0.85 : 1,
                }}
              />
            )}
            {opt.key}
            <Typography
              component="span"
              sx={{
                fontFamily: palette.mono,
                fontSize: 10.5,
                fontWeight: 700,
                opacity: 0.55,
              }}
            >
              {opt.count}
            </Typography>
          </ButtonBase>
        );
      })}
    </Stack>
  );
}

function StatusChips({
  value,
  onChange,
  counts,
  palette,
}: {
  value: StatusFilter;
  onChange: (v: StatusFilter) => void;
  counts: Record<StatusFilter, number>;
  palette: ShopPalette;
}) {
  const opts: Array<{ key: StatusFilter; label: string }> = [
    { key: 'All', label: 'All' },
    { key: 'PENDING', label: 'Pending' },
    { key: 'PARTIAL', label: 'Partial' },
    { key: 'COMPLETE', label: 'Completed' },
    { key: 'OVERDUE', label: 'Overdue' },
  ];
  return (
    <Stack
      direction="row"
      sx={{
        gap: 0.75,
        overflowX: 'auto',
        pb: 0.5,
        mx: -2,
        px: 2,
        scrollbarWidth: 'none',
        '&::-webkit-scrollbar': { display: 'none' },
      }}
    >
      {opts.map(({ key, label }) => {
        const isActive = value === key;
        const n = counts[key] ?? 0;
        const tone =
          key === 'OVERDUE'
            ? palette.redSoft
            : key === 'PARTIAL'
              ? palette.amber
              : key === 'COMPLETE'
                ? palette.green
                : palette.fg;
        return (
          <ButtonBase
            key={key}
            onClick={() => onChange(key)}
            sx={{
              flexShrink: 0,
              display: 'inline-flex',
              alignItems: 'center',
              gap: 0.75,
              background: isActive ? palette.card : 'transparent',
              color: isActive ? palette.fg : palette.fgMuted,
              borderRadius: '10px',
              px: 1.25,
              py: 0.75,
              fontFamily: palette.mono,
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
            }}
          >
            <Box sx={{ width: 6, height: 6, borderRadius: 999, background: tone }} />
            {label}
            <Typography
              component="span"
              sx={{ fontFamily: palette.mono, fontSize: 10.5, opacity: 0.6 }}
            >
              {n}
            </Typography>
          </ButtonBase>
        );
      })}
    </Stack>
  );
}

function TaskListItem({
  task,
  palette,
  onOpen,
}: {
  task: TaskDefinition;
  palette: ShopPalette;
  onOpen?: (t: TaskDefinition) => void;
}) {
  const tone = taskCategoryColor[task.category];
  const dimmed = task.status === 'COMPLETE';
  return (
    <ButtonBase
      onClick={() => onOpen?.(task)}
      sx={{
        position: 'relative',
        background: palette.card,
        borderRadius: '16px',
        py: 1.75,
        pl: 1.75,
        pr: 1.75,
        border: `1px solid ${palette.hairline}`,
        opacity: dimmed ? 0.62 : 1,
        display: 'block',
        width: '100%',
        textAlign: 'left',
        '&:hover': { filter: 'brightness(1.03)' },
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          left: 0,
          top: 12,
          bottom: 12,
          width: '3px',
          background: tone,
          borderRadius: 999,
        }}
      />
      <Stack spacing={1} sx={{ pl: 1 }}>
        <Stack
          direction="row"
          sx={{ justifyContent: 'space-between', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}
        >
          <Stack direction="row" sx={{ alignItems: 'center', gap: 0.75, flexWrap: 'wrap' }}>
            <CategoryTag name={task.category} palette={palette} />
            <FrequencyTag value={task.frequency} palette={palette} />
            {task.overdue && (
              <Box
                component="span"
                sx={{
                  fontFamily: palette.mono,
                  fontSize: 10,
                  letterSpacing: '0.1em',
                  fontWeight: 700,
                  color: palette.overdueText,
                  background: palette.softOverdueBg,
                  px: 1,
                  py: 0.5,
                  borderRadius: '6px',
                  textTransform: 'uppercase',
                }}
              >
                OVERDUE
              </Box>
            )}
          </Stack>
          <PriorityPill value={task.priority} palette={palette} />
        </Stack>

        <Stack direction="row" sx={{ alignItems: 'flex-start', gap: 1.25 }}>
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Typography
              sx={{
                fontSize: 14.5,
                fontWeight: 600,
                color: palette.fg,
                letterSpacing: '-0.005em',
                textDecoration: dimmed ? 'line-through' : 'none',
                textDecorationColor: 'rgba(127,127,127,0.45)',
              }}
            >
              {task.title}
            </Typography>
            <Typography
              sx={{
                mt: 0.5,
                fontSize: 12.5,
                color: palette.fgMuted,
                lineHeight: 1.45,
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
              }}
            >
              {task.description}
            </Typography>
          </Box>
          <StatusDot status={task.status} palette={palette} />
        </Stack>

        <Stack
          direction="row"
          sx={{
            alignItems: 'center',
            gap: 1.75,
            flexWrap: 'wrap',
            fontFamily: palette.mono,
            fontSize: 11,
            color: palette.fgMuted,
            letterSpacing: '0.04em',
          }}
        >
          <Stack direction="row" sx={{ alignItems: 'center', gap: 0.625 }}>
            <AccessTimeRoundedIcon sx={{ fontSize: 13 }} />
            <Typography component="span" sx={{ fontFamily: palette.mono, fontSize: 11 }}>
              {task.expectedMins > 0 ? `${task.expectedMins} min` : 'Ongoing'} ·{' '}
              {task.dueDay ?? 'Today'} · {task.dueShort ?? task.dueLabel}
            </Typography>
          </Stack>
          <Stack direction="row" sx={{ alignItems: 'center', gap: 0.625 }}>
            <PersonOutlineRoundedIcon sx={{ fontSize: 13 }} />
            <Typography component="span" sx={{ fontFamily: palette.mono, fontSize: 11 }}>
              {task.assignee}
              {task.assigneeRole && (
                <Box component="span" sx={{ opacity: 0.6 }}>
                  {' '}
                  ({task.assigneeRole})
                </Box>
              )}
            </Typography>
          </Stack>
        </Stack>
      </Stack>
    </ButtonBase>
  );
}

interface AllTasksTabProps {
  onCreate: () => void;
  onOpenTask?: (task: TaskDefinition) => void;
  filter?: AllTasksFilter;
  onFilterChange?: (next: AllTasksFilter) => void;
}

export function AllTasksTab({
  onCreate,
  onOpenTask,
  filter,
  onFilterChange,
}: AllTasksTabProps) {
  const palette = useShopPalette();
  const [internalFilter, setInternalFilter] = useState<AllTasksFilter>(
    filter ?? { category: 'All', status: 'All' },
  );
  const [query, setQuery] = useState('');

  useEffect(() => {
    if (filter) setInternalFilter(filter);
  }, [filter]);

  const update = (next: AllTasksFilter) => {
    setInternalFilter(next);
    onFilterChange?.(next);
  };

  const byCat = useMemo(tasksByCategory, []);

  const counts = useMemo(() => {
    const c: Record<StatusFilter, number> = {
      All: allTasks.length,
      PENDING: 0,
      PARTIAL: 0,
      COMPLETE: 0,
      OVERDUE: 0,
    };
    allTasks.forEach(t => {
      if (t.status) c[t.status] = (c[t.status] ?? 0) + 1;
      if (t.overdue) c.OVERDUE += 1;
    });
    return c;
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return allTasks.filter(t => {
      if (internalFilter.category !== 'All' && t.category !== internalFilter.category) return false;
      if (internalFilter.status === 'OVERDUE' && !t.overdue) return false;
      if (
        internalFilter.status !== 'All' &&
        internalFilter.status !== 'OVERDUE' &&
        t.status !== internalFilter.status
      )
        return false;
      if (
        q &&
        !t.title.toLowerCase().includes(q) &&
        !t.description.toLowerCase().includes(q) &&
        !t.assignee.toLowerCase().includes(q)
      )
        return false;
      return true;
    });
  }, [internalFilter, query]);

  const showActiveFilter =
    internalFilter.category !== 'All' || internalFilter.status !== 'All';

  return (
    <Stack spacing={1.75}>
      {showActiveFilter && (
        <Stack
          direction="row"
          sx={{
            background: palette.card2,
            borderRadius: '10px',
            px: 1.5,
            py: 1,
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Typography
            sx={{
              fontFamily: palette.mono,
              fontSize: 11,
              color: palette.fg,
              opacity: 0.85,
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
            }}
          >
            Filter ·{' '}
            {[
              internalFilter.category !== 'All' && internalFilter.category,
              internalFilter.status !== 'All' && internalFilter.status,
            ]
              .filter(Boolean)
              .join(' · ')}
          </Typography>
          <ButtonBase
            onClick={() => update({ category: 'All', status: 'All' })}
            sx={{
              fontFamily: palette.mono,
              fontSize: 10.5,
              fontWeight: 700,
              letterSpacing: '0.1em',
              color: palette.fgMuted,
            }}
          >
            CLEAR
          </ButtonBase>
        </Stack>
      )}

      <Stack direction="row" sx={{ gap: 1 }}>
        <Box
          sx={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            gap: 1.25,
            background: palette.card2,
            borderRadius: '12px',
            px: 1.75,
            py: 1.25,
          }}
        >
          <SearchRoundedIcon sx={{ fontSize: 18, color: palette.fgMuted }} />
          <Box
            component="input"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search task, person…"
            sx={{
              flex: 1,
              border: 0,
              background: 'transparent',
              outline: 'none',
              color: palette.inputFg,
              fontSize: 14,
              minWidth: 0,
              '&::placeholder': { color: palette.inputPlaceholder },
            }}
          />
        </Box>
        <ButtonBase
          onClick={onCreate}
          sx={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 0.625,
            background: palette.addBg,
            color: palette.addFg,
            borderRadius: '12px',
            px: 1.75,
            fontSize: 13,
            fontWeight: 600,
            flexShrink: 0,
          }}
        >
          <AddRoundedIcon sx={{ fontSize: 18 }} />
          Add
        </ButtonBase>
      </Stack>

      <CategoryChips
        value={internalFilter.category}
        onChange={c => update({ ...internalFilter, category: c })}
        byCat={byCat}
        allCount={allTasks.length}
        palette={palette}
      />
      <StatusChips
        value={internalFilter.status}
        onChange={s => update({ ...internalFilter, status: s })}
        counts={counts}
        palette={palette}
      />

      <Stack spacing={1.25}>
        {filtered.length === 0 && (
          <Box
            sx={{
              background: palette.card,
              borderRadius: '18px',
              p: 5,
              textAlign: 'center',
              color: palette.fgMuted,
              fontSize: 13.5,
              border: `1px solid ${palette.hairline}`,
            }}
          >
            No tasks match the current filters.
          </Box>
        )}
        {filtered.map(t => (
          <TaskListItem key={t.id} task={t} palette={palette} onOpen={onOpenTask} />
        ))}
      </Stack>
    </Stack>
  );
}
