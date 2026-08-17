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

  getWallet(): Wallet {
    if (typeof window === 'undefined') {
      return this.getDefaultWallet();
    }
    const stored = localStorage.getItem(this.STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
    return this.getDefaultWallet();
  }

  private getDefaultWallet(): Wallet {
    return {
      balance: 0,
      currency: 'BIF',
      transactions: [],
    };
  }

  addFunds(amount: number, description: string): void {
    const wallet = this.getWallet();
    const transaction: WalletTransaction = {
      id: Date.now().toString(),
      type: 'credit',
      amount,
      description,
      date: new Date().toISOString(),
      balance: wallet.balance + amount,
    };

    wallet.balance += amount;
    wallet.transactions.unshift(transaction);
    this.saveWallet(wallet);
  }

  deductFunds(amount: number, description: string): boolean {
    const wallet = this.getWallet();
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

  getTransactions(limit: number = 10): WalletTransaction[] {
    const wallet = this.getWallet();
    return wallet.transactions.slice(0, limit);
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
