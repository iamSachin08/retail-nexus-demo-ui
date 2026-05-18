import { Box, ButtonBase, Stack, Typography } from '@mui/material';
import AutoAwesomeRoundedIcon from '@mui/icons-material/AutoAwesomeRounded';
import LocalFireDepartmentRoundedIcon from '@mui/icons-material/LocalFireDepartmentRounded';
import EmojiEventsRoundedIcon from '@mui/icons-material/EmojiEventsRounded';
import BoltRoundedIcon from '@mui/icons-material/BoltRounded';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import AccessTimeRoundedIcon from '@mui/icons-material/AccessTimeRounded';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import { useMemo } from 'react';
import { useShopPalette } from '../hooks/useShopPalette';
import type { ShopPalette } from '../theme/tokens';
import {
  allTasks,
  completedHistory,
  taskCategoryColor,
  taskCategoryText,
  tasksTotalStats,
  type TaskDefinition,
} from './mock';

interface InsightsTabProps {
  onOpenTask?: (task: TaskDefinition) => void;
}

/* ──────────────  Today's pulse  ────────────── */
function TodayPulseCard({
  stats,
  palette,
}: {
  stats: ReturnType<typeof tasksTotalStats>;
  palette: ShopPalette;
}) {
  const pct = stats.total > 0 ? Math.round((stats.complete / stats.total) * 100) : 0;
  const r = 38;
  const c = 2 * Math.PI * r;
  const len = (pct / 100) * c;
  return (
    <Box
      sx={{
        background: `linear-gradient(160deg, rgba(58,87,227,0.20), rgba(167,123,235,0.10) 50%, ${palette.card} 100%)`,
        borderRadius: '28px',
        p: 2.5,
        border: `1px solid ${palette.hairline}`,
      }}
    >
      <Stack direction="row" sx={{ justifyContent: 'space-between', alignItems: 'center', gap: 1.75 }}>
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Stack direction="row" sx={{ alignItems: 'center', gap: 1 }}>
            <AutoAwesomeRoundedIcon sx={{ fontSize: 14, color: palette.fg }} />
            <Typography
              sx={{
                fontFamily: palette.mono,
                fontSize: 10.5,
                color: palette.fg,
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
              }}
            >
              TODAY · AI PULSE
            </Typography>
          </Stack>
          <Typography
            sx={{
              mt: 1.25,
              fontSize: 19,
              fontWeight: 600,
              letterSpacing: '-0.01em',
              lineHeight: 1.3,
              color: palette.fg,
            }}
          >
            You’re tracking{' '}
            <Box component="span" sx={{ color: palette.green }}>
              on pace
            </Box>{' '}
            — keep going.
          </Typography>
          <Typography sx={{ mt: 1, fontSize: 12.5, color: palette.fgMuted, lineHeight: 1.5 }}>
            {stats.complete} of {stats.total} tasks done.{' '}
            {stats.overdue > 0 ? (
              <Box component="span">
                <Box component="span" sx={{ color: palette.redSoft }}>
                  {stats.overdue} overdue
                </Box>{' '}
                — clear those first.
              </Box>
            ) : (
              <Box component="span">No overdue items.</Box>
            )}
          </Typography>
        </Box>

        <Box sx={{ position: 'relative', width: 88, height: 88, flexShrink: 0 }}>
          <svg viewBox="0 0 96 96" width="88" height="88" style={{ transform: 'rotate(-90deg)' }}>
            <circle cx="48" cy="48" r={r} fill="none" stroke={palette.tileSoft} strokeWidth="10" />
            <circle
              cx="48"
              cy="48"
              r={r}
              fill="none"
              stroke={palette.green}
              strokeWidth="10"
              strokeLinecap="round"
              strokeDasharray={`${len} ${c - len}`}
            />
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
            <Typography sx={{ fontSize: 22, fontWeight: 600, letterSpacing: '-0.02em', color: palette.fg }}>
              {pct}%
            </Typography>
            <Typography
              sx={{
                fontFamily: palette.mono,
                fontSize: 9,
                color: palette.fgMuted,
                letterSpacing: '0.06em',
              }}
            >
              DONE
            </Typography>
          </Box>
        </Box>
      </Stack>

      <Box
        sx={{
          mt: 1.75,
          pt: 1.5,
          borderTop: `1px solid ${palette.hairline}`,
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 1fr',
          gap: 1,
        }}
      >
        {[
          ['DONE', stats.complete, palette.green],
          ['PENDING', stats.pending, palette.fg],
          ['OVERDUE', stats.overdue, palette.redSoft],
        ].map(([k, v, color]) => (
          <Box key={k as string}>
            <Typography
              sx={{
                fontFamily: palette.mono,
                fontSize: 9.5,
                color: palette.fgMuted,
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
              }}
            >
              {k as string}
            </Typography>
            <Typography
              sx={{
                fontFamily: palette.mono,
                fontSize: 18,
                fontWeight: 600,
                color: color as string,
                mt: 0.5,
              }}
            >
              {v as number}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
}

/* ──────────────  AI · Impact if you complete  ────────────── */
function AIImpactCard({ palette }: { palette: ShopPalette }) {
  return (
    <Box
      sx={{
        background: `linear-gradient(160deg, rgba(167,123,235,0.18), rgba(106,120,230,0.08) 60%, ${palette.card} 100%)`,
        border: `1px solid ${palette.hairline}`,
        borderRadius: '28px',
        p: 2.25,
      }}
    >
      <Stack direction="row" sx={{ alignItems: 'center', gap: 1 }}>
        <AutoAwesomeRoundedIcon sx={{ fontSize: 14, color: palette.fg }} />
        <Typography
          sx={{
            fontFamily: palette.mono,
            fontSize: 10.5,
            color: palette.fg,
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
          }}
        >
          AI · IMPACT IF YOU COMPLETE
        </Typography>
      </Stack>

      <Box sx={{ mt: 1.75, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1.75 }}>
        <Box>
          <Typography
            sx={{
              fontFamily: palette.mono,
              fontSize: 10.5,
              color: palette.fgMuted,
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
            }}
          >
            REVENUE PROTECTED
          </Typography>
          <Typography
            sx={{
              fontFamily: palette.mono,
              fontSize: 24,
              fontWeight: 600,
              color: palette.green,
              mt: 0.5,
              letterSpacing: '-0.01em',
            }}
          >
            ₹1.42L
          </Typography>
        </Box>
        <Box>
          <Typography
            sx={{
              fontFamily: palette.mono,
              fontSize: 10.5,
              color: palette.fgMuted,
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
            }}
          >
            LIFT IN STORE HEALTH
          </Typography>
          <Typography
            sx={{
              fontFamily: palette.mono,
              fontSize: 22,
              fontWeight: 600,
              color: palette.fg,
              mt: 0.5,
              letterSpacing: '-0.01em',
            }}
          >
            +12 pts
          </Typography>
        </Box>
      </Box>

      <Typography sx={{ mt: 1.75, fontSize: 12.5, color: palette.fgMuted, lineHeight: 1.5 }}>
        Hot-lead callbacks &amp; EOD reconciliation are the highest-leverage tasks pending today.
      </Typography>
    </Box>
  );
}

/* ──────────────  Do these next — top 3 ranked  ────────────── */
function DoTheseNextCard({
  tasks,
  onOpenTask,
  palette,
}: {
  tasks: TaskDefinition[];
  onOpenTask?: (t: TaskDefinition) => void;
  palette: ShopPalette;
}) {
  const ranked = useMemo(() => {
    const score = (t: TaskDefinition) =>
      (t.overdue ? 100 : 0) +
      (t.priority === 'high' ? 50 : t.priority === 'medium' ? 20 : 5) +
      (t.status === 'PARTIAL' ? 10 : 0);
    return [...tasks]
      .filter(t => t.status !== 'COMPLETE')
      .sort((a, b) => score(b) - score(a))
      .slice(0, 3);
  }, [tasks]);

  return (
    <Box
      sx={{
        background: palette.card,
        border: `1px solid ${palette.hairline}`,
        borderRadius: '28px',
        p: 2.25,
      }}
    >
      <Stack direction="row" sx={{ alignItems: 'center', gap: 1 }}>
        <BoltRoundedIcon sx={{ fontSize: 14, color: palette.amber }} />
        <Typography
          sx={{
            fontFamily: palette.mono,
            fontSize: 10.5,
            color: palette.fg,
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
          }}
        >
          AI · DO THESE NEXT
        </Typography>
      </Stack>
      <Typography sx={{ mt: 0.75, fontSize: 12.5, color: palette.fgMuted, lineHeight: 1.45 }}>
        Highest leverage 3 — together protect ~₹1.2L today.
      </Typography>

      <Stack spacing={1} sx={{ mt: 1.75 }}>
        {ranked.map((t, i) => {
          const color = taskCategoryColor[t.category];
          const text = taskCategoryText[t.category];
          return (
            <ButtonBase
              key={t.id}
              onClick={() => onOpenTask?.(t)}
              sx={{
                width: '100%',
                textAlign: 'left',
                background: palette.card2,
                borderRadius: '12px',
                px: 1.75,
                py: 1.5,
                display: 'flex',
                alignItems: 'center',
                gap: 1.5,
              }}
            >
              <Box
                sx={{
                  width: 26,
                  height: 26,
                  borderRadius: '8px',
                  background: palette.tileSoft,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: palette.mono,
                  fontSize: 11,
                  fontWeight: 700,
                  color: palette.fg,
                  flexShrink: 0,
                }}
              >
                {i + 1}
              </Box>
              <Box sx={{ flex: 1, minWidth: 0 }}>
                <Typography
                  sx={{
                    fontSize: 13.5,
                    fontWeight: 500,
                    color: palette.fg,
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  {t.title}
                </Typography>
                <Stack
                  direction="row"
                  sx={{
                    mt: 0.5,
                    alignItems: 'center',
                    gap: 1,
                    fontFamily: palette.mono,
                    fontSize: 10.5,
                    color: palette.fgMuted,
                    letterSpacing: '0.04em',
                  }}
                >
                  <Stack
                    component="span"
                    direction="row"
                    sx={{ alignItems: 'center', gap: 0.5, color: text }}
                  >
                    <Box sx={{ width: 5, height: 5, borderRadius: 999, background: color }} />
                    {t.category.toUpperCase()}
                  </Stack>
                  <Typography component="span" sx={{ fontFamily: palette.mono, fontSize: 10.5 }}>
                    ·
                  </Typography>
                  <Typography component="span" sx={{ fontFamily: palette.mono, fontSize: 10.5 }}>
                    {t.duration ?? `${t.expectedMins} min`}
                  </Typography>
                  {t.overdue && (
                    <>
                      <Typography component="span" sx={{ fontFamily: palette.mono, fontSize: 10.5 }}>
                        ·
                      </Typography>
                      <Typography
                        component="span"
                        sx={{
                          fontFamily: palette.mono,
                          fontSize: 10.5,
                          color: palette.redSoft,
                          fontWeight: 700,
                        }}
                      >
                        OVERDUE
                      </Typography>
                    </>
                  )}
                </Stack>
              </Box>
              <ChevronRightRoundedIcon sx={{ fontSize: 18, color: palette.fg }} />
            </ButtonBase>
          );
        })}
      </Stack>
    </Box>
  );
}

/* ──────────────  Streak card  ────────────── */
function StreakCard({ palette }: { palette: ShopPalette }) {
  const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
  const counts = [9, 11, 8, 12, 10, 14, 6];
  const target = 12;
  const max = Math.max(...counts, target) + 2;
  const W = 280;
  const H = 84;
  const padX = 6;
  const barW = ((W - padX * 2) / counts.length) * 0.62;
  const stepX = (W - padX * 2) / counts.length;

  return (
    <Box
      sx={{
        background: palette.card,
        border: `1px solid ${palette.hairline}`,
        borderRadius: '28px',
        p: 2.25,
      }}
    >
      <Stack direction="row" sx={{ justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <Box>
          <Stack direction="row" sx={{ alignItems: 'center', gap: 1 }}>
            <LocalFireDepartmentRoundedIcon sx={{ fontSize: 14, color: palette.amber }} />
            <Typography
              sx={{
                fontFamily: palette.mono,
                fontSize: 10.5,
                color: palette.fg,
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
              }}
            >
              7-DAY STREAK
            </Typography>
          </Stack>
          <Stack direction="row" sx={{ mt: 1, alignItems: 'baseline', gap: 0.75 }}>
            <Typography
              sx={{
                fontFamily: palette.mono,
                fontSize: 28,
                fontWeight: 600,
                color: palette.fg,
                letterSpacing: '-0.02em',
              }}
            >
              6
            </Typography>
            <Typography
              sx={{
                fontFamily: palette.mono,
                fontSize: 11,
                color: palette.fgMuted,
                letterSpacing: '0.06em',
              }}
            >
              DAYS
            </Typography>
          </Stack>
          <Typography
            sx={{
              mt: 0.5,
              fontFamily: palette.mono,
              fontSize: 10.5,
              color: palette.green,
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
            }}
          >
            HIT DAILY TARGET 6 / 7
          </Typography>
        </Box>
        <Box sx={{ textAlign: 'right' }}>
          <Typography
            sx={{
              fontFamily: palette.mono,
              fontSize: 9.5,
              color: palette.fgMuted,
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
            }}
          >
            DAILY TARGET
          </Typography>
          <Typography
            sx={{
              fontFamily: palette.mono,
              fontSize: 14,
              fontWeight: 600,
              color: palette.fg,
              mt: 0.5,
            }}
          >
            {target}
          </Typography>
          <Typography
            sx={{
              fontFamily: palette.mono,
              fontSize: 10,
              color: palette.fgMuted,
              mt: 0.75,
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
            }}
          >
            TASKS / DAY
          </Typography>
        </Box>
      </Stack>

      <svg
        viewBox={`0 0 ${W} ${H}`}
        style={{ width: '100%', height: 84, marginTop: 12, display: 'block', overflow: 'visible' }}
      >
        <line
          x1={padX}
          x2={W - padX}
          y1={H - 12 - (target / max) * (H - 20)}
          y2={H - 12 - (target / max) * (H - 20)}
          stroke={palette.fgMuted}
          strokeOpacity={0.5}
          strokeWidth="1"
          strokeDasharray="3 3"
        />
        {counts.map((v, i) => {
          const h = (v / max) * (H - 20);
          const x = padX + i * stepX + (stepX - barW) / 2;
          const isToday = i === counts.length - 1;
          const hitTarget = v >= target;
          return (
            <g key={i}>
              <rect
                x={x}
                y={H - 12 - h}
                width={barW}
                height={h}
                rx="3"
                fill={isToday ? palette.fg : hitTarget ? palette.green : palette.tileSoft}
              />
              <text
                x={x + barW / 2}
                y={H - 1}
                fontFamily={palette.mono}
                fontSize="9.5"
                fill={isToday ? palette.fg : palette.fgMuted}
                textAnchor="middle"
              >
                {days[i]}
              </text>
            </g>
          );
        })}
      </svg>
    </Box>
  );
}

/* ──────────────  Recently completed  ────────────── */
function CompletedRow({
  item,
  palette,
}: {
  item: (typeof completedHistory)[number];
  palette: ShopPalette;
}) {
  const color = taskCategoryColor[item.category];
  const text = taskCategoryText[item.category];
  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: '28px 1fr auto',
        gap: 1.5,
        alignItems: 'flex-start',
        px: 1.75,
        py: 1.5,
        background: palette.card2,
        borderRadius: '12px',
        border: `1px solid ${palette.hairline}`,
      }}
    >
      <Box
        sx={{
          width: 26,
          height: 26,
          borderRadius: 999,
          background: 'rgba(79,203,124,0.16)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}
      >
        <CheckRoundedIcon sx={{ fontSize: 14, color: palette.green }} />
      </Box>
      <Box sx={{ minWidth: 0 }}>
        <Typography
          sx={{
            fontSize: 13.5,
            fontWeight: 500,
            color: palette.fg,
            textDecoration: 'line-through',
            textDecorationColor: 'rgba(127,127,127,0.45)',
          }}
        >
          {item.title}
        </Typography>
        <Stack
          direction="row"
          sx={{
            mt: 0.5,
            alignItems: 'center',
            gap: 1,
            flexWrap: 'wrap',
            fontFamily: palette.mono,
            fontSize: 10.5,
            color: palette.fgMuted,
            letterSpacing: '0.04em',
          }}
        >
          <Stack component="span" direction="row" sx={{ alignItems: 'center', gap: 0.5, color: text }}>
            <Box sx={{ width: 5, height: 5, borderRadius: 999, background: color }} />
            {item.category.toUpperCase()}
          </Stack>
          <Typography component="span" sx={{ fontFamily: palette.mono, fontSize: 10.5 }}>
            · {item.when}
          </Typography>
          <Typography component="span" sx={{ fontFamily: palette.mono, fontSize: 10.5 }}>
            · {item.by}
          </Typography>
        </Stack>
        <Typography sx={{ mt: 0.75, fontSize: 11.5, color: palette.green }}>{item.impact}</Typography>
      </Box>
      <Stack
        direction="row"
        sx={{
          alignItems: 'center',
          gap: 0.5,
          fontFamily: palette.mono,
          fontSize: 10.5,
          color: palette.fg,
          opacity: 0.85,
          letterSpacing: '0.04em',
          flexShrink: 0,
        }}
      >
        <AccessTimeRoundedIcon sx={{ fontSize: 12, color: palette.fgMuted }} />
        {item.duration}
      </Stack>
    </Box>
  );
}

function RecentlyCompletedCard({ palette }: { palette: ShopPalette }) {
  const today = completedHistory.filter(h => h.when.startsWith('Today'));
  const yesterday = completedHistory.filter(h => h.when.startsWith('Yesterday'));
  const earlier = completedHistory.filter(
    h => !h.when.startsWith('Today') && !h.when.startsWith('Yesterday'),
  );
  const groups: Array<[string, typeof completedHistory]> = [
    ['TODAY', today],
    ['YESTERDAY', yesterday],
    ['EARLIER', earlier],
  ];
  return (
    <Box
      sx={{
        background: palette.card,
        border: `1px solid ${palette.hairline}`,
        borderRadius: '28px',
        p: 2.25,
      }}
    >
      <Stack direction="row" sx={{ justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <Box>
          <Stack direction="row" sx={{ alignItems: 'center', gap: 1 }}>
            <EmojiEventsRoundedIcon sx={{ fontSize: 14, color: palette.green }} />
            <Typography
              sx={{
                fontFamily: palette.mono,
                fontSize: 10.5,
                color: palette.fg,
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
              }}
            >
              RECENTLY COMPLETED
            </Typography>
          </Stack>
          <Typography
            sx={{
              mt: 0.75,
              fontFamily: palette.mono,
              fontSize: 11,
              color: palette.fgMuted,
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
            }}
          >
            {completedHistory.length} TASKS · LAST 5 DAYS
          </Typography>
        </Box>
        <ButtonBase
          sx={{
            background: 'transparent',
            border: `1px solid ${palette.hairline}`,
            color: palette.fg,
            borderRadius: 999,
            px: 1.5,
            py: 0.75,
            fontFamily: palette.mono,
            fontSize: 10.5,
            letterSpacing: '0.08em',
            fontWeight: 700,
            textTransform: 'uppercase',
          }}
        >
          See all
        </ButtonBase>
      </Stack>

      <Stack spacing={1.75} sx={{ mt: 1.75 }}>
        {groups.map(([label, rows]) =>
          rows.length > 0 ? (
            <Stack key={label} spacing={1}>
              <Typography
                sx={{
                  fontFamily: palette.mono,
                  fontSize: 9.5,
                  color: palette.fgMuted,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                }}
              >
                {label} · {rows.length}
              </Typography>
              <Stack spacing={1}>
                {rows.map(r => (
                  <CompletedRow key={r.id} item={r} palette={palette} />
                ))}
              </Stack>
            </Stack>
          ) : null,
        )}
      </Stack>
    </Box>
  );
}

/* ──────────────  Patterns spotted  ────────────── */
function PatternsCard({ palette }: { palette: ShopPalette }) {
  const items = [
    {
      title: 'Hygiene tasks slipping after 4 PM',
      body: '3 of last 5 days, Hygiene tasks pushed to next morning. Try slotting them before lunch.',
      tone: palette.amber,
    },
    {
      title: 'Cash reconciliation is faster on Tue/Thu',
      body: 'Avg 6 min vs 11 min on other days. Worth investigating Rohit’s Tue/Thu routine.',
      tone: palette.green,
    },
    {
      title: 'Reporting is your most reliable zone',
      body: '100% on-time for 14 days. Use this as the morale anchor at huddle.',
      tone: palette.tileBlue,
    },
  ];
  return (
    <Box
      sx={{
        background: palette.card,
        border: `1px solid ${palette.hairline}`,
        borderRadius: '28px',
        p: 2.25,
      }}
    >
      <Stack direction="row" sx={{ alignItems: 'center', gap: 1 }}>
        <AutoAwesomeRoundedIcon sx={{ fontSize: 14, color: '#9CA8FF' }} />
        <Typography
          sx={{
            fontFamily: palette.mono,
            fontSize: 10.5,
            color: palette.fg,
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
          }}
        >
          AI · PATTERNS SPOTTED
        </Typography>
      </Stack>

      <Stack spacing={1.5} sx={{ mt: 1.75 }}>
        {items.map(p => (
          <Box
            key={p.title}
            sx={{
              background: palette.card2,
              borderRadius: '12px',
              p: 1.75,
              borderLeft: `2px solid ${p.tone}`,
            }}
          >
            <Typography sx={{ fontSize: 13, fontWeight: 600, color: palette.fg }}>
              {p.title}
            </Typography>
            <Typography sx={{ mt: 0.5, fontSize: 12, color: palette.fgMuted, lineHeight: 1.5 }}>
              {p.body}
            </Typography>
          </Box>
        ))}
      </Stack>
    </Box>
  );
}

/* ──────────────  Top performers  ────────────── */
function TopPerformersCard({ palette }: { palette: ShopPalette }) {
  const rows = [
    { name: 'Rohit', role: 'Manager', done: 8, color: palette.green },
    { name: 'Ashish', role: 'Sales', done: 6, color: palette.tilePurple },
    { name: 'Suresh', role: 'Floor', done: 5, color: palette.tileBlue },
    { name: 'Lakshmi', role: 'Housekeeping', done: 3, color: palette.amber },
  ];
  const max = Math.max(...rows.map(r => r.done));
  return (
    <Box
      sx={{
        background: palette.card,
        border: `1px solid ${palette.hairline}`,
        borderRadius: '28px',
        p: 2.25,
      }}
    >
      <Stack direction="row" sx={{ alignItems: 'center', gap: 1 }}>
        <EmojiEventsRoundedIcon sx={{ fontSize: 14, color: palette.amber }} />
        <Typography
          sx={{
            fontFamily: palette.mono,
            fontSize: 10.5,
            color: palette.fg,
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
          }}
        >
          TOP PERFORMERS · THIS WEEK
        </Typography>
      </Stack>

      <Stack spacing={1.5} sx={{ mt: 1.75 }}>
        {rows.map(r => (
          <Box key={r.name}>
            <Stack direction="row" sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
              <Stack direction="row" sx={{ alignItems: 'center', gap: 1.25 }}>
                <Box
                  sx={{
                    width: 28,
                    height: 28,
                    borderRadius: '8px',
                    background: palette.tileSoft,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily: palette.mono,
                    fontSize: 11,
                    fontWeight: 700,
                    color: palette.fg,
                  }}
                >
                  {r.name[0]}
                  {r.role[0]}
                </Box>
                <Box>
                  <Typography sx={{ fontSize: 13.5, fontWeight: 500, color: palette.fg }}>
                    {r.name}
                  </Typography>
                  <Typography
                    sx={{
                      fontFamily: palette.mono,
                      fontSize: 10.5,
                      color: palette.fgMuted,
                      letterSpacing: '0.04em',
                      textTransform: 'uppercase',
                    }}
                  >
                    {r.role}
                  </Typography>
                </Box>
              </Stack>
              <Typography
                sx={{ fontFamily: palette.mono, fontSize: 14, fontWeight: 600, color: palette.fg }}
              >
                {r.done}
                <Box component="span" sx={{ color: palette.fgMuted, fontWeight: 500 }}>
                  {' '}
                  done
                </Box>
              </Typography>
            </Stack>
            <Box
              sx={{
                mt: 0.75,
                height: 4,
                borderRadius: 999,
                background: palette.tileSoft,
                overflow: 'hidden',
              }}
            >
              <Box
                sx={{
                  width: `${(r.done / max) * 100}%`,
                  height: '100%',
                  background: r.color,
                  borderRadius: 999,
                }}
              />
            </Box>
          </Box>
        ))}
      </Stack>
    </Box>
  );
}

export function InsightsTab({ onOpenTask }: InsightsTabProps) {
  const palette = useShopPalette();
  const stats = useMemo(tasksTotalStats, []);

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
        UPDATED JUST NOW · {formattedDate}
      </Typography>
      <TodayPulseCard stats={stats} palette={palette} />
      <AIImpactCard palette={palette} />
      <DoTheseNextCard tasks={allTasks} onOpenTask={onOpenTask} palette={palette} />
      <StreakCard palette={palette} />
      <RecentlyCompletedCard palette={palette} />
      <PatternsCard palette={palette} />
      <TopPerformersCard palette={palette} />
    </Stack>
  );
}
