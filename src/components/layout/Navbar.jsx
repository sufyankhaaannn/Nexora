import {
  Search,
  ShoppingBag,
  Menu,
  X,
} from 'lucide-react';

import {
  Link,
  NavLink,
  useNavigate,
} from 'react-router-dom';

import { useState } from 'react';

import './Navbar.css';

import useCart from '../../context/useCart';

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] =
    useState(false);

  const [searchOpen, setSearchOpen] =
    useState(false);

  const [searchQuery, setSearchQuery] =
    useState('');

  const { cartCount } = useCart();
  const navigate = useNavigate();

  function handleSearchSubmit(event) {
    event.preventDefault();

    const query = searchQuery.trim();

    if (!query) {
      return;
    }

    setSearchOpen(false);
    setSearchQuery('');
    setIsMenuOpen(false);

    navigate(
      `/shop?search=${encodeURIComponent(
        query,
      )}`,
    );
  }

  function handleSearchToggle() {
    setSearchOpen(
      (currentState) => !currentState,
    );
  }

  function handleMobileNavigation() {
    setIsMenuOpen(false);
    setSearchOpen(false);
  }

  const navLinkClassName = ({
    isActive,
  }) =>
    isActive
      ? 'navbar__link navbar__link--active'
      : 'navbar__link';

  return (
    <header className="navbar">
      <div className="container navbar__inner">
        <Link
          to="/"
          className="navbar__logo"
          aria-label="NEXORA home"
        >
          NEXORA
        </Link>

        <nav
          className="navbar__links"
          aria-label="Main navigation"
        >
          <NavLink
            to="/"
            end
            className={navLinkClassName}
          >
            Home
          </NavLink>

          <NavLink
            to="/shop"
            className={navLinkClassName}
          >
            Shop
          </NavLink>

          <NavLink
            to="/orders"
            className={navLinkClassName}
          >
            Orders
          </NavLink>

          <NavLink
            to="/about"
            className={navLinkClassName}
          >
            About
          </NavLink>

          <NavLink
            to="/contact"
            className={navLinkClassName}
          >
            Contact
          </NavLink>
        </nav>

        <div className="navbar__actions">
          <button
            type="button"
            className="navbar__icon-button"
            aria-label={
              searchOpen
                ? 'Close search'
                : 'Search'
            }
            aria-expanded={searchOpen}
            onClick={handleSearchToggle}
          >
            {searchOpen ? (
              <X size={20} />
            ) : (
              <Search size={20} />
            )}
          </button>

          <Link
            to="/cart"
            className="navbar__cart"
            aria-label={`Shopping cart, ${cartCount} items`}
          >
            <ShoppingBag size={20} />

            {cartCount > 0 && (
              <span className="navbar__cart-count">
                {cartCount}
              </span>
            )}
          </Link>

          <button
            type="button"
            className="navbar__menu-button"
            aria-label={
              isMenuOpen
                ? 'Close menu'
                : 'Open menu'
            }
            aria-expanded={isMenuOpen}
            onClick={() =>
              setIsMenuOpen(
                (currentState) =>
                  !currentState,
              )
            }
          >
            {isMenuOpen ? (
              <X size={22} />
            ) : (
              <Menu size={22} />
            )}
          </button>
        </div>
      </div>

      {searchOpen && (
        <div className="navbar__search">
          <form
            className="container navbar__search-form"
            onSubmit={
              handleSearchSubmit
            }
          >
            <Search size={18} />

            <input
              type="search"
              value={searchQuery}
              onChange={(event) =>
                setSearchQuery(
                  event.target.value,
                )
              }
              placeholder="Search tech products..."
              aria-label="Search tech products"
              autoFocus
            />

            <button type="submit">
              Search
            </button>
          </form>
        </div>
      )}

      {isMenuOpen && (
        <div className="navbar__mobile-menu">
          <nav aria-label="Mobile navigation">
            <NavLink
              to="/"
              end
              className={navLinkClassName}
              onClick={
                handleMobileNavigation
              }
            >
              Home
            </NavLink>

            <NavLink
              to="/shop"
              className={navLinkClassName}
              onClick={
                handleMobileNavigation
              }
            >
              Shop
            </NavLink>

            <NavLink
              to="/orders"
              className={navLinkClassName}
              onClick={
                handleMobileNavigation
              }
            >
              Orders
            </NavLink>

            <NavLink
              to="/about"
              className={navLinkClassName}
              onClick={
                handleMobileNavigation
              }
            >
              About
            </NavLink>

            <NavLink
              to="/contact"
              className={navLinkClassName}
              onClick={
                handleMobileNavigation
              }
            >
              Contact
            </NavLink>
          </nav>
        </div>
      )}
    </header>
  );
}

export default Navbar;