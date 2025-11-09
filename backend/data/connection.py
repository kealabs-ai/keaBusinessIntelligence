import pyodbc
import os
from dotenv import load_dotenv

load_dotenv()

class SQLServerConnection:
    def __init__(self):
        self.server = os.getenv('SQLSERVER_HOST', '10.8.0.1')
        self.database = os.getenv('SQLSERVER_DATABASE', 'business_intelligence')
        self.username = os.getenv('SQLSERVER_USER', 'sa')
        self.password = os.getenv('SQLSERVER_PASSWORD', '')
        self.connection = None
    
    def connect(self):
        connection_string = f'DRIVER={{ODBC Driver 17 for SQL Server}};SERVER={self.server};DATABASE={self.database};UID={self.username};PWD={self.password}'
        self.connection = pyodbc.connect(connection_string)
        return self.connection
    
    def execute_query(self, query, params=None):
        cursor = self.connection.cursor()
        if params:
            cursor.execute(query, params)
        else:
            cursor.execute(query)
        return cursor.fetchall()
    
    def close(self):
        if self.connection:
            self.connection.close()