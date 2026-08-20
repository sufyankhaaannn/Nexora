import {
  normalizeProduct,
  normalizeProducts,
} from '../utils/productUtils';

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  'https://dummyjson.com';

export const TECH_CATEGORIES = [
  'smartphones',
  'laptops',
  'tablets',
  'mobile-accessories',
];

export async function getProducts() {
  const response = await fetch(
    `${API_BASE_URL}/products?limit=0`,
  );

  if (!response.ok) {
    throw new Error('Failed to fetch products.');
  }

  const data = await response.json();

  const techProducts = data.products.filter(
    (product) =>
      TECH_CATEGORIES.includes(product.category),
  );

  return normalizeProducts(techProducts);
}

export async function getProductById(id) {
  const response = await fetch(
    `${API_BASE_URL}/products/${id}`,
  );

  if (!response.ok) {
    throw new Error('Failed to fetch product.');
  }

  const product = await response.json();

  if (
    !TECH_CATEGORIES.includes(
      product.category,
    )
  ) {
    throw new Error(
      'This product is not available in the NEXORA tech catalog.',
    );
  }

  return normalizeProduct(product);
}

export async function searchProducts(query) {
  const response = await fetch(
    `${API_BASE_URL}/products/search?q=${encodeURIComponent(
      query,
    )}&limit=0`,
  );

  if (!response.ok) {
    throw new Error('Failed to search products.');
  }

  const data = await response.json();

  const techProducts = data.products.filter(
    (product) =>
      TECH_CATEGORIES.includes(product.category),
  );

  return normalizeProducts(techProducts);
}

export async function getProductsByCategory(
  category,
) {
  if (!TECH_CATEGORIES.includes(category)) {
    return [];
  }

  const response = await fetch(
    `${API_BASE_URL}/products/category/${encodeURIComponent(
      category,
    )}?limit=0`,
  );

  if (!response.ok) {
    throw new Error(
      'Failed to fetch products by category.',
    );
  }

  const data = await response.json();

  const techProducts = data.products.filter(
    (product) =>
      TECH_CATEGORIES.includes(product.category),
  );

  return normalizeProducts(techProducts);
}

export async function getCategories() {
  return TECH_CATEGORIES;
}