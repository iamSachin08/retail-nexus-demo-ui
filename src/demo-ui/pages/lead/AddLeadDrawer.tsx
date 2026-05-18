import {
  Box,
  Button,
  Drawer,
  IconButton,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import RemoveCircleOutlineRoundedIcon from '@mui/icons-material/RemoveCircleOutlineRounded';
import { useState } from 'react';
import type { Lead, LeadProductLine, LeadSource, LeadStatus } from '../../mock/data/leadManagement';
import { LEAD_SOURCES, LEAD_STATUSES } from '../../mock/data/leadManagement';
import { useLeads } from '../../context/LeadsContext';
import { tokens } from '../../theme/tokens';

interface Props {
  open: boolean;
  onClose: () => void;
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

interface FormState {
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  customerAddress: string;
  leadSource: LeadSource;
  leadStatus: LeadStatus;
  budget: string;
  followUpDate: string;
  notes: string;
  productLines: LeadProductLine[];
}

const empty: FormState = {
  customerName: '',
  customerPhone: '',
  customerEmail: '',
  customerAddress: '',
  leadSource: 'WhatsApp',
  leadStatus: 'New Lead',
  budget: '',
  followUpDate: '',
  notes: '',
  productLines: [{ name: '', qty: 1 }],
};

export function AddLeadDrawer({ open, onClose }: Props) {
  const { addLead } = useLeads();
  const [form, setForm] = useState<FormState>(empty);
  const [touched, setTouched] = useState(false);

  const nameOk = form.customerName.trim().length > 0;
  const phoneOk = form.customerPhone.trim().length > 0;
  const productOk = form.productLines.some(p => p.name.trim().length > 0);
  const valid = nameOk && phoneOk && productOk;

  const update = <K extends keyof FormState>(k: K, v: FormState[K]) => setForm(prev => ({ ...prev, [k]: v }));

  const addLine = () =>
    setForm(prev => ({ ...prev, productLines: [...prev.productLines, { name: '', qty: 1 }] }));

  const removeLine = (idx: number) =>
    setForm(prev => ({
      ...prev,
      productLines: prev.productLines.filter((_, i) => i !== idx),
    }));

  const updateLine = (idx: number, patch: Partial<LeadProductLine>) =>
    setForm(prev => ({
      ...prev,
      productLines: prev.productLines.map((l, i) => (i === idx ? { ...l, ...patch } : l)),
    }));

  const reset = () => {
    setForm(empty);
    setTouched(false);
  };

  const submit = () => {
    setTouched(true);
    if (!valid) return;
    const validLines = form.productLines.filter(p => p.name.trim().length > 0);
    const productsInterested = validLines.map(p => p.name).join(', ');
    const newLead: Lead = {
      leadId: `L-${Math.floor(Math.random() * 9000 + 1000)}`,
      customerName: form.customerName.trim(),
      customerPhone: form.customerPhone.trim(),
      customerEmail: form.customerEmail.trim() || undefined,
      customerAddress: form.customerAddress.trim() || undefined,
      leadSource: form.leadSource,
      leadStatus: form.leadStatus,
      intent: 'warm',
      budget: Number(form.budget) || 0,
      followUpDate: form.followUpDate || undefined,
      notes: form.notes || undefined,
      productLines: validLines,
      productsInterested,
      lastTouch: 'just now',
      daysSinceTouch: 0,
    };
    addLead(newLead);
    reset();
    onClose();
  };

  return (
    <Drawer
      anchor="bottom"
      open={open}
      onClose={() => {
        reset();
        onClose();
      }}
      slotProps={{
        paper: {
          sx: {
            borderRadius: 0,
            backgroundColor: 'background.default',
            maxHeight: '100dvh',
            height: '100dvh',
          },
        },
      }}
    >
      <Box sx={{ p: 2, overflowY: 'auto' }}>
        {/* Header */}
        <Stack direction="row" sx={{ alignItems: 'center', mb: 2 }}>
          <Box sx={{ flex: 1 }}>
            <Typography sx={{ fontSize: 10.5, fontWeight: 800, letterSpacing: 0.6, textTransform: 'uppercase', color: 'text.secondary' }}>
              New Lead
            </Typography>
            <Typography sx={{ fontSize: 20, fontWeight: 800, letterSpacing: -0.3 }}>
              Add Lead
            </Typography>
          </Box>
          <IconButton onClick={onClose}>
            <CloseRoundedIcon />
          </IconButton>
        </Stack>

        {/* Customer */}
        <SectionLabel>Customer</SectionLabel>
        <Stack spacing={1} sx={{ mb: 2 }}>
          <TextField
            size="small"
            placeholder="Name *"
            value={form.customerName}
            onChange={e => update('customerName', e.target.value)}
            error={touched && !nameOk}
            fullWidth
          />
          <TextField
            size="small"
            placeholder="Phone *"
            value={form.customerPhone}
            onChange={e => update('customerPhone', e.target.value)}
            error={touched && !phoneOk}
            fullWidth
          />
          <TextField
            size="small"
            placeholder="Email (optional)"
            value={form.customerEmail}
            onChange={e => update('customerEmail', e.target.value)}
            fullWidth
          />
          <TextField
            size="small"
            placeholder="Address (optional)"
            value={form.customerAddress}
            onChange={e => update('customerAddress', e.target.value)}
            fullWidth
          />
        </Stack>

        {/* Source + Status + Budget */}
        <Stack direction="row" sx={{ gap: 1, mb: 1 }}>
          <Box sx={{ flex: 1 }}>
            <SectionLabel>Source</SectionLabel>
            <Select
              size="small"
              fullWidth
              value={form.leadSource}
              onChange={e => update('leadSource', e.target.value as LeadSource)}
            >
              {LEAD_SOURCES.map(s => (
                <MenuItem key={s} value={s}>{s}</MenuItem>
              ))}
            </Select>
          </Box>
          <Box sx={{ flex: 1 }}>
            <SectionLabel>Status</SectionLabel>
            <Select
              size="small"
              fullWidth
              value={form.leadStatus}
              onChange={e => update('leadStatus', e.target.value as LeadStatus)}
            >
              {LEAD_STATUSES.map(s => (
                <MenuItem key={s} value={s}>{s}</MenuItem>
              ))}
            </Select>
          </Box>
        </Stack>

        <Stack direction="row" sx={{ gap: 1, mb: 2 }}>
          <Box sx={{ flex: 1 }}>
            <SectionLabel>Budget (₹)</SectionLabel>
            <TextField
              size="small"
              placeholder="0"
              value={form.budget}
              onChange={e => update('budget', e.target.value.replace(/[^\d]/g, ''))}
              fullWidth
            />
          </Box>
          <Box sx={{ flex: 1 }}>
            <SectionLabel>Follow-up</SectionLabel>
            <TextField
              size="small"
              placeholder="DD/MM/YYYY"
              value={form.followUpDate}
              onChange={e => update('followUpDate', e.target.value)}
              fullWidth
            />
          </Box>
        </Stack>

        {/* Product lines */}
        <Stack direction="row" sx={{ alignItems: 'center', mb: 0.75 }}>
          <SectionLabel>Products of interest</SectionLabel>
          <Box sx={{ ml: 'auto' }}>
            {/* Design-system secondary button: white bg, black border, pill. */}
            <Stack
              direction="row"
              onClick={addLine}
              sx={theme => ({
                alignItems: 'center',
                gap: 0.5,
                px: 1.25,
                py: 0.5,
                borderRadius: 999,
                cursor: 'pointer',
                background: '#FFFFFF',
                border: `1px solid ${theme.palette.mode === 'dark' ? '#FFFFFF' : '#0B0F1A'}`,
                color: '#0B0F1A',
                fontWeight: 600,
                transition: 'filter .15s ease',
                '&:hover': { filter: 'brightness(0.96)' },
                flexShrink: 0,
              })}
            >
              <Typography sx={{ fontSize: 13, fontWeight: 700, lineHeight: 1, mt: '-1px', color: 'inherit' }}>+</Typography>
              <Typography sx={{ fontSize: 11, fontWeight: 700, color: 'inherit' }}>Add Product</Typography>
            </Stack>
          </Box>
        </Stack>
        <Stack spacing={1} sx={{ mb: 2 }}>
          {form.productLines.map((line, idx) => (
            <Stack key={idx} direction="row" sx={{ gap: 0.75, alignItems: 'center' }}>
              <TextField
                size="small"
                placeholder="Product name"
                value={line.name}
                onChange={e => updateLine(idx, { name: e.target.value })}
                fullWidth
              />
              <TextField
                size="small"
                placeholder="Qty"
                value={line.qty}
                onChange={e => updateLine(idx, { qty: Number(e.target.value.replace(/[^\d]/g, '')) || 1 })}
                sx={{ width: 64 }}
              />
              {form.productLines.length > 1 && (
                <IconButton size="small" onClick={() => removeLine(idx)} sx={{ color: '#EF4444' }}>
                  <RemoveCircleOutlineRoundedIcon fontSize="small" />
                </IconButton>
              )}
            </Stack>
          ))}
          {touched && !productOk && (
            <Typography sx={{ fontSize: 11, color: '#EF4444' }}>
              At least one product is required
            </Typography>
          )}
        </Stack>

        {/* Notes */}
        <SectionLabel>Notes</SectionLabel>
        <TextField
          size="small"
          fullWidth
          multiline
          minRows={3}
          placeholder="Conversation history, preferences, etc."
          value={form.notes}
          onChange={e => update('notes', e.target.value)}
          sx={{ mb: 3 }}
        />

        {/* Submit */}
        <Button
          fullWidth
          onClick={submit}
          sx={{
            background: tokens.gradient.aiAurora,
            color: '#fff',
            fontWeight: 800,
            fontSize: 14,
            py: 1.25,
            '&:hover': { background: tokens.gradient.aiAurora, filter: 'brightness(1.08)' },
          }}
        >
          Save Lead
        </Button>
      </Box>
    </Drawer>
  );
}
