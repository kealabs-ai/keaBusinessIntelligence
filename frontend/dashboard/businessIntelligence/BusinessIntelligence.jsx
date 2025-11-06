import React, { useState, useEffect } from 'react';
import { Box, CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import Sidebar from './Sidebar';
import MetricsCard from './MetricsCard';
import ChartArea from './ChartArea';
import DataTable from './DataTable';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: '#1976d2' },
    background: { default: '#0a0e27', paper: '#1e293b' }
  }
});

export default function BusinessIntelligence() {
  const [data, setData] = useState({
    metrics: {},
    salesData: [],
    productsData: []
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

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Box sx={{ display: 'flex' }}>
        <Sidebar />
        <Box component="main" sx={{ flexGrow: 1, p: 3, ml: '240px' }}>
          <MetricsCard data={data.metrics} />
          <ChartArea salesData={data.salesData} productsData={data.productsData} />
          <DataTable data={data.productsData} />
        </Box>
      </Box>
    </ThemeProvider>
  );
}