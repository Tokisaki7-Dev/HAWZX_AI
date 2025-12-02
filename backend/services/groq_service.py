import os
import requests
from dotenv import load_dotenv

load_dotenv()

class GroqService:
    def __init__(self):
        self.api_key = os.getenv('GROQ_API_KEY')
        if not self.api_key:
            raise ValueError('GROQ_API_KEY não está configurada')
        self.base_url = 'https://api.groq.com/openai/v1'
        self.headers = {
            'Authorization': f'Bearer {self.api_key}',
            'Content-Type': 'application/json'
        }
    
    def generate_text(self, prompt, model='mixtral-8x7b-32768'):
        """Gera texto usando Groq"""
        try:
            response = requests.post(
                f'{self.base_url}/chat/completions',
                headers=self.headers,
                json={
                    'model': model,
                    'messages': [{'role': 'user', 'content': prompt}],
                    'temperature': 0.7,
                    'max_tokens': 1024
                }
            )
            
            if response.status_code == 200:
                data = response.json()
                return {
                    'success': True,
                    'content': data['choices'][0]['message']['content'],
                    'model': model
                }
            else:
                return {
                    'success': False,
                    'error': f'Erro {response.status_code}',
                    'model': model
                }
        except Exception as e:
            return {
                'success': False,
                'error': str(e),
                'model': model
            }
    
    def code_generation(self, description):
        """Gera código a partir de descrição"""
        prompt = f"Gere código Python para: {description}"
        return self.generate_text(prompt)
    
    def code_review(self, code):
        """Revisa código"""
        prompt = f"Revise o seguinte código e aponte melhorias:\n\n{code}"
        return self.generate_text(prompt)

groq_service = GroqService()
