import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../../components/layout/Header';
import SellerSidebar from '../../../components/seller/Sidebar';
import { authService } from '../../../services/authService';

export default function SellerAnalytics() {
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

  const salesData = {
    today: 350000,
    thisWeek: 2450000,
    thisMonth: 8850000,
    currency: 'BIF',
  };

  const topProducts = [
    { name: 'Nike Shoes', sold: 42, revenue: 3570000 },
    { name: 'T-Shirts', sold: 35, revenue: 875000 },
    { name: 'Watches', sold: 28, revenue: 3360000 },
    { name: 'Designer Dress', sold: 22, revenue: 1870000 },
    { name: 'Wireless Headphones', sold: 18, revenue: 1170000 },
  ];

  const categoryPerformance = [
    { category: 'Fashion', sales: 45, revenue: 5445000 },
    { category: 'Electronics', sales: 38, revenue: 4530000 },
    { category: 'Beauty', sales: 25, revenue: 450000 },
    { category: 'Home', sales: 18, revenue: 630000 },
    { category: 'Accessories', sales: 15, revenue: 525000 },
  ];

  const metrics = {
    averageOrderValue: 56800,
    customerRepeatRate: 35,
    conversionRate: 4.2,
    totalCustomers: 156,
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 pb-20 md:pb-0">
        <div className="flex">
          <SellerSidebar />
          <div className="flex-1 ml-64 p-8">
            <h1 className="text-2xl font-bold mb-6">📈 Analytics</h1>

            {/* Sales Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="card">
                <p className="text-gray-600 text-sm mb-1">Today</p>
                <p className="text-3xl font-bold">{salesData.today.toLocaleString()} {salesData.currency}</p>
                <p className="text-sm text-green-600">+8.5% from yesterday</p>
              </div>
              <div className="card">
                <p className="text-gray-600 text-sm mb-1">This Week</p>
                <p className="text-3xl font-bold">{(salesData.thisWeek / 1000000).toFixed(2)}M {salesData.currency}</p>
                <p className="text-sm text-green-600">+12.3% from last week</p>
              </div>
              <div className="card">
                <p className="text-gray-600 text-sm mb-1">This Month</p>
                <p className="text-3xl font-bold">{(salesData.thisMonth / 1000000).toFixed(2)}M {salesData.currency}</p>
                <p className="text-sm text-green-600">+15.7% from last month</p>
              </div>
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="card text-center">
                <p className="text-gray-600 text-sm mb-1">Avg Order Value</p>
                <p className="text-2xl font-bold">{metrics.averageOrderValue.toLocaleString()} {salesData.currency}</p>
              </div>
              <div className="card text-center">
                <p className="text-gray-600 text-sm mb-1">Repeat Rate</p>
                <p className="text-2xl font-bold text-green-600">{metrics.customerRepeatRate}%</p>
              </div>
              <div className="card text-center">
                <p className="text-gray-600 text-sm mb-1">Conversion Rate</p>
                <p className="text-2xl font-bold text-blue-600">{metrics.conversionRate}%</p>
              </div>
              <div className="card text-center">
                <p className="text-gray-600 text-sm mb-1">Total Customers</p>
                <p className="text-2xl font-bold text-purple-600">{metrics.totalCustomers}</p>
              </div>
            </div>

            {/* Top Products */}
            <div className="card mb-6">
              <h2 className="text-lg font-semibold mb-4">Top Products</h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-4">Product</th>
                      <th className="text-right p-4">Units Sold</th>
                      <th className="text-right p-4">Revenue</th>
                      <th className="text-right p-4">% of Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {topProducts.map((product, index) => (
                      <tr key={index} className="border-b hover:bg-gray-50">
                        <td className="p-4 font-medium">{product.name}</td>
                        <td className="p-4 text-right">{product.sold}</td>
                        <td className="p-4 text-right font-semibold">{product.revenue.toLocaleString()} {salesData.currency}</td>
                        <td className="p-4 text-right">
                          {((product.revenue / salesData.thisMonth) * 100).toFixed(1)}%
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Category Performance */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              <div className="card">
                <h2 className="text-lg font-semibold mb-4">Revenue by Category</h2>
                <div className="space-y-4">
                  {categoryPerformance.map((category) => (
                    <div key={category.category}>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">{category.category}</span>
                        <span className="text-sm text-gray-600">{category.revenue.toLocaleString()} {salesData.currency}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-primary-600 h-2 rounded-full"
                          style={{ width: `${(category.revenue / salesData.thisMonth) * 100}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="card">
                <h2 className="text-lg font-semibold mb-4">Sales by Category</h2>
                <div className="space-y-4">
                  {categoryPerformance.map((category) => (
                    <div key={category.category}>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">{category.category}</span>
                        <span className="text-sm text-gray-600">{category.sales} sales</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-green-500 h-2 rounded-full"
                          style={{ width: `${(category.sales / categoryPerformance.reduce((sum, cat) => sum + cat.sales, 0)) * 100}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Performance Insights */}
            <div className="card bg-blue-50 border border-blue-200">
              <h3 className="font-semibold text-blue-800 mb-2">💡 Performance Insights</h3>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• Fashion category generates 61.5% of your revenue</li>
                <li>• Nike Shoes is your best-selling product with 42 units sold</li>
                <li>• Customer repeat rate of 35% indicates good customer loyalty</li>
                <li>• Consider expanding your Electronics category which shows strong growth</li>
                <li>• Average order value of 56,800 BIF is above market average</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
