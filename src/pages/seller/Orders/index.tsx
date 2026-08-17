import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../../components/layout/Header';
import SellerSidebar from '../../../components/seller/Sidebar';
import { authService } from '../../../services/authService';
import Button from '../../../components/common/Button';

export default function SellerOrders() {
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

  const [filter, setFilter] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const mockOrders = [
    {
      id: 'BUR10293',
      customer: 'Jean',
      phone: '+257 79 123 456',
      total: 125000,
      status: 'processing',
      date: '2024-08-15',
      items: [
        { name: 'Nike Shoes', quantity: 1, price: 85000 },
        { name: 'T-Shirt', quantity: 2, price: 20000 },
      ],
      delivery: 'Bujumbura',
    },
    {
      id: 'BUR10292',
      customer: 'Marie',
      phone: '+257 79 234 567',
      total: 85000,
      status: 'new',
      date: '2024-08-15',
      items: [{ name: 'Designer Dress', quantity: 1, price: 85000 }],
      delivery: 'Gitega',
    },
    {
      id: 'BUR10291',
      customer: 'Pierre',
      phone: '+257 79 345 678',
      total: 450000,
      status: 'ready',
      date: '2024-08-14',
      items: [{ name: 'Samsung Galaxy', quantity: 1, price: 450000 }],
      delivery: 'Bujumbura',
    },
    {
      id: 'BUR10290',
      customer: 'Claude',
      phone: '+257 79 456 789',
      total: 65000,
      status: 'shipped',
      date: '2024-08-13',
      items: [{ name: 'Wireless Headphones', quantity: 1, price: 65000 }],
      delivery: 'Muyinga',
    },
    {
      id: 'BUR10289',
      customer: 'Annie',
      phone: '+257 79 567 890',
      total: 120000,
      status: 'delivered',
      date: '2024-08-12',
      items: [{ name: 'Smart Watch', quantity: 1, price: 120000 }],
      delivery: 'Bujumbura',
    },
    {
      id: 'BUR10288',
      customer: 'David',
      phone: '+257 79 678 901',
      total: 35000,
      status: 'cancelled',
      date: '2024-08-11',
      items: [{ name: 'Phone Case', quantity: 1, price: 35000 }],
      delivery: 'Ngozi',
    },
  ];

  const filteredOrders = mockOrders.filter(order => {
    const matchesSearch = 
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (filter === 'all') return matchesSearch;
    return order.status === filter && matchesSearch;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-blue-100 text-blue-800';
      case 'confirmed': return 'bg-indigo-100 text-indigo-800';
      case 'processing': return 'bg-yellow-100 text-yellow-800';
      case 'ready': return 'bg-purple-100 text-purple-800';
      case 'shipped': return 'bg-blue-100 text-blue-800';
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      case 'return_requested': return 'bg-orange-100 text-orange-800';
      case 'returned': return 'bg-orange-100 text-orange-800';
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
      case 'return_requested': return 'RETURN REQUESTED';
      case 'returned': return 'RETURNED';
      default: return status.toUpperCase();
    }
  };

  const statusCounts = {
    all: mockOrders.length,
    new: mockOrders.filter(o => o.status === 'new').length,
    processing: mockOrders.filter(o => o.status === 'processing').length,
    ready: mockOrders.filter(o => o.status === 'ready').length,
    shipped: mockOrders.filter(o => o.status === 'shipped').length,
    delivered: mockOrders.filter(o => o.status === 'delivered').length,
    cancelled: mockOrders.filter(o => o.status === 'cancelled').length,
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 pb-20 md:pb-0">
        <div className="flex">
          <SellerSidebar />
          <div className="flex-1 ml-64 p-8">
            <h1 className="text-2xl font-bold mb-6">🛒 Orders</h1>

            {/* Search and Filter */}
            <div className="card mb-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <input
                    type="text"
                    placeholder="Search orders by ID or customer..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                  />
                </div>
                <div className="flex gap-2 flex-wrap">
                  <button
                    onClick={() => setFilter('all')}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      filter === 'all' ? 'bg-primary-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    All ({statusCounts.all})
                  </button>
                  <button
                    onClick={() => setFilter('new')}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      filter === 'new' ? 'bg-primary-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    New ({statusCounts.new})
                  </button>
                  <button
                    onClick={() => setFilter('processing')}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      filter === 'processing' ? 'bg-primary-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Processing ({statusCounts.processing})
                  </button>
                  <button
                    onClick={() => setFilter('ready')}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      filter === 'ready' ? 'bg-primary-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Ready ({statusCounts.ready})
                  </button>
                  <button
                    onClick={() => setFilter('shipped')}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      filter === 'shipped' ? 'bg-primary-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Shipped ({statusCounts.shipped})
                  </button>
                  <button
                    onClick={() => setFilter('delivered')}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      filter === 'delivered' ? 'bg-primary-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Delivered ({statusCounts.delivered})
                  </button>
                  <button
                    onClick={() => setFilter('cancelled')}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      filter === 'cancelled' ? 'bg-primary-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Cancelled ({statusCounts.cancelled})
                  </button>
                </div>
              </div>
            </div>

            {/* Orders List */}
            <div className="card">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-4">Order ID</th>
                      <th className="text-left p-4">Customer</th>
                      <th className="text-left p-4">Items</th>
                      <th className="text-left p-4">Total</th>
                      <th className="text-left p-4">Delivery</th>
                      <th className="text-left p-4">Status</th>
                      <th className="text-left p-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredOrders.map((order) => (
                      <tr key={order.id} className="border-b hover:bg-gray-50">
                        <td className="p-4 font-medium">#{order.id}</td>
                        <td className="p-4">
                          <p className="font-medium">{order.customer}</p>
                          <p className="text-sm text-gray-600">{order.phone}</p>
                        </td>
                        <td className="p-4">
                          {order.items.map((item, index) => (
                            <p key={index} className="text-sm">
                              {item.name} x {item.quantity}
                            </p>
                          ))}
                        </td>
                        <td className="p-4 font-semibold">{order.total.toLocaleString()} BIF</td>
                        <td className="p-4 text-sm">{order.delivery}</td>
                        <td className="p-4">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                            {getStatusLabel(order.status)}
                          </span>
                        </td>
                        <td className="p-4">
                          <div className="flex gap-2">
                            <Button variant="secondary" size="sm">View</Button>
                            {order.status === 'new' && (
                              <Button size="sm">Confirm</Button>
                            )}
                            {order.status === 'processing' && (
                              <Button size="sm">Ready</Button>
                            )}
                            {order.status === 'ready' && (
                              <Button size="sm">Ship</Button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
