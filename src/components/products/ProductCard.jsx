import { useState } from 'react';
import { ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';
import useCart from '../../context/useCart';
import Button from '../common/Button';
import './ProductCard.css';

function ProductCard({ product }) {
  const { addToCart } = useCart();

  const [imageError, setImageError] =
    useState(false);

  return (
    <article className="product-card">
      <Link
        to={`/product/${product.id}`}
        className="product-card__image-link"
      >
        <div className="product-card__image-wrapper">
          {imageError ? (
            <div
              className="product-card__image-fallback"
              role="img"
              aria-label={`Image unavailable for ${product.title}`}
            >
              <span>Image unavailable</span>
            </div>
          ) : (
            <img
              src={product.thumbnail}
              alt={product.title}
              className="product-card__image"
              loading="lazy"
              decoding="async"
              onError={() =>
                setImageError(true)
              }
            />
          )}
        </div>
      </Link>

      <div className="product-card__content">
        <span className="product-card__category">
          {product.category}
        </span>

        <Link
          to={`/product/${product.id}`}
          className="product-card__title"
        >
          {product.title}
        </Link>

        <div className="product-card__meta">
          <span>
            ★ {product.rating.toFixed(1)}
          </span>

          <span className="product-card__price">
            ${product.price.toFixed(2)}
          </span>
        </div>

        <Button
          variant="secondary"
          onClick={() => addToCart(product)}
        >
          <ShoppingBag size={16} />
          Add to cart
        </Button>
      </div>
    </article>
  );
}

export default ProductCard;