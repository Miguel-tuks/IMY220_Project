import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiRequest } from '../api';

function SignUpForm({ onLogin }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (username.length < 3) {
      setError('Username must be at least 3 characters');
      return;
    }

    if (!email.includes('@')) {
      setError('Email must contain @');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const data = await apiRequest('/signup', 'POST', { username, email, password });

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

      <label className="label">Username</label>
      <input className="input" type="text" placeholder="yourhandle" value={username} onChange={(e) => setUsername(e.target.value)} required />

      <label className="label">Password</label>
      <input className="input" type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} required />

      <label className="label">Confirm password</label>
      <input className="input" type="password" placeholder="••••••••" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />

      <p className="error">{error}</p>
      <button type="submit" className="btn mt-3 w-full py-3">Load your first roll</button>
    </form>
  );
}

export default SignUpForm;
