import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import './ProductReviews.css';

function ProductReviews({ productId }) {
  const { user } = useAuth();
  const [reviews, setReviews] = useState([
    {
      id: 1,
      userId: 'user1',
      username: 'John Doe',
      rating: 5,
      comment: 'Great product! Exactly what I needed.',
      date: '2024-02-20'
    }
  ]);
  const [newReview, setNewReview] = useState({
    rating: 5,
    comment: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!user) return;

    const review = {
      id: Date.now(),
      userId: user.id,
      username: user.email,
      ...newReview,
      date: new Date().toISOString().split('T')[0]
    };

    setReviews(prev => [...prev, review]);
    setNewReview({ rating: 5, comment: '' });
  };

  return (
    <div className="product-reviews">
      <h3>Customer Reviews</h3>
      
      {user && (
        <form className="review-form" onSubmit={handleSubmit}>
          <div className="rating-input">
            <label>Rating:</label>
            <select
              value={newReview.rating}
              onChange={(e) => setNewReview(prev => ({
                ...prev,
                rating: Number(e.target.value)
              }))}
            >
              {[5, 4, 3, 2, 1].map(num => (
                <option key={num} value={num}>{num} stars</option>
              ))}
            </select>
          </div>
          <div className="comment-input">
            <label>Your Review:</label>
            <textarea
              value={newReview.comment}
              onChange={(e) => setNewReview(prev => ({
                ...prev,
                comment: e.target.value
              }))}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Submit Review
          </button>
        </form>
      )}

      <div className="reviews-list">
        {reviews.map(review => (
          <div key={review.id} className="review-item">
            <div className="review-header">
              <span className="stars">{'★'.repeat(review.rating)}{'☆'.repeat(5-review.rating)}</span>
              <span className="reviewer">{review.username}</span>
              <span className="date">{review.date}</span>
            </div>
            <p className="comment">{review.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductReviews; 