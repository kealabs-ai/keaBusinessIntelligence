import React from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Typography, Box } from '@mui/material';
import { Dashboard, TrendingUp, People, Assessment, Settings } from '@mui/icons-material';

export default function Sidebar() {
  const menuItems = [
    { text: 'Dashboard', icon: <Dashboard /> },
    { text: 'Vendas', icon: <TrendingUp /> },
    { text: 'Clientes', icon: <People /> },
    { text: 'Relatórios', icon: <Assessment /> },
    { text: 'Configurações', icon: <Settings /> }
  ];

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 240,
        '& .MuiDrawer-paper': {
          width: 240,
          boxSizing: 'border-box',
          bgcolor: 'background.paper'
        }
      }}
    >
      <Box sx={{ p: 2, textAlign: 'center' }}>
        <Typography variant="h6" color="primary">
          KEA BI
        </Typography>
      </Box>
      <List>
        {menuItems.map((item) => (
          <ListItem button key={item.text}>
            <ListItemIcon sx={{ color: 'primary.main' }}>
              {item.icon}
            </ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
}