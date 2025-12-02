# 🚀 DEPLOY COMPLETO HAWZX-AI - PASSO A PASSO

## 📋 Stack Escolhida (100% Grátis)

```
✅ Supabase  → Banco PostgreSQL (grátis)
✅ Render    → Backend Flask (grátis)
✅ Vercel    → Frontend Next.js (grátis)
```

---

## PARTE 1: SUPABASE (Banco de Dados) 🗄️

### 1. Criar Projeto

1. Acesse: **https://supabase.com**
2. Clique **"Start your project"** ou **"New Project"**
3. Login com GitHub
4. Clique **"New Project"**:
   ```
   Organization: [Sua organização]
   Name: hawzx-ai-db
   Database Password: [COPIE E GUARDE!] (gere senha forte)
   Region: South America (São Paulo)
   Pricing Plan: Free
   ```
5. Clique **"Create new project"**
6. ⏳ Aguarde ~2 minutos

### 2. Copiar Connection String

1. No Dashboard Supabase, vá em: **Settings** (⚙️) → **Database**
2. Role até **Connection String**
3. Selecione **URI**
4. Copie a URL (algo como):
   ```
   postgresql://postgres.xxxxx:[YOUR-PASSWORD]@aws-0-sa-east-1.pooler.supabase.com:5432/postgres
   ```
5. **IMPORTANTE:** Substitua `[YOUR-PASSWORD]` pela senha que você criou!

### 3. Criar Tabelas (Opcional)

1. Vá em **SQL Editor** no menu lateral
2. Cole e execute este SQL:

```sql
-- Tabela de usuários
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Tabela de conversas
CREATE TABLE IF NOT EXISTS conversations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  title TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Tabela de mensagens
CREATE TABLE IF NOT EXISTS messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id UUID REFERENCES conversations(id) ON DELETE CASCADE,
  role TEXT NOT NULL CHECK (role IN ('user', 'assistant', 'system')),
  content TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Índices para performance
CREATE INDEX idx_conversations_user ON conversations(user_id);
CREATE INDEX idx_messages_conversation ON messages(conversation_id);
```

3. Clique **"Run"** (▶️)

✅ **SUPABASE PRONTO!** Guarde a Database URL!

---

## PARTE 2: RENDER (Backend Flask) 🐍

### 1. Criar Web Service

1. Acesse: **https://render.com**
2. Login com GitHub
3. Clique **"New +"** → **"Web Service"**
4. Clique **"Connect account"** e autorize GitHub
5. Procure e selecione **HAWZX-AI**
6. Clique **"Connect"**

### 2. Configurar Service

```
Name: hawzx-ai-backend
Region: Oregon (US West)
Branch: main
Root Directory: (deixe vazio)
Runtime: Python 3
Build Command: pip install -r requirements.txt
Start Command: gunicorn --chdir backend app:app --bind 0.0.0.0:$PORT
Plan: Free
```

### 3. Adicionar Variáveis de Ambiente

Antes de criar, role até **Environment Variables** e adicione:

```env
FLASK_DEBUG=False
SECRET_KEY=hawzx-production-secret-key-2024
FLASK_HOST=0.0.0.0
CORS_ORIGINS=*
PYTHONUNBUFFERED=1

# Cole a Database URL do Supabase:
DATABASE_URL=postgresql://postgres.xxxxx:[SUA-SENHA]@aws-0-sa-east-1.pooler.supabase.com:5432/postgres

# Sua OpenAI Key:
OPENAI_API_KEY=sk-proj-xxxxx
```

### 4. Deploy

1. Clique **"Create Web Service"**
2. ⏳ Aguarde 5-10 minutos (primeiro build é lento)
3. Quando aparecer **"Live"** (🟢), seu backend está no ar!
4. Copie a URL: `https://hawzx-ai-backend.onrender.com`

### 5. Testar Backend

Abra no navegador:
```
https://hawzx-ai-backend.onrender.com/
https://hawzx-ai-backend.onrender.com/api/health
```

✅ **BACKEND PRONTO!**

---

## PARTE 3: VERCEL (Frontend Next.js) ⚡

### Opção A: Via Website (Mais Fácil)

1. Acesse: **https://vercel.com**
2. Login com GitHub
3. Clique **"Add New..."** → **"Project"**
4. Procure **HAWZX-AI** e clique **"Import"**
5. Configure:
   ```
   Framework Preset: Next.js
   Root Directory: frontend
   Build Command: npm run build
   Output Directory: .next
   Install Command: npm install --legacy-peer-deps
   ```

6. **Environment Variables:**
   ```env
   NEXT_PUBLIC_API_URL=https://hawzx-ai-backend.onrender.com
   ```

7. Clique **"Deploy"**
8. ⏳ Aguarde 2-3 minutos
9. Copie a URL: `https://hawzx-ai.vercel.app`

### Opção B: Via CLI (Mais Rápido)

```powershell
# 1. Instalar Vercel CLI
npm i -g vercel

# 2. Deploy frontend
cd "C:\Users\endri\Desktop\Projetos\HAWZX-AI\frontend"
vercel

# Responda:
# - Set up and deploy? Y
# - Which scope? [sua conta]
# - Link to existing project? N
# - Project name? hawzx-ai-frontend
# - Directory? ./
# - Override settings? N

# 3. Adicionar variável de ambiente
vercel env add NEXT_PUBLIC_API_URL
# Cole: https://hawzx-ai-backend.onrender.com

# 4. Deploy em produção
vercel --prod
```

✅ **FRONTEND PRONTO!**

---

## 🎉 TUDO PRONTO! URLs Finais:

```
🌐 Frontend: https://hawzx-ai.vercel.app
🔧 Backend API: https://hawzx-ai-backend.onrender.com
🗄️ Database: Supabase (conectado ao backend)
```

---

## 🧪 Testar o Sistema Completo

1. Abra: `https://hawzx-ai.vercel.app`
2. A aplicação deve carregar
3. Teste funcionalidades (chat, etc)

---

## 🐛 Troubleshooting

### Backend não inicia no Render

1. Vá em **Logs** no painel Render
2. Procure por erros
3. Verifique se DATABASE_URL está correta
4. Verifique se OPENAI_API_KEY está configurada

### Frontend não conecta ao Backend

1. No Vercel, vá em **Settings** → **Environment Variables**
2. Verifique se `NEXT_PUBLIC_API_URL` está correta
3. Deve ser: `https://hawzx-ai-backend.onrender.com` (sem barra no final)
4. Faça **Redeploy** após alterar

### Erro CORS

1. No Render, adicione variável:
   ```
   CORS_ORIGINS=https://hawzx-ai.vercel.app
   ```
2. Redeploy o backend

### Database connection error

1. Teste a connection string do Supabase
2. Verifique se a senha está correta
3. No Supabase: Settings → Database → "Reset database password"

---

## 💰 Custos

```
✅ Supabase Free: 500MB DB, unlimited requests
✅ Render Free: 750h/mês, sleep após 15min inativo
✅ Vercel Free: 100GB bandwidth/mês, unlimited requests

TOTAL: R$ 0,00/mês 🎉
```

---

## 🚀 Próximos Passos

1. ✅ Configurar domínio customizado (opcional)
2. ✅ Adicionar autenticação Supabase Auth
3. ✅ Configurar CI/CD automático
4. ✅ Monitorar logs e performance
5. ✅ Adicionar analytics

---

**Pronto! Seu app está 100% no ar! 🎊**
