import {
  Box,
  Button,
  Chip,
  Drawer,
  IconButton,
  MenuItem,
  Select,
  Stack,
  Typography,
} from '@mui/material';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import CallRoundedIcon from '@mui/icons-material/CallRounded';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import EventOutlinedIcon from '@mui/icons-material/EventOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import type {
  Lead,
  LeadStatus,
} from '../../mock/data/leadManagement';
import {
  LEAD_STATUSES,
  intentColor,
  sourceColor,
  statusColor,
} from '../../mock/data/leadManagement';
import { useLeads } from '../../context/LeadsContext';
import { tokens } from '../../theme/tokens';

const formatINR = (n: number): string => {
  if (n >= 100000) return `₹${(n / 100000).toFixed(1)}L`;
  if (n >= 1000) return `₹${(n / 1000).toFixed(1)}K`;
  return `₹${n}`;
};

interface Props {
  leadId: string | null;
  onClose: () => void;
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <Box sx={{ mb: 2 }}>
      <Typography
        sx={{
          fontSize: 10.5,
          fontWeight: 800,
          letterSpacing: 0.6,
          textTransform: 'uppercase',
          color: 'text.secondary',
          mb: 0.75,
        }}
      >
        {title}
      </Typography>
      {children}
    </Box>
  );
}

function Field({ icon, label, value }: { icon: React.ReactNode; label: string; value?: string }) {
  if (!value) return null;
  return (
    <Stack direction="row" sx={{ alignItems: 'center', gap: 1.25, py: 0.5 }}>
      <Box sx={{ color: 'text.secondary', '& svg': { fontSize: 16 } }}>{icon}</Box>
      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Typography sx={{ fontSize: 10.5, color: 'text.disabled', letterSpacing: 0.4 }}>
          {label}
        </Typography>
        <Typography sx={{ fontSize: 13, fontWeight: 600 }} noWrap>
          {value}
        </Typography>
      </Box>
    </Stack>
  );
}

export function LeadDetailDrawer({ leadId, onClose }: Props) {
  const { getLead, updateLeadStatus } = useLeads();
  const lead: Lead | undefined = leadId ? getLead(leadId) : undefined;

  return (
    <Drawer
      anchor="bottom"
      open={!!leadId}
      onClose={onClose}
      slotProps={{
        paper: {
          sx: {
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            backgroundColor: 'background.default',
            maxHeight: '92vh',
          },
        },
      }}
    >
      {lead && (
        <Box sx={{ p: 2, overflowY: 'auto' }}>
          {/* Top bar */}
          <Stack direction="row" sx={{ alignItems: 'center', gap: 1, mb: 1.5 }}>
            <Box sx={{ position: 'relative', flexShrink: 0 }}>
              <Box
                sx={{
                  width: 44,
                  height: 44,
                  borderRadius: 1.75,
                  background: sourceColor[lead.leadSource],
                  color: '#fff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 14,
                  fontWeight: 800,
                }}
              >
                {lead.customerName.split(' ').map(p => p[0]).slice(0, 2).join('').toUpperCase()}
              </Box>
              <Box
                sx={theme => ({
                  position: 'absolute',
                  bottom: -2,
                  right: -2,
                  width: 12,
                  height: 12,
                  borderRadius: '50%',
                  background: intentColor[lead.intent],
                  border: `2px solid ${theme.palette.background.paper}`,
                })}
              />
            </Box>
            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Typography sx={{ fontSize: 16, fontWeight: 800, letterSpacing: -0.2 }} noWrap>
                {lead.customerName}
              </Typography>
              <Stack direction="row" sx={{ alignItems: 'center', gap: 0.75 }}>
                <Typography sx={{ fontSize: 11, color: 'text.disabled', fontFamily: 'monospace' }}>
                  {lead.leadId}
                </Typography>
                <Chip
                  size="small"
                  label={lead.leadSource}
                  sx={{
                    height: 18,
                    fontSize: 10,
                    fontWeight: 700,
                    background: sourceColor[lead.leadSource],
                    color: '#fff',
                    '& .MuiChip-label': { px: 0.75 },
                  }}
                />
              </Stack>
            </Box>
            <IconButton size="small" onClick={onClose}>
              <CloseRoundedIcon fontSize="small" />
            </IconButton>
          </Stack>

          {/* Status pill row + budget */}
          <Stack direction="row" sx={{ alignItems: 'center', gap: 1, mb: 2, flexWrap: 'wrap' }}>
            <Select
              value={lead.leadStatus}
              size="small"
              onChange={e => updateLeadStatus(lead.leadId, e.target.value as LeadStatus)}
              variant="standard"
              disableUnderline
              sx={{
                '& .MuiSelect-select': {
                  py: 0.5,
                  px: 1.25,
                  borderRadius: 999,
                  fontSize: 12,
                  fontWeight: 700,
                  background: `${statusColor[lead.leadStatus]}1A`,
                  color: statusColor[lead.leadStatus],
                  border: `1px solid ${statusColor[lead.leadStatus]}40`,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 0.5,
                },
              }}
            >
              {LEAD_STATUSES.map(s => (
                <MenuItem key={s} value={s}>
                  {s}
                </MenuItem>
              ))}
            </Select>
            <Box sx={{ ml: 'auto' }}>
              <Typography sx={{ fontSize: 10.5, color: 'text.secondary', letterSpacing: 0.4 }}>
                BUDGET
              </Typography>
              <Typography sx={{ fontSize: 16, fontWeight: 800 }}>{formatINR(lead.budget)}</Typography>
            </Box>
          </Stack>

          {/* Quick actions */}
          <Stack direction="row" sx={{ gap: 0.75, mb: 2 }}>
            <Button
              startIcon={<WhatsAppIcon />}
              fullWidth
              sx={{
                background: '#22C55E',
                color: '#fff',
                fontWeight: 700,
                fontSize: 12,
                '&:hover': { background: '#22C55E', filter: 'brightness(1.08)' },
              }}
            >
              WhatsApp
            </Button>
            <Button
              startIcon={<CallRoundedIcon />}
              fullWidth
              sx={{
                background: 'rgba(11,15,26,0.06)',
                color: 'text.primary',
                fontWeight: 700,
                fontSize: 12,
                '&:hover': { background: 'rgba(11,15,26,0.10)' },
              }}
            >
              Call
            </Button>
          </Stack>

          {/* AI next action */}
          {lead.nextAction && (
            <Box
              sx={{
                mb: 2,
                p: 1.5,
                borderRadius: 2,
                background: tokens.gradient.aiAuroraSoft,
                border: '1px solid rgba(124,139,255,0.25)',
              }}
            >
              <Stack direction="row" sx={{ alignItems: 'center', gap: 0.75, mb: 0.5 }}>
                <AutoAwesomeIcon sx={{ fontSize: 14, color: '#7C5CFF' }} />
                <Typography sx={{ fontSize: 10.5, fontWeight: 800, letterSpacing: 0.5, color: '#7C5CFF' }}>
                  AI SUGGESTED NEXT ACTION
                </Typography>
              </Stack>
              <Typography sx={{ fontSize: 13, fontWeight: 600 }}>{lead.nextAction}</Typography>
            </Box>
          )}

          {/* Contact section */}
          <Section title="Contact">
            <Field icon={<CallRoundedIcon />} label="Phone" value={lead.customerPhone} />
            <Field icon={<EmailOutlinedIcon />} label="Email" value={lead.customerEmail} />
            <Field icon={<LocationOnOutlinedIcon />} label="Address" value={lead.customerAddress} />
          </Section>

          {/* Schedule */}
          <Section title="Schedule">
            <Field icon={<EventOutlinedIcon />} label="Follow-up" value={lead.followUpDate} />
            <Field icon={<EventOutlinedIcon />} label="Last touch" value={lead.lastTouch} />
          </Section>

          {/* Products */}
          {lead.productLines.length > 0 && (
            <Section title="Products interested">
              <Stack divider={<Box sx={{ height: 1, background: 'divider' }} />}>
                {lead.productLines.map(p => (
                  <Stack key={p.name} direction="row" sx={{ alignItems: 'center', gap: 1, py: 1 }}>
                    <Box
                      sx={{
                        width: 30,
                        height: 30,
                        borderRadius: 1.5,
                        background: 'rgba(11,15,26,0.06)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'text.secondary',
                      }}
                    >
                      <ShoppingBagOutlinedIcon sx={{ fontSize: 16 }} />
                    </Box>
                    <Box sx={{ flex: 1, minWidth: 0 }}>
                      <Typography sx={{ fontSize: 13, fontWeight: 600 }} noWrap>
                        {p.name}
                      </Typography>
                      <Typography sx={{ fontSize: 11, color: 'text.secondary' }}>
                        Qty {p.qty}
                        {p.price ? ` · ${formatINR(p.price)} ea` : ''}
                      </Typography>
                    </Box>
                  </Stack>
                ))}
              </Stack>
            </Section>
          )}

          {/* Notes */}
          {lead.notes && (
            <Section title="Notes">
              <Typography sx={{ fontSize: 13, color: 'text.primary', whiteSpace: 'pre-line' }}>
                {lead.notes}
              </Typography>
            </Section>
          )}

          {/* Lost reason */}
          {lead.reason && lead.leadStatus === 'Lost' && (
            <Section title="Reason lost">
              <Typography sx={{ fontSize: 13, color: '#EF4444' }}>{lead.reason}</Typography>
            </Section>
          )}
        </Box>
      )}
    </Drawer>
  );
}
