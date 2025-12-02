import os
import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv()

class GeminiService:
    def __init__(self):
        api_key = os.getenv('GOOGLE_AI_API_KEY')
        if not api_key:
            raise ValueError('GOOGLE_AI_API_KEY não está configurada')
        genai.configure(api_key=api_key)
        self.model = genai.GenerativeModel('gemini-pro')
    
    def generate_text(self, prompt):
        """Gera texto usando Gemini"""
        try:
            response = self.model.generate_content(prompt)
            return {
                'success': True,
                'content': response.text,
                'model': 'gemini-pro'
            }
        except Exception as e:
            return {
                'success': False,
                'error': str(e),
                'model': 'gemini-pro'
            }
    
    def analyze_text(self, text):
        """Analisa texto usando Gemini"""
        prompt = f"Analise o seguinte texto e forneça insights:\n\n{text}"
        return self.generate_text(prompt)
    
    def summarize_text(self, text):
        """Resume texto"""
        prompt = f"Resuma o seguinte texto de forma concisa:\n\n{text}"
        return self.generate_text(prompt)
    
    def translate_text(self, text, target_language):
        """Traduz texto"""
        prompt = f"Traduza o seguinte texto para {target_language}:\n\n{text}"
        return self.generate_text(prompt)

gemini_service = GeminiService()
