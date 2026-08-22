import { VIPTier } from './vipService';
import { authApi, LoginCredentials, RegisterData } from './api/auth.api';

interface User {
  id: string;
  phone: string;
  firstName: string;
  lastName: string;
  email?: string;
  role: 'customer' | 'seller' | 'admin';
  vipTier?: VIPTier;
}

interface AuthResponse {
  access_token: string;
  refresh_token: string;
  user: User;
}

class AuthService {
  private readonly TOKEN_KEY = 'burumal_token';
  private readonly REFRESH_TOKEN_KEY = 'burumal_refresh_token';
  private readonly USER_KEY = 'burumal_user';

  getToken(): string | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem(this.TOKEN_KEY);
  }

  getRefreshToken(): string | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem(this.REFRESH_TOKEN_KEY);
  }

  getUser(): User | null {
    if (typeof window === 'undefined') return null;
    const stored = localStorage.getItem(this.USER_KEY);
    return stored ? JSON.parse(stored) : null;
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  async login(credentials: LoginCredentials): Promise<void> {
    try {
      const response = await authApi.login(credentials);
      localStorage.setItem(this.TOKEN_KEY, response.access_token);
      localStorage.setItem(this.REFRESH_TOKEN_KEY, response.refresh_token);
      localStorage.setItem(this.USER_KEY, JSON.stringify(response.user));
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  }

  async register(data: RegisterData): Promise<void> {
    try {
      const response = await authApi.register(data);
      localStorage.setItem(this.TOKEN_KEY, response.access_token);
      localStorage.setItem(this.REFRESH_TOKEN_KEY, response.refresh_token);
      localStorage.setItem(this.USER_KEY, JSON.stringify(response.user));
    } catch (error) {
      console.error('Registration failed:', error);
      throw error;
    }
  }

  async logout(): Promise<void> {
    try {
      await authApi.logout();
    } catch (error) {
      console.error('Logout API call failed:', error);
    } finally {
      localStorage.removeItem(this.TOKEN_KEY);
      localStorage.removeItem(this.REFRESH_TOKEN_KEY);
      localStorage.removeItem(this.USER_KEY);
    }
  }

  updateUser(user: User): void {
    localStorage.setItem(this.USER_KEY, JSON.stringify(user));
  }

  async getCurrentUser(): Promise<User> {
    try {
      const user = await authApi.getCurrentUser();
      localStorage.setItem(this.USER_KEY, JSON.stringify(user));
      return user;
    } catch (error) {
      console.error('Failed to fetch current user:', error);
      throw error;
    }
  }
}

export const authService = new AuthService();
