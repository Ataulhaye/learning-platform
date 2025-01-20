import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Box, Button, TextField, Paper, Typography, Alert, Link } from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { login } from '../../services/authService';

const validationSchema = Yup.object({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters'),
});

function LoginForm() {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const navigate = useNavigate();
  
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      console.log(values);
      try {
        const response = await login(values.email, values.password);
        console.log('Login successful:', response);
        setErrorMessage(null);
        // Redirect to home page with role
        navigate('/home', { state: { role: response.user.role } });
        // Handle successful login (e.g., store token, redirect)
      } catch (error) {
        if (error instanceof Error) {
          setErrorMessage(error.message);
        } else {
          setErrorMessage('Login failed');
        }
        console.error('Login failed:', error);
        // Handle login error (e.g., show error message)
      }
    },
  });

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        bgcolor: '#f5f5f5'
      }}
    >
      <Paper elevation={3} sx={{ p: 4, width: '100%', maxWidth: 400 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Login
        </Typography>
        <form onSubmit={formik.handleSubmit}>
          <TextField
            fullWidth
            id="email"
            name="email"
            label="Email"
            margin="normal"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
          <TextField
            fullWidth
            id="password"
            name="password"
            label="Password"
            type="password"
            margin="normal"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
          <Box sx={{ textAlign: 'center' }}>
            <Link component={RouterLink} to="/register" variant="body2">
              Don't have an account? Sign Up
            </Link>
            <br />
            <Link component={RouterLink} to="/forgot-password" variant="body2">
              Forgot password?
            </Link>
          </Box>
        </form>
      </Paper>
    </Box>
  );
}

export default LoginForm; 