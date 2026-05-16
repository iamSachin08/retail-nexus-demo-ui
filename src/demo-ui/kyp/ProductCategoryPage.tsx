import { Avatar, Box, IconButton, Stack, Typography } from '@mui/material';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import SmartphoneRoundedIcon from '@mui/icons-material/SmartphoneRounded';
import PetsRoundedIcon from '@mui/icons-material/PetsRounded';
import { useNavigate } from 'react-router-dom';

type Category = {
  id: string;
  label: string;
  avatar:
    | { kind: 'icon'; bg: string; color: string; icon: React.ReactNode }
    | { kind: 'letter'; bg: string; color: string; letter: string }
    | { kind: 'pattern'; gradient: string };
};

const CATEGORIES: Category[] = [
  {
    id: 'mobile',
    label: 'Mobile',
    avatar: { kind: 'icon', bg: '#FBBF24', color: '#0B0F1A', icon: <SmartphoneRoundedIcon /> },
  },
  {
    id: 'water-purifier',
    label: 'Water Purifier',
    avatar: { kind: 'icon', bg: '#FED7AA', color: '#C2410C', icon: <PetsRoundedIcon /> },
  },
  {
    id: 'washing-machine',
    label: 'Washing Machine',
    avatar: { kind: 'letter', bg: '#4338CA', color: '#fff', letter: 'W' },
  },
  {
    id: 'refregrator',
    label: 'Refregrator',
    avatar: { kind: 'letter', bg: '#4338CA', color: '#fff', letter: 'R' },
  },
  {
    id: 'display',
    label: 'Display',
    avatar: { kind: 'pattern', gradient: 'linear-gradient(135deg, #E5E7EB 0%, #F3F4F6 50%, #D1D5DB 100%)' },
  },
  {
    id: 'laptop',
    label: 'Laptop',
    avatar: { kind: 'pattern', gradient: 'radial-gradient(circle at 30% 30%, #1E3A8A 0%, #0B0F1A 100%)' },
  },
];

function CategoryAvatar({ avatar }: { avatar: Category['avatar'] }) {
  if (avatar.kind === 'icon') {
    return (
      <Avatar sx={{ bgcolor: avatar.bg, color: avatar.color, width: 40, height: 40 }}>{avatar.icon}</Avatar>
    );
  }
  if (avatar.kind === 'letter') {
    return (
      <Avatar sx={{ bgcolor: avatar.bg, color: avatar.color, width: 40, height: 40, fontWeight: 800 }}>
        {avatar.letter}
      </Avatar>
    );
  }
  return <Avatar sx={{ width: 40, height: 40, background: avatar.gradient }}>{' '}</Avatar>;
}

function CategoryRow({ category, onClick }: { category: Category; onClick: () => void }) {
  return (
    <Stack
      direction="row"
      onClick={onClick}
      sx={{
        alignItems: 'center',
        gap: 1.5,
        px: 1.5,
        py: 1.25,
        borderRadius: 999,
        border: '1px solid #E5E7EB',
        bgcolor: '#fff',
        cursor: 'pointer',
        transition: 'transform .15s ease, box-shadow .2s ease',
        '&:hover': { boxShadow: '0 4px 12px rgba(11,15,26,0.08)' },
      }}
    >
      <CategoryAvatar avatar={category.avatar} />
      <Typography sx={{ flex: 1, fontSize: 14, fontWeight: 600, color: '#0B0F1A' }}>{category.label}</Typography>
      <ArrowForwardRoundedIcon sx={{ color: '#0B0F1A', fontSize: 22 }} />
    </Stack>
  );
}

export function ProductCategoryPage() {
  const navigate = useNavigate();

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
            Product Category
          </Typography>
        </Box>
      </Stack>

      <Box
        sx={{
          bgcolor: '#fff',
          borderRadius: 2,
          boxShadow: '0 1px 6px rgba(11,15,26,0.08)',
          p: 2.5,
        }}
      >
        <Typography sx={{ fontSize: 18, fontWeight: 800, color: '#0B0F1A', mb: 0.25 }}>
          Select Product Category
        </Typography>
        <Typography sx={{ fontSize: 12, color: '#6B7280', mb: 2 }}>
          Pick the category you want to browse
        </Typography>
        <Stack spacing={1.25}>
          {CATEGORIES.map(category => (
            <CategoryRow
              key={category.id}
              category={category}
              onClick={() => navigate(`/demo/kyp/opinion/${category.id}`)}
            />
          ))}
        </Stack>
      </Box>
    </Box>
  );
}

export default ProductCategoryPage;
