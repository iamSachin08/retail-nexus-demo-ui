import { Box, ButtonBase, IconButton, Stack, Typography } from '@mui/material';
import AutoAwesomeRoundedIcon from '@mui/icons-material/AutoAwesomeRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import { useState } from 'react';
import { useShopPalette } from '../hooks/useShopPalette';
import type { ShopPalette } from '../theme/tokens';
import {
  frequencyColor,
  taskCategoryColor,
  taskCategorySoft,
  taskCategoryText,
  type TaskCategory,
  type TaskFrequency,
  type TaskPriority,
  type TaskStepAction,
} from './mock';

interface CreateTaskFormProps {
  /** Called when the user submits or cancels — TasksPage swaps the view back. */
  onClose: () => void;
}

interface StepDraft {
  label: string;
  action: TaskStepAction;
}

function FieldLabel({
  children,
  hint,
  palette,
}: {
  children: React.ReactNode;
  hint?: string;
  palette: ShopPalette;
}) {
  return (
    <Stack
      direction="row"
      sx={{ justifyContent: 'space-between', alignItems: 'baseline', mb: 1 }}
    >
      <Typography
        sx={{
          fontFamily: palette.mono,
          fontSize: 10.5,
          fontWeight: 600,
          color: palette.fg,
          letterSpacing: '0.06em',
          textTransform: 'uppercase',
        }}
      >
        {children}
      </Typography>
      {hint && (
        <Typography
          sx={{
            fontFamily: palette.mono,
            fontSize: 10,
            color: palette.fgMuted,
            letterSpacing: '0.04em',
            textTransform: 'uppercase',
          }}
        >
          {hint}
        </Typography>
      )}
    </Stack>
  );
}

function FieldBox({
  children,
  palette,
  padding = '12px 14px',
}: {
  children: React.ReactNode;
  palette: ShopPalette;
  padding?: string;
}) {
  return (
    <Box
      sx={{
        background: palette.card2,
        borderRadius: '12px',
        padding,
        border: `1px solid ${palette.hairline}`,
      }}
    >
      {children}
    </Box>
  );
}

function ChipRow<T extends string>({
  value,
  onChange,
  options,
  palette,
}: {
  value: T;
  onChange: (v: T) => void;
  options: Array<{ value: T; label: string; dot?: string }>;
  palette: ShopPalette;
}) {
  return (
    <Stack direction="row" sx={{ gap: 1, flexWrap: 'wrap' }}>
      {options.map(o => {
        const isActive = o.value === value;
        return (
          <ButtonBase
            key={o.value}
            onClick={() => onChange(o.value)}
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 0.75,
              background: isActive ? palette.chipActiveBg : 'transparent',
              color: isActive ? palette.chipActiveFg : palette.chipInactiveFg,
              border: isActive ? `1px solid ${palette.chipActiveBg}` : palette.chipBorder,
              borderRadius: 999,
              px: 1.5,
              py: 1,
              fontFamily: palette.mono,
              fontSize: 11.5,
              fontWeight: 600,
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
            }}
          >
            {o.dot && (
              <Box
                sx={{
                  width: 6,
                  height: 6,
                  borderRadius: 999,
                  background: o.dot,
                  opacity: isActive ? 0.8 : 1,
                }}
              />
            )}
            {o.label}
          </ButtonBase>
        );
      })}
    </Stack>
  );
}

function StepBuilder({
  steps,
  setSteps,
  palette,
}: {
  steps: StepDraft[];
  setSteps: React.Dispatch<React.SetStateAction<StepDraft[]>>;
  palette: ShopPalette;
}) {
  const update = (i: number, patch: Partial<StepDraft>) =>
    setSteps(s => s.map((it, idx) => (idx === i ? { ...it, ...patch } : it)));
  const remove = (i: number) => setSteps(s => s.filter((_, idx) => idx !== i));
  const add = () => setSteps(s => [...s, { label: '', action: 'confirm' }]);

  const ACT_OPTS: Array<{ value: TaskStepAction; label: string; dot: string }> = [
    { value: 'confirm', label: 'Confirm', dot: palette.fgMuted },
    { value: 'goto', label: 'Open page', dot: palette.tileBlue },
    { value: 'upload', label: 'Photo / Video', dot: palette.tilePink },
  ];

  return (
    <Stack spacing={1.25}>
      {steps.map((step, i) => (
        <Box
          key={i}
          sx={{
            background: palette.card2,
            borderRadius: '12px',
            p: 1.5,
            display: 'grid',
            gap: 1.25,
            border: `1px solid ${palette.hairline}`,
          }}
        >
          <Stack direction="row" sx={{ alignItems: 'center', gap: 1.25 }}>
            <Box
              sx={{
                width: 26,
                height: 26,
                borderRadius: '8px',
                background: palette.tileSoft,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: palette.mono,
                fontSize: 11.5,
                fontWeight: 700,
                color: palette.fg,
                flexShrink: 0,
              }}
            >
              {i + 1}
            </Box>
            <Box
              component="input"
              value={step.label}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => update(i, { label: e.target.value })}
              placeholder={`Step ${i + 1} description`}
              sx={{
                flex: 1,
                background: 'transparent',
                border: 0,
                outline: 'none',
                color: palette.fg,
                fontSize: 13.5,
                minWidth: 0,
                '&::placeholder': { color: palette.inputPlaceholder },
              }}
            />
            <IconButton
              onClick={() => remove(i)}
              aria-label="Remove step"
              sx={{ color: palette.fgMuted, p: 0.5 }}
            >
              <CloseRoundedIcon sx={{ fontSize: 18 }} />
            </IconButton>
          </Stack>
          <ChipRow
            value={step.action}
            onChange={(v: TaskStepAction) => update(i, { action: v })}
            options={ACT_OPTS}
            palette={palette}
          />
        </Box>
      ))}
      <ButtonBase
        onClick={add}
        sx={{
          background: 'transparent',
          border: `1px dashed ${palette.hairline}`,
          borderRadius: '12px',
          px: 1.75,
          py: 1.5,
          color: palette.fgMuted,
          fontSize: 13,
          fontWeight: 500,
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 1,
        }}
      >
        <AddRoundedIcon sx={{ fontSize: 16 }} /> Add another step
      </ButtonBase>
    </Stack>
  );
}

function AddTaskPreview({
  title,
  desc,
  category,
  frequency,
  priority,
  assignee,
  duration,
  due,
  palette,
}: {
  title: string;
  desc: string;
  category: TaskCategory;
  frequency: TaskFrequency;
  priority: TaskPriority;
  assignee: string;
  duration: string;
  due: string;
  palette: ShopPalette;
}) {
  const categoryColor = taskCategoryColor[category];
  const categorySoft = taskCategorySoft[category];
  const categoryText = taskCategoryText[category];
  const freqColor = frequencyColor[frequency];
  const priorityFg =
    priority === 'high' ? '#FF7A66' : priority === 'medium' ? palette.amber : palette.fgMuted;
  const priorityBg =
    priority === 'high'
      ? 'rgba(242,83,60,0.18)'
      : priority === 'medium'
        ? 'rgba(244,169,62,0.18)'
        : palette.chipNeutralBg;

  return (
    <Box
      sx={{
        position: 'relative',
        background: palette.card,
        borderRadius: '16px',
        py: 1.75,
        pl: 1.75,
        pr: 1.75,
        border: `1px solid ${palette.hairline}`,
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          left: 0,
          top: 12,
          bottom: 12,
          width: '3px',
          background: categoryColor,
          borderRadius: 999,
        }}
      />
      <Stack spacing={1} sx={{ pl: 1 }}>
        <Stack direction="row" sx={{ gap: 0.75, alignItems: 'center', flexWrap: 'wrap' }}>
          <Box
            component="span"
            sx={{
              fontFamily: palette.mono,
              fontSize: 10,
              letterSpacing: '0.08em',
              fontWeight: 600,
              color: categoryText,
              background: categorySoft,
              px: 1,
              py: 0.5,
              borderRadius: '6px',
              textTransform: 'uppercase',
            }}
          >
            {category}
          </Box>
          <Box
            component="span"
            sx={{
              fontFamily: palette.mono,
              fontSize: 10,
              letterSpacing: '0.08em',
              fontWeight: 600,
              color: freqColor,
              background: palette.chipNeutralBg,
              px: 1,
              py: 0.5,
              borderRadius: '6px',
              textTransform: 'uppercase',
            }}
          >
            {frequency}
          </Box>
          <Box
            component="span"
            sx={{
              fontFamily: palette.mono,
              fontSize: 10,
              letterSpacing: '0.1em',
              fontWeight: 700,
              color: priorityFg,
              background: priorityBg,
              px: 1.125,
              py: 0.5,
              borderRadius: 999,
              textTransform: 'uppercase',
              ml: 'auto',
            }}
          >
            {priority}
          </Box>
        </Stack>
        <Typography sx={{ fontSize: 14.5, fontWeight: 600, color: palette.fg, letterSpacing: '-0.005em' }}>
          {title || 'New task title'}
        </Typography>
        <Typography
          sx={{
            fontSize: 12.5,
            color: palette.fgMuted,
            lineHeight: 1.45,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {desc || 'Brief description shown to store staff.'}
        </Typography>
        <Stack
          direction="row"
          sx={{
            gap: 1.75,
            flexWrap: 'wrap',
            fontFamily: palette.mono,
            fontSize: 11,
            color: palette.fgMuted,
            letterSpacing: '0.04em',
          }}
        >
          <Typography component="span" sx={{ fontFamily: palette.mono, fontSize: 11 }}>
            {duration} · {due}
          </Typography>
          <Typography component="span" sx={{ fontFamily: palette.mono, fontSize: 11 }}>
            {assignee}
          </Typography>
        </Stack>
      </Stack>
    </Box>
  );
}

const CATEGORIES: TaskCategory[] = ['Sales', 'Inventory', 'Leads', 'Customer', 'Hygiene', 'Reporting', 'Staff'];

export function CreateTaskForm({ onClose }: CreateTaskFormProps) {
  const palette = useShopPalette();
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [category, setCategory] = useState<TaskCategory>('Hygiene');
  const [frequency, setFrequency] = useState<TaskFrequency>('daily');
  const [priority, setPriority] = useState<TaskPriority>('medium');
  const [assignee, setAssignee] = useState('Rohit · Manager');
  const [duration, setDuration] = useState('15 min');
  const [due, setDue] = useState('Before 10:00 AM');
  const [scope, setScope] = useState<'ALL' | 'WHITEFIELD' | 'HSR'>('ALL');
  const [aiImpact, setAiImpact] = useState('');
  const [steps, setSteps] = useState<StepDraft[]>([
    { label: '', action: 'confirm' },
    { label: '', action: 'goto' },
  ]);
  const [submitted, setSubmitted] = useState(false);

  const ok = title.trim().length > 0;

  const reset = () => {
    setTitle('');
    setDesc('');
    setCategory('Hygiene');
    setFrequency('daily');
    setPriority('medium');
    setAssignee('Rohit · Manager');
    setDuration('15 min');
    setDue('Before 10:00 AM');
    setScope('ALL');
    setAiImpact('');
    setSteps([
      { label: '', action: 'confirm' },
      { label: '', action: 'goto' },
    ]);
  };

  const submit = () => {
    if (!ok) return;
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      reset();
      onClose();
    }, 1500);
  };

  const catOpts = CATEGORIES.map(c => ({ value: c, label: c, dot: taskCategoryColor[c] }));
  const freqOpts: Array<{ value: TaskFrequency; label: string }> = [
    { value: 'daily', label: 'Daily' },
    { value: 'weekly', label: 'Weekly' },
    { value: 'monthly', label: 'Monthly' },
    { value: 'adhoc', label: 'Adhoc' },
  ];
  const prOpts: Array<{ value: TaskPriority; label: string; dot: string }> = [
    { value: 'high', label: 'High', dot: '#FF7A66' },
    { value: 'medium', label: 'Medium', dot: palette.amber },
    { value: 'low', label: 'Low', dot: palette.fgMuted },
  ];
  const scopeOpts: Array<{ value: 'ALL' | 'WHITEFIELD' | 'HSR'; label: string }> = [
    { value: 'ALL', label: 'All stores' },
    { value: 'WHITEFIELD', label: 'Whitefield' },
    { value: 'HSR', label: 'HSR · Koramangala' },
  ];
  const assignOpts = ['Rohit · Manager', 'Ashish · Sales', 'Suresh · Floor', 'Lakshmi · Housekeeping'];

  return (
    <Box>
      {/* "Add a new task" heading + inline × CANCEL pill (design: AddTaskInline) */}
      <Stack
        direction="row"
        sx={{
          alignItems: 'center',
          justifyContent: 'space-between',
          mb: 1.75,
          gap: 1,
        }}
      >
        <Typography
          sx={{
            fontSize: 16,
            fontWeight: 600,
            letterSpacing: '-0.005em',
            color: palette.fg,
          }}
        >
          Add a new task
        </Typography>
        <ButtonBase
          onClick={onClose}
          aria-label="Cancel"
          sx={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 0.75,
            background: palette.card2,
            color: palette.fg,
            border: `1px solid ${palette.hairline}`,
            borderRadius: 999,
            px: 1.5,
            py: 0.75,
            fontFamily: palette.mono,
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
          }}
        >
          <CloseRoundedIcon sx={{ fontSize: 12 }} />
          Cancel
        </ButtonBase>
      </Stack>

      <Box>
        <Stack spacing={2.25}>
          {/* Owner banner */}
          <Stack
            direction="row"
            sx={{
              alignItems: 'center',
              gap: 1.25,
              background: 'rgba(58,87,227,0.10)',
              border: '1px solid rgba(58,87,227,0.32)',
              borderRadius: '14px',
              px: 1.75,
              py: 1.5,
            }}
          >
            <Box
              sx={{
                width: 28,
                height: 28,
                borderRadius: '9px',
                background: '#3A57E3',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
                flexShrink: 0,
              }}
            >
              <AutoAwesomeRoundedIcon sx={{ fontSize: 14 }} />
            </Box>
            <Typography sx={{ fontSize: 12.5, color: palette.fgMuted, lineHeight: 1.45 }}>
              <Box component="strong" sx={{ color: palette.fg }}>
                Owner-only.
              </Box>{' '}
              Tasks created here roll out to the chosen scope on the next cycle.
            </Typography>
          </Stack>

          {/* Title */}
          <Box>
            <FieldLabel hint="Required" palette={palette}>TASK TITLE</FieldLabel>
            <FieldBox palette={palette}>
              <Box
                component="input"
                value={title}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
                placeholder="e.g. Verify weekend offer signage"
                sx={{
                  width: '100%',
                  background: 'transparent',
                  border: 0,
                  outline: 'none',
                  color: palette.fg,
                  fontSize: 15,
                  fontWeight: 500,
                  '&::placeholder': { color: palette.inputPlaceholder },
                }}
              />
            </FieldBox>
          </Box>

          {/* Description */}
          <Box>
            <FieldLabel hint="Optional" palette={palette}>DESCRIPTION</FieldLabel>
            <FieldBox palette={palette}>
              <Box
                component="textarea"
                value={desc}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setDesc(e.target.value)}
                placeholder="What the staff should do, with any context."
                rows={3}
                sx={{
                  width: '100%',
                  background: 'transparent',
                  border: 0,
                  outline: 'none',
                  color: palette.fg,
                  fontSize: 13.5,
                  resize: 'none',
                  lineHeight: 1.5,
                  fontFamily: 'inherit',
                  '&::placeholder': { color: palette.inputPlaceholder },
                }}
              />
            </FieldBox>
          </Box>

          {/* Category */}
          <Box>
            <FieldLabel palette={palette}>CATEGORY</FieldLabel>
            <ChipRow value={category} onChange={setCategory} options={catOpts} palette={palette} />
          </Box>

          {/* Frequency */}
          <Box>
            <FieldLabel palette={palette}>FREQUENCY</FieldLabel>
            <ChipRow value={frequency} onChange={setFrequency} options={freqOpts} palette={palette} />
          </Box>

          {/* Priority */}
          <Box>
            <FieldLabel palette={palette}>PRIORITY</FieldLabel>
            <ChipRow value={priority} onChange={setPriority} options={prOpts} palette={palette} />
          </Box>

          {/* Schedule */}
          <Box>
            <FieldLabel palette={palette}>SCHEDULE</FieldLabel>
            <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1.25 }}>
              <FieldBox palette={palette}>
                <Typography
                  sx={{
                    fontFamily: palette.mono,
                    fontSize: 9.5,
                    color: palette.fgMuted,
                    letterSpacing: '0.08em',
                  }}
                >
                  DURATION
                </Typography>
                <Box
                  component="input"
                  value={duration}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDuration(e.target.value)}
                  sx={{
                    mt: 0.5,
                    width: '100%',
                    background: 'transparent',
                    border: 0,
                    outline: 'none',
                    color: palette.fg,
                    fontSize: 13.5,
                    fontWeight: 500,
                  }}
                />
              </FieldBox>
              <FieldBox palette={palette}>
                <Typography
                  sx={{
                    fontFamily: palette.mono,
                    fontSize: 9.5,
                    color: palette.fgMuted,
                    letterSpacing: '0.08em',
                  }}
                >
                  DUE BY
                </Typography>
                <Box
                  component="input"
                  value={due}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDue(e.target.value)}
                  sx={{
                    mt: 0.5,
                    width: '100%',
                    background: 'transparent',
                    border: 0,
                    outline: 'none',
                    color: palette.fg,
                    fontSize: 13.5,
                    fontWeight: 500,
                  }}
                />
              </FieldBox>
            </Box>
          </Box>

          {/* Assignee */}
          <Box>
            <FieldLabel hint="Role on store team" palette={palette}>
              ASSIGNED TO
            </FieldLabel>
            <FieldBox palette={palette} padding="6px 8px">
              <Stack
                direction="row"
                sx={{
                  gap: 0.75,
                  overflowX: 'auto',
                  scrollbarWidth: 'none',
                  '&::-webkit-scrollbar': { display: 'none' },
                }}
              >
                {assignOpts.map(a => {
                  const isActive = a === assignee;
                  return (
                    <ButtonBase
                      key={a}
                      onClick={() => setAssignee(a)}
                      sx={{
                        flexShrink: 0,
                        background: isActive ? palette.chipActiveBg : 'transparent',
                        color: isActive ? palette.chipActiveFg : palette.chipInactiveFg,
                        borderRadius: '8px',
                        px: 1.25,
                        py: 1,
                        fontSize: 12.5,
                        fontWeight: 500,
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {a}
                    </ButtonBase>
                  );
                })}
              </Stack>
            </FieldBox>
          </Box>

          {/* Scope */}
          <Box>
            <FieldLabel hint="Owner controls rollout" palette={palette}>
              ROLLOUT SCOPE
            </FieldLabel>
            <ChipRow value={scope} onChange={setScope} options={scopeOpts} palette={palette} />
          </Box>

          {/* Steps */}
          <Box>
            <FieldLabel hint="Staff completes each in order" palette={palette}>
              STEPS TO COMPLETE
            </FieldLabel>
            <StepBuilder steps={steps} setSteps={setSteps} palette={palette} />
          </Box>

          {/* AI impact */}
          <Box>
            <FieldLabel hint="Why this matters" palette={palette}>
              AI · IMPACT NOTE
            </FieldLabel>
            <FieldBox palette={palette}>
              <Box
                component="textarea"
                value={aiImpact}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setAiImpact(e.target.value)}
                placeholder="Auto-generated explanation will appear here. Edit if needed."
                rows={2}
                sx={{
                  width: '100%',
                  background: 'transparent',
                  border: 0,
                  outline: 'none',
                  color: palette.fg,
                  fontSize: 13,
                  resize: 'none',
                  lineHeight: 1.5,
                  fontFamily: 'inherit',
                  '&::placeholder': { color: palette.inputPlaceholder },
                }}
              />
              <ButtonBase
                sx={{
                  mt: 1,
                  background: 'transparent',
                  border: `1px solid ${palette.hairline}`,
                  color: palette.fg,
                  borderRadius: 999,
                  px: 1.25,
                  py: 0.75,
                  fontFamily: palette.mono,
                  fontSize: 10.5,
                  letterSpacing: '0.08em',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 0.75,
                }}
              >
                <AutoAwesomeRoundedIcon sx={{ fontSize: 12 }} /> Generate with AI
              </ButtonBase>
            </FieldBox>
          </Box>

          {/* Preview */}
          <Box>
            <FieldLabel palette={palette}>LIVE PREVIEW</FieldLabel>
            <AddTaskPreview
              title={title}
              desc={desc}
              category={category}
              frequency={frequency}
              priority={priority}
              assignee={assignee.split(' · ')[0]}
              duration={duration}
              due={due}
              palette={palette}
            />
          </Box>

          {/* Submit */}
          <ButtonBase
            onClick={submit}
            disabled={!ok}
            sx={{
              background: ok ? palette.chipActiveBg : palette.tileSoft,
              color: ok ? palette.chipActiveFg : palette.fgMuted,
              borderRadius: 999,
              py: 1.75,
              px: 2,
              fontFamily: palette.mono,
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: '0.12em',
              cursor: ok ? 'pointer' : 'not-allowed',
            }}
          >
            CREATE TASK
          </ButtonBase>

          {submitted && (
            <Box
              sx={{
                position: 'fixed',
                bottom: 100,
                left: '50%',
                transform: 'translateX(-50%)',
                background: palette.greenDim,
                color: '#fff',
                px: 1.75,
                py: 1.25,
                borderRadius: 999,
                fontFamily: palette.mono,
                fontSize: 11.5,
                fontWeight: 700,
                letterSpacing: '0.08em',
                boxShadow: '0 12px 30px rgba(0,0,0,0.5)',
                zIndex: 30,
              }}
            >
              ✓ TASK CREATED
            </Box>
          )}
        </Stack>
      </Box>
    </Box>
  );
}
