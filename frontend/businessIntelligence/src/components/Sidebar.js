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
      variant="temporary"
      open={open}
      onClose={onClose}
      ModalProps={{
        keepMounted: true,
      }}
      sx={{
        display: { xs: 'block', sm: 'none' },
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
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 2, mb: 1 }}>
        <img 
          src="/logo.png" 
          alt="Logo" 
          style={{ height: '48px', width: 'auto', maxWidth: '120px' }}
          onError={(e) => { e.target.style.display = 'none' }}
        />
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

function DesktopSidebar({ open, onClose }) {
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
        display: { xs: 'none', sm: 'block' },
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
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 2, mb: 1 }}>
        <img 
          src="/logo.png" 
          alt="Logo" 
          style={{ height: '48px', width: 'auto', maxWidth: '120px' }}
          onError={(e) => { e.target.style.display = 'none' }}
        />
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

function CombinedSidebar(props) {
  return (
    <>
      <Sidebar {...props} />
      <DesktopSidebar {...props} />
    </>
  );
}

export default CombinedSidebar;