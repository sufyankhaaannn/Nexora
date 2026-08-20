import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Check, Package } from 'lucide-react';

import Section from '../components/common/Section';
import Button from '../components/common/Button';

import './css/OrderConfirmation.css';

const PENDING_ORDER_KEY = 'nexora-pending-order';

function getStoredOrder() {
  try {
    const storedOrder = localStorage.getItem(
      PENDING_ORDER_KEY,
    );

    if (!storedOrder) {
      return null;
    }

    const parsedOrder = JSON.parse(storedOrder);

    if (
      !parsedOrder ||
      !parsedOrder.id ||
      !Array.isArray(parsedOrder.items) ||
      parsedOrder.items.length === 0 ||
      !parsedOrder.customer ||
      !parsedOrder.pricing
    ) {
      return null;
    }

    return parsedOrder;
  } catch {
    return null;
  }
}

function formatOrderDate(date) {
  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return 'Unknown date';
  }

  return parsedDate.toLocaleDateString();
}

function getItemCount(order) {
  if (
    Number.isFinite(
      Number(order?.itemCount),
    )
  ) {
    return Number(order.itemCount);
  }

  return order?.items?.reduce(
    (total, item) =>
      total + Number(item?.quantity || 0),
    0,
  );
}

function getOrderTotal(order) {
  return Number(
    order?.pricing?.total || 0,
  );
}

function OrderConfirmation() {
  const [order] = useState(getStoredOrder);

  if (!order) {
    return (
      <main>
        <Section>
          <div className="order-confirmation__empty">
            <Package size={48} />

            <h1>No order found.</h1>

            <p>
              We couldn't find a recent order
              to display.
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

  const {
    id,
    customer,
    items,
    pricing,
  } = order;

  const itemCount = getItemCount(order);

  return (
    <main>
      <Section>
        <div className="order-confirmation">
          <div className="order-confirmation__success">
            <div className="order-confirmation__icon">
              <Check size={28} />
            </div>

            <span className="order-confirmation__eyebrow">
              Order confirmed
            </span>

            <h1>
              Thank you for your order.
            </h1>

            <p>
              Your order has been successfully
              placed.
            </p>

            <span className="order-confirmation__order-id">
              Order #{id}
            </span>

            <span className="order-confirmation__date">
              {formatOrderDate(
                order.createdAt,
              )}
            </span>
          </div>

          <div className="order-confirmation__layout">
            <div className="order-confirmation__main">
              <section className="order-confirmation__card">
                <div className="order-confirmation__card-header">
                  <h2>Order items</h2>

                  <span>
                    {itemCount}{' '}
                    {itemCount === 1
                      ? 'item'
                      : 'items'}
                  </span>
                </div>

                <div className="order-confirmation__items">
                  {items.map((item) => (
                    <article
                      className="order-confirmation__item"
                      key={item.id}
                    >
                      <div className="order-confirmation__image-wrapper">
                        <img
                          src={item.thumbnail}
                          alt={item.title}
                          className="order-confirmation__image"
                        />
                      </div>

                      <div className="order-confirmation__item-info">
                        <h3>
                          {item.title}
                        </h3>

                        <span>
                          $
                          {Number(
                            item.price,
                          ).toFixed(2)}{' '}
                          × {item.quantity}
                        </span>
                      </div>

                      <strong>
                        $
                        {(
                          Number(item.price) *
                          Number(item.quantity)
                        ).toFixed(2)}
                      </strong>
                    </article>
                  ))}
                </div>
              </section>

              <section className="order-confirmation__card">
                <div className="order-confirmation__card-header">
                  <h2>
                    Shipping information
                  </h2>
                </div>

                <div className="order-confirmation__customer">
                  <strong>
                    {customer.fullName}
                  </strong>

                  <span>
                    {customer.email}
                  </span>

                  <span>
                    {customer.phone}
                  </span>

                  <span>
                    {customer.address}
                  </span>

                  <span>
                    {customer.city},{' '}
                    {customer.province}{' '}
                    {customer.postalCode}
                  </span>

                  <span>
                    {customer.country}
                  </span>
                </div>
              </section>
            </div>

            <aside className="order-confirmation__summary">
              <h2>Order Summary</h2>

              <div className="order-confirmation__summary-row">
                <span>Subtotal</span>

                <strong>
                  $
                  {Number(
                    pricing.subtotal,
                  ).toFixed(2)}
                </strong>
              </div>

              <div className="order-confirmation__summary-row">
                <span>Shipping</span>

                <span>
                  {Number(
                    pricing.shipping,
                  ) === 0
                    ? 'Free'
                    : `$${Number(
                        pricing.shipping,
                      ).toFixed(2)}`}
                </span>
              </div>

              <div className="order-confirmation__divider" />

              <div className="order-confirmation__total">
                <span>Total</span>

                <strong>
                  $
                  {getOrderTotal(
                    order,
                  ).toFixed(2)}
                </strong>
              </div>

              <Link
                to="/orders"
                className="order-confirmation__button"
              >
                <Button>
                  View order history
                </Button>
              </Link>

              <Link
                to="/shop"
                className="order-confirmation__button"
              >
                <Button>
                  Continue shopping
                </Button>
              </Link>
            </aside>
          </div>
        </div>
      </Section>
    </main>
  );
}

export default OrderConfirmation;