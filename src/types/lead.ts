// Tipos para o sistema de leads
export interface Lead {
  id: number;
  adtsAtual: number;
  anoIngresso: number;
  email: string;
  letraAtual: string;
  nivel: string;
  nomeCompleto: string;
  possuiProcessos: boolean;
  whatsapp: string;
  conditions: boolean;
  newsletter: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ProfessorCreateRequest {
  nomeCompleto: string;
  email: string;
  whatsapp: string;
  letraAtual: string;
  nivel: string;
  anoIngresso: number;
  adtsAtual: number;
  possuiProcessos: boolean;
  conditions: boolean;
  newsletter: boolean;
}

export interface ProfessorUpdateRequest extends Partial<ProfessorCreateRequest> {
  id: number;
}

export interface ProfessorFilters {
  letraAtual?: string;
  nivel?: string;
  possuiProcessos?: boolean;
  anoIngressoMin?: number;
  anoIngressoMax?: number;
  search?: string;
}

export interface DashboardStats {
  totalLeads: number;
  newLeads: number;
  convertedLeads: number;
  totalValue: number;
  conversionRate: number;
  leadsUltimos7Dias: number[]; // Array com 7 números, um para cada dia da semana
  leadsPorProfessor: number[]; // Array com 10 números, um para cada professor (A-J)
  leadsPorNivel: number[]; // Array com 6 números, um para cada nível (I-VI)
}