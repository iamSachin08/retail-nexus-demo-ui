import { Box, Chip, LinearProgress, Stack, Typography } from '@mui/material';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import TrendingUpRoundedIcon from '@mui/icons-material/TrendingUpRounded';
import InsightsRoundedIcon from '@mui/icons-material/InsightsRounded';
import LocalFireDepartmentRoundedIcon from '@mui/icons-material/LocalFireDepartmentRounded';
import RocketLaunchRoundedIcon from '@mui/icons-material/RocketLaunchRounded';
import { GlassCard } from '../components/GlassCard';
import { tokens } from '../theme/tokens';
import {
  aiSuggestions,
  channelColor,
  channelMix,
  formatInr,
  last14Days,
} from './mock';

const CAMPAIGN_GRADIENT = 'linear-gradient(135deg, #FF6FA8 0%, #E54E8A 100%)';

function PromptStrip({ prompt }: { prompt: string }) {
  return (
    <Stack
      direction="row"
      sx={{
        alignItems: 'center',
        gap: 0.75,
        py: 0.875,
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

function AiSuggestions({ onLaunch }: { onLaunch: () => void }) {
  return (
    <GlassCard sx={{ p: 2 }}>
      <CardHeader
        title="AI suggested campaigns"
        icon={<AutoAwesomeIcon />}
        accent={tokens.gradient.aiAurora}
        count={aiSuggestions.length}
      />
      <PromptStrip prompt="Generated from your customers, journey gaps and last 14 days of performance." />
      <Stack spacing={1.25}>
        {aiSuggestions.map(s => (
          <Box
            key={s.id}
            sx={theme => ({
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
            <Stack direction="row" sx={{ alignItems: 'center', justifyContent: 'space-between', mb: 0.5 }}>
              <Typography sx={{ fontSize: 13.5, fontWeight: 700, flex: 1, mr: 1 }}>
                {s.title}
              </Typography>
              <ConfidencePill level={s.confidence} />
            </Stack>
            <Typography sx={{ fontSize: 11.5, color: 'text.secondary', lineHeight: 1.5, mb: 1 }}>
              {s.body}
            </Typography>
            <Stack direction="row" sx={{ alignItems: 'center', gap: 1.5, flexWrap: 'wrap' }}>
              {typeof s.expectedReach === 'number' && (
                <Stack direction="row" sx={{ alignItems: 'center', gap: 0.5 }}>
                  <Typography sx={{ fontSize: 11, color: 'text.disabled', fontWeight: 700 }}>
                    REACH
                  </Typography>
                  <Typography sx={{ fontSize: 12, fontWeight: 800 }}>{s.expectedReach}</Typography>
                </Stack>
              )}
              {typeof s.expectedConversions === 'number' && (
                <Stack direction="row" sx={{ alignItems: 'center', gap: 0.5 }}>
                  <Typography sx={{ fontSize: 11, color: 'text.disabled', fontWeight: 700 }}>
                    EXP. CONV
                  </Typography>
                  <Typography sx={{ fontSize: 12, fontWeight: 800, color: '#22C55E' }}>
                    +{s.expectedConversions}
                  </Typography>
                </Stack>
              )}
              <Box sx={{ flex: 1 }} />
              <Stack
                direction="row"
                onClick={onLaunch}
                sx={{
                  alignItems: 'center',
                  gap: 0.5,
                  px: 1.25,
                  py: 0.5,
                  borderRadius: 999,
                  cursor: 'pointer',
                  background: CAMPAIGN_GRADIENT,
                  color: '#fff',
                  fontSize: 11.5,
                  fontWeight: 800,
                  boxShadow: '0 4px 10px rgba(229,78,138,0.32)',
                }}
              >
                <RocketLaunchRoundedIcon sx={{ fontSize: 13 }} />
                Launch
              </Stack>
            </Stack>
          </Box>
        ))}
      </Stack>
    </GlassCard>
  );
}

function PerformanceTrend() {
  const w = 100;
  const h = 40;
  const maxReach = Math.max(...last14Days.map(p => p.reach));
  const maxConv = Math.max(...last14Days.map(p => p.conversions));
  const stepX = w / (last14Days.length - 1);
  const reachPoints = last14Days
    .map((p, i) => `${i * stepX},${h - (p.reach / maxReach) * h}`)
    .join(' ');
  const convPoints = last14Days
    .map((p, i) => `${i * stepX},${h - (p.conversions / maxConv) * h}`)
    .join(' ');

  const totalReach = last14Days.reduce((a, b) => a + b.reach, 0);
  const totalConv = last14Days.reduce((a, b) => a + b.conversions, 0);
  const totalRev = last14Days.reduce((a, b) => a + b.revenue, 0);

  return (
    <GlassCard sx={{ p: 2 }}>
      <CardHeader
        title="14-day performance trend"
        icon={<TrendingUpRoundedIcon />}
        accent={CAMPAIGN_GRADIENT}
      />
      <PromptStrip prompt="Reach and conversions on every day where a campaign was live or auto-fired." />

      <Stack direction="row" sx={{ gap: 1.5, mb: 1.5 }}>
        <Box sx={{ flex: 1 }}>
          <Typography sx={{ fontSize: 10, fontWeight: 800, letterSpacing: 0.5, color: 'text.disabled' }}>
            REACH
          </Typography>
          <Typography sx={{ fontSize: 17, fontWeight: 800 }}>{totalReach.toLocaleString()}</Typography>
        </Box>
        <Box sx={{ flex: 1 }}>
          <Typography sx={{ fontSize: 10, fontWeight: 800, letterSpacing: 0.5, color: 'text.disabled' }}>
            CONVERSIONS
          </Typography>
          <Typography sx={{ fontSize: 17, fontWeight: 800, color: '#22C55E' }}>
            +{totalConv}
          </Typography>
        </Box>
        <Box sx={{ flex: 1 }}>
          <Typography sx={{ fontSize: 10, fontWeight: 800, letterSpacing: 0.5, color: 'text.disabled' }}>
            REVENUE
          </Typography>
          <Typography sx={{ fontSize: 17, fontWeight: 800 }}>{formatInr(totalRev)}</Typography>
        </Box>
      </Stack>

      <Box>
        <svg viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" width="100%" height={90}>
          <polyline points={reachPoints} fill="none" stroke="#E54E8A" strokeWidth="1.5" />
          <polyline
            points={convPoints}
            fill="none"
            stroke="#22C55E"
            strokeWidth="1.2"
            strokeDasharray="2 2"
          />
        </svg>
      </Box>
      <Stack direction="row" sx={{ gap: 1.5, mt: 1 }}>
        <Stack direction="row" sx={{ alignItems: 'center', gap: 0.5 }}>
          <Box sx={{ width: 10, height: 2, bgcolor: '#E54E8A', borderRadius: 1 }} />
          <Typography sx={{ fontSize: 10.5, color: 'text.secondary', fontWeight: 700 }}>
            Reach
          </Typography>
        </Stack>
        <Stack direction="row" sx={{ alignItems: 'center', gap: 0.5 }}>
          <Box
            sx={{
              width: 10,
              height: 2,
              borderTop: '2px dashed #22C55E',
              borderRadius: 1,
            }}
          />
          <Typography sx={{ fontSize: 10.5, color: 'text.secondary', fontWeight: 700 }}>
            Conversions
          </Typography>
        </Stack>
      </Stack>
    </GlassCard>
  );
}

function ChannelMixCard() {
  const total = channelMix.reduce((a, b) => a + b.reach, 0);
  return (
    <GlassCard sx={{ p: 2 }}>
      <CardHeader
        title="Channel mix"
        icon={<InsightsRoundedIcon />}
        accent="linear-gradient(135deg, #4E8CFF 0%, #2F6DF2 100%)"
      />
      <PromptStrip prompt="How your campaigns split across channels last 14 days." />
      <Stack spacing={1.25}>
        {channelMix.map(c => {
          const pct = Math.round((c.reach / total) * 100);
          return (
            <Box key={c.channel}>
              <Stack direction="row" sx={{ alignItems: 'center', mb: 0.5, gap: 1 }}>
                <Box
                  sx={{
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    bgcolor: channelColor[c.channel],
                    flexShrink: 0,
                  }}
                />
                <Typography sx={{ fontSize: 13, fontWeight: 700, flex: 1 }}>
                  {c.channel}
                </Typography>
                <Typography sx={{ fontSize: 11, color: 'text.disabled' }}>
                  {c.reach.toLocaleString()} reach · {c.conversions} conv
                </Typography>
                <Chip
                  label={`${pct}%`}
                  size="small"
                  sx={{
                    height: 22,
                    fontSize: 11,
                    fontWeight: 800,
                    bgcolor: `${channelColor[c.channel]}1F`,
                    color: channelColor[c.channel],
                    '& .MuiChip-label': { px: 1 },
                  }}
                />
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
                    bgcolor: channelColor[c.channel],
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

function HotMoments() {
  const items = [
    {
      title: 'WhatsApp open rate peaked at 7 PM',
      sub: 'Best time-of-day · last 14 days',
      tag: '+18% vs avg',
    },
    {
      title: 'Festival Big Bash needs 1 approval',
      sub: 'Scheduled May 20 · WhatsApp copy not signed off',
      tag: 'Action',
    },
    {
      title: 'Birthday journey saved ₹6.2k spend',
      sub: 'AI suppressed 23 duplicate sends',
      tag: 'AI saved',
    },
  ];
  return (
    <GlassCard sx={{ p: 2 }}>
      <CardHeader
        title="Hot moments"
        icon={<LocalFireDepartmentRoundedIcon />}
        accent="linear-gradient(135deg, #F59E0B 0%, #DC2626 100%)"
        count={items.length}
      />
      <Stack divider={<Box sx={{ height: 1, background: 'divider' }} />}>
        {items.map((it, i) => (
          <Stack
            key={i}
            direction="row"
            sx={{ alignItems: 'center', gap: 1, py: 1.25 }}
          >
            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Typography sx={{ fontSize: 13, fontWeight: 700 }}>{it.title}</Typography>
              <Typography sx={{ fontSize: 11.5, color: 'text.secondary' }}>{it.sub}</Typography>
            </Box>
            <Chip
              size="small"
              label={it.tag}
              sx={{
                height: 22,
                fontSize: 10.5,
                fontWeight: 800,
                bgcolor: 'rgba(245,158,11,0.16)',
                color: '#D97706',
                '& .MuiChip-label': { px: 0.875 },
              }}
            />
          </Stack>
        ))}
      </Stack>
    </GlassCard>
  );
}

export function InsightsTab({ onLaunch }: { onLaunch: () => void }) {
  return (
    <Stack spacing={1.5}>
      {/* Live campaign signal first — performance, channel mix, hot moments */}
      <PerformanceTrend />
      <HotMoments />
      <ChannelMixCard />
      {/* Suggested campaigns push to the bottom */}
      <AiSuggestions onLaunch={onLaunch} />
    </Stack>
  );
}
