import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CustomerSidebar from '../../../components/customer/Sidebar';
import { authService } from '../../../services/authService';
import { walletService } from '../../../services/walletService';
import { cartService } from '../../../services/cartService';
import { orderService } from '../../../services/orderService';
import { wishlistService } from '../../../services/wishlistService';
import { productService } from '../../../services/productService';

export default function CustomerDashboard() {
  const navigate = useNavigate();
  const user = authService.getUser();
  const [wallet, setWallet] = useState(walletService.getWallet());
  const [cartCount, setCartCount] = useState(cartService.getCartCount());
  const [orderCount, setOrderCount] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0);
  const [recentOrder, setRecentOrder] = useState<any>(null);
  const [recommendedProducts, setRecommendedProducts] = useState<any[]>([]);

  useEffect(() => {
    // Redirect to login if not authenticated
    if (!user) {
      navigate('/auth/login');
      return;
    }
    // Redirect sellers to access denied page with clear message
    if (user && user.role === 'seller') {
      navigate('/access-denied');
      return;
    }
  }, [user, navigate]);

  useEffect(() => {
    // Initialize mock products if none exist
    productService.initializeMockProducts();
    
    // Update data periodically
    const interval = setInterval(() => {
      setWallet(walletService.getWallet());
      setCartCount(cartService.getCartCount());
      if (user) {
        setOrderCount(orderService.getOrderCount(user.id));
        setWishlistCount(wishlistService.getWishlistCount(user.id));
        const orders = orderService.getOrdersByUserId(user.id);
        setRecentOrder(orders.length > 0 ? orders[0] : null);
        const products = productService.getAllProducts();
        setRecommendedProducts(products.slice(0, 4));
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [user]);

  const greeting = user ? `${user.firstName} ${user.lastName}` : 'Customer';

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const query = formData.get('search') as string;
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered': return 'text-green-600';
      case 'shipped': return 'text-blue-600';
      case 'processing': return 'text-yellow-600';
      case 'pending': return 'text-gray-600';
      case 'cancelled': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-gray-50">
      <CustomerSidebar />
      
      <main className="flex-1 pb-20 lg:pb-0">
        <div className="container py-8">
          {/* Professional Welcome Header */}
          <div className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-2xl p-6 md:p-8 mb-8 text-white shadow-lg">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold mb-2">
                  Welcome back, {user?.firstName}!
                </h1>
                <p className="text-primary-100 text-sm md:text-base">
                  Here's what's happening with your account today.
                </p>
              </div>
              <div className="flex items-center gap-3">
                <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
                  <p className="text-xs text-primary-100">Wallet Balance</p>
                  <p className="text-lg font-bold">{wallet.balance.toLocaleString()} BIF</p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="card p-4 hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate('/orders')}>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <span className="text-2xl">📦</span>
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-800">{orderCount}</p>
                  <p className="text-sm text-gray-600">Orders</p>
                </div>
              </div>
            </div>
            <div className="card p-4 hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate('/wishlist')}>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                  <span className="text-2xl">❤️</span>
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-800">{wishlistCount}</p>
                  <p className="text-sm text-gray-600">Wishlist</p>
                </div>
              </div>
            </div>
            <div className="card p-4 hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate('/cart')}>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <span className="text-2xl">🛒</span>
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-800">{cartCount}</p>
                  <p className="text-sm text-gray-600">Cart</p>
                </div>
              </div>
            </div>
            <div className="card p-4 hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate('/profile')}>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <span className="text-2xl">👤</span>
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-800">Profile</p>
                  <p className="text-sm text-gray-600">Settings</p>
                </div>
              </div>
            </div>
          </div>

          {/* Search Bar */}
          <div className="mb-8">
            <form onSubmit={handleSearch}>
              <div className="relative">
                <input
                  name="search"
                  type="text"
                  placeholder="Search for products, categories, or sellers..."
                  className="w-full px-6 py-4 pl-12 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none shadow-sm text-lg"
                />
                <svg
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 h-6 w-6 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </form>
          </div>

          {/* Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Recent Order */}
            {recentOrder ? (
              <div className="card">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold">Recent Order</h2>
                  <Link to="/orders" className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                    View All
                  </Link>
                </div>
                <div className="bg-gray-50 p-4 rounded-xl">
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-bold text-gray-800">{recentOrder.id}</span>
                    <span className={`${getStatusColor(recentOrder.status)} font-medium capitalize text-sm px-3 py-1 bg-white rounded-full`}>
                      {recentOrder.status}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm mb-2">{recentOrder.items.length} item(s)</p>
                  <p className="text-2xl font-bold text-primary-600">{recentOrder.total.toLocaleString()} BIF</p>
                  <Link to="/orders" className="mt-4 inline-block w-full text-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
                    Track Order
                  </Link>
                </div>
              </div>
            ) : (
              <div className="card">
                <h2 className="text-lg font-semibold mb-4">Recent Order</h2>
                <div className="bg-gray-50 p-8 rounded-xl text-center">
                  <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <span className="text-3xl">📦</span>
                  </div>
                  <p className="text-gray-600 mb-4">No orders yet</p>
                  <Link to="/" className="inline-block px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
                    Start Shopping
                  </Link>
                </div>
              </div>
            )}

            {/* Quick Actions */}
            <div className="card">
              <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
              <div className="space-y-3">
                <Link to="/cart" className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                    <span className="text-xl">🛒</span>
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">View Cart</p>
                    <p className="text-sm text-gray-600">{cartCount} items</p>
                  </div>
                  <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
                <Link to="/wishlist" className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                    <span className="text-xl">❤️</span>
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">Wishlist</p>
                    <p className="text-sm text-gray-600">{wishlistCount} saved items</p>
                  </div>
                  <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
                <Link to="/profile" className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                    <span className="text-xl">👤</span>
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">Edit Profile</p>
                    <p className="text-sm text-gray-600">Update your information</p>
                  </div>
                  <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>

          {/* Recommended Products */}
          {recommendedProducts.length > 0 ? (
            <div className="card">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold">Recommended for You</h2>
                <Link to="/" className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                  Browse All
                </Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {recommendedProducts.map((product) => (
                  <Link key={product.id} to={`/product/${product.id}`} className="group">
                    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300">
                      <div className="aspect-square bg-gray-100 overflow-hidden">
                        <img
                          src={product.images[0] || 'https://via.placeholder.com/150'}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="font-medium text-sm mb-2 line-clamp-2 group-hover:text-primary-600 transition-colors">{product.name}</h3>
                        <div className="flex items-center justify-between">
                          <p className="font-bold text-primary-600">{product.price.toLocaleString()} BIF</p>
                          <div className="flex items-center text-yellow-500 text-sm">
                            <span>⭐</span>
                            <span className="ml-1 text-gray-600">{product.rating}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ) : (
            <div className="card">
              <h2 className="text-lg font-semibold mb-4">Recommended for You</h2>
              <div className="text-center text-gray-500 py-12">
                <div className="w-16 h-16 bg-gray-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-3xl">🛍️</span>
                </div>
                <p>No products available at the moment</p>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
