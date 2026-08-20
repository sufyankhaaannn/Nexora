import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Headphones,
  Laptop,
  ShieldCheck,
  Smartphone,
  Tablet,
  Truck,
  Zap,
} from 'lucide-react';

import useProducts from '../hooks/useProducts';
import ProductCard from '../components/products/ProductCard';
import Button from '../components/common/Button';

import './Home.css';

const CATEGORY_ITEMS = [
  {
    name: 'Smartphones',
    description: 'Latest mobile technology',
    icon: Smartphone,
    query: 'smartphones',
  },
  {
    name: 'Laptops',
    description: 'Work, study and play',
    icon: Laptop,
    query: 'laptops',
  },
  {
    name: 'Tablets',
    description: 'Portable everyday computing',
    icon: Tablet,
    query: 'tablets',
  },
  {
    name: 'Accessories',
    description: 'Essential tech add-ons',
    icon: Headphones,
    query: 'mobile-accessories',
  },
];

function Home() {
  const {
    products,
    loading,
    error,
  } = useProducts();

  const featuredProducts = products.slice(0, 4);

  const topRatedProducts = [...products]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 4);

  return (
    <main className="home">
      <section className="home__hero">
        <div className="container">
          <div className="home__hero-card">
            <div className="home__hero-content">
              <span className="home__eyebrow">
                NEXORA TECH STORE
              </span>

              <h1>
                Upgrade your everyday
                <span> technology.</span>
              </h1>

              <p>
                Discover smartphones, laptops,
                tablets and accessories built
                for the way you work, study and
                stay connected.
              </p>

              <div className="home__hero-actions">
                <Link to="/shop">
                  <Button>
                    Shop now
                    <ArrowRight size={17} />
                  </Button>
                </Link>

                <Link to="/shop?category=laptops">
                  <Button variant="secondary">
                    Explore laptops
                  </Button>
                </Link>
              </div>
            </div>

            <div className="home__hero-visual">
              <div className="home__hero-device home__hero-device--back">
                <Laptop size={90} strokeWidth={1.2} />
              </div>

              <div className="home__hero-device home__hero-device--front">
                <Smartphone
                  size={72}
                  strokeWidth={1.2}
                />
              </div>

              <div className="home__hero-accent">
                <Zap size={18} />
                <span>New tech</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="home__categories">
        <div className="container">
          <div className="home__section-header">
            <div>
              <span className="home__section-eyebrow">
                SHOP BY CATEGORY
              </span>

              <h2>Find what you need.</h2>
            </div>

            <Link
              to="/shop"
              className="home__section-link"
            >
              View all
              <ArrowRight size={16} />
            </Link>
          </div>

          <div className="home__category-grid">
            {CATEGORY_ITEMS.map(
              ({
                name,
                description,
                icon: Icon,
                query,
              }) => (
                <Link
                  key={query}
                  to={`/shop?category=${query}`}
                  className="home__category-card"
                >
                  <div className="home__category-icon">
                    <Icon size={25} />
                  </div>

                  <div>
                    <h3>{name}</h3>

                    <p>{description}</p>
                  </div>

                  <ArrowRight
                    size={17}
                    className="home__category-arrow"
                  />
                </Link>
              ),
            )}
          </div>
        </div>
      </section>

      <section className="home__products">
        <div className="container">
          <div className="home__section-header">
            <div>
              <span className="home__section-eyebrow">
                FEATURED PRODUCTS
              </span>

              <h2>Popular picks.</h2>
            </div>

            <Link
              to="/shop"
              className="home__section-link"
            >
              Shop all
              <ArrowRight size={16} />
            </Link>
          </div>

          {loading && (
            <div className="home__product-loading">
              Loading products...
            </div>
          )}

          {!loading && !error && (
            <div className="home__product-grid">
              {featuredProducts.map(
                (product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                  />
                ),
              )}
            </div>
          )}

          {!loading &&
            !error &&
            featuredProducts.length === 0 && (
              <div className="home__product-empty">
                <p>
                  No featured products are
                  available right now.
                </p>

                <Link to="/shop">
                  Browse the store
                </Link>
              </div>
            )}

          {!loading && error && (
            <div className="home__product-error">
              <p>
                We couldn't load featured
                products.
              </p>

              <Link to="/shop">
                Browse the store
              </Link>
            </div>
          )}
        </div>
      </section>

      <section className="home__promo">
        <div className="container">
          <div className="home__promo-card">
            <div>
              <span className="home__section-eyebrow">
                TECH ESSENTIALS
              </span>

              <h2>
                Everything you need,
                in one place.
              </h2>

              <p>
                From everyday mobile devices
                to portable computers and
                accessories, explore a focused
                collection of useful technology.
              </p>

              <Link to="/shop">
                <Button>
                  Browse the collection
                  <ArrowRight size={17} />
                </Button>
              </Link>
            </div>

            <div className="home__promo-stat">
              <span>4</span>
              <small>
                core technology
                categories
              </small>
            </div>
          </div>
        </div>
      </section>

      <section className="home__products home__products--rated">
        <div className="container">
          <div className="home__section-header">
            <div>
              <span className="home__section-eyebrow">
                TOP RATED
              </span>

              <h2>Highly rated tech.</h2>
            </div>

            <Link
              to="/shop"
              className="home__section-link"
            >
              Explore products
              <ArrowRight size={16} />
            </Link>
          </div>

          {!loading && !error && (
            <div className="home__product-grid">
              {topRatedProducts.map(
                (product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                  />
                ),
              )}
            </div>
          )}
        </div>
      </section>

      <section className="home__benefits">
        <div className="container">
          <div className="home__benefits-grid">
            <div className="home__benefit">
              <div className="home__benefit-icon">
                <Truck size={22} />
              </div>

              <div>
                <h3>Simple shopping</h3>

                <p>
                  Find products quickly with
                  focused categories and search.
                </p>
              </div>
            </div>

            <div className="home__benefit">
              <div className="home__benefit-icon">
                <ShieldCheck size={22} />
              </div>

              <div>
                <h3>Clear information</h3>

                <p>
                  Product details and pricing
                  stay straightforward.
                </p>
              </div>
            </div>

            <div className="home__benefit">
              <div className="home__benefit-icon">
                <Zap size={22} />
              </div>

              <div>
                <h3>Tech focused</h3>

                <p>
                  A catalog built around useful
                  technology products.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="home__final">
        <div className="container">
          <div className="home__final-content">
            <span className="home__section-eyebrow">
              NEXORA
            </span>

            <h2>
              Ready to find your next device?
            </h2>

            <p>
              Explore the complete NEXORA
              technology collection.
            </p>

            <Link to="/shop">
              <Button>
                Start shopping
                <ArrowRight size={17} />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Home;