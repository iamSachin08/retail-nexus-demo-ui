import { Box, LinearProgress, Stack, Typography } from '@mui/material';
import TodayRoundedIcon from '@mui/icons-material/TodayRounded';
import DateRangeRoundedIcon from '@mui/icons-material/DateRangeRounded';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import WarningAmberRoundedIcon from '@mui/icons-material/WarningAmberRounded';
import { GlassCard } from '../components/GlassCard';
import { tokens } from '../theme/tokens';
import {
  allTasks,
  dailyTasks,
  taskCategoryColor,
  taskCounts,
  taskReports,
  weeklyTasks,
} from './mock';

function KpiTile({
  label,
  value,
  sub,
  tone,
  icon,
}: {
  label: string;
  value: string | number;
  sub?: string;
  tone: 'primary' | 'success' | 'warning' | 'danger';
  icon: React.ReactNode;
}) {
  const map = {
    primary: tokens.gradient.tasks,
    success: tokens.gradient.sales,
    warning: tokens.gradient.sop,
    danger: tokens.gradient.risk,
  };
  return (
    <GlassCard sx={{ p: 1.5, flex: 1, minWidth: 0 }}>
      <Stack direction="row" sx={{ alignItems: 'center', gap: 0.875, mb: 1 }}>
        <Box
          sx={{
            width: 26,
            height: 26,
            borderRadius: 1.5,
            background: map[tone],
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
            '& svg': { fontSize: 15 },
          }}
        >
          {icon}
        </Box>
        <Typography
          sx={{
            fontSize: 10,
            fontWeight: 800,
            letterSpacing: 0.5,
            color: 'text.disabled',
            textTransform: 'uppercase',
          }}
        >
          {label}
        </Typography>
      </Stack>
      <Typography sx={{ fontSize: 22, fontWeight: 800, letterSpacing: -0.4, lineHeight: 1 }}>
        {value}
      </Typography>
      {sub && (
        <Typography sx={{ fontSize: 11, color: 'text.secondary', mt: 0.5 }}>{sub}</Typography>
      )}
    </GlassCard>
  );
}

function CategoryBreakdown() {
  const map = new Map<string, number>();
  allTasks.forEach(t => map.set(t.category, (map.get(t.category) ?? 0) + 1));
  const total = allTasks.length;
  const rows = Array.from(map.entries()).sort((a, b) => b[1] - a[1]);
  return (
    <GlassCard sx={{ p: 2 }}>
      <Typography sx={{ fontSize: 15, fontWeight: 700, mb: 1.25 }}>
        Tasks by category
      </Typography>
      <Stack spacing={1.25}>
        {rows.map(([cat, count]) => {
          const pct = Math.round((count / total) * 100);
          const color = taskCategoryColor[cat as keyof typeof taskCategoryColor];
          return (
            <Box key={cat}>
              <Stack direction="row" sx={{ alignItems: 'center', mb: 0.5, gap: 1 }}>
                <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: color }} />
                <Typography sx={{ fontSize: 13, fontWeight: 700, flex: 1 }}>{cat}</Typography>
                <Typography sx={{ fontSize: 11, color: 'text.disabled' }}>
                  {count} task{count === 1 ? '' : 's'}
                </Typography>
                <Box
                  sx={{
                    px: 0.875,
                    py: 0.125,
                    borderRadius: 999,
                    bgcolor: `${color}1F`,
                    color,
                    fontSize: 11,
                    fontWeight: 800,
                  }}
                >
                  {pct}%
                </Box>
              </Stack>
              <LinearProgress
                variant="determinate"
                value={pct}
                sx={theme => ({
                  height: 5,
                  borderRadius: 999,
                  bgcolor:
                    theme.palette.mode === 'dark'
                      ? 'rgba(255,255,255,0.06)'
                      : 'rgba(11,15,26,0.06)',
                  '& .MuiLinearProgress-bar': {
                    borderRadius: 999,
                    bgcolor: color,
                  },
                })}
              />
            </Box>
          );
        })}
      </Stack>
    </GlassCard>
  );
}

function FrequencySplit() {
  return (
    <GlassCard sx={{ p: 2 }}>
      <Typography sx={{ fontSize: 15, fontWeight: 700, mb: 1.25 }}>
        Daily vs. Weekly cadence
      </Typography>
      <Stack direction="row" sx={{ gap: 1 }}>
        <Box
          sx={theme => ({
            flex: 1,
            p: 1.5,
            borderRadius: 1.75,
            bgcolor:
              theme.palette.mode === 'dark'
                ? 'rgba(255,255,255,0.04)'
                : 'rgba(11,15,26,0.03)',
            border:
              theme.palette.mode === 'dark'
                ? '1px solid rgba(255,255,255,0.06)'
                : '1px solid rgba(11,15,26,0.05)',
          })}
        >
          <Stack direction="row" sx={{ alignItems: 'center', gap: 0.75, mb: 0.75 }}>
            <TodayRoundedIcon sx={{ fontSize: 16, color: '#7C5CFF' }} />
            <Typography
              sx={{
                fontSize: 10,
                fontWeight: 800,
                letterSpacing: 0.5,
                color: 'text.disabled',
                textTransform: 'uppercase',
              }}
            >
              Daily
            </Typography>
          </Stack>
          <Typography sx={{ fontSize: 22, fontWeight: 800, lineHeight: 1 }}>
            {dailyTasks.length}
          </Typography>
          <Typography sx={{ fontSize: 11, color: 'text.secondary', mt: 0.5 }}>
            ~{dailyTasks.reduce((a, b) => a + b.expectedMins, 0)} min /day
          </Typography>
        </Box>
        <Box
          sx={theme => ({
            flex: 1,
            p: 1.5,
            borderRadius: 1.75,
            bgcolor:
              theme.palette.mode === 'dark'
                ? 'rgba(255,255,255,0.04)'
                : 'rgba(11,15,26,0.03)',
            border:
              theme.palette.mode === 'dark'
                ? '1px solid rgba(255,255,255,0.06)'
                : '1px solid rgba(11,15,26,0.05)',
          })}
        >
          <Stack direction="row" sx={{ alignItems: 'center', gap: 0.75, mb: 0.75 }}>
            <DateRangeRoundedIcon sx={{ fontSize: 16, color: '#4E8CFF' }} />
            <Typography
              sx={{
                fontSize: 10,
                fontWeight: 800,
                letterSpacing: 0.5,
                color: 'text.disabled',
                textTransform: 'uppercase',
              }}
            >
              Weekly
            </Typography>
          </Stack>
          <Typography sx={{ fontSize: 22, fontWeight: 800, lineHeight: 1 }}>
            {weeklyTasks.length}
          </Typography>
          <Typography sx={{ fontSize: 11, color: 'text.secondary', mt: 0.5 }}>
            ~{Math.round(weeklyTasks.reduce((a, b) => a + b.expectedMins, 0) / 60)} hr /week
          </Typography>
        </Box>
      </Stack>
    </GlassCard>
  );
}

function ManagerLoad() {
  const submitted = taskReports.filter(r => r.status === 'submitted');
  const avg = submitted.length
    ? Math.round(submitted.reduce((a, b) => a + b.completionPct, 0) / submitted.length)
    : 0;
  return (
    <GlassCard sx={{ p: 2 }}>
      <Typography sx={{ fontSize: 15, fontWeight: 700, mb: 1.25 }}>
        Manager performance · Rohit
      </Typography>
      <Stack direction="row" sx={{ alignItems: 'baseline', gap: 1, mb: 0.5 }}>
        <Typography sx={{ fontSize: 26, fontWeight: 800 }}>{avg}%</Typography>
        <Typography sx={{ fontSize: 11, color: 'text.secondary' }}>
          avg. completion · last {submitted.length} reports
        </Typography>
      </Stack>
      <LinearProgress
        variant="determinate"
        value={avg}
        sx={{
          height: 6,
          borderRadius: 999,
          mb: 1.5,
          backgroundColor: 'rgba(11,15,26,0.06)',
          '& .MuiLinearProgress-bar': {
            background: tokens.gradient.tasks,
            borderRadius: 999,
          },
        }}
      />
      <Stack direction="row" sx={{ gap: 1.5, flexWrap: 'wrap' }}>
        <Box>
          <Typography
            sx={{
              fontSize: 10,
              fontWeight: 800,
              letterSpacing: 0.5,
              color: 'text.disabled',
              textTransform: 'uppercase',
            }}
          >
            On-time
          </Typography>
          <Typography sx={{ fontSize: 15, fontWeight: 800 }}>
            {submitted.filter(r => r.completionPct >= 90).length}
          </Typography>
        </Box>
        <Box>
          <Typography
            sx={{
              fontSize: 10,
              fontWeight: 800,
              letterSpacing: 0.5,
              color: 'text.disabled',
              textTransform: 'uppercase',
            }}
          >
            Partial
          </Typography>
          <Typography sx={{ fontSize: 15, fontWeight: 800, color: '#F59E0B' }}>
            {submitted.filter(r => r.completionPct < 90 && r.completionPct >= 50).length}
          </Typography>
        </Box>
        <Box>
          <Typography
            sx={{
              fontSize: 10,
              fontWeight: 800,
              letterSpacing: 0.5,
              color: 'text.disabled',
              textTransform: 'uppercase',
            }}
          >
            Missed
          </Typography>
          <Typography sx={{ fontSize: 15, fontWeight: 800, color: '#EF4444' }}>
            {taskReports.filter(r => r.status === 'overdue').length}
          </Typography>
        </Box>
        <Box>
          <Typography
            sx={{
              fontSize: 10,
              fontWeight: 800,
              letterSpacing: 0.5,
              color: 'text.disabled',
              textTransform: 'uppercase',
            }}
          >
            Comments
          </Typography>
          <Typography sx={{ fontSize: 15, fontWeight: 800 }}>
            {taskReports.reduce((a, b) => a + b.comments.length, 0)}
          </Typography>
        </Box>
      </Stack>
    </GlassCard>
  );
}

export function DashboardTab() {
  const c = taskCounts();
  return (
    <Stack spacing={1.5}>
      <Stack direction="row" sx={{ gap: 1 }}>
        <KpiTile
          label="Active tasks"
          value={c.totalDaily + c.totalWeekly}
          sub={`${c.totalDaily} daily · ${c.totalWeekly} weekly`}
          tone="primary"
          icon={<TodayRoundedIcon />}
        />
        <KpiTile
          label="Submitted today"
          value={c.submittedToday}
          sub="last 24 hrs"
          tone="success"
          icon={<CheckCircleRoundedIcon />}
        />
      </Stack>
      <Stack direction="row" sx={{ gap: 1 }}>
        <KpiTile
          label="Awaiting"
          value={c.awaiting}
          sub="not yet submitted"
          tone="warning"
          icon={<DateRangeRoundedIcon />}
        />
        <KpiTile
          label="Overdue"
          value={c.overdue}
          sub="past deadline"
          tone="danger"
          icon={<WarningAmberRoundedIcon />}
        />
      </Stack>
      <FrequencySplit />
      <ManagerLoad />
      <CategoryBreakdown />
    </Stack>
  );
}
