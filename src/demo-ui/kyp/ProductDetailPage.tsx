import { Box, Button, Chip, IconButton, LinearProgress, Stack, Typography } from '@mui/material';
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
import { useNavigate, useParams } from 'react-router-dom';

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

type UspBullet = { id: string; icon: React.ReactNode; text: string };

const USP_BULLETS: UspBullet[] = [
  { id: 'filtration', icon: <VerifiedRoundedIcon fontSize="small" />, text: 'RO + UV + Mineraliser — full filtration stack in one unit' },
  { id: 'tds', icon: <WaterDropRoundedIcon fontSize="small" />, text: 'Tuned for your area (avg TDS ~480 ppm, hard-water rated)' },
  { id: 'power', icon: <BoltRoundedIcon fontSize="small" />, text: '55 W draw · ~₹38/month at local tariff' },
  { id: 'rating', icon: <StarRateRoundedIcon fontSize="small" />, text: '4.6★ from 12,400+ buyers in your city' },
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

/* Stylised water-purifier silhouette (no asset needed). */
function ProductImage() {
  return (
    <Box
      sx={{
        width: 70,
        height: 90,
        bgcolor: '#fff',
        border: '1px solid #E5E7EB',
        borderRadius: 1,
        position: 'relative',
        overflow: 'hidden',
        boxShadow: '0 2px 6px rgba(11,15,26,0.08)',
        mx: 'auto',
      }}
    >
      <Box sx={{ position: 'absolute', top: 4, left: 6, right: 6, height: 4, bgcolor: '#1F2C49', borderRadius: 0.5 }} />
      <Box
        sx={{
          position: 'absolute',
          top: 14,
          right: 6,
          bottom: 8,
          width: 22,
          bgcolor: '#1E3A8A',
          borderRadius: '4px 4px 8px 8px',
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          top: 38,
          right: 12,
          width: 10,
          height: 10,
          borderRadius: '50%',
          bgcolor: '#fff',
          border: '1.5px solid #1E3A8A',
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
      sx={{
        alignItems: 'center',
        justifyContent: 'space-between',
        bgcolor: highlighted ? '#DBEAFE' : '#F3F4F6',
        px: 2,
        py: 1.5,
        borderRadius: 1,
        cursor: onClick ? 'pointer' : 'default',
      }}
    >
      <Typography sx={{ fontSize: 15, color: '#1F2C49', fontWeight: 500 }}>{label}</Typography>
      {value !== undefined ? (
        <Typography sx={{ fontSize: 15, fontWeight: 700, color: '#2563EB' }}>{value}</Typography>
      ) : null}
      {showChevron && <ChevronRightRoundedIcon sx={{ color: '#0B0F1A', fontSize: 22 }} />}
    </Stack>
  );
}

export function ProductDetailPage() {
  const navigate = useNavigate();
  const { articleId } = useParams<{ articleId: string }>();
  const displayedArticleId = articleId?.trim() || DUMMY_PRODUCT.defaultArticleId;

  const techRows: { label: string; value: string }[] = [
    { label: 'Article Id', value: displayedArticleId },
    { label: 'Inventory', value: String(DUMMY_PRODUCT.inventory) },
    { label: 'Ean', value: DUMMY_PRODUCT.ean },
    { label: 'Brand Name', value: DUMMY_PRODUCT.brandName },
  ];

  return (
    <Box sx={{ pb: 12 }}>
      <Stack direction="row" sx={{ alignItems: 'center', mb: 2, gap: 1 }}>
        <IconButton
          onClick={() => navigate(-1)}
          size="small"
          sx={{
            width: 36,
            height: 36,
            background: 'rgba(11,15,26,0.04)',
            border: '1px solid rgba(11,15,26,0.06)',
            '&:hover': { background: 'rgba(11,15,26,0.08)' },
          }}
        >
          <ArrowBackRoundedIcon fontSize="small" />
        </IconButton>
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Typography sx={{ fontSize: 11, fontWeight: 800, letterSpacing: 0.6, textTransform: 'uppercase', color: 'text.secondary', lineHeight: 1 }}>
            KYP
          </Typography>
          <Typography sx={{ fontSize: 22, fontWeight: 800, letterSpacing: -0.4, lineHeight: 1.1 }}>
            Your Best Options
          </Typography>
        </Box>
      </Stack>

      <Stack spacing={2}>
        {/* Hero: image, title, description, price, CTA, offers, tech */}
        <Box
          sx={{
            bgcolor: '#fff',
            borderRadius: 2,
            boxShadow: '0 1px 6px rgba(11,15,26,0.08)',
            p: 2.5,
          }}
        >
          <Box sx={{ py: 1.5 }}>
            <ProductImage />
          </Box>

          <Typography sx={{ fontSize: 18, fontWeight: 800, color: '#0B0F1A', lineHeight: 1.45, mb: 0.75 }}>
            {DUMMY_PRODUCT.title}
          </Typography>
          <Typography
            sx={{
              fontSize: 13,
              fontWeight: 700,
              letterSpacing: 0.4,
              color: '#9CA3AF',
              textTransform: 'uppercase',
              mb: 1.25,
            }}
          >
            {DUMMY_PRODUCT.category}
          </Typography>
          <Typography sx={{ fontSize: 14, color: '#4B5563', lineHeight: 1.55, mb: 1.75 }}>
            {DUMMY_PRODUCT.description}
          </Typography>

          <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center', mb: 2 }}>
            <Typography sx={{ fontSize: 22, fontWeight: 800, color: '#0B0F1A' }}>
              ₹{DUMMY_PRODUCT.priceInr.toLocaleString('en-IN')}
            </Typography>
            <InventoryBadge count={DUMMY_PRODUCT.inventory} />
          </Stack>

          <Button
            fullWidth
            variant="contained"
            sx={{
              bgcolor: '#4C4DDC',
              color: '#fff',
              fontWeight: 700,
              fontSize: 16,
              py: 1.5,
              borderRadius: 1.5,
              textTransform: 'none',
              boxShadow: '0 6px 14px rgba(76,77,220,0.35)',
              '&:hover': { bgcolor: '#3F40C2' },
              mb: 2.5,
            }}
          >
            Check Availability
          </Button>

          <Typography sx={{ fontSize: 18, fontWeight: 800, color: '#0B0F1A', mb: 1 }}>Offers</Typography>
          <Stack spacing={1} sx={{ mb: 2.5 }}>
            {OFFER_ROWS.map(row => (
              <SectionRow key={row.id} label={row.label} highlighted={row.highlighted} showChevron />
            ))}
          </Stack>

          <Typography sx={{ fontSize: 18, fontWeight: 800, color: '#0B0F1A', mb: 1 }}>Type & Technology</Typography>
          <Stack spacing={1}>
            {techRows.map(row => (
              <SectionRow key={row.label} label={row.label} value={row.value} />
            ))}
          </Stack>
        </Box>

        {/* Product USP in your area */}
        <Box
          sx={{
            bgcolor: '#fff',
            borderRadius: 2,
            boxShadow: '0 1px 6px rgba(11,15,26,0.08)',
            p: 2.5,
          }}
        >
          <Stack direction="row" spacing={1} sx={{ alignItems: 'center', mb: 1.5 }}>
            <Box
              sx={{
                width: 28,
                height: 28,
                borderRadius: 1,
                bgcolor: 'rgba(124,92,255,0.12)',
                color: '#4C4DDC',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <VerifiedRoundedIcon sx={{ fontSize: 18 }} />
            </Box>
            <Typography sx={{ fontSize: 18, fontWeight: 800, color: '#0B0F1A' }}>
              Product USP in your area
            </Typography>
          </Stack>
          <Stack spacing={1}>
            {USP_BULLETS.map(bullet => (
              <Stack
                key={bullet.id}
                direction="row"
                spacing={1.25}
                sx={{
                  alignItems: 'flex-start',
                  p: 1.25,
                  borderRadius: 1.5,
                  bgcolor: '#F8F9FC',
                }}
              >
                <Box
                  sx={{
                    width: 28,
                    height: 28,
                    borderRadius: '50%',
                    bgcolor: 'rgba(124,92,255,0.10)',
                    color: '#4C4DDC',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  {bullet.icon}
                </Box>
                <Typography sx={{ fontSize: 14, color: '#1F2C49', lineHeight: 1.45, pt: 0.5 }}>
                  {bullet.text}
                </Typography>
              </Stack>
            ))}
          </Stack>
        </Box>

        {/* Best Selling Product — by area */}
        <Box
          sx={{
            bgcolor: '#fff',
            borderRadius: 2,
            boxShadow: '0 1px 6px rgba(11,15,26,0.08)',
            p: 2.5,
          }}
        >
          <Stack direction="row" spacing={1} sx={{ alignItems: 'center', mb: 0.5 }}>
            <Box
              sx={{
                width: 28,
                height: 28,
                borderRadius: 1,
                bgcolor: 'rgba(37,99,235,0.12)',
                color: '#2563EB',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <LocationOnRoundedIcon sx={{ fontSize: 18 }} />
            </Box>
            <Typography sx={{ fontSize: 18, fontWeight: 800, color: '#0B0F1A' }}>
              Best-selling areas
            </Typography>
          </Stack>
          <Typography sx={{ fontSize: 12, color: '#6B7280', mb: 1.75 }}>
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
                    <Typography sx={{ fontSize: 14, fontWeight: 600, color: '#0B0F1A', flex: 1, minWidth: 0 }} noWrap>
                      {row.area}
                    </Typography>
                    <Typography sx={{ fontSize: 13, fontWeight: 800, color: '#0B0F1A' }}>
                      {row.units}
                      <Box component="span" sx={{ fontSize: 11, fontWeight: 600, color: '#9CA3AF', ml: 0.5 }}>
                        units
                      </Box>
                    </Typography>
                  </Stack>
                  <LinearProgress
                    variant="determinate"
                    value={share}
                    sx={{
                      height: 6,
                      borderRadius: 999,
                      bgcolor: '#F3F4F6',
                      '& .MuiLinearProgress-bar': {
                        borderRadius: 999,
                        bgcolor: isTop ? '#2563EB' : '#93C5FD',
                      },
                    }}
                  />
                </Box>
              );
            })}
          </Stack>
        </Box>

        {/* High Margin Product */}
        <Box
          sx={{
            bgcolor: '#fff',
            borderRadius: 2,
            boxShadow: '0 1px 6px rgba(11,15,26,0.08)',
            p: 2.5,
          }}
        >
          <Stack direction="row" spacing={1} sx={{ alignItems: 'center', mb: 0.5 }}>
            <Box
              sx={{
                width: 28,
                height: 28,
                borderRadius: 1,
                bgcolor: 'rgba(22,163,74,0.12)',
                color: '#16A34A',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <TrendingUpRoundedIcon sx={{ fontSize: 18 }} />
            </Box>
            <Typography sx={{ fontSize: 18, fontWeight: 800, color: '#0B0F1A' }}>
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
                bgcolor: 'rgba(22,163,74,0.10)',
                color: '#16A34A',
              }}
            >
              <EmojiEventsRoundedIcon sx={{ fontSize: 12 }} />
              <Typography sx={{ fontSize: 10, fontWeight: 800, letterSpacing: 0.4 }}>TOP 15%</Typography>
            </Stack>
          </Stack>
          <Typography sx={{ fontSize: 12, color: '#6B7280', mb: 1.75 }}>
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
                sx={{
                  p: 1.25,
                  borderRadius: 1.5,
                  bgcolor: '#F8F9FC',
                  border: '1px solid #EEF0F4',
                }}
              >
                <Typography sx={{ fontSize: 10.5, fontWeight: 700, letterSpacing: 0.4, textTransform: 'uppercase', color: '#9CA3AF' }}>
                  {stat.label}
                </Typography>
                <Typography sx={{ fontSize: 18, fontWeight: 800, color: stat.accent, mt: 0.25 }}>
                  {stat.value}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>

        {/* Type of Customer */}
        <Box
          sx={{
            bgcolor: '#fff',
            borderRadius: 2,
            boxShadow: '0 1px 6px rgba(11,15,26,0.08)',
            p: 2.5,
          }}
        >
          <Stack direction="row" spacing={1} sx={{ alignItems: 'center', mb: 0.5 }}>
            <Box
              sx={{
                width: 28,
                height: 28,
                borderRadius: 1,
                bgcolor: 'rgba(249,115,22,0.12)',
                color: '#F97316',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <GroupsRoundedIcon sx={{ fontSize: 18 }} />
            </Box>
            <Typography sx={{ fontSize: 18, fontWeight: 800, color: '#0B0F1A' }}>
              Likely customers
            </Typography>
          </Stack>
          <Typography sx={{ fontSize: 12, color: '#6B7280', mb: 1.75 }}>
            Customer mix that buys this product most
          </Typography>
          <Stack spacing={1.25}>
            {CUSTOMER_PERSONAS.map(persona => (
              <Box key={persona.id}>
                <Stack direction="row" sx={{ alignItems: 'center', mb: 0.5, gap: 1 }}>
                  <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: persona.color, flexShrink: 0 }} />
                  <Typography sx={{ fontSize: 14, fontWeight: 600, color: '#0B0F1A', flex: 1, minWidth: 0 }} noWrap>
                    {persona.label}
                  </Typography>
                  <Chip
                    label={`${persona.share}%`}
                    size="small"
                    sx={{
                      height: 22,
                      fontSize: 11,
                      fontWeight: 800,
                      bgcolor: `${persona.color}1A`,
                      color: persona.color,
                      '& .MuiChip-label': { px: 1 },
                    }}
                  />
                </Stack>
                <LinearProgress
                  variant="determinate"
                  value={persona.share}
                  sx={{
                    height: 5,
                    borderRadius: 999,
                    bgcolor: '#F3F4F6',
                    '& .MuiLinearProgress-bar': {
                      borderRadius: 999,
                      bgcolor: persona.color,
                    },
                  }}
                />
              </Box>
            ))}
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
}

export default ProductDetailPage;
