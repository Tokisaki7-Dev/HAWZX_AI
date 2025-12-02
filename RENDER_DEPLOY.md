# 🚀 Deploy HAWZX-AI no Render (MAIS FÁCIL)

## ✨ Por que Render?
- ✅ Totalmente grátis (tier gratuito permanente)
- ✅ Deploy automático via Git
- ✅ Mais simples que Railway
- ✅ PostgreSQL grátis incluso

## 📋 Passo a Passo (5 minutos)

### 1. Criar Conta
```
1. Acesse: https://render.com
2. Clique "Get Started"
3. Faça login com GitHub
```

### 2. Deploy Automático

#### Opção A: Blueprint (1 Clique) ⭐ RECOMENDADO
```
1. Faça push do código:
   git add .
   git commit -m "Deploy no Render"
   git push

2. No Render Dashboard:
   - Clique "New +"
   - Selecione "Blueprint"
   - Conecte seu repositório HAWZX-AI
   - Render detecta o render.yaml automaticamente
   - Clique "Apply"
```

#### Opção B: Manual
```
1. No Render Dashboard, clique "New +"
2. Selecione "Web Service"
3. Conecte seu GitHub e selecione HAWZX-AI
4. Configure:
   - Name: hawzx-ai
   - Runtime: Python 3
   - Build Command: pip install -r requirements.txt
   - Start Command: gunicorn --chdir backend app:app --bind 0.0.0.0:$PORT
   - Plan: Free
```

### 3. Adicionar Variáveis de Ambiente

No painel do seu serviço:
```
1. Vá em "Environment"
2. Adicione:

FLASK_DEBUG=False
SECRET_KEY=hawzx-secret-2024
OPENAI_API_KEY=sua-openai-key-aqui
FLASK_HOST=0.0.0.0
CORS_ORIGINS=*
```

### 4. Adicionar PostgreSQL (Opcional)

Se precisar de banco de dados:
```
1. No Dashboard, clique "New +"
2. Selecione "PostgreSQL"
3. Name: hawzx-db
4. Plan: Free
5. Copie a "Internal Database URL"
6. Adicione ao serviço como variável:
   DATABASE_URL=postgres://...
```

### 5. URL Final

Após deploy:
```
✅ Seu app estará em: https://hawzx-ai.onrender.com
```

## 🎯 Tier Gratuito

**Render Free Tier:**
- ✅ 750 horas/mês (grátis para sempre)
- ✅ 512MB RAM
- ✅ Deploy automático
- ⚠️ Sleep após 15 min inativo (acorda em ~30s)
- ✅ PostgreSQL 90 dias grátis

## 🔧 Troubleshooting

### App não inicia
```bash
# Ver logs em tempo real no Dashboard
# Ou via CLI:
curl -X GET https://hawzx-ai.onrender.com/api/health
```

### Build falha
```
- Verifique requirements.txt
- Certifique-se que gunicorn está incluído
- Veja logs no Dashboard: "Logs" tab
```

### Sleep mode
```
Para manter ativo 24/7:
- Upgrade para plan pago ($7/mês)
- Ou use um ping service gratuito:
  https://uptimerobot.com (pinga a cada 5 min)
```

## 🌐 Deploy Frontend Separado

Para hospedar o frontend Next.js:

### No Vercel (Recomendado para frontend)
```
1. Acesse: https://vercel.com
2. Import Git Repository
3. Selecione HAWZX-AI
4. Root Directory: frontend
5. Framework: Next.js (detectado automaticamente)
6. Environment Variable:
   NEXT_PUBLIC_API_URL=https://hawzx-ai.onrender.com
7. Deploy
```

## 📊 Alternativas Grátis

Se Render não funcionar:

### 1. **Fly.io**
- Comando: `fly launch`
- 3 VMs grátis
- Mais complexo

### 2. **Koyeb** 
- Similar ao Render
- Deploy via Git
- Tier grátis generoso

### 3. **Cyclic.sh**
- Serverless
- Deploy via GitHub
- Limitado a Node.js (não serve)

## ✅ Checklist Final

Antes de fazer deploy:
- [ ] Código commitado no Git
- [ ] requirements.txt atualizado
- [ ] render.yaml criado
- [ ] OpenAI API Key pronta
- [ ] Conta Render criada

---

**Pronto!** Com Render é muito mais simples que Railway.
Deploy em 2 minutos! 🚀
