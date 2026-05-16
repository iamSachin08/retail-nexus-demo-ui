import { Box, Chip, LinearProgress, Stack, Typography } from '@mui/material';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import TrendingUpRoundedIcon from '@mui/icons-material/TrendingUpRounded';
import HourglassBottomRoundedIcon from '@mui/icons-material/HourglassBottomRounded';
import WarningAmberRoundedIcon from '@mui/icons-material/WarningAmberRounded';
import MarkChatUnreadRoundedIcon from '@mui/icons-material/MarkChatUnreadRounded';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import { GlassCard } from '../components/GlassCard';
import { tokens } from '../theme/tokens';
import {
  aiTaskNudges,
  completionTrend7Days,
  taskCategoryColor,
  taskReports,
} from './mock';

const TASKS_GRADIENT = tokens.gradient.tasks;

function PromptStrip({ prompt }: { prompt: string }) {
  return (
    <Stack
      direction="row"
      sx={{
        alignItems: 'center',
        gap: 0.75,
        px: 1.25,
        py: 0.875,
        borderRadius: 1.5,
        background: tokens.gradient.aiAuroraSoft,
        border: '1px solid rgba(124,139,255,0.25)',
        mb: 1.25,
      }}
    >
      <AutoAwesomeIcon sx={{ fontSize: 14, color: '#7C5CFF' }} />
      <Typography sx={{ fontSize: 11.5, color: 'text.secondary', flex: 1, lineHeight: 1.3 }}>
        {prompt}
      </Typography>
    </Stack>
  );
}

function CardHeader({
  title,
  icon,
  accent,
  count,
}: {
  title: string;
  icon: React.ReactNode;
  accent: string;
  count?: number;
}) {
  return (
    <Stack direction="row" sx={{ alignItems: 'center', gap: 1, mb: 1 }}>
      <Box
        sx={{
          width: 28,
          height: 28,
          borderRadius: 1.5,
          background: accent,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#fff',
          '& svg': { fontSize: 16 },
          flexShrink: 0,
        }}
      >
        {icon}
      </Box>
      <Typography sx={{ fontSize: 15, fontWeight: 700, flex: 1 }}>{title}</Typography>
      {typeof count === 'number' && (
        <Box
          sx={{
            minWidth: 22,
            height: 22,
            px: 0.75,
            borderRadius: 999,
            background: accent,
            color: '#fff',
            fontSize: 11,
            fontWeight: 800,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {count}
        </Box>
      )}
    </Stack>
  );
}

function ConfidencePill({ level }: { level: 'high' | 'medium' | 'low' }) {
  const map: Record<typeof level, { bg: string; color: string; label: string }> = {
    high: { bg: 'rgba(34,197,94,0.14)', color: '#16A34A', label: 'High confidence' },
    medium: { bg: 'rgba(245,158,11,0.16)', color: '#D97706', label: 'Medium' },
    low: { bg: 'rgba(100,116,139,0.18)', color: '#475569', label: 'Low' },
  };
  const c = map[level];
  return (
    <Box
      sx={{
        fontSize: 9.5,
        fontWeight: 800,
        letterSpacing: 0.4,
        textTransform: 'uppercase',
        px: 0.875,
        py: 0.25,
        borderRadius: 999,
        bgcolor: c.bg,
        color: c.color,
      }}
    >
      {c.label}
    </Box>
  );
}

function AiNudges({ onOpenReport }: { onOpenReport: (id: string) => void }) {
  return (
    <GlassCard sx={{ p: 2 }}>
      <CardHeader
        title="AI nudges from your tasks"
        icon={<AutoAwesomeIcon />}
        accent={tokens.gradient.aiAurora}
        count={aiTaskNudges.length}
      />
      <PromptStrip prompt="Patterns picked up from the last 14 days of completion data. Act on these to keep the team unblocked." />
      <Stack spacing={1.25}>
        {aiTaskNudges.map(n => (
          <Box
            key={n.id}
            onClick={() => n.reportId && onOpenReport(n.reportId)}
            sx={theme => ({
              p: 1.5,
              borderRadius: 1.75,
              cursor: n.reportId ? 'pointer' : 'default',
              bgcolor:
                theme.palette.mode === 'dark'
                  ? 'rgba(255,255,255,0.04)'
                  : 'rgba(11,15,26,0.03)',
              border:
                theme.palette.mode === 'dark'
                  ? '1px solid rgba(255,255,255,0.06)'
                  : '1px solid rgba(11,15,26,0.05)',
              transition: 'background .2s ease',
              '&:hover': n.reportId
                ? {
                    bgcolor:
                      theme.palette.mode === 'dark'
                        ? 'rgba(255,255,255,0.07)'
                        : 'rgba(11,15,26,0.05)',
                  }
                : undefined,
            })}
          >
            <Stack
              direction="row"
              sx={{ alignItems: 'center', justifyContent: 'space-between', mb: 0.5 }}
            >
              <Typography sx={{ fontSize: 13.5, fontWeight: 700, flex: 1, mr: 1 }}>
                {n.title}
              </Typography>
              <ConfidencePill level={n.confidence} />
            </Stack>
            <Typography sx={{ fontSize: 11.5, color: 'text.secondary', lineHeight: 1.5, mb: 1 }}>
              {n.body}
            </Typography>
            <Stack direction="row" sx={{ alignItems: 'center' }}>
              <Box sx={{ flex: 1 }} />
              <Stack
                direction="row"
                sx={{
                  alignItems: 'center',
                  gap: 0.5,
                  px: 1.25,
                  py: 0.5,
                  borderRadius: 999,
                  background: TASKS_GRADIENT,
                  color: '#fff',
                  fontSize: 11.5,
                  fontWeight: 800,
                  boxShadow: '0 4px 10px rgba(124,92,255,0.32)',
                }}
              >
                {n.action}
                <ArrowForwardRoundedIcon sx={{ fontSize: 13 }} />
              </Stack>
            </Stack>
          </Box>
        ))}
      </Stack>
    </GlassCard>
  );
}

function CompletionTrend() {
  const w = 100;
  const h = 40;
  const pts = completionTrend7Days
    .map((p, i) => `${(i * w) / (completionTrend7Days.length - 1)},${h - (p.pct / 100) * h}`)
    .join(' ');
  const avg = Math.round(
    completionTrend7Days.reduce((a, b) => a + b.pct, 0) / completionTrend7Days.length,
  );
  const bestDay = completionTrend7Days.reduce((a, b) => (b.pct > a.pct ? b : a));
  const worstDay = completionTrend7Days.reduce((a, b) => (b.pct < a.pct ? b : a));

  return (
    <GlassCard sx={{ p: 2 }}>
      <CardHeader
        title="7-day completion trend"
        icon={<TrendingUpRoundedIcon />}
        accent={TASKS_GRADIENT}
      />
      <PromptStrip prompt="Average daily completion across all assigned tasks for the last 7 days." />

      <Stack direction="row" sx={{ gap: 1.5, mb: 1.5 }}>
        <Box sx={{ flex: 1 }}>
          <Typography
            sx={{ fontSize: 10, fontWeight: 800, letterSpacing: 0.5, color: 'text.disabled' }}
          >
            AVG. COMPLETION
          </Typography>
          <Typography sx={{ fontSize: 17, fontWeight: 800 }}>{avg}%</Typography>
        </Box>
        <Box sx={{ flex: 1 }}>
          <Typography
            sx={{ fontSize: 10, fontWeight: 800, letterSpacing: 0.5, color: 'text.disabled' }}
          >
            BEST DAY
          </Typography>
          <Typography sx={{ fontSize: 17, fontWeight: 800, color: '#22C55E' }}>
            {bestDay.day} · {bestDay.pct}%
          </Typography>
        </Box>
        <Box sx={{ flex: 1 }}>
          <Typography
            sx={{ fontSize: 10, fontWeight: 800, letterSpacing: 0.5, color: 'text.disabled' }}
          >
            WEAKEST
          </Typography>
          <Typography sx={{ fontSize: 17, fontWeight: 800, color: '#EF4444' }}>
            {worstDay.day} · {worstDay.pct}%
          </Typography>
        </Box>
      </Stack>

      <Box>
        <svg viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" width="100%" height={90}>
          <polyline points={pts} fill="none" stroke="#7C5CFF" strokeWidth="1.5" />
          <line
            x1="0"
            x2={w}
            y1={h - (avg / 100) * h}
            y2={h - (avg / 100) * h}
            stroke="#22C55E"
            strokeWidth="0.6"
            strokeDasharray="1.5 1.5"
          />
        </svg>
      </Box>
      <Stack direction="row" sx={{ gap: 1.5, mt: 1 }}>
        <Stack direction="row" sx={{ alignItems: 'center', gap: 0.5 }}>
          <Box sx={{ width: 10, height: 2, bgcolor: '#7C5CFF', borderRadius: 1 }} />
          <Typography sx={{ fontSize: 10.5, color: 'text.secondary', fontWeight: 700 }}>
            Daily completion
          </Typography>
        </Stack>
        <Stack direction="row" sx={{ alignItems: 'center', gap: 0.5 }}>
          <Box sx={{ width: 10, height: 2, borderTop: '2px dashed #22C55E', borderRadius: 1 }} />
          <Typography sx={{ fontSize: 10.5, color: 'text.secondary', fontWeight: 700 }}>
            7-day avg
          </Typography>
        </Stack>
      </Stack>
    </GlassCard>
  );
}

function statusChipStyle(status: 'overdue' | 'awaiting') {
  if (status === 'overdue')
    return {
      bg: 'rgba(239,68,68,0.16)',
      color: '#DC2626',
      label: 'OVERDUE',
    };
  return {
    bg: 'rgba(245,158,11,0.16)',
    color: '#D97706',
    label: 'AWAITING',
  };
}

function NeedsAttentionCard({ onOpenReport }: { onOpenReport: (id: string) => void }) {
  const items = taskReports.filter(r => r.status === 'overdue' || r.status === 'awaiting');
  return (
    <GlassCard sx={{ p: 2 }}>
      <CardHeader
        title="Reports that need attention"
        icon={<WarningAmberRoundedIcon />}
        accent={tokens.gradient.risk}
        count={items.length}
      />
      <PromptStrip prompt="Tasks that haven’t been reported on time. Ping Rohit, or open the task to comment." />
      <Stack divider={<Box sx={{ height: 1, background: 'divider' }} />}>
        {items.map(r => {
          const chip = statusChipStyle(r.status === 'overdue' ? 'overdue' : 'awaiting');
          return (
            <Stack
              key={r.id}
              direction="row"
              onClick={() => onOpenReport(r.id)}
              sx={{
                alignItems: 'center',
                gap: 1,
                py: 1.25,
                cursor: 'pointer',
                '&:hover': { opacity: 0.85 },
              }}
            >
              <Box
                sx={{
                  width: 6,
                  borderRadius: 999,
                  alignSelf: 'stretch',
                  bgcolor: taskCategoryColor[r.category],
                }}
              />
              <Box sx={{ flex: 1, minWidth: 0 }}>
                <Stack direction="row" sx={{ alignItems: 'center', gap: 0.75, mb: 0.25 }}>
                  <Typography sx={{ fontSize: 13, fontWeight: 700 }}>{r.taskTitle}</Typography>
                  <Typography sx={{ fontSize: 10.5, color: 'text.disabled' }}>
                    · {r.frequency}
                  </Typography>
                </Stack>
                <Typography sx={{ fontSize: 11.5, color: 'text.secondary' }}>
                  {r.periodLabel} · {r.summary}
                </Typography>
              </Box>
              <Chip
                size="small"
                label={chip.label}
                sx={{
                  height: 18,
                  fontSize: 9,
                  fontWeight: 800,
                  letterSpacing: 0.5,
                  bgcolor: chip.bg,
                  color: chip.color,
                  '& .MuiChip-label': { px: 0.75 },
                }}
              />
            </Stack>
          );
        })}
      </Stack>
    </GlassCard>
  );
}

function RecentSubmissionsCard({ onOpenReport }: { onOpenReport: (id: string) => void }) {
  const items = taskReports
    .filter(r => r.status === 'submitted')
    .slice(0, 4);
  return (
    <GlassCard sx={{ p: 2 }}>
      <CardHeader
        title="Recent submissions"
        icon={<HourglassBottomRoundedIcon />}
        accent={tokens.gradient.sales}
        count={items.length}
      />
      <PromptStrip prompt="Latest completion reports from Rohit. Tap to read, comment, or follow up." />
      <Stack spacing={1.25}>
        {items.map(r => (
          <Box
            key={r.id}
            onClick={() => onOpenReport(r.id)}
            sx={theme => ({
              p: 1.5,
              borderRadius: 1.75,
              cursor: 'pointer',
              bgcolor:
                theme.palette.mode === 'dark'
                  ? 'rgba(255,255,255,0.04)'
                  : 'rgba(11,15,26,0.03)',
              border:
                theme.palette.mode === 'dark'
                  ? '1px solid rgba(255,255,255,0.06)'
                  : '1px solid rgba(11,15,26,0.05)',
              '&:hover': {
                bgcolor:
                  theme.palette.mode === 'dark'
                    ? 'rgba(255,255,255,0.07)'
                    : 'rgba(11,15,26,0.05)',
              },
            })}
          >
            <Stack
              direction="row"
              sx={{ alignItems: 'center', mb: 0.5, gap: 1, justifyContent: 'space-between' }}
            >
              <Stack direction="row" sx={{ alignItems: 'center', gap: 0.75, flex: 1, minWidth: 0 }}>
                <Box
                  sx={{
                    width: 6,
                    height: 6,
                    borderRadius: '50%',
                    bgcolor: taskCategoryColor[r.category],
                  }}
                />
                <Typography sx={{ fontSize: 13.5, fontWeight: 700 }}>{r.taskTitle}</Typography>
                {!r.ownerSeen && (
                  <Box
                    sx={{
                      px: 0.75,
                      py: 0.125,
                      borderRadius: 999,
                      bgcolor: 'rgba(124,92,255,0.16)',
                      color: '#7C5CFF',
                      fontSize: 9,
                      fontWeight: 800,
                      letterSpacing: 0.5,
                    }}
                  >
                    NEW
                  </Box>
                )}
              </Stack>
              <Typography sx={{ fontSize: 10.5, color: 'text.disabled' }}>
                {r.submittedAt}
              </Typography>
            </Stack>
            <Typography
              sx={{
                fontSize: 12,
                color: 'text.secondary',
                lineHeight: 1.45,
                mb: 1,
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
              }}
            >
              {r.summary}
            </Typography>
            <Stack direction="row" sx={{ alignItems: 'center', gap: 1 }}>
              <Box sx={{ flex: 1 }}>
                <LinearProgress
                  variant="determinate"
                  value={r.completionPct}
                  sx={theme => ({
                    height: 5,
                    borderRadius: 999,
                    bgcolor:
                      theme.palette.mode === 'dark'
                        ? 'rgba(255,255,255,0.06)'
                        : 'rgba(11,15,26,0.06)',
                    '& .MuiLinearProgress-bar': {
                      borderRadius: 999,
                      bgcolor:
                        r.completionPct >= 90
                          ? '#22C55E'
                          : r.completionPct >= 70
                            ? '#F59E0B'
                            : '#EF4444',
                    },
                  })}
                />
              </Box>
              <Typography sx={{ fontSize: 11, fontWeight: 800, minWidth: 36, textAlign: 'right' }}>
                {r.completionPct}%
              </Typography>
              {r.comments.length > 0 && (
                <Stack direction="row" sx={{ alignItems: 'center', gap: 0.25, color: 'text.secondary' }}>
                  <MarkChatUnreadRoundedIcon sx={{ fontSize: 13 }} />
                  <Typography sx={{ fontSize: 11, fontWeight: 700 }}>
                    {r.comments.length}
                  </Typography>
                </Stack>
              )}
            </Stack>
          </Box>
        ))}
      </Stack>
    </GlassCard>
  );
}

export function InsightsTab({ onOpenReport }: { onOpenReport: (id: string) => void }) {
  return (
    <Stack spacing={1.5}>
      <AiNudges onOpenReport={onOpenReport} />
      <CompletionTrend />
      <NeedsAttentionCard onOpenReport={onOpenReport} />
      <RecentSubmissionsCard onOpenReport={onOpenReport} />
    </Stack>
  );
}
