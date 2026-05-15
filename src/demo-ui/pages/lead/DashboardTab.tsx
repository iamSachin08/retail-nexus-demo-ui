import { Box, LinearProgress, Stack, Typography } from '@mui/material';
import TrendingUpRoundedIcon from '@mui/icons-material/TrendingUpRounded';
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

/** Monthly leads vs conversions — simple grouped bar chart. */
function MonthlyChart() {
  const { monthly } = leadDashboard;
  const max = Math.max(...monthly.map(m => m.leads));
  return (
    <GlassCard sx={{ p: 2 }}>
      <SectionLabel>Monthly Lead Distribution</SectionLabel>
      <Stack direction="row" sx={{ gap: 1, alignItems: 'flex-end', mt: 1.5, height: 120 }}>
        {monthly.map(m => {
          const leadH = (m.leads / max) * 100;
          const convH = (m.conversions / max) * 100;
          return (
            <Stack key={m.month} sx={{ flex: 1, alignItems: 'center', gap: 0.5 }}>
              <Stack
                direction="row"
                sx={{ alignItems: 'flex-end', gap: 0.5, height: '100%', width: '100%', justifyContent: 'center' }}
              >
                <Box
                  sx={{
                    width: '40%',
                    height: `${leadH}%`,
                    borderRadius: '4px 4px 0 0',
                    background: tokens.gradient.inventory,
                  }}
                />
                <Box
                  sx={{
                    width: '40%',
                    height: `${convH}%`,
                    borderRadius: '4px 4px 0 0',
                    background: tokens.gradient.sales,
                  }}
                />
              </Stack>
              <Typography sx={{ fontSize: 10, color: 'text.secondary' }}>{m.month}</Typography>
            </Stack>
          );
        })}
      </Stack>
      <Stack direction="row" sx={{ gap: 1.5, mt: 1, justifyContent: 'center' }}>
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
