import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { products, categories } from '../data/products';
import { useWishlist } from '../context/WishlistContext';
import { useNotification } from '../context/NotificationContext';
import './Products.css';

function Products() {
  const { addItem } = useCart();
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [filters, setFilters] = useState({
    categories: [],
    priceRange: 1000
  });
  const [searchParams] = useSearchParams();
  const { addToWishlist, isInWishlist } = useWishlist();
  const { addNotification } = useNotification();

  const handleCategoryChange = (category) => {
    setFilters(prev => {
      const newCategories = prev.categories.includes(category)
        ? prev.categories.filter(c => c !== category)
        : [...prev.categories, category];
      
      return { ...prev, categories: newCategories };
    });
  };

  const handlePriceChange = (price) => {
    setFilters(prev => ({ ...prev, priceRange: price }));
  };

  useEffect(() => {
    let result = products;
    const searchQuery = searchParams.get('search');
    
    if (searchQuery) {
      result = result.filter(product => 
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    if (filters.categories.length > 0) {
      result = result.filter(product => 
        filters.categories.includes(product.category)
      );
    }
    
    result = result.filter(product => product.price <= filters.priceRange);
    
    setFilteredProducts(result);
  }, [filters, searchParams]);

  const handleAddToCart = (e, product) => {
    e.preventDefault();
    addItem(product);
    addNotification('Added to cart!', 'success');
  };

  const handleAddToWishlist = (e, product) => {
    e.preventDefault();
    addToWishlist(product);
    addNotification('Added to wishlist!', 'success');
  };

  return (
    <div className="products-page">
      <div className="filters">
        <h3>Filters</h3>
        <div className="filter-section">
          <h4>Categories</h4>
          {categories.map(category => (
            <label key={category}>
              <input
                type="checkbox"
                checked={filters.categories.includes(category)}
                onChange={() => handleCategoryChange(category)}
              />
              {category}
            </label>
          ))}
        </div>
        <div className="filter-section">
          <h4>Price Range: ${filters.priceRange}</h4>
          <input
            type="range"
            min="0"
            max="1000"
            value={filters.priceRange}
            onChange={(e) => handlePriceChange(Number(e.target.value))}
          />
        </div>
      </div>

      <div className="products-grid">
        {filteredProducts.map(product => (
          <Link to={`/product/${product.id}`} key={product.id} className="product-card">
            <img src={product.image} alt={product.name} />
            <h3>{product.name}</h3>
            <p className="price">${product.price}</p>
            <button 
              className="btn btn-primary"
              onClick={(e) => handleAddToCart(e, product)}
            >
              Add to Cart
            </button>
            <button 
              className="btn btn-secondary"
              onClick={(e) => handleAddToWishlist(e, product)}
            >
              Add to Wishlist
            </button>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Products; 