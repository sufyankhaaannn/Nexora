import { useEffect, useState } from 'react';
import { getCategories } from '../services/productService';

function useCategories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function loadCategories() {
      try {
        setLoading(true);

        const data = await getCategories();

        if (isMounted) {
          setCategories(data);
        }
      } catch {
        if (isMounted) {
          setCategories([]);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadCategories();

    return () => {
      isMounted = false;
    };
  }, []);

  return {
    categories,
    loading,
  };
}

export default useCategories;