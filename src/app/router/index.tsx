import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { lazy, Suspense } from 'react';

// Lazy load pages for better performance
const Home = lazy(() => import('../../pages/Home/index'));
const Search = lazy(() => import('../../pages/Search/index'));
const Category = lazy(() => import('../../pages/Category/index'));
const Product = lazy(() => import('../../pages/Product/index'));
const Cart = lazy(() => import('../../pages/Cart/index'));
const Checkout = lazy(() => import('../../pages/Checkout/index'));
const OrderSuccess = lazy(() => import('../../pages/OrderSuccess/index'));
const Orders = lazy(() => import('../../pages/Orders/index'));
const OrderDetails = lazy(() => import('../../pages/OrderDetails/index'));
const Wishlist = lazy(() => import('../../pages/Wishlist/index'));
const CustomerDashboard = lazy(() => import('../../pages/customer/Dashboard/index'));
const CustomerOrders = lazy(() => import('../../pages/customer/Orders/index'));
const CustomerOrderDetails = lazy(() => import('../../pages/customer/OrderDetails/index'));
const CustomerWishlist = lazy(() => import('../../pages/customer/Wishlist/index'));
const CustomerAddresses = lazy(() => import('../../pages/customer/Addresses/index'));
const CustomerPaymentMethods = lazy(() => import('../../pages/customer/PaymentMethods/index'));
const CustomerReviews = lazy(() => import('../../pages/customer/Reviews/index'));
const CustomerReturns = lazy(() => import('../../pages/customer/Returns/index'));
const CustomerMessages = lazy(() => import('../../pages/customer/Messages/index'));
const CustomerNotifications = lazy(() => import('../../pages/customer/Notifications/index'));
const CustomerProfile = lazy(() => import('../../pages/customer/Profile/index'));
const CustomerSecurity = lazy(() => import('../../pages/customer/Security/index'));
const CustomerHelp = lazy(() => import('../../pages/customer/Help/index'));
const CustomerPrivacy = lazy(() => import('../../pages/customer/Privacy/index'));

// Auth pages
const Login = lazy(() => import('../../pages/auth/Login/index'));
const Register = lazy(() => import('../../pages/auth/Register/index'));
const VerifyOTP = lazy(() => import('../../pages/auth/VerifyOTP/index'));
const ForgotPassword = lazy(() => import('../../pages/auth/ForgotPassword/index'));
const SellerOnboarding = lazy(() => import('../../pages/auth/SellerOnboarding/index'));

// Seller pages
const SellerDashboard = lazy(() => import('../../pages/seller/Dashboard/index'));
const SellerProducts = lazy(() => import('../../pages/seller/Products/index'));
const SellerAddProduct = lazy(() => import('../../pages/seller/AddProduct/index'));
const SellerOrders = lazy(() => import('../../pages/seller/Orders/index'));
const SellerInventory = lazy(() => import('../../pages/seller/Inventory/index'));
const SellerEarnings = lazy(() => import('../../pages/seller/Earnings/index'));

// Admin pages
const AdminDashboard = lazy(() => import('../../pages/admin/Dashboard/index'));
const AdminUsers = lazy(() => import('../../pages/admin/Users/index'));
const AdminSellers = lazy(() => import('../../pages/admin/Sellers/index'));
const AdminProducts = lazy(() => import('../../pages/admin/Products/index'));
const AdminOrders = lazy(() => import('../../pages/admin/Orders/index'));
const AdminReports = lazy(() => import('../../pages/admin/Reports/index'));

// Role-based admin dashboards
const FinanceAdminDashboard = lazy(() => import('../../pages/admin-finance/Dashboard/index'));
const ContentModeratorDashboard = lazy(() => import('../../pages/admin-moderator/Dashboard/index'));
const LogisticsManagerDashboard = lazy(() => import('../../pages/admin-logistics/Dashboard/index'));
const MarketingManagerDashboard = lazy(() => import('../../pages/admin-marketing/Dashboard/index'));
const SuperAdminDashboard = lazy(() => import('../../pages/admin-super/Dashboard/index'));

// Super Admin pages
const SuperAdminUsers = lazy(() => import('../../pages/admin-super/Users/index'));
const SuperAdminSellers = lazy(() => import('../../pages/admin-super/Sellers/index'));
const SuperAdminProducts = lazy(() => import('../../pages/admin-super/Products/index'));
const SuperAdminCategories = lazy(() => import('../../pages/admin-super/Categories/index'));
const SuperAdminOrders = lazy(() => import('../../pages/admin-super/Orders/index'));
const SuperAdminPayments = lazy(() => import('../../pages/admin-super/Payments/index'));
const SuperAdminDeliveries = lazy(() => import('../../pages/admin-super/Deliveries/index'));
const SuperAdminReviews = lazy(() => import('../../pages/admin-super/Reviews/index'));
const SuperAdminDisputes = lazy(() => import('../../pages/admin-super/Disputes/index'));
const SuperAdminPayouts = lazy(() => import('../../pages/admin-super/Payouts/index'));
const SuperAdminPromotions = lazy(() => import('../../pages/admin-super/Promotions/index'));
const SuperAdminNotifications = lazy(() => import('../../pages/admin-super/Notifications/index'));
const SuperAdminAnalytics = lazy(() => import('../../pages/admin-super/Analytics/index'));
const SuperAdminReports = lazy(() => import('../../pages/admin-super/Reports/index'));
const SuperAdminRoles = lazy(() => import('../../pages/admin-super/Roles/index'));
const SuperAdminSettings = lazy(() => import('../../pages/admin-super/Settings/index'));
const SuperAdminAuditLogs = lazy(() => import('../../pages/admin-super/AuditLogs/index'));
const SuperAdminSystemHealth = lazy(() => import('../../pages/admin-super/SystemHealth/index'));

// Error pages
const NotFound = lazy(() => import('../../pages/NotFound/index'));
const AccessDenied = lazy(() => import('../../pages/AccessDenied/index'));

// Loading component
const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
  </div>
);

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <Home />
      </Suspense>
    ),
  },
  {
    path: '/search',
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <Search />
      </Suspense>
    ),
  },
  {
    path: '/category/:id',
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <Category />
      </Suspense>
    ),
  },
  {
    path: '/product/:id',
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <Product />
      </Suspense>
    ),
  },
  {
    path: '/cart',
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <Cart />
      </Suspense>
    ),
  },
  {
    path: '/checkout',
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <Checkout />
      </Suspense>
    ),
  },
  {
    path: '/order-success',
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <OrderSuccess />
      </Suspense>
    ),
  },
  {
    path: '/orders',
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <Orders />
      </Suspense>
    ),
  },
  {
    path: '/orders/:id',
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <OrderDetails />
      </Suspense>
    ),
  },
  {
    path: '/wishlist',
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <Wishlist />
      </Suspense>
    ),
  },
  {
    path: '/dashboard',
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <CustomerDashboard />
      </Suspense>
    ),
  },
  {
    path: '/orders',
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <CustomerOrders />
      </Suspense>
    ),
  },
  {
    path: '/orders/:id',
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <CustomerOrderDetails />
      </Suspense>
    ),
  },
  {
    path: '/wishlist',
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <CustomerWishlist />
      </Suspense>
    ),
  },
  {
    path: '/addresses',
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <CustomerAddresses />
      </Suspense>
    ),
  },
  {
    path: '/payment-methods',
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <CustomerPaymentMethods />
      </Suspense>
    ),
  },
  {
    path: '/reviews',
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <CustomerReviews />
      </Suspense>
    ),
  },
  {
    path: '/returns',
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <CustomerReturns />
      </Suspense>
    ),
  },
  {
    path: '/messages',
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <CustomerMessages />
      </Suspense>
    ),
  },
  {
    path: '/notifications',
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <CustomerNotifications />
      </Suspense>
    ),
  },
  {
    path: '/profile',
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <CustomerProfile />
      </Suspense>
    ),
  },
  {
    path: '/security',
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <CustomerSecurity />
      </Suspense>
    ),
  },
  {
    path: '/help',
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <CustomerHelp />
      </Suspense>
    ),
  },
  {
    path: '/privacy',
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <CustomerPrivacy />
      </Suspense>
    ),
  },
  // Auth routes
  {
    path: '/auth/login',
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <Login />
      </Suspense>
    ),
  },
  {
    path: '/auth/register',
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <Register />
      </Suspense>
    ),
  },
  {
    path: '/login',
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <Login />
      </Suspense>
    ),
  },
  {
    path: '/register',
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <Register />
      </Suspense>
    ),
  },
  {
    path: '/verify-otp',
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <VerifyOTP />
      </Suspense>
    ),
  },
  {
    path: '/forgot-password',
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <ForgotPassword />
      </Suspense>
    ),
  },
  {
    path: '/seller-onboarding',
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <SellerOnboarding />
      </Suspense>
    ),
  },
  // Seller routes
  {
    path: '/seller/dashboard',
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <SellerDashboard />
      </Suspense>
    ),
  },
  {
    path: '/seller/products',
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <SellerProducts />
      </Suspense>
    ),
  },
  {
    path: '/seller/products/add',
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <SellerAddProduct />
      </Suspense>
    ),
  },
  {
    path: '/seller/orders',
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <SellerOrders />
      </Suspense>
    ),
  },
  {
    path: '/seller/inventory',
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <SellerInventory />
      </Suspense>
    ),
  },
  {
    path: '/seller/earnings',
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <SellerEarnings />
      </Suspense>
    ),
  },
  // Admin routes
  {
    path: '/admin/dashboard',
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <AdminDashboard />
      </Suspense>
    ),
  },
  {
    path: '/admin/users',
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <AdminUsers />
      </Suspense>
    ),
  },
  {
    path: '/admin/sellers',
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <AdminSellers />
      </Suspense>
    ),
  },
  {
    path: '/admin/products',
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <AdminProducts />
      </Suspense>
    ),
  },
  {
    path: '/admin/orders',
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <AdminOrders />
      </Suspense>
    ),
  },
  {
    path: '/admin/reports',
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <AdminReports />
      </Suspense>
    ),
  },
  // Role-based admin dashboards
  {
    path: '/admin-finance',
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <FinanceAdminDashboard />
      </Suspense>
    ),
  },
  {
    path: '/admin-finance/dashboard',
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <FinanceAdminDashboard />
      </Suspense>
    ),
  },
  {
    path: '/admin-moderator',
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <ContentModeratorDashboard />
      </Suspense>
    ),
  },
  {
    path: '/admin-moderator/dashboard',
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <ContentModeratorDashboard />
      </Suspense>
    ),
  },
  {
    path: '/admin-logistics',
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <LogisticsManagerDashboard />
      </Suspense>
    ),
  },
  {
    path: '/admin-logistics/dashboard',
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <LogisticsManagerDashboard />
      </Suspense>
    ),
  },
  {
    path: '/admin-marketing',
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <MarketingManagerDashboard />
      </Suspense>
    ),
  },
  {
    path: '/admin-marketing/dashboard',
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <MarketingManagerDashboard />
      </Suspense>
    ),
  },
  {
    path: '/admin-super',
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <SuperAdminDashboard />
      </Suspense>
    ),
  },
  {
    path: '/admin-super/dashboard',
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <SuperAdminDashboard />
      </Suspense>
    ),
  },
  {
    path: '/admin-super/users',
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <SuperAdminUsers />
      </Suspense>
    ),
  },
  {
    path: '/admin-super/sellers',
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <SuperAdminSellers />
      </Suspense>
    ),
  },
  {
    path: '/admin-super/products',
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <SuperAdminProducts />
      </Suspense>
    ),
  },
  {
    path: '/admin-super/categories',
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <SuperAdminCategories />
      </Suspense>
    ),
  },
  {
    path: '/admin-super/orders',
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <SuperAdminOrders />
      </Suspense>
    ),
  },
  {
    path: '/admin-super/payments',
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <SuperAdminPayments />
      </Suspense>
    ),
  },
  {
    path: '/admin-super/deliveries',
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <SuperAdminDeliveries />
      </Suspense>
    ),
  },
  {
    path: '/admin-super/reviews',
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <SuperAdminReviews />
      </Suspense>
    ),
  },
  {
    path: '/admin-super/disputes',
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <SuperAdminDisputes />
      </Suspense>
    ),
  },
  {
    path: '/admin-super/payouts',
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <SuperAdminPayouts />
      </Suspense>
    ),
  },
  {
    path: '/admin-super/promotions',
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <SuperAdminPromotions />
      </Suspense>
    ),
  },
  {
    path: '/admin-super/notifications',
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <SuperAdminNotifications />
      </Suspense>
    ),
  },
  {
    path: '/admin-super/analytics',
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <SuperAdminAnalytics />
      </Suspense>
    ),
  },
  {
    path: '/admin-super/reports',
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <SuperAdminReports />
      </Suspense>
    ),
  },
  {
    path: '/admin-super/roles',
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <SuperAdminRoles />
      </Suspense>
    ),
  },
  {
    path: '/admin-super/settings',
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <SuperAdminSettings />
      </Suspense>
    ),
  },
  {
    path: '/admin-super/audit-logs',
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <SuperAdminAuditLogs />
      </Suspense>
    ),
  },
  {
    path: '/admin-super/system-health',
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <SuperAdminSystemHealth />
      </Suspense>
    ),
  },
  {
    path: '/access-denied',
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <AccessDenied />
      </Suspense>
    ),
  },
  // Catch-all 404 route
  {
    path: '*',
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <NotFound />
      </Suspense>
    ),
  },
]);

const AppRouter = () => {
  return <RouterProvider router={router} />;
};

export default AppRouter;
