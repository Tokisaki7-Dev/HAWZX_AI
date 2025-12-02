import os

class Config:
    """Configurações base da aplicação"""
    DEBUG = os.getenv('FLASK_DEBUG', False)
    SECRET_KEY = os.getenv('SECRET_KEY', 'dev-secret-key-change-in-production')
    DATABASE_URL = os.getenv('DATABASE_URL', 'sqlite:///app.db')
    API_PORT = int(os.getenv('API_PORT', 5000))
    API_HOST = os.getenv('API_HOST', '0.0.0.0')

class DevelopmentConfig(Config):
    """Configurações de desenvolvimento"""
    DEBUG = True

class ProductionConfig(Config):
    """Configurações de produção"""
    DEBUG = False

class TestingConfig(Config):
    """Configurações de teste"""
    TESTING = True
    SQLALCHEMY_DATABASE_URI = 'sqlite:///:memory:'
