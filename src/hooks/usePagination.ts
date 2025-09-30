import { useState, useEffect, useCallback } from 'react';
import { LeadService } from '../services/leadService';
import type { Lead, LeadsResponse, PaginationInfo } from '../types/lead';

interface UseLeadsPaginatedResult {
  leads: Lead[];
  pagination: PaginationInfo;
  loading: boolean;
  error: string | null;
  goToPage: (page: number) => void;
  goToNextPage: () => void;
  goToPreviousPage: () => void;
  refetch: () => void;
}

export const useLeadsPaginated = (initialPage: number = 1, limit: number = 10): UseLeadsPaginatedResult => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [pagination, setPagination] = useState<PaginationInfo>({
    page: initialPage,
    limit,
    total: 0,
    totalPages: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchLeads = useCallback(async (page: number) => {
    try {
      setLoading(true);
      setError(null);
      
      const response: LeadsResponse = await LeadService.getLeadsPaginated(page, limit);
      
      if (response.success) {
        setLeads(response.data);
        setPagination(response.pagination);
      } else {
        setError('Erro ao carregar leads');
        setLeads([]);
        setPagination({
          page: 1,
          limit,
          total: 0,
          totalPages: 0
        });
      }
    } catch (err) {
      setError('Erro ao carregar leads');
      setLeads([]);
      console.error('Erro no hook useLeadsPaginated:', err);
    } finally {
      setLoading(false);
    }
  }, [limit]);

  const goToPage = (page: number) => {
    if (page >= 1 && page <= pagination.totalPages) {
      fetchLeads(page);
    }
  };

  const goToNextPage = () => {
    if (pagination.page < pagination.totalPages) {
      goToPage(pagination.page + 1);
    }
  };

  const goToPreviousPage = () => {
    if (pagination.page > 1) {
      goToPage(pagination.page - 1);
    }
  };

  const refetch = () => {
    fetchLeads(pagination.page);
  };

  useEffect(() => {
    fetchLeads(initialPage);
  }, [initialPage, limit, fetchLeads]);

  return {
    leads,
    pagination,
    loading,
    error,
    goToPage,
    goToNextPage,
    goToPreviousPage,
    refetch
  };
};