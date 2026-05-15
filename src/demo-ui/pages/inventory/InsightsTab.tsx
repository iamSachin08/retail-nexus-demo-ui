import { Box, Stack, Typography } from '@mui/material';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import TrendingUpRoundedIcon from '@mui/icons-material/TrendingUpRounded';
import KeyboardReturnRoundedIcon from '@mui/icons-material/KeyboardReturnRounded';
import HourglassEmptyRoundedIcon from '@mui/icons-material/HourglassEmptyRounded';
import LocalFireDepartmentRoundedIcon from '@mui/icons-material/LocalFireDepartmentRounded';
import { GlassCard } from '../../components/GlassCard';
import { tokens } from '../../theme/tokens';
import type { InventoryInsight } from '../../mock/data/inventoryDashboard';
import {
  insightsBestSelling,
  insightsHighReturning,
  insightsSlowMoving,
  insightsInDemand,
} from '../../mock/data/inventoryDashboard';

const toneToColor = (tone?: InventoryInsight['tone']) => {
  switch (tone) {
    case 'positive':
      return '#22C55E';
    case 'warning':
      return '#F59E0B';
    case 'critical':
      return '#EF4444';
    case 'info':
      return '#3B82F6';
    default:
      return undefined;
  }
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
      <EditOutlinedIcon sx={{ fontSize: 14, color: 'text.disabled', cursor: 'pointer' }} />
    </Stack>
  );
}

function InsightCard({
  title,
  icon,
  accent,
  items,
  prompt,
}: {
  title: string;
  icon: React.ReactNode;
  accent: string;
  items: InventoryInsight[];
  prompt: string;
}) {
  return (
    <GlassCard sx={{ p: 2 }}>
      <Stack direction="row" sx={{ alignItems: 'center', mb: 1.25, gap: 1 }}>
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
      </Stack>
      <PromptStrip prompt={prompt} />
      <Stack divider={<Box sx={{ height: 1, background: 'divider' }} />}>
        {items.map(item => (
          <Stack
            key={item.name}
            direction="row"
            sx={{ alignItems: 'center', justifyContent: 'space-between', py: 1, gap: 1 }}
          >
            <Box sx={{ minWidth: 0 }}>
              <Typography sx={{ fontSize: 13.5, fontWeight: 600 }} noWrap>
                {item.name}
              </Typography>
              <Typography sx={{ fontSize: 11, color: 'text.secondary' }} noWrap>
                {item.meta}
              </Typography>
            </Box>
            <Typography
              sx={{
                fontSize: 12,
                fontWeight: 700,
                color: toneToColor(item.tone) ?? 'text.primary',
                flexShrink: 0,
              }}
            >
              {item.metric}
            </Typography>
          </Stack>
        ))}
      </Stack>
    </GlassCard>
  );
}

export function InsightsTab() {
  return (
    <Stack spacing={1.5}>
      <InsightCard
        title="Best Selling Products"
        icon={<TrendingUpRoundedIcon />}
        accent={tokens.gradient.sales}
        items={insightsBestSelling}
        prompt="Top 5 SKUs by units sold in the last 30 days. Used to plan restock priority."
      />
      <InsightCard
        title="High Returning Products"
        icon={<KeyboardReturnRoundedIcon />}
        accent={tokens.gradient.risk}
        items={insightsHighReturning}
        prompt="SKUs with return rate > 15% in last 60 days. Often a quality or sizing issue."
      />
      <InsightCard
        title="Slow Moving Inventory"
        icon={<HourglassEmptyRoundedIcon />}
        accent={tokens.gradient.sop}
        items={insightsSlowMoving}
        prompt="SKUs sitting > 45 days without a sale. Consider markdowns or transfers."
      />
      <InsightCard
        title="In-demand Products"
        icon={<LocalFireDepartmentRoundedIcon />}
        accent={tokens.gradient.leads}
        items={insightsInDemand}
        prompt="Trending search & inquiry growth. AI-suggested for next purchase cycle."
      />
    </Stack>
  );
}
