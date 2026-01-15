import { Product, PricingUnit } from './types';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'p1',
    name: 'Alphonso Mango (Ratnagiri)',
    category: 'Seasonal',
    image: 'https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?q=80&w=800&auto=format&fit=crop',
    description: 'Premium quality Ratnagiri Alphonso mangoes. Sweet and aromatic.',
    inStock: true,
    isPopular: true,
    variants: [
      { unit: PricingUnit.DOZEN, price: 1200, minQty: 1, isWholesale: false },
      { unit: PricingUnit.BOX, price: 3500, minQty: 1, isWholesale: true }, // Box of 4 dozen
    ]
  },
  {
    id: 'p2',
    name: 'Kashmir Apple',
    category: 'Regular',
    image: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?q=80&w=800&auto=format&fit=crop',
    description: 'Fresh crisp apples directly from Kashmir valleys.',
    inStock: true,
    isPopular: true,
    variants: [
      { unit: PricingUnit.KG, price: 220, minQty: 1, isWholesale: false },
      { unit: PricingUnit.CRATE, price: 4000, minQty: 1, isWholesale: true }, // 20kg crate
    ]
  },
  {
    id: 'p3',
    name: 'Robusta Banana',
    category: 'Regular',
    image: 'https://images.unsplash.com/photo-1571771896612-618db687000d?q=80&w=800&auto=format&fit=crop',
    description: 'Yellow Robusta bananas, perfect for daily consumption.',
    inStock: true,
    variants: [
      { unit: PricingUnit.DOZEN, price: 60, minQty: 1, isWholesale: false },
      { unit: PricingUnit.CRATE, price: 800, minQty: 1, isWholesale: true },
    ]
  },
  {
    id: 'p4',
    name: 'Dragon Fruit (White Flesh)',
    category: 'Exotic',
    image: 'https://images.unsplash.com/photo-1527324688151-0e627063f2b1?q=80&w=800&auto=format&fit=crop',
    description: 'Rich in antioxidants, fresh imported Dragon fruit.',
    inStock: true,
    isPopular: true,
    variants: [
      { unit: PricingUnit.KG, price: 180, minQty: 1, isWholesale: false },
      { unit: PricingUnit.BOX, price: 1500, minQty: 1, isWholesale: true },
    ]
  },
  {
    id: 'p5',
    name: 'Nagpur Oranges',
    category: 'Seasonal',
    image: 'https://images.unsplash.com/photo-1611080626919-7cf5a9dbab5b?q=80&w=800&auto=format&fit=crop',
    description: 'Juicy and sweet Nagpur oranges.',
    inStock: true,
    variants: [
      { unit: PricingUnit.KG, price: 80, minQty: 1, isWholesale: false },
      { unit: PricingUnit.CRATE, price: 1800, minQty: 1, isWholesale: true },
    ]
  },
  {
    id: 'p6',
    name: 'Pomegranate (Kabul)',
    category: 'Regular',
    image: 'https://images.unsplash.com/photo-1615485499978-50dca04829d7?q=80&w=800&auto=format&fit=crop',
    description: 'Deep red seeds, sweet taste. High quality Kabul variety.',
    inStock: true,
    isPopular: true,
    variants: [
      { unit: PricingUnit.KG, price: 240, minQty: 1, isWholesale: false },
      { unit: PricingUnit.BOX, price: 2200, minQty: 1, isWholesale: true }, // 10kg box
    ]
  },
  // --- NEW ADDITIONS (Dry Fruits & More Types) ---
  {
    id: 'p7',
    name: 'Premium Almonds (Badam)',
    category: 'Dry Fruits',
    image: 'https://images.unsplash.com/photo-1623315024748-0c6a56c07147?q=80&w=800&auto=format&fit=crop',
    description: 'Crunchy and nutritious premium California almonds.',
    inStock: true,
    isPopular: true,
    variants: [
      { unit: PricingUnit.KG, price: 850, minQty: 1, isWholesale: false },
      { unit: PricingUnit.BOX, price: 8200, minQty: 1, isWholesale: true }, // 10kg
    ]
  },
  {
    id: 'p8',
    name: 'Whole Cashews (Kaju)',
    category: 'Dry Fruits',
    image: 'https://images.unsplash.com/photo-1598282766327-0205f4260a22?q=80&w=800&auto=format&fit=crop',
    description: 'W320 grade whole white cashews. Great for cooking and snacking.',
    inStock: true,
    variants: [
      { unit: PricingUnit.KG, price: 900, minQty: 1, isWholesale: false },
      { unit: PricingUnit.BOX, price: 8800, minQty: 1, isWholesale: true },
    ]
  },
  {
    id: 'p9',
    name: 'Golden Raisins (Kismis)',
    category: 'Dry Fruits',
    image: 'https://images.unsplash.com/photo-1595413628479-7dd2e14652c7?q=80&w=800&auto=format&fit=crop',
    description: 'Sweet golden raisins, perfect for desserts.',
    inStock: true,
    variants: [
      { unit: PricingUnit.KG, price: 350, minQty: 1, isWholesale: false },
      { unit: PricingUnit.BOX, price: 3200, minQty: 1, isWholesale: true },
    ]
  },
  {
    id: 'p10',
    name: 'Dates (Khajoor)',
    category: 'Dry Fruits',
    image: 'https://images.unsplash.com/photo-1550528409-e85d99787e68?q=80&w=800&auto=format&fit=crop',
    description: 'Premium soft Lion dates. High energy source.',
    inStock: true,
    variants: [
      { unit: PricingUnit.KG, price: 400, minQty: 1, isWholesale: false },
      { unit: PricingUnit.BOX, price: 3800, minQty: 1, isWholesale: true },
    ]
  },
  {
    id: 'p11',
    name: 'Watermelon (Kiran)',
    category: 'Seasonal',
    image: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?q=80&w=800&auto=format&fit=crop',
    description: 'Sweet red Kiran watermelon. Hydrating and refreshing.',
    inStock: true,
    variants: [
      { unit: PricingUnit.PIECE, price: 50, minQty: 1, isWholesale: false },
      { unit: PricingUnit.KG, price: 15, minQty: 10, isWholesale: true },
    ]
  },
  {
    id: 'p12',
    name: 'Kiwi (Green)',
    category: 'Exotic',
    image: 'https://images.unsplash.com/photo-1518495973542-4542c06a5843?q=80&w=800&auto=format&fit=crop',
    description: 'Tangy and sweet green kiwis. Vitamin C rich.',
    inStock: true,
    variants: [
      { unit: PricingUnit.PIECE, price: 40, minQty: 1, isWholesale: false },
      { unit: PricingUnit.BOX, price: 1000, minQty: 1, isWholesale: true }, // Box of 30
    ]
  }
];

export const KHAMMAM_LOCATION = {
  lat: 17.2473,
  lng: 80.1514,
  address: "Wyra Rd, Near New Bus Stand, Khammam, Telangana 507001"
};

export const CONTACT_PHONE = "8187855608";
export const WHATSAPP_LINK = `https://wa.me/918187855608`;