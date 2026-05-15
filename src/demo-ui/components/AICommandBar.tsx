import { Box, IconButton, InputBase, Stack, Tooltip, Typography, keyframes } from '@mui/material';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import MicRoundedIcon from '@mui/icons-material/MicRounded';
import StopRoundedIcon from '@mui/icons-material/StopRounded';
import { useCallback, useState } from 'react';
import { tokens } from '../theme/tokens';
import { useShopAssistant } from '../assistant/ShopAssistantContext';
import { useVoiceInput } from '../assistant/useVoiceInput';

const shimmer = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const PLACEHOLDERS = [
  'Ask anything about your stores…',
  'Add lead for Mr. Sharma 9876543210 budget 25K WhatsApp',
  'Show me leads to be contacted today',
  "What's my sales target status today?",
  'How can I hit my monthly target?',
];

export function AICommandBar() {
  const [value, setValue] = useState('');
  const [phIdx] = useState(() => Math.floor(Math.random() * PLACEHOLDERS.length));
  const { openAssistant } = useShopAssistant();

  const handleComplete = useCallback(
    (transcript: string) => {
      setValue('');
      openAssistant({ prompt: transcript, autoSend: true });
    },
    [openAssistant],
  );

  const { listening, supported: voiceSupported, start, stop } = useVoiceInput({
    onComplete: handleComplete,
    onTranscript: setValue,
  });

  const submit = () => {
    const text = value.trim();
    if (!text) return;
    openAssistant({ prompt: text, autoSend: true });
    setValue('');
  };

  return (
    <Box
      sx={theme => ({
        position: 'relative',
        borderRadius: `${tokens.radius.xl}px`,
        padding: '2px',
        background:
          listening
            ? 'linear-gradient(120deg, rgba(124,92,255,0.85), rgba(54,209,220,0.85), rgba(124,92,255,0.85))'
            : theme.palette.mode === 'dark'
              ? 'linear-gradient(120deg, rgba(124,92,255,0.55), rgba(54,209,220,0.55), rgba(124,92,255,0.55))'
              : 'linear-gradient(120deg, rgba(124,92,255,0.35), rgba(54,209,220,0.35), rgba(124,92,255,0.35))',
        backgroundSize: '200% 200%',
        animation: `${shimmer} ${listening ? '2.5s' : '8s'} ease infinite`,
        boxShadow: listening
          ? '0 18px 36px rgba(124,92,255,0.45)'
          : '0 18px 36px rgba(124,92,255,0.18)',
        transition: 'box-shadow .25s ease',
      })}
    >
      <Stack
        direction="row"
        spacing={1.25}
        sx={theme => ({
          alignItems: 'center',
          width: '100%',
          px: 1.5,
          py: 1.25,
          borderRadius: `${tokens.radius.xl - 2}px`,
          background:
            theme.palette.mode === 'dark'
              ? 'rgba(11,15,26,0.78)'
              : 'rgba(255,255,255,0.92)',
          backdropFilter: 'blur(20px)',
        })}
      >
        <Box
          onClick={() => openAssistant()}
          sx={{
            width: 32,
            height: 32,
            borderRadius: '50%',
            background: tokens.gradient.aiAurora,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
            flexShrink: 0,
            cursor: 'pointer',
            boxShadow: '0 8px 18px rgba(124,92,255,0.35)',
            transition: 'transform .15s ease',
            '&:hover': { transform: 'scale(1.05)' },
          }}
        >
          <AutoAwesomeIcon sx={{ fontSize: 18 }} />
        </Box>

        <Box sx={{ flex: 1, minWidth: 0 }}>
          <InputBase
            value={value}
            onChange={e => setValue(e.target.value)}
            onKeyDown={e => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                submit();
              }
            }}
            placeholder={listening ? 'Listening… pause when done' : PLACEHOLDERS[phIdx]}
            fullWidth
            sx={{
              fontSize: 15,
              fontWeight: 500,
              '& input::placeholder': { opacity: listening ? 0.85 : 0.5, color: listening ? '#7C5CFF' : undefined },
            }}
          />
          {listening && (
            <Stack direction="row" sx={{ alignItems: 'center', gap: 0.5, mt: 0.25, color: '#7C5CFF' }}>
              <Box
                sx={{
                  width: 6, height: 6, borderRadius: '50%', background: '#7C5CFF',
                  animation: 'cbarPulse 1s ease-in-out infinite',
                  '@keyframes cbarPulse': {
                    '0%, 100%': { opacity: 0.4, transform: 'scale(0.85)' },
                    '50%': { opacity: 1, transform: 'scale(1.2)' },
                  },
                }}
              />
              <Typography sx={{ fontSize: 10.5, fontWeight: 700, letterSpacing: 0.3 }}>
                LISTENING
              </Typography>
            </Stack>
          )}
        </Box>

        <Tooltip
          title={voiceSupported ? (listening ? 'Stop and send' : 'Tap to speak') : 'Voice not supported on this browser'}
          arrow
        >
          <span>
            <IconButton
              onClick={listening ? stop : start}
              disabled={!voiceSupported}
              aria-label={listening ? 'Stop and send' : 'Start voice input'}
              sx={{
                width: 36,
                height: 36,
                color: listening ? '#fff' : '#7C5CFF',
                background: listening ? '#7C5CFF' : 'rgba(124,92,255,0.10)',
                border: '1px solid rgba(124,139,255,0.22)',
                flexShrink: 0,
                '&:hover': { background: listening ? '#7C5CFF' : 'rgba(124,92,255,0.18)' },
                '&.Mui-disabled': { opacity: 0.4 },
              }}
            >
              {listening ? <StopRoundedIcon sx={{ fontSize: 18 }} /> : <MicRoundedIcon sx={{ fontSize: 18 }} />}
            </IconButton>
          </span>
        </Tooltip>
      </Stack>
    </Box>
  );
}
