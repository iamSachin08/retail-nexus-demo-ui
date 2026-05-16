import { useMemo } from 'react';
import {
  Box,
  Button,
  Chip,
  IconButton,
  LinearProgress,
  Stack,
  Typography,
} from '@mui/material';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import SmsRoundedIcon from '@mui/icons-material/SmsRounded';
import NotificationsActiveRoundedIcon from '@mui/icons-material/NotificationsActiveRounded';
import GroupsRoundedIcon from '@mui/icons-material/GroupsRounded';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import CampaignRoundedIcon from '@mui/icons-material/CampaignRounded';
import PauseCircleOutlineRoundedIcon from '@mui/icons-material/PauseCircleOutlineRounded';
import ContentCopyRoundedIcon from '@mui/icons-material/ContentCopyRounded';
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded';
import TouchAppRoundedIcon from '@mui/icons-material/TouchAppRounded';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import TimelineRoundedIcon from '@mui/icons-material/TimelineRounded';
import HistoryRoundedIcon from '@mui/icons-material/HistoryRounded';
import { useNavigate, useParams } from 'react-router-dom';
import { GlassCard } from '../components/GlassCard';
import {
  channelColor,
  formatInr,
  getCampaignById,
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

function PageHeader({
  onBack,
  title,
  status,
}: {
  onBack: () => void;
  title: string;
  status: string;
}) {
  return (
    <Stack direction="row" sx={{ alignItems: 'center', mb: 2.5, gap: 1.25 }}>
      <IconButton
        onClick={onBack}
        size="small"
        sx={theme => ({
          width: 36,
          height: 36,
          background:
            theme.palette.mode === 'dark'
              ? 'rgba(255,255,255,0.06)'
              : 'rgba(11,15,26,0.04)',
          border:
            theme.palette.mode === 'dark'
              ? '1px solid rgba(255,255,255,0.08)'
              : '1px solid rgba(11,15,26,0.06)',
          '&:hover': {
            background:
              theme.palette.mode === 'dark'
                ? 'rgba(255,255,255,0.10)'
                : 'rgba(11,15,26,0.08)',
          },
        })}
      >
        <ArrowBackRoundedIcon fontSize="small" />
      </IconButton>
      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Typography
          sx={{
            fontSize: 11,
            fontWeight: 800,
            letterSpacing: 0.6,
            textTransform: 'uppercase',
            color: 'text.secondary',
            lineHeight: 1,
            mb: 0.25,
          }}
        >
          Campaign · {status}
        </Typography>
        <Typography
          sx={{
            fontSize: 19,
            fontWeight: 800,
            letterSpacing: -0.3,
            lineHeight: 1.2,
            color: 'text.primary',
          }}
        >
          {title}
        </Typography>
      </Box>
    </Stack>
  );
}

function HeroCard({ c }: { c: Campaign }) {
  const summary = summarizeMetrics(c.metrics);
  return (
    <Box
      sx={{
        position: 'relative',
        overflow: 'hidden',
        borderRadius: 2,
        p: 2.5,
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
      <Box
        aria-hidden
        sx={{
          position: 'absolute',
          bottom: -40,
          left: -40,
          width: 140,
          height: 140,
          borderRadius: '50%',
          bgcolor: 'rgba(255,255,255,0.06)',
        }}
      />
      <Stack direction="row" sx={{ alignItems: 'center', gap: 1, mb: 1, position: 'relative' }}>
        <Box
          sx={{
            width: 30,
            height: 30,
            borderRadius: 1.25,
            bgcolor: 'rgba(255,255,255,0.22)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <CampaignRoundedIcon sx={{ fontSize: 17 }} />
        </Box>
        <Box
          sx={{
            fontSize: 10,
            fontWeight: 800,
            letterSpacing: 0.5,
            textTransform: 'uppercase',
            px: 0.875,
            py: 0.25,
            borderRadius: 999,
            bgcolor: 'rgba(255,255,255,0.22)',
          }}
        >
          {c.type}
        </Box>
        {c.aiGenerated && (
          <Box
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 0.25,
              fontSize: 10,
              fontWeight: 800,
              letterSpacing: 0.5,
              textTransform: 'uppercase',
              px: 0.875,
              py: 0.25,
              borderRadius: 999,
              bgcolor: 'rgba(255,255,255,0.22)',
            }}
          >
            <AutoAwesomeIcon sx={{ fontSize: 12 }} /> AI
          </Box>
        )}
      </Stack>
      <Typography sx={{ fontSize: 13.5, fontWeight: 700, opacity: 0.95, position: 'relative', mb: 1.5 }}>
        {c.goal}
      </Typography>

      <Stack direction="row" sx={{ gap: 2.25, position: 'relative', flexWrap: 'wrap' }}>
        <Box>
          <Typography sx={{ fontSize: 10, opacity: 0.85, fontWeight: 800, letterSpacing: 0.5 }}>
            REACH
          </Typography>
          <Typography sx={{ fontSize: 22, fontWeight: 800, lineHeight: 1.1 }}>
            {c.metrics.reach.toLocaleString()}
          </Typography>
        </Box>
        <Box>
          <Typography sx={{ fontSize: 10, opacity: 0.85, fontWeight: 800, letterSpacing: 0.5 }}>
            CONV
          </Typography>
          <Typography sx={{ fontSize: 22, fontWeight: 800, lineHeight: 1.1 }}>
            {c.metrics.conversions}
          </Typography>
        </Box>
        <Box>
          <Typography sx={{ fontSize: 10, opacity: 0.85, fontWeight: 800, letterSpacing: 0.5 }}>
            REVENUE
          </Typography>
          <Typography sx={{ fontSize: 22, fontWeight: 800, lineHeight: 1.1 }}>
            {formatInr(c.metrics.revenue)}
          </Typography>
        </Box>
        <Box>
          <Typography sx={{ fontSize: 10, opacity: 0.85, fontWeight: 800, letterSpacing: 0.5 }}>
            ROI
          </Typography>
          <Typography sx={{ fontSize: 22, fontWeight: 800, lineHeight: 1.1 }}>
            {summary.roi || 0}x
          </Typography>
        </Box>
      </Stack>

      <Stack direction="row" sx={{ mt: 2, gap: 1, position: 'relative' }}>
        {c.status === 'Live' ? (
          <>
            <Button
              fullWidth
              startIcon={<PauseCircleOutlineRoundedIcon />}
              sx={{
                bgcolor: '#fff',
                color: '#E54E8A',
                fontWeight: 800,
                fontSize: 13,
                textTransform: 'none',
                py: 1.125,
                borderRadius: 1.5,
                '&:hover': { bgcolor: 'rgba(255,255,255,0.92)' },
              }}
            >
              Pause
            </Button>
            <Button
              fullWidth
              startIcon={<ContentCopyRoundedIcon />}
              sx={{
                bgcolor: 'rgba(255,255,255,0.18)',
                color: '#fff',
                fontWeight: 800,
                fontSize: 13,
                textTransform: 'none',
                py: 1.125,
                borderRadius: 1.5,
                border: '1px solid rgba(255,255,255,0.4)',
                '&:hover': { bgcolor: 'rgba(255,255,255,0.26)' },
              }}
            >
              Duplicate
            </Button>
          </>
        ) : (
          <Button
            fullWidth
            sx={{
              bgcolor: '#fff',
              color: '#E54E8A',
              fontWeight: 800,
              fontSize: 13,
              textTransform: 'none',
              py: 1.125,
              borderRadius: 1.5,
              '&:hover': { bgcolor: 'rgba(255,255,255,0.92)' },
            }}
          >
            {c.status === 'Scheduled'
              ? 'Edit schedule'
              : c.status === 'Draft'
              ? 'Continue editing'
              : 'View summary'}
          </Button>
        )}
      </Stack>
    </Box>
  );
}

function FunnelCard({ c }: { c: Campaign }) {
  const s = summarizeMetrics(c.metrics);
  const stages = [
    { label: 'Sent', value: c.metrics.sent, pct: 100, color: '#94A3B8' },
    { label: 'Delivered', value: c.metrics.delivered, pct: s.deliveryRate, color: '#3B82F6' },
    {
      label: 'Opens',
      value: c.metrics.opens,
      pct: s.openRate,
      color: '#A855F7',
    },
    {
      label: 'Clicks',
      value: c.metrics.clicks,
      pct: c.metrics.delivered ? Math.round((c.metrics.clicks / c.metrics.delivered) * 100) : 0,
      color: '#22C55E',
    },
    {
      label: 'Conversions',
      value: c.metrics.conversions,
      pct: s.conversionRate,
      color: '#E54E8A',
    },
  ];
  return (
    <GlassCard sx={{ p: 2 }}>
      <Stack direction="row" sx={{ alignItems: 'center', gap: 1, mb: 1.5 }}>
        <Box
          sx={{
            width: 28,
            height: 28,
            borderRadius: 1.5,
            background: CAMPAIGN_GRADIENT,
            color: '#fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <TimelineRoundedIcon sx={{ fontSize: 16 }} />
        </Box>
        <Typography sx={{ fontSize: 15, fontWeight: 700, flex: 1 }}>
          Conversion funnel
        </Typography>
      </Stack>
      <Stack spacing={1.25}>
        {stages.map(s => (
          <Box key={s.label}>
            <Stack direction="row" sx={{ alignItems: 'center', mb: 0.5 }}>
              <Typography sx={{ fontSize: 12.5, fontWeight: 700, flex: 1 }}>
                {s.label}
              </Typography>
              <Typography sx={{ fontSize: 11.5, color: 'text.disabled', mr: 1 }}>
                {s.value.toLocaleString()}
              </Typography>
              <Typography sx={{ fontSize: 12, fontWeight: 800, color: s.color }}>
                {s.pct}%
              </Typography>
            </Stack>
            <LinearProgress
              variant="determinate"
              value={s.pct}
              sx={theme => ({
                height: 6,
                borderRadius: 999,
                bgcolor:
                  theme.palette.mode === 'dark'
                    ? 'rgba(255,255,255,0.06)'
                    : 'rgba(11,15,26,0.06)',
                '& .MuiLinearProgress-bar': { borderRadius: 999, bgcolor: s.color },
              })}
            />
          </Box>
        ))}
      </Stack>
    </GlassCard>
  );
}

function AudienceCard({ c }: { c: Campaign }) {
  return (
    <GlassCard sx={{ p: 2 }}>
      <Stack direction="row" sx={{ alignItems: 'center', gap: 1, mb: 1.25 }}>
        <Box
          sx={{
            width: 28,
            height: 28,
            borderRadius: 1.5,
            background: 'linear-gradient(135deg, #4E8CFF 0%, #2F6DF2 100%)',
            color: '#fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <GroupsRoundedIcon sx={{ fontSize: 16 }} />
        </Box>
        <Typography sx={{ fontSize: 15, fontWeight: 700, flex: 1 }}>Audience</Typography>
        <Typography sx={{ fontSize: 13, fontWeight: 800, color: '#E54E8A' }}>
          {c.segment.size}
        </Typography>
      </Stack>
      <Typography sx={{ fontSize: 13.5, fontWeight: 800, mb: 0.75 }}>
        {c.segment.name}
      </Typography>
      <Stack direction="row" sx={{ flexWrap: 'wrap', gap: 0.5 }}>
        {c.segment.tags.map(tag => (
          <Chip
            key={tag}
            label={tag}
            size="small"
            sx={theme => ({
              height: 22,
              fontSize: 10.5,
              fontWeight: 700,
              bgcolor:
                theme.palette.mode === 'dark'
                  ? 'rgba(255,255,255,0.06)'
                  : 'rgba(11,15,26,0.06)',
              color: 'text.secondary',
              '& .MuiChip-label': { px: 0.875 },
            })}
          />
        ))}
      </Stack>
    </GlassCard>
  );
}

function MessageCard({ c }: { c: Campaign }) {
  return (
    <GlassCard sx={{ p: 2 }}>
      <Stack direction="row" sx={{ alignItems: 'center', gap: 1, mb: 1.25 }}>
        <Box
          sx={{
            width: 28,
            height: 28,
            borderRadius: 1.5,
            background: 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)',
            color: '#fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <WhatsAppIcon sx={{ fontSize: 16 }} />
        </Box>
        <Typography sx={{ fontSize: 15, fontWeight: 700, flex: 1 }}>
          Message variants
        </Typography>
        <Typography sx={{ fontSize: 11, color: 'text.disabled' }}>
          {c.variants.length}
        </Typography>
      </Stack>
      <Stack spacing={1}>
        {c.variants.map(v => (
          <Box
            key={v.id}
            sx={{
              p: 1.5,
              borderRadius: 1.75,
              bgcolor: `${channelColor[v.channel]}0F`,
              border: `1px solid ${channelColor[v.channel]}28`,
            }}
          >
            <Stack direction="row" sx={{ alignItems: 'center', gap: 0.75, mb: 0.5 }}>
              <Box sx={{ color: channelColor[v.channel], display: 'flex' }}>
                {channelIcon[v.channel]}
              </Box>
              <Typography
                sx={{
                  fontSize: 10,
                  fontWeight: 800,
                  letterSpacing: 0.5,
                  color: channelColor[v.channel],
                }}
              >
                {v.channel.toUpperCase()}
              </Typography>
            </Stack>
            {v.subject && (
              <Typography sx={{ fontSize: 12, fontWeight: 800, mb: 0.5 }}>
                {v.subject}
              </Typography>
            )}
            <Typography
              sx={{ fontSize: 12.5, color: 'text.primary', lineHeight: 1.55 }}
            >
              {v.body}
            </Typography>
          </Box>
        ))}
      </Stack>
    </GlassCard>
  );
}

function TimelineCard({ c }: { c: Campaign }) {
  const iconFor = (type: string): React.ReactNode => {
    if (type === 'sent') return <CampaignRoundedIcon sx={{ fontSize: 14, color: '#fff' }} />;
    if (type === 'milestone') return <CheckCircleRoundedIcon sx={{ fontSize: 14, color: '#fff' }} />;
    if (type === 'paused') return <PauseCircleOutlineRoundedIcon sx={{ fontSize: 14, color: '#fff' }} />;
    if (type === 'system') return <AutoAwesomeIcon sx={{ fontSize: 14, color: '#fff' }} />;
    return <HistoryRoundedIcon sx={{ fontSize: 14, color: '#fff' }} />;
  };
  const bgFor = (type: string): string => {
    if (type === 'sent') return '#3B82F6';
    if (type === 'milestone') return '#22C55E';
    if (type === 'paused') return '#F59E0B';
    if (type === 'system') return '#7C5CFF';
    if (type === 'ended') return '#64748B';
    return '#94A3B8';
  };
  return (
    <GlassCard sx={{ p: 2 }}>
      <Stack direction="row" sx={{ alignItems: 'center', gap: 1, mb: 1.5 }}>
        <Box
          sx={{
            width: 28,
            height: 28,
            borderRadius: 1.5,
            background: 'linear-gradient(135deg, #94A3B8 0%, #475569 100%)',
            color: '#fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <HistoryRoundedIcon sx={{ fontSize: 16 }} />
        </Box>
        <Typography sx={{ fontSize: 15, fontWeight: 700 }}>Activity</Typography>
      </Stack>
      <Stack spacing={1.25}>
        {c.timeline.map(ev => (
          <Stack key={ev.id} direction="row" sx={{ alignItems: 'flex-start', gap: 1.25 }}>
            <Box
              sx={{
                width: 24,
                height: 24,
                borderRadius: '50%',
                bgcolor: bgFor(ev.type),
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                mt: 0.25,
              }}
            >
              {iconFor(ev.type)}
            </Box>
            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Typography sx={{ fontSize: 12.5, fontWeight: 700 }}>{ev.text}</Typography>
              <Typography sx={{ fontSize: 11, color: 'text.disabled' }}>{ev.at}</Typography>
            </Box>
          </Stack>
        ))}
      </Stack>
    </GlassCard>
  );
}

function ChannelStrip({ c }: { c: Campaign }) {
  return (
    <Stack direction="row" sx={{ gap: 0.75, flexWrap: 'wrap', mb: 0.5 }}>
      <Box
        sx={{
          fontSize: 10,
          fontWeight: 800,
          letterSpacing: 0.5,
          textTransform: 'uppercase',
          px: 0.875,
          py: 0.35,
          borderRadius: 999,
          bgcolor: `${statusColor[c.status]}1F`,
          color: statusColor[c.status],
          display: 'inline-flex',
          alignItems: 'center',
        }}
      >
        {c.status}
      </Box>
      {c.channels.map(ch => (
        <Box
          key={ch}
          sx={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 0.3,
            px: 0.875,
            py: 0.35,
            borderRadius: 999,
            bgcolor: `${channelColor[ch]}1F`,
            color: channelColor[ch],
            fontSize: 10.5,
            fontWeight: 800,
            letterSpacing: 0.3,
          }}
        >
          {channelIcon[ch]}
          {ch}
        </Box>
      ))}
      {c.startedAt && (
        <Typography sx={{ fontSize: 11, color: 'text.disabled', alignSelf: 'center' }}>
          Started · {c.startedAt}
        </Typography>
      )}
      {c.scheduledFor && (
        <Typography sx={{ fontSize: 11, color: '#3B82F6', alignSelf: 'center', fontWeight: 700 }}>
          Scheduled · {c.scheduledFor}
        </Typography>
      )}
    </Stack>
  );
}

function NotFoundState({ onBack }: { onBack: () => void }) {
  return (
    <Box sx={{ pb: 14 }}>
      <PageHeader onBack={onBack} title="Campaign not found" status="—" />
      <GlassCard sx={{ p: 3 }}>
        <Typography sx={{ fontSize: 13, color: 'text.secondary' }}>
          We couldn't load that campaign. Try going back to All campaigns.
        </Typography>
      </GlassCard>
    </Box>
  );
}

export function CampaignDetailPage() {
  const navigate = useNavigate();
  const { campaignId } = useParams<{ campaignId: string }>();
  const campaign = useMemo(
    () => (campaignId ? getCampaignById(campaignId) : null),
    [campaignId],
  );

  if (!campaign) {
    return <NotFoundState onBack={() => navigate(-1)} />;
  }

  const s = summarizeMetrics(campaign.metrics);

  return (
    <Box sx={{ pb: 14 }}>
      <PageHeader
        onBack={() => navigate(-1)}
        title={campaign.name}
        status={campaign.status}
      />
      <Stack spacing={2}>
        <ChannelStrip c={campaign} />
        <HeroCard c={campaign} />

        {/* Quick stats grid */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 1.25,
          }}
        >
          <GlassCard sx={{ p: 1.5 }}>
            <Stack direction="row" sx={{ alignItems: 'center', gap: 0.75, mb: 0.5 }}>
              <VisibilityRoundedIcon sx={{ fontSize: 14, color: '#A855F7' }} />
              <Typography
                sx={{ fontSize: 10, fontWeight: 800, letterSpacing: 0.4, color: 'text.disabled' }}
              >
                OPEN
              </Typography>
            </Stack>
            <Typography sx={{ fontSize: 17, fontWeight: 800, color: '#A855F7' }}>
              {s.openRate}%
            </Typography>
          </GlassCard>
          <GlassCard sx={{ p: 1.5 }}>
            <Stack direction="row" sx={{ alignItems: 'center', gap: 0.75, mb: 0.5 }}>
              <TouchAppRoundedIcon sx={{ fontSize: 14, color: '#22C55E' }} />
              <Typography
                sx={{ fontSize: 10, fontWeight: 800, letterSpacing: 0.4, color: 'text.disabled' }}
              >
                CLICK
              </Typography>
            </Stack>
            <Typography sx={{ fontSize: 17, fontWeight: 800, color: '#22C55E' }}>
              {s.clickRate}%
            </Typography>
          </GlassCard>
          <GlassCard sx={{ p: 1.5 }}>
            <Stack direction="row" sx={{ alignItems: 'center', gap: 0.75, mb: 0.5 }}>
              <CheckCircleRoundedIcon sx={{ fontSize: 14, color: '#E54E8A' }} />
              <Typography
                sx={{ fontSize: 10, fontWeight: 800, letterSpacing: 0.4, color: 'text.disabled' }}
              >
                CONV
              </Typography>
            </Stack>
            <Typography sx={{ fontSize: 17, fontWeight: 800, color: '#E54E8A' }}>
              {s.conversionRate}%
            </Typography>
          </GlassCard>
        </Box>

        <FunnelCard c={campaign} />
        <AudienceCard c={campaign} />
        <MessageCard c={campaign} />
        <TimelineCard c={campaign} />
      </Stack>
    </Box>
  );
}

export default CampaignDetailPage;
