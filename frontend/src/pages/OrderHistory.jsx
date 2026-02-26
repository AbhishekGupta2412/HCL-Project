import { useCart } from '../context/CartContext';

export default function OrderHistory() {
  const { orders } = useCart();

  const hasOrders = orders && orders.length > 0;

  return (
    <div className="orders-page">
      <header className="home-section-header">
        <h2>Order history</h2>
        <p>Review your recent SmartBite orders.</p>
      </header>

      {!hasOrders && (
        <div className="orders-empty">
          <p>No orders yet. Place your first order from the menu.</p>
        </div>
      )}

      {hasOrders && (
        <div className="orders-list">
          {orders.map((order) => (
            <article key={order.id} className="order-card">
              <header className="order-card-header">
                <div>
                  <h3>Order {order.id}</h3>
                  <p className="order-date">
                    {new Date(order.createdAt).toLocaleString(undefined, {
                      dateStyle: 'medium',
                      timeStyle: 'short',
                    })}
                  </p>
                </div>
                <span className="order-status">{order.status}</span>
              </header>
              <ul className="order-items">
                {order.items.map((item) => (
                  <li key={item.id}>
                    <span>
                      {item.name} × {item.quantity}
                    </span>
                    <span>₹{item.price * item.quantity}</span>
                  </li>
                ))}
              </ul>
              <footer className="order-footer">
                <div className="order-address">
                  <p>{order.address?.name}</p>
                  <p>{order.address?.line1}</p>
                  <p>
                    {order.address?.city} {order.address?.postalCode}
                  </p>
                  <p>{order.address?.phone}</p>
                </div>
                <div className="order-total">
                  <span>Total</span>
                  <span>₹{order.total}</span>
                </div>
              </footer>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}

