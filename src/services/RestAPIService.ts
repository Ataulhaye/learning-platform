import axios from 'axios';

const API_URL = 'http://localhost:5000/api/auth'; 

export const register = async (name: string, email: string, password: string, role: string = 'student', recaptchaToken: string) => {
  try {
    const response = await axios.post(`${API_URL}/register`, { name, email, password, role, recaptchaToken });
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

export const login = async (email: string, password: string, recaptchaToken: string) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { email, password, recaptchaToken });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
        throw new Error(error?.message || 'Error logging in');
    } else {
      throw new Error('Error logging in');
    }
  }
};

export const forgotPassword = async (email: string, recaptchaToken: string) => {
  try {
    const response = await axios.post(`${API_URL}/forgot-password`, { email, recaptchaToken });
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response) {
        throw new Error(error?.message || 'Error sending password reset email');
    } else {
      throw new Error('Error sending password reset email');
    }
  }
};

export const getUserById = async (userId: string) => {
  try {
    const response = await axios.get(`${API_URL}/user/${userId}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data?.message || 'Error fetching user details');
    } else {
      throw new Error('Error fetching user details');
    }
  }
};

export const resetPassword = async (token: string, newPassword: string, recaptchaToken: string) => {
  try {
    const response = await axios.post(`${API_URL}/reset-password/${token}`, { token, newPassword, recaptchaToken });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data?.message || 'Error resetting password');
    } else {
      throw new Error('Error resetting password');
    }
  }
};