import { Link } from 'react-router-dom';

export default function Welcome() {
  return (
    <div className="welcome-card">
      <h1>Welcome to SmartBite</h1>
      <p className="tagline">Sign in or create an account to order food seamlessly.</p>
      <div className="welcome-actions">
        <Link to="/login" className="btn btn-primary">
          Log in
        </Link>
        <Link to="/signup" className="btn btn-secondary">
          Sign up
        </Link>
      </div>
    </div>
  );
}
