import { Box, IconButton, Stack, Typography } from '@mui/material';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import CallRoundedIcon from '@mui/icons-material/CallRounded';
import type { Lead } from '../../mock/data/leadManagement';
import { intentColor, sourceColor, statusColor } from '../../mock/data/leadManagement';

const formatINR = (n: number): string => {
  if (n >= 100000) return `₹${(n / 100000).toFixed(1)}L`;
  if (n >= 1000) return `₹${(n / 1000).toFixed(1)}K`;
  return `₹${n}`;
};

interface Props {
  lead: Lead;
  caption?: string;
  showStatus?: boolean;
  onOpen?: (leadId: string) => void;
}

export function LeadRow({ lead, caption, showStatus = true, onOpen }: Props) {
  const subline = caption ?? lead.reason ?? lead.nextAction;

  const handleRowClick = () => onOpen?.(lead.leadId);
  const stop = (fn: () => void) => (e: React.MouseEvent) => {
    e.stopPropagation();
    fn();
  };

  return (
    <Stack
      direction="row"
      onClick={handleRowClick}
      sx={{
        alignItems: 'center',
        gap: 1,
        py: 1.25,
        cursor: onOpen ? 'pointer' : 'default',
        transition: 'background .15s ease',
        '&:hover': onOpen ? { background: 'rgba(11,15,26,0.03)' } : undefined,
        mx: -1,
        px: 1,
        borderRadius: 1,
      }}
    >
      <Box sx={{ position: 'relative', flexShrink: 0 }}>
        <Box
          sx={{
            width: 36,
            height: 36,
            borderRadius: 1.5,
            background: sourceColor[lead.leadSource],
            color: '#fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 12,
            fontWeight: 800,
            letterSpacing: 0.5,
          }}
        >
          {lead.customerName.split(' ').map(p => p[0]).slice(0, 2).join('').toUpperCase()}
        </Box>
        <Box
          sx={theme => ({
            position: 'absolute',
            bottom: -2,
            right: -2,
            width: 10,
            height: 10,
            borderRadius: '50%',
            background: intentColor[lead.intent],
            border: `2px solid ${theme.palette.background.paper}`,
          })}
        />
      </Box>

      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Stack direction="row" sx={{ alignItems: 'center', gap: 0.75, flexWrap: 'wrap' }}>
          <Typography sx={{ fontSize: 13.5, fontWeight: 700 }} noWrap>
            {lead.customerName}
          </Typography>
          {showStatus && (
            <Typography
              sx={{
                fontSize: 9,
                fontWeight: 800,
                letterSpacing: 0.5,
                textTransform: 'uppercase',
                color: statusColor[lead.leadStatus],
              }}
            >
              · {lead.leadStatus}
            </Typography>
          )}
        </Stack>
        <Typography sx={{ fontSize: 11, color: 'text.secondary' }} noWrap>
          {lead.leadSource} · {lead.lastTouch}
          {subline ? ` · ${subline}` : ''}
        </Typography>
      </Box>

      <Stack sx={{ alignItems: 'flex-end', flexShrink: 0 }}>
        <Typography sx={{ fontSize: 13, fontWeight: 800 }}>{formatINR(lead.budget)}</Typography>
        <Stack direction="row" sx={{ gap: 0.25, mt: 0.25 }}>
          <IconButton
            size="small"
            onClick={stop(() => { /* WhatsApp action */ })}
            sx={{ width: 26, height: 26, color: '#22C55E' }}
          >
            <WhatsAppIcon sx={{ fontSize: 15 }} />
          </IconButton>
          <IconButton
            size="small"
            onClick={stop(() => { /* Call action */ })}
            sx={{ width: 26, height: 26, color: 'text.secondary' }}
          >
            <CallRoundedIcon sx={{ fontSize: 15 }} />
          </IconButton>
        </Stack>
      </Stack>
    </Stack>
  );
}
