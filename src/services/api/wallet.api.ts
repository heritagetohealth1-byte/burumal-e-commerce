import apiClient from './client';

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

export const walletApi = {
  getWallet: async (): Promise<Wallet> => {
    const response = await apiClient.get<Wallet>('/wallet');
    return response.data;
  },

  addFunds: async (amount: number, description: string): Promise<Wallet> => {
    const response = await apiClient.post<Wallet>('/wallet/deposit', { amount, description });
    return response.data;
  },

  deductFunds: async (amount: number, description: string): Promise<Wallet> => {
    const response = await apiClient.post<Wallet>('/wallet/withdraw', { amount, description });
    return response.data;
  },

  getTransactions: async (limit: number = 10): Promise<WalletTransaction[]> => {
    const response = await apiClient.get<WalletTransaction[]>('/wallet/transactions', { params: { limit } });
    return response.data;
  },
};
