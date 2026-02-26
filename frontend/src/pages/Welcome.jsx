import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchCategoryImages } from '../services/mealApi';

const BASE_CATEGORIES = [
  {
    id: 'pizza',
    name: 'Pizza',
    description: 'Hand-tossed bases, premium cheese, and bold toppings.',
  },
 
  {
    id: 'breads',
    name: 'Breads',
    description: 'Garlic breads and cheesy sides, baked to golden perfection.',
  },
];

export default function Welcome() {
  const [categoryImages, setCategoryImages] = useState({});
  const [extraCategories, setExtraCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function loadData() {
      try {
        // existing custom images
        const images = await fetchCategoryImages();

        // 🔥 fetch MealDB categories
        const res = await fetch(
          'https://www.themealdb.com/api/json/v1/1/categories.php'
        );
        const data = await res.json();

        if (!cancelled) {
          setCategoryImages(images);

          // convert MealDB categories to your format
          const formatted = data.categories.map((c) => ({
            id: c.strCategory.toLowerCase(),
            name: c.strCategory,
            description: c.strCategoryDescription.slice(0, 90) + '...',
            thumbnail: c.strCategoryThumb,
          }));

          setExtraCategories(formatted);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    loadData();

    return () => {
      cancelled = true;
    };
  }, []);

  const allCategories = [...BASE_CATEGORIES, ...extraCategories];

  return (
    <div className="home">
      <section className="home-hero">
        <div className="home-hero-content">
          <h1>Order pizza, drinks & breads in minutes.</h1>
          <p className="home-hero-tagline">
            SmartBite lets you browse, customize, and track your orders in a clean, modern
            experience.
          </p>
          <div className="home-hero-actions">
            <Link to="/menu" className="btn btn-primary">
              Browse menu
            </Link>
            <Link to="/login" className="btn btn-secondary">
              Log in
            </Link>
          </div>
          <p className="home-hero-note">No delivery yet – this is a demo ordering experience.</p>
        </div>
      </section>

      <section className="home-section">
        <header className="home-section-header">
          <h2>Brands & categories</h2>
          <p>Curated for quick decisions – pick your craving and start building your cart.</p>
        </header>

        <div className="category-grid">
          {allCategories.map((category) => {
            const meal = categoryImages[category.id];

            return (
              <article key={category.id} className="category-card">
                <div className="category-image-wrapper">
                  <img
                    src={category.thumbnail || meal?.thumbnail}
                    alt={category.name}
                    className="category-image"
                    loading="lazy"
                  />
                </div>

                <div className="category-header">
                  <div className="category-pill">{category.name}</div>
                  {meal && !loading && (
                    <p className="category-meal-name">{meal.name}</p>
                  )}
                </div>

                <p>{category.description}</p>

                <Link
                  to={`/menu?category=${category.name}`}
                  className="category-link"
                >
                  View items
                </Link>
              </article>
            );
          })}
        </div>
      </section>
    </div>
  );
}