import { Box, IconButton, Stack, Typography } from '@mui/material';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import QrCodeScannerRoundedIcon from '@mui/icons-material/QrCodeScannerRounded';
import StorefrontRoundedIcon from '@mui/icons-material/StorefrontRounded';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import { useNavigate } from 'react-router-dom';
import { tokens } from '../theme/tokens';

type KypAction = {
  id: string;
  label: string;
  description: string;
  icon: React.ReactNode;
  accent: string;
  gradient: string;
  onClick?: () => void;
};

function ActionCard({ action }: { action: KypAction }) {
  return (
    <Stack
      direction="row"
      onClick={action.onClick}
      spacing={2}
      sx={{
        alignItems: 'center',
        bgcolor: '#fff',
        borderRadius: 2,
        boxShadow: '0 1px 6px rgba(11,15,26,0.08)',
        p: 2,
        cursor: action.onClick ? 'pointer' : 'default',
        transition: 'transform .15s ease, box-shadow .2s ease',
        '&:hover': action.onClick
          ? { transform: 'translateY(-2px)', boxShadow: '0 8px 20px rgba(11,15,26,0.12)' }
          : undefined,
      }}
    >
      <Box
        sx={{
          width: 64,
          height: 64,
          borderRadius: 2,
          background: action.gradient,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: action.accent,
          flexShrink: 0,
          '& svg': { fontSize: 32 },
        }}
      >
        {action.icon}
      </Box>
      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Typography sx={{ fontSize: 17, fontWeight: 800, color: '#1F2C49', lineHeight: 1.2 }}>
          {action.label}
        </Typography>
        <Typography sx={{ fontSize: 12.5, color: '#6B7280', lineHeight: 1.4, mt: 0.25 }}>
          {action.description}
        </Typography>
      </Box>
      <ChevronRightRoundedIcon sx={{ color: '#9CA3AF', flexShrink: 0 }} />
    </Stack>
  );
}

function AiSuggestionBanner({ onClick }: { onClick: () => void }) {
  return (
    <Stack
      direction="row"
      onClick={onClick}
      spacing={1.5}
      sx={{
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
        borderRadius: 2,
        p: 1.75,
        background: tokens.gradient.aiAurora,
        color: '#fff',
        cursor: 'pointer',
        boxShadow: '0 8px 20px rgba(124,92,255,0.32)',
        transition: 'transform .15s ease, box-shadow .2s ease',
        '&:hover': { transform: 'translateY(-2px)', boxShadow: '0 12px 24px rgba(124,92,255,0.42)' },
      }}
    >
      <Box
        aria-hidden
        sx={{
          position: 'absolute',
          top: -24,
          right: -24,
          width: 80,
          height: 80,
          borderRadius: '50%',
          bgcolor: 'rgba(255,255,255,0.12)',
        }}
      />
      <Box
        sx={{
          width: 36,
          height: 36,
          borderRadius: 1.5,
          bgcolor: 'rgba(255,255,255,0.18)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          position: 'relative',
        }}
      >
        <AutoAwesomeIcon sx={{ fontSize: 20 }} />
      </Box>
      <Box sx={{ flex: 1, minWidth: 0, position: 'relative' }}>
        <Stack direction="row" spacing={0.75} sx={{ alignItems: 'center' }}>
          <Typography sx={{ fontSize: 14, fontWeight: 800, lineHeight: 1.1 }}>AI Suggestion</Typography>
          <Box
            sx={{
              fontSize: 8.5,
              fontWeight: 800,
              letterSpacing: 0.5,
              textTransform: 'uppercase',
              px: 0.6,
              py: 0.125,
              borderRadius: 999,
              bgcolor: 'rgba(255,255,255,0.22)',
            }}
          >
            New
          </Box>
        </Stack>
        <Typography sx={{ fontSize: 11.5, opacity: 0.9, mt: 0.25, lineHeight: 1.3 }}>
          Chat to get product picks for the customer
        </Typography>
      </Box>
      <ChevronRightRoundedIcon sx={{ flexShrink: 0, position: 'relative' }} />
    </Stack>
  );
}

export function KypPage() {
  const navigate = useNavigate();

  const actions: KypAction[] = [
    {
      id: 'scan-qr',
      label: 'Scan QR',
      description: 'Scan barcode / QR to identify a product in seconds',
      icon: <QrCodeScannerRoundedIcon />,
      accent: '#2563EB',
      gradient: 'linear-gradient(135deg, #EAF2FF 0%, #DCE7FB 100%)',
      onClick: () => navigate('/demo/kyp/scan'),
    },
    {
      id: 'find-my-product',
      label: 'Find My Product',
      description: 'Browse categories and narrow down by customer preferences',
      icon: <StorefrontRoundedIcon />,
      accent: '#C2410C',
      gradient: 'linear-gradient(135deg, #FFF1E6 0%, #FFE0C7 100%)',
      onClick: () => navigate('/demo/kyp/categories'),
    },
  ];

  return (
    <Box sx={{ pb: 12 }}>
      <Stack direction="row" sx={{ alignItems: 'center', mb: 2, gap: 1 }}>
        <IconButton
          onClick={() => navigate(-1)}
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
            KYP
          </Typography>
          <Typography sx={{ fontSize: 22, fontWeight: 800, letterSpacing: -0.4, lineHeight: 1.1 }}>
            Know Your Product
          </Typography>
        </Box>
      </Stack>

      <Typography sx={{ fontSize: 13, color: '#6B7280', lineHeight: 1.5, mb: 2 }}>
        Help customers find the right product, fast. Scan, browse, or get an AI-driven suggestion.
      </Typography>

      <Stack spacing={1.75}>
        <AiSuggestionBanner onClick={() => navigate('/demo/kyp/suggest')} />
        {actions.map(a => (
          <ActionCard key={a.id} action={a} />
        ))}
      </Stack>
    </Box>
  );
}

export default KypPage;
