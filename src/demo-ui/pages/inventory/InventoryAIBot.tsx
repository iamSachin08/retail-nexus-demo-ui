import { Box, Drawer, IconButton, InputBase, Stack, Typography } from '@mui/material';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { tokens } from '../../theme/tokens';
import { aiSuggestedPrompts } from '../../mock/data/inventoryDashboard';

export function InventoryAIBot() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('');

  return (
    <>
      {/* Floating bot button */}
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
          onClick={() => setOpen(true)}
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

      {/* Chat sheet */}
      <Drawer
        anchor="bottom"
        open={open}
        onClose={() => setOpen(false)}
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
          {/* Header */}
          <Stack direction="row" sx={{ alignItems: 'center', gap: 1, mb: 1.5 }}>
            <Box
              sx={{
                width: 32,
                height: 32,
                borderRadius: 1.5,
                background: tokens.gradient.aiAurora,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
              }}
            >
              <AutoAwesomeIcon sx={{ fontSize: 18 }} />
            </Box>
            <Box sx={{ flex: 1 }}>
              <Typography sx={{ fontSize: 15, fontWeight: 800, letterSpacing: -0.2 }}>
                Inventory AI
              </Typography>
              <Typography sx={{ fontSize: 11, color: 'text.secondary' }}>
                Ask about stock, demand, categorisation, or restocking.
              </Typography>
            </Box>
            <IconButton size="small" onClick={() => setOpen(false)}>
              <CloseRoundedIcon fontSize="small" />
            </IconButton>
          </Stack>

          {/* Suggested prompts */}
          <Stack spacing={0.75} sx={{ mb: 2 }}>
            <Typography sx={{ fontSize: 10.5, fontWeight: 800, letterSpacing: 0.6, textTransform: 'uppercase', color: 'text.secondary' }}>
              Try asking
            </Typography>
            <Stack direction="row" sx={{ gap: 0.75, flexWrap: 'wrap' }}>
              {aiSuggestedPrompts.map(p => (
                <Box
                  key={p}
                  onClick={() => setValue(p)}
                  sx={{
                    px: 1.25,
                    py: 0.75,
                    borderRadius: 999,
                    background: 'rgba(124,92,255,0.08)',
                    border: '1px solid rgba(124,139,255,0.18)',
                    fontSize: 11.5,
                    color: 'text.primary',
                    cursor: 'pointer',
                    transition: 'background .15s ease',
                    '&:hover': { background: 'rgba(124,92,255,0.14)' },
                  }}
                >
                  {p}
                </Box>
              ))}
            </Stack>
          </Stack>

          {/* Empty conversation hint */}
          <Box
            sx={{
              p: 2,
              borderRadius: 2,
              background: 'rgba(124,92,255,0.06)',
              border: '1px dashed rgba(124,139,255,0.2)',
              textAlign: 'center',
              mb: 2,
            }}
          >
            <Typography sx={{ fontSize: 12, color: 'text.secondary', lineHeight: 1.5 }}>
              Type a question below or pick a suggested prompt.<br />
              The AI uses your inventory, orders, and locality data to answer.
            </Typography>
          </Box>

          {/* Input row */}
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
              value={value}
              onChange={e => setValue(e.target.value)}
              placeholder="Ask Inventory AI…"
              fullWidth
              sx={{ pl: 1.5, fontSize: 14 }}
            />
            <IconButton
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
      </Drawer>
    </>
  );
}
