import React from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  Box,
  Button
} from '@mui/material';
import {
  Dashboard,
  Person,
  ShoppingCart,
  Article,
  Login
} from '@mui/icons-material';

const drawerWidth = 240;

function Sidebar() {
  const menuItems = [
    { text: 'Dashboard', icon: <Dashboard /> },
    { text: 'User', icon: <Person /> },
    { text: 'Product', icon: <ShoppingCart /> },
    { text: 'Blog', icon: <Article /> },
    { text: 'Sign In', icon: <Login /> }
  ];

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
        },
      }}
    >
      <Box sx={{ p: 2 }}>
        <Typography variant="h6" noWrap component="div">
          Minimal UI
        </Typography>
      </Box>
      <List>
        {menuItems.map((item) => (
          <ListItem button key={item.text}>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
      <Box sx={{ p: 2, mt: 'auto' }}>
        <Typography variant="body2" sx={{ mb: 1 }}>Team 1</Typography>
        <Button variant="outlined" size="small" fullWidth>
          Upgrade to Pro
        </Button>
      </Box>
    </Drawer>
  );
}

export default Sidebar;