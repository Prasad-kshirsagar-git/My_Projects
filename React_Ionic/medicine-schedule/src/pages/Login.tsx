import React, { useState } from 'react';
import AuthForm from '../components/AuthForm';
import axios from 'axios';

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', { email, password });
      alert(response.data.message);
    } catch (error) {
      alert('Login failed');
    }
  };

  return (
    <AuthForm
      title="Login"
      onSubmit={handleSubmit}
      fields={[
        { label: 'Email', type: 'email', name: 'email', value: email, onChange: (e) => setEmail(e.target.value) },
        { label: 'Password', type: 'password', name: 'password', value: password, onChange: (e) => setPassword(e.target.value) },
      ]}
    />
  );
};

export default Login;
