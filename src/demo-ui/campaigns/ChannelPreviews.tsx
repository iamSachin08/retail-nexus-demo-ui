import { Box, Stack, Typography } from '@mui/material';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import SmsRoundedIcon from '@mui/icons-material/SmsRounded';
import NotificationsActiveRoundedIcon from '@mui/icons-material/NotificationsActiveRounded';
import VerifiedRoundedIcon from '@mui/icons-material/VerifiedRounded';
import DoneAllRoundedIcon from '@mui/icons-material/DoneAllRounded';
import StorefrontRoundedIcon from '@mui/icons-material/StorefrontRounded';
import SignalCellularAltRoundedIcon from '@mui/icons-material/SignalCellularAltRounded';
import WifiRoundedIcon from '@mui/icons-material/WifiRounded';
import Battery90RoundedIcon from '@mui/icons-material/Battery90Rounded';
import type { Channel } from './mock';

interface PreviewProps {
  body: string;
  imageUrl?: string | null;
  brand?: string;
}

const PLACEHOLDER = 'Your message…';

function previewBody(b: string) {
  return b
    .replace(/\{\{first_name\}\}/g, 'Priya')
    .replace(/\{\{tier\}\}/g, 'VIP')
    .replace(/\{\{product\}\}/g, 'Slim Denim')
    .replace(/\{\{product_name\}\}/g, 'Slim Denim')
    .replace(/\{\{amount\}\}/g, '1500')
    .replace(/\{\{min\}\}/g, '5000');
}

function PhoneFrame({
  children,
  bg,
}: {
  children: React.ReactNode;
  bg?: string;
}) {
  return (
    <Box
      sx={{
        position: 'relative',
        borderRadius: 4,
        background: bg ?? '#0B141A',
        p: 1,
        pt: 1.5,
        border: '1px solid rgba(0,0,0,0.18)',
        boxShadow: '0 8px 22px rgba(0,0,0,0.18)',
      }}
    >
      {/* status bar */}
      <Stack
        direction="row"
        sx={{
          alignItems: 'center',
          px: 1.5,
          mb: 1,
          color: '#fff',
        }}
      >
        <Typography sx={{ fontSize: 11, fontWeight: 700, flex: 1 }}>
          9:41
        </Typography>
        <Stack direction="row" spacing={0.5} sx={{ alignItems: 'center' }}>
          <SignalCellularAltRoundedIcon sx={{ fontSize: 12 }} />
          <WifiRoundedIcon sx={{ fontSize: 12 }} />
          <Battery90RoundedIcon sx={{ fontSize: 14 }} />
        </Stack>
      </Stack>
      {children}
    </Box>
  );
}

export function WhatsAppPreview({ body, imageUrl, brand = 'Storeone Mart' }: PreviewProps) {
  const text = previewBody(body || PLACEHOLDER);
  return (
    <PhoneFrame bg="#0B141A">
      {/* chat header */}
      <Stack
        direction="row"
        sx={{
          alignItems: 'center',
          gap: 1,
          px: 1,
          py: 0.875,
          borderRadius: 1,
          bgcolor: '#1F2C34',
          color: '#fff',
          mb: 1,
        }}
      >
        <Box
          sx={{
            width: 30,
            height: 30,
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
            flexShrink: 0,
          }}
        >
          <StorefrontRoundedIcon sx={{ fontSize: 16 }} />
        </Box>
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Stack direction="row" sx={{ alignItems: 'center', gap: 0.5 }}>
            <Typography sx={{ fontSize: 12.5, fontWeight: 700, color: '#fff' }} noWrap>
              {brand}
            </Typography>
            <VerifiedRoundedIcon sx={{ fontSize: 11, color: '#25D366' }} />
          </Stack>
          <Typography sx={{ fontSize: 10, color: '#9AAAB5' }}>online</Typography>
        </Box>
      </Stack>

      {/* chat area */}
      <Box
        sx={{
          minHeight: 120,
          maxHeight: 280,
          overflowY: 'auto',
          bgcolor: '#0B141A',
          backgroundImage:
            'radial-gradient(rgba(255,255,255,0.04) 1px, transparent 1px)',
          backgroundSize: '10px 10px',
          p: 1,
          borderRadius: 1,
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'flex-start' }}>
          <Box
            sx={{
              maxWidth: '85%',
              bgcolor: '#202C33',
              color: '#E9EDEF',
              p: 0.75,
              borderRadius: 1.25,
              borderTopLeftRadius: 0,
              boxShadow: '0 1px 0.5px rgba(0,0,0,0.13)',
            }}
          >
            {imageUrl && (
              <Box
                component="img"
                src={imageUrl}
                alt=""
                sx={{
                  display: 'block',
                  width: '100%',
                  maxHeight: 160,
                  objectFit: 'cover',
                  borderRadius: 1,
                  mb: 0.625,
                }}
              />
            )}
            <Typography
              sx={{
                fontSize: 12.5,
                lineHeight: 1.45,
                color: '#E9EDEF',
                whiteSpace: 'pre-wrap',
                px: 0.5,
              }}
            >
              {text}
            </Typography>
            <Stack
              direction="row"
              spacing={0.25}
              sx={{ alignItems: 'center', justifyContent: 'flex-end', mt: 0.25, px: 0.5 }}
            >
              <Typography sx={{ fontSize: 9.5, color: '#8696A0' }}>9:41 AM</Typography>
              <DoneAllRoundedIcon sx={{ fontSize: 12, color: '#53BDEB' }} />
            </Stack>
          </Box>
        </Box>
      </Box>
    </PhoneFrame>
  );
}

export function SMSPreview({ body, brand = 'STOREONE' }: PreviewProps) {
  const text = previewBody(body || PLACEHOLDER);
  const len = text.length;
  const parts = Math.max(1, Math.ceil(len / 160));
  return (
    <PhoneFrame bg="#1B1B1F">
      <Stack
        direction="row"
        sx={{
          alignItems: 'center',
          gap: 1,
          px: 1,
          py: 0.875,
          borderRadius: 1,
          bgcolor: '#000',
          color: '#fff',
          mb: 1,
        }}
      >
        <Box
          sx={{
            width: 30,
            height: 30,
            borderRadius: '50%',
            bgcolor: '#3B82F6',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
            flexShrink: 0,
          }}
        >
          <SmsRoundedIcon sx={{ fontSize: 16 }} />
        </Box>
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Typography sx={{ fontSize: 12.5, fontWeight: 700, color: '#fff' }} noWrap>
            {brand}
          </Typography>
          <Typography sx={{ fontSize: 10, color: '#999' }}>Text Message</Typography>
        </Box>
      </Stack>

      <Box sx={{ bgcolor: '#000', p: 1.25, borderRadius: 1, minHeight: 100 }}>
        <Typography sx={{ fontSize: 10, color: '#777', textAlign: 'center', mb: 1 }}>
          Today · 9:41 AM
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'flex-start' }}>
          <Box
            sx={{
              maxWidth: '85%',
              bgcolor: '#2C2C2E',
              color: '#fff',
              px: 1.25,
              py: 0.875,
              borderRadius: 2.5,
              borderTopLeftRadius: 1,
            }}
          >
            <Typography
              sx={{
                fontSize: 12.5,
                lineHeight: 1.45,
                color: '#fff',
                whiteSpace: 'pre-wrap',
              }}
            >
              {text}
            </Typography>
          </Box>
        </Box>
        <Typography
          sx={{
            fontSize: 9,
            color: len > 160 ? '#F59E0B' : '#666',
            textAlign: 'right',
            mt: 0.75,
            fontWeight: 700,
            letterSpacing: 0.3,
          }}
        >
          {len} / 160 · {parts} SMS
        </Typography>
      </Box>
    </PhoneFrame>
  );
}

export function PushPreview({ body, brand = 'Storeone Mart' }: PreviewProps) {
  const text = previewBody(body || PLACEHOLDER);
  const title = text.split('\n')[0].slice(0, 40);
  const rest = text.length > title.length ? text.slice(title.length).trim() : '';
  return (
    <PhoneFrame bg="linear-gradient(180deg, #5B7BD5 0%, #7A5BD5 100%)">
      <Box sx={{ pt: 5, px: 1, pb: 1 }}>
        <Stack
          direction="row"
          spacing={1}
          sx={{
            alignItems: 'flex-start',
            p: 1,
            borderRadius: 2,
            bgcolor: 'rgba(255,255,255,0.92)',
            backdropFilter: 'blur(8px)',
          }}
        >
          <Box
            sx={{
              width: 30,
              height: 30,
              borderRadius: 1,
              background: 'linear-gradient(135deg, #FF6FA8 0%, #E54E8A 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
              flexShrink: 0,
            }}
          >
            <StorefrontRoundedIcon sx={{ fontSize: 16 }} />
          </Box>
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Stack direction="row" sx={{ alignItems: 'center', gap: 0.5 }}>
              <Typography
                sx={{ fontSize: 10, fontWeight: 800, color: '#374151', letterSpacing: 0.3 }}
                noWrap
              >
                {brand.toUpperCase()}
              </Typography>
              <Typography sx={{ fontSize: 9.5, color: '#94A3B8' }}>· now</Typography>
            </Stack>
            <Typography sx={{ fontSize: 12, fontWeight: 800, color: '#0B0F1A', mt: 0.125 }}>
              {title}
            </Typography>
            {rest && (
              <Typography
                sx={{
                  fontSize: 11.5,
                  color: '#374151',
                  mt: 0.125,
                  lineHeight: 1.35,
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                }}
              >
                {rest}
              </Typography>
            )}
          </Box>
        </Stack>
      </Box>
    </PhoneFrame>
  );
}

const ICON: Record<Channel, React.ReactNode> = {
  WhatsApp: <WhatsAppIcon sx={{ fontSize: 13 }} />,
  SMS: <SmsRoundedIcon sx={{ fontSize: 13 }} />,
  Push: <NotificationsActiveRoundedIcon sx={{ fontSize: 13 }} />,
};

const ACCENT: Record<Channel, string> = {
  WhatsApp: '#25D366',
  SMS: '#3B82F6',
  Push: '#A855F7',
};

export function ChannelPreviews({
  channels,
  body,
  imageUrl,
}: {
  channels: Channel[];
  body: string;
  imageUrl?: string | null;
}) {
  if (channels.length === 0) return null;
  return (
    <Stack spacing={1.5}>
      {channels.map(ch => (
        <Box key={ch}>
          <Stack direction="row" sx={{ alignItems: 'center', gap: 0.625, mb: 0.75 }}>
            <Box
              sx={{
                width: 22,
                height: 22,
                borderRadius: 0.75,
                bgcolor: ACCENT[ch],
                color: '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {ICON[ch]}
            </Box>
            <Typography
              sx={{
                fontSize: 10.5,
                fontWeight: 800,
                letterSpacing: 0.5,
                textTransform: 'uppercase',
                color: ACCENT[ch],
              }}
            >
              {ch} preview
            </Typography>
          </Stack>
          {ch === 'WhatsApp' && <WhatsAppPreview body={body} imageUrl={imageUrl} />}
          {ch === 'SMS' && <SMSPreview body={body} />}
          {ch === 'Push' && <PushPreview body={body} />}
        </Box>
      ))}
    </Stack>
  );
}
