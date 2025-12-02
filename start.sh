#!/bin/bash
set -e

echo "=== Iniciando HAWZX-AI ==="

# Verificar se está em desenvolvimento
if [ "$1" == "dev" ]; then
  echo "🚀 Modo desenvolvimento"
  
  # Iniciar backend em background
  cd backend
  python app.py &
  BACKEND_PID=$!
  cd ..
  
  # Iniciar frontend
  cd frontend
  npm run dev
  cd ..
  
  # Cleanup
  kill $BACKEND_PID
else
  echo "🚀 Modo produção"
  cd backend
  python app.py &
  cd ../frontend
  npm run build
  npm start
fi
