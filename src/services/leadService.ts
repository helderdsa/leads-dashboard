import api from './api';
import type { Lead, ProfessorCreateRequest as LeadCreateRequest, ProfessorUpdateRequest as LeadUpdateRequest, LeadFilters, DashboardStats } from '../types/lead';

export class LeadService {
  // Buscar todos os leads com filtros opcionais
  static async getLeads(filters?: LeadFilters): Promise<Lead[]> {
    const params = new URLSearchParams();
    
    if (filters?.status) params.append('status', filters.status);
    if (filters?.source) params.append('source', filters.source);
    if (filters?.dateFrom) params.append('dateFrom', filters.dateFrom);
    if (filters?.dateTo) params.append('dateTo', filters.dateTo);
    if (filters?.search) params.append('search', filters.search);

    const response = await api.get(`/customers?${params.toString()}`);
    return response.data.data || response.data;
  }

  // Buscar lead por ID
  static async getLeadById(id: string): Promise<Lead> {
    const response = await api.get(`/customers/${id}`);
    return response.data;
  }

  // Criar novo lead
  static async createLead(leadData: LeadCreateRequest): Promise<Lead> {
    const response = await api.post('/customers', leadData);
    return response.data;
  }

  // Atualizar lead
  static async updateLead(id: string, leadData: LeadUpdateRequest): Promise<Lead> {
    const response = await api.put(`/customers/${id}`, leadData);
    return response.data;
  }

  // Deletar lead
  static async deleteLead(id: string): Promise<void> {
    await api.delete(`/customers/${id}`);
  }

  static async getTotalLeads(): Promise<number> {
    try {
      const response = await api.get('/customers/stats/total');
      return response.data.data.total;
    } catch (error) {
      console.error('Erro ao buscar total de leads:', error);
      throw error;
    }
  }
  
  // GET /api/customers/stats/today - Buscar novos leads de hoje
  static async getNewLeadsToday(): Promise<number> {
    try {
      const response = await api.get('/customers/stats/daily');
      return response.data.data[6].qtd;
    } catch (error) {
      console.error('Erro ao buscar novos leads de hoje:', error);
      throw error;
    }
  }

  // GET /api/customers/stats/daily - Buscar leads diários (últimos 7 dias)
  static async getDailyLeads(): Promise<object[]> {
    try {
      const response = await api.get('/customers/stats/daily');
      return response.data.data;
    } catch (error) {
      console.error('Erro ao buscar leads diários:', error);
      throw error;
    }
  }

  static async getCustomerByLetter(): Promise<object[]> {
    try {
      const response = await api.get('/customers/stats/letters');
      return response.data.data;
    } catch (error) {
      console.error('Erro ao buscar leads por letra:', error);
      throw error;
    }
  }

  static async getCustomerByLevel(): Promise<object[]> {
    try {
      const response = await api.get('/customers/stats/levels');
      return response.data.data;
    } catch (error) {
      console.error('Erro ao buscar leads por nível:', error);
      throw error;
    }
  }

  // Buscar estatísticas do dashboard
  static async getDashboardStats(): Promise<DashboardStats> {
    try {
      const response = {
        totalLeads: await this.getTotalLeads(),
        newLeads: await this.getNewLeadsToday(),
        leadsUltimos7Dias: await this.getDailyLeads(),
        leadsPorLetra: await this.getCustomerByLetter(),
        leadsPorNivel: await this.getCustomerByLevel()
      };

      return response;
    } catch (error) {
      console.error('Erro ao buscar estatísticas do dashboard:', error);
      throw error;
      }
    }
}


export default LeadService;