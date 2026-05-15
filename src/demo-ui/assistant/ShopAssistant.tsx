import {
  Box,
  Button,
  Chip,
  Drawer,
  IconButton,
  InputBase,
  LinearProgress,
  Stack,
  Typography,
} from '@mui/material';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import MicRoundedIcon from '@mui/icons-material/MicRounded';
import StopRoundedIcon from '@mui/icons-material/StopRounded';
import StorefrontRoundedIcon from '@mui/icons-material/StorefrontRounded';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import PhoneRoundedIcon from '@mui/icons-material/PhoneRounded';
import { useCallback, useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { tokens } from '../theme/tokens';
import { useLeads } from '../context/LeadsContext';
import { useShopAssistant } from './ShopAssistantContext';
import { useVoiceInput } from './useVoiceInput';
import {
  ASSISTANT_PROMPTS,
  buildLead,
  leadsToContactToday,
  monthlyTargetSuggestions,
  parseIntent,
  previewDraft,
  salesTargetSnapshot,
  unknownReply,
  type IntentResult,
  type ParsedLeadDraft,
} from './intents';
import type { Lead } from '../mock/data/leadManagement';

type Sender = 'user' | 'assistant';

interface Message {
  id: string;
  sender: Sender;
  result?: IntentResult;
  text: string;
  ts: number;
}

const formatINR = (n: number): string => {
  if (n >= 10000000) return `₹${(n / 10000000).toFixed(1)}Cr`;
  if (n >= 100000) return `₹${(n / 100000).toFixed(1)}L`;
  if (n >= 1000) return `₹${(n / 1000).toFixed(1)}K`;
  return `₹${n.toLocaleString('en-IN')}`;
};

/* ─── Result renderers ─────────────────────────────────── */
interface RenderProps {
  result: IntentResult;
  onAddLead: (draft: ParsedLeadDraft) => void;
  onOpenLead: (leadId: string) => void;
  onGoLeads: () => void;
  onGoSales: () => void;
}

function ResultCard({ result, onAddLead, onOpenLead, onGoLeads, onGoSales }: RenderProps) {
  if (result.kind === 'text') {
    return <Typography sx={{ fontSize: 13.5, lineHeight: 1.55 }}>{result.body}</Typography>;
  }

  if (result.kind === 'lead-preview') {
    return (
      <Stack spacing={1.25}>
        <Typography sx={{ fontSize: 13.5, lineHeight: 1.55 }}>{result.body}</Typography>
        <Box
          sx={{
            p: 1.25,
            borderRadius: 1.5,
            background: 'rgba(124,92,255,0.06)',
            border: '1px solid rgba(124,139,255,0.22)',
          }}
        >
          <Typography sx={{ fontSize: 10.5, fontWeight: 800, letterSpacing: 0.4, textTransform: 'uppercase', color: 'text.secondary' }}>
            Parsed lead
          </Typography>
          <Typography sx={{ fontSize: 13.5, fontWeight: 700, mt: 0.25 }}>
            {result.draft.customerName}
          </Typography>
          <Typography sx={{ fontSize: 12, color: 'text.secondary' }}>
            {previewDraft(result.draft)}
          </Typography>
        </Box>
        <Stack direction="row" sx={{ gap: 1 }}>
          <Button
            size="small"
            variant="contained"
            onClick={() => onAddLead(result.draft)}
            sx={{
              textTransform: 'none',
              background: tokens.gradient.aiAurora,
              boxShadow: 'none',
              '&:hover': { background: tokens.gradient.aiAurora, filter: 'brightness(1.08)' },
            }}
          >
            Add to leads
          </Button>
          <Button
            size="small"
            variant="text"
            onClick={onGoLeads}
            sx={{ textTransform: 'none', color: 'text.secondary' }}
          >
            View all leads
          </Button>
        </Stack>
      </Stack>
    );
  }

  if (result.kind === 'lead-added') {
    return (
      <Stack spacing={1}>
        <Typography sx={{ fontSize: 13.5, lineHeight: 1.55 }}>{result.body}</Typography>
        <Stack direction="row" sx={{ gap: 1 }}>
          <Button
            size="small"
            variant="outlined"
            onClick={() => onOpenLead(result.lead.leadId)}
            sx={{ textTransform: 'none' }}
          >
            Open lead
          </Button>
          <Button size="small" variant="text" onClick={onGoLeads} sx={{ textTransform: 'none', color: 'text.secondary' }}>
            View all leads
          </Button>
        </Stack>
      </Stack>
    );
  }

  if (result.kind === 'leads-today') {
    const { data } = result;
    return (
      <Stack spacing={1}>
        <Typography sx={{ fontSize: 13.5, lineHeight: 1.55 }}>{result.body}</Typography>
        {data.count === 0 ? (
          <Typography sx={{ fontSize: 12, color: 'text.secondary' }}>
            Nothing scheduled. Want to add a new follow-up?
          </Typography>
        ) : (
          <Stack spacing={0.75}>
            {data.leads.slice(0, 4).map((l: Lead) => (
              <Stack
                key={l.leadId}
                direction="row"
                onClick={() => onOpenLead(l.leadId)}
                sx={{
                  alignItems: 'center',
                  gap: 1,
                  p: 1,
                  borderRadius: 1.25,
                  background: 'rgba(11,15,26,0.04)',
                  cursor: 'pointer',
                  '&:hover': { background: 'rgba(11,15,26,0.08)' },
                }}
              >
                <Box sx={{ flex: 1, minWidth: 0 }}>
                  <Typography sx={{ fontSize: 13, fontWeight: 700, lineHeight: 1.2 }}>
                    {l.customerName}
                  </Typography>
                  <Typography sx={{ fontSize: 11, color: 'text.secondary' }}>
                    {l.leadStatus} · {l.leadSource} · {formatINR(l.budget || 0)}
                  </Typography>
                </Box>
                {l.customerPhone && (
                  <Stack direction="row" sx={{ alignItems: 'center', gap: 0.25, color: 'text.disabled' }}>
                    <PhoneRoundedIcon sx={{ fontSize: 12 }} />
                    <Typography sx={{ fontSize: 11 }}>{l.customerPhone}</Typography>
                  </Stack>
                )}
                <ChevronRightRoundedIcon sx={{ fontSize: 16, color: 'text.disabled' }} />
              </Stack>
            ))}
            {data.leads.length > 4 && (
              <Typography sx={{ fontSize: 11, color: 'text.disabled' }}>
                +{data.leads.length - 4} more
              </Typography>
            )}
          </Stack>
        )}
        <Button
          size="small"
          variant="text"
          onClick={onGoLeads}
          sx={{ alignSelf: 'flex-start', textTransform: 'none', color: 'text.secondary' }}
        >
          Open Lead Management →
        </Button>
      </Stack>
    );
  }

  if (result.kind === 'sales-target') {
    const { data } = result;
    const color = data.status === 'ahead' ? '#22C55E' : data.status === 'on-track' ? '#3B82F6' : '#F59E0B';
    return (
      <Stack spacing={1}>
        <Typography sx={{ fontSize: 13.5, lineHeight: 1.55 }}>{result.body}</Typography>
        <Box sx={{ p: 1.25, borderRadius: 1.5, background: 'rgba(11,15,26,0.04)' }}>
          <Stack direction="row" sx={{ alignItems: 'baseline', justifyContent: 'space-between', mb: 0.5 }}>
            <Typography sx={{ fontSize: 18, fontWeight: 800 }}>
              {formatINR(data.actualToday)}{' '}
              <Box component="span" sx={{ fontSize: 11, color: 'text.secondary', fontWeight: 600 }}>
                / {formatINR(data.targetToday)}
              </Box>
            </Typography>
            <Typography sx={{ fontSize: 11, fontWeight: 800, color, letterSpacing: 0.4, textTransform: 'uppercase' }}>
              {data.status}
            </Typography>
          </Stack>
          <LinearProgress
            variant="determinate"
            value={Math.min(100, data.pct)}
            sx={{
              height: 6,
              borderRadius: 999,
              backgroundColor: 'rgba(11,15,26,0.08)',
              '& .MuiLinearProgress-bar': { backgroundColor: color, borderRadius: 999 },
            }}
          />
          <Stack direction="row" sx={{ mt: 0.75, gap: 2, flexWrap: 'wrap' }}>
            <Typography sx={{ fontSize: 11, color: 'text.secondary' }}>
              {data.pct}% achieved
            </Typography>
            <Typography sx={{ fontSize: 11, color: 'text.secondary' }}>
              {formatINR(data.remaining)} remaining
            </Typography>
            <Typography sx={{ fontSize: 11, color: 'text.secondary' }}>
              EoD forecast {formatINR(data.predictedEod)}
            </Typography>
          </Stack>
        </Box>
        <Button
          size="small"
          variant="text"
          onClick={onGoSales}
          sx={{ alignSelf: 'flex-start', textTransform: 'none', color: 'text.secondary' }}
        >
          Open Sales Dashboard →
        </Button>
      </Stack>
    );
  }

  if (result.kind === 'monthly-advice') {
    return (
      <Stack spacing={1}>
        <Typography sx={{ fontSize: 13.5, lineHeight: 1.55 }}>{result.body}</Typography>
        <Stack spacing={0.5}>
          {result.tips.map((t, i) => (
            <Stack key={i} direction="row" sx={{ gap: 1, alignItems: 'flex-start' }}>
              <Box
                sx={{
                  flexShrink: 0,
                  width: 18,
                  height: 18,
                  borderRadius: '50%',
                  background: 'rgba(124,92,255,0.12)',
                  color: '#7C5CFF',
                  fontSize: 11,
                  fontWeight: 800,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mt: 0.25,
                }}
              >
                {i + 1}
              </Box>
              <Typography sx={{ fontSize: 13, lineHeight: 1.5 }}>{t}</Typography>
            </Stack>
          ))}
        </Stack>
        <Button
          size="small"
          variant="text"
          onClick={onGoSales}
          sx={{ alignSelf: 'flex-start', textTransform: 'none', color: 'text.secondary' }}
        >
          Open Sales Dashboard →
        </Button>
      </Stack>
    );
  }

  return null;
}

/* ─── Main component ──────────────────────────────────── */
export function ShopAssistant() {
  const { open, openAssistant, closeAssistant, consumePrompt } = useShopAssistant();
  const { leads, addLead } = useLeads();
  const navigate = useNavigate();

  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [thinking, setThinking] = useState(false);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  /* Auto-scroll on new messages. */
  useEffect(() => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, thinking]);

  const respond = useCallback(
    (raw: string) => {
      const intent = parseIntent(raw);
      let result: IntentResult;
      switch (intent.kind) {
        case 'add-lead':
          result = {
            kind: 'lead-preview',
            draft: intent.draft!,
            body: "I've parsed the details below. Confirm to add this lead.",
          };
          break;
        case 'leads-today': {
          const data = leadsToContactToday(leads);
          result = {
            kind: 'leads-today',
            data,
            body:
              data.count === 0
                ? "You have no leads scheduled for follow-up today."
                : `You have ${data.count} lead${data.count > 1 ? 's' : ''} to contact today.`,
          };
          break;
        }
        case 'leads-list': {
          const data = leadsToContactToday(leads);
          result = {
            kind: 'leads-today',
            data,
            body: data.count > 0
              ? `Here are the leads due today. ${leads.length} total in your pipeline.`
              : `No leads due today. ${leads.length} total in your pipeline.`,
          };
          break;
        }
        case 'sales-target-today': {
          const data = salesTargetSnapshot();
          const verb = data.status === 'ahead' ? 'ahead of' : data.status === 'on-track' ? 'on track for' : 'behind';
          result = {
            kind: 'sales-target',
            data,
            body: `You're ${verb} today's target — ${data.pct}% achieved (${data.orders} orders so far).`,
          };
          break;
        }
        case 'monthly-target-advice':
          result = {
            kind: 'monthly-advice',
            tips: monthlyTargetSuggestions(),
            body: 'Based on this week\'s patterns, here are the highest-leverage moves:',
          };
          break;
        default:
          result = unknownReply(raw);
      }
      setMessages(m => [
        ...m,
        { id: `a-${Date.now()}`, sender: 'assistant', result, text: result.body, ts: Date.now() },
      ]);
      setThinking(false);
    },
    [leads],
  );

  const send = useCallback(
    (raw?: string) => {
      const text = (raw ?? input).trim();
      if (!text) return;
      setMessages(m => [...m, { id: `u-${Date.now()}`, sender: 'user', text, ts: Date.now() }]);
      setInput('');
      setThinking(true);
      window.setTimeout(() => respond(text), 350);
    },
    [input, respond],
  );

  const handleVoiceComplete = useCallback(
    (transcript: string) => {
      setInput('');
      window.setTimeout(() => send(transcript), 100);
    },
    [send],
  );

  const { listening, supported: speechSupported, start: startListening, stop: stopListening } = useVoiceInput({
    onComplete: handleVoiceComplete,
    onTranscript: setInput,
  });

  /* Pull in pre-filled prompt when opened via an external trigger. */
  useEffect(() => {
    if (!open) return;
    const p = consumePrompt();
    if (!p) return;
    if (p.autoSend) {
      // Fire it as a real user message.
      send(p.text);
    } else {
      setInput(p.text);
    }
  }, [open, consumePrompt, send]);

  const handleAddLead = useCallback(
    (draft: ParsedLeadDraft) => {
      const lead = buildLead(draft);
      addLead(lead);
      setMessages(m => [
        ...m,
        {
          id: `a-${Date.now()}`,
          sender: 'assistant',
          result: {
            kind: 'lead-added',
            lead,
            body: `Added ${lead.customerName} to your leads (${lead.leadId}). They're set as New Lead, follow-up today.`,
          },
          text: 'Added',
          ts: Date.now(),
        },
      ]);
    },
    [addLead],
  );

  const handleOpenLead = useCallback(
    (leadId: string) => {
      closeAssistant();
      navigate(`/demo/lead?leadId=${encodeURIComponent(leadId)}`);
    },
    [closeAssistant, navigate],
  );

  const goLeads = useCallback(() => {
    closeAssistant();
    navigate('/demo/lead');
  }, [closeAssistant, navigate]);

  const goSales = useCallback(() => {
    closeAssistant();
    navigate('/demo/sales');
  }, [closeAssistant, navigate]);

  return (
    <>
      {/* Floating launcher button */}
      <Box
        component={motion.div}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.3, type: 'spring', stiffness: 220, damping: 18 }}
        sx={{
          position: 'fixed',
          right: { xs: 16, md: 28 },
          bottom: { xs: 24, md: 28 },
          zIndex: 60,
        }}
      >
        <IconButton
          onClick={() => openAssistant()}
          aria-label="Open Shop Assistant"
          sx={{
            width: 56,
            height: 56,
            borderRadius: '50%',
            color: '#fff',
            background: tokens.gradient.aiAurora,
            boxShadow: '0 16px 36px rgba(124,92,255,0.45)',
            '&:hover': { background: tokens.gradient.aiAurora, filter: 'brightness(1.08)' },
            animation: 'aiPulse 2.6s ease-in-out infinite',
            '@keyframes aiPulse': {
              '0%, 100%': { boxShadow: '0 16px 36px rgba(124,92,255,0.45)' },
              '50%': { boxShadow: '0 16px 48px rgba(54,209,220,0.55)' },
            },
          }}
        >
          <AutoAwesomeIcon />
        </IconButton>
      </Box>

      <Drawer
        anchor="bottom"
        open={open}
        onClose={closeAssistant}
        slotProps={{
          paper: {
            sx: {
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
              backgroundColor: 'background.default',
              height: '88vh',
              display: 'flex',
              flexDirection: 'column',
            },
          },
        }}
      >
        {/* Header */}
        <Stack direction="row" sx={{ alignItems: 'center', gap: 1, p: 2, pb: 1 }}>
          <Box
            sx={{
              width: 36,
              height: 36,
              borderRadius: 1.75,
              background: tokens.gradient.aiAurora,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
            }}
          >
            <StorefrontRoundedIcon sx={{ fontSize: 20 }} />
          </Box>
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Typography sx={{ fontSize: 15, fontWeight: 800, letterSpacing: -0.2 }}>
              Shop Assistant
            </Typography>
            <Typography sx={{ fontSize: 11, color: 'text.secondary' }}>
              Voice + chat · adds leads, checks targets, runs your store.
            </Typography>
          </Box>
          <IconButton size="small" onClick={closeAssistant}>
            <CloseRoundedIcon fontSize="small" />
          </IconButton>
        </Stack>

        {/* Conversation */}
        <Box
          ref={scrollRef}
          sx={{
            flex: 1,
            overflowY: 'auto',
            px: 2,
            py: 1,
          }}
        >
          {messages.length === 0 && (
            <Stack spacing={1.5} sx={{ mt: 1 }}>
              <Box
                sx={{
                  p: 1.75,
                  borderRadius: 2,
                  background: 'rgba(124,92,255,0.06)',
                  border: '1px dashed rgba(124,139,255,0.22)',
                }}
              >
                <Typography sx={{ fontSize: 13, lineHeight: 1.55 }}>
                  Hi 👋 I can <b>add leads</b>, surface <b>today's follow-ups</b>, check your
                  <b> sales target</b>, and suggest moves to <b>hit your monthly target</b>. Tap
                  the mic to speak, or pick a prompt below.
                </Typography>
              </Box>
              <Typography sx={{ fontSize: 10.5, fontWeight: 800, letterSpacing: 0.6, textTransform: 'uppercase', color: 'text.secondary' }}>
                Try saying
              </Typography>
              <Stack direction="row" sx={{ gap: 0.75, flexWrap: 'wrap' }}>
                {ASSISTANT_PROMPTS.map(p => (
                  <Chip
                    key={p}
                    label={p}
                    onClick={() => send(p)}
                    sx={{
                      borderRadius: 999,
                      background: 'rgba(124,92,255,0.08)',
                      border: '1px solid rgba(124,139,255,0.22)',
                      fontSize: 11.5,
                      height: 28,
                      '&:hover': { background: 'rgba(124,92,255,0.14)' },
                    }}
                  />
                ))}
              </Stack>
            </Stack>
          )}

          <Stack spacing={1.25} sx={{ pt: 1 }}>
            <AnimatePresence initial={false}>
              {messages.map(m => (
                <motion.div
                  key={m.id}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.18 }}
                >
                  <Stack direction="row" sx={{ justifyContent: m.sender === 'user' ? 'flex-end' : 'flex-start' }}>
                    <Box
                      sx={{
                        maxWidth: '88%',
                        px: 1.5,
                        py: 1.1,
                        borderRadius: 2,
                        background:
                          m.sender === 'user'
                            ? 'linear-gradient(135deg, rgba(124,92,255,0.95), rgba(54,209,220,0.95))'
                            : 'rgba(11,15,26,0.04)',
                        color: m.sender === 'user' ? '#fff' : 'inherit',
                        borderTopRightRadius: m.sender === 'user' ? 4 : 16,
                        borderTopLeftRadius: m.sender === 'assistant' ? 4 : 16,
                      }}
                    >
                      {m.sender === 'user' ? (
                        <Typography sx={{ fontSize: 13.5, lineHeight: 1.45 }}>{m.text}</Typography>
                      ) : m.result ? (
                        <ResultCard
                          result={m.result}
                          onAddLead={handleAddLead}
                          onOpenLead={handleOpenLead}
                          onGoLeads={goLeads}
                          onGoSales={goSales}
                        />
                      ) : (
                        <Typography sx={{ fontSize: 13.5, lineHeight: 1.55 }}>{m.text}</Typography>
                      )}
                    </Box>
                  </Stack>
                </motion.div>
              ))}
            </AnimatePresence>
            {thinking && (
              <Stack direction="row" sx={{ alignItems: 'center', gap: 1, color: 'text.secondary', pl: 1 }}>
                <Box sx={{ width: 6, height: 6, borderRadius: '50%', background: 'currentColor', animation: 'tdot 1s infinite' }} />
                <Box sx={{ width: 6, height: 6, borderRadius: '50%', background: 'currentColor', animation: 'tdot 1s infinite .15s' }} />
                <Box sx={{ width: 6, height: 6, borderRadius: '50%', background: 'currentColor', animation: 'tdot 1s infinite .3s' }} />
                <Typography sx={{ fontSize: 11 }}>thinking…</Typography>
                <Box
                  sx={{
                    '@keyframes tdot': {
                      '0%, 80%, 100%': { opacity: 0.25 },
                      '40%': { opacity: 1 },
                    },
                  }}
                />
              </Stack>
            )}
          </Stack>
        </Box>

        {/* Composer */}
        <Box sx={{ p: 1.5, borderTop: '1px solid rgba(11,15,26,0.06)' }}>
          {listening && (
            <Stack direction="row" sx={{ alignItems: 'center', gap: 0.75, mb: 1, color: '#7C5CFF', pl: 0.5 }}>
              <Box
                sx={{
                  width: 8, height: 8, borderRadius: '50%', background: '#7C5CFF',
                  animation: 'micPulse 1s ease-in-out infinite',
                  '@keyframes micPulse': {
                    '0%, 100%': { opacity: 0.4, transform: 'scale(0.85)' },
                    '50%': { opacity: 1, transform: 'scale(1.15)' },
                  },
                }}
              />
              <Typography sx={{ fontSize: 11.5, fontWeight: 700 }}>Listening… pause when done to send</Typography>
            </Stack>
          )}
          <Stack
            direction="row"
            sx={{
              alignItems: 'center',
              gap: 0.5,
              p: 0.75,
              borderRadius: 999,
              background: 'rgba(11,15,26,0.04)',
              border: '1px solid rgba(11,15,26,0.08)',
            }}
          >
            <IconButton
              size="small"
              onClick={listening ? stopListening : startListening}
              disabled={!speechSupported}
              aria-label={listening ? 'Send now (stop listening)' : 'Start voice input'}
              sx={{
                color: listening ? '#fff' : '#7C5CFF',
                background: listening ? '#7C5CFF' : 'transparent',
                '&:hover': { background: listening ? '#7C5CFF' : 'rgba(124,92,255,0.08)' },
              }}
            >
              {listening ? <StopRoundedIcon fontSize="small" /> : <MicRoundedIcon fontSize="small" />}
            </IconButton>
            <InputBase
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  send();
                }
              }}
              placeholder={speechSupported ? 'Type or tap mic to speak…' : 'Type a command…'}
              fullWidth
              sx={{ px: 1, fontSize: 14 }}
            />
            <IconButton
              size="small"
              onClick={() => send()}
              disabled={!input.trim()}
              sx={{
                background: tokens.gradient.aiAurora,
                color: '#fff',
                '&.Mui-disabled': { opacity: 0.4, color: '#fff' },
                '&:hover': { background: tokens.gradient.aiAurora, filter: 'brightness(1.08)' },
              }}
            >
              <SendRoundedIcon fontSize="small" />
            </IconButton>
          </Stack>
        </Box>
      </Drawer>
    </>
  );
}
