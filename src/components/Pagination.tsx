import React from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import type { PaginationInfo } from '../types/lead';

interface PaginationProps {
  pagination: PaginationInfo;
  onPageChange: (page: number) => void;
  onNextPage: () => void;
  onPreviousPage: () => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  pagination,
  onPageChange,
  onNextPage,
  onPreviousPage
}) => {
  const { page, limit, total, totalPages } = pagination;

  // Calcular range dos itens exibidos
  const startItem = total === 0 ? 0 : (page - 1) * limit + 1;
  const endItem = Math.min(page * limit, total);

  // Gerar páginas para mostrar
  const getPageNumbers = () => {
    const pages: number[] = [];
    const maxPagesToShow = 5;
    
    if (totalPages <= maxPagesToShow) {
      // Se tem poucas páginas, mostrar todas
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Se tem muitas páginas, mostrar com elipses
      if (page <= 3) {
        // Início: 1, 2, 3, 4, 5, ..., total
        for (let i = 1; i <= Math.min(5, totalPages); i++) {
          pages.push(i);
        }
      } else if (page >= totalPages - 2) {
        // Fim: 1, ..., total-4, total-3, total-2, total-1, total
        for (let i = Math.max(1, totalPages - 4); i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        // Meio: 1, ..., page-1, page, page+1, ..., total
        pages.push(1);
        if (page > 4) pages.push(-1); // Representa "..."
        for (let i = page - 1; i <= page + 1; i++) {
          pages.push(i);
        }
        if (page < totalPages - 3) pages.push(-1); // Representa "..."
        pages.push(totalPages);
      }
    }
    
    return pages;
  };

  const pageNumbers = getPageNumbers();

  if (totalPages <= 1) {
    return null; // Não mostrar paginação se há apenas uma página
  }

  return (
    <div className="flex items-center justify-between px-6 py-3 bg-gray-900 border-t border-gray-700">
      {/* Informações dos itens */}
      <div className="flex items-center text-sm text-gray-400">
        <span>
          Mostrando {startItem} a {endItem} de {total} resultados
        </span>
      </div>

      {/* Controles de paginação */}
      <div className="flex items-center space-x-2">
        {/* Botão Anterior */}
        <button
          onClick={onPreviousPage}
          disabled={page === 1}
          className={`
            flex items-center px-3 py-2 text-sm font-medium rounded-md
            ${page === 1
              ? 'text-gray-500 cursor-not-allowed bg-gray-800'
              : 'text-gray-300 bg-gray-700 hover:bg-gray-600 hover:text-white'
            }
            transition-colors duration-200
          `}
        >
          <FiChevronLeft className="w-4 h-4 mr-1" />
          Anterior
        </button>

        {/* Números das páginas */}
        <div className="flex items-center space-x-1">
          {pageNumbers.map((pageNum, index) => {
            if (pageNum === -1) {
              // Elipse
              return (
                <span
                  key={`ellipsis-${index}`}
                  className="px-3 py-2 text-gray-500"
                >
                  ...
                </span>
              );
            }

            return (
              <button
                key={pageNum}
                onClick={() => onPageChange(pageNum)}
                className={`
                  px-3 py-2 text-sm font-medium rounded-md transition-colors duration-200
                  ${pageNum === page
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-300 bg-gray-700 hover:bg-gray-600 hover:text-white'
                  }
                `}
              >
                {pageNum}
              </button>
            );
          })}
        </div>

        {/* Botão Próximo */}
        <button
          onClick={onNextPage}
          disabled={page === totalPages}
          className={`
            flex items-center px-3 py-2 text-sm font-medium rounded-md
            ${page === totalPages
              ? 'text-gray-500 cursor-not-allowed bg-gray-800'
              : 'text-gray-300 bg-gray-700 hover:bg-gray-600 hover:text-white'
            }
            transition-colors duration-200
          `}
        >
          Próximo
          <FiChevronRight className="w-4 h-4 ml-1" />
        </button>
      </div>
    </div>
  );
};