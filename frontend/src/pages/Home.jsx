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
            <img src="/electronics.jpg" alt="Electronics" />
            <h3>Electronics</h3>
          </div>
          <div className="category-card">
            <img src="/fashion.jpg" alt="Fashion" />
            <h3>Fashion</h3>
          </div>
          <div className="category-card">
            <img src="/home.jpg" alt="Home & Living" />
            <h3>Home & Living</h3>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home; 