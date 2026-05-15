import {
  Box,
  Button,
  Drawer,
  IconButton,
  InputBase,
  Stack,
  Typography,
} from '@mui/material';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import TrendingUpRoundedIcon from '@mui/icons-material/TrendingUpRounded';
import TrendingDownRoundedIcon from '@mui/icons-material/TrendingDownRounded';
import { useEffect, useState } from 'react';
import type { ReportSummary } from '../../mock/data/salesOrders';
import { tokens } from '../../theme/tokens';

interface Props {
  report: ReportSummary | null;
  onClose: () => void;
}

function KpiPill({ label, value, delta }: { label: string; value: string; delta?: number }) {
  const positive = (delta ?? 0) >= 0;
  return (
    <Box
      sx={{
        flex: '1 1 calc(50% - 6px)',
        minWidth: 'calc(50% - 6px)',
        p: 1.25,
        borderRadius: 1.75,
        background: 'rgba(11,15,26,0.04)',
        border: '1px solid rgba(11,15,26,0.06)',
      }}
    >
      <Typography sx={{ fontSize: 10.5, fontWeight: 700, letterSpacing: 0.6, textTransform: 'uppercase', color: 'text.secondary' }}>
        {label}
      </Typography>
      <Stack direction="row" sx={{ alignItems: 'baseline', gap: 0.75, mt: 0.25 }}>
        <Typography sx={{ fontSize: 18, fontWeight: 800 }}>{value}</Typography>
        {typeof delta === 'number' && (
          <Stack direction="row" sx={{ alignItems: 'center', color: positive ? '#22C55E' : '#EF4444' }}>
            {positive ? (
              <TrendingUpRoundedIcon sx={{ fontSize: 12 }} />
            ) : (
              <TrendingDownRoundedIcon sx={{ fontSize: 12 }} />
            )}
            <Typography sx={{ fontSize: 11, fontWeight: 700 }}>
              {Math.abs(delta).toFixed(1)}%
            </Typography>
          </Stack>
        )}
      </Stack>
    </Box>
  );
}

export function ReportDetailDrawer({ report, onClose }: Props) {
  const [comments, setComments] = useState<ReportSummary['comments']>([]);
  const [draft, setDraft] = useState('');

  useEffect(() => {
    setComments(report?.comments ?? []);
    setDraft('');
  }, [report?.id]);

  const send = () => {
    if (!draft.trim()) return;
    setComments(prev => [
      ...prev,
      { author: 'Owner', text: draft.trim(), ts: 'just now' },
    ]);
    setDraft('');
  };

  return (
    <Drawer
      anchor="bottom"
      open={!!report}
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
      {report && (
        <Box sx={{ p: 2, overflowY: 'auto' }}>
          <Stack direction="row" sx={{ alignItems: 'center', mb: 1.5 }}>
            <Box sx={{ flex: 1 }}>
              <Typography sx={{ fontSize: 10.5, fontWeight: 800, letterSpacing: 0.6, textTransform: 'uppercase', color: 'text.secondary' }}>
                Sales Report
              </Typography>
              <Typography sx={{ fontSize: 18, fontWeight: 800, letterSpacing: -0.2 }}>{report.title}</Typography>
              <Typography sx={{ fontSize: 11, color: 'text.secondary' }}>{report.period}</Typography>
            </Box>
            <IconButton onClick={onClose}>
              <CloseRoundedIcon />
            </IconButton>
          </Stack>

          {/* Sent via WhatsApp banner */}
          {report.status === 'sent' && (
            <Stack
              direction="row"
              sx={{
                alignItems: 'center',
                gap: 0.75,
                px: 1.25,
                py: 0.875,
                borderRadius: 1.5,
                background: 'rgba(34,197,94,0.10)',
                border: '1px solid rgba(34,197,94,0.25)',
                mb: 2,
              }}
            >
              <WhatsAppIcon sx={{ fontSize: 15, color: '#22C55E' }} />
              <Typography sx={{ fontSize: 11.5, color: 'text.secondary', flex: 1 }}>
                Sent to {report.sentTo} on WhatsApp · {report.generatedAt}
              </Typography>
            </Stack>
          )}

          {report.status === 'pending-review' && (
            <Stack
              direction="row"
              sx={{
                alignItems: 'center',
                gap: 1,
                px: 1.25,
                py: 1,
                borderRadius: 1.5,
                background: 'rgba(245,158,11,0.10)',
                border: '1px solid rgba(245,158,11,0.25)',
                mb: 2,
              }}
            >
              <Typography sx={{ fontSize: 12, color: '#F59E0B', fontWeight: 700, flex: 1 }}>
                ⚠ Ready to review · awaiting your approval to send
              </Typography>
              <Button
                size="small"
                sx={{
                  px: 1.25,
                  background: '#22C55E',
                  color: '#fff',
                  fontSize: 11,
                  fontWeight: 700,
                  '&:hover': { background: '#22C55E', filter: 'brightness(1.08)' },
                }}
              >
                Send via WhatsApp
              </Button>
            </Stack>
          )}

          {/* KPIs */}
          {report.kpis.length > 0 && (
            <Box sx={{ mb: 2 }}>
              <Typography sx={{ fontSize: 10.5, fontWeight: 800, letterSpacing: 0.6, textTransform: 'uppercase', color: 'text.secondary', mb: 0.75 }}>
                Highlighted KPIs
              </Typography>
              <Stack direction="row" sx={{ gap: 1, flexWrap: 'wrap' }}>
                {report.kpis.map(k => (
                  <KpiPill key={k.label} label={k.label} value={k.value} delta={k.delta} />
                ))}
              </Stack>
            </Box>
          )}

          {/* Conversation */}
          <Typography sx={{ fontSize: 10.5, fontWeight: 800, letterSpacing: 0.6, textTransform: 'uppercase', color: 'text.secondary', mb: 1 }}>
            WhatsApp conversation
          </Typography>
          {comments.length === 0 ? (
            <Box
              sx={{
                p: 2,
                borderRadius: 1.5,
                background: 'rgba(11,15,26,0.03)',
                border: '1px dashed rgba(11,15,26,0.10)',
                textAlign: 'center',
                mb: 2,
              }}
            >
              <Typography sx={{ fontSize: 12, color: 'text.secondary' }}>
                No comments yet. Replies on WhatsApp will show up here.
              </Typography>
            </Box>
          ) : (
            <Stack spacing={1} sx={{ mb: 2 }}>
              {comments.map((c, i) => {
                const isOwner = c.author === 'Owner';
                return (
                  <Stack
                    key={i}
                    direction="row"
                    sx={{ justifyContent: isOwner ? 'flex-end' : 'flex-start' }}
                  >
                    <Box
                      sx={{
                        maxWidth: '80%',
                        p: 1.25,
                        borderRadius: 1.75,
                        background: isOwner ? 'rgba(34,197,94,0.16)' : 'rgba(11,15,26,0.05)',
                        border: `1px solid ${isOwner ? 'rgba(34,197,94,0.25)' : 'rgba(11,15,26,0.08)'}`,
                      }}
                    >
                      <Stack direction="row" sx={{ alignItems: 'baseline', gap: 1, mb: 0.25 }}>
                        <Typography sx={{ fontSize: 11, fontWeight: 800, color: isOwner ? '#22C55E' : 'text.secondary' }}>
                          {c.author}
                        </Typography>
                        <Typography sx={{ fontSize: 10, color: 'text.disabled' }}>{c.ts}</Typography>
                      </Stack>
                      <Typography sx={{ fontSize: 13, color: 'text.primary' }}>{c.text}</Typography>
                    </Box>
                  </Stack>
                );
              })}
            </Stack>
          )}

          {/* Reply input */}
          <Stack
            direction="row"
            sx={{
              alignItems: 'center',
              gap: 1,
              p: 1,
              borderRadius: 999,
              background: 'rgba(11,15,26,0.04)',
              border: '1px solid rgba(11,15,26,0.08)',
            }}
          >
            <InputBase
              value={draft}
              onChange={e => setDraft(e.target.value)}
              onKeyDown={e => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  send();
                }
              }}
              placeholder="Add a comment…"
              fullWidth
              sx={{ pl: 1.5, fontSize: 13 }}
            />
            <IconButton
              onClick={send}
              sx={{
                background: tokens.gradient.aiAurora,
                color: '#fff',
                '&:hover': { background: tokens.gradient.aiAurora, filter: 'brightness(1.08)' },
              }}
            >
              <SendRoundedIcon fontSize="small" />
            </IconButton>
          </Stack>
        </Box>
      )}
    </Drawer>
  );
}
