# HAWZX-AI 🎮🤖

Sistema inteligente de IA com interface Electron e API FastAPI, integrado com Google Gemini e Groq.

## 📁 Estrutura do Projeto

```
HAWZX-AI/
├── backend/              # API FastAPI (Python)
│   ├── app.py           # Servidor principal
│   ├── services/        # Serviços de IA
│   │   ├── ai_service.py
│   │   └── __init__.py
│   └── __init__.py
├── frontend/            # Interface Electron
│   ├── index.html
│   ├── renderer.js
│   └── style.css
├── config/              # Configurações
│   ├── settings.py      # Configurações centralizadas
│   └── __init__.py
├── docs/                # Documentação
│   └── GUIA-COMPLETO-HAWZX-AI.md
├── data/                # Dados persistentes (não versionado)
├── logs/                # Logs da aplicação (não versionado)
├── tests/               # Testes automatizados
├── scripts/             # Scripts auxiliares
├── main.js              # Entry point Electron
├── requirements.txt     # Dependências Python
├── package.json         # Dependências Node.js
├── nixpacks.toml        # Config Railway/Nixpacks
├── railway.json         # Config Railway Deploy
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
git clone https://github.com/Tokisaki7-Dev/HAWZX_AI
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

### Configuração Railway

1. **Conecte seu repositório ao Railway**
   - Acesse [Railway.app](https://railway.app)
   - Crie um novo projeto
   - Conecte o repositório GitHub

2. **Configure as variáveis de ambiente**
   ```
   GOOGLE_AI_API_KEY=sua_chave_google_ai
   GROQ_API_KEY=sua_chave_groq
   PORT=8000 (opcional, Railway define automaticamente)
   ENVIRONMENT=production
   SECRET_KEY=chave_secreta_forte
   ```

3. **Deploy automático**
   - O Railway usará `nixpacks.toml` e `railway.json` automaticamente
   - Build com Python 3.12
   - Deploy com uvicorn
   - Health check em `/health`

### Arquivos de Configuração Railway

**nixpacks.toml**
- Define provider Python 3.12
- Instala dependências com pip
- Configura comando de start

**railway.json**
- Configurações de deploy
- Health check
- Políticas de restart
- Variáveis de ambiente

**Procfile**
- Comando de start do uvicorn
- Fallback se railway.json não funcionar

## 🔧 Desenvolvimento

### Backend (FastAPI)
- **URL Local**: `http://localhost:8000`
- **Docs interativa**: `http://localhost:8000/docs`
- **Health check**: `http://localhost:8000/health`
- **Configurações**: `config/settings.py`

### Frontend (Electron)
- Interface desktop para interação com a API
- Comunicação via HTTP com o backend
- Hot reload em desenvolvimento

### Estrutura de Configurações

As configurações estão centralizadas em `config/settings.py`:
- Ambiente (development/production)
- APIs de IA
- CORS
- Segurança
- Servidor

## 📚 Documentação Completa

Veja `/docs/GUIA-COMPLETO-HAWZX-AI.md` para documentação detalhada.

## 🛠️ Tecnologias

- **Backend**: FastAPI, Uvicorn, Google Generative AI, Groq
- **Frontend**: Electron, HTML/CSS/JavaScript
- **Deploy**: Railway, Nixpacks
- **IA**: Google Gemini, Groq LLMs
- **Configuração**: python-dotenv, Pydantic

## 🧪 Testes

```bash
# Instalar dependências de teste
pip install pytest pytest-asyncio

# Executar testes
pytest tests/
```

## 📝 Variáveis de Ambiente

Crie um arquivo `.env` baseado em `.env.example`:

```env
# APIs de IA
GOOGLE_AI_API_KEY=sua_chave_google_ai_aqui
GROQ_API_KEY=sua_chave_groq_aqui

# Configuração do Servidor
PORT=8000
HOST=0.0.0.0

# Ambiente
ENVIRONMENT=development  # ou production

# Segurança
SECRET_KEY=sua_chave_secreta_segura
```

## 🔒 Segurança

- Nunca commite o arquivo `.env`
- Use SECRET_KEY forte em produção
- Configure CORS apropriadamente
- Valide todas as entradas de usuário

## 📄 Licença

Projeto desenvolvido para uso educacional e demonstração.

## 👨‍💻 Autor

Desenvolvido por Tokisaki7-Dev

## 🔗 Links

- **GitHub**: https://github.com/Tokisaki7-Dev/HAWZX_AI
- **Railway**: https://railway.app
- **Documentação FastAPI**: https://fastapi.tiangolo.com
- **Documentação Electron**: https://www.electronjs.org

