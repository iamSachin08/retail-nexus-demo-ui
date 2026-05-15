import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { createDemoTheme, type ThemeMode } from '../theme';

interface DemoThemeContextValue {
  mode: ThemeMode;
  toggle: () => void;
}

const DemoThemeContext = createContext<DemoThemeContextValue | null>(null);

export function DemoThemeProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<ThemeMode>('light');
  const theme = useMemo(() => createDemoTheme(mode), [mode]);
  const value = useMemo(
    () => ({ mode, toggle: () => setMode(m => (m === 'dark' ? 'light' : 'dark')) }),
    [mode],
  );
  return (
    <DemoThemeContext.Provider value={value}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </DemoThemeContext.Provider>
  );
}

export function useDemoTheme(): DemoThemeContextValue {
  const ctx = useContext(DemoThemeContext);
  if (!ctx) throw new Error('useDemoTheme must be used inside DemoThemeProvider');
  return ctx;
}
