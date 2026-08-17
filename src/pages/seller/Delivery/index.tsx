import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../../components/layout/Header';
import SellerSidebar from '../../../components/seller/Sidebar';
import { authService } from '../../../services/authService';
import Button from '../../../components/common/Button';

export default function SellerDelivery() {
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

  const deliveryStats = {
    readyForPickup: 7,
    inTransit: 12,
    deliveredToday: 18,
    failedDeliveries: 1,
  };

  const deliveries = [
    {
      id: 'BUR10293',
      customer: 'Jean',
      status: 'ready_for_pickup',
      courier: 'Not Assigned',
      address: 'Bujumbura, Quartier Mutanga',
      date: '2024-08-15',
    },
    {
      id: 'BUR10291',
      customer: 'Pierre',
      status: 'in_transit',
      courier: 'Express Delivery',
      address: 'Bujumbura, Quartier Rohero',
      date: '2024-08-14',
    },
    {
      id: 'BUR10289',
      customer: 'Annie',
      status: 'delivered',
      courier: 'Standard Delivery',
      address: 'Bujumbura, Quartier Kamenge',
      date: '2024-08-12',
    },
    {
      id: 'BUR10288',
      customer: 'David',
      status: 'failed',
      courier: 'Express Delivery',
      address: 'Ngozi, Centre Ville',
      date: '2024-08-11',
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ready_for_pickup': return 'bg-purple-100 text-purple-800';
      case 'courier_assigned': return 'bg-blue-100 text-blue-800';
      case 'in_transit': return 'bg-yellow-100 text-yellow-800';
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'failed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'ready_for_pickup': return 'READY FOR PICKUP';
      case 'courier_assigned': return 'COURIER ASSIGNED';
      case 'in_transit': return 'IN TRANSIT';
      case 'delivered': return 'DELIVERED';
      case 'failed': return 'FAILED';
      default: return status.toUpperCase();
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 pb-20 md:pb-0">
        <div className="flex">
          <SellerSidebar />
          <div className="flex-1 ml-64 p-8">
            <h1 className="text-2xl font-bold mb-6">🚚 Delivery</h1>

            {/* Delivery Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="card text-center">
                <p className="text-3xl font-bold text-purple-600">{deliveryStats.readyForPickup}</p>
                <p className="text-gray-600 text-sm">Ready for Pickup</p>
              </div>
              <div className="card text-center">
                <p className="text-3xl font-bold text-yellow-600">{deliveryStats.inTransit}</p>
                <p className="text-gray-600 text-sm">In Transit</p>
              </div>
              <div className="card text-center">
                <p className="text-3xl font-bold text-green-600">{deliveryStats.deliveredToday}</p>
                <p className="text-gray-600 text-sm">Delivered Today</p>
              </div>
              <div className="card text-center">
                <p className="text-3xl font-bold text-red-600">{deliveryStats.failedDeliveries}</p>
                <p className="text-gray-600 text-sm">Failed Deliveries</p>
              </div>
            </div>

            {/* Delivery List */}
            <div className="card">
              <h2 className="text-lg font-semibold mb-4">Active Deliveries</h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-4">Order ID</th>
                      <th className="text-left p-4">Customer</th>
                      <th className="text-left p-4">Address</th>
                      <th className="text-left p-4">Courier</th>
                      <th className="text-left p-4">Status</th>
                      <th className="text-left p-4">Date</th>
                      <th className="text-left p-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {deliveries.map((delivery) => (
                      <tr key={delivery.id} className="border-b hover:bg-gray-50">
                        <td className="p-4 font-medium">#{delivery.id}</td>
                        <td className="p-4">{delivery.customer}</td>
                        <td className="p-4 text-sm">{delivery.address}</td>
                        <td className="p-4">{delivery.courier}</td>
                        <td className="p-4">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(delivery.status)}`}>
                            {getStatusLabel(delivery.status)}
                          </span>
                        </td>
                        <td className="p-4 text-gray-600">{delivery.date}</td>
                        <td className="p-4">
                          <div className="flex gap-2">
                            <Button variant="secondary" size="sm">Track</Button>
                            {delivery.status === 'ready_for_pickup' && (
                              <Button size="sm">Assign Courier</Button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Delivery Timeline Example */}
            <div className="card mt-6">
              <h2 className="text-lg font-semibold mb-4">Delivery Timeline - #BUR10293</h2>
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
                    <p className="font-medium">Seller Preparing</p>
                    <p className="text-xs text-gray-600">Aug 15, 2024 - 11:00 AM</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                  <div>
                    <p className="font-medium">Ready for Pickup</p>
                    <p className="text-xs text-gray-600">Aug 15, 2024 - 2:30 PM</p>
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
                    <p className="font-medium text-gray-400">Out for Delivery</p>
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
          </div>
        </div>
      </main>
    </div>
  );
}
