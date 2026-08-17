import { useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Header from '../../../components/layout/Header';
import SellerSidebar from '../../../components/seller/Sidebar';
import { authService } from '../../../services/authService';
import Button from '../../../components/common/Button';

export default function SellerOrderDetails() {
  const { id: _id } = useParams();
  const navigate = useNavigate();
  const user = authService.getUser();

  useEffect(() => {
    // Redirect unauthenticated users to login
    if (!user) {
      navigate('/auth/login');
      return;
    }
    // Redirect customers to access denied page with clear message
    if (user && user.role !== 'seller') {
      navigate('/access-denied');
      return;
    }
  }, [user, navigate]);

  const mockOrder = {
    id: 'BUR10293',
    customer: {
      name: 'Jean',
      phone: '+257 79 123 456',
      address: 'Bujumbura, Quartier Mutanga',
    },
    total: 125000,
    status: 'processing',
    paymentStatus: 'paid',
    deliveryMethod: 'Standard',
    date: '2024-08-15',
    items: [
      { name: 'Nike Shoes', quantity: 1, price: 85000, image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=100' },
      { name: 'T-Shirt', quantity: 2, price: 20000, image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=100' },
    ],
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-blue-100 text-blue-800';
      case 'confirmed': return 'bg-indigo-100 text-indigo-800';
      case 'processing': return 'bg-yellow-100 text-yellow-800';
      case 'ready': return 'bg-purple-100 text-purple-800';
      case 'shipped': return 'bg-blue-100 text-blue-800';
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'new': return 'NEW';
      case 'confirmed': return 'CONFIRMED';
      case 'processing': return 'PROCESSING';
      case 'ready': return 'READY FOR DELIVERY';
      case 'shipped': return 'SHIPPED';
      case 'delivered': return 'DELIVERED';
      case 'cancelled': return 'CANCELLED';
      default: return status.toUpperCase();
    }
  };

  const getActionButton = () => {
    switch (mockOrder.status) {
      case 'new':
        return <Button>Confirm Order</Button>;
      case 'confirmed':
        return <Button>Start Processing</Button>;
      case 'processing':
        return <Button>Mark as Ready</Button>;
      case 'ready':
        return <Button>Mark as Shipped</Button>;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 pb-20 md:pb-0">
        <div className="flex">
          <SellerSidebar />
          <div className="flex-1 ml-64 p-8">
            <div className="mb-6">
              <Link to="/seller/orders" className="text-primary-600 hover:underline text-sm">
                ← Back to Orders
              </Link>
              <h1 className="text-2xl font-bold mt-2">Order #{mockOrder.id}</h1>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Order Details */}
              <div className="lg:col-span-2 space-y-6">
                {/* Customer Info */}
                <div className="card">
                  <h2 className="text-lg font-semibold mb-4">Customer</h2>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Name:</span>
                      <span className="font-medium">{mockOrder.customer.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Phone:</span>
                      <span className="font-medium">{mockOrder.customer.phone}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Delivery Address:</span>
                      <span className="font-medium">{mockOrder.customer.address}</span>
                    </div>
                  </div>
                </div>

                {/* Products */}
                <div className="card">
                  <h2 className="text-lg font-semibold mb-4">Products</h2>
                  <div className="space-y-4">
                    {mockOrder.items.map((item, index) => (
                      <div key={index} className="flex items-center space-x-4 border-b pb-4 last:border-0 last:pb-0">
                        <div className="w-16 h-16 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium">{item.name}</p>
                          <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                        </div>
                        <p className="font-semibold">{(item.price * item.quantity).toLocaleString()} BIF</p>
                      </div>
                    ))}
                  </div>
                  <div className="border-t mt-4 pt-4">
                    <div className="flex justify-between text-lg font-bold">
                      <span>Total</span>
                      <span>{mockOrder.total.toLocaleString()} BIF</span>
                    </div>
                  </div>
                </div>

                {/* Payment & Delivery */}
                <div className="card">
                  <h2 className="text-lg font-semibold mb-4">Payment & Delivery</h2>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Payment Status:</span>
                      <span className="flex items-center">
                        <span className="text-green-600 mr-2">✓</span>
                        <span className="font-medium capitalize">{mockOrder.paymentStatus}</span>
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Delivery Method:</span>
                      <span className="font-medium">{mockOrder.deliveryMethod}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Order Date:</span>
                      <span className="font-medium">{mockOrder.date}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Order Status & Actions */}
              <div className="space-y-6">
                {/* Current Status */}
                <div className="card">
                  <h2 className="text-lg font-semibold mb-4">Current Status</h2>
                  <div className="text-center">
                    <span className={`inline-block px-4 py-2 rounded-full text-sm font-medium ${getStatusColor(mockOrder.status)}`}>
                      {getStatusLabel(mockOrder.status)}
                    </span>
                  </div>
                  <div className="mt-4">
                    {getActionButton()}
                  </div>
                </div>

                {/* Order Timeline */}
                <div className="card">
                  <h2 className="text-lg font-semibold mb-4">Order Timeline</h2>
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                      <div>
                        <p className="font-medium">Order Confirmed</p>
                        <p className="text-xs text-gray-600">Aug 15, 2024 - 10:30 AM</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                      <div>
                        <p className="font-medium">Payment Received</p>
                        <p className="text-xs text-gray-600">Aug 15, 2024 - 10:32 AM</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-yellow-500 rounded-full mr-3"></div>
                      <div>
                        <p className="font-medium">Seller Preparing</p>
                        <p className="text-xs text-gray-600">Aug 15, 2024 - 11:00 AM</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-gray-300 rounded-full mr-3"></div>
                      <div>
                        <p className="font-medium text-gray-400">Ready for Pickup</p>
                        <p className="text-xs text-gray-400">Pending</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-gray-300 rounded-full mr-3"></div>
                      <div>
                        <p className="font-medium text-gray-400">Courier Assigned</p>
                        <p className="text-xs text-gray-400">Pending</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-gray-300 rounded-full mr-3"></div>
                      <div>
                        <p className="font-medium text-gray-400">Delivered</p>
                        <p className="text-xs text-gray-400">Pending</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="card">
                  <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
                  <div className="space-y-2">
                    <Button variant="secondary" className="w-full">Print Order</Button>
                    <Button variant="secondary" className="w-full">Contact Customer</Button>
                    <Button variant="secondary" className="w-full text-red-600">Cancel Order</Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
