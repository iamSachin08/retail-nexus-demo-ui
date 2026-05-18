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
  /**
   * ShopOS design palette — used by the demo Home + Tasks surfaces.
   * Lifted directly from the reference design in /Downloads/ShopOS so the
   * cards render identically to the static mockups. Dark values are the
   * source of truth — call `shopPalette(theme)` for theme-aware values.
   */
  shop: {
    bg: '#0A0A0B',
    card: '#161618',
    card2: '#1E1E21',
    card3: '#26262A',
    hairline: 'rgba(255,255,255,0.06)',
    fg: '#FFFFFF',
    fgMuted: '#8B8B92',
    fgDim: '#5A5A62',
    green: '#4FCB7C',
    greenDim: '#2E7D4A',
    red: '#F2533C',
    redSoft: '#EC5F4A',
    amber: '#F4A93E',
    tilePink: '#EE5187',
    tilePurple: '#A77BEB',
    tileBlue: '#6A78E6',
    tileAmber: '#F2A847',
    tileGreen: '#2E7D4A',
    tileOrangeIcon: '#E8743F',
    tileBlueIcon: '#2F6FED',
    tileTaskBlue: '#3A57E3',
    mono: '"Geist Mono", "JetBrains Mono", ui-monospace, Menlo, monospace',
  },
} as const;

/**
 * Theme-aware ShopOS surface palette. The accent colors (green / amber /
 * red / category tiles) stay the same in both themes — only the background
 * stack, foreground text and hairline borders flip.
 */
export function shopPalette(mode: 'light' | 'dark') {
  const isDark = mode === 'dark';
  return {
    bg: isDark ? '#0A0A0B' : '#F4F6FC',
    card: isDark ? '#161618' : '#FFFFFF',
    card2: isDark ? '#1E1E21' : '#F0F2F8',
    card3: isDark ? '#26262A' : '#E6E8F0',
    hairline: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(11,15,26,0.08)',
    fg: isDark ? '#FFFFFF' : '#0B0F1A',
    fgMuted: isDark ? '#8B8B92' : '#5A6075',
    fgDim: isDark ? '#5A5A62' : '#A0A6B7',
    // Soft tile chip backgrounds for the donut/zone/overdue list
    tileSoft: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(11,15,26,0.05)',
    softOverdueBg: isDark ? 'rgba(242,83,60,0.18)' : 'rgba(242,83,60,0.12)',
    overdueText: isDark ? '#FF7A66' : '#C13E26',
    chipNeutralBg: isDark ? 'rgba(255,255,255,0.04)' : 'rgba(11,15,26,0.04)',
    chipBorder: isDark ? '1px solid rgba(255,255,255,0.14)' : '1px solid rgba(11,15,26,0.12)',
    chipActiveBg: isDark ? '#fff' : '#0B0F1A',
    chipActiveFg: isDark ? '#000' : '#FFFFFF',
    chipInactiveFg: isDark ? '#cfcfd2' : '#0B0F1A',
    primaryInverse: isDark ? '#fff' : '#0B0F1A',
    primaryInverseFg: isDark ? '#000' : '#FFFFFF',
    addBg: isDark ? '#fff' : '#0B0F1A',
    addFg: isDark ? '#000' : '#FFFFFF',
    inputPlaceholder: isDark ? 'rgba(255,255,255,0.4)' : 'rgba(11,15,26,0.4)',
    inputFg: isDark ? '#fff' : '#0B0F1A',
    green: '#4FCB7C',
    greenDim: '#2E7D4A',
    red: '#F2533C',
    redSoft: isDark ? '#EC5F4A' : '#C13E26',
    amber: '#F4A93E',
    tilePink: '#EE5187',
    tilePurple: '#A77BEB',
    tileBlue: '#6A78E6',
    tileAmber: '#F2A847',
    tileGreen: '#2E7D4A',
    tileOrangeIcon: '#E8743F',
    tileBlueIcon: '#2F6FED',
    tileTaskBlue: '#3A57E3',
    mono: tokens.shop.mono,
  } as const;
}

export type ShopPalette = ReturnType<typeof shopPalette>;

export type DemoTokens = typeof tokens;
