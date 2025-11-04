import os
import openai
import google.generativeai as genai
import requests
from abc import ABC, abstractmethod

class LLMProvider(ABC):
    @abstractmethod
    def generate_response(self, prompt: str) -> str:
        pass

class OpenAIProvider(LLMProvider):
    def __init__(self):
        openai.api_key = os.getenv('OPENAI_API_KEY')
    
    def generate_response(self, prompt: str) -> str:
        response = openai.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[{"role": "user", "content": prompt}],
            max_tokens=1000
        )
        return response.choices[0].message.content

class GeminiProvider(LLMProvider):
    def __init__(self):
        genai.configure(api_key=os.getenv('GEMINI_API_KEY'))
        self.model = genai.GenerativeModel('gemini-pro')
    
    def generate_response(self, prompt: str) -> str:
        response = self.model.generate_content(prompt)
        return response.text

class OllamaProvider(LLMProvider):
    def __init__(self):
        self.base_url = os.getenv('OLLAMA_BASE_URL', 'http://localhost:11434')
    
    def generate_response(self, prompt: str) -> str:
        response = requests.post(
            f"{self.base_url}/api/generate",
            json={
                "model": "llama2",
                "prompt": prompt,
                "stream": False
            }
        )
        return response.json().get('response', '')

class LLMManager:
    def __init__(self):
        self.providers = {
            'openai': OpenAIProvider(),
            'gemini': GeminiProvider(),
            'ollama': OllamaProvider()
        }
        self.default_provider = os.getenv('DEFAULT_LLM_PROVIDER', 'openai')
    
    def get_response(self, prompt: str, provider: str = None) -> str:
        provider_name = provider or self.default_provider
        if provider_name not in self.providers:
            raise ValueError(f"Provider {provider_name} not supported")
        
        return self.providers[provider_name].generate_response(prompt)