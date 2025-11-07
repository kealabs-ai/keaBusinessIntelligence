import React from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  Box,
  IconButton
} from '@mui/material';
import {
  Dashboard,
  Person,
  ShoppingCart,
  Article,
  Login,
  ChevronLeft
} from '@mui/icons-material';

const drawerWidth = 240;

function Sidebar({ open, onClose }) {
  const menuItems = [
    { text: 'Dashboard', icon: <Dashboard /> },
    { text: 'User', icon: <Person /> },
    { text: 'Product', icon: <ShoppingCart /> },
    { text: 'Blog', icon: <Article /> },
    { text: 'Sign In', icon: <Login /> }
  ];

  return (
    <Drawer
      variant="persistent"
      open={open}
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
        },
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', p: 1, justifyContent: 'space-between' }}>
        <Typography variant="h6" noWrap component="div" sx={{ ml: 1 }}>
          Kea BI
        </Typography>
        <IconButton onClick={onClose}>
          <ChevronLeft />
        </IconButton>
      </Box>
      <List>
        {menuItems.map((item) => (
          <ListItem button key={item.text}>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
}

export default Sidebar;