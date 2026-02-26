import { useMemo, useState } from 'react';
import { useCart } from '../context/CartContext';

const PRODUCTS = [
  {
    id: 'pz-margherita',
    name: 'Margherita Pizza',
    category: 'Pizza',
    price: 299,
    description: 'Classic tomatoes, mozzarella, and basil on a thin crust.',
    label: 'Best seller',
  },
  {
    id: 'pz-pepperoni',
    name: 'Pepperoni Feast',
    category: 'Pizza',
    price: 349,
    description: 'Loaded with pepperoni and extra cheese.',
    label: 'Spicy',
  },
  {
    id: 'pz-veggie',
    name: 'Garden Veggie',
    category: 'Pizza',
    price: 329,
    description: 'Crisp veggies, olives, and cheese on a multigrain base.',
  },
  {
    id: 'dr-cola',
    name: 'Cola (750ml)',
    category: 'Cold Drinks',
    price: 79,
    description: 'Sparkling cola served chilled.',
  },
  {
    id: 'dr-lime-soda',
    name: 'Lime Soda',
    category: 'Cold Drinks',
    price: 89,
    description: 'Fresh lime with soda and ice.',
  },
  {
    id: 'br-garlic',
    name: 'Garlic Bread',
    category: 'Breads',
    price: 149,
    description: 'Toasted bread with garlic butter and herbs.',
  },
  {
    id: 'br-cheesy',
    name: 'Cheesy Garlic Bread',
    category: 'Breads',
    price: 179,
    description: 'Garlic bread topped with a blanket of cheese.',
    label: 'Popular add-on',
  },
];

const FILTERS = ['All', 'Pizza', 'Cold Drinks', 'Breads'];

export default function Menu() {
  const { addItem } = useCart();
  const [filter, setFilter] = useState('All');

  const filteredProducts = useMemo(() => {
    if (filter === 'All') return PRODUCTS;
    return PRODUCTS.filter((p) => p.category === filter);
  }, [filter]);

  return (
    <div className="menu-page">
      <header className="home-section-header">
        <h2>Menu</h2>
        <p>Browse items across pizzas, drinks, and breads. Add them to your cart in one tap.</p>
      </header>

      <div className="menu-filters">
        {FILTERS.map((f) => (
          <button
            key={f}
            type="button"
            className={f === filter ? 'filter-pill active' : 'filter-pill'}
            onClick={() => setFilter(f)}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="product-grid">
        {filteredProducts.map((product) => (
          <article key={product.id} className="product-card">
            <div className="product-header">
              <h3>{product.name}</h3>
              <span className="product-category">{product.category}</span>
            </div>
            <p className="product-description">{product.description}</p>
            <div className="product-footer">
              <div>
                <span className="product-price">₹{product.price}</span>
                {product.label && <span className="product-label">{product.label}</span>}
              </div>
              <button
                type="button"
                className="btn btn-primary btn-sm"
                onClick={() =>
                  addItem({
                    id: product.id,
                    name: product.name,
                    category: product.category,
                    price: product.price,
                  })
                }
              >
                Add to cart
              </button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

