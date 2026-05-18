import { Box, Chip, InputBase, Stack, Typography } from '@mui/material';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import { useMemo, useState } from 'react';
import {
  categoryColor,
  products,
  stockStatus,
  stockStatusColor,
  stockStatusLabel,
} from '../../mock/data/inventoryDashboard';
import type {
  Product,
  ProductCategory,
  ProductStockStatus,
} from '../../mock/data/inventoryDashboard';
import { tokens } from '../../theme/tokens';

const formatINR = (n: number): string => {
  if (n >= 100000) return `₹${(n / 100000).toFixed(1)}L`;
  if (n >= 1000) return `₹${(n / 1000).toFixed(1)}K`;
  return `₹${n}`;
};

type StockFilter = 'All' | ProductStockStatus;
type CategoryFilter = 'All' | ProductCategory;

const STOCK_FILTERS: StockFilter[] = ['All', 'in-stock', 'low-stock', 'out-of-stock'];
const CATEGORY_FILTERS: CategoryFilter[] = ['All', 'Apparel', 'Footwear', 'Accessories', 'Bags'];

function ProductRow({ product }: { product: Product }) {
  const status = stockStatus(product);
  const statusColor = stockStatusColor[status];
  return (
    <Stack
      direction="row"
      sx={{
        alignItems: 'center',
        gap: 1.25,
        py: 1.25,
      }}
    >
      <Box
        sx={{
          width: 36,
          height: 36,
          borderRadius: 1.25,
          background: `${categoryColor[product.category]}1F`,
          color: categoryColor[product.category],
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}
      >
        <Inventory2OutlinedIcon sx={{ fontSize: 18 }} />
      </Box>
      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Stack direction="row" sx={{ alignItems: 'center', gap: 0.75 }}>
          <Typography sx={{ fontSize: 13.5, fontWeight: 700, lineHeight: 1.25 }} noWrap>
            {product.name}
          </Typography>
          <Box
            sx={{
              fontSize: 9.5,
              fontWeight: 800,
              letterSpacing: 0.4,
              textTransform: 'uppercase',
              color: statusColor,
              px: 0.75,
              py: 0.125,
              borderRadius: 999,
              bgcolor: `${statusColor}1F`,
              flexShrink: 0,
            }}
          >
            {stockStatusLabel[status]}
          </Box>
        </Stack>
        <Typography sx={{ fontSize: 11, color: 'text.secondary' }}>
          {product.sku} · {product.brand} · {product.category}
        </Typography>
      </Box>
      <Box sx={{ textAlign: 'right', flexShrink: 0 }}>
        <Typography sx={{ fontSize: 13.5, fontWeight: 800 }}>
          {product.stock}
        </Typography>
        <Typography sx={{ fontSize: 10.5, color: 'text.secondary' }}>
          {formatINR(product.price)}
        </Typography>
      </Box>
    </Stack>
  );
}

export function AllProductsTab() {
  const [query, setQuery] = useState('');
  const [stockFilter, setStockFilter] = useState<StockFilter>('All');
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>('All');

  const filtered = useMemo(
    () =>
      products.filter(p => {
        if (stockFilter !== 'All' && stockStatus(p) !== stockFilter) return false;
        if (categoryFilter !== 'All' && p.category !== categoryFilter) return false;
        if (query) {
          const q = query.toLowerCase();
          if (
            !p.name.toLowerCase().includes(q) &&
            !p.sku.toLowerCase().includes(q) &&
            !p.brand.toLowerCase().includes(q) &&
            !p.category.toLowerCase().includes(q)
          )
            return false;
        }
        return true;
      }),
    [query, stockFilter, categoryFilter],
  );

  const counts = useMemo(() => {
    const total = products.length;
    let inStock = 0,
      low = 0,
      oos = 0;
    products.forEach(p => {
      const s = stockStatus(p);
      if (s === 'in-stock') inStock++;
      else if (s === 'low-stock') low++;
      else oos++;
    });
    return { total, inStock, low, oos };
  }, []);

  return (
    <Box>
      <Stack direction="row" sx={{ gap: 1, mb: 1.5 }}>
        <Box sx={{ flex: 1, p: 1, borderRadius: 1.25, background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.2)' }}>
          <Typography sx={{ fontSize: 10, color: '#22C55E', fontWeight: 800, letterSpacing: 0.3 }}>IN STOCK</Typography>
          <Typography sx={{ fontSize: 16, fontWeight: 800 }}>{counts.inStock}</Typography>
        </Box>
        <Box sx={{ flex: 1, p: 1, borderRadius: 1.25, background: 'rgba(245,158,11,0.08)', border: '1px solid rgba(245,158,11,0.22)' }}>
          <Typography sx={{ fontSize: 10, color: '#F59E0B', fontWeight: 800, letterSpacing: 0.3 }}>LOW STOCK</Typography>
          <Typography sx={{ fontSize: 16, fontWeight: 800 }}>{counts.low}</Typography>
        </Box>
        <Box sx={{ flex: 1, p: 1, borderRadius: 1.25, background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.22)' }}>
          <Typography sx={{ fontSize: 10, color: '#EF4444', fontWeight: 800, letterSpacing: 0.3 }}>OUT</Typography>
          <Typography sx={{ fontSize: 16, fontWeight: 800 }}>{counts.oos}</Typography>
        </Box>
      </Stack>

      <Stack
        direction="row"
        sx={{
          alignItems: 'center',
          px: 1.25,
          py: 0.5,
          mb: 1.25,
          borderRadius: 999,
          background: 'rgba(11,15,26,0.04)',
          border: '1px solid rgba(11,15,26,0.06)',
        }}
      >
        <SearchRoundedIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
        <InputBase
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Search SKU, name, brand…"
          sx={{ ml: 1, fontSize: 13, flex: 1 }}
        />
      </Stack>

      <Stack
        direction="row"
        sx={{ gap: 0.75, overflowX: 'auto', pb: 0.5, mb: 0.75, '&::-webkit-scrollbar': { display: 'none' } }}
      >
        {STOCK_FILTERS.map(f => {
          const active = f === stockFilter;
          const label = f === 'All' ? 'All' : stockStatusLabel[f];
          return (
            <Chip
              key={f}
              label={label}
              size="small"
              onClick={() => setStockFilter(f)}
              sx={{
                height: 28,
                fontSize: 12,
                fontWeight: 700,
                px: 0.5,
                cursor: 'pointer',
                flexShrink: 0,
                background: active ? tokens.gradient.aiAurora : 'rgba(11,15,26,0.04)',
                color: active ? '#fff' : 'text.primary',
                border: '1px solid rgba(11,15,26,0.06)',
                '&:hover': { background: active ? tokens.gradient.aiAurora : 'rgba(11,15,26,0.08)' },
              }}
            />
          );
        })}
      </Stack>

      <Stack
        direction="row"
        sx={{ gap: 0.75, overflowX: 'auto', pb: 0.5, mb: 1, '&::-webkit-scrollbar': { display: 'none' } }}
      >
        {CATEGORY_FILTERS.map(c => {
          const active = c === categoryFilter;
          return (
            <Chip
              key={c}
              label={c}
              size="small"
              onClick={() => setCategoryFilter(c)}
              sx={{
                height: 26,
                fontSize: 11.5,
                fontWeight: 700,
                px: 0.5,
                cursor: 'pointer',
                flexShrink: 0,
                background: active
                  ? c === 'All'
                    ? '#0B0F1A'
                    : categoryColor[c as ProductCategory]
                  : 'rgba(11,15,26,0.04)',
                color: active ? '#fff' : 'text.primary',
                border: '1px solid rgba(11,15,26,0.06)',
                '&:hover': {
                  filter: active ? 'brightness(1.08)' : undefined,
                  background: active ? undefined : 'rgba(11,15,26,0.08)',
                },
              }}
            />
          );
        })}
      </Stack>

      <Typography sx={{ fontSize: 11, color: 'text.disabled', mb: 0.5, px: 0.5 }}>
        {filtered.length} of {products.length} products
      </Typography>

      {filtered.length === 0 ? (
        <Box sx={{ textAlign: 'center', py: 4 }}>
          <Typography sx={{ fontSize: 13, color: 'text.secondary' }}>
            No products match these filters.
          </Typography>
        </Box>
      ) : (
        <Stack divider={<Box sx={{ height: 1, background: 'divider' }} />}>
          {filtered.map(p => (
            <ProductRow key={p.sku} product={p} />
          ))}
        </Stack>
      )}
    </Box>
  );
}
