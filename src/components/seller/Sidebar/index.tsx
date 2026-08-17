import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';

const SellerSidebar = () => {
  const location = useLocation();
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(['products', 'orders', 'finances']));
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleSection = (section: string) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(section)) {
      newExpanded.delete(section);
    } else {
      newExpanded.add(section);
    }
    setExpandedSections(newExpanded);
  };

  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  const menuItems = [
    {
      icon: '🏪',
      label: 'MY STORE',
      path: '/seller/store',
    },
    {
      icon: '📊',
      label: 'Dashboard',
      path: '/seller/dashboard',
    },
    {
      icon: '📦',
      label: 'Products',
      id: 'products',
      subItems: [
        { label: 'All Products', path: '/seller/products' },
        { label: 'Add Product', path: '/seller/products/add' },
        { label: 'Drafts', path: '/seller/products/drafts' },
        { label: 'Pending Approval', path: '/seller/products/pending' },
        { label: 'Active', path: '/seller/products/active' },
        { label: 'Out of Stock', path: '/seller/products/out-of-stock' },
      ],
    },
    {
      icon: '🛒',
      label: 'Orders',
      id: 'orders',
      subItems: [
        { label: 'All Orders', path: '/seller/orders' },
        { label: 'New Orders', path: '/seller/orders/new' },
        { label: 'Processing', path: '/seller/orders/processing' },
        { label: 'Ready for Delivery', path: '/seller/orders/ready' },
        { label: 'Shipped', path: '/seller/orders/shipped' },
        { label: 'Delivered', path: '/seller/orders/delivered' },
        { label: 'Cancelled', path: '/seller/orders/cancelled' },
        { label: 'Returns', path: '/seller/orders/returns' },
      ],
    },
    {
      icon: '📦',
      label: 'Inventory',
      path: '/seller/inventory',
    },
    {
      icon: '💰',
      label: 'Finances',
      id: 'finances',
      subItems: [
        { label: 'Wallet', path: '/seller/wallet' },
        { label: 'Transactions', path: '/seller/transactions' },
        { label: 'Commissions', path: '/seller/commissions' },
        { label: 'Payouts', path: '/seller/payouts' },
      ],
    },
    {
      icon: '🚚',
      label: 'Delivery',
      path: '/seller/delivery',
    },
    {
      icon: '⭐',
      label: 'Reviews',
      path: '/seller/reviews',
    },
    {
      icon: '🎟️',
      label: 'Promotions',
      path: '/seller/promotions',
    },
    {
      icon: '📈',
      label: 'Analytics',
      path: '/seller/analytics',
    },
    {
      icon: '💬',
      label: 'Messages',
      path: '/seller/messages',
    },
    {
      icon: '🔔',
      label: 'Notifications',
      path: '/seller/notifications',
    },
    {
      icon: '🏪',
      label: 'Store Profile',
      path: '/seller/store-profile',
    },
    {
      icon: '🛡️',
      label: 'Performance',
      path: '/seller/performance',
    },
    {
      icon: '🆘',
      label: 'Help & Support',
      path: '/seller/help',
    },
    {
      icon: '⚙️',
      label: 'Settings',
      path: '/seller/settings',
    },
  ];

  return (
    <>
      {/* Mobile Menu Toggle Button */}
      <button
        onClick={() => setIsMobileMenuOpen(true)}
        className="lg:hidden fixed bottom-24 right-4 z-[60] bg-primary-600 text-white p-3 rounded-full shadow-lg"
      >
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-[55]"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`fixed lg:static inset-y-0 left-0 z-[70] w-72 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:block overflow-y-auto ${
        isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="p-4">
          {/* Close Button for Mobile */}
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="lg:hidden absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <Link to="/seller/dashboard" className="flex items-center space-x-2 mb-6">
            <span className="text-2xl font-bold text-primary-600">BURUMAL</span>
            <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">Seller</span>
          </Link>

          {/* Verification Status */}
          <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-6">
            <div className="flex items-center">
              <span className="text-green-600 mr-2">🟢</span>
              <div>
                <p className="font-semibold text-green-800 text-sm">VERIFIED SELLER</p>
                <p className="text-xs text-green-600">Verification completed: 12 Aug 2026</p>
              </div>
            </div>
          </div>

          <nav className="space-y-1">
            {menuItems.map((item) => (
              <div key={item.label}>
                {item.subItems ? (
                  <div>
                    <button
                      onClick={() => toggleSection(item.id!)}
                      className={`w-full flex items-center justify-between px-4 py-2 text-sm rounded-lg transition-colors ${
                        isActive(item.path || '') ? 'bg-primary-50 text-primary-700' : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <div className="flex items-center">
                        <span className="mr-3">{item.icon}</span>
                        <span>{item.label}</span>
                      </div>
                      <span className="text-xs">
                        {expandedSections.has(item.id!) ? '▼' : '▶'}
                      </span>
                    </button>
                    {expandedSections.has(item.id!) && (
                      <div className="ml-8 mt-1 space-y-1">
                        {item.subItems.map((subItem) => (
                          <Link
                            key={subItem.path}
                            to={subItem.path}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className={`block px-4 py-2 text-sm rounded-lg transition-colors ${
                              isActive(subItem.path) ? 'bg-primary-50 text-primary-700' : 'text-gray-600 hover:bg-gray-100'
                            }`}
                          >
                            {subItem.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    to={item.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center px-4 py-2 text-sm rounded-lg transition-colors ${
                      isActive(item.path) ? 'bg-primary-50 text-primary-700' : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <span className="mr-3">{item.icon}</span>
                    <span>{item.label}</span>
                  </Link>
                )}
              </div>
            ))}
          </nav>
        </div>
      </aside>
    </>
  );
};

export default SellerSidebar;
