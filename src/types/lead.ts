// Tipos para o sistema de leads
export interface Lead {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  status: LeadStatus;
  source: string;
  value?: number;
  createdAt: string;
  updatedAt: string;
}

export const LeadStatus = {
  NEW: 'new',
  CONTACTED: 'contacted',
  QUALIFIED: 'qualified',
  PROPOSAL: 'proposal',
  WON: 'won',
  LOST: 'lost'
} as const;

export type LeadStatus = typeof LeadStatus[keyof typeof LeadStatus];

export interface LeadCreateRequest {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  source: string;
  value?: number;
}

export interface LeadUpdateRequest extends Partial<LeadCreateRequest> {
  status?: LeadStatus;
}

export interface LeadFilters {
  status?: LeadStatus;
  source?: string;
  dateFrom?: string;
  dateTo?: string;
  search?: string;
}

export interface DashboardStats {
  totalLeads: number;
  newLeads: number;
  convertedLeads: number;
  totalValue: number;
  conversionRate: number;
}