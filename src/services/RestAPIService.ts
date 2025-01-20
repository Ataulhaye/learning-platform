import axios from 'axios';

const API_URL = 'http://localhost:5000/api/auth'; 

export const register = async (name: string, email: string, password: string, role: string = 'student') => {
  try {
    const response = await axios.post(`${API_URL}/register`, { name, email, password, role });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
        console.log((error as any)?.message || 'Error registering user');
        throw new Error(error?.message || 'Error registering user');
    } else {
        console.log((error as any)?.message || 'Error registering user');
        throw new Error('Error registering user');
    }
  }
};

export const login = async (email: string, password: string) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { email, password });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
        throw new Error(error?.message || 'Error logging in');
    } else {
      throw new Error('Error logging in');
    }
  }
};

export const forgotPassword = async (email: string) => {
  try {
    const response = await axios.post(`${API_URL}/forgot-password`, { email });
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response) {
        throw new Error(error?.message || 'Error sending password reset email');
    } else {
      throw new Error('Error sending password reset email');
    }
  }
};