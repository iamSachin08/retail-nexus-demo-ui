import {
  Box,
  Drawer,
  IconButton,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import { useState } from 'react';
import { tokens } from '../theme/tokens';
import {
  priorityColor,
  taskCategoryColor,
  type TaskCategory,
  type TaskFrequency,
  type TaskPriority,
} from './mock';

interface Props {
  open: boolean;
  onClose: () => void;
}

const CATEGORIES: TaskCategory[] = [
  'Sales',
  'Inventory',
  'Customer',
  'Visual',
  'Hygiene',
  'Reporting',
  'Staff',
];

const FREQUENCY_OPTIONS: { id: TaskFrequency; label: string; desc: string }[] = [
  { id: 'daily', label: 'Daily', desc: 'Repeats every day · manager reports at deadline' },
  { id: 'weekly', label: 'Weekly', desc: 'Repeats every week · manager reports once a week' },
];

const PRIORITY_OPTIONS: TaskPriority[] = ['high', 'medium', 'low'];

const TEMPLATES = [
  {
    id: 'tpl-walk',
    title: 'Morning store walk-through',
    category: 'Hygiene' as TaskCategory,
    frequency: 'daily' as TaskFrequency,
  },
  {
    id: 'tpl-eod',
    title: 'Evening EOD report',
    category: 'Reporting' as TaskCategory,
    frequency: 'daily' as TaskFrequency,
  },
  {
    id: 'tpl-audit',
    title: 'Stock audit · top 50',
    category: 'Inventory' as TaskCategory,
    frequency: 'weekly' as TaskFrequency,
  },
  {
    id: 'tpl-vm',
    title: 'Visual merch refresh',
    category: 'Visual' as TaskCategory,
    frequency: 'weekly' as TaskFrequency,
  },
];

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <Typography
      sx={{
        fontSize: 10.5,
        fontWeight: 800,
        letterSpacing: 0.6,
        textTransform: 'uppercase',
        color: 'text.secondary',
        mb: 0.875,
      }}
    >
      {children}
    </Typography>
  );
}

export function CreateTaskDrawer({ open, onClose }: Props) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [frequency, setFrequency] = useState<TaskFrequency>('daily');
  const [category, setCategory] = useState<TaskCategory>('Reporting');
  const [priority, setPriority] = useState<TaskPriority>('medium');
  const [dueLabel, setDueLabel] = useState('Today · before 6 PM');
  const [assignee, setAssignee] = useState('Rohit (Manager)');

  const reset = () => {
    setTitle('');
    setDescription('');
    setFrequency('daily');
    setCategory('Reporting');
    setPriority('medium');
    setDueLabel('Today · before 6 PM');
  };

  const handleClose = () => {
    onClose();
    setTimeout(reset, 250);
  };

  const handleCreate = () => {
    handleClose();
  };

  const canCreate = title.trim().length > 2;

  const selectMenuProps = {
    PaperProps: {
      sx: (theme: import('@mui/material').Theme) => ({
        bgcolor: theme.palette.mode === 'dark' ? '#161B2A' : '#FFFFFF',
        backgroundImage: 'none',
        backdropFilter: 'none',
        WebkitBackdropFilter: 'none',
        border:
          theme.palette.mode === 'dark'
            ? '1px solid rgba(255,255,255,0.10)'
            : '1px solid rgba(11,15,26,0.10)',
        boxShadow:
          theme.palette.mode === 'dark'
            ? '0 18px 42px rgba(0,0,0,0.6)'
            : '0 14px 36px rgba(11,15,26,0.16)',
        borderRadius: 1.5,
        mt: 0.5,
        '& .MuiMenuItem-root': {
          fontSize: 13,
          fontWeight: 600,
          py: 0.875,
          '&:hover': {
            bgcolor:
              theme.palette.mode === 'dark'
                ? 'rgba(255,255,255,0.06)'
                : 'rgba(11,15,26,0.05)',
          },
          '&.Mui-selected': {
            bgcolor:
              theme.palette.mode === 'dark'
                ? 'rgba(124,92,255,0.18)'
                : 'rgba(124,92,255,0.12)',
            '&:hover': {
              bgcolor:
                theme.palette.mode === 'dark'
                  ? 'rgba(124,92,255,0.24)'
                  : 'rgba(124,92,255,0.18)',
            },
          },
        },
      }),
    },
  } as const;

  return (
    <Drawer
      anchor="bottom"
      open={open}
      onClose={handleClose}
      slotProps={{
        paper: {
          sx: {
            borderRadius: 0,
            backgroundColor: 'background.default',
            backgroundImage: 'none',
            maxHeight: '100vh',
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
          },
        },
      }}
    >
      <Box sx={{ px: 2, pt: 2, pb: 1.25, flexShrink: 0 }}>
        <Stack direction="row" sx={{ alignItems: 'center', gap: 1 }}>
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Typography
              sx={{
                fontSize: 11,
                fontWeight: 800,
                letterSpacing: 0.6,
                textTransform: 'uppercase',
                color: 'text.secondary',
                lineHeight: 1,
              }}
            >
              Owner
            </Typography>
            <Typography sx={{ fontSize: 18, fontWeight: 800, letterSpacing: -0.3 }}>
              Set up a new task
            </Typography>
          </Box>
          <IconButton size="small" onClick={handleClose}>
            <CloseRoundedIcon fontSize="small" />
          </IconButton>
        </Stack>
      </Box>

      <Box sx={{ flex: 1, overflowY: 'auto', px: 2, pb: 2 }}>
        {/* Templates */}
        <SectionTitle>Quick start from template</SectionTitle>
        <Stack direction="row" sx={{ flexWrap: 'wrap', gap: 0.75, mb: 2 }}>
          {TEMPLATES.map(t => (
            <Box
              key={t.id}
              onClick={() => {
                setTitle(t.title);
                setCategory(t.category);
                setFrequency(t.frequency);
              }}
              sx={theme => ({
                px: 1.25,
                py: 0.75,
                borderRadius: 999,
                cursor: 'pointer',
                bgcolor:
                  theme.palette.mode === 'dark'
                    ? 'rgba(255,255,255,0.05)'
                    : 'rgba(11,15,26,0.04)',
                border:
                  theme.palette.mode === 'dark'
                    ? '1px solid rgba(255,255,255,0.07)'
                    : '1px solid rgba(11,15,26,0.06)',
                fontSize: 11.5,
                fontWeight: 700,
                color: 'text.primary',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 0.5,
                '&:hover': { filter: 'brightness(1.05)' },
              })}
            >
              <AutoAwesomeIcon sx={{ fontSize: 12, color: '#7C5CFF' }} />
              {t.title}
            </Box>
          ))}
        </Stack>

        {/* Title + description */}
        <SectionTitle>Title</SectionTitle>
        <TextField
          fullWidth
          size="small"
          placeholder="e.g. Refill front-of-store racks before 11 AM"
          value={title}
          onChange={e => setTitle(e.target.value)}
          sx={{ mb: 2, '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
        />

        <SectionTitle>Description for the manager</SectionTitle>
        <TextField
          fullWidth
          multiline
          minRows={3}
          maxRows={6}
          placeholder="What exactly should be done, and what proof should they submit?"
          value={description}
          onChange={e => setDescription(e.target.value)}
          sx={{ mb: 2, '& .MuiOutlinedInput-root': { borderRadius: 2, fontSize: 13 } }}
        />

        {/* Frequency picker */}
        <SectionTitle>Frequency</SectionTitle>
        <Stack direction="row" sx={{ gap: 1, mb: 2 }}>
          {FREQUENCY_OPTIONS.map(f => {
            const active = frequency === f.id;
            return (
              <Box
                key={f.id}
                onClick={() => setFrequency(f.id)}
                sx={theme => ({
                  flex: 1,
                  p: 1.25,
                  borderRadius: 2,
                  cursor: 'pointer',
                  bgcolor: active
                    ? 'rgba(124,92,255,0.12)'
                    : theme.palette.mode === 'dark'
                      ? 'rgba(255,255,255,0.04)'
                      : 'rgba(11,15,26,0.03)',
                  border: active
                    ? '1.5px solid rgba(124,139,255,0.5)'
                    : theme.palette.mode === 'dark'
                      ? '1px solid rgba(255,255,255,0.06)'
                      : '1px solid rgba(11,15,26,0.06)',
                  transition: 'all .2s ease',
                })}
              >
                <Stack direction="row" sx={{ alignItems: 'center', gap: 0.5, mb: 0.5 }}>
                  <Typography
                    sx={{ fontSize: 13, fontWeight: 800, color: active ? '#7C5CFF' : 'text.primary' }}
                  >
                    {f.label}
                  </Typography>
                  {active && <CheckRoundedIcon sx={{ fontSize: 14, color: '#7C5CFF' }} />}
                </Stack>
                <Typography sx={{ fontSize: 11, color: 'text.secondary', lineHeight: 1.3 }}>
                  {f.desc}
                </Typography>
              </Box>
            );
          })}
        </Stack>

        {/* Category + Priority */}
        <Stack direction="row" sx={{ gap: 1.5, mb: 2 }}>
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <SectionTitle>Category</SectionTitle>
            <TextField
              select
              fullWidth
              size="small"
              value={category}
              onChange={e => setCategory(e.target.value as TaskCategory)}
              SelectProps={{ MenuProps: selectMenuProps }}
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
            >
              {CATEGORIES.map(c => (
                <MenuItem key={c} value={c}>
                  <Stack direction="row" sx={{ alignItems: 'center', gap: 0.75 }}>
                    <Box
                      sx={{
                        width: 8,
                        height: 8,
                        borderRadius: '50%',
                        bgcolor: taskCategoryColor[c],
                      }}
                    />
                    {c}
                  </Stack>
                </MenuItem>
              ))}
            </TextField>
          </Box>
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <SectionTitle>Priority</SectionTitle>
            <TextField
              select
              fullWidth
              size="small"
              value={priority}
              onChange={e => setPriority(e.target.value as TaskPriority)}
              SelectProps={{ MenuProps: selectMenuProps }}
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
            >
              {PRIORITY_OPTIONS.map(p => (
                <MenuItem key={p} value={p}>
                  <Stack direction="row" sx={{ alignItems: 'center', gap: 0.75 }}>
                    <Box
                      sx={{
                        width: 8,
                        height: 8,
                        borderRadius: '50%',
                        bgcolor: priorityColor[p],
                      }}
                    />
                    {p.charAt(0).toUpperCase() + p.slice(1)}
                  </Stack>
                </MenuItem>
              ))}
            </TextField>
          </Box>
        </Stack>

        <SectionTitle>Deadline label</SectionTitle>
        <TextField
          fullWidth
          size="small"
          value={dueLabel}
          onChange={e => setDueLabel(e.target.value)}
          sx={{ mb: 2, '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
        />

        <SectionTitle>Assign to</SectionTitle>
        <TextField
          fullWidth
          size="small"
          value={assignee}
          onChange={e => setAssignee(e.target.value)}
          sx={{ mb: 2, '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
        />

        <Stack
          direction="row"
          sx={{
            alignItems: 'center',
            gap: 0.75,
            px: 1.25,
            py: 0.875,
            borderRadius: 1.5,
            background: tokens.gradient.aiAuroraSoft,
            border: '1px solid rgba(124,139,255,0.25)',
          }}
        >
          <AutoAwesomeIcon sx={{ fontSize: 14, color: '#7C5CFF' }} />
          <Typography sx={{ fontSize: 11.5, color: 'text.secondary', flex: 1, lineHeight: 1.4 }}>
            AI will auto-generate a reporting template with the right fields based on category.
          </Typography>
        </Stack>
      </Box>

      <Box
        sx={theme => ({
          px: 2,
          py: 1.5,
          borderTop:
            theme.palette.mode === 'dark'
              ? '1px solid rgba(255,255,255,0.06)'
              : '1px solid rgba(11,15,26,0.06)',
          flexShrink: 0,
        })}
      >
        <Stack direction="row" sx={{ gap: 1 }}>
          <Box
            onClick={handleClose}
            sx={theme => ({
              flex: 1,
              py: 1,
              textAlign: 'center',
              borderRadius: 999,
              cursor: 'pointer',
              fontSize: 13,
              fontWeight: 800,
              color: 'text.secondary',
              border:
                theme.palette.mode === 'dark'
                  ? '1px solid rgba(255,255,255,0.14)'
                  : '1px solid rgba(11,15,26,0.12)',
            })}
          >
            Cancel
          </Box>
          <Box
            onClick={canCreate ? handleCreate : undefined}
            sx={theme => ({
              flex: 2,
              py: 1,
              textAlign: 'center',
              borderRadius: 999,
              cursor: canCreate ? 'pointer' : 'not-allowed',
              fontSize: 13,
              fontWeight: 800,
              color: '#fff',
              background: canCreate
                ? tokens.gradient.tasks
                : theme.palette.mode === 'dark'
                  ? 'rgba(255,255,255,0.10)'
                  : 'rgba(11,15,26,0.18)',
              boxShadow: canCreate ? '0 6px 14px rgba(124,92,255,0.32)' : 'none',
              opacity: canCreate ? 1 : 0.7,
            })}
          >
            Assign task
          </Box>
        </Stack>
      </Box>
    </Drawer>
  );
}
