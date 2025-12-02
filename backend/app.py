from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
import os
import sys
from pathlib import Path

# Adicionar pasta raiz ao path
sys.path.insert(0, str(Path(__file__).parent.parent))

from config.settings import settings
from dotenv import load_dotenv

load_dotenv()

app = FastAPI(
    title="HAWZX-AI API",
    description="Sistema inteligente de IA com integração Gemini e Groq",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
async def startup_event():
    """Evento de inicialização"""
    settings.validate()
    print(f"🚀 HAWZX-AI iniciado em modo: {settings.ENVIRONMENT}")

@app.get("/")
async def root():
    return {
        "message": "HAWZX-AI API Online 🎮🤖",
        "version": "1.0.0",
        "status": "operational"
    }

@app.get("/health")
async def health():
    return {
        "status": "healthy",
        "environment": settings.ENVIRONMENT,
        "gemini_configured": bool(settings.GOOGLE_AI_API_KEY),
        "groq_configured": bool(settings.GROQ_API_KEY)
    }

@app.post("/api/chat")
async def chat(message: str):
    try:
        from backend.services.ai_service import AIService
        ai = AIService()
        response = await ai.chat(message)
        return {"response": response}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    uvicorn.run(
        "backend.app:app", 
        host=settings.HOST, 
        port=settings.PORT, 
        reload=settings.DEBUG
    )
