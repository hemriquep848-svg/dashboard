# Squad Black New | Logística - Dashboard de Performance de Entregas

## 📌 Visão Geral do Projeto

O **Black New - Logística** é um dashboard interativo desenvolvido para monitorar e analisar atrasos em entregas logísticas em diferentes regiões do país. A solução foi criada para atender à demanda de uma empresa nacional de logística que enfrentava dificuldades com planilhas extensas e relatórios manuais, proporcionando uma ferramenta visual, dinâmica e intuitiva para tomada de decisão.

---
## 👥 Squad Black New - Ciência de Dados 2026

### Integrantes do Projeto

| Nome | Função | Contribuição Principal |
|------|--------|------------------------|
| **João Pedro** | Product Owner & Front-End | Definição de requisitos, arquitetura do dashboard e implementação dos gráficos |
| **Pedro Henrique** | Scrum Master & Data Analyst | Organização das sprints, definição da lógica de negócio e métricas de atraso |
| **Guilherme** | Desenvolvedor JS & UI/UX | Lógica de filtros, integração com Chart.js e criação da paleta de cores azul/laranja |
| **Daniel** | QA & Documentação | Testes de usabilidade, validação dos cálculos e elaboração do README |

---


## 🎯 Objetivo

Capacitar gestores logísticos a:

- Identificar rapidamente transportadoras com maior índice de atraso
- Visualizar regiões críticas do país
- Priorizar entregas mais problemáticas
- Acompanhar tendências operacionais em tempo real
- Tomar decisões baseadas em dados consolidados

---

## 🔍 Problema Resolvido

A empresa enfrentava desafios operacionais significativos:

| Problema | Solução Implementada |
|----------|---------------------|
| Planilhas extensas e difíceis de analisar | Dashboard visual com cards e gráficos interativos |
| Dificuldade em identificar transportadoras problemáticas | Gráfico de barras inclinadas com ranking por operadora |
| Falta de visão regional dos atrasos | Gráfico de área comparativo por região |
| Sem priorização clara das entregas críticas | Ranking horizontal das 5 piores entregas |
| Decisões baseadas em dados desatualizados | Filtros dinâmicos e insight automático em tempo real |

---

## 🛠️ Tecnologias Utilizadas

| Tecnologia | Finalidade |
|------------|------------|
| **HTML5** | Estrutura semântica do dashboard |
| **CSS3** | Estilização moderna com gradientes, blur e responsividade |
| **JavaScript (Vanilla)** | Toda a lógica de negócio, filtros e manipulação de dados |
| **Chart.js** | Geração de gráficos interativos (barras inclinadas, pizza 3D, área, ranking horizontal) |
| **LocalStorage** | Persistência da preferência de tema (claro/escuro) |

**Nenhum framework externo foi utilizado** (sem React, Vue, Angular, Bootstrap ou Tailwind), garantindo leveza e independência.

## 📊 Metodologia de Análise

### I. Identificação de Atrasos

Cada entrega possui dois atributos fundamentais:

- **Prazo previsto** (dias contratados para entrega)
- **Dias reais** (tempo efetivamente gasto)

A fórmula aplicada é:

atraso = Math.max(0, diasReais - prazo)
Se o valor for negativo (entrega antecipada), o atraso é considerado zero.

II. Cálculos e Agregações
A partir dos atrasos individuais, foram realizados:

Somatório por transportadora → alimenta o gráfico de barras inclinadas

Somatório por região → alimenta o gráfico de área

Taxa de atraso = (entregas com atraso / total de entregas) × 100

Ranking crítico = ordenação decrescente por dias de atraso (top 5)

III. Priorização das Informações
Os dados são organizados seguindo a lógica:

Cards de KPI → visão geral dos números mais importantes

Gráficos → comparação visual entre transportadoras e regiões

Ranking → foco imediato nas entregas mais urgentes

Tabela → detalhamento completo com ordenação por atraso

Insight automático → análise textual contextual baseada nos filtros aplicados

📁 Estrutura do Projeto
text
nexus-logistica/
├── index.html          # Estrutura principal do dashboard
├── css/
│   └── style.css       # Estilos com tema azul/laranja e responsividade
├── images/
│   └── dashboard.png       # Estilos com tema azul/laranja e responsividade
├── js/
│   └── app.js          # Lógica de negócio, gráficos e interatividade
└── README.md           # Documentação completa do projeto
📊 Dataset Utilizado
Os dados são fictícios mas representam situações reais do mercado logístico brasileiro:

javascript
const entregas = [
  { id: "301", cidade: "São Paulo", regiao: "Sudeste", transportadora: "RotaMax", prazo: 3, diasReais: 7 },
  { id: "302", cidade: "Curitiba", regiao: "Sul", transportadora: "ViaCargo", prazo: 5, diasReais: 5 },
  { id: "303", cidade: "Recife", regiao: "Nordeste", transportadora: "FlashLog", prazo: 4, diasReais: 9 },
  { id: "304", cidade: "Manaus", regiao: "Norte", transportadora: "RotaMax", prazo: 6, diasReais: 4 },
  { id: "305", cidade: "Goiânia", regiao: "Centro-Oeste", transportadora: "ViaCargo", prazo: 2, diasReais: 6 },
  { id: "306", cidade: "Porto Alegre", regiao: "Sul", transportadora: "FlashLog", prazo: 5, diasReais: 12 },
  { id: "307", cidade: "Florianópolis", regiao: "Sul", transportadora: "RotaMax", prazo: 6, diasReais: 9 },
  { id: "308", cidade: "Rio de Janeiro", regiao: "Sudeste", transportadora: "ViaCargo", prazo: 3, diasReais: 4 },
  { id: "309", cidade: "Belém", regiao: "Norte", transportadora: "FlashLog", prazo: 5, diasReais: 5 },
  { id: "310", cidade: "Salvador", regiao: "Nordeste", transportadora: "ViaCargo", prazo: 4, diasReais: 8 }
];
Observação: Em um ambiente de produção real, esses dados seriam obtidos dinamicamente através de uma API conectada a um banco de dados (PostgreSQL, MySQL ou MongoDB), garantindo escalabilidade, persistência e atualização contínua.

🎨 Funcionalidades Implementadas
Funcionalidade	Descrição
✅ Filtros dinâmicos	Região, transportadora e busca textual (ignorando acentos e maiúsculas)
✅ Cards de KPI	Total de entregas, atrasos, taxa de atraso e maior atraso
✅ Gráfico de barras inclinadas	Atrasos acumulados por transportadora (design moderno)
✅ Gráfico de pizza 3D	Proporção visual de entregas no prazo vs atrasadas
✅ Gráfico de área	Comparativo de atrasos por região geográfica
✅ Ranking horizontal	Top 5 entregas com maior tempo de atraso
✅ Tabela detalhada	Ordenada por atraso decrescente, com clique para detalhes
✅ Insight automático	Análise textual dinâmica baseada nos filtros aplicados
✅ Modal explicativo	Cada gráfico e card possui explicação contextual
✅ Tema azul/laranja	Cores contrastantes para melhor experiência visual
✅ Design responsivo	Adaptado para desktop, tablet e smartphones
🧪 Como Executar Localmente
Clone o repositório:

git clone https://github.com/squad-black/nexus-logistica.git
Acesse a pasta do projeto:

cd nexus-logistica
Abra o arquivo index.html em qualquer navegador moderno (Chrome, Firefox, Edge, Safari)

⚠️ Não é necessário servidor local ou dependências adicionais — o projeto roda diretamente no navegador.

https://hemriquep848-svg.github.io/dashboard/
👥 Squad Black - New Ciência de Dados
Este projeto foi desenvolvido como parte da disciplina AMT01 - Armazenamento, Manipulação e Transformação de Dados, com foco em:

Aplicação prática de conceitos de manipulação de dados

Criação de dashboards interativos para tomada de decisão

Visualização de dados com Chart.js

Desenvolvimento front-end com HTML, CSS e JavaScript puro

Contribuições do Squad:
Membro	Contribuição
Data Analytics	Definição da lógica de negócio e métricas de atraso
Front-End Development	Implementação do dashboard, gráficos e responsividade
Quality Assurance	Testes de usabilidade e validação dos cálculos
Documentação	Elaboração do README e manuais de uso
📚 Aprendizados e Importância Educacional
O projeto foi extremamente útil para o squad Black New Ciência de Dados pois permitiu:

🧠 Compreender na prática como dados brutos são transformados em insights visuais

📊 Explorar diferentes tipos de gráficos e entender qual se aplica melhor a cada tipo de dado

🔧 Desenvolver habilidades em JavaScript puro sem depender de frameworks

🎨 Aplicar conceitos de UX/UI para criar uma experiência intuitiva

📈 Entender a importância da priorização de dados críticos para negócios

🔄 Praticar agregações e manipulações de arrays em JavaScript

🗄️ Compreender a diferença entre dados estáticos (mock) e dinâmicos (API + BD)

Importância do Banco de Dados em Aplicações Reais
Embora este projeto utilize dados estáticos para demonstração, em um ambiente de produção real seria essencial conectar o dashboard a um banco de dados (como PostgreSQL, MySQL ou MongoDB) através de uma API. Isso permitiria:

Persistência dos dados entre sessões

Atualização em tempo real conforme novas entregas são registradas

Escalabilidade para grandes volumes de dados

Segurança e controle de acesso aos dados sensíveis

Histórico e auditoria das operações logísticas

🖼️ Paleta de Cores
Elemento	Cor	Código
Fundo principal	Azul escuro gradiente	#0f172a → #1e3a5f
Sidebar	Azul petróleo	rgba(15, 23, 42, 0.85)
Cards KPI	Azul gradiente	#3b82f6 → #2563eb
Destaque/Contraste	Laranja vibrante	#f97316
Texto principal	Branco	#ffffff
Texto secundário	Azul claro	#93c5fd
Bordas	Azul médio	rgba(59, 130, 246, 0.3)
📄 Licença
Este projeto é de uso educacional e pode ser livremente utilizado, modificado e distribuído para fins de aprendizado.

🙏 Agradecimentos
Professores e Coordenadores do curso de Ciência de Dados

Equipe do Squad Black pela dedicação e colaboração

Comunidade open-source pelo suporte e documentação do Chart.js

📌 "Transformar dados em decisões — esse é o futuro da logística."

Squad Black New Ciência de Dados · AMT01 · 2026
