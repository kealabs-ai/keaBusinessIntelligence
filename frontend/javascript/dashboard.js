let salesChart, productsChart;

async function loadData() {
    const startDate = document.getElementById('startDate').value;
    const endDate = document.getElementById('endDate').value;
    
    if (!startDate || !endDate) {
        alert('Selecione as datas');
        return;
    }
    
    try {
        await Promise.all([
            loadSalesData(startDate, endDate),
            loadProductsData(startDate, endDate),
            loadCustomerMetrics(startDate, endDate)
        ]);
    } catch (error) {
        console.error('Erro ao carregar dados:', error);
    }
}

async function loadSalesData(startDate, endDate) {
    const response = await fetch(`/api/sales-data?start_date=${startDate}&end_date=${endDate}`);
    const data = await response.json();
    
    const ctx = document.getElementById('salesChart').getContext('2d');
    
    if (salesChart) salesChart.destroy();
    
    salesChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: data.map(item => item.month),
            datasets: [{
                label: 'Vendas Mensais',
                data: data.map(item => item.total_sales),
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1
            }]
        }
    });
}

async function loadProductsData(startDate, endDate) {
    const response = await fetch(`/api/top-products?start_date=${startDate}&end_date=${endDate}`);
    const data = await response.json();
    
    const ctx = document.getElementById('productsChart').getContext('2d');
    
    if (productsChart) productsChart.destroy();
    
    productsChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: data.map(item => item.product),
            datasets: [{
                label: 'Receita por Produto',
                data: data.map(item => item.revenue),
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1
            }]
        }
    });
}

async function loadCustomerMetrics(startDate, endDate) {
    const response = await fetch(`/api/customer-metrics?start_date=${startDate}&end_date=${endDate}`);
    const data = await response.json();
    
    document.getElementById('customerMetrics').innerHTML = `
        <h3>Métricas de Clientes</h3>
        <p>Total de Clientes: ${data.total_customers}</p>
        <p>Ticket Médio: R$ ${data.avg_order_value?.toFixed(2)}</p>
        <p>Receita Total: R$ ${data.total_revenue?.toFixed(2)}</p>
    `;
}