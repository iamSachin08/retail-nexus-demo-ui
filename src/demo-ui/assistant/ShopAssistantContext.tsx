import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react';

interface OpenOptions {
  prompt?: string;
  /** If true, the prompt is sent immediately as if the user pressed enter. */
  autoSend?: boolean;
}

interface PendingPrompt {
  text: string;
  autoSend: boolean;
}

interface ShopAssistantContextValue {
  open: boolean;
  openAssistant: (opts?: OpenOptions | string) => void;
  closeAssistant: () => void;
  consumePrompt: () => PendingPrompt | null;
}

const Ctx = createContext<ShopAssistantContextValue | null>(null);

export function ShopAssistantProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [pendingPrompt, setPendingPrompt] = useState<PendingPrompt | null>(null);

  const openAssistant = useCallback((opts?: OpenOptions | string) => {
    const o: OpenOptions = typeof opts === 'string' ? { prompt: opts } : opts ?? {};
    if (o.prompt) setPendingPrompt({ text: o.prompt, autoSend: Boolean(o.autoSend) });
    setOpen(true);
  }, []);

  const closeAssistant = useCallback(() => setOpen(false), []);

  const consumePrompt = useCallback(() => {
    const p = pendingPrompt;
    setPendingPrompt(null);
    return p;
  }, [pendingPrompt]);

  const value = useMemo(
    () => ({ open, openAssistant, closeAssistant, consumePrompt }),
    [open, openAssistant, closeAssistant, consumePrompt],
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useShopAssistant(): ShopAssistantContextValue {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('useShopAssistant must be used within ShopAssistantProvider');
  return ctx;
}
