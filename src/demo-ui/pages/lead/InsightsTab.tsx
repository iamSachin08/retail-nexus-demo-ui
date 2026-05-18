import { Box, ButtonBase, Stack, Typography } from '@mui/material';
import LocalFireDepartmentRoundedIcon from '@mui/icons-material/LocalFireDepartmentRounded';
import EventAvailableRoundedIcon from '@mui/icons-material/EventAvailableRounded';
import PriorityHighRoundedIcon from '@mui/icons-material/PriorityHighRounded';
import RestoreFromTrashRoundedIcon from '@mui/icons-material/RestoreFromTrashRounded';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import ChecklistRtlRoundedIcon from '@mui/icons-material/ChecklistRtlRounded';
import AccessTimeRoundedIcon from '@mui/icons-material/AccessTimeRounded';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
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
import { allTasks } from '../../tasks/mock';

/* Pending lead-category tasks, surfaced at the top of Insights. */
function PendingLeadTasksCard() {
  const navigate = useNavigate();
  const tasks = useMemo(
    () =>
      allTasks
        .filter(t => t.category === 'Leads' && t.status !== 'COMPLETE')
        .slice(0, 2),
    [],
  );
  if (tasks.length === 0) return null;

  return (
    <GlassCard sx={{ p: 2 }}>
      <Stack direction="row" sx={{ alignItems: 'center', gap: 1, mb: 1.25 }}>
        <Box
          sx={{
            width: 28,
            height: 28,
            borderRadius: 1.5,
            background: tokens.gradient.tasks,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
            '& svg': { fontSize: 16 },
          }}
        >
          <ChecklistRtlRoundedIcon />
        </Box>
        <Typography sx={{ fontSize: 15, fontWeight: 700, flex: 1 }}>
          {tasks.length} Task{tasks.length === 1 ? '' : 's'} Pending
        </Typography>
        <Box
          sx={{
            minWidth: 22,
            height: 22,
            px: 0.75,
            borderRadius: 999,
            background: '#EF4444',
            color: '#fff',
            fontSize: 11,
            fontWeight: 800,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {tasks.length}
        </Box>
      </Stack>

      <Stack spacing={1}>
        {tasks.map(t => (
          <ButtonBase
            key={t.id}
            onClick={() => navigate('/demo/tasks')}
            sx={theme => ({
              width: '100%',
              textAlign: 'left',
              p: 1.5,
              borderRadius: 1.75,
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              bgcolor:
                theme.palette.mode === 'dark'
                  ? 'rgba(255,255,255,0.04)'
                  : 'rgba(11,15,26,0.03)',
              border:
                theme.palette.mode === 'dark'
                  ? '1px solid rgba(255,255,255,0.06)'
                  : '1px solid rgba(11,15,26,0.05)',
              '&:hover': {
                bgcolor:
                  theme.palette.mode === 'dark'
                    ? 'rgba(255,255,255,0.07)'
                    : 'rgba(11,15,26,0.05)',
              },
            })}
          >
            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Typography sx={{ fontSize: 13.5, fontWeight: 700, lineHeight: 1.3 }} noWrap>
                {t.title}
              </Typography>
              <Stack
                direction="row"
                sx={{ alignItems: 'center', gap: 0.75, mt: 0.5, color: 'text.secondary' }}
              >
                <AccessTimeRoundedIcon sx={{ fontSize: 12 }} />
                <Typography sx={{ fontSize: 11, fontWeight: 600 }}>
                  {t.duration ?? `${t.expectedMins} min`} · {t.dueShort ?? t.dueLabel}
                </Typography>
                {t.overdue && (
                  <Box
                    sx={{
                      px: 0.75,
                      py: 0.125,
                      borderRadius: 999,
                      bgcolor: 'rgba(239,68,68,0.16)',
                      color: '#EF4444',
                      fontSize: 9.5,
                      fontWeight: 800,
                      letterSpacing: 0.4,
                      textTransform: 'uppercase',
                    }}
                  >
                    Overdue
                  </Box>
                )}
              </Stack>
            </Box>
            <ChevronRightRoundedIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
          </ButtonBase>
        ))}
      </Stack>
    </GlassCard>
  );
}

function PromptStrip({ prompt }: { prompt: string }) {
  return (
    <Stack
      direction="row"
      sx={{
        alignItems: 'center',
        gap: 0.75,
        py: 0.875,
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
      <PendingLeadTasksCard />
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
