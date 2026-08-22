import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Header from '../../../components/layout/Header';
import Footer from '../../../components/layout/Footer';
import MobileNav from '../../../components/layout/MobileNav';
import Button from '../../../components/common/Button';
import Input from '../../../components/common/Input';
import { authService } from '../../../services/authService';

export default function Register() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'customer',
  });
  const [loading, setLoading] = useState(false);
  const [key, setKey] = useState(0);

  // Force re-render when language changes
  useEffect(() => {
    const handleLanguageChange = () => {
      setKey(prev => prev + 1);
    };
    i18n.on('languageChanged', handleLanguageChange);
    return () => i18n.off('languageChanged', handleLanguageChange);
  }, [i18n]);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Parse name into firstName and lastName
      const nameParts = formData.name.trim().split(' ');
      const firstName = nameParts[0] || '';
      const lastName = nameParts.slice(1).join(' ') || '';

      // Validate passwords match
      if (formData.password !== formData.confirmPassword) {
        alert('Passwords do not match');
        setLoading(false);
        return;
      }

      // Register via backend API
      await authService.register({
        phone: formData.phone,
        password: formData.password,
        firstName,
        lastName,
        email: formData.email,
      });

      setLoading(false);

      // Navigate based on role
      if (formData.role === 'seller') {
        navigate('/seller-onboarding');
      } else {
        navigate('/dashboard');
      }
    } catch (error) {
      console.error('Registration failed:', error);
      alert('Registration failed. Please try again.');
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRoleChange = (role: string) => {
    setFormData({ ...formData, role });
  };

  return (
    <div key={key} className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 pb-20 md:pb-0">
        <div className="container py-12">
          <div className="max-w-md mx-auto">
            <h1 className="text-2xl font-bold mb-2">{t('auth.createAccount')}</h1>
            <p className="text-gray-600 mb-8">{t('auth.signUpToContinue')}</p>
            
            {/* Role Selection */}
            <div className="mb-6">
              <p className="text-sm font-medium text-gray-700 mb-3">{t('auth.selectRole')}</p>
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => handleRoleChange('customer')}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    formData.role === 'customer'
                      ? 'border-primary-600 bg-primary-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="text-center">
                    <div className="text-2xl mb-1">🛒</div>
                    <div className="font-medium">{t('auth.customer')}</div>
                    <div className="text-xs text-gray-500 mt-1">{t('auth.customerDesc')}</div>
                  </div>
                </button>
                <button
                  type="button"
                  onClick={() => handleRoleChange('seller')}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    formData.role === 'seller'
                      ? 'border-primary-600 bg-primary-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="text-center">
                    <div className="text-2xl mb-1">🏪</div>
                    <div className="font-medium">{t('auth.seller')}</div>
                    <div className="text-xs text-gray-500 mt-1">{t('auth.sellerDesc')}</div>
                  </div>
                </button>
              </div>
            </div>
            
            <form onSubmit={handleRegister} className="space-y-4">
              <Input
                label={t('auth.fullName')}
                type="text"
                placeholder={t('auth.enterFullName')}
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
              
              <Input
                label={t('auth.phoneNumber')}
                type="tel"
                placeholder={t('auth.enterPhone')}
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
              />
              
              <Input
                label={t('auth.email')}
                type="email"
                placeholder={t('auth.enterEmail')}
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              
              <Input
                label={t('auth.password')}
                type="password"
                placeholder={t('auth.enterPassword')}
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              
              <Input
                label={t('auth.confirmPassword')}
                type="password"
                placeholder={t('auth.confirmPasswordPlaceholder')}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
              
              <Button type="submit" fullWidth loading={loading}>
                {t('auth.createAccount')}
              </Button>
            </form>
            
            <div className="mt-6 text-center">
              <p className="text-gray-600">
                {t('auth.hasAccount')}{' '}
                <Link to="/login" className="text-primary-600 hover:underline">
                  {t('auth.signIn')}
                </Link>
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <MobileNav />
    </div>
  );
}
