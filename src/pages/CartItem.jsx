import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import {
  selectCartItems,
  selectTotalItems,
  selectTotalCost,
  removeItem,
  updateQuantity,
} from '../store/CartSlice'
import './CartPage.css'

export default function CartItem() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const cartItems  = useSelector(selectCartItems)
  const totalItems = useSelector(selectTotalItems)
  const totalCost  = useSelector(selectTotalCost)

  // "+" increment button — increases quantity by 1 via updateQuantity
  const handleIncrement = (item) => {
    dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }))
  }

  // "-" decrement button — decreases quantity; removes if it reaches 0
  const handleDecrement = (item) => {
    dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }))
  }

  // Delete button — removes the item from the cart entirely
  const handleDelete = (id) => {
    dispatch(removeItem(id))
  }

  // Checkout button — shows an alert / "Coming Soon" message
  const handleCheckout = () => {
    alert('Coming Soon! 🌿\n\nThank you for shopping at Paradise Nursery.\nYour order is being processed!')
  }

  return (
    <div className="cart-wrapper">
      {/* Navbar — consistent with Product Listing page */}
      <header className="header">
        <div className="header-logo">
          <span className="logo-icon">🌿</span>
          <span className="logo-text">Paradise Nursery</span>
        </div>
        <nav className="header-nav">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/products" className="nav-link">Plants</Link>
          <Link to="/cart" className="cart-btn" id="cart-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24"
              fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
            </svg>
            {totalItems > 0 && (
              <span className="cart-badge" id="cart-count">{totalItems}</span>
            )}
          </Link>
        </nav>
      </header>

      <main className="cart-main">
        <div className="cart-heading">
          <h1 className="cart-title">Your Shopping Cart</h1>
          {/* Total number of plants in the cart */}
          <div className="cart-summary-badge">
            🌿 {totalItems} {totalItems === 1 ? 'Plant' : 'Plants'} in Cart
          </div>
        </div>

        {cartItems.length === 0 ? (
          <div className="empty-cart">
            <div className="empty-icon">🛒</div>
            <h2>Your cart is empty</h2>
            <p>Looks like you haven't added any plants yet.</p>
            <button className="continue-btn" onClick={() => navigate('/products')}>
              Shop Plants →
            </button>
          </div>
        ) : (
          <div className="cart-layout">
            {/* Cart items list */}
            <div className="cart-items">
              {cartItems.map(item => (
                <div key={item.id} className="cart-item" id={`cart-item-${item.id}`}>
                  {/* Plant image */}
                  <img src={item.image} alt={item.name} className="item-thumb" />

                  <div className="item-info">
                    {/* Plant name */}
                    <h3 className="item-name">{item.name}</h3>
                    {/* Unit price */}
                    <p className="item-unit-price">
                      Unit price: <strong>${item.price.toFixed(2)}</strong>
                    </p>
                  </div>

                  {/* Quantity controls */}
                  <div className="item-qty-control">
                    {/* "-" decrement button */}
                    <button
                      className="qty-btn"
                      onClick={() => handleDecrement(item)}
                      id={`decrease-${item.id}`}
                      aria-label="Decrease quantity"
                    >−</button>

                    <span className="qty-value">{item.quantity}</span>

                    {/* "+" increment button — calls handleIncrement, updates via updateQuantity */}
                    <button
                      className="qty-btn"
                      onClick={() => handleIncrement(item)}
                      id={`increase-${item.id}`}
                      aria-label="Increase quantity"
                    >+</button>
                  </div>

                  {/* Total cost for this item based on quantity */}
                  <div className="item-subtotal">
                    ${(item.price * item.quantity).toFixed(2)}
                  </div>

                  {/* Delete button — removes item from cart */}
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(item.id)}
                    id={`delete-${item.id}`}
                    aria-label={`Remove ${item.name}`}
                  >
                    🗑
                  </button>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <aside className="order-summary">
              <h2 className="summary-title">Order Summary</h2>
              <div className="summary-row">
                <span>Total Plants</span>
                <strong>{totalItems}</strong>
              </div>
              <div className="summary-row">
                <span>Subtotal</span>
                <strong>${totalCost.toFixed(2)}</strong>
              </div>
              <div className="summary-row">
                <span>Shipping</span>
                <strong className="free">FREE</strong>
              </div>
              <div className="summary-divider" />
              {/* Total cart amount */}
              <div className="summary-total">
                <span>Total</span>
                <span className="total-amount">${totalCost.toFixed(2)}</span>
              </div>

              {/* Checkout button — shows alert / Coming Soon message */}
              <button
                className="checkout-btn"
                onClick={handleCheckout}
                id="checkout-btn"
              >
                Checkout →
              </button>

              {/* Continue Shopping button — navigates to product listing page */}
              <button
                className="continue-shopping-btn"
                onClick={() => navigate('/products')}
                id="continue-shopping-btn"
              >
                ← Continue Shopping
              </button>
            </aside>
          </div>
        )}
      </main>
    </div>
  )
}
