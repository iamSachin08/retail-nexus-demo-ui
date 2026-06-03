import { Box, ButtonBase, Stack, Typography } from '@mui/material';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import { useMemo, useState } from 'react';
import { useShopPalette } from '../../hooks/useShopPalette';
import type { ShopPalette } from '../../theme/tokens';
import {
  AmberButton,
  Card,
  ChevR,
  FilterChips,
  GhostButton,
  Hr,
  Label,
  POStatusBadge,
  ProductRow,
  SearchBar,
  SheetShell,
  Sparkle,
  tone,
  TrustDots,
  TrustPill,
  VendorMono,
} from './primitives';
import { vendorFilters, vendorProfile, vendorRows, type VendorRow } from './data';

/* ── Vendor row ───────────────────────────────────────────── */
function VendorListRow({ v, palette, onOpen }: { v: VendorRow; palette: ShopPalette; onOpen: () => void }) {
  return (
    <ButtonBase
      onClick={onOpen}
      sx={{ width: '100%', justifyContent: 'flex-start', textAlign: 'left', gap: 1.5, py: 1.75, borderBottom: `1px solid ${palette.hairline}` }}
    >
      <VendorMono mono={v.mono} />
      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Typography sx={{ fontSize: 14, fontWeight: 500, color: palette.fg, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{v.name}</Typography>
        <Stack direction="row" sx={{ mt: 0.625, alignItems: 'center', gap: 1 }}>
          <TrustPill tier={v.tier} score={v.score} palette={palette} />
          <Label palette={palette} size={11} sx={{ letterSpacing: '0.04em' }}>{v.cat} · {v.orders} POs</Label>
        </Stack>
        <Stack direction="row" sx={{ mt: 0.75, alignItems: 'center', gap: 1.75, fontSize: 11, color: palette.fgMuted }}>
          <Box component="span"><Box component="span" sx={{ color: palette.fg }}>{v.onTime}</Box> on-time</Box>
          <Box component="span"><Box component="span" sx={{ color: palette.fg }}>{v.returns}</Box> returns</Box>
        </Stack>
      </Box>
      <Stack direction="row" sx={{ alignItems: 'center', gap: 0.75, flexShrink: 0 }}>
        <Box sx={{ textAlign: 'right' }}>
          <Typography sx={{ fontSize: 14, fontWeight: 600, color: palette.fg }}>{v.spend}</Typography>
          <Label palette={palette} size={9} sx={{ mt: 0.375 }}>LIFETIME</Label>
        </Box>
        <ChevR palette={palette} />
      </Stack>
    </ButtonBase>
  );
}

export function VendorsTab({ onOpenVendor }: { onOpenVendor: () => void }) {
  const palette = useShopPalette();
  const [filter, setFilter] = useState('ALL');
  const visible = useMemo(() => vendorRows.filter(r => (filter === 'ALL' ? true : r.tier === filter)), [filter]);

  return (
    <Stack spacing={1.75}>
      {/* Summary header */}
      <Card palette={palette}>
        <Stack direction="row" sx={{ justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <Box>
            <Label palette={palette} fg size={11}>YOUR VENDOR NETWORK</Label>
            <Typography sx={{ fontSize: 32, fontWeight: 600, color: palette.fg, mt: 1.5, letterSpacing: '-0.02em' }}>43</Typography>
            <Label palette={palette} size={11} sx={{ mt: 0.75, letterSpacing: '0.04em' }}>ACTIVE · 12 CATEGORIES</Label>
          </Box>
          <AmberButton palette={palette} sx={{ px: 1.75, py: 1.25 }}>
            <AddRoundedIcon sx={{ fontSize: 13, color: '#1A1A1B' }} /> ADD VENDOR
          </AmberButton>
        </Stack>
        <Hr palette={palette} />
        <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 1.5 }}>
          {([
            ['TRUSTED', '18', 'green'],
            ['NEW', '6', 'tilePurple'],
            ['WATCH', '4', 'amber'],
          ] as [string, string, string][]).map(([k, val, c]) => (
            <Box key={k}>
              <Label palette={palette} size={9.5}>{k}</Label>
              <Typography sx={{ fontSize: 18, fontWeight: 600, mt: 0.75, color: tone(palette, c) }}>{val}</Typography>
            </Box>
          ))}
        </Box>
      </Card>

      <SearchBar placeholder="Search vendors or category…" palette={palette} />
      <FilterChips filters={vendorFilters} active={filter} onChange={setFilter} palette={palette} />

      <Stack direction="row" sx={{ justifyContent: 'space-between', alignItems: 'center', px: 0.5 }}>
        <Label palette={palette} size={11}>{visible.length} OF 43 VENDORS</Label>
        <Stack direction="row" sx={{ alignItems: 'center', gap: 0.5 }}>
          <Label palette={palette} size={11}>SORT: TRUST</Label>
          <ChevR palette={palette} size={11} />
        </Stack>
      </Stack>

      <Card palette={palette} p={0} sx={{ px: 2.25, py: 0.5 }}>
        {visible.map(v => <VendorListRow key={v.name} v={v} palette={palette} onOpen={onOpenVendor} />)}
        {visible.length === 0 && (
          <Box sx={{ py: 5, textAlign: 'center' }}>
            <Typography sx={{ color: palette.fgMuted, fontSize: 13 }}>No vendors match this filter.</Typography>
          </Box>
        )}
      </Card>
    </Stack>
  );
}

/* ═══════════════ VENDOR PROFILE SHEET ═════════════════════════ */
export function VendorProfileSheet({ open, onClose }: { open: boolean; onClose: () => void }) {
  const palette = useShopPalette();
  const p = vendorProfile;
  return (
    <SheetShell
      open={open}
      title={p.name}
      onClose={onClose}
      palette={palette}
      footer={
        <Stack direction="row" sx={{ gap: 1.25 }}>
          <GhostButton palette={palette} sx={{ flex: 1 }}>MESSAGE</GhostButton>
          <AmberButton palette={palette} sx={{ flex: 1 }}>NEW PO</AmberButton>
        </Stack>
      }
    >
      <Stack spacing={1.75}>
        {/* hero */}
        <Card palette={palette}>
          <Stack direction="row" sx={{ alignItems: 'center', gap: 1.75 }}>
            <VendorMono mono={{ tint: p.tint, glyph: p.glyph }} size={56} />
            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Typography sx={{ fontSize: 18, fontWeight: 600, color: palette.fg }}>{p.name}</Typography>
              <Label palette={palette} size={11} sx={{ mt: 0.5, letterSpacing: '0.04em' }}>{p.sub}</Label>
              <Stack direction="row" sx={{ mt: 1, alignItems: 'center', gap: 1 }}>
                <TrustPill tier={p.tier} score={p.score} palette={palette} />
                <TrustDots score={5} palette={palette} />
              </Stack>
            </Box>
          </Stack>
          <Hr palette={palette} />
          <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 1.5 }}>
            {p.stats.map(([k, v, c]) => (
              <Box key={k}>
                <Label palette={palette} size={9.5}>{k}</Label>
                <Typography sx={{ fontSize: 18, fontWeight: 600, mt: 0.75, color: tone(palette, c) }}>{v}</Typography>
              </Box>
            ))}
          </Box>
          <Stack direction="row" sx={{ mt: 1.75, justifyContent: 'space-between' }}>
            <Label palette={palette} size={9.5}>LIFETIME SPEND</Label>
            <Typography sx={{ fontSize: 15, fontWeight: 600, color: palette.fg }}>{p.lifetimeSpend}</Typography>
          </Stack>
          <Stack direction="row" sx={{ mt: 1, justifyContent: 'space-between' }}>
            <Label palette={palette} size={9.5}>AVG PAYMENT TERMS</Label>
            <Typography sx={{ fontSize: 12, color: palette.fg }}>{p.paymentTerms}</Typography>
          </Stack>
          <Stack direction="row" sx={{ mt: 1, justifyContent: 'space-between' }}>
            <Label palette={palette} size={9.5}>FIRST PO</Label>
            <Typography sx={{ fontSize: 12, color: palette.fg }}>{p.firstPo}</Typography>
          </Stack>
        </Card>

        {/* AI note */}
        <Card palette={palette} p={2.25}>
          <Stack direction="row" sx={{ alignItems: 'center', gap: 1 }}>
            <Sparkle size={13} color={palette.fg} />
            <Label palette={palette} fg size={10.5}>AI CREDIBILITY NOTE</Label>
          </Stack>
          <Typography sx={{ mt: 1, fontSize: 13, color: palette.fgMuted, lineHeight: 1.55 }}>{p.aiNote}</Typography>
        </Card>

        {/* items supplied */}
        <Card palette={palette} p={0} sx={{ px: 2.25, pb: 1.75 }}>
          <Stack direction="row" sx={{ justifyContent: 'space-between', alignItems: 'center', pt: 1.75 }}>
            <Typography sx={{ fontSize: 15, fontWeight: 600, color: palette.fg }}>Items supplied</Typography>
            <Label palette={palette} size={11}>14 SKUs</Label>
          </Stack>
          <Box sx={{ mt: 0.5 }}>
            {p.items.map(it => <ProductRow key={it.name} item={it} palette={palette} />)}
          </Box>
        </Card>

        {/* past POs */}
        <Card palette={palette} p={0} sx={{ px: 2.25, pb: 1.75 }}>
          <Stack direction="row" sx={{ justifyContent: 'space-between', alignItems: 'center', pt: 1.75 }}>
            <Typography sx={{ fontSize: 15, fontWeight: 600, color: palette.fg }}>Past purchases</Typography>
            <Label palette={palette} size={11}>LAST 6 POs</Label>
          </Stack>
          <Box sx={{ mt: 0.5 }}>
            {p.pastPOs.map(r => (
              <Stack key={r.po} direction="row" sx={{ alignItems: 'center', gap: 1.5, py: 1.5, borderBottom: `1px solid ${palette.hairline}` }}>
                <Box sx={{ flex: 1, minWidth: 0 }}>
                  <Stack direction="row" sx={{ alignItems: 'center', gap: 1 }}>
                    <Typography sx={{ fontSize: 11, color: palette.fgMuted, letterSpacing: '0.06em', fontWeight: 600 }}>{r.po}</Typography>
                    <POStatusBadge status={r.status} palette={palette} />
                  </Stack>
                  <Typography sx={{ mt: 0.625, fontSize: 11.5, color: palette.fgMuted }}>
                    {r.date} · {r.items} items · QC <Box component="span" sx={{ color: r.quality === '—' ? palette.fgMuted : palette.green }}>{r.quality}</Box>
                  </Typography>
                </Box>
                <Typography sx={{ fontSize: 14, fontWeight: 600, color: palette.fg }}>{r.amount}</Typography>
              </Stack>
            ))}
          </Box>
        </Card>

        {/* quality history */}
        <Card palette={palette}>
          <Typography sx={{ fontSize: 15, fontWeight: 600, color: palette.fg }}>Quality history</Typography>
          <Label palette={palette} size={11} sx={{ mt: 0.75, letterSpacing: '0.04em' }}>LAST 42 DELIVERIES</Label>
          <Stack spacing={1.75} sx={{ mt: 2 }}>
            {p.qualityHistory.map(([label, pct, c, sub]) => (
              <Box key={label}>
                <Stack direction="row" sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
                  <Stack direction="row" sx={{ alignItems: 'center', gap: 1 }}>
                    <Box sx={{ width: 8, height: 8, borderRadius: 999, background: tone(palette, c) }} />
                    <Typography sx={{ fontSize: 13, color: palette.fg }}>{label}</Typography>
                  </Stack>
                  <Stack direction="row" sx={{ gap: 1, alignItems: 'baseline' }}>
                    <Typography sx={{ fontSize: 11, color: palette.fgMuted }}>{sub}</Typography>
                    <Typography sx={{ fontSize: 13, fontWeight: 600, color: palette.fg, width: 32, textAlign: 'right' }}>{pct}%</Typography>
                  </Stack>
                </Stack>
                <Box sx={{ mt: 1, height: 8, borderRadius: 999, background: palette.tileSoft, overflow: 'hidden' }}>
                  <Box sx={{ width: `${pct}%`, height: '100%', background: tone(palette, c), borderRadius: 999 }} />
                </Box>
              </Box>
            ))}
          </Stack>
        </Card>
      </Stack>
    </SheetShell>
  );
}
