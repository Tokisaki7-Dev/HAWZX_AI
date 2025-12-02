# HAWZX-AI 🎮🤖

Sistema inteligente de IA com interface Electron e API FastAPI, integrado com Google Gemini e Groq.

## 📁 Estrutura do Projeto

```
HAWZX-AI/
├── backend/              # API FastAPI (Python)
│   ├── app.py           # Servidor principal
│   ├── services/        # Serviços de IA
│   └── __init__.py
├── frontend/            # Interface Electron
│   ├── index.html
│   ├── renderer.js
│   └── style.css
├── docs/                # Documentação
├── data/                # Dados persistentes (não versionado)
├── main.js              # Entry point Electron
├── requirements.txt     # Dependências Python
├── package.json         # Dependências Node.js
├── nixpacks.toml        # Config Railway/Nixpacks
├── Procfile            # Config Railway
└── .env.example        # Template variáveis de ambiente
```

## 🚀 Início Rápido

### Requisitos
- Python 3.12+
- Node.js 18+
- API Keys: Google AI (Gemini) e/ou Groq

### Instalação Local

1. **Clone o repositório**
```bash
git clone <seu-repo>
cd HAWZX-AI
```

2. **Configure o ambiente Python**
```bash
python -m venv venv
venv\Scripts\activate  # Windows
# ou: source venv/bin/activate  # Linux/Mac
pip install -r requirements.txt
```

3. **Configure as variáveis de ambiente**
```bash
cp .env.example .env
# Edite .env com suas API keys
```

4. **Inicie o backend**
```bash
python -m uvicorn backend.app:app --reload --port 8000
```

5. **Inicie o frontend Electron (em outro terminal)**
```bash
npm install
npm start
```

## ☁️ Deploy Railway

O projeto está configurado para deploy automático no Railway:

1. Conecte seu repositório ao Railway
2. Configure as variáveis de ambiente:
   - `GOOGLE_AI_API_KEY`
   - `GROQ_API_KEY`
   - `PORT` (opcional, padrão: 8000)
3. O Railway usará automaticamente `nixpacks.toml` e `Procfile`

## 🔧 Desenvolvimento

### Backend (FastAPI)
- Endpoint principal: `http://localhost:8000`
- Docs interativa: `http://localhost:8000/docs`
- Health check: `http://localhost:8000/health`

### Frontend (Electron)
- Interface desktop para interação com a API
- Comunicação via HTTP com o backend

## 📚 Documentação Completa

Veja `/docs/GUIA-COMPLETO-HAWZX-AI.md` para documentação detalhada.

## 🛠️ Tecnologias

- **Backend**: FastAPI, Uvicorn, Google Generative AI, Groq
- **Frontend**: Electron, HTML/CSS/JavaScript
- **Deploy**: Railway, Nixpacks
- **IA**: Google Gemini, Groq LLMs

## 📝 Licença

Projeto desenvolvido para uso educacional e demonstração.
