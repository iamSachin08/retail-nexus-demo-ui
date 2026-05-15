import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import type { TileLayoutItem, TileSize } from '../types/module';
import { defaultHomeLayout } from '../modules/registry';

const STORAGE_KEY = 'demo-ui:home-layout-v3';

interface EditModeContextValue {
  editing: boolean;
  toggleEditing: () => void;
  layout: TileLayoutItem[];
  setLayout: (next: TileLayoutItem[]) => void;
  setTileSize: (moduleId: string, size: TileSize) => void;
  reorderLayout: (orderedIds: string[]) => void;
  resetLayout: () => void;
}

const EditModeContext = createContext<EditModeContextValue | null>(null);

function loadLayout(): TileLayoutItem[] {
  if (typeof window === 'undefined') return defaultHomeLayout;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultHomeLayout;
    const parsed = JSON.parse(raw) as TileLayoutItem[];
    if (!Array.isArray(parsed)) return defaultHomeLayout;
    return parsed;
  } catch {
    return defaultHomeLayout;
  }
}

export function EditModeProvider({ children }: { children: ReactNode }) {
  const [editing, setEditing] = useState(false);
  const [layout, setLayout] = useState<TileLayoutItem[]>(() => loadLayout());

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(layout));
    } catch {
      /* ignore */
    }
  }, [layout]);

  const setTileSize = useCallback((moduleId: string, size: TileSize) => {
    setLayout(prev => prev.map(item => (item.moduleId === moduleId ? { ...item, size } : item)));
  }, []);

  const reorderLayout = useCallback((orderedIds: string[]) => {
    setLayout(prev => {
      const byId = new Map(prev.map(item => [item.moduleId, item]));
      const next = orderedIds.map(id => byId.get(id)).filter(Boolean) as TileLayoutItem[];
      // Append anything missing (defensive — keep all tiles even if reorder list is partial).
      for (const item of prev) {
        if (!orderedIds.includes(item.moduleId)) next.push(item);
      }
      return next;
    });
  }, []);

  const toggleEditing = useCallback(() => setEditing(e => !e), []);
  const resetLayout = useCallback(() => {
    // Defensively clear storage too, so a corrupt entry can never trap the user.
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch {
      /* ignore */
    }
    setLayout(defaultHomeLayout);
  }, []);

  const value = useMemo(
    () => ({ editing, toggleEditing, layout, setLayout, setTileSize, reorderLayout, resetLayout }),
    [editing, toggleEditing, layout, setTileSize, reorderLayout, resetLayout],
  );

  return <EditModeContext.Provider value={value}>{children}</EditModeContext.Provider>;
}

export function useEditMode(): EditModeContextValue {
  const ctx = useContext(EditModeContext);
  if (!ctx) throw new Error('useEditMode must be used inside EditModeProvider');
  return ctx;
}
