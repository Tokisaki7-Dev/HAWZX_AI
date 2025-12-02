# HAWZX-AI 🚀

Aplicação completa de IA com Backend Python/Flask e Frontend Next.js.

## 📋 Requisitos

- Python 3.11+
- Node.js 18+
- npm ou yarn
- Git

## 🚀 Início Rápido

### 1. Clone o repositório
\``bash
git clone https://github.com/Tokisaki7-Dev/HAWZX_AI.git
cd HAWZX-AI
\``

### 2. Configure o ambiente
\``bash
cp .env.example .env
# Edite .env com suas configurações
\``

### 3. Execute o setup
\``bash
bash scripts/setup.sh
\``

### 4. Inicie a aplicação
\``bash
# Terminal 1 - Backend
cd backend
python app.py

# Terminal 2 - Frontend
cd frontend
npm run dev
\``

## 📁 Estrutura do Projeto

\``
HAWZX-AI/
├── backend/              # API Flask
│   ├── app.py           # Aplicação principal
│   ├── config.py        # Configurações
│   ├── models.py        # Modelos de dados
│   ├── routes.py        # Rotas da API
│   ├── utils/           # Utilitários
│   ├── services/        # Serviços
│   └── __pycache__/     # Cache Python
├── frontend/            # Aplicação Next.js
│   ├── app.jsx          # Página principal
│   ├── components/      # Componentes React
│   ├── pages/           # Páginas Next.js
│   ├── public/          # Arquivos estáticos
│   ├── src/             # Código-fonte
│   ├── package.json     # Dependências
│   ├── next.config.js   # Configuração Next.js
│   └── tsconfig.json    # Configuração TypeScript
├── tests/               # Testes
│   └── test_api.py      # Testes de API
├── scripts/             # Scripts úteis
│   └── setup.sh         # Script de setup
├── docs/                # Documentação
├── config/              # Configurações
├── data/                # Dados
├── logs/                # Logs
├── .env                 # Variáveis de ambiente
├── .env.example         # Exemplo de variáveis
├── requirements.txt     # Dependências Python
├── package.json         # Dependências Node
├── Dockerfile           # Configuração Docker
├── docker-compose.yml   # Docker Compose
├── start.sh             # Script de inicialização
├── Procfile             # Configuração Heroku
├── railway.json         # Configuração Railway
├── render.yaml          # Configuração Render
└── README.md            # Este arquivo
\``

## 🔌 API Endpoints

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | /api/health | Verifica saúde da API |
| GET | /api/version | Retorna versão da API |
| GET | /api/test | Teste da API |

## 🧪 Executar Testes

\``bash
pytest tests/
\``

## 🐳 Docker

### Build
\``bash
docker build -t hawzx-ai .
\``

### Run
\``bash
docker run -p 5000:5000 -p 3000:3000 hawzx-ai
\``

## 🚀 Deployment

### Railway
Ver configuração em \`railway.json\`

### Render
Ver configuração em \`render.yaml\`

### Docker
Ver \`Dockerfile\`

## 📝 Variáveis de Ambiente

\``env
FLASK_DEBUG=True
FLASK_ENV=development
SECRET_KEY=sua-chave-secreta
DATABASE_URL=sqlite:///app.db
API_PORT=5000
API_HOST=0.0.0.0
\``

## 🤝 Contribuindo

1. Crie uma branch para sua feature (\`git checkout -b feature/feature-name\`)
2. Commit suas mudanças (\`git commit -m 'Add feature'\`)
3. Push para a branch (\`git push origin feature/feature-name\`)
4. Abra um Pull Request

## 📄 License

MIT License - Veja \`LICENSE\` para mais detalhes

## 👨‍💻 Autor

HAWZX-AI - Desenvolvido com ❤️
