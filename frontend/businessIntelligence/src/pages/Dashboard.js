import React, { useState } from 'react';
import {
  Box,
  Grid,
  Typography,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  Checkbox,
  Avatar
} from '@mui/material';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import MetricCard from '../components/MetricCard';
import {
  WebsiteVisits,
  CurrentVisits,
  ConversionRates,
  CurrentSubject
} from '../components/Charts';
import { useTheme } from '../index';

const drawerWidth = 240;

function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { darkMode, setDarkMode } = useTheme();

  const handleMenuClick = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleSidebarClose = () => {
    setSidebarOpen(false);
  };

  const handleThemeToggle = () => {
    setDarkMode(!darkMode);
  };
  const tasks = [
    { id: 1, text: 'Create FireStone Logo', completed: true },
    { id: 2, text: 'Add SCSS and JS files', completed: false },
    { id: 3, text: 'Develop website', completed: false }
  ];

  const news = [
    { title: 'New feature released', date: '2 hours ago' },
    { title: 'System maintenance', date: '1 day ago' }
  ];

  const timeline = [
    { event: 'Order #37745 from September', time: '2 hours ago' },
    { event: 'New order #9583120', time: '3 hours ago' }
  ];

  const traffic = [
    { source: 'Facebook', visits: '323,234' },
    { source: 'Google', visits: '341,212' },
    { source: 'Twitter', visits: '411,213' }
  ];

  return (
    <Box sx={{ display: 'flex' }}>
      <Header 
        onMenuClick={handleMenuClick}
        darkMode={darkMode}
        onThemeToggle={handleThemeToggle}
      />
      <Sidebar 
        open={sidebarOpen}
        onClose={handleSidebarClose}
      />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: { xs: 2, sm: 3 },
          width: { 
            xs: '100%',
            sm: sidebarOpen ? `calc(100% - ${drawerWidth}px)` : '100%'
          },
          ml: { 
            xs: 0,
            sm: sidebarOpen ? `${drawerWidth}px` : 0
          },
          mt: 8,
          height: 'calc(100vh - 64px)',
          overflow: 'auto',
          transition: 'margin 0.3s, width 0.3s',
          '&::-webkit-scrollbar': {
            width: '8px',
          },
          '&::-webkit-scrollbar-track': {
            background: 'rgba(0,0,0,0.1)',
            borderRadius: '4px',
          },
          '&::-webkit-scrollbar-thumb': {
            background: 'rgba(0,0,0,0.3)',
            borderRadius: '4px',
          },
          '&::-webkit-scrollbar-thumb:hover': {
            background: 'rgba(0,0,0,0.5)',
          },
        }}
      >
        <Typography variant="h4" gutterBottom>
          Bem vindo 👋
        </Typography>

        <Grid container spacing={{ xs: 2, md: 3 }}>
          <Grid item xs={12} sm={6} md={3}>
            <MetricCard title="Weekly Sales" value="714k" change="+2.6%" />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <MetricCard title="New Users" value="1.35m" change="-0.1%" isPositive={false} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <MetricCard title="Purchase Orders" value="1.72m" change="+2.8%" />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <MetricCard title="Messages" value="234" change="+3.6%" />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <WebsiteVisits />
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <CurrentVisits />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <ConversionRates />
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <CurrentSubject />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>News</Typography>
                <List>
                  {news.map((item, index) => (
                    <ListItem key={index}>
                      <Avatar sx={{ mr: 2 }}>N</Avatar>
                      <ListItemText primary={item.title} secondary={item.date} />
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>Order Timeline</Typography>
                <List>
                  {timeline.map((item, index) => (
                    <ListItem key={index}>
                      <ListItemText primary={item.event} secondary={item.time} />
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>Traffic by Site</Typography>
                <List>
                  {traffic.map((item, index) => (
                    <ListItem key={index}>
                      <ListItemText primary={item.source} secondary={item.visits} />
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>Tasks</Typography>
                <List>
                  {tasks.map((task) => (
                    <ListItem key={task.id}>
                      <Checkbox checked={task.completed} />
                      <ListItemText primary={task.text} />
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

export default Dashboard;