import {
  Box,
  Button,
  Dialog,
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
        flex: '1 1 calc(50% - 8px)',
        minWidth: 'calc(50% - 8px)',
        p: 2,
        borderRadius: 2,
        background: 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(255,255,255,0.08)',
      }}
    >
      <Typography
        sx={{
          fontSize: 10.5,
          fontWeight: 700,
          letterSpacing: 0.6,
          textTransform: 'uppercase',
          color: 'text.secondary',
        }}
      >
        {label}
      </Typography>
      <Stack direction="row" sx={{ alignItems: 'baseline', gap: 1, mt: 0.75 }}>
        <Typography sx={{ fontSize: 22, fontWeight: 800, letterSpacing: -0.3 }}>{value}</Typography>
        {typeof delta === 'number' && (
          <Stack
            direction="row"
            sx={{ alignItems: 'center', color: positive ? '#22C55E' : '#EF4444' }}
          >
            {positive ? (
              <TrendingUpRoundedIcon sx={{ fontSize: 14 }} />
            ) : (
              <TrendingDownRoundedIcon sx={{ fontSize: 14 }} />
            )}
            <Typography sx={{ fontSize: 11.5, fontWeight: 700 }}>
              {Math.abs(delta).toFixed(1)}%
            </Typography>
          </Stack>
        )}
      </Stack>
    </Box>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <Typography
      sx={{
        fontSize: 10.5,
        fontWeight: 800,
        letterSpacing: 0.7,
        textTransform: 'uppercase',
        color: 'text.secondary',
        mb: 1.25,
      }}
    >
      {children}
    </Typography>
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
    setComments(prev => [...prev, { author: 'Owner', text: draft.trim(), ts: 'just now' }]);
    setDraft('');
  };

  return (
    <Dialog
      open={!!report}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      fullScreen
      slotProps={{
        paper: {
          sx: {
            borderRadius: 0,
            backgroundColor: 'background.default',
            backgroundImage: 'none',
            overflow: 'hidden',
            height: '100dvh',
            maxHeight: '100dvh',
          },
        },
      }}
    >
      {report && (
        <Box sx={{ p: { xs: 3, sm: 4 }, overflowY: 'auto', height: '100dvh', maxHeight: '100dvh' }}>
          {/* Header */}
          <Stack direction="row" sx={{ alignItems: 'flex-start', mb: 3 }}>
            <Box sx={{ flex: 1 }}>
              <Typography
                sx={{
                  fontSize: 10.5,
                  fontWeight: 800,
                  letterSpacing: 0.7,
                  textTransform: 'uppercase',
                  color: 'text.secondary',
                  mb: 0.75,
                }}
              >
                Sales Report
              </Typography>
              <Typography sx={{ fontSize: 22, fontWeight: 800, letterSpacing: -0.3, lineHeight: 1.2 }}>
                {report.title}
              </Typography>
              <Typography sx={{ fontSize: 12, color: 'text.secondary', mt: 0.5 }}>
                {report.period}
              </Typography>
            </Box>
            <IconButton onClick={onClose} sx={{ ml: 1 }}>
              <CloseRoundedIcon />
            </IconButton>
          </Stack>

          {/* Status banner */}
          {report.status === 'sent' && (
            <Stack
              direction="row"
              sx={{
                alignItems: 'center',
                gap: 1.25,
                px: 2,
                py: 1.5,
                borderRadius: 2,
                background: 'rgba(34,197,94,0.10)',
                border: '1px solid rgba(34,197,94,0.25)',
                mb: 3,
              }}
            >
              <WhatsAppIcon sx={{ fontSize: 18, color: '#22C55E' }} />
              <Typography sx={{ fontSize: 12.5, color: 'text.secondary', flex: 1 }}>
                Sent to {report.sentTo} on WhatsApp · {report.generatedAt}
              </Typography>
            </Stack>
          )}

          {report.status === 'pending-review' && (
            <Stack
              direction="row"
              sx={{
                alignItems: 'center',
                gap: 1.5,
                px: 2,
                py: 1.75,
                borderRadius: 2,
                background: 'rgba(245,158,11,0.10)',
                border: '1px solid rgba(245,158,11,0.25)',
                mb: 3,
              }}
            >
              <Typography sx={{ fontSize: 12.5, color: '#F59E0B', fontWeight: 700, flex: 1 }}>
                ⚠ Ready to review · awaiting your approval to send
              </Typography>
              <Button
                size="small"
                sx={{
                  px: 1.75,
                  py: 0.75,
                  background: '#22C55E',
                  color: '#fff',
                  fontSize: 11.5,
                  fontWeight: 800,
                  borderRadius: 999,
                  '&:hover': { background: '#22C55E', filter: 'brightness(1.08)' },
                }}
              >
                Send via WhatsApp
              </Button>
            </Stack>
          )}

          {/* KPIs */}
          {report.kpis.length > 0 && (
            <Box sx={{ mb: 3 }}>
              <SectionLabel>Highlighted KPIs</SectionLabel>
              <Stack direction="row" sx={{ gap: 1.5, flexWrap: 'wrap' }}>
                {report.kpis.map(k => (
                  <KpiPill key={k.label} label={k.label} value={k.value} delta={k.delta} />
                ))}
              </Stack>
            </Box>
          )}

          {/* Conversation */}
          <Box sx={{ mb: 3 }}>
            <SectionLabel>WhatsApp conversation</SectionLabel>
            {comments.length === 0 ? (
              <Box
                sx={{
                  p: 3,
                  borderRadius: 2,
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px dashed rgba(255,255,255,0.12)',
                  textAlign: 'center',
                }}
              >
                <Typography sx={{ fontSize: 12.5, color: 'text.secondary' }}>
                  No comments yet. Replies on WhatsApp will show up here.
                </Typography>
              </Box>
            ) : (
              <Stack spacing={1.5}>
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
                          px: 1.75,
                          py: 1.25,
                          borderRadius: 2,
                          background: isOwner ? 'rgba(34,197,94,0.16)' : 'rgba(255,255,255,0.05)',
                          border: `1px solid ${
                            isOwner ? 'rgba(34,197,94,0.25)' : 'rgba(255,255,255,0.08)'
                          }`,
                        }}
                      >
                        <Stack direction="row" sx={{ alignItems: 'baseline', gap: 1, mb: 0.5 }}>
                          <Typography
                            sx={{
                              fontSize: 11,
                              fontWeight: 800,
                              color: isOwner ? '#22C55E' : 'text.secondary',
                            }}
                          >
                            {c.author}
                          </Typography>
                          <Typography sx={{ fontSize: 10, color: 'text.disabled' }}>{c.ts}</Typography>
                        </Stack>
                        <Typography sx={{ fontSize: 13.5, color: 'text.primary' }}>{c.text}</Typography>
                      </Box>
                    </Stack>
                  );
                })}
              </Stack>
            )}
          </Box>

          {/* Reply input */}
          <Stack
            direction="row"
            sx={{
              alignItems: 'center',
              gap: 1,
              p: 1,
              borderRadius: 999,
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.10)',
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
              sx={{ pl: 2, fontSize: 13.5 }}
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
    </Dialog>
  );
}
