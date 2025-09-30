import React from 'react';
import { LineChart } from '@mui/x-charts/LineChart';
import { PieChart } from '@mui/x-charts/PieChart';
import { HiOutlineUsers, HiOutlinePlus} from 'react-icons/hi';
import type { DashboardStats, DiaSemana, LeadsPorLetra, LeadsPorNivel } from '../types/lead';

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
    ? Math.max(...(stats.leadsUltimos7Dias as DiaSemana[]).map((item) => item.qtd))
    : 0;
  const yAxisMax = maxLeadValue + 5;

  return (
    <div className="space-y-6">
      {/* Cards principais */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 mb-8">
        <StatsCard
          title="Total de Leads"
          value={stats.totalLeads || 0}
          icon={<HiOutlineUsers className="w-8 h-8" />}
        />
        <StatsCard
          title="Novos Leads Hoje"
          value={stats.newLeads || 0}
          icon={<HiOutlinePlus className="w-8 h-8" />}
        />
      </div>

      {/* Seção de Gráficos - Layout Horizontal */}
      <div className="grid grid-cols-1 lg:grid-cols-6 gap-4">
        {/* Gráfico de Linha - 4/6 da largura (2/3) */}
        {stats.leadsUltimos7Dias && stats.leadsUltimos7Dias.length > 0 && (
          <div className="lg:col-span-4 bg-slate-800 rounded-lg shadow-lg p-6 border border-slate-700">
            <h3 className="text-lg font-semibold text-white mb-6">Leads dos Últimos 7 Dias</h3>
            <div className="h-10 relative">
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
                height={250}
                series={[
                  {
                    data: (stats.leadsUltimos7Dias as DiaSemana[]).map((item) => item.qtd),
                    area: true,
                    color: '#3B82F6',
                    curve: 'catmullRom',
                    showMark: false,
                  },
                ]}
                xAxis={[
                  {
                    scaleType: 'point',
                    data: (stats.leadsUltimos7Dias as DiaSemana[]).map((item) => item.dia),
                    tickLabelStyle: {
                      fontSize: 12,
                      fontWeight: 500,
                    },
                    disableTicks: true,
                  },
                ]}
                yAxis={[
                  {
                    min: 0,
                    max: yAxisMax,
                    tickLabelStyle: {
                      fontSize: 12,
                    },
                    disableTicks: true,
                  },
                ]}
                sx={{
                  // Área sob a linha com gradiente personalizado
                  '.MuiAreaElement-root': {
                    fill: 'url(#areaGradient)',
                  },
                }}
              />
            </div>
          </div>
        )}

        {/* Gráfico de Torta - Distribuição por Professor - 1/6 da largura */}
        {stats.leadsPorLetra && stats.leadsPorLetra.length > 0 && (
          <div className="bg-slate-800 rounded-lg shadow-lg p-4 border border-slate-700">
            <h3 className="text-sm font-semibold text-white mb-3">Professores por Letra</h3>
            <div className="flex justify-center">
              <PieChart
                series={[
                  {
                    data: (stats.leadsPorLetra as LeadsPorLetra[]).map((value, index) => ({
                      id: index,
                      value: value.qtd,
                      label: `Letra ${value.letra}`,
                       // A, B, C, etc.
                                  color: [
                                  '#96ABED', '#859DEA', '#738FE7', '#6280E4', '#5172E1',
                                  '#3F64DE', '#2E56DC', '#234CD1', '#2146C0', '#1E40AF'
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
            <h3 className="text-sm font-semibold text-white mb-3">Professores por Nível</h3>
            <div className="flex justify-center">
              <PieChart
                series={[
                  {
                    data: (stats.leadsPorNivel as LeadsPorNivel[]).map((value, index) => ({
                      id: index,
                      value: value.qtd,
                      label: `Nível ${value.nivel}`, // I, II, III, IV, V, VI
                      color: [
                        '#B9C7F3', '#859DEA', '#6280E4', '#3F64DE', '#234CD1', '#1E40AF'
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