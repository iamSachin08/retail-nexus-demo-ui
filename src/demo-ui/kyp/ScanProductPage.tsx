import { useState } from 'react';
import { Box, Button, IconButton, Stack, TextField, Typography } from '@mui/material';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import QrCodeScannerRoundedIcon from '@mui/icons-material/QrCodeScannerRounded';
import PhoneAndroidRoundedIcon from '@mui/icons-material/PhoneAndroidRounded';
import { useNavigate } from 'react-router-dom';

/* Stylised illustration mimicking the "hand holding phone with QR" mock. */
function ScanIllustration() {
  return (
    <Box
      sx={{
        position: 'relative',
        width: 200,
        height: 200,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* Peach blob background */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(circle at 55% 55%, #F8D7B8 0%, #F4C8A0 60%, transparent 75%)',
          borderRadius: '50%',
        }}
      />
      {/* Phone */}
      <Box
        sx={{
          position: 'relative',
          width: 96,
          height: 160,
          borderRadius: 3,
          bgcolor: '#1F2937',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#fff',
          boxShadow: '0 8px 20px rgba(11,15,26,0.25)',
          transform: 'rotate(-8deg)',
        }}
      >
        <Box
          sx={{
            width: 76,
            height: 140,
            borderRadius: 1.5,
            bgcolor: '#E7F0FE',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#1F2937',
          }}
        >
          <QrCodeScannerRoundedIcon sx={{ fontSize: 56 }} />
        </Box>
      </Box>
      {/* Smaller floating phone icon to give "scanning" feel */}
      <Box
        sx={{
          position: 'absolute',
          right: 12,
          top: 28,
          color: '#1F2937',
          opacity: 0.6,
        }}
      >
        <PhoneAndroidRoundedIcon sx={{ fontSize: 28 }} />
      </Box>
    </Box>
  );
}

function ScanCard({ onScan }: { onScan: () => void }) {
  return (
    <Box
      onClick={onScan}
      sx={{
        bgcolor: '#fff',
        borderRadius: 2,
        boxShadow: '0 1px 6px rgba(11,15,26,0.08)',
        p: 3,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 1.5,
        cursor: 'pointer',
        transition: 'transform .15s ease, box-shadow .2s ease',
        '&:hover': { transform: 'translateY(-2px)', boxShadow: '0 8px 20px rgba(11,15,26,0.12)' },
      }}
    >
      <Typography sx={{ fontSize: 20, fontWeight: 600, color: '#1F2C49', textAlign: 'center' }}>
        Scan Bar code / QR code
      </Typography>
      <ScanIllustration />
    </Box>
  );
}

function OrDivider() {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', my: -1.5, zIndex: 1, position: 'relative' }}>
      <Box
        sx={{
          width: 48,
          height: 48,
          borderRadius: '50%',
          bgcolor: '#0B0F1A',
          color: '#fff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontWeight: 800,
          fontSize: 14,
          letterSpacing: 0.5,
          fontFamily: 'serif',
          boxShadow: '0 4px 10px rgba(0,0,0,0.25)',
        }}
      >
        OR
      </Box>
    </Box>
  );
}

function ManualEntryCard({
  value,
  onChange,
  onSubmit,
}: {
  value: string;
  onChange: (v: string) => void;
  onSubmit: () => void;
}) {
  const disabled = value.trim().length === 0;
  return (
    <Box
      sx={{
        bgcolor: '#fff',
        borderRadius: 2,
        boxShadow: '0 1px 6px rgba(11,15,26,0.08)',
        p: 3,
      }}
    >
      <Typography sx={{ fontSize: 18, fontWeight: 600, color: '#1F2C49', mb: 1.5 }}>
        Manual Article ID
      </Typography>
      <TextField
        fullWidth
        value={value}
        onChange={e => onChange(e.target.value)}
        variant="outlined"
        size="medium"
        sx={{
          mb: 2,
          '& .MuiOutlinedInput-root': {
            bgcolor: '#fff',
            borderRadius: 1.5,
            minHeight: 64,
            alignItems: 'flex-start',
          },
          '& .MuiOutlinedInput-input': { py: 2 },
        }}
      />
      <Button
        fullWidth
        variant="contained"
        disabled={disabled}
        onClick={onSubmit}
        sx={{
          bgcolor: '#4C4DDC',
          color: '#fff',
          fontWeight: 700,
          letterSpacing: 1,
          py: 1.5,
          borderRadius: 1.5,
          boxShadow: '0 6px 14px rgba(76,77,220,0.35)',
          '&:hover': { bgcolor: '#3F40C2' },
          '&.Mui-disabled': { bgcolor: '#A5A6E6', color: '#fff' },
        }}
      >
        SUBMIT
      </Button>
    </Box>
  );
}

export function ScanProductPage() {
  const navigate = useNavigate();
  const [articleId, setArticleId] = useState('');

  const handleScan = () => {
    // Placeholder — scanner integration TBD.
  };

  const handleSubmit = () => {
    const id = articleId.trim();
    if (!id) return;
    navigate(`/demo/kyp/product/${encodeURIComponent(id)}`);
  };

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
            Scan Product
          </Typography>
        </Box>
      </Stack>

      <Stack spacing={2}>
        <ScanCard onScan={handleScan} />
        <OrDivider />
        <ManualEntryCard value={articleId} onChange={setArticleId} onSubmit={handleSubmit} />
      </Stack>
    </Box>
  );
}

export default ScanProductPage;
