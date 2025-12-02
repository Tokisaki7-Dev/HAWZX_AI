# 📚 HAWZX-AI - Guia de Setup

## Pré-requisitos

- Python 3.11+
- Node.js 18+
- npm ou yarn
- Git

## Instalação Rápida

### 1. Clone o repositório
\\\ash
git clone https://github.com/Tokisaki7-Dev/HAWZX_AI.git
cd HAWZX-AI
\\\

### 2. Configure as variáveis de ambiente
\\\ash
cp .env.example .env
# Edite .env com suas configurações
\\\

### 3. Execute o setup
\\\ash
bash scripts/setup.sh
\\\

### 4. Inicie a aplicação
\\\ash
npm start
# ou
bash start.sh
\\\

## Desenvolvimento

### Terminal 1 - Backend
\\\ash
cd backend
python app.py
\\\

### Terminal 2 - Frontend
\\\ash
cd frontend
npm run dev
\\\

## Estrutura do Projeto

\\\
HAWZX-AI/
├── backend/          # API Flask
│   ├── app.py
│   ├── config.py
│   ├── models.py
│   ├── routes.py
│   ├── utils/
│   └── services/
├── frontend/         # Aplicação Next.js
│   ├── src/
│   ├── public/
│   ├── components/
│   └── pages/
├── docs/            # Documentação
├── scripts/         # Scripts úteis
├── tests/           # Testes
├── config/          # Configurações
├── data/            # Dados
└── logs/            # Logs
\\\

## API Endpoints

- \GET /api/health\ - Verifica saúde da API
- \GET /api/version\ - Versão da API

## Docker

\\\ash
docker build -t hawzx-ai .
docker run -p 5000:5000 -p 3000:3000 hawzx-ai
\\\

## Deployment

- **Railway**: Ver configuração em \ailway.json\
- **Render**: Ver configuração em \ender.yaml\
- **Docker**: Ver \Dockerfile\

## Contribuindo

1. Crie uma branch para sua feature
2. Commit suas mudanças
3. Push para a branch
4. Abra um Pull Request

## License

MIT License - Veja LICENSE
