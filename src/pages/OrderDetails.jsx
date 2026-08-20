import { useEffect, useState } from 'react';
import {
  Link,
  useParams,
} from 'react-router-dom';
import {
  ArrowLeft,
  Package,
  XCircle,
} from 'lucide-react';

import Section from '../components/common/Section';
import Button from '../components/common/Button';

import './css/OrderDetails.css';

function getStoredOrder(orderId) {
  const storedOrders =
    localStorage.getItem('nexora-orders');

  if (!storedOrders) {
    return null;
  }

  try {
    const parsedOrders =
      JSON.parse(storedOrders);

    if (!Array.isArray(parsedOrders)) {
      return null;
    }

    return (
      parsedOrders.find(
        (storedOrder) =>
          storedOrder?.id === orderId,
      ) || null
    );
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

function getOrderItemCount(order) {
  if (Number.isFinite(Number(order?.itemCount))) {
    return Number(order.itemCount);
  }

  return order?.items?.reduce(
    (total, item) =>
      total + Number(item?.quantity || 0),
    0,
  );
}

function getOrderTotal(order) {
  return Number(order?.pricing?.total || 0);
}

function OrderDetails() {
  const { orderId } = useParams();

  const [order, setOrder] =
    useState(() =>
      getStoredOrder(orderId),
    );

  const [isCancelling, setIsCancelling] =
    useState(false);

  useEffect(() => {
    function loadOrder() {
      setOrder(getStoredOrder(orderId));
    }

    function handleStorageChange(event) {
      if (event.key === 'nexora-orders') {
        loadOrder();
      }
    }

    function handleOrdersUpdated() {
      loadOrder();
    }

    function handleVisibilityChange() {
      if (
        document.visibilityState ===
        'visible'
      ) {
        loadOrder();
      }
    }

    loadOrder();

    window.addEventListener(
      'storage',
      handleStorageChange,
    );

    window.addEventListener(
      'nexora-orders-updated',
      handleOrdersUpdated,
    );

    document.addEventListener(
      'visibilitychange',
      handleVisibilityChange,
    );

    return () => {
      window.removeEventListener(
        'storage',
        handleStorageChange,
      );

      window.removeEventListener(
        'nexora-orders-updated',
        handleOrdersUpdated,
      );

      document.removeEventListener(
        'visibilitychange',
        handleVisibilityChange,
      );
    };
  }, [orderId]);

  function handleCancelOrder() {
    if (!order || isCancelling) {
      return;
    }

    const shouldCancel =
      window.confirm(
        'Are you sure you want to cancel this order?',
      );

    if (!shouldCancel) {
      return;
    }

    setIsCancelling(true);

    try {
      const storedOrders =
        localStorage.getItem(
          'nexora-orders',
        );

      if (!storedOrders) {
        setIsCancelling(false);
        return;
      }

      const parsedOrders =
        JSON.parse(storedOrders);

      if (!Array.isArray(parsedOrders)) {
        setIsCancelling(false);
        return;
      }

      const updatedOrders =
        parsedOrders.map(
          (storedOrder) => {
            
            if (
              storedOrder?.id !== orderId
            ) {
              return storedOrder;
            }

            return {
              ...storedOrder,
              status: 'cancelled',
            };
          },
        );

      localStorage.setItem(
        'nexora-orders',
        JSON.stringify(updatedOrders),
      );

      const updatedOrder =
        updatedOrders.find(
          (storedOrder) =>
            storedOrder?.id === orderId,
        );

      setOrder(updatedOrder || null);

      window.dispatchEvent(
        new Event(
          'nexora-orders-updated',
        ),
      );
    } catch {
      setIsCancelling(false);
      return;
    }

    setIsCancelling(false);
  }

  if (!order) {
    return (
      <main>
        <Section>
          <div className="order-details-empty">
            <Package size={48} />

            <h1>Order not found.</h1>

            <p>
              We couldn't find the order
              you're looking for.
            </p>

            <Link to="/orders">
              <Button>
                Back to orders
              </Button>
            </Link>
          </div>
        </Section>
      </main>
    );
  }

  const {
    customer,
    items,
    pricing,
  } = order;

  const itemCount =
    getOrderItemCount(order);

  const isCancelled =
    order.status === 'cancelled';

  return (
    <main>
      <Section>
        <div className="order-details">
          <div className="order-details__header">
            <div>
              <Link
                to="/orders"
                className="order-details__back"
              >
                <ArrowLeft size={16} />
                Back to orders
              </Link>

              <span className="order-details__eyebrow">
                Order details
              </span>

              <h1>{order.id}</h1>

              <p>
                Placed on{' '}
                {formatOrderDate(
                  order.createdAt,
                )}
              </p>
            </div>

            <span
              className={`order-details__status ${
                isCancelled
                  ? 'order-details__status--cancelled'
                  : ''
              }`}
            >
              {order.status}
            </span>
          </div>

          <div className="order-details__layout">
            <div className="order-details__main">
              <section className="order-details__card">
                <div className="order-details__card-header">
                  <div>
                    <h2>Order items</h2>

                    <span>
                      {itemCount}{' '}
                      {itemCount === 1
                        ? 'item'
                        : 'items'}
                    </span>
                  </div>
                </div>

                <div className="order-details__items">
                  {items.map((item) => (
                    <article
                      className="order-details__item"
                      key={item.id}
                    >
                      <div className="order-details__image-wrapper">
                        <img
                          src={item.thumbnail}
                          alt={item.title}
                          className="order-details__image"
                        />
                      </div>

                      <div className="order-details__item-info">
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

              <section className="order-details__card">
                <div className="order-details__card-header">
                  <h2>
                    Shipping information
                  </h2>
                </div>

                <div className="order-details__customer">
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

            <aside className="order-details__summary">
              <h2>Order Summary</h2>

              <div className="order-details__summary-row">
                <span>Subtotal</span>

                <strong>
                  $
                  {Number(
                    pricing.subtotal,
                  ).toFixed(2)}
                </strong>
              </div>

              <div className="order-details__summary-row">
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

              <div className="order-details__divider" />

              <div className="order-details__total">
                <span>Total</span>

                <strong>
                  $
                  {getOrderTotal(
                    order,
                  ).toFixed(2)}
                </strong>
              </div>

              {!isCancelled && (
                <button
                  type="button"
                  className="order-details__cancel"
                  onClick={
                    handleCancelOrder
                  }
                  disabled={isCancelling}
                >
                  <XCircle size={17} />

                  {isCancelling
                    ? 'Cancelling...'
                    : 'Cancel order'}
                </button>
              )}

              {isCancelled && (
                <div className="order-details__cancelled-message">
                  This order has been
                  cancelled.
                </div>
              )}
            </aside>
          </div>
        </div>
      </Section>
    </main>
  );
}

export default OrderDetails;