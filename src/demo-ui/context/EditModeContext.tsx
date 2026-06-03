import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import type { TileLayoutItem, TileSize } from '../types/module';
import { defaultHomeLayout } from '../modules/registry';

const STORAGE_KEY = 'demo-ui:home-layout-v5';

interface EditModeContextValue {
  editing: boolean;
  toggleEditing: () => void;
  layout: TileLayoutItem[];
  setLayout: (next: TileLayoutItem[]) => void;
  addWidget: (moduleId: string, size: 'medium' | 'large') => void;
  removeWidget: (instanceId: string) => void;
  reorderLayout: (orderedIds: string[]) => void;
  resetLayout: () => void;
}

const EditModeContext = createContext<EditModeContextValue | null>(null);

/** Restore stored layout, repairing missing instanceId/pinned/widget shape from older versions. */
function normalize(items: unknown): TileLayoutItem[] | null {
  if (!Array.isArray(items)) return null;
  const out: TileLayoutItem[] = [];
  for (const raw of items) {
    if (!raw || typeof raw !== 'object') continue;
    const moduleId = (raw as { moduleId?: unknown }).moduleId;
    const size = (raw as { size?: unknown }).size;
    if (typeof moduleId !== 'string' || (size !== 'small' && size !== 'medium' && size !== 'large')) continue;
    const pinned = (raw as { pinned?: unknown }).pinned !== false; // default to pinned
    const instanceId =
      typeof (raw as { instanceId?: unknown }).instanceId === 'string'
        ? (raw as { instanceId: string }).instanceId
        : pinned
          ? moduleId
          : `w-${moduleId}`;
    out.push({ instanceId, moduleId, size: pinned ? 'small' : size, pinned });
  }
  return out.length ? out : null;
}

function loadLayout(): TileLayoutItem[] {
  if (typeof window === 'undefined') return defaultHomeLayout;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultHomeLayout;
    const parsed = normalize(JSON.parse(raw));
    return parsed ?? defaultHomeLayout;
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

  const addWidget = useCallback((moduleId: string, size: 'medium' | 'large') => {
    setLayout(prev => {
      const instanceId = `w-${moduleId}`;
      const existingIdx = prev.findIndex(item => item.instanceId === instanceId);
      if (existingIdx >= 0) {
        // Already added — move it to the top and apply the new size.
        const updated = { ...prev[existingIdx], size };
        return [updated, ...prev.filter((_, i) => i !== existingIdx)];
      }
      // New widgets appear at the top of the home screen (iPhone-style — widgets above icons).
      return [{ instanceId, moduleId, size, pinned: false }, ...prev];
    });
  }, []);

  const removeWidget = useCallback((instanceId: string) => {
    setLayout(prev => prev.filter(item => item.pinned || item.instanceId !== instanceId));
  }, []);

  const reorderLayout = useCallback((orderedIds: string[]) => {
    setLayout(prev => {
      const byId = new Map(prev.map(item => [item.instanceId, item]));
      const next = orderedIds.map(id => byId.get(id)).filter(Boolean) as TileLayoutItem[];
      // Append anything missing (defensive — keep all tiles even if reorder list is partial).
      for (const item of prev) {
        if (!orderedIds.includes(item.instanceId)) next.push(item);
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
    () => ({ editing, toggleEditing, layout, setLayout, addWidget, removeWidget, reorderLayout, resetLayout }),
    [editing, toggleEditing, layout, addWidget, removeWidget, reorderLayout, resetLayout],
  );

  return <EditModeContext.Provider value={value}>{children}</EditModeContext.Provider>;
}

export function useEditMode(): EditModeContextValue {
  const ctx = useContext(EditModeContext);
  if (!ctx) throw new Error('useEditMode must be used inside EditModeProvider');
  return ctx;
}
