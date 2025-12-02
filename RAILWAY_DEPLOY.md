# 🚂 Deploy HAWZX-AI no Railway

## 📋 Pré-requisitos
- Conta GitHub
- Projeto commitado no Git
- OpenAI API Key

## 🚀 Passo a Passo

### 1. Criar conta Railway
```
1. Acesse: https://railway.app
2. Clique em "Login with GitHub"
3. Autorize o Railway
4. Você ganha $5 de crédito grátis/mês
```

### 2. Adicionar PostgreSQL (Opcional - se usar DB)
```
1. No Railway Dashboard, clique em "+ New"
2. Selecione "Database" → "PostgreSQL"
3. Copie a DATABASE_URL gerada
```

### 3. Deploy do Projeto

#### Opção A - Via GitHub (Recomendado)
```bash
# 1. Commitar o projeto
cd C:\Users\endri\Desktop\Projetos\HAWZX-AI
git add .
git commit -m "Preparado para Railway"
git push origin main

# 2. No Railway Dashboard
- Clique em "+ New" → "GitHub Repo"
- Selecione o repositório HAWZX-AI
- Railway detectará automaticamente e fará deploy
```

#### Opção B - Via Railway CLI
```bash
# 1. Instalar Railway CLI
npm i -g @railway/cli

# 2. Login
railway login

# 3. Iniciar projeto
cd C:\Users\endri\Desktop\Projetos\HAWZX-AI
railway init

# 4. Deploy
railway up
```

### 4. Configurar Variáveis de Ambiente

No Railway Dashboard:
```
1. Clique no seu projeto
2. Vá em "Variables"
3. Adicione:

FLASK_DEBUG=False
SECRET_KEY=seu-secret-key-aqui
FLASK_PORT=5000
FLASK_HOST=0.0.0.0
OPENAI_API_KEY=sua-openai-key-aqui
CORS_ORIGINS=*
ENVIRONMENT=production

# Se usar PostgreSQL do Railway:
DATABASE_URL=${{Postgres.DATABASE_URL}}

# URL do backend para o frontend
NEXT_PUBLIC_API_URL=https://seu-projeto.railway.app
```

### 5. Verificar Deploy

Após o deploy:
```
1. Railway gerará uma URL: https://seu-projeto.railway.app
2. Teste os endpoints:
   - GET https://seu-projeto.railway.app/
   - GET https://seu-projeto.railway.app/api/health
```

## 🔧 Estrutura dos Arquivos Configurados

✅ `railway.json` - Configuração do Railway
✅ `nixpacks.toml` - Build configuration
✅ `start.sh` - Script de inicialização
✅ `Procfile` - Fallback command
✅ `requirements.txt` - Dependências Python
✅ `runtime.txt` - Versão Python

## 📊 Monitoramento

No Railway Dashboard você pode ver:
- 📈 Logs em tempo real
- 💾 Uso de memória
- ⚡ CPU usage
- 📊 Métricas de rede

## 💰 Custos

**Tier Gratuito:**
- $5 créditos/mês (≈ 500h de execução)
- Após $5: $0.000231/min (~$10/mês para 24/7)

**Dicas para economizar:**
- Use "Sleep mode" quando não estiver usando
- Delete serviços não utilizados
- Monitore o uso no Dashboard

## 🐛 Troubleshooting

### Build falha
```bash
# Verificar logs
railway logs

# Testar localmente
bash start.sh
```

### App não responde
```
1. Verifique as variáveis de ambiente
2. Confirme que PORT está configurado
3. Veja os logs: railway logs
```

### Erro de memória
```
- Railway free tier: 512MB RAM
- Otimize requirements.txt
- Considere usar Hobby plan ($5/mês)
```

## 🔗 Links Úteis

- [Railway Docs](https://docs.railway.app)
- [Railway Discord](https://discord.gg/railway)
- [Railway Status](https://status.railway.app)

## 🎯 Próximos Passos

Após o deploy:
1. ✅ Configure domínio customizado (opcional)
2. ✅ Configure CI/CD automático
3. ✅ Adicione monitoring/alertas
4. ✅ Configure backup do banco de dados

---

**Dúvidas?** Execute: `railway help` ou acesse a documentação.
