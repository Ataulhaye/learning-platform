import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Box, Button, TextField, Paper, Typography, Alert } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";
import { resetPassword } from '../../services/RestAPIService';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';

const validationSchema = Yup.object({
    password: Yup.string()
        .required('Password is required')
        .min(6, 'Password must be at least 6 characters'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password')], 'Passwords must match')
        .required('Confirm Password is required'),
});

interface TokenPayload {
    userId: string;
    email: string;
    name: string;
    role: string;
    iat: number;
    exp: number;
}

function ResetPassword() {
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [email, setEmail] = useState<string | null>(null);
    const navigate = useNavigate();
    const location = useLocation();
    const token = location.pathname.split('/').pop() || '';
    const { executeRecaptcha } = useGoogleReCaptcha();

    useEffect(() => {
        try {
            const decodedToken = jwtDecode<TokenPayload>(token);
            setEmail(decodedToken.email);
        } catch (error) {
            console.error('Invalid token:', error);
            setErrorMessage('Invalid token');
        }
    }, [token]);

    const formik = useFormik({
        initialValues: {
            password: '',
            confirmPassword: '',
        },
        validationSchema,
        onSubmit: async (values) => {
            if (!executeRecaptcha) {
                setErrorMessage('Recaptcha not yet available');
                return;
            }

            try {
                const recaptchaToken = await executeRecaptcha('resetPassword');
                const response = await resetPassword(token, values.password, recaptchaToken);
                setSuccessMessage('Password reset successful!');
                setErrorMessage(null);
                console.log('Password reset successful:', response);
                // Redirect to login page after successful reset
                setTimeout(() => navigate('/login'), 3000);
            } catch (error) {
                if (error instanceof Error) {
                    setErrorMessage(error.message);
                } else {
                    setErrorMessage('Failed to reset password');
                }
                setSuccessMessage(null);
                console.error('Password reset failed:', error);
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
            <Paper elevation={3} sx={{ padding: 3, width: '100%', maxWidth: 400 }}>
                <Typography variant="h5" component="h1" gutterBottom align="center">
                    Reset Password
                </Typography>
                {email && (
                    <Typography variant="h6" gutterBottom sx={{ color: 'blue', fontWeight: 'bold' }}>
                        Your Email: {email}
                    </Typography>
                )}
                <form onSubmit={formik.handleSubmit}>
                    <TextField
                        fullWidth
                        id="password"
                        name="password"
                        label="New Password"
                        type="password"
                        margin="normal"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        error={formik.touched.password && Boolean(formik.errors.password)}
                        helperText={formik.touched.password && formik.errors.password}
                    />
                    <TextField
                        fullWidth
                        id="confirmPassword"
                        name="confirmPassword"
                        label="Confirm Password"
                        type="password"
                        margin="normal"
                        value={formik.values.confirmPassword}
                        onChange={formik.handleChange}
                        error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
                        helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Reset Password
                    </Button>
                    {successMessage && <Alert severity="success">{successMessage}</Alert>}
                    {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
                </form>
            </Paper>
        </Box>
    );
}

export default ResetPassword;