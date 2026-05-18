import { Box, Button, Stack, TextField, Typography } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useState, type FormEvent } from 'react';
import { useAuth } from '../context/AuthContext';
import { surfaceBackground } from '../theme/glass';

/* Mock sign-in. Any name + any non-empty password works — whatever the user
 * types as Name becomes their profile across the demo. */

export function LoginPage() {
  const { signIn } = useAuth();
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setBusy(true);
    const res = await signIn(name, password);
    setBusy(false);
    if (!res.ok) setError(res.error);
  };

  return (
    <Box
      sx={theme => ({
        minHeight: '100dvh',
        background: surfaceBackground(theme),
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        p: 2,
      })}
    >
      <Box
        component="form"
        onSubmit={submit}
        sx={theme => ({
          width: '100%',
          maxWidth: 360,
          background:
            theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.04)' : '#ffffff',
          border:
            theme.palette.mode === 'dark'
              ? '1px solid rgba(255,255,255,0.08)'
              : '1px solid rgba(11,15,26,0.08)',
          borderRadius: 3,
          p: { xs: 3, sm: 4 },
          boxShadow:
            theme.palette.mode === 'dark'
              ? '0 24px 60px rgba(0,0,0,0.45)'
              : '0 24px 60px rgba(11,15,26,0.10)',
        })}
      >
        <Stack direction="row" sx={{ alignItems: 'center', gap: 1.25, mb: 2 }}>
          {/* Design-system icon tile: 38×38 r10, solid indigo. */}
          <Box
            sx={{
              width: 38,
              height: 38,
              borderRadius: '10px',
              background: '#3A57E3',
              color: '#fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <LockOutlinedIcon sx={{ fontSize: 20 }} />
          </Box>
          <Box>
            <Typography
              sx={{
                fontSize: 10.5,
                fontWeight: 800,
                letterSpacing: 0.6,
                textTransform: 'uppercase',
                color: 'text.secondary',
                lineHeight: 1,
              }}
            >
              Storeone
            </Typography>
            <Typography sx={{ fontSize: 18, fontWeight: 800, letterSpacing: -0.2 }}>
              Sign in
            </Typography>
          </Box>
        </Stack>

        <TextField
          label="Name"
          value={name}
          onChange={e => setName(e.target.value)}
          fullWidth
          autoComplete="name"
          autoFocus
          sx={{ mb: 1.5 }}
        />
        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          fullWidth
          autoComplete="current-password"
          sx={{ mb: error ? 1 : 2 }}
        />

        {error && (
          <Typography
            sx={{
              fontSize: 12,
              color: '#EF4444',
              mb: 1.5,
              fontWeight: 700,
            }}
          >
            {error}
          </Typography>
        )}

        {/* Design system · btn-pill: solid red, sans 600/13, padded, pill radius. */}
        <Button
          type="submit"
          variant="contained"
          fullWidth
          disabled={busy}
          sx={{
            background: '#F2533C',
            color: '#fff',
            fontWeight: 600,
            fontSize: 13,
            py: 1.25,
            px: 1.75,
            borderRadius: 999,
            textTransform: 'none',
            boxShadow: 'none',
            '&:hover': { background: '#F2533C', filter: 'brightness(1.08)', boxShadow: 'none' },
            '&.Mui-disabled': { background: '#F2533C', opacity: 0.6, color: '#fff' },
          }}
        >
          {busy ? 'Signing in…' : 'Sign in'}
        </Button>
      </Box>
    </Box>
  );
}
