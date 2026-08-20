import { useEffect, useState } from 'react';
import { getProductById } from '../services/productService';

function useProduct(id) {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadProduct() {
      try {
        setLoading(true);
        setError(null);

        const data = await getProductById(id);

        setProduct(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      loadProduct();
    }
  }, [id]);

  return {
    product,
    loading,
    error,
  };
}

export default useProduct;