import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function Cart() {
  const { items, cartTotal, updateQuantity, removeItem, clearCart } = useCart();
  const navigate = useNavigate();

  const hasItems = items.length > 0;

  return (
    <div className="cart-page">
      <header className="home-section-header">
        <h2>Your cart</h2>
        <p>{hasItems ? 'Review items before checkout.' : 'Your cart is empty right now.'}</p>
      </header>

      {!hasItems && (
        <div className="cart-empty">
          <p>Add pizzas, drinks, and breads to see them here.</p>
          <Link to="/menu" className="btn btn-primary">
            Browse menu
          </Link>
        </div>
      )}

      {hasItems && (
        <div className="cart-content">
          <ul className="cart-items">
            {items.map((item) => (
              <li key={item.id} className="cart-item">
                <div className="cart-item-main">
                  <h3>{item.name}</h3>
                  <p className="cart-item-meta">{item.category}</p>
                </div>
                <div className="cart-item-controls">
                  <div className="cart-qty">
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    >
                      −
                    </button>
                    <input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) => updateQuantity(item.id, e.target.value)}
                    />
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      +
                    </button>
                  </div>
                  <div className="cart-item-price">
                    <span>₹{item.price * item.quantity}</span>
                    <button
                      type="button"
                      className="cart-remove"
                      onClick={() => removeItem(item.id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <aside className="cart-summary">
            <div className="cart-summary-row">
              <span>Subtotal</span>
              <span>₹{cartTotal}</span>
            </div>
            <div className="cart-summary-row small">
              <span>Delivery</span>
              <span>Free (demo)</span>
            </div>
            <div className="cart-summary-row total">
              <span>Total</span>
              <span>₹{cartTotal}</span>
            </div>
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => navigate('/checkout')}
            >
              Proceed to checkout
            </button>
            <button type="button" className="btn btn-secondary" onClick={clearCart}>
              Clear cart
            </button>
          </aside>
        </div>
      )}
    </div>
  );
}

