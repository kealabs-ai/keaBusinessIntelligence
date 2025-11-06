import React from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Badge,
  Avatar,
  Box
} from '@mui/material';
import {
  Language,
  Notifications,
  Message
} from '@mui/icons-material';

function Header() {
  return (
    <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <Toolbar>
        <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
          Business Intelligence
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <IconButton color="inherit">
            <Language />
          </IconButton>
          <IconButton color="inherit">
            <Badge badgeContent={4} color="error">
              <Notifications />
            </Badge>
          </IconButton>
          <IconButton color="inherit">
            <Badge badgeContent={2} color="error">
              <Message />
            </Badge>
          </IconButton>
          <Avatar sx={{ ml: 1 }}>JF</Avatar>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Header;