import { Box, Chip, LinearProgress, Stack, Typography } from '@mui/material';
import TrackChangesRoundedIcon from '@mui/icons-material/TrackChangesRounded';
import WarningAmberRoundedIcon from '@mui/icons-material/WarningAmberRounded';
import StarRoundedIcon from '@mui/icons-material/StarRounded';
import StarBorderRoundedIcon from '@mui/icons-material/StarBorderRounded';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import SentimentVeryDissatisfiedRoundedIcon from '@mui/icons-material/SentimentVeryDissatisfiedRounded';
import SentimentSatisfiedAltRoundedIcon from '@mui/icons-material/SentimentSatisfiedAltRounded';
import { GlassCard } from '../../components/GlassCard';
import { tokens } from '../../theme/tokens';
import {
  customerReviewsNegative,
  customerReviewsPositive,
  ordersNeedAttention,
  targetPrediction,
} from '../../mock/data/salesOrders';
import type { InsightOrder, InsightReview } from '../../mock/data/salesOrders';

const formatINR = (n: number): string => {
  if (n >= 100000) return `₹${(n / 100000).toFixed(1)}L`;
  if (n >= 1000) return `₹${(n / 1000).toFixed(1)}K`;
  return `₹${n}`;
};

const urgencyColor: Record<NonNullable<InsightOrder['urgency']>, string> = {
  high: '#EF4444',
  medium: '#F59E0B',
  low: '#3B82F6',
};

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

/** Target achievement card with progress + tiny hourly chart + AI suggestions. */
function TargetAchievement() {
  const t = targetPrediction;
  const w = 100;
  const h = 40;
  const maxRevenue = Math.max(...t.hourly.map(p => Math.max(p.revenue, p.target)));
  const stepX = w / (t.hourly.length - 1);
  const revPoints = t.hourly.map((p, i) => `${i * stepX},${h - (p.revenue / maxRevenue) * h}`).join(' ');
  const targPoints = t.hourly.map((p, i) => `${i * stepX},${h - (p.target / maxRevenue) * h}`).join(' ');

  return (
    <GlassCard sx={{ p: 2 }}>
      <CardHeader title="Target Achievement Prediction" icon={<TrackChangesRoundedIcon />} accent={tokens.gradient.sales} />
      <PromptStrip prompt="Forecast end-of-day revenue based on hourly run-rate, last week, and locality demand." />

      <Stack direction="row" sx={{ alignItems: 'baseline', gap: 1, mb: 1 }}>
        <Typography sx={{ fontSize: 26, fontWeight: 800 }}>{t.currentPct}%</Typography>
        <Typography sx={{ fontSize: 11, color: 'text.secondary' }}>of target by 5 PM</Typography>
      </Stack>
      <LinearProgress
        variant="determinate"
        value={t.currentPct}
        sx={{
          height: 6,
          borderRadius: 999,
          backgroundColor: 'rgba(11,15,26,0.06)',
          '& .MuiLinearProgress-bar': { background: tokens.gradient.sales, borderRadius: 999 },
          mb: 1,
        }}
      />
      <Box sx={{ mb: 1 }}>
        <svg viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" width="100%" height={70}>
          <polyline points={targPoints} fill="none" stroke="#7C5CFF" strokeWidth="1" strokeDasharray="2 2" />
          <polyline points={revPoints} fill="none" stroke="#22C55E" strokeWidth="1.5" />
        </svg>
      </Box>
      <Typography sx={{ fontSize: 12, color: 'text.secondary' }}>
        AI projected EOD revenue: <Box component="strong" sx={{ color: 'text.primary' }}>{formatINR(t.predictedEod)}</Box>
      </Typography>

      <Box sx={{ mt: 1.5, p: 1.25, borderRadius: 1.5, background: 'rgba(124,92,255,0.06)', border: '1px solid rgba(124,139,255,0.18)' }}>
        <Stack direction="row" sx={{ alignItems: 'center', gap: 0.75, mb: 0.5 }}>
          <AutoAwesomeIcon sx={{ fontSize: 13, color: '#7C5CFF' }} />
          <Typography sx={{ fontSize: 10.5, fontWeight: 800, letterSpacing: 0.4, color: '#7C5CFF' }}>
            HOW TO HIT TARGET
          </Typography>
        </Stack>
        <Stack spacing={0.5}>
          {t.suggestions.map((s, i) => (
            <Typography key={i} sx={{ fontSize: 12, color: 'text.primary' }}>
              · {s}
            </Typography>
          ))}
        </Stack>
      </Box>
    </GlassCard>
  );
}

function OrdersNeedAttention() {
  return (
    <GlassCard sx={{ p: 2 }}>
      <CardHeader
        title="Orders that need attention"
        icon={<WarningAmberRoundedIcon />}
        accent={tokens.gradient.risk}
        count={ordersNeedAttention.length}
      />
      <PromptStrip prompt="Orders blocked, delayed, or with payment pending. Resolve to keep customers happy." />
      <Stack divider={<Box sx={{ height: 1, background: 'divider' }} />}>
        {ordersNeedAttention.map(o => (
          <Stack
            key={o.orderId}
            direction="row"
            sx={{ alignItems: 'center', gap: 1, py: 1.25 }}
          >
            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Stack direction="row" sx={{ alignItems: 'center', gap: 0.75, mb: 0.25 }}>
                <Typography sx={{ fontSize: 13, fontWeight: 700 }}>{o.customer}</Typography>
                <Typography sx={{ fontSize: 10.5, color: 'text.disabled', fontFamily: 'monospace' }}>
                  {o.orderId}
                </Typography>
              </Stack>
              <Typography sx={{ fontSize: 11.5, color: 'text.secondary' }}>{o.reason}</Typography>
            </Box>
            <Chip
              size="small"
              label={o.urgency.toUpperCase()}
              sx={{
                height: 18,
                fontSize: 9,
                fontWeight: 800,
                letterSpacing: 0.5,
                background: urgencyColor[o.urgency],
                color: '#fff',
                '& .MuiChip-label': { px: 0.75 },
              }}
            />
          </Stack>
        ))}
      </Stack>
    </GlassCard>
  );
}

function StarRating({ rating }: { rating: number }) {
  return (
    <Stack direction="row" sx={{ alignItems: 'center', gap: 0.125 }}>
      {[1, 2, 3, 4, 5].map(i =>
        i <= rating ? (
          <StarRoundedIcon key={i} sx={{ fontSize: 14, color: '#F59E0B' }} />
        ) : (
          <StarBorderRoundedIcon key={i} sx={{ fontSize: 14, color: 'text.disabled' }} />
        ),
      )}
    </Stack>
  );
}

function ReviewsCard({
  title,
  tone,
  icon,
  prompt,
  reviews,
}: {
  title: string;
  tone: 'negative' | 'positive';
  icon: React.ReactNode;
  prompt: string;
  reviews: InsightReview[];
}) {
  const accent = tone === 'negative' ? tokens.gradient.risk : tokens.gradient.sales;
  return (
    <GlassCard sx={{ p: 2 }}>
      <CardHeader title={title} icon={icon} accent={accent} count={reviews.length} />
      <PromptStrip prompt={prompt} />
      <Stack divider={<Box sx={{ height: 1, background: 'divider' }} />}>
        {reviews.map((r, i) => (
          <Stack key={i} sx={{ py: 1.25, gap: 0.5 }}>
            <Stack direction="row" sx={{ alignItems: 'center', gap: 1, justifyContent: 'space-between' }}>
              <Stack direction="row" sx={{ alignItems: 'center', gap: 0.75 }}>
                <Typography sx={{ fontSize: 13, fontWeight: 700 }}>{r.customer}</Typography>
                <StarRating rating={r.rating} />
              </Stack>
              <Typography sx={{ fontSize: 10.5, color: 'text.disabled' }}>{r.age}</Typography>
            </Stack>
            <Typography sx={{ fontSize: 12.5, color: 'text.primary' }}>{r.text}</Typography>
            {r.product && (
              <Typography sx={{ fontSize: 10.5, color: 'text.secondary' }}>on {r.product}</Typography>
            )}
          </Stack>
        ))}
      </Stack>
    </GlassCard>
  );
}

export function InsightsTab() {
  return (
    <Stack spacing={1.5}>
      <TargetAchievement />
      <OrdersNeedAttention />
      <ReviewsCard
        title="Customer Reviews · needs follow-up"
        tone="negative"
        icon={<SentimentVeryDissatisfiedRoundedIcon />}
        prompt="Recent 1–3 star reviews. Resolve and ask for an updated review."
        reviews={customerReviewsNegative}
      />
      <ReviewsCard
        title="Customer Reviews · loyal advocates"
        tone="positive"
        icon={<SentimentSatisfiedAltRoundedIcon />}
        prompt="Happy customers worth re-engaging with referral or repeat offers."
        reviews={customerReviewsPositive}
      />
    </Stack>
  );
}
