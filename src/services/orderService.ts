import { ordersApi, CreateOrderData } from './api/orders.api';
import { Order as ApiOrder } from '../types/order';

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
  status: 'pending' | 'confirmed' | 'processing' | 'ready' | 'shipped' | 'delivered' | 'cancelled' | 'refunded';
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

// Helper to convert API Order to local Order format
const convertApiOrderToLocal = (apiOrder: ApiOrder): Order => {
  return {
    id: apiOrder.id,
    userId: apiOrder.userId,
    items: apiOrder.items.map(item => ({
      productId: item.productId,
      productName: item.product.name,
      productImage: item.product.images[0] || '',
      quantity: item.quantity,
      price: item.price,
    })),
    total: apiOrder.total,
    status: apiOrder.status,
    deliveryAddress: {
      street: apiOrder.deliveryAddress.street,
      city: apiOrder.deliveryAddress.city,
      province: apiOrder.deliveryAddress.province,
      country: apiOrder.deliveryAddress.country,
      phone: '',
    },
    deliveryMethod: apiOrder.deliveryMethod,
    paymentMethod: apiOrder.paymentMethod,
    createdAt: apiOrder.createdAt,
    updatedAt: apiOrder.updatedAt,
  };
};

export const orderService = {
  async getAllOrders(): Promise<Order[]> {
    try {
      const response = await ordersApi.getOrders();
      return response.orders.map(convertApiOrderToLocal);
    } catch (error) {
      console.error('Failed to fetch orders via API, using localStorage fallback:', error);
      // Fallback to localStorage
      if (typeof window === 'undefined') return [];
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) return [];
      return JSON.parse(stored);
    }
  },

  async getOrdersByUserId(userId: string): Promise<Order[]> {
    try {
      const response = await ordersApi.getOrders();
      return response.orders
        .filter(o => o.userId === userId)
        .map(convertApiOrderToLocal)
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    } catch (error) {
      console.error('Failed to fetch user orders via API, using localStorage fallback:', error);
      // Fallback to localStorage
      const orders = await orderService.getAllOrders();
      return orders.filter(o => o.userId === userId).sort((a, b) => 
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    }
  },

  async getOrderById(id: string): Promise<Order | undefined> {
    try {
      const apiOrder = await ordersApi.getOrder(id);
      return convertApiOrderToLocal(apiOrder);
    } catch (error) {
      console.error('Failed to fetch order via API, using localStorage fallback:', error);
      // Fallback to localStorage
      const orders = await orderService.getAllOrders();
      return orders.find(o => o.id === id);
    }
  },

  async createOrder(order: Omit<Order, 'id' | 'createdAt' | 'updatedAt'>): Promise<Order> {
    try {
      const createData: CreateOrderData = {
        items: order.items.map(item => ({
          productId: item.productId,
          quantity: item.quantity,
        })),
        deliveryAddress: order.deliveryAddress,
        deliveryMethod: order.deliveryMethod,
        paymentMethod: order.paymentMethod,
      };
      const apiOrder = await ordersApi.createOrder(createData);
      return convertApiOrderToLocal(apiOrder);
    } catch (error) {
      console.error('Failed to create order via API, using localStorage fallback:', error);
      // Fallback to localStorage
      const orders = await orderService.getAllOrders();
      const newOrder: Order = {
        ...order,
        id: `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      orders.push(newOrder);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(orders));
      return newOrder;
    }
  },

  async updateOrderStatus(id: string, status: Order['status']): Promise<Order | null> {
    try {
      const apiOrder = await ordersApi.cancelOrder(id);
      return convertApiOrderToLocal(apiOrder);
    } catch (error) {
      console.error('Failed to update order via API, using localStorage fallback:', error);
      // Fallback to localStorage
      const orders = await orderService.getAllOrders();
      const index = orders.findIndex(o => o.id === id);
      if (index === -1) return null;
      
      orders[index] = { ...orders[index], status, updatedAt: new Date().toISOString() };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(orders));
      return orders[index];
    }
  },

  async getOrderCount(userId: string): Promise<number> {
    const orders = await orderService.getOrdersByUserId(userId);
    return orders.length;
  },
};
