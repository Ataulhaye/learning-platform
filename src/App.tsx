import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginForm from './components/authorization/LoginForm';
import RegisterForm from './components/authorization/RegisterForm';
import ForgotPassword from './components/authorization/ForgotPassword';
import ResetPassword from './components/authorization/ResetPassword';
import { ThemeProvider, createTheme } from '@mui/material';
import './App.css';
import HomePage from './components/Home/HomePage';
import { GardRoute } from './components/authorization/AuthContext';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

function App() {
  console.log('App rendering');
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
          <Route element={<GardRoute />}>
            <Route path="/home" element={<HomePage />} />
          </Route>
          
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App; 