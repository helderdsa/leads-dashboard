import React from 'react';
import { HiOutlineXCircle, HiOutlinePencil, HiOutlineTrash } from 'react-icons/hi';
import type { Lead } from '../types/lead';

const getAdtsColor = (adtsAtual: number): string => {
  if (adtsAtual >= 30) return 'bg-green-900/50 text-green-300 border border-green-700';
  if (adtsAtual >= 20) return 'bg-blue-900/50 text-blue-300 border border-blue-700';
  if (adtsAtual >= 15) return 'bg-yellow-900/50 text-yellow-300 border border-yellow-700';
  if (adtsAtual >= 10) return 'bg-orange-900/50 text-orange-300 border border-orange-700';
  return 'bg-red-900/50 text-red-300 border border-red-700';
};

const getProcessosStatus = (possuiProcessos: boolean): string => {
  return possuiProcessos 
    ? 'bg-red-900/50 text-red-300 border border-red-700' 
    : 'bg-green-900/50 text-green-300 border border-green-700';
};

const getProcessosText = (possuiProcessos: boolean): string => {
  return possuiProcessos ? 'Possui' : 'Não Possui';
};

const getNewsletterStatus = (newsletter: boolean): string => {
  return newsletter 
    ? 'bg-green-900/50 text-green-300 border border-green-700' 
    : 'bg-red-900/50 text-red-300 border border-red-700';
};

const getNewsletterText = (newsletter: boolean): string => {
  return newsletter ? 'Sim' : 'Não';
};

interface LeadsTableProps {
  leads: Lead[];
  onEditLead?: (lead: Lead) => void;
  onDeleteLead?: (leadId: number) => void;
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
          <HiOutlineXCircle className="w-16 h-16 mx-auto" />
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
                Nome Completo
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
                Letra/Nível
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
                ADTs
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
                Ano Ingresso
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
                Processos
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
                Newsletter
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
                  <div className="text-sm font-medium text-white">{lead.nomeCompleto}</div>
                  {lead.whatsapp && (
                    <div className="text-sm text-slate-400">{lead.whatsapp}</div>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-white">{lead.email}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-white">{lead.letraAtual} / {lead.nivel}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getAdtsColor(lead.adtsAtual)}`}>
                    {lead.adtsAtual}%
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                  {lead.anoIngresso}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getProcessosStatus(lead.possuiProcessos)}`}>
                    {getProcessosText(lead.possuiProcessos)}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getNewsletterStatus(lead.newsletter)}`}>
                    {getNewsletterText(lead.newsletter)}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex justify-end space-x-2">
                    {onEditLead && (
                      <button
                        onClick={() => onEditLead(lead)}
                        className="text-blue-400 hover:text-blue-300 p-1 rounded hover:bg-blue-900/50"
                        title="Editar lead"
                      >
                        <HiOutlinePencil className="w-4 h-4" />
                      </button>
                    )}
                    {onDeleteLead && (
                      <button
                        onClick={() => onDeleteLead(lead.id)}
                        className="text-red-400 hover:text-red-300 p-1 rounded hover:bg-red-900/50"
                        title="Deletar lead"
                      >
                        <HiOutlineTrash className="w-4 h-4" />
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