import { walletApi } from './api/wallet.api';

export interface WalletTransaction {
  id: string;
  type: 'credit' | 'debit';
  amount: number;
  description: string;
  date: string;
  balance: number;
}

export interface Wallet {
  balance: number;
  currency: string;
  transactions: WalletTransaction[];
}

class WalletService {
  private readonly STORAGE_KEY = 'burumal_wallet';

  async getWallet(): Promise<Wallet> {
    try {
      return await walletApi.getWallet();
    } catch (error) {
      console.error('Failed to fetch wallet via API, using localStorage fallback:', error);
      // Fallback to localStorage
      if (typeof window === 'undefined') {
        return this.getDefaultWallet();
      }
      const stored = localStorage.getItem(this.STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
      return this.getDefaultWallet();
    }
  }

  private getDefaultWallet(): Wallet {
    return {
      balance: 0,
      currency: 'BIF',
      transactions: [],
    };
  }

  async addFunds(amount: number, description: string): Promise<void> {
    try {
      await walletApi.addFunds(amount, description);
    } catch (error) {
      console.error('Failed to add funds via API, using localStorage fallback:', error);
      // Fallback to localStorage
      const wallet = this.getWallet();
      const transaction: WalletTransaction = {
        id: Date.now().toString(),
        type: 'credit',
        amount,
        description,
        date: new Date().toISOString(),
        balance: (await wallet).balance + amount,
      };

      const updatedWallet = await wallet;
      updatedWallet.balance += amount;
      updatedWallet.transactions.unshift(transaction);
      this.saveWallet(updatedWallet);
    }
  }

  async deductFunds(amount: number, description: string): Promise<boolean> {
    try {
      await walletApi.deductFunds(amount, description);
      return true;
    } catch (error) {
      console.error('Failed to deduct funds via API, using localStorage fallback:', error);
      // Fallback to localStorage
      const wallet = await this.getWallet();
      if (wallet.balance < amount) {
        return false;
      }

      const transaction: WalletTransaction = {
        id: Date.now().toString(),
        type: 'debit',
        amount,
        description,
        date: new Date().toISOString(),
        balance: wallet.balance - amount,
      };

      wallet.balance -= amount;
      wallet.transactions.unshift(transaction);
      this.saveWallet(wallet);
      return true;
    }
  }

  async getTransactions(limit: number = 10): Promise<WalletTransaction[]> {
    try {
      return await walletApi.getTransactions(limit);
    } catch (error) {
      console.error('Failed to fetch transactions via API, using localStorage fallback:', error);
      // Fallback to localStorage
      const wallet = await this.getWallet();
      return wallet.transactions.slice(0, limit);
    }
  }

  private saveWallet(wallet: Wallet): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(wallet));
    }
  }

  resetWallet(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(this.STORAGE_KEY);
    }
  }
}

export const walletService = new WalletService();
