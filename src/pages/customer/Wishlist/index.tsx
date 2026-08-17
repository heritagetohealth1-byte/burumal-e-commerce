import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import CustomerSidebar from '../../../components/customer/Sidebar';
import { cartService } from '../../../services/cartService';
import { authService } from '../../../services/authService';

export default function CustomerWishlist() {
  const navigate = useNavigate();
  const user = authService.getUser();

  useEffect(() => {
    if (!user) {
      navigate('/auth/login');
    }
  }, [user, navigate]);

  const wishlistItems = [
    {
      id: '1',
      name: 'Nike Shoes',
      image: 'https://via.placeholder.com/150',
      price: 85000,
      stock: 'In stock',
      stockColor: 'text-green-600',
      seller: 'Maison XYZ',
    },
    {
      id: '2',
      name: 'Samsung A15',
      image: 'https://via.placeholder.com/150',
      price: 450000,
      stock: 'Only 3 left',
      stockColor: 'text-orange-600',
      seller: 'Tech Hub',
    },
    {
      id: '3',
      name: 'T-Shirt',
      image: 'https://via.placeholder.com/150',
      price: 20000,
      stock: 'In stock',
      stockColor: 'text-green-600',
      seller: 'Fashion House',
    },
    {
      id: '4',
      name: 'Headphones',
      image: 'https://via.placeholder.com/150',
      price: 65000,
      stock: 'Out of stock',
      stockColor: 'text-red-600',
      seller: 'Electronics Plus',
    },
  ];

  const handleAddToCart = (item: any) => {
    cartService.addToCart(
      {
        id: item.id,
        name: item.name,
        price: item.price,
        currency: 'BIF',
        image: item.image,
        stock: item.stock !== 'Out of stock' ? 10 : 0,
      },
      1
    );
    alert(`${item.name} added to cart!`);
  };

  const handleRemoveFromWishlist = (_itemId: string) => {
    alert('Item removed from wishlist');
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      <CustomerSidebar />
      
      <main className="flex-1 pb-20 lg:pb-0">
        <div className="container py-8">
          <h1 className="text-2xl font-bold mb-6">❤️ My Wishlist</h1>

          {wishlistItems.length === 0 ? (
            <div className="card text-center py-12">
              <p className="text-gray-600 mb-4">Your wishlist is empty</p>
              <Link to="/" className="text-primary-600 hover:underline">
                Browse products
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {wishlistItems.map((item) => (
                <div key={item.id} className="card">
                  <div className="aspect-square bg-gray-200 rounded-lg overflow-hidden mb-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <Link to={`/product/${item.id}`}>
                    <h3 className="font-bold text-lg mb-1 hover:text-primary-600">{item.name}</h3>
                  </Link>
                  <p className="text-sm text-gray-600 mb-1">by {item.seller}</p>
                  <p className="font-bold text-xl text-primary-600 mb-2">
                    {item.price.toLocaleString()} BIF
                  </p>
                  <p className={`text-sm font-medium mb-4 ${item.stockColor}`}>
                    {item.stock === 'In stock' ? '✓' : item.stock === 'Only 3 left' ? '⚠️' : '✗'} {item.stock}
                  </p>
                  <div className="space-y-2">
                    <button
                      onClick={() => handleAddToCart(item)}
                      disabled={item.stock === 'Out of stock'}
                      className="w-full px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
                    >
                      Add to Cart
                    </button>
                    <button
                      onClick={() => handleRemoveFromWishlist(item.id)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 text-red-600"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
