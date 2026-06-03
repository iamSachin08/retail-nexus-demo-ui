import { Box, ButtonBase, Stack, Typography } from '@mui/material';
import ShieldOutlinedIcon from '@mui/icons-material/ShieldOutlined';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import PaidOutlinedIcon from '@mui/icons-material/PaidOutlined';
import WarningAmberRoundedIcon from '@mui/icons-material/WarningAmberRounded';
import StorefrontOutlinedIcon from '@mui/icons-material/StorefrontOutlined';
import type { ReactNode } from 'react';
import { useShopPalette } from '../../hooks/useShopPalette';
import type { ShopPalette } from '../../theme/tokens';
import {
  AIRecoStrip,
  Card,
  ChevR,
  DeltaText,
  Label,
  ProductRow,
  Sparkle,
  TrustDots,
  VendorMono,
} from './primitives';
import {
  aiPlan,
  costOpt,
  costOptRecos,
  marketplaceFinds,
  marketplaceRecos,
  procureNow,
  procureNowRecos,
  topVendorRecos,
  topVendors,
  vendorsToWatch,
  vendorsToWatchRecos,
  type VendorInsight,
} from './data';

/* ── AI plan summary ──────────────────────────────────────── */
function AIPlanCard({ palette, onCreate }: { palette: ShopPalette; onCreate: () => void }) {
  return (
    <Card palette={palette}>
      <Stack direction="row" sx={{ alignItems: 'center', gap: 1 }}>
        <Sparkle size={14} color={palette.fg} />
        <Label palette={palette} fg size={11}>AI PROCUREMENT PLAN · THIS WEEK</Label>
      </Stack>

      <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2, mt: 2 }}>
        <Box>
          <Typography sx={{ fontFamily: palette.mono, fontSize: 32, fontWeight: 600, color: palette.fg, letterSpacing: '-0.02em' }}>
            {aiPlan.posRecommended}
          </Typography>
          <Label palette={palette} size={10} sx={{ mt: 1 }}>POs RECOMMENDED</Label>
        </Box>
        <Box sx={{ textAlign: 'right' }}>
          <Typography sx={{ fontFamily: palette.mono, fontSize: 32, fontWeight: 600, color: palette.fg, letterSpacing: '-0.02em' }}>
            {aiPlan.projectedSpend}
          </Typography>
          <Label palette={palette} size={10} sx={{ mt: 1 }}>PROJECTED SPEND</Label>
        </Box>
      </Box>

      <Box sx={{ height: '1px', background: palette.hairline, my: 2 }} />

      <Typography sx={{ fontSize: 13, color: palette.fgMuted, lineHeight: 1.5 }}>
        Acting on this plan covers{' '}
        <Box component="span" sx={{ color: palette.green, fontWeight: 600 }}>{aiPlan.demandCoverage}%</Box> of predicted
        demand and saves an estimated{' '}
        <Box component="span" sx={{ color: palette.amber, fontWeight: 600 }}>{aiPlan.savings}</Box> via better-priced vendors.
      </Typography>

      <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1.25, mt: 2 }}>
        <ButtonBase
          sx={{
            background: 'transparent', border: `1px solid ${palette.hairline}`, color: palette.fg,
            borderRadius: 999, py: 1.5, fontFamily: palette.mono, fontSize: 11.5, letterSpacing: '0.1em', fontWeight: 600,
          }}
        >
          REVIEW
        </ButtonBase>
        <ButtonBase
          onClick={onCreate}
          sx={{
            background: palette.addBg, color: palette.addFg,
            borderRadius: 999, py: 1.5, fontFamily: palette.mono, fontSize: 11.5, letterSpacing: '0.1em', fontWeight: 600,
          }}
        >
          CREATE POs
        </ButtonBase>
      </Box>
    </Card>
  );
}

/* ── Insight card shell ───────────────────────────────────── */
function InsightCard({
  palette,
  title,
  accent,
  icon,
  recos,
  children,
}: {
  palette: ShopPalette;
  title: string;
  accent: string;
  icon: ReactNode;
  recos?: string[];
  children: ReactNode;
}) {
  return (
    <Card palette={palette}>
      <Stack direction="row" sx={{ justifyContent: 'space-between', alignItems: 'center', gap: 1.5 }}>
        <Stack direction="row" sx={{ alignItems: 'center', gap: 1.5, minWidth: 0 }}>
          <Box
            sx={{
              width: 32, height: 32, borderRadius: '10px', background: accent,
              display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', flexShrink: 0,
              '& svg': { fontSize: 16 },
            }}
          >
            {icon}
          </Box>
          <Typography
            sx={{ fontSize: 17, fontWeight: 600, letterSpacing: '-0.01em', color: palette.fg, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
          >
            {title}
          </Typography>
        </Stack>
        <ButtonBase sx={{ gap: 0.5, color: palette.fgMuted, fontFamily: palette.mono, fontSize: 11, letterSpacing: '0.06em', fontWeight: 600, flexShrink: 0 }}>
          ALL <ChevR palette={palette} size={12} />
        </ButtonBase>
      </Stack>

      <Box sx={{ mt: 1.25 }}>{children}</Box>

      {recos && <AIRecoStrip items={recos} palette={palette} />}
    </Card>
  );
}

/* ── Vendor insight row ───────────────────────────────────── */
function VendorInsightRow({ v, palette }: { v: VendorInsight; palette: ShopPalette }) {
  return (
    <Stack direction="row" sx={{ alignItems: 'center', gap: 1.5, py: 1.5, borderBottom: `1px solid ${palette.hairline}` }}>
      <VendorMono mono={v.mono} />
      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Typography sx={{ fontSize: 14, fontWeight: 500, color: palette.fg, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {v.name}
        </Typography>
        <Stack direction="row" sx={{ mt: 0.5, alignItems: 'center', gap: 1 }}>
          <TrustDots score={v.score} palette={palette} />
          <Typography sx={{ fontFamily: palette.mono, fontSize: 11.5, color: palette.fgMuted, letterSpacing: '0.02em' }}>
            {v.sub}
          </Typography>
        </Stack>
      </Box>
      <Box sx={{ textAlign: 'right', flexShrink: 0 }}>
        <Typography sx={{ fontFamily: palette.mono, fontSize: 14.5, fontWeight: 600, color: palette.fg }}>{v.metric}</Typography>
        <Label palette={palette} size={9.5} sx={{ mt: 0.25 }}>{v.unit}</Label>
        <Box sx={{ mt: 0.25, display: 'inline-flex' }}>
          <DeltaText palette={palette} value={v.delta} toneDir={v.deltaTone} />
        </Box>
      </Box>
    </Stack>
  );
}

export function InsightsTab({ onCreate }: { onCreate: () => void }) {
  const palette = useShopPalette();
  return (
    <Stack spacing={2}>
      <AIPlanCard palette={palette} onCreate={onCreate} />

      <InsightCard
        palette={palette}
        title="Top performing vendors"
        accent={palette.tileGreen}
        icon={<ShieldOutlinedIcon />}
        recos={topVendorRecos}
      >
        {topVendors.map(v => <VendorInsightRow key={v.name} v={v} palette={palette} />)}
      </InsightCard>

      <InsightCard
        palette={palette}
        title="Procure now — shortage"
        accent={palette.red}
        icon={<Inventory2OutlinedIcon />}
        recos={procureNowRecos}
      >
        {procureNow.map(p => <ProductRow key={p.name} item={p} palette={palette} />)}
      </InsightCard>

      <InsightCard
        palette={palette}
        title="Cost optimization"
        accent={palette.amber}
        icon={<PaidOutlinedIcon />}
        recos={costOptRecos}
      >
        {costOpt.map(p => <ProductRow key={p.name} item={p} palette={palette} />)}
      </InsightCard>

      <InsightCard
        palette={palette}
        title="Vendors to watch"
        accent={palette.red}
        icon={<WarningAmberRoundedIcon />}
        recos={vendorsToWatchRecos}
      >
        {vendorsToWatch.map(v => <VendorInsightRow key={v.name} v={v} palette={palette} />)}
      </InsightCard>

      <InsightCard
        palette={palette}
        title="Open marketplace"
        accent={palette.tilePurple}
        icon={<StorefrontOutlinedIcon />}
        recos={marketplaceRecos}
      >
        {marketplaceFinds.map(v => <VendorInsightRow key={v.name} v={v} palette={palette} />)}
      </InsightCard>
    </Stack>
  );
}
