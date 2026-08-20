import {
  lazy,
  Suspense,
} from 'react';

import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';

import Layout from './components/layout/Layout';

import CartProvider from './context/CartContext';

const Home = lazy(
  () => import('./pages/Home'),
);

const Shop = lazy(
  () => import('./pages/Shop'),
);

const ProductDetails = lazy(
  () => import('./pages/ProductDetails'),
);

const Cart = lazy(
  () => import('./pages/Cart'),
);

const Checkout = lazy(
  () => import('./pages/Checkout'),
);

const OrderConfirmation = lazy(
  () => import('./pages/OrderConfirmation'),
);

const Orders = lazy(
  () => import('./pages/Orders'),
);

const OrderDetails = lazy(
  () => import('./pages/OrderDetails'),
);

const About = lazy(
  () => import('./pages/About'),
);

const Contact = lazy(
  () => import('./pages/Contact'),
);

function PageLoading() {
  return (
    <main>
      <div
        style={{
          minHeight: '60vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '2rem',
        }}
      >
        <p
          style={{
            color:
              'var(--color-text-muted)',
            fontSize:
              'var(--text-sm)',
          }}
        >
          Loading...
        </p>
      </div>
    </main>
  );
}

function NotFound() {
  return (
    <main>
      <div
        style={{
          minHeight: '60vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          padding: '2rem',
        }}
      >
        <span
          style={{
            marginBottom: '0.75rem',
            color:
              'var(--color-primary)',
            fontSize: '0.75rem',
            fontWeight: 700,
            letterSpacing: '0.08em',
            textTransform:
              'uppercase',
          }}
        >
          404
        </span>

        <h1>
          Page not found.
        </h1>

        <p
          style={{
            marginTop: '0.75rem',
            color:
              'var(--color-text-muted)',
          }}
        >
          The page you are looking
          for does not exist.
        </p>
      </div>
    </main>
  );
}

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Suspense
          fallback={<PageLoading />}
        >
          <Routes>
            <Route
              element={<Layout />}
            >
              <Route
                path="/"
                element={<Home />}
              />

              <Route
                path="/shop"
                element={<Shop />}
              />

              <Route
                path="/product/:id"
                element={
                  <ProductDetails />
                }
              />

              <Route
                path="/cart"
                element={<Cart />}
              />

              <Route
                path="/checkout"
                element={<Checkout />}
              />

              <Route
                path="/order-confirmation"
                element={
                  <OrderConfirmation />
                }
              />

              <Route
                path="/orders"
                element={<Orders />}
              />

              <Route
                path="/orders/:orderId"
                element={
                  <OrderDetails />
                }
              />

              <Route
                path="/about"
                element={<About />}
              />

              <Route
                path="/contact"
                element={<Contact />}
              />

              <Route
                path="*"
                element={<NotFound />}
              />
            </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;