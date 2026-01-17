import {
  LayoutGrid,
  UtensilsCrossed,
  ClipboardList,
  ChefHat,
  CalendarClock,
  CreditCard,
  Bike,
  Package,
  Users,
  BarChart3,
  QrCode,
  MessageSquare,
} from 'lucide-react';

// Types
export interface Table {
  id: string;
  number: number;
  capacity: number;
  status: 'available' | 'occupied' | 'reserved' | 'cleaning';
  section: string;
  currentOrder?: string;
  reservationId?: string;
  occupiedSince?: string;
  waiter?: string;
}

export interface MenuItem {
  id: string;
  name: string;
  nameAr: string;
  description: string;
  price: number;
  category: string;
  image: string;
  isAvailable: boolean;
  isPopular: boolean;
  isVegetarian: boolean;
  isSpicy: boolean;
  preparationTime: number; // minutes
  ingredients: string[];
  allergens: string[];
  calories?: number;
}

export interface MenuCategory {
  id: string;
  name: string;
  nameAr: string;
  icon: string;
  itemCount: number;
  isActive: boolean;
}

export interface RestaurantOrder {
  id: string;
  orderNumber: string;
  type: 'dine-in' | 'takeaway' | 'delivery';
  tableId?: string;
  tableNumber?: number;
  customerId?: string;
  customerName: string;
  customerPhone: string;
  items: OrderItem[];
  subtotal: number;
  tax: number;
  discount: number;
  total: number;
  status: 'pending' | 'confirmed' | 'preparing' | 'ready' | 'served' | 'completed' | 'cancelled';
  paymentStatus: 'pending' | 'paid' | 'refunded';
  paymentMethod?: 'cash' | 'card' | 'online';
  waiter?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
  completedAt?: string;
}

export interface OrderItem {
  id: string;
  menuItemId: string;
  name: string;
  quantity: number;
  price: number;
  total: number;
  notes?: string;
  modifiers?: string[];
  status: 'pending' | 'preparing' | 'ready' | 'served';
}

export interface Reservation {
  id: string;
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  date: string;
  time: string;
  partySize: number;
  tableId?: string;
  tableNumber?: number;
  status: 'pending' | 'confirmed' | 'seated' | 'completed' | 'cancelled' | 'no-show';
  notes?: string;
  specialRequests?: string;
  source: 'phone' | 'website' | 'walk-in' | 'app';
  createdAt: string;
}

export interface Ingredient {
  id: string;
  name: string;
  category: string;
  currentStock: number;
  minStock: number;
  unit: string;
  unitCost: number;
  supplier: string;
  lastRestocked: string;
  expiryDate?: string;
  status: 'in-stock' | 'low-stock' | 'out-of-stock';
}

export interface StaffMember {
  id: string;
  name: string;
  role: 'manager' | 'chef' | 'sous-chef' | 'waiter' | 'host' | 'cashier' | 'kitchen-staff' | 'delivery';
  phone: string;
  email: string;
  avatar?: string;
  isActive: boolean;
  hireDate: string;
  salary: number;
}

export interface StaffShift {
  id: string;
  staffId: string;
  staffName: string;
  role: string;
  date: string;
  startTime: string;
  endTime: string;
  status: 'scheduled' | 'in-progress' | 'completed' | 'absent';
}

export interface DeliveryOrder {
  id: string;
  orderId: string;
  orderNumber: string;
  customerName: string;
  customerPhone: string;
  deliveryAddress: string;
  deliveryArea: string;
  driverId?: string;
  driverName?: string;
  status: 'pending' | 'assigned' | 'picked-up' | 'in-transit' | 'delivered' | 'failed';
  estimatedDelivery: string;
  actualDelivery?: string;
  deliveryFee: number;
  notes?: string;
  createdAt: string;
}

export interface CustomerFeedback {
  id: string;
  orderId: string;
  customerName: string;
  rating: number;
  foodRating: number;
  serviceRating: number;
  ambienceRating?: number;
  comment?: string;
  reply?: string;
  replyDate?: string;
  status: 'pending' | 'reviewed' | 'responded';
  createdAt: string;
}

// Menu Categories
export const menuCategories: MenuCategory[] = [
  { id: 'appetizers', name: 'Appetizers', nameAr: 'مقبلات', icon: '🥗', itemCount: 12, isActive: true },
  { id: 'soups', name: 'Soups', nameAr: 'شوربات', icon: '🍜', itemCount: 6, isActive: true },
  { id: 'salads', name: 'Salads', nameAr: 'سلطات', icon: '🥬', itemCount: 8, isActive: true },
  { id: 'main-course', name: 'Main Course', nameAr: 'الأطباق الرئيسية', icon: '🍽️', itemCount: 24, isActive: true },
  { id: 'grills', name: 'Grills', nameAr: 'مشويات', icon: '🥩', itemCount: 15, isActive: true },
  { id: 'seafood', name: 'Seafood', nameAr: 'مأكولات بحرية', icon: '🦐', itemCount: 10, isActive: true },
  { id: 'pasta', name: 'Pasta', nameAr: 'معكرونة', icon: '🍝', itemCount: 8, isActive: true },
  { id: 'pizza', name: 'Pizza', nameAr: 'بيتزا', icon: '🍕', itemCount: 10, isActive: true },
  { id: 'desserts', name: 'Desserts', nameAr: 'حلويات', icon: '🍰', itemCount: 12, isActive: true },
  { id: 'beverages', name: 'Beverages', nameAr: 'مشروبات', icon: '🥤', itemCount: 20, isActive: true },
];

// Menu Items
export const menuItems: MenuItem[] = [
  {
    id: 'menu-1',
    name: 'Hummus with Pita',
    nameAr: 'حمص مع خبز',
    description: 'Creamy hummus served with warm pita bread and olive oil',
    price: 25,
    category: 'appetizers',
    image: '/images/menu/hummus.jpg',
    isAvailable: true,
    isPopular: true,
    isVegetarian: true,
    isSpicy: false,
    preparationTime: 5,
    ingredients: ['chickpeas', 'tahini', 'lemon', 'garlic', 'olive oil'],
    allergens: ['sesame'],
    calories: 280,
  },
  {
    id: 'menu-2',
    name: 'Grilled Chicken Wings',
    nameAr: 'أجنحة دجاج مشوية',
    description: 'Crispy grilled wings with your choice of sauce',
    price: 45,
    category: 'appetizers',
    image: '/images/menu/wings.jpg',
    isAvailable: true,
    isPopular: true,
    isVegetarian: false,
    isSpicy: true,
    preparationTime: 15,
    ingredients: ['chicken wings', 'spices', 'butter'],
    allergens: ['dairy'],
    calories: 420,
  },
  {
    id: 'menu-3',
    name: 'Lentil Soup',
    nameAr: 'شوربة عدس',
    description: 'Traditional Middle Eastern lentil soup with cumin',
    price: 20,
    category: 'soups',
    image: '/images/menu/lentil-soup.jpg',
    isAvailable: true,
    isPopular: true,
    isVegetarian: true,
    isSpicy: false,
    preparationTime: 8,
    ingredients: ['red lentils', 'onion', 'cumin', 'lemon'],
    allergens: [],
    calories: 180,
  },
  {
    id: 'menu-4',
    name: 'Caesar Salad',
    nameAr: 'سلطة سيزر',
    description: 'Crisp romaine lettuce with parmesan and croutons',
    price: 35,
    category: 'salads',
    image: '/images/menu/caesar.jpg',
    isAvailable: true,
    isPopular: true,
    isVegetarian: true,
    isSpicy: false,
    preparationTime: 7,
    ingredients: ['romaine', 'parmesan', 'croutons', 'caesar dressing'],
    allergens: ['dairy', 'gluten', 'eggs'],
    calories: 320,
  },
  {
    id: 'menu-5',
    name: 'Grilled Lamb Chops',
    nameAr: 'ريش غنم مشوية',
    description: 'Premium lamb chops grilled to perfection with herbs',
    price: 120,
    category: 'grills',
    image: '/images/menu/lamb-chops.jpg',
    isAvailable: true,
    isPopular: true,
    isVegetarian: false,
    isSpicy: false,
    preparationTime: 25,
    ingredients: ['lamb chops', 'rosemary', 'garlic', 'olive oil'],
    allergens: [],
    calories: 580,
  },
  {
    id: 'menu-6',
    name: 'Mixed Grill Platter',
    nameAr: 'مشاوي مشكلة',
    description: 'Assortment of grilled meats with rice and salad',
    price: 150,
    category: 'grills',
    image: '/images/menu/mixed-grill.jpg',
    isAvailable: true,
    isPopular: true,
    isVegetarian: false,
    isSpicy: false,
    preparationTime: 30,
    ingredients: ['beef', 'chicken', 'lamb', 'rice', 'vegetables'],
    allergens: [],
    calories: 850,
  },
  {
    id: 'menu-7',
    name: 'Grilled Salmon',
    nameAr: 'سلمون مشوي',
    description: 'Atlantic salmon with lemon butter sauce',
    price: 95,
    category: 'seafood',
    image: '/images/menu/salmon.jpg',
    isAvailable: true,
    isPopular: true,
    isVegetarian: false,
    isSpicy: false,
    preparationTime: 20,
    ingredients: ['salmon', 'butter', 'lemon', 'dill'],
    allergens: ['fish', 'dairy'],
    calories: 450,
  },
  {
    id: 'menu-8',
    name: 'Spaghetti Carbonara',
    nameAr: 'سباغيتي كاربونارا',
    description: 'Classic Italian pasta with creamy egg sauce and bacon',
    price: 55,
    category: 'pasta',
    image: '/images/menu/carbonara.jpg',
    isAvailable: true,
    isPopular: true,
    isVegetarian: false,
    isSpicy: false,
    preparationTime: 18,
    ingredients: ['spaghetti', 'eggs', 'parmesan', 'bacon', 'cream'],
    allergens: ['gluten', 'dairy', 'eggs'],
    calories: 620,
  },
  {
    id: 'menu-9',
    name: 'Margherita Pizza',
    nameAr: 'بيتزا مارغريتا',
    description: 'Fresh tomato, mozzarella, and basil',
    price: 45,
    category: 'pizza',
    image: '/images/menu/margherita.jpg',
    isAvailable: true,
    isPopular: true,
    isVegetarian: true,
    isSpicy: false,
    preparationTime: 15,
    ingredients: ['tomato sauce', 'mozzarella', 'basil', 'olive oil'],
    allergens: ['gluten', 'dairy'],
    calories: 540,
  },
  {
    id: 'menu-10',
    name: 'Chocolate Lava Cake',
    nameAr: 'كيك الشوكولاتة',
    description: 'Warm chocolate cake with molten center',
    price: 35,
    category: 'desserts',
    image: '/images/menu/lava-cake.jpg',
    isAvailable: true,
    isPopular: true,
    isVegetarian: true,
    isSpicy: false,
    preparationTime: 12,
    ingredients: ['chocolate', 'butter', 'eggs', 'flour', 'sugar'],
    allergens: ['gluten', 'dairy', 'eggs'],
    calories: 480,
  },
  {
    id: 'menu-11',
    name: 'Fresh Orange Juice',
    nameAr: 'عصير برتقال طازج',
    description: 'Freshly squeezed orange juice',
    price: 18,
    category: 'beverages',
    image: '/images/menu/orange-juice.jpg',
    isAvailable: true,
    isPopular: true,
    isVegetarian: true,
    isSpicy: false,
    preparationTime: 3,
    ingredients: ['fresh oranges'],
    allergens: [],
    calories: 110,
  },
  {
    id: 'menu-12',
    name: 'Arabic Coffee',
    nameAr: 'قهوة عربية',
    description: 'Traditional Arabic coffee with cardamom',
    price: 15,
    category: 'beverages',
    image: '/images/menu/arabic-coffee.jpg',
    isAvailable: true,
    isPopular: true,
    isVegetarian: true,
    isSpicy: false,
    preparationTime: 5,
    ingredients: ['arabic coffee', 'cardamom'],
    allergens: [],
    calories: 5,
  },
];

// Tables
export const tables: Table[] = [
  { id: 'table-1', number: 1, capacity: 2, status: 'available', section: 'Indoor', waiter: 'Ahmed' },
  { id: 'table-2', number: 2, capacity: 2, status: 'occupied', section: 'Indoor', currentOrder: 'ORD-001', occupiedSince: '2024-01-15T19:30:00', waiter: 'Ahmed' },
  { id: 'table-3', number: 3, capacity: 4, status: 'reserved', section: 'Indoor', reservationId: 'RES-001', waiter: 'Sara' },
  { id: 'table-4', number: 4, capacity: 4, status: 'occupied', section: 'Indoor', currentOrder: 'ORD-002', occupiedSince: '2024-01-15T20:00:00', waiter: 'Sara' },
  { id: 'table-5', number: 5, capacity: 6, status: 'available', section: 'Indoor', waiter: 'Mohammed' },
  { id: 'table-6', number: 6, capacity: 6, status: 'cleaning', section: 'Indoor', waiter: 'Mohammed' },
  { id: 'table-7', number: 7, capacity: 8, status: 'reserved', section: 'Indoor', reservationId: 'RES-002', waiter: 'Fatima' },
  { id: 'table-8', number: 8, capacity: 4, status: 'available', section: 'Outdoor', waiter: 'Fatima' },
  { id: 'table-9', number: 9, capacity: 4, status: 'occupied', section: 'Outdoor', currentOrder: 'ORD-003', occupiedSince: '2024-01-15T19:45:00', waiter: 'Ahmed' },
  { id: 'table-10', number: 10, capacity: 6, status: 'available', section: 'Outdoor', waiter: 'Sara' },
  { id: 'table-11', number: 11, capacity: 2, status: 'available', section: 'Terrace', waiter: 'Mohammed' },
  { id: 'table-12', number: 12, capacity: 4, status: 'occupied', section: 'Terrace', currentOrder: 'ORD-004', occupiedSince: '2024-01-15T20:15:00', waiter: 'Fatima' },
  { id: 'table-13', number: 13, capacity: 8, status: 'reserved', section: 'Private Room', reservationId: 'RES-003', waiter: 'Ahmed' },
  { id: 'table-14', number: 14, capacity: 10, status: 'available', section: 'Private Room', waiter: 'Sara' },
  { id: 'table-15', number: 15, capacity: 12, status: 'reserved', section: 'Private Room', reservationId: 'RES-004', waiter: 'Mohammed' },
];

// Restaurant Orders
export const restaurantOrders: RestaurantOrder[] = [
  {
    id: 'order-1',
    orderNumber: 'ORD-001',
    type: 'dine-in',
    tableId: 'table-2',
    tableNumber: 2,
    customerName: 'Ahmad Al-Farsi',
    customerPhone: '+974 5555 1234',
    items: [
      { id: 'item-1', menuItemId: 'menu-1', name: 'Hummus with Pita', quantity: 2, price: 25, total: 50, status: 'served' },
      { id: 'item-2', menuItemId: 'menu-5', name: 'Grilled Lamb Chops', quantity: 1, price: 120, total: 120, status: 'preparing' },
      { id: 'item-3', menuItemId: 'menu-11', name: 'Fresh Orange Juice', quantity: 2, price: 18, total: 36, status: 'served' },
    ],
    subtotal: 206,
    tax: 10.3,
    discount: 0,
    total: 216.3,
    status: 'preparing',
    paymentStatus: 'pending',
    waiter: 'Ahmed',
    createdAt: '2024-01-15T19:30:00',
    updatedAt: '2024-01-15T19:45:00',
  },
  {
    id: 'order-2',
    orderNumber: 'ORD-002',
    type: 'dine-in',
    tableId: 'table-4',
    tableNumber: 4,
    customerName: 'Fatima Hassan',
    customerPhone: '+974 5555 5678',
    items: [
      { id: 'item-4', menuItemId: 'menu-4', name: 'Caesar Salad', quantity: 2, price: 35, total: 70, status: 'served' },
      { id: 'item-5', menuItemId: 'menu-6', name: 'Mixed Grill Platter', quantity: 2, price: 150, total: 300, status: 'preparing' },
      { id: 'item-6', menuItemId: 'menu-10', name: 'Chocolate Lava Cake', quantity: 2, price: 35, total: 70, status: 'pending' },
    ],
    subtotal: 440,
    tax: 22,
    discount: 20,
    total: 442,
    status: 'preparing',
    paymentStatus: 'pending',
    waiter: 'Sara',
    notes: 'No nuts in dessert',
    createdAt: '2024-01-15T20:00:00',
    updatedAt: '2024-01-15T20:15:00',
  },
  {
    id: 'order-3',
    orderNumber: 'ORD-003',
    type: 'dine-in',
    tableId: 'table-9',
    tableNumber: 9,
    customerName: 'Omar Al-Thani',
    customerPhone: '+974 5555 9012',
    items: [
      { id: 'item-7', menuItemId: 'menu-7', name: 'Grilled Salmon', quantity: 2, price: 95, total: 190, status: 'ready' },
      { id: 'item-8', menuItemId: 'menu-3', name: 'Lentil Soup', quantity: 2, price: 20, total: 40, status: 'served' },
    ],
    subtotal: 230,
    tax: 11.5,
    discount: 0,
    total: 241.5,
    status: 'ready',
    paymentStatus: 'pending',
    waiter: 'Ahmed',
    createdAt: '2024-01-15T19:45:00',
    updatedAt: '2024-01-15T20:10:00',
  },
  {
    id: 'order-4',
    orderNumber: 'ORD-004',
    type: 'dine-in',
    tableId: 'table-12',
    tableNumber: 12,
    customerName: 'Layla Mohammed',
    customerPhone: '+974 5555 3456',
    items: [
      { id: 'item-9', menuItemId: 'menu-9', name: 'Margherita Pizza', quantity: 1, price: 45, total: 45, status: 'preparing' },
      { id: 'item-10', menuItemId: 'menu-8', name: 'Spaghetti Carbonara', quantity: 1, price: 55, total: 55, status: 'pending' },
    ],
    subtotal: 100,
    tax: 5,
    discount: 0,
    total: 105,
    status: 'preparing',
    paymentStatus: 'pending',
    waiter: 'Fatima',
    createdAt: '2024-01-15T20:15:00',
    updatedAt: '2024-01-15T20:20:00',
  },
  {
    id: 'order-5',
    orderNumber: 'ORD-005',
    type: 'takeaway',
    customerName: 'Khalid Al-Sayed',
    customerPhone: '+974 5555 7890',
    items: [
      { id: 'item-11', menuItemId: 'menu-2', name: 'Grilled Chicken Wings', quantity: 2, price: 45, total: 90, status: 'ready' },
      { id: 'item-12', menuItemId: 'menu-9', name: 'Margherita Pizza', quantity: 2, price: 45, total: 90, status: 'ready' },
    ],
    subtotal: 180,
    tax: 9,
    discount: 0,
    total: 189,
    status: 'ready',
    paymentStatus: 'paid',
    paymentMethod: 'card',
    createdAt: '2024-01-15T20:00:00',
    updatedAt: '2024-01-15T20:25:00',
  },
  {
    id: 'order-6',
    orderNumber: 'ORD-006',
    type: 'delivery',
    customerName: 'Noor Abdullah',
    customerPhone: '+974 5555 2345',
    items: [
      { id: 'item-13', menuItemId: 'menu-6', name: 'Mixed Grill Platter', quantity: 1, price: 150, total: 150, status: 'ready' },
      { id: 'item-14', menuItemId: 'menu-1', name: 'Hummus with Pita', quantity: 1, price: 25, total: 25, status: 'ready' },
      { id: 'item-15', menuItemId: 'menu-12', name: 'Arabic Coffee', quantity: 2, price: 15, total: 30, status: 'ready' },
    ],
    subtotal: 205,
    tax: 10.25,
    discount: 0,
    total: 215.25,
    status: 'ready',
    paymentStatus: 'paid',
    paymentMethod: 'online',
    createdAt: '2024-01-15T19:30:00',
    updatedAt: '2024-01-15T20:00:00',
  },
];

// Reservations
export const reservations: Reservation[] = [
  {
    id: 'res-1',
    customerName: 'Hassan Al-Rashid',
    customerPhone: '+974 5555 1111',
    customerEmail: 'hassan@example.com',
    date: '2024-01-15',
    time: '20:00',
    partySize: 4,
    tableId: 'table-3',
    tableNumber: 3,
    status: 'confirmed',
    source: 'phone',
    createdAt: '2024-01-14T10:00:00',
  },
  {
    id: 'res-2',
    customerName: 'Mariam Al-Hajri',
    customerPhone: '+974 5555 2222',
    customerEmail: 'mariam@example.com',
    date: '2024-01-15',
    time: '21:00',
    partySize: 6,
    tableId: 'table-7',
    tableNumber: 7,
    status: 'confirmed',
    specialRequests: 'Birthday celebration - please prepare a cake',
    source: 'website',
    createdAt: '2024-01-13T15:30:00',
  },
  {
    id: 'res-3',
    customerName: 'Abdullah Al-Suwaidi',
    customerPhone: '+974 5555 3333',
    date: '2024-01-15',
    time: '19:30',
    partySize: 8,
    tableId: 'table-13',
    tableNumber: 13,
    status: 'seated',
    notes: 'VIP customer - corporate dinner',
    source: 'phone',
    createdAt: '2024-01-12T09:00:00',
  },
  {
    id: 'res-4',
    customerName: 'Aisha Al-Mulla',
    customerPhone: '+974 5555 4444',
    customerEmail: 'aisha@example.com',
    date: '2024-01-15',
    time: '20:30',
    partySize: 10,
    tableId: 'table-15',
    tableNumber: 15,
    status: 'confirmed',
    specialRequests: 'Vegetarian options needed',
    source: 'app',
    createdAt: '2024-01-14T18:00:00',
  },
  {
    id: 'res-5',
    customerName: 'Youssef Al-Ansari',
    customerPhone: '+974 5555 5555',
    date: '2024-01-16',
    time: '19:00',
    partySize: 2,
    status: 'pending',
    source: 'website',
    createdAt: '2024-01-15T14:00:00',
  },
  {
    id: 'res-6',
    customerName: 'Salma Hassan',
    customerPhone: '+974 5555 6666',
    customerEmail: 'salma@example.com',
    date: '2024-01-16',
    time: '20:00',
    partySize: 4,
    status: 'confirmed',
    source: 'phone',
    createdAt: '2024-01-15T11:00:00',
  },
  {
    id: 'res-7',
    customerName: 'Hamad Al-Thani',
    customerPhone: '+974 5555 7777',
    date: '2024-01-16',
    time: '21:00',
    partySize: 6,
    status: 'pending',
    notes: 'Anniversary dinner',
    source: 'app',
    createdAt: '2024-01-15T16:30:00',
  },
];

// Ingredients/Inventory
export const ingredients: Ingredient[] = [
  { id: 'ing-1', name: 'Chicken Breast', category: 'Poultry', currentStock: 25, minStock: 10, unit: 'kg', unitCost: 28, supplier: 'Qatar Poultry', lastRestocked: '2024-01-14', expiryDate: '2024-01-18', status: 'in-stock' },
  { id: 'ing-2', name: 'Lamb Chops', category: 'Meat', currentStock: 15, minStock: 8, unit: 'kg', unitCost: 65, supplier: 'Premium Meats QA', lastRestocked: '2024-01-13', expiryDate: '2024-01-17', status: 'in-stock' },
  { id: 'ing-3', name: 'Fresh Salmon', category: 'Seafood', currentStock: 8, minStock: 5, unit: 'kg', unitCost: 85, supplier: 'Gulf Seafood', lastRestocked: '2024-01-15', expiryDate: '2024-01-17', status: 'in-stock' },
  { id: 'ing-4', name: 'Olive Oil', category: 'Oils', currentStock: 12, minStock: 5, unit: 'L', unitCost: 35, supplier: 'Mediterranean Imports', lastRestocked: '2024-01-10', status: 'in-stock' },
  { id: 'ing-5', name: 'Mozzarella Cheese', category: 'Dairy', currentStock: 3, minStock: 5, unit: 'kg', unitCost: 45, supplier: 'Dairy Fresh', lastRestocked: '2024-01-12', expiryDate: '2024-01-20', status: 'low-stock' },
  { id: 'ing-6', name: 'Fresh Tomatoes', category: 'Vegetables', currentStock: 20, minStock: 15, unit: 'kg', unitCost: 8, supplier: 'Local Farms', lastRestocked: '2024-01-15', expiryDate: '2024-01-19', status: 'in-stock' },
  { id: 'ing-7', name: 'Pasta (Spaghetti)', category: 'Dry Goods', currentStock: 30, minStock: 10, unit: 'kg', unitCost: 12, supplier: 'Italian Imports', lastRestocked: '2024-01-08', status: 'in-stock' },
  { id: 'ing-8', name: 'Pizza Dough Flour', category: 'Dry Goods', currentStock: 25, minStock: 20, unit: 'kg', unitCost: 6, supplier: 'Bakery Supplies', lastRestocked: '2024-01-11', status: 'in-stock' },
  { id: 'ing-9', name: 'Fresh Oranges', category: 'Fruits', currentStock: 15, minStock: 20, unit: 'kg', unitCost: 10, supplier: 'Local Farms', lastRestocked: '2024-01-14', status: 'low-stock' },
  { id: 'ing-10', name: 'Chickpeas', category: 'Dry Goods', currentStock: 18, minStock: 8, unit: 'kg', unitCost: 8, supplier: 'Middle East Foods', lastRestocked: '2024-01-09', status: 'in-stock' },
  { id: 'ing-11', name: 'Dark Chocolate', category: 'Bakery', currentStock: 0, minStock: 3, unit: 'kg', unitCost: 55, supplier: 'Premium Chocolates', lastRestocked: '2024-01-05', status: 'out-of-stock' },
  { id: 'ing-12', name: 'Heavy Cream', category: 'Dairy', currentStock: 6, minStock: 4, unit: 'L', unitCost: 18, supplier: 'Dairy Fresh', lastRestocked: '2024-01-14', expiryDate: '2024-01-18', status: 'in-stock' },
];

// Staff Members
export const staffMembers: StaffMember[] = [
  { id: 'staff-1', name: 'Ahmed Al-Rashid', role: 'manager', phone: '+974 5555 0001', email: 'ahmed@restaurant.com', isActive: true, hireDate: '2020-03-15', salary: 15000 },
  { id: 'staff-2', name: 'Chef Mustafa', role: 'chef', phone: '+974 5555 0002', email: 'mustafa@restaurant.com', isActive: true, hireDate: '2019-06-01', salary: 18000 },
  { id: 'staff-3', name: 'Layla Hassan', role: 'sous-chef', phone: '+974 5555 0003', email: 'layla@restaurant.com', isActive: true, hireDate: '2021-01-10', salary: 12000 },
  { id: 'staff-4', name: 'Sara Al-Mansour', role: 'waiter', phone: '+974 5555 0004', email: 'sara@restaurant.com', isActive: true, hireDate: '2022-05-20', salary: 5000 },
  { id: 'staff-5', name: 'Mohammed Khalil', role: 'waiter', phone: '+974 5555 0005', email: 'mohammed@restaurant.com', isActive: true, hireDate: '2022-08-15', salary: 5000 },
  { id: 'staff-6', name: 'Fatima Al-Sulaiti', role: 'waiter', phone: '+974 5555 0006', email: 'fatima@restaurant.com', isActive: true, hireDate: '2023-02-01', salary: 4500 },
  { id: 'staff-7', name: 'Omar Youssef', role: 'host', phone: '+974 5555 0007', email: 'omar@restaurant.com', isActive: true, hireDate: '2022-11-01', salary: 5500 },
  { id: 'staff-8', name: 'Nadia Ahmed', role: 'cashier', phone: '+974 5555 0008', email: 'nadia@restaurant.com', isActive: true, hireDate: '2021-09-15', salary: 6000 },
  { id: 'staff-9', name: 'Rashid Al-Kuwari', role: 'kitchen-staff', phone: '+974 5555 0009', email: 'rashid@restaurant.com', isActive: true, hireDate: '2023-04-01', salary: 4000 },
  { id: 'staff-10', name: 'Ali Hassan', role: 'delivery', phone: '+974 5555 0010', email: 'ali@restaurant.com', isActive: true, hireDate: '2023-06-15', salary: 4500 },
];

// Staff Schedule
export const staffSchedule: StaffShift[] = [
  { id: 'shift-1', staffId: 'staff-1', staffName: 'Ahmed Al-Rashid', role: 'manager', date: '2024-01-15', startTime: '10:00', endTime: '22:00', status: 'in-progress' },
  { id: 'shift-2', staffId: 'staff-2', staffName: 'Chef Mustafa', role: 'chef', date: '2024-01-15', startTime: '11:00', endTime: '23:00', status: 'in-progress' },
  { id: 'shift-3', staffId: 'staff-3', staffName: 'Layla Hassan', role: 'sous-chef', date: '2024-01-15', startTime: '14:00', endTime: '23:00', status: 'in-progress' },
  { id: 'shift-4', staffId: 'staff-4', staffName: 'Sara Al-Mansour', role: 'waiter', date: '2024-01-15', startTime: '16:00', endTime: '00:00', status: 'in-progress' },
  { id: 'shift-5', staffId: 'staff-5', staffName: 'Mohammed Khalil', role: 'waiter', date: '2024-01-15', startTime: '16:00', endTime: '00:00', status: 'in-progress' },
  { id: 'shift-6', staffId: 'staff-6', staffName: 'Fatima Al-Sulaiti', role: 'waiter', date: '2024-01-15', startTime: '11:00', endTime: '19:00', status: 'completed' },
  { id: 'shift-7', staffId: 'staff-7', staffName: 'Omar Youssef', role: 'host', date: '2024-01-15', startTime: '17:00', endTime: '00:00', status: 'in-progress' },
  { id: 'shift-8', staffId: 'staff-8', staffName: 'Nadia Ahmed', role: 'cashier', date: '2024-01-15', startTime: '11:00', endTime: '23:00', status: 'in-progress' },
  { id: 'shift-9', staffId: 'staff-9', staffName: 'Rashid Al-Kuwari', role: 'kitchen-staff', date: '2024-01-15', startTime: '10:00', endTime: '18:00', status: 'completed' },
  { id: 'shift-10', staffId: 'staff-10', staffName: 'Ali Hassan', role: 'delivery', date: '2024-01-15', startTime: '17:00', endTime: '01:00', status: 'in-progress' },
  // Tomorrow's schedule
  { id: 'shift-11', staffId: 'staff-1', staffName: 'Ahmed Al-Rashid', role: 'manager', date: '2024-01-16', startTime: '10:00', endTime: '22:00', status: 'scheduled' },
  { id: 'shift-12', staffId: 'staff-2', staffName: 'Chef Mustafa', role: 'chef', date: '2024-01-16', startTime: '11:00', endTime: '23:00', status: 'scheduled' },
  { id: 'shift-13', staffId: 'staff-4', staffName: 'Sara Al-Mansour', role: 'waiter', date: '2024-01-16', startTime: '11:00', endTime: '19:00', status: 'scheduled' },
  { id: 'shift-14', staffId: 'staff-5', staffName: 'Mohammed Khalil', role: 'waiter', date: '2024-01-16', startTime: '16:00', endTime: '00:00', status: 'scheduled' },
];

// Delivery Orders
export const deliveryOrders: DeliveryOrder[] = [
  {
    id: 'del-1',
    orderId: 'order-6',
    orderNumber: 'ORD-006',
    customerName: 'Noor Abdullah',
    customerPhone: '+974 5555 2345',
    deliveryAddress: 'Building 45, Street 123, West Bay',
    deliveryArea: 'West Bay',
    driverId: 'staff-10',
    driverName: 'Ali Hassan',
    status: 'in-transit',
    estimatedDelivery: '2024-01-15T20:45:00',
    deliveryFee: 15,
    createdAt: '2024-01-15T20:00:00',
  },
  {
    id: 'del-2',
    orderId: 'order-7',
    orderNumber: 'ORD-007',
    customerName: 'Khalid Al-Dosari',
    customerPhone: '+974 5555 8888',
    deliveryAddress: 'Villa 12, Al Sadd',
    deliveryArea: 'Al Sadd',
    status: 'pending',
    estimatedDelivery: '2024-01-15T21:15:00',
    deliveryFee: 12,
    createdAt: '2024-01-15T20:30:00',
  },
  {
    id: 'del-3',
    orderId: 'order-8',
    orderNumber: 'ORD-008',
    customerName: 'Maryam Al-Naimi',
    customerPhone: '+974 5555 9999',
    deliveryAddress: 'Apartment 305, Pearl Tower, The Pearl',
    deliveryArea: 'The Pearl',
    driverId: 'staff-10',
    driverName: 'Ali Hassan',
    status: 'delivered',
    estimatedDelivery: '2024-01-15T19:30:00',
    actualDelivery: '2024-01-15T19:25:00',
    deliveryFee: 20,
    createdAt: '2024-01-15T18:45:00',
  },
];

// Customer Feedback
export const customerFeedback: CustomerFeedback[] = [
  {
    id: 'fb-1',
    orderId: 'order-prev-1',
    customerName: 'Ahmad Al-Farsi',
    rating: 5,
    foodRating: 5,
    serviceRating: 5,
    ambienceRating: 4,
    comment: 'Excellent food and great service! The lamb chops were perfectly cooked.',
    reply: 'Thank you so much for your kind words! We are delighted you enjoyed your meal.',
    replyDate: '2024-01-14',
    status: 'responded',
    createdAt: '2024-01-13T22:00:00',
  },
  {
    id: 'fb-2',
    orderId: 'order-prev-2',
    customerName: 'Sara Mohammed',
    rating: 4,
    foodRating: 5,
    serviceRating: 3,
    ambienceRating: 4,
    comment: 'Food was delicious but had to wait quite long for our order.',
    status: 'pending',
    createdAt: '2024-01-14T21:30:00',
  },
  {
    id: 'fb-3',
    orderId: 'order-prev-3',
    customerName: 'Youssef Al-Thani',
    rating: 5,
    foodRating: 5,
    serviceRating: 5,
    ambienceRating: 5,
    comment: 'Best mixed grill in Doha! Will definitely come back.',
    reply: 'We appreciate your wonderful review! Looking forward to serving you again.',
    replyDate: '2024-01-15',
    status: 'responded',
    createdAt: '2024-01-14T23:00:00',
  },
  {
    id: 'fb-4',
    orderId: 'order-prev-4',
    customerName: 'Nadia Hassan',
    rating: 3,
    foodRating: 4,
    serviceRating: 2,
    comment: 'Food quality is good but service needs improvement.',
    status: 'reviewed',
    createdAt: '2024-01-15T12:00:00',
  },
];

// Sidebar menu items for Restaurant
export const restaurantMenuItems = [
  { id: 'tables', label: 'Tables', icon: LayoutGrid, path: '/dashboard/restaurant/tables' },
  { id: 'menu', label: 'Menu', icon: UtensilsCrossed, path: '/dashboard/restaurant/menu' },
  { id: 'orders', label: 'Orders', icon: ClipboardList, path: '/dashboard/restaurant/orders' },
  { id: 'kitchen', label: 'Kitchen Display', icon: ChefHat, path: '/dashboard/restaurant/kitchen' },
  { id: 'reservations', label: 'Reservations', icon: CalendarClock, path: '/dashboard/restaurant/reservations' },
  { id: 'pos', label: 'POS', icon: CreditCard, path: '/dashboard/restaurant/pos' },
  { id: 'delivery', label: 'Delivery', icon: Bike, path: '/dashboard/restaurant/delivery' },
  { id: 'inventory', label: 'Inventory', icon: Package, path: '/dashboard/restaurant/inventory' },
  { id: 'staff', label: 'Staff Schedule', icon: Users, path: '/dashboard/restaurant/staff' },
  { id: 'analytics', label: 'Analytics', icon: BarChart3, path: '/dashboard/restaurant/analytics' },
  { id: 'qr-codes', label: 'Table QR Codes', icon: QrCode, path: '/dashboard/restaurant/qr-codes' },
  { id: 'feedback', label: 'Feedback', icon: MessageSquare, path: '/dashboard/restaurant/feedback' },
];
