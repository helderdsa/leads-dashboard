import React from 'react';
import { HiOutlineXCircle, HiOutlinePencil, HiOutlineTrash } from 'react-icons/hi';
import { useLeadsPaginated } from '../hooks/usePagination';
import { Pagination } from './Pagination';
import type { Lead } from '../types/lead';

const getAdtsColor = (adtsAtual: number): string => {
  if (adtsAtual >= 30) return 'bg-green-900/50 shadow-lg hover:shadow-green-900 transition duration-500 text-green-300 border border-green-700';
  if (adtsAtual >= 20) return 'bg-blue-900/50 shadow-lg hover:shadow-blue-700 transition duration-500 text-blue-300 border border-blue-700';
  if (adtsAtual >= 15) return 'bg-yellow-900/50 shadow-lg hover:shadow-yellow-700 transition duration-500 text-yellow-300 border border-yellow-700';
  if (adtsAtual >= 10) return 'bg-orange-900/50 shadow-lg hover:shadow-orange-700 transition duration-500 text-orange-300 border border-orange-700';
  return 'bg-red-900/50 shadow-lg hover:shadow-red-700 transition duration-500 text-red-300 border border-red-700';
};

const getLettersColor = (letraAtual: string): string => {
  const letter = letraAtual.toUpperCase();
  if (letter === "A" || letter === "B" || letter === "C") {
    return 'bg-green-900/50 shadow-lg hover:shadow-green-900 transition duration-500 text-green-500 border border-green-900';
  } 
  if (letter === "D" || letter === "E" || letter === "F") {
    return 'bg-green-900/50 shadow-lg hover:shadow-green-800 transition duration-500 text-green-300 border border-green-700';
  }
  if (letter === "G" || letter === "H" || letter === "I") {
    return 'bg-blue-900/50 shadow-lg hover:shadow-blue-700 transition duration-500 text-blue-300 border border-blue-700';
  }
  if (letter === "J") {
    return 'bg-blue-900/50 shadow-lg hover:shadow-blue-600 transition duration-500 text-blue-200 border border-blue-600';
  }
  return 'bg-red-900/50 text-red-300 border border-red-700';
};

const getProcessosStatus = (possuiProcessos: boolean): string => {
  return possuiProcessos 
    ? 'bg-red-900/50 shadow-lg hover:shadow-red-700 transition duration-500 text-red-300 border border-red-700' 
    : 'bg-green-900/50 shadow-lg hover:shadow-green-700 transition duration-500 text-green-300 border border-green-700';
};

const getProcessosText = (possuiProcessos: boolean): string => {
  return possuiProcessos ? 'Possui' : 'Não Possui';
};

const getNewsletterStatus = (newsletter: boolean): string => {
  return newsletter 
    ? 'bg-green-900/50 shadow-lg hover:shadow-green-700 transition duration-500 text-green-300 border border-green-700' 
    : 'bg-red-900/50 shadow-lg hover:shadow-red-700 transition duration-500 text-red-300 border border-red-700';
};

const getNewsletterText = (newsletter: boolean): string => {
  return newsletter ? 'Sim' : 'Não';
};

interface LeadsTableProps {
  onEditLead?: (lead: Lead) => void;
  onDeleteLead?: (leadId: number) => void;
  itemsPerPage?: number;
}

const LeadsTable: React.FC<LeadsTableProps> = ({ 
  onEditLead, 
  onDeleteLead,
  itemsPerPage = 10
}) => {
  const {
    leads,
    pagination,
    loading,
    error,
    goToPage,
    goToNextPage,
    goToPreviousPage,
    refetch
  } = useLeadsPaginated(1, itemsPerPage);

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

  if (error) {
    return (
      <div className="bg-slate-800 rounded-lg shadow-lg p-8 text-center border border-slate-700">
        <div className="text-red-400 mb-4">
          <HiOutlineXCircle className="w-16 h-16 mx-auto" />
        </div>
        <h3 className="text-lg font-medium text-white mb-2">Erro ao carregar leads</h3>
        <p className="text-slate-400 mb-4">{error}</p>
        <button
          onClick={refetch}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors"
        >
          Tentar novamente
        </button>
      </div>
    );
  }

  if (leads.length === 0 && pagination.total === 0) {
    return (
      <div className="bg-slate-800 rounded-lg shadow-lg p-8 text-center border border-slate-700">
        <div className="text-slate-400 mb-4">
          <HiOutlineXCircle className="w-16 h-16 mx-auto" />
        </div>
        <h3 className="text-lg font-medium text-white mb-2">Nenhum lead encontrado</h3>
        <p className="text-slate-400">Não há leads cadastrados no sistema.</p>
      </div>
    );
  }

  return (
    <div className="bg-slate-800 rounded-lg shadow-lg overflow-hidden border border-slate-700">
      {/* Header com total de registros */}
      <div className="px-6 py-4 bg-slate-900 border-b border-slate-700">
        <h3 className="text-lg font-medium text-white">
          Leads ({pagination.total} {pagination.total === 1 ? 'registro' : 'registros'})
        </h3>
      </div>

      {/* Tabela */}
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
              <th className="px-6 py-3 text-center text-xs font-medium text-slate-300 uppercase tracking-wider">
                Letra/Nível
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-slate-300 uppercase tracking-wider">
                ADTs
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-slate-300 uppercase tracking-wider">
                Ano Ingresso
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-slate-300 uppercase tracking-wider">
                Processos
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-slate-300 uppercase tracking-wider">
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
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <div className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getLettersColor(lead.letraAtual)}`}>
                    {lead.letraAtual.toUpperCase()} / {lead.nivel.toUpperCase()}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getAdtsColor(lead.adtsAtual)}`}>
                    {lead.adtsAtual}%
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-white text-center">
                  {lead.anoIngresso}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getProcessosStatus(lead.possuiProcessos)}`}>
                    {getProcessosText(lead.possuiProcessos)}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getNewsletterStatus(lead.newsletter)}`}>
                    {getNewsletterText(lead.newsletter)}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex justify-end space-x-2">
                    {onEditLead && (
                      <button
                        onClick={() => onEditLead(lead)}
                        className="text-blue-400 hover:text-blue-300 p-1 rounded hover:bg-blue-900/50 hover:shadow-lg shadow-blue-600 transition-all duration-300"
                        title="Editar lead"
                      >
                        <HiOutlinePencil className="w-4 h-4" />
                      </button>
                    )}
                    {onDeleteLead && (
                      <button
                        onClick={() => onDeleteLead(lead.id)}
                        className="text-red-400 hover:text-red-300 p-1 rounded hover:bg-red-900/50 hover:shadow-lg shadow-red-600 transition-all duration-300"
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

      {/* Componente de Paginação */}
      <Pagination
        pagination={pagination}
        onPageChange={goToPage}
        onNextPage={goToNextPage}
        onPreviousPage={goToPreviousPage}
      />
    </div>
  );
};

export default LeadsTable;