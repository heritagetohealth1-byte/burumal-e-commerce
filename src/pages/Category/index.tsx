import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import MobileNav from '../../components/layout/MobileNav';
import Button from '../../components/common/Button';
import { productService } from '../../services/productService';
import { categoryService } from '../../services/categoryService';
import { cartService } from '../../services/cartService';

export default function Category() {
  const { slug } = useParams();
  const [products, setProducts] = useState<any[]>([]);
  const [categoryName, setCategoryName] = useState<string>('');
  const [productFilter, setProductFilter] = useState('all');
  const [sortBy, setSortBy] = useState('default');

  useEffect(() => {
    // Initialize mock products if none exist
    productService.initializeMockProducts();
    // Initialize mock categories if none exist
    categoryService.initializeMockCategories();
    
    // Get category name
    const category = categoryService.getCategoryBySlug(slug || '');
    setCategoryName(category?.name || slug || 'Category');
    
    // Load products filtered by category
    if (slug) {
      setProducts(productService.getProductsByCategory(slug));
    } else {
      setProducts(productService.getAllProducts());
    }
  }, [slug]);

  // Apply filters and sorting
  const filteredAndSortedProducts = products.filter(product => {
    if (productFilter === 'in-stock') return product.stock > 0;
    if (productFilter === 'on-sale') return product.onSale === true;
    return true;
  }).sort((a, b) => {
    switch (sortBy) {
      case 'price-low-high':
        return a.price - b.price;
      case 'price-high-low':
        return b.price - a.price;
      case 'rating':
        return b.rating - a.rating;
      case 'newest':
        return new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime();
      default:
        return 0;
    }
  });

  const handleAddToCart = (product: any) => {
    cartService.addToCart(product, 1);
    alert(`${product.name} added to cart!`);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 pb-20 md:pb-0">
        <div className="container py-8">
          <h1 className="text-2xl font-bold mb-6 capitalize">{categoryName}</h1>
          
          {/* Filters */}
          <div className="mb-6 flex gap-4 flex-wrap">
            <select 
              className="input-field w-auto"
              value={productFilter}
              onChange={(e) => setProductFilter(e.target.value)}
            >
              <option value="all">All Products</option>
              <option value="in-stock">In Stock</option>
              <option value="on-sale">On Sale</option>
            </select>
            <select 
              className="input-field w-auto"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="default">Default</option>
              <option value="price-low-high">Price: Low to High</option>
              <option value="price-high-low">Price: High to Low</option>
              <option value="newest">Newest</option>
              <option value="rating">Rating</option>
            </select>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredAndSortedProducts.map((product) => (
              <div key={product.id} className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                <Link to={`/product/${product.id}`}>
                  <div className="aspect-square bg-gray-200">
                    <img
                      src={product.images[0] || 'https://via.placeholder.com/200'}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </Link>
                <div className="p-3">
                  <Link to={`/product/${product.id}`}>
                    <h3 className="font-medium text-sm mb-1 line-clamp-2 hover:text-primary-600">{product.name}</h3>
                  </Link>
                  <div className="flex items-center mb-1">
                    <span className="text-yellow-500">⭐</span>
                    <span className="text-xs text-gray-600 ml-1">
                      {product.rating} ({product.reviews})
                    </span>
                  </div>
                  <p className="font-bold text-primary-600 mb-2">
                    {product.price.toLocaleString()} BIF
                  </p>
                  <Button
                    size="sm"
                    fullWidth
                    onClick={() => handleAddToCart(product)}
                    disabled={product.stock === 0}
                  >
                    {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
      <MobileNav />
    </div>
  );
}
