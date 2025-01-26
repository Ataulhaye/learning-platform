import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Box, Typography, Button, AppBar, Toolbar } from '@mui/material';
import { useAuth } from '../authorization/AuthContext';

function HomePage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { role, email } = location.state || { role: '', email: '' };
  const { logout } = useAuth();

  const handleLogout = () => {
    logout(); // Clear authentication state
    navigate('/login'); // Redirect to login page
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
      }}
    >
      <AppBar position="static">
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Typography variant="h6">
            {email}
          </Typography>
          <Button
            variant="contained"
            color="error"
            onClick={handleLogout}
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          flexGrow: 1,
        }}
      >
        <Typography variant="h1" component="h1" gutterBottom>
          Welcome to the Learning Platform
        </Typography>
        <Typography variant="h3" component="h2">
          You are logged in as a {role}
        </Typography>
      </Box>
    </Box>
  );
}

export default HomePage;