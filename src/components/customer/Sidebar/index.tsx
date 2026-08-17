import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { authService } from '../../../services/authService';

const CustomerSidebar = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const user = authService.getUser();

  const menuItems = [
    {
      section: 'Account',
      items: [
        { path: '/profile', label: 'My Profile', icon: '👤' },
        { path: '/orders', label: 'My Orders', icon: '📦' },
        { path: '/wishlist', label: 'Wishlist', icon: '❤️' },
        { path: '/addresses', label: 'Addresses', icon: '📍' },
        { path: '/payment-methods', label: 'Payment Methods', icon: '💳' },
      ],
    },
    {
      section: 'Activity',
      items: [
        { path: '/reviews', label: 'My Reviews', icon: '⭐' },
        { path: '/returns', label: 'Returns & Refunds', icon: '↩️' },
        { path: '/messages', label: 'Messages', icon: '💬' },
        { path: '/notifications', label: 'Notifications', icon: '🔔' },
      ],
    },
    {
      section: 'Settings',
      items: [
        { path: '/security', label: 'Settings', icon: '⚙️' },
        { path: '/help', label: 'Help & Support', icon: '📞' },
        { path: '/privacy', label: 'Privacy Policy', icon: '📄' },
      ],
    },
  ];

  const isActive = (path: string) => {
    if (path === '/dashboard') {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  const handleLogout = () => {
    authService.logout();
    window.location.href = '/';
  };

  return (
    <>
      {/* Mobile Menu Toggle Button */}
      <button
        onClick={() => setIsMobileMenuOpen(true)}
        className="lg:hidden fixed bottom-20 right-4 z-50 bg-primary-600 text-white p-3 rounded-full shadow-lg"
      >
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`fixed lg:static inset-y-0 left-0 z-50 w-72 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:block ${
        isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="p-6 h-full overflow-y-auto">
          {/* Close Button for Mobile */}
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="lg:hidden absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <h2 className="text-lg font-bold text-gray-800 mb-6">My Account</h2>

          {menuItems.map((section) => (
            <div key={section.section} className="mb-6">
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                {section.section}
              </h3>
              <ul className="space-y-1">
                {section.items.map((item) => (
                  <li key={item.path}>
                    <Link
                      to={item.path}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`flex items-center px-3 py-2 rounded-lg text-sm transition-colors ${
                        isActive(item.path)
                          ? 'bg-primary-50 text-primary-600 font-medium'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <span className="mr-3">{item.icon}</span>
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="pt-6 border-t border-gray-200">
            <button
              onClick={handleLogout}
              className="flex items-center w-full px-3 py-2 rounded-lg text-sm text-red-600 hover:bg-red-50 transition-colors"
            >
              <span className="mr-3">🚪</span>
              Logout
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default CustomerSidebar;
