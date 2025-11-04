from .providers import LLMManager

class AnalyticsLLM:
    def __init__(self):
        self.llm_manager = LLMManager()
    
    def analyze_sales_trend(self, sales_data: list) -> str:
        prompt = f"""
        Analise os dados de vendas abaixo e forneça insights sobre tendências:
        {sales_data}
        
        Forneça uma análise concisa sobre:
        1. Tendência geral
        2. Períodos de pico
        3. Recomendações
        """
        return self.llm_manager.get_response(prompt)
    
    def generate_product_insights(self, product_data: list) -> str:
        prompt = f"""
        Com base nos dados de produtos abaixo, gere insights de negócio:
        {product_data}
        
        Analise:
        1. Produtos mais performáticos
        2. Oportunidades de melhoria
        3. Estratégias recomendadas
        """
        return self.llm_manager.get_response(prompt)
    
    def interpret_metrics(self, metrics: dict) -> str:
        prompt = f"""
        Interprete as métricas de negócio:
        {metrics}
        
        Forneça:
        1. Análise do desempenho atual
        2. Comparação com benchmarks típicos
        3. Ações sugeridas
        """
        return self.llm_manager.get_response(prompt)