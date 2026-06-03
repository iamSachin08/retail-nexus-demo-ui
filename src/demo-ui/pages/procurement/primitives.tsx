import { Box, ButtonBase, Slide, Stack, Typography } from '@mui/material';
import AutoAwesomeRoundedIcon from '@mui/icons-material/AutoAwesomeRounded';
import ArrowUpwardRoundedIcon from '@mui/icons-material/ArrowUpwardRounded';
import ArrowDownwardRoundedIcon from '@mui/icons-material/ArrowDownwardRounded';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import type { ReactNode } from 'react';
import type { ShopPalette } from '../../theme/tokens';
import type { Mono, POStatus, PayStatus, TrustTier, ProductInsight } from './data';

/* Resolve a tone keyword (matches the ShopOS CSS-var names) to a palette color. */
export function tone(palette: ShopPalette, key: string): string {
  switch (key) {
    case 'green': return palette.green;
    case 'amber': return palette.amber;
    case 'red':
    case 'redSoft': return palette.redSoft;
    case 'tilePurple': return palette.tilePurple;
    case 'tileBlue': return palette.tileBlue;
    case 'tileGreen': return palette.tileGreen;
    case 'tileAmber': return palette.tileAmber;
    case 'fgMuted': return palette.fgMuted;
    case 'fg':
    default: return palette.fg;
  }
}

export const Sparkle = ({ size = 13, color }: { size?: number; color?: string }) => (
  <AutoAwesomeRoundedIcon sx={{ fontSize: size, color: color ?? 'inherit' }} />
);

/* ── Card surfaces ─────────────────────────────────────────── */
export function Card({
  palette,
  children,
  p = 2.75,
  sx,
}: {
  palette: ShopPalette;
  children: ReactNode;
  p?: number;
  sx?: object;
}) {
  return (
    <Box
      sx={{
        background: palette.card,
        border: `1px solid ${palette.hairline}`,
        borderRadius: '28px',
        p,
        ...sx,
      }}
    >
      {children}
    </Box>
  );
}

export function Card2({
  palette,
  children,
  sx,
}: {
  palette: ShopPalette;
  children: ReactNode;
  sx?: object;
}) {
  return (
    <Box sx={{ background: palette.card2, borderRadius: '14px', p: 1.75, ...sx }}>{children}</Box>
  );
}

export const Hr = ({ palette }: { palette: ShopPalette }) => (
  <Box sx={{ height: '1px', background: palette.hairline, my: 2 }} />
);

export function Label({
  palette,
  children,
  fg = false,
  size = 10,
  sx,
}: {
  palette: ShopPalette;
  children: ReactNode;
  fg?: boolean;
  size?: number;
  sx?: object;
}) {
  return (
    <Typography
      sx={{
        
        fontSize: size,
        color: fg ? palette.fg : palette.fgMuted,
        letterSpacing: '0.08em',
        textTransform: 'uppercase',
        fontWeight: 600,
        ...sx,
      }}
    >
      {children}
    </Typography>
  );
}

export function DeltaText({
  palette,
  value,
  toneDir = 'up',
  size = 11.5,
}: {
  palette: ShopPalette;
  value: string;
  toneDir?: 'up' | 'down';
  size?: number;
}) {
  const up = toneDir === 'up';
  return (
    <Stack
      direction="row"
      component="span"
      sx={{
        alignItems: 'center',
        gap: 0.4,
        
        fontSize: size,
        fontWeight: 500,
        color: up ? palette.green : palette.redSoft,
      }}
    >
      {up ? (
        <ArrowUpwardRoundedIcon sx={{ fontSize: size - 1 }} />
      ) : (
        <ArrowDownwardRoundedIcon sx={{ fontSize: size - 1 }} />
      )}
      {value}
    </Stack>
  );
}

/* ── Vendor monogram + thumb ──────────────────────────────── */
export function VendorMono({ mono, size = 40 }: { mono: Mono; size?: number }) {
  return (
    <Box
      sx={{
        width: size,
        height: size,
        borderRadius: `${Math.round(size / 4)}px`,
        background: mono.tint,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
        
        fontSize: size * 0.3,
        fontWeight: 700,
        color: 'rgba(255,255,255,0.95)',
        letterSpacing: '0.04em',
      }}
    >
      {mono.glyph}
    </Box>
  );
}

/* ── Trust dots (0–5) ─────────────────────────────────────── */
export function TrustDots({ score, palette }: { score: number; palette: ShopPalette }) {
  return (
    <Stack direction="row" component="span" sx={{ gap: '3px' }}>
      {[0, 1, 2, 3, 4].map(i => (
        <Box
          key={i}
          sx={{
            width: 7,
            height: 7,
            borderRadius: 999,
            background: i < Math.round(score) ? palette.green : palette.tileSoft,
          }}
        />
      ))}
    </Stack>
  );
}

/* ── Trust pill ───────────────────────────────────────────── */
export function TrustPill({
  tier,
  score,
  palette,
}: {
  tier: TrustTier;
  score?: string;
  palette: ShopPalette;
}) {
  const map: Record<TrustTier, { bg: string; fg: string }> = {
    TRUSTED: { bg: 'rgba(79,203,124,0.16)', fg: palette.green },
    STABLE: { bg: palette.chipNeutralBg, fg: palette.fg },
    NEW: { bg: 'rgba(167,123,235,0.18)', fg: palette.tilePurple },
    WATCH: { bg: 'rgba(244,169,62,0.18)', fg: palette.amber },
    BLOCKED: { bg: 'rgba(242,83,60,0.18)', fg: palette.redSoft },
  };
  const s = map[tier];
  return (
    <Box
      component="span"
      sx={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 0.75,
        
        fontSize: 10,
        letterSpacing: '0.1em',
        fontWeight: 700,
        color: s.fg,
        background: s.bg,
        px: 1,
        py: 0.5,
        borderRadius: 999,
      }}
    >
      {tier}
      {score !== undefined && <Box component="span" sx={{ opacity: 0.85 }}>{score}</Box>}
    </Box>
  );
}

/* ── Status badges ────────────────────────────────────────── */
export function POStatusBadge({ status, palette }: { status: POStatus; palette: ShopPalette }) {
  const map: Record<POStatus, { bg: string; fg: string }> = {
    DELIVERED: { bg: 'rgba(79,203,124,0.16)', fg: palette.green },
    'IN-TRANSIT': { bg: 'rgba(244,169,62,0.18)', fg: palette.amber },
    DELAYED: { bg: 'rgba(242,83,60,0.18)', fg: palette.redSoft },
    AWAITING: { bg: palette.chipNeutralBg, fg: palette.fgMuted },
    DRAFT: { bg: palette.chipNeutralBg, fg: palette.fgMuted },
  };
  const s = map[status];
  return (
    <Box
      component="span"
      sx={{
        
        fontSize: 9.5,
        letterSpacing: '0.1em',
        fontWeight: 700,
        color: s.fg,
        background: s.bg,
        px: 1,
        py: 0.5,
        borderRadius: 999,
        whiteSpace: 'nowrap',
      }}
    >
      {status}
    </Box>
  );
}

export function PayBadge({ status, palette }: { status: PayStatus; palette: ShopPalette }) {
  const map: Record<PayStatus, string> = {
    PAID: palette.green,
    PARTIAL: palette.amber,
    UNPAID: palette.redSoft,
  };
  return (
    <Box
      component="span"
      sx={{ fontSize: 9.5, letterSpacing: '0.1em', fontWeight: 700, color: map[status] }}
    >
      ● {status}
    </Box>
  );
}

/* ── Product row ──────────────────────────────────────────── */
export function ProductRow({
  item,
  palette,
}: {
  item: ProductInsight;
  palette: ShopPalette;
}) {
  return (
    <Stack
      direction="row"
      sx={{ alignItems: 'center', gap: 1.5, py: 1.5, borderBottom: `1px solid ${palette.hairline}` }}
    >
      <VendorMono mono={item.thumb} />
      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Typography
          sx={{ fontSize: 14, fontWeight: 500, color: palette.fg, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
        >
          {item.name}
        </Typography>
        <Typography
          sx={{ mt: 0.5, fontSize: 11.5, color: palette.fgMuted, letterSpacing: '0.02em' }}
        >
          {item.sub}
        </Typography>
      </Box>
      <Box sx={{ textAlign: 'right', flexShrink: 0 }}>
        <Typography sx={{ fontSize: 14.5, fontWeight: 600, color: palette.fg }}>
          {item.metric}
        </Typography>
        {item.unit && (
          <Label palette={palette} size={9.5} sx={{ mt: 0.25 }}>
            {item.unit}
          </Label>
        )}
        {item.delta && (
          <Box sx={{ mt: 0.25, display: 'inline-flex' }}>
            <DeltaText palette={palette} value={item.delta} toneDir={item.deltaTone ?? 'up'} />
          </Box>
        )}
      </Box>
    </Stack>
  );
}

/* ── AI reco strip ────────────────────────────────────────── */
export function AIRecoStrip({ items, palette }: { items: string[]; palette: ShopPalette }) {
  return (
    <Box sx={{ mt: 1.75, pt: 1.75, borderTop: `1px solid ${palette.hairline}` }}>
      <Stack direction="row" sx={{ alignItems: 'center', gap: 1, mb: 1.25 }}>
        <Sparkle size={13} color="#9CA8FF" />
        <Label palette={palette} fg size={10.5}>AI SUGGESTS</Label>
      </Stack>
      <Stack spacing={1.25}>
        {items.map((it, i) => (
          <Stack key={i} direction="row" sx={{ gap: 1, alignItems: 'flex-start' }}>
            <Box sx={{ width: 5, height: 5, borderRadius: 999, background: palette.amber, mt: 0.9, flexShrink: 0 }} />
            <Typography sx={{ fontSize: 12.5, color: palette.fgMuted, lineHeight: 1.5 }}>{it}</Typography>
          </Stack>
        ))}
      </Stack>
    </Box>
  );
}

/* ── Filter chips ─────────────────────────────────────────── */
export function FilterChips({
  filters,
  active,
  onChange,
  palette,
}: {
  filters: { key: string; label: string; count: number }[];
  active: string;
  onChange: (k: string) => void;
  palette: ShopPalette;
}) {
  return (
    <Stack
      direction="row"
      sx={{ gap: 0.75, overflowX: 'auto', pb: 0.5, '&::-webkit-scrollbar': { display: 'none' }, scrollbarWidth: 'none' }}
    >
      {filters.map(f => {
        const isActive = f.key === active;
        return (
          <ButtonBase
            key={f.key}
            onClick={() => onChange(f.key)}
            sx={{
              flexShrink: 0,
              borderRadius: 999,
              px: 1.5,
              py: 0.875,
              gap: 0.75,
              
              fontSize: 11,
              letterSpacing: '0.06em',
              fontWeight: 700,
              background: isActive ? palette.chipActiveBg : palette.chipNeutralBg,
              color: isActive ? palette.chipActiveFg : palette.chipInactiveFg,
              border: `1px solid ${palette.hairline}`,
            }}
          >
            {f.label}
            <Box
              component="span"
              sx={{
                fontSize: 10,
                opacity: isActive ? 0.7 : 0.55,
              }}
            >
              {f.count}
            </Box>
          </ButtonBase>
        );
      })}
    </Stack>
  );
}

/* ── Search bar (static, demo) ────────────────────────────── */
export function SearchBar({ placeholder, palette }: { placeholder: string; palette: ShopPalette }) {
  return (
    <Stack
      direction="row"
      sx={{ alignItems: 'center', gap: 1.25, background: palette.card2, borderRadius: '14px', px: 1.75, py: 1.5 }}
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={palette.fgMuted} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="7" />
        <path d="M20 20l-3-3" />
      </svg>
      <Typography sx={{ flex: 1, color: palette.fgMuted, fontSize: 14 }}>{placeholder}</Typography>
      <Sparkle size={16} color="#9B9BFF" />
    </Stack>
  );
}

/* ── Full-screen slide-up sheet (matches TaskDetailSheet) ──── */
export function SheetShell({
  open,
  title,
  step,
  totalSteps,
  onClose,
  children,
  footer,
  palette,
}: {
  open: boolean;
  title: string;
  step?: number;
  totalSteps?: number;
  onClose: () => void;
  children: ReactNode;
  footer?: ReactNode;
  palette: ShopPalette;
}) {
  return (
    <Slide direction="up" in={open} mountOnEnter unmountOnExit>
      <Box
        sx={{
          position: 'fixed',
          inset: 0,
          zIndex: 1300,
          background: palette.bg,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* header */}
        <Box sx={{ px: 2, pt: 2.5, pb: 1.25 }}>
          <Stack direction="row" sx={{ alignItems: 'flex-start', justifyContent: 'space-between', gap: 1.25 }}>
            <Box>
              {step && (
                <Label palette={palette} size={10.5} sx={{ color: palette.amber, letterSpacing: '0.12em' }}>
                  STEP {step} OF {totalSteps}
                </Label>
              )}
              <Typography sx={{ fontSize: 19, fontWeight: 600, letterSpacing: '-0.01em', color: palette.fg, mt: step ? 0.5 : 0 }}>
                {title}
              </Typography>
            </Box>
            <ButtonBase
              onClick={onClose}
              sx={{
                width: 34,
                height: 34,
                borderRadius: '12px',
                background: palette.card2,
                border: `1px solid ${palette.hairline}`,
                color: palette.fg,
                flexShrink: 0,
              }}
            >
              <CloseRoundedIcon sx={{ fontSize: 16 }} />
            </ButtonBase>
          </Stack>
          {step && totalSteps && (
            <Stack direction="row" sx={{ gap: 0.5, mt: 1.5 }}>
              {Array.from({ length: totalSteps }).map((_, i) => (
                <Box
                  key={i}
                  sx={{ flex: 1, height: 3, borderRadius: 999, background: i < step ? palette.amber : palette.tileSoft }}
                />
              ))}
            </Stack>
          )}
        </Box>

        {/* body */}
        <Box sx={{ flex: 1, overflowY: 'auto', px: 2, pt: 1.5, pb: 4 }}>{children}</Box>

        {/* footer */}
        {footer && (
          <Box sx={{ px: 2, pt: 1.5, pb: 3.5, borderTop: `1px solid ${palette.hairline}`, background: palette.bg }}>
            {footer}
          </Box>
        )}
      </Box>
    </Slide>
  );
}

export const ChevR = ({ palette, size = 14 }: { palette: ShopPalette; size?: number }) => (
  <ChevronRightRoundedIcon sx={{ fontSize: size, color: palette.fgMuted }} />
);

/* Pill buttons used in sheet footers. */
export function GhostButton({
  palette,
  children,
  onClick,
  sx,
}: {
  palette: ShopPalette;
  children: ReactNode;
  onClick?: () => void;
  sx?: object;
}) {
  return (
    <ButtonBase
      onClick={onClick}
      sx={{
        background: 'transparent',
        color: palette.fg,
        border: `1px solid ${palette.hairline}`,
        borderRadius: 999,
        py: 1.75,
        
        fontSize: 11.5,
        letterSpacing: '0.1em',
        fontWeight: 700,
        ...sx,
      }}
    >
      {children}
    </ButtonBase>
  );
}

export function AmberButton({
  palette,
  children,
  onClick,
  sx,
}: {
  palette: ShopPalette;
  children: ReactNode;
  onClick?: () => void;
  sx?: object;
}) {
  return (
    <ButtonBase
      onClick={onClick}
      sx={{
        background: palette.tileAmber,
        color: '#1A1A1B',
        borderRadius: 999,
        py: 1.75,
        gap: 0.75,
        
        fontSize: 11.5,
        letterSpacing: '0.1em',
        fontWeight: 700,
        ...sx,
      }}
    >
      {children}
    </ButtonBase>
  );
}
