import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
  return (
    <div className="home">
      <div className="hero">
        <h1>Welcome to ShopHub</h1>
        <p>Discover amazing products at great prices</p>
        <Link to="/products" className="btn btn-primary">
          Shop Now
        </Link>
      </div>
      
      <section className="featured-categories">
        <h2>Featured Categories</h2>
        <div className="category-grid">
          <div className="category-card">
            <img src="https://plus.unsplash.com/premium_photo-1679079456083-9f288e224e96?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Electronics" />
            <h3>Electronics</h3>
          </div>
          <div className="category-card">
            <img src="https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Fashion" />
            <h3>Fashion</h3>
          </div>
          <div className="category-card">
            <img src="https://images.unsplash.com/photo-1505691723518-36a5ac3be353?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Home & Living" />
            <h3>Home & Living</h3>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home; 