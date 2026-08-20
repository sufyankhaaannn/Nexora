import './ProductSkeleton.css';

function ProductSkeleton() {
  return (
    <div className="product-skeleton">
      <div className="product-skeleton__image" />

      <div className="product-skeleton__content">
        <div className="product-skeleton__line product-skeleton__line--small" />
        <div className="product-skeleton__line" />
        <div className="product-skeleton__line product-skeleton__line--medium" />
        <div className="product-skeleton__button" />
      </div>
    </div>
  );
}

export default ProductSkeleton;