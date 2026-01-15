import { Product, Order, User, Inquiry } from '../types';
import { INITIAL_PRODUCTS } from '../constants';

const KEYS = {
  PRODUCTS: 'triveni_products',
  ORDERS: 'triveni_orders',
  USER: 'triveni_user',
  CART: 'triveni_cart',
  INQUIRIES: 'triveni_inquiries'
};

// Initialize DB if empty, or merge new products/update images if they exist
const init = () => {
  let storedProducts: Product[] = [];
  const storedData = localStorage.getItem(KEYS.PRODUCTS);
  
  if (storedData) {
    storedProducts = JSON.parse(storedData);
  }

  // 1. If completely empty, set initial products
  if (storedProducts.length === 0) {
    localStorage.setItem(KEYS.PRODUCTS, JSON.stringify(INITIAL_PRODUCTS));
  } else {
    // 2. Merge logic: 
    // - Add products from INITIAL_PRODUCTS that are missing in storedProducts (by ID)
    // - Update images of existing products to ensure "Real Images" are applied
    let hasChanges = false;
    
    // Create a map of existing products for faster lookup
    const storedMap = new Map(storedProducts.map(p => [p.id, p]));

    INITIAL_PRODUCTS.forEach(initProduct => {
      if (!storedMap.has(initProduct.id)) {
        // Add new product (e.g., Dry Fruits we just added)
        storedProducts.push(initProduct);
        hasChanges = true;
      } else {
        // Update image if it's different (e.g. from placeholder to real image)
        const existing = storedMap.get(initProduct.id);
        if (existing && existing.image !== initProduct.image) {
           existing.image = initProduct.image;
           // Also update array
           const idx = storedProducts.findIndex(p => p.id === initProduct.id);
           if (idx !== -1) storedProducts[idx] = existing;
           hasChanges = true;
        }
      }
    });

    if (hasChanges) {
      localStorage.setItem(KEYS.PRODUCTS, JSON.stringify(storedProducts));
    }
  }

  if (!localStorage.getItem(KEYS.ORDERS)) {
    localStorage.setItem(KEYS.ORDERS, JSON.stringify([]));
  }
  if (!localStorage.getItem(KEYS.INQUIRIES)) {
    localStorage.setItem(KEYS.INQUIRIES, JSON.stringify([]));
  }
};

init();

export const storageService = {
  getProducts: (): Product[] => {
    const data = localStorage.getItem(KEYS.PRODUCTS);
    return data ? JSON.parse(data) : [];
  },

  saveProduct: (product: Product): void => {
    const products = storageService.getProducts();
    const existingIndex = products.findIndex(p => p.id === product.id);
    if (existingIndex >= 0) {
      products[existingIndex] = product;
    } else {
      products.push(product);
    }
    localStorage.setItem(KEYS.PRODUCTS, JSON.stringify(products));
  },

  deleteProduct: (id: string): void => {
    const products = storageService.getProducts().filter(p => p.id !== id);
    localStorage.setItem(KEYS.PRODUCTS, JSON.stringify(products));
  },

  getOrders: (): Order[] => {
    const data = localStorage.getItem(KEYS.ORDERS);
    return data ? JSON.parse(data) : [];
  },

  saveOrder: (order: Order): void => {
    const orders = storageService.getOrders();
    orders.unshift(order); // Newest first
    localStorage.setItem(KEYS.ORDERS, JSON.stringify(orders));
  },

  getInquiries: (): Inquiry[] => {
    const data = localStorage.getItem(KEYS.INQUIRIES);
    return data ? JSON.parse(data) : [];
  },

  saveInquiry: (inquiry: Inquiry): void => {
    const inquiries = storageService.getInquiries();
    inquiries.unshift(inquiry);
    localStorage.setItem(KEYS.INQUIRIES, JSON.stringify(inquiries));
  },

  getUser: (): User | null => {
    const data = localStorage.getItem(KEYS.USER);
    return data ? JSON.parse(data) : null;
  },

  saveUser: (user: User | null): void => {
    if (user) {
      localStorage.setItem(KEYS.USER, JSON.stringify(user));
    } else {
      localStorage.removeItem(KEYS.USER);
    }
  }
};