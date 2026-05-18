import type { ReactNode } from 'react';
import { useAuth } from '../context/AuthContext';
import { LoginPage } from './LoginPage';

/** Gates the demo app — shows LoginPage when no user, otherwise children. */
export function AuthGate({ children }: { children: ReactNode }) {
  const { isAuthed } = useAuth();
  if (!isAuthed) return <LoginPage />;
  return <>{children}</>;
}
