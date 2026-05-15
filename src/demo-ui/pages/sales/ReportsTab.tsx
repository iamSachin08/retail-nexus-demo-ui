import {
  Box,
  Button,
  Chip,
  Stack,
  Typography,
} from '@mui/material';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import ScheduleRoundedIcon from '@mui/icons-material/ScheduleRounded';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import ChatBubbleOutlineRoundedIcon from '@mui/icons-material/ChatBubbleOutlineRounded';
import EventNoteRoundedIcon from '@mui/icons-material/EventNoteRounded';
import { useState } from 'react';
import { GlassCard } from '../../components/GlassCard';
import { ReportDetailDrawer } from './ReportDetailDrawer';
import type { ReportSummary } from '../../mock/data/salesOrders';
import { reportsHistory } from '../../mock/data/salesOrders';
import { tokens } from '../../theme/tokens';

const statusBadge: Record<ReportSummary['status'], { color: string; label: string }> = {
  'pending-review': { color: '#F59E0B', label: 'PENDING REVIEW' },
  sent: { color: '#22C55E', label: 'SENT' },
  scheduled: { color: '#3B82F6', label: 'SCHEDULED' },
};

function ReportRow({
  report,
  onOpen,
}: {
  report: ReportSummary;
  onOpen: (r: ReportSummary) => void;
}) {
  const badge = statusBadge[report.status];
  return (
    <Stack
      direction="row"
      onClick={() => onOpen(report)}
      sx={{
        alignItems: 'center',
        gap: 1,
        py: 1.25,
        px: 0.5,
        mx: -0.5,
        cursor: 'pointer',
        borderRadius: 1,
        transition: 'background .15s ease',
        '&:hover': { background: 'rgba(11,15,26,0.03)' },
      }}
    >
      <Box
        sx={{
          width: 36,
          height: 36,
          borderRadius: 1.5,
          background: `${badge.color}1A`,
          color: badge.color,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}
      >
        {report.status === 'scheduled' ? (
          <EventNoteRoundedIcon sx={{ fontSize: 18 }} />
        ) : (
          <DescriptionOutlinedIcon sx={{ fontSize: 18 }} />
        )}
      </Box>
      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Stack direction="row" sx={{ alignItems: 'center', gap: 0.75, flexWrap: 'wrap' }}>
          <Typography sx={{ fontSize: 13.5, fontWeight: 700 }} noWrap>
            {report.title}
          </Typography>
          {report.comments.length > 0 && (
            <Stack direction="row" sx={{ alignItems: 'center', gap: 0.25, color: 'text.secondary' }}>
              <ChatBubbleOutlineRoundedIcon sx={{ fontSize: 12 }} />
              <Typography sx={{ fontSize: 10.5, fontWeight: 700 }}>{report.comments.length}</Typography>
            </Stack>
          )}
        </Stack>
        <Typography sx={{ fontSize: 11, color: 'text.secondary' }} noWrap>
          {report.period} · {report.generatedAt}
        </Typography>
      </Box>
      <Chip
        size="small"
        label={badge.label}
        sx={{
          height: 18,
          fontSize: 9,
          fontWeight: 800,
          letterSpacing: 0.5,
          background: `${badge.color}1F`,
          color: badge.color,
          border: `1px solid ${badge.color}40`,
          '& .MuiChip-label': { px: 0.75 },
        }}
      />
    </Stack>
  );
}

export function ReportsTab() {
  const [openReport, setOpenReport] = useState<ReportSummary | null>(null);

  const pending = reportsHistory.filter(r => r.status === 'pending-review');
  const scheduled = reportsHistory.filter(r => r.status === 'scheduled');
  const sent = reportsHistory.filter(r => r.status === 'sent');

  return (
    <Stack spacing={1.5}>
      {/* Pending / scheduled banner */}
      <GlassCard sx={{ p: 1.75 }}>
        {pending.map(p => (
          <Stack
            key={p.id}
            direction="row"
            onClick={() => setOpenReport(p)}
            sx={{
              alignItems: 'center',
              gap: 1,
              cursor: 'pointer',
              mb: scheduled.length > 0 ? 1.25 : 0,
            }}
          >
            <Box
              sx={{
                width: 32,
                height: 32,
                borderRadius: 1.5,
                background: 'rgba(245,158,11,0.16)',
                color: '#F59E0B',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <DescriptionOutlinedIcon sx={{ fontSize: 18 }} />
            </Box>
            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Typography sx={{ fontSize: 13.5, fontWeight: 700 }}>
                1 Daily Sales Report ready to review and send
              </Typography>
              <Typography sx={{ fontSize: 11.5, color: 'text.secondary' }}>
                {p.generatedAt}
              </Typography>
            </Box>
            <Button
              size="small"
              startIcon={<WhatsAppIcon />}
              sx={{
                background: '#22C55E',
                color: '#fff',
                fontSize: 11,
                fontWeight: 700,
                '&:hover': { background: '#22C55E', filter: 'brightness(1.08)' },
              }}
              onClick={e => {
                e.stopPropagation();
                setOpenReport(p);
              }}
            >
              Review
            </Button>
          </Stack>
        ))}

        {scheduled.map(s => (
          <Stack
            key={s.id}
            direction="row"
            sx={{ alignItems: 'center', gap: 1 }}
          >
            <Box
              sx={{
                width: 32,
                height: 32,
                borderRadius: 1.5,
                background: 'rgba(59,130,246,0.14)',
                color: '#3B82F6',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <ScheduleRoundedIcon sx={{ fontSize: 18 }} />
            </Box>
            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Typography sx={{ fontSize: 13.5, fontWeight: 700 }}>
                Next Monthly Sales Report
              </Typography>
              <Typography sx={{ fontSize: 11.5, color: 'text.secondary' }}>
                {s.generatedAt}
              </Typography>
            </Box>
          </Stack>
        ))}
      </GlassCard>

      {/* Reports History */}
      <Box>
        <Typography sx={{ fontSize: 13, fontWeight: 700, mb: 1, px: 0.5 }}>
          Reports History
        </Typography>
        <GlassCard sx={{ p: 1.5, py: 0.5 }}>
          <Stack divider={<Box sx={{ height: 1, background: 'divider' }} />}>
            {sent.map(r => (
              <ReportRow key={r.id} report={r} onOpen={setOpenReport} />
            ))}
          </Stack>
        </GlassCard>
      </Box>

      {/* AI prompt strip */}
      <Box
        sx={{
          p: 1.5,
          borderRadius: 2,
          background: tokens.gradient.aiAuroraSoft,
          border: '1px solid rgba(124,139,255,0.25)',
        }}
      >
        <Typography sx={{ fontSize: 11, color: 'text.secondary', lineHeight: 1.4 }}>
          ✨ <Box component="strong" sx={{ color: 'text.primary' }}>Customize report templates</Box> — owners can edit which KPIs to highlight and which managers receive the WhatsApp digest.
        </Typography>
      </Box>

      <ReportDetailDrawer report={openReport} onClose={() => setOpenReport(null)} />
    </Stack>
  );
}
