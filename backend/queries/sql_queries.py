class SQLQueries:
    # Consultas de exemplo - Business Intelligence
    GET_SALES_DATA = """
        SELECT 
            month,
            total_sales,
            transaction_count
        FROM sales 
        ORDER BY id
    """
    
    GET_TOP_PRODUCTS = """
        SELECT 
            product_name,
            quantity,
            revenue
        FROM products
        ORDER BY revenue DESC
    """
    
    GET_CUSTOMER_METRICS = """
        SELECT 
            total_customers,
            avg_order_value,
            total_revenue
        FROM customers
        WHERE period_start >= ? AND period_end <= ?
    """