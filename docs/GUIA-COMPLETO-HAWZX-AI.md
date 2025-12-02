# 🎮 HAWZX-AI - GUIA COMPLETO DE CRIAÇÃO

> **Guia definitivo do zero até produção em cloud**
> Versão 1.0 - Dezembro 2024

---

## 📑 ÍNDICE

1. [Visão Geral](#visao-geral)
2. [Requisitos e Instalação](#requisitos)
3. [Estrutura do Projeto](#estrutura)
4. [Backend FastAPI](#backend)
5. [Frontend Electron](#frontend)
6. [Integração de IA](#ia)
7. [Deploy Railway](#deploy)
8. [Gerenciamento Pós-Deploy](#gerenciamento-pos-deploy)
    8.1. [Variáveis de Ambiente](#variaveis-ambiente)
9. [Troubleshooting](#troubleshooting)

---

## 1. VISÃO GERAL {#visao-geral}

### O que é HAWZX-AI?

Assistente de IA para jogos com:
- ✅ Análise de gameplay em tempo real
- ✅ Dicas e estratégias personalizadas  
- ✅ Chat inteligente com IA
- ✅ Interface desktop moderna

### Stack

**Backend:** Python 3.11 + FastAPI + Uvicorn
**IA:** Google Gemini Pro + Groq LLaMA 3 (GRÁTIS)
**Frontend:** Electron + HTML/CSS/JS
**Deploy:** Railway (Plano grátis $5/mês)

---

## 2. REQUISITOS {#requisitos}

### Software

```powershell
# Windows - Instalar tudo
winget install Python.Python.3.11
winget install OpenJS.NodeJS.LTS
winget install Git.Git
winget install Microsoft.VisualStudioCode
```

### Contas Grátis

1. **Google AI Studio:** https://makersuite.google.com/app/apikey
2. **Groq Cloud:** https://console.groq.com
3. **GitHub:** https://github.com
4. **Railway:** https://railway.app

---

## 3. ESTRUTURA {#estrutura}

```
HAWZX-AI/
├── backend/
│   ├── app.py                  # FastAPI principal
│   └── services/
│       └── ai_service.py       # Serviço de IA
├── frontend/
│   ├── index.html
│   ├── style.css
│   └── renderer.js
├── .env                        # Suas keys (NÃO commitar)
├── .gitignore
├── requirements.txt            # Dependências Python
├── package.json               # Dependências Node
├── main.js                    # Electron
├── Procfile                   # Railway
├── railway.json               # Config Railway
└── runtime.txt                # Python 3.11
```

---

## 4. BACKEND {#backend}

### Criar Projeto

```bash
mkdir HAWZX-AI
cd HAWZX-AI

# Ambiente virtual
python -m venv venv
.\venv\Scripts\activate

# Estrutura
mkdir backend frontend data
mkdir backend\services
```

### requirements.txt

```txt
fastapi==0.104.1
uvicorn[standard]==0.24.0
python-dotenv==1.0.0
google-generativeai==0.3.1
groq==0.4.1
requests==2.31.0
```

```bash
pip install -r requirements.txt
```

### backend/app.py

```python
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
import os
from dotenv import load_dotenv

load_dotenv()

app = FastAPI(title="HAWZX-AI API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {
        "message": "HAWZX-AI API Online 🎮",
        "version": "1.0.0"
    }

@app.get("/health")
async def health():
    return {
        "status": "healthy",
        "gemini": bool(os.getenv("GOOGLE_AI_API_KEY")),
        "groq": bool(os.getenv("GROQ_API_KEY"))
    }

@app.post("/api/chat")
async def chat(message: str):
    try:
        from backend.services.ai_service import AIService
        ai = AIService()
        response = await ai.chat(message)
        return {"response": response}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    port = int(os.getenv("PORT", 8000))
    uvicorn.run("app:app", host="0.0.0.0", port=port, reload=True)
```

### backend/services/ai_service.py

```python
import os
import google.generativeai as genai
from groq import Groq

class AIService:
    def __init__(self):
        # Gemini
        key = os.getenv("GOOGLE_AI_API_KEY")
        if key:
            genai.configure(api_key=key)
            self.gemini = genai.GenerativeModel('gemini-pro')
        else:
            self.gemini = None
            
        # Groq
        key = os.getenv("GROQ_API_KEY")
        if key:
            self.groq = Groq(api_key=key)
        else:
            self.groq = None
        
    async def chat(self, message: str) -> str:
        try:
            if self.gemini:
                response = self.gemini.generate_content(message)
                return response.text
            elif self.groq:
                response = self.groq.chat.completions.create(
                    model="llama3-70b-8192",
                    messages=[{"role": "user", "content": message}]
                )
                return response.choices[0].message.content
            else:
                return "❌ Configure GOOGLE_AI_API_KEY ou GROQ_API_KEY"
        except Exception as e:
            return f"❌ Erro: {str(e)}"
```

### backend/__init__.py

```python
# Arquivo vazio (necessário para imports)
```

### .env

```env
GOOGLE_AI_API_KEY=AIza...sua-key
GROQ_API_KEY=gsk_...sua-key
PORT=8000
```

### Testar

```bash
python backend/app.py
# Acesse: http://localhost:8000/docs
```

---

## 5. FRONTEND {#frontend}

### package.json

```json
{
  "name": "hawzx-ai",
  "version": "1.0.0",
  "main": "main.js",
  "scripts": {
    "start": "electron ."
  },
  "devDependencies": {
    "electron": "^28.0.0"
  }
}
```

```bash
npm install
```

### main.js

```javascript
const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true
    }
  });

  win.loadFile('frontend/index.html');
}

app.whenReady().then(createWindow);
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
```

### frontend/index.html

```html
<!DOCTYPE html>
<html>
<head>
    <title>HAWZX-AI</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="container">
        <h1>🎮 HAWZX-AI</h1>
        <div id="chat"></div>
        <div class="input-box">
            <input id="input" type="text" placeholder="Digite sua mensagem...">
            <button onclick="send()">Enviar</button>
        </div>
    </div>
    <script src="renderer.js"></script>
</body>
</html>
```

### frontend/style.css

```css
* { margin: 0; padding: 0; box-sizing: border-box; }

body {
    font-family: 'Segoe UI', sans-serif;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
}

.container {
    width: 800px;
    height: 600px;
    background: white;
    border-radius: 20px;
    padding: 20px;
    display: flex;
    flex-direction: column;
}

h1 {
    text-align: center;
    color: #667eea;
    margin-bottom: 20px;
}

#chat {
    flex: 1;
    overflow-y: auto;
    border: 2px solid #f0f0f0;
    border-radius: 10px;
    padding: 15px;
    margin-bottom: 15px;
}

.message {
    margin: 10px 0;
    padding: 10px 15px;
    border-radius: 15px;
    max-width: 70%;
}

.user {
    background: #667eea;
    color: white;
    margin-left: auto;
}

.ai {
    background: #f0f0f0;
    color: #333;
}

.input-box {
    display: flex;
    gap: 10px;
}

input {
    flex: 1;
    padding: 12px;
    border: 2px solid #e0e0e0;
    border-radius: 25px;
    font-size: 14px;
}

button {
    padding: 12px 30px;
    background: #667eea;
    color: white;
    border: none;
    border-radius: 25px;
    cursor: pointer;
    font-weight: bold;
}

button:hover {
    background: #5568d3;
}
```

### frontend/renderer.js

```javascript
const API = 'http://localhost:8000';
const chat = document.getElementById('chat');
const input = document.getElementById('input');

function addMessage(text, isUser) {
    const div = document.createElement('div');
    div.className = `message ${isUser ? 'user' : 'ai'}`;
    div.textContent = text;
    chat.appendChild(div);
    chat.scrollTop = chat.scrollHeight;
}

async function send() {
    const msg = input.value.trim();
    if (!msg) return;
    
    addMessage(msg, true);
    input.value = '';
    
    try {
        const res = await fetch(`${API}/api/chat?message=${encodeURIComponent(msg)}`, {
            method: 'POST'
        });
        const data = await res.json();
        addMessage(data.response, false);
    } catch (err) {
        addMessage('❌ Erro: Backend offline', false);
    }
}

input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') send();
});
```

### Testar

```bash
npm start
```

---

## 6. INTEGRAÇÃO IA {#ia}

### Pegar API Keys

**1. Google AI Studio (Gemini):**
- Acesse: https://makersuite.google.com/app/apikey
- Login com Google
- "Create API Key"
- Copie (começa com `AIza...`)

**2. Groq Cloud (LLaMA 3):**
- Acesse: https://console.groq.com
- Login com GitHub
- "API Keys" → "Create"
- Copie (começa com `gsk_...`)

### Configurar .env

```env
GOOGLE_AI_API_KEY=AIza...sua-key-aqui
GROQ_API_KEY=gsk_...sua-key-aqui
PORT=8000
```

---

## 7. DEPLOY RAILWAY {#deploy}

### Arquivos Railway

**railway.json:**
```json
{
  "build": {
    "builder": "NIXPACKS"
  },
  "deploy": {
    "startCommand": "uvicorn backend.app:app --host 0.0.0.0 --port $PORT"
  }
}
```

**Procfile:**
```
web: uvicorn backend.app:app --host 0.0.0.0 --port $PORT
```

**runtime.txt:**
```
python-3.11.0
```

### Push GitHub

```bash
git init
git config user.email "seu@email.com"
git config user.name "Seu Nome"
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/SEU-USUARIO/HAWZX-AI.git
git branch -M main
git push -u origin main
```

### Deploy

1. **Railway:** https://railway.app
2. **Login** com GitHub
3. **New Project** → Deploy from GitHub
4. Selecione **HAWZX-AI**
5. **Variables:**
   - GOOGLE_AI_API_KEY
   - GROQ_API_KEY
   - PORT=8000
6. **Deploy** (aguarde 2-3 min)
7. **Domínio:** `seu-app.up.railway.app`

---

## 9. TROUBLESHOOTING {#troubleshooting}

### Build Failed

**Erro:** "Could not determine how to build"
**Solução:** 
- Verifique `railway.json`, `Procfile`, `runtime.txt` na raiz
- Root Directory: deixe vazio

### API Keys

**Erro:** 401/403
**Solução:**
- Regenere keys
- Adicione no Railway (aba Variables)
- Redeploy

### Build Timeout

**Erro:** "Build timed out"
**Solução:**
- Use apenas dependências mínimas
- Remova `torch`, `transformers`

### Port em Uso

```powershell
# Windows
netstat -ano | findstr :8000
taskkill /PID <PID> /F
```

---

## 🎯 CHECKLIST

### Local
- [ ] Python 3.11 OK
- [ ] Node.js 18+ OK
- [ ] Dependencies instaladas
- [ ] .env com API keys
- [ ] Backend rodando (8000)
- [ ] Frontend abrindo

### Deploy
- [ ] GitHub OK
- [ ] Railway OK
- [ ] Variables configuradas
- [ ] Build success
- [ ] Domínio funcionando

---

## 📚 RECURSOS

**Docs:**
- FastAPI: https://fastapi.tiangolo.com
- Gemini: https://ai.google.dev/docs
- Railway: https://docs.railway.app

**Suporte:**
- GitHub Issues
- Discord: [Criar servidor]

---

**🎮 Bom desenvolvimento!**

*Guia v1.0 - Dez 2024*
