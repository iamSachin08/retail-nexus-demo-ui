import { Box, LinearProgress, Stack, Typography } from '@mui/material';
import TrendingUpRoundedIcon from '@mui/icons-material/TrendingUpRounded';
import type { EChartsOption } from 'echarts';
import { EChart } from '../../components/EChart';
import { GlassCard } from '../../components/GlassCard';
import { tokens } from '../../theme/tokens';
import { leadDashboard, sourceColor, statusColor } from '../../mock/data/leadManagement';

const formatINR = (n: number): string => {
  if (n >= 10000000) return `₹${(n / 10000000).toFixed(1)}Cr`;
  if (n >= 100000) return `₹${(n / 100000).toFixed(1)}L`;
  if (n >= 1000) return `₹${(n / 1000).toFixed(1)}K`;
  return `₹${n}`;
};

const SectionLabel = ({ children }: { children: React.ReactNode }) => (
  <Typography sx={{ fontSize: 11, fontWeight: 800, letterSpacing: 0.6, textTransform: 'uppercase', color: 'text.secondary' }}>
    {children}
  </Typography>
);

function ConvertedCard() {
  const { kpis } = leadDashboard;
  const pct = Math.round((kpis.converted / kpis.total) * 100);
  return (
    <GlassCard sx={{ p: 2 }}>
      <SectionLabel>Converted / Total</SectionLabel>
      <Stack direction="row" sx={{ alignItems: 'baseline', mt: 0.5, gap: 1 }}>
        <Typography sx={{ fontSize: 28, fontWeight: 800, letterSpacing: -0.4 }}>
          {kpis.converted}
          <Box component="span" sx={{ fontSize: 16, color: 'text.secondary', fontWeight: 700 }}>
            {' / '}{kpis.total}
          </Box>
        </Typography>
      </Stack>
      <LinearProgress
        variant="determinate"
        value={pct}
        sx={{
          mt: 1,
          height: 5,
          borderRadius: 999,
          backgroundColor: 'rgba(11,15,26,0.06)',
          '& .MuiLinearProgress-bar': { background: tokens.gradient.sales, borderRadius: 999 },
        }}
      />
      <Stack direction="row" sx={{ gap: 1.5, mt: 1.25, flexWrap: 'wrap' }}>
        <Box>
          <Typography sx={{ fontSize: 10.5, color: 'text.secondary', letterSpacing: 0.4 }}>
            REVENUE
          </Typography>
          <Typography sx={{ fontSize: 14, fontWeight: 800, color: '#22C55E' }}>
            {formatINR(kpis.revenueGenerated)}
          </Typography>
        </Box>
        <Box>
          <Typography sx={{ fontSize: 10.5, color: 'text.secondary', letterSpacing: 0.4 }}>
            PROFIT
          </Typography>
          <Typography sx={{ fontSize: 14, fontWeight: 800 }}>{formatINR(kpis.profitGain)}</Typography>
        </Box>
      </Stack>
    </GlassCard>
  );
}

function LostCard() {
  const { kpis } = leadDashboard;
  const pct = Math.round((kpis.lost / kpis.total) * 100);
  return (
    <GlassCard sx={{ p: 2 }}>
      <SectionLabel>Lost / Total</SectionLabel>
      <Stack direction="row" sx={{ alignItems: 'baseline', mt: 0.5, gap: 1 }}>
        <Typography sx={{ fontSize: 28, fontWeight: 800, color: '#EF4444', letterSpacing: -0.4 }}>
          {kpis.lost}
        </Typography>
        <Typography sx={{ fontSize: 13, color: 'text.secondary' }}>{pct}%</Typography>
      </Stack>
      <Typography sx={{ fontSize: 11, color: 'text.secondary', mt: 0.5 }}>
        ↓ 4% vs last month
      </Typography>
    </GlassCard>
  );
}

/** Monthly leads vs conversions — animated stacked bar chart via ECharts. */
function MonthlyChart() {
  const { monthly } = leadDashboard;
  const totalLeads = monthly.reduce((s, m) => s + m.leads, 0);
  const totalConv = monthly.reduce((s, m) => s + m.conversions, 0);
  const avgConvPct = Math.round((totalConv / totalLeads) * 100);
  const months = monthly.map(m => m.month);
  const leads = monthly.map(m => m.leads);
  const conversions = monthly.map(m => m.conversions);
  const remaining = monthly.map(m => m.leads - m.conversions);

  const chartOption: EChartsOption = {
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'shadow' },
      formatter: (params) => {
        const arr = params as Array<{ axisValue: string; dataIndex: number }>;
        const i = arr[0].dataIndex;
        const pct = Math.round((conversions[i] / leads[i]) * 100);
        return (
          `<div style="font-weight:700;margin-bottom:4px">${months[i]}</div>` +
          `<div>Leads <b>${leads[i]}</b></div>` +
          `<div style="color:#22C55E">Conversions <b>${conversions[i]}</b> (${pct}%)</div>`
        );
      },
    },
    grid: { left: 4, right: 8, top: 18, bottom: 24, containLabel: true },
    xAxis: {
      type: 'category',
      data: months,
      axisLabel: { fontSize: 10.5, fontWeight: 600 },
    },
    yAxis: {
      type: 'value',
      splitNumber: 3,
      axisLabel: { fontSize: 10 },
    },
    series: [
      {
        name: 'Conversions',
        type: 'bar',
        stack: 'total',
        data: conversions,
        barWidth: '55%',
        itemStyle: {
          color: {
            type: 'linear',
            x: 0, y: 0, x2: 0, y2: 1,
            colorStops: [
              { offset: 0, color: '#34D399' },
              { offset: 1, color: '#22C55E' },
            ],
          },
          borderRadius: [0, 0, 4, 4],
        },
        animationDelay: (idx: number) => idx * 60,
      },
      {
        name: 'Remaining',
        type: 'bar',
        stack: 'total',
        data: remaining,
        barWidth: '55%',
        itemStyle: {
          color: {
            type: 'linear',
            x: 0, y: 0, x2: 0, y2: 1,
            colorStops: [
              { offset: 0, color: '#93C5FD' },
              { offset: 1, color: '#60A5FA' },
            ],
          },
          borderRadius: [4, 4, 0, 0],
        },
        label: {
          show: true,
          position: 'top',
          fontSize: 10,
          fontWeight: 700,
          formatter: (p) => String(leads[(p as { dataIndex: number }).dataIndex]),
        },
        animationDelay: (idx: number) => idx * 60 + 200,
      },
    ],
    animationDuration: 900,
    animationEasing: 'cubicOut',
  };
  return (
    <GlassCard sx={{ p: 2 }}>
      <Stack direction="row" sx={{ alignItems: 'flex-start', justifyContent: 'space-between' }}>
        <SectionLabel>Monthly Lead Distribution</SectionLabel>
        <Typography sx={{ fontSize: 11, color: 'text.secondary' }}>
          Last 12 months
        </Typography>
      </Stack>
      <Stack direction="row" sx={{ gap: 2, mt: 0.75 }}>
        <Box>
          <Typography sx={{ fontSize: 18, fontWeight: 800, letterSpacing: -0.3 }}>
            {totalLeads}
          </Typography>
          <Typography sx={{ fontSize: 10, color: 'text.secondary', letterSpacing: 0.4 }}>
            TOTAL LEADS
          </Typography>
        </Box>
        <Box>
          <Typography sx={{ fontSize: 18, fontWeight: 800, color: '#22C55E', letterSpacing: -0.3 }}>
            {totalConv}
          </Typography>
          <Typography sx={{ fontSize: 10, color: 'text.secondary', letterSpacing: 0.4 }}>
            CONVERSIONS
          </Typography>
        </Box>
        <Box>
          <Typography sx={{ fontSize: 18, fontWeight: 800, color: '#7C5CFF', letterSpacing: -0.3 }}>
            {avgConvPct}%
          </Typography>
          <Typography sx={{ fontSize: 10, color: 'text.secondary', letterSpacing: 0.4 }}>
            AVG. RATE
          </Typography>
        </Box>
      </Stack>
      <Box sx={{ mt: 1.5, mx: -1 }}>
        <EChart option={chartOption} height={200} />
      </Box>
      <Stack direction="row" sx={{ gap: 1.5, mt: 1.25, justifyContent: 'center' }}>
        <Stack direction="row" sx={{ alignItems: 'center', gap: 0.5 }}>
          <Box sx={{ width: 8, height: 8, borderRadius: '50%', background: '#60A5FA' }} />
          <Typography sx={{ fontSize: 11, color: 'text.secondary' }}>Leads</Typography>
        </Stack>
        <Stack direction="row" sx={{ alignItems: 'center', gap: 0.5 }}>
          <Box sx={{ width: 8, height: 8, borderRadius: '50%', background: '#22C55E' }} />
          <Typography sx={{ fontSize: 11, color: 'text.secondary' }}>Conversions</Typography>
        </Stack>
      </Stack>
    </GlassCard>
  );
}

function StatusCard() {
  const { status, kpis } = leadDashboard;
  const total = kpis.total;
  return (
    <GlassCard sx={{ p: 2 }}>
      <SectionLabel>Lead Status</SectionLabel>
      <Stack spacing={1} sx={{ mt: 1.25 }}>
        {status.map(s => {
          const pct = Math.round((s.count / total) * 100);
          return (
            <Box key={s.name}>
              <Stack direction="row" sx={{ justifyContent: 'space-between', mb: 0.5 }}>
                <Typography sx={{ fontSize: 12, fontWeight: 600 }}>{s.name}</Typography>
                <Typography sx={{ fontSize: 11, color: 'text.secondary' }}>
                  {s.count} <Box component="span" sx={{ color: 'text.disabled' }}>· {pct}%</Box>
                </Typography>
              </Stack>
              <LinearProgress
                variant="determinate"
                value={pct}
                sx={{
                  height: 4,
                  borderRadius: 999,
                  backgroundColor: 'rgba(11,15,26,0.06)',
                  '& .MuiLinearProgress-bar': { background: statusColor[s.name], borderRadius: 999 },
                }}
              />
            </Box>
          );
        })}
      </Stack>
    </GlassCard>
  );
}

function PipelineCard() {
  const { kpis } = leadDashboard;
  return (
    <GlassCard sx={{ p: 2 }}>
      <SectionLabel>Pipeline Value</SectionLabel>
      <Stack direction="row" sx={{ alignItems: 'baseline', mt: 0.5, gap: 1 }}>
        <Typography sx={{ fontSize: 26, fontWeight: 800, letterSpacing: -0.4 }}>
          {formatINR(kpis.pipelineValue)}
        </Typography>
      </Stack>
      <Stack direction="row" sx={{ alignItems: 'center', gap: 0.5, mt: 0.5, color: '#22C55E' }}>
        <TrendingUpRoundedIcon sx={{ fontSize: 14 }} />
        <Typography sx={{ fontSize: 11.5, fontWeight: 700 }}>
          {kpis.pipelineRate}% conversion · est. {formatINR(Math.round(kpis.pipelineValue * (kpis.pipelineRate / 100)))} revenue
        </Typography>
      </Stack>
      <Typography sx={{ fontSize: 11, color: 'text.secondary', mt: 0.75 }}>
        Estimated revenue at current rate
      </Typography>
    </GlassCard>
  );
}

function SourcePerformanceCard() {
  const { sources } = leadDashboard;
  const maxRevenue = Math.max(...sources.map(s => s.revenue), 1);
  return (
    <GlassCard sx={{ p: 2 }}>
      <SectionLabel>Source Performance</SectionLabel>
      <Stack spacing={1.5} sx={{ mt: 1.25 }}>
        {sources.map(s => {
          const revPct = Math.round((s.revenue / maxRevenue) * 100);
          return (
            <Box key={s.source}>
              <Stack direction="row" sx={{ alignItems: 'center', justifyContent: 'space-between', mb: 0.5, gap: 0.5 }}>
                <Stack direction="row" sx={{ alignItems: 'center', gap: 0.75, minWidth: 0 }}>
                  <Box sx={{ width: 10, height: 10, borderRadius: '50%', background: sourceColor[s.source] }} />
                  <Typography sx={{ fontSize: 12.5, fontWeight: 600 }} noWrap>
                    {s.source}
                  </Typography>
                </Stack>
                <Stack direction="row" sx={{ gap: 1, alignItems: 'baseline', flexShrink: 0 }}>
                  <Typography sx={{ fontSize: 11, color: 'text.secondary' }}>
                    {s.leadCount} leads
                  </Typography>
                  <Typography sx={{ fontSize: 12, fontWeight: 700, color: '#22C55E' }}>
                    {s.conversion}%
                  </Typography>
                  <Typography sx={{ fontSize: 11.5, fontWeight: 700 }}>
                    {formatINR(s.revenue)}
                  </Typography>
                </Stack>
              </Stack>
              <LinearProgress
                variant="determinate"
                value={revPct}
                sx={{
                  height: 4,
                  borderRadius: 999,
                  backgroundColor: 'rgba(11,15,26,0.06)',
                  '& .MuiLinearProgress-bar': { background: sourceColor[s.source], borderRadius: 999 },
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
      <Box sx={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: 1.5 }}>
        <ConvertedCard />
        <LostCard />
      </Box>
      <MonthlyChart />
      <StatusCard />
      <PipelineCard />
      <SourcePerformanceCard />
    </Stack>
  );
}
