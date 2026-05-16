import { useMemo } from 'react';
import {
  Avatar,
  Box,
  Button,
  Chip,
  IconButton,
  LinearProgress,
  Stack,
  Typography,
} from '@mui/material';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import VerifiedRoundedIcon from '@mui/icons-material/VerifiedRounded';
import PhoneRoundedIcon from '@mui/icons-material/PhoneRounded';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import StoreRoundedIcon from '@mui/icons-material/StoreRounded';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import InsightsRoundedIcon from '@mui/icons-material/InsightsRounded';
import ShoppingBagRoundedIcon from '@mui/icons-material/ShoppingBagRounded';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import StickyNote2RoundedIcon from '@mui/icons-material/StickyNote2Rounded';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import { useNavigate, useParams } from 'react-router-dom';
import { GlassCard } from '../components/GlassCard';
import { getCustomerById, type Customer } from './mock';

function formatInr(n: number) {
  return `₹${n.toLocaleString('en-IN')}`;
}

function maskPhone(phone: string) {
  if (phone.length < 6) return phone;
  return `${phone.slice(0, 2)}••••${phone.slice(-4)}`;
}

function PageHeader({ onBack, title }: { onBack: () => void; title: string }) {
  return (
    <Stack direction="row" sx={{ alignItems: 'center', mb: 3, gap: 1.25 }}>
      <IconButton
        onClick={onBack}
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
        <Typography
          sx={{
            fontSize: 11,
            fontWeight: 800,
            letterSpacing: 0.6,
            textTransform: 'uppercase',
            color: 'text.secondary',
            lineHeight: 1,
            mb: 0.25,
          }}
        >
          KYC
        </Typography>
        <Typography
          sx={{
            fontSize: 22,
            fontWeight: 800,
            letterSpacing: -0.4,
            lineHeight: 1.1,
            color: 'text.primary',
          }}
        >
          {title}
        </Typography>
      </Box>
    </Stack>
  );
}

function SectionCard({
  icon,
  iconBg,
  iconColor,
  title,
  subtitle,
  children,
}: {
  icon: React.ReactNode;
  iconBg: string;
  iconColor: string;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <GlassCard sx={{ p: 2.5 }}>
      <Stack
        direction="row"
        spacing={1.25}
        sx={{ alignItems: 'center', mb: subtitle ? 0.5 : 1.75 }}
      >
        <Box
          sx={{
            width: 32,
            height: 32,
            borderRadius: 1.25,
            bgcolor: iconBg,
            color: iconColor,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          {icon}
        </Box>
        <Typography sx={{ fontSize: 16, fontWeight: 800, color: 'text.primary' }}>
          {title}
        </Typography>
      </Stack>
      {subtitle && (
        <Typography sx={{ fontSize: 12, color: 'text.secondary', mb: 2, ml: 5.25 }}>
          {subtitle}
        </Typography>
      )}
      {children}
    </GlassCard>
  );
}

function ProfileHeroCard({ customer }: { customer: Customer }) {
  return (
    <Box
      sx={{
        position: 'relative',
        overflow: 'hidden',
        borderRadius: 2,
        p: 3,
        background: 'linear-gradient(135deg, #FF8AB1 0%, #E5345C 100%)',
        color: '#fff',
        boxShadow: '0 14px 32px rgba(229,52,92,0.32)',
      }}
    >
      <Box
        aria-hidden
        sx={{
          position: 'absolute',
          top: -50,
          right: -50,
          width: 160,
          height: 160,
          borderRadius: '50%',
          bgcolor: 'rgba(255,255,255,0.10)',
        }}
      />
      <Box
        aria-hidden
        sx={{
          position: 'absolute',
          bottom: -40,
          left: -40,
          width: 140,
          height: 140,
          borderRadius: '50%',
          bgcolor: 'rgba(255,255,255,0.06)',
        }}
      />
      <Stack direction="row" spacing={2.25} sx={{ alignItems: 'center', position: 'relative' }}>
        <Avatar
          sx={{
            width: 68,
            height: 68,
            bgcolor: 'rgba(255,255,255,0.22)',
            color: '#fff',
            fontWeight: 800,
            fontSize: 24,
            border: '2px solid rgba(255,255,255,0.6)',
          }}
        >
          {customer.initials}
        </Avatar>
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Stack direction="row" spacing={0.75} sx={{ alignItems: 'center' }}>
            <Typography sx={{ fontSize: 19, fontWeight: 800, lineHeight: 1.2 }} noWrap>
              {customer.name}
            </Typography>
            {customer.verified && <VerifiedRoundedIcon sx={{ fontSize: 16 }} />}
          </Stack>
          <Typography sx={{ fontSize: 12, opacity: 0.85, mt: 0.25 }}>
            {customer.id}
          </Typography>
          <Stack direction="row" spacing={0.75} sx={{ alignItems: 'center', mt: 1 }}>
            <Box
              sx={{
                fontSize: 9.5,
                fontWeight: 800,
                letterSpacing: 0.5,
                textTransform: 'uppercase',
                px: 0.875,
                py: 0.25,
                borderRadius: 999,
                bgcolor: 'rgba(255,255,255,0.22)',
                color: '#fff',
              }}
            >
              {customer.tier}
            </Box>
            <Typography sx={{ fontSize: 11, opacity: 0.85 }}>
              Customer since {customer.lifetime.firstSeen}
            </Typography>
          </Stack>
        </Box>
      </Stack>

      <Stack
        direction="row"
        sx={{
          mt: 2.5,
          position: 'relative',
          flexWrap: 'wrap',
          gap: 1.5,
        }}
      >
        <Stack direction="row" spacing={0.5} sx={{ alignItems: 'center', fontSize: 12.5 }}>
          <PhoneRoundedIcon sx={{ fontSize: 14 }} />
          <Typography sx={{ fontSize: 12.5 }}>{maskPhone(customer.phone)}</Typography>
        </Stack>
        {customer.email && (
          <Stack direction="row" spacing={0.5} sx={{ alignItems: 'center', fontSize: 12.5 }}>
            <EmailRoundedIcon sx={{ fontSize: 14 }} />
            <Typography sx={{ fontSize: 12.5 }}>{customer.email}</Typography>
          </Stack>
        )}
        <Stack direction="row" spacing={0.5} sx={{ alignItems: 'center', fontSize: 12.5 }}>
          <StoreRoundedIcon sx={{ fontSize: 14 }} />
          <Typography sx={{ fontSize: 12.5 }}>{customer.lifetime.preferredStore}</Typography>
        </Stack>
      </Stack>

      <Stack direction="row" spacing={1.25} sx={{ mt: 2.5, position: 'relative' }}>
        <Button
          fullWidth
          startIcon={<WhatsAppIcon />}
          sx={{
            bgcolor: '#fff',
            color: '#E5345C',
            fontWeight: 800,
            fontSize: 13,
            textTransform: 'none',
            py: 1.125,
            borderRadius: 1.5,
            '&:hover': { bgcolor: 'rgba(255,255,255,0.92)' },
          }}
        >
          WhatsApp
        </Button>
        <Button
          fullWidth
          startIcon={<PhoneRoundedIcon />}
          sx={{
            bgcolor: 'rgba(255,255,255,0.18)',
            color: '#fff',
            fontWeight: 800,
            fontSize: 13,
            textTransform: 'none',
            py: 1.125,
            borderRadius: 1.5,
            border: '1px solid rgba(255,255,255,0.4)',
            '&:hover': { bgcolor: 'rgba(255,255,255,0.26)' },
          }}
        >
          Call
        </Button>
      </Stack>
    </Box>
  );
}

function StatTile({ label, value, accent }: { label: string; value: string; accent?: string }) {
  return (
    <Box
      sx={theme => ({
        p: 1.75,
        borderRadius: 1.75,
        bgcolor:
          theme.palette.mode === 'dark'
            ? 'rgba(255,255,255,0.04)'
            : 'rgba(11,15,26,0.03)',
        border:
          theme.palette.mode === 'dark'
            ? '1px solid rgba(255,255,255,0.06)'
            : '1px solid rgba(11,15,26,0.05)',
      })}
    >
      <Typography
        sx={{
          fontSize: 10.5,
          fontWeight: 700,
          letterSpacing: 0.4,
          textTransform: 'uppercase',
          color: 'text.disabled',
        }}
      >
        {label}
      </Typography>
      <Typography
        sx={{
          fontSize: 19,
          fontWeight: 800,
          color: accent ?? 'text.primary',
          mt: 0.5,
          lineHeight: 1.1,
        }}
      >
        {value}
      </Typography>
    </Box>
  );
}

function NotFoundState({ onBack }: { onBack: () => void }) {
  return (
    <Box sx={{ pb: 14 }}>
      <PageHeader onBack={onBack} title="Customer not found" />
      <GlassCard sx={{ p: 3 }}>
        <Typography sx={{ fontSize: 13, color: 'text.secondary' }}>
          We couldn't load that profile. Try searching again.
        </Typography>
      </GlassCard>
    </Box>
  );
}

export function CustomerProfilePage() {
  const navigate = useNavigate();
  const { customerId } = useParams<{ customerId: string }>();

  const customer = useMemo(() => (customerId ? getCustomerById(customerId) : null), [customerId]);

  if (!customer) {
    return <NotFoundState onBack={() => navigate(-1)} />;
  }

  const lifetime = customer.lifetime;

  return (
    <Box sx={{ pb: 14 }}>
      <PageHeader onBack={() => navigate(-1)} title="Customer Profile" />

      <Stack spacing={2.5}>
        <ProfileHeroCard customer={customer} />

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: 1.25,
          }}
        >
          <StatTile label="Lifetime spend" value={formatInr(lifetime.totalSpend)} accent="#16D9A4" />
          <StatTile label="Visits" value={String(lifetime.visits)} />
          <StatTile label="Avg basket" value={formatInr(lifetime.avgBasket)} />
          <StatTile label="Last visit" value={customer.lastVisit} accent="#4E8CFF" />
        </Box>

        {customer.nextBest.length > 0 && (
          <SectionCard
            icon={<AutoAwesomeIcon sx={{ fontSize: 18 }} />}
            iconBg="rgba(124,92,255,0.16)"
            iconColor="#7C5CFF"
            title={`Next best for ${customer.name.split(' ')[0]}`}
          >
            <Stack spacing={1}>
              {customer.nextBest.map(nb => (
                <Stack key={nb.id} direction="row" sx={{ alignItems: 'flex-start', gap: 1 }}>
                  <Typography sx={{ fontSize: 13, color: 'text.secondary', lineHeight: 1.6 }}>·</Typography>
                  <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Stack direction="row" sx={{ alignItems: 'baseline', gap: 1 }}>
                      <Typography
                        sx={{ fontSize: 13.5, fontWeight: 700, color: 'text.primary', flex: 1, minWidth: 0 }}
                      >
                        {nb.title}
                      </Typography>
                      {nb.priceInr > 0 && (
                        <Typography sx={{ fontSize: 13, fontWeight: 700, color: 'text.primary' }}>
                          {formatInr(nb.priceInr)}
                        </Typography>
                      )}
                    </Stack>
                    <Typography sx={{ fontSize: 11.5, color: 'text.secondary', lineHeight: 1.45 }}>
                      {nb.reason}
                    </Typography>
                  </Box>
                </Stack>
              ))}
            </Stack>
          </SectionCard>
        )}

        <SectionCard
          icon={<InsightsRoundedIcon sx={{ fontSize: 18 }} />}
          iconBg="rgba(78,140,255,0.16)"
          iconColor="#4E8CFF"
          title="Behaviour patterns"
          subtitle="Learned from past visits and purchase rhythm"
        >
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: 1.25,
            }}
          >
            {customer.behavior.map(b => (
              <Box
                key={b.id}
                sx={theme => ({
                  p: 1.75,
                  borderRadius: 1.75,
                  bgcolor:
                    theme.palette.mode === 'dark'
                      ? 'rgba(255,255,255,0.04)'
                      : 'rgba(11,15,26,0.03)',
                  border:
                    theme.palette.mode === 'dark'
                      ? '1px solid rgba(255,255,255,0.06)'
                      : '1px solid rgba(11,15,26,0.05)',
                })}
              >
                <Typography
                  sx={{
                    fontSize: 10.5,
                    fontWeight: 700,
                    letterSpacing: 0.4,
                    textTransform: 'uppercase',
                    color: 'text.disabled',
                  }}
                >
                  {b.label}
                </Typography>
                <Typography
                  sx={{
                    fontSize: 14,
                    fontWeight: 800,
                    color: b.color,
                    mt: 0.5,
                    lineHeight: 1.25,
                  }}
                >
                  {b.value}
                </Typography>
                <Typography
                  sx={{ fontSize: 11.5, color: 'text.secondary', lineHeight: 1.45, mt: 0.5 }}
                >
                  {b.hint}
                </Typography>
              </Box>
            ))}
          </Box>
        </SectionCard>

        <SectionCard
          icon={<FavoriteRoundedIcon sx={{ fontSize: 18 }} />}
          iconBg="rgba(229,52,92,0.16)"
          iconColor="#E5345C"
          title="Interests & affinities"
          subtitle="Categories this customer leans into"
        >
          <Stack spacing={1.5}>
            {customer.interests.map(i => (
              <Box key={i.id}>
                <Stack direction="row" sx={{ alignItems: 'center', mb: 0.625, gap: 1 }}>
                  <Box
                    sx={{
                      width: 8,
                      height: 8,
                      borderRadius: '50%',
                      bgcolor: i.color,
                      flexShrink: 0,
                    }}
                  />
                  <Typography
                    sx={{
                      fontSize: 14,
                      fontWeight: 600,
                      color: 'text.primary',
                      flex: 1,
                      minWidth: 0,
                    }}
                    noWrap
                  >
                    {i.label}
                  </Typography>
                  <Chip
                    label={`${i.affinity}%`}
                    size="small"
                    sx={{
                      height: 22,
                      fontSize: 11,
                      fontWeight: 800,
                      bgcolor: `${i.color}1F`,
                      color: i.color,
                      '& .MuiChip-label': { px: 1 },
                    }}
                  />
                </Stack>
                <LinearProgress
                  variant="determinate"
                  value={i.affinity}
                  sx={theme => ({
                    height: 5,
                    borderRadius: 999,
                    bgcolor:
                      theme.palette.mode === 'dark'
                        ? 'rgba(255,255,255,0.06)'
                        : 'rgba(11,15,26,0.06)',
                    '& .MuiLinearProgress-bar': {
                      borderRadius: 999,
                      bgcolor: i.color,
                    },
                  })}
                />
              </Box>
            ))}
          </Stack>

          <Typography
            sx={{
              fontSize: 10.5,
              fontWeight: 700,
              letterSpacing: 0.4,
              textTransform: 'uppercase',
              color: 'text.disabled',
              mt: 2.5,
              mb: 1.25,
            }}
          >
            Preferred brands
          </Typography>
          <Stack direction="row" spacing={0.75} sx={{ flexWrap: 'wrap', gap: 0.75 }}>
            {customer.preferredBrands.map(b => (
              <Chip
                key={b.id}
                label={`${b.name} · ${b.share}%`}
                sx={theme => ({
                  height: 28,
                  fontSize: 12,
                  fontWeight: 700,
                  bgcolor:
                    theme.palette.mode === 'dark'
                      ? 'rgba(255,255,255,0.06)'
                      : 'rgba(11,15,26,0.05)',
                  color: 'text.primary',
                  '& .MuiChip-label': { px: 1.25 },
                })}
              />
            ))}
          </Stack>
        </SectionCard>

        <SectionCard
          icon={<ShoppingBagRoundedIcon sx={{ fontSize: 18 }} />}
          iconBg="rgba(22,217,164,0.16)"
          iconColor="#16D9A4"
          title="Purchase history"
          subtitle={`${customer.purchases.length} most-recent orders · ${formatInr(lifetime.totalSpend)} lifetime`}
        >
          <Stack spacing={1.25}>
            {customer.purchases.map(p => (
              <Stack
                key={p.id}
                direction="row"
                sx={theme => ({
                  alignItems: 'center',
                  gap: 1.25,
                  p: 1.75,
                  borderRadius: 1.75,
                  bgcolor:
                    theme.palette.mode === 'dark'
                      ? 'rgba(255,255,255,0.04)'
                      : 'rgba(11,15,26,0.03)',
                  border:
                    theme.palette.mode === 'dark'
                      ? '1px solid rgba(255,255,255,0.06)'
                      : '1px solid rgba(11,15,26,0.05)',
                })}
              >
                <Box sx={{ flex: 1, minWidth: 0 }}>
                  <Typography
                    sx={{
                      fontSize: 13.5,
                      fontWeight: 700,
                      color: 'text.primary',
                    }}
                    noWrap
                  >
                    {p.topItem}
                  </Typography>
                  <Typography sx={{ fontSize: 11.5, color: 'text.secondary', mt: 0.375 }}>
                    {p.date} · {p.items} items · {p.channel}
                  </Typography>
                </Box>
                <Box sx={{ textAlign: 'right' }}>
                  <Typography sx={{ fontSize: 14, fontWeight: 800, color: 'text.primary' }}>
                    {formatInr(p.amount)}
                  </Typography>
                  <Typography sx={{ fontSize: 10.5, color: 'text.disabled', letterSpacing: 0.4 }}>
                    {p.id}
                  </Typography>
                </Box>
                <ChevronRightRoundedIcon sx={{ color: 'text.disabled', fontSize: 18 }} />
              </Stack>
            ))}
          </Stack>
        </SectionCard>

        {customer.notes && (
          <SectionCard
            icon={<StickyNote2RoundedIcon sx={{ fontSize: 18 }} />}
            iconBg="rgba(242,153,74,0.18)"
            iconColor="#F2994A"
            title="Staff notes"
          >
            <Typography sx={{ fontSize: 13.5, color: 'text.primary', lineHeight: 1.6, fontStyle: 'italic' }}>
              “{customer.notes}”
            </Typography>
          </SectionCard>
        )}
      </Stack>
    </Box>
  );
}

export default CustomerProfilePage;
