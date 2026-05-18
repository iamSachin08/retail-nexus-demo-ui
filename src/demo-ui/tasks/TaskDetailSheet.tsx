import { Box, ButtonBase, IconButton, Slide, Stack, Typography } from '@mui/material';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import AutoAwesomeRoundedIcon from '@mui/icons-material/AutoAwesomeRounded';
import { useEffect, useMemo, useState } from 'react';
import { useShopPalette } from '../hooks/useShopPalette';
import type { ShopPalette } from '../theme/tokens';
import {
  frequencyColor,
  taskCategoryColor,
  taskCategorySoft,
  taskCategoryText,
  type TaskDefinition,
  type TaskStep,
} from './mock';

interface TaskDetailSheetProps {
  task: TaskDefinition | null;
  onClose: () => void;
}

function StepRow({
  index,
  step,
  onComplete,
  palette,
}: {
  index: number;
  step: TaskStep;
  onComplete: (i: number) => void;
  palette: ShopPalette;
}) {
  const isDone = step.status === 'DONE';
  const isActive = step.status === 'ACTIVE';
  const tint = isDone ? palette.green : isActive ? palette.primaryInverse : palette.tileSoft;
  const fg = isDone || isActive ? palette.primaryInverseFg : palette.fg;
  const ActionIcon =
    step.action.kind === 'upload'
      ? FileUploadOutlinedIcon
      : step.action.kind === 'goto'
        ? ChevronRightRoundedIcon
        : CheckRoundedIcon;

  return (
    <Stack
      direction="row"
      sx={{ gap: 1.5, alignItems: 'flex-start' }}
    >
      <Box
        sx={{
          width: 28,
          height: 28,
          borderRadius: 999,
          background: tint,
          color: fg,
          border: isDone || isActive ? 0 : `1px solid ${palette.hairline}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: palette.mono,
          fontSize: 11,
          fontWeight: 700,
          flexShrink: 0,
          mt: 0.25,
        }}
      >
        {isDone ? <CheckRoundedIcon sx={{ fontSize: 16 }} /> : index + 1}
      </Box>

      <Box
        sx={{
          flex: 1,
          background: isActive ? palette.tileSoft : 'transparent',
          border: isActive ? `1px solid ${palette.hairline}` : '1px solid transparent',
          borderRadius: '14px',
          p: isActive ? 1.5 : '4px 0 14px',
        }}
      >
        <Typography
          sx={{
            fontSize: 13.5,
            fontWeight: 500,
            color: isDone ? palette.fgMuted : palette.fg,
            textDecoration: isDone ? 'line-through' : 'none',
            textDecorationColor: 'rgba(127,127,127,0.45)',
          }}
        >
          {step.label}
        </Typography>

        {!isDone && (
          <Stack direction="row" sx={{ alignItems: 'center', gap: 1, mt: 1.25 }}>
            <ButtonBase
              onClick={() => onComplete(index)}
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 0.75,
                background: isActive ? palette.primaryInverse : 'transparent',
                color: isActive ? palette.primaryInverseFg : palette.fgMuted,
                border: isActive ? 0 : `1px solid ${palette.hairline}`,
                borderRadius: 999,
                px: 1.5,
                py: 1,
                fontFamily: palette.mono,
                fontSize: 11,
                letterSpacing: '0.08em',
                fontWeight: 700,
                textTransform: 'uppercase',
              }}
            >
              <ActionIcon sx={{ fontSize: 14 }} />
              {step.action.label}
            </ButtonBase>
            {isActive && (
              <Typography
                sx={{
                  fontFamily: palette.mono,
                  fontSize: 10.5,
                  color: palette.amber,
                  letterSpacing: '0.08em',
                  fontWeight: 700,
                }}
              >
                IN PROGRESS
              </Typography>
            )}
          </Stack>
        )}

        {isDone && (
          <Typography
            sx={{
              fontFamily: palette.mono,
              fontSize: 10.5,
              color: palette.green,
              letterSpacing: '0.08em',
              fontWeight: 700,
              mt: 0.5,
            }}
          >
            ✓ DONE
          </Typography>
        )}
      </Box>
    </Stack>
  );
}

export function TaskDetailSheet({ task, onClose }: TaskDetailSheetProps) {
  const palette = useShopPalette();
  const [steps, setSteps] = useState<TaskStep[]>(task?.steps ?? []);
  const [completed, setCompleted] = useState(task?.status === 'COMPLETE');

  useEffect(() => {
    if (task) {
      setSteps(task.steps?.map(s => ({ ...s })) ?? []);
      setCompleted(task.status === 'COMPLETE');
    }
  }, [task]);

  const completeStep = (i: number) => {
    setSteps(arr => {
      const next = arr.map((s, idx) => (idx === i ? { ...s, status: 'DONE' as const } : s));
      const nextPending = next.findIndex(s => s.status === 'PENDING');
      if (nextPending !== -1 && !next.some(s => s.status === 'ACTIVE')) {
        next[nextPending] = { ...next[nextPending], status: 'ACTIVE' };
      }
      return next;
    });
  };

  const liveHistory = useMemo(() => {
    if (!task) return [];
    const stepEvents = steps
      .filter(s => s.status === 'DONE')
      .map(s => ({
        when: 'Today · just now',
        by: task.assignee,
        event: `Completed: ${s.label}`,
      }));
    return [...(task.history ?? []), ...stepEvents];
  }, [steps, task]);

  if (!task) return null;

  const doneCount = steps.filter(s => s.status === 'DONE').length;
  const total = steps.length;
  const pct = total ? Math.round((doneCount / total) * 100) : 0;
  const allDone = total > 0 && doneCount === total;

  const categoryColor = taskCategoryColor[task.category];
  const categorySoft = taskCategorySoft[task.category];
  const categoryText = taskCategoryText[task.category];
  const freqColor = frequencyColor[task.frequency];
  const priorityFg = task.priority === 'high' ? '#FF7A66' : task.priority === 'medium' ? palette.amber : palette.fgMuted;
  const priorityBg =
    task.priority === 'high'
      ? 'rgba(242,83,60,0.18)'
      : task.priority === 'medium'
        ? 'rgba(244,169,62,0.18)'
        : palette.chipNeutralBg;

  const metaCells: Array<[string, string]> = [
    ['DURATION', task.duration ?? `${task.expectedMins} min`],
    ['DUE', task.dueShort ?? task.dueLabel],
    ['ASSIGNED', task.assigneeRole ? `${task.assignee} · ${task.assigneeRole}` : task.assignee],
    ['SCHEDULE', task.dueDay ?? task.dueLabel],
  ];

  return (
    <Slide direction="up" in={!!task} mountOnEnter unmountOnExit>
      <Box
        sx={{
          position: 'fixed',
          inset: 0,
          zIndex: 1300,
          background: palette.bg,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Header */}
        <Stack
          direction="row"
          sx={{
            px: 2,
            pt: 2.5,
            pb: 1.5,
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 1.25,
            borderBottom: `1px solid ${palette.hairline}`,
            background: palette.bg,
          }}
        >
          <IconButton
            onClick={onClose}
            sx={{
              width: 38,
              height: 38,
              borderRadius: '12px',
              background: palette.card2,
              border: `1px solid ${palette.hairline}`,
              color: palette.fg,
              '&:hover': { background: palette.card3 },
            }}
          >
            <CloseRoundedIcon sx={{ fontSize: 18 }} />
          </IconButton>
          <Typography
            sx={{
              fontFamily: palette.mono,
              fontSize: 11,
              color: palette.fgMuted,
              letterSpacing: '0.08em',
            }}
          >
            TASK · {task.id.toUpperCase()}
          </Typography>
          <Box sx={{ width: 38, height: 38 }} />
        </Stack>

        {/* Scroll body */}
        <Box
          sx={{
            flex: 1,
            overflowY: 'auto',
            px: 2,
            pt: 2.25,
            pb: 14,
            '&::-webkit-scrollbar': { display: 'none' },
            scrollbarWidth: 'none',
          }}
        >
          {/* tags */}
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
              {task.category}
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
              {task.frequency}
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
              }}
            >
              {task.priority}
            </Box>
            {task.overdue && !completed && (
              <Box
                component="span"
                sx={{
                  fontFamily: palette.mono,
                  fontSize: 10,
                  letterSpacing: '0.1em',
                  fontWeight: 700,
                  color: palette.overdueText,
                  background: palette.softOverdueBg,
                  px: 1.125,
                  py: 0.5,
                  borderRadius: 999,
                  textTransform: 'uppercase',
                }}
              >
                OVERDUE
              </Box>
            )}
          </Stack>

          {/* title */}
          <Typography
            sx={{
              mt: 1.5,
              fontSize: 22,
              fontWeight: 600,
              letterSpacing: '-0.015em',
              color: palette.fg,
              lineHeight: 1.25,
            }}
          >
            {task.title}
          </Typography>
          <Typography
            sx={{
              mt: 1,
              fontSize: 13.5,
              color: palette.fgMuted,
              lineHeight: 1.55,
            }}
          >
            {task.description}
          </Typography>

          {/* meta strip */}
          <Box
            sx={{
              mt: 1.75,
              background: palette.card,
              border: `1px solid ${palette.hairline}`,
              borderRadius: '20px',
              overflow: 'hidden',
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
            }}
          >
            {metaCells.map(([k, v], i) => (
              <Box
                key={k}
                sx={{
                  px: 2,
                  py: 1.75,
                  borderRight: i % 2 === 0 ? `1px solid ${palette.hairline}` : 'none',
                  borderBottom: i < 2 ? `1px solid ${palette.hairline}` : 'none',
                }}
              >
                <Typography
                  sx={{
                    fontFamily: palette.mono,
                    fontSize: 9.5,
                    color: palette.fgMuted,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                  }}
                >
                  {k}
                </Typography>
                <Typography
                  sx={{ mt: 0.5, fontSize: 13, color: palette.fg, fontWeight: 500, lineHeight: 1.3 }}
                >
                  {v}
                </Typography>
              </Box>
            ))}
          </Box>

          {/* AI impact */}
          {task.aiImpact && (
            <Box
              sx={{
                mt: 1.75,
                p: 2,
                borderRadius: '20px',
                background: `linear-gradient(160deg, rgba(167,123,235,0.18), rgba(106,120,230,0.06) 60%, ${palette.card} 100%)`,
                border: `1px solid ${palette.hairline}`,
              }}
            >
              <Stack direction="row" sx={{ alignItems: 'center', gap: 1 }}>
                <AutoAwesomeRoundedIcon sx={{ fontSize: 14, color: palette.fg }} />
                <Typography
                  sx={{
                    fontFamily: palette.mono,
                    fontSize: 10.5,
                    color: palette.fg,
                    letterSpacing: '0.06em',
                    textTransform: 'uppercase',
                  }}
                >
                  AI · WHY THIS MATTERS
                </Typography>
              </Stack>
              <Typography
                sx={{ mt: 1, fontSize: 13, color: palette.fgMuted, lineHeight: 1.55 }}
              >
                {task.aiImpact}
              </Typography>
            </Box>
          )}

          {/* Progress */}
          {total > 0 && (
            <>
              <Stack
                direction="row"
                sx={{
                  mt: 2.5,
                  justifyContent: 'space-between',
                  alignItems: 'flex-end',
                }}
              >
                <Typography sx={{ fontSize: 15, fontWeight: 600, letterSpacing: '-0.005em', color: palette.fg }}>
                  Steps to complete
                </Typography>
                <Typography
                  sx={{
                    fontFamily: palette.mono,
                    fontSize: 11,
                    color: palette.fgMuted,
                    letterSpacing: '0.06em',
                  }}
                >
                  {doneCount}/{total} · {pct}%
                </Typography>
              </Stack>
              <Box
                sx={{
                  mt: 1,
                  height: 5,
                  borderRadius: 999,
                  background: palette.tileSoft,
                  overflow: 'hidden',
                }}
              >
                <Box
                  sx={{
                    width: `${pct}%`,
                    height: '100%',
                    background: palette.green,
                    transition: 'width .25s ease',
                  }}
                />
              </Box>

              {/* Steps */}
              <Stack spacing={0.5} sx={{ mt: 2 }}>
                {steps.map((s, i) => (
                  <StepRow key={i} index={i} step={s} onComplete={completeStep} palette={palette} />
                ))}
              </Stack>
            </>
          )}

          {/* History */}
          {liveHistory.length > 0 && (
            <Box sx={{ mt: 2.75 }}>
              <Typography
                sx={{
                  fontFamily: palette.mono,
                  fontSize: 10.5,
                  color: palette.fgMuted,
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                }}
              >
                Status history
              </Typography>
              <Box
                sx={{
                  mt: 1.25,
                  background: palette.card,
                  border: `1px solid ${palette.hairline}`,
                  borderRadius: '20px',
                  p: 1.75,
                }}
              >
                {liveHistory.map((h, i) => {
                  const isLast = i === liveHistory.length - 1;
                  return (
                    <Box
                      key={i}
                      sx={{
                        display: 'grid',
                        gridTemplateColumns: '14px 1fr',
                        gap: 1.5,
                        pb: isLast ? 0 : 1.5,
                        position: 'relative',
                      }}
                    >
                      <Box sx={{ position: 'relative', pt: '6px' }}>
                        <Box
                          sx={{
                            width: 8,
                            height: 8,
                            borderRadius: 999,
                            background: isLast ? palette.green : palette.fgMuted,
                            opacity: isLast ? 1 : 0.6,
                          }}
                        />
                        {!isLast && (
                          <Box
                            sx={{
                              position: 'absolute',
                              left: '3.5px',
                              top: 18,
                              bottom: -12,
                              width: '1px',
                              background: palette.hairline,
                            }}
                          />
                        )}
                      </Box>
                      <Box>
                        <Typography sx={{ fontSize: 13, color: palette.fg, lineHeight: 1.4 }}>
                          {h.event}
                        </Typography>
                        <Typography
                          sx={{
                            mt: 0.5,
                            fontFamily: palette.mono,
                            fontSize: 11,
                            color: palette.fgMuted,
                            letterSpacing: '0.04em',
                          }}
                        >
                          {h.when} · {h.by}
                        </Typography>
                      </Box>
                    </Box>
                  );
                })}
              </Box>
            </Box>
          )}
        </Box>

        {/* Sticky CTA */}
        <Box
          sx={{
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 0,
            px: 2,
            pb: 3.5,
            pt: 1.5,
            background: `linear-gradient(180deg, rgba(0,0,0,0) 0%, ${palette.bg} 30%)`,
          }}
        >
          {!completed ? (
            <ButtonBase
              onClick={() => setCompleted(true)}
              disabled={!allDone}
              sx={{
                width: '100%',
                background: allDone ? palette.green : palette.tileSoft,
                color: allDone ? '#0A0A0B' : palette.fgMuted,
                borderRadius: 999,
                py: 1.75,
                px: 2,
                fontFamily: palette.mono,
                fontSize: 12,
                fontWeight: 700,
                letterSpacing: '0.12em',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 1,
              }}
            >
              <CheckRoundedIcon sx={{ fontSize: 14 }} />
              {allDone
                ? 'MARK TASK COMPLETE'
                : `COMPLETE ${total - doneCount} MORE STEP${total - doneCount === 1 ? '' : 'S'}`}
            </ButtonBase>
          ) : (
            <Box
              sx={{
                width: '100%',
                textAlign: 'center',
                background: 'rgba(79,203,124,0.14)',
                color: palette.green,
                border: '1px solid rgba(79,203,124,0.4)',
                borderRadius: 999,
                py: 1.75,
                px: 2,
                fontFamily: palette.mono,
                fontSize: 12,
                fontWeight: 700,
                letterSpacing: '0.12em',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 1,
              }}
            >
              <CheckRoundedIcon sx={{ fontSize: 14 }} />
              TASK COMPLETED
            </Box>
          )}
        </Box>
      </Box>
    </Slide>
  );
}
