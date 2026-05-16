import { Box, Chip, Stack, Tab, Tabs, Typography } from '@mui/material';
import AccessTimeRoundedIcon from '@mui/icons-material/AccessTimeRounded';
import PersonOutlineRoundedIcon from '@mui/icons-material/PersonOutlineRounded';
import { useState } from 'react';
import { GlassCard } from '../components/GlassCard';
import { tokens } from '../theme/tokens';
import {
  allTasks,
  priorityColor,
  taskCategoryColor,
  type TaskDefinition,
  type TaskFrequency,
} from './mock';

type FilterId = 'all' | TaskFrequency;

const filterConfig: { id: FilterId; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'daily', label: 'Daily' },
  { id: 'weekly', label: 'Weekly' },
];

function TaskCard({ task }: { task: TaskDefinition }) {
  return (
    <GlassCard
      sx={theme => ({
        p: 1.75,
        borderLeft: `4px solid ${taskCategoryColor[task.category]}`,
        '&:hover': {
          boxShadow:
            theme.palette.mode === 'dark'
              ? '0 10px 28px rgba(0,0,0,0.4)'
              : '0 8px 24px rgba(11,15,26,0.08)',
        },
      })}
    >
      <Stack
        direction="row"
        sx={{ alignItems: 'flex-start', justifyContent: 'space-between', gap: 1, mb: 0.5 }}
      >
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Stack direction="row" sx={{ alignItems: 'center', gap: 0.5, mb: 0.25 }}>
            <Box
              sx={{
                px: 0.875,
                py: 0.125,
                borderRadius: 999,
                bgcolor: `${taskCategoryColor[task.category]}1F`,
                color: taskCategoryColor[task.category],
                fontSize: 9.5,
                fontWeight: 800,
                letterSpacing: 0.4,
                textTransform: 'uppercase',
              }}
            >
              {task.category}
            </Box>
            <Box
              sx={{
                px: 0.875,
                py: 0.125,
                borderRadius: 999,
                bgcolor:
                  task.frequency === 'daily'
                    ? 'rgba(124,92,255,0.16)'
                    : 'rgba(78,140,255,0.16)',
                color: task.frequency === 'daily' ? '#7C5CFF' : '#4E8CFF',
                fontSize: 9.5,
                fontWeight: 800,
                letterSpacing: 0.4,
                textTransform: 'uppercase',
              }}
            >
              {task.frequency}
            </Box>
          </Stack>
          <Typography sx={{ fontSize: 14, fontWeight: 700, mb: 0.25 }}>{task.title}</Typography>
          <Typography sx={{ fontSize: 12, color: 'text.secondary', lineHeight: 1.45 }}>
            {task.description}
          </Typography>
        </Box>
        <Chip
          size="small"
          label={task.priority.toUpperCase()}
          sx={{
            height: 18,
            fontSize: 9,
            fontWeight: 800,
            letterSpacing: 0.5,
            bgcolor: priorityColor[task.priority],
            color: '#fff',
            '& .MuiChip-label': { px: 0.75 },
          }}
        />
      </Stack>
      <Stack direction="row" sx={{ alignItems: 'center', gap: 1.5, mt: 1, flexWrap: 'wrap' }}>
        <Stack direction="row" sx={{ alignItems: 'center', gap: 0.5, color: 'text.secondary' }}>
          <AccessTimeRoundedIcon sx={{ fontSize: 13 }} />
          <Typography sx={{ fontSize: 11, fontWeight: 700 }}>
            {task.expectedMins > 0 ? `${task.expectedMins} min` : 'Ongoing'} · {task.dueLabel}
          </Typography>
        </Stack>
        <Stack direction="row" sx={{ alignItems: 'center', gap: 0.5, color: 'text.secondary' }}>
          <PersonOutlineRoundedIcon sx={{ fontSize: 13 }} />
          <Typography sx={{ fontSize: 11, fontWeight: 700 }}>{task.assignee}</Typography>
        </Stack>
      </Stack>
    </GlassCard>
  );
}

export function AllTasksTab({ onCreate }: { onCreate: () => void }) {
  const [filter, setFilter] = useState<FilterId>('all');
  const tasks = allTasks.filter(t => filter === 'all' || t.frequency === filter);

  return (
    <Stack spacing={1.5}>
      <Stack direction="row" sx={{ alignItems: 'center', gap: 1 }}>
        <Box
          sx={{
            flex: 1,
            p: 0.375,
            borderRadius: 999,
            background: 'rgba(11,15,26,0.05)',
            border: '1px solid rgba(11,15,26,0.06)',
            display: 'inline-flex',
          }}
        >
          <Tabs
            value={filter}
            onChange={(_, v) => setFilter(v as FilterId)}
            variant="fullWidth"
            sx={{
              width: '100%',
              minHeight: 30,
              '& .MuiTabs-indicator': { display: 'none' },
              '& .MuiTab-root': {
                minHeight: 30,
                py: 0.25,
                borderRadius: 999,
                fontSize: 12,
                fontWeight: 700,
                textTransform: 'none',
                color: 'text.secondary',
                '&.Mui-selected': {
                  background: tokens.gradient.tasks,
                  color: '#fff',
                },
              },
            }}
          >
            {filterConfig.map(f => (
              <Tab key={f.id} value={f.id} label={f.label} />
            ))}
          </Tabs>
        </Box>
        <Stack
          direction="row"
          onClick={onCreate}
          sx={{
            alignItems: 'center',
            gap: 0.4,
            px: 1,
            py: 0.5,
            borderRadius: 999,
            cursor: 'pointer',
            background: 'rgba(124,92,255,0.10)',
            border: '1px solid rgba(124,139,255,0.25)',
            color: '#7C5CFF',
            flexShrink: 0,
            '&:hover': { background: 'rgba(124,92,255,0.18)' },
          }}
        >
          <Typography sx={{ fontSize: 13, fontWeight: 700, lineHeight: 1, mt: '-1px' }}>
            +
          </Typography>
          <Typography sx={{ fontSize: 11, fontWeight: 800 }}>Add</Typography>
        </Stack>
      </Stack>

      <Stack spacing={1}>
        {tasks.map(t => (
          <TaskCard key={t.id} task={t} />
        ))}
        {tasks.length === 0 && (
          <Typography
            sx={{ fontSize: 12, color: 'text.secondary', textAlign: 'center', py: 3 }}
          >
            No tasks in this view.
          </Typography>
        )}
      </Stack>
    </Stack>
  );
}
