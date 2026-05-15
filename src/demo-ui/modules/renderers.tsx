import { Box, Stack, Typography } from '@mui/material';
import TrendingUpRoundedIcon from '@mui/icons-material/TrendingUpRounded';
import TrendingDownRoundedIcon from '@mui/icons-material/TrendingDownRounded';
import type { CTAButton, ModuleSummary, TileSize } from '../types/module';
import { toneColor } from '../types/module';

const Label = ({ children }: { children: React.ReactNode }) => (
  <Typography
    sx={{
      fontSize: 10,
      fontWeight: 700,
      letterSpacing: 0.8,
      textTransform: 'uppercase',
      color: 'text.secondary',
    }}
  >
    {children}
  </Typography>
);

const BigMetric = ({ value }: { value: string }) => (
  <Typography sx={{ fontSize: 26, fontWeight: 800, lineHeight: 1.05, letterSpacing: -0.4 }}>
    {value}
  </Typography>
);

const Divider = () => <Box sx={{ height: 1, background: 'divider', my: 1 }} />;

const Cta = ({ cta }: { cta: CTAButton }) => {
  const bg = cta.tone === 'amber' ? '#F59E0B' : cta.tone === 'success' ? '#22C55E' : '#EF4444';
  return (
    <Box
      sx={{
        mt: 1.25,
        alignSelf: 'flex-start',
        px: 1.5,
        py: 0.875,
        borderRadius: 1.5,
        background: bg,
        color: '#fff',
        fontSize: 12,
        fontWeight: 700,
        boxShadow: '0 6px 14px rgba(239,68,68,0.32)',
      }}
    >
      {cta.text}
    </Box>
  );
};

const TrendInline = ({ delta, suffix = 'vs. yesterday' }: { delta: number; suffix?: string }) => {
  const positive = delta >= 0;
  const color = positive ? '#22C55E' : '#EF4444';
  return (
    <Stack direction="row" spacing={0.5} sx={{ alignItems: 'center', color }}>
      {positive ? (
        <TrendingUpRoundedIcon sx={{ fontSize: 14 }} />
      ) : (
        <TrendingDownRoundedIcon sx={{ fontSize: 14 }} />
      )}
      <Typography component="span" sx={{ fontSize: 12, fontWeight: 700 }}>
        {delta}% {suffix}
      </Typography>
    </Stack>
  );
};

/* ─────────────  Sales and Orders  ───────────── */
export const renderSales = ({ data }: { data: ModuleSummary; size: TileSize }) => (
  <Stack spacing={0.5}>
    <Stack direction="row" spacing={1} sx={{ alignItems: 'baseline' }}>
      <BigMetric value={data.primary ?? '—'} />
      <Label>{data.primaryLabel}</Label>
    </Stack>
    {data.target && (
      <Typography sx={{ fontSize: 11, color: 'text.secondary', letterSpacing: 0.4 }}>
        VS. TARGET:{' '}
        <Box component="strong" sx={{ color: 'text.primary' }}>
          {data.target}
        </Box>
      </Typography>
    )}
    {typeof data.vsYesterdayDelta === 'number' && (
      <Box sx={{ pt: 0.25 }}>
        <TrendInline delta={data.vsYesterdayDelta} />
      </Box>
    )}
    {data.health && (
      <>
        <Divider />
        <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
          <Typography sx={{ fontSize: 20, fontWeight: 800 }}>{data.health.score}</Typography>
          <Label>Sales Health</Label>
          <Typography sx={{ fontSize: 11, fontWeight: 700, color: toneColor(data.health.tone) }}>
            {data.health.label}
          </Typography>
        </Stack>
      </>
    )}
  </Stack>
);

/* ─────────────  Lead  ───────────── */
export const renderLead = ({ data }: { data: ModuleSummary }) => (
  <Stack spacing={0.5}>
    {data.conversion && (
      <>
        <Stack direction="row" spacing={1} sx={{ alignItems: 'baseline' }}>
          <Typography sx={{ fontSize: 18, fontWeight: 800 }}>
            {data.conversion.converted}{' '}
            <Box component="span" sx={{ color: 'text.secondary', fontWeight: 600 }}>
              CONVERTED
            </Box>
          </Typography>
          <Typography sx={{ fontSize: 12, color: 'text.secondary' }}>
            / {data.conversion.total} TOTAL
          </Typography>
        </Stack>
        <Typography sx={{ fontSize: 14, fontWeight: 700, color: '#F97316' }}>
          Conversion: {data.conversion.pct}%
        </Typography>
      </>
    )}
    {data.topSource && (
      <Box sx={{ mt: 0.5 }}>
        <Label>{data.topSource.label}</Label>
        <Typography sx={{ fontSize: 13, fontWeight: 600 }}>{data.topSource.meta}</Typography>
      </Box>
    )}
    {data.maxLeads && (
      <Box>
        <Label>{data.maxLeads.label}</Label>
        <Typography sx={{ fontSize: 13, fontWeight: 600 }}>{data.maxLeads.meta}</Typography>
      </Box>
    )}
    {data.cta && <Cta cta={data.cta} />}
  </Stack>
);

/* ─────────────  Inventory  ───────────── */
export const renderInventory = ({ data }: { data: ModuleSummary }) => (
  <Stack spacing={1}>
    <Stack direction="row" spacing={2} sx={{ justifyContent: 'space-between' }}>
      <Box>
        <Label>Demand in Area</Label>
        <BigMetric value={data.demand ?? '—'} />
      </Box>
      <Box sx={{ textAlign: 'right' }}>
        <Label>Status Breakdown</Label>
        <Stack direction="row" spacing={1} sx={{ alignItems: 'center', mt: 0.5 }}>
          {data.statusBreakdown?.map((s, i) => (
            <Stack key={s.label} direction="row" spacing={1} sx={{ alignItems: 'center' }}>
              <Typography sx={{ fontSize: 12, fontWeight: 700, color: toneColor(s.tone) }}>
                {s.value} {s.label}
              </Typography>
              {i < (data.statusBreakdown?.length ?? 0) - 1 && (
                <Typography sx={{ color: 'text.disabled' }}>|</Typography>
              )}
            </Stack>
          ))}
        </Stack>
      </Box>
    </Stack>
    {data.prediction && (
      <Box
        sx={theme => ({
          position: 'relative',
          mt: 0.5,
          px: 1.25,
          py: 1,
          borderRadius: 1.5,
          background:
            theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.04)' : 'rgba(11,15,26,0.035)',
          border:
            theme.palette.mode === 'dark'
              ? '1px solid rgba(255,255,255,0.08)'
              : '1px solid rgba(11,15,26,0.08)',
        })}
      >
        <Typography sx={{ fontSize: 13, fontWeight: 700, color: '#22C55E' }}>
          {data.prediction.headline.split(' ')[0] + ' '}
          <Box component="span" sx={{ color: 'text.primary', fontWeight: 600 }}>
            {data.prediction.headline.split(' ').slice(1).join(' ')}
          </Box>
        </Typography>
        <Typography sx={{ fontSize: 11, color: 'text.secondary', mt: 0.25 }}>
          {data.prediction.sub}
        </Typography>
        <Box
          sx={{
            position: 'absolute',
            top: 8,
            right: 10,
            fontSize: 9,
            fontWeight: 700,
            letterSpacing: 0.8,
            color: 'text.disabled',
          }}
        >
          PREDICTION
        </Box>
      </Box>
    )}
    {data.health && (
      <>
        <Divider />
        <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
          <Typography sx={{ fontSize: 20, fontWeight: 800, color: '#22C55E' }}>
            {data.health.score}
          </Typography>
          <Label>{data.health.label}</Label>
          {typeof data.deltaPct === 'number' && (
            <TrendInline delta={data.deltaPct} suffix="vs last week" />
          )}
        </Stack>
      </>
    )}
  </Stack>
);

/* ─────────────  Task Management  ───────────── */
export const renderTasks = ({ data }: { data: ModuleSummary }) => (
  <Stack spacing={1}>
    <Stack direction="row" spacing={1} sx={{ alignItems: 'baseline' }}>
      <Typography sx={{ fontSize: 22, fontWeight: 800 }}>{data.pending ?? '—'}</Typography>
      <Label>{data.primaryLabel ?? 'PENDING'}</Label>
    </Stack>
    {data.pendingBreakdown && (
      <Stack direction="row" spacing={2} sx={{ flexWrap: 'wrap', mt: 0.25 }}>
        {data.pendingBreakdown.map(b => (
          <Box key={b.label}>
            <Label>{b.label}</Label>
            <Typography sx={{ fontSize: 16, fontWeight: 700 }}>{b.value}</Typography>
          </Box>
        ))}
      </Stack>
    )}
    {data.cta && (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 0.5 }}>
        <Cta cta={data.cta} />
      </Box>
    )}
  </Stack>
);
