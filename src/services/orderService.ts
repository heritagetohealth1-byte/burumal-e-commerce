export interface OrderItem {
  productId: string;
  productName: string;
  productImage: string;
  quantity: number;
  price: number;
}

export interface Order {
  id: string;
  userId: string;
  items: OrderItem[];
  total: number;
  status: 'pending' | 'processing' | 'ready' | 'shipped' | 'delivered' | 'cancelled';
  deliveryAddress: {
    street: string;
    city: string;
    province: string;
    country: string;
    phone: string;
  };
  deliveryMethod: 'standard' | 'express';
  paymentMethod: 'mobile_money' | 'bank' | 'burundi_pay' | 'cash_on_delivery';
  createdAt: string;
  updatedAt: string;
}

const STORAGE_KEY = 'burumal_orders';

export const orderService = {
  getAllOrders: (): Order[] => {
    if (typeof window === 'undefined') return [];
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return [];
    return JSON.parse(stored);
  },

  getOrdersByUserId: (userId: string): Order[] => {
    const orders = orderService.getAllOrders();
    return orders.filter(o => o.userId === userId).sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  },

  getOrderById: (id: string): Order | undefined => {
    const orders = orderService.getAllOrders();
    return orders.find(o => o.id === id);
  },

  createOrder: (order: Omit<Order, 'id' | 'createdAt' | 'updatedAt'>): Order => {
    const orders = orderService.getAllOrders();
    const newOrder: Order = {
      ...order,
      id: `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    orders.push(newOrder);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(orders));
    return newOrder;
  },

  updateOrderStatus: (id: string, status: Order['status']): Order | null => {
    const orders = orderService.getAllOrders();
    const index = orders.findIndex(o => o.id === id);
    if (index === -1) return null;
    
    orders[index] = { ...orders[index], status, updatedAt: new Date().toISOString() };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(orders));
    return orders[index];
  },

  getOrderCount: (userId: string): number => {
    const orders = orderService.getOrdersByUserId(userId);
    return orders.length;
  },
};
