# 🚀 DEPLOY AGORA - COMANDOS DIRETOS

## ✅ Supabase configurado!
```
URL: https://jxhhjsireqpcdrsfaivf.supabase.co
Key: eyJhbGc...UiUWcQ
```

---

## 📝 PRÓXIMOS PASSOS:

### **1. RENDER (Backend) - FAÇA AGORA:**

1. **Acesse:** https://render.com
2. **Login com GitHub** 
3. **New + → Web Service**
4. **Conecte: HAWZX-AI**
5. **Configure exatamente assim:**

```
Name: hawzx-ai-backend
Region: Oregon (US West)
Branch: main
Root Directory: (deixe vazio)
Runtime: Python 3

Build Command:
pip install -r requirements.txt

Start Command:
gunicorn --chdir backend app:app --bind 0.0.0.0:$PORT

Plan: Free
```

6. **Environment Variables (role para baixo e adicione):**

```env
FLASK_DEBUG=False
SECRET_KEY=hawzx-production-secret-2024
FLASK_HOST=0.0.0.0
CORS_ORIGINS=*
PYTHONUNBUFFERED=1
DATABASE_URL=sqlite:///hawzx.db
```

7. **Clique em "Create Web Service"**
8. **Aguarde 10 minutos ⏳**
9. **Copie a URL quando ficar verde:** `https://hawzx-ai-backend-xxxx.onrender.com`

---

### **2. VERCEL (Frontend) - DEPOIS DO RENDER:**

1. **Acesse:** https://vercel.com
2. **Login com GitHub**
3. **Add New... → Project**
4. **Import: HAWZX-AI**
5. **Configure:**

```
Framework Preset: Next.js
Root Directory: frontend
Build Command: npm run build
Output Directory: .next
Install Command: npm install --legacy-peer-deps
```

6. **Environment Variables:**

```env
NEXT_PUBLIC_API_URL=https://hawzx-ai-backend-xxxx.onrender.com
NEXT_PUBLIC_SUPABASE_URL=https://jxhhjsireqpcdrsfaivf.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp4aGhqc2lyZXFwY2Ryc2ZhaXZmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ2NDc0MDMsImV4cCI6MjA4MDIyMzQwM30.j5zqG1Ykok_dwDcNCQnhxm0OhnwE-Yntj4mIbUiUWcQ
```

⚠️ **Substitua a URL do Render pela sua real!**

7. **Deploy**
8. **Aguarde 3 minutos ⏳**
9. **Pronto! Copie sua URL:** `https://hawzx-ai-xxxx.vercel.app`

---

## 🎉 DEPOIS DE TUDO:

### Testar:
- Backend: `https://hawzx-ai-backend-xxxx.onrender.com/`
- Frontend: `https://hawzx-ai-xxxx.vercel.app`

### URLs Finais:
```
🌐 Frontend: [sua URL Vercel]
🔧 Backend: [sua URL Render]
🗄️ Database: SQLite local + Supabase pronto
```

---

## 💰 Custo: R$ 0,00/mês 🎊

---

## ⚠️ IMPORTANTE:

- Render Free tier "dorme" após 15min inativo
- Primeira requisição demora ~30s para "acordar"
- Vercel é instantâneo sempre

---

## 🚀 COMECE AGORA:

**Passo 1:** Abra https://render.com

**Me avise quando o Render terminar de buildar!**
