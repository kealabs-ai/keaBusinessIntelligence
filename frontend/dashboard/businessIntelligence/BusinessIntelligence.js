const { useState, useEffect } = React;

function BusinessIntelligence() {
  const [data, setData] = useState({
    metrics: { total_customers: 1250, total_revenue: 125000, avg_order_value: 85.50 },
    salesData: [
      { month: '2023-01', total_sales: 15000 },
      { month: '2023-02', total_sales: 18000 },
      { month: '2023-03', total_sales: 22000 }
    ],
    productsData: [
      { product: 'Produto A', quantity: 150, revenue: 45000 },
      { product: 'Produto B', quantity: 120, revenue: 36000 },
      { product: 'Produto C', quantity: 100, revenue: 30000 }
    ]
  });

  useEffect(() => {
    // Fetch real data from API
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [metrics, sales, products] = await Promise.all([
        fetch('/api/customer-metrics?start_date=2023-01-01&end_date=2023-12-31').then(r => r.json()),
        fetch('/api/sales-data?start_date=2023-01-01&end_date=2023-12-31').then(r => r.json()),
        fetch('/api/top-products?start_date=2023-01-01&end_date=2023-12-31').then(r => r.json())
      ]);
      setData({ metrics, salesData: sales, productsData: products });
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
    }
  };

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
        height: '100vh',
        boxShadow: '2px 0 4px rgba(0,0,0,0.3)'
      }
    }, [
      React.createElement('div', {
        key: 'logo',
        style: {
          textAlign: 'center',
          marginBottom: '30px',
          padding: '20px 0',
          borderBottom: '1px solid #334155'
        }
      }, React.createElement('h2', { style: { color: '#1976d2', margin: 0 } }, 'KEA BI')),
      
      React.createElement('nav', { key: 'nav' }, [
        React.createElement('div', {
          key: 'item1',
          style: {
            display: 'flex',
            alignItems: 'center',
            padding: '12px 16px',
            margin: '8px 0',
            borderRadius: '8px',
            backgroundColor: '#1976d2',
            cursor: 'pointer'
          }
        }, [
          React.createElement('span', { key: 'icon1', style: { marginRight: '12px' } }, '📊'),
          React.createElement('span', { key: 'text1' }, 'Dashboard')
        ]),
        React.createElement('div', {
          key: 'item2',
          style: {
            display: 'flex',
            alignItems: 'center',
            padding: '12px 16px',
            margin: '8px 0',
            borderRadius: '8px',
            cursor: 'pointer',
            transition: 'background-color 0.2s'
          }
        }, [
          React.createElement('span', { key: 'icon2', style: { marginRight: '12px' } }, '📈'),
          React.createElement('span', { key: 'text2' }, 'Vendas')
        ]),
        React.createElement('div', {
          key: 'item3',
          style: {
            display: 'flex',
            alignItems: 'center',
            padding: '12px 16px',
            margin: '8px 0',
            borderRadius: '8px',
            cursor: 'pointer'
          }
        }, [
          React.createElement('span', { key: 'icon3', style: { marginRight: '12px' } }, '👥'),
          React.createElement('span', { key: 'text3' }, 'Clientes')
        ]),
        React.createElement('div', {
          key: 'item4',
          style: {
            display: 'flex',
            alignItems: 'center',
            padding: '12px 16px',
            margin: '8px 0',
            borderRadius: '8px',
            cursor: 'pointer'
          }
        }, [
          React.createElement('span', { key: 'icon4', style: { marginRight: '12px' } }, '📋'),
          React.createElement('span', { key: 'text4' }, 'Relatórios')
        ])
      ])
    ]),
    
    // Main Content
    React.createElement('div', {
      key: 'main',
      style: {
        marginLeft: '240px',
        padding: '30px',
        width: 'calc(100% - 240px)'
      }
    }, [
      // Header
      React.createElement('div', {
        key: 'header',
        style: { marginBottom: '30px' }
      }, React.createElement('h1', { style: { margin: 0, fontSize: '28px' } }, 'Business Intelligence Dashboard')),
      
      // Metrics Cards
      React.createElement('div', {
        key: 'metrics',
        style: {
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '24px',
          marginBottom: '40px'
        }
      }, [
        React.createElement('div', {
          key: 'card1',
          style: {
            backgroundColor: '#1e293b',
            padding: '24px',
            borderRadius: '12px',
            boxShadow: '0 4px 6px rgba(0,0,0,0.3)',
            border: '1px solid #334155'
          }
        }, [
          React.createElement('div', {
            key: 'cardHeader1',
            style: { display: 'flex', alignItems: 'center', marginBottom: '16px' }
          }, [
            React.createElement('div', {
              key: 'icon1',
              style: {
                width: '40px',
                height: '40px',
                borderRadius: '8px',
                backgroundColor: '#1976d2',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: '12px'
              }
            }, '👥'),
            React.createElement('h3', { key: 'title1', style: { margin: 0, color: '#e2e8f0' } }, 'Total Clientes')
          ]),
          React.createElement('p', {
            key: 'value1',
            style: { fontSize: '32px', fontWeight: 'bold', margin: 0, color: '#1976d2' }
          }, data.metrics.total_customers?.toLocaleString() || '0')
        ]),
        
        React.createElement('div', {
          key: 'card2',
          style: {
            backgroundColor: '#1e293b',
            padding: '24px',
            borderRadius: '12px',
            boxShadow: '0 4px 6px rgba(0,0,0,0.3)',
            border: '1px solid #334155'
          }
        }, [
          React.createElement('div', {
            key: 'cardHeader2',
            style: { display: 'flex', alignItems: 'center', marginBottom: '16px' }
          }, [
            React.createElement('div', {
              key: 'icon2',
              style: {
                width: '40px',
                height: '40px',
                borderRadius: '8px',
                backgroundColor: '#2e7d32',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: '12px'
              }
            }, '💰'),
            React.createElement('h3', { key: 'title2', style: { margin: 0, color: '#e2e8f0' } }, 'Receita Total')
          ]),
          React.createElement('p', {
            key: 'value2',
            style: { fontSize: '32px', fontWeight: 'bold', margin: 0, color: '#2e7d32' }
          }, `R$ ${(data.metrics.total_revenue || 0).toLocaleString()}`)
        ]),
        
        React.createElement('div', {
          key: 'card3',
          style: {
            backgroundColor: '#1e293b',
            padding: '24px',
            borderRadius: '12px',
            boxShadow: '0 4px 6px rgba(0,0,0,0.3)',
            border: '1px solid #334155'
          }
        }, [
          React.createElement('div', {
            key: 'cardHeader3',
            style: { display: 'flex', alignItems: 'center', marginBottom: '16px' }
          }, [
            React.createElement('div', {
              key: 'icon3',
              style: {
                width: '40px',
                height: '40px',
                borderRadius: '8px',
                backgroundColor: '#ed6c02',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: '12px'
              }
            }, '📊'),
            React.createElement('h3', { key: 'title3', style: { margin: 0, color: '#e2e8f0' } }, 'Ticket Médio')
          ]),
          React.createElement('p', {
            key: 'value3',
            style: { fontSize: '32px', fontWeight: 'bold', margin: 0, color: '#ed6c02' }
          }, `R$ ${(data.metrics.avg_order_value || 0).toFixed(2)}`)
        ])
      ]),
      
      // Charts Area
      React.createElement('div', {
        key: 'charts',
        style: {
          display: 'grid',
          gridTemplateColumns: '2fr 1fr',
          gap: '24px',
          marginBottom: '40px'
        }
      }, [
        React.createElement('div', {
          key: 'chart1',
          style: {
            backgroundColor: '#1e293b',
            padding: '24px',
            borderRadius: '12px',
            border: '1px solid #334155',
            boxShadow: '0 4px 6px rgba(0,0,0,0.3)'
          }
        }, [
          React.createElement('h3', { key: 'chartTitle1', style: { marginTop: 0, marginBottom: '20px' } }, 'Vendas Mensais'),
          React.createElement('div', {
            key: 'chartContent1',
            style: {
              height: '300px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#0f172a',
              borderRadius: '8px',
              color: '#64748b'
            }
          }, 'Gráfico de Vendas Mensais')
        ]),
        
        React.createElement('div', {
          key: 'chart2',
          style: {
            backgroundColor: '#1e293b',
            padding: '24px',
            borderRadius: '12px',
            border: '1px solid #334155',
            boxShadow: '0 4px 6px rgba(0,0,0,0.3)'
          }
        }, [
          React.createElement('h3', { key: 'chartTitle2', style: { marginTop: 0, marginBottom: '20px' } }, 'Top Produtos'),
          React.createElement('div', {
            key: 'chartContent2',
            style: {
              height: '300px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#0f172a',
              borderRadius: '8px',
              color: '#64748b'
            }
          }, 'Gráfico de Produtos')
        ])
      ]),
      
      // Data Table
      React.createElement('div', {
        key: 'table',
        style: {
          backgroundColor: '#1e293b',
          padding: '24px',
          borderRadius: '12px',
          border: '1px solid #334155',
          boxShadow: '0 4px 6px rgba(0,0,0,0.3)'
        }
      }, [
        React.createElement('h3', { key: 'tableTitle', style: { marginTop: 0, marginBottom: '20px' } }, 'Resumo de Produtos'),
        React.createElement('div', {
          key: 'tableContent',
          style: { overflowX: 'auto' }
        }, React.createElement('table', {
          style: {
            width: '100%',
            borderCollapse: 'collapse'
          }
        }, [
          React.createElement('thead', { key: 'thead' }, React.createElement('tr', {}, [
            React.createElement('th', { key: 'th1', style: { padding: '12px', textAlign: 'left', borderBottom: '1px solid #334155' } }, 'Produto'),
            React.createElement('th', { key: 'th2', style: { padding: '12px', textAlign: 'right', borderBottom: '1px solid #334155' } }, 'Quantidade'),
            React.createElement('th', { key: 'th3', style: { padding: '12px', textAlign: 'right', borderBottom: '1px solid #334155' } }, 'Receita')
          ])),
          React.createElement('tbody', { key: 'tbody' }, 
            data.productsData.slice(0, 5).map((row, index) =>
              React.createElement('tr', { key: index }, [
                React.createElement('td', { key: 'td1', style: { padding: '12px', borderBottom: '1px solid #334155' } }, row.product),
                React.createElement('td', { key: 'td2', style: { padding: '12px', textAlign: 'right', borderBottom: '1px solid #334155' } }, row.quantity),
                React.createElement('td', { key: 'td3', style: { padding: '12px', textAlign: 'right', borderBottom: '1px solid #334155' } }, `R$ ${row.revenue?.toFixed(2)}`)
              ])
            )
          )
        ]))
      ])
    ])
  ]);
}

ReactDOM.render(React.createElement(BusinessIntelligence), document.getElementById('root'));