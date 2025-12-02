#!/bin/bash

echo "🚀 HAWZX-AI Initialization Script"
echo "================================="

# Criar diretórios
echo "📁 Creating directories..."
mkdir -p backend/migrations
mkdir -p backend/logs
mkdir -p config/ssl
mkdir -p frontend/public/uploads

# Criar venv
echo "🐍 Creating Python virtual environment..."
python3 -m venv venv
source venv/bin/activate

# Instalar dependências
echo "📦 Installing Python dependencies..."
pip install -r requirements.txt

# Criar banco de dados
echo "🗄️  Creating database..."
python backend/app.py &
sleep 5
kill %1

echo "✅ Initialization complete!"
echo "To start the backend: python backend/app.py"
echo "To start the frontend: cd frontend && npm run dev"
