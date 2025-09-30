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
  leadsUltimos7Dias: object[]; // Array com 7 números, um para cada dia da semana
  leadsPorLetra: object[]; // Array com 10 números, um para cada letra (A-J)
  leadsPorNivel: object[]; // Array com 6 números, um para cada nível (I-VI)
}

export interface DiaSemana {
  dia: string; // Nome do dia da semana (ex: "Segunda-feira")
  qtd: number; // Quantidade de leads nesse dia
}

export interface LeadsPorLetra {
  letra: string; // Letra (A-J)
  qtd: number; // Quantidade de leads com essa letra
}

export interface LeadsPorNivel {
  nivel: string; // Nível (I-VI)
  qtd: number; // Quantidade de leads com esse nível
}

export interface LeadFilters {
  status?: string;
  source?: string;
  dateFrom?: string;
  dateTo?: string;
  search?: string;
}

// Tipos para a API
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message: string;
}

export interface TotalLeadsStats {
  total: number;
}

export interface NewLeadsStats {
  newLeads: number;
}

export interface PaginationInfo {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface LeadsResponse {
  success: boolean;
  data: Lead[];
  pagination: PaginationInfo;
  message?: string;
}