import { Box, LinearProgress, Stack, Typography } from '@mui/material';
import BoltRoundedIcon from '@mui/icons-material/BoltRounded';
import type { EChartsOption } from 'echarts';
import { EChart } from '../../components/EChart';
import { GlassCard } from '../../components/GlassCard';
import { tokens } from '../../theme/tokens';
import { inventoryDashboard } from '../../mock/data/inventoryDashboard';

const COLOR_INSTOCK = '#22C55E';
const COLOR_LOW = '#F59E0B';
const COLOR_OOS = '#EF4444';

const SectionLabel = ({ children }: { children: React.ReactNode }) => (
  <Typography
    sx={{
      fontSize: 11,
      fontWeight: 800,
      letterSpacing: 0.6,
      textTransform: 'uppercase',
      color: 'text.secondary',
    }}
  >
    {children}
  </Typography>
);

const formatINR = (n: number): string => {
  if (n >= 10000000) return `₹${(n / 10000000).toFixed(1)}Cr`;
  if (n >= 100000) return `₹${(n / 100000).toFixed(1)}L`;
  if (n >= 1000) return `₹${(n / 1000).toFixed(1)}K`;
  return `₹${n}`;
};

const formatNum = (n: number): string => n.toLocaleString('en-IN');

/* ─── Last Updated  ───────────────────────────────────── */
function LastUpdated() {
  return (
    <Typography
      sx={{
        fontSize: 10.5,
        fontWeight: 700,
        letterSpacing: 0.6,
        textTransform: 'uppercase',
        color: 'text.secondary',
        px: 0.5,
      }}
    >
      Last updated: Just now
    </Typography>
  );
}

/* ─── Instock vs Total SKUs — donut + breakdown ───────── */
function InstockDonutCard() {
  const { instock, total, lowStock, outOfStock } = inventoryDashboard;
  const pct = Math.round((instock / total) * 100);

  const option: EChartsOption = {
    series: [
      {
        type: 'pie',
        radius: ['72%', '92%'],
        center: ['50%', '50%'],
        avoidLabelOverlap: false,
        startAngle: 90,
        label: { show: false },
        labelLine: { show: false },
        emphasis: { scale: false },
        data: [
          {
            value: instock,
            name: 'In stock',
            itemStyle: { color: COLOR_INSTOCK, borderRadius: 8 },
          },
          {
            value: total - instock,
            name: 'Other',
            itemStyle: { color: 'rgba(255,255,255,0.08)' },
          },
        ],
        animationDuration: 900,
        animationEasing: 'cubicOut',
      },
    ],
  };

  return (
    <GlassCard sx={{ p: 2.25 }}>
      <Stack direction="row" sx={{ alignItems: 'baseline', justifyContent: 'space-between' }}>
        <Typography sx={{ fontSize: 15, fontWeight: 800 }}>Instock vs Total SKUs</Typography>
        <Typography sx={{ fontSize: 12, fontWeight: 700, color: 'text.secondary' }}>
          <Box component="span" sx={{ color: 'text.primary' }}>{formatNum(total)}</Box> SKUs
        </Typography>
      </Stack>

      <Box sx={{ position: 'relative', height: 180, mt: 0.5 }}>
        <EChart option={option} height={180} />
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            pointerEvents: 'none',
          }}
        >
          <Stack direction="row" sx={{ alignItems: 'baseline', gap: 0.25 }}>
            <Typography sx={{ fontSize: 30, fontWeight: 800, letterSpacing: -0.6 }}>
              {pct}
            </Typography>
            <Typography sx={{ fontSize: 16, fontWeight: 700, color: 'text.secondary' }}>%</Typography>
          </Stack>
          <Typography
            sx={{
              fontSize: 10,
              fontWeight: 800,
              letterSpacing: 0.8,
              textTransform: 'uppercase',
              color: 'text.secondary',
              mt: 0.25,
            }}
          >
            In stock
          </Typography>
        </Box>
      </Box>

      <Stack
        direction="row"
        sx={{ justifyContent: 'space-around', mt: 1.5, pt: 1.5, borderTop: '1px solid rgba(255,255,255,0.06)' }}
      >
        <BreakdownStat color={COLOR_INSTOCK} value={formatNum(instock)} label="In Stock" />
        <BreakdownStat color={COLOR_LOW} value={formatNum(lowStock)} label="Low Stock" />
        <BreakdownStat color={COLOR_OOS} value={formatNum(outOfStock)} label="Out of Stock" />
      </Stack>
    </GlassCard>
  );
}

function BreakdownStat({ color, value, label }: { color: string; value: string; label: string }) {
  return (
    <Stack sx={{ alignItems: 'center', gap: 0.25 }}>
      <Box sx={{ width: 6, height: 6, borderRadius: '50%', background: color, mb: 0.25 }} />
      <Typography sx={{ fontSize: 19, fontWeight: 800, letterSpacing: -0.3 }}>{value}</Typography>
      <Typography
        sx={{
          fontSize: 10,
          fontWeight: 700,
          letterSpacing: 0.6,
          textTransform: 'uppercase',
          color: 'text.secondary',
        }}
      >
        {label}
      </Typography>
    </Stack>
  );
}

/* ─── Low / Out Status cards (Bolt icon style) ────────── */
function StatusCard({
  count,
  label,
  tone,
  caption,
}: {
  count: number;
  label: string;
  tone: 'warning' | 'critical';
  caption: string;
}) {
  const color = tone === 'critical' ? COLOR_OOS : COLOR_LOW;
  return (
    <GlassCard sx={{ p: 2 }}>
      <Stack direction="row" sx={{ alignItems: 'flex-start', justifyContent: 'space-between', mb: 1.5 }}>
        <SectionLabel>{label}</SectionLabel>
        <Box
          sx={{
            width: 26,
            height: 26,
            borderRadius: 1.5,
            background: `${color}22`,
            color,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <BoltRoundedIcon sx={{ fontSize: 16 }} />
        </Box>
      </Stack>
      <Typography sx={{ fontSize: 36, fontWeight: 800, color, letterSpacing: -0.6, lineHeight: 1 }}>
        {formatNum(count)}
      </Typography>
      <Typography
        sx={{
          fontSize: 10.5,
          fontWeight: 700,
          letterSpacing: 0.6,
          textTransform: 'uppercase',
          color: 'text.secondary',
          mt: 1,
        }}
      >
        {caption}
      </Typography>
    </GlassCard>
  );
}

/* ─── 30-day Low/Out vs Orders & Leads combo chart ────── */
function ThirtyDayChart() {
  const { last30Days } = inventoryDashboard;
  const days = last30Days.map(d => d.day);
  const orders = last30Days.map(d => d.orders);
  const leads = last30Days.map(d => d.leads);
  const lowOut = last30Days.map(d => d.lowStock + d.oos);

  const option: EChartsOption = {
    tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
    legend: { show: false },
    grid: { left: 4, right: 8, top: 18, bottom: 22, containLabel: true },
    xAxis: {
      type: 'category',
      data: days,
      boundaryGap: true,
      axisLabel: { fontSize: 10.5, fontWeight: 600 },
    },
    yAxis: [
      { type: 'value', splitNumber: 3, axisLabel: { fontSize: 10 } },
      { type: 'value', splitNumber: 3, axisLabel: { show: false }, splitLine: { show: false } },
    ],
    series: [
      {
        name: 'Low / Out',
        type: 'bar',
        data: lowOut,
        barWidth: '40%',
        itemStyle: {
          color: {
            type: 'linear',
            x: 0, y: 0, x2: 0, y2: 1,
            colorStops: [
              { offset: 0, color: '#FB923C' },
              { offset: 1, color: '#EF4444' },
            ],
          },
          borderRadius: [4, 4, 0, 0],
        },
        animationDuration: 900,
        animationEasing: 'cubicOut',
      },
      {
        name: 'Orders',
        type: 'line',
        yAxisIndex: 1,
        data: orders,
        smooth: true,
        showSymbol: false,
        lineStyle: { color: '#3B82F6', width: 2 },
        itemStyle: { color: '#3B82F6' },
        animationDuration: 900,
        animationDelay: 200,
      },
      {
        name: 'Leads',
        type: 'line',
        yAxisIndex: 1,
        data: leads,
        smooth: true,
        showSymbol: false,
        lineStyle: { color: '#A78BFA', width: 2, type: 'dashed' },
        itemStyle: { color: '#A78BFA' },
        animationDuration: 900,
        animationDelay: 400,
      },
    ],
  };

  return (
    <GlassCard sx={{ p: 2 }}>
      <Typography sx={{ fontSize: 15, fontWeight: 800, lineHeight: 1.3 }}>
        Low / Out of Stock{' '}
        <Box component="span" sx={{ color: 'text.secondary', fontWeight: 700 }}>
          vs Orders & Leads
        </Box>
      </Typography>
      <Typography
        sx={{
          fontSize: 10.5,
          fontWeight: 700,
          letterSpacing: 0.6,
          textTransform: 'uppercase',
          color: 'text.secondary',
          mt: 0.25,
        }}
      >
        Last 30 days
      </Typography>
      <Stack direction="row" sx={{ gap: 1.5, mt: 1.25, flexWrap: 'wrap' }}>
        <LegendChip color="#EF4444" label="Low / Out" />
        <LegendChip color="#3B82F6" label="Orders & Leads" />
      </Stack>
      <Box sx={{ mt: 1, mx: -1 }}>
        <EChart option={option} height={180} />
      </Box>
    </GlassCard>
  );
}

function LegendChip({ color, label }: { color: string; label: string }) {
  return (
    <Stack
      direction="row"
      sx={{
        alignItems: 'center',
        gap: 0.5,
        px: 0.875,
        py: 0.375,
        borderRadius: 1,
        background: 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(255,255,255,0.08)',
      }}
    >
      <Box sx={{ width: 10, height: 10, borderRadius: 0.5, background: color }} />
      <Typography sx={{ fontSize: 11, fontWeight: 700, color: 'text.secondary' }}>{label}</Typography>
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
  const { lowStock, outOfStock, lowStockExposure, ordersLost } = inventoryDashboard;
  return (
    <Stack spacing={1.5}>
      <LastUpdated />
      <InstockDonutCard />
      <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1.5 }}>
        <StatusCard
          count={lowStock}
          label="Low Stock"
          tone="warning"
          caption={`${formatINR(lowStockExposure)} Exposure`}
        />
        <StatusCard
          count={outOfStock}
          label="Out of Stock"
          tone="critical"
          caption={`${ordersLost} Orders Lost`}
        />
      </Box>
      <ThirtyDayChart />
      <StockListCard
        title="Top Selling Categories"
        items={inventoryDashboard.categories}
        accent={tokens.gradient.inventory}
      />
      <StockListCard
        title="Top Selling Brands"
        items={inventoryDashboard.brands}
        accent={tokens.gradient.tasks}
      />
    </Stack>
  );
}
