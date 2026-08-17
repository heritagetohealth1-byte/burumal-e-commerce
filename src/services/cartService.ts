import { vipService } from './vipService';
import { walletService } from './walletService';

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

  addToCart(product: any, quantity: number = 1): void {
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

  checkout(): boolean {
    const items = this.getCartItems();
    if (items.length === 0) return false;

    const total = this.getCartTotal();
    const wallet = walletService.getWallet();

    // Check if wallet has enough balance
    if (wallet.balance < total) {
      return false;
    }

    // Deduct from wallet
    const success = walletService.deductFunds(total, 'Purchase');
    if (!success) return false;

    // Update VIP status based on purchase
    vipService.updateTotalSpent(total);

    // Clear cart
    this.clearCart();
    return true;
  }

  removeFromCart(itemId: string): void {
    const items = this.getCartItems().filter(item =>  item.id !== itemId);
    this.saveCart(items);
  }

  updateQuantity(itemId: string, quantity: number): void {
    const items = this.getCartItems();
    const item = items.find(item => item.id === itemId);
    
    if (item) {
      if (quantity <= 0) {
        this.removeFromCart(itemId);
        return;
      }
      item.quantity = quantity;
      item.total = item.quantity * item.product.price;
      this.saveCart(items);
    }
  }

  clearCart(): void {
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
