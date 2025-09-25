import api from './api';
import type { Lead, LeadCreateRequest, LeadUpdateRequest, LeadFilters, DashboardStats } from '../types/lead';

export class LeadService {
  // Buscar todos os leads com filtros opcionais
  static async getLeads(filters?: LeadFilters): Promise<Lead[]> {
    const params = new URLSearchParams();
    
    if (filters?.status) params.append('status', filters.status);
    if (filters?.source) params.append('source', filters.source);
    if (filters?.dateFrom) params.append('dateFrom', filters.dateFrom);
    if (filters?.dateTo) params.append('dateTo', filters.dateTo);
    if (filters?.search) params.append('search', filters.search);

    const response = await api.get(`/leads?${params.toString()}`);
    return response.data;
  }

  // Buscar lead por ID
  static async getLeadById(id: string): Promise<Lead> {
    const response = await api.get(`/leads/${id}`);
    return response.data;
  }

  // Criar novo lead
  static async createLead(leadData: LeadCreateRequest): Promise<Lead> {
    const response = await api.post('/leads', leadData);
    return response.data;
  }

  // Atualizar lead
  static async updateLead(id: string, leadData: LeadUpdateRequest): Promise<Lead> {
    const response = await api.put(`/leads/${id}`, leadData);
    return response.data;
  }

  // Deletar lead
  static async deleteLead(id: string): Promise<void> {
    await api.delete(`/leads/${id}`);
  }

  // Buscar estatísticas do dashboard
  static async getDashboardStats(): Promise<DashboardStats> {
    const response = await api.get('/leads/stats');
    return response.data;
  }
}

export default LeadService;