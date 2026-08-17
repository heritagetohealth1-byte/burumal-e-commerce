import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../../components/layout/Header';
import SellerSidebar from '../../../components/seller/Sidebar';
import { authService } from '../../../services/authService';

export default function SellerPerformance() {
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

  const performanceMetrics = {
    overallRating: 4.8,
    orderFulfillment: 97,
    onTimeDelivery: 94,
    cancellationRate: 2,
    returnRate: 3,
    responseRate: 98,
  };

  const sellerLevel = {
    currentLevel: 'VERIFIED SELLER',
    nextLevel: 'TOP SELLER',
    progress: 75,
    requirements: {
      rating: { current: 4.8, required: 4.7, met: true },
      fulfillment: { current: 97, required: 95, met: true },
      onTimeDelivery: { current: 94, required: 90, met: true },
      cancellation: { current: 2, required: 5, met: true },
      orders: { current: 156, required: 50, met: true },
    },
  };

  const levels = [
    { name: 'NEW SELLER', icon: '🥉', description: 'Just started selling on BURUMAL' },
    { name: 'TRUSTED SELLER', icon: '🥈', description: 'Completed 20+ orders with good ratings' },
    { name: 'VERIFIED SELLER', icon: '🥇', description: 'Verified business with excellent performance' },
    { name: 'TOP SELLER', icon: '💎', description: 'Elite sellers with outstanding metrics' },
  ];

  const getScoreColor = (score: number, type: 'higher' | 'lower' = 'higher') => {
    if (type === 'higher') {
      if (score >= 90) return 'text-green-600';
      if (score >= 80) return 'text-yellow-600';
      return 'text-red-600';
    } else {
      if (score <= 3) return 'text-green-600';
      if (score <= 5) return 'text-yellow-600';
      return 'text-red-600';
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 pb-20 md:pb-0">
        <div className="flex">
          <SellerSidebar />
          <div className="flex-1 ml-64 p-8">
            <h1 className="text-2xl font-bold mb-6">🛡️ Performance</h1>

            {/* Current Level Badge */}
            <div className="card bg-gradient-to-r from-yellow-500 to-orange-500 text-white mb-8">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-yellow-100 text-sm mb-1">Current Seller Level</p>
                  <p className="text-3xl font-bold flex items-center">
                    {levels.find(l => l.name === sellerLevel.currentLevel)?.icon} {sellerLevel.currentLevel}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-yellow-100 text-sm mb-1">Progress to {sellerLevel.nextLevel}</p>
                  <p className="text-2xl font-bold">{sellerLevel.progress}%</p>
                </div>
              </div>
            </div>

            {/* Performance Metrics */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
              <div className="card text-center">
                <p className="text-gray-600 text-sm mb-1">Overall Rating</p>
                <p className={`text-3xl font-bold text-yellow-500`}>⭐ {performanceMetrics.overallRating}</p>
                <p className="text-xs text-gray-500">out of 5.0</p>
              </div>
              <div className="card text-center">
                <p className="text-gray-600 text-sm mb-1">Order Fulfillment</p>
                <p className={`text-3xl font-bold ${getScoreColor(performanceMetrics.orderFulfillment)}`}>
                  {performanceMetrics.orderFulfillment}%
                </p>
                <p className="text-xs text-gray-500">orders completed</p>
              </div>
              <div className="card text-center">
                <p className="text-gray-600 text-sm mb-1">On-Time Delivery</p>
                <p className={`text-3xl font-bold ${getScoreColor(performanceMetrics.onTimeDelivery)}`}>
                  {performanceMetrics.onTimeDelivery}%
                </p>
                <p className="text-xs text-gray-500">delivered on time</p>
              </div>
              <div className="card text-center">
                <p className="text-gray-600 text-sm mb-1">Cancellation Rate</p>
                <p className={`text-3xl font-bold ${getScoreColor(performanceMetrics.cancellationRate, 'lower')}`}>
                  {performanceMetrics.cancellationRate}%
                </p>
                <p className="text-xs text-gray-500">orders cancelled</p>
              </div>
              <div className="card text-center">
                <p className="text-gray-600 text-sm mb-1">Return Rate</p>
                <p className={`text-3xl font-bold ${getScoreColor(performanceMetrics.returnRate, 'lower')}`}>
                  {performanceMetrics.returnRate}%
                </p>
                <p className="text-xs text-gray-500">items returned</p>
              </div>
              <div className="card text-center">
                <p className="text-gray-600 text-sm mb-1">Response Rate</p>
                <p className={`text-3xl font-bold ${getScoreColor(performanceMetrics.responseRate)}`}>
                  {performanceMetrics.responseRate}%
                </p>
                <p className="text-xs text-gray-500">messages answered</p>
              </div>
            </div>

            {/* Level Requirements */}
            <div className="card mb-8">
              <h2 className="text-lg font-semibold mb-4">Requirements for {sellerLevel.nextLevel}</h2>
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                <div className={`p-4 rounded-lg ${sellerLevel.requirements.rating.met ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
                  <p className="text-sm text-gray-600 mb-1">Rating</p>
                  <p className="text-xl font-bold">{sellerLevel.requirements.rating.current}</p>
                  <p className="text-xs text-gray-500">Required: {sellerLevel.requirements.rating.required}+</p>
                  <p className={`text-xs mt-2 ${sellerLevel.requirements.rating.met ? 'text-green-600' : 'text-red-600'}`}>
                    {sellerLevel.requirements.rating.met ? '✓ Met' : '✗ Not Met'}
                  </p>
                </div>
                <div className={`p-4 rounded-lg ${sellerLevel.requirements.fulfillment.met ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
                  <p className="text-sm text-gray-600 mb-1">Fulfillment</p>
                  <p className="text-xl font-bold">{sellerLevel.requirements.fulfillment.current}%</p>
                  <p className="text-xs text-gray-500">Required: {sellerLevel.requirements.fulfillment.required}%+</p>
                  <p className={`text-xs mt-2 ${sellerLevel.requirements.fulfillment.met ? 'text-green-600' : 'text-red-600'}`}>
                    {sellerLevel.requirements.fulfillment.met ? '✓ Met' : '✗ Not Met'}
                  </p>
                </div>
                <div className={`p-4 rounded-lg ${sellerLevel.requirements.onTimeDelivery.met ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
                  <p className="text-sm text-gray-600 mb-1">On-Time Delivery</p>
                  <p className="text-xl font-bold">{sellerLevel.requirements.onTimeDelivery.current}%</p>
                  <p className="text-xs text-gray-500">Required: {sellerLevel.requirements.onTimeDelivery.required}%+</p>
                  <p className={`text-xs mt-2 ${sellerLevel.requirements.onTimeDelivery.met ? 'text-green-600' : 'text-red-600'}`}>
                    {sellerLevel.requirements.onTimeDelivery.met ? '✓ Met' : '✗ Not Met'}
                  </p>
                </div>
                <div className={`p-4 rounded-lg ${sellerLevel.requirements.cancellation.met ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
                  <p className="text-sm text-gray-600 mb-1">Cancellation</p>
                  <p className="text-xl font-bold">{sellerLevel.requirements.cancellation.current}%</p>
                  <p className="text-xs text-gray-500">Required: &lt;{sellerLevel.requirements.cancellation.required}%</p>
                  <p className={`text-xs mt-2 ${sellerLevel.requirements.cancellation.met ? 'text-green-600' : 'text-red-600'}`}>
                    {sellerLevel.requirements.cancellation.met ? '✓ Met' : '✗ Not Met'}
                  </p>
                </div>
                <div className={`p-4 rounded-lg ${sellerLevel.requirements.orders.met ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
                  <p className="text-sm text-gray-600 mb-1">Total Orders</p>
                  <p className="text-xl font-bold">{sellerLevel.requirements.orders.current}</p>
                  <p className="text-xs text-gray-500">Required: {sellerLevel.requirements.orders.required}+</p>
                  <p className={`text-xs mt-2 ${sellerLevel.requirements.orders.met ? 'text-green-600' : 'text-red-600'}`}>
                    {sellerLevel.requirements.orders.met ? '✓ Met' : '✗ Not Met'}
                  </p>
                </div>
              </div>
            </div>

            {/* Seller Levels Overview */}
            <div className="card">
              <h2 className="text-lg font-semibold mb-4">Seller Levels</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {levels.map((level) => (
                  <div
                    key={level.name}
                    className={`p-4 rounded-lg border-2 ${
                      level.name === sellerLevel.currentLevel
                        ? 'border-yellow-500 bg-yellow-50'
                        : 'border-gray-200'
                    }`}
                  >
                    <div className="flex items-center mb-2">
                      <span className="text-3xl mr-2">{level.icon}</span>
                      <p className="font-semibold">{level.name}</p>
                    </div>
                    <p className="text-sm text-gray-600">{level.description}</p>
                    {level.name === sellerLevel.currentLevel && (
                      <p className="text-xs text-yellow-600 font-semibold mt-2">Current Level</p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Performance Tips */}
            <div className="card mt-6 bg-blue-50 border border-blue-200">
              <h3 className="font-semibold text-blue-800 mb-2">💡 Performance Tips</h3>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• Maintain high ratings by providing excellent customer service</li>
                <li>• Keep cancellation rate low by only listing products you have in stock</li>
                <li>• Ship orders quickly to improve on-time delivery metrics</li>
                <li>• Respond promptly to customer messages and reviews</li>
                <li>• Accurate product descriptions reduce return rates</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
