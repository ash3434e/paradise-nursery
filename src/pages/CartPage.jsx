import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {
  selectCartItems,
  selectTotalItems,
  selectTotalCost,
  removeItem,
  increaseQuantity,
  decreaseQuantity,
} from '../store/cartSlice'
import Header from '../components/Header'
import './CartPage.css'

export default function CartPage() {
  const cartItems = useSelector(selectCartItems)
  const totalItems = useSelector(selectTotalItems)
  const totalCost = useSelector(selectTotalCost)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleCheckout = () => {
    alert(`🎉 Order placed!\n\n${totalItems} plant(s) on their way!\nTotal: $${totalCost.toFixed(2)}\n\nThank you for shopping at Paradise Nursery!`)
  }

  return (
    <div className="cart-wrapper">
      <Header page="cart" />
      <main className="cart-main">
        <div className="cart-heading">
          <h1 className="cart-title">Your Shopping Cart</h1>
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
            {/* Items list */}
            <div className="cart-items">
              {cartItems.map(item => (
                <div key={item.id} className="cart-item" id={`cart-item-${item.id}`}>
                  <img src={item.image} alt={item.name} className="item-thumb" />
                  <div className="item-info">
                    <h3 className="item-name">{item.name}</h3>
                    <p className="item-unit-price">Unit price: <strong>${item.price.toFixed(2)}</strong></p>
                  </div>
                  <div className="item-qty-control">
                    <button
                      className="qty-btn"
                      onClick={() => dispatch(decreaseQuantity(item.id))}
                      id={`decrease-${item.id}`}
                      aria-label="Decrease quantity"
                    >−</button>
                    <span className="qty-value">{item.quantity}</span>
                    <button
                      className="qty-btn"
                      onClick={() => dispatch(increaseQuantity(item.id))}
                      id={`increase-${item.id}`}
                      aria-label="Increase quantity"
                    >+</button>
                  </div>
                  <div className="item-subtotal">
                    ${(item.price * item.quantity).toFixed(2)}
                  </div>
                  <button
                    className="delete-btn"
                    onClick={() => dispatch(removeItem(item.id))}
                    id={`delete-${item.id}`}
                    aria-label={`Remove ${item.name}`}
                  >
                    🗑
                  </button>
                </div>
              ))}
            </div>

            {/* Order summary */}
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
              <div className="summary-total">
                <span>Total</span>
                <span className="total-amount">${totalCost.toFixed(2)}</span>
              </div>
              <button
                className="checkout-btn"
                onClick={handleCheckout}
                id="checkout-btn"
              >
                Checkout →
              </button>
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
