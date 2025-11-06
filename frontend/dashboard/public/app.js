const { useState, useEffect } = React;

function Dashboard() {
  const [data, setData] = useState({
    metrics: { total_customers: 1250, total_revenue: 125000, avg_order_value: 85.50 },
    salesData: [],
    productsData: []
  });

  return React.createElement('div', {
    style: {
      display: 'flex',
      minHeight: '100vh',
      backgroundColor: '#0a0e27',
      color: 'white',
      fontFamily: 'Roboto, sans-serif'
    }
  }, [
    // Sidebar
    React.createElement('div', {
      key: 'sidebar',
      style: {
        width: '240px',
        backgroundColor: '#1e293b',
        padding: '20px',
        position: 'fixed',
        height: '100vh'
      }
    }, [
      React.createElement('h2', { key: 'logo', style: { color: '#1976d2', textAlign: 'center' } }, 'KEA BI'),
      React.createElement('nav', { key: 'nav' }, [
        React.createElement('div', { key: 'item1', style: { padding: '10px', margin: '5px 0', cursor: 'pointer' } }, '📊 Dashboard'),
        React.createElement('div', { key: 'item2', style: { padding: '10px', margin: '5px 0', cursor: 'pointer' } }, '📈 Vendas'),
        React.createElement('div', { key: 'item3', style: { padding: '10px', margin: '5px 0', cursor: 'pointer' } }, '👥 Clientes'),
        React.createElement('div', { key: 'item4', style: { padding: '10px', margin: '5px 0', cursor: 'pointer' } }, '📋 Relatórios')
      ])
    ]),
    
    // Main Content
    React.createElement('div', {
      key: 'main',
      style: {
        marginLeft: '240px',
        padding: '20px',
        width: 'calc(100% - 240px)'
      }
    }, [
      // Metrics Cards
      React.createElement('div', {
        key: 'metrics',
        style: {
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '20px',
          marginBottom: '30px'
        }
      }, [
        React.createElement('div', {
          key: 'card1',
          style: {
            backgroundColor: '#1e293b',
            padding: '20px',
            borderRadius: '8px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.3)'
          }
        }, [
          React.createElement('h3', { key: 'title1', style: { color: '#1976d2', margin: '0 0 10px 0' } }, 'Total Clientes'),
          React.createElement('p', { key: 'value1', style: { fontSize: '24px', margin: 0 } }, data.metrics.total_customers)
        ]),
        React.createElement('div', {
          key: 'card2',
          style: {
            backgroundColor: '#1e293b',
            padding: '20px',
            borderRadius: '8px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.3)'
          }
        }, [
          React.createElement('h3', { key: 'title2', style: { color: '#2e7d32', margin: '0 0 10px 0' } }, 'Receita Total'),
          React.createElement('p', { key: 'value2', style: { fontSize: '24px', margin: 0 } }, `R$ ${data.metrics.total_revenue?.toLocaleString()}`)
        ]),
        React.createElement('div', {
          key: 'card3',
          style: {
            backgroundColor: '#1e293b',
            padding: '20px',
            borderRadius: '8px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.3)'
          }
        }, [
          React.createElement('h3', { key: 'title3', style: { color: '#ed6c02', margin: '0 0 10px 0' } }, 'Ticket Médio'),
          React.createElement('p', { key: 'value3', style: { fontSize: '24px', margin: 0 } }, `R$ ${data.metrics.avg_order_value?.toFixed(2)}`)
        ])
      ]),
      
      // Charts Area
      React.createElement('div', {
        key: 'charts',
        style: {
          display: 'grid',
          gridTemplateColumns: '2fr 1fr',
          gap: '20px',
          marginBottom: '30px'
        }
      }, [
        React.createElement('div', {
          key: 'chart1',
          style: {
            backgroundColor: '#1e293b',
            padding: '20px',
            borderRadius: '8px',
            height: '300px'
          }
        }, [
          React.createElement('h3', { key: 'chartTitle1' }, 'Vendas Mensais'),
          React.createElement('div', { 
            key: 'chartContent1',
            style: { 
              height: '200px', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              color: '#666'
            } 
          }, 'Gráfico de Vendas')
        ]),
        React.createElement('div', {
          key: 'chart2',
          style: {
            backgroundColor: '#1e293b',
            padding: '20px',
            borderRadius: '8px',
            height: '300px'
          }
        }, [
          React.createElement('h3', { key: 'chartTitle2' }, 'Top Produtos'),
          React.createElement('div', { 
            key: 'chartContent2',
            style: { 
              height: '200px', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              color: '#666'
            } 
          }, 'Gráfico de Produtos')
        ])
      ])
    ])
  ]);
}

ReactDOM.render(React.createElement(Dashboard), document.getElementById('root'));