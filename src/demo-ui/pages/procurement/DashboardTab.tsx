import { Box, Stack, Typography } from '@mui/material';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import ShieldOutlinedIcon from '@mui/icons-material/ShieldOutlined';
import { motion } from 'framer-motion';
import type { ReactNode } from 'react';
import { useShopPalette } from '../../hooks/useShopPalette';
import type { ShopPalette } from '../../theme/tokens';
import { Card, DeltaText, Hr, Label, Sparkle, tone } from './primitives';
import {
  delivery,
  payments,
  qualityBreakdown,
  qualityValues,
  spendByCategory,
  spendOverTime,
  vendorTrustDist,
} from './data';

/* ── Delivery donut ───────────────────────────────────────── */
function DeliveryDonut({ palette }: { palette: ShopPalette }) {
  const { delivered, transit, delayed } = delivery;
  const total = delivered + transit + delayed;
  const r = 56;
  const c = 2 * Math.PI * r;
  const segs = [
    { v: delivered, color: palette.green },
    { v: transit, color: palette.amber },
    { v: delayed, color: palette.redSoft },
  ];
  let acc = 0;
  return (
    <Box sx={{ position: 'relative', width: 150, height: 150 }}>
      <svg viewBox="0 0 150 150" width="150" height="150">
        <circle cx="75" cy="75" r={r} fill="none" stroke={palette.tileSoft} strokeWidth="14" />
        {segs.map((s, i) => {
          const dash = (s.v / total) * c;
          const rot = -90 + (acc / total) * 360;
          acc += s.v;
          return (
            <motion.circle
              key={i}
              cx="75" cy="75" r={r}
              fill="none" stroke={s.color} strokeWidth="14"
              transform={`rotate(${rot} 75 75)`}
              initial={{ strokeDasharray: `0 ${c}` }}
              animate={{ strokeDasharray: `${dash} ${c - dash}` }}
              transition={{ duration: 0.9, delay: 0.15 + i * 0.18, ease: 'easeOut' }}
            />
          );
        })}
      </svg>
      <Box sx={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <Typography sx={{ fontSize: 34, fontWeight: 600, letterSpacing: '-0.02em', color: palette.fg }}>{total}</Typography>
        <Typography sx={{ fontFamily: palette.mono, fontSize: 11, color: palette.fgMuted, mt: 0.25, letterSpacing: '0.08em' }}>OPEN POs</Typography>
      </Box>
    </Box>
  );
}

function HeroCard({ palette }: { palette: ShopPalette }) {
  return (
    <Card palette={palette}>
      <Stack direction="row" sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography sx={{ fontSize: 18, fontWeight: 600, letterSpacing: '-0.01em', color: palette.fg }}>Delivery status</Typography>
        <Label palette={palette} size={11}>THIS MONTH</Label>
      </Stack>
      <Box sx={{ display: 'flex', justifyContent: 'center', my: 2 }}>
        <DeliveryDonut palette={palette} />
      </Box>
      <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', mt: 1 }}>
        {([
          ['DELIVERED', delivery.delivered, palette.green],
          ['IN-TRANSIT', delivery.transit, palette.amber],
          ['DELAYED', delivery.delayed, palette.redSoft],
        ] as [string, number, string][]).map(([k, v, c]) => (
          <Box key={k} sx={{ textAlign: 'center', py: 1 }}>
            <Box sx={{ width: 8, height: 8, borderRadius: 999, background: c, mx: 'auto', mb: 1 }} />
            <Typography sx={{ fontFamily: palette.mono, fontSize: 18, fontWeight: 600, color: palette.fg }}>{v}</Typography>
            <Label palette={palette} size={10} sx={{ mt: 0.5 }}>{k}</Label>
          </Box>
        ))}
      </Box>
    </Card>
  );
}

/* ── Small KPI ────────────────────────────────────────────── */
function KpiSmall({
  palette,
  label,
  value,
  sub,
  valueColor,
  icon,
}: {
  palette: ShopPalette;
  label: string;
  value: string;
  sub: string;
  valueColor: string;
  icon: ReactNode;
}) {
  return (
    <Card palette={palette} p={2.25}>
      <Stack direction="row" sx={{ justifyContent: 'space-between', alignItems: 'flex-start', gap: 1 }}>
        <Label palette={palette} fg size={10.5} sx={{ maxWidth: '74%', lineHeight: 1.25 }}>{label}</Label>
        {icon}
      </Stack>
      <Typography sx={{ fontFamily: palette.mono, fontSize: 30, fontWeight: 600, color: valueColor, mt: 2, letterSpacing: '-0.01em' }}>
        {value}
      </Typography>
      <Typography sx={{ mt: 1, fontFamily: palette.mono, fontSize: 12, color: palette.fgMuted, letterSpacing: '0.04em' }}>{sub}</Typography>
    </Card>
  );
}

/* ── Spend over time ──────────────────────────────────────── */
function SpendOverTime({ palette }: { palette: ShopPalette }) {
  const maxV = 120;
  return (
    <Card palette={palette}>
      <Stack direction="row" sx={{ justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <Box>
          <Typography sx={{ fontSize: 17, fontWeight: 600, letterSpacing: '-0.01em', color: palette.fg }}>Procurement spend</Typography>
          <Label palette={palette} size={11} sx={{ mt: 0.75 }}>LAST 8 WEEKS</Label>
        </Box>
        <Box sx={{ textAlign: 'right' }}>
          <Typography sx={{ fontFamily: palette.mono, fontSize: 24, fontWeight: 600, color: palette.fg }}>₹18.4L</Typography>
          <Box sx={{ mt: 0.5, display: 'inline-flex' }}>
            <DeltaText palette={palette} value="11% vs last 8w" toneDir="up" />
          </Box>
        </Box>
      </Stack>

      <Stack direction="row" sx={{ alignItems: 'flex-end', gap: 1, height: 140, mt: 2 }}>
        {spendOverTime.map(([k, v], i) => (
          <Stack key={k} sx={{ flex: 1, alignItems: 'center', gap: 0.75 }}>
            <Box
              component={motion.div}
              initial={{ height: 0 }}
              animate={{ height: `${(v / maxV) * 110}px` }}
              transition={{ duration: 0.6, delay: 0.1 + i * 0.06, ease: 'easeOut' }}
              sx={{ width: '100%', background: v >= 88 ? palette.amber : palette.fgDim, borderRadius: '6px' }}
            />
            <Typography sx={{ fontFamily: palette.mono, fontSize: 10, color: palette.fgMuted, letterSpacing: '0.04em' }}>{k}</Typography>
          </Stack>
        ))}
      </Stack>

      <Box sx={{ mt: 2, p: 1.75, background: palette.card2, borderRadius: '14px' }}>
        <Stack direction="row" sx={{ alignItems: 'center', gap: 1 }}>
          <Sparkle size={13} color={palette.fg} />
          <Label palette={palette} fg size={10.5}>PATTERN DETECTED</Label>
        </Stack>
        <Typography sx={{ mt: 1, fontSize: 12.5, color: palette.fgMuted, lineHeight: 1.5 }}>
          Spend is up 11% on a 9% volume rise — unit prices are creeping. Renegotiate beverage and apparel slabs this week.
        </Typography>
      </Box>
    </Card>
  );
}

/* ── Payments outstanding ─────────────────────────────────── */
function PaymentsCard({ palette }: { palette: ShopPalette }) {
  return (
    <Card palette={palette}>
      <Stack direction="row" sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography sx={{ fontSize: 17, fontWeight: 600, letterSpacing: '-0.01em', color: palette.fg }}>Payments outstanding</Typography>
        <DeltaText palette={palette} value={payments.deltaPct} toneDir="down" size={12} />
      </Stack>
      <Typography sx={{ fontFamily: palette.mono, fontSize: 32, fontWeight: 600, color: palette.fg, mt: 2, letterSpacing: '-0.02em' }}>
        {payments.total}
      </Typography>
      <Hr palette={palette} />
      <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 1.5 }}>
        {payments.buckets.map(([k, v, c]) => (
          <Box key={k}>
            <Label palette={palette} size={9.5}>{k}</Label>
            <Typography sx={{ fontFamily: palette.mono, fontSize: 15, fontWeight: 600, mt: 0.75, color: tone(palette, c) }}>{v}</Typography>
          </Box>
        ))}
      </Box>
    </Card>
  );
}

/* ── Generic share-bar list (quality / category) ─────────── */
function BarList({
  palette,
  title,
  meta,
  rows,
  barColor,
  headValue,
  headLabel,
}: {
  palette: ShopPalette;
  title: string;
  meta: string;
  rows: { label: string; pct: number; color: string; value: string }[];
  barColor?: string;
  headValue?: ReactNode;
  headLabel?: string;
}) {
  return (
    <Card palette={palette}>
      <Stack direction="row" sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography sx={{ fontSize: 17, fontWeight: 600, letterSpacing: '-0.01em', color: palette.fg }}>{title}</Typography>
        <Label palette={palette} size={11}>{meta}</Label>
      </Stack>

      {headValue && (
        <Stack direction="row" sx={{ alignItems: 'baseline', gap: 1.25, mt: 2 }}>
          {headValue}
          {headLabel && <Label palette={palette} size={10}>{headLabel}</Label>}
        </Stack>
      )}

      <Stack spacing={1.75} sx={{ mt: 2 }}>
        {rows.map((row, i) => (
          <Box key={row.label}>
            <Stack direction="row" sx={{ justifyContent: 'space-between', alignItems: 'center', gap: 1 }}>
              <Stack direction="row" sx={{ alignItems: 'center', gap: 1 }}>
                <Box sx={{ width: 8, height: 8, borderRadius: 999, background: row.color }} />
                <Typography sx={{ fontSize: 13, color: palette.fg }}>{row.label}</Typography>
              </Stack>
              <Stack direction="row" sx={{ alignItems: 'baseline', gap: 1 }}>
                <Typography sx={{ fontFamily: palette.mono, fontSize: 12, color: palette.fgMuted }}>{row.value}</Typography>
                <Typography sx={{ fontFamily: palette.mono, fontSize: 13, fontWeight: 600, color: palette.fg, width: 38, textAlign: 'right' }}>{row.pct}%</Typography>
              </Stack>
            </Stack>
            <Box sx={{ mt: 1, height: 8, borderRadius: 999, background: palette.tileSoft, overflow: 'hidden' }}>
              <Box
                component={motion.div}
                initial={{ width: 0 }}
                animate={{ width: `${row.pct}%` }}
                transition={{ duration: 0.8, delay: 0.1 + i * 0.08, ease: 'easeOut' }}
                sx={{ height: '100%', background: barColor ?? row.color, borderRadius: 999 }}
              />
            </Box>
          </Box>
        ))}
      </Stack>
    </Card>
  );
}

/* ── Vendor trust distribution ────────────────────────────── */
function VendorTrustCard({ palette }: { palette: ShopPalette }) {
  const max = 18;
  return (
    <Card palette={palette}>
      <Stack direction="row" sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography sx={{ fontSize: 17, fontWeight: 600, letterSpacing: '-0.01em', color: palette.fg }}>Vendor trust distribution</Typography>
        <Label palette={palette} size={11}>43 VENDORS</Label>
      </Stack>
      <Stack spacing={1.5} sx={{ mt: 2 }}>
        {vendorTrustDist.map(([label, v, c], i) => (
          <Stack key={label} direction="row" sx={{ alignItems: 'center', gap: 1.25 }}>
            <Label palette={palette} size={10.5} sx={{ width: 72, letterSpacing: '0.1em', fontWeight: 700 }}>{label}</Label>
            <Box sx={{ flex: 1, height: 14, borderRadius: '4px', background: palette.tileSoft, overflow: 'hidden' }}>
              <Box
                component={motion.div}
                initial={{ width: 0 }}
                animate={{ width: `${(v / max) * 100}%` }}
                transition={{ duration: 0.7, delay: 0.1 + i * 0.08, ease: 'easeOut' }}
                sx={{ height: '100%', background: tone(palette, c), borderRadius: '4px' }}
              />
            </Box>
            <Typography sx={{ fontFamily: palette.mono, fontSize: 13, fontWeight: 600, color: palette.fg, width: 24, textAlign: 'right' }}>{v}</Typography>
          </Stack>
        ))}
      </Stack>
    </Card>
  );
}

export function DashboardTab() {
  const palette = useShopPalette();
  return (
    <Stack spacing={2}>
      <Label palette={palette} size={11} sx={{ px: 0.5 }}>LAST UPDATED: 3 MIN AGO</Label>

      <HeroCard palette={palette} />

      <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1.5 }}>
        <KpiSmall
          palette={palette}
          label="ON-TIME DELIVERY"
          value="86%"
          sub="6% vs last month"
          valueColor={palette.green}
          icon={
            <Box sx={{ width: 30, height: 30, borderRadius: '10px', background: 'rgba(79,203,124,0.18)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <LocalShippingOutlinedIcon sx={{ fontSize: 14, color: palette.green }} />
            </Box>
          }
        />
        <KpiSmall
          palette={palette}
          label="QUALITY ACCEPTED"
          value="88%"
          sub="4% RETURNS RATE"
          valueColor={palette.fg}
          icon={
            <Box sx={{ width: 30, height: 30, borderRadius: '10px', background: palette.tileSoft, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <ShieldOutlinedIcon sx={{ fontSize: 14, color: palette.fg }} />
            </Box>
          }
        />
      </Box>

      <SpendOverTime palette={palette} />
      <PaymentsCard palette={palette} />

      <BarList
        palette={palette}
        title="Quality of stock received"
        meta="LAST 30 DAYS"
        headValue={
          <Typography sx={{ fontFamily: palette.mono, fontSize: 32, fontWeight: 600, color: palette.fg, letterSpacing: '-0.02em' }}>
            88<Box component="span" sx={{ fontSize: 22, color: palette.fgMuted }}>%</Box>
          </Typography>
        }
        headLabel="ACCEPTANCE"
        rows={qualityBreakdown.map(([label, pct, c], i) => ({ label, pct, color: tone(palette, c), value: qualityValues[i] }))}
      />

      <VendorTrustCard palette={palette} />

      <BarList
        palette={palette}
        title="Spend by category"
        meta="THIS MONTH"
        barColor={palette.tileAmber}
        rows={spendByCategory.map(([label, pct, value]) => ({ label, pct, color: palette.tileAmber, value }))}
      />
    </Stack>
  );
}
