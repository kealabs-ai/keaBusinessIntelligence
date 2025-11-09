-- SQL Server para dados do dashboard (via OpenVPN)
--USE business_intelligence;

-- Tabela de vendas
/*
CREATE TABLE sales (
    id INT IDENTITY(1,1) PRIMARY KEY,
    month NVARCHAR(20) NOT NULL,
    total_sales DECIMAL(15,2) NOT NULL,
    transaction_count INT NOT NULL,
    created_at DATETIME DEFAULT GETDATE()
);

-- Tabela de produtos
CREATE TABLE products (
    id INT IDENTITY(1,1) PRIMARY KEY,
    product_name NVARCHAR(100) NOT NULL,
    quantity INT NOT NULL,
    revenue DECIMAL(15,2) NOT NULL,
    created_at DATETIME DEFAULT GETDATE()
);

-- Tabela de clientes
CREATE TABLE customers (
    id INT IDENTITY(1,1) PRIMARY KEY,
    total_customers INT NOT NULL,
    avg_order_value DECIMAL(15,2) NOT NULL,
    total_revenue DECIMAL(15,2) NOT NULL,
    period_start DATE NOT NULL,
    period_end DATE NOT NULL,
    created_at DATETIME DEFAULT GETDATE()
);

-- Dados de exemplo para vendas
INSERT INTO sales (month, total_sales, transaction_count) VALUES
('Janeiro', 150000.00, 1250),
('Fevereiro', 180000.00, 1400),
('Março', 220000.00, 1600),
('Abril', 195000.00, 1350),
('Maio', 240000.00, 1750),
('Junho', 210000.00, 1500);

-- Dados de exemplo para produtos
INSERT INTO products (product_name, quantity, revenue) VALUES
('Produto A', 500, 75000.00),
('Produto B', 350, 52500.00),
('Produto C', 200, 30000.00),
('Produto D', 150, 22500.00),
('Produto E', 100, 15000.00);

-- Dados de exemplo para clientes
INSERT INTO customers (total_customers, avg_order_value, total_revenue, period_start, period_end) VALUES
(1250, 180.50, 225625.00, '2024-01-01', '2024-06-30');
*/