import { useEffect, useRef, useState } from 'react';
import { Box, Button, IconButton, Stack, TextField, Typography, useTheme } from '@mui/material';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import QrCodeScannerRoundedIcon from '@mui/icons-material/QrCodeScannerRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { useNavigate } from 'react-router-dom';

const DEMO_ARTICLE_ID = '491296926';

function ScanIllustration() {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  return (
    <Box
      sx={{
        position: 'relative',
        width: 180,
        height: 180,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(circle at 50% 50%, rgba(124,92,255,0.22) 0%, rgba(78,140,255,0.12) 45%, transparent 75%)',
          borderRadius: '50%',
        }}
      />
      <Box
        sx={{
          position: 'relative',
          width: 116,
          height: 116,
          borderRadius: 2.5,
          bgcolor: isDark ? 'rgba(255,255,255,0.06)' : '#fff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: isDark
            ? '0 10px 24px rgba(0,0,0,0.45)'
            : '0 10px 24px rgba(76,77,220,0.20)',
          border: isDark
            ? '1px solid rgba(255,255,255,0.10)'
            : '1px solid #EEF0F4',
        }}
      >
        <QrCodeScannerRoundedIcon sx={{ fontSize: 60, color: isDark ? '#A5B4FC' : '#4C4DDC' }} />
        {[
          { top: -5, left: -5, borderTop: `3px solid ${isDark ? '#A5B4FC' : '#4C4DDC'}`, borderLeft: `3px solid ${isDark ? '#A5B4FC' : '#4C4DDC'}`, borderTopLeftRadius: 8 },
          { top: -5, right: -5, borderTop: `3px solid ${isDark ? '#A5B4FC' : '#4C4DDC'}`, borderRight: `3px solid ${isDark ? '#A5B4FC' : '#4C4DDC'}`, borderTopRightRadius: 8 },
          { bottom: -5, left: -5, borderBottom: `3px solid ${isDark ? '#A5B4FC' : '#4C4DDC'}`, borderLeft: `3px solid ${isDark ? '#A5B4FC' : '#4C4DDC'}`, borderBottomLeftRadius: 8 },
          { bottom: -5, right: -5, borderBottom: `3px solid ${isDark ? '#A5B4FC' : '#4C4DDC'}`, borderRight: `3px solid ${isDark ? '#A5B4FC' : '#4C4DDC'}`, borderBottomRightRadius: 8 },
        ].map((corner, i) => (
          <Box key={i} sx={{ position: 'absolute', width: 22, height: 22, ...corner }} />
        ))}
      </Box>
    </Box>
  );
}

function ScanCard({ onScan }: { onScan: () => void }) {
  return (
    <Box
      onClick={onScan}
      sx={theme => ({
        bgcolor:
          theme.palette.mode === 'dark'
            ? 'rgba(255,255,255,0.04)'
            : '#fff',
        border:
          theme.palette.mode === 'dark'
            ? '1px solid rgba(255,255,255,0.08)'
            : '1px solid rgba(11,15,26,0.06)',
        borderRadius: 1.5,
        boxShadow:
          theme.palette.mode === 'dark'
            ? '0 10px 30px rgba(0,0,0,0.35)'
            : '0 1px 6px rgba(11,15,26,0.08)',
        p: 3.5,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 1.25,
        cursor: 'pointer',
        transition: 'transform .15s ease, box-shadow .2s ease',
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow:
            theme.palette.mode === 'dark'
              ? '0 14px 36px rgba(0,0,0,0.5)'
              : '0 8px 20px rgba(11,15,26,0.12)',
        },
      })}
    >
      <ScanIllustration />
      <Typography sx={{ fontSize: 18, fontWeight: 800, color: 'text.primary', textAlign: 'center', mt: 0.75 }}>
        Scan QR code
      </Typography>
      <Typography sx={{ fontSize: 12.5, color: 'text.secondary', textAlign: 'center', maxWidth: 280, lineHeight: 1.5 }}>
        Tap to open your camera and point it at the product QR
      </Typography>
    </Box>
  );
}

function OrDivider() {
  return (
    <Stack direction="row" sx={{ alignItems: 'center', gap: 1.5, px: 0.5, py: 0.5 }}>
      <Box
        sx={theme => ({
          flex: 1,
          height: 1,
          bgcolor:
            theme.palette.mode === 'dark'
              ? 'rgba(255,255,255,0.10)'
              : '#E5E7EB',
        })}
      />
      <Typography
        sx={{
          fontSize: 10.5,
          fontWeight: 800,
          color: 'text.secondary',
          letterSpacing: 0.8,
          textTransform: 'uppercase',
        }}
      >
        or enter manually
      </Typography>
      <Box
        sx={theme => ({
          flex: 1,
          height: 1,
          bgcolor:
            theme.palette.mode === 'dark'
              ? 'rgba(255,255,255,0.10)'
              : '#E5E7EB',
        })}
      />
    </Stack>
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
      sx={theme => ({
        bgcolor:
          theme.palette.mode === 'dark'
            ? 'rgba(255,255,255,0.04)'
            : '#fff',
        border:
          theme.palette.mode === 'dark'
            ? '1px solid rgba(255,255,255,0.08)'
            : '1px solid rgba(11,15,26,0.06)',
        borderRadius: 1.5,
        boxShadow:
          theme.palette.mode === 'dark'
            ? '0 10px 30px rgba(0,0,0,0.35)'
            : '0 1px 6px rgba(11,15,26,0.08)',
        p: 3,
      })}
    >
      <Typography sx={{ fontSize: 18, fontWeight: 800, color: 'text.primary', mb: 0.5 }}>
        Manual Article ID
      </Typography>
      <Typography sx={{ fontSize: 12.5, color: 'text.secondary', mb: 2, lineHeight: 1.5 }}>
        Type the article ID printed on the product tag
      </Typography>
      <TextField
        fullWidth
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder="e.g., 491296926"
        variant="outlined"
        size="medium"
        sx={theme => ({
          mb: 2,
          '& .MuiOutlinedInput-root': {
            bgcolor:
              theme.palette.mode === 'dark'
                ? 'rgba(255,255,255,0.06)'
                : '#fff',
            borderRadius: 1.5,
            '& fieldset': {
              borderColor:
                theme.palette.mode === 'dark'
                  ? 'rgba(255,255,255,0.12)'
                  : 'rgba(11,15,26,0.12)',
            },
            '&:hover fieldset': {
              borderColor:
                theme.palette.mode === 'dark'
                  ? 'rgba(255,255,255,0.22)'
                  : 'rgba(11,15,26,0.22)',
            },
          },
          '& .MuiOutlinedInput-input': { py: 1.5, fontSize: 14 },
        })}
      />
      <Button
        fullWidth
        variant="contained"
        disabled={disabled}
        onClick={onSubmit}
        sx={theme => ({
          bgcolor: '#4C4DDC',
          color: '#fff',
          fontWeight: 700,
          fontSize: 15,
          letterSpacing: 0.5,
          py: 1.5,
          borderRadius: 1.5,
          textTransform: 'none',
          boxShadow: '0 6px 14px rgba(76,77,220,0.35)',
          '&:hover': { bgcolor: '#3F40C2' },
          '&.Mui-disabled': {
            bgcolor:
              theme.palette.mode === 'dark'
                ? 'rgba(124,92,255,0.18)'
                : '#CDCEEC',
            color:
              theme.palette.mode === 'dark'
                ? 'rgba(255,255,255,0.45)'
                : '#fff',
          },
        })}
      >
        Submit
      </Button>
    </Box>
  );
}

type BarcodeDetectorLike = {
  detect: (source: HTMLVideoElement) => Promise<Array<{ rawValue?: string }>>;
};

type BarcodeDetectorCtor = {
  new (options?: { formats?: string[] }): BarcodeDetectorLike;
  getSupportedFormats?: () => Promise<string[]>;
};

function CameraScanner({
  onClose,
  onDetected,
}: {
  onClose: () => void;
  onDetected: (value: string) => void;
}) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [ready, setReady] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let stream: MediaStream | null = null;
    let active = true;
    let timerId: number | undefined;

    const start = async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: { ideal: 'environment' } },
          audio: false,
        });
        if (!active) {
          stream.getTracks().forEach(t => t.stop());
          return;
        }
        const video = videoRef.current;
        if (video) {
          video.srcObject = stream;
          try {
            await video.play();
          } catch {
            /* autoplay may need a tap on some browsers — overlay button covers this */
          }
          setReady(true);
        }

        const BD = (window as unknown as { BarcodeDetector?: BarcodeDetectorCtor }).BarcodeDetector;
        if (!BD) return;
        let formats: string[] = ['qr_code'];
        try {
          const supported = (await BD.getSupportedFormats?.()) ?? [];
          const allowed = ['qr_code', 'code_128', 'ean_13', 'ean_8', 'upc_a', 'upc_e'];
          const filtered = supported.filter(f => allowed.includes(f));
          if (filtered.length) formats = filtered;
        } catch {
          /* keep default */
        }
        const detector = new BD({ formats });
        const tick = async () => {
          if (!active) return;
          const v = videoRef.current;
          if (!v || v.readyState < 2) {
            timerId = window.setTimeout(tick, 250);
            return;
          }
          try {
            const codes = await detector.detect(v);
            if (codes && codes.length > 0 && active) {
              const raw = codes[0].rawValue?.trim();
              onDetected(raw && raw.length > 0 ? raw : DEMO_ARTICLE_ID);
              return;
            }
          } catch {
            /* keep polling */
          }
          timerId = window.setTimeout(tick, 350);
        };
        timerId = window.setTimeout(tick, 600);
      } catch (e) {
        const message = e instanceof Error ? e.message : 'Camera access denied';
        setError(message);
      }
    };
    start();

    return () => {
      active = false;
      if (timerId) window.clearTimeout(timerId);
      if (stream) stream.getTracks().forEach(t => t.stop());
    };
  }, [onDetected]);

  const corners = [
    { top: 0, left: 0, borderTop: '3px solid #fff', borderLeft: '3px solid #fff', borderTopLeftRadius: 14 },
    { top: 0, right: 0, borderTop: '3px solid #fff', borderRight: '3px solid #fff', borderTopRightRadius: 14 },
    { bottom: 0, left: 0, borderBottom: '3px solid #fff', borderLeft: '3px solid #fff', borderBottomLeftRadius: 14 },
    { bottom: 0, right: 0, borderBottom: '3px solid #fff', borderRight: '3px solid #fff', borderBottomRightRadius: 14 },
  ];

  return (
    <Box sx={{ position: 'fixed', inset: 0, bgcolor: '#000', zIndex: 1500, overflow: 'hidden' }}>
      <video
        ref={videoRef}
        muted
        playsInline
        autoPlay
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
        }}
      />
      <Box sx={{ position: 'absolute', inset: 0, bgcolor: 'rgba(0,0,0,0.42)' }} />

      <Stack
        direction="row"
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          p: 2,
          alignItems: 'center',
          gap: 1,
        }}
      >
        <IconButton
          onClick={onClose}
          sx={{
            width: 40,
            height: 40,
            bgcolor: 'rgba(255,255,255,0.16)',
            backdropFilter: 'blur(10px)',
            color: '#fff',
            '&:hover': { bgcolor: 'rgba(255,255,255,0.26)' },
          }}
        >
          <CloseRoundedIcon />
        </IconButton>
        <Typography sx={{ color: '#fff', fontSize: 15, fontWeight: 800, ml: 1, letterSpacing: 0.2 }}>
          Scan QR Code
        </Typography>
      </Stack>

      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          pointerEvents: 'none',
        }}
      >
        <Box sx={{ position: 'relative', width: 260, height: 260 }}>
          {corners.map((corner, i) => (
            <Box key={i} sx={{ position: 'absolute', width: 36, height: 36, ...corner }} />
          ))}
          <Box
            sx={{
              position: 'absolute',
              left: 12,
              right: 12,
              height: 2,
              bgcolor: '#36D1DC',
              boxShadow: '0 0 16px rgba(54,209,220,0.9)',
              borderRadius: 999,
              animation: 'kypScanLine 2.2s ease-in-out infinite',
            }}
          />
        </Box>
      </Box>

      <Stack
        spacing={1.5}
        sx={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          p: 3,
          pb: 4,
          alignItems: 'center',
        }}
      >
        {error ? (
          <Typography sx={{ color: '#fff', fontSize: 13, textAlign: 'center', maxWidth: 320, opacity: 0.9 }}>
            {error}. Use Simulate scan to continue the demo.
          </Typography>
        ) : (
          <Typography sx={{ color: 'rgba(255,255,255,0.9)', fontSize: 13, fontWeight: 600, textAlign: 'center' }}>
            {ready ? 'Point your camera at any QR code' : 'Starting camera…'}
          </Typography>
        )}
        <Button
          onClick={() => onDetected(DEMO_ARTICLE_ID)}
          variant="contained"
          sx={{
            bgcolor: '#fff',
            color: '#0B0F1A',
            fontWeight: 800,
            py: 1.25,
            px: 4,
            borderRadius: 999,
            textTransform: 'none',
            boxShadow: '0 6px 16px rgba(0,0,0,0.28)',
            '&:hover': { bgcolor: '#F3F4F6' },
          }}
        >
          Simulate scan
        </Button>
      </Stack>

      <style>{`
        @keyframes kypScanLine {
          0% { top: 8%; }
          50% { top: 92%; }
          100% { top: 8%; }
        }
      `}</style>
    </Box>
  );
}

export function ScanProductPage() {
  const navigate = useNavigate();
  const [articleId, setArticleId] = useState('');
  const [scannerOpen, setScannerOpen] = useState(false);

  const goToProduct = (id: string) => {
    const trimmed = id.trim() || DEMO_ARTICLE_ID;
    navigate(`/demo/kyp/product/${encodeURIComponent(trimmed)}`);
  };

  const handleScanResult = (value: string) => {
    setScannerOpen(false);
    goToProduct(value);
  };

  const handleSubmit = () => {
    if (!articleId.trim()) return;
    goToProduct(articleId);
  };

  return (
    <>
      <Box sx={{ pb: 14 }}>
        <Stack direction="row" sx={{ alignItems: 'center', mb: 3, gap: 1.25 }}>
          <IconButton
            onClick={() => navigate(-1)}
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
                mb: 0.25,
              }}
            >
              KYP
            </Typography>
            <Typography
              sx={{
                fontSize: 22,
                fontWeight: 800,
                letterSpacing: -0.4,
                lineHeight: 1.1,
                color: 'text.primary',
              }}
            >
              Scan Product
            </Typography>
          </Box>
        </Stack>

        <Typography sx={{ fontSize: 13, color: 'text.secondary', lineHeight: 1.55, mb: 3 }}>
          Identify a product in seconds — scan its QR code or enter the article ID manually.
        </Typography>

        <Stack spacing={2.5}>
          <ScanCard onScan={() => setScannerOpen(true)} />
          <OrDivider />
          <ManualEntryCard value={articleId} onChange={setArticleId} onSubmit={handleSubmit} />
        </Stack>
      </Box>

      {scannerOpen && (
        <CameraScanner onClose={() => setScannerOpen(false)} onDetected={handleScanResult} />
      )}
    </>
  );
}

export default ScanProductPage;
