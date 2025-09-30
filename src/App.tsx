import DashboardStats from './components/DashboardStats';
import LeadsTable from './components/LeadsTable';
import { useLeads, useDashboardStats } from './hooks/useLeads';
import { useTotalLeads } from './hooks/useTotalLeads';
import { useNewLeadsToday } from './hooks/useNewLeadsToday';
import type { Lead } from './types/lead';

function App() {
  const { leads, loading: leadsLoading, refetch } = useLeads();
  const { stats } = useDashboardStats();
  const { totalLeads } = useTotalLeads();
  const { newLeads } = useNewLeadsToday();

  // Dados mock para demonstração quando a API não estiver disponível
  const mockStats = {
    totalLeads: 142,
    newLeads: 23,
    convertedLeads: 18,
    totalValue: 125000,
    conversionRate: 12.7,
    leadsUltimos7Dias: [12, 18, 15, 22, 8, 25, 19], // Domingo a Sábado
    leadsPorProfessor: [15, 12, 18, 8, 22, 14, 9, 16, 11, 7], // A-J
    leadsPorNivel: [25, 18, 22, 15, 12, 8] // I-VI
  };

  const mockLeads: Lead[] = [
    {
      id: 1,
      adtsAtual: 15,
      anoIngresso: 2017,
      email: "joao.silva@exemplo.com",
      letraAtual: "B",
      nivel: "III",
      nomeCompleto: "João Silva Santos",
      possuiProcessos: false,
      whatsapp: "(11) 99999-9999",
      conditions: true,
      newsletter: true,
      createdAt: "2025-01-15T10:30:00Z",
      updatedAt: "2025-01-15T10:30:00Z"
    },
    {
      id: 2,
      adtsAtual: 10,
      anoIngresso: 2020,
      email: "maria.santos@exemplo.com",
      letraAtual: "A",
      nivel: "II",
      nomeCompleto: "Maria Santos Silva",
      possuiProcessos: true,
      whatsapp: "(21) 88888-8888",
      conditions: true,
      newsletter: false,
      createdAt: "2025-01-14T14:22:00Z",
      updatedAt: "2025-01-16T09:15:00Z"
    },
    {
      id: 3,
      adtsAtual: 30,
      anoIngresso: 2015,
      email: "pedro.costa@exemplo.com",
      letraAtual: "H",
      nivel: "V",
      nomeCompleto: "Pedro Costa Oliveira",
      possuiProcessos: false,
      whatsapp: "(85) 77777-7777",
      conditions: true,
      newsletter: true,
      createdAt: "2025-01-10T16:45:00Z",
      updatedAt: "2025-01-18T11:30:00Z"
    }
  ];

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
  const displayStats = stats || {
    ...mockStats,
    totalLeads: totalLeads !== null ? totalLeads : "Loading...",
    newLeads: newLeads !== null ? newLeads : "Loading..."
  };
  const displayLeads = leads.length > 0 ? leads : mockLeads;
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
            leads={displayLeads}
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
