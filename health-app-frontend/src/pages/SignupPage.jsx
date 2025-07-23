import React from 'react';
import RegisterForm from '../components/RegisterForm';

const SignupPage = () => (
  <div className="flex flex-col items-center justify-center min-h-[60vh]">
    <h1 className="text-3xl font-bold mb-6 text-blue-400">Create Your Account</h1>
    <RegisterForm />
  </div>
);

export default SignupPage;
