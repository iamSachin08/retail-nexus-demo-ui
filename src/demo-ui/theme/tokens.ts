export const tokens = {
  radius: {
    sm: 10,
    md: 16,
    lg: 22,
    xl: 28,
    pill: 999,
  },
  spacing: {
    tile: 12,
    section: 20,
    page: 16,
  },
  gradient: {
    aiAurora: 'linear-gradient(135deg, #7C5CFF 0%, #4E8CFF 50%, #36D1DC 100%)',
    aiAuroraSoft: 'linear-gradient(135deg, rgba(124,92,255,0.22) 0%, rgba(78,140,255,0.18) 50%, rgba(54,209,220,0.18) 100%)',
    sales: 'linear-gradient(135deg, #16D9A4 0%, #0EA47A 100%)',
    leads: 'linear-gradient(135deg, #FF8A4C 0%, #FF5470 100%)',
    inventory: 'linear-gradient(135deg, #4E8CFF 0%, #2F6DF2 100%)',
    tasks: 'linear-gradient(135deg, #B47CFF 0%, #7C5CFF 100%)',
    sop: 'linear-gradient(135deg, #FFD166 0%, #F2994A 100%)',
    whatsapp: 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)',
    risk: 'linear-gradient(135deg, #FF5470 0%, #C9184A 100%)',
    surfaceDark: 'linear-gradient(180deg, #0B0F1A 0%, #0A0D16 100%)',
    surfaceLight: 'linear-gradient(180deg, #F6F7FB 0%, #EEF1F8 100%)',
  },
  shadow: {
    soft: '0 6px 24px rgba(10,12,24,0.06), 0 2px 6px rgba(10,12,24,0.04)',
    glow: '0 12px 40px rgba(124,92,255,0.18)',
    floating: '0 24px 60px rgba(0,0,0,0.18)',
  },
  blur: {
    glass: 'blur(22px) saturate(180%)',
  },
} as const;

export type DemoTokens = typeof tokens;
