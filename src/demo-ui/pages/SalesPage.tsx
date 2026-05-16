import { Box, IconButton, Stack, Tab, Tabs, Typography } from '@mui/material';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { DashboardTab } from './sales/DashboardTab';
import { InsightsTab } from './sales/InsightsTab';
import { ReportsTab } from './sales/ReportsTab';
import { AllOrdersTab } from './sales/AllOrdersTab';
import { moduleTabsSx } from '../theme/tabStyles';

type TabId = 'insights' | 'dashboard' | 'reports' | 'all';

const tabConfig: { id: TabId; label: string }[] = [
  { id: 'insights', label: 'Insights' },
  { id: 'dashboard', label: 'Dashboard' },
  { id: 'reports', label: 'Reports' },
  { id: 'all', label: 'All Orders' },
];

const tabVariants = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -6 },
};

export function SalesPage() {
  const navigate = useNavigate();
  const [tab, setTab] = useState<TabId>('dashboard');

  return (
    <Box sx={{ pb: 12 }}>
      <Stack direction="row" sx={{ alignItems: 'center', mb: 2, gap: 1 }}>
        <IconButton
          onClick={() => navigate('/demo')}
          size="small"
          sx={{
            width: 36,
            height: 36,
            borderRadius: 1,
            background: 'rgba(11,15,26,0.04)',
            border: '1px solid rgba(11,15,26,0.06)',
            '&:hover': { background: 'rgba(11,15,26,0.08)' },
          }}
        >
          <ArrowBackRoundedIcon fontSize="small" />
        </IconButton>
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Typography sx={{ fontSize: 11, fontWeight: 800, letterSpacing: 0.6, textTransform: 'uppercase', color: 'text.secondary', lineHeight: 1 }}>
            Sales & Orders
          </Typography>
          <Typography sx={{ fontSize: 22, fontWeight: 800, letterSpacing: -0.4, lineHeight: 1.1 }}>
            Sales and Orders
          </Typography>
        </Box>
      </Stack>

      <Box sx={{ mb: 2, width: '100%', overflow: 'hidden' }}>
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

      <AnimatePresence mode="wait">
        <motion.div
          key={tab}
          variants={tabVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 0.2, ease: 'easeOut' }}
        >
          {tab === 'insights' && <InsightsTab />}
          {tab === 'dashboard' && <DashboardTab />}
          {tab === 'reports' && <ReportsTab />}
          {tab === 'all' && <AllOrdersTab />}
        </motion.div>
      </AnimatePresence>
    </Box>
  );
}
