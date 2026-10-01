import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiRequest } from '../api';

function SignInForm({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!email.includes('@')) {
      setError('Email must contain @');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    try {
      const data = await apiRequest('/signin', 'POST', { email, password });

      if (!data.success) {
        setError(data.message);
        return;
      }

      onLogin(data.user);
      navigate('/home');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label className="label">Email</label>
      <input className="input" type="email" placeholder="you@studio.com" value={email} onChange={(e) => setEmail(e.target.value)} required />

      <label className="label">Password</label>
      <input className="input" type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} required />

      <p className="error">{error}</p>
      <button type="submit" className="btn mt-3 w-full py-3">Log in</button>
    </form>
  );
}

export default SignInForm;
