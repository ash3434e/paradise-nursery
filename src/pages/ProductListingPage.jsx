import Header from '../components/Header'
import ProductCard from '../components/ProductCard'
import plants from '../data/plants'
import './ProductListingPage.css'

// Group plants by category
const categories = plants.reduce((acc, plant) => {
  if (!acc[plant.category]) acc[plant.category] = []
  acc[plant.category].push(plant)
  return acc
}, {})

const categoryIcons = {
  'Air Purifiers': '💨',
  'Tropical': '🌴',
  'Succulents': '🪴',
}

export default function ProductListingPage() {
  return (
    <div className="plp-wrapper">
      <Header page="products" />
      <main className="plp-main">
        <div className="plp-hero">
          <h1 className="plp-title">Our Plant Collection</h1>
          <p className="plp-subtitle">Handpicked beauties for every home and lifestyle</p>
        </div>

        {Object.entries(categories).map(([category, plants]) => (
          <section key={category} className="category-section" id={`category-${category.replace(/\s+/g, '-').toLowerCase()}`}>
            <div className="category-header">
              <span className="category-icon">{categoryIcons[category] || '🌱'}</span>
              <h2 className="category-title">{category}</h2>
              <div className="category-line" />
            </div>
            <div className="plant-grid">
              {plants.map(plant => (
                <ProductCard key={plant.id} plant={plant} />
              ))}
            </div>
          </section>
        ))}
      </main>
    </div>
  )
}
