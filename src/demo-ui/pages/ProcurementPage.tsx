import { Box, IconButton, Stack, Tab, Tabs, Typography } from '@mui/material';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useShopPalette } from '../hooks/useShopPalette';
import { moduleTabsSx } from '../theme/tabStyles';
import { InsightsTab } from './procurement/InsightsTab';
import { DashboardTab } from './procurement/DashboardTab';
import { ListTab, NewProcurementSheet, ProcurementDetailSheet } from './procurement/ListTab';
import { VendorsTab, VendorProfileSheet } from './procurement/VendorsTab';

type TabId = 'insights' | 'dashboard' | 'list' | 'vendors';

const tabConfig: { id: TabId; label: string }[] = [
  { id: 'insights', label: 'Insights' },
  { id: 'dashboard', label: 'Dashboard' },
  { id: 'list', label: 'Procurement List' },
  { id: 'vendors', label: 'Vendors' },
];

const tabVariants = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -6 },
};

export function ProcurementPage() {
  const navigate = useNavigate();
  const palette = useShopPalette();
  const [tab, setTab] = useState<TabId>('insights');
  const [showNew, setShowNew] = useState(false);
  const [newStep, setNewStep] = useState(1);
  const [showDetail, setShowDetail] = useState(false);
  const [showVendor, setShowVendor] = useState(false);

  const startNew = () => {
    setNewStep(1);
    setShowNew(true);
  };

  return (
    <Box sx={{ pb: 12 }}>
      {/* Header */}
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
        <Typography sx={{ flex: 1, minWidth: 0, fontSize: 20, fontWeight: 600, letterSpacing: '-0.01em', color: palette.fg }}>
          Procurement
        </Typography>
      </Stack>

      {/* Tabs */}
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

      <AnimatePresence mode="wait">
        <motion.div
          key={tab}
          variants={tabVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 0.2, ease: 'easeOut' }}
        >
          {tab === 'insights' && <InsightsTab onCreate={startNew} />}
          {tab === 'dashboard' && <DashboardTab />}
          {tab === 'list' && <ListTab onCreate={startNew} onOpenDetail={() => setShowDetail(true)} />}
          {tab === 'vendors' && <VendorsTab onOpenVendor={() => setShowVendor(true)} />}
        </motion.div>
      </AnimatePresence>

      <NewProcurementSheet open={showNew} step={newStep} onStep={setNewStep} onClose={() => setShowNew(false)} />
      <ProcurementDetailSheet open={showDetail} onClose={() => setShowDetail(false)} />
      <VendorProfileSheet open={showVendor} onClose={() => setShowVendor(false)} />
    </Box>
  );
}
