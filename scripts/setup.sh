#!/bin/bash
echo "🚀 Configurando HAWZX-AI..."

# Python virtual environment
python -m venv venv

# Ativar venv
source venv/Scripts/activate 2>/dev/null || source venv/bin/activate 2>/dev/null

# Instalar dependências Python
pip install -r requirements.txt

# Instalar dependências Node
npm install

echo "✓ Configuração completa!"
echo "Para iniciar: npm start ou bash start.sh"
