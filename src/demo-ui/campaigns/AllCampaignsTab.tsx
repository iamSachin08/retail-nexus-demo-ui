import { Box, Chip, InputBase, Stack, Typography, keyframes } from '@mui/material';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import SmsRoundedIcon from '@mui/icons-material/SmsRounded';
import NotificationsActiveRoundedIcon from '@mui/icons-material/NotificationsActiveRounded';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import BoltRoundedIcon from '@mui/icons-material/BoltRounded';
import ScheduleRoundedIcon from '@mui/icons-material/ScheduleRounded';
import HistoryRoundedIcon from '@mui/icons-material/HistoryRounded';
import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GlassCard } from '../components/GlassCard';
import {
  campaigns,
  channelColor,
  formatInr,
  statusColor,
  summarizeMetrics,
} from './mock';
import type { Campaign, CampaignStatus, Channel } from './mock';

type FilterId = 'All' | CampaignStatus;

const STATUS_FILTERS: FilterId[] = [
  'All',
  'Live',
  'Scheduled',
  'Draft',
  'Paused',
  'Ended',
];

const channelIcon: Record<Channel, React.ReactNode> = {
  WhatsApp: <WhatsAppIcon sx={{ fontSize: 12 }} />,
  SMS: <SmsRoundedIcon sx={{ fontSize: 12 }} />,
  Push: <NotificationsActiveRoundedIcon sx={{ fontSize: 12 }} />,
};

const pulse = keyframes`
  0% { transform: scale(1); opacity: 1; }
  70% { transform: scale(2.4); opacity: 0; }
  100% { transform: scale(2.4); opacity: 0; }
`;

function LiveDot() {
  return (
    <Box sx={{ position: 'relative', width: 8, height: 8, flexShrink: 0 }}>
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          borderRadius: '50%',
          bgcolor: '#22C55E',
          animation: `${pulse} 1.6s ease-out infinite`,
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          borderRadius: '50%',
          bgcolor: '#22C55E',
        }}
      />
    </Box>
  );
}

function CampaignRow({ c }: { c: Campaign }) {
  const navigate = useNavigate();
  const summary = summarizeMetrics(c.metrics);
  return (
    <Stack
      direction="row"
      onClick={() => navigate(`/demo/campaigns/${c.id}`)}
      sx={{
        alignItems: 'center',
        gap: 1.25,
        py: 1.25,
        cursor: 'pointer',
        '&:hover': { opacity: 0.85 },
      }}
    >
      <Box
        sx={{
          width: 40,
          height: 40,
          borderRadius: 1.5,
          bgcolor: channelColor[c.primaryChannel],
          color: '#fff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          boxShadow: `0 4px 10px ${channelColor[c.primaryChannel]}40`,
        }}
      >
        {channelIcon[c.primaryChannel] && (
          <Box sx={{ '& svg': { fontSize: 18 } }}>{channelIcon[c.primaryChannel]}</Box>
        )}
      </Box>

      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Stack direction="row" sx={{ alignItems: 'center', gap: 0.5, mb: 0.25 }}>
          {c.status === 'Live' && <LiveDot />}
          <Typography sx={{ fontSize: 13.5, fontWeight: 800, flex: 1 }} noWrap>
            {c.name}
          </Typography>
          {c.aiGenerated && (
            <AutoAwesomeIcon sx={{ fontSize: 12, color: '#7C5CFF' }} />
          )}
        </Stack>
        <Stack direction="row" sx={{ alignItems: 'center', gap: 0.75, flexWrap: 'wrap' }}>
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
          <Typography sx={{ fontSize: 11, color: 'text.disabled' }}>
            {c.segment.name}
          </Typography>
          <Typography sx={{ fontSize: 11, color: 'text.disabled' }}>·</Typography>
          <Typography sx={{ fontSize: 11, color: 'text.disabled' }}>{c.type}</Typography>
        </Stack>
      </Box>

      <Box sx={{ textAlign: 'right', flexShrink: 0 }}>
        {c.status === 'Live' || c.status === 'Ended' ? (
          <>
            <Typography sx={{ fontSize: 13, fontWeight: 800, color: '#22C55E' }}>
              {c.metrics.conversions}
            </Typography>
            <Typography
              sx={{ fontSize: 9.5, fontWeight: 800, color: 'text.disabled', letterSpacing: 0.4 }}
            >
              {summary.openRate}% OPEN
            </Typography>
          </>
        ) : c.status === 'Scheduled' ? (
          <>
            <Typography sx={{ fontSize: 11.5, fontWeight: 700, color: '#3B82F6' }}>
              {c.scheduledFor}
            </Typography>
            <Typography
              sx={{ fontSize: 9.5, fontWeight: 800, color: 'text.disabled', letterSpacing: 0.4 }}
            >
              {c.segment.size} REACH
            </Typography>
          </>
        ) : (
          <Typography
            sx={{ fontSize: 9.5, fontWeight: 800, color: 'text.disabled', letterSpacing: 0.4 }}
          >
            {c.segment.size} REACH
          </Typography>
        )}
      </Box>
      <ChevronRightRoundedIcon sx={{ color: 'text.disabled', fontSize: 18, flexShrink: 0 }} />
    </Stack>
  );
}

function SectionHeader({
  icon,
  label,
  count,
  accent,
}: {
  icon: React.ReactNode;
  label: string;
  count: number;
  accent: string;
}) {
  return (
    <Stack
      direction="row"
      sx={{ alignItems: 'center', gap: 0.75, px: 0.5, mb: 0.75 }}
    >
      <Box
        sx={{
          width: 22,
          height: 22,
          borderRadius: 0.75,
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
      <Typography
        sx={{
          fontSize: 11,
          fontWeight: 800,
          letterSpacing: 0.6,
          textTransform: 'uppercase',
          color: 'text.secondary',
        }}
      >
        {label}
      </Typography>
      <Box
        sx={{
          minWidth: 20,
          height: 18,
          px: 0.625,
          borderRadius: 999,
          bgcolor: 'rgba(11,15,26,0.06)',
          color: 'text.secondary',
          fontSize: 10,
          fontWeight: 800,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {count}
      </Box>
    </Stack>
  );
}

function CampaignList({ items }: { items: Campaign[] }) {
  if (items.length === 0) {
    return (
      <GlassCard sx={{ p: 2.5, textAlign: 'center' }}>
        <Typography sx={{ fontSize: 12.5, color: 'text.secondary' }}>
          Nothing here yet.
        </Typography>
      </GlassCard>
    );
  }
  return (
    <GlassCard sx={{ p: 1.5, py: 0.5 }}>
      <Stack divider={<Box sx={{ height: 1, background: 'divider' }} />}>
        {items.map(c => (
          <CampaignRow key={c.id} c={c} />
        ))}
      </Stack>
    </GlassCard>
  );
}

export function AllCampaignsTab() {
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<FilterId>('All');

  const filtered = useMemo(
    () =>
      campaigns.filter(c => {
        if (filter !== 'All' && c.status !== filter) return false;
        if (query) {
          const q = query.toLowerCase();
          if (
            !c.name.toLowerCase().includes(q) &&
            !c.type.toLowerCase().includes(q) &&
            !c.segment.name.toLowerCase().includes(q)
          )
            return false;
        }
        return true;
      }),
    [query, filter],
  );

  const live = filtered.filter(c => c.status === 'Live');
  const scheduled = filtered.filter(c => c.status === 'Scheduled' || c.status === 'Draft');
  const history = filtered.filter(c => c.status === 'Ended' || c.status === 'Paused');

  const totalRev = filtered
    .filter(c => c.status === 'Live' || c.status === 'Ended')
    .reduce((a, b) => a + b.metrics.revenue, 0);
  const liveConv = live.reduce((a, b) => a + b.metrics.conversions, 0);

  return (
    <Stack spacing={1.5}>
      <Stack
        direction="row"
        sx={{
          alignItems: 'center',
          px: 1.25,
          py: 0.75,
          borderRadius: 999,
          background: 'rgba(11,15,26,0.04)',
          border: '1px solid rgba(11,15,26,0.06)',
        }}
      >
        <SearchRoundedIcon sx={{ fontSize: 18, color: 'text.secondary' }} />
        <InputBase
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Search by campaign, type, segment…"
          sx={{ ml: 1, fontSize: 13, flex: 1 }}
        />
      </Stack>

      <Stack
        direction="row"
        sx={{
          gap: 0.75,
          overflowX: 'auto',
          pb: 0.5,
          '&::-webkit-scrollbar': { display: 'none' },
        }}
      >
        {STATUS_FILTERS.map(f => {
          const active = f === filter;
          return (
            <Chip
              key={f}
              label={f}
              size="small"
              onClick={() => setFilter(f)}
              sx={{
                height: 28,
                fontSize: 12,
                fontWeight: 700,
                px: 0.5,
                cursor: 'pointer',
                flexShrink: 0,
                background: active
                  ? 'linear-gradient(135deg, #FF6FA8 0%, #E54E8A 100%)'
                  : 'rgba(11,15,26,0.04)',
                color: active ? '#fff' : 'text.primary',
                border: '1px solid rgba(11,15,26,0.06)',
                '&:hover': {
                  background: active
                    ? 'linear-gradient(135deg, #FF6FA8 0%, #E54E8A 100%)'
                    : 'rgba(11,15,26,0.08)',
                },
              }}
            />
          );
        })}
      </Stack>

      {/* summary strip */}
      <Stack
        direction="row"
        sx={{
          alignItems: 'center',
          justifyContent: 'space-between',
          px: 0.5,
        }}
      >
        <Stack direction="row" sx={{ alignItems: 'center', gap: 1.25 }}>
          <Stack direction="row" sx={{ alignItems: 'center', gap: 0.5 }}>
            <LiveDot />
            <Typography sx={{ fontSize: 12, fontWeight: 800 }}>
              {live.length} live
            </Typography>
          </Stack>
          <Typography sx={{ fontSize: 11, color: 'text.disabled' }}>
            · {liveConv} conversions
          </Typography>
        </Stack>
        <Typography sx={{ fontSize: 11, color: 'text.disabled' }}>
          {formatInr(totalRev)} total revenue
        </Typography>
      </Stack>

      {filtered.length === 0 ? (
        <GlassCard sx={{ p: 4, textAlign: 'center' }}>
          <Typography sx={{ fontSize: 13, color: 'text.secondary' }}>
            No campaigns match these filters.
          </Typography>
        </GlassCard>
      ) : filter !== 'All' ? (
        // Single filtered view
        <CampaignList items={filtered} />
      ) : (
        <Stack spacing={2}>
          {live.length > 0 && (
            <Box>
              <SectionHeader
                icon={<BoltRoundedIcon sx={{ fontSize: 14 }} />}
                label="Live now"
                count={live.length}
                accent="linear-gradient(135deg, #22C55E 0%, #16A34A 100%)"
              />
              <CampaignList items={live} />
            </Box>
          )}

          {scheduled.length > 0 && (
            <Box>
              <SectionHeader
                icon={<ScheduleRoundedIcon sx={{ fontSize: 14 }} />}
                label="Scheduled & drafts"
                count={scheduled.length}
                accent="linear-gradient(135deg, #3B82F6 0%, #2F6DF2 100%)"
              />
              <CampaignList items={scheduled} />
            </Box>
          )}

          {history.length > 0 && (
            <Box>
              <SectionHeader
                icon={<HistoryRoundedIcon sx={{ fontSize: 14 }} />}
                label="Campaign history"
                count={history.length}
                accent="linear-gradient(135deg, #94A3B8 0%, #475569 100%)"
              />
              <CampaignList items={history} />
            </Box>
          )}
        </Stack>
      )}
    </Stack>
  );
}
