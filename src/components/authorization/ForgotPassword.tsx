import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Box, Button, TextField, Paper, Typography, Alert, Link } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { forgotPassword } from '../../services/RestAPIService';

const validationSchema = Yup.object({
    email: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),
});

function ForgotPassword() {
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const formik = useFormik({
        initialValues: {
            email: '',
        },
        validationSchema,
        onSubmit: async (values) => {
            try {
                const response = await forgotPassword(values.email);
                setSuccessMessage('Password reset link sent to your email.');
                setErrorMessage(null);
                console.log('Forgot password successful:', response);
            } catch (error) {
                if (error instanceof Error) {
                    setErrorMessage(error.message);
                } else {
                    setErrorMessage('Failed to send password reset link');
                }
                setSuccessMessage(null);
                console.error('Forgot password failed:', error);
            }
        },
    });

    return (
        <Box
            sx={{
               /** display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                */
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '100vh',
                bgcolor: '#f5f5f5'
            }}
        >
            <Paper elevation={3} sx={{ padding: 3, width: '100%', maxWidth: 400 }}>
                <Typography variant="h5" component="h1" gutterBottom>
                    Forgot Password
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
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Send Reset Link
                    </Button>
                    {successMessage && <Alert severity="success">{successMessage}</Alert>}
                    {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
                </form>
                <Box sx={{ textAlign: 'center', mt: 2 }}>
                    <Link component={RouterLink} to="/login" variant="body2">
                        Back to Sign In
                    </Link>
                </Box>
            </Paper>
        </Box>
    );
}

export default ForgotPassword;