import React from 'react';
import { useLocation } from 'react-router-dom';
import { Box, Typography } from '@mui/material';

function HomePage() {
  const location = useLocation();
  const { role } = location.state || { role: 'guest' };

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
      <Typography variant="h1" component="h1" gutterBottom>
        Welcome to the Learning Platform
      </Typography>
      <Typography variant="h3" component="h2">
        You are logged in as a {role}
      </Typography>
    </Box>
  );
}

export default HomePage;