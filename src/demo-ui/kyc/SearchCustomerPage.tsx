import { useCallback, useEffect, useRef, useState } from 'react';
import {
  Alert,
  Avatar,
  Box,
  CircularProgress,
  IconButton,
  InputAdornment,
  Snackbar,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import PhoneIphoneRoundedIcon from '@mui/icons-material/PhoneIphoneRounded';
import PersonOffRoundedIcon from '@mui/icons-material/PersonOffRounded';
import PersonSearchRoundedIcon from '@mui/icons-material/PersonSearchRounded';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import VerifiedRoundedIcon from '@mui/icons-material/VerifiedRounded';
import { useNavigate } from 'react-router-dom';
import { GlassCard } from '../components/GlassCard';
import { findCustomerByPhone, type CustomerSummary, recentCustomers } from './mock';

const PHONE_DEBOUNCE_MS = 600;

function isValidPhone(value: string) {
  const digits = value.replace(/\D/g, '');
  if (digits.length !== 10) return false;
  return /^[6-9]/.test(digits);
}

function maskPhone(phone: string) {
  if (phone.length < 6) return phone;
  return `${phone.slice(0, 2)}••••${phone.slice(-4)}`;
}

function CustomerHitCard({ customer, onOpen }: { customer: CustomerSummary; onOpen: () => void }) {
  return (
    <GlassCard
      interactive
      onClick={onOpen}
      sx={{ p: 2 }}
    >
      <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
        <Avatar
          sx={{
            width: 52,
            height: 52,
            bgcolor: customer.tierColor,
            color: '#fff',
            fontWeight: 800,
            fontSize: 17,
            boxShadow: `0 4px 12px ${customer.tierColor}40`,
          }}
        >
          {customer.initials}
        </Avatar>
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Stack direction="row" spacing={0.75} sx={{ alignItems: 'center', mb: 0.5 }}>
            <Typography
              sx={{ fontSize: 15, fontWeight: 800, color: 'text.primary', lineHeight: 1.2 }}
              noWrap
            >
              {customer.name}
            </Typography>
            {customer.verified && <VerifiedRoundedIcon sx={{ fontSize: 14, color: 'info.main' }} />}
          </Stack>
          <Stack direction="row" spacing={1} sx={{ alignItems: 'center', mb: 0.75 }}>
            <Typography sx={{ fontSize: 12, color: 'text.secondary' }}>
              {maskPhone(customer.phone)}
            </Typography>
            <Box sx={{ width: 3, height: 3, bgcolor: 'text.disabled', borderRadius: '50%' }} />
            <Typography sx={{ fontSize: 12, color: 'text.secondary' }}>{customer.id}</Typography>
          </Stack>
          <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
            <Box
              sx={{
                fontSize: 9.5,
                fontWeight: 800,
                letterSpacing: 0.5,
                textTransform: 'uppercase',
                px: 0.875,
                py: 0.25,
                borderRadius: 999,
                bgcolor: `${customer.tierColor}1F`,
                color: customer.tierColor,
              }}
            >
              {customer.tier}
            </Box>
            <Typography sx={{ fontSize: 11, color: 'text.disabled' }}>
              Last visit · {customer.lastVisit}
            </Typography>
          </Stack>
        </Box>
        <ChevronRightRoundedIcon sx={{ color: 'text.disabled', flexShrink: 0 }} />
      </Stack>
    </GlassCard>
  );
}

export function SearchCustomerPage() {
  const navigate = useNavigate();
  const [phone, setPhone] = useState('');
  const [committed, setCommitted] = useState('');
  const [hasSearched, setHasSearched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [validationError, setValidationError] = useState(false);
  const [match, setMatch] = useState<CustomerSummary | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const debounceRef = useRef<number | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const openSearch = useCallback(() => {
    setSearchOpen(true);
    window.setTimeout(() => inputRef.current?.focus(), 60);
  }, []);

  const runSearch = useCallback((digits: string) => {
    setLoading(true);
    setHasSearched(true);
    window.setTimeout(() => {
      const found = findCustomerByPhone(digits);
      setMatch(found);
      setLoading(false);
    }, 650);
  }, []);

  useEffect(() => () => {
    if (debounceRef.current) window.clearTimeout(debounceRef.current);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const next = e.target.value.replace(/\D/g, '').slice(0, 10);
    setPhone(next);
    setValidationError(false);

    if (debounceRef.current) window.clearTimeout(debounceRef.current);
    if (next.length === 10 && isValidPhone(next)) {
      debounceRef.current = window.setTimeout(() => {
        setCommitted(next);
        runSearch(next);
      }, PHONE_DEBOUNCE_MS);
    } else if (next.length === 0) {
      setHasSearched(false);
      setMatch(null);
      setCommitted('');
    }
  };

  const handleSubmit = () => {
    if (!isValidPhone(phone)) {
      setValidationError(true);
      return;
    }
    if (debounceRef.current) window.clearTimeout(debounceRef.current);
    setCommitted(phone);
    runSearch(phone);
  };

  const handleClear = () => {
    setPhone('');
    setCommitted('');
    setHasSearched(false);
    setMatch(null);
    setValidationError(false);
    setSearchOpen(false);
  };

  const showInitial = !hasSearched && !loading;
  const showSearchBar = searchOpen || hasSearched || loading;
  const showLoading = loading;
  const showFound = !loading && hasSearched && !!match;
  const showEmpty = !loading && hasSearched && !match;

  return (
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
            KYC
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
            Search Customer
          </Typography>
        </Box>
      </Stack>

      {showSearchBar && (
        <TextField
          placeholder="Search by Customer Phone Number"
          value={phone}
          onChange={handleChange}
          onKeyDown={e => e.key === 'Enter' && handleSubmit()}
          inputRef={inputRef}
          variant="outlined"
          fullWidth
          inputProps={{
            inputMode: 'tel',
            autoComplete: 'tel',
            maxLength: 10,
            'aria-label': 'Search by customer phone number',
          }}
          sx={theme => ({
            mb: 3,
            '& .MuiOutlinedInput-root': {
              bgcolor:
                theme.palette.mode === 'dark'
                  ? 'rgba(255,255,255,0.06)'
                  : '#fff',
              backdropFilter: 'blur(12px)',
              borderRadius: 999,
              boxShadow:
                theme.palette.mode === 'dark'
                  ? '0 4px 14px rgba(0,0,0,0.35)'
                  : '0 4px 14px rgba(11,15,26,0.08)',
              '& fieldset': {
                borderColor:
                  theme.palette.mode === 'dark'
                    ? 'rgba(255,255,255,0.10)'
                    : 'transparent',
              },
              '&:hover fieldset': {
                borderColor:
                  theme.palette.mode === 'dark'
                    ? 'rgba(255,255,255,0.18)'
                    : '#E5E7EB',
              },
              '&.Mui-focused fieldset': { borderColor: '#E5345C', borderWidth: 1.5 },
            },
            '& .MuiOutlinedInput-input': {
              py: 1.5,
              color: 'text.primary',
              '&::placeholder': { color: 'text.secondary', opacity: 1 },
            },
          })}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start" sx={{ ml: 1 }}>
                <PhoneIphoneRoundedIcon sx={{ color: 'text.disabled', fontSize: 22 }} />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                {phone.length > 0 ? (
                  <IconButton size="small" onClick={handleClear} aria-label="Clear search">
                    <CloseRoundedIcon sx={{ fontSize: 20, color: 'text.secondary' }} />
                  </IconButton>
                ) : (
                  <IconButton size="small" onClick={handleSubmit} aria-label="Search">
                    <SearchRoundedIcon sx={{ fontSize: 22, color: 'text.primary' }} />
                  </IconButton>
                )}
              </InputAdornment>
            ),
          }}
        />
      )}

      {showInitial && (
        <Stack spacing={3.5}>
          {!searchOpen && (
            <GlassCard
              interactive
              onClick={openSearch}
              sx={{
                position: 'relative',
                overflow: 'hidden',
                px: 3,
                py: 4.5,
                textAlign: 'center',
              }}
            >
              <Box
                aria-hidden
                sx={{
                  position: 'absolute',
                  top: -60,
                  right: -60,
                  width: 180,
                  height: 180,
                  borderRadius: '50%',
                  background:
                    'radial-gradient(circle, rgba(255,138,177,0.32) 0%, rgba(255,138,177,0) 70%)',
                  pointerEvents: 'none',
                }}
              />
              <Box
                aria-hidden
                sx={{
                  position: 'absolute',
                  bottom: -70,
                  left: -50,
                  width: 200,
                  height: 200,
                  borderRadius: '50%',
                  background:
                    'radial-gradient(circle, rgba(229,52,92,0.22) 0%, rgba(229,52,92,0) 70%)',
                  pointerEvents: 'none',
                }}
              />
              <Box sx={{ position: 'relative' }}>
                <Box
                  role="button"
                  tabIndex={0}
                  onKeyDown={e =>
                    (e.key === 'Enter' || e.key === ' ') && openSearch()
                  }
                  sx={{
                    width: 124,
                    height: 124,
                    mx: 'auto',
                    borderRadius: '50%',
                    background:
                      'linear-gradient(135deg, #FF8AB1 0%, #E5345C 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#fff',
                    mb: 2.5,
                    boxShadow: '0 12px 28px rgba(229,52,92,0.34)',
                  }}
                >
                  <PersonSearchRoundedIcon sx={{ fontSize: 60 }} />
                </Box>
                <Typography
                  sx={{
                    fontSize: 11,
                    fontWeight: 800,
                    letterSpacing: 0.8,
                    textTransform: 'uppercase',
                    color: '#E5345C',
                    mb: 1,
                  }}
                >
                  Tap to begin
                </Typography>
                <Typography
                  sx={{
                    fontSize: 20,
                    fontWeight: 800,
                    color: 'text.primary',
                    lineHeight: 1.25,
                    mb: 1,
                  }}
                >
                  Enter a phone number
                </Typography>
                <Typography
                  sx={{
                    fontSize: 13,
                    color: 'text.secondary',
                    lineHeight: 1.6,
                    maxWidth: 320,
                    mx: 'auto',
                  }}
                >
                  We'll pull profile, lifetime stats and behaviour patterns
                  based on past purchases.
                </Typography>
              </Box>
            </GlassCard>
          )}

          <Box>
            <Stack
              direction="row"
              sx={{
                alignItems: 'center',
                justifyContent: 'space-between',
                mb: 1.5,
                px: 0.5,
              }}
            >
              <Typography
                sx={{
                  fontSize: 11,
                  fontWeight: 800,
                  letterSpacing: 0.6,
                  textTransform: 'uppercase',
                  color: 'text.disabled',
                }}
              >
                Recent customers
              </Typography>
              <Typography sx={{ fontSize: 11, color: 'text.disabled' }}>
                {recentCustomers.length} this week
              </Typography>
            </Stack>
            <Stack spacing={1.5}>
              {recentCustomers.map(c => (
                <CustomerHitCard
                  key={c.id}
                  customer={c}
                  onOpen={() => navigate(`/demo/kyc/profile/${encodeURIComponent(c.id)}`)}
                />
              ))}
            </Stack>
          </Box>
        </Stack>
      )}

      {showLoading && (
        <Stack spacing={1.5} sx={{ mt: 1 }}>
          {[0, 1, 2].map(i => (
            <GlassCard key={i} sx={{ p: 2 }}>
              <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
                <Box
                  sx={theme => ({
                    width: 52,
                    height: 52,
                    borderRadius: '50%',
                    bgcolor:
                      theme.palette.mode === 'dark'
                        ? 'rgba(255,255,255,0.06)'
                        : 'rgba(11,15,26,0.05)',
                    flexShrink: 0,
                  })}
                />
                <Box sx={{ flex: 1 }}>
                  <Box
                    sx={theme => ({
                      height: 12,
                      width: '55%',
                      bgcolor:
                        theme.palette.mode === 'dark'
                          ? 'rgba(255,255,255,0.06)'
                          : 'rgba(11,15,26,0.05)',
                      borderRadius: 999,
                      mb: 0.75,
                    })}
                  />
                  <Box
                    sx={theme => ({
                      height: 10,
                      width: '40%',
                      bgcolor:
                        theme.palette.mode === 'dark'
                          ? 'rgba(255,255,255,0.04)'
                          : 'rgba(11,15,26,0.03)',
                      borderRadius: 999,
                    })}
                  />
                </Box>
                <CircularProgress size={18} sx={{ color: '#E5345C' }} />
              </Stack>
            </GlassCard>
          ))}
        </Stack>
      )}

      {showFound && match && (
        <Stack spacing={1.5}>
          <Typography
            sx={{
              fontSize: 11,
              fontWeight: 800,
              letterSpacing: 0.6,
              textTransform: 'uppercase',
              color: 'text.disabled',
              px: 0.5,
            }}
          >
            1 match for {committed}
          </Typography>
          <CustomerHitCard
            customer={match}
            onOpen={() => navigate(`/demo/kyc/profile/${encodeURIComponent(match.id)}`)}
          />
        </Stack>
      )}

      {showEmpty && (
        <GlassCard sx={{ p: 4, textAlign: 'center' }}>
          <Box
            sx={theme => ({
              width: 96,
              height: 96,
              mx: 'auto',
              borderRadius: '50%',
              bgcolor:
                theme.palette.mode === 'dark'
                  ? 'rgba(255,255,255,0.06)'
                  : 'rgba(11,15,26,0.05)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'text.secondary',
              mb: 2,
            })}
          >
            <PersonOffRoundedIcon sx={{ fontSize: 48 }} />
          </Box>
          <Typography
            sx={{ fontSize: 17, fontWeight: 800, color: 'text.primary', mb: 0.75 }}
          >
            No customer found
          </Typography>
          <Typography
            sx={{
              fontSize: 13,
              color: 'text.secondary',
              lineHeight: 1.55,
              mb: 2.5,
              maxWidth: 320,
              mx: 'auto',
            }}
          >
            We couldn't find anyone with {committed}. Want to start a fresh walk-in profile?
          </Typography>
          <Stack
            direction="row"
            spacing={0.75}
            onClick={() => navigate(`/demo/kyc/profile/new?phone=${committed}`)}
            sx={{
              alignItems: 'center',
              justifyContent: 'center',
              px: 2,
              py: 1.125,
              mx: 'auto',
              borderRadius: 999,
              bgcolor: '#E5345C',
              color: '#fff',
              fontWeight: 800,
              fontSize: 13,
              cursor: 'pointer',
              width: 'fit-content',
              boxShadow: '0 6px 14px rgba(229,52,92,0.32)',
              '&:hover': { bgcolor: '#C4264E' },
            }}
          >
            Create walk-in profile
            <ChevronRightRoundedIcon sx={{ fontSize: 18 }} />
          </Stack>
        </GlassCard>
      )}

      <Snackbar
        open={validationError}
        autoHideDuration={3000}
        onClose={() => setValidationError(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setValidationError(false)}
          severity="error"
          variant="filled"
          sx={{ width: '100%' }}
        >
          Please enter a valid 10-digit Indian phone number.
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default SearchCustomerPage;
