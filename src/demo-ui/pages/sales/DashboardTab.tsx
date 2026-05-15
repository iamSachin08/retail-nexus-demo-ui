import { Box, Stack, Typography, useTheme } from '@mui/material';
import TrendingUpRoundedIcon from '@mui/icons-material/TrendingUpRounded';
import TrendingDownRoundedIcon from '@mui/icons-material/TrendingDownRounded';
import type { EChartsOption } from 'echarts';
import { GlassCard } from '../../components/GlassCard';
import { EChart } from '../../components/EChart';
import { salesDashboard, orderSourceColor } from '../../mock/data/salesOrders';

const formatINR = (n: number): string => {
  if (n >= 10000000) return `₹${(n / 10000000).toFixed(1)}Cr`;
  if (n >= 100000) return `₹${(n / 100000).toFixed(1)}L`;
  if (n >= 1000) return `₹${(n / 1000).toFixed(1)}K`;
  return `₹${n}`;
};

/* Technical chart palette — sober/data-viz, no green dominance */
const C = {
  primary: '#3B82F6',     // blue — main metric
  primaryLite: '#60A5FA',
  secondary: '#7C5CFF',   // violet — secondary metric
  tertiary: '#06B6D4',    // cyan — accent
  accent: '#F59E0B',      // amber — rate/% metrics
  good: '#10B981',        // emerald — used only in tiny delta pills
  bad: '#EF4444',
  neutral: '#64748B',     // slate
  muted: '#94A3B8',
};

const SectionLabel = ({ children }: { children: React.ReactNode }) => (
  <Typography sx={{ fontSize: 11, fontWeight: 800, letterSpacing: 0.6, textTransform: 'uppercase', color: 'text.secondary' }}>
    {children}
  </Typography>
);

const DeltaPill = ({ value, suffix = '%' }: { value: number; suffix?: string }) => {
  const up = value >= 0;
  return (
    <Stack
      direction="row"
      sx={{
        alignItems: 'center',
        gap: 0.25,
        px: 0.75,
        py: 0.25,
        borderRadius: 999,
        background: up ? 'rgba(34,197,94,0.12)' : 'rgba(239,68,68,0.12)',
        color: up ? '#22C55E' : '#EF4444',
      }}
    >
      {up ? <TrendingUpRoundedIcon sx={{ fontSize: 13 }} /> : <TrendingDownRoundedIcon sx={{ fontSize: 13 }} />}
      <Typography sx={{ fontSize: 10.5, fontWeight: 800 }}>
        {up ? '+' : ''}
        {value}
        {suffix}
      </Typography>
    </Stack>
  );
};

function healthColor(score: number): string {
  if (score >= 85) return '#22C55E';
  if (score >= 70) return '#F59E0B';
  return '#EF4444';
}

/* ─── Actual vs Target — half-donut gauge ─────────────── */
function ActualVsTarget() {
  const { actualToday, targetToday } = salesDashboard;
  const pct = Math.round((actualToday / targetToday) * 100);

  const option: EChartsOption = {
    series: [
      {
        type: 'gauge',
        startAngle: 200,
        endAngle: -20,
        min: 0,
        max: 100,
        radius: '120%',
        center: ['50%', '78%'],
        progress: { show: true, width: 14, roundCap: true, itemStyle: { color: C.primary } },
        axisLine: {
          roundCap: true,
          lineStyle: { width: 14, color: [[1, 'rgba(11,15,26,0.08)']] },
        },
        pointer: { show: false },
        axisTick: { show: false },
        splitLine: { show: false },
        axisLabel: { show: false },
        anchor: { show: false },
        title: { show: false },
        detail: {
          valueAnimation: true,
          fontSize: 22,
          fontWeight: 800,
          color: 'inherit',
          offsetCenter: [0, '-10%'],
          formatter: (v: number): string => `${Math.round(v)}%`,
        },
        data: [{ value: pct }],
      },
    ],
  };

  return (
    <GlassCard sx={{ p: 2 }}>
      <SectionLabel>Actual vs Target</SectionLabel>
      <Stack direction="row" sx={{ alignItems: 'baseline', mt: 0.5, gap: 1 }}>
        <Typography sx={{ fontSize: 22, fontWeight: 800, letterSpacing: -0.4 }}>
          {formatINR(actualToday)}
        </Typography>
        <Typography sx={{ fontSize: 11, color: 'text.secondary' }}>
          / {formatINR(targetToday)}
        </Typography>
      </Stack>
      <Box sx={{ mt: 0.5, mx: -1 }}>
        <EChart option={option} height={130} />
      </Box>
      <Typography sx={{ fontSize: 11, color: 'text.secondary', textAlign: 'center', mt: -1 }}>
        of today's target
      </Typography>
    </GlassCard>
  );
}

/* ─── Total Orders ────────────────────────────────────── */
function TotalOrdersCard() {
  return (
    <GlassCard sx={{ p: 2 }}>
      <SectionLabel>Total Orders</SectionLabel>
      <Typography sx={{ fontSize: 26, fontWeight: 800, mt: 0.5 }}>{salesDashboard.totalOrders}</Typography>
      <Stack direction="row" sx={{ alignItems: 'center', gap: 0.5, mt: 0.5, color: 'text.secondary' }}>
        <TrendingUpRoundedIcon sx={{ fontSize: 14, color: C.good }} />
        <Typography sx={{ fontSize: 11.5, fontWeight: 700 }}>+12 vs yesterday</Typography>
      </Stack>
    </GlassCard>
  );
}

/* ─── Revenue vs Profit — combo bar + line + margin axis ──── */
function RevenueVsProfit() {
  const { revenueProfit } = salesDashboard;
  const days = revenueProfit.map(d => d.day);
  const revenue = revenueProfit.map(d => d.revenue);
  const profit = revenueProfit.map(d => d.profit);
  const margins = revenueProfit.map(d => Math.round((d.profit / d.revenue) * 100));

  const todayRev = revenue[revenue.length - 1];
  const todayProf = profit[profit.length - 1];
  const todayMargin = margins[margins.length - 1];
  const totalRev = revenue.reduce((a, b) => a + b, 0);
  const totalProf = profit.reduce((a, b) => a + b, 0);
  const avgMargin = Math.round((totalProf / totalRev) * 100);

  const option: EChartsOption = {
    legend: { show: false },
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'shadow' },
      formatter: (params) => {
        const arr = params as Array<{ axisValue: string; dataIndex: number }>;
        const i = arr[0].dataIndex;
        const rev = revenue[i];
        const prof = profit[i];
        const m = margins[i];
        return (
          `<div style="font-weight:700;margin-bottom:4px">${days[i]}</div>` +
          `<div style="display:flex;align-items:center;gap:6px"><span style="display:inline-block;width:8px;height:8px;border-radius:2px;background:${C.primary}"></span>Revenue&nbsp;<b>${formatINR(rev)}</b></div>` +
          `<div style="display:flex;align-items:center;gap:6px;margin-top:2px"><span style="display:inline-block;width:8px;height:8px;border-radius:50%;background:${C.secondary}"></span>Profit&nbsp;<b>${formatINR(prof)}</b></div>` +
          `<div style="margin-top:3px;opacity:.75">Margin&nbsp;<b>${m}%</b></div>`
        );
      },
    },
    grid: { left: 4, right: 12, top: 24, bottom: 24, containLabel: true },
    xAxis: {
      type: 'category',
      data: days,
      axisLabel: { fontSize: 11, fontWeight: 600 },
    },
    yAxis: [
      {
        type: 'value',
        axisLabel: { formatter: (v: number) => formatINR(v), fontSize: 10 },
        splitNumber: 3,
      },
      {
        type: 'value',
        min: 0,
        max: Math.max(...margins) + 8,
        show: false,
      },
    ],
    series: [
      {
        name: 'Revenue',
        type: 'bar',
        data: revenue,
        barWidth: 14,
        itemStyle: { borderRadius: [3, 3, 0, 0], color: C.primary },
        emphasis: { itemStyle: { color: C.primaryLite } },
      },
      {
        name: 'Profit',
        type: 'line',
        data: profit,
        smooth: false,
        symbol: 'circle',
        symbolSize: 5,
        lineStyle: { color: C.secondary, width: 2 },
        itemStyle: { color: C.secondary },
        z: 3,
      },
      {
        name: 'Margin %',
        type: 'line',
        yAxisIndex: 1,
        data: margins,
        smooth: false,
        showSymbol: false,
        lineStyle: { color: C.accent, width: 1, type: 'dashed', opacity: 0.7 },
        itemStyle: { color: C.accent },
        z: 2,
      },
    ],
  };

  return (
    <GlassCard sx={{ p: 2 }}>
      <Stack direction="row" sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
        <SectionLabel>Revenue vs Profit · 7d</SectionLabel>
        <Typography sx={{ fontSize: 10.5, color: 'text.disabled', fontWeight: 700 }}>
          Avg margin&nbsp;<Box component="span" sx={{ color: C.accent, fontWeight: 800 }}>{avgMargin}%</Box>
        </Typography>
      </Stack>

      <Stack direction="row" sx={{ gap: 2, mt: 0.5, flexWrap: 'wrap' }}>
        <Stack>
          <Typography sx={{ fontSize: 10, color: 'text.disabled', fontWeight: 700, letterSpacing: 0.3, textTransform: 'uppercase' }}>
            Today
          </Typography>
          <Stack direction="row" sx={{ alignItems: 'baseline', gap: 0.75 }}>
            <Typography sx={{ fontSize: 18, fontWeight: 800, letterSpacing: -0.3 }}>
              {formatINR(todayRev)}
            </Typography>
            <Typography sx={{ fontSize: 11, fontWeight: 700, color: 'text.secondary' }}>
              · {formatINR(todayProf)}
            </Typography>
            <Typography sx={{ fontSize: 10.5, color: 'text.disabled' }}>
              ({todayMargin}%)
            </Typography>
          </Stack>
        </Stack>
        <Stack sx={{ ml: 'auto' }}>
          <Typography sx={{ fontSize: 10, color: 'text.disabled', fontWeight: 700, letterSpacing: 0.3, textTransform: 'uppercase' }}>
            7-day total
          </Typography>
          <Stack direction="row" sx={{ alignItems: 'baseline', gap: 0.75, justifyContent: 'flex-end' }}>
            <Typography sx={{ fontSize: 15, fontWeight: 800 }}>{formatINR(totalRev)}</Typography>
            <Typography sx={{ fontSize: 11, fontWeight: 700, color: 'text.secondary' }}>
              / {formatINR(totalProf)}
            </Typography>
          </Stack>
        </Stack>
      </Stack>

      <Box sx={{ mt: 0.5, mx: -1 }}>
        <EChart option={option} height={210} />
      </Box>

      <Stack direction="row" sx={{ gap: 2, mt: 0.5, alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}>
        <Stack direction="row" sx={{ alignItems: 'center', gap: 0.5 }}>
          <Box sx={{ width: 10, height: 6, borderRadius: 0.5, background: C.primary }} />
          <Typography sx={{ fontSize: 11, color: 'text.secondary' }}>Revenue</Typography>
        </Stack>
        <Stack direction="row" sx={{ alignItems: 'center', gap: 0.5 }}>
          <Box sx={{ width: 12, height: 2, background: C.secondary, borderRadius: 999 }} />
          <Typography sx={{ fontSize: 11, color: 'text.secondary' }}>Profit</Typography>
        </Stack>
        <Stack direction="row" sx={{ alignItems: 'center', gap: 0.5 }}>
          <Box sx={{ width: 12, height: 0, borderTop: `1.5px dashed ${C.accent}` }} />
          <Typography sx={{ fontSize: 11, color: 'text.secondary' }}>Margin %</Typography>
        </Stack>
      </Stack>
    </GlassCard>
  );
}

/* ─── Total Profit — 7d sparkline + stats ─────────────── */
function TotalProfit() {
  const { totalProfit, profitMarginPct, profitDeltaPct, revenueProfit } = salesDashboard;
  const days = revenueProfit.map(d => d.day);
  const profits = revenueProfit.map(d => d.profit);
  const maxP = Math.max(...profits);
  const minP = Math.min(...profits);
  const bestIdx = profits.indexOf(maxP);
  const worstIdx = profits.indexOf(minP);
  const avg = Math.round(profits.reduce((a, b) => a + b, 0) / profits.length);

  const option: EChartsOption = {
    tooltip: {
      trigger: 'axis',
      valueFormatter: (v) => formatINR(v as number),
    },
    grid: { left: 6, right: 6, top: 10, bottom: 18, containLabel: true },
    xAxis: { type: 'category', data: days, boundaryGap: false, axisLabel: { fontSize: 10 } },
    yAxis: { type: 'value', show: false },
    series: [
      {
        type: 'line',
        data: profits,
        smooth: true,
        showSymbol: false,
        lineStyle: { color: C.primary, width: 2 },
        itemStyle: { color: C.primary },
        areaStyle: {
          color: {
            type: 'linear',
            x: 0, y: 0, x2: 0, y2: 1,
            colorStops: [
              { offset: 0, color: 'rgba(59,130,246,0.22)' },
              { offset: 1, color: 'rgba(59,130,246,0)' },
            ],
          },
        },
        markPoint: {
          symbol: 'circle',
          symbolSize: 10,
          label: { show: false },
          data: [
            { name: 'Best', coord: [bestIdx, maxP], itemStyle: { color: C.good, borderColor: '#fff', borderWidth: 2 } },
            { name: 'Lowest', coord: [worstIdx, minP], itemStyle: { color: C.bad, borderColor: '#fff', borderWidth: 2 } },
          ],
        },
      },
    ],
  };

  return (
    <GlassCard sx={{ p: 2 }}>
      <Stack direction="row" sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
        <SectionLabel>Total Profit · 7d</SectionLabel>
        <DeltaPill value={profitDeltaPct} />
      </Stack>
      <Stack direction="row" sx={{ alignItems: 'baseline', mt: 0.5, gap: 1 }}>
        <Typography sx={{ fontSize: 26, fontWeight: 800, letterSpacing: -0.4 }}>
          {formatINR(totalProfit)}
        </Typography>
        <Typography sx={{ fontSize: 11, color: 'text.secondary' }}>~{profitMarginPct}% margin</Typography>
      </Stack>

      <Box sx={{ mt: 0.5, mx: -1 }}>
        <EChart option={option} height={100} />
      </Box>

      <Stack spacing={0.5} sx={{ mt: 0.5 }}>
        <Stack direction="row" sx={{ justifyContent: 'space-between', alignItems: 'baseline' }}>
          <Typography sx={{ fontSize: 10.5, color: 'text.disabled', fontWeight: 700, letterSpacing: 0.3 }}>
            Best · {days[bestIdx]}
          </Typography>
          <Typography sx={{ fontSize: 11.5, fontWeight: 800 }}>{formatINR(maxP)}</Typography>
        </Stack>
        <Stack direction="row" sx={{ justifyContent: 'space-between', alignItems: 'baseline' }}>
          <Typography sx={{ fontSize: 10.5, color: 'text.disabled', fontWeight: 700, letterSpacing: 0.3 }}>
            Lowest · {days[worstIdx]}
          </Typography>
          <Typography sx={{ fontSize: 11.5, color: 'text.secondary', fontWeight: 800 }}>{formatINR(minP)}</Typography>
        </Stack>
        <Stack direction="row" sx={{ justifyContent: 'space-between', alignItems: 'baseline' }}>
          <Typography sx={{ fontSize: 10.5, color: 'text.disabled', fontWeight: 700, letterSpacing: 0.3 }}>
            7-day avg
          </Typography>
          <Typography sx={{ fontSize: 11.5, fontWeight: 800 }}>{formatINR(avg)}</Typography>
        </Stack>
      </Stack>
    </GlassCard>
  );
}

/* ─── Sales Health — gauge + horizontal bars ──────────── */
function SalesHealth() {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const { salesHealth } = salesDashboard;
  const arcColor = healthColor(salesHealth.score);

  const gaugeOption: EChartsOption = {
    series: [
      {
        type: 'gauge',
        startAngle: 90,
        endAngle: -270,
        min: 0,
        max: 100,
        radius: '100%',
        center: ['50%', '50%'],
        progress: { show: true, width: 10, roundCap: true, itemStyle: { color: arcColor } },
        axisLine: { lineStyle: { width: 10, color: [[1, isDark ? 'rgba(255,255,255,0.08)' : 'rgba(11,15,26,0.08)']] } },
        pointer: { show: false },
        axisTick: { show: false },
        splitLine: { show: false },
        axisLabel: { show: false },
        anchor: { show: false },
        title: { show: false },
        detail: {
          valueAnimation: true,
          fontSize: 22,
          fontWeight: 800,
          color: 'inherit',
          offsetCenter: [0, '0%'],
          formatter: (v: number): string => `${Math.round(v)}`,
        },
        data: [{ value: salesHealth.score }],
      },
    ],
  };

  const labels = salesHealth.breakdown.map(b => b.label);
  const scores = salesHealth.breakdown.map(b => b.score);

  const barOption: EChartsOption = {
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'shadow' },
      formatter: (params) => {
        const arr = params as Array<{ dataIndex: number; value: number }>;
        const p = arr[0];
        const item = salesHealth.breakdown[p.dataIndex];
        return `<b>${item.label}</b> · ${item.score}<br/>${item.hint}`;
      },
    },
    grid: { left: 0, right: 36, top: 4, bottom: 4, containLabel: true },
    xAxis: { type: 'value', min: 0, max: 100, show: false },
    yAxis: {
      type: 'category',
      data: labels,
      inverse: true,
      axisLabel: { fontSize: 11.5, fontWeight: 600, color: theme.palette.text.primary },
      axisLine: { show: false },
      axisTick: { show: false },
    },
    series: [
      {
        type: 'bar',
        data: scores.map(s => ({ value: s, itemStyle: { color: healthColor(s), borderRadius: [0, 4, 4, 0] } })),
        barWidth: 8,
        showBackground: true,
        backgroundStyle: { color: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(11,15,26,0.06)', borderRadius: [0, 4, 4, 0] },
        label: {
          show: true,
          position: 'right',
          fontSize: 11,
          fontWeight: 800,
          color: theme.palette.text.primary,
          formatter: '{c}',
        },
      },
    ],
  };

  return (
    <GlassCard sx={{ p: 2 }}>
      <Stack direction="row" sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
        <SectionLabel>Sales Health</SectionLabel>
        <DeltaPill value={salesHealth.deltaPts} suffix=" pts" />
      </Stack>

      <Stack sx={{ alignItems: 'center', mt: 1 }}>
        <Box sx={{ position: 'relative', width: 110, height: 110 }}>
          <EChart option={gaugeOption} height={110} />
          <Typography
            sx={{
              position: 'absolute',
              left: 0,
              right: 0,
              bottom: 18,
              textAlign: 'center',
              fontSize: 9.5,
              fontWeight: 800,
              letterSpacing: 0.6,
              color: arcColor,
            }}
          >
            {salesHealth.label}
          </Typography>
        </Box>
      </Stack>

      <Box sx={{ mt: 0.5, mx: -0.5 }}>
        <EChart option={barOption} height={salesHealth.breakdown.length * 26 + 8} />
      </Box>
    </GlassCard>
  );
}

/* ─── Top Products — horizontal bar ───────────────────── */
function TopProducts() {
  const theme = useTheme();
  const { topProducts } = salesDashboard;
  const names = topProducts.map(p => p.name);
  const revenue = topProducts.map(p => p.revenue);

  const option: EChartsOption = {
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'shadow' },
      formatter: (params) => {
        const arr = params as Array<{ dataIndex: number; value: number }>;
        const p = arr[0];
        const item = topProducts[p.dataIndex];
        return `<b>${item.name}</b><br/>${item.units} units · ${formatINR(item.revenue)}`;
      },
    },
    grid: { left: 0, right: 56, top: 4, bottom: 4, containLabel: true },
    xAxis: { type: 'value', show: false, max: Math.max(...revenue) * 1.15 },
    yAxis: {
      type: 'category',
      data: names,
      inverse: true,
      axisLabel: { fontSize: 12, fontWeight: 600, color: theme.palette.text.primary, width: 130, overflow: 'truncate' },
      axisLine: { show: false },
      axisTick: { show: false },
    },
    series: [
      {
        type: 'bar',
        data: revenue,
        barWidth: 10,
        itemStyle: { borderRadius: [0, 3, 3, 0], color: C.secondary },
        label: {
          show: true,
          position: 'right',
          fontSize: 11,
          fontWeight: 800,
          color: theme.palette.text.primary,
          formatter: (p): string => formatINR(p.value as number),
        },
      },
    ],
  };

  return (
    <GlassCard sx={{ p: 2 }}>
      <SectionLabel>Top Products</SectionLabel>
      <Box sx={{ mt: 1, mx: -0.5 }}>
        <EChart option={option} height={topProducts.length * 36 + 16} />
      </Box>
    </GlassCard>
  );
}

/* ─── Orders by Source ────────────────────────────────── */
function SourceBreakdown() {
  const theme = useTheme();
  const { source } = salesDashboard;
  const names = source.map(s => s.name);
  const revenue = source.map(s => s.revenue);

  const option: EChartsOption = {
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'shadow' },
      formatter: (params) => {
        const arr = params as Array<{ dataIndex: number; value: number }>;
        const p = arr[0];
        const item = source[p.dataIndex];
        return `<b>${item.name}</b><br/>${item.orders} orders · ${formatINR(item.revenue)}`;
      },
    },
    grid: { left: 0, right: 12, top: 8, bottom: 24, containLabel: true },
    xAxis: {
      type: 'category',
      data: names,
      axisLabel: { fontSize: 11, fontWeight: 600, color: theme.palette.text.primary },
    },
    yAxis: { type: 'value', show: false, max: Math.max(...revenue) * 1.18 },
    series: [
      {
        type: 'bar',
        data: source.map(s => ({ value: s.revenue, itemStyle: { color: orderSourceColor[s.name], borderRadius: [3, 3, 0, 0] } })),
        barWidth: 28,
        label: {
          show: true,
          position: 'top',
          fontSize: 11,
          fontWeight: 800,
          color: theme.palette.text.primary,
          formatter: (p): string => formatINR(p.value as number),
        },
      },
    ],
  };

  return (
    <GlassCard sx={{ p: 2 }}>
      <SectionLabel>Orders by Source</SectionLabel>
      <Box sx={{ mt: 1, mx: -0.5 }}>
        <EChart option={option} height={180} />
      </Box>
      <Stack direction="row" sx={{ flexWrap: 'wrap', gap: 1.25, mt: 0.5, justifyContent: 'center' }}>
        {source.map(s => (
          <Stack key={s.name} direction="row" sx={{ alignItems: 'center', gap: 0.5 }}>
            <Box sx={{ width: 8, height: 8, borderRadius: '50%', background: orderSourceColor[s.name] }} />
            <Typography sx={{ fontSize: 11, color: 'text.secondary' }}>
              {s.name} · {s.orders}
            </Typography>
          </Stack>
        ))}
      </Stack>
    </GlassCard>
  );
}

export function DashboardTab() {
  return (
    <Stack spacing={1.5}>
      <Box sx={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 1.5 }}>
        <ActualVsTarget />
        <TotalOrdersCard />
      </Box>
      <RevenueVsProfit />
      <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1.5, alignItems: 'stretch' }}>
        <TotalProfit />
        <SalesHealth />
      </Box>
      <TopProducts />
      <SourceBreakdown />
    </Stack>
  );
}
