import { Box, LinearProgress, Stack, Typography } from '@mui/material';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import SmsRoundedIcon from '@mui/icons-material/SmsRounded';
import NotificationsActiveRoundedIcon from '@mui/icons-material/NotificationsActiveRounded';
import CampaignRoundedIcon from '@mui/icons-material/CampaignRounded';
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded';
import TouchAppRoundedIcon from '@mui/icons-material/TouchAppRounded';
import PaidRoundedIcon from '@mui/icons-material/PaidRounded';
import { GlassCard } from '../components/GlassCard';
import {
  campaigns,
  channelColor,
  formatInr,
  statusColor,
  summarizeMetrics,
} from './mock';
import type { Campaign, Channel } from './mock';

const CAMPAIGN_GRADIENT = 'linear-gradient(135deg, #FF6FA8 0%, #E54E8A 100%)';

const channelIcon: Record<Channel, React.ReactNode> = {
  WhatsApp: <WhatsAppIcon sx={{ fontSize: 14 }} />,
  SMS: <SmsRoundedIcon sx={{ fontSize: 14 }} />,
  Push: <NotificationsActiveRoundedIcon sx={{ fontSize: 14 }} />,
};

function KpiTile({
  label,
  value,
  sub,
  icon,
  accent,
}: {
  label: string;
  value: string;
  sub?: string;
  icon: React.ReactNode;
  accent: string;
}) {
  return (
    <GlassCard sx={{ p: 1.75 }}>
      <Stack direction="row" sx={{ alignItems: 'flex-start', gap: 1 }}>
        <Box
          sx={{
            width: 32,
            height: 32,
            borderRadius: 1.25,
            background: accent,
            color: '#fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          {icon}
        </Box>
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Typography
            sx={{
              fontSize: 10,
              fontWeight: 800,
              letterSpacing: 0.5,
              textTransform: 'uppercase',
              color: 'text.disabled',
            }}
          >
            {label}
          </Typography>
          <Typography sx={{ fontSize: 19, fontWeight: 800, lineHeight: 1.2 }}>{value}</Typography>
          {sub && (
            <Typography sx={{ fontSize: 10.5, color: 'text.secondary' }}>{sub}</Typography>
          )}
        </Box>
      </Stack>
    </GlassCard>
  );
}

function ActiveCampaignRow({ c }: { c: Campaign }) {
  const summary = summarizeMetrics(c.metrics);
  return (
    <Stack
      direction="row"
      sx={theme => ({
        alignItems: 'center',
        gap: 1.25,
        p: 1.25,
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
      <Box
        sx={{
          width: 36,
          height: 36,
          borderRadius: 1.25,
          bgcolor: channelColor[c.primaryChannel],
          color: '#fff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}
      >
        {channelIcon[c.primaryChannel]}
      </Box>
      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Typography sx={{ fontSize: 13, fontWeight: 800 }} noWrap>
          {c.name}
        </Typography>
        <Stack direction="row" sx={{ alignItems: 'center', gap: 0.75, mt: 0.25 }}>
          <Box
            sx={{
              fontSize: 9,
              fontWeight: 800,
              letterSpacing: 0.4,
              textTransform: 'uppercase',
              px: 0.75,
              py: 0.25,
              borderRadius: 999,
              bgcolor: `${statusColor[c.status]}1F`,
              color: statusColor[c.status],
            }}
          >
            {c.status}
          </Box>
          <Typography sx={{ fontSize: 10.5, color: 'text.disabled' }}>
            {c.segment.name} · {summary.openRate}% open
          </Typography>
        </Stack>
      </Box>
      <Box sx={{ textAlign: 'right', flexShrink: 0 }}>
        <Typography sx={{ fontSize: 13, fontWeight: 800, color: '#22C55E' }}>
          {c.metrics.conversions}
        </Typography>
        <Typography
          sx={{ fontSize: 9.5, fontWeight: 800, letterSpacing: 0.4, color: 'text.disabled' }}
        >
          CONV
        </Typography>
      </Box>
    </Stack>
  );
}

function SegmentPerf({ name, size, conv }: { name: string; size: number; conv: number }) {
  const pct = Math.round((conv / Math.max(size, 1)) * 100);
  return (
    <Box>
      <Stack direction="row" sx={{ alignItems: 'center', mb: 0.625 }}>
        <Typography sx={{ fontSize: 13, fontWeight: 700, flex: 1 }}>{name}</Typography>
        <Typography sx={{ fontSize: 11, color: 'text.disabled', mr: 1 }}>
          {conv}/{size}
        </Typography>
        <Typography sx={{ fontSize: 12, fontWeight: 800, color: '#E54E8A' }}>{pct}%</Typography>
      </Stack>
      <LinearProgress
        variant="determinate"
        value={pct}
        sx={theme => ({
          height: 6,
          borderRadius: 999,
          bgcolor:
            theme.palette.mode === 'dark'
              ? 'rgba(255,255,255,0.06)'
              : 'rgba(11,15,26,0.06)',
          '& .MuiLinearProgress-bar': { borderRadius: 999, background: CAMPAIGN_GRADIENT },
        })}
      />
    </Box>
  );
}

export function DashboardTab() {
  const live = campaigns.filter(c => c.status === 'Live');
  const scheduled = campaigns.filter(c => c.status === 'Scheduled');
  const totalReach = campaigns.reduce((a, b) => a + b.metrics.reach, 0);
  const totalOpens = campaigns.reduce((a, b) => a + b.metrics.opens, 0);
  const totalClicks = campaigns.reduce((a, b) => a + b.metrics.clicks, 0);
  const totalConv = campaigns.reduce((a, b) => a + b.metrics.conversions, 0);
  const totalRev = campaigns.reduce((a, b) => a + b.metrics.revenue, 0);
  const totalSpend = campaigns.reduce((a, b) => a + b.metrics.spend, 0);
  const roi = totalSpend > 0 ? (totalRev / totalSpend).toFixed(1) : '—';

  const segmentPerf = [
    { name: 'VIP loyal', size: 248, conv: 31 },
    { name: 'Lapsed shoppers', size: 612, conv: 42 },
    { name: 'Birthday', size: 87, conv: 8 },
    { name: 'Cart abandoners', size: 96, conv: 14 },
  ];

  return (
    <Stack spacing={1.5}>
      {/* Hero */}
      <Box
        sx={{
          position: 'relative',
          overflow: 'hidden',
          borderRadius: 2,
          p: 2.25,
          background: CAMPAIGN_GRADIENT,
          color: '#fff',
          boxShadow: '0 14px 32px rgba(229,78,138,0.32)',
        }}
      >
        <Box
          aria-hidden
          sx={{
            position: 'absolute',
            top: -50,
            right: -50,
            width: 160,
            height: 160,
            borderRadius: '50%',
            bgcolor: 'rgba(255,255,255,0.10)',
          }}
        />
        <Stack direction="row" sx={{ alignItems: 'center', gap: 1, mb: 1, position: 'relative' }}>
          <CampaignRoundedIcon sx={{ fontSize: 20 }} />
          <Typography sx={{ fontSize: 11, fontWeight: 800, letterSpacing: 0.5, textTransform: 'uppercase' }}>
            This week
          </Typography>
        </Stack>
        <Stack direction="row" sx={{ alignItems: 'baseline', gap: 1, position: 'relative' }}>
          <Typography sx={{ fontSize: 32, fontWeight: 800, lineHeight: 1, letterSpacing: -0.6 }}>
            {totalConv}
          </Typography>
          <Typography sx={{ fontSize: 13, opacity: 0.9 }}>conversions</Typography>
        </Stack>
        <Stack direction="row" sx={{ mt: 1.25, gap: 1.5, flexWrap: 'wrap', position: 'relative' }}>
          <Stack direction="row" sx={{ alignItems: 'center', gap: 0.5 }}>
            <Typography sx={{ fontSize: 11, opacity: 0.85, fontWeight: 700 }}>
              Reach
            </Typography>
            <Typography sx={{ fontSize: 13, fontWeight: 800 }}>
              {totalReach.toLocaleString()}
            </Typography>
          </Stack>
          <Stack direction="row" sx={{ alignItems: 'center', gap: 0.5 }}>
            <Typography sx={{ fontSize: 11, opacity: 0.85, fontWeight: 700 }}>
              Revenue
            </Typography>
            <Typography sx={{ fontSize: 13, fontWeight: 800 }}>{formatInr(totalRev)}</Typography>
          </Stack>
          <Stack direction="row" sx={{ alignItems: 'center', gap: 0.5 }}>
            <Typography sx={{ fontSize: 11, opacity: 0.85, fontWeight: 700 }}>ROI</Typography>
            <Typography sx={{ fontSize: 13, fontWeight: 800 }}>{roi}x</Typography>
          </Stack>
        </Stack>
      </Box>

      {/* KPI grid */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: 1.25,
        }}
      >
        <KpiTile
          label="Live campaigns"
          value={String(live.length)}
          sub={`${scheduled.length} scheduled`}
          icon={<CampaignRoundedIcon sx={{ fontSize: 16 }} />}
          accent={CAMPAIGN_GRADIENT}
        />
        <KpiTile
          label="Open rate"
          value={`${Math.round((totalOpens / Math.max(totalReach, 1)) * 100)}%`}
          sub={`${totalOpens.toLocaleString()} opens`}
          icon={<VisibilityRoundedIcon sx={{ fontSize: 16 }} />}
          accent="linear-gradient(135deg, #4E8CFF 0%, #2F6DF2 100%)"
        />
        <KpiTile
          label="Click rate"
          value={`${Math.round((totalClicks / Math.max(totalOpens, 1)) * 100)}%`}
          sub={`${totalClicks.toLocaleString()} clicks`}
          icon={<TouchAppRoundedIcon sx={{ fontSize: 16 }} />}
          accent="linear-gradient(135deg, #A855F7 0%, #7C3AED 100%)"
        />
        <KpiTile
          label="Spend"
          value={formatInr(totalSpend)}
          sub={`Budget left ${formatInr(40000 - totalSpend)}`}
          icon={<PaidRoundedIcon sx={{ fontSize: 16 }} />}
          accent="linear-gradient(135deg, #F59E0B 0%, #D97706 100%)"
        />
      </Box>

      {/* Active campaigns */}
      <GlassCard sx={{ p: 2 }}>
        <Stack direction="row" sx={{ alignItems: 'center', gap: 1, mb: 1.25 }}>
          <Box
            sx={{
              width: 28,
              height: 28,
              borderRadius: 1.5,
              background: CAMPAIGN_GRADIENT,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
            }}
          >
            <CampaignRoundedIcon sx={{ fontSize: 16 }} />
          </Box>
          <Typography sx={{ fontSize: 15, fontWeight: 700, flex: 1 }}>
            Active campaigns
          </Typography>
          <Typography sx={{ fontSize: 11, color: 'text.disabled' }}>
            {live.length} live
          </Typography>
        </Stack>
        <Stack spacing={1}>
          {live.map(c => (
            <ActiveCampaignRow key={c.id} c={c} />
          ))}
        </Stack>
      </GlassCard>

      {/* Segment performance */}
      <GlassCard sx={{ p: 2 }}>
        <Typography sx={{ fontSize: 15, fontWeight: 700, mb: 0.25 }}>
          Conversions by segment
        </Typography>
        <Typography sx={{ fontSize: 11.5, color: 'text.secondary', mb: 1.75 }}>
          Where reach turned into revenue
        </Typography>
        <Stack spacing={1.5}>
          {segmentPerf.map(s => (
            <SegmentPerf key={s.name} {...s} />
          ))}
        </Stack>
      </GlassCard>
    </Stack>
  );
}
