import { Box, IconButton, Stack, Tab, Tabs, Typography } from '@mui/material';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import LightbulbOutlinedIcon from '@mui/icons-material/LightbulbOutlined';
import GridViewRoundedIcon from '@mui/icons-material/GridViewRounded';
import CampaignOutlinedIcon from '@mui/icons-material/CampaignOutlined';
import AutoAwesomeOutlinedIcon from '@mui/icons-material/AutoAwesomeOutlined';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { InsightsTab } from './InsightsTab';
import { DashboardTab } from './DashboardTab';
import { AllCampaignsTab } from './AllCampaignsTab';
import { TemplatesTab } from './TemplatesTab';
import { CreateCampaignDrawer } from './CreateCampaignDrawer';
import type { CampaignTemplate } from './mock';

const CAMPAIGN_GRADIENT = 'linear-gradient(135deg, #FF6FA8 0%, #E54E8A 100%)';

type TabId = 'all' | 'insights' | 'dashboard' | 'templates';

const tabConfig: { id: TabId; label: string; icon: React.ReactElement }[] = [
  { id: 'all', label: 'All Campaigns', icon: <CampaignOutlinedIcon sx={{ fontSize: 18 }} /> },
  { id: 'insights', label: 'Insights', icon: <LightbulbOutlinedIcon sx={{ fontSize: 18 }} /> },
  { id: 'dashboard', label: 'Dashboard', icon: <GridViewRoundedIcon sx={{ fontSize: 18 }} /> },
  { id: 'templates', label: 'Templates', icon: <AutoAwesomeOutlinedIcon sx={{ fontSize: 18 }} /> },
];

const tabVariants = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -6 },
};

export function CampaignsPage() {
  const navigate = useNavigate();
  const [tab, setTab] = useState<TabId>('all');
  const [createOpen, setCreateOpen] = useState(false);
  const [initialTemplate, setInitialTemplate] = useState<CampaignTemplate | null>(null);

  const openCreate = (tpl?: CampaignTemplate | null) => {
    setInitialTemplate(tpl ?? null);
    setCreateOpen(true);
  };

  return (
    <Box sx={{ pb: 12 }}>
      <Stack direction="row" sx={{ alignItems: 'center', mb: 2, gap: 1 }}>
        <IconButton
          onClick={() => navigate('/demo')}
          size="small"
          sx={theme => ({
            width: 36,
            height: 36,
            background:
              theme.palette.mode === 'dark'
                ? 'rgba(255,255,255,0.06)'
                : 'rgba(11,15,26,0.04)',
            border:
              theme.palette.mode === 'dark'
                ? '1px solid rgba(255,255,255,0.08)'
                : '1px solid rgba(11,15,26,0.06)',
            '&:hover': {
              background:
                theme.palette.mode === 'dark'
                  ? 'rgba(255,255,255,0.10)'
                  : 'rgba(11,15,26,0.08)',
            },
          })}
        >
          <ArrowBackRoundedIcon fontSize="small" />
        </IconButton>
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Typography
            sx={{
              fontSize: 11,
              fontWeight: 800,
              letterSpacing: 0.6,
              textTransform: 'uppercase',
              color: 'text.secondary',
              lineHeight: 1,
            }}
          >
            Marketing
          </Typography>
          <Typography
            sx={{ fontSize: 22, fontWeight: 800, letterSpacing: -0.4, lineHeight: 1.1 }}
          >
            Campaigns
          </Typography>
        </Box>
        <Stack
          direction="row"
          onClick={() => openCreate(null)}
          sx={{
            alignItems: 'center',
            gap: 0.4,
            px: 1.25,
            py: 0.5,
            borderRadius: 999,
            cursor: 'pointer',
            background: CAMPAIGN_GRADIENT,
            color: '#fff',
            boxShadow: '0 6px 14px rgba(229,78,138,0.32)',
            flexShrink: 0,
            '&:hover': { filter: 'brightness(1.08)' },
          }}
        >
          <Typography sx={{ fontSize: 13, fontWeight: 700, lineHeight: 1, mt: '-1px' }}>
            +
          </Typography>
          <Typography sx={{ fontSize: 11, fontWeight: 800 }}>Create</Typography>
        </Stack>
      </Stack>

      <Box
        sx={{
          mb: 2,
          p: 0.5,
          borderRadius: 999,
          width: '100%',
          overflow: 'hidden',
        }}
      >
        <Tabs
          value={tab}
          onChange={(_, v) => setTab(v as TabId)}
          variant="scrollable"
          scrollButtons={false}
          allowScrollButtonsMobile={false}
          sx={{
            minHeight: 36,
            '& .MuiTabs-indicator': { display: 'none' },
            '& .MuiTabs-flexContainer': { gap: 0.5 },
            '& .MuiTabs-scroller': {
              overflowX: 'auto !important',
              '&::-webkit-scrollbar': { display: 'none' },
              scrollbarWidth: 'none',
            },
            '& .MuiTab-root': {
              minHeight: 36,
              minWidth: 0,
              py: 0.5,
              px: 1.5,
              borderRadius: 999,
              fontSize: 12.5,
              fontWeight: 700,
              textTransform: 'none',
              color: 'text.secondary',
              transition: 'background .2s ease, color .2s ease',
              gap: 0.5,
              flexDirection: 'row',
              whiteSpace: 'nowrap',
              '&.Mui-selected': {
                background: CAMPAIGN_GRADIENT,
                color: '#fff',
                boxShadow: '0 6px 14px rgba(229,78,138,0.32)',
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
          {tab === 'insights' && <InsightsTab onLaunch={() => openCreate(null)} />}
          {tab === 'dashboard' && <DashboardTab />}
          {tab === 'all' && <AllCampaignsTab />}
          {tab === 'templates' && <TemplatesTab onUse={tpl => openCreate(tpl)} />}
        </motion.div>
      </AnimatePresence>

      <CreateCampaignDrawer
        open={createOpen}
        onClose={() => setCreateOpen(false)}
        initialTemplate={initialTemplate}
      />
    </Box>
  );
}

export default CampaignsPage;
