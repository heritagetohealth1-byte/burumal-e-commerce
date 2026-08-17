import { VIPTier } from './vipService';

interface User {
  id: string;
  phone: string;
  firstName: string;
  lastName: string;
  email?: string;
  role: 'customer' | 'seller' | 'admin';
  vipTier?: VIPTier;
}

class AuthService {
  private readonly TOKEN_KEY = 'burumal_token';
  private readonly USER_KEY = 'burumal_user';

  getToken(): string | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem(this.TOKEN_KEY);
  }

  getUser(): User | null {
    if (typeof window === 'undefined') return null;
    const stored = localStorage.getItem(this.USER_KEY);
    return stored ? JSON.parse(stored) : null;
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  login(token: string, user: User): void {
    localStorage.setItem(this.TOKEN_KEY, token);
    localStorage.setItem(this.USER_KEY, JSON.stringify(user));
  }

  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.USER_KEY);
  }

  updateUser(user: User): void {
    localStorage.setItem(this.USER_KEY, JSON.stringify(user));
  }
}

export const authService = new AuthService();
