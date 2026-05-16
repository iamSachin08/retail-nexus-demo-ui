import {
  Badge,
  Box,
  Chip,
  IconButton,
  InputBase,
  Stack,
  Typography,
  keyframes,
} from '@mui/material';
import TuneRoundedIcon from '@mui/icons-material/TuneRounded';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { useMemo, useState } from 'react';
import { GlassCard } from '../../components/GlassCard';
import { LeadRow } from './LeadRow';
import { FilterDrawer } from './FilterDrawer';
import { tokens } from '../../theme/tokens';
import { useLeads } from '../../context/LeadsContext';
import type { LeadSource, LeadStatus } from '../../mock/data/leadManagement';
import { sourceColor, statusColor } from '../../mock/data/leadManagement';

const shimmer = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

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
}

export function AllLeadsTab({ onOpenLead }: Props) {
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
      <Stack direction="row" sx={{ gap: 1, alignItems: 'center' }}>
        <Box
          sx={theme => ({
            flex: 1,
            minWidth: 0,
            position: 'relative',
            borderRadius: `${tokens.radius.xl}px`,
            padding: '2px',
            background:
              theme.palette.mode === 'dark'
                ? 'linear-gradient(120deg, rgba(124,92,255,0.55), rgba(54,209,220,0.55), rgba(124,92,255,0.55))'
                : 'linear-gradient(120deg, rgba(124,92,255,0.35), rgba(54,209,220,0.35), rgba(124,92,255,0.35))',
            backgroundSize: '200% 200%',
            animation: `${shimmer} 8s ease infinite`,
            boxShadow: '0 12px 24px rgba(124,92,255,0.18)',
          })}
        >
          <Stack
            direction="row"
            spacing={1}
            sx={theme => ({
              alignItems: 'center',
              width: '100%',
              px: 1,
              py: 0.5,
              borderRadius: `${tokens.radius.xl - 2}px`,
              background:
                theme.palette.mode === 'dark'
                  ? 'rgba(11,15,26,0.78)'
                  : 'rgba(255,255,255,0.92)',
              backdropFilter: 'blur(20px)',
            })}
          >
            <Box
              sx={{
                width: 24,
                height: 24,
                borderRadius: '50%',
                background: tokens.gradient.aiAurora,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
                flexShrink: 0,
                boxShadow: '0 6px 14px rgba(124,92,255,0.35)',
              }}
            >
              <AutoAwesomeIcon sx={{ fontSize: 14 }} />
            </Box>
            <InputBase
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Search name, phone, product…"
              sx={{
                fontSize: 13,
                fontWeight: 500,
                flex: 1,
                minWidth: 0,
                '& input::placeholder': { opacity: 0.5 },
              }}
            />
          </Stack>
        </Box>
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
