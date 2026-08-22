import apiClient from './client';

export interface WishlistItem {
  productId: string;
  productName: string;
  productImage: string;
  price: number;
  addedAt: string;
}

export const wishlistApi = {
  getWishlist: async (): Promise<WishlistItem[]> => {
    const response = await apiClient.get<WishlistItem[]>('/wishlist');
    return response.data;
  },

  addToWishlist: async (productId: string): Promise<WishlistItem[]> => {
    const response = await apiClient.post<WishlistItem[]>('/wishlist', { productId });
    return response.data;
  },

  removeFromWishlist: async (productId: string): Promise<WishlistItem[]> => {
    const response = await apiClient.delete<WishlistItem[]>(`/wishlist/${productId}`);
    return response.data;
  },

  clearWishlist: async (): Promise<void> => {
    await apiClient.delete('/wishlist');
  },
};
