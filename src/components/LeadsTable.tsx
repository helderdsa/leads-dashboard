import React from 'react';
import type { Lead, LeadStatus } from '../types/lead';

const getStatusColor = (status: LeadStatus): string => {
  const colors = {
    new: 'bg-blue-900/50 text-blue-300 border border-blue-700',
    contacted: 'bg-yellow-900/50 text-yellow-300 border border-yellow-700',
    qualified: 'bg-purple-900/50 text-purple-300 border border-purple-700',
    proposal: 'bg-orange-900/50 text-orange-300 border border-orange-700',
    won: 'bg-green-900/50 text-green-300 border border-green-700',
    lost: 'bg-red-900/50 text-red-300 border border-red-700',
  };
  return colors[status] || 'bg-slate-800 text-slate-300 border border-slate-600';
};

const getStatusText = (status: LeadStatus): string => {
  const texts = {
    new: 'Novo',
    contacted: 'Contatado',
    qualified: 'Qualificado',
    proposal: 'Proposta',
    won: 'Ganho',
    lost: 'Perdido',
  };
  return texts[status] || status;
};

interface LeadsTableProps {
  leads: Lead[];
  onEditLead?: (lead: Lead) => void;
  onDeleteLead?: (leadId: string) => void;
  loading?: boolean;
}

const LeadsTable: React.FC<LeadsTableProps> = ({ 
  leads, 
  onEditLead, 
  onDeleteLead, 
  loading = false 
}) => {
  if (loading) {
    return (
      <div className="bg-slate-800 rounded-lg shadow-lg p-8 border border-slate-700">
        <div className="animate-pulse">
          <div className="h-4 bg-slate-700 rounded w-1/4 mb-4"></div>
          <div className="space-y-3">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-4 bg-slate-700 rounded w-full"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (leads.length === 0) {
    return (
      <div className="bg-slate-800 rounded-lg shadow-lg p-8 text-center border border-slate-700">
        <div className="text-slate-400 mb-4">
          <svg className="w-16 h-16 mx-auto" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd"></path>
          </svg>
        </div>
        <h3 className="text-lg font-medium text-white mb-2">Nenhum lead encontrado</h3>
        <p className="text-slate-400">Não há leads que correspondam aos filtros selecionados.</p>
      </div>
    );
  }

  return (
    <div className="bg-slate-800 rounded-lg shadow-lg overflow-hidden border border-slate-700">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-700">
          <thead className="bg-slate-900">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
                Nome
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
                Empresa
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
                Valor
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
                Fonte
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-slate-300 uppercase tracking-wider">
                Ações
              </th>
            </tr>
          </thead>
          <tbody className="bg-slate-800 divide-y divide-slate-700">
            {leads.map((lead) => (
              <tr key={lead.id} className="hover:bg-slate-700/50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-white">{lead.name}</div>
                  {lead.phone && (
                    <div className="text-sm text-slate-400">{lead.phone}</div>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-white">{lead.email}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-white">{lead.company || '-'}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(lead.status)}`}>
                    {getStatusText(lead.status)}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                  {lead.value ? `R$ ${lead.value.toLocaleString('pt-BR')}` : '-'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-400">
                  {lead.source}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex justify-end space-x-2">
                    {onEditLead && (
                      <button
                        onClick={() => onEditLead(lead)}
                        className="text-blue-400 hover:text-blue-300 p-1 rounded hover:bg-blue-900/50"
                        title="Editar lead"
                      >
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"></path>
                        </svg>
                      </button>
                    )}
                    {onDeleteLead && (
                      <button
                        onClick={() => onDeleteLead(lead.id)}
                        className="text-red-400 hover:text-red-300 p-1 rounded hover:bg-red-900/50"
                        title="Deletar lead"
                      >
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" clipRule="evenodd"></path>
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414L7.586 12l-1.293 1.293a1 1 0 101.414 1.414L9 13.414l2.293 2.293a1 1 0 001.414-1.414L11.414 12l1.293-1.293z" clipRule="evenodd"></path>
                        </svg>
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LeadsTable;