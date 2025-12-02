#!/bin/bash
set -e

echo "=== Iniciando HAWZX-AI no Railway ==="

# Porta dinâmica do Railway
export PORT=${PORT:-3000}
export FLASK_PORT=${FLASK_PORT:-5000}

echo "🔧 Backend na porta: $FLASK_PORT"
echo "🌐 Frontend na porta: $PORT"

# Iniciar backend em background
cd backend
python app.py &
BACKEND_PID=$!
echo "✓ Backend iniciado (PID: $BACKEND_PID)"
cd ..

# Build e iniciar frontend
cd frontend
npm run build
echo "✓ Frontend build concluído"
npm start -- -p $PORT &
FRONTEND_PID=$!
echo "✓ Frontend iniciado (PID: $FRONTEND_PID)"

# Manter o processo vivo
wait
