import { Box, Stack, Typography, ButtonBase } from '@mui/material';
import AccessTimeRoundedIcon from '@mui/icons-material/AccessTimeRounded';
import ChecklistRtlRoundedIcon from '@mui/icons-material/ChecklistRtlRounded';
import { useMemo } from 'react';
import { useShopPalette } from '../hooks/useShopPalette';
import type { ShopPalette } from '../theme/tokens';
import {
  allTasks,
  taskCategoryColor,
  tasksByCategory,
  tasksTotalStats,
  type TaskCategory,
} from './mock';

const SHOP_CATEGORIES: TaskCategory[] = [
  'Sales',
  'Inventory',
  'Customer',
  'Visual',
  'Hygiene',
  'Reporting',
  'Staff',
];

interface DashboardTabProps {
  onJumpToList?: (filter: { category?: TaskCategory | 'All'; status?: string }) => void;
}

function softFor(color: string) {
  return `${color}29`;
}

/* ──────────────  Donut: % complete vs partial vs overdue vs pending ────────────── */
function TaskDonut({
  complete,
  partial,
  overdue,
  pending,
  total,
  size = 132,
  palette,
}: {
  complete: number;
  partial: number;
  overdue: number;
  pending: number;
  total: number;
  size?: number;
  palette: ShopPalette;
}) {
  const r = 56;
  const c = 2 * Math.PI * r;
  const segs = [
    { v: complete, color: palette.green },
    { v: partial, color: palette.amber },
    { v: overdue, color: palette.redSoft },
    { v: Math.max(0, pending - overdue), color: palette.tileSoft },
  ].filter(s => s.v > 0);
  let acc = 0;
  const completePct = total > 0 ? Math.round((complete / total) * 100) : 0;
  return (
    <Box sx={{ position: 'relative', width: size, height: size, flexShrink: 0 }}>
      <svg
        viewBox="0 0 140 140"
        width={size}
        height={size}
        style={{ transform: 'rotate(-90deg)' }}
      >
        <circle cx="70" cy="70" r={r} fill="none" stroke={palette.tileSoft} strokeWidth="14" />
        {segs.map((s, i) => {
          const len = (s.v / total) * c;
          const seg = (
            <circle
              key={i}
              cx="70"
              cy="70"
              r={r}
              fill="none"
              stroke={s.color}
              strokeWidth="14"
              strokeLinecap="butt"
              strokeDasharray={`${len} ${c - len}`}
              strokeDashoffset={-acc}
            />
          );
          acc += len;
          return seg;
        })}
      </svg>
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography
          sx={{
            fontSize: 26,
            fontWeight: 600,
            letterSpacing: '-0.02em',
            color: palette.fg,
          }}
        >
          {completePct}%
        </Typography>
        <Typography
          sx={{
            fontFamily: palette.mono,
            fontSize: 9.5,
            color: palette.fgMuted,
            letterSpacing: '0.08em',
            mt: 0.5,
          }}
        >
          COMPLETE
        </Typography>
      </Box>
    </Box>
  );
}

function StatRow({
  label,
  value,
  color,
  palette,
}: {
  label: string;
  value: number | string;
  color?: string;
  palette: ShopPalette;
}) {
  return (
    <Stack direction="row" sx={{ justifyContent: 'space-between', alignItems: 'baseline' }}>
      <Typography
        sx={{
          fontFamily: palette.mono,
          fontSize: 10,
          fontWeight: 500,
          color: palette.fgMuted,
          letterSpacing: '0.06em',
          textTransform: 'uppercase',
        }}
      >
        {label}
      </Typography>
      <Typography
        sx={{
          fontFamily: palette.mono,
          fontSize: 16,
          fontWeight: 600,
          color: color ?? palette.fg,
        }}
      >
        {value}
      </Typography>
    </Stack>
  );
}

function ShopCard({
  children,
  onClick,
  palette,
  sx,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  palette: ShopPalette;
  sx?: object;
}) {
  const base = {
    background: palette.card,
    borderRadius: '28px',
    p: 2.5,
    border: `1px solid ${palette.hairline}`,
    color: palette.fg,
    width: '100%',
    textAlign: 'left' as const,
    display: 'block',
    ...sx,
  };
  if (onClick) {
    return (
      <ButtonBase onClick={onClick} sx={{ ...base, '&:hover': { filter: 'brightness(1.05)' } }}>
        {children}
      </ButtonBase>
    );
  }
  return <Box sx={base}>{children}</Box>;
}

function OverviewCard({
  stats,
  palette,
}: {
  stats: ReturnType<typeof tasksTotalStats>;
  palette: ShopPalette;
}) {
  return (
    <ShopCard palette={palette}>
      <Stack direction="row" sx={{ justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <Box>
          <Typography
            sx={{
              fontFamily: palette.mono,
              fontSize: 12,
              fontWeight: 500,
              color: palette.fg,
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
            }}
          >
            TODAY · OVERVIEW
          </Typography>
          <Typography
            sx={{ fontSize: 16, fontWeight: 600, letterSpacing: '-0.01em', mt: 0.5 }}
          >
            Today’s tasks
          </Typography>
        </Box>
        <Box
          sx={{
            width: 38,
            height: 38,
            borderRadius: '10px',
            background: palette.tileTaskBlue,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
            '& svg': { fontSize: 20 },
          }}
        >
          <ChecklistRtlRoundedIcon />
        </Box>
      </Stack>

      <Stack direction="row" sx={{ alignItems: 'center', gap: 2.5, mt: 2.5 }}>
        <TaskDonut
          complete={stats.complete}
          partial={stats.partial}
          overdue={stats.overdue}
          pending={stats.pending}
          total={stats.total}
          palette={palette}
        />
        <Stack sx={{ flex: 1, gap: 1.25 }}>
          <StatRow label="PENDING" value={stats.pending} palette={palette} />
          <StatRow label="PARTIAL" value={stats.partial} color={palette.amber} palette={palette} />
          <StatRow label="COMPLETE" value={stats.complete} color={palette.green} palette={palette} />
          <Box sx={{ height: '1px', background: palette.hairline, my: 0.25 }} />
          <StatRow
            label={`TOTAL · ${stats.total}`}
            value={stats.total}
            color={palette.fgMuted}
            palette={palette}
          />
        </Stack>
      </Stack>
    </ShopCard>
  );
}

function OverdueCard({
  stats,
  byCat,
  onClick,
  palette,
}: {
  stats: ReturnType<typeof tasksTotalStats>;
  byCat: Record<TaskCategory, { total: number; pending: number; partial: number; complete: number; overdue: number }>;
  onClick?: () => void;
  palette: ShopPalette;
}) {
  const cats = SHOP_CATEGORIES.filter(c => byCat[c].overdue > 0);
  return (
    <ShopCard palette={palette} onClick={onClick}>
      <Stack direction="row" sx={{ justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <Typography
          sx={{
            fontFamily: palette.mono,
            fontSize: 12,
            fontWeight: 500,
            color: palette.fg,
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
          }}
        >
          OVERDUE
        </Typography>
        <Box
          sx={{
            width: 30,
            height: 30,
            borderRadius: '10px',
            background: palette.softOverdueBg,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: palette.redSoft,
            '& svg': { fontSize: 16 },
          }}
        >
          <AccessTimeRoundedIcon />
        </Box>
      </Stack>

      <Typography
        sx={{
          fontSize: 40,
          fontWeight: 600,
          letterSpacing: '-0.02em',
          mt: 1.75,
          color: palette.redSoft,
          lineHeight: 1,
        }}
      >
        {stats.overdue}
      </Typography>
      <Typography
        sx={{
          fontFamily: palette.mono,
          fontSize: 11,
          color: palette.fg,
          letterSpacing: '0.06em',
          mt: 0.5,
          textTransform: 'uppercase',
        }}
      >
        ACROSS {cats.length} ZONE{cats.length === 1 ? '' : 'S'}
      </Typography>

      <Box sx={{ height: '1px', background: palette.hairline, my: 1.75 }} />

      {cats.length === 0 && (
        <Typography
          sx={{
            fontFamily: palette.mono,
            fontSize: 11.5,
            color: palette.green,
            letterSpacing: '0.06em',
          }}
        >
          NO OVERDUE TASKS
        </Typography>
      )}
      <Stack spacing={1}>
        {cats.map(name => {
          const color = taskCategoryColor[name];
          return (
            <Stack
              key={name}
              direction="row"
              sx={{ justifyContent: 'space-between', alignItems: 'center' }}
            >
              <Stack direction="row" sx={{ alignItems: 'center', gap: 1 }}>
                <Box sx={{ width: 7, height: 7, borderRadius: 999, background: color }} />
                <Typography sx={{ fontSize: 12.5, color: palette.fg, opacity: 0.85 }}>
                  {name}
                </Typography>
              </Stack>
              <Typography
                sx={{
                  fontFamily: palette.mono,
                  fontSize: 12.5,
                  fontWeight: 600,
                  color: palette.redSoft,
                }}
              >
                {byCat[name].overdue}
              </Typography>
            </Stack>
          );
        })}
      </Stack>
    </ShopCard>
  );
}

function ZoneCard({
  name,
  data,
  onClick,
  palette,
}: {
  name: TaskCategory;
  data: { total: number; pending: number; partial: number; complete: number; overdue: number };
  onClick?: () => void;
  palette: ShopPalette;
}) {
  const color = taskCategoryColor[name];
  const completedPct = data.total > 0 ? Math.round((data.complete / data.total) * 100) : 0;
  return (
    <ButtonBase
      onClick={onClick}
      sx={{
        width: '100%',
        textAlign: 'left',
        background: palette.card,
        borderRadius: '28px',
        p: 2,
        border: `1px solid ${palette.hairline}`,
        color: palette.fg,
        display: 'flex',
        flexDirection: 'column',
        gap: 1.5,
        minHeight: 168,
        alignItems: 'stretch',
        justifyContent: 'flex-start',
        '&:hover': { filter: 'brightness(1.05)' },
      }}
    >
      <Stack direction="row" sx={{ justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <Typography
          sx={{
            fontFamily: palette.mono,
            fontSize: 11,
            fontWeight: 500,
            color: palette.fg,
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
          }}
        >
          {name}
        </Typography>
        <Box
          sx={{
            width: 28,
            height: 28,
            borderRadius: '10px',
            background: softFor(color),
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Box sx={{ width: 8, height: 8, borderRadius: 999, background: color }} />
        </Box>
      </Stack>

      <Box>
        <Stack direction="row" sx={{ alignItems: 'baseline', gap: 0.75 }}>
          <Typography
            sx={{
              fontFamily: palette.mono,
              fontSize: 26,
              fontWeight: 600,
              color: palette.fg,
              lineHeight: 1,
            }}
          >
            {data.pending + data.partial}
          </Typography>
          <Typography sx={{ fontFamily: palette.mono, fontSize: 11, color: palette.fg, opacity: 0.7 }}>
            / {data.total}
          </Typography>
        </Stack>
        <Typography
          sx={{
            fontFamily: palette.mono,
            fontSize: 10,
            color: palette.fg,
            opacity: 0.7,
            letterSpacing: '0.06em',
            mt: 0.5,
          }}
        >
          PENDING
        </Typography>
      </Box>

      <Box sx={{ mt: 'auto', width: '100%' }}>
        <Box
          sx={{
            height: 5,
            borderRadius: 999,
            background: palette.tileSoft,
            overflow: 'hidden',
            display: 'flex',
          }}
        >
          <Box sx={{ width: `${completedPct}%`, background: color }} />
        </Box>
        <Stack
          direction="row"
          sx={{
            justifyContent: 'space-between',
            mt: 0.875,
            fontFamily: palette.mono,
            fontSize: 10.5,
            letterSpacing: '0.04em',
          }}
        >
          <Typography
            component="span"
            sx={{ color: palette.fg, opacity: 0.7, fontFamily: palette.mono, fontSize: 10.5 }}
          >
            {data.complete} done
          </Typography>
          <Typography
            component="span"
            sx={{
              color: data.overdue ? palette.redSoft : palette.fg,
              opacity: data.overdue ? 1 : 0.7,
              fontFamily: palette.mono,
              fontSize: 10.5,
            }}
          >
            {data.overdue} overdue
          </Typography>
        </Stack>
      </Box>
    </ButtonBase>
  );
}

export function DashboardTab({ onJumpToList }: DashboardTabProps = {}) {
  const palette = useShopPalette();
  const stats = useMemo(tasksTotalStats, []);
  const byCat = useMemo(tasksByCategory, []);

  const formattedDate = new Date()
    .toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short' })
    .toUpperCase();

  return (
    <Stack spacing={2}>
      <Typography
        sx={{
          fontFamily: palette.mono,
          fontSize: 11,
          color: palette.fgMuted,
          letterSpacing: '0.08em',
          px: 0.5,
        }}
      >
        LAST UPDATED: JUST NOW · {formattedDate}
      </Typography>

      <OverviewCard stats={stats} palette={palette} />

      <OverdueCard
        stats={stats}
        byCat={byCat}
        palette={palette}
        onClick={() => onJumpToList?.({ status: 'OVERDUE' })}
      />

      <Box>
        <Stack
          direction="row"
          sx={{
            alignItems: 'center',
            justifyContent: 'space-between',
            px: 0.5,
            pb: 1.25,
          }}
        >
          <Typography sx={{ fontSize: 15, fontWeight: 600, letterSpacing: '-0.005em' }}>
            By zone
          </Typography>
          <Typography
            sx={{
              fontFamily: palette.mono,
              fontSize: 10.5,
              color: palette.fgMuted,
              letterSpacing: '0.06em',
            }}
          >
            TAP TO FILTER
          </Typography>
        </Stack>
        <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1.5 }}>
          {SHOP_CATEGORIES.filter(c => byCat[c].total > 0).map(name => (
            <ZoneCard
              key={name}
              name={name}
              data={byCat[name]}
              palette={palette}
              onClick={() => onJumpToList?.({ category: name })}
            />
          ))}
        </Box>
      </Box>

      {allTasks.length === 0 && (
        <Typography
          sx={{ fontSize: 12, color: palette.fgMuted, textAlign: 'center', py: 4 }}
        >
          No tasks yet — add one to get started.
        </Typography>
      )}
    </Stack>
  );
}
