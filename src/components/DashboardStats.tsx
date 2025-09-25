import React from 'react';
import { LineChart } from '@mui/x-charts/LineChart';
import { PieChart } from '@mui/x-charts/PieChart';
import type { DashboardStats } from '../types/lead';

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
}

const StatsCard: React.FC<StatsCardProps> = ({ title, value, icon, trend }) => {
  return (
    <div className="bg-slate-800 rounded-lg shadow-lg p-6 border border-slate-700">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-slate-300">{title}</p>
          <p className="text-2xl font-bold text-white mt-2">{value}</p>
          {trend && (
            <p className={`text-sm mt-2 ${trend.isPositive ? 'text-green-400' : 'text-red-400'}`}>
              {trend.isPositive ? '↑' : '↓'} {Math.abs(trend.value)}%
            </p>
          )}
        </div>
        <div className="text-blue-400">
          {icon}
        </div>
      </div>
    </div>
  );
};

interface DashboardStatsProps {
  stats: DashboardStats;
}

const DashboardStatsComponent: React.FC<DashboardStatsProps> = ({ stats }) => {
  // Verificações de segurança para evitar erros
  if (!stats) {
    return <div className="text-white">Carregando estatísticas...</div>;
  }

  // Calcular o valor máximo dos dados para ajustar o eixo Y
  const maxLeadValue = stats.leadsUltimos7Dias && stats.leadsUltimos7Dias.length > 0 
    ? Math.max(...stats.leadsUltimos7Dias) 
    : 30;
  const yAxisMax = maxLeadValue + 5;

  return (
    <div className="space-y-6">
      {/* Cards principais */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
        <StatsCard
          title="Total de Leads"
          value={stats.totalLeads || 0}
          icon={<svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>}
        />
        <StatsCard
          title="Novos Leads"
          value={stats.newLeads || 0}
          icon={<svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd"></path></svg>}
        />
        <StatsCard
          title="Convertidos"
          value={stats.convertedLeads || 0}
          icon={<svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>}
        />
        <StatsCard
          title="Valor Total"
          value={`R$ ${(stats.totalValue || 0).toLocaleString('pt-BR')}`}
          icon={<svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20"><path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z"></path><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd"></path></svg>}
        />
        <StatsCard
          title="Taxa de Conversão"
          value={`${(stats.conversionRate || 0).toFixed(1)}%`}
          icon={<svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>}
        />
      </div>

      {/* Seção de Gráficos - Layout Horizontal */}
      <div className="grid grid-cols-1 lg:grid-cols-6 gap-4">
        {/* Gráfico de Linha - 4/6 da largura (2/3) */}
        {stats.leadsUltimos7Dias && stats.leadsUltimos7Dias.length > 0 && (
          <div className="lg:col-span-4 bg-slate-800 rounded-lg shadow-lg p-6 border border-slate-700">
            <h3 className="text-lg font-semibold text-white mb-6">Leads dos Últimos 7 Dias</h3>
            <div className="h-80 relative">
              {/* Definição do gradiente SVG */}
              <svg width="0" height="0" style={{ position: 'absolute' }}>
                <defs>
                  <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.4" />
                    <stop offset="50%" stopColor="#60A5FA" stopOpacity="0.2" />
                    <stop offset="100%" stopColor="#DBEAFE" stopOpacity="0.05" />
                  </linearGradient>
                </defs>
              </svg>
              <LineChart
                width={undefined}
                height={300}
                series={[
                  {
                    data: stats.leadsUltimos7Dias,
                    label: 'Leads',
                    area: true,
                    color: '#3B82F6',
                    curve: 'catmullRom'
                  },
                ]}
                xAxis={[
                  {
                    scaleType: 'point',
                    data: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],
                    tickLabelStyle: {
                      fontSize: 12,
                      fontWeight: 500,
                    },
                  },
                ]}
                yAxis={[
                  {
                    min: 0,
                    max: yAxisMax,
                    tickLabelStyle: {
                      fontSize: 12,
                    },
                  },
                ]}
                margin={{ left: 50, right: 20, top: 20, bottom: 50 }}
                grid={{ vertical: false, horizontal: false }}
                sx={{
                  // Área sob a linha com gradiente personalizado
                  '.MuiAreaElement-root': {
                    fill: 'url(#areaGradient)',
                  },
                  // Linha principal mais elegante
                  '.MuiLineElement-root': {
                    strokeWidth: 3,
                    stroke: '#3B82F6',
                    filter: 'drop-shadow(0 2px 4px rgba(59, 130, 246, 0.3))',
                  },
                  // Pontos de dados mais destacados
                  '.MuiMarkElement-root': {
                    strokeWidth: 3,
                    stroke: '#1e293b',
                    fill: '#3B82F6',
                    r: 6,
                    filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1))',
                  },
                  // Remover bordas dos eixos
                  '& .MuiChartsAxis-line': {
                    stroke: '#475569',
                    strokeWidth: 1,
                  },
                  // Estilizar labels dos eixos
                  '& .MuiChartsAxis-tickLabel': {
                    fontSize: '12px',
                    fontWeight: 500,
                    fill: '#94A3B8',
                  },
                  // Remover ticks dos eixos
                  '& .MuiChartsAxis-tick': {
                    stroke: 'transparent',
                  },
                  // Container do gráfico
                  '& .MuiChartsAxis-root': {
                    '& .MuiChartsAxis-bottom .MuiChartsAxis-line': {
                      stroke: '#64748B',
                    },
                    '& .MuiChartsAxis-left .MuiChartsAxis-line': {
                      stroke: 'transparent',
                    },
                  },
                }}
              />
            </div>
          </div>
        )}

        {/* Gráfico de Torta - Distribuição por Professor - 1/6 da largura */}
        {stats.leadsPorProfessor && stats.leadsPorProfessor.length > 0 && (
          <div className="bg-slate-800 rounded-lg shadow-lg p-4 border border-slate-700">
            <h3 className="text-sm font-semibold text-white mb-3">Professores</h3>
            <div className="flex justify-center">
              <PieChart
                series={[
                  {
                    data: stats.leadsPorProfessor.map((value, index) => ({
                      id: index,
                      value: value,
                      label: `Prof. ${String.fromCharCode(65 + index)}`, // A, B, C, etc.
                      color: [
                        '#3B82F6', '#60A5FA', '#93C5FD', '#BFDBFE', '#DBEAFE',
                        '#1E40AF', '#1D4ED8', '#2563EB', '#3B82F6', '#6366F1'
                      ][index]
                    })),
                    arcLabel: () => '', // Remove labels das fatias
                  },
                ]}
                width={220}
                height={300}
                margin={{ top: 10, bottom: 10, left: 10, right: 10 }}
                sx={{
                  '& .MuiPieArcLabel-root': {
                    display: 'none', // Esconde completamente os labels das fatias
                  },
                  '& .MuiChartsLegend-root': {
                    display: 'none !important', // Garante que a legenda não apareça
                  },
                  '& .MuiChartsLegend-series': {
                    display: 'none !important', // Esconde qualquer série de legenda
                  },
                }}
              />
            </div>
          </div>
        )}

        {/* Gráfico de Torta - Distribuição por Nível - 1/6 da largura */}
        {stats.leadsPorNivel && stats.leadsPorNivel.length > 0 && (
          <div className="bg-slate-800 rounded-lg shadow-lg p-4 border border-slate-700">
            <h3 className="text-sm font-semibold text-white mb-3">Níveis</h3>
            <div className="flex justify-center">
              <PieChart
                series={[
                  {
                    data: stats.leadsPorNivel.map((value, index) => ({
                      id: index,
                      value: value,
                      label: `Nível ${['I', 'II', 'III', 'IV', 'V', 'VI'][index]}`, // I, II, III, IV, V, VI
                      color: [
                        '#1E40AF', '#2563EB', '#3B82F6', '#60A5FA', '#93C5FD', '#BFDBFE'
                      ][index]
                    })),
                    arcLabel: () => '', // Remove labels das fatias
                  },
                ]}
                width={220}
                height={300}
                margin={{ top: 10, bottom: 10, left: 10, right: 10 }}
                sx={{
                  '& .MuiPieArcLabel-root': {
                    display: 'none', // Esconde completamente os labels das fatias
                  },
                  '& .MuiChartsLegend-root': {
                    display: 'none !important', // Garante que a legenda não apareça
                  },
                  '& .MuiChartsLegend-series': {
                    display: 'none !important', // Esconde qualquer série de legenda
                  },
                }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardStatsComponent;