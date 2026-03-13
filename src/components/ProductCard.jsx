import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addItem, selectCartItems } from '../store/cartSlice'
import './ProductCard.css'

export default function ProductCard({ plant }) {
  const dispatch = useDispatch()
  const cartItems = useSelector(selectCartItems)
  const isInCart = cartItems.some(item => item.id === plant.id)

  const handleAdd = () => {
    dispatch(addItem({
      id: plant.id,
      name: plant.name,
      price: plant.price,
      image: plant.image,
    }))
  }

  return (
    <article className="product-card" id={`plant-${plant.id}`}>
      <div className="card-image-wrap">
        <img src={plant.image} alt={plant.name} className="card-image" loading="lazy" />
        <span className="card-category-tag">{plant.category}</span>
      </div>
      <div className="card-body">
        <h3 className="card-name">{plant.name}</h3>
        <p className="card-desc">{plant.description}</p>
        <div className="card-footer">
          <span className="card-price">${plant.price.toFixed(2)}</span>
          <button
            className={`add-to-cart-btn ${isInCart ? 'in-cart' : ''}`}
            onClick={handleAdd}
            disabled={isInCart}
            id={`add-btn-${plant.id}`}
          >
            {isInCart ? '✓ In Cart' : '+ Add to Cart'}
          </button>
        </div>
      </div>
    </article>
  )
}
