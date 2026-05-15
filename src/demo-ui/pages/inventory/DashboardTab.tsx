import { Box, LinearProgress, Stack, Typography } from '@mui/material';
import { GlassCard } from '../../components/GlassCard';
import { tokens } from '../../theme/tokens';
import { inventoryDashboard } from '../../mock/data/inventoryDashboard';

const SectionLabel = ({ children }: { children: React.ReactNode }) => (
  <Typography sx={{ fontSize: 11, fontWeight: 800, letterSpacing: 0.6, textTransform: 'uppercase', color: 'text.secondary' }}>
    {children}
  </Typography>
);

function StockPercentageCard() {
  const { instock, total } = inventoryDashboard;
  const pct = Math.round((instock / total) * 100);
  return (
    <GlassCard sx={{ p: 2 }}>
      <SectionLabel>Instock vs Total SKUs</SectionLabel>
      <Stack direction="row" sx={{ alignItems: 'baseline', mt: 0.5, gap: 1 }}>
        <Typography sx={{ fontSize: 30, fontWeight: 800, letterSpacing: -0.5 }}>{pct}%</Typography>
        <Typography sx={{ fontSize: 13, color: 'text.secondary' }}>
          {instock} of {total} SKUs
        </Typography>
      </Stack>
      <LinearProgress
        variant="determinate"
        value={pct}
        sx={{
          mt: 1,
          height: 6,
          borderRadius: 999,
          backgroundColor: 'rgba(11,15,26,0.06)',
          '& .MuiLinearProgress-bar': { background: tokens.gradient.sales, borderRadius: 999 },
        }}
      />
    </GlassCard>
  );
}

function StatusCard({ count, label, tone }: { count: number; label: string; tone: 'warning' | 'critical' }) {
  const color = tone === 'critical' ? '#EF4444' : '#F59E0B';
  return (
    <GlassCard sx={{ p: 2 }}>
      <SectionLabel>{label}</SectionLabel>
      <Stack direction="row" sx={{ alignItems: 'baseline', mt: 0.5, gap: 1 }}>
        <Typography sx={{ fontSize: 30, fontWeight: 800, color, letterSpacing: -0.5 }}>{count}</Typography>
        <Typography sx={{ fontSize: 12, color: 'text.secondary' }}>SKUs</Typography>
      </Stack>
      <Typography sx={{ fontSize: 11, color: 'text.secondary', mt: 0.5 }}>
        {tone === 'critical' ? 'Sales blocked — restock now' : 'Sells out in <2 days'}
      </Typography>
    </GlassCard>
  );
}

/** Simple 4-week comparison chart drawn in SVG. */
function ThirtyDayChart() {
  const { last30Days } = inventoryDashboard;
  const w = 100;
  const h = 60;
  const maxOrders = Math.max(...last30Days.map(d => d.orders));
  const maxStock = Math.max(...last30Days.map(d => d.lowStock + d.oos));
  const stepX = w / (last30Days.length - 1);

  const ordersPoints = last30Days.map((d, i) => `${i * stepX},${h - (d.orders / maxOrders) * h}`).join(' ');
  const leadsPoints = last30Days.map((d, i) => `${i * stepX},${h - (d.leads / maxOrders) * h}`).join(' ');

  return (
    <GlassCard sx={{ p: 2 }}>
      <SectionLabel>Low / Out of Stock vs Orders & Leads · 30d</SectionLabel>
      <Box sx={{ mt: 1, position: 'relative' }}>
        <svg viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" width="100%" height={120}>
          <defs>
            <linearGradient id="ord-grad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#3B82F6" stopOpacity="0" />
            </linearGradient>
          </defs>
          <polygon points={`0,${h} ${ordersPoints} ${w},${h}`} fill="url(#ord-grad)" />
          <polyline points={ordersPoints} fill="none" stroke="#3B82F6" strokeWidth="1.5" strokeLinejoin="round" />
          <polyline points={leadsPoints} fill="none" stroke="#FB923C" strokeWidth="1.5" strokeDasharray="2 2" strokeLinejoin="round" />
        </svg>
      </Box>
      <Stack direction="row" sx={{ gap: 2, mt: 1, flexWrap: 'wrap' }}>
        <LegendDot color="#3B82F6" label="Orders" />
        <LegendDot color="#FB923C" label="Leads" />
        <Stack direction="row" sx={{ alignItems: 'center', gap: 0.5, ml: 'auto' }}>
          <Typography sx={{ fontSize: 11, color: 'text.secondary' }}>Peak stock-out:</Typography>
          <Typography sx={{ fontSize: 11, fontWeight: 700, color: '#EF4444' }}>{maxStock}</Typography>
        </Stack>
      </Stack>
    </GlassCard>
  );
}

function LegendDot({ color, label }: { color: string; label: string }) {
  return (
    <Stack direction="row" sx={{ alignItems: 'center', gap: 0.5 }}>
      <Box sx={{ width: 8, height: 8, borderRadius: '50%', background: color }} />
      <Typography sx={{ fontSize: 11, color: 'text.secondary' }}>{label}</Typography>
    </Stack>
  );
}

function StockListCard({
  title,
  items,
  accent,
}: {
  title: string;
  items: { name: string; value: number; max: number }[];
  accent: string;
}) {
  return (
    <GlassCard sx={{ p: 2 }}>
      <SectionLabel>{title}</SectionLabel>
      <Stack spacing={1.25} sx={{ mt: 1.25 }}>
        {items.map(item => {
          const pct = Math.round((item.value / item.max) * 100);
          return (
            <Box key={item.name}>
              <Stack direction="row" sx={{ justifyContent: 'space-between', mb: 0.5 }}>
                <Typography sx={{ fontSize: 13, fontWeight: 600 }}>{item.name}</Typography>
                <Typography sx={{ fontSize: 12, color: 'text.secondary' }}>
                  {item.value}
                  <Box component="span" sx={{ color: 'text.disabled' }}> / {item.max}</Box>
                </Typography>
              </Stack>
              <LinearProgress
                variant="determinate"
                value={pct}
                sx={{
                  height: 5,
                  borderRadius: 999,
                  backgroundColor: 'rgba(11,15,26,0.06)',
                  '& .MuiLinearProgress-bar': { background: accent, borderRadius: 999 },
                }}
              />
            </Box>
          );
        })}
      </Stack>
    </GlassCard>
  );
}

export function DashboardTab() {
  return (
    <Stack spacing={1.5}>
      <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1.5 }}>
        <StockPercentageCard />
        <Stack spacing={1.5}>
          <StatusCard count={inventoryDashboard.lowStock} label="Low Stock" tone="warning" />
          <StatusCard count={inventoryDashboard.outOfStock} label="Out of Stock" tone="critical" />
        </Stack>
      </Box>
      <ThirtyDayChart />
      <StockListCard title="Top Selling Categories" items={inventoryDashboard.categories} accent={tokens.gradient.inventory} />
      <StockListCard title="Top Selling Brands" items={inventoryDashboard.brands} accent={tokens.gradient.tasks} />
    </Stack>
  );
}
