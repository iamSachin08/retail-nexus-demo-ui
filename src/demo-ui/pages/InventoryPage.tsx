import { Box, IconButton, Stack, Tab, Tabs, Typography } from '@mui/material';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { DashboardTab } from './inventory/DashboardTab';
import { InsightsTab } from './inventory/InsightsTab';
import { PurchasePredictionTab } from './inventory/PurchasePredictionTab';
import { AllProductsTab } from './inventory/AllProductsTab';
import { moduleTabsSx } from '../theme/tabStyles';

type TabId = 'dashboard' | 'insights' | 'prediction' | 'all-products';

const tabConfig: { id: TabId; label: string }[] = [
  { id: 'insights', label: 'Insights' },
  { id: 'dashboard', label: 'Dashboard' },
  { id: 'prediction', label: 'Purchase Prediction' },
  { id: 'all-products', label: 'All Products' },
];

const tabVariants = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -6 },
};

export function InventoryPage() {
  const navigate = useNavigate();
  const [tab, setTab] = useState<TabId>('insights');

  return (
    <Box sx={{ pb: 12 }}>
      {/* Header */}
      <Stack
        direction="row"
        sx={{
          alignItems: 'center',
          mb: 2,
          gap: 1,
        }}
      >
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
            Inventory
          </Typography>
          <Typography sx={{ fontSize: 22, fontWeight: 800, letterSpacing: -0.4, lineHeight: 1.1 }}>
            Inventory Management
          </Typography>
        </Box>
      </Stack>

      {/* Tabs */}
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

      {/* Tab content with crossfade */}
      <AnimatePresence mode="wait">
        <motion.div
          key={tab}
          variants={tabVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 0.2, ease: 'easeOut' }}
        >
          {tab === 'dashboard' && <DashboardTab />}
          {tab === 'insights' && <InsightsTab />}
          {tab === 'prediction' && <PurchasePredictionTab />}
          {tab === 'all-products' && <AllProductsTab />}
        </motion.div>
      </AnimatePresence>
    </Box>
  );
}
