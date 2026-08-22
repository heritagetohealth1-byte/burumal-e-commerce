import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import MobileNav from '../../components/layout/MobileNav';
import Button from '../../components/common/Button';
import { productService } from '../../services/productService';
import { categoryService } from '../../services/categoryService';
import { cartService } from '../../services/cartService';

export default function Home() {
  const { t } = useTranslation();
  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);

  useEffect(() => {
    // Initialize mock products if none exist
    productService.initializeMockProducts();
    // Initialize mock categories if none exist
    categoryService.initializeMockCategories();
    
    // Load all products and categories asynchronously
    const loadData = async () => {
      setProducts(await productService.getAllProducts());
      setCategories(categoryService.getAllCategories());
    };
    
    loadData();
  }, []);

  const popularProducts = (products || []).slice(0, 8).map(product => ({
    id: product.id,
    name: product.name,
    price: product.price,
    currency: 'BIF',
    image: product.images[0] || 'https://via.placeholder.com/200',
    rating: product.rating,
    reviewCount: product.reviews,
    seller: { name: product.sellerName, verified: true },
    stock: product.stock,
  }));

  const handleAddToCart = (product: any) => {
    cartService.addToCart(product, 1);
    alert(`${product.name} added to cart!`);
  };

  const verifiedSellers = [
    { id: 1, name: 'Maison XYZ', rating: 4.8, fulfillment: 98, logo: '🏪' },
    { id: 2, name: 'Tech Hub', rating: 4.6, fulfillment: 95, logo: '💻' },
    { id: 3, name: 'Fashion House', rating: 4.9, fulfillment: 99, logo: '👗' },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 pb-20 md:pb-0">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary-600 to-primary-800 text-white py-12 md:py-20">
          <div className="container">
            <div className="max-w-2xl">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">{t('home.title')}</h1>
              <h2 className="text-2xl md:text-3xl font-semibold mb-4 flex items-center justify-between">
                {t('home.subtitle')}
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/20">
                  <img src="https://flagcdn.com/w160/bi.png" alt="Burundi flag" className="w-24 h-16 object-contain" />
                </div>
              </h2>
              <p className="text-lg mb-8 opacity-90">{t('home.description')}</p>
              <Link
                to="/search"
                className="inline-block bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                {t('home.shopNow')}
              </Link>
            </div>
          </div>
        </section>

        {/* Categories */}
        <section className="py-12 bg-white">
          <div className="container">
            <h2 className="text-2xl font-bold mb-6">{t('home.categories')}</h2>
            <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
              {(categories || []).map((category) => (
                <Link
                  key={category.id}
                  to={`/category/${category.slug}`}
                  className="flex flex-col items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <span className="text-3xl mb-2">{category.icon}</span>
                  <span className="text-sm font-medium text-center">{category.name}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Popular Products */}
        <section className="py-12 bg-gray-50">
          <div className="container">
            <h2 className="text-2xl font-bold mb-6">{t('home.popularProducts')}</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {popularProducts.map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow"
                >
                  <Link to={`/product/${product.id}`}>
                    <div className="aspect-square bg-gray-200">
                      <img
                        src={product.image}
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
                        {product.rating} ({product.reviewCount})
                      </span>
                    </div>
                    <p className="font-bold text-primary-600 mb-2">
                      {product.price.toLocaleString()} {product.currency}
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
        </section>

        {/* Verified Sellers */}
        <section className="py-12 bg-white">
          <div className="container">
            <h2 className="text-2xl font-bold mb-6">{t('home.verifiedSellers')}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {verifiedSellers.map((seller) => (
                <div key={seller.id} className="card">
                  <div className="flex items-center mb-3">
                    <span className="text-3xl mr-3">{seller.logo}</span>
                    <div>
                      <h3 className="font-semibold">{seller.name}</h3>
                      <span className="text-xs text-green-600">✓ {t('home.verifiedBusinesses')}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <span>⭐ {seller.rating}</span>
                    <span>{seller.fulfillment}% fulfilled</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <MobileNav />
    </div>
  );
}
