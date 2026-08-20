const TECH_CATEGORIES = [
  'smartphones',
  'laptops',
  'tablets',
  'mobile-accessories',
];

export function isTechProduct(product) {
  return TECH_CATEGORIES.includes(
    product?.category?.toLowerCase(),
  );
}

export function normalizeProduct(product) {
  return {
    id: product.id,
    title: product.title,
    description: product.description,
    price: product.price,
    category: product.category,
    brand: product.brand,
    rating: product.rating,
    stock: product.stock,
    thumbnail: product.thumbnail,
    images: product.images,
  };
}

export function normalizeProducts(products) {
  return products
    .filter(isTechProduct)
    .map(normalizeProduct);
}

export function getTechCategories() {
  return [...TECH_CATEGORIES];
}