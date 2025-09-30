import DashboardStats from './components/DashboardStats';
import LeadsTable from './components/LeadsTable';
import { useLeads, useDashboardStats } from './hooks/useLeads';
import type { DashboardStats as DashboardStatsData, Lead } from './types/lead';

function App() {
  const { leads, loading: leadsLoading, refetch } = useLeads();
  const { stats } = useDashboardStats();

  const handleEditLead = (lead: Lead) => {
    console.log('Editar lead:', lead);
    // Aqui você implementaria a lógica para abrir um modal de edição
  };

  const handleDeleteLead = (leadId: number) => {
    console.log('Deletar lead:', leadId);
    // Aqui você implementaria a lógica para deletar o lead
    refetch(); // Atualizar a lista após deletar
  };

  // Usar dados reais se disponíveis, senão usar mock
  const displayStats: DashboardStatsData = stats || {
  totalLeads: 0,
  newLeads: 0,
  leadsUltimos7Dias: [],
  leadsPorNivel: [],
  leadsPorLetra: []
};

  // const displayLeads = leads.length > 0 ? leads : mockLeads;
  const displayLoading = leadsLoading && leads.length === 0;

  return (
    <div className="min-h-screen bg-slate-950">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Dashboard de Leads</h1>
          <p className="text-slate-300">Gerencie seus leads e acompanhe o desempenho das vendas</p>
        </div>

        {/* Stats Cards */}
        <DashboardStats stats={displayStats} />

        {/* Leads Table */}
        <div className="mb-8">
          <div className="flex justify-between items-center my-8">
            <h2 className="text-xl font-semibold text-white">Lista de Leads</h2>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium transition-colors">
              + Novo Lead
            </button>
          </div>
          
          <LeadsTable
            leads={leads}
            loading={displayLoading}
            onEditLead={handleEditLead}
            onDeleteLead={handleDeleteLead}
          />
        </div>

        <footer className="bg-slate-800 rounded-lg shadow-lg p-6 border border-slate-700">
          <p className="text-slate-300">
            Escritório de Advocacia Clodonil Monteiro - 2025
          </p>
        </footer>
      </div>
    </div>
  );
}

export default App;
