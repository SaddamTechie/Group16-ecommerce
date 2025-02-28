import { useState } from 'react';
import { Link } from 'react-router-dom';
import './Cart.css';
import { useCart } from '../context/CartContext';

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const { items, cartTotal,updateQuantity,removeItem } = useCart();

  return (
    <div className="cart">
      <h1>Shopping Cart</h1>
      {items.length === 0 ? (
        <div className="empty-cart">
          <p>Your cart is empty</p>
          <Link to="/products" className="btn btn-primary">Continue Shopping</Link>
        </div>
      ) : (
        <>
          <div className="cart-items">
            {items.map(item => (
              <div key={item._id} className="cart-item">
                <img src={item.image} alt={item.name} />
                <div className="item-details">
                  <h3>{item.name}</h3>
                  <p className="price">${item.price}</p>
                </div>
                <div className="quantity-controls">
                  <button onClick={() => updateQuantity(item._id, item.quantity - 1)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => updateQuantity(item._id, item.quantity + 1)}>+</button>
                </div>
                <p className="item-total">${(item.price * item.quantity).toFixed(2)}</p>
                <button className="remove-btn" onClick={() => removeItem(item._id)}>Remove</button>
              </div>
            ))}
          </div>
          <div className="cart-summary">
            <h3>Order Summary</h3>
            <div className="summary-row">
              <span>Subtotal:</span>
              <span>${cartTotal.toFixed(2)}</span>
            </div>
            <div className="summary-row">
              <span>Shipping:</span>
              <span>FREE</span>
            </div>
            <div className="summary-row total">
              <span>Total:</span>
              <span>${cartTotal.toFixed(2)}</span>
            </div>
            <Link to="/checkout" className="btn btn-primary checkout-btn">
              Proceed to Checkout
            </Link>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart; 