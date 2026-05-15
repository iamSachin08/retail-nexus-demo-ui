import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react';
import type { Lead, LeadStatus } from '../mock/data/leadManagement';
import { initialLeads } from '../mock/data/leadManagement';

interface LeadsContextValue {
  leads: Lead[];
  addLead: (lead: Lead) => void;
  updateLeadStatus: (leadId: string, status: LeadStatus) => void;
  getLead: (leadId: string) => Lead | undefined;
}

const LeadsContext = createContext<LeadsContextValue | null>(null);

export function LeadsProvider({ children }: { children: ReactNode }) {
  const [leads, setLeads] = useState<Lead[]>(initialLeads);

  const addLead = useCallback((lead: Lead) => {
    setLeads(prev => [lead, ...prev]);
  }, []);

  const updateLeadStatus = useCallback((leadId: string, status: LeadStatus) => {
    setLeads(prev => prev.map(l => (l.leadId === leadId ? { ...l, leadStatus: status } : l)));
  }, []);

  const getLead = useCallback(
    (leadId: string) => leads.find(l => l.leadId === leadId),
    [leads],
  );

  const value = useMemo(
    () => ({ leads, addLead, updateLeadStatus, getLead }),
    [leads, addLead, updateLeadStatus, getLead],
  );

  return <LeadsContext.Provider value={value}>{children}</LeadsContext.Provider>;
}

export function useLeads(): LeadsContextValue {
  const ctx = useContext(LeadsContext);
  if (!ctx) throw new Error('useLeads must be used within LeadsProvider');
  return ctx;
}
