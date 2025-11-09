import os
import sys
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from backend.data.mysql_connection import MySQLConnection
from dotenv import load_dotenv

def test_mysql_connection():
    # Carregar variáveis de ambiente
    load_dotenv()
    
    print("Testando conexao MySQL...")
    print(f"Host: {os.getenv('MYSQL_HOST')}")
    print(f"Database: {os.getenv('MYSQL_DATABASE')}")
    print(f"User: {os.getenv('MYSQL_USER')}")
    print(f"Port: {os.getenv('MYSQL_PORT')}")
    
    # Testar conexão
    db = MySQLConnection()
    
    if db.connect():
        print("OK - Conexao MySQL estabelecida com sucesso!")
        
        # Testar query simples
        try:
            result = db.execute_query("SELECT 1 as test")
            if result and result[0][0] == 1:
                print("OK - Query de teste executada com sucesso!")
            else:
                print("ERRO - Falha na query de teste")
        except Exception as e:
            print(f"ERRO - Erro na query de teste: {e}")
        
        # Testar se tabela users existe
        try:
            result = db.execute_query("SHOW TABLES LIKE 'users'")
            if result:
                print("OK - Tabela 'users' encontrada!")
                
                # Testar contagem de usuários
                count_result = db.execute_query("SELECT COUNT(*) FROM users")
                if count_result:
                    print(f"INFO - Total de usuarios: {count_result[0][0]}")
            else:
                print("AVISO - Tabela 'users' nao encontrada - execute mysql_auth_tables.sql")
        except Exception as e:
            print(f"ERRO - Erro ao verificar tabela users: {e}")
        
        db.close()
        print("INFO - Conexao fechada")
        
    else:
        print("ERRO - Falha na conexao MySQL!")
        print("Verifique:")
        print("   - Servidor MySQL esta rodando")
        print("   - Credenciais no arquivo .env")
        print("   - Banco de dados existe")
        print("   - Firewall/porta 3306")

if __name__ == "__main__":
    test_mysql_connection()