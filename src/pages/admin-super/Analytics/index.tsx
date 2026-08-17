import Sidebar from '../../../components/admin/Sidebar';

export default function SuperAdminAnalytics() {
  const salesData = {
    daily: 4850000,
    weekly: 32500000,
    monthly: 85000000,
    byCategory: [
      { category: 'Electronics', sales: 35000000 },
      { category: 'Fashion', sales: 25000000 },
      { category: 'Home', sales: 15000000 },
      { category: 'Beauty', sales: 10000000 },
    ],
    byCity: [
      { city: 'Bujumbura', sales: 45000000 },
      { city: 'Gitega', sales: 20000000 },
      { city: 'Ngozi', sales: 12000000 },
      { city: 'Rumonge', sales: 8000000 },
    ],
  };

  const customerData = {
    newCustomers: 83,
    returningCustomers: 767,
    customerRetention: 85,
    averageOrderValue: 68000,
  };

  const sellerData = {
    topSellers: [
      { name: 'Burundi Electronics', sales: 15600000, rating: 4.9 },
      { name: 'Maison XYZ', sales: 12500000, rating: 4.8 },
      { name: 'Fashion House', sales: 8900000, rating: 4.7 },
    ],
    lowestPerforming: [
      { name: 'Home Decor Plus', sales: 1200000, rating: 3.2 },
      { name: 'Small Shop', sales: 450000, rating: 3.5 },
    ],
    sellerConversionRate: 12,
    sellerCancellationRate: 3,
  };

  const productData = {
    bestSelling: [
      { name: 'Samsung Galaxy S24', sales: 234 },
      { name: 'Nike Air Max', sales: 189 },
      { name: 'Summer Dress Collection', sales: 156 },
    ],
    mostViewed: [
      { name: 'Samsung Galaxy S24', views: 5678 },
      { name: 'Nike Air Max', views: 4567 },
      { name: 'Summer Dress Collection', views: 3456 },
    ],
    lowStock: [
      { name: 'Nike Air Max', stock: 5 },
      { name: 'Wireless Earbuds', stock: 8 },
    ],
    highReturns: [
      { name: 'Home Decor Set', returns: 12 },
      { name: 'Fashion Item', returns: 8 },
    ],
  };

  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 ml-64 p-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-2">Analytics & Reports</h1>
          <p className="text-gray-600">Platform performance metrics and insights</p>
        </div>

        {/* Sales Overview */}
        <div className="card mb-6">
          <h2 className="text-lg font-semibold mb-4">Sales Overview</h2>
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-gray-600 text-sm">Daily Sales</p>
              <p className="text-2xl font-bold">{(salesData.daily / 1000000).toFixed(1)}M BIF</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-gray-600 text-sm">Weekly Sales</p>
              <p className="text-2xl font-bold">{(salesData.weekly / 1000000).toFixed(1)}M BIF</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-gray-600 text-sm">Monthly Sales</p>
              <p className="text-2xl font-bold">{(salesData.monthly / 1000000).toFixed(1)}M BIF</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="font-medium mb-2">Sales by Category</h3>
              {salesData.byCategory.map((item, index) => (
                <div key={index} className="flex justify-between py-1">
                  <span>{item.category}</span>
                  <span>{(item.sales / 1000000).toFixed(1)}M BIF</span>
                </div>
              ))}
            </div>
            <div>
              <h3 className="font-medium mb-2">Sales by City</h3>
              {salesData.byCity.map((item, index) => (
                <div key={index} className="flex justify-between py-1">
                  <span>{item.city}</span>
                  <span>{(item.sales / 1000000).toFixed(1)}M BIF</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Customer Metrics */}
        <div className="card mb-6">
          <h2 className="text-lg font-semibold mb-4">Customer Metrics</h2>
          <div className="grid grid-cols-4 gap-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-gray-600 text-sm">New Customers</p>
              <p className="text-2xl font-bold">{customerData.newCustomers}</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-gray-600 text-sm">Returning Customers</p>
              <p className="text-2xl font-bold">{customerData.returningCustomers}</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-gray-600 text-sm">Retention Rate</p>
              <p className="text-2xl font-bold text-green-600">{customerData.customerRetention}%</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-gray-600 text-sm">Avg Order Value</p>
              <p className="text-2xl font-bold">{customerData.averageOrderValue.toLocaleString()} BIF</p>
            </div>
          </div>
        </div>

        {/* Seller Metrics */}
        <div className="card mb-6">
          <h2 className="text-lg font-semibold mb-4">Seller Metrics</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="font-medium mb-2">Top Sellers</h3>
              {sellerData.topSellers.map((seller, index) => (
                <div key={index} className="flex justify-between py-1">
                  <span>{seller.name}</span>
                  <span>{(seller.sales / 1000000).toFixed(1)}M BIF ⭐{seller.rating}</span>
                </div>
              ))}
            </div>
            <div>
              <h3 className="font-medium mb-2">Lowest Performing</h3>
              {sellerData.lowestPerforming.map((seller, index) => (
                <div key={index} className="flex justify-between py-1">
                  <span>{seller.name}</span>
                  <span>{(seller.sales / 1000000).toFixed(1)}M BIF ⭐{seller.rating}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-gray-600 text-sm">Seller Conversion Rate</p>
              <p className="text-2xl font-bold">{sellerData.sellerConversionRate}%</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-gray-600 text-sm">Cancellation Rate</p>
              <p className="text-2xl font-bold text-red-600">{sellerData.sellerCancellationRate}%</p>
            </div>
          </div>
        </div>

        {/* Product Metrics */}
        <div className="card">
          <h2 className="text-lg font-semibold mb-4">Product Metrics</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="font-medium mb-2">Best Selling</h3>
              {productData.bestSelling.map((product, index) => (
                <div key={index} className="flex justify-between py-1">
                  <span>{product.name}</span>
                  <span>{product.sales} sales</span>
                </div>
              ))}
            </div>
            <div>
              <h3 className="font-medium mb-2">Most Viewed</h3>
              {productData.mostViewed.map((product, index) => (
                <div key={index} className="flex justify-between py-1">
                  <span>{product.name}</span>
                  <span>{product.views} views</span>
                </div>
              ))}
            </div>
            <div>
              <h3 className="font-medium mb-2">Low Stock</h3>
              {productData.lowStock.map((product, index) => (
                <div key={index} className="flex justify-between py-1">
                  <span>{product.name}</span>
                  <span className="text-red-600">{product.stock} left</span>
                </div>
              ))}
            </div>
            <div>
              <h3 className="font-medium mb-2">High Returns</h3>
              {productData.highReturns.map((product, index) => (
                <div key={index} className="flex justify-between py-1">
                  <span>{product.name}</span>
                  <span className="text-red-600">{product.returns} returns</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
