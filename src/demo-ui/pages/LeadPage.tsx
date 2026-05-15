import { Box, IconButton, Stack, Tab, Tabs, Typography } from '@mui/material';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import GridViewRoundedIcon from '@mui/icons-material/GridViewRounded';
import LightbulbOutlinedIcon from '@mui/icons-material/LightbulbOutlined';
import PeopleAltRoundedIcon from '@mui/icons-material/PeopleAltRounded';
import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { DashboardTab } from './lead/DashboardTab';
import { InsightsTab } from './lead/InsightsTab';
import { AllLeadsTab } from './lead/AllLeadsTab';
import { LeadDetailDrawer } from './lead/LeadDetailDrawer';
import { AddLeadDrawer } from './lead/AddLeadDrawer';
import { tokens } from '../theme/tokens';

type TabId = 'insights' | 'dashboard' | 'all';

const tabConfig: { id: TabId; label: string; icon: React.ReactElement }[] = [
  { id: 'insights', label: 'Insights', icon: <LightbulbOutlinedIcon sx={{ fontSize: 18 }} /> },
  { id: 'dashboard', label: 'Dashboard', icon: <GridViewRoundedIcon sx={{ fontSize: 18 }} /> },
  { id: 'all', label: 'All Leads', icon: <PeopleAltRoundedIcon sx={{ fontSize: 18 }} /> },
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
      </Stack>

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
          {tab === 'all' && (
            <AllLeadsTab onOpenLead={setOpenLeadId} onAddLead={() => setAddOpen(true)} />
          )}
        </motion.div>
      </AnimatePresence>

      <LeadDetailDrawer leadId={openLeadId} onClose={() => setOpenLeadId(null)} />
      <AddLeadDrawer open={addOpen} onClose={() => setAddOpen(false)} />
    </Box>
  );
}
