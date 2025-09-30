// import axios from 'axios';
// import type { ApiResponse, TotalLeadsStats, NewLeadsStats } from '../types/lead';

// const api = axios.create({
//   baseURL: import.meta.env.VITE_API_BASE_URL,
//   headers: {  
//     'Content-Type': 'application/json',
//   },
// });

// // Serviço específico para a rota de total de leads
// export const getTotalLeads = async (): Promise<number> => {
//   try {
//     const response = await api.get<ApiResponse<TotalLeadsStats>>('/api/customers/stats/total');
//     return response.data.data.total;
//   } catch (error) {
//     console.error('Erro ao buscar total de leads:', error);
//     throw error;
//   }
// };

// // GET /api/customers/stats/today - Buscar novos leads de hoje
// export const getNewLeadsToday = async (): Promise<number> => {
//   try {
//     const response = await api.get<ApiResponse<NewLeadsStats>>('/api/customers/stats/daily');
//     return response.data.data.newLeads;
//   } catch (error) {
//     console.error('Erro ao buscar novos leads de hoje:', error);
//     throw error;
//   }
// };

// export default { getTotalLeads, getNewLeadsToday };