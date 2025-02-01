import React, { useState } from 'react';
import AuthForm from '../components/AuthForm';
import axios from 'axios';

const Signup: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();


  if (!username || !email || !password) {
    alert('All fields are required');
    return;
  }

    try {
      const response = await axios.post('http://localhost:5000/api/auth/signup', { username, email, password });
      alert(response.data.message);
    } catch (error) {
      alert('Signup failed');
    }
  };

  return (
    <AuthForm
      title="Signup"
      onSubmit={handleSubmit}
      fields={[
        { label: 'Username', type: 'text', name: 'username', value: username, onChange: (e) => setUsername(e.target.value) },
        { label: 'Email', type: 'email', name: 'email', value: email, onChange: (e) => setEmail(e.target.value) },
        { label: 'Password', type: 'password', name: 'password', value: password, onChange: (e) => setPassword(e.target.value) },
      ]}
    />
  );
};

export default Signup;
