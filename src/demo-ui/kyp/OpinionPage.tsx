import { useState } from 'react';
import { Box, Button, IconButton, Radio, Stack, Typography } from '@mui/material';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import { useNavigate } from 'react-router-dom';

type OpinionQuestion = {
  id: string;
  prompt: string;
  options: { id: string; label: string }[];
};

/* Hardcoded — mirrors the placeholder data shown in the mock. */
const QUESTIONS: OpinionQuestion[] = [
  {
    id: 'q1',
    prompt: 'enter your budget range',
    options: [
      { id: 'a', label: 'less than ₹50000' },
      { id: 'b', label: '₹50000 - ₹100000' },
      { id: 'c', label: '₹100000 - ₹200000' },
      { id: 'd', label: 'more than ₹200000' },
    ],
  },
  {
    id: 'q2',
    prompt: 'enter your preferred brand',
    options: [
      { id: 'a', label: 'Brand A' },
      { id: 'b', label: 'Brand B' },
      { id: 'c', label: 'Brand C' },
      { id: 'd', label: 'Brand D' },
    ],
  }
];

function OptionRow({
  label,
  selected,
  onSelect,
}: {
  label: string;
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <Stack
      direction="row"
      onClick={onSelect}
      sx={{
        alignItems: 'center',
        gap: 1,
        px: 1.5,
        py: 0.75,
        borderRadius: 1.5,
        border: '1px solid #D1D5DB',
        bgcolor: '#fff',
        cursor: 'pointer',
        transition: 'border-color .15s ease, background .15s ease',
        '&:hover': { borderColor: '#9CA3AF' },
      }}
    >
      <Radio
        checked={selected}
        size="small"
        sx={{ p: 0.5, color: '#9CA3AF', '&.Mui-checked': { color: '#2563EB' } }}
      />
      <Typography sx={{ fontSize: 16, color: '#2563EB' }}>{label}</Typography>
    </Stack>
  );
}

export function OpinionPage() {
  const navigate = useNavigate();
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const setAnswer = (questionId: string, optionId: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: optionId }));
  };

  const handleReset = () => setAnswers({});

  const allAnswered = QUESTIONS.every(q => answers[q.id] !== undefined);

  const handleSubmit = () => {
    if (!allAnswered) return;
    navigate('/demo/kyp/product/recommended');
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
            Give Your Opinion
          </Typography>
        </Box>
      </Stack>

      <Stack spacing={2}>
        {QUESTIONS.map((q, idx) => (
          <Box
            key={q.id}
            sx={{
              bgcolor: '#fff',
              borderRadius: 2,
              boxShadow: '0 1px 6px rgba(11,15,26,0.08)',
              p: 2.5,
            }}
          >
            <Typography sx={{ fontSize: 18, fontWeight: 700, color: '#0B0F1A', mb: 1.75 }}>
              {idx + 1}. {q.prompt}
            </Typography>
            <Stack spacing={1.25}>
              {q.options.map(opt => (
                <OptionRow
                  key={opt.id}
                  label={opt.label}
                  selected={answers[q.id] === opt.id}
                  onSelect={() => setAnswer(q.id, opt.id)}
                />
              ))}
            </Stack>
          </Box>
        ))}
      </Stack>

      <Stack direction="row" spacing={2} sx={{ mt: 2.5 }}>
        <Button
          fullWidth
          onClick={handleReset}
          variant="outlined"
          sx={{
            bgcolor: '#fff',
            color: '#9CA3AF',
            fontWeight: 600,
            fontSize: 15,
            py: 1.5,
            borderRadius: 1.5,
            borderColor: '#E5E7EB',
            textTransform: 'none',
            '&:hover': { borderColor: '#9CA3AF', bgcolor: '#fff' },
          }}
        >
          Reset All
        </Button>
        <Button
          fullWidth
          onClick={handleSubmit}
          disabled={!allAnswered}
          variant="contained"
          sx={{
            bgcolor: '#4C4DDC',
            color: '#fff',
            fontWeight: 600,
            fontSize: 15,
            py: 1.5,
            borderRadius: 1.5,
            textTransform: 'none',
            boxShadow: '0 6px 14px rgba(76,77,220,0.35)',
            '&:hover': { bgcolor: '#3F40C2' },
            '&.Mui-disabled': { bgcolor: '#CDCEEC', color: '#9CA3AF', boxShadow: 'none' },
          }}
        >
          Submit All
        </Button>
      </Stack>
    </Box>
  );
}

export default OpinionPage;
