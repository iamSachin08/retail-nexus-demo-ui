import { Box, IconButton, Stack, Tab, Tabs, Typography } from '@mui/material';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import GridViewRoundedIcon from '@mui/icons-material/GridViewRounded';
import LightbulbOutlinedIcon from '@mui/icons-material/LightbulbOutlined';
import AutoGraphRoundedIcon from '@mui/icons-material/AutoGraphRounded';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { DashboardTab } from './inventory/DashboardTab';
import { InsightsTab } from './inventory/InsightsTab';
import { PurchasePredictionTab } from './inventory/PurchasePredictionTab';
import { AllProductsDrawer } from './inventory/AllProductsDrawer';
import { tokens } from '../theme/tokens';

type TabId = 'dashboard' | 'insights' | 'prediction';

const tabConfig: { id: TabId; label: string; icon: React.ReactElement }[] = [
  { id: 'insights', label: 'Insights', icon: <LightbulbOutlinedIcon sx={{ fontSize: 18 }} /> },
  { id: 'dashboard', label: 'Dashboard', icon: <GridViewRoundedIcon sx={{ fontSize: 18 }} /> },
  { id: 'prediction', label: 'Purchase', icon: <AutoGraphRoundedIcon sx={{ fontSize: 18 }} /> },
];

const tabVariants = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -6 },
};

export function InventoryPage() {
  const navigate = useNavigate();
  const [tab, setTab] = useState<TabId>('insights');
  const [productsOpen, setProductsOpen] = useState(false);

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
        <Stack
          direction="row"
          onClick={() => setProductsOpen(true)}
          sx={{
            alignItems: 'center',
            gap: 0.25,
            px: 1.25,
            py: 0.5,
            borderRadius: 999,
            cursor: 'pointer',
            background: 'rgba(124,92,255,0.08)',
            border: '1px solid rgba(124,139,255,0.25)',
            color: '#7C5CFF',
            '&:hover': { background: 'rgba(124,92,255,0.14)' },
            flexShrink: 0,
          }}
        >
          <Typography sx={{ fontSize: 12, fontWeight: 700 }}>All Products</Typography>
          <Typography sx={{ fontSize: 14, fontWeight: 700, lineHeight: 1 }}>›</Typography>
        </Stack>
      </Stack>

      {/* Tabs */}
      <Box
        sx={{
          mb: 2,
          p: 0.5,
          borderRadius: 999,
          background: 'rgba(11,15,26,0.05)',
          border: '1px solid rgba(11,15,26,0.06)',
          display: 'inline-flex',
          width: '100%',
        }}
      >
        <Tabs
          value={tab}
          onChange={(_, v) => setTab(v as TabId)}
          variant="fullWidth"
          sx={{
            width: '100%',
            minHeight: 36,
            '& .MuiTabs-indicator': { display: 'none' },
            '& .MuiTab-root': {
              minHeight: 36,
              py: 0.5,
              borderRadius: 999,
              fontSize: 12.5,
              fontWeight: 700,
              textTransform: 'none',
              color: 'text.secondary',
              transition: 'background .2s ease, color .2s ease',
              gap: 0.5,
              flexDirection: 'row',
              '&.Mui-selected': {
                background: tokens.gradient.aiAurora,
                color: '#fff',
                boxShadow: '0 6px 14px rgba(124,92,255,0.32)',
              },
            },
          }}
        >
          {tabConfig.map(t => (
            <Tab key={t.id} value={t.id} icon={t.icon} iconPosition="start" label={t.label} />
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
        </motion.div>
      </AnimatePresence>

      <AllProductsDrawer open={productsOpen} onClose={() => setProductsOpen(false)} />
    </Box>
  );
}
