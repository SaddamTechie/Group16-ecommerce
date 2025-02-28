import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './ProductDetail.css';
import { useNotification } from '../context/NotificationContext';
import { useCart } from '../context/CartContext';

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const { addNotification } = useNotification();
  const { addItem } = useCart();
  

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const response = await fetch(`/api/products/${id}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setProduct(data.data);
      } catch (error) {
        throw error;
      }
    };

    loadProduct();
  }, [id]);
  

  if (!product) {
    return <div className="loading">Loading...</div>;
  }

  const handleAddToCart = (e, product) => {
    e.preventDefault();
    addItem(product);
    addNotification('Added to cart!', 'success');
  };
  return (
    <div className="product-detail">
      <div className="product-image">
        <img src={product.image} alt={product.name} />
      </div>
      <div className="product-info">
        <h1>{product.name}</h1>
        <p className="price">${product.price}</p>
        <p className="description">{product.description}</p>
        <div className="specs">
          {/* <h3>Specifications:</h3>
          <ul>
            {product.specs.map((spec, index) => (
              <li key={index}>{spec}</li>
            ))}
          </ul> */}
        </div>
        <div className="purchase-controls">
          <div className="quantity">
            <button onClick={() => setQuantity(q => Math.max(1, q - 1))}>-</button>
            <span>{quantity}</span>
            <button onClick={() => setQuantity(q => q + 1)}>+</button>
          </div>
          <button className="btn btn-primary" onClick={(e) => handleAddToCart(e, product)}>Add to Cart</button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail; 