import { vipService } from './vipService';
import { walletService } from './walletService';
import { cartApi } from './api/cart.api';

interface CartItem {
  id: string;
  product: {
    id: string;
    name: string;
    price: number;
    currency: string;
    image: string;
  };
  quantity: number;
  total: number;
}

class CartService {
  private readonly STORAGE_KEY = 'burumal_cart';

  getCartItems(): CartItem[] {
    if (typeof window === 'undefined') return [];
    const stored = localStorage.getItem(this.STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  }

  async addToCart(product: any, quantity: number = 1): Promise<void> {
    try {
      await cartApi.addToCart(product.id, quantity);
    } catch (error) {
      console.error('Failed to add to cart via API, using localStorage fallback:', error);
      // Fallback to localStorage
      const items = this.getCartItems();
      const existingItem = items.find(item => item.product.id === product.id);

      if (existingItem) {
        existingItem.quantity += quantity;
        existingItem.total = existingItem.quantity * existingItem.product.price;
      } else {
        items.push({
          id: Date.now().toString(),
          product,
          quantity,
          total: quantity * product.price,
        });
      }

      this.saveCart(items);
    }
  }

  async checkout(): Promise<boolean> {
    const items = this.getCartItems();
    if (items.length === 0) return false;

    const total = this.getCartTotal();
    const wallet = await walletService.getWallet();

    // Check if wallet has enough balance
    if (wallet.balance < total) {
      return false;
    }

    // Deduct from wallet
    const success = await walletService.deductFunds(total, 'Purchase');
    if (!success) return false;

    // Update VIP status based on purchase
    vipService.updateTotalSpent(total);

    // Clear cart
    await this.clearCart();
    return true;
  }

  async removeFromCart(itemId: string): Promise<void> {
    try {
      // Try to get product ID from item
      const items = this.getCartItems();
      const item = items.find(i => i.id === itemId);
      if (item) {
        await cartApi.removeFromCart(item.product.id);
      }
    } catch (error) {
      console.error('Failed to remove from cart via API, using localStorage fallback:', error);
    }
    // Always update localStorage
    const items = this.getCartItems().filter(item => item.id !== itemId);
    this.saveCart(items);
  }

  async updateQuantity(itemId: string, quantity: number): Promise<void> {
    const items = this.getCartItems();
    const item = items.find(item => item.id === itemId);
    
    if (item) {
      if (quantity <= 0) {
        await this.removeFromCart(itemId);
        return;
      }
      
      try {
        await cartApi.updateCartItem(item.product.id, quantity);
      } catch (error) {
        console.error('Failed to update cart via API, using localStorage fallback:', error);
      }
      
      item.quantity = quantity;
      item.total = item.quantity * item.product.price;
      this.saveCart(items);
    }
  }

  async clearCart(): Promise<void> {
    try {
      await cartApi.clearCart();
    } catch (error) {
      console.error('Failed to clear cart via API, using localStorage fallback:', error);
    }
    localStorage.removeItem(this.STORAGE_KEY);
  }

  getCartTotal(): number {
    const items = this.getCartItems();
    return items.reduce((sum, item) => sum + item.total, 0);
  }

  getCartCount(): number {
    const items = this.getCartItems();
    return items.reduce((sum, item) => sum + item.quantity, 0);
  }

  private saveCart(items: CartItem[]): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(items));
  }
}

export const cartService = new CartService();
