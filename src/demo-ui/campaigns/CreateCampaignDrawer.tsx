import {
  Box,
  Button,
  Drawer,
  IconButton,
  LinearProgress,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import SmsRoundedIcon from '@mui/icons-material/SmsRounded';
import NotificationsActiveRoundedIcon from '@mui/icons-material/NotificationsActiveRounded';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import RocketLaunchRoundedIcon from '@mui/icons-material/RocketLaunchRounded';
import GroupsRoundedIcon from '@mui/icons-material/GroupsRounded';
import AddPhotoAlternateRoundedIcon from '@mui/icons-material/AddPhotoAlternateRounded';
import CloudUploadRoundedIcon from '@mui/icons-material/CloudUploadRounded';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import { useEffect, useRef, useState } from 'react';
import {
  channelColor,
  segments,
  templates,
} from './mock';
import type { CampaignTemplate, Channel } from './mock';
import { ChannelPreviews } from './ChannelPreviews';

const CAMPAIGN_GRADIENT = 'linear-gradient(135deg, #FF6FA8 0%, #E54E8A 100%)';

const CHANNELS: { id: Channel; label: string; icon: React.ReactNode; sub: string }[] = [
  { id: 'WhatsApp', label: 'WhatsApp', icon: <WhatsAppIcon sx={{ fontSize: 18 }} />, sub: 'Highest open rates' },
  { id: 'SMS', label: 'SMS', icon: <SmsRoundedIcon sx={{ fontSize: 18 }} />, sub: 'Reliable, no internet needed' },
  { id: 'Push', label: 'Push', icon: <NotificationsActiveRoundedIcon sx={{ fontSize: 18 }} />, sub: 'For app users only' },
];

type Step = 1 | 2 | 3 | 4 | 5;

interface Props {
  open: boolean;
  onClose: () => void;
  initialTemplate?: CampaignTemplate | null;
}

const SectionLabel = ({ children }: { children: React.ReactNode }) => (
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
    {children}
  </Typography>
);

export function CreateCampaignDrawer({ open, onClose, initialTemplate }: Props) {
  const [step, setStep] = useState<Step>(1);
  const [name, setName] = useState('');
  const [pickedTemplate, setPickedTemplate] = useState<CampaignTemplate | null>(null);
  const [scratchSelected, setScratchSelected] = useState(false);
  const [segmentId, setSegmentId] = useState<string>(segments[0].id);
  const [channels, setChannels] = useState<Channel[]>(['WhatsApp']);
  const [message, setMessage] = useState('');
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [aiPrompt, setAiPrompt] = useState('');
  const [aiBusy, setAiBusy] = useState<'none' | 'all' | 'image' | 'message'>('none');
  const [schedule, setSchedule] = useState<'now' | 'later'>('now');
  const [scheduleAt, setScheduleAt] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const fileRef = useRef<HTMLInputElement | null>(null);

  // Seed from template if provided
  useEffect(() => {
    if (open && initialTemplate) {
      setPickedTemplate(initialTemplate);
      setScratchSelected(false);
      setName(initialTemplate.name);
      setChannels(initialTemplate.channels);
      setMessage(initialTemplate.defaultBody);
      setStep(2);
    }
  }, [open, initialTemplate]);

  const reset = () => {
    setStep(1);
    setName('');
    setPickedTemplate(null);
    setScratchSelected(false);
    setSegmentId(segments[0].id);
    setChannels(['WhatsApp']);
    setMessage('');
    setImageUrl(null);
    setAiPrompt('');
    setAiBusy('none');
    setSchedule('now');
    setScheduleAt('');
    setSubmitted(false);
  };

  const onPickImage = () => fileRef.current?.click();
  const onImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => setImageUrl((ev.target?.result as string) ?? null);
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  const generateMessageFromPrompt = (prompt: string): string => {
    const p = prompt.trim();
    const lower = p.toLowerCase();
    if (!p) {
      return `Hey {{first_name}} 👋 we've got something fresh for you at Storeone Mart — tap to see what's new this week. Exclusive picks for our regulars.`;
    }
    if (lower.includes('birthday')) {
      return `🎂 Happy birthday {{first_name}}! A little gift from us — ${p}. Use code BDAY500 for ₹500 off this week. With love, Storeone Mart 💜`;
    }
    if (
      lower.includes('festiv') ||
      lower.includes('diwali') ||
      lower.includes('eid') ||
      lower.includes('holi') ||
      lower.includes('rakhi')
    ) {
      return `{{first_name}}, the festive season is here 🪔 ${p}. Shop your favourites with up to ₹1500 off — early access for our regulars.`;
    }
    if (
      lower.includes('miss') ||
      lower.includes('lapsed') ||
      lower.includes('comeback') ||
      lower.includes('win back')
    ) {
      return `We miss you, {{first_name}} 💜 ${p}. Come back with 15% off your next order · code COMEBACK15. Valid this week.`;
    }
    if (lower.includes('cart') || lower.includes('abandon')) {
      return `Your cart is waiting, {{first_name}} 🛒 ${p}. Check out in the next 24h for free delivery.`;
    }
    if (lower.includes('vip') || lower.includes('loyal')) {
      return `VIP perk just for you {{first_name}} ✨ ${p}. Earn 2x loyalty points on every order this weekend.`;
    }
    if (lower.includes('drop') || lower.includes('new') || lower.includes('launch')) {
      return `Just dropped {{first_name}} 👀 ${p}. Tap to peek before it sells out — your size, your style.`;
    }
    if (lower.includes('discount') || lower.includes('% off') || lower.includes('sale')) {
      return `Hey {{first_name}} 🎉 ${p}. Limited time — shop now and save big at Storeone Mart.`;
    }
    return `Hi {{first_name}} 👋 ${p}. Tap below to grab yours before it's gone — handpicked for you at Storeone Mart.`;
  };

  const generateImageUrl = (prompt: string): string => {
    const seed = encodeURIComponent(
      (prompt.trim() || name || pickedTemplate?.name || 'campaign').slice(0, 60),
    );
    return `https://picsum.photos/seed/${seed}/800/420`;
  };

  const onGenerateAll = () => {
    setAiBusy('all');
    window.setTimeout(() => {
      setMessage(generateMessageFromPrompt(aiPrompt));
      setImageUrl(generateImageUrl(aiPrompt));
      setAiBusy('none');
    }, 1100);
  };

  const onRegenerateMessage = () => {
    setAiBusy('message');
    window.setTimeout(() => {
      setMessage(generateMessageFromPrompt(aiPrompt));
      setAiBusy('none');
    }, 600);
  };

  const onRegenerateImage = () => {
    setAiBusy('image');
    window.setTimeout(() => {
      setImageUrl(generateImageUrl(aiPrompt + ' ' + Date.now()));
      setAiBusy('none');
    }, 600);
  };

  const close = () => {
    reset();
    onClose();
  };

  const segment = segments.find(s => s.id === segmentId);

  const toggleChannel = (c: Channel) => {
    setChannels(prev => (prev.includes(c) ? prev.filter(x => x !== c) : [...prev, c]));
  };

  const canContinue = () => {
    if (step === 1) return (scratchSelected || !!pickedTemplate) && name.trim().length > 0;
    if (step === 2) return !!segment;
    if (step === 3) return channels.length > 0;
    if (step === 4) return message.trim().length > 5;
    if (step === 5) return schedule === 'now' || scheduleAt.length > 0;
    return false;
  };

  const next = () => {
    if (step < 5) setStep((step + 1) as Step);
    else {
      setSubmitted(true);
      window.setTimeout(close, 1400);
    }
  };
  const back = () => {
    if (step > 1) setStep((step - 1) as Step);
  };

  return (
    <Drawer
      anchor="bottom"
      open={open}
      onClose={close}
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
      <Box sx={{ p: 2, overflowY: 'auto' }}>
        {/* Header */}
        <Stack direction="row" sx={{ alignItems: 'center', mb: 1.5, gap: 1 }}>
          {step > 1 && !submitted && (
            <IconButton onClick={back} size="small">
              <ChevronLeftRoundedIcon />
            </IconButton>
          )}
          <Box sx={{ flex: 1 }}>
            <Typography
              sx={{
                fontSize: 10.5,
                fontWeight: 800,
                letterSpacing: 0.6,
                textTransform: 'uppercase',
                color: 'text.secondary',
              }}
            >
              {submitted ? 'Launched' : `Step ${step} of 5`}
            </Typography>
            <Typography sx={{ fontSize: 20, fontWeight: 800, letterSpacing: -0.3 }}>
              {submitted
                ? 'Campaign launched!'
                : step === 1
                ? 'Pick a campaign type'
                : step === 2
                ? 'Choose audience'
                : step === 3
                ? 'Choose channel'
                : step === 4
                ? 'Write message'
                : 'Schedule & launch'}
            </Typography>
          </Box>
          <IconButton onClick={close}>
            <CloseRoundedIcon />
          </IconButton>
        </Stack>

        {!submitted && (
          <LinearProgress
            variant="determinate"
            value={(step / 5) * 100}
            sx={{
              height: 5,
              borderRadius: 999,
              bgcolor: 'rgba(11,15,26,0.06)',
              mb: 2,
              '& .MuiLinearProgress-bar': {
                borderRadius: 999,
                background: CAMPAIGN_GRADIENT,
              },
            }}
          />
        )}

        {submitted && (
          <Box sx={{ py: 4, textAlign: 'center' }}>
            <Box
              sx={{
                width: 84,
                height: 84,
                borderRadius: '50%',
                mx: 'auto',
                mb: 2,
                background: CAMPAIGN_GRADIENT,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
                boxShadow: '0 12px 28px rgba(229,78,138,0.34)',
              }}
            >
              <CheckCircleRoundedIcon sx={{ fontSize: 48 }} />
            </Box>
            <Typography sx={{ fontSize: 17, fontWeight: 800, mb: 0.5 }}>
              "{name}" is live
            </Typography>
            <Typography sx={{ fontSize: 13, color: 'text.secondary' }}>
              Reaching {segment?.size ?? 0} customers across {channels.join(' + ')}
            </Typography>
          </Box>
        )}

        {/* STEP 1 — Type */}
        {!submitted && step === 1 && (
          <Stack spacing={1.5}>
            <SectionLabel>Campaign name</SectionLabel>
            <TextField
              size="small"
              fullWidth
              placeholder="e.g. Summer Edit · 30% off"
              value={name}
              onChange={e => setName(e.target.value)}
              sx={{ mb: 1.5 }}
            />
            <SectionLabel>Start from a template — or build your own</SectionLabel>
            <Stack spacing={1}>
              {/* Start from scratch */}
              <Box
                onClick={() => {
                  setScratchSelected(true);
                  setPickedTemplate(null);
                  setChannels(['WhatsApp']);
                  setMessage('');
                  setImageUrl(null);
                  if (!name.trim()) setName('Untitled campaign');
                }}
                sx={theme => ({
                  p: 1.5,
                  borderRadius: 1.75,
                  cursor: 'pointer',
                  bgcolor: scratchSelected
                    ? 'rgba(124,92,255,0.10)'
                    : theme.palette.mode === 'dark'
                    ? 'rgba(255,255,255,0.04)'
                    : 'rgba(11,15,26,0.03)',
                  border: scratchSelected
                    ? '1.5px dashed #7C5CFF'
                    : theme.palette.mode === 'dark'
                    ? '1.5px dashed rgba(255,255,255,0.14)'
                    : '1.5px dashed rgba(11,15,26,0.18)',
                })}
              >
                <Stack direction="row" sx={{ alignItems: 'center', gap: 1 }}>
                  <Box
                    sx={{
                      width: 32,
                      height: 32,
                      borderRadius: 1.25,
                      background:
                        'linear-gradient(135deg, #7C5CFF 0%, #4E8CFF 50%, #36D1DC 100%)',
                      color: '#fff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <AddCircleOutlineRoundedIcon sx={{ fontSize: 18 }} />
                  </Box>
                  <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Typography sx={{ fontSize: 13.5, fontWeight: 800 }}>
                      Start from scratch
                    </Typography>
                    <Typography sx={{ fontSize: 11, color: 'text.secondary' }}>
                      Build a custom campaign — AI will help you write it later
                    </Typography>
                  </Box>
                  {scratchSelected && (
                    <CheckCircleRoundedIcon sx={{ color: '#7C5CFF', fontSize: 22 }} />
                  )}
                </Stack>
              </Box>
              {templates.map(t => {
                const selected = pickedTemplate?.id === t.id;
                return (
                  <Box
                    key={t.id}
                    onClick={() => {
                      setPickedTemplate(t);
                      setScratchSelected(false);
                      if (!name || name === 'Untitled campaign') setName(t.name);
                      setChannels(t.channels);
                      setMessage(t.defaultBody);
                    }}
                    sx={theme => ({
                      p: 1.5,
                      borderRadius: 1.75,
                      cursor: 'pointer',
                      bgcolor: selected
                        ? 'rgba(229,78,138,0.10)'
                        : theme.palette.mode === 'dark'
                        ? 'rgba(255,255,255,0.04)'
                        : 'rgba(11,15,26,0.03)',
                      border: selected
                        ? '1.5px solid #E54E8A'
                        : theme.palette.mode === 'dark'
                        ? '1px solid rgba(255,255,255,0.06)'
                        : '1px solid rgba(11,15,26,0.05)',
                      transition: 'all .2s',
                    })}
                  >
                    <Stack direction="row" sx={{ alignItems: 'center', gap: 1 }}>
                      <Box
                        sx={{
                          width: 32,
                          height: 32,
                          borderRadius: 1.25,
                          background: CAMPAIGN_GRADIENT,
                          color: '#fff',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0,
                        }}
                      >
                        <AutoAwesomeIcon sx={{ fontSize: 16 }} />
                      </Box>
                      <Box sx={{ flex: 1, minWidth: 0 }}>
                        <Typography sx={{ fontSize: 13.5, fontWeight: 800 }}>{t.name}</Typography>
                        <Typography sx={{ fontSize: 11, color: 'text.secondary' }}>
                          {t.description}
                        </Typography>
                      </Box>
                      {selected && (
                        <CheckCircleRoundedIcon sx={{ color: '#E54E8A', fontSize: 22 }} />
                      )}
                    </Stack>
                  </Box>
                );
              })}
            </Stack>
          </Stack>
        )}

        {/* STEP 2 — Audience */}
        {!submitted && step === 2 && (
          <Stack spacing={1.5}>
            <SectionLabel>Audience segments</SectionLabel>
            <Stack spacing={1}>
              {segments.map(s => {
                const selected = segmentId === s.id;
                return (
                  <Box
                    key={s.id}
                    onClick={() => setSegmentId(s.id)}
                    sx={theme => ({
                      p: 1.5,
                      borderRadius: 1.75,
                      cursor: 'pointer',
                      bgcolor: selected
                        ? 'rgba(229,78,138,0.10)'
                        : theme.palette.mode === 'dark'
                        ? 'rgba(255,255,255,0.04)'
                        : 'rgba(11,15,26,0.03)',
                      border: selected
                        ? '1.5px solid #E54E8A'
                        : theme.palette.mode === 'dark'
                        ? '1px solid rgba(255,255,255,0.06)'
                        : '1px solid rgba(11,15,26,0.05)',
                    })}
                  >
                    <Stack direction="row" sx={{ alignItems: 'center', gap: 1, mb: 0.5 }}>
                      <GroupsRoundedIcon sx={{ fontSize: 18, color: '#E54E8A' }} />
                      <Typography sx={{ fontSize: 13.5, fontWeight: 800, flex: 1 }}>
                        {s.name}
                      </Typography>
                      <Typography sx={{ fontSize: 12, fontWeight: 800, color: '#E54E8A' }}>
                        {s.size}
                      </Typography>
                      {selected && (
                        <CheckCircleRoundedIcon sx={{ color: '#E54E8A', fontSize: 20 }} />
                      )}
                    </Stack>
                    <Stack direction="row" sx={{ flexWrap: 'wrap', gap: 0.5 }}>
                      {s.tags.map(tag => (
                        <Box
                          key={tag}
                          sx={theme => ({
                            fontSize: 10.5,
                            fontWeight: 700,
                            px: 0.875,
                            py: 0.25,
                            borderRadius: 999,
                            bgcolor:
                              theme.palette.mode === 'dark'
                                ? 'rgba(255,255,255,0.06)'
                                : 'rgba(11,15,26,0.06)',
                            color: 'text.secondary',
                          })}
                        >
                          {tag}
                        </Box>
                      ))}
                    </Stack>
                  </Box>
                );
              })}
            </Stack>
          </Stack>
        )}

        {/* STEP 3 — Channels */}
        {!submitted && step === 3 && (
          <Stack spacing={1.5}>
            <SectionLabel>Select one or more channels</SectionLabel>
            <Stack spacing={1}>
              {CHANNELS.map(ch => {
                const selected = channels.includes(ch.id);
                return (
                  <Box
                    key={ch.id}
                    onClick={() => toggleChannel(ch.id)}
                    sx={theme => ({
                      p: 1.5,
                      borderRadius: 1.75,
                      cursor: 'pointer',
                      bgcolor: selected
                        ? `${channelColor[ch.id]}14`
                        : theme.palette.mode === 'dark'
                        ? 'rgba(255,255,255,0.04)'
                        : 'rgba(11,15,26,0.03)',
                      border: selected
                        ? `1.5px solid ${channelColor[ch.id]}`
                        : theme.palette.mode === 'dark'
                        ? '1px solid rgba(255,255,255,0.06)'
                        : '1px solid rgba(11,15,26,0.05)',
                    })}
                  >
                    <Stack direction="row" sx={{ alignItems: 'center', gap: 1 }}>
                      <Box
                        sx={{
                          width: 36,
                          height: 36,
                          borderRadius: 1.25,
                          bgcolor: channelColor[ch.id],
                          color: '#fff',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0,
                        }}
                      >
                        {ch.icon}
                      </Box>
                      <Box sx={{ flex: 1, minWidth: 0 }}>
                        <Typography sx={{ fontSize: 13.5, fontWeight: 800 }}>{ch.label}</Typography>
                        <Typography sx={{ fontSize: 11, color: 'text.secondary' }}>
                          {ch.sub}
                        </Typography>
                      </Box>
                      {selected && (
                        <CheckCircleRoundedIcon
                          sx={{ color: channelColor[ch.id], fontSize: 22 }}
                        />
                      )}
                    </Stack>
                  </Box>
                );
              })}
            </Stack>
          </Stack>
        )}

        {/* STEP 4 — Message */}
        {!submitted && step === 4 && (
          <Stack spacing={1.5}>
            {/* AI prompt generator */}
            <Box
              sx={{
                p: 1.5,
                borderRadius: 2,
                background:
                  'linear-gradient(135deg, rgba(124,92,255,0.10) 0%, rgba(54,209,220,0.10) 100%)',
                border: '1px solid rgba(124,92,255,0.22)',
              }}
            >
              <Stack direction="row" sx={{ alignItems: 'center', gap: 0.75, mb: 1 }}>
                <Box
                  sx={{
                    width: 26,
                    height: 26,
                    borderRadius: 1,
                    background:
                      'linear-gradient(135deg, #7C5CFF 0%, #4E8CFF 50%, #36D1DC 100%)',
                    color: '#fff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <AutoAwesomeIcon sx={{ fontSize: 15 }} />
                </Box>
                <Box sx={{ flex: 1 }}>
                  <Typography
                    sx={{ fontSize: 11, fontWeight: 800, letterSpacing: 0.4, color: '#7C5CFF' }}
                  >
                    AI COPILOT
                  </Typography>
                  <Typography sx={{ fontSize: 12.5, fontWeight: 800 }}>
                    Generate message + image
                  </Typography>
                </Box>
              </Stack>
              <TextField
                fullWidth
                multiline
                minRows={2}
                size="small"
                value={aiPrompt}
                onChange={e => setAiPrompt(e.target.value)}
                placeholder="Describe what you want — e.g. '30% off summer denim for VIPs, urgent and friendly tone'"
                sx={{
                  mb: 1,
                  '& .MuiOutlinedInput-root': { bgcolor: 'background.paper' },
                }}
              />
              <Stack direction="row" sx={{ alignItems: 'center', gap: 1 }}>
                <Stack direction="row" sx={{ flexWrap: 'wrap', gap: 0.5, flex: 1 }}>
                  {[
                    'Diwali 30% off festive',
                    'Win back lapsed shoppers',
                    'VIP-only loyalty rewards',
                    'New denim drop',
                  ].map(s => (
                    <Box
                      key={s}
                      onClick={() => setAiPrompt(s)}
                      sx={{
                        fontSize: 10.5,
                        fontWeight: 700,
                        px: 0.875,
                        py: 0.375,
                        borderRadius: 999,
                        cursor: 'pointer',
                        bgcolor: 'rgba(124,92,255,0.10)',
                        color: '#7C5CFF',
                        border: '1px solid rgba(124,92,255,0.22)',
                        '&:hover': { bgcolor: 'rgba(124,92,255,0.18)' },
                      }}
                    >
                      {s}
                    </Box>
                  ))}
                </Stack>
              </Stack>
              <Button
                fullWidth
                onClick={aiBusy === 'none' ? onGenerateAll : undefined}
                disabled={aiBusy !== 'none'}
                startIcon={<AutoAwesomeIcon />}
                sx={{
                  mt: 1.25,
                  background:
                    'linear-gradient(135deg, #7C5CFF 0%, #4E8CFF 50%, #36D1DC 100%)',
                  color: '#fff',
                  fontWeight: 800,
                  fontSize: 13,
                  py: 0.875,
                  borderRadius: 1.5,
                  textTransform: 'none',
                  boxShadow: '0 6px 14px rgba(124,92,255,0.32)',
                  '&:hover': { filter: 'brightness(1.08)' },
                  '&.Mui-disabled': {
                    background: 'rgba(124,92,255,0.4)',
                    color: 'rgba(255,255,255,0.7)',
                  },
                }}
              >
                {aiBusy === 'all'
                  ? 'Generating message and image…'
                  : message
                  ? 'Regenerate from prompt'
                  : 'Generate message and image'}
              </Button>
              <Typography
                sx={{ fontSize: 10.5, color: 'text.secondary', mt: 0.75, textAlign: 'center' }}
              >
                Tip · use <strong>{'{{first_name}}'}</strong>, <strong>{'{{tier}}'}</strong> or{' '}
                <strong>{'{{product}}'}</strong> in any output to personalise per customer
              </Typography>
            </Box>

            <Stack direction="row" sx={{ alignItems: 'center', mb: -0.5 }}>
              <SectionLabel>Message</SectionLabel>
              <Box sx={{ flex: 1 }} />
              <Stack
                direction="row"
                onClick={aiBusy === 'none' ? onRegenerateMessage : undefined}
                sx={{
                  alignItems: 'center',
                  gap: 0.375,
                  px: 0.875,
                  py: 0.25,
                  borderRadius: 999,
                  cursor: aiBusy === 'none' ? 'pointer' : 'wait',
                  bgcolor: 'rgba(124,92,255,0.10)',
                  color: '#7C5CFF',
                  fontSize: 10.5,
                  fontWeight: 800,
                  opacity: aiBusy !== 'none' && aiBusy !== 'message' ? 0.5 : 1,
                  '&:hover': { bgcolor: 'rgba(124,92,255,0.18)' },
                }}
              >
                <AutoAwesomeIcon sx={{ fontSize: 12 }} />
                {aiBusy === 'message' ? 'Writing…' : 'Regenerate'}
              </Stack>
            </Stack>
            <TextField
              fullWidth
              multiline
              minRows={5}
              value={message}
              onChange={e => setMessage(e.target.value)}
              placeholder="Tap 'Generate' above or write your message here…"
            />

            <Stack direction="row" sx={{ alignItems: 'center', mb: -0.5 }}>
              <SectionLabel>
                Image / creative {channels.length === 1 && channels[0] === 'SMS' ? '(not supported on SMS)' : ''}
              </SectionLabel>
              <Box sx={{ flex: 1 }} />
              {imageUrl && (
                <Stack
                  direction="row"
                  onClick={aiBusy === 'none' ? onRegenerateImage : undefined}
                  sx={{
                    alignItems: 'center',
                    gap: 0.375,
                    px: 0.875,
                    py: 0.25,
                    borderRadius: 999,
                    cursor: aiBusy === 'none' ? 'pointer' : 'wait',
                    bgcolor: 'rgba(124,92,255,0.10)',
                    color: '#7C5CFF',
                    fontSize: 10.5,
                    fontWeight: 800,
                    opacity: aiBusy !== 'none' && aiBusy !== 'image' ? 0.5 : 1,
                    '&:hover': { bgcolor: 'rgba(124,92,255,0.18)' },
                  }}
                >
                  <AutoAwesomeIcon sx={{ fontSize: 12 }} />
                  {aiBusy === 'image' ? 'Drawing…' : 'Regenerate'}
                </Stack>
              )}
            </Stack>
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              onChange={onImageChange}
              style={{ display: 'none' }}
            />
            {imageUrl ? (
              <Box
                sx={{
                  position: 'relative',
                  borderRadius: 1.75,
                  overflow: 'hidden',
                  border: '1px solid rgba(11,15,26,0.08)',
                }}
              >
                <Box
                  component="img"
                  src={imageUrl}
                  alt="creative"
                  sx={{
                    display: 'block',
                    width: '100%',
                    maxHeight: 200,
                    objectFit: 'cover',
                    opacity: aiBusy === 'image' ? 0.4 : 1,
                    transition: 'opacity .2s',
                  }}
                />
                <Stack
                  direction="row"
                  spacing={0.75}
                  sx={{ position: 'absolute', top: 8, right: 8 }}
                >
                  <IconButton
                    size="small"
                    onClick={onPickImage}
                    sx={{
                      bgcolor: 'rgba(255,255,255,0.9)',
                      '&:hover': { bgcolor: '#fff' },
                    }}
                  >
                    <CloudUploadRoundedIcon sx={{ fontSize: 16, color: '#0B0F1A' }} />
                  </IconButton>
                  <IconButton
                    size="small"
                    onClick={() => setImageUrl(null)}
                    sx={{
                      bgcolor: 'rgba(239,68,68,0.92)',
                      color: '#fff',
                      '&:hover': { bgcolor: '#DC2626' },
                    }}
                  >
                    <DeleteOutlineRoundedIcon sx={{ fontSize: 16 }} />
                  </IconButton>
                </Stack>
              </Box>
            ) : (
              <Stack direction="row" spacing={1}>
                <Box
                  onClick={onPickImage}
                  sx={theme => ({
                    flex: 1,
                    py: 1.5,
                    px: 1,
                    borderRadius: 1.75,
                    cursor: 'pointer',
                    textAlign: 'center',
                    border:
                      theme.palette.mode === 'dark'
                        ? '1.5px dashed rgba(255,255,255,0.18)'
                        : '1.5px dashed rgba(11,15,26,0.18)',
                    bgcolor:
                      theme.palette.mode === 'dark'
                        ? 'rgba(255,255,255,0.03)'
                        : 'rgba(11,15,26,0.02)',
                    '&:hover': {
                      borderColor: '#E54E8A',
                      bgcolor: 'rgba(229,78,138,0.04)',
                    },
                  })}
                >
                  <AddPhotoAlternateRoundedIcon
                    sx={{ fontSize: 22, color: '#E54E8A', mb: 0.5 }}
                  />
                  <Typography sx={{ fontSize: 12.5, fontWeight: 800 }}>Upload image</Typography>
                  <Typography sx={{ fontSize: 10.5, color: 'text.secondary' }}>
                    PNG, JPG up to 5MB
                  </Typography>
                </Box>
                <Box
                  onClick={aiBusy === 'none' ? onRegenerateImage : undefined}
                  sx={{
                    flex: 1,
                    py: 1.5,
                    px: 1,
                    borderRadius: 1.75,
                    cursor: aiBusy === 'none' ? 'pointer' : 'wait',
                    textAlign: 'center',
                    background: 'rgba(124,92,255,0.10)',
                    border: '1.5px dashed rgba(124,92,255,0.38)',
                    opacity: aiBusy !== 'none' ? 0.7 : 1,
                    '&:hover': {
                      borderColor: '#7C5CFF',
                      bgcolor: 'rgba(124,92,255,0.16)',
                    },
                  }}
                >
                  <AutoAwesomeIcon sx={{ fontSize: 22, color: '#7C5CFF', mb: 0.5 }} />
                  <Typography sx={{ fontSize: 12.5, fontWeight: 800, color: '#7C5CFF' }}>
                    {aiBusy === 'image' ? 'Drawing…' : 'Generate with AI'}
                  </Typography>
                  <Typography sx={{ fontSize: 10.5, color: 'text.secondary' }}>
                    Uses your prompt
                  </Typography>
                </Box>
              </Stack>
            )}

            {channels.length > 0 && (
              <Box>
                <Stack direction="row" sx={{ alignItems: 'center', mb: 0.75 }}>
                  <SectionLabel>
                    Live preview · {channels.length} channel{channels.length > 1 ? 's' : ''}
                  </SectionLabel>
                  <Box sx={{ flex: 1 }} />
                  <Stack direction="row" sx={{ alignItems: 'center', gap: 0.5 }}>
                    <VisibilityRoundedIcon sx={{ fontSize: 12, color: 'text.disabled' }} />
                    <Typography sx={{ fontSize: 10, color: 'text.disabled', fontWeight: 700 }}>
                      As your customer will see it
                    </Typography>
                  </Stack>
                </Stack>
                <ChannelPreviews
                  channels={channels}
                  body={message}
                  imageUrl={imageUrl}
                />
              </Box>
            )}
          </Stack>
        )}

        {/* STEP 5 — Schedule */}
        {!submitted && step === 5 && (
          <Stack spacing={1.5}>
            <SectionLabel>When should this go out?</SectionLabel>
            <Stack direction="row" sx={{ gap: 1 }}>
              <Box
                onClick={() => setSchedule('now')}
                sx={theme => ({
                  flex: 1,
                  p: 1.5,
                  borderRadius: 1.75,
                  cursor: 'pointer',
                  textAlign: 'center',
                  bgcolor: schedule === 'now' ? 'rgba(229,78,138,0.10)' : theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.04)' : 'rgba(11,15,26,0.03)',
                  border: schedule === 'now' ? '1.5px solid #E54E8A' : '1px solid rgba(11,15,26,0.06)',
                })}
              >
                <RocketLaunchRoundedIcon sx={{ fontSize: 22, color: '#E54E8A', mb: 0.5 }} />
                <Typography sx={{ fontSize: 13.5, fontWeight: 800 }}>Send now</Typography>
                <Typography sx={{ fontSize: 11, color: 'text.secondary' }}>
                  Reach customers immediately
                </Typography>
              </Box>
              <Box
                onClick={() => setSchedule('later')}
                sx={theme => ({
                  flex: 1,
                  p: 1.5,
                  borderRadius: 1.75,
                  cursor: 'pointer',
                  textAlign: 'center',
                  bgcolor: schedule === 'later' ? 'rgba(229,78,138,0.10)' : theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.04)' : 'rgba(11,15,26,0.03)',
                  border: schedule === 'later' ? '1.5px solid #E54E8A' : '1px solid rgba(11,15,26,0.06)',
                })}
              >
                <Typography sx={{ fontSize: 22, color: '#E54E8A', fontWeight: 800, mb: 0.5 }}>
                  ⏰
                </Typography>
                <Typography sx={{ fontSize: 13.5, fontWeight: 800 }}>Schedule</Typography>
                <Typography sx={{ fontSize: 11, color: 'text.secondary' }}>
                  Pick a date and time
                </Typography>
              </Box>
            </Stack>

            {schedule === 'later' && (
              <TextField
                size="small"
                fullWidth
                placeholder="e.g. May 20 · 10:00 AM"
                value={scheduleAt}
                onChange={e => setScheduleAt(e.target.value)}
              />
            )}

            {/* Review */}
            <Box
              sx={theme => ({
                mt: 1,
                p: 1.5,
                borderRadius: 1.75,
                bgcolor:
                  theme.palette.mode === 'dark'
                    ? 'rgba(255,255,255,0.04)'
                    : 'rgba(11,15,26,0.03)',
                border:
                  theme.palette.mode === 'dark'
                    ? '1px solid rgba(255,255,255,0.06)'
                    : '1px solid rgba(11,15,26,0.05)',
              })}
            >
              <Typography
                sx={{
                  fontSize: 10.5,
                  fontWeight: 800,
                  letterSpacing: 0.6,
                  textTransform: 'uppercase',
                  color: 'text.disabled',
                  mb: 1,
                }}
              >
                Review
              </Typography>
              <Stack spacing={0.75}>
                <Stack direction="row" sx={{ justifyContent: 'space-between' }}>
                  <Typography sx={{ fontSize: 12, color: 'text.secondary' }}>Name</Typography>
                  <Typography sx={{ fontSize: 12, fontWeight: 800 }}>{name || '—'}</Typography>
                </Stack>
                <Stack direction="row" sx={{ justifyContent: 'space-between' }}>
                  <Typography sx={{ fontSize: 12, color: 'text.secondary' }}>Audience</Typography>
                  <Typography sx={{ fontSize: 12, fontWeight: 800 }}>
                    {segment?.name} · {segment?.size}
                  </Typography>
                </Stack>
                <Stack direction="row" sx={{ justifyContent: 'space-between' }}>
                  <Typography sx={{ fontSize: 12, color: 'text.secondary' }}>Channels</Typography>
                  <Typography sx={{ fontSize: 12, fontWeight: 800 }}>
                    {channels.join(' + ')}
                  </Typography>
                </Stack>
                <Stack direction="row" sx={{ justifyContent: 'space-between' }}>
                  <Typography sx={{ fontSize: 12, color: 'text.secondary' }}>When</Typography>
                  <Typography sx={{ fontSize: 12, fontWeight: 800 }}>
                    {schedule === 'now' ? 'Immediately' : scheduleAt || '—'}
                  </Typography>
                </Stack>
              </Stack>
            </Box>

            {channels.length > 0 && (
              <Box>
                <Stack direction="row" sx={{ alignItems: 'center', mb: 0.75 }}>
                  <SectionLabel>Final preview</SectionLabel>
                  <Box sx={{ flex: 1 }} />
                  <Typography sx={{ fontSize: 10, color: 'text.disabled', fontWeight: 700 }}>
                    Confirm before launch
                  </Typography>
                </Stack>
                <ChannelPreviews
                  channels={channels}
                  body={message}
                  imageUrl={imageUrl}
                />
              </Box>
            )}
          </Stack>
        )}

        {/* Primary CTA */}
        {!submitted && (
          <Button
            fullWidth
            onClick={next}
            disabled={!canContinue()}
            sx={{
              mt: 2.5,
              background: CAMPAIGN_GRADIENT,
              color: '#fff',
              fontWeight: 800,
              fontSize: 14,
              py: 1.25,
              borderRadius: 1.5,
              boxShadow: '0 8px 20px rgba(229,78,138,0.32)',
              '&:hover': { background: CAMPAIGN_GRADIENT, filter: 'brightness(1.08)' },
              '&.Mui-disabled': {
                background: 'rgba(11,15,26,0.08)',
                color: 'rgba(11,15,26,0.32)',
                boxShadow: 'none',
              },
            }}
            startIcon={step === 5 ? <RocketLaunchRoundedIcon /> : undefined}
          >
            {step === 5 ? 'Launch campaign' : 'Continue'}
          </Button>
        )}
      </Box>
    </Drawer>
  );
}
