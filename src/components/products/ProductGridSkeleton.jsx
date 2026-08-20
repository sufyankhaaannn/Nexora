import ProductSkeleton from './ProductSkeleton';
import './ProductSkeleton.css';

function ProductGridSkeleton({ count = 8 }) {
  return (
    <div className="product-grid">
      {Array.from({ length: count }).map((_, index) => (
        <ProductSkeleton key={index} />
      ))}
    </div>
  );
}

export default ProductGridSkeleton;