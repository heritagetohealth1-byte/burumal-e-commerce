import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import CustomerSidebar from '../../../components/customer/Sidebar';
import { cartService } from '../../../services/cartService';
import { authService } from '../../../services/authService';
import { wishlistService } from '../../../services/wishlistService';
import { productService } from '../../../services/productService';

export default function CustomerWishlist() {
  const navigate = useNavigate();
  const user = authService.getUser();
  const [wishlistItems, setWishlistItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate('/auth/login');
      return;
    }

    // Clear any existing wishlist data to remove placeholders
    wishlistService.clearAllWishlists();
    // Initialize fresh wishlist storage
    wishlistService.initializeWishlist();

    // Load wishlist items (will be empty now)
    const loadWishlist = () => {
      const wishlist = wishlistService.getWishlist(user.id);
      const products = productService.getAllProducts();
      
      // Map wishlist items to full product details
      const itemsWithDetails = wishlist.map((wishlistItem) => {
        const product = products.find(p => p.id === wishlistItem.productId);
        return {
          ...wishlistItem,
          product,
          stock: product?.stock || 0,
          seller: product?.sellerName || 'Unknown Seller',
        };
      }).filter(item => item.product); // Only show items that still exist in products

      setWishlistItems(itemsWithDetails);
      setLoading(false);
    };

    loadWishlist();
  }, [user, navigate]);

  const handleAddToCart = (item: any) => {
    if (!item.product) return;
    
    cartService.addToCart(
      {
        id: item.product.id,
        name: item.product.name,
        price: item.product.price,
        currency: 'BIF',
        image: item.product.images[0] || '',
        stock: item.product.stock,
      },
      1
    );
    alert(`${item.product.name} added to cart!`);
  };

  const handleRemoveFromWishlist = (productId: string) => {
    if (user) {
      wishlistService.removeFromWishlist(user.id, productId);
      // Reload wishlist
      const wishlist = wishlistService.getWishlist(user.id);
      const products = productService.getAllProducts();
      const itemsWithDetails = wishlist.map((wishlistItem) => {
        const product = products.find(p => p.id === wishlistItem.productId);
        return {
          ...wishlistItem,
          product,
          stock: product?.stock || 0,
          seller: product?.sellerName || 'Unknown Seller',
        };
      }).filter(item => item.product);
      setWishlistItems(itemsWithDetails);
    }
  };

  const getStockStatus = (stock: number) => {
    if (stock === 0) return { text: 'Out of stock', color: 'text-red-600', icon: '✗' };
    if (stock <= 3) return { text: `Only ${stock} left`, color: 'text-orange-600', icon: '⚠️' };
    return { text: 'In stock', color: 'text-green-600', icon: '✓' };
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      <CustomerSidebar />
      
      <main className="flex-1 pb-20 lg:pb-0">
        <div className="container py-8">
          <h1 className="text-2xl font-bold mb-6">❤️ My Wishlist</h1>

          {loading ? (
            <div className="card text-center py-12">
              <p className="text-gray-600">Loading wishlist...</p>
            </div>
          ) : wishlistItems.length === 0 ? (
            <div className="card text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-3xl">❤️</span>
              </div>
              <p className="text-gray-600 mb-4">Your wishlist is empty</p>
              <Link to="/" className="inline-block px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
                Browse products
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {wishlistItems.map((item) => {
                const stockStatus = getStockStatus(item.stock);
                return (
                  <div key={item.productId} className="card">
                    <div className="aspect-square bg-gray-200 rounded-lg overflow-hidden mb-4">
                      <img
                        src={item.product?.images[0] || 'https://via.placeholder.com/150'}
                        alt={item.product?.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <Link to={`/product/${item.productId}`}>
                      <h3 className="font-bold text-lg mb-1 hover:text-primary-600 line-clamp-2">{item.product?.name}</h3>
                    </Link>
                    <p className="text-sm text-gray-600 mb-1">by {item.seller}</p>
                    <p className="font-bold text-xl text-primary-600 mb-2">
                      {item.product?.price.toLocaleString()} BIF
                    </p>
                    <p className={`text-sm font-medium mb-4 ${stockStatus.color}`}>
                      {stockStatus.icon} {stockStatus.text}
                    </p>
                    <div className="space-y-2">
                      <button
                        onClick={() => handleAddToCart(item)}
                        disabled={item.stock === 0}
                        className="w-full px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                      >
                        Add to Cart
                      </button>
                      <button
                        onClick={() => handleRemoveFromWishlist(item.productId)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 text-red-600 transition-colors"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
