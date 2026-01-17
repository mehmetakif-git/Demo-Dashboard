import {
  LayoutDashboard,
  ShoppingCart,
  Package,
  FolderTree,
  Users,
  Warehouse,
  Percent,
  Truck,
  Star,
} from 'lucide-react';
import type { MenuItem } from '@/types';

// Menu Items for Sidebar
export const ecommerceMenuItems: MenuItem[] = [
  {
    id: 'ecommerce',
    label: 'Overview',
    icon: LayoutDashboard,
    path: '/dashboard/ecommerce/overview',
  },
  {
    id: 'ecommerce-orders',
    label: 'Orders',
    icon: ShoppingCart,
    path: '/dashboard/ecommerce/orders',
  },
  {
    id: 'ecommerce-products',
    label: 'Products',
    icon: Package,
    path: '/dashboard/ecommerce/products',
  },
  {
    id: 'ecommerce-categories',
    label: 'Categories',
    icon: FolderTree,
    path: '/dashboard/ecommerce/categories',
  },
  {
    id: 'ecommerce-customers',
    label: 'Customers',
    icon: Users,
    path: '/dashboard/ecommerce/customers',
  },
  {
    id: 'ecommerce-inventory',
    label: 'Inventory',
    icon: Warehouse,
    path: '/dashboard/ecommerce/inventory',
  },
  {
    id: 'ecommerce-discounts',
    label: 'Discounts',
    icon: Percent,
    path: '/dashboard/ecommerce/discounts',
  },
  {
    id: 'ecommerce-shipping',
    label: 'Shipping',
    icon: Truck,
    path: '/dashboard/ecommerce/shipping',
  },
  {
    id: 'ecommerce-reviews',
    label: 'Reviews',
    icon: Star,
    path: '/dashboard/ecommerce/reviews',
  },
];

// Categories
export const categories = [
  {
    id: "CAT001",
    name: "Electronics",
    slug: "electronics",
    parentId: null,
    image: null,
    productCount: 45,
    status: "active",
    children: [
      { id: "CAT001-1", name: "Smartphones", slug: "smartphones", parentId: "CAT001", productCount: 18 },
      { id: "CAT001-2", name: "Laptops", slug: "laptops", parentId: "CAT001", productCount: 12 },
      { id: "CAT001-3", name: "Tablets", slug: "tablets", parentId: "CAT001", productCount: 8 },
      { id: "CAT001-4", name: "Accessories", slug: "accessories", parentId: "CAT001", productCount: 7 }
    ]
  },
  {
    id: "CAT002",
    name: "Fashion",
    slug: "fashion",
    parentId: null,
    image: null,
    productCount: 68,
    status: "active",
    children: [
      { id: "CAT002-1", name: "Men's Clothing", slug: "mens-clothing", parentId: "CAT002", productCount: 25 },
      { id: "CAT002-2", name: "Women's Clothing", slug: "womens-clothing", parentId: "CAT002", productCount: 30 },
      { id: "CAT002-3", name: "Shoes", slug: "shoes", parentId: "CAT002", productCount: 13 }
    ]
  },
  {
    id: "CAT003",
    name: "Home & Living",
    slug: "home-living",
    parentId: null,
    image: null,
    productCount: 42,
    status: "active",
    children: [
      { id: "CAT003-1", name: "Furniture", slug: "furniture", parentId: "CAT003", productCount: 15 },
      { id: "CAT003-2", name: "Decor", slug: "decor", parentId: "CAT003", productCount: 18 },
      { id: "CAT003-3", name: "Kitchen", slug: "kitchen", parentId: "CAT003", productCount: 9 }
    ]
  },
  {
    id: "CAT004",
    name: "Beauty & Health",
    slug: "beauty-health",
    parentId: null,
    image: null,
    productCount: 35,
    status: "active",
    children: [
      { id: "CAT004-1", name: "Skincare", slug: "skincare", parentId: "CAT004", productCount: 15 },
      { id: "CAT004-2", name: "Makeup", slug: "makeup", parentId: "CAT004", productCount: 12 },
      { id: "CAT004-3", name: "Fragrances", slug: "fragrances", parentId: "CAT004", productCount: 8 }
    ]
  },
  {
    id: "CAT005",
    name: "Sports & Outdoors",
    slug: "sports-outdoors",
    parentId: null,
    image: null,
    productCount: 28,
    status: "active",
    children: [
      { id: "CAT005-1", name: "Fitness Equipment", slug: "fitness-equipment", parentId: "CAT005", productCount: 10 },
      { id: "CAT005-2", name: "Sportswear", slug: "sportswear", parentId: "CAT005", productCount: 12 },
      { id: "CAT005-3", name: "Outdoor Gear", slug: "outdoor-gear", parentId: "CAT005", productCount: 6 }
    ]
  }
];

// Products
export const products = [
  {
    id: "PRD001",
    sku: "ELEC-SP-001",
    name: "iPhone 15 Pro Max 256GB",
    slug: "iphone-15-pro-max-256gb",
    description: "Latest Apple iPhone with A17 Pro chip, titanium design, and advanced camera system.",
    shortDescription: "Apple's most powerful iPhone ever",
    categoryId: "CAT001-1",
    categoryName: "Smartphones",
    brand: "Apple",
    images: [],
    price: 4999,
    compareAtPrice: 5299,
    costPrice: 4200,
    currency: "QAR",
    stock: 25,
    lowStockThreshold: 5,
    trackInventory: true,
    variants: [
      { id: "VAR001", name: "Natural Titanium", sku: "ELEC-SP-001-NT", stock: 10, price: 4999 },
      { id: "VAR002", name: "Blue Titanium", sku: "ELEC-SP-001-BT", stock: 8, price: 4999 },
      { id: "VAR003", name: "White Titanium", sku: "ELEC-SP-001-WT", stock: 7, price: 4999 }
    ],
    weight: 0.221,
    dimensions: { length: 15.99, width: 7.69, height: 0.83 },
    tags: ["apple", "iphone", "smartphone", "5g"],
    status: "active",
    featured: true,
    rating: 4.8,
    reviewCount: 124,
    soldCount: 89,
    createdAt: "2024-09-15",
    updatedAt: "2024-12-20"
  },
  {
    id: "PRD002",
    sku: "ELEC-SP-002",
    name: "Samsung Galaxy S24 Ultra 512GB",
    slug: "samsung-galaxy-s24-ultra-512gb",
    description: "Samsung's flagship with Galaxy AI, S Pen, and 200MP camera.",
    shortDescription: "AI-powered Galaxy experience",
    categoryId: "CAT001-1",
    categoryName: "Smartphones",
    brand: "Samsung",
    images: [],
    price: 4599,
    compareAtPrice: null,
    costPrice: 3800,
    currency: "QAR",
    stock: 18,
    lowStockThreshold: 5,
    trackInventory: true,
    variants: [
      { id: "VAR004", name: "Titanium Black", sku: "ELEC-SP-002-TB", stock: 8, price: 4599 },
      { id: "VAR005", name: "Titanium Gray", sku: "ELEC-SP-002-TG", stock: 10, price: 4599 }
    ],
    weight: 0.232,
    dimensions: { length: 16.24, width: 7.9, height: 0.86 },
    tags: ["samsung", "galaxy", "smartphone", "5g", "ai"],
    status: "active",
    featured: true,
    rating: 4.7,
    reviewCount: 98,
    soldCount: 67,
    createdAt: "2024-01-20",
    updatedAt: "2024-12-18"
  },
  {
    id: "PRD003",
    sku: "ELEC-LP-001",
    name: "MacBook Pro 14\" M3 Pro",
    slug: "macbook-pro-14-m3-pro",
    description: "Supercharged by M3 Pro chip. Up to 18 hours battery life.",
    shortDescription: "Pro performance, portable design",
    categoryId: "CAT001-2",
    categoryName: "Laptops",
    brand: "Apple",
    images: [],
    price: 8499,
    compareAtPrice: 8999,
    costPrice: 7200,
    currency: "QAR",
    stock: 12,
    lowStockThreshold: 3,
    trackInventory: true,
    variants: [
      { id: "VAR006", name: "Space Black", sku: "ELEC-LP-001-SB", stock: 6, price: 8499 },
      { id: "VAR007", name: "Silver", sku: "ELEC-LP-001-SL", stock: 6, price: 8499 }
    ],
    weight: 1.55,
    dimensions: { length: 31.26, width: 22.12, height: 1.55 },
    tags: ["apple", "macbook", "laptop", "m3"],
    status: "active",
    featured: true,
    rating: 4.9,
    reviewCount: 76,
    soldCount: 45,
    createdAt: "2024-02-10",
    updatedAt: "2024-12-15"
  },
  {
    id: "PRD004",
    sku: "ELEC-TB-001",
    name: "iPad Pro 12.9\" M2 256GB",
    slug: "ipad-pro-12-9-m2-256gb",
    description: "The ultimate iPad experience with M2 chip and Liquid Retina XDR display.",
    shortDescription: "Powerful. Creative. Magical.",
    categoryId: "CAT001-3",
    categoryName: "Tablets",
    brand: "Apple",
    images: [],
    price: 4799,
    compareAtPrice: null,
    costPrice: 4000,
    currency: "QAR",
    stock: 8,
    lowStockThreshold: 3,
    trackInventory: true,
    variants: [
      { id: "VAR008", name: "Space Gray - WiFi", sku: "ELEC-TB-001-SGW", stock: 4, price: 4799 },
      { id: "VAR009", name: "Silver - WiFi", sku: "ELEC-TB-001-SLW", stock: 4, price: 4799 }
    ],
    weight: 0.682,
    dimensions: { length: 28.06, width: 21.49, height: 0.64 },
    tags: ["apple", "ipad", "tablet", "m2"],
    status: "active",
    featured: false,
    rating: 4.8,
    reviewCount: 52,
    soldCount: 34,
    createdAt: "2024-03-05",
    updatedAt: "2024-12-10"
  },
  {
    id: "PRD005",
    sku: "ELEC-AC-001",
    name: "AirPods Pro 2nd Generation",
    slug: "airpods-pro-2nd-gen",
    description: "Active Noise Cancellation, Adaptive Audio, and Personalized Spatial Audio.",
    shortDescription: "Intelligent sound for every ear",
    categoryId: "CAT001-4",
    categoryName: "Accessories",
    brand: "Apple",
    images: [],
    price: 899,
    compareAtPrice: 999,
    costPrice: 720,
    currency: "QAR",
    stock: 45,
    lowStockThreshold: 10,
    trackInventory: true,
    variants: [],
    weight: 0.051,
    dimensions: { length: 4.52, width: 6.06, height: 2.14 },
    tags: ["apple", "airpods", "earbuds", "wireless"],
    status: "active",
    featured: true,
    rating: 4.7,
    reviewCount: 189,
    soldCount: 156,
    createdAt: "2024-01-10",
    updatedAt: "2024-12-20"
  },
  {
    id: "PRD006",
    sku: "FASH-MC-001",
    name: "Premium Cotton T-Shirt",
    slug: "premium-cotton-tshirt",
    description: "100% organic cotton t-shirt. Comfortable, breathable, and sustainable.",
    shortDescription: "Everyday essential tee",
    categoryId: "CAT002-1",
    categoryName: "Men's Clothing",
    brand: "Basics Co.",
    images: [],
    price: 129,
    compareAtPrice: 159,
    costPrice: 45,
    currency: "QAR",
    stock: 120,
    lowStockThreshold: 20,
    trackInventory: true,
    variants: [
      { id: "VAR010", name: "White - S", sku: "FASH-MC-001-WS", stock: 15, price: 129 },
      { id: "VAR011", name: "White - M", sku: "FASH-MC-001-WM", stock: 20, price: 129 },
      { id: "VAR012", name: "White - L", sku: "FASH-MC-001-WL", stock: 18, price: 129 },
      { id: "VAR013", name: "Black - S", sku: "FASH-MC-001-BS", stock: 15, price: 129 },
      { id: "VAR014", name: "Black - M", sku: "FASH-MC-001-BM", stock: 22, price: 129 },
      { id: "VAR015", name: "Black - L", sku: "FASH-MC-001-BL", stock: 18, price: 129 },
      { id: "VAR016", name: "Navy - M", sku: "FASH-MC-001-NM", stock: 12, price: 129 }
    ],
    weight: 0.2,
    dimensions: null,
    tags: ["tshirt", "cotton", "basic", "mens"],
    status: "active",
    featured: false,
    rating: 4.5,
    reviewCount: 234,
    soldCount: 412,
    createdAt: "2024-02-01",
    updatedAt: "2024-12-18"
  },
  {
    id: "PRD007",
    sku: "FASH-WC-001",
    name: "Elegant Maxi Dress",
    slug: "elegant-maxi-dress",
    description: "Flowing maxi dress perfect for any occasion. Lightweight and elegant.",
    shortDescription: "Effortless elegance",
    categoryId: "CAT002-2",
    categoryName: "Women's Clothing",
    brand: "Luxe Fashion",
    images: [],
    price: 459,
    compareAtPrice: 599,
    costPrice: 180,
    currency: "QAR",
    stock: 35,
    lowStockThreshold: 8,
    trackInventory: true,
    variants: [
      { id: "VAR017", name: "Black - S", sku: "FASH-WC-001-BS", stock: 8, price: 459 },
      { id: "VAR018", name: "Black - M", sku: "FASH-WC-001-BM", stock: 10, price: 459 },
      { id: "VAR019", name: "Burgundy - S", sku: "FASH-WC-001-BUS", stock: 7, price: 459 },
      { id: "VAR020", name: "Burgundy - M", sku: "FASH-WC-001-BUM", stock: 10, price: 459 }
    ],
    weight: 0.35,
    dimensions: null,
    tags: ["dress", "maxi", "elegant", "womens"],
    status: "active",
    featured: true,
    rating: 4.6,
    reviewCount: 87,
    soldCount: 65,
    createdAt: "2024-04-15",
    updatedAt: "2024-12-12"
  },
  {
    id: "PRD008",
    sku: "FASH-SH-001",
    name: "Classic Leather Sneakers",
    slug: "classic-leather-sneakers",
    description: "Premium leather sneakers with cushioned insole. Timeless design.",
    shortDescription: "Classic comfort",
    categoryId: "CAT002-3",
    categoryName: "Shoes",
    brand: "StepUp",
    images: [],
    price: 599,
    compareAtPrice: null,
    costPrice: 250,
    currency: "QAR",
    stock: 42,
    lowStockThreshold: 10,
    trackInventory: true,
    variants: [
      { id: "VAR021", name: "White - 40", sku: "FASH-SH-001-W40", stock: 6, price: 599 },
      { id: "VAR022", name: "White - 41", sku: "FASH-SH-001-W41", stock: 8, price: 599 },
      { id: "VAR023", name: "White - 42", sku: "FASH-SH-001-W42", stock: 10, price: 599 },
      { id: "VAR024", name: "White - 43", sku: "FASH-SH-001-W43", stock: 8, price: 599 },
      { id: "VAR025", name: "White - 44", sku: "FASH-SH-001-W44", stock: 6, price: 599 },
      { id: "VAR026", name: "Black - 42", sku: "FASH-SH-001-B42", stock: 4, price: 599 }
    ],
    weight: 0.8,
    dimensions: null,
    tags: ["sneakers", "leather", "shoes", "unisex"],
    status: "active",
    featured: false,
    rating: 4.4,
    reviewCount: 156,
    soldCount: 198,
    createdAt: "2024-03-20",
    updatedAt: "2024-12-15"
  },
  {
    id: "PRD009",
    sku: "HOME-FR-001",
    name: "Modern Minimalist Sofa",
    slug: "modern-minimalist-sofa",
    description: "3-seater sofa with premium fabric upholstery. Scandinavian design.",
    shortDescription: "Comfort meets design",
    categoryId: "CAT003-1",
    categoryName: "Furniture",
    brand: "NordicHome",
    images: [],
    price: 3299,
    compareAtPrice: 3999,
    costPrice: 1800,
    currency: "QAR",
    stock: 6,
    lowStockThreshold: 2,
    trackInventory: true,
    variants: [
      { id: "VAR027", name: "Light Gray", sku: "HOME-FR-001-LG", stock: 3, price: 3299 },
      { id: "VAR028", name: "Charcoal", sku: "HOME-FR-001-CH", stock: 3, price: 3299 }
    ],
    weight: 45,
    dimensions: { length: 210, width: 85, height: 75 },
    tags: ["sofa", "furniture", "living room", "modern"],
    status: "active",
    featured: true,
    rating: 4.8,
    reviewCount: 34,
    soldCount: 18,
    createdAt: "2024-05-10",
    updatedAt: "2024-12-10"
  },
  {
    id: "PRD010",
    sku: "HOME-DC-001",
    name: "Ceramic Vase Set (3 pcs)",
    slug: "ceramic-vase-set-3pcs",
    description: "Handcrafted ceramic vases in varying sizes. Perfect for home decoration.",
    shortDescription: "Artisan crafted decor",
    categoryId: "CAT003-2",
    categoryName: "Decor",
    brand: "ArtisanHome",
    images: [],
    price: 299,
    compareAtPrice: 349,
    costPrice: 120,
    currency: "QAR",
    stock: 28,
    lowStockThreshold: 5,
    trackInventory: true,
    variants: [
      { id: "VAR029", name: "White", sku: "HOME-DC-001-WH", stock: 15, price: 299 },
      { id: "VAR030", name: "Earth Tone", sku: "HOME-DC-001-ET", stock: 13, price: 299 }
    ],
    weight: 1.5,
    dimensions: null,
    tags: ["vase", "decor", "ceramic", "home"],
    status: "active",
    featured: false,
    rating: 4.6,
    reviewCount: 67,
    soldCount: 89,
    createdAt: "2024-06-01",
    updatedAt: "2024-12-08"
  },
  {
    id: "PRD011",
    sku: "BEAU-SK-001",
    name: "Hydrating Face Serum 30ml",
    slug: "hydrating-face-serum-30ml",
    description: "Advanced hydration formula with hyaluronic acid and vitamin E.",
    shortDescription: "Deep hydration boost",
    categoryId: "CAT004-1",
    categoryName: "Skincare",
    brand: "GlowLab",
    images: [],
    price: 189,
    compareAtPrice: null,
    costPrice: 65,
    currency: "QAR",
    stock: 65,
    lowStockThreshold: 15,
    trackInventory: true,
    variants: [],
    weight: 0.08,
    dimensions: { length: 3.5, width: 3.5, height: 10 },
    tags: ["serum", "skincare", "hydrating", "beauty"],
    status: "active",
    featured: false,
    rating: 4.7,
    reviewCount: 145,
    soldCount: 234,
    createdAt: "2024-04-01",
    updatedAt: "2024-12-18"
  },
  {
    id: "PRD012",
    sku: "SPRT-FE-001",
    name: "Professional Yoga Mat",
    slug: "professional-yoga-mat",
    description: "Extra thick 6mm mat with non-slip surface. Includes carrying strap.",
    shortDescription: "Your perfect practice partner",
    categoryId: "CAT005-1",
    categoryName: "Fitness Equipment",
    brand: "FitZone",
    images: [],
    price: 149,
    compareAtPrice: 199,
    costPrice: 55,
    currency: "QAR",
    stock: 52,
    lowStockThreshold: 10,
    trackInventory: true,
    variants: [
      { id: "VAR031", name: "Purple", sku: "SPRT-FE-001-PU", stock: 18, price: 149 },
      { id: "VAR032", name: "Blue", sku: "SPRT-FE-001-BL", stock: 20, price: 149 },
      { id: "VAR033", name: "Black", sku: "SPRT-FE-001-BK", stock: 14, price: 149 }
    ],
    weight: 1.2,
    dimensions: { length: 183, width: 61, height: 0.6 },
    tags: ["yoga", "mat", "fitness", "exercise"],
    status: "active",
    featured: false,
    rating: 4.5,
    reviewCount: 98,
    soldCount: 167,
    createdAt: "2024-02-20",
    updatedAt: "2024-12-12"
  }
];

// Product Statuses
export const productStatuses = [
  { id: "active", name: "Active", color: "#10b981" },
  { id: "draft", name: "Draft", color: "#64748b" },
  { id: "out-of-stock", name: "Out of Stock", color: "#ef4444" },
  { id: "archived", name: "Archived", color: "#6b7280" }
];

// Customers
export const customers = [
  {
    id: "CUS001",
    firstName: "Khalid",
    lastName: "Al-Mansouri",
    email: "khalid.m@email.com",
    phone: "+974 5541 0001",
    avatar: null,
    addresses: [
      {
        id: "ADDR001",
        type: "shipping",
        default: true,
        firstName: "Khalid",
        lastName: "Al-Mansouri",
        address1: "Building 45, Flat 12",
        address2: "Al Corniche Street",
        city: "Doha",
        state: "Doha",
        country: "Qatar",
        postalCode: "00000",
        phone: "+974 5541 0001"
      }
    ],
    totalOrders: 12,
    totalSpent: 8750,
    averageOrderValue: 729,
    tags: ["vip", "repeat-customer"],
    status: "active",
    marketingConsent: true,
    notes: "Prefers evening deliveries",
    createdAt: "2023-06-15",
    lastOrderAt: "2024-12-18"
  },
  {
    id: "CUS002",
    firstName: "Sarah",
    lastName: "Thompson",
    email: "sarah.t@email.com",
    phone: "+974 5541 0002",
    avatar: null,
    addresses: [
      {
        id: "ADDR002",
        type: "shipping",
        default: true,
        firstName: "Sarah",
        lastName: "Thompson",
        address1: "Villa 78",
        address2: "West Bay Lagoon",
        city: "Doha",
        state: "Doha",
        country: "Qatar",
        postalCode: "00000",
        phone: "+974 5541 0002"
      }
    ],
    totalOrders: 8,
    totalSpent: 12450,
    averageOrderValue: 1556,
    tags: ["vip"],
    status: "active",
    marketingConsent: true,
    notes: "",
    createdAt: "2023-09-20",
    lastOrderAt: "2024-12-20"
  },
  {
    id: "CUS003",
    firstName: "Mohammed",
    lastName: "Hassan",
    email: "m.hassan@email.com",
    phone: "+974 5541 0003",
    avatar: null,
    addresses: [
      {
        id: "ADDR003",
        type: "shipping",
        default: true,
        firstName: "Mohammed",
        lastName: "Hassan",
        address1: "Pearl Tower, Apt 2305",
        address2: "Porto Arabia",
        city: "The Pearl",
        state: "Doha",
        country: "Qatar",
        postalCode: "00000",
        phone: "+974 5541 0003"
      }
    ],
    totalOrders: 5,
    totalSpent: 3200,
    averageOrderValue: 640,
    tags: [],
    status: "active",
    marketingConsent: false,
    notes: "",
    createdAt: "2024-03-10",
    lastOrderAt: "2024-12-15"
  },
  {
    id: "CUS004",
    firstName: "Fatima",
    lastName: "Al-Thani",
    email: "fatima.t@email.com",
    phone: "+974 5541 0004",
    avatar: null,
    addresses: [
      {
        id: "ADDR004",
        type: "shipping",
        default: true,
        firstName: "Fatima",
        lastName: "Al-Thani",
        address1: "Compound 12, Villa 8",
        address2: "Al Waab",
        city: "Doha",
        state: "Doha",
        country: "Qatar",
        postalCode: "00000",
        phone: "+974 5541 0004"
      }
    ],
    totalOrders: 15,
    totalSpent: 18900,
    averageOrderValue: 1260,
    tags: ["vip", "repeat-customer", "fashion-lover"],
    status: "active",
    marketingConsent: true,
    notes: "High-value customer. Birthday: March 15",
    createdAt: "2023-02-01",
    lastOrderAt: "2024-12-22"
  },
  {
    id: "CUS005",
    firstName: "James",
    lastName: "Wilson",
    email: "j.wilson@email.com",
    phone: "+974 5541 0005",
    avatar: null,
    addresses: [
      {
        id: "ADDR005",
        type: "shipping",
        default: true,
        firstName: "James",
        lastName: "Wilson",
        address1: "Office 405, Tower B",
        address2: "West Bay Business District",
        city: "Doha",
        state: "Doha",
        country: "Qatar",
        postalCode: "00000",
        phone: "+974 5541 0005"
      }
    ],
    totalOrders: 3,
    totalSpent: 15500,
    averageOrderValue: 5167,
    tags: ["corporate", "electronics"],
    status: "active",
    marketingConsent: true,
    notes: "Corporate buyer - prefers invoice",
    createdAt: "2024-08-15",
    lastOrderAt: "2024-12-10"
  },
  {
    id: "CUS006",
    firstName: "Aisha",
    lastName: "Mahmoud",
    email: "aisha.m@email.com",
    phone: "+974 5541 0006",
    avatar: null,
    addresses: [
      {
        id: "ADDR006",
        type: "shipping",
        default: true,
        firstName: "Aisha",
        lastName: "Mahmoud",
        address1: "Building 22, Floor 5",
        address2: "Musheireb",
        city: "Doha",
        state: "Doha",
        country: "Qatar",
        postalCode: "00000",
        phone: "+974 5541 0006"
      }
    ],
    totalOrders: 6,
    totalSpent: 4200,
    averageOrderValue: 700,
    tags: ["beauty-lover"],
    status: "active",
    marketingConsent: true,
    notes: "",
    createdAt: "2024-01-20",
    lastOrderAt: "2024-12-19"
  }
];

// Orders
export const orders = [
  {
    id: "ORD001",
    orderNumber: "EC-2024-10001",
    customerId: "CUS001",
    customerName: "Khalid Al-Mansouri",
    customerEmail: "khalid.m@email.com",
    items: [
      { productId: "PRD001", productName: "iPhone 15 Pro Max 256GB", variantName: "Natural Titanium", sku: "ELEC-SP-001-NT", quantity: 1, price: 4999, total: 4999 },
      { productId: "PRD005", productName: "AirPods Pro 2nd Generation", variantName: null, sku: "ELEC-AC-001", quantity: 1, price: 899, total: 899 }
    ],
    subtotal: 5898,
    shippingCost: 0,
    discount: 0,
    discountCode: null,
    tax: 0,
    total: 5898,
    currency: "QAR",
    paymentMethod: "card",
    paymentStatus: "paid",
    shippingAddress: {
      firstName: "Khalid",
      lastName: "Al-Mansouri",
      address1: "Building 45, Flat 12",
      address2: "Al Corniche Street",
      city: "Doha",
      country: "Qatar",
      phone: "+974 5541 0001"
    },
    shippingMethod: "standard",
    trackingNumber: "QP123456789QA",
    status: "delivered",
    notes: "",
    createdAt: "2024-12-15T10:30:00",
    updatedAt: "2024-12-18T14:00:00",
    deliveredAt: "2024-12-18T14:00:00"
  },
  {
    id: "ORD002",
    orderNumber: "EC-2024-10002",
    customerId: "CUS002",
    customerName: "Sarah Thompson",
    customerEmail: "sarah.t@email.com",
    items: [
      { productId: "PRD003", productName: "MacBook Pro 14\" M3 Pro", variantName: "Space Black", sku: "ELEC-LP-001-SB", quantity: 1, price: 8499, total: 8499 }
    ],
    subtotal: 8499,
    shippingCost: 0,
    discount: 500,
    discountCode: "NEWYEAR500",
    tax: 0,
    total: 7999,
    currency: "QAR",
    paymentMethod: "card",
    paymentStatus: "paid",
    shippingAddress: {
      firstName: "Sarah",
      lastName: "Thompson",
      address1: "Villa 78",
      address2: "West Bay Lagoon",
      city: "Doha",
      country: "Qatar",
      phone: "+974 5541 0002"
    },
    shippingMethod: "express",
    trackingNumber: "QP123456790QA",
    status: "shipped",
    notes: "Gift wrap requested",
    createdAt: "2024-12-20T09:15:00",
    updatedAt: "2024-12-21T11:00:00",
    deliveredAt: null
  },
  {
    id: "ORD003",
    orderNumber: "EC-2024-10003",
    customerId: "CUS004",
    customerName: "Fatima Al-Thani",
    customerEmail: "fatima.t@email.com",
    items: [
      { productId: "PRD007", productName: "Elegant Maxi Dress", variantName: "Black - M", sku: "FASH-WC-001-BM", quantity: 2, price: 459, total: 918 },
      { productId: "PRD008", productName: "Classic Leather Sneakers", variantName: "White - 38", sku: "FASH-SH-001-W38", quantity: 1, price: 599, total: 599 }
    ],
    subtotal: 1517,
    shippingCost: 25,
    discount: 151.70,
    discountCode: "VIP10",
    tax: 0,
    total: 1390.30,
    currency: "QAR",
    paymentMethod: "card",
    paymentStatus: "paid",
    shippingAddress: {
      firstName: "Fatima",
      lastName: "Al-Thani",
      address1: "Compound 12, Villa 8",
      address2: "Al Waab",
      city: "Doha",
      country: "Qatar",
      phone: "+974 5541 0004"
    },
    shippingMethod: "standard",
    trackingNumber: null,
    status: "processing",
    notes: "",
    createdAt: "2024-12-22T14:45:00",
    updatedAt: "2024-12-22T14:45:00",
    deliveredAt: null
  },
  {
    id: "ORD004",
    orderNumber: "EC-2024-10004",
    customerId: "CUS003",
    customerName: "Mohammed Hassan",
    customerEmail: "m.hassan@email.com",
    items: [
      { productId: "PRD006", productName: "Premium Cotton T-Shirt", variantName: "White - L", sku: "FASH-MC-001-WL", quantity: 3, price: 129, total: 387 },
      { productId: "PRD006", productName: "Premium Cotton T-Shirt", variantName: "Black - L", sku: "FASH-MC-001-BL", quantity: 2, price: 129, total: 258 }
    ],
    subtotal: 645,
    shippingCost: 25,
    discount: 0,
    discountCode: null,
    tax: 0,
    total: 670,
    currency: "QAR",
    paymentMethod: "cod",
    paymentStatus: "pending",
    shippingAddress: {
      firstName: "Mohammed",
      lastName: "Hassan",
      address1: "Pearl Tower, Apt 2305",
      address2: "Porto Arabia",
      city: "The Pearl",
      country: "Qatar",
      phone: "+974 5541 0003"
    },
    shippingMethod: "standard",
    trackingNumber: null,
    status: "pending",
    notes: "Cash on delivery",
    createdAt: "2024-12-23T08:20:00",
    updatedAt: "2024-12-23T08:20:00",
    deliveredAt: null
  },
  {
    id: "ORD005",
    orderNumber: "EC-2024-10005",
    customerId: "CUS006",
    customerName: "Aisha Mahmoud",
    customerEmail: "aisha.m@email.com",
    items: [
      { productId: "PRD011", productName: "Hydrating Face Serum 30ml", variantName: null, sku: "BEAU-SK-001", quantity: 2, price: 189, total: 378 },
      { productId: "PRD010", productName: "Ceramic Vase Set (3 pcs)", variantName: "White", sku: "HOME-DC-001-WH", quantity: 1, price: 299, total: 299 }
    ],
    subtotal: 677,
    shippingCost: 0,
    discount: 0,
    discountCode: null,
    tax: 0,
    total: 677,
    currency: "QAR",
    paymentMethod: "card",
    paymentStatus: "paid",
    shippingAddress: {
      firstName: "Aisha",
      lastName: "Mahmoud",
      address1: "Building 22, Floor 5",
      address2: "Musheireb",
      city: "Doha",
      country: "Qatar",
      phone: "+974 5541 0006"
    },
    shippingMethod: "standard",
    trackingNumber: "QP123456791QA",
    status: "shipped",
    notes: "",
    createdAt: "2024-12-19T16:30:00",
    updatedAt: "2024-12-20T10:00:00",
    deliveredAt: null
  },
  {
    id: "ORD006",
    orderNumber: "EC-2024-10006",
    customerId: "CUS005",
    customerName: "James Wilson",
    customerEmail: "j.wilson@email.com",
    items: [
      { productId: "PRD002", productName: "Samsung Galaxy S24 Ultra 512GB", variantName: "Titanium Black", sku: "ELEC-SP-002-TB", quantity: 3, price: 4599, total: 13797 }
    ],
    subtotal: 13797,
    shippingCost: 0,
    discount: 1379.70,
    discountCode: "BULK10",
    tax: 0,
    total: 12417.30,
    currency: "QAR",
    paymentMethod: "bank-transfer",
    paymentStatus: "paid",
    shippingAddress: {
      firstName: "James",
      lastName: "Wilson",
      address1: "Office 405, Tower B",
      address2: "West Bay Business District",
      city: "Doha",
      country: "Qatar",
      phone: "+974 5541 0005"
    },
    shippingMethod: "express",
    trackingNumber: "QP123456792QA",
    status: "delivered",
    notes: "Corporate order - Invoice #INV-2024-0056",
    createdAt: "2024-12-10T11:00:00",
    updatedAt: "2024-12-12T15:30:00",
    deliveredAt: "2024-12-12T15:30:00"
  }
];

// Order Statuses
export const orderStatuses = [
  { id: "pending", name: "Pending", color: "#f59e0b" },
  { id: "confirmed", name: "Confirmed", color: "#6366f1" },
  { id: "processing", name: "Processing", color: "#0ea5e9" },
  { id: "shipped", name: "Shipped", color: "#8b5cf6" },
  { id: "delivered", name: "Delivered", color: "#10b981" },
  { id: "cancelled", name: "Cancelled", color: "#ef4444" },
  { id: "refunded", name: "Refunded", color: "#64748b" }
];

// Payment Statuses
export const paymentStatuses = [
  { id: "pending", name: "Pending", color: "#f59e0b" },
  { id: "paid", name: "Paid", color: "#10b981" },
  { id: "failed", name: "Failed", color: "#ef4444" },
  { id: "refunded", name: "Refunded", color: "#64748b" }
];

// Discounts & Coupons
export const discounts = [
  {
    id: "DSC001",
    code: "NEWYEAR500",
    type: "fixed",
    value: 500,
    currency: "QAR",
    description: "New Year 500 QAR off",
    minOrderValue: 2000,
    maxUses: 100,
    usedCount: 45,
    usesPerCustomer: 1,
    applicableTo: "all",
    categories: [],
    products: [],
    startDate: "2024-12-20",
    endDate: "2025-01-10",
    status: "active",
    createdAt: "2024-12-15"
  },
  {
    id: "DSC002",
    code: "VIP10",
    type: "percentage",
    value: 10,
    currency: "QAR",
    description: "VIP customers 10% discount",
    minOrderValue: 500,
    maxUses: null,
    usedCount: 89,
    usesPerCustomer: null,
    applicableTo: "all",
    categories: [],
    products: [],
    startDate: "2024-01-01",
    endDate: "2025-12-31",
    status: "active",
    createdAt: "2024-01-01"
  },
  {
    id: "DSC003",
    code: "FREESHIP",
    type: "free_shipping",
    value: 0,
    currency: "QAR",
    description: "Free shipping on all orders",
    minOrderValue: 200,
    maxUses: 500,
    usedCount: 234,
    usesPerCustomer: 3,
    applicableTo: "all",
    categories: [],
    products: [],
    startDate: "2024-11-01",
    endDate: "2024-12-31",
    status: "active",
    createdAt: "2024-11-01"
  },
  {
    id: "DSC004",
    code: "ELECTRONICS15",
    type: "percentage",
    value: 15,
    currency: "QAR",
    description: "15% off on Electronics",
    minOrderValue: 1000,
    maxUses: 50,
    usedCount: 12,
    usesPerCustomer: 1,
    applicableTo: "categories",
    categories: ["CAT001"],
    products: [],
    startDate: "2024-12-01",
    endDate: "2024-12-31",
    status: "active",
    createdAt: "2024-12-01"
  },
  {
    id: "DSC005",
    code: "BULK10",
    type: "percentage",
    value: 10,
    currency: "QAR",
    description: "10% off for bulk orders",
    minOrderValue: 5000,
    maxUses: null,
    usedCount: 8,
    usesPerCustomer: null,
    applicableTo: "all",
    categories: [],
    products: [],
    startDate: "2024-01-01",
    endDate: "2025-12-31",
    status: "active",
    createdAt: "2024-01-01"
  },
  {
    id: "DSC006",
    code: "SUMMER20",
    type: "percentage",
    value: 20,
    currency: "QAR",
    description: "Summer Sale 20% off",
    minOrderValue: 300,
    maxUses: 200,
    usedCount: 200,
    usesPerCustomer: 2,
    applicableTo: "all",
    categories: [],
    products: [],
    startDate: "2024-06-01",
    endDate: "2024-08-31",
    status: "expired",
    createdAt: "2024-05-25"
  }
];

// Discount Types
export const discountTypes = [
  { id: "percentage", name: "Percentage" },
  { id: "fixed", name: "Fixed Amount" },
  { id: "free_shipping", name: "Free Shipping" }
];

// Shipping Methods
export const shippingMethods = [
  {
    id: "SHP001",
    name: "Standard Delivery",
    code: "standard",
    description: "Delivery within 3-5 business days",
    price: 25,
    freeAbove: 500,
    estimatedDays: "3-5",
    status: "active"
  },
  {
    id: "SHP002",
    name: "Express Delivery",
    code: "express",
    description: "Next day delivery",
    price: 50,
    freeAbove: 2000,
    estimatedDays: "1",
    status: "active"
  },
  {
    id: "SHP003",
    name: "Same Day Delivery",
    code: "same-day",
    description: "Delivery within hours (Doha only)",
    price: 75,
    freeAbove: null,
    estimatedDays: "0",
    status: "active"
  }
];

// Shipping Zones
export const shippingZones = [
  {
    id: "ZONE001",
    name: "Doha City",
    areas: ["West Bay", "The Pearl", "Musheireb", "Al Sadd", "Al Waab"],
    standardPrice: 25,
    expressPrice: 50,
    sameDayAvailable: true
  },
  {
    id: "ZONE002",
    name: "Greater Doha",
    areas: ["Al Wakra", "Al Khor", "Lusail", "Education City"],
    standardPrice: 35,
    expressPrice: 60,
    sameDayAvailable: false
  },
  {
    id: "ZONE003",
    name: "Remote Areas",
    areas: ["Dukhan", "Mesaieed", "Al Shamal"],
    standardPrice: 50,
    expressPrice: 80,
    sameDayAvailable: false
  }
];

// Reviews
export const reviews = [
  {
    id: "REV001",
    productId: "PRD001",
    productName: "iPhone 15 Pro Max 256GB",
    customerId: "CUS001",
    customerName: "Khalid Al-Mansouri",
    rating: 5,
    title: "Best iPhone Ever!",
    comment: "The camera quality is amazing and the titanium finish feels premium. Battery life is excellent.",
    images: [],
    status: "published",
    helpful: 24,
    reply: "Thank you for your wonderful review! We're glad you're enjoying your new iPhone.",
    replyDate: "2024-12-19",
    createdAt: "2024-12-18"
  },
  {
    id: "REV002",
    productId: "PRD003",
    productName: "MacBook Pro 14\" M3 Pro",
    customerId: "CUS002",
    customerName: "Sarah Thompson",
    rating: 5,
    title: "Incredible Performance",
    comment: "The M3 Pro chip is incredibly fast. Compiling code is now a breeze. Best laptop I've owned.",
    images: [],
    status: "published",
    helpful: 18,
    reply: null,
    replyDate: null,
    createdAt: "2024-12-20"
  },
  {
    id: "REV003",
    productId: "PRD006",
    productName: "Premium Cotton T-Shirt",
    customerId: "CUS003",
    customerName: "Mohammed Hassan",
    rating: 4,
    title: "Great Quality",
    comment: "Comfortable and well-made. Slightly larger than expected, recommend sizing down.",
    images: [],
    status: "published",
    helpful: 12,
    reply: "Thank you for the feedback! We'll update our size guide to be more accurate.",
    replyDate: "2024-12-16",
    createdAt: "2024-12-15"
  },
  {
    id: "REV004",
    productId: "PRD007",
    productName: "Elegant Maxi Dress",
    customerId: "CUS004",
    customerName: "Fatima Al-Thani",
    rating: 5,
    title: "Absolutely Stunning",
    comment: "Wore this to a wedding and received so many compliments. The fabric quality is excellent.",
    images: [],
    status: "published",
    helpful: 31,
    reply: null,
    replyDate: null,
    createdAt: "2024-12-12"
  },
  {
    id: "REV005",
    productId: "PRD011",
    productName: "Hydrating Face Serum 30ml",
    customerId: "CUS006",
    customerName: "Aisha Mahmoud",
    rating: 5,
    title: "Skin Transformation",
    comment: "My skin has never felt more hydrated. Using it for 2 weeks now and can see visible improvement.",
    images: [],
    status: "published",
    helpful: 45,
    reply: "We're thrilled to hear about your results! Consistency is key.",
    replyDate: "2024-12-20",
    createdAt: "2024-12-19"
  },
  {
    id: "REV006",
    productId: "PRD005",
    productName: "AirPods Pro 2nd Generation",
    customerId: null,
    customerName: "Guest User",
    rating: 3,
    title: "Good but pricey",
    comment: "Sound quality is great but I expected more features for this price point.",
    images: [],
    status: "pending",
    helpful: 0,
    reply: null,
    replyDate: null,
    createdAt: "2024-12-22"
  }
];

// Review Statuses
export const reviewStatuses = [
  { id: "pending", name: "Pending", color: "#f59e0b" },
  { id: "published", name: "Published", color: "#10b981" },
  { id: "rejected", name: "Rejected", color: "#ef4444" }
];

// Inventory / Stock Movements
export const stockMovements = [
  {
    id: "STK001",
    productId: "PRD001",
    productName: "iPhone 15 Pro Max 256GB",
    variantId: "VAR001",
    variantName: "Natural Titanium",
    type: "in",
    reason: "restock",
    quantity: 20,
    previousStock: 5,
    newStock: 25,
    reference: "PO-2024-0089",
    notes: "New shipment from supplier",
    createdBy: "Admin",
    createdAt: "2024-12-10T09:00:00"
  },
  {
    id: "STK002",
    productId: "PRD001",
    productName: "iPhone 15 Pro Max 256GB",
    variantId: "VAR001",
    variantName: "Natural Titanium",
    type: "out",
    reason: "sale",
    quantity: 1,
    previousStock: 25,
    newStock: 24,
    reference: "EC-2024-10001",
    notes: "",
    createdBy: "System",
    createdAt: "2024-12-15T10:30:00"
  },
  {
    id: "STK003",
    productId: "PRD006",
    productName: "Premium Cotton T-Shirt",
    variantId: "VAR012",
    variantName: "White - L",
    type: "out",
    reason: "sale",
    quantity: 3,
    previousStock: 21,
    newStock: 18,
    reference: "EC-2024-10004",
    notes: "",
    createdBy: "System",
    createdAt: "2024-12-23T08:20:00"
  },
  {
    id: "STK004",
    productId: "PRD007",
    productName: "Elegant Maxi Dress",
    variantId: "VAR018",
    variantName: "Black - M",
    type: "out",
    reason: "sale",
    quantity: 2,
    previousStock: 12,
    newStock: 10,
    reference: "EC-2024-10003",
    notes: "",
    createdBy: "System",
    createdAt: "2024-12-22T14:45:00"
  },
  {
    id: "STK005",
    productId: "PRD012",
    productName: "Professional Yoga Mat",
    variantId: "VAR031",
    variantName: "Purple",
    type: "out",
    reason: "damaged",
    quantity: 2,
    previousStock: 20,
    newStock: 18,
    reference: "DMG-2024-0012",
    notes: "Damaged during storage - written off",
    createdBy: "Admin",
    createdAt: "2024-12-18T16:00:00"
  }
];

// Dashboard Stats
export const ecommerceStats = {
  todayOrders: 8,
  todayRevenue: 4250,
  yesterdayRevenue: 3890,
  weekRevenue: 28500,
  monthRevenue: 125000,
  pendingOrders: 12,
  processingOrders: 8,
  shippedOrders: 15,
  totalProducts: 156,
  lowStockProducts: 8,
  outOfStockProducts: 3,
  totalCustomers: 892,
  newCustomersThisMonth: 67,
  averageOrderValue: 785,
  conversionRate: 3.2,
  topSellingProducts: [
    { name: "iPhone 15 Pro Max 256GB", sold: 89, revenue: 444911 },
    { name: "AirPods Pro 2nd Generation", sold: 156, revenue: 140244 },
    { name: "Premium Cotton T-Shirt", sold: 412, revenue: 53148 },
    { name: "Samsung Galaxy S24 Ultra", sold: 67, revenue: 308133 }
  ],
  revenueByCategory: [
    { name: "Electronics", revenue: 856000 },
    { name: "Fashion", revenue: 245000 },
    { name: "Home & Living", revenue: 128000 },
    { name: "Beauty & Health", revenue: 89000 },
    { name: "Sports & Outdoors", revenue: 67000 }
  ],
  ordersByStatus: {
    pending: 12,
    confirmed: 5,
    processing: 8,
    shipped: 15,
    delivered: 234,
    cancelled: 8,
    refunded: 3
  }
};

// Helper functions
export const getOrderById = (id: string) => orders.find(o => o.id === id);
export const getProductById = (id: string) => products.find(p => p.id === id);
export const getCustomerById = (id: string) => customers.find(c => c.id === id);
export const getCategoryById = (id: string) => {
  for (const cat of categories) {
    if (cat.id === id) return cat;
    const child = cat.children?.find(c => c.id === id);
    if (child) return child;
  }
  return undefined;
};
