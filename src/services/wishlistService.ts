import { wishlistApi } from './api/wishlist.api';

export interface WishlistItem {
  productId: string;
  productName: string;
  productImage: string;
  price: number;
  addedAt: string;
}

const STORAGE_KEY = 'burumal_wishlist';

export const wishlistService = {
  async getWishlist(userId: string): Promise<WishlistItem[]> {
    try {
      return await wishlistApi.getWishlist();
    } catch (error) {
      console.error('Failed to fetch wishlist via API, using localStorage fallback:', error);
      // Fallback to localStorage
      if (typeof window === 'undefined') return [];
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) return [];
      const allWishlists = JSON.parse(stored);
      return allWishlists[userId] || [];
    }
  },

  async addToWishlist(userId: string, item: Omit<WishlistItem, 'addedAt'>): Promise<void> {
    try {
      await wishlistApi.addToWishlist(item.productId);
    } catch (error) {
      console.error('Failed to add to wishlist via API, using localStorage fallback:', error);
      // Fallback to localStorage
      const stored = localStorage.getItem(STORAGE_KEY);
      const allWishlists = stored ? JSON.parse(stored) : {};
      
      if (!allWishlists[userId]) {
        allWishlists[userId] = [];
      }
      
      // Check if item already exists
      const exists = allWishlists[userId].some((i: WishlistItem) => i.productId === item.productId);
      if (!exists) {
        allWishlists[userId].push({
          ...item,
          addedAt: new Date().toISOString(),
        });
        localStorage.setItem(STORAGE_KEY, JSON.stringify(allWishlists));
      }
    }
  },

  async removeFromWishlist(userId: string, productId: string): Promise<void> {
    try {
      await wishlistApi.removeFromWishlist(productId);
    } catch (error) {
      console.error('Failed to remove from wishlist via API, using localStorage fallback:', error);
      // Fallback to localStorage
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) return;
      
      const allWishlists = JSON.parse(stored);
      if (allWishlists[userId]) {
        allWishlists[userId] = allWishlists[userId].filter((i: WishlistItem) => i.productId !== productId);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(allWishlists));
      }
    }
  },

  async getWishlistCount(userId: string): Promise<number> {
    const wishlist = await wishlistService.getWishlist(userId);
    return wishlist.length;
  },

  async clearWishlist(userId: string): Promise<void> {
    try {
      await wishlistApi.clearWishlist();
    } catch (error) {
      console.error('Failed to clear wishlist via API, using localStorage fallback:', error);
    }
    // Always update localStorage
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return;
    
    const allWishlists = JSON.parse(stored);
    delete allWishlists[userId];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(allWishlists));
  },

  initializeWishlist(): void {
    if (typeof window === 'undefined') return;
    // Clear any existing wishlist data to ensure no placeholders
    localStorage.removeItem(STORAGE_KEY);
    localStorage.setItem(STORAGE_KEY, JSON.stringify({}));
  },

  clearAllWishlists(): void {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(STORAGE_KEY);
  },
};
