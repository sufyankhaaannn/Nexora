import { Link } from 'react-router-dom';
import {
  Minus,
  Plus,
  Trash2,
  ArrowLeft,
} from 'lucide-react';
import useCart from '../context/useCart';
import Section from '../components/common/Section';
import Button from '../components/common/Button';
import './Cart.css';

function Cart() {
  const {
    cartItems,
    cartTotal,
    updateQuantity,
    removeFromCart,
    clearCart,
  } = useCart();

  if (cartItems.length === 0) {
    return (
      <main>
        <Section>
          <div className="cart-empty">
            <span className="cart-empty__eyebrow">
              Your cart
            </span>

            <h1>Your cart is empty.</h1>

            <p>
              Add some products to your cart and
              they will appear here.
            </p>

            <Link to="/shop">
              <Button>
                Continue shopping
              </Button>
            </Link>
          </div>
        </Section>
      </main>
    );
  }

  return (
    <main>
      <Section>
        <div className="cart">
          <div className="cart__header">
            <div>
              <span className="cart__eyebrow">
                Your selection
              </span>

              <h1>Shopping Cart</h1>
            </div>

            <Link
              to="/shop"
              className="cart__continue"
            >
              <ArrowLeft size={16} />
              Continue shopping
            </Link>
          </div>

          <div className="cart__layout">
            <div className="cart__items">
              {cartItems.map((item) => {
                const hasStock =
                  Number.isFinite(
                    Number(item.stock),
                  ) &&
                  Number(item.stock) > 0;

                const isAtStockLimit =
                  hasStock &&
                  item.quantity >=
                    Number(item.stock);

                return (
                  <article
                    className="cart-item"
                    key={item.id}
                  >
                    <Link
                      to={`/product/${item.id}`}
                      className="cart-item__image-wrapper"
                    >
                      <img
                        src={item.thumbnail}
                        alt={item.title}
                        className="cart-item__image"
                      />
                    </Link>

                    <div className="cart-item__details">
                      <span className="cart-item__category">
                        {item.category}
                      </span>

                      <Link
                        to={`/product/${item.id}`}
                        className="cart-item__title"
                      >
                        {item.title}
                      </Link>

                      <span className="cart-item__price">
                        ${item.price.toFixed(2)} each
                      </span>
                    </div>

                    <div className="cart-item__quantity">
                      <button
                        type="button"
                        aria-label={`Decrease quantity of ${item.title}`}
                        disabled={
                          item.quantity <= 1
                        }
                        onClick={() =>
                          updateQuantity(
                            item.id,
                            item.quantity - 1,
                          )
                        }
                      >
                        <Minus size={16} />
                      </button>

                      <span
                        aria-label={`Quantity ${item.quantity}`}
                      >
                        {item.quantity}
                      </span>

                      <button
                        type="button"
                        aria-label={`Increase quantity of ${item.title}`}
                        disabled={
                          isAtStockLimit
                        }
                        onClick={() =>
                          updateQuantity(
                            item.id,
                            item.quantity + 1,
                          )
                        }
                      >
                        <Plus size={16} />
                      </button>
                    </div>

                    <div className="cart-item__total">
                      $
                      {(
                        item.price *
                        item.quantity
                      ).toFixed(2)}
                    </div>

                    <button
                      type="button"
                      className="cart-item__remove"
                      aria-label={`Remove ${item.title} from cart`}
                      onClick={() =>
                        removeFromCart(item.id)
                      }
                    >
                      <Trash2 size={18} />
                    </button>
                  </article>
                );
              })}
            </div>

            <aside className="cart-summary">
              <div className="cart-summary__header">
                <h2>Order Summary</h2>

                <span>
                  {cartItems.length}{' '}
                  {cartItems.length === 1
                    ? 'item'
                    : 'items'}
                </span>
              </div>

              <div className="cart-summary__row">
                <span>Subtotal</span>

                <strong>
                  ${cartTotal.toFixed(2)}
                </strong>
              </div>

              <div className="cart-summary__row">
                <span>Shipping</span>

                <span>Free</span>
              </div>

              <div className="cart-summary__divider" />

              <div className="cart-summary__total">
                <span>Total</span>

                <strong>
                  ${cartTotal.toFixed(2)}
                </strong>
              </div>

              <Link
                to="/checkout"
                className="cart-summary__checkout"
              >
                <Button>
                  Proceed to checkout
                </Button>
              </Link>

              <button
                type="button"
                className="cart-summary__clear"
                onClick={clearCart}
              >
                Clear cart
              </button>
            </aside>
          </div>
        </div>
      </Section>
    </main>
  );
}

export default Cart;