import {
  useEffect,
  useMemo,
  useState,
} from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Package,
  Search,
  X,
} from 'lucide-react';

import Section from '../components/common/Section';
import Button from '../components/common/Button';

import './css/Orders.css';

function getStoredOrders() {
  try {
    const storedOrders =
      localStorage.getItem('nexora-orders');

    if (!storedOrders) {
      return [];
    }

    const parsedOrders =
      JSON.parse(storedOrders);

    if (!Array.isArray(parsedOrders)) {
      return [];
    }

    return parsedOrders.filter(
      (order) =>
        order &&
        order.id &&
        Array.isArray(order.items) &&
        order.customer &&
        order.pricing,
    );
  } catch {
    return [];
  }
}

function formatOrderDate(date) {
  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return 'Unknown date';
  }

  return parsedDate.toLocaleDateString();
}

function getOrderTotal(order) {
  return Number(order?.pricing?.total || 0);
}

function getOrderItemCount(order) {
  if (Number.isFinite(Number(order?.itemCount))) {
    return Number(order.itemCount);
  }

  return (
  order?.items?.reduce(
    (total, item) =>
      total + Number(item?.quantity || 0),
    0,
  ) || 0
);
}

function Orders() {
  const [orders, setOrders] =
    useState(getStoredOrders);

  const [activeFilter, setActiveFilter] =
    useState('all');

  const [searchQuery, setSearchQuery] =
    useState('');

  const [sortBy, setSortBy] =
    useState('newest');

  useEffect(() => {
    function refreshOrders() {
      setOrders(getStoredOrders());
    }

    function handleStorageChange(event) {
      if (event.key === 'nexora-orders') {
        refreshOrders();
      }
    }

    function handleOrdersUpdated() {
      refreshOrders();
    }

    function handleVisibilityChange() {
      if (
        document.visibilityState ===
        'visible'
      ) {
        refreshOrders();
      }
    }

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
  }, []);

  const allOrdersCount = orders.length;

  const activeOrdersCount = orders.filter(
    (order) =>
      order.status !== 'cancelled',
  ).length;

  const cancelledOrdersCount =
    orders.filter(
      (order) =>
        order.status === 'cancelled',
    ).length;

  const filteredAndSortedOrders =
    useMemo(() => {
      const query = searchQuery
        .trim()
        .toLowerCase();

      const filteredOrders =
        orders.filter((order) => {
          const matchesFilter =
            activeFilter === 'all' ||
            (activeFilter === 'active' &&
              order.status !==
                'cancelled') ||
            (activeFilter ===
              'cancelled' &&
              order.status ===
                'cancelled');

          if (!matchesFilter) {
            return false;
          }

          if (!query) {
            return true;
          }

          const orderId =
            String(order.id || '')
              .toLowerCase();

          const customerName =
            String(
              order.customer?.fullName ||
                '',
            ).toLowerCase();

          const customerEmail =
            String(
              order.customer?.email ||
                '',
            ).toLowerCase();

          return (
            orderId.includes(query) ||
            customerName.includes(query) ||
            customerEmail.includes(query)
          );
        });

      return [...filteredOrders].sort(
        (firstOrder, secondOrder) => {
          const firstDate =
            new Date(
              firstOrder.createdAt,
            ).getTime();

          const secondDate =
            new Date(
              secondOrder.createdAt,
            ).getTime();

          if (sortBy === 'oldest') {
            return (
              firstDate - secondDate
            );
          }

          if (sortBy === 'highest') {
            return (
              getOrderTotal(
                secondOrder,
              ) -
              getOrderTotal(firstOrder)
            );
          }

          if (sortBy === 'lowest') {
            return (
              getOrderTotal(firstOrder) -
              getOrderTotal(secondOrder)
            );
          }

          return secondDate - firstDate;
        },
      );
    }, [
      orders,
      activeFilter,
      searchQuery,
      sortBy,
    ]);

  function handleClearSearch() {
    setSearchQuery('');
  }

  function handleResetFilters() {
    setSearchQuery('');
    setActiveFilter('all');
    setSortBy('newest');
  }

  if (orders.length === 0) {
    return (
      <main>
        <Section>
          <div className="orders-empty">
            <Package size={48} />

            <span className="orders-empty__eyebrow">
              Order history
            </span>

            <h1>No orders yet.</h1>

            <p>
              Your completed orders will
              appear here.
            </p>

            <Link to="/shop">
              <Button>
                Start shopping
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
        <div className="orders">
          <div className="orders__header">
            <div>
              <span className="orders__eyebrow">
                Your account
              </span>

              <h1>Order History</h1>

              <p>
                View and manage your
                previously placed orders.
              </p>
            </div>

            <Link
              to="/shop"
              className="orders__shop-link"
            >
              Continue shopping
              <ArrowRight size={16} />
            </Link>
          </div>

          <div className="orders__search">
            <Search
              size={18}
              className="orders__search-icon"
            />

            <input
              type="search"
              value={searchQuery}
              onChange={(event) =>
                setSearchQuery(
                  event.target.value,
                )
              }
              placeholder="Search by order ID, name, or email..."
              aria-label="Search orders"
            />

            {searchQuery && (
              <button
                type="button"
                className="orders__search-clear"
                onClick={
                  handleClearSearch
                }
                aria-label="Clear search"
              >
                <X size={17} />
              </button>
            )}
          </div>

          <div className="orders__controls">
            <div className="orders__filters">
              <button
                type="button"
                className={`orders__filter ${
                  activeFilter === 'all'
                    ? 'orders__filter--active'
                    : ''
                }`}
                onClick={() =>
                  setActiveFilter('all')
                }
              >
                <span>All orders</span>

                <span className="orders__filter-count">
                  {allOrdersCount}
                </span>
              </button>

              <button
                type="button"
                className={`orders__filter ${
                  activeFilter ===
                  'active'
                    ? 'orders__filter--active'
                    : ''
                }`}
                onClick={() =>
                  setActiveFilter('active')
                }
              >
                <span>Active</span>

                <span className="orders__filter-count">
                  {activeOrdersCount}
                </span>
              </button>

              <button
                type="button"
                className={`orders__filter ${
                  activeFilter ===
                  'cancelled'
                    ? 'orders__filter--active'
                    : ''
                }`}
                onClick={() =>
                  setActiveFilter(
                    'cancelled',
                  )
                }
              >
                <span>Cancelled</span>

                <span className="orders__filter-count">
                  {cancelledOrdersCount}
                </span>
              </button>
            </div>

            <label className="orders__sort">
              <span>Sort by</span>

              <select
                value={sortBy}
                onChange={(event) =>
                  setSortBy(
                    event.target.value,
                  )
                }
                aria-label="Sort orders"
              >
                <option value="newest">
                  Newest first
                </option>

                <option value="oldest">
                  Oldest first
                </option>

                <option value="highest">
                  Highest total
                </option>

                <option value="lowest">
                  Lowest total
                </option>
              </select>
            </label>
          </div>

          {filteredAndSortedOrders.length ===
          0 ? (
            <div className="orders__no-results">
              <Search size={40} />

              <h2>
                No matching orders
              </h2>

              <p>
                Try a different search or
                change your order filter.
              </p>

              <button
                type="button"
                className="orders__reset-filter"
                onClick={
                  handleResetFilters
                }
              >
                Clear search and filters
              </button>
            </div>
          ) : (
            <div className="orders__list">
              {filteredAndSortedOrders.map(
                (order) => (
                  <article
                    className="order-card"
                    key={order.id}
                  >
                    <div className="order-card__header">
                      <div>
                        <span className="order-card__label">
                          Order
                        </span>

                        <h2>{order.id}</h2>
                      </div>

                      <span
                        className={`order-card__status ${
                          order.status ===
                          'cancelled'
                            ? 'order-card__status--cancelled'
                            : ''
                        }`}
                      >
                        {order.status}
                      </span>
                    </div>

                    <div className="order-card__meta">
                      <div>
                        <span>Date</span>

                        <strong>
                          {formatOrderDate(
                            order.createdAt,
                          )}
                        </strong>
                      </div>

                      <div>
                        <span>Items</span>

                        <strong>
                          {getOrderItemCount(
                            order,
                          )}{' '}
                          {getOrderItemCount(
                            order,
                          ) === 1
                            ? 'item'
                            : 'items'}
                        </strong>
                      </div>

                      <div>
                        <span>Total</span>

                        <strong>
                          $
                          {getOrderTotal(
                            order,
                          ).toFixed(2)}
                        </strong>
                      </div>
                    </div>

                    <div className="order-card__items">
                      {order.items.map(
                        (item) => (
                          <div
                            className="order-card__item"
                            key={item.id}
                          >
                            <div className="order-card__image-wrapper">
                              <img
                                src={
                                  item.thumbnail
                                }
                                alt={
                                  item.title
                                }
                                className="order-card__image"
                              />
                            </div>

                            <div className="order-card__item-info">
                              <strong>
                                {
                                  item.title
                                }
                              </strong>

                              <span>
                                $
                                {Number(
                                  item.price,
                                ).toFixed(
                                  2,
                                )}{' '}
                                ×{' '}
                                {
                                  item.quantity
                                }
                              </span>
                            </div>

                            <strong>
                              $
                              {(
                                Number(
                                  item.price,
                                ) *
                                Number(
                                  item.quantity,
                                )
                              ).toFixed(2)}
                            </strong>
                          </div>
                        ),
                      )}
                    </div>

                    <Link
                      to={`/orders/${order.id}`}
                      className="order-card__details"
                    >
                      View order details
                      <ArrowRight
                        size={16}
                      />
                    </Link>
                  </article>
                ),
              )}
            </div>
          )}
        </div>
      </Section>
    </main>
  );
}

export default Orders;