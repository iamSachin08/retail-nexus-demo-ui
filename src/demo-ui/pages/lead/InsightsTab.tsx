import { Box, Stack, Typography } from '@mui/material';
import LocalFireDepartmentRoundedIcon from '@mui/icons-material/LocalFireDepartmentRounded';
import EventAvailableRoundedIcon from '@mui/icons-material/EventAvailableRounded';
import PriorityHighRoundedIcon from '@mui/icons-material/PriorityHighRounded';
import RestoreFromTrashRoundedIcon from '@mui/icons-material/RestoreFromTrashRounded';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import { GlassCard } from '../../components/GlassCard';
import { tokens } from '../../theme/tokens';
import { LeadRow } from './LeadRow';
import { useLeads } from '../../context/LeadsContext';
import type { Lead } from '../../mock/data/leadManagement';
import {
  insightsHotWarm,
  insightsFollowUp,
  insightsHighValueAttention,
  insightsRecentLost,
} from '../../mock/data/leadManagement';

function PromptStrip({ prompt }: { prompt: string }) {
  return (
    <Stack
      direction="row"
      sx={{
        alignItems: 'center',
        gap: 0.75,
        px: 1.25,
        py: 0.875,
        borderRadius: 1.5,
        background: tokens.gradient.aiAuroraSoft,
        border: '1px solid rgba(124,139,255,0.25)',
        mb: 1,
      }}
    >
      <AutoAwesomeIcon sx={{ fontSize: 14, color: '#7C5CFF' }} />
      <Typography sx={{ fontSize: 11.5, color: 'text.secondary', flex: 1, lineHeight: 1.3 }}>
        {prompt}
      </Typography>
    </Stack>
  );
}

function InsightCard({
  title,
  icon,
  accent,
  prompt,
  leads,
  onOpenLead,
  captionFor,
}: {
  title: string;
  icon: React.ReactNode;
  accent: string;
  prompt: string;
  leads: Lead[];
  onOpenLead: (id: string) => void;
  captionFor?: (lead: Lead) => string | undefined;
}) {
  return (
    <GlassCard sx={{ p: 2 }}>
      <Stack direction="row" sx={{ alignItems: 'center', mb: 1.25, gap: 1 }}>
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
        <Typography sx={{ fontSize: 15, fontWeight: 700, flex: 1 }}>{title}</Typography>
        <Box
          sx={{
            minWidth: 24,
            height: 22,
            px: 0.75,
            borderRadius: 999,
            background: accent,
            color: '#fff',
            fontSize: 11,
            fontWeight: 800,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {leads.length}
        </Box>
      </Stack>
      <PromptStrip prompt={prompt} />
      {leads.length === 0 ? (
        <Typography sx={{ fontSize: 12, color: 'text.secondary', textAlign: 'center', py: 1.5 }}>
          No leads in this bucket.
        </Typography>
      ) : (
        <Stack divider={<Box sx={{ height: 1, background: 'divider' }} />}>
          {leads.map(l => (
            <LeadRow
              key={l.leadId}
              lead={l}
              onOpen={onOpenLead}
              caption={captionFor ? captionFor(l) : undefined}
            />
          ))}
        </Stack>
      )}
    </GlassCard>
  );
}

interface Props {
  onOpenLead: (id: string) => void;
}

export function InsightsTab({ onOpenLead }: Props) {
  const { leads } = useLeads();

  return (
    <Stack spacing={1.5}>
      <InsightCard
        title="Hot / Warm Leads"
        icon={<LocalFireDepartmentRoundedIcon />}
        accent={tokens.gradient.leads}
        prompt="High-intent leads from the last 7 days. Worth contacting today."
        leads={insightsHotWarm(leads)}
        onOpenLead={onOpenLead}
      />
      <InsightCard
        title="Follow-up Scheduled"
        icon={<EventAvailableRoundedIcon />}
        accent={tokens.gradient.inventory}
        prompt="Leads with a scheduled follow-up. Open the lead to confirm or reschedule."
        leads={insightsFollowUp(leads)}
        onOpenLead={onOpenLead}
        captionFor={lead => (lead.followUpDate ? `Next: ${lead.followUpDate}` : undefined)}
      />
      <InsightCard
        title="High-value Leads need Attention"
        icon={<PriorityHighRoundedIcon />}
        accent={tokens.gradient.risk}
        prompt="High-ticket leads with no touch in 48h+. AI suggests prioritising these."
        leads={insightsHighValueAttention(leads)}
        onOpenLead={onOpenLead}
      />
      <InsightCard
        title="Recent Lost — re-engage"
        icon={<RestoreFromTrashRoundedIcon />}
        accent={tokens.gradient.sop}
        prompt="Lost in the last 14 days. Often recoverable with a small offer or restock note."
        leads={insightsRecentLost(leads)}
        onOpenLead={onOpenLead}
      />
    </Stack>
  );
}
