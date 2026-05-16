import { Box, IconButton, Stack, Tab, Tabs, Typography } from '@mui/material';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { DashboardTab } from './lead/DashboardTab';
import { InsightsTab } from './lead/InsightsTab';
import { AllLeadsTab } from './lead/AllLeadsTab';
import { LeadDetailDrawer } from './lead/LeadDetailDrawer';
import { AddLeadDrawer } from './lead/AddLeadDrawer';
import { moduleTabsSx } from '../theme/tabStyles';

type TabId = 'insights' | 'dashboard' | 'all';

const tabConfig: { id: TabId; label: string }[] = [
  { id: 'insights', label: 'Insights' },
  { id: 'dashboard', label: 'Dashboard' },
  { id: 'all', label: 'All Leads' },
];

const tabVariants = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -6 },
};

export function LeadPage() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [tab, setTab] = useState<TabId>('insights');
  const [openLeadId, setOpenLeadId] = useState<string | null>(null);
  const [addOpen, setAddOpen] = useState(false);

  /* Allow Shop Assistant deep links: /demo/lead?leadId=… or ?add=1 */
  useEffect(() => {
    const id = searchParams.get('leadId');
    const wantsAdd = searchParams.get('add');
    if (id) {
      setOpenLeadId(id);
      searchParams.delete('leadId');
      setSearchParams(searchParams, { replace: true });
    }
    if (wantsAdd) {
      setAddOpen(true);
      searchParams.delete('add');
      setSearchParams(searchParams, { replace: true });
    }
  }, [searchParams, setSearchParams]);

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
            Lead
          </Typography>
          <Typography sx={{ fontSize: 22, fontWeight: 800, letterSpacing: -0.4, lineHeight: 1.1 }}>
            Lead Management
          </Typography>
        </Box>
        <Stack
          direction="row"
          onClick={() => setAddOpen(true)}
          sx={{
            alignItems: 'center',
            gap: 0.25,
            px: 1,
            py: 0.35,
            borderRadius: 999,
            cursor: 'pointer',
            background: 'rgba(124,92,255,0.08)',
            border: '1px solid rgba(124,139,255,0.25)',
            color: '#7C5CFF',
            '&:hover': { background: 'rgba(124,92,255,0.14)' },
            flexShrink: 0,
          }}
        >
          <Typography sx={{ fontSize: 13, fontWeight: 700, lineHeight: 1, mt: '-1px' }}>+</Typography>
          <Typography sx={{ fontSize: 11, fontWeight: 700 }}>Add Lead</Typography>
        </Stack>
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
          {tab === 'insights' && <InsightsTab onOpenLead={setOpenLeadId} />}
          {tab === 'dashboard' && <DashboardTab />}
          {tab === 'all' && <AllLeadsTab onOpenLead={setOpenLeadId} />}
        </motion.div>
      </AnimatePresence>

      <LeadDetailDrawer leadId={openLeadId} onClose={() => setOpenLeadId(null)} />
      <AddLeadDrawer open={addOpen} onClose={() => setAddOpen(false)} />
    </Box>
  );
}
