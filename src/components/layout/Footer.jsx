import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import './Footer.css';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__main">
          <div className="footer__brand">
            <Link to="/" className="footer__logo">
            
              NEXORA
            </Link>

            <p className="footer__tagline">
              Technology, thoughtfully selected.
            </p>

            <p className="footer__description">
              Discover smartphones, laptops, tablets,
              and essential technology for everyday life.
            </p>
          </div>

          <div className="footer__links">
            <nav
              className="footer__column"
              aria-label="Shop"
            >
              <h3>Shop</h3>

              <Link to="/shop?category=smartphones">
                Smartphones
              </Link>

              <Link to="/shop?category=laptops">
                Laptops
              </Link>

              <Link to="/shop?category=tablets">
                Tablets
              </Link>

              <Link to="/shop?category=mobile-accessories">
                Accessories
              </Link>

              <Link to="/shop">
                All products
              </Link>
            </nav>

            <nav
              className="footer__column"
              aria-label="Company"
            >
              <h3>Company</h3>

              <Link to="/about">
                About NEXORA
              </Link>

              <Link to="/contact">
                Contact
              </Link>

              <Link to="/orders">
                Your orders
              </Link>
            </nav>

            <nav
              className="footer__column"
              aria-label="Support"
            >
              <h3>Support</h3>

              <Link to="/contact">
                Help center
              </Link>

              <Link to="/contact">
                Shipping
              </Link>

              <Link to="/contact">
                Returns
              </Link>

              <Link to="/contact">
                Contact support
              </Link>
            </nav>
          </div>
        </div>

        <div className="footer__bottom">
          <p>
            © {currentYear} NEXORA. All rights reserved.
          </p>

          <div className="footer__legal">
            <Link to="/contact">
              Privacy
              <ArrowUpRight size={14} />
            </Link>

            <Link to="/contact">
              Terms
              <ArrowUpRight size={14} />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;