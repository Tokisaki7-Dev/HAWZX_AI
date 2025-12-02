#!/bin/bash
echo "🔧 Iniciando modo desenvolvimento..."

# Terminal 1: Backend
(cd backend && python app.py) &
BACKEND_PID=$!

# Terminal 2: Frontend
(cd frontend && npm run dev) &
FRONTEND_PID=$!

# Aguardar término
wait  
