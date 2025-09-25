# 📊 Leads Dashboard

Dashboard moderno para gerenciamento de leads construído com React, TypeScript, Tailwind CSS e Axios.

## 🚀 Tecnologias

- **React 18** - Biblioteca JavaScript para construção de interfaces
- **TypeScript** - Superset do JavaScript com tipagem estática
- **Tailwind CSS** - Framework CSS utility-first para estilização
- **Axios** - Cliente HTTP para requisições à API
- **Vite** - Build tool rápida e moderna

## 📁 Estrutura do Projeto

```
src/
├── components/          # Componentes React reutilizáveis
│   ├── DashboardStats.tsx
│   └── LeadsTable.tsx
├── hooks/              # Hooks customizados
│   └── useLeads.ts
├── services/           # Serviços de API
│   ├── api.ts         # Configuração do Axios
│   └── leadService.ts # Serviços específicos de leads
├── types/              # Definições de tipos TypeScript
│   └── lead.ts
└── utils/              # Utilitários gerais
```

## ⚙️ Configuração e Instalação

### 1. Instalar dependências
```bash
npm install
```

### 2. Configurar variáveis de ambiente
Copie o arquivo `.env.example` para `.env` e configure as variáveis:
```bash
cp .env.example .env
```

### 3. Executar o projeto
```bash
npm run dev
```

O projeto estará disponível em `http://localhost:5173`

## 🔧 Scripts Disponíveis

- `npm run dev` - Inicia o servidor de desenvolvimento
- `npm run build` - Constrói o projeto para produção
- `npm run preview` - Visualiza o build de produção
- `npm run lint` - Executa o ESLint para verificar o código

## 📊 Funcionalidades

### Dashboard
- Estatísticas gerais de leads (total, novos, convertidos, etc.)
- Cards informativos com métricas importantes
- Layout responsivo

### Gerenciamento de Leads
- Lista de leads com informações detalhadas
- Status coloridos para fácil identificação
- Ações de edição e exclusão
- Tabela responsiva

### Hooks Customizados
- `useLeads` - Hook para gerenciar lista de leads
- `useDashboardStats` - Hook para estatísticas do dashboard

### Serviços de API
- Configuração centralizada do Axios
- Interceptors para autenticação e tratamento de erros
- Serviços específicos para operações com leads

## 🌐 Configuração da API

O projeto está configurado para consumir uma API REST. Configure a URL base no arquivo `.env`:

```env
VITE_API_URL=http://localhost:3001/api
```

### Endpoints esperados:
- `GET /leads` - Lista todos os leads
- `GET /leads/:id` - Busca lead por ID
- `POST /leads` - Cria novo lead
- `PUT /leads/:id` - Atualiza lead
- `DELETE /leads/:id` - Remove lead
- `GET /leads/stats` - Estatísticas do dashboard

## 🎨 Estilização com Tailwind

O projeto utiliza Tailwind CSS para estilização. As classes são aplicadas diretamente nos componentes, seguindo o padrão utility-first.

### Principais utilitários utilizados:
- Layout: `grid`, `flex`, `container`
- Spacing: `p-*`, `m-*`, `space-*`
- Colors: `bg-*`, `text-*`, `border-*`
- Responsive: `sm:*`, `md:*`, `lg:*`

## 🔒 Tratamento de Erros

- Estados de loading para melhor UX
- Tratamento de erros de API
- Dados mock para demonstração
- Interceptors do Axios para erros globais

## 📱 Responsividade

O dashboard é totalmente responsivo, adaptando-se a diferentes tamanhos de tela:
- Mobile: Layout em coluna única
- Tablet: Layout adaptado com 2 colunas
- Desktop: Layout completo com múltiplas colunas

## 🤝 Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
