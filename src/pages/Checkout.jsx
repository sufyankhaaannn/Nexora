import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import useCart from '../context/useCart';
import Section from '../components/common/Section';
import Button from '../components/common/Button';
import './css/Checkout.css';

function Checkout() {
  const navigate = useNavigate();

  const {
    cartItems,
    cartTotal,
    clearCart,
  } = useCart();

  const [customerInfo, setCustomerInfo] =
    useState({
      fullName: '',
      email: '',
      phone: '',
      address: '',
      city: '',
      province: '',
      postalCode: '',
      country: '',
    });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] =
    useState(false);

  const shippingCost = 0;
  const subtotal = cartTotal;
  const total = subtotal + shippingCost;

  const itemCount = cartItems.reduce(
    (totalItems, item) =>
      totalItems + item.quantity,
    0,
  );

  function handleCustomerChange(event) {
    const { name, value } = event.target;

    setCustomerInfo((currentInfo) => ({
      ...currentInfo,
      [name]: value,
    }));

    setErrors((currentErrors) => ({
      ...currentErrors,
      [name]: '',
    }));
  }

  function validateForm() {
    const newErrors = {};

    const fullName =
      customerInfo.fullName.trim();

    const email =
      customerInfo.email.trim();

    const phone =
      customerInfo.phone.trim();

    const address =
      customerInfo.address.trim();

    const city =
      customerInfo.city.trim();

    const province =
      customerInfo.province.trim();

    const postalCode =
      customerInfo.postalCode.trim();

    const country =
      customerInfo.country.trim();

    if (!fullName) {
      newErrors.fullName =
        'Full name is required.';
    } else if (fullName.length < 2) {
      newErrors.fullName =
        'Enter a valid full name.';
    }

    if (!email) {
      newErrors.email =
        'Email address is required.';
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
        email,
      )
    ) {
      newErrors.email =
        'Enter a valid email address.';
    }

    if (!phone) {
      newErrors.phone =
        'Phone number is required.';
    } else if (
      !/^[0-9+\-\s()]{7,20}$/.test(phone)
    ) {
      newErrors.phone =
        'Enter a valid phone number.';
    }

    if (!address) {
      newErrors.address =
        'Street address is required.';
    } else if (address.length < 5) {
      newErrors.address =
        'Enter a valid street address.';
    }

    if (!city) {
      newErrors.city =
        'City is required.';
    }

    if (!province) {
      newErrors.province =
        'Province / State is required.';
    }

    if (!postalCode) {
      newErrors.postalCode =
        'Postal code is required.';
    }

    if (!country) {
      newErrors.country =
        'Country is required.';
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  }

  function handlePlaceOrder(event) {
    event.preventDefault();

    if (isSubmitting) {
      return;
    }

    if (cartItems.length === 0) {
      navigate('/cart');
      return;
    }

    const isValid = validateForm();

    if (!isValid) {
      return;
    }

    setIsSubmitting(true);

    const order = {
      id: `NEX-${Date.now()}`,

      customer: {
        ...customerInfo,
        fullName:
          customerInfo.fullName.trim(),
        email:
          customerInfo.email.trim(),
        phone:
          customerInfo.phone.trim(),
        address:
          customerInfo.address.trim(),
        city:
          customerInfo.city.trim(),
        province:
          customerInfo.province.trim(),
        postalCode:
          customerInfo.postalCode.trim(),
        country:
          customerInfo.country.trim(),
      },

      items: cartItems.map((item) => ({
        id: item.id,
        title: item.title,
        price: Number(item.price),
        quantity: item.quantity,
        thumbnail: item.thumbnail,
        category: item.category,
      })),

      pricing: {
        subtotal,
        shipping: shippingCost,
        total,
      },

      itemCount,

      status: 'placed',

      createdAt: new Date().toISOString(),
    };

    try {
      const storedOrders =
  localStorage.getItem('nexora-orders');

let existingOrders = [];

if (storedOrders) {
  const parsedOrders = JSON.parse(storedOrders);

  if (!Array.isArray(parsedOrders)) {
    throw new Error(
      'Stored orders data is invalid.',
    );
  }

  existingOrders = parsedOrders;
}

      const updatedOrders = [
        ...existingOrders,
        order,
      ];

      localStorage.setItem(
        'nexora-orders',
        JSON.stringify(updatedOrders),
      );
      window.dispatchEvent(
  new Event('nexora-orders-updated'),
);

      localStorage.setItem(
        'nexora-pending-order',
        JSON.stringify(order),
      );

      clearCart();

      navigate('/order-confirmation');
    } catch {
      setIsSubmitting(false);

      setErrors({
        form:
          'Unable to place your order. Please try again.',
      });
    }
  }

  if (cartItems.length === 0) {
    return (
      <main>
        <Section>
          <div className="checkout-empty">
            <h1>Your cart is empty.</h1>

            <p>
              Add some products before proceeding
              to checkout.
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
        <div className="checkout">
          <div className="checkout__header">
            <div>
              <span className="checkout__eyebrow">
                NEXORA Store
              </span>

              <h1>Checkout</h1>

              <p>
                Complete your information to place
                your order.
              </p>
            </div>

            <Link
              to="/cart"
              className="checkout__back"
            >
              <ArrowLeft size={16} />
              Back to cart
            </Link>
          </div>

          <div className="checkout__layout">
            <section className="checkout__form-section">
              <div className="checkout-card">
                <form
                  className="checkout-form"
                  onSubmit={handlePlaceOrder}
                >
                  <div className="checkout-form__group">
                    <div>
                      <h2>
                        Customer information
                      </h2>

                      <p className="checkout-form__description">
                        Enter your contact
                        information.
                      </p>
                    </div>

                    <div className="checkout-form__field">
                      <label htmlFor="fullName">
                        Full name
                      </label>

                      <input
                        id="fullName"
                        name="fullName"
                        type="text"
                        value={
                          customerInfo.fullName
                        }
                        onChange={
                          handleCustomerChange
                        }
                        placeholder="Enter your full name"
                        autoComplete="name"
                        required
                        minLength={2}
                        className={
                          errors.fullName
                            ? 'checkout-form__input--error'
                            : ''
                        }
                      />

                      {errors.fullName && (
                        <span className="checkout-form__error">
                          {errors.fullName}
                        </span>
                      )}
                    </div>

                    <div className="checkout-form__field">
                      <label htmlFor="email">
                        Email address
                      </label>

                      <input
                        id="email"
                        name="email"
                        type="email"
                        value={
                          customerInfo.email
                        }
                        onChange={
                          handleCustomerChange
                        }
                        placeholder="Enter your email address"
                        autoComplete="email"
                        required
                        className={
                          errors.email
                            ? 'checkout-form__input--error'
                            : ''
                        }
                      />

                      {errors.email && (
                        <span className="checkout-form__error">
                          {errors.email}
                        </span>
                      )}
                    </div>

                    <div className="checkout-form__field">
                      <label htmlFor="phone">
                        Phone number
                      </label>

                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={
                          customerInfo.phone
                        }
                        onChange={
                          handleCustomerChange
                        }
                        placeholder="Enter your phone number"
                        autoComplete="tel"
                        required
                        className={
                          errors.phone
                            ? 'checkout-form__input--error'
                            : ''
                        }
                      />

                      {errors.phone && (
                        <span className="checkout-form__error">
                          {errors.phone}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="checkout-form__group">
                    <div>
                      <h2>
                        Shipping information
                      </h2>

                      <p className="checkout-form__description">
                        Enter the address where
                        your order should be
                        delivered.
                      </p>
                    </div>

                    <div className="checkout-form__field">
                      <label htmlFor="address">
                        Street address
                      </label>

                      <input
                        id="address"
                        name="address"
                        type="text"
                        value={
                          customerInfo.address
                        }
                        onChange={
                          handleCustomerChange
                        }
                        placeholder="Enter your street address"
                        autoComplete="street-address"
                        required
                        minLength={5}
                        className={
                          errors.address
                            ? 'checkout-form__input--error'
                            : ''
                        }
                      />

                      {errors.address && (
                        <span className="checkout-form__error">
                          {errors.address}
                        </span>
                      )}
                    </div>

                    <div className="checkout-form__row">
                      <div className="checkout-form__field">
                        <label htmlFor="city">
                          City
                        </label>

                        <input
                          id="city"
                          name="city"
                          type="text"
                          value={
                            customerInfo.city
                          }
                          onChange={
                            handleCustomerChange
                          }
                          placeholder="City"
                          autoComplete="address-level2"
                          required
                          className={
                            errors.city
                              ? 'checkout-form__input--error'
                              : ''
                          }
                        />

                        {errors.city && (
                          <span className="checkout-form__error">
                            {errors.city}
                          </span>
                        )}
                      </div>

                      <div className="checkout-form__field">
                        <label htmlFor="province">
                          Province / State
                        </label>

                        <input
                          id="province"
                          name="province"
                          type="text"
                          value={
                            customerInfo.province
                          }
                          onChange={
                            handleCustomerChange
                          }
                          placeholder="Province / State"
                          autoComplete="address-level1"
                          required
                          className={
                            errors.province
                              ? 'checkout-form__input--error'
                              : ''
                          }
                        />

                        {errors.province && (
                          <span className="checkout-form__error">
                            {errors.province}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="checkout-form__row">
                      <div className="checkout-form__field">
                        <label htmlFor="postalCode">
                          Postal code
                        </label>

                        <input
                          id="postalCode"
                          name="postalCode"
                          type="text"
                          value={
                            customerInfo.postalCode
                          }
                          onChange={
                            handleCustomerChange
                          }
                          placeholder="Postal code"
                          autoComplete="postal-code"
                          required
                          className={
                            errors.postalCode
                              ? 'checkout-form__input--error'
                              : ''
                          }
                        />

                        {errors.postalCode && (
                          <span className="checkout-form__error">
                            {errors.postalCode}
                          </span>
                        )}
                      </div>

                      <div className="checkout-form__field">
                        <label htmlFor="country">
                          Country
                        </label>

                        <input
                          id="country"
                          name="country"
                          type="text"
                          value={
                            customerInfo.country
                          }
                          onChange={
                            handleCustomerChange
                          }
                          placeholder="Country"
                          autoComplete="country-name"
                          required
                          className={
                            errors.country
                              ? 'checkout-form__input--error'
                              : ''
                          }
                        />

                        {errors.country && (
                          <span className="checkout-form__error">
                            {errors.country}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {errors.form && (
                    <span className="checkout-form__error">
                      {errors.form}
                    </span>
                  )}

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                  >
                    {isSubmitting
                      ? 'Placing order...'
                      : 'Place order'}
                  </Button>
                </form>
              </div>
            </section>

            <aside className="checkout-summary">
              <div className="checkout-summary__header">
                <h2>Order Summary</h2>

                <span>
                  {itemCount}{' '}
                  {itemCount === 1
                    ? 'item'
                    : 'items'}
                </span>
              </div>

              <div className="checkout-summary__items">
                {cartItems.map((item) => {
                  const itemTotal =
                    item.price * item.quantity;

                  return (
                    <div
                      className="checkout-summary__item"
                      key={item.id}
                    >
                      <div className="checkout-summary__image-wrapper">
                        <img
                          src={item.thumbnail}
                          alt={item.title}
                          className="checkout-summary__image"
                        />
                      </div>

                      <div className="checkout-summary__item-info">
                        <span>
                          {item.title}
                        </span>

                        <small>
                          $
                          {item.price.toFixed(
                            2,
                          )}{' '}
                          × {item.quantity}
                        </small>
                      </div>

                      <strong>
                        ${itemTotal.toFixed(2)}
                      </strong>
                    </div>
                  );
                })}
              </div>

              <div className="checkout-summary__divider" />

              <div className="checkout-summary__row">
                <span>Subtotal</span>

                <strong>
                  ${subtotal.toFixed(2)}
                </strong>
              </div>

              <div className="checkout-summary__row">
                <span>Shipping</span>

                <span>Free</span>
              </div>

              <div className="checkout-summary__divider" />

              <div className="checkout-summary__total">
                <span>Total</span>

                <strong>
                  ${total.toFixed(2)}
                </strong>
              </div>
            </aside>
          </div>
        </div>
      </Section>
    </main>
  );
}

export default Checkout;