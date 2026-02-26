import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function Checkout() {
  const { items, cartTotal, placeOrder } = useCart();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '',
    phone: '',
    line1: '',
    city: '',
    postalCode: '',
  });
  const [fieldErrors, setFieldErrors] = useState({});

  if (!items.length) {
    // No items; send user back to menu
    navigate('/menu', { replace: true });
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function validate() {
    const errors = {};
    if (!form.name.trim()) errors.name = 'Name is required';
    if (!form.phone.trim()) errors.phone = 'Phone is required';
    if (!form.line1.trim()) errors.line1 = 'Address is required';
    if (!form.city.trim()) errors.city = 'City is required';
    if (!form.postalCode.trim()) errors.postalCode = 'Postal code is required';
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;

    const orderId = placeOrder({
      name: form.name.trim(),
      phone: form.phone.trim(),
      line1: form.line1.trim(),
      city: form.city.trim(),
      postalCode: form.postalCode.trim(),
    });

    if (orderId) {
      navigate(`/order-success/${orderId}`, { replace: true });
    }
  }

  return (
    <div className="checkout-page">
      <section className="checkout-main">
        <h2>Checkout</h2>
        <p>Enter your delivery details to complete the order.</p>

        <form className="checkout-form" onSubmit={handleSubmit} noValidate>
          <div className="form-group">
            <label htmlFor="name">Full name</label>
            <input
              id="name"
              name="name"
              type="text"
              value={form.name}
              onChange={handleChange}
              placeholder="Jane Doe"
            />
            {fieldErrors.name && <p className="form-error">{fieldErrors.name}</p>}
          </div>
          <div className="form-group">
            <label htmlFor="phone">Phone</label>
            <input
              id="phone"
              name="phone"
              type="tel"
              value={form.phone}
              onChange={handleChange}
              placeholder="+91 98765 43210"
            />
            {fieldErrors.phone && <p className="form-error">{fieldErrors.phone}</p>}
          </div>
          <div className="form-group">
            <label htmlFor="line1">Address</label>
            <input
              id="line1"
              name="line1"
              type="text"
              value={form.line1}
              onChange={handleChange}
              placeholder="Flat / Street / Locality"
            />
            {fieldErrors.line1 && <p className="form-error">{fieldErrors.line1}</p>}
          </div>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="city">City</label>
              <input
                id="city"
                name="city"
                type="text"
                value={form.city}
                onChange={handleChange}
              />
              {fieldErrors.city && <p className="form-error">{fieldErrors.city}</p>}
            </div>
            <div className="form-group">
              <label htmlFor="postalCode">Postal code</label>
              <input
                id="postalCode"
                name="postalCode"
                type="text"
                value={form.postalCode}
                onChange={handleChange}
              />
              {fieldErrors.postalCode && <p className="form-error">{fieldErrors.postalCode}</p>}
            </div>
          </div>

          <button type="submit" className="btn btn-primary">
            Confirm order
          </button>
        </form>
      </section>

      <aside className="checkout-summary">
        <h3>Order summary</h3>
        <ul className="checkout-items">
          {items.map((item) => (
            <li key={item.id}>
              <div>
                <span className="checkout-item-name">
                  {item.name} × {item.quantity}
                </span>
                <span className="checkout-item-meta">{item.category}</span>
              </div>
              <span className="checkout-item-price">₹{item.price * item.quantity}</span>
            </li>
          ))}
        </ul>
        <div className="checkout-total">
          <span>Total</span>
          <span>₹{cartTotal}</span>
        </div>
      </aside>
    </div>
  );
}

