import os
import google.generativeai as genai
from groq import Groq

class AIService:
    def __init__(self):
        # Gemini
        key = os.getenv("GOOGLE_AI_API_KEY")
        if key:
            genai.configure(api_key=key)
            self.gemini = genai.GenerativeModel('gemini-pro')
        else:
            self.gemini = None
            
        # Groq
        key = os.getenv("GROQ_API_KEY")
        if key:
            self.groq = Groq(api_key=key)
        else:
            self.groq = None
        
    async def chat(self, message: str) -> str:
        try:
            if self.gemini:
                response = self.gemini.generate_content(message)
                return response.text
            elif self.groq:
                response = self.groq.chat.completions.create(
                    model="llama3-70b-8192",
                    messages=[{"role": "user", "content": message}]
                )
                return response.choices[0].message.content
            else:
                return "❌ Configure GOOGLE_AI_API_KEY ou GROQ_API_KEY"
        except Exception as e:
            return f"❌ Erro: {str(e)}"
