import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  function validateInput() {
    const err = {};
    if (!email.trim()) err.email = 'Email is required';
    else if (!EMAIL_REGEX.test(email)) err.email = 'Enter a valid email address';
    if (!password) err.password = 'Password is required';
    setFieldErrors(err);
    return Object.keys(err).length === 0;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    if (!validateInput()) return;

    setSubmitting(true);
    try {
      await login(email, password);
      navigate('/dashboard', { replace: true });
    } catch (err) {
      setError(err.message || 'Invalid credentials. Please try again.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="auth-card">
      <Link to="/" className="back-link">
        ← Back
      </Link>
      <h1>Log in</h1>
      <p className="subtitle">Enter your credentials to access your account.</p>
      <form onSubmit={handleSubmit} noValidate>
        <div className="form-group">
          <label htmlFor="login-email">Email</label>
          <input
            id="login-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            autoComplete="email"
            className={fieldErrors.email ? 'input-error' : ''}
            disabled={submitting}
          />
          {fieldErrors.email && <p className="form-error">{fieldErrors.email}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="login-password">Password</label>
          <input
            id="login-password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            autoComplete="current-password"
            className={fieldErrors.password ? 'input-error' : ''}
            disabled={submitting}
          />
          {fieldErrors.password && <p className="form-error">{fieldErrors.password}</p>}
        </div>
        {error && <p className="form-error">{error}</p>}
        <div className="form-footer">
          <button type="submit" className="btn btn-primary" disabled={submitting}>
            {submitting ? 'Signing in…' : 'Log in'}
          </button>
        </div>
      </form>
      <div className="link-row">
        Don't have an account? <Link to="/signup">Sign up</Link>
      </div>
    </div>
  );
}
