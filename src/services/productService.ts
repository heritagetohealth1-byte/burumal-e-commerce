import { productsApi, ProductFilters } from './api/products.api';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  brand?: string;
  sku?: string;
  images: string[];
  sellerId: string;
  sellerName: string;
  rating: number;
  reviews: number;
  createdAt: string;
}

const STORAGE_KEY = 'burumal_products';

export const productService = {
  getAllProducts: async (): Promise<Product[]> => {
    try {
      const response = await productsApi.getProducts();
      return response.products;
    } catch (error) {
      console.error('Failed to fetch products:', error);
      // Fallback to localStorage if API fails
      if (typeof window === 'undefined') return [];
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) return [];
      return JSON.parse(stored);
    }
  },

  getProductsByCategory: async (category: string): Promise<Product[]> => {
    try {
      const response = await productsApi.getProductsByCategory(category);
      return response.products;
    } catch (error) {
      console.error('Failed to fetch products by category:', error);
      // Fallback to localStorage
      const products = await productService.getAllProducts();
      return products.filter(p => p.category === category);
    }
  },

  getProductById: async (id: string): Promise<Product | undefined> => {
    try {
      return await productsApi.getProduct(id);
    } catch (error) {
      console.error('Failed to fetch product:', error);
      // Fallback to localStorage
      const products = await productService.getAllProducts();
      return products.find(p => p.id === id);
    }
  },

  searchProducts: async (query: string, filters: ProductFilters = {}): Promise<Product[]> => {
    try {
      const response = await productsApi.searchProducts(query, filters);
      return response.products;
    } catch (error) {
      console.error('Failed to search products:', error);
      // Fallback to localStorage
      const products = await productService.getAllProducts();
      return products.filter(p => 
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.description.toLowerCase().includes(query.toLowerCase())
      );
    }
  },

  // Keep localStorage methods for seller operations (add/update/delete)
  addProduct: (product: Omit<Product, 'id' | 'createdAt' | 'rating' | 'reviews'>): Product => {
    const products = productService.getAllProducts();
    const newProduct: Product = {
      ...product,
      id: `PROD-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      createdAt: new Date().toISOString(),
      rating: 0,
      reviews: 0,
    };
    products.push(newProduct);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
    return newProduct;
  },

  updateProduct: (id: string, updates: Partial<Product>): Product | null => {
    const products = productService.getAllProducts();
    const index = products.findIndex(p => p.id === id);
    if (index === -1) return null;
    
    products[index] = { ...products[index], ...updates };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
    return products[index];
  },

  deleteProduct: (id: string): boolean => {
    const products = productService.getAllProducts();
    const filtered = products.filter(p => p.id !== id);
    if (filtered.length === products.length) return false;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
    return true;
  },

  initializeMockProducts: () => {
    if (typeof window === 'undefined') return;
    const existing = localStorage.getItem(STORAGE_KEY);
    if (existing) return;

    const mockProducts: Product[] = [
      {
        id: 'PROD-001',
        name: 'Wireless Bluetooth Headphones',
        description: 'High-quality wireless headphones with noise cancellation and 30-hour battery life.',
        price: 45000,
        stock: 50,
        category: 'electronics',
        brand: 'SoundMax',
        sku: 'SM-BT-001',
        images: ['https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400'],
        sellerId: 'seller-1',
        sellerName: 'TechStore Burundi',
        rating: 4.5,
        reviews: 128,
        createdAt: '2024-01-10T00:00:00Z',
      },
      {
        id: 'PROD-002',
        name: 'Women\'s Summer Dress',
        description: 'Elegant floral summer dress made from breathable cotton fabric.',
        price: 25000,
        stock: 30,
        category: 'fashion',
        brand: 'StyleHub',
        sku: 'SH-D-002',
        images: ['https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400'],
        sellerId: 'seller-2',
        sellerName: 'Fashion Forward',
        rating: 4.8,
        reviews: 95,
        createdAt: '2024-01-11T00:00:00Z',
      },
      {
        id: 'PROD-003',
        name: 'Organic Face Serum',
        description: 'Natural vitamin C serum for glowing skin. Paraben-free and cruelty-free.',
        price: 18000,
        stock: 100,
        category: 'beauty',
        brand: 'GlowNaturals',
        sku: 'GN-FS-003',
        images: ['https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400'],
        sellerId: 'seller-3',
        sellerName: 'Beauty Box',
        rating: 4.7,
        reviews: 203,
        createdAt: '2024-01-12T00:00:00Z',
      },
      {
        id: 'PROD-004',
        name: 'Modern Table Lamp',
        description: 'Minimalist LED table lamp with adjustable brightness and USB charging port.',
        price: 35000,
        stock: 25,
        category: 'home',
        brand: 'HomeBright',
        sku: 'HB-TL-004',
        images: ['https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400'],
        sellerId: 'seller-1',
        sellerName: 'TechStore Burundi',
        rating: 4.3,
        reviews: 67,
        createdAt: '2024-01-13T00:00:00Z',
      },
      {
        id: 'PROD-005',
        name: 'Baby Cotton Onesie',
        description: 'Soft organic cotton onesie for newborns. Hypoallergenic and gentle on skin.',
        price: 12000,
        stock: 80,
        category: 'baby',
        brand: 'BabyComfort',
        sku: 'BC-OS-005',
        images: ['https://images.unsplash.com/photo-1519689680058-324335c77eba?w=400'],
        sellerId: 'seller-4',
        sellerName: 'Little Ones',
        rating: 4.9,
        reviews: 156,
        createdAt: '2024-01-14T00:00:00Z',
      },
      {
        id: 'PROD-006',
        name: 'Handwoven Basket',
        description: 'Beautiful handwoven basket made by local artisans. Perfect for home decor.',
        price: 22000,
        stock: 40,
        category: 'gifts',
        brand: 'CraftBurundi',
        sku: 'CB-HB-006',
        images: ['https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=400'],
        sellerId: 'seller-5',
        sellerName: 'Local Crafts',
        rating: 4.6,
        reviews: 89,
        createdAt: '2024-01-15T00:00:00Z',
      },
    ];

    localStorage.setItem(STORAGE_KEY, JSON.stringify(mockProducts));
  },
};
