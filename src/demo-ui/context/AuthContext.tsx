import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';

/* Mock auth — purely client-side. Persists the signed-in user in
 * localStorage so reloads stay logged in until explicit sign out. */

export interface DemoUser {
  id: string;
  name: string;
  role: string;
  email: string;
  /** Single-character avatar fallback when no image is provided. */
  initial: string;
  storeName: string;
}

interface AuthContextValue {
  user: DemoUser | null;
  isAuthed: boolean;
  signIn: (name: string, password: string) => Promise<{ ok: true } | { ok: false; error: string }>;
  signOut: () => void;
}

const STORAGE_KEY = 'shopos.demoAuth.v1';

const AuthContext = createContext<AuthContextValue | null>(null);

function profileFromName(name: string): DemoUser {
  const trimmed = name.trim();
  const slug = trimmed
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '.')
    .replace(/^\.+|\.+$/g, '');
  return {
    id: slug || 'user',
    name: trimmed,
    role: 'Owner',
    email: `${slug || 'user'}@storeone.app`,
    initial: trimmed.charAt(0).toUpperCase() || 'U',
    storeName: 'Whitefield Electronics',
  };
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<DemoUser | null>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? (JSON.parse(raw) as DemoUser) : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    try {
      if (user) localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
      else localStorage.removeItem(STORAGE_KEY);
    } catch {
      /* storage can fail silently — auth still works in memory */
    }
  }, [user]);

  const signIn = useCallback(async (name: string, password: string) => {
    if (!name.trim()) return { ok: false as const, error: 'Please enter your name.' };
    if (!password.trim()) return { ok: false as const, error: 'Please enter a password.' };
    setUser(profileFromName(name));
    return { ok: true as const };
  }, []);

  const signOut = useCallback(() => setUser(null), []);

  const value = useMemo<AuthContextValue>(
    () => ({ user, isAuthed: !!user, signIn, signOut }),
    [user, signIn, signOut],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
}
