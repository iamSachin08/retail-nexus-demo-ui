import { Box, Chip, IconButton, LinearProgress, Stack, Typography, type Theme } from '@mui/material';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import VerifiedRoundedIcon from '@mui/icons-material/VerifiedRounded';
import WaterDropRoundedIcon from '@mui/icons-material/WaterDropRounded';
import BoltRoundedIcon from '@mui/icons-material/BoltRounded';
import StarRateRoundedIcon from '@mui/icons-material/StarRateRounded';
import LocationOnRoundedIcon from '@mui/icons-material/LocationOnRounded';
import TrendingUpRoundedIcon from '@mui/icons-material/TrendingUpRounded';
import GroupsRoundedIcon from '@mui/icons-material/GroupsRounded';
import EmojiEventsRoundedIcon from '@mui/icons-material/EmojiEventsRounded';
import LocalOfferRoundedIcon from '@mui/icons-material/LocalOfferRounded';
import TagRoundedIcon from '@mui/icons-material/TagRounded';
import Inventory2RoundedIcon from '@mui/icons-material/Inventory2Rounded';
import QrCode2RoundedIcon from '@mui/icons-material/QrCode2Rounded';
import StorefrontRoundedIcon from '@mui/icons-material/StorefrontRounded';
import MemoryRoundedIcon from '@mui/icons-material/MemoryRounded';
import { useNavigate, useParams } from 'react-router-dom';
import productImage from './img/m324Y529Pn-pureit-waterpurifier-mineral-classic-ro-uv-491296926-i-1-1200wx1200h.avif';

const cardSx = (theme: Theme) => ({
  bgcolor:
    theme.palette.mode === 'dark'
      ? 'rgba(255,255,255,0.04)'
      : '#fff',
  border:
    theme.palette.mode === 'dark'
      ? '1px solid rgba(255,255,255,0.08)'
      : '1px solid rgba(11,15,26,0.06)',
  borderRadius: 1.5,
  boxShadow:
    theme.palette.mode === 'dark'
      ? '0 10px 30px rgba(0,0,0,0.35)'
      : '0 1px 6px rgba(11,15,26,0.08)',
  p: 2.75,
});

const subTileSx = (theme: Theme) => ({
  bgcolor:
    theme.palette.mode === 'dark'
      ? 'rgba(255,255,255,0.04)'
      : '#F8F9FC',
  border:
    theme.palette.mode === 'dark'
      ? '1px solid rgba(255,255,255,0.06)'
      : '1px solid #EEF0F4',
});

const trackBgSx = (theme: Theme) =>
  theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.08)' : '#F3F4F6';

const resolveAccent = (accent: string, theme: Theme) =>
  accent === '#0B0F1A' && theme.palette.mode === 'dark'
    ? theme.palette.text.primary
    : accent;

const resolveTint = (tint: string, theme: Theme) =>
  tint === 'rgba(11,15,26,0.06)' && theme.palette.mode === 'dark'
    ? 'rgba(255,255,255,0.08)'
    : tint;

/* Dummy product — every article ID resolves to this for now. */
const DUMMY_PRODUCT = {
  title:
    'Pureit Mineral Classic WCUX100, 6 Litres, 55 Watt, RO + UV Water Purifier, Mineralisation, Taste Enhancer, White',
  category: 'ELECT WATER PURIFIER',
  description:
    '6 L storage, RO + UV + Mineraliser filtration with taste enhancement. Tuned for hard water (TDS up to 1500 ppm) and tested for monsoon-grade contamination.',
  priceInr: 12599,
  inventory: 0,
  defaultArticleId: '491296926',
  ean: 'N/A',
  brandName: 'Pureit',
};

type OfferRow = { id: string; label: string; highlighted?: boolean };

const OFFER_ROWS: OfferRow[] = [
  { id: 'store', label: 'Store' },
  { id: 'brand', label: 'Brand' },
  { id: 'bank', label: 'Bank', highlighted: true },
  { id: 'emi', label: 'EMI' },
];

type UspBullet = {
  id: string;
  icon: React.ReactNode;
  title: string;
  detail: string;
  metric: string;
  accent: string;
  tint: string;
};

const USP_BULLETS: UspBullet[] = [
  {
    id: 'filtration',
    icon: <VerifiedRoundedIcon sx={{ fontSize: 20 }} />,
    title: 'Full filtration stack',
    detail: 'RO + UV + Mineraliser in a single unit',
    metric: '3-stage',
    accent: '#4C4DDC',
    tint: 'rgba(76,77,220,0.10)',
  },
  {
    id: 'tds',
    icon: <WaterDropRoundedIcon sx={{ fontSize: 20 }} />,
    title: 'Tuned for your area',
    detail: 'Hard-water rated up to 1500 ppm TDS',
    metric: '~480 ppm',
    accent: '#2563EB',
    tint: 'rgba(37,99,235,0.10)',
  },
  {
    id: 'power',
    icon: <BoltRoundedIcon sx={{ fontSize: 20 }} />,
    title: 'Low running cost',
    detail: 'At local tariff, ~₹38 per month',
    metric: '55 W',
    accent: '#F97316',
    tint: 'rgba(249,115,22,0.10)',
  },
  {
    id: 'rating',
    icon: <StarRateRoundedIcon sx={{ fontSize: 20 }} />,
    title: 'Loved locally',
    detail: '12,400+ buyers in your city',
    metric: '4.6★',
    accent: '#16A34A',
    tint: 'rgba(22,163,74,0.10)',
  },
];

type AreaSales = { id: string; area: string; units: number };

const BEST_SELLING_AREAS: AreaSales[] = [
  { id: 'sec22', area: 'Sector 22', units: 142 },
  { id: 'sec35', area: 'Sector 35', units: 128 },
  { id: 'iap2', area: 'Industrial Area Ph. 2', units: 96 },
  { id: 'sec8', area: 'Sector 8', units: 74 },
  { id: 'manimajra', area: 'Manimajra', units: 58 },
];

type MarginStat = { id: string; label: string; value: string; accent: string };

const MARGIN_STATS: MarginStat[] = [
  { id: 'unit', label: 'Unit margin', value: '18%', accent: '#16A34A' },
  { id: 'vs-cat', label: 'Vs. category', value: '+5 pp', accent: '#16A34A' },
  { id: 'rank', label: 'Store rank', value: '#3 / 24', accent: '#0B0F1A' },
  { id: 'trend', label: 'Trend (6 mo)', value: 'Stable', accent: '#0B0F1A' },
];

type Persona = { id: string; label: string; share: number; color: string };

const CUSTOMER_PERSONAS: Persona[] = [
  { id: 'homeowners', label: 'New homeowners', share: 32, color: '#4C4DDC' },
  { id: 'families', label: 'Young families', share: 28, color: '#16A34A' },
  { id: 'health', label: 'Health-conscious upgraders', share: 22, color: '#F97316' },
  { id: 'sme', label: 'Office / SME buyers', share: 18, color: '#2563EB' },
];

function ProductImage() {
  return (
    <Box
      sx={theme => ({
        width: '100%',
        maxWidth: 220,
        aspectRatio: '1 / 1',
        mx: 'auto',
        borderRadius: 2,
        background:
          theme.palette.mode === 'dark'
            ? 'radial-gradient(circle at 50% 45%, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0.05) 65%, rgba(255,255,255,0.02) 100%)'
            : 'radial-gradient(circle at 50% 45%, #F8FAFF 0%, #EEF2FB 65%, #E5EAF5 100%)',
        border:
          theme.palette.mode === 'dark'
            ? '1px solid rgba(255,255,255,0.08)'
            : '1px solid #EEF0F4',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      })}
    >
      <Box
        component="img"
        src={productImage}
        alt="Product"
        loading="lazy"
        sx={{
          width: '88%',
          height: '88%',
          objectFit: 'contain',
          display: 'block',
        }}
      />
    </Box>
  );
}

function InventoryBadge({ count }: { count: number }) {
  return (
    <Box
      sx={{
        display: 'inline-block',
        bgcolor: '#F97316',
        color: '#fff',
        fontSize: 13,
        fontWeight: 700,
        px: 1.5,
        py: 0.5,
        borderRadius: 999,
        lineHeight: 1.3,
      }}
    >
      {count} In Inventory
    </Box>
  );
}

function SectionRow({
  label,
  value,
  highlighted,
  showChevron,
  onClick,
}: {
  label: string;
  value?: string;
  highlighted?: boolean;
  showChevron?: boolean;
  onClick?: () => void;
}) {
  return (
    <Stack
      direction="row"
      onClick={onClick}
      sx={theme => ({
        alignItems: 'center',
        justifyContent: 'space-between',
        bgcolor: highlighted
          ? theme.palette.mode === 'dark'
            ? 'rgba(37,99,235,0.18)'
            : '#DBEAFE'
          : theme.palette.mode === 'dark'
            ? 'rgba(255,255,255,0.04)'
            : '#F3F4F6',
        border: theme.palette.mode === 'dark' ? '1px solid rgba(255,255,255,0.06)' : 'none',
        px: 2,
        py: 1.5,
        borderRadius: 1.25,
        cursor: onClick ? 'pointer' : 'default',
      })}
    >
      <Typography sx={{ fontSize: 14, color: 'text.primary', fontWeight: 600 }}>{label}</Typography>
      {value !== undefined ? (
        <Typography sx={theme => ({ fontSize: 14, fontWeight: 700, color: theme.palette.mode === 'dark' ? '#7DA8FF' : '#2563EB' })}>{value}</Typography>
      ) : null}
      {showChevron && <ChevronRightRoundedIcon sx={{ color: 'text.secondary', fontSize: 22 }} />}
    </Stack>
  );
}

export function ProductDetailPage() {
  const navigate = useNavigate();
  const { articleId } = useParams<{ articleId: string }>();
  const displayedArticleId = articleId?.trim() || DUMMY_PRODUCT.defaultArticleId;

  type TechStat = {
    id: string;
    icon: React.ReactNode;
    label: string;
    value: string;
    valueSub?: string;
    accent: string;
    tint: string;
  };

  const inventoryCount = DUMMY_PRODUCT.inventory;
  const inventoryOut = inventoryCount === 0;

  const techStats: TechStat[] = [
    {
      id: 'article-id',
      icon: <TagRoundedIcon sx={{ fontSize: 16 }} />,
      label: 'Article ID',
      value: displayedArticleId,
      accent: '#0B0F1A',
      tint: 'rgba(11,15,26,0.06)',
    },
    {
      id: 'inventory',
      icon: <Inventory2RoundedIcon sx={{ fontSize: 16 }} />,
      label: 'Inventory',
      value: `${inventoryCount} units`,
      valueSub: inventoryOut ? 'Out of stock' : 'In stock',
      accent: inventoryOut ? '#F97316' : '#16A34A',
      tint: inventoryOut ? 'rgba(249,115,22,0.10)' : 'rgba(22,163,74,0.10)',
    },
    {
      id: 'ean',
      icon: <QrCode2RoundedIcon sx={{ fontSize: 16 }} />,
      label: 'EAN',
      value: DUMMY_PRODUCT.ean,
      accent: '#0B0F1A',
      tint: 'rgba(11,15,26,0.06)',
    },
    {
      id: 'brand',
      icon: <StorefrontRoundedIcon sx={{ fontSize: 16 }} />,
      label: 'Brand',
      value: DUMMY_PRODUCT.brandName,
      accent: '#0B0F1A',
      tint: 'rgba(11,15,26,0.06)',
    },
  ];

  return (
    <Box sx={{ pb: 14 }}>
      <Stack direction="row" sx={{ alignItems: 'center', mb: 3, gap: 1.25 }}>
        <IconButton
          onClick={() => navigate(-1)}
          size="small"
          sx={theme => ({
            width: 36,
            height: 36,
            background:
              theme.palette.mode === 'dark'
                ? 'rgba(255,255,255,0.06)'
                : 'rgba(11,15,26,0.04)',
            border:
              theme.palette.mode === 'dark'
                ? '1px solid rgba(255,255,255,0.08)'
                : '1px solid rgba(11,15,26,0.06)',
            '&:hover': {
              background:
                theme.palette.mode === 'dark'
                  ? 'rgba(255,255,255,0.10)'
                  : 'rgba(11,15,26,0.08)',
            },
          })}
        >
          <ArrowBackRoundedIcon fontSize="small" />
        </IconButton>
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Typography sx={{ fontSize: 11, fontWeight: 800, letterSpacing: 0.6, textTransform: 'uppercase', color: 'text.secondary', lineHeight: 1, mb: 0.25 }}>
            KYP
          </Typography>
          <Typography sx={{ fontSize: 22, fontWeight: 800, letterSpacing: -0.4, lineHeight: 1.1, color: 'text.primary' }}>
            Your Best Options
          </Typography>
        </Box>
      </Stack>

      <Stack spacing={2.5}>
        {/* Hero: image, title, description, price, CTA */}
        <Box sx={cardSx}>
          <Box sx={{ pt: 0.5, pb: 2 }}>
            <ProductImage />
          </Box>

          <Typography sx={{ fontSize: 18, fontWeight: 800, color: 'text.primary', lineHeight: 1.45, mb: 0.75 }}>
            {DUMMY_PRODUCT.title}
          </Typography>
          <Typography
            sx={{
              fontSize: 11,
              fontWeight: 800,
              letterSpacing: 0.6,
              color: 'text.secondary',
              textTransform: 'uppercase',
              mb: 1.25,
            }}
          >
            {DUMMY_PRODUCT.category}
          </Typography>
          <Typography sx={{ fontSize: 13, color: 'text.secondary', lineHeight: 1.55, mb: 1.75 }}>
            {DUMMY_PRODUCT.description}
          </Typography>

          <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center' }}>
            <Typography sx={{ fontSize: 22, fontWeight: 800, color: 'text.primary' }}>
              ₹{DUMMY_PRODUCT.priceInr.toLocaleString('en-IN')}
            </Typography>
            <InventoryBadge count={DUMMY_PRODUCT.inventory} />
          </Stack>
        </Box>

        {/* Product USP in your area — first after hero */}
        <Box sx={cardSx}>
          <Stack direction="row" spacing={1} sx={{ alignItems: 'center', mb: 0.5 }}>
            <Box
              sx={{
                width: 28,
                height: 28,
                borderRadius: 1,
                bgcolor: 'rgba(124,92,255,0.18)',
                color: '#A5B4FC',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <VerifiedRoundedIcon sx={{ fontSize: 18 }} />
            </Box>
            <Typography sx={{ fontSize: 18, fontWeight: 800, color: 'text.primary' }}>
              Product USP in your area
            </Typography>
          </Stack>
          <Typography sx={{ fontSize: 12, color: 'text.secondary', mb: 1.75 }}>
            Why this product wins for buyers near you
          </Typography>
          <Stack spacing={1}>
            {USP_BULLETS.map(bullet => (
              <Stack
                key={bullet.id}
                direction="row"
                spacing={1.25}
                sx={theme => ({
                  alignItems: 'center',
                  p: 1.25,
                  borderRadius: 1.5,
                  ...subTileSx(theme),
                  transition: 'transform .15s ease, box-shadow .2s ease',
                  '&:hover': {
                    transform: 'translateY(-1px)',
                    boxShadow:
                      theme.palette.mode === 'dark'
                        ? '0 4px 12px rgba(0,0,0,0.45)'
                        : '0 4px 12px rgba(11,15,26,0.06)',
                  },
                })}
              >
                <Box
                  sx={{
                    width: 38,
                    height: 38,
                    borderRadius: 1.5,
                    bgcolor: bullet.tint,
                    color: bullet.accent,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  {bullet.icon}
                </Box>
                <Box sx={{ flex: 1, minWidth: 0 }}>
                  <Typography sx={{ fontSize: 13.5, fontWeight: 700, color: 'text.primary', lineHeight: 1.3 }}>
                    {bullet.title}
                  </Typography>
                  <Typography sx={{ fontSize: 12, color: 'text.secondary', lineHeight: 1.4, mt: 0.125 }}>
                    {bullet.detail}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    px: 1,
                    py: 0.375,
                    borderRadius: 999,
                    bgcolor: bullet.tint,
                    color: bullet.accent,
                    fontSize: 11,
                    fontWeight: 800,
                    letterSpacing: 0.3,
                    whiteSpace: 'nowrap',
                    flexShrink: 0,
                  }}
                >
                  {bullet.metric}
                </Box>
              </Stack>
            ))}
          </Stack>
        </Box>

        {/* Best Selling Product — by area */}
        <Box sx={cardSx}>
          <Stack direction="row" spacing={1} sx={{ alignItems: 'center', mb: 0.5 }}>
            <Box
              sx={{
                width: 28,
                height: 28,
                borderRadius: 1,
                bgcolor: 'rgba(37,99,235,0.18)',
                color: '#7DA8FF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <LocationOnRoundedIcon sx={{ fontSize: 18 }} />
            </Box>
            <Typography sx={{ fontSize: 18, fontWeight: 800, color: 'text.primary' }}>
              Best-selling areas
            </Typography>
          </Stack>
          <Typography sx={{ fontSize: 12, color: 'text.secondary', mb: 1.75 }}>
            Units sold this month · top zones
          </Typography>
          <Stack spacing={1.5}>
            {BEST_SELLING_AREAS.map((row, idx) => {
              const share = Math.round((row.units / BEST_SELLING_AREAS[0].units) * 100);
              const isTop = idx === 0;
              return (
                <Box key={row.id}>
                  <Stack direction="row" sx={{ alignItems: 'center', mb: 0.5, gap: 1 }}>
                    {isTop && (
                      <Box
                        sx={{
                          fontSize: 9,
                          fontWeight: 800,
                          letterSpacing: 0.6,
                          textTransform: 'uppercase',
                          px: 0.75,
                          py: 0.125,
                          borderRadius: 999,
                          bgcolor: '#FACC15',
                          color: '#78350F',
                        }}
                      >
                        Top
                      </Box>
                    )}
                    <Typography sx={{ fontSize: 14, fontWeight: 600, color: 'text.primary', flex: 1, minWidth: 0 }} noWrap>
                      {row.area}
                    </Typography>
                    <Typography sx={{ fontSize: 13, fontWeight: 800, color: 'text.primary' }}>
                      {row.units}
                      <Box component="span" sx={{ fontSize: 11, fontWeight: 600, color: 'text.secondary', ml: 0.5 }}>
                        units
                      </Box>
                    </Typography>
                  </Stack>
                  <LinearProgress
                    variant="determinate"
                    value={share}
                    sx={theme => ({
                      height: 6,
                      borderRadius: 999,
                      bgcolor: trackBgSx(theme),
                      '& .MuiLinearProgress-bar': {
                        borderRadius: 999,
                        bgcolor: isTop ? '#2563EB' : '#93C5FD',
                      },
                    })}
                  />
                </Box>
              );
            })}
          </Stack>
        </Box>

        {/* High Margin Product */}
        <Box sx={cardSx}>
          <Stack direction="row" spacing={1} sx={{ alignItems: 'center', mb: 0.5 }}>
            <Box
              sx={{
                width: 28,
                height: 28,
                borderRadius: 1,
                bgcolor: 'rgba(22,163,74,0.18)',
                color: '#4ADE80',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <TrendingUpRoundedIcon sx={{ fontSize: 18 }} />
            </Box>
            <Typography sx={{ fontSize: 18, fontWeight: 800, color: 'text.primary' }}>
              High-margin product
            </Typography>
            <Stack
              direction="row"
              spacing={0.25}
              sx={{
                alignItems: 'center',
                ml: 'auto',
                px: 0.75,
                py: 0.25,
                borderRadius: 999,
                bgcolor: 'rgba(22,163,74,0.18)',
                color: '#4ADE80',
              }}
            >
              <EmojiEventsRoundedIcon sx={{ fontSize: 12 }} />
              <Typography sx={{ fontSize: 10, fontWeight: 800, letterSpacing: 0.4 }}>TOP 15%</Typography>
            </Stack>
          </Stack>
          <Typography sx={{ fontSize: 12, color: 'text.secondary', mb: 1.75 }}>
            Margin profile vs. category benchmark
          </Typography>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: 1,
            }}
          >
            {MARGIN_STATS.map(stat => (
              <Box
                key={stat.id}
                sx={theme => ({
                  p: 1.25,
                  borderRadius: 1.25,
                  ...subTileSx(theme),
                })}
              >
                <Typography sx={{ fontSize: 10.5, fontWeight: 700, letterSpacing: 0.4, textTransform: 'uppercase', color: 'text.secondary' }}>
                  {stat.label}
                </Typography>
                <Typography sx={theme => ({ fontSize: 18, fontWeight: 800, color: resolveAccent(stat.accent, theme), mt: 0.25 })}>
                  {stat.value}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>

        {/* Type of Customer */}
        <Box sx={cardSx}>
          <Stack direction="row" spacing={1} sx={{ alignItems: 'center', mb: 0.5 }}>
            <Box
              sx={{
                width: 28,
                height: 28,
                borderRadius: 1,
                bgcolor: 'rgba(249,115,22,0.18)',
                color: '#FB923C',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <GroupsRoundedIcon sx={{ fontSize: 18 }} />
            </Box>
            <Typography sx={{ fontSize: 18, fontWeight: 800, color: 'text.primary' }}>
              Likely customers
            </Typography>
          </Stack>
          <Typography sx={{ fontSize: 12, color: 'text.secondary', mb: 1.75 }}>
            Customer mix that buys this product most
          </Typography>
          <Stack spacing={1.25}>
            {CUSTOMER_PERSONAS.map(persona => (
              <Box key={persona.id}>
                <Stack direction="row" sx={{ alignItems: 'center', mb: 0.5, gap: 1 }}>
                  <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: persona.color, flexShrink: 0 }} />
                  <Typography sx={{ fontSize: 14, fontWeight: 600, color: 'text.primary', flex: 1, minWidth: 0 }} noWrap>
                    {persona.label}
                  </Typography>
                  <Chip
                    label={`${persona.share}%`}
                    size="small"
                    sx={{
                      height: 22,
                      fontSize: 11,
                      fontWeight: 800,
                      bgcolor: `${persona.color}2E`,
                      color: persona.color,
                      '& .MuiChip-label': { px: 1 },
                    }}
                  />
                </Stack>
                <LinearProgress
                  variant="determinate"
                  value={persona.share}
                  sx={theme => ({
                    height: 5,
                    borderRadius: 999,
                    bgcolor: trackBgSx(theme),
                    '& .MuiLinearProgress-bar': {
                      borderRadius: 999,
                      bgcolor: persona.color,
                    },
                  })}
                />
              </Box>
            ))}
          </Stack>
        </Box>

        {/* Type & Technology */}
        <Box sx={cardSx}>
          <Stack direction="row" spacing={1} sx={{ alignItems: 'center', mb: 0.5 }}>
            <Box
              sx={{
                width: 28,
                height: 28,
                borderRadius: 1,
                bgcolor: 'rgba(255,255,255,0.10)',
                color: 'text.primary',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <MemoryRoundedIcon sx={{ fontSize: 18 }} />
            </Box>
            <Typography sx={{ fontSize: 18, fontWeight: 800, color: 'text.primary' }}>
              Type & Technology
            </Typography>
          </Stack>
          <Typography sx={{ fontSize: 12, color: 'text.secondary', mb: 1.75 }}>
            Product identifiers and stock status
          </Typography>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
              gap: 1,
            }}
          >
            {techStats.map(stat => (
              <Box
                key={stat.id}
                sx={theme => ({
                  p: 1.25,
                  borderRadius: 1.25,
                  ...subTileSx(theme),
                  minWidth: 0,
                })}
              >
                <Stack direction="row" spacing={0.75} sx={{ alignItems: 'center', mb: 0.5 }}>
                  <Box
                    sx={theme => ({
                      width: 22,
                      height: 22,
                      borderRadius: 1,
                      bgcolor: resolveTint(stat.tint, theme),
                      color: resolveAccent(stat.accent, theme),
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    })}
                  >
                    {stat.icon}
                  </Box>
                  <Typography
                    sx={{
                      fontSize: 10.5,
                      fontWeight: 700,
                      letterSpacing: 0.4,
                      textTransform: 'uppercase',
                      color: 'text.secondary',
                    }}
                  >
                    {stat.label}
                  </Typography>
                </Stack>
                <Typography
                  sx={theme => ({
                    fontSize: 15,
                    fontWeight: 800,
                    color: resolveAccent(stat.accent, theme),
                    lineHeight: 1.25,
                    wordBreak: 'break-word',
                  })}
                >
                  {stat.value}
                </Typography>
                {stat.valueSub && (
                  <Typography sx={{ fontSize: 11, color: 'text.secondary', mt: 0.25 }}>
                    {stat.valueSub}
                  </Typography>
                )}
              </Box>
            ))}
          </Box>
        </Box>

        {/* Offers — last */}
        <Box sx={cardSx}>
          <Stack direction="row" spacing={1} sx={{ alignItems: 'center', mb: 0.5 }}>
            <Box
              sx={{
                width: 28,
                height: 28,
                borderRadius: 1,
                bgcolor: 'rgba(37,99,235,0.18)',
                color: '#7DA8FF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <LocalOfferRoundedIcon sx={{ fontSize: 18 }} />
            </Box>
            <Typography sx={{ fontSize: 18, fontWeight: 800, color: 'text.primary' }}>
              Offers
            </Typography>
          </Stack>
          <Typography sx={{ fontSize: 12, color: 'text.secondary', mb: 1.75 }}>
            Live promotions you can apply at checkout
          </Typography>
          <Stack spacing={1}>
            {OFFER_ROWS.map(row => (
              <SectionRow key={row.id} label={row.label} highlighted={row.highlighted} showChevron />
            ))}
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
}

export default ProductDetailPage;
