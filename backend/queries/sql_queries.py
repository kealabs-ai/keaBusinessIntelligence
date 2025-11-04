class SQLQueries:
    # Consultas de exemplo - Business Intelligence
    GET_SALES_DATA = """
        SELECT 
            DATE_FORMAT(sale_date, '%Y-%m') as month,
            SUM(amount) as total_sales,
            COUNT(*) as transaction_count
        FROM sales 
        WHERE sale_date >= ? AND sale_date <= ?
        GROUP BY DATE_FORMAT(sale_date, '%Y-%m')
        ORDER BY month
    """
    
    GET_TOP_PRODUCTS = """
        SELECT 
            p.product_name,
            SUM(s.quantity) as total_quantity,
            SUM(s.amount) as total_revenue
        FROM sales s
        JOIN products p ON s.product_id = p.id
        WHERE s.sale_date >= ? AND s.sale_date <= ?
        GROUP BY p.product_name
        ORDER BY total_revenue DESC
        LIMIT 10
    """
    
    GET_CUSTOMER_METRICS = """
        SELECT 
            COUNT(DISTINCT customer_id) as total_customers,
            AVG(amount) as avg_order_value,
            SUM(amount) as total_revenue
        FROM sales
        WHERE sale_date >= ? AND sale_date <= ?
    """