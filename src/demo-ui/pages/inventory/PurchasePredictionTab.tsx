import { Box, Button, Chip, Stack, Typography } from '@mui/material';
import ShoppingCartCheckoutRoundedIcon from '@mui/icons-material/ShoppingCartCheckoutRounded';
import TrendingUpRoundedIcon from '@mui/icons-material/TrendingUpRounded';
import LocationOnRoundedIcon from '@mui/icons-material/LocationOnRounded';
import WarningAmberRoundedIcon from '@mui/icons-material/WarningAmberRounded';
import { GlassCard } from '../../components/GlassCard';
import { tokens } from '../../theme/tokens';
import type { PurchaseSuggestion } from '../../mock/data/inventoryDashboard';
import {
  purchasePredictionTop,
  purchasePredictionRising,
  purchasePredictionLocality,
} from '../../mock/data/inventoryDashboard';

const urgencyColor: Record<NonNullable<PurchaseSuggestion['urgency']>, string> = {
  high: '#EF4444',
  medium: '#F59E0B',
  low: '#3B82F6',
};

function SuggestionItem({ item }: { item: PurchaseSuggestion }) {
  return (
    <Stack
      direction="row"
      sx={{ alignItems: 'stretch', gap: 1.25, py: 1.25 }}
    >
      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Stack direction="row" sx={{ alignItems: 'center', gap: 0.75, mb: 0.25, flexWrap: 'wrap' }}>
          <Typography sx={{ fontSize: 13.5, fontWeight: 700 }} noWrap>
            {item.name}
          </Typography>
          {item.urgency && (
            <Chip
              size="small"
              label={item.urgency.toUpperCase()}
              sx={{
                height: 16,
                fontSize: 9,
                fontWeight: 800,
                letterSpacing: 0.5,
                background: urgencyColor[item.urgency],
                color: '#fff',
                '& .MuiChip-label': { px: 0.75 },
              }}
            />
          )}
        </Stack>
        <Typography sx={{ fontSize: 11, color: 'text.secondary', mb: 0.5, lineHeight: 1.35 }}>
          {item.reason}
        </Typography>
        <Stack direction="row" sx={{ gap: 1, flexWrap: 'wrap' }}>
          {item.currentStock !== undefined && (
            <Typography sx={{ fontSize: 10.5, color: 'text.disabled' }}>
              Stock: <Box component="strong" sx={{ color: 'text.primary' }}>{item.currentStock}</Box>
            </Typography>
          )}
          {item.suggestedQty !== undefined && (
            <Typography sx={{ fontSize: 10.5, color: 'text.disabled' }}>
              Suggest: <Box component="strong" sx={{ color: '#22C55E' }}>+{item.suggestedQty}</Box>
            </Typography>
          )}
          {item.meta && (
            <Typography sx={{ fontSize: 10.5, color: 'text.disabled' }}>{item.meta}</Typography>
          )}
        </Stack>
      </Box>
      {/* Design-system secondary button: white bg, black border, pill. */}
      <Stack
        direction="row"
        sx={theme => ({
          alignSelf: 'center',
          alignItems: 'center',
          gap: 0.5,
          px: 1.25,
          py: 0.5,
          borderRadius: 999,
          cursor: 'pointer',
          background: '#FFFFFF',
          border: `1px solid ${theme.palette.mode === 'dark' ? '#FFFFFF' : '#0B0F1A'}`,
          color: '#0B0F1A',
          fontWeight: 600,
          transition: 'filter .15s ease',
          '&:hover': { filter: 'brightness(0.96)' },
          flexShrink: 0,
        })}
      >
        <Typography sx={{ fontSize: 11, fontWeight: 700, color: 'inherit' }}>Procure</Typography>
      </Stack>
    </Stack>
  );
}

function SuggestionSection({
  title,
  icon,
  accent,
  prompt,
  items,
}: {
  title: string;
  icon: React.ReactNode;
  accent: string;
  prompt: string;
  items: PurchaseSuggestion[];
}) {
  return (
    <GlassCard sx={{ p: 2 }}>
      <Stack direction="row" sx={{ alignItems: 'center', gap: 1, mb: 1 }}>
        <Box
          sx={{
            width: 28,
            height: 28,
            borderRadius: 1.5,
            background: accent,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
            '& svg': { fontSize: 16 },
            flexShrink: 0,
          }}
        >
          {icon}
        </Box>
        <Typography sx={{ fontSize: 15, fontWeight: 700, flex: 1, lineHeight: 1.2 }}>
          {title}
        </Typography>
      </Stack>
      <Typography sx={{ fontSize: 11.5, color: 'text.secondary', mb: 0.5 }}>{prompt}</Typography>
      <Stack divider={<Box sx={{ height: 1, background: 'divider' }} />}>
        {items.map(item => (
          <SuggestionItem key={item.name} item={item} />
        ))}
      </Stack>
    </GlassCard>
  );
}

export function PurchasePredictionTab() {
  return (
    <Stack spacing={1.5}>
      <SuggestionSection
        title="Top 5 SKUs to purchase now"
        icon={<WarningAmberRoundedIcon />}
        accent={tokens.gradient.risk}
        prompt="Low or out of stock — high impact on sales if not restocked."
        items={purchasePredictionTop}
      />
      <SuggestionSection
        title="Predicted rising demand"
        icon={<TrendingUpRoundedIcon />}
        accent={tokens.gradient.sales}
        prompt="AI-forecasted demand spike next month based on trend and seasonality."
        items={purchasePredictionRising}
      />
      <SuggestionSection
        title="Top sellers in your locality"
        icon={<LocationOnRoundedIcon />}
        accent={tokens.gradient.inventory}
        prompt="Hot-selling SKUs across stores in your pincode that you don't carry enough of."
        items={purchasePredictionLocality}
      />
      <Stack direction="row" sx={{ justifyContent: 'center' }}>
        <Button
          startIcon={<ShoppingCartCheckoutRoundedIcon />}
          sx={{
            background: '#FFFFFF',
            color: '#0B0F1A',
            border: '1px solid #0B0F1A',
            fontWeight: 700,
            fontSize: 13,
            textTransform: 'none',
            px: 2,
            py: 0.75,
            borderRadius: 999,
            boxShadow: 'none',
            '&:hover': { background: '#FFFFFF', filter: 'brightness(0.96)', boxShadow: 'none' },
          }}
        >
          Start procurement for all
        </Button>
      </Stack>
    </Stack>
  );
}
