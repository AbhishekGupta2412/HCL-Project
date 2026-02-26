import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Dashboard() {
  const { logout } = useAuth();

  return (
    <div className="dashboard-card">
      <h1>Dashboard</h1>
      <p>You're signed in. Welcome to SmartBite.</p>
      <div className="dashboard-actions">
        <button type="button" className="btn btn-secondary" onClick={logout}>
          Log out
        </button>
        <Link to="/" className="btn btn-primary">
          Back to home
        </Link>
      </div>
    </div>
  );
}
