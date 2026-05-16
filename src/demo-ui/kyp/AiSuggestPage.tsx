import { useState, type KeyboardEvent } from 'react';
import { Box, Button, IconButton, InputBase, Stack, Typography } from '@mui/material';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import StarRateRoundedIcon from '@mui/icons-material/StarRateRounded';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import RestartAltRoundedIcon from '@mui/icons-material/RestartAltRounded';
import { useNavigate } from 'react-router-dom';
import { tokens } from '../theme/tokens';

type SuggestedProduct = {
  id: string;
  name: string;
  priceInr: number;
  tag: string;
  why: string;
  recommended?: boolean;
};

const CANDIDATES: SuggestedProduct[] = [
  {
    id: '491296926',
    name: 'Pureit Mineral Classic WCUX100',
    priceInr: 12599,
    tag: 'RO + UV + Mineraliser',
    why: 'Tuned for hard water (up to 1500 ppm TDS). Top-rated in your area.',
  },
  {
    id: 'aqg-glory-nxt',
    name: 'Aquaguard Glory NXT',
    priceInr: 8499,
    tag: 'RO + UV + UF',
    why: 'Most affordable in the 6-litre RO+UV bracket. Strong service network.',
  },
  {
    id: 'kent-grand-plus',
    name: 'Kent Grand Plus',
    priceInr: 15999,
    tag: 'RO + UV + TDS control',
    why: 'Premium pick with mineral retention and zero water waste mode.',
  },
];

const RECOMMENDED: SuggestedProduct[] = [
  {
    id: '491296926',
    name: 'Pureit Mineral Classic WCUX100',
    priceInr: 12599,
    tag: 'RO + UV + Mineraliser',
    why: 'Best fit: 4-member family, mid-budget, hard-water area. Stable margin.',
    recommended: true,
  },
  {
    id: 'aqg-glory-nxt',
    name: 'Aquaguard Glory NXT',
    priceInr: 8499,
    tag: 'RO + UV + UF',
    why: 'Backup option if customer wants to stay under ₹10k.',
  },
];

type Stage = 'requirement' | 'customer' | 'done';

function AiBubble({ children }: { children: React.ReactNode }) {
  return (
    <Stack direction="row" spacing={1} sx={{ alignItems: 'flex-start' }}>
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
          flexShrink: 0,
          boxShadow: '0 4px 10px rgba(124,92,255,0.32)',
        }}
      >
        <AutoAwesomeIcon sx={{ fontSize: 18 }} />
      </Box>
      <Box
        sx={{
          flex: 1,
          minWidth: 0,
          p: 1.5,
          borderRadius: 2,
          bgcolor: '#fff',
          border: '1px solid #EEF0F4',
          boxShadow: '0 1px 4px rgba(11,15,26,0.04)',
        }}
      >
        {children}
      </Box>
    </Stack>
  );
}

function UserBubble({ text }: { text: string }) {
  return (
    <Stack direction="row" spacing={1} sx={{ alignItems: 'flex-start', justifyContent: 'flex-end' }}>
      <Box
        sx={{
          maxWidth: '78%',
          p: 1.5,
          borderRadius: 2,
          bgcolor: '#4C4DDC',
          color: '#fff',
          boxShadow: '0 4px 10px rgba(76,77,220,0.25)',
        }}
      >
        <Typography sx={{ fontSize: 14, lineHeight: 1.5 }}>{text}</Typography>
      </Box>
      <Box
        sx={{
          width: 32,
          height: 32,
          borderRadius: 1.5,
          bgcolor: '#F3F4F6',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#0B0F1A',
          flexShrink: 0,
        }}
      >
        <PersonRoundedIcon sx={{ fontSize: 18 }} />
      </Box>
    </Stack>
  );
}

function ProductCard({ product, onOpen }: { product: SuggestedProduct; onOpen: () => void }) {
  return (
    <Box
      onClick={onOpen}
      sx={{
        position: 'relative',
        p: 1.5,
        borderRadius: 1.5,
        bgcolor: '#fff',
        border: product.recommended ? '1.5px solid #16A34A' : '1px solid #EEF0F4',
        cursor: 'pointer',
        transition: 'transform .15s ease, box-shadow .2s ease',
        '&:hover': {
          transform: 'translateY(-1px)',
          boxShadow: '0 6px 14px rgba(11,15,26,0.08)',
        },
      }}
    >
      {product.recommended && (
        <Stack
          direction="row"
          spacing={0.25}
          sx={{
            alignItems: 'center',
            position: 'absolute',
            top: 10,
            right: 10,
            px: 0.75,
            py: 0.125,
            borderRadius: 999,
            bgcolor: '#16A34A',
            color: '#fff',
          }}
        >
          <StarRateRoundedIcon sx={{ fontSize: 11 }} />
          <Typography sx={{ fontSize: 9.5, fontWeight: 800, letterSpacing: 0.5 }}>RECOMMENDED</Typography>
        </Stack>
      )}
      <Typography sx={{ fontSize: 10.5, fontWeight: 700, letterSpacing: 0.4, textTransform: 'uppercase', color: '#9CA3AF', mb: 0.25 }}>
        {product.tag}
      </Typography>
      <Typography sx={{ fontSize: 15, fontWeight: 800, color: '#0B0F1A', lineHeight: 1.3, pr: product.recommended ? 10 : 0, mb: 0.5 }}>
        {product.name}
      </Typography>
      <Stack direction="row" sx={{ alignItems: 'center', justifyContent: 'space-between', mb: 0.75 }}>
        <Typography sx={{ fontSize: 16, fontWeight: 800, color: '#0B0F1A' }}>
          ₹{product.priceInr.toLocaleString('en-IN')}
        </Typography>
        <ChevronRightRoundedIcon sx={{ color: '#9CA3AF', fontSize: 18 }} />
      </Stack>
      <Typography sx={{ fontSize: 12.5, color: '#4B5563', lineHeight: 1.45 }}>
        {product.why}
      </Typography>
    </Box>
  );
}

function ChatInput({
  value,
  onChange,
  onSubmit,
  placeholder,
}: {
  value: string;
  onChange: (v: string) => void;
  onSubmit: () => void;
  placeholder: string;
}) {
  const disabled = value.trim().length === 0;
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (!disabled) onSubmit();
    }
  };
  return (
    <Box
      sx={{
        p: 1,
        pl: 1.5,
        borderRadius: 2,
        bgcolor: '#fff',
        border: '1px solid #E5E7EB',
        display: 'flex',
        alignItems: 'flex-end',
        gap: 1,
        boxShadow: '0 4px 12px rgba(11,15,26,0.06)',
      }}
    >
      <InputBase
        multiline
        maxRows={4}
        fullWidth
        value={value}
        onChange={e => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        sx={{ fontSize: 14, py: 0.5 }}
      />
      <IconButton
        onClick={onSubmit}
        disabled={disabled}
        sx={{
          width: 36,
          height: 36,
          background: disabled ? '#E5E7EB' : tokens.gradient.aiAurora,
          color: '#fff',
          flexShrink: 0,
          '&:hover': { background: disabled ? '#E5E7EB' : tokens.gradient.aiAurora, filter: disabled ? 'none' : 'brightness(1.08)' },
          '&.Mui-disabled': { color: '#fff', opacity: 0.6 },
        }}
      >
        <SendRoundedIcon fontSize="small" />
      </IconButton>
    </Box>
  );
}

export function AiSuggestPage() {
  const navigate = useNavigate();
  const [stage, setStage] = useState<Stage>('requirement');
  const [requirement, setRequirement] = useState('');
  const [requirementSubmitted, setRequirementSubmitted] = useState('');
  const [customer, setCustomer] = useState('');
  const [customerSubmitted, setCustomerSubmitted] = useState('');

  const submitRequirement = () => {
    const text = requirement.trim();
    if (!text) return;
    setRequirementSubmitted(text);
    setStage('customer');
  };

  const submitCustomer = () => {
    const text = customer.trim();
    if (!text) return;
    setCustomerSubmitted(text);
    setStage('done');
  };

  const reset = () => {
    setStage('requirement');
    setRequirement('');
    setRequirementSubmitted('');
    setCustomer('');
    setCustomerSubmitted('');
  };

  const openProduct = (id: string) => {
    navigate(`/demo/kyp/product/${encodeURIComponent(id)}`);
  };

  return (
    <Box sx={{ pb: 12 }}>
      <Stack direction="row" sx={{ alignItems: 'center', mb: 2, gap: 1 }}>
        <IconButton
          onClick={() => navigate(-1)}
          size="small"
          sx={{
            width: 36,
            height: 36,
            background: 'rgba(11,15,26,0.04)',
            border: '1px solid rgba(11,15,26,0.06)',
            '&:hover': { background: 'rgba(11,15,26,0.08)' },
          }}
        >
          <ArrowBackRoundedIcon fontSize="small" />
        </IconButton>
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Typography sx={{ fontSize: 11, fontWeight: 800, letterSpacing: 0.6, textTransform: 'uppercase', color: 'text.secondary', lineHeight: 1 }}>
            KYP
          </Typography>
          <Typography sx={{ fontSize: 22, fontWeight: 800, letterSpacing: -0.4, lineHeight: 1.1 }}>
            AI Suggestion
          </Typography>
        </Box>
        {stage !== 'requirement' && (
          <IconButton
            onClick={reset}
            size="small"
            sx={{
              width: 36,
              height: 36,
              background: 'rgba(11,15,26,0.04)',
              border: '1px solid rgba(11,15,26,0.06)',
              '&:hover': { background: 'rgba(11,15,26,0.08)' },
            }}
            aria-label="Restart"
          >
            <RestartAltRoundedIcon fontSize="small" />
          </IconButton>
        )}
      </Stack>

      <Stack spacing={1.5}>
        <AiBubble>
          <Typography sx={{ fontSize: 14, color: '#0B0F1A', lineHeight: 1.5, mb: 0.5, fontWeight: 700 }}>
            What is the customer looking for?
          </Typography>
          <Typography sx={{ fontSize: 12.5, color: '#6B7280', lineHeight: 1.5 }}>
            Describe the product requirement in a sentence — category, use case, budget, anything you know.
          </Typography>
        </AiBubble>

        {stage === 'requirement' && (
          <ChatInput
            value={requirement}
            onChange={setRequirement}
            onSubmit={submitRequirement}
            placeholder="e.g., Water purifier for hard water, 4-member family, under ₹15k"
          />
        )}

        {requirementSubmitted && <UserBubble text={requirementSubmitted} />}

        {stage !== 'requirement' && (
          <AiBubble>
            <Typography sx={{ fontSize: 14, color: '#0B0F1A', lineHeight: 1.5, mb: 1.25, fontWeight: 700 }}>
              Here are 3 options that match:
            </Typography>
            <Stack spacing={1}>
              {CANDIDATES.map(p => (
                <ProductCard key={p.id} product={p} onOpen={() => openProduct(p.id)} />
              ))}
            </Stack>
          </AiBubble>
        )}

        {stage !== 'requirement' && (
          <AiBubble>
            <Typography sx={{ fontSize: 14, color: '#0B0F1A', lineHeight: 1.5, mb: 0.5, fontWeight: 700 }}>
              Tell me about the customer
            </Typography>
            <Typography sx={{ fontSize: 12.5, color: '#6B7280', lineHeight: 1.5 }}>
              Family size, age group, price-sensitivity, prior brand preference — anything you've picked up.
            </Typography>
          </AiBubble>
        )}

        {stage === 'customer' && (
          <ChatInput
            value={customer}
            onChange={setCustomer}
            onSubmit={submitCustomer}
            placeholder="e.g., Couple in their 40s with two kids, prefers known brand, budget-conscious"
          />
        )}

        {customerSubmitted && <UserBubble text={customerSubmitted} />}

        {stage === 'done' && (
          <AiBubble>
            <Typography sx={{ fontSize: 14, color: '#0B0F1A', lineHeight: 1.5, mb: 1.25, fontWeight: 700 }}>
              My recommendation for this customer:
            </Typography>
            <Stack spacing={1}>
              {RECOMMENDED.map(p => (
                <ProductCard key={p.id} product={p} onOpen={() => openProduct(p.id)} />
              ))}
            </Stack>
          </AiBubble>
        )}

        {stage === 'done' && (
          <Button
            fullWidth
            onClick={reset}
            variant="outlined"
            startIcon={<RestartAltRoundedIcon />}
            sx={{
              mt: 0.5,
              borderRadius: 1.5,
              borderColor: '#E5E7EB',
              color: '#4B5563',
              textTransform: 'none',
              fontWeight: 700,
              '&:hover': { borderColor: '#9CA3AF', bgcolor: '#fff' },
            }}
          >
            Start a new suggestion
          </Button>
        )}
      </Stack>
    </Box>
  );
}

export default AiSuggestPage;
