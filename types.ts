export enum PricingUnit {
  KG = 'Kg',
  BOX = 'Box',
  CRATE = 'Crate',
  DOZEN = 'Dozen',
  PIECE = 'Piece'
}

export interface ProductVariant {
  unit: PricingUnit;
  price: number;
  minQty: number; // Minimum quantity for this price (e.g., 1 for retail, 10 for wholesale)
  isWholesale: boolean;
}

export interface Product {
  id: string;
  name: string;
  category: 'Seasonal' | 'Exotic' | 'Regular' | 'Dry Fruits';
  image: string;
  description: string;
  variants: ProductVariant[];
  inStock: boolean;
  isPopular?: boolean;
}

export interface CartItem {
  productId: string;
  name: string;
  image: string;
  unit: PricingUnit;
  price: number;
  quantity: number;
}

export interface Order {
  id: string;
  customerName: string;
  phone: string;
  address: string;
  items: CartItem[];
  totalAmount: number;
  status: 'Pending' | 'Confirmed' | 'Delivered' | 'Cancelled';
  date: string;
  deliverySlot: 'Morning (8AM - 11AM)' | 'Evening (4PM - 8PM)';
  paymentMethod: 'COD' | 'UPI' | 'Online';
}

export interface User {
  name: string;
  phone: string;
  role: 'customer' | 'admin';
}

export interface Inquiry {
  id: string;
  name: string;
  phone: string;
  message: string;
  date: string;
}