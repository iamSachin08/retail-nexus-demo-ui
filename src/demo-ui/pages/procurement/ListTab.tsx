import { Box, ButtonBase, Stack, Typography } from '@mui/material';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import RemoveRoundedIcon from '@mui/icons-material/RemoveRounded';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import { useMemo, useState } from 'react';
import { useShopPalette } from '../../hooks/useShopPalette';
import type { ShopPalette } from '../../theme/tokens';
import {
  AmberButton,
  Card,
  Card2,
  ChevR,
  GhostButton,
  Hr,
  Label,
  PayBadge,
  POStatusBadge,
  ProductRow,
  SearchBar,
  SheetShell,
  Sparkle,
  TrustDots,
  VendorMono,
  FilterChips,
} from './primitives';
import {
  compareVendors,
  itemsLib,
  listFilters,
  poItems,
  poRows,
  trackingSteps,
  type CompareVendor,
  type LibItem,
  type PORow,
} from './data';

/* ── PO row ───────────────────────────────────────────────── */
function POListRow({ po, palette, onOpen }: { po: PORow; palette: ShopPalette; onOpen: () => void }) {
  return (
    <ButtonBase
      onClick={onOpen}
      sx={{ width: '100%', justifyContent: 'flex-start', textAlign: 'left', gap: 1.5, py: 1.75, borderBottom: `1px solid ${palette.hairline}` }}
    >
      <VendorMono mono={po.vendorMono} />
      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Stack direction="row" sx={{ alignItems: 'center', gap: 1 }}>
          <Typography sx={{ fontFamily: palette.mono, fontSize: 11, color: palette.fgMuted, letterSpacing: '0.06em', fontWeight: 600 }}>{po.po}</Typography>
          <POStatusBadge status={po.status} palette={palette} />
        </Stack>
        <Typography sx={{ mt: 0.5, fontSize: 14, fontWeight: 500, color: palette.fg, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {po.vendor}
        </Typography>
        <Stack direction="row" sx={{ mt: 0.375, alignItems: 'center', gap: 1.25, fontFamily: palette.mono, fontSize: 11.5, color: palette.fgMuted }}>
          <Box component="span">{po.items} items</Box>
          <PayBadge status={po.pay} palette={palette} />
        </Stack>
      </Box>
      <Stack direction="row" sx={{ alignItems: 'center', gap: 0.75, flexShrink: 0 }}>
        <Typography sx={{ fontFamily: palette.mono, fontSize: 14.5, fontWeight: 600, color: palette.fg }}>{po.amount}</Typography>
        <ChevR palette={palette} />
      </Stack>
    </ButtonBase>
  );
}

export function ListTab({ onCreate, onOpenDetail }: { onCreate: () => void; onOpenDetail: () => void }) {
  const palette = useShopPalette();
  const [filter, setFilter] = useState('ALL');
  const visible = useMemo(() => poRows.filter(r => (filter === 'ALL' ? true : r.status === filter)), [filter]);

  return (
    <Stack spacing={1.75}>
      {/* New procurement CTA */}
      <ButtonBase
        onClick={onCreate}
        sx={{
          justifyContent: 'space-between', gap: 1.25, width: '100%',
          background: palette.tileAmber, borderRadius: '16px', px: 2, py: 1.75, color: '#1A1A1B', textAlign: 'left',
        }}
      >
        <Stack direction="row" sx={{ alignItems: 'center', gap: 1.5 }}>
          <Box sx={{ width: 32, height: 32, borderRadius: '10px', background: 'rgba(0,0,0,0.16)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <AddRoundedIcon sx={{ fontSize: 18, color: '#1A1A1B' }} />
          </Box>
          <Box>
            <Typography sx={{ fontSize: 14, fontWeight: 600 }}>New procurement</Typography>
            <Typography sx={{ fontSize: 11.5, fontFamily: palette.mono, letterSpacing: '0.04em', opacity: 0.78 }}>
              AI will suggest qty, vendors &amp; PO
            </Typography>
          </Box>
        </Stack>
        <ChevR palette={palette} />
      </ButtonBase>

      <SearchBar placeholder="Search by PO# or vendor…" palette={palette} />
      <FilterChips filters={listFilters} active={filter} onChange={setFilter} palette={palette} />

      <Stack direction="row" sx={{ justifyContent: 'space-between', alignItems: 'center', px: 0.5 }}>
        <Label palette={palette} size={11}>{visible.length} OF 57 ORDERS</Label>
        <Stack direction="row" sx={{ alignItems: 'center', gap: 0.5 }}>
          <Label palette={palette} size={11}>SORT: NEWEST</Label>
          <ChevR palette={palette} size={11} />
        </Stack>
      </Stack>

      <Card palette={palette} p={0} sx={{ px: 2.25, py: 0.5 }}>
        {visible.map(r => <POListRow key={r.po} po={r} palette={palette} onOpen={onOpenDetail} />)}
        {visible.length === 0 && (
          <Box sx={{ py: 5, textAlign: 'center' }}>
            <Typography sx={{ color: palette.fgMuted, fontSize: 13 }}>No orders match this filter.</Typography>
          </Box>
        )}
      </Card>
    </Stack>
  );
}

/* ═══════════════ NEW PROCUREMENT SHEET (3 steps) ══════════════ */
function Step1Item({
  palette,
  item,
  setItem,
  qty,
  setQty,
}: {
  palette: ShopPalette;
  item: LibItem;
  setItem: (i: LibItem) => void;
  qty: number;
  setQty: (n: number) => void;
}) {
  return (
    <Stack spacing={1.75}>
      <SearchBar placeholder="Search SKUs…" palette={palette} />
      <Label palette={palette} size={11} sx={{ px: 0.5 }}>AI-SUGGESTED · LOW STOCK &amp; PREDICTED DEMAND</Label>

      <Card palette={palette} p={0.75}>
        {itemsLib.map(it => {
          const selected = item.id === it.id;
          return (
            <ButtonBase
              key={it.id}
              onClick={() => { setItem(it); setQty(it.aiQty); }}
              sx={{
                width: '100%', justifyContent: 'flex-start', textAlign: 'left', gap: 1.5, px: 1.5, py: 1.5, my: '2px',
                borderRadius: '12px',
                background: selected ? 'rgba(242,168,71,0.08)' : 'transparent',
                border: selected ? '1px solid rgba(242,168,71,0.55)' : '1px solid transparent',
              }}
            >
              <VendorMono mono={it.thumb} />
              <Box sx={{ flex: 1, minWidth: 0 }}>
                <Typography sx={{ fontSize: 14, fontWeight: 500, color: palette.fg, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{it.name}</Typography>
                <Typography sx={{ mt: 0.5, fontFamily: palette.mono, fontSize: 11.5, color: palette.fgMuted }}>{it.sub} · {it.stock}</Typography>
              </Box>
              <Box sx={{ fontFamily: palette.mono, fontSize: 11, color: palette.amber, fontWeight: 700, background: 'rgba(242,168,71,0.14)', px: 1, py: 0.5, borderRadius: 999, whiteSpace: 'nowrap' }}>
                AI {it.aiQty}
              </Box>
            </ButtonBase>
          );
        })}
      </Card>

      <Card palette={palette}>
        <Label palette={palette} size={13} sx={{ letterSpacing: '0.04em' }}>QUANTITY</Label>
        <Stack direction="row" sx={{ alignItems: 'center', justifyContent: 'space-between', gap: 1.75, mt: 1.75 }}>
          <ButtonBase
            onClick={() => setQty(Math.max(1, qty - 1))}
            sx={{ width: 44, height: 44, borderRadius: '12px', background: palette.card2, border: `1px solid ${palette.hairline}`, color: palette.fg }}
          >
            <RemoveRoundedIcon sx={{ fontSize: 18 }} />
          </ButtonBase>
          <Box sx={{ textAlign: 'center', flex: 1 }}>
            <Typography sx={{ fontFamily: palette.mono, fontSize: 44, fontWeight: 600, color: palette.fg, letterSpacing: '-0.02em' }}>{qty}</Typography>
            <Label palette={palette} size={10} sx={{ mt: 0.75 }}>UNITS</Label>
          </Box>
          <ButtonBase
            onClick={() => setQty(qty + 1)}
            sx={{ width: 44, height: 44, borderRadius: '12px', background: palette.card2, border: `1px solid ${palette.hairline}`, color: palette.fg }}
          >
            <AddRoundedIcon sx={{ fontSize: 18 }} />
          </ButtonBase>
        </Stack>

        <Card2 palette={palette} sx={{ mt: 2 }}>
          <Stack direction="row" sx={{ alignItems: 'center', gap: 1 }}>
            <Sparkle size={13} color={palette.fg} />
            <Label palette={palette} fg size={10.5}>AI BASIS</Label>
          </Stack>
          <Typography sx={{ mt: 0.75, fontSize: 12.5, color: palette.fgMuted, lineHeight: 1.5 }}>
            Suggested <Box component="b" sx={{ color: palette.amber }}>{item.aiQty}</Box> · {item.basis}.
          </Typography>
        </Card2>

        <Stack direction="row" sx={{ mt: 1.75, justifyContent: 'space-between', fontFamily: palette.mono, fontSize: 12, color: palette.fgMuted, letterSpacing: '0.04em' }}>
          <Box component="span">EST. UNIT COST</Box>
          <Box component="span" sx={{ color: palette.fg }}>{item.unit}</Box>
        </Stack>
      </Card>
    </Stack>
  );
}

function Step2Vendor({
  palette,
  item,
  qty,
  vendorId,
  setVendorId,
}: {
  palette: ShopPalette;
  item: LibItem;
  qty: number;
  vendorId: string;
  setVendorId: (id: string) => void;
}) {
  return (
    <Stack spacing={1.75}>
      <Card2 palette={palette} sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
        <VendorMono mono={item.thumb} />
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Typography sx={{ fontSize: 14, fontWeight: 500, color: palette.fg, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.name}</Typography>
          <Label palette={palette} size={11.5} sx={{ mt: 0.375, letterSpacing: '0.04em' }}>QTY {qty} · {item.unit}</Label>
        </Box>
      </Card2>

      <Card palette={palette} p={2}>
        <Stack direction="row" sx={{ alignItems: 'center', gap: 1 }}>
          <Sparkle size={14} color={palette.fg} />
          <Label palette={palette} fg size={11}>AI RECOMMENDATION</Label>
        </Stack>
        <Typography sx={{ mt: 1, fontSize: 13, color: palette.fgMuted, lineHeight: 1.5 }}>
          <Box component="span" sx={{ color: palette.amber, fontWeight: 600 }}>Surya Agencies</Box> is the best pick — fastest SLA (1 day),
          top quality (98%), 4.6% below your last unit price. Greenleaf is 2.5% cheaper but unproven.
        </Typography>
      </Card>

      <Label palette={palette} size={11} sx={{ px: 0.5 }}>COMPARE · 3 MAPPED + 1 MARKETPLACE</Label>

      <Stack spacing={1.25}>
        {compareVendors.map(v => {
          const isSel = vendorId === v.id;
          return (
            <ButtonBase
              key={v.id}
              onClick={() => setVendorId(v.id)}
              sx={{
                display: 'block', textAlign: 'left', position: 'relative', borderRadius: '22px', p: 2.25,
                background: isSel ? 'rgba(242,168,71,0.06)' : palette.card,
                border: isSel ? '1px solid rgba(242,168,71,0.55)' : `1px solid ${palette.hairline}`,
              }}
            >
              {v.aiPick && (
                <Box sx={{ position: 'absolute', top: 12, right: 12, display: 'inline-flex', alignItems: 'center', gap: 0.5, fontFamily: palette.mono, fontSize: 9.5, letterSpacing: '0.1em', fontWeight: 700, color: '#1A1A1B', background: palette.tileAmber, px: 1, py: 0.5, borderRadius: 999 }}>
                  <Sparkle size={10} color="#1A1A1B" /> AI PICK
                </Box>
              )}
              <Stack direction="row" sx={{ alignItems: 'center', gap: 1.5 }}>
                <VendorMono mono={v.mono} />
                <Box sx={{ flex: 1, minWidth: 0 }}>
                  <Typography sx={{ fontSize: 15, fontWeight: 600, color: palette.fg, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{v.name}</Typography>
                  <Stack direction="row" sx={{ mt: 0.5, alignItems: 'center', gap: 1 }}>
                    <TrustDots score={v.trust} palette={palette} />
                    <Label palette={palette} size={10.5}>{v.tag}</Label>
                  </Stack>
                </Box>
              </Stack>
              <Box sx={{ mt: 1.75, display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 1.25 }}>
                <VendorMetric palette={palette} label="COST/U" value={v.cost} note={v.costDelta} noteColor={v.costDelta.startsWith('−') ? palette.green : palette.redSoft} />
                <VendorMetric palette={palette} label="DELIVERY" value={v.eta} note={v.etaNote} />
                <VendorMetric palette={palette} label="QUALITY" value={v.quality} note={v.qualityNote} />
              </Box>
            </ButtonBase>
          );
        })}
      </Stack>
    </Stack>
  );
}

function VendorMetric({ palette, label, value, note, noteColor }: { palette: ShopPalette; label: string; value: string; note: string; noteColor?: string }) {
  return (
    <Box>
      <Label palette={palette} size={9.5}>{label}</Label>
      <Typography sx={{ fontFamily: palette.mono, fontSize: 15, fontWeight: 600, color: palette.fg, mt: 0.5 }}>{value}</Typography>
      <Typography sx={{ mt: 0.25, fontFamily: palette.mono, fontSize: 10.5, color: noteColor ?? palette.fgMuted }}>{note}</Typography>
    </Box>
  );
}

function Step3Review({ palette, item, qty, vendor }: { palette: ShopPalette; item: LibItem; qty: number; vendor: CompareVendor }) {
  const unit = parseInt(vendor.cost.replace(/[^0-9]/g, ''), 10);
  const total = unit * qty;
  const totalStr = total >= 100000 ? `₹${(total / 100000).toFixed(2)}L` : `₹${total.toLocaleString('en-IN')}`;
  const row = (label: string, value: string) => (
    <Stack direction="row" sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
      <Label palette={palette} size={10}>{label}</Label>
      <Typography sx={{ fontFamily: palette.mono, fontSize: 14, fontWeight: 600, color: palette.fg }}>{value}</Typography>
    </Stack>
  );

  return (
    <Stack spacing={1.75}>
      <Card palette={palette}>
        <Label palette={palette} size={10}>VENDOR</Label>
        <Stack direction="row" sx={{ mt: 1.25, alignItems: 'center', gap: 1.5 }}>
          <VendorMono mono={vendor.mono} />
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Typography sx={{ fontSize: 15, fontWeight: 600, color: palette.fg }}>{vendor.name}</Typography>
            <Label palette={palette} size={10.5} sx={{ mt: 0.5 }}>{vendor.tag}</Label>
          </Box>
        </Stack>
        <Hr palette={palette} />
        <Label palette={palette} size={10}>ITEM</Label>
        <Stack direction="row" sx={{ mt: 1.25, alignItems: 'center', gap: 1.5 }}>
          <VendorMono mono={item.thumb} />
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Typography sx={{ fontSize: 14, fontWeight: 500, color: palette.fg }}>{item.name}</Typography>
            <Label palette={palette} size={11} sx={{ mt: 0.375 }}>{item.sub}</Label>
          </Box>
          <Typography sx={{ fontFamily: palette.mono, fontSize: 16, fontWeight: 600, color: palette.fg }}>×{qty}</Typography>
        </Stack>
      </Card>

      <Card palette={palette}>
        <Stack spacing={1.25}>
          {row('UNIT COST', vendor.cost)}
          {row('QUANTITY', `${qty} units`)}
          {row('TAX (GST 5%)', `₹${Math.round(total * 0.05).toLocaleString('en-IN')}`)}
        </Stack>
        <Hr palette={palette} />
        <Stack direction="row" sx={{ justifyContent: 'space-between', alignItems: 'baseline' }}>
          <Typography sx={{ fontSize: 14, fontWeight: 500, color: palette.fg }}>Total payable</Typography>
          <Typography sx={{ fontFamily: palette.mono, fontSize: 26, fontWeight: 600, color: palette.fg, letterSpacing: '-0.02em' }}>{totalStr}</Typography>
        </Stack>
      </Card>

      <Card palette={palette}>
        <Label palette={palette} size={10}>DELIVER TO</Label>
        <Typography sx={{ mt: 1.25, fontSize: 14, fontWeight: 500, color: palette.fg }}>Whitefield Store · Main Outlet</Typography>
        <Label palette={palette} size={11.5} sx={{ mt: 0.5, textTransform: 'none', letterSpacing: '0.02em' }}>42 ITPL Road, Whitefield, Bengaluru 560066</Label>
        <Hr palette={palette} />
        <Label palette={palette} size={10}>PAYMENT</Label>
        <Stack direction="row" sx={{ mt: 1.25, alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography sx={{ fontSize: 14, fontWeight: 500, color: palette.fg }}>Net-15 terms · UPI</Typography>
          <Label palette={palette} size={11.5} sx={{ color: palette.green, fontWeight: 700 }}>EDIT</Label>
        </Stack>
      </Card>

      <Card2 palette={palette}>
        <Stack direction="row" sx={{ alignItems: 'center', gap: 1 }}>
          <Sparkle size={13} color={palette.fg} />
          <Label palette={palette} fg size={10.5}>AI PRE-CHECK</Label>
        </Stack>
        <Typography sx={{ mt: 1, fontSize: 12.5, color: palette.fgMuted, lineHeight: 1.5 }}>
          PO total within May budget. Vendor SLA fits stock-out window. No duplicate open POs for this SKU.
        </Typography>
      </Card2>
    </Stack>
  );
}

export function NewProcurementSheet({
  open,
  step,
  onStep,
  onClose,
}: {
  open: boolean;
  step: number;
  onStep: (n: number) => void;
  onClose: () => void;
}) {
  const palette = useShopPalette();
  const [item, setItem] = useState<LibItem>(itemsLib[0]);
  const [qty, setQty] = useState(itemsLib[0].aiQty);
  const [vendorId, setVendorId] = useState('SA');
  const vendor = compareVendors.find(v => v.id === vendorId) ?? compareVendors[0];

  const titles: Record<number, string> = { 1: 'Select item & quantity', 2: 'Choose vendor', 3: 'Review & create PO' };
  const cta = step === 3 ? 'CREATE PO & SEND' : step === 2 ? 'CONTINUE' : 'NEXT · COMPARE VENDORS';

  const next = () => (step < 3 ? onStep(step + 1) : onClose());
  const back = () => (step > 1 ? onStep(step - 1) : onClose());

  return (
    <SheetShell
      open={open}
      title={titles[step]}
      step={step}
      totalSteps={3}
      onClose={onClose}
      palette={palette}
      footer={
        <Stack direction="row" sx={{ gap: 1.25 }}>
          <GhostButton palette={palette} onClick={back} sx={{ flex: '0 0 38%' }}>
            {step === 1 ? 'CANCEL' : 'BACK'}
          </GhostButton>
          <AmberButton palette={palette} onClick={next} sx={{ flex: 1 }}>
            {step === 3 && <Sparkle size={13} color="#1A1A1B" />}
            {cta}
          </AmberButton>
        </Stack>
      }
    >
      {step === 1 && <Step1Item palette={palette} item={item} setItem={setItem} qty={qty} setQty={setQty} />}
      {step === 2 && <Step2Vendor palette={palette} item={item} qty={qty} vendorId={vendorId} setVendorId={setVendorId} />}
      {step === 3 && <Step3Review palette={palette} item={item} qty={qty} vendor={vendor} />}
    </SheetShell>
  );
}

/* ═══════════════ PO TRACKING SHEET ════════════════════════════ */
function TrackingStep({ palette, step, last }: { palette: ShopPalette; step: (typeof trackingSteps)[number]; last: boolean }) {
  const dotColor = step.done ? palette.green : step.active ? palette.amber : palette.tileSoft;
  const textColor = step.done || step.active ? palette.fg : palette.fgMuted;
  return (
    <Stack direction="row" sx={{ gap: 1.5, alignItems: 'flex-start' }}>
      <Stack sx={{ alignItems: 'center', pt: '2px' }}>
        <Box sx={{ width: 18, height: 18, borderRadius: 999, background: dotColor, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          {step.done && <CheckRoundedIcon sx={{ fontSize: 11, color: palette.bg }} />}
        </Box>
        {!last && <Box sx={{ width: '2px', flex: 1, minHeight: 22, background: palette.tileSoft, mt: 0.5 }} />}
      </Stack>
      <Box sx={{ pb: 2.25, flex: 1 }}>
        <Typography sx={{ fontSize: 13, fontWeight: 500, color: textColor }}>{step.label}</Typography>
        <Label palette={palette} size={11} sx={{ mt: 0.5, textTransform: 'none', letterSpacing: '0.04em' }}>{step.sub}</Label>
      </Box>
    </Stack>
  );
}

export function ProcurementDetailSheet({ open, onClose }: { open: boolean; onClose: () => void }) {
  const palette = useShopPalette();
  return (
    <SheetShell
      open={open}
      title="PO-2086 · Surya Agencies"
      onClose={onClose}
      palette={palette}
      footer={
        <Stack direction="row" sx={{ gap: 1.25 }}>
          <GhostButton palette={palette} sx={{ flex: 1 }}>MESSAGE VENDOR</GhostButton>
          <ButtonBase sx={{ flex: 1, background: palette.addBg, color: palette.addFg, borderRadius: 999, py: 1.75, fontFamily: palette.mono, fontSize: 11.5, letterSpacing: '0.1em', fontWeight: 700 }}>
            PAY ₹34K
          </ButtonBase>
        </Stack>
      }
    >
      <Stack spacing={1.75}>
        <Card palette={palette}>
          <Stack direction="row" sx={{ justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <Box>
              <POStatusBadge status="IN-TRANSIT" palette={palette} />
              <Typography sx={{ mt: 1.5, fontSize: 18, fontWeight: 600, color: palette.fg }}>Arriving Tomorrow</Typography>
              <Label palette={palette} size={11.5} sx={{ mt: 0.5, letterSpacing: '0.04em' }}>EST. MAY 19 · 4:00–6:00 PM</Label>
            </Box>
            <Box sx={{ textAlign: 'right' }}>
              <Typography sx={{ fontFamily: palette.mono, fontSize: 26, fontWeight: 600, color: palette.fg, letterSpacing: '-0.02em' }}>₹68K</Typography>
              <PayBadge status="PARTIAL" palette={palette} />
            </Box>
          </Stack>
          <Hr palette={palette} />
          {trackingSteps.map((s, i) => (
            <TrackingStep key={s.label} palette={palette} step={s} last={i === trackingSteps.length - 1} />
          ))}
        </Card>

        <Card palette={palette} p={0} sx={{ px: 2.25, pb: 1.75 }}>
          <Stack direction="row" sx={{ justifyContent: 'space-between', alignItems: 'center', pt: 1.75 }}>
            <Typography sx={{ fontSize: 15, fontWeight: 600, color: palette.fg }}>Items in PO</Typography>
            <Label palette={palette} size={11}>6 SKUS</Label>
          </Stack>
          <Box sx={{ mt: 0.5 }}>
            {poItems.map(p => <ProductRow key={p.name} item={p} palette={palette} />)}
          </Box>
        </Card>

        <Card palette={palette}>
          <Stack direction="row" sx={{ alignItems: 'center', gap: 1 }}>
            <Sparkle size={13} color={palette.fg} />
            <Label palette={palette} fg size={10.5}>AI POST-PO MONITORING</Label>
          </Stack>
          <Typography sx={{ mt: 1.25, fontSize: 13, color: palette.fgMuted, lineHeight: 1.5 }}>
            Surya delivered <Box component="b" sx={{ color: palette.green }}>98%</Box> on-time across the last 42 POs with zero rejections on
            grocery lots. Expect a clean receipt — no quality flags raised.
          </Typography>
        </Card>
      </Stack>
    </SheetShell>
  );
}
