import {
  Box,
  Chip,
  Drawer,
  IconButton,
  InputBase,
  Stack,
  Typography,
} from '@mui/material';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import { useMemo, useState } from 'react';
import { orderStatusColor, orderSourceColor, recentOrders } from '../../mock/data/salesOrders';
import type { Order, OrderStatus } from '../../mock/data/salesOrders';
import { tokens } from '../../theme/tokens';

const formatINR = (n: number): string => {
  if (n >= 100000) return `₹${(n / 100000).toFixed(1)}L`;
  if (n >= 1000) return `₹${(n / 1000).toFixed(1)}K`;
  return `₹${n}`;
};

const FILTERS: (OrderStatus | 'All')[] = [
  'All',
  'New',
  'Confirmed',
  'Packed',
  'Out for delivery',
  'Delivered',
  'Returned',
];

function OrderRow({ order }: { order: Order }) {
  return (
    <Stack
      direction="row"
      sx={{ alignItems: 'center', gap: 1, py: 1.25 }}
    >
      <Box
        sx={{
          width: 36,
          height: 36,
          borderRadius: 1.5,
          background: orderSourceColor[order.source],
          color: '#fff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 11,
          fontWeight: 800,
          flexShrink: 0,
        }}
      >
        {order.source === 'Walk-in'
          ? 'WI'
          : order.source === 'WhatsApp'
          ? 'WA'
          : order.source[0]}
      </Box>
      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Stack direction="row" sx={{ alignItems: 'center', gap: 0.75, flexWrap: 'wrap' }}>
          <Typography sx={{ fontSize: 13, fontWeight: 700 }} noWrap>
            {order.customer}
          </Typography>
          <Typography sx={{ fontSize: 10.5, color: 'text.disabled', fontFamily: 'monospace' }}>
            {order.orderId}
          </Typography>
        </Stack>
        <Typography sx={{ fontSize: 11, color: 'text.secondary' }} noWrap>
          {order.items} · {order.createdAt}
        </Typography>
      </Box>
      <Stack sx={{ alignItems: 'flex-end', flexShrink: 0, gap: 0.25 }}>
        <Typography sx={{ fontSize: 13, fontWeight: 800 }}>{formatINR(order.total)}</Typography>
        <Chip
          size="small"
          label={order.status}
          sx={{
            height: 18,
            fontSize: 9.5,
            fontWeight: 800,
            letterSpacing: 0.4,
            background: `${orderStatusColor[order.status]}1F`,
            color: orderStatusColor[order.status],
            border: `1px solid ${orderStatusColor[order.status]}40`,
            '& .MuiChip-label': { px: 0.75 },
          }}
        />
      </Stack>
    </Stack>
  );
}

interface Props {
  open: boolean;
  onClose: () => void;
}

export function AllOrdersDrawer({ open, onClose }: Props) {
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<OrderStatus | 'All'>('All');

  const filtered = useMemo(
    () =>
      recentOrders.filter(o => {
        if (filter !== 'All' && o.status !== filter) return false;
        if (query) {
          const q = query.toLowerCase();
          if (
            !o.customer.toLowerCase().includes(q) &&
            !o.orderId.toLowerCase().includes(q) &&
            !o.items.toLowerCase().includes(q)
          ) return false;
        }
        return true;
      }),
    [query, filter],
  );

  return (
    <Drawer
      anchor="bottom"
      open={open}
      onClose={onClose}
      slotProps={{
        paper: {
          sx: {
            borderRadius: 0,
            backgroundColor: 'background.default',
            maxHeight: '100vh',
            height: '100vh',
          },
        },
      }}
    >
      <Box sx={{ p: 2, overflowY: 'auto' }}>
        <Stack direction="row" sx={{ alignItems: 'center', mb: 2 }}>
          <Box sx={{ flex: 1 }}>
            <Typography sx={{ fontSize: 10.5, fontWeight: 800, letterSpacing: 0.6, textTransform: 'uppercase', color: 'text.secondary' }}>
              Live · POS · WhatsApp · Online
            </Typography>
            <Typography sx={{ fontSize: 18, fontWeight: 800, letterSpacing: -0.2 }}>
              All Orders
            </Typography>
          </Box>
          <IconButton onClick={onClose}>
            <CloseRoundedIcon />
          </IconButton>
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
            placeholder="Search order id, customer, item…"
            sx={{ ml: 1, fontSize: 13, flex: 1 }}
          />
        </Stack>

        <Stack
          direction="row"
          sx={{
            gap: 0.75,
            overflowX: 'auto',
            pb: 0.5,
            mb: 1,
            '&::-webkit-scrollbar': { display: 'none' },
          }}
        >
          {FILTERS.map(f => {
            const active = f === filter;
            return (
              <Chip
                key={f}
                label={f}
                size="small"
                onClick={() => setFilter(f)}
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

        <Typography sx={{ fontSize: 11, color: 'text.disabled', mb: 0.5, px: 0.5 }}>
          {filtered.length} of {recentOrders.length} orders
        </Typography>

        {filtered.length === 0 ? (
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <Typography sx={{ fontSize: 13, color: 'text.secondary' }}>
              No orders match these filters.
            </Typography>
          </Box>
        ) : (
          <Stack divider={<Box sx={{ height: 1, background: 'divider' }} />}>
            {filtered.map(order => (
              <OrderRow key={order.orderId} order={order} />
            ))}
          </Stack>
        )}
      </Box>
    </Drawer>
  );
}
