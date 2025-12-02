#!/bin/bash
set -e

echo "=== Setup HAWZX-AI ==="

# Backend
echo "📦 Instalando dependências do Backend..."
cd backend
pip install -r ../requirements.txt
cd ..

# Frontend
echo "📦 Instalando dependências do Frontend..."
cd frontend
npm install
cd ..

echo "✅ Setup concluído com sucesso!"
echo ""
echo "Para iniciar a aplicação:"
echo "  Terminal 1: cd backend && python app.py"
echo "  Terminal 2: cd frontend && npm run dev"
