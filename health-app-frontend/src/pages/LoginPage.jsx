import React from 'react';
import LoginForm from '../components/LoginForm';

const LoginPage = () => (
  <div className="flex flex-col items-center justify-center min-h-[60vh]">
    <h1 className="text-3xl font-bold mb-6 text-blue-400">Sign In to HealthApp</h1>
    <LoginForm />
  </div>
);

export default LoginPage;
