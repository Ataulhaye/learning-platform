export interface LoginFormData {
  email: string;
  password: string;
}

export interface RegisterFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: 'student' | 'teacher';
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'teacher';
} 