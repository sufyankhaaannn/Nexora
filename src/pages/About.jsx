import {
  ArrowRight,
  Check,
  Laptop,
  Smartphone,
  Tablet,
  Headphones,
} from 'lucide-react';
import { Link } from 'react-router-dom';

import Button from '../components/common/Button';

import './About.css';

const PRINCIPLES = [
  {
    number: '01',
    title: 'Focused selection',
    description:
      'We keep the catalog centered on useful technology instead of filling the store with unrelated products.',
  },
  {
    number: '02',
    title: 'Clear information',
    description:
      'Product details, pricing, ratings, and availability are presented in a straightforward way.',
  },
  {
    number: '03',
    title: 'Simple shopping',
    description:
      'From discovery to checkout, every part of the experience is designed to stay easy to understand.',
  },
];

const CATEGORIES = [
  {
    name: 'Smartphones',
    description:
      'Mobile devices for communication, work, entertainment, and everyday use.',
    icon: Smartphone,
    query: 'smartphones',
  },
  {
    name: 'Laptops',
    description:
      'Portable computers for study, productivity, development, and everyday tasks.',
    icon: Laptop,
    query: 'laptops',
  },
  {
    name: 'Tablets',
    description:
      'Flexible touchscreen devices for browsing, media, productivity, and portability.',
    icon: Tablet,
    query: 'tablets',
  },
  {
    name: 'Accessories',
    description:
      'Practical technology accessories that complement your everyday devices.',
    icon: Headphones,
    query: 'mobile-accessories',
  },
];

function About() {
  return (
    <main className="about">
      <section className="about__hero">
        <div className="container">
          <div className="about__hero-content">
            <span className="about__eyebrow">
              ABOUT NEXORA
            </span>

            <h1>
              Technology should
              <span> work for you.</span>
            </h1>

            <p>
              NEXORA is a technology-focused
              e-commerce store built around
              useful products, clear information,
              and a straightforward shopping
              experience.
            </p>
          </div>
        </div>
      </section>

      <section className="about__story">
        <div className="container">
          <div className="about__story-grid">
            <div className="about__story-label">
              <span className="about__eyebrow">
                OUR APPROACH
              </span>

              <h2>
                Less noise.
                <br />
                Better choices.
              </h2>
            </div>

            <div className="about__story-content">
              <p className="about__story-lead">
                Shopping for technology can
                quickly become overwhelming.
                Too many categories, too much
                information, and too many
                products that do not fit the
                actual need.
              </p>

              <p>
                NEXORA takes a more focused
                approach. The store concentrates
                on everyday technology products
                and presents them through a
                simple shopping experience.
              </p>

              <p>
                Whether you are looking for a
                smartphone, a laptop, a tablet,
                or an accessory, the goal is to
                make finding the right product
                easier.
              </p>

              <Link
                to="/shop"
                className="about__inline-link"
              >
                Explore the store
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="about__principles">
        <div className="container">
          <div className="about__section-heading">
            <span className="about__eyebrow">
              WHAT WE VALUE
            </span>

            <h2>
              A straightforward
              approach to tech.
            </h2>

            <p>
              NEXORA is built around a few
              simple principles that shape
              the shopping experience.
            </p>
          </div>

          <div className="about__principles-grid">
            {PRINCIPLES.map((principle) => (
              <article
                key={principle.number}
                className="about__principle"
              >
                <span className="about__principle-number">
                  {principle.number}
                </span>

                <h3>
                  {principle.title}
                </h3>

                <p>
                  {principle.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="about__catalog">
        <div className="container">
          <div className="about__section-heading about__section-heading--catalog">
            <span className="about__eyebrow">
              THE CATALOG
            </span>

            <h2>
              Technology for everyday life.
            </h2>

            <p>
              Our core categories cover the
              devices and accessories people
              use every day.
            </p>
          </div>

          <div className="about__catalog-grid">
            {CATEGORIES.map(
              ({
                name,
                description,
                icon: Icon,
                query,
              }) => (
                <Link
                  key={query}
                  to={`/shop?category=${query}`}
                  className="about__catalog-card"
                >
                  <div className="about__catalog-icon">
                    <Icon size={24} />
                  </div>

                  <div>
                    <h3>{name}</h3>

                    <p>{description}</p>
                  </div>

                  <ArrowRight
                    size={17}
                    className="about__catalog-arrow"
                  />
                </Link>
              ),
            )}
          </div>
        </div>
      </section>

      <section className="about__experience">
        <div className="container">
          <div className="about__experience-card">
            <div className="about__experience-content">
              <span className="about__eyebrow">
                THE NEXORA EXPERIENCE
              </span>

              <h2>
                Built around how you
                actually shop.
              </h2>

              <p>
                From searching for a product
                to placing an order, NEXORA
                keeps the important information
                close and the unnecessary
                complexity out of the way.
              </p>

              <ul>
                <li>
                  <Check size={17} />
                  Focused technology catalog
                </li>

                <li>
                  <Check size={17} />
                  Search and category discovery
                </li>

                <li>
                  <Check size={17} />
                  Clear product information
                </li>

                <li>
                  <Check size={17} />
                  Straightforward cart and checkout
                </li>
              </ul>
            </div>

            <div className="about__experience-visual">
              <div className="about__experience-panel">
                <span>NEXORA</span>

                <strong>
                  TECH
                </strong>

                <small>
                  SIMPLE. FOCUSED.
                  <br />
                  USEFUL.
                </small>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="about__cta">
        <div className="container">
          <div className="about__cta-content">
            <span className="about__eyebrow">
              READY TO EXPLORE?
            </span>

            <h2>
              Find the technology
              that fits your needs.
            </h2>

            <p>
              Browse the NEXORA collection
              and discover your next device.
            </p>

            <div className="about__cta-actions">
              <Link to="/shop">
                <Button>
                  Shop products
                  <ArrowRight size={17} />
                </Button>
              </Link>

              <Link to="/contact">
                <Button variant="secondary">
                  Contact us
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default About;