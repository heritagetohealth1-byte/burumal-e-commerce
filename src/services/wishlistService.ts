export interface WishlistItem {
  productId: string;
  productName: string;
  productImage: string;
  price: number;
  addedAt: string;
}

const STORAGE_KEY = 'burumal_wishlist';

export const wishlistService = {
  getWishlist: (userId: string): WishlistItem[] => {
    if (typeof window === 'undefined') return [];
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return [];
    const allWishlists = JSON.parse(stored);
    return allWishlists[userId] || [];
  },

  addToWishlist: (userId: string, item: Omit<WishlistItem, 'addedAt'>): void => {
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
  },

  removeFromWishlist: (userId: string, productId: string): void => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return;
    
    const allWishlists = JSON.parse(stored);
    if (allWishlists[userId]) {
      allWishlists[userId] = allWishlists[userId].filter((i: WishlistItem) => i.productId !== productId);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(allWishlists));
    }
  },

  getWishlistCount: (userId: string): number => {
    return wishlistService.getWishlist(userId).length;
  },

  clearWishlist: (userId: string): void => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return;
    
    const allWishlists = JSON.parse(stored);
    delete allWishlists[userId];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(allWishlists));
  },
};
