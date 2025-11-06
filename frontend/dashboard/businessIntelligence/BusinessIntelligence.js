const { useState, useEffect } = React;

function BusinessIntelligence() {
  const [data, setData] = useState({
    metrics: { total_customers: 714000, total_revenue: 1352831, avg_order_value: 234.50 },
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
      backgroundColor: '#f9fafb',
      color: '#212b36',
      fontFamily: 'Public Sans, sans-serif'
    }
  }, [
    // Sidebar
    React.createElement('div', {
      key: 'sidebar',
      style: {
        width: '280px',
        backgroundColor: '#ffffff',
        padding: '0',
        position: 'fixed',
        height: '100vh',
        boxShadow: 'rgba(145, 158, 171, 0.2) 0px 0px 2px 0px, rgba(145, 158, 171, 0.12) 0px 12px 24px -4px',
        borderRight: '1px solid rgba(145, 158, 171, 0.2)'
      }
    }, [
      React.createElement('div', {
        key: 'logo',
        style: {
          padding: '40px 24px 24px 24px',
          borderBottom: '1px solid rgba(145, 158, 171, 0.2)'
        }
      }, React.createElement('div', {
        style: {
          display: 'flex',
          alignItems: 'center'
        }
      }, [
        React.createElement('div', {
          key: 'logoIcon',
          style: {
            width: '40px',
            height: '40px',
            backgroundColor: '#00AB55',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: '12px'
          }
        }, React.createElement('span', { style: { color: 'white', fontSize: '20px', fontWeight: 'bold' } }, 'K')),
        React.createElement('span', { key: 'logoText', style: { fontSize: '18px', fontWeight: '700', color: '#212b36' } }, 'KEA BI')
      ])),
      
      React.createElement('nav', { key: 'nav', style: { padding: '16px 0' } }, [
        React.createElement('div', {
          key: 'item1',
          style: {
            display: 'flex',
            alignItems: 'center',
            padding: '8px 24px',
            margin: '4px 16px',
            borderRadius: '8px',
            backgroundColor: 'rgba(0, 171, 85, 0.08)',
            cursor: 'pointer',
            position: 'relative'
          }
        }, [
          React.createElement('div', {
            key: 'activeIndicator',
            style: {
              position: 'absolute',
              left: 0,
              top: 0,
              bottom: 0,
              width: '3px',
              backgroundColor: '#00AB55',
              borderRadius: '0 2px 2px 0'
            }
          }),
          React.createElement('span', { key: 'icon1', style: { marginRight: '16px', fontSize: '20px' } }, '📊'),
          React.createElement('span', { key: 'text1', style: { fontWeight: '600', color: '#00AB55' } }, 'Dashboard')
        ]),
        React.createElement('div', {
          key: 'item2',
          style: {
            display: 'flex',
            alignItems: 'center',
            padding: '8px 24px',
            margin: '4px 16px',
            borderRadius: '8px',
            cursor: 'pointer'
          }
        }, [
          React.createElement('span', { key: 'icon2', style: { marginRight: '16px', fontSize: '20px' } }, '🛒'),
          React.createElement('span', { key: 'text2', style: { color: '#637381' } }, 'E-Commerce')
        ]),
        React.createElement('div', {
          key: 'item3',
          style: {
            display: 'flex',
            alignItems: 'center',
            padding: '8px 24px',
            margin: '4px 16px',
            borderRadius: '8px',
            cursor: 'pointer'
          }
        }, [
          React.createElement('span', { key: 'icon3', style: { marginRight: '16px', fontSize: '20px' } }, '📈'),
          React.createElement('span', { key: 'text3', style: { color: '#637381' } }, 'Analytics')
        ]),
        React.createElement('div', {
          key: 'item4',
          style: {
            display: 'flex',
            alignItems: 'center',
            padding: '8px 24px',
            margin: '4px 16px',
            borderRadius: '8px',
            cursor: 'pointer'
          }
        }, [
          React.createElement('span', { key: 'icon4', style: { marginRight: '16px', fontSize: '20px' } }, '👥'),
          React.createElement('span', { key: 'text4', style: { color: '#637381' } }, 'User')
        ])
      ])
    ]),
    
    // Main Content
    React.createElement('div', {
      key: 'main',
      style: {
        marginLeft: '280px',
        width: 'calc(100% - 280px)',
        minHeight: '100vh'
      }
    }, [
      // Header
      React.createElement('div', {
        key: 'header',
        style: {
          backgroundColor: '#ffffff',
          padding: '24px 32px',
          borderBottom: '1px solid rgba(145, 158, 171, 0.2)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }
      }, [
        React.createElement('h1', {
          key: 'title',
          style: {
            margin: 0,
            fontSize: '24px',
            fontWeight: '700',
            color: '#212b36'
          }
        }, 'Hi, Welcome back 👋'),
        React.createElement('div', {
          key: 'userMenu',
          style: {
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            backgroundColor: '#00AB55',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer'
          }
        }, React.createElement('span', { style: { color: 'white', fontWeight: 'bold' } }, 'U'))
      ]),
      
      // Content Area
      React.createElement('div', {
        key: 'content',
        style: {
          padding: '32px'
        }
      }, [
        // Metrics Cards
        React.createElement('div', {
          key: 'metrics',
          style: {
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '24px',
            marginBottom: '32px'
          }
        }, [
          React.createElement('div', {
            key: 'card1',
            style: {
              backgroundColor: '#ffffff',
              padding: '24px',
              borderRadius: '16px',
              boxShadow: 'rgba(145, 158, 171, 0.2) 0px 0px 2px 0px, rgba(145, 158, 171, 0.12) 0px 12px 24px -4px'
            }
          }, [
            React.createElement('div', {
              key: 'cardHeader1',
              style: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }
            }, [
              React.createElement('div', {
                key: 'icon1',
                style: {
                  width: '64px',
                  height: '64px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(0, 171, 85, 0.12)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }
              }, React.createElement('span', { style: { fontSize: '24px' } }, '👥'))
            ]),
            React.createElement('div', { key: 'cardContent1' }, [
              React.createElement('h3', {
                key: 'value1',
                style: { fontSize: '32px', fontWeight: '800', margin: '0 0 8px 0', color: '#212b36' }
              }, data.metrics.total_customers?.toLocaleString() || '714k'),
              React.createElement('p', {
                key: 'title1',
                style: { margin: 0, color: '#637381', fontSize: '14px' }
              }, 'Weekly Sales')
            ])
          ]),
          
          React.createElement('div', {
            key: 'card2',
            style: {
              backgroundColor: '#ffffff',
              padding: '24px',
              borderRadius: '16px',
              boxShadow: 'rgba(145, 158, 171, 0.2) 0px 0px 2px 0px, rgba(145, 158, 171, 0.12) 0px 12px 24px -4px'
            }
          }, [
            React.createElement('div', {
              key: 'cardHeader2',
              style: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }
            }, [
              React.createElement('div', {
                key: 'icon2',
                style: {
                  width: '64px',
                  height: '64px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(255, 171, 0, 0.12)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }
              }, React.createElement('span', { style: { fontSize: '24px' } }, '📱'))
            ]),
            React.createElement('div', { key: 'cardContent2' }, [
              React.createElement('h3', {
                key: 'value2',
                style: { fontSize: '32px', fontWeight: '800', margin: '0 0 8px 0', color: '#212b36' }
              }, '1.35m'),
              React.createElement('p', {
                key: 'title2',
                style: { margin: 0, color: '#637381', fontSize: '14px' }
              }, 'New Users')
            ])
          ]),
          
          React.createElement('div', {
            key: 'card3',
            style: {
              backgroundColor: '#ffffff',
              padding: '24px',
              borderRadius: '16px',
              boxShadow: 'rgba(145, 158, 171, 0.2) 0px 0px 2px 0px, rgba(145, 158, 171, 0.12) 0px 12px 24px -4px'
            }
          }, [
            React.createElement('div', {
              key: 'cardHeader3',
              style: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }
            }, [
              React.createElement('div', {
                key: 'icon3',
                style: {
                  width: '64px',
                  height: '64px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(54, 179, 126, 0.12)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }
              }, React.createElement('span', { style: { fontSize: '24px' } }, '📦'))
            ]),
            React.createElement('div', { key: 'cardContent3' }, [
              React.createElement('h3', {
                key: 'value3',
                style: { fontSize: '32px', fontWeight: '800', margin: '0 0 8px 0', color: '#212b36' }
              }, '1.72m'),
              React.createElement('p', {
                key: 'title3',
                style: { margin: 0, color: '#637381', fontSize: '14px' }
              }, 'Item Orders')
            ])
          ]),
          
          React.createElement('div', {
            key: 'card4',
            style: {
              backgroundColor: '#ffffff',
              padding: '24px',
              borderRadius: '16px',
              boxShadow: 'rgba(145, 158, 171, 0.2) 0px 0px 2px 0px, rgba(145, 158, 171, 0.12) 0px 12px 24px -4px'
            }
          }, [
            React.createElement('div', {
              key: 'cardHeader4',
              style: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }
            }, [
              React.createElement('div', {
                key: 'icon4',
                style: {
                  width: '64px',
                  height: '64px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(255, 86, 48, 0.12)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }
              }, React.createElement('span', { style: { fontSize: '24px' } }, '🐛'))
            ]),
            React.createElement('div', { key: 'cardContent4' }, [
              React.createElement('h3', {
                key: 'value4',
                style: { fontSize: '32px', fontWeight: '800', margin: '0 0 8px 0', color: '#212b36' }
              }, '234'),
              React.createElement('p', {
                key: 'title4',
                style: { margin: 0, color: '#637381', fontSize: '14px' }
              }, 'Bug Reports')
            ])
          ])
        ]),
        
        // Charts Area
        React.createElement('div', {
          key: 'charts',
          style: {
            display: 'grid',
            gridTemplateColumns: '2fr 1fr',
            gap: '24px',
            marginBottom: '32px'
          }
        }, [
          React.createElement('div', {
            key: 'chart1',
            style: {
              backgroundColor: '#ffffff',
              padding: '24px',
              borderRadius: '16px',
              boxShadow: 'rgba(145, 158, 171, 0.2) 0px 0px 2px 0px, rgba(145, 158, 171, 0.12) 0px 12px 24px -4px'
            }
          }, [
            React.createElement('h3', {
              key: 'chartTitle1',
              style: {
                marginTop: 0,
                marginBottom: '20px',
                fontSize: '18px',
                fontWeight: '700',
                color: '#212b36'
              }
            }, 'Website Visits'),
            React.createElement('div', {
              key: 'chartContent1',
              style: {
                height: '364px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#f9fafb',
                borderRadius: '8px',
                color: '#637381'
              }
            }, 'Chart Area')
          ]),
          
          React.createElement('div', {
            key: 'chart2',
            style: {
              backgroundColor: '#ffffff',
              padding: '24px',
              borderRadius: '16px',
              boxShadow: 'rgba(145, 158, 171, 0.2) 0px 0px 2px 0px, rgba(145, 158, 171, 0.12) 0px 12px 24px -4px'
            }
          }, [
            React.createElement('h3', {
              key: 'chartTitle2',
              style: {
                marginTop: 0,
                marginBottom: '20px',
                fontSize: '18px',
                fontWeight: '700',
                color: '#212b36'
              }
            }, 'Current Visits'),
            React.createElement('div', {
              key: 'chartContent2',
              style: {
                height: '364px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#f9fafb',
                borderRadius: '8px',
                color: '#637381'
              }
            }, 'Donut Chart')
          ])
        ]),
        
        // Data Table
        React.createElement('div', {
          key: 'table',
          style: {
            backgroundColor: '#ffffff',
            borderRadius: '16px',
            boxShadow: 'rgba(145, 158, 171, 0.2) 0px 0px 2px 0px, rgba(145, 158, 171, 0.12) 0px 12px 24px -4px',
            overflow: 'hidden'
          }
        }, [
          React.createElement('div', {
            key: 'tableHeader',
            style: {
              padding: '24px 24px 0 24px'
            }
          }, React.createElement('h3', {
            style: {
              marginTop: 0,
              marginBottom: '20px',
              fontSize: '18px',
              fontWeight: '700',
              color: '#212b36'
            }
          }, 'Recent Orders')),
          React.createElement('div', {
            key: 'tableContent',
            style: { overflowX: 'auto' }
          }, React.createElement('table', {
            style: {
              width: '100%',
              borderCollapse: 'collapse'
            }
          }, [
            React.createElement('thead', { key: 'thead' }, React.createElement('tr', {
              style: { backgroundColor: '#f4f6f8' }
            }, [
              React.createElement('th', {
                key: 'th1',
                style: {
                  padding: '16px 24px',
                  textAlign: 'left',
                  fontSize: '14px',
                  fontWeight: '600',
                  color: '#637381'
                }
              }, 'Name'),
              React.createElement('th', {
                key: 'th2',
                style: {
                  padding: '16px 24px',
                  textAlign: 'left',
                  fontSize: '14px',
                  fontWeight: '600',
                  color: '#637381'
                }
              }, 'Company'),
              React.createElement('th', {
                key: 'th3',
                style: {
                  padding: '16px 24px',
                  textAlign: 'left',
                  fontSize: '14px',
                  fontWeight: '600',
                  color: '#637381'
                }
              }, 'Status'),
              React.createElement('th', {
                key: 'th4',
                style: {
                  padding: '16px 24px',
                  textAlign: 'right',
                  fontSize: '14px',
                  fontWeight: '600',
                  color: '#637381'
                }
              }, 'Verified')
            ])),
            React.createElement('tbody', { key: 'tbody' }, [
              ['Jayvion Simon', 'Nannie Abernathy', 'Yes', true],
              ['Lucian Obrien', 'Sienna Murray', 'Yes', true],
              ['Deja Brady', 'Tyshawn Johns', 'No', false],
              ['Harrison Stein', 'Kathryn Murphy', 'Yes', true]
            ].map((row, index) =>
              React.createElement('tr', { key: index }, [
                React.createElement('td', {
                  key: 'td1',
                  style: {
                    padding: '16px 24px',
                    borderBottom: '1px solid rgba(145, 158, 171, 0.2)',
                    fontSize: '14px',
                    color: '#212b36'
                  }
                }, row[0]),
                React.createElement('td', {
                  key: 'td2',
                  style: {
                    padding: '16px 24px',
                    borderBottom: '1px solid rgba(145, 158, 171, 0.2)',
                    fontSize: '14px',
                    color: '#637381'
                  }
                }, row[1]),
                React.createElement('td', {
                  key: 'td3',
                  style: {
                    padding: '16px 24px',
                    borderBottom: '1px solid rgba(145, 158, 171, 0.2)'
                  }
                }, React.createElement('span', {
                  style: {
                    padding: '4px 8px',
                    borderRadius: '6px',
                    fontSize: '12px',
                    fontWeight: '700',
                    backgroundColor: row[3] ? 'rgba(34, 197, 94, 0.16)' : 'rgba(255, 86, 48, 0.16)',
                    color: row[3] ? '#118D57' : '#B71D18'
                  }
                }, row[2])),
                React.createElement('td', {
                  key: 'td4',
                  style: {
                    padding: '16px 24px',
                    borderBottom: '1px solid rgba(145, 158, 171, 0.2)',
                    textAlign: 'right'
                  }
                }, React.createElement('span', {
                  style: {
                    fontSize: '18px',
                    color: row[3] ? '#22C55E' : '#FF5630'
                  }
                }, row[3] ? '✓' : '✗'))
              ])
            ))
          ]))
        ])
      ])
    ])
  ]);
}

ReactDOM.render(React.createElement(BusinessIntelligence), document.getElementById('root'));