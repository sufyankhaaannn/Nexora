import useCart from '../context/useCart';

function CartTest() {
  const {
    cartItems,
    cartCount,
    cartTotal,
    addToCart,
    clearCart,
  } = useCart();

  const testProduct = {
    id: 999,
    title: 'NEXORA Test Product',
    price: 100,
    quantity: 1,
  };

  return (
    <div className="container" style={{ paddingBlock: '4rem' }}>
      <h1>Cart Test</h1>

      <p>Items: {cartCount}</p>

      <p>Total: ${cartTotal.toFixed(2)}</p>

      <button
        type="button"
        onClick={() => addToCart(testProduct)}
      >
        Add Test Product
      </button>

      <button
        type="button"
        onClick={clearCart}
      >
        Clear Cart
      </button>

      <pre>
        {JSON.stringify(cartItems, null, 2)}
      </pre>
    </div>
  );
}

export default CartTest;