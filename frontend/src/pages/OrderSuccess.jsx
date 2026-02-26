import { Link, useParams } from 'react-router-dom';

export default function OrderSuccess() {
  const { orderId } = useParams();

  return (
    <div className="success-page">
      <div className="success-card">
        <div className="success-icon">✓</div>
        <h2>Order placed successfully</h2>
        <p className="success-message">
          Your SmartBite order is confirmed. We&apos;re preparing your food.
        </p>
        <p className="success-order-id">
          Order ID: <span>{orderId}</span>
        </p>
        <div className="success-actions">
          <Link to="/orders" className="btn btn-primary">
            View order history
          </Link>
          <Link to="/menu" className="btn btn-secondary">
            Continue browsing
          </Link>
        </div>
      </div>
    </div>
  );
}

