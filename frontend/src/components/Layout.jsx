import { Outlet, NavLink, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

export default function Layout() {
  const { isAuthenticated, logout } = useAuth();
  const { cartCount } = useCart();

  return (
    <div className="layout">
      <header className="layout-header">
        <div className="layout-header-inner">
          <Link to="/" className="brand">
            SmartBite
          </Link>
          <nav className="nav-links">
            <NavLink to="/" end className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
              Home
            </NavLink>
            <NavLink
              to="/menu"
              className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
            >
              Menu
            </NavLink>
            <NavLink
              to="/orders"
              className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
            >
              Orders
            </NavLink>
          </nav>
          <div className="nav-actions">
            <NavLink
              to="/cart"
              className={({ isActive }) =>
                isActive ? 'nav-cart active' : 'nav-cart'
              }
            >
              <span>Cart</span>
              {cartCount > 0 && <span className="nav-cart-badge">{cartCount}</span>}
            </NavLink>
            {isAuthenticated ? (
              <>
                <NavLink
                  to="/dashboard"
                  className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
                >
                  Dashboard
                </NavLink>
                <button type="button" className="nav-link nav-logout" onClick={logout}>
                  Log out
                </button>
              </>
            ) : (
              <>
                <NavLink
                  to="/login"
                  className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
                >
                  Log in
                </NavLink>
                <NavLink
                  to="/signup"
                  className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
                >
                  Sign up
                </NavLink>
              </>
            )}
          </div>
        </div>
      </header>
      <main className="layout-main">
        <Outlet />
      </main>
    </div>
  );
}
