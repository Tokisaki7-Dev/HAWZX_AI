# 🗄️ Deploy HAWZX-AI com Supabase

## ⚠️ IMPORTANTE: Entenda o Supabase

**Supabase NÃO é para hospedar aplicações Flask/Next.js!**

Supabase é:
- ✅ Banco de dados PostgreSQL (grátis)
- ✅ Autenticação de usuários
- ✅ Storage de arquivos
- ✅ Serverless Functions (Edge Functions)
- ❌ NÃO hospeda Flask/Python/Next.js tradicional

## 🎯 Arquitetura Recomendada

### Opção 1: Supabase + Vercel (IDEAL) ⭐

```
┌─────────────────┐
│   Vercel        │  ← Frontend Next.js
│   (Frontend)    │
└────────┬────────┘
         │
         ↓
┌─────────────────┐
│   Vercel        │  ← Backend Flask (Serverless)
│   (API Routes)  │
└────────┬────────┘
         │
         ↓
┌─────────────────┐
│   Supabase      │  ← PostgreSQL Database
│   (Database)    │
└─────────────────┘
```

### Opção 2: Supabase Edge Functions (Mais trabalho)

Reescrever backend Python → TypeScript/Deno

---

## 🚀 Implementação: Supabase + Vercel

### Passo 1: Criar Projeto no Supabase

```bash
1. Acesse: https://supabase.com
2. Clique "Start your project"
3. Login com GitHub
4. "New Project":
   - Name: hawzx-ai-db
   - Database Password: [gere uma senha forte]
   - Region: South America (São Paulo)
   - Plan: Free
5. Aguarde ~2 minutos para provisionar
```

### Passo 2: Configurar Database

No Supabase Dashboard:

```sql
-- 1. Vá em "SQL Editor"
-- 2. Cole e execute:

-- Tabela de usuários
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Tabela de conversas/chats
CREATE TABLE IF NOT EXISTS conversations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  title TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Tabela de mensagens
CREATE TABLE IF NOT EXISTS messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id UUID REFERENCES conversations(id),
  role TEXT NOT NULL, -- 'user' ou 'assistant'
  content TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Habilitar RLS (Row Level Security)
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
```

### Passo 3: Copiar Credenciais

No Supabase Dashboard → Settings → API:

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGc... (secreto!)
```

### Passo 4: Deploy Backend no Vercel

```bash
# 1. Instalar Vercel CLI
npm i -g vercel

# 2. Ir para o projeto
cd "C:\Users\endri\Desktop\Projetos\HAWZX-AI"

# 3. Criar arquivo de configuração Vercel
# (vou criar isso para você)

# 4. Deploy
vercel

# 5. Adicionar variáveis de ambiente
vercel env add SUPABASE_URL
vercel env add SUPABASE_KEY
vercel env add OPENAI_API_KEY

# 6. Redeploy
vercel --prod
```

### Passo 5: Deploy Frontend no Vercel

```bash
cd frontend
vercel

# Adicionar variáveis:
# NEXT_PUBLIC_SUPABASE_URL
# NEXT_PUBLIC_SUPABASE_ANON_KEY
# NEXT_PUBLIC_API_URL
```

---

## 📝 Opção Alternativa: Só Banco de Dados

Se você hospedar em **Render** ou **Railway**, use Supabase **APENAS como banco**:

### 1. No Supabase: Copie Database URL

Settings → Database → Connection String → URI:
```
postgresql://postgres:[PASSWORD]@db.xxx.supabase.co:5432/postgres
```

### 2. No Render/Railway: Adicione variável

```env
DATABASE_URL=postgresql://postgres:senha@db.xxx.supabase.co:5432/postgres
```

### 3. Seu Flask conecta automaticamente!

```python
# Já está no seu app.py
from sqlalchemy import create_engine
engine = create_engine(os.getenv('DATABASE_URL'))
```

---

## 💰 Limites Gratuitos Supabase

- ✅ 500MB Database
- ✅ 1GB File Storage
- ✅ 2GB Bandwidth/mês
- ✅ 50,000 usuários MAU
- ✅ Unlimited API requests
- ⚠️ Projeto pausa após 1 semana inativo

---

## 🎯 Minha Recomendação Final

### **MELHOR STACK GRATUITA:**

```
Frontend: Vercel (Next.js)
Backend: Render.com (Flask)
Database: Supabase (PostgreSQL)
```

**Por quê?**
- ✅ Tudo grátis para sempre
- ✅ Cada ferramenta no que faz melhor
- ✅ Escalável
- ✅ Fácil de configurar

---

## 🚀 Quer que eu configure isso?

Posso:
1. Criar arquivos de config para Vercel
2. Atualizar backend para conectar no Supabase
3. Fazer deploy automático

**Responda "sim" se quiser que eu continue!**
