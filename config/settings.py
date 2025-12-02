"""
Configurações do HAWZX-AI
"""
import os
from dotenv import load_dotenv

load_dotenv()

class Settings:
    """Configurações da aplicação"""
    
    # Ambiente
    ENVIRONMENT = os.getenv("ENVIRONMENT", "development")
    DEBUG = ENVIRONMENT == "development"
    
    # Servidor
    HOST = os.getenv("HOST", "0.0.0.0")
    PORT = int(os.getenv("PORT", 8000))
    
    # APIs de IA
    GOOGLE_AI_API_KEY = os.getenv("GOOGLE_AI_API_KEY", "")
    GROQ_API_KEY = os.getenv("GROQ_API_KEY", "")
    
    # Segurança
    SECRET_KEY = os.getenv("SECRET_KEY", "hawzx-secret-key-change-in-production")
    
    # CORS
    ALLOWED_ORIGINS = [
        "http://localhost:3000",
        "http://localhost:8000",
        "*"  # Remover em produção e especificar domínios
    ]
    
    @classmethod
    def validate(cls):
        """Valida configurações essenciais"""
        if not cls.GOOGLE_AI_API_KEY and not cls.GROQ_API_KEY:
            print("⚠️  AVISO: Nenhuma API key de IA configurada")
        
        if cls.ENVIRONMENT == "production" and cls.SECRET_KEY == "hawzx-secret-key-change-in-production":
            raise ValueError("SECRET_KEY deve ser alterada em produção!")
        
        return True

settings = Settings()
