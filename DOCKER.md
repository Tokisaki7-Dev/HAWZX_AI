# Docker Build
```bash
docker build -t hawzx-ai:latest .
docker run -p 8000:8000 -e ENVIRONMENT=development hawzx-ai:latest
```

# Deploy no Render

1. **Crie conta em Render**: https://render.com

2. **Conecte GitHub**:
   - New → Web Service
   - Conecte seu repositório HAWZX_AI
   - Runtime: Docker

3. **Configure variáveis**:
   - GOOGLE_AI_API_KEY: sua_chave_google
   - GROQ_API_KEY: sua_chave_groq
   - ENVIRONMENT: production

4. **Deploy automático**:
   - Render faz deploy automático a cada push
   - URL: seu-servico.onrender.com

# Local Docker

```bash
# Build
docker build -t hawzx-ai .

# Run
docker run -p 8000:8000 \
  -e GOOGLE_AI_API_KEY=sua_chave \
  -e GROQ_API_KEY=sua_chave \
  hawzx-ai

# Acessar
curl http://localhost:8000/health
curl http://localhost:8000/docs
```

# Push para Docker Hub (opcional)

```bash
docker tag hawzx-ai seu-usuario/hawzx-ai
docker push seu-usuario/hawzx-ai
```
