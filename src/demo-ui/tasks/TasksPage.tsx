import { Box, IconButton, Stack, Tab, Tabs, Typography } from '@mui/material';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useShopPalette } from '../hooks/useShopPalette';
import { moduleTabsSx } from '../theme/tabStyles';
import { InsightsTab } from './InsightsTab';
import { DashboardTab } from './DashboardTab';
import { AllTasksTab, type AllTasksFilter } from './AllTasksTab';
import { CreateTaskForm } from './CreateTaskDrawer';
import { TaskDetailSheet } from './TaskDetailSheet';
import type { TaskCategory, TaskDefinition } from './mock';

type TabId = 'insights' | 'dashboard' | 'tasks';

const tabConfig: { id: TabId; label: string }[] = [
  { id: 'insights', label: 'Insights' },
  { id: 'dashboard', label: 'Dashboard' },
  { id: 'tasks', label: 'All Task' },
];

const tabVariants = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -6 },
};

export function TasksPage() {
  const navigate = useNavigate();
  const palette = useShopPalette();
  const [tab, setTab] = useState<TabId>('insights');
  const [showAdd, setShowAdd] = useState(false);
  const [openTask, setOpenTask] = useState<TaskDefinition | null>(null);
  const [allTasksFilter, setAllTasksFilter] = useState<AllTasksFilter>({
    category: 'All',
    status: 'All',
  });

  const jumpToList = (next: { category?: TaskCategory | 'All'; status?: string }) => {
    setAllTasksFilter(prev => ({
      category: next.category ?? prev.category,
      status: (next.status as AllTasksFilter['status']) ?? prev.status,
    }));
    setShowAdd(false);
    setTab('tasks');
  };

  return (
    <Box sx={{ pb: 12 }}>
      {/* Header — just back + title, matching the design's TaskPageHeader */}
      <Stack direction="row" sx={{ alignItems: 'center', mb: 2.25, gap: 1.25 }}>
        <IconButton
          onClick={() => navigate('/demo')}
          size="small"
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
          <ArrowBackRoundedIcon sx={{ fontSize: 18 }} />
        </IconButton>
        <Typography
          sx={{
            flex: 1,
            minWidth: 0,
            fontSize: 20,
            fontWeight: 600,
            letterSpacing: '-0.01em',
            color: palette.fg,
          }}
        >
          Task Management
        </Typography>
      </Stack>

      {/* Tabs hide while adding a task — matches the design (TaskTopTabs is only rendered when !showAdd) */}
      {!showAdd && (
        <Box sx={{ mb: 2.25, width: '100%', overflow: 'hidden' }}>
          <Tabs
            value={tab}
            onChange={(_, v) => setTab(v as TabId)}
            variant="scrollable"
            scrollButtons={false}
            allowScrollButtonsMobile={false}
            sx={moduleTabsSx}
          >
            {tabConfig.map(t => (
              <Tab key={t.id} value={t.id} label={t.label} />
            ))}
          </Tabs>
        </Box>
      )}

      <AnimatePresence mode="wait">
        <motion.div
          key={showAdd ? 'add' : tab}
          variants={tabVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 0.2, ease: 'easeOut' }}
        >
          {showAdd ? (
            <CreateTaskForm
              onClose={() => {
                setShowAdd(false);
                setTab('tasks');
              }}
            />
          ) : (
            <>
              {tab === 'insights' && <InsightsTab onOpenTask={setOpenTask} />}
              {tab === 'dashboard' && <DashboardTab onJumpToList={jumpToList} />}
              {tab === 'tasks' && (
                <AllTasksTab
                  onCreate={() => setShowAdd(true)}
                  onOpenTask={setOpenTask}
                  filter={allTasksFilter}
                  onFilterChange={setAllTasksFilter}
                />
              )}
            </>
          )}
        </motion.div>
      </AnimatePresence>

      <TaskDetailSheet task={openTask} onClose={() => setOpenTask(null)} />
    </Box>
  );
}

export default TasksPage;
