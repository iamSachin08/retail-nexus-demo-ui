import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';

/* iPhone-style bottom dock: Home is always slot 1, the user picks up to
 * 3 module IDs to fill slots 2-4. Persisted in localStorage. */

const STORAGE_KEY = 'shopos.demoDock.v1';
export const MAX_DOCK_ITEMS = 3;

const DEFAULT_DOCK: string[] = ['sales-orders', 'lead', 'task-management'];

interface DockContextValue {
  dockIds: string[];
  setDockIds: (ids: string[]) => void;
  toggle: (id: string) => void;
  reset: () => void;
}

const DockContext = createContext<DockContextValue | null>(null);

export function DockProvider({ children }: { children: ReactNode }) {
  const [dockIds, setDockIdsState] = useState<string[]>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) return parsed.slice(0, MAX_DOCK_ITEMS);
      }
    } catch {
      /* fall through */
    }
    return DEFAULT_DOCK;
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(dockIds));
    } catch {
      /* ignore */
    }
  }, [dockIds]);

  const setDockIds = useCallback((ids: string[]) => {
    setDockIdsState(ids.slice(0, MAX_DOCK_ITEMS));
  }, []);

  const toggle = useCallback((id: string) => {
    setDockIdsState(prev => {
      if (prev.includes(id)) return prev.filter(x => x !== id);
      if (prev.length >= MAX_DOCK_ITEMS) return prev;
      return [...prev, id];
    });
  }, []);

  const reset = useCallback(() => setDockIdsState(DEFAULT_DOCK), []);

  const value = useMemo<DockContextValue>(
    () => ({ dockIds, setDockIds, toggle, reset }),
    [dockIds, setDockIds, toggle, reset],
  );

  return <DockContext.Provider value={value}>{children}</DockContext.Provider>;
}

export function useDock(): DockContextValue {
  const ctx = useContext(DockContext);
  if (!ctx) throw new Error('useDock must be used inside DockProvider');
  return ctx;
}
