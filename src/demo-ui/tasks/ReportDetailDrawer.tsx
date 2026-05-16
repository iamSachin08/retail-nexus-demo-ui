import {
  Box,
  Drawer,
  IconButton,
  LinearProgress,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import PhotoLibraryRoundedIcon from '@mui/icons-material/PhotoLibraryRounded';
import AccessTimeRoundedIcon from '@mui/icons-material/AccessTimeRounded';
import EventNoteRoundedIcon from '@mui/icons-material/EventNoteRounded';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import { useEffect, useMemo, useRef, useState } from 'react';
import { tokens } from '../theme/tokens';
import {
  taskCategoryColor,
  taskReports,
  type TaskComment,
  type TaskReport,
} from './mock';

interface Props {
  reportId: string | null;
  onClose: () => void;
}

function statusChipStyle(status: TaskReport['status']) {
  switch (status) {
    case 'submitted':
      return { bg: 'rgba(34,197,94,0.14)', color: '#16A34A', label: 'SUBMITTED' };
    case 'awaiting':
      return { bg: 'rgba(245,158,11,0.16)', color: '#D97706', label: 'AWAITING' };
    case 'overdue':
      return { bg: 'rgba(239,68,68,0.16)', color: '#DC2626', label: 'OVERDUE' };
  }
}

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

function CommentBubble({ comment }: { comment: TaskComment }) {
  const isOwner = comment.role === 'Owner';
  return (
    <Stack
      direction="row"
      sx={{
        alignItems: 'flex-start',
        gap: 1,
        flexDirection: isOwner ? 'row-reverse' : 'row',
      }}
    >
      <Box
        sx={{
          width: 28,
          height: 28,
          borderRadius: '50%',
          background: isOwner ? tokens.gradient.tasks : tokens.gradient.sales,
          color: '#fff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 11,
          fontWeight: 800,
          flexShrink: 0,
        }}
      >
        {comment.author.slice(0, 1).toUpperCase()}
      </Box>
      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Stack
          direction="row"
          sx={{
            alignItems: 'baseline',
            gap: 0.75,
            mb: 0.375,
            justifyContent: isOwner ? 'flex-end' : 'flex-start',
          }}
        >
          <Typography sx={{ fontSize: 12, fontWeight: 800 }}>{comment.author}</Typography>
          <Typography
            sx={{
              fontSize: 9.5,
              fontWeight: 800,
              letterSpacing: 0.4,
              textTransform: 'uppercase',
              color: isOwner ? '#7C5CFF' : '#16A34A',
            }}
          >
            {comment.role}
          </Typography>
          <Typography sx={{ fontSize: 10.5, color: 'text.disabled' }}>{comment.at}</Typography>
        </Stack>
        <Box
          sx={theme => ({
            display: 'inline-block',
            maxWidth: '100%',
            px: 1.25,
            py: 0.875,
            borderRadius: 2,
            borderTopLeftRadius: isOwner ? 16 : 4,
            borderTopRightRadius: isOwner ? 4 : 16,
            bgcolor: isOwner
              ? 'rgba(124,92,255,0.10)'
              : theme.palette.mode === 'dark'
                ? 'rgba(255,255,255,0.05)'
                : 'rgba(11,15,26,0.04)',
            border: isOwner
              ? '1px solid rgba(124,139,255,0.25)'
              : '1px solid rgba(11,15,26,0.05)',
            float: isOwner ? 'right' : 'none',
          })}
        >
          <Typography sx={{ fontSize: 12.5, color: 'text.primary', lineHeight: 1.5 }}>
            {comment.text}
          </Typography>
        </Box>
      </Box>
    </Stack>
  );
}

export function ReportDetailDrawer({ reportId, onClose }: Props) {
  const baseReport = useMemo(
    () => taskReports.find(r => r.id === reportId) ?? null,
    [reportId],
  );
  const [comments, setComments] = useState<TaskComment[]>([]);
  const [draft, setDraft] = useState('');
  const scrollerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setComments(baseReport ? [...baseReport.comments] : []);
    setDraft('');
  }, [baseReport]);

  useEffect(() => {
    if (!reportId) return;
    requestAnimationFrame(() => {
      if (scrollerRef.current) {
        scrollerRef.current.scrollTop = scrollerRef.current.scrollHeight;
      }
    });
  }, [comments, reportId]);

  const handleSend = () => {
    const trimmed = draft.trim();
    if (!trimmed) return;
    setComments(prev => [
      ...prev,
      {
        id: `local-${Date.now()}`,
        author: 'Owner',
        role: 'Owner',
        at: 'Just now',
        text: trimmed,
      },
    ]);
    setDraft('');
  };

  return (
    <Drawer
      anchor="bottom"
      open={!!reportId}
      onClose={onClose}
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
      {baseReport && (
        <>
          <Box sx={{ px: 2, pt: 2, pb: 1.25, flexShrink: 0 }}>
            <Stack direction="row" sx={{ alignItems: 'center', gap: 1 }}>
              <Box
                sx={{
                  width: 4,
                  height: 36,
                  borderRadius: 999,
                  bgcolor: taskCategoryColor[baseReport.category],
                  flexShrink: 0,
                }}
              />
              <Box sx={{ flex: 1, minWidth: 0 }}>
                <Stack direction="row" sx={{ alignItems: 'center', gap: 0.5, mb: 0.25 }}>
                  <Box
                    sx={{
                      px: 0.875,
                      py: 0.125,
                      borderRadius: 999,
                      bgcolor: `${taskCategoryColor[baseReport.category]}1F`,
                      color: taskCategoryColor[baseReport.category],
                      fontSize: 9.5,
                      fontWeight: 800,
                      letterSpacing: 0.4,
                      textTransform: 'uppercase',
                    }}
                  >
                    {baseReport.category}
                  </Box>
                  <Box
                    sx={{
                      px: 0.875,
                      py: 0.125,
                      borderRadius: 999,
                      bgcolor:
                        baseReport.frequency === 'daily'
                          ? 'rgba(124,92,255,0.16)'
                          : 'rgba(78,140,255,0.16)',
                      color: baseReport.frequency === 'daily' ? '#7C5CFF' : '#4E8CFF',
                      fontSize: 9.5,
                      fontWeight: 800,
                      letterSpacing: 0.4,
                      textTransform: 'uppercase',
                    }}
                  >
                    {baseReport.frequency}
                  </Box>
                </Stack>
                <Typography sx={{ fontSize: 16, fontWeight: 800, letterSpacing: -0.2 }} noWrap>
                  {baseReport.taskTitle}
                </Typography>
                <Typography sx={{ fontSize: 11, color: 'text.disabled' }}>
                  {baseReport.periodLabel}
                  {baseReport.submittedAt ? ` · ${baseReport.submittedAt}` : ''}
                </Typography>
              </Box>
              <IconButton size="small" onClick={onClose}>
                <CloseRoundedIcon fontSize="small" />
              </IconButton>
            </Stack>
          </Box>

          <Box
            ref={scrollerRef}
            sx={{
              flex: 1,
              overflowY: 'auto',
              px: 2,
              pb: 2,
            }}
          >
            {/* Status + completion bar */}
            <Stack direction="row" sx={{ alignItems: 'center', gap: 1, mb: 1.5 }}>
              {(() => {
                const chip = statusChipStyle(baseReport.status);
                return (
                  <Box
                    sx={{
                      px: 0.875,
                      py: 0.25,
                      borderRadius: 999,
                      bgcolor: chip.bg,
                      color: chip.color,
                      fontSize: 10,
                      fontWeight: 800,
                      letterSpacing: 0.5,
                    }}
                  >
                    {chip.label}
                  </Box>
                );
              })()}
              <Box sx={{ flex: 1 }}>
                <LinearProgress
                  variant="determinate"
                  value={baseReport.completionPct}
                  sx={theme => ({
                    height: 6,
                    borderRadius: 999,
                    bgcolor:
                      theme.palette.mode === 'dark'
                        ? 'rgba(255,255,255,0.06)'
                        : 'rgba(11,15,26,0.06)',
                    '& .MuiLinearProgress-bar': {
                      borderRadius: 999,
                      bgcolor:
                        baseReport.completionPct >= 90
                          ? '#22C55E'
                          : baseReport.completionPct >= 50
                            ? '#F59E0B'
                            : '#EF4444',
                    },
                  })}
                />
              </Box>
              <Typography sx={{ fontSize: 13, fontWeight: 800, minWidth: 44, textAlign: 'right' }}>
                {baseReport.completionPct}%
              </Typography>
            </Stack>

            {/* Manager summary */}
            <SectionTitle>Manager summary</SectionTitle>
            <Typography sx={{ fontSize: 13, lineHeight: 1.55, mb: 2, color: 'text.primary' }}>
              {baseReport.summary}
            </Typography>

            {/* Metrics */}
            {baseReport.metrics.length > 0 && (
              <>
                <SectionTitle>Metrics reported</SectionTitle>
                <Stack
                  direction="row"
                  sx={{ flexWrap: 'wrap', gap: 1, mb: 2 }}
                >
                  {baseReport.metrics.map(m => (
                    <Box
                      key={m.label}
                      sx={theme => ({
                        flex: '1 1 calc(50% - 8px)',
                        minWidth: 110,
                        p: 1.25,
                        borderRadius: 1.5,
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
                          fontSize: 10,
                          fontWeight: 800,
                          letterSpacing: 0.5,
                          color: 'text.disabled',
                          textTransform: 'uppercase',
                        }}
                      >
                        {m.label}
                      </Typography>
                      <Typography sx={{ fontSize: 17, fontWeight: 800, mt: 0.25 }}>
                        {m.value}
                      </Typography>
                    </Box>
                  ))}
                </Stack>
              </>
            )}

            {/* Photos */}
            {baseReport.photos && baseReport.photos.length > 0 && (
              <>
                <SectionTitle>Photos attached · {baseReport.photos.length}</SectionTitle>
                <Stack direction="row" sx={{ gap: 1, mb: 2, overflowX: 'auto' }}>
                  {baseReport.photos.map(p => (
                    <Box
                      key={p}
                      sx={theme => ({
                        width: 90,
                        height: 90,
                        borderRadius: 1.5,
                        flexShrink: 0,
                        background:
                          theme.palette.mode === 'dark'
                            ? 'linear-gradient(135deg, rgba(180,124,255,0.16), rgba(124,92,255,0.12))'
                            : 'linear-gradient(135deg, rgba(180,124,255,0.20), rgba(124,92,255,0.14))',
                        border:
                          theme.palette.mode === 'dark'
                            ? '1px solid rgba(255,255,255,0.08)'
                            : '1px solid rgba(11,15,26,0.06)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#7C5CFF',
                      })}
                    >
                      <PhotoLibraryRoundedIcon />
                    </Box>
                  ))}
                </Stack>
              </>
            )}

            {/* Meta */}
            <Stack direction="row" sx={{ alignItems: 'center', gap: 1.5, mb: 2, flexWrap: 'wrap' }}>
              <Stack direction="row" sx={{ alignItems: 'center', gap: 0.5, color: 'text.secondary' }}>
                <EventNoteRoundedIcon sx={{ fontSize: 14 }} />
                <Typography sx={{ fontSize: 11.5, fontWeight: 700 }}>
                  {baseReport.periodLabel}
                </Typography>
              </Stack>
              {baseReport.submittedAt && (
                <Stack
                  direction="row"
                  sx={{ alignItems: 'center', gap: 0.5, color: 'text.secondary' }}
                >
                  <AccessTimeRoundedIcon sx={{ fontSize: 14 }} />
                  <Typography sx={{ fontSize: 11.5, fontWeight: 700 }}>
                    Submitted {baseReport.submittedAt}
                  </Typography>
                </Stack>
              )}
            </Stack>

            {/* AI suggestion */}
            {baseReport.status !== 'submitted' && (
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
                  mb: 2,
                }}
              >
                <AutoAwesomeIcon sx={{ fontSize: 14, color: '#7C5CFF' }} />
                <Typography
                  sx={{ fontSize: 11.5, color: 'text.secondary', flex: 1, lineHeight: 1.4 }}
                >
                  {baseReport.status === 'overdue'
                    ? 'Rohit hasn’t submitted this. Send a nudge — last 3 weeks averaged 96% on this task.'
                    : 'Awaiting submission. Default reminder fires automatically 15 mins before deadline.'}
                </Typography>
              </Stack>
            )}

            {/* Comments */}
            <SectionTitle>
              Conversation · {comments.length} {comments.length === 1 ? 'comment' : 'comments'}
            </SectionTitle>
            <Stack spacing={1.5} sx={{ mb: 1 }}>
              {comments.length === 0 ? (
                <Typography
                  sx={{
                    fontSize: 12,
                    color: 'text.secondary',
                    textAlign: 'center',
                    py: 2,
                    fontStyle: 'italic',
                  }}
                >
                  No comments yet. Be the first to respond.
                </Typography>
              ) : (
                comments.map(c => <CommentBubble key={c.id} comment={c} />)
              )}
            </Stack>
          </Box>

          {/* Composer pinned to bottom */}
          <Box
            sx={theme => ({
              px: 2,
              py: 1.25,
              borderTop:
                theme.palette.mode === 'dark'
                  ? '1px solid rgba(255,255,255,0.06)'
                  : '1px solid rgba(11,15,26,0.06)',
              background: theme.palette.background.default,
              flexShrink: 0,
            })}
          >
            <Stack direction="row" sx={{ alignItems: 'flex-end', gap: 1 }}>
              <TextField
                multiline
                maxRows={4}
                fullWidth
                size="small"
                placeholder="Reply as Owner…"
                value={draft}
                onChange={e => setDraft(e.target.value)}
                onKeyDown={e => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSend();
                  }
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2.5,
                    fontSize: 13,
                  },
                }}
              />
              <IconButton
                onClick={handleSend}
                disabled={!draft.trim()}
                sx={theme => {
                  const idleBg =
                    theme.palette.mode === 'dark'
                      ? 'rgba(255,255,255,0.10)'
                      : 'rgba(11,15,26,0.08)';
                  return {
                    width: 40,
                    height: 40,
                    background: draft.trim() ? tokens.gradient.tasks : idleBg,
                    color: '#fff',
                    flexShrink: 0,
                    '&:hover': {
                      background: draft.trim() ? tokens.gradient.tasks : idleBg,
                      filter: draft.trim() ? 'brightness(1.08)' : undefined,
                    },
                    '&.Mui-disabled': {
                      color:
                        theme.palette.mode === 'dark'
                          ? 'rgba(255,255,255,0.45)'
                          : 'rgba(11,15,26,0.45)',
                    },
                  };
                }}
              >
                <SendRoundedIcon fontSize="small" />
              </IconButton>
            </Stack>
          </Box>
        </>
      )}
    </Drawer>
  );
}
