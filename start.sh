#!/bin/bash
echo "Iniciando HAWZX-AI..."

# Backend
cd backend
python app.py &

# Frontend
cd ../frontend
npm run dev
