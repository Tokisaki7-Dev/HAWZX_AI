# 🤖 HAWZX-AI

Aplicação inteligente de análise de dados com IA usando OpenAI, com interface web (Next.js) e aplicativo desktop (Electron).

## 📋 Requisitos

- Python 3.9+
- Node.js 16+
- npm ou yarn
- OpenAI API Key

## 🚀 Inicialização Rápida

### Backend (Flask)

\\\ash
cd backend
pip install -r requirements.txt
python app.py
\\\

### Frontend (Next.js)

\\\ash
cd frontend
npm install
npm run dev
\\\

### Desktop (Electron)

\\\ash
cd desktop
npm install
npm start
\\\

## 📁 Estrutura do Projeto

\\\
HAWZX-AI/
├── backend/           # API Flask
│   ├── migrations/    # Database migrations
│   ├── app.py        # Main Flask app
│   └── requirements.txt
├── frontend/         # Next.js Web App
│   ├── src/
│   ├── pages/
│   └── package.json
├── desktop/          # Electron Desktop App
│   ├── main.js
│   ├── preload.js
│   └── package.json
├── config/           # Configuration files
├── scripts/          # Utility scripts
├── .env             # Environment variables
└── README.md
\\\

## 🔧 Configuração

1. Copie \.env.example\ para \.env\
2. Adicione sua chave da API OpenAI
3. Configure DATABASE_URL se usar PostgreSQL

## 📦 Instalação Completa

\\\ash
# Backend
python -m venv venv
source venv/bin/activate  # Windows: venv\\Scripts\\activate
pip install -r backend/requirements.txt

# Frontend
cd frontend
npm install
cd ..

# Desktop
cd desktop
npm install
cd ..
\\\

## 🎯 Desenvolvimento

\\\ash
# Terminal 1: Backend
cd backend && python app.py

# Terminal 2: Frontend
cd frontend && npm run dev

# Terminal 3: Desktop
cd desktop && npm start
\\\

## 🏗️ Build para Produção

\\\ash
# Frontend
cd frontend
npm run build

# Desktop
cd desktop
npm run dist
\\\

## 📝 Variáveis de Ambiente

\\\
FLASK_HOST=0.0.0.0
FLASK_PORT=5000
DATABASE_URL=sqlite:///hawzx.db
OPENAI_API_KEY=seu-api-key
CORS_ORIGINS=*
\\\

## 🔐 Segurança

- Nunca commit \.env\ no repositório
- Use variáveis de ambiente para chaves sensíveis
- Valide todas as entradas no backend
- Implemente autenticação JWT

## 📄 Licença

MIT License

---

Desenvolvido por HAWZX Team
