import { Box, Button, Stack, Typography } from '@mui/material';
import ReceiptLongOutlinedIcon from '@mui/icons-material/ReceiptLongOutlined';
import PaidOutlinedIcon from '@mui/icons-material/PaidOutlined';
import ChatBubbleOutlineRoundedIcon from '@mui/icons-material/ChatBubbleOutlineRounded';
import { useState } from 'react';
import { GlassCard } from '../../components/GlassCard';
import { ReportDetailDrawer } from './ReportDetailDrawer';
import type { ReportSummary } from '../../mock/data/salesOrders';
import { reportsHistory } from '../../mock/data/salesOrders';

type BadgeTone = 'critical' | 'warning' | 'success' | 'neutral';

const TONE_COLOR: Record<BadgeTone, string> = {
  critical: '#EF4444',
  warning: '#F59E0B',
  success: '#22C55E',
  neutral: '#94A3B8',
};

function StatusBadge({ tone, label }: { tone: BadgeTone; label: string }) {
  const color = TONE_COLOR[tone];
  return (
    <Box
      sx={{
        px: 1,
        py: 0.375,
        borderRadius: 999,
        background: `${color}1F`,
        border: `1px solid ${color}55`,
        color,
        fontSize: 10,
        fontWeight: 800,
        letterSpacing: 0.7,
        textTransform: 'uppercase',
        whiteSpace: 'nowrap',
      }}
    >
      {label}
    </Box>
  );
}

function PendingReportCard({
  report,
  tone,
  badgeLabel,
  onOpen,
}: {
  report: ReportSummary;
  tone: BadgeTone;
  badgeLabel: string;
  onOpen: (r: ReportSummary) => void;
}) {
  const revenueKpi = report.kpis.find(k => k.label.toLowerCase().includes('revenue'));
  const ordersKpi = report.kpis.find(k => k.label.toLowerCase().includes('order'));
  return (
    <GlassCard sx={{ p: 2 }}>
      <Stack direction="row" sx={{ alignItems: 'flex-start', gap: 1, mb: 1 }}>
        <Typography sx={{ flex: 1, fontSize: 16, fontWeight: 800, letterSpacing: -0.2 }}>
          {report.title}
        </Typography>
        <StatusBadge tone={tone} label={badgeLabel} />
      </Stack>
      <Typography
        sx={{
          fontSize: 11,
          fontWeight: 700,
          letterSpacing: 0.6,
          textTransform: 'uppercase',
          color: 'text.secondary',
          mb: ordersKpi || revenueKpi ? 1.25 : 1.75,
        }}
      >
        Generated: {report.generatedAt}
      </Typography>
      {(ordersKpi || revenueKpi) && (
        <Stack direction="row" sx={{ gap: 2.5, mb: 1.75 }}>
          {ordersKpi && (
            <Stack direction="row" sx={{ alignItems: 'center', gap: 0.75 }}>
              <ReceiptLongOutlinedIcon sx={{ fontSize: 18, color: 'text.secondary' }} />
              <Typography sx={{ fontSize: 13, fontWeight: 700 }}>
                {ordersKpi.value} Txns
              </Typography>
            </Stack>
          )}
          {revenueKpi && (
            <Stack direction="row" sx={{ alignItems: 'center', gap: 0.75 }}>
              <PaidOutlinedIcon sx={{ fontSize: 18, color: 'text.secondary' }} />
              <Typography sx={{ fontSize: 13, fontWeight: 700 }}>{revenueKpi.value}</Typography>
            </Stack>
          )}
        </Stack>
      )}
      <Stack direction="row" sx={{ gap: 1 }}>
        <Button
          fullWidth
          variant="outlined"
          onClick={() => onOpen(report)}
          sx={{
            borderRadius: 999,
            py: 1,
            fontSize: 11.5,
            fontWeight: 800,
            letterSpacing: 0.6,
            color: 'text.primary',
            borderColor: 'rgba(255,255,255,0.18)',
            '&:hover': { borderColor: 'rgba(255,255,255,0.32)', background: 'rgba(255,255,255,0.04)' },
          }}
        >
          Review
        </Button>
        <Button
          fullWidth
          variant="contained"
          onClick={() => onOpen(report)}
          sx={{
            borderRadius: 999,
            py: 1,
            fontSize: 11.5,
            fontWeight: 800,
            letterSpacing: 0.6,
            background: '#fff',
            color: '#0B0F1A',
            boxShadow: 'none',
            '&:hover': { background: '#F4F4F5', boxShadow: 'none' },
          }}
        >
          Send to Owner
        </Button>
      </Stack>
    </GlassCard>
  );
}

function HistoryReportCard({
  report,
  onOpen,
}: {
  report: ReportSummary;
  onOpen: (r: ReportSummary) => void;
}) {
  const hasComments = report.comments.length > 0;
  const tone: BadgeTone = hasComments ? 'success' : 'neutral';
  const badgeLabel = hasComments ? 'Commented' : 'Seen';
  return (
    <GlassCard sx={{ p: 2 }}>
      <Stack
        direction="row"
        onClick={() => onOpen(report)}
        sx={{ alignItems: 'flex-start', gap: 1, cursor: 'pointer' }}
      >
        <Typography sx={{ flex: 1, fontSize: 16, fontWeight: 800, letterSpacing: -0.2 }}>
          {report.title}
        </Typography>
        <StatusBadge tone={tone} label={badgeLabel} />
      </Stack>
      <Stack
        direction="row"
        sx={{
          alignItems: 'center',
          justifyContent: 'space-between',
          mt: 1.25,
          pt: 1.25,
          borderTop: '1px solid rgba(255,255,255,0.06)',
        }}
      >
        <Typography
          sx={{
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: 0.6,
            textTransform: 'uppercase',
            color: 'text.secondary',
          }}
        >
          Sent: {report.generatedAt}
        </Typography>
        {hasComments && (
          <Stack
            direction="row"
            onClick={() => onOpen(report)}
            sx={{ alignItems: 'center', gap: 0.5, cursor: 'pointer', color: 'text.primary' }}
          >
            <ChatBubbleOutlineRoundedIcon sx={{ fontSize: 14 }} />
            <Typography
              sx={{
                fontSize: 11.5,
                fontWeight: 700,
                textDecoration: 'underline',
              }}
            >
              View {report.comments.length} Comment{report.comments.length === 1 ? '' : 's'}
            </Typography>
          </Stack>
        )}
      </Stack>
    </GlassCard>
  );
}

function SectionHeader({ children }: { children: React.ReactNode }) {
  return (
    <Typography sx={{ fontSize: 20, fontWeight: 800, letterSpacing: -0.3, px: 0.5 }}>
      {children}
    </Typography>
  );
}

export function ReportsTab() {
  const [openReport, setOpenReport] = useState<ReportSummary | null>(null);

  const pending = reportsHistory.filter(r => r.status === 'pending-review');
  const sent = reportsHistory.filter(r => r.status === 'sent');

  return (
    <Stack spacing={2}>
      {pending.length > 0 && (
        <Stack spacing={1.5}>
          <SectionHeader>Pending Review</SectionHeader>
          {pending.map((p, idx) => {
            const tone: BadgeTone = idx === 0 ? 'critical' : 'warning';
            const badgeLabel = idx === 0 ? 'Action Required' : 'Pending';
            return (
              <PendingReportCard
                key={p.id}
                report={p}
                tone={tone}
                badgeLabel={badgeLabel}
                onOpen={setOpenReport}
              />
            );
          })}
        </Stack>
      )}

      {sent.length > 0 && (
        <Stack spacing={1.5}>
          <SectionHeader>Report History</SectionHeader>
          {sent.map(r => (
            <HistoryReportCard key={r.id} report={r} onOpen={setOpenReport} />
          ))}
        </Stack>
      )}

      <ReportDetailDrawer report={openReport} onClose={() => setOpenReport(null)} />
    </Stack>
  );
}
