import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Header from '../../../components/layout/Header';
import Footer from '../../../components/layout/Footer';
import MobileNav from '../../../components/layout/MobileNav';
import Button from '../../../components/common/Button';
import Input from '../../../components/common/Input';
import { authService } from '../../../services/authService';

export default function Login() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
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

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Login via backend API
      await authService.login({
        phone,
        password,
      });

      setLoading(false);

      // Redirect to the page they were trying to access, or dashboard
      const redirectTo = location.state?.redirectTo || '/dashboard';
      navigate(redirectTo);
    } catch (error) {
      console.error('Login failed:', error);
      alert('Login failed. Please check your credentials and try again.');
      setLoading(false);
    }
  };

  return (
    <div key={key} className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 pb-20 md:pb-0">
        <div className="container py-12">
          <div className="max-w-md mx-auto">
            <h1 className="text-2xl font-bold mb-2">{t('auth.welcomeBack')}</h1>
            <p className="text-gray-600 mb-8">{t('auth.signInToContinue')}</p>
            
            <form onSubmit={handleLogin} className="space-y-4">
              <Input
                label={t('auth.phoneNumber')}
                type="tel"
                placeholder={t('auth.enterPhone')}
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
              
              <Input
                label={t('auth.password')}
                type="password"
                placeholder={t('auth.enterPassword')}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              
              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" />
                  <span className="text-sm text-gray-600">{t('auth.rememberMe')}</span>
                </label>
                <Link to="/forgot-password" className="text-sm text-primary-600 hover:underline">
                  {t('auth.forgotPassword')}
                </Link>
              </div>
              
              <Button type="submit" fullWidth loading={loading}>
                {t('auth.signIn')}
              </Button>
            </form>
            
            <div className="mt-6 text-center">
              <p className="text-gray-600">
                {t('auth.noAccount')}{' '}
                <Link to="/register" className="text-primary-600 hover:underline">
                  {t('auth.signUp')}
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
