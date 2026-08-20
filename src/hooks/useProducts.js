import { useEffect, useState } from 'react';
import {
  getProducts,
  searchProducts,
  getProductsByCategory,
} from '../services/productService';

function useProducts(
  searchQuery = '',
  category = '',
) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    async function loadProducts() {
      try {
        setLoading(true);
        setError(null);

        let data;

        if (searchQuery.trim()) {
          data = await searchProducts(
            searchQuery.trim(),
          );
        } else if (category) {
          data =
            await getProductsByCategory(category);
        } else {
          data = await getProducts();
        }

        if (isMounted) {
          setProducts(data);
        }
      } catch (err) {
        if (isMounted) {
          setProducts([]);
          setError(
            err.message ||
              'Failed to load products.',
          );
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadProducts();

    return () => {
      isMounted = false;
    };
  }, [searchQuery, category]);

  return {
    products,
    loading,
    error,
  };
}

export default useProducts;