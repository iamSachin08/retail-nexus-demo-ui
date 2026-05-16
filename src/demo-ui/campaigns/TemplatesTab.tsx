import { Box, Chip, Stack, Typography } from '@mui/material';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import SmsRoundedIcon from '@mui/icons-material/SmsRounded';
import NotificationsActiveRoundedIcon from '@mui/icons-material/NotificationsActiveRounded';
import StarRoundedIcon from '@mui/icons-material/StarRounded';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import { GlassCard } from '../components/GlassCard';
import { templates, channelColor } from './mock';
import type { Channel, CampaignTemplate } from './mock';

const CAMPAIGN_GRADIENT = 'linear-gradient(135deg, #FF6FA8 0%, #E54E8A 100%)';

const channelIcon: Record<Channel, React.ReactNode> = {
  WhatsApp: <WhatsAppIcon sx={{ fontSize: 12 }} />,
  SMS: <SmsRoundedIcon sx={{ fontSize: 12 }} />,
  Push: <NotificationsActiveRoundedIcon sx={{ fontSize: 12 }} />,
};

function TemplateCard({
  tpl,
  onUse,
}: {
  tpl: CampaignTemplate;
  onUse: (tpl: CampaignTemplate) => void;
}) {
  return (
    <GlassCard interactive onClick={() => onUse(tpl)} sx={{ p: 2 }}>
      <Stack direction="row" sx={{ alignItems: 'flex-start', gap: 1.25 }}>
        <Box
          sx={{
            width: 38,
            height: 38,
            borderRadius: 1.5,
            background: CAMPAIGN_GRADIENT,
            color: '#fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            boxShadow: '0 4px 10px rgba(229,78,138,0.32)',
          }}
        >
          <AutoAwesomeIcon sx={{ fontSize: 18 }} />
        </Box>
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Stack direction="row" sx={{ alignItems: 'center', gap: 0.5, mb: 0.25 }}>
            <Typography sx={{ fontSize: 13.5, fontWeight: 800, flex: 1 }} noWrap>
              {tpl.name}
            </Typography>
            {tpl.popular && (
              <Stack direction="row" sx={{ alignItems: 'center', gap: 0.25 }}>
                <StarRoundedIcon sx={{ fontSize: 12, color: '#F59E0B' }} />
                <Typography
                  sx={{ fontSize: 9.5, fontWeight: 800, color: '#F59E0B', letterSpacing: 0.4 }}
                >
                  POPULAR
                </Typography>
              </Stack>
            )}
          </Stack>
          <Typography sx={{ fontSize: 11.5, color: 'text.secondary', lineHeight: 1.45, mb: 1 }}>
            {tpl.description}
          </Typography>
          <Stack direction="row" sx={{ alignItems: 'center', gap: 0.5, flexWrap: 'wrap' }}>
            <Chip
              size="small"
              label={tpl.type}
              sx={{
                height: 20,
                fontSize: 10.5,
                fontWeight: 700,
                bgcolor: 'rgba(229,78,138,0.12)',
                color: '#E54E8A',
                '& .MuiChip-label': { px: 0.875 },
              }}
            />
            {tpl.channels.map(ch => (
              <Box
                key={ch}
                sx={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 0.3,
                  px: 0.75,
                  py: 0.25,
                  borderRadius: 999,
                  bgcolor: `${channelColor[ch]}1F`,
                  color: channelColor[ch],
                  fontSize: 10.5,
                  fontWeight: 700,
                }}
              >
                {channelIcon[ch]}
                {ch}
              </Box>
            ))}
          </Stack>
        </Box>
      </Stack>
    </GlassCard>
  );
}

export function TemplatesTab({ onUse }: { onUse: (tpl: CampaignTemplate) => void }) {
  const popular = templates.filter(t => t.popular);
  const others = templates.filter(t => !t.popular);
  return (
    <Stack spacing={1.5}>
      <GlassCard sx={{ p: 2 }}>
        <Stack direction="row" sx={{ alignItems: 'center', gap: 1, mb: 0.5 }}>
          <Box
            sx={{
              width: 28,
              height: 28,
              borderRadius: 1.5,
              background: CAMPAIGN_GRADIENT,
              color: '#fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <AutoAwesomeIcon sx={{ fontSize: 16 }} />
          </Box>
          <Typography sx={{ fontSize: 15, fontWeight: 700, flex: 1 }}>
            Start from a template
          </Typography>
        </Stack>
        <Typography sx={{ fontSize: 11.5, color: 'text.secondary' }}>
          Pre-tuned for your locality. Tap to customise the message and audience before launch.
        </Typography>
      </GlassCard>

      <Box>
        <Typography
          sx={{
            fontSize: 11,
            fontWeight: 800,
            letterSpacing: 0.6,
            textTransform: 'uppercase',
            color: 'text.disabled',
            mb: 1,
            px: 0.5,
          }}
        >
          Popular templates
        </Typography>
        <Stack spacing={1.25}>
          {popular.map(tpl => (
            <TemplateCard key={tpl.id} tpl={tpl} onUse={onUse} />
          ))}
        </Stack>
      </Box>

      <Box>
        <Typography
          sx={{
            fontSize: 11,
            fontWeight: 800,
            letterSpacing: 0.6,
            textTransform: 'uppercase',
            color: 'text.disabled',
            mb: 1,
            px: 0.5,
          }}
        >
          More templates
        </Typography>
        <Stack spacing={1.25}>
          {others.map(tpl => (
            <TemplateCard key={tpl.id} tpl={tpl} onUse={onUse} />
          ))}
        </Stack>
      </Box>
    </Stack>
  );
}
