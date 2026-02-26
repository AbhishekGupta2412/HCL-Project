const BASE_URL = 'https://www.themealdb.com/api/json/v1/1';

async function fetchFirstMealBySearch(term) {
  const url = `${BASE_URL}/search.php?s=${encodeURIComponent(term)}`;
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error('Failed to fetch meals');
  }
  const data = await res.json();
  const meal = data?.meals?.[0];
  if (!meal) return null;
  return {
    id: meal.idMeal,
    name: meal.strMeal,
    thumbnail: meal.strMealThumb,
  };
}

export async function fetchCategoryImages() {
  // Map our SmartBite categories to TheMealDB search terms
  const queries = {
    pizza: 'pizza',
    drinks: 'drink',
    breads: 'bread',
  };

  const entries = await Promise.all(
    Object.entries(queries).map(async ([key, term]) => {
      try {
        const meal = await fetchFirstMealBySearch(term);
        return [key, meal];
      } catch {
        return [key, null];
      }
    })
  );

  return Object.fromEntries(entries);
}

