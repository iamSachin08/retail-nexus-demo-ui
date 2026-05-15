import {
  Badge,
  Box,
  Button,
  Chip,
  IconButton,
  InputBase,
  Stack,
  Typography,
} from '@mui/material';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import TuneRoundedIcon from '@mui/icons-material/TuneRounded';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { useMemo, useState } from 'react';
import { GlassCard } from '../../components/GlassCard';
import { LeadRow } from './LeadRow';
import { FilterDrawer } from './FilterDrawer';
import { tokens } from '../../theme/tokens';
import { useLeads } from '../../context/LeadsContext';
import type { LeadSource, LeadStatus } from '../../mock/data/leadManagement';
import { sourceColor, statusColor } from '../../mock/data/leadManagement';

type IntentFilter = 'all' | 'hot' | 'warm' | 'cold' | 'today';

const INTENT_FILTERS: { id: IntentFilter; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'hot', label: 'Hot' },
  { id: 'warm', label: 'Warm' },
  { id: 'cold', label: 'Cold' },
  { id: 'today', label: 'Today' },
];

interface Props {
  onOpenLead: (leadId: string) => void;
  onAddLead: () => void;
}

export function AllLeadsTab({ onOpenLead, onAddLead }: Props) {
  const { leads } = useLeads();
  const [query, setQuery] = useState('');
  const [intentFilter, setIntentFilter] = useState<IntentFilter>('all');
  const [filterOpen, setFilterOpen] = useState(false);
  const [appliedStatuses, setAppliedStatuses] = useState<LeadStatus[]>([]);
  const [appliedSources, setAppliedSources] = useState<LeadSource[]>([]);

  const totalApplied = appliedStatuses.length + appliedSources.length;

  const filtered = useMemo(() => {
    return leads.filter(l => {
      if (query) {
        const q = query.toLowerCase();
        if (
          !l.customerName.toLowerCase().includes(q) &&
          !l.customerPhone.includes(q) &&
          !l.productsInterested.toLowerCase().includes(q)
        ) return false;
      }
      if (intentFilter !== 'all') {
        if (intentFilter === 'today') {
          if (!/h ago|m ago|just now/i.test(l.lastTouch)) return false;
        } else if (l.intent !== intentFilter) return false;
      }
      if (appliedStatuses.length && !appliedStatuses.includes(l.leadStatus)) return false;
      if (appliedSources.length && !appliedSources.includes(l.leadSource)) return false;
      return true;
    });
  }, [leads, query, intentFilter, appliedStatuses, appliedSources]);

  return (
    <Stack spacing={1.5}>
      {/* Search + Filter + Add */}
      <Stack direction="row" sx={{ gap: 1 }}>
        <Stack
          direction="row"
          sx={{
            flex: 1,
            alignItems: 'center',
            px: 1.25,
            py: 0.5,
            borderRadius: 999,
            background: 'rgba(11,15,26,0.04)',
            border: '1px solid rgba(11,15,26,0.06)',
          }}
        >
          <SearchRoundedIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
          <InputBase
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search name, phone, product…"
            sx={{ ml: 1, fontSize: 13, flex: 1 }}
          />
        </Stack>
        <Badge
          badgeContent={totalApplied || undefined}
          color="primary"
          overlap="circular"
          sx={{ '& .MuiBadge-badge': { fontSize: 10, height: 16, minWidth: 16 } }}
        >
          <IconButton
            onClick={() => setFilterOpen(true)}
            sx={{
              width: 36,
              height: 36,
              background: totalApplied > 0 ? tokens.gradient.aiAurora : 'rgba(11,15,26,0.04)',
              color: totalApplied > 0 ? '#fff' : 'text.primary',
              border: '1px solid rgba(11,15,26,0.06)',
            }}
          >
            <TuneRoundedIcon sx={{ fontSize: 18 }} />
          </IconButton>
        </Badge>
        <Button
          startIcon={<AddRoundedIcon />}
          onClick={onAddLead}
          sx={{
            height: 36,
            px: 1.5,
            background: tokens.gradient.aiAurora,
            color: '#fff',
            fontSize: 12.5,
            fontWeight: 700,
            '&:hover': { background: tokens.gradient.aiAurora, filter: 'brightness(1.08)' },
          }}
        >
          Add lead
        </Button>
      </Stack>

      {/* Intent chips */}
      <Stack
        direction="row"
        sx={{
          gap: 0.75,
          overflowX: 'auto',
          pb: 0.5,
          '&::-webkit-scrollbar': { display: 'none' },
        }}
      >
        {INTENT_FILTERS.map(f => {
          const active = f.id === intentFilter;
          return (
            <Chip
              key={f.id}
              label={f.label}
              size="small"
              onClick={() => setIntentFilter(f.id)}
              sx={{
                height: 28,
                fontSize: 12,
                fontWeight: 700,
                px: 0.5,
                cursor: 'pointer',
                background: active ? tokens.gradient.aiAurora : 'rgba(11,15,26,0.04)',
                color: active ? '#fff' : 'text.primary',
                border: '1px solid rgba(11,15,26,0.06)',
                '&:hover': { background: active ? tokens.gradient.aiAurora : 'rgba(11,15,26,0.08)' },
              }}
            />
          );
        })}
      </Stack>

      {/* Applied filter chips (status + source) */}
      {(appliedStatuses.length > 0 || appliedSources.length > 0) && (
        <Stack direction="row" sx={{ gap: 0.5, flexWrap: 'wrap' }}>
          {appliedStatuses.map(s => (
            <Chip
              key={s}
              label={s}
              size="small"
              onDelete={() => setAppliedStatuses(p => p.filter(x => x !== s))}
              deleteIcon={<CloseRoundedIcon sx={{ fontSize: 14 }} />}
              sx={{
                height: 24,
                fontSize: 11,
                fontWeight: 700,
                background: `${statusColor[s]}1A`,
                color: statusColor[s],
                border: `1px solid ${statusColor[s]}40`,
                '& .MuiChip-deleteIcon': { color: statusColor[s] },
              }}
            />
          ))}
          {appliedSources.map(s => (
            <Chip
              key={s}
              label={s}
              size="small"
              onDelete={() => setAppliedSources(p => p.filter(x => x !== s))}
              deleteIcon={<CloseRoundedIcon sx={{ fontSize: 14 }} />}
              sx={{
                height: 24,
                fontSize: 11,
                fontWeight: 700,
                background: `${sourceColor[s]}1A`,
                color: sourceColor[s],
                border: `1px solid ${sourceColor[s]}40`,
                '& .MuiChip-deleteIcon': { color: sourceColor[s] },
              }}
            />
          ))}
        </Stack>
      )}

      {/* Header row */}
      <Stack direction="row" sx={{ alignItems: 'center', justifyContent: 'space-between', px: 0.5 }}>
        <Typography sx={{ fontSize: 13, fontWeight: 700 }}>
          All Leads
          <Box component="span" sx={{ color: 'text.secondary', fontWeight: 600, ml: 0.5 }}>
            · {filtered.length}
          </Box>
        </Typography>
        <Typography sx={{ fontSize: 11, color: 'text.disabled' }}>
          Tap a row to open
        </Typography>
      </Stack>

      {/* List */}
      <GlassCard sx={{ p: 1.5, py: 0.5 }}>
        {filtered.length === 0 ? (
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <Typography sx={{ fontSize: 13, color: 'text.secondary' }}>
              No leads match these filters.
            </Typography>
          </Box>
        ) : (
          <Stack divider={<Box sx={{ height: 1, background: 'divider' }} />}>
            {filtered.map(lead => (
              <LeadRow key={lead.leadId} lead={lead} onOpen={onOpenLead} />
            ))}
          </Stack>
        )}
      </GlassCard>

      <FilterDrawer
        open={filterOpen}
        onClose={() => setFilterOpen(false)}
        appliedStatuses={appliedStatuses}
        appliedSources={appliedSources}
        onApply={(statuses, sources) => {
          setAppliedStatuses(statuses);
          setAppliedSources(sources);
        }}
      />
    </Stack>
  );
}
