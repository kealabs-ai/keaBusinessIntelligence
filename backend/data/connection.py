import pyodbc
import os
from dotenv import load_dotenv

load_dotenv()

class SQLServerConnection:
    def __init__(self):
        self.server = os.getenv('DB_SERVER')
        self.database = os.getenv('DB_NAME')
        self.username = os.getenv('DB_USER')
        self.password = os.getenv('DB_PASSWORD')
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