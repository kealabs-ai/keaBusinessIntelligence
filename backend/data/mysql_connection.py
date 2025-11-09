import mysql.connector
import os
from typing import Optional, List, Tuple, Any

class MySQLConnection:
    def __init__(self):
        self.connection: Optional[mysql.connector.MySQLConnection] = None
        self.cursor: Optional[mysql.connector.cursor.MySQLCursor] = None
        
    def connect(self) -> bool:
        try:
            host = os.getenv('MYSQL_HOST')
            database = os.getenv('MYSQL_DATABASE')
            username = os.getenv('MYSQL_USER')
            password = os.getenv('MYSQL_PASSWORD')
            port = int(os.getenv('MYSQL_PORT'))
            
            self.connection = mysql.connector.connect(
                host=host,
                database=database,
                user=username,
                password=password,
                port=port
            )
            self.cursor = self.connection.cursor()
            return True
            
        except Exception as e:
            print(f"Erro ao conectar com MySQL: {e}")
            return False
    
    def execute_query(self, query: str, params: Tuple = ()) -> List[Tuple[Any, ...]]:
        if not self.cursor:
            raise Exception("Conexão não estabelecida")
        
        try:
            self.cursor.execute(query, params)
            return self.cursor.fetchall()
        except Exception as e:
            print(f"Erro ao executar query: {e}")
            return []
    
    def execute_non_query(self, query: str, params: Tuple = ()) -> bool:
        if not self.cursor:
            raise Exception("Conexão não estabelecida")
        
        try:
            self.cursor.execute(query, params)
            self.connection.commit()
            return True
        except Exception as e:
            print(f"Erro ao executar comando: {e}")
            return False
    
    def close(self):
        if self.cursor:
            self.cursor.close()
        if self.connection:
            self.connection.close()