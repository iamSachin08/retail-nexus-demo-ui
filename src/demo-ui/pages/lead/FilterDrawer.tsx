import {
  Box,
  Button,
  Drawer,
  IconButton,
  Stack,
  Typography,
} from '@mui/material';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { useEffect, useState } from 'react';
import type { LeadSource, LeadStatus } from '../../mock/data/leadManagement';
import { LEAD_SOURCES, LEAD_STATUSES, sourceColor, statusColor } from '../../mock/data/leadManagement';
import { tokens } from '../../theme/tokens';

interface Props {
  open: boolean;
  onClose: () => void;
  appliedStatuses: LeadStatus[];
  appliedSources: LeadSource[];
  onApply: (statuses: LeadStatus[], sources: LeadSource[]) => void;
}

const SectionLabel = ({ children }: { children: React.ReactNode }) => (
  <Typography
    sx={{
      fontSize: 11,
      fontWeight: 800,
      letterSpacing: 0.6,
      textTransform: 'uppercase',
      color: 'text.secondary',
      mb: 1,
    }}
  >
    {children}
  </Typography>
);

function ToggleChip({
  label,
  selected,
  color,
  onClick,
}: {
  label: string;
  selected: boolean;
  color: string;
  onClick: () => void;
}) {
  return (
    <Stack
      direction="row"
      onClick={onClick}
      sx={{
        alignItems: 'center',
        gap: 0.75,
        px: 1.25,
        py: 0.75,
        borderRadius: 999,
        cursor: 'pointer',
        background: selected ? `${color}1F` : 'rgba(11,15,26,0.04)',
        border: `1px solid ${selected ? `${color}66` : 'rgba(11,15,26,0.08)'}`,
        transition: 'background .15s ease, border-color .15s ease',
      }}
    >
      <Box sx={{ width: 8, height: 8, borderRadius: '50%', background: color }} />
      <Typography sx={{ fontSize: 12.5, fontWeight: 700, color: selected ? color : 'text.primary' }}>
        {label}
      </Typography>
      {selected && <CheckRoundedIcon sx={{ fontSize: 14, color }} />}
    </Stack>
  );
}

export function FilterDrawer({ open, onClose, appliedStatuses, appliedSources, onApply }: Props) {
  const [pendingStatuses, setPendingStatuses] = useState<LeadStatus[]>(appliedStatuses);
  const [pendingSources, setPendingSources] = useState<LeadSource[]>(appliedSources);

  useEffect(() => {
    if (open) {
      setPendingStatuses(appliedStatuses);
      setPendingSources(appliedSources);
    }
  }, [open, appliedStatuses, appliedSources]);

  const toggleStatus = (s: LeadStatus) =>
    setPendingStatuses(p => (p.includes(s) ? p.filter(x => x !== s) : [...p, s]));

  const toggleSource = (s: LeadSource) =>
    setPendingSources(p => (p.includes(s) ? p.filter(x => x !== s) : [...p, s]));

  const clearAll = () => {
    setPendingStatuses([]);
    setPendingSources([]);
  };

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
      <Box sx={{ p: 2 }}>
        <Stack direction="row" sx={{ alignItems: 'center', mb: 2 }}>
          <Box sx={{ flex: 1 }}>
            <Typography sx={{ fontSize: 10.5, fontWeight: 800, letterSpacing: 0.6, textTransform: 'uppercase', color: 'text.secondary' }}>
              Filter
            </Typography>
            <Typography sx={{ fontSize: 18, fontWeight: 800, letterSpacing: -0.2 }}>
              Filter leads
            </Typography>
          </Box>
          <IconButton onClick={onClose}>
            <CloseRoundedIcon />
          </IconButton>
        </Stack>

        <Box sx={{ mb: 2 }}>
          <SectionLabel>Status</SectionLabel>
          <Stack direction="row" sx={{ gap: 0.75, flexWrap: 'wrap' }}>
            {LEAD_STATUSES.map(s => (
              <ToggleChip
                key={s}
                label={s}
                color={statusColor[s]}
                selected={pendingStatuses.includes(s)}
                onClick={() => toggleStatus(s)}
              />
            ))}
          </Stack>
        </Box>

        <Box sx={{ mb: 3 }}>
          <SectionLabel>Source</SectionLabel>
          <Stack direction="row" sx={{ gap: 0.75, flexWrap: 'wrap' }}>
            {LEAD_SOURCES.map(s => (
              <ToggleChip
                key={s}
                label={s}
                color={sourceColor[s]}
                selected={pendingSources.includes(s)}
                onClick={() => toggleSource(s)}
              />
            ))}
          </Stack>
        </Box>

        <Stack direction="row" sx={{ gap: 1 }}>
          <Button
            onClick={clearAll}
            sx={{
              flex: 1,
              background: 'rgba(11,15,26,0.06)',
              color: 'text.primary',
              fontWeight: 700,
              fontSize: 12.5,
              '&:hover': { background: 'rgba(11,15,26,0.10)' },
            }}
          >
            Clear all
          </Button>
          <Button
            onClick={() => {
              onApply(pendingStatuses, pendingSources);
              onClose();
            }}
            sx={{
              flex: 2,
              background: tokens.gradient.aiAurora,
              color: '#fff',
              fontWeight: 800,
              fontSize: 13,
              '&:hover': { background: tokens.gradient.aiAurora, filter: 'brightness(1.08)' },
            }}
          >
            Apply
            {pendingStatuses.length + pendingSources.length > 0 &&
              ` · ${pendingStatuses.length + pendingSources.length}`}
          </Button>
        </Stack>
      </Box>
    </Drawer>
  );
}
