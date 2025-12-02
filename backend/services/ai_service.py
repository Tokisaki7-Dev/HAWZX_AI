import os
import openai
from dotenv import load_dotenv
import json
from typing import List, Dict, Optional

load_dotenv()

openai.api_key = os.getenv('OPENAI_API_KEY')

class AIService:
    def __init__(self):
        self.model = os.getenv('OPENAI_MODEL', 'gpt-3.5-turbo')
        self.max_tokens = int(os.getenv('OPENAI_MAX_TOKENS', 2000))
        self.temperature = float(os.getenv('OPENAI_TEMPERATURE', 0.7))
    
    def get_completion(self, messages: List[Dict], system_prompt: Optional[str] = None) -> Dict:
        try:
            if system_prompt:
                messages = [{'role': 'system', 'content': system_prompt}] + messages
            
            response = openai.ChatCompletion.create(
                model=self.model,
                messages=messages,
                max_tokens=self.max_tokens,
                temperature=self.temperature
            )
            
            return {
                'success': True,
                'content': response.choices[0].message.content,
                'tokens_used': response.usage.total_tokens,
                'model': self.model
            }
        except Exception as e:
            return {
                'success': False,
                'error': str(e)
            }
    
    def get_conversation_summary(self, messages: List[Dict]) -> str:
        try:
            prompt = 'Resuma esta conversa em uma frase curta:'
            response = openai.ChatCompletion.create(
                model=self.model,
                messages=[{'role': 'user', 'content': prompt}] + messages[-3:],
                max_tokens=100,
                temperature=0.5
            )
            return response.choices[0].message.content
        except Exception as e:
            return 'Conversa'

ai_service = AIService()
