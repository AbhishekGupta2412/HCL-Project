import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MIN_PASSWORD = 8;

export default function Signup() {
  const navigate = useNavigate();
  const { signup } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [error, setError] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  function validateInput() {
    const err = {};
    if (!name.trim()) err.name = 'Full name is required';
    if (!email.trim()) err.email = 'Email is required';
    else if (!EMAIL_REGEX.test(email)) err.email = 'Enter a valid email address';
    if (!password) err.password = 'Password is required';
    else if (password.length < MIN_PASSWORD) err.password = `Password must be at least ${MIN_PASSWORD} characters`;
    if (!agreeTerms) err.terms = 'You must agree to the terms and privacy policy';
    setFieldErrors(err);
    return Object.keys(err).length === 0;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    if (!validateInput()) return;

    setSubmitting(true);
    try {
      await signup(name.trim(), email.trim(), password);
      navigate('/login', { replace: true });
    } catch (err) {
      setError(err.message || 'Sign up failed. Please try again.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="auth-card">
      <Link to="/" className="back-link">
        ← Back
      </Link>
      <h1>Sign up</h1>
      <p className="subtitle">Create an account to get started.</p>
      <form onSubmit={handleSubmit} noValidate>
        <div className="form-group">
          <label htmlFor="signup-name">Full name</label>
          <input
            id="signup-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Jane Doe"
            autoComplete="name"
            className={fieldErrors.name ? 'input-error' : ''}
            disabled={submitting}
          />
          {fieldErrors.name && <p className="form-error">{fieldErrors.name}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="signup-email">Email</label>
          <input
            id="signup-email"
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
          <label htmlFor="signup-password">Password</label>
          <input
            id="signup-password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            autoComplete="new-password"
            minLength={MIN_PASSWORD}
            className={fieldErrors.password ? 'input-error' : ''}
            disabled={submitting}
          />
          {fieldErrors.password && <p className="form-error">{fieldErrors.password}</p>}
        </div>
        <div className="form-group checkbox">
          <input
            id="signup-terms"
            type="checkbox"
            checked={agreeTerms}
            onChange={(e) => setAgreeTerms(e.target.checked)}
            disabled={submitting}
            className={fieldErrors.terms ? 'input-error' : ''}
          />
          <label htmlFor="signup-terms">
            I agree to the <a href="#terms">Terms of Service</a> and <a href="#privacy">Privacy Policy</a>.
          </label>
        </div>
        {fieldErrors.terms && <p className="form-error">{fieldErrors.terms}</p>}
        {error && <p className="form-error">{error}</p>}
        <div className="form-footer">
          <button type="submit" className="btn btn-primary" disabled={submitting}>
            {submitting ? 'Creating account…' : 'Create account'}
          </button>
        </div>
      </form>
      <div className="link-row">
        Already have an account? <Link to="/login">Log in</Link>
      </div>
    </div>
  );
}
