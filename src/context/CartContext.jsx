import {
  useCallback,
  useEffect,
  useState,
} from 'react';

import CartContext from './CartContextDefinition';

function getStoredCart() {
  try {
    const storedCart =
      localStorage.getItem(
        'nexora-cart',
      );

    if (!storedCart) {
      return [];
    }

    const parsedCart =
      JSON.parse(storedCart);

    return Array.isArray(parsedCart)
      ? parsedCart
      : [];
  } catch {
    return [];
  }
}

function normalizeQuantity(quantity) {
  const parsedQuantity =
    Number(quantity);

  if (!Number.isFinite(parsedQuantity)) {
    return 1;
  }

  return Math.max(
    1,
    Math.floor(parsedQuantity),
  );
}

function getMaximumQuantity(product) {
  const stock =
    Number(product?.stock);

  if (
    Number.isFinite(stock) &&
    stock > 0
  ) {
    return Math.floor(stock);
  }

  return Infinity;
}

function clampQuantity(
  quantity,
  product,
) {
  const normalizedQuantity =
    normalizeQuantity(quantity);

  const maximumQuantity =
    getMaximumQuantity(product);

  return Math.min(
    normalizedQuantity,
    maximumQuantity,
  );
}

function CartProvider({ children }) {
  const [cartItems, setCartItems] =
    useState(getStoredCart);

  useEffect(() => {
    localStorage.setItem(
      'nexora-cart',
      JSON.stringify(cartItems),
    );
  }, [cartItems]);

  function addToCart(
    product,
    quantity = 1,
  ) {
    if (!product?.id) {
      return;
    }

    setCartItems((currentItems) => {
      const existingItem =
        currentItems.find(
          (item) =>
            item.id === product.id,
        );

      const requestedQuantity =
        normalizeQuantity(quantity);

      const maximumQuantity =
        getMaximumQuantity(product);

      if (existingItem) {
        const nextQuantity =
          Math.min(
            existingItem.quantity +
              requestedQuantity,
            maximumQuantity,
          );

        return currentItems.map(
          (item) =>
            item.id === product.id
              ? {
                  ...item,
                  quantity:
                    nextQuantity,
                }
              : item,
        );
      }

      const nextQuantity =
        clampQuantity(
          requestedQuantity,
          product,
        );

      return [
        ...currentItems,
        {
          ...product,
          quantity:
            nextQuantity,
        },
      ];
    });
  }

  function removeFromCart(
    productId,
  ) {
    setCartItems((currentItems) =>
      currentItems.filter(
        (item) =>
          item.id !== productId,
      ),
    );
  }

  function updateQuantity(
    productId,
    quantity,
  ) {
    setCartItems((currentItems) =>
      currentItems
        .map((item) => {
          if (
            item.id !== productId
          ) {
            return item;
          }

          const nextQuantity =
            clampQuantity(
              quantity,
              item,
            );

          return {
            ...item,
            quantity:
              nextQuantity,
          };
        })
        .filter(
          (item) =>
            item.quantity > 0,
        ),
    );
  }

  const clearCart = useCallback(() => {
    setCartItems([]);
  }, []);

  const cartCount =
    cartItems.reduce(
      (total, item) =>
        total + item.quantity,
      0,
    );

  const cartTotal =
    cartItems.reduce(
      (total, item) =>
        total +
        Number(item.price || 0) *
          item.quantity,
      0,
    );

  const value = {
    cartItems,
    cartCount,
    cartTotal,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
  };

  return (
    <CartContext.Provider
      value={value}
    >
      {children}
    </CartContext.Provider>
  );
}

export default CartProvider;