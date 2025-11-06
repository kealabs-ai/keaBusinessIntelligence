import React from 'react';
import { Grid, Card, CardContent, Typography, Box } from '@mui/material';
import { TrendingUp, People, AttachMoney, ShoppingCart } from '@mui/icons-material';

export default function MetricsCard({ data }) {
  const metrics = [
    { title: 'Total Clientes', value: data.total_customers || 0, icon: <People />, color: '#1976d2' },
    { title: 'Receita Total', value: `R$ ${(data.total_revenue || 0).toFixed(2)}`, icon: <AttachMoney />, color: '#2e7d32' },
    { title: 'Ticket Médio', value: `R$ ${(data.avg_order_value || 0).toFixed(2)}`, icon: <TrendingUp />, color: '#ed6c02' },
    { title: 'Vendas', value: '1,234', icon: <ShoppingCart />, color: '#9c27b0' }
  ];

  return (
    <Grid container spacing={3} sx={{ mb: 3 }}>
      {metrics.map((metric, index) => (
        <Grid item xs={12} sm={6} md={3} key={index}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Box sx={{ color: metric.color, mr: 1 }}>
                  {metric.icon}
                </Box>
                <Typography variant="h6" component="div">
                  {metric.value}
                </Typography>
              </Box>
              <Typography variant="body2" color="text.secondary">
                {metric.title}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}