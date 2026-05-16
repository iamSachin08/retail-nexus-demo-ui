import { Box, Stack, Typography } from '@mui/material';
import TrendingUpRoundedIcon from '@mui/icons-material/TrendingUpRounded';
import TrendingDownRoundedIcon from '@mui/icons-material/TrendingDownRounded';
import type { CTAButton, ModuleSummary, TileSize } from '../types/module';
import { toneColor } from '../types/module';

const MONO_FONT = '"SF Mono", Menlo, Monaco, Consolas, "Courier New", monospace';

const primaryFontFor = (size: TileSize) => (size === 'large' ? 26 : 42);

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

const BigMetric = ({ value, size = 'medium' }: { value: string; size?: TileSize }) => (
  <Typography
    sx={{
      fontFamily: MONO_FONT,
      fontSize: primaryFontFor(size),
      fontWeight: 700,
      lineHeight: 1.05,
      letterSpacing: -0.4,
    }}
  >
    {value}
  </Typography>
);

const PrimaryBlock = ({
  value,
  label,
  size,
  color,
}: {
  value: string;
  label?: string;
  size: TileSize;
  color?: string;
}) => (
  <Stack spacing={0.25}>
    <Typography
      sx={{
        fontFamily: MONO_FONT,
        fontSize: primaryFontFor(size),
        fontWeight: 700,
        lineHeight: 1.05,
        letterSpacing: -0.4,
        color,
      }}
    >
      {value}
    </Typography>
    {label && <Label>{label}</Label>}
  </Stack>
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
        <Box component="span" sx={{ fontFamily: MONO_FONT }}>{delta}%</Box> {suffix}
      </Typography>
    </Stack>
  );
};

/* ─────────────  Sales and Orders  ───────────── */
export const renderSales = ({ data, size }: { data: ModuleSummary; size: TileSize }) => {
  const isLarge = size === 'large';
  return (
    <Stack spacing={0.5}>
      <PrimaryBlock value={data.primary ?? '—'} label={data.primaryLabel} size={size} />
      {data.target && (
        <Typography sx={{ fontSize: 11, color: 'text.secondary', letterSpacing: 0.4 }}>
          VS. TARGET:{' '}
          <Box component="strong" sx={{ fontFamily: MONO_FONT, color: 'text.primary' }}>
            {data.target}
          </Box>
        </Typography>
      )}
      {typeof data.vsYesterdayDelta === 'number' && (
        <Box sx={{ pt: 0.25 }}>
          <TrendInline delta={data.vsYesterdayDelta} />
        </Box>
      )}
      {isLarge && data.health && (
        <>
          <Divider />
          <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
            <Typography sx={{ fontFamily: MONO_FONT, fontSize: 20, fontWeight: 700 }}>
              {data.health.score}
            </Typography>
            <Label>Sales Health</Label>
            <Typography sx={{ fontSize: 11, fontWeight: 700, color: toneColor(data.health.tone) }}>
              {data.health.label}
            </Typography>
          </Stack>
        </>
      )}
    </Stack>
  );
};

/* ─────────────  Lead  ───────────── */
export const renderLead = ({ data, size }: { data: ModuleSummary; size: TileSize }) => {
  const isLarge = size === 'large';
  return (
    <Stack spacing={0.5}>
      {data.conversion && (
        <>
          <Stack spacing={0.25}>
            <Typography
              sx={{
                fontFamily: MONO_FONT,
                fontSize: primaryFontFor(size),
                fontWeight: 700,
                lineHeight: 1.05,
                letterSpacing: -0.4,
              }}
            >
              {data.conversion.converted}
            </Typography>
            <Stack direction="row" spacing={1} sx={{ alignItems: 'baseline' }}>
              <Label>CONVERTED</Label>
              <Typography sx={{ fontSize: 11, color: 'text.secondary' }}>
                / <Box component="span" sx={{ fontFamily: MONO_FONT }}>{data.conversion.total}</Box> TOTAL
              </Typography>
            </Stack>
          </Stack>
          <Typography sx={{ fontSize: 12, fontWeight: 700, color: '#F97316' }}>
            Conversion: <Box component="span" sx={{ fontFamily: MONO_FONT }}>{data.conversion.pct}%</Box>
          </Typography>
        </>
      )}
      {isLarge && data.topSource && (
        <Box sx={{ mt: 0.5 }}>
          <Label>{data.topSource.label}</Label>
          <Typography sx={{ fontSize: 13, fontWeight: 600 }}>{data.topSource.meta}</Typography>
        </Box>
      )}
      {isLarge && data.maxLeads && (
        <Box>
          <Label>{data.maxLeads.label}</Label>
          <Typography sx={{ fontSize: 13, fontWeight: 600 }}>{data.maxLeads.meta}</Typography>
        </Box>
      )}
      {data.cta && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 0.5 }}>
          <Cta cta={data.cta} />
        </Box>
      )}
    </Stack>
  );
};

/* ─────────────  Inventory  ───────────── */
export const renderInventory = ({ data, size }: { data: ModuleSummary; size: TileSize }) => {
  if (size === 'large') {
    return (
      <Stack spacing={1}>
        <Stack direction="row" spacing={2} sx={{ justifyContent: 'space-between' }}>
          <Box>
            <Label>Demand in Area</Label>
            <BigMetric value={data.demand ?? '—'} size={size} />
          </Box>
          <Box sx={{ textAlign: 'right' }}>
            <Label>Status Breakdown</Label>
            <Stack direction="row" spacing={1} sx={{ alignItems: 'center', mt: 0.5 }}>
              {data.statusBreakdown?.map((s, i) => (
                <Stack key={s.label} direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                  <Typography sx={{ fontSize: 12, fontWeight: 700, color: toneColor(s.tone) }}>
                    <Box component="span" sx={{ fontFamily: MONO_FONT }}>{s.value}</Box> {s.label}
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
              <Typography sx={{ fontFamily: MONO_FONT, fontSize: 20, fontWeight: 700, color: '#22C55E' }}>
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
  }

  /* Medium size — compact layout */
  return (
    <Stack spacing={1}>
      <Box>
        <BigMetric value={data.demand ?? '—'} size={size} />
        <Label>Demand in Area</Label>
      </Box>
      {data.statusBreakdown && (
        <Stack spacing={0.5}>
          {data.statusBreakdown.map(s => {
            const color = toneColor(s.tone);
            return (
              <Stack key={s.label} direction="row" spacing={1} sx={{ alignItems: 'baseline' }}>
                <Typography
                  sx={{
                    fontFamily: MONO_FONT,
                    fontSize: 16,
                    fontWeight: 800,
                    color,
                    lineHeight: 1,
                    minWidth: 24,
                  }}
                >
                  {s.value}
                </Typography>
                <Typography sx={{ fontSize: 12, fontWeight: 600, color: 'text.primary' }}>
                  {s.label}
                </Typography>
              </Stack>
            );
          })}
        </Stack>
      )}
    </Stack>
  );
};

const InlineMetric = ({ value, label }: { value: string; label: string }) => (
  <Stack direction="row" spacing={1} sx={{ alignItems: 'baseline' }}>
    <Typography
      sx={{ fontFamily: MONO_FONT, fontSize: 22, fontWeight: 800, lineHeight: 1, letterSpacing: -0.3 }}
    >
      {value}
    </Typography>
    <Label>{label}</Label>
  </Stack>
);

/* ─────────────  Campaigns  ───────────── */
export const renderCampaigns = ({ data }: { data: ModuleSummary; size: TileSize }) => (
  <Stack spacing={1.25}>
    <InlineMetric value={String(data.liveCount ?? '—')} label={data.primaryLabel ?? 'LIVE'} />
    {data.performance && (
      <Box>
        <Label>PERFORMANCE</Label>
        <Box sx={{ mt: 0.5 }}>
          <InlineMetric value={data.performance.value} label={data.performance.label} />
        </Box>
      </Box>
    )}
    {typeof data.reachDelta === 'number' && (
      <Box>
        <TrendInline delta={data.reachDelta} suffix="reach" />
      </Box>
    )}
  </Stack>
);

/* ─────────────  Task Management  ───────────── */
export const renderTasks = ({ data }: { data: ModuleSummary; size: TileSize }) => (
  <Stack spacing={1.25}>
    <InlineMetric value={String(data.pending ?? '—')} label={data.primaryLabel ?? 'PENDING'} />
    {data.pendingBreakdown && (
      <Stack spacing={0.75}>
        {data.pendingBreakdown.map(b => (
          <Stack
            key={b.label}
            direction="row"
            spacing={1}
            sx={{ alignItems: 'baseline', justifyContent: 'space-between' }}
          >
            <Label>{b.label}</Label>
            <Typography
              sx={{
                fontFamily: MONO_FONT,
                fontSize: 14,
                fontWeight: 800,
                lineHeight: 1,
                letterSpacing: -0.3,
              }}
            >
              {b.value}
            </Typography>
          </Stack>
        ))}
      </Stack>
    )}
    {data.cta && (
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Cta cta={data.cta} />
      </Box>
    )}
  </Stack>
);
