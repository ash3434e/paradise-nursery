import { useNavigate } from 'react-router-dom'
import './LandingPage.css'

export default function LandingPage() {
  const navigate = useNavigate()

  return (
    <main className="landing">
      <div className="landing-overlay" />
      <div className="landing-content">
        <div className="landing-badge">🌿 Welcome to</div>
        <h1 className="landing-title">Paradise Nursery</h1>
        <p className="landing-tagline">Where Every Home Becomes a Garden</p>
        <p className="landing-desc">
          At Paradise Nursery, we believe that plants transform spaces into sanctuaries.
          Our curated collection of premium houseplants — from air-purifying champions
          to lush tropical statement pieces — are lovingly grown and delivered to your door.
          Whether you are a first-time plant parent or a seasoned botanist, we have the
          perfect companion for every corner of your home.
        </p>
        <div className="landing-stats">
          <div className="stat">
            <span className="stat-num">200+</span>
            <span className="stat-label">Plant Varieties</span>
          </div>
          <div className="stat-divider" />
          <div className="stat">
            <span className="stat-num">15k+</span>
            <span className="stat-label">Happy Plant Parents</span>
          </div>
          <div className="stat-divider" />
          <div className="stat">
            <span className="stat-num">4.9★</span>
            <span className="stat-label">Customer Rating</span>
          </div>
        </div>
        <button
          className="get-started-btn"
          onClick={() => navigate('/products')}
          id="get-started-btn"
        >
          Explore Our Plants →
        </button>
      </div>
    </main>
  )
}
