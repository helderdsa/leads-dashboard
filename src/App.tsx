import DashboardStats from './components/DashboardStats';
import LeadsTable from './components/LeadsTable';
import { useLeads, useDashboardStats } from './hooks/useLeads';
import type { Lead } from './types/lead';

function App() {
  const { leads, loading: leadsLoading, error: leadsError, refetch } = useLeads();
  const { stats, error: statsError } = useDashboardStats();

  // Dados mock para demonstração quando a API não estiver disponível
  const mockStats = {
    totalLeads: 142,
    newLeads: 23,
    convertedLeads: 18,
    totalValue: 125000,
    conversionRate: 12.7
  };

  const mockLeads: Lead[] = [
    {
      id: '1',
      name: 'João Silva',
      email: 'joao@exemplo.com',
      phone: '(11) 99999-9999',
      company: 'Tech Solutions',
      status: 'new',
      source: 'Website',
      value: 15000,
      createdAt: '2024-01-15T10:30:00Z',
      updatedAt: '2024-01-15T10:30:00Z'
    },
    {
      id: '2',
      name: 'Maria Santos',
      email: 'maria@exemplo.com',
      company: 'Digital Corp',
      status: 'qualified',
      source: 'LinkedIn',
      value: 25000,
      createdAt: '2024-01-14T14:22:00Z',
      updatedAt: '2024-01-16T09:15:00Z'
    },
    {
      id: '3',
      name: 'Pedro Costa',
      email: 'pedro@exemplo.com',
      phone: '(21) 88888-8888',
      company: 'StartupXYZ',
      status: 'won',
      source: 'Referência',
      value: 40000,
      createdAt: '2024-01-10T16:45:00Z',
      updatedAt: '2024-01-18T11:30:00Z'
    }
  ];

  const handleEditLead = (lead: Lead) => {
    console.log('Editar lead:', lead);
    // Aqui você implementaria a lógica para abrir um modal de edição
  };

  const handleDeleteLead = (leadId: string) => {
    console.log('Deletar lead:', leadId);
    // Aqui você implementaria a lógica para deletar o lead
    refetch(); // Atualizar a lista após deletar
  };

  // Usar dados reais se disponíveis, senão usar mock
  const displayStats = stats || mockStats;
  const displayLeads = leads.length > 0 ? leads : mockLeads;
  const displayLoading = leadsLoading && leads.length === 0;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard de Leads</h1>
          <p className="text-gray-600">Gerencie seus leads e acompanhe o desempenho das vendas</p>
        </div>

        {/* Stats Cards */}
        <DashboardStats stats={displayStats} />

        {/* Error Messages */}
        {leadsError && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
            <p><strong>Erro ao carregar leads:</strong> {leadsError}</p>
            <p className="text-sm mt-1">Exibindo dados de exemplo. Verifique se a API está funcionando.</p>
          </div>
        )}

        {statsError && (
          <div className="bg-yellow-50 border border-yellow-200 text-yellow-700 px-4 py-3 rounded mb-6">
            <p><strong>Erro ao carregar estatísticas:</strong> {statsError}</p>
            <p className="text-sm mt-1">Exibindo estatísticas de exemplo.</p>
          </div>
        )}

        {/* Leads Table */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Lista de Leads</h2>
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

        {/* Footer Info */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Configuração do Projeto</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              <h4 className="font-medium text-gray-700 mb-2">Tecnologias</h4>
              <ul className="text-gray-600 space-y-1">
                <li>✅ React 18 + TypeScript</li>
                <li>✅ Tailwind CSS</li>
                <li>✅ Axios</li>
                <li>✅ Hooks customizados</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-gray-700 mb-2">Estrutura</h4>
              <ul className="text-gray-600 space-y-1">
                <li>📁 /src/components</li>
                <li>📁 /src/services</li>
                <li>📁 /src/hooks</li>
                <li>📁 /src/types</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-gray-700 mb-2">Funcionalidades</h4>
              <ul className="text-gray-600 space-y-1">
                <li>📊 Dashboard com estatísticas</li>
                <li>📋 Tabela de leads responsiva</li>
                <li>🔄 Gerenciamento de estado</li>
                <li>⚡ Configuração com Vite</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
