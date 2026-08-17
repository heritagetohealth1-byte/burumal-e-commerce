import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const MobileNav = () => {
  const { t } = useTranslation();
  const location = useLocation();

  const navItems = [
    { path: '/', icon: '🏠', label: t('nav.home') },
    { path: '/search', icon: '🔍', label: t('nav.search') },
    { path: '/wishlist', icon: '❤️', label: t('nav.wishlist') },
    { path: '/cart', icon: '🛒', label: t('nav.cart') },
    { path: '/profile', icon: '👤', label: t('nav.account') },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50 md:hidden safe-area-bottom">
      <div className="flex items-center justify-around h-16">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center justify-center py-2 px-3 flex-1 transition-colors ${
                isActive ? 'text-primary-600' : 'text-gray-500'
              }`}
            >
              <span className="text-xl mb-1">{item.icon}</span>
              <span className="text-xs font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default MobileNav;
