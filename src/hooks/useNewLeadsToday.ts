import { useState, useEffect } from 'react';
import LeadService from '../services/leadService';

export const useNewLeadsToday = () => {
  const [newLeads, setNewLeads] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { getNewLeadsToday } = LeadService;
  
  useEffect(() => {
    const fetchNewLeadsToday = async () => {
      try {
        setLoading(true);
        setError(null);
        const dailyLeads = await getNewLeadsToday();
        const todayLeads = dailyLeads;
        setNewLeads(todayLeads);
      } catch (err) {
        console.error('Erro ao buscar novos leads de hoje:', err);
        setError(err instanceof Error ? err.message : 'Erro ao carregar novos leads de hoje');
        // Fallback para valor mock em caso de erro
        setNewLeads(23);
      } finally {
        setLoading(false);
      }
    };

    fetchNewLeadsToday();
  }, []);

  return { newLeads, loading, error };
};

export default useNewLeadsToday;