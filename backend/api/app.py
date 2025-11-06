from flask import Flask, jsonify, request, render_template, send_from_directory
from flask_cors import CORS
from backend.data.connection import SQLServerConnection
from backend.queries.sql_queries import SQLQueries
from backend.llm.analytics import AnalyticsLLM
import os

app = Flask(__name__, 
                    template_folder='../../frontend/visualizacao',
                    static_folder='../../frontend')
CORS(app)
analytics_llm = AnalyticsLLM()

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/test')
def test():
    return jsonify({'status': 'success', 'message': 'API funcionando corretamente', 'version': '1.0'})

@app.route('/estilos/<path:filename>')
def estilos(filename):
    return send_from_directory('../../frontend/estilos', filename)

@app.route('/javascript/<path:filename>')
def javascript(filename):
    return send_from_directory('../../frontend/javascript', filename)

@app.route('/api/sales-data')
def get_sales_data():
    start_date = request.args.get('start_date')
    end_date = request.args.get('end_date')
    
    db = SQLServerConnection()
    db.connect()
    
    try:
        results = db.execute_query(SQLQueries.GET_SALES_DATA, (start_date, end_date))
        data = [{'month': row[0], 'total_sales': row[1], 'transaction_count': row[2]} for row in results]
        return jsonify(data)
    finally:
        db.close()

@app.route('/api/top-products')
def get_top_products():
    start_date = request.args.get('start_date')
    end_date = request.args.get('end_date')
    
    db = SQLServerConnection()
    db.connect()
    
    try:
        results = db.execute_query(SQLQueries.GET_TOP_PRODUCTS, (start_date, end_date))
        data = [{'product': row[0], 'quantity': row[1], 'revenue': row[2]} for row in results]
        return jsonify(data)
    finally:
        db.close()

@app.route('/api/customer-metrics')
def get_customer_metrics():
    start_date = request.args.get('start_date')
    end_date = request.args.get('end_date')
    
    db = SQLServerConnection()
    db.connect()
    
    try:
        results = db.execute_query(SQLQueries.GET_CUSTOMER_METRICS, (start_date, end_date))
        data = {'total_customers': results[0][0], 'avg_order_value': results[0][1], 'total_revenue': results[0][2]}
        return jsonify(data)
    finally:
        db.close()

@app.route('/api/analyze-sales')
def analyze_sales():
    start_date = request.args.get('start_date')
    end_date = request.args.get('end_date')
    
    db = SQLServerConnection()
    db.connect()
    
    try:
        results = db.execute_query(SQLQueries.GET_SALES_DATA, (start_date, end_date))
        data = [{'month': row[0], 'total_sales': row[1], 'transaction_count': row[2]} for row in results]
        analysis = analytics_llm.analyze_sales_trend(data)
        return jsonify({'data': data, 'analysis': analysis})
    finally:
        db.close()

@app.route('/api/analyze-products')
def analyze_products():
    start_date = request.args.get('start_date')
    end_date = request.args.get('end_date')
    
    db = SQLServerConnection()
    db.connect()
    
    try:
        results = db.execute_query(SQLQueries.GET_TOP_PRODUCTS, (start_date, end_date))
        data = [{'product': row[0], 'quantity': row[1], 'revenue': row[2]} for row in results]
        insights = analytics_llm.generate_product_insights(data)
        return jsonify({'data': data, 'insights': insights})
    finally:
        db.close()

@app.route('/api/analyze-metrics')
def analyze_metrics():
    start_date = request.args.get('start_date')
    end_date = request.args.get('end_date')
    
    db = SQLServerConnection()
    db.connect()
    
    try:
        results = db.execute_query(SQLQueries.GET_CUSTOMER_METRICS, (start_date, end_date))
        metrics = {'total_customers': results[0][0], 'avg_order_value': results[0][1], 'total_revenue': results[0][2]}
        interpretation = analytics_llm.interpret_metrics(metrics)
        return jsonify({'metrics': metrics, 'interpretation': interpretation})
    finally:
        db.close()

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)