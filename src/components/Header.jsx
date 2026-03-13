import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectTotalItems } from '../store/cartSlice'
import './Header.css'

export default function Header({ page }) {
  const totalItems = useSelector(selectTotalItems)
  const navigate = useNavigate()

  return (
    <header className="header">
      <div className="header-logo" onClick={() => navigate('/')} role="button" tabIndex={0}>
        <span className="logo-icon">🌿</span>
        <span className="logo-text">Paradise Nursery</span>
      </div>

      <nav className="header-nav">
        {page !== 'products' && (
          <Link to="/products" className="nav-link">Shop Plants</Link>
        )}
        {page !== 'landing' && page !== 'cart' && (
          <Link to="/" className="nav-link">Home</Link>
        )}
        {page === 'cart' && (
          <Link to="/products" className="nav-link">← Continue Shopping</Link>
        )}

        <Link to="/cart" className="cart-btn" id="cart-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
          </svg>
          {totalItems > 0 && (
            <span className="cart-badge" id="cart-count">{totalItems}</span>
          )}
        </Link>
      </nav>
    </header>
  )
}
