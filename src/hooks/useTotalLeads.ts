import { useState, useEffect } from 'react';
import LeadService from '../services/leadService';

export const useTotalLeads = () => {
  const [totalLeads, setTotalLeads] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { getTotalLeads } = LeadService;

  useEffect(() => {
    const fetchTotalLeads = async () => {
      try {
        setLoading(true);
        setError(null);
        const total = await getTotalLeads();
        setTotalLeads(total);
      } catch (err) {
        console.error('Erro ao buscar total de leads:', err);
        setError(err instanceof Error ? err.message : 'Erro ao carregar total de leads');
        // Fallback para valor mock em caso de erro
        setTotalLeads(142);
      } finally {
        setLoading(false);
      }
    };

    fetchTotalLeads();
  }, []);

  return { totalLeads, loading, error };
};

export default useTotalLeads;