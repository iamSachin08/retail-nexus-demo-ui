import { Box, LinearProgress, Stack, Tab, Tabs, Typography } from '@mui/material';
import MarkChatUnreadRoundedIcon from '@mui/icons-material/MarkChatUnreadRounded';
import PhotoLibraryRoundedIcon from '@mui/icons-material/PhotoLibraryRounded';
import { useState } from 'react';
import { GlassCard } from '../components/GlassCard';
import { moduleSubTabsSx } from '../theme/tabStyles';
import {
  taskCategoryColor,
  taskReports,
  type ReportStatus,
  type TaskReport,
} from './mock';

type FilterId = 'all' | ReportStatus;

const filterConfig: { id: FilterId; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'submitted', label: 'Submitted' },
  { id: 'awaiting', label: 'Awaiting' },
  { id: 'overdue', label: 'Overdue' },
];

function statusChip(status: ReportStatus) {
  switch (status) {
    case 'submitted':
      return { bg: 'rgba(34,197,94,0.14)', color: '#16A34A', label: 'SUBMITTED' };
    case 'awaiting':
      return { bg: 'rgba(245,158,11,0.16)', color: '#D97706', label: 'AWAITING' };
    case 'overdue':
      return { bg: 'rgba(239,68,68,0.16)', color: '#DC2626', label: 'OVERDUE' };
  }
}

function ReportCard({ report, onOpen }: { report: TaskReport; onOpen: (id: string) => void }) {
  const chip = statusChip(report.status);
  return (
    <GlassCard
      onClick={() => onOpen(report.id)}
      sx={theme => ({
        p: 1.75,
        cursor: 'pointer',
        borderLeft: `4px solid ${taskCategoryColor[report.category]}`,
        '&:hover': {
          boxShadow:
            theme.palette.mode === 'dark'
              ? '0 10px 28px rgba(0,0,0,0.4)'
              : '0 8px 24px rgba(11,15,26,0.08)',
        },
      })}
    >
      <Stack
        direction="row"
        sx={{ alignItems: 'flex-start', justifyContent: 'space-between', gap: 1, mb: 0.5 }}
      >
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Stack direction="row" sx={{ alignItems: 'center', gap: 0.5, mb: 0.25 }}>
            <Box
              sx={{
                px: 0.875,
                py: 0.125,
                borderRadius: 999,
                bgcolor: `${taskCategoryColor[report.category]}1F`,
                color: taskCategoryColor[report.category],
                fontSize: 9.5,
                fontWeight: 800,
                letterSpacing: 0.4,
                textTransform: 'uppercase',
              }}
            >
              {report.category}
            </Box>
            <Box
              sx={{
                px: 0.875,
                py: 0.125,
                borderRadius: 999,
                bgcolor:
                  report.frequency === 'daily'
                    ? 'rgba(124,92,255,0.16)'
                    : 'rgba(78,140,255,0.16)',
                color: report.frequency === 'daily' ? '#7C5CFF' : '#4E8CFF',
                fontSize: 9.5,
                fontWeight: 800,
                letterSpacing: 0.4,
                textTransform: 'uppercase',
              }}
            >
              {report.frequency}
            </Box>
            {!report.ownerSeen && (
              <Box
                sx={{
                  px: 0.875,
                  py: 0.125,
                  borderRadius: 999,
                  bgcolor: 'rgba(124,92,255,0.16)',
                  color: '#7C5CFF',
                  fontSize: 9.5,
                  fontWeight: 800,
                  letterSpacing: 0.4,
                }}
              >
                NEW
              </Box>
            )}
          </Stack>
          <Typography sx={{ fontSize: 14, fontWeight: 700 }}>{report.taskTitle}</Typography>
          <Typography sx={{ fontSize: 11, color: 'text.disabled' }}>
            {report.periodLabel}
            {report.submittedAt ? ` · ${report.submittedAt}` : ''}
          </Typography>
        </Box>
        <Box
          sx={{
            px: 0.875,
            py: 0.25,
            borderRadius: 999,
            bgcolor: chip.bg,
            color: chip.color,
            fontSize: 9.5,
            fontWeight: 800,
            letterSpacing: 0.5,
          }}
        >
          {chip.label}
        </Box>
      </Stack>
      <Typography
        sx={{
          fontSize: 12,
          color: 'text.secondary',
          lineHeight: 1.45,
          mt: 0.5,
          mb: 1,
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
        }}
      >
        {report.summary}
      </Typography>
      <Stack direction="row" sx={{ alignItems: 'center', gap: 1 }}>
        <Box sx={{ flex: 1 }}>
          <LinearProgress
            variant="determinate"
            value={report.completionPct}
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
                  report.completionPct >= 90
                    ? '#22C55E'
                    : report.completionPct >= 50
                      ? '#F59E0B'
                      : '#EF4444',
              },
            })}
          />
        </Box>
        <Typography sx={{ fontSize: 11, fontWeight: 800, minWidth: 36, textAlign: 'right' }}>
          {report.completionPct}%
        </Typography>
        {report.photos && report.photos.length > 0 && (
          <Stack direction="row" sx={{ alignItems: 'center', gap: 0.25, color: 'text.secondary' }}>
            <PhotoLibraryRoundedIcon sx={{ fontSize: 13 }} />
            <Typography sx={{ fontSize: 11, fontWeight: 700 }}>{report.photos.length}</Typography>
          </Stack>
        )}
        {report.comments.length > 0 && (
          <Stack direction="row" sx={{ alignItems: 'center', gap: 0.25, color: 'text.secondary' }}>
            <MarkChatUnreadRoundedIcon sx={{ fontSize: 13 }} />
            <Typography sx={{ fontSize: 11, fontWeight: 700 }}>
              {report.comments.length}
            </Typography>
          </Stack>
        )}
      </Stack>
    </GlassCard>
  );
}

export function ReportsTab({ onOpenReport }: { onOpenReport: (id: string) => void }) {
  const [filter, setFilter] = useState<FilterId>('all');
  const list = taskReports.filter(r => filter === 'all' || r.status === filter);

  return (
    <Stack spacing={1.5}>
      <Box sx={{ display: 'inline-flex', width: '100%' }}>
        <Tabs
          value={filter}
          onChange={(_, v) => setFilter(v as FilterId)}
          variant="fullWidth"
          sx={moduleSubTabsSx}
        >
          {filterConfig.map(f => (
            <Tab key={f.id} value={f.id} label={f.label} />
          ))}
        </Tabs>
      </Box>

      <Stack spacing={1}>
        {list.map(r => (
          <ReportCard key={r.id} report={r} onOpen={onOpenReport} />
        ))}
        {list.length === 0 && (
          <Typography
            sx={{ fontSize: 12, color: 'text.secondary', textAlign: 'center', py: 3 }}
          >
            No reports in this view.
          </Typography>
        )}
      </Stack>
    </Stack>
  );
}
