import './ProductDetails.css';
import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  ShoppingBag,
  ArrowLeft,
  Minus,
  Plus,
  Check,
} from 'lucide-react';
import useCart from '../context/useCart';
import useProduct from '../hooks/useProduct';
import Section from '../components/common/Section';
import Button from '../components/common/Button';

function ProductDetails() {
  const { id } = useParams();
  const { product, loading, error } = useProduct(id);
  const { addToCart } = useCart();

  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);

  if (loading) {
    return (
      <main>
        <Section>
          <div className="product-details__loading">
            Loading product...
          </div>
        </Section>
      </main>
    );
  }

  if (error || !product) {
    return (
      <main>
        <Section>
          <div className="product-details__error">
            <h1>Product not found</h1>

            <p>
              We couldn't find the product you're
              looking for.
            </p>

            <Link to="/shop">
              <Button variant="secondary">
                <ArrowLeft size={16} />
                Back to shop
              </Button>
            </Link>
          </div>
        </Section>
      </main>
    );
  }

  const isOutOfStock = product.stock <= 0;
  const maxQuantity = Math.max(product.stock, 1);

  function handleDecrease() {
    setQuantity((currentQuantity) =>
      Math.max(1, currentQuantity - 1),
    );
  }

  function handleIncrease() {
    setQuantity((currentQuantity) =>
      Math.min(maxQuantity, currentQuantity + 1),
    );
  }

  function handleAddToCart() {
    if (isOutOfStock) {
      return;
    }

    addToCart(product, quantity);

    setAddedToCart(true);

    setTimeout(() => {
      setAddedToCart(false);
    }, 2000);
  }

  return (
    <main>
      <Section>
        <Link
          to="/shop"
          className="product-details__back"
        >
          <ArrowLeft size={16} />
          Back to shop
        </Link>

        <div className="product-details">
          <div className="product-details__image-wrapper">
            <img
              src={product.thumbnail}
              alt={product.title}
              className="product-details__image"
            />
          </div>

          <div className="product-details__content">
            <span className="product-details__category">
              {product.category}
            </span>

            <h1>{product.title}</h1>

            <div className="product-details__rating">
              <span>★</span>{' '}
              {product.rating.toFixed(1)}
            </div>

            <p className="product-details__description">
              {product.description}
            </p>

            <div className="product-details__price">
              ${product.price.toFixed(2)}
            </div>

            <p
              className={
                isOutOfStock
                  ? 'product-details__stock product-details__stock--out'
                  : 'product-details__stock'
              }
            >
              {isOutOfStock
                ? 'Out of stock'
                : `${product.stock} available`}
            </p>

            {!isOutOfStock && (
              <div className="product-details__purchase">
                <div className="product-details__quantity">
                  <button
                    type="button"
                    className="product-details__quantity-button"
                    onClick={handleDecrease}
                    disabled={quantity <= 1}
                    aria-label="Decrease quantity"
                  >
                    <Minus size={16} />
                  </button>

                  <span
                    className="product-details__quantity-value"
                    aria-label={`Quantity ${quantity}`}
                  >
                    {quantity}
                  </span>

                  <button
                    type="button"
                    className="product-details__quantity-button"
                    onClick={handleIncrease}
                    disabled={
                      quantity >= maxQuantity
                    }
                    aria-label="Increase quantity"
                  >
                    <Plus size={16} />
                  </button>
                </div>

                <Button
                  onClick={handleAddToCart}
                >
                  {addedToCart ? (
                    <>
                      <Check size={18} />
                      Added to cart
                    </>
                  ) : (
                    <>
                      <ShoppingBag size={18} />
                      Add to cart
                    </>
                  )}
                </Button>
              </div>
            )}

            {isOutOfStock && (
              <Button disabled>
                Out of stock
              </Button>
            )}
          </div>
        </div>
      </Section>
    </main>
  );
}

export default ProductDetails;