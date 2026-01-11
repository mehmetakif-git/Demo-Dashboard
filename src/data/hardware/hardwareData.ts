import {
  Package,
  ShoppingCart,
  Truck,
  ClipboardList,
  Tags,
  BarChart3,
  AlertTriangle,
  QrCode,
} from 'lucide-react';

// Types
export interface Category {
  id: string;
  name: string;
  parentId: string | null;
  icon: string;
  productCount: number;
  children?: Category[];
}

export interface Product {
  id: string;
  sku: string;
  barcode: string;
  name: string;
  description: string;
  categoryId: string;
  categoryName: string;
  brand: string;
  unit: string;
  costPrice: number;
  retailPrice: number;
  wholesalePrice: number;
  minWholesaleQty: number;
  currentStock: number;
  minStock: number;
  maxStock: number;
  reorderPoint: number;
  location: string;
  supplierId: string;
  supplierName: string;
  weight: number;
  dimensions: string;
  warranty: string;
  image: string | null;
  status: 'active' | 'low-stock' | 'critical' | 'out-of-stock' | 'discontinued';
  createdAt: string;
  lastRestocked: string;
}

export interface Supplier {
  id: string;
  name: string;
  contactPerson: string;
  email: string;
  phone: string;
  address: string;
  categories: string[];
  productCount: number;
  totalPurchases: number;
  outstandingBalance: number;
  paymentTerms: string;
  rating: number;
  status: 'active' | 'inactive';
  lastOrder: string;
  createdAt: string;
}

export interface PurchaseOrderItem {
  productId: string;
  productName: string;
  quantity: number;
  unitCost: number;
  total: number;
}

export interface PurchaseOrder {
  id: string;
  poNumber: string;
  supplierId: string;
  supplierName: string;
  items: PurchaseOrderItem[];
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
  status: 'draft' | 'sent' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
  paymentStatus: 'unpaid' | 'pending' | 'paid';
  orderDate: string;
  expectedDelivery: string | null;
  deliveredDate: string | null;
  notes: string;
  createdBy: string;
  createdAt: string;
}

export interface SaleItem {
  productId: string;
  productName: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

export interface Sale {
  id: string;
  invoiceNumber: string;
  items: SaleItem[];
  subtotal: number;
  discount: number;
  discountType: 'fixed' | 'percent' | null;
  tax: number;
  total: number;
  paymentMethod: 'cash' | 'card' | 'credit';
  paymentStatus: 'paid' | 'pending';
  customerName: string;
  customerPhone: string | null;
  priceType: 'retail' | 'wholesale';
  salesPerson: string;
  notes: string;
  createdAt: string;
}

export interface StockMovement {
  id: string;
  productId: string;
  productName: string;
  type: 'in' | 'out';
  reason: string;
  quantity: number;
  previousStock: number;
  newStock: number;
  reference: string;
  notes: string;
  createdBy: string;
  createdAt: string;
}

export interface PriceList {
  id: string;
  name: string;
  code: string;
  description: string;
  discountPercent: number;
  minOrderValue?: number;
  isDefault: boolean;
  status: 'active' | 'inactive';
}

export interface LowStockAlert {
  id: string;
  productId: string;
  productName: string;
  sku: string;
  currentStock: number;
  minStock: number;
  reorderPoint: number;
  supplierId: string;
  supplierName: string;
  suggestedOrder: number;
  priority: 'critical' | 'high' | 'medium' | 'low';
  status: 'pending' | 'ordered' | 'resolved';
  createdAt: string;
}

// Categories (Hierarchical)
export const categories: Category[] = [
  {
    id: 'CAT001',
    name: 'Hand Tools',
    parentId: null,
    icon: 'Wrench',
    productCount: 45,
    children: [
      { id: 'CAT001-1', name: 'Screwdrivers', parentId: 'CAT001', icon: 'Wrench', productCount: 12 },
      { id: 'CAT001-2', name: 'Hammers', parentId: 'CAT001', icon: 'Wrench', productCount: 8 },
      { id: 'CAT001-3', name: 'Pliers', parentId: 'CAT001', icon: 'Wrench', productCount: 10 },
      { id: 'CAT001-4', name: 'Wrenches', parentId: 'CAT001', icon: 'Wrench', productCount: 15 },
    ],
  },
  {
    id: 'CAT002',
    name: 'Power Tools',
    parentId: null,
    icon: 'Zap',
    productCount: 38,
    children: [
      { id: 'CAT002-1', name: 'Drills', parentId: 'CAT002', icon: 'Zap', productCount: 14 },
      { id: 'CAT002-2', name: 'Saws', parentId: 'CAT002', icon: 'Zap', productCount: 10 },
      { id: 'CAT002-3', name: 'Sanders', parentId: 'CAT002', icon: 'Zap', productCount: 6 },
      { id: 'CAT002-4', name: 'Grinders', parentId: 'CAT002', icon: 'Zap', productCount: 8 },
    ],
  },
  {
    id: 'CAT003',
    name: 'Fasteners',
    parentId: null,
    icon: 'CircleDot',
    productCount: 120,
    children: [
      { id: 'CAT003-1', name: 'Screws', parentId: 'CAT003', icon: 'CircleDot', productCount: 45 },
      { id: 'CAT003-2', name: 'Nails', parentId: 'CAT003', icon: 'CircleDot', productCount: 30 },
      { id: 'CAT003-3', name: 'Bolts & Nuts', parentId: 'CAT003', icon: 'CircleDot', productCount: 35 },
      { id: 'CAT003-4', name: 'Anchors', parentId: 'CAT003', icon: 'CircleDot', productCount: 10 },
    ],
  },
  {
    id: 'CAT004',
    name: 'Plumbing',
    parentId: null,
    icon: 'Droplets',
    productCount: 65,
    children: [
      { id: 'CAT004-1', name: 'Pipes & Fittings', parentId: 'CAT004', icon: 'Droplets', productCount: 25 },
      { id: 'CAT004-2', name: 'Valves', parentId: 'CAT004', icon: 'Droplets', productCount: 15 },
      { id: 'CAT004-3', name: 'Faucets', parentId: 'CAT004', icon: 'Droplets', productCount: 12 },
      { id: 'CAT004-4', name: 'Plumbing Tools', parentId: 'CAT004', icon: 'Droplets', productCount: 13 },
    ],
  },
  {
    id: 'CAT005',
    name: 'Electrical',
    parentId: null,
    icon: 'Plug',
    productCount: 58,
    children: [
      { id: 'CAT005-1', name: 'Wires & Cables', parentId: 'CAT005', icon: 'Plug', productCount: 20 },
      { id: 'CAT005-2', name: 'Switches & Outlets', parentId: 'CAT005', icon: 'Plug', productCount: 18 },
      { id: 'CAT005-3', name: 'Lighting', parentId: 'CAT005', icon: 'Plug', productCount: 12 },
      { id: 'CAT005-4', name: 'Electrical Tools', parentId: 'CAT005', icon: 'Plug', productCount: 8 },
    ],
  },
  {
    id: 'CAT006',
    name: 'Paint & Supplies',
    parentId: null,
    icon: 'Paintbrush',
    productCount: 42,
    children: [
      { id: 'CAT006-1', name: 'Paints', parentId: 'CAT006', icon: 'Paintbrush', productCount: 18 },
      { id: 'CAT006-2', name: 'Brushes & Rollers', parentId: 'CAT006', icon: 'Paintbrush', productCount: 12 },
      { id: 'CAT006-3', name: 'Primers & Sealers', parentId: 'CAT006', icon: 'Paintbrush', productCount: 8 },
      { id: 'CAT006-4', name: 'Spray Paint', parentId: 'CAT006', icon: 'Paintbrush', productCount: 4 },
    ],
  },
  {
    id: 'CAT007',
    name: 'Safety Equipment',
    parentId: null,
    icon: 'HardHat',
    productCount: 28,
    children: [
      { id: 'CAT007-1', name: 'Gloves', parentId: 'CAT007', icon: 'HardHat', productCount: 10 },
      { id: 'CAT007-2', name: 'Eye Protection', parentId: 'CAT007', icon: 'HardHat', productCount: 6 },
      { id: 'CAT007-3', name: 'Masks & Respirators', parentId: 'CAT007', icon: 'HardHat', productCount: 8 },
      { id: 'CAT007-4', name: 'Hard Hats', parentId: 'CAT007', icon: 'HardHat', productCount: 4 },
    ],
  },
  {
    id: 'CAT008',
    name: 'Adhesives & Tapes',
    parentId: null,
    icon: 'Layers',
    productCount: 22,
    children: [
      { id: 'CAT008-1', name: 'Glues', parentId: 'CAT008', icon: 'Layers', productCount: 10 },
      { id: 'CAT008-2', name: 'Tapes', parentId: 'CAT008', icon: 'Layers', productCount: 8 },
      { id: 'CAT008-3', name: 'Sealants', parentId: 'CAT008', icon: 'Layers', productCount: 4 },
    ],
  },
];

// Products
export const products: Product[] = [
  // Hand Tools
  {
    id: 'PRD001',
    sku: 'HT-SD-001',
    barcode: '6901234567001',
    name: 'Professional Screwdriver Set 12pc',
    description: 'Chrome vanadium steel, magnetic tips, ergonomic handles',
    categoryId: 'CAT001-1',
    categoryName: 'Screwdrivers',
    brand: 'Stanley',
    unit: 'set',
    costPrice: 45,
    retailPrice: 75,
    wholesalePrice: 62,
    minWholesaleQty: 10,
    currentStock: 28,
    minStock: 10,
    maxStock: 50,
    reorderPoint: 15,
    location: 'A-01-03',
    supplierId: 'SUP001',
    supplierName: 'ToolMaster Trading',
    weight: 0.8,
    dimensions: '30x20x5 cm',
    warranty: '2 years',
    image: null,
    status: 'active',
    createdAt: '2024-01-15',
    lastRestocked: '2024-12-10',
  },
  {
    id: 'PRD002',
    sku: 'HT-HM-001',
    barcode: '6901234567002',
    name: 'Claw Hammer 16oz',
    description: 'Forged steel head, fiberglass handle, anti-vibration grip',
    categoryId: 'CAT001-2',
    categoryName: 'Hammers',
    brand: 'DeWalt',
    unit: 'piece',
    costPrice: 22,
    retailPrice: 38,
    wholesalePrice: 32,
    minWholesaleQty: 12,
    currentStock: 45,
    minStock: 20,
    maxStock: 80,
    reorderPoint: 25,
    location: 'A-01-05',
    supplierId: 'SUP001',
    supplierName: 'ToolMaster Trading',
    weight: 0.6,
    dimensions: '35x15x4 cm',
    warranty: 'Lifetime',
    image: null,
    status: 'active',
    createdAt: '2024-01-15',
    lastRestocked: '2024-12-05',
  },
  {
    id: 'PRD003',
    sku: 'HT-PL-001',
    barcode: '6901234567003',
    name: 'Combination Pliers 8 inch',
    description: 'Drop forged steel, insulated handles up to 1000V',
    categoryId: 'CAT001-3',
    categoryName: 'Pliers',
    brand: 'Knipex',
    unit: 'piece',
    costPrice: 35,
    retailPrice: 58,
    wholesalePrice: 48,
    minWholesaleQty: 6,
    currentStock: 8,
    minStock: 15,
    maxStock: 40,
    reorderPoint: 20,
    location: 'A-02-01',
    supplierId: 'SUP002',
    supplierName: 'Euro Tools LLC',
    weight: 0.3,
    dimensions: '22x8x3 cm',
    warranty: '5 years',
    image: null,
    status: 'low-stock',
    createdAt: '2024-02-20',
    lastRestocked: '2024-11-15',
  },
  // Power Tools
  {
    id: 'PRD004',
    sku: 'PT-DR-001',
    barcode: '6901234567004',
    name: 'Cordless Drill 20V',
    description: 'Brushless motor, 2 batteries, 50pc accessory kit included',
    categoryId: 'CAT002-1',
    categoryName: 'Drills',
    brand: 'Makita',
    unit: 'piece',
    costPrice: 180,
    retailPrice: 299,
    wholesalePrice: 250,
    minWholesaleQty: 3,
    currentStock: 12,
    minStock: 5,
    maxStock: 25,
    reorderPoint: 8,
    location: 'B-01-01',
    supplierId: 'SUP003',
    supplierName: 'PowerPro Equipment',
    weight: 2.5,
    dimensions: '35x30x12 cm',
    warranty: '3 years',
    image: null,
    status: 'active',
    createdAt: '2024-01-10',
    lastRestocked: '2024-12-01',
  },
  {
    id: 'PRD005',
    sku: 'PT-DR-002',
    barcode: '6901234567005',
    name: 'Impact Driver 18V',
    description: '3-speed selector, LED light, quick-release chuck',
    categoryId: 'CAT002-1',
    categoryName: 'Drills',
    brand: 'Bosch',
    unit: 'piece',
    costPrice: 150,
    retailPrice: 245,
    wholesalePrice: 210,
    minWholesaleQty: 3,
    currentStock: 6,
    minStock: 5,
    maxStock: 20,
    reorderPoint: 7,
    location: 'B-01-02',
    supplierId: 'SUP003',
    supplierName: 'PowerPro Equipment',
    weight: 1.8,
    dimensions: '28x25x10 cm',
    warranty: '2 years',
    image: null,
    status: 'active',
    createdAt: '2024-03-05',
    lastRestocked: '2024-11-20',
  },
  {
    id: 'PRD006',
    sku: 'PT-SW-001',
    barcode: '6901234567006',
    name: 'Circular Saw 7-1/4 inch',
    description: '15 Amp motor, laser guide, dust blower',
    categoryId: 'CAT002-2',
    categoryName: 'Saws',
    brand: 'DeWalt',
    unit: 'piece',
    costPrice: 120,
    retailPrice: 195,
    wholesalePrice: 165,
    minWholesaleQty: 2,
    currentStock: 4,
    minStock: 3,
    maxStock: 15,
    reorderPoint: 5,
    location: 'B-02-01',
    supplierId: 'SUP003',
    supplierName: 'PowerPro Equipment',
    weight: 4.2,
    dimensions: '45x35x25 cm',
    warranty: '3 years',
    image: null,
    status: 'active',
    createdAt: '2024-02-15',
    lastRestocked: '2024-12-08',
  },
  // Fasteners
  {
    id: 'PRD007',
    sku: 'FS-SC-001',
    barcode: '6901234567007',
    name: 'Wood Screws Assorted Box 500pc',
    description: 'Phillips head, zinc plated, various sizes',
    categoryId: 'CAT003-1',
    categoryName: 'Screws',
    brand: 'FixAll',
    unit: 'box',
    costPrice: 18,
    retailPrice: 32,
    wholesalePrice: 26,
    minWholesaleQty: 20,
    currentStock: 85,
    minStock: 30,
    maxStock: 150,
    reorderPoint: 40,
    location: 'C-01-01',
    supplierId: 'SUP004',
    supplierName: 'FastenPro Industries',
    weight: 2.0,
    dimensions: '25x15x8 cm',
    warranty: 'N/A',
    image: null,
    status: 'active',
    createdAt: '2024-01-05',
    lastRestocked: '2024-12-15',
  },
  {
    id: 'PRD008',
    sku: 'FS-SC-002',
    barcode: '6901234567008',
    name: 'Drywall Screws 1-5/8 inch 1000pc',
    description: 'Coarse thread, black phosphate finish',
    categoryId: 'CAT003-1',
    categoryName: 'Screws',
    brand: 'FixAll',
    unit: 'box',
    costPrice: 25,
    retailPrice: 42,
    wholesalePrice: 35,
    minWholesaleQty: 15,
    currentStock: 62,
    minStock: 25,
    maxStock: 100,
    reorderPoint: 30,
    location: 'C-01-02',
    supplierId: 'SUP004',
    supplierName: 'FastenPro Industries',
    weight: 3.5,
    dimensions: '28x18x10 cm',
    warranty: 'N/A',
    image: null,
    status: 'active',
    createdAt: '2024-01-05',
    lastRestocked: '2024-12-12',
  },
  {
    id: 'PRD009',
    sku: 'FS-BN-001',
    barcode: '6901234567009',
    name: 'Hex Bolts M10 x 50mm 50pc',
    description: 'Grade 8.8, zinc plated, with nuts',
    categoryId: 'CAT003-3',
    categoryName: 'Bolts & Nuts',
    brand: 'BoltKing',
    unit: 'pack',
    costPrice: 15,
    retailPrice: 28,
    wholesalePrice: 22,
    minWholesaleQty: 25,
    currentStock: 120,
    minStock: 50,
    maxStock: 200,
    reorderPoint: 60,
    location: 'C-02-01',
    supplierId: 'SUP004',
    supplierName: 'FastenPro Industries',
    weight: 1.8,
    dimensions: '15x10x8 cm',
    warranty: 'N/A',
    image: null,
    status: 'active',
    createdAt: '2024-01-08',
    lastRestocked: '2024-12-10',
  },
  // Plumbing
  {
    id: 'PRD010',
    sku: 'PL-PF-001',
    barcode: '6901234567010',
    name: 'PVC Pipe 4 inch x 10ft',
    description: 'Schedule 40, NSF certified for potable water',
    categoryId: 'CAT004-1',
    categoryName: 'Pipes & Fittings',
    brand: 'FlowMaster',
    unit: 'piece',
    costPrice: 12,
    retailPrice: 22,
    wholesalePrice: 18,
    minWholesaleQty: 20,
    currentStock: 75,
    minStock: 30,
    maxStock: 120,
    reorderPoint: 40,
    location: 'D-01-01',
    supplierId: 'SUP005',
    supplierName: 'PlumbTech Supplies',
    weight: 5.0,
    dimensions: '305x12x12 cm',
    warranty: 'N/A',
    image: null,
    status: 'active',
    createdAt: '2024-02-01',
    lastRestocked: '2024-12-05',
  },
  {
    id: 'PRD011',
    sku: 'PL-VL-001',
    barcode: '6901234567011',
    name: 'Ball Valve 1/2 inch Brass',
    description: 'Full port, chrome plated handle',
    categoryId: 'CAT004-2',
    categoryName: 'Valves',
    brand: 'FlowMaster',
    unit: 'piece',
    costPrice: 8,
    retailPrice: 15,
    wholesalePrice: 12,
    minWholesaleQty: 30,
    currentStock: 48,
    minStock: 25,
    maxStock: 80,
    reorderPoint: 30,
    location: 'D-02-01',
    supplierId: 'SUP005',
    supplierName: 'PlumbTech Supplies',
    weight: 0.2,
    dimensions: '8x5x5 cm',
    warranty: '5 years',
    image: null,
    status: 'active',
    createdAt: '2024-02-01',
    lastRestocked: '2024-11-28',
  },
  // Electrical
  {
    id: 'PRD012',
    sku: 'EL-WC-001',
    barcode: '6901234567012',
    name: 'Electrical Wire 2.5mm² 100m',
    description: 'Copper conductor, PVC insulation, red',
    categoryId: 'CAT005-1',
    categoryName: 'Wires & Cables',
    brand: 'WireMax',
    unit: 'roll',
    costPrice: 85,
    retailPrice: 135,
    wholesalePrice: 115,
    minWholesaleQty: 5,
    currentStock: 22,
    minStock: 10,
    maxStock: 40,
    reorderPoint: 15,
    location: 'E-01-01',
    supplierId: 'SUP006',
    supplierName: 'ElectroParts Co.',
    weight: 8.5,
    dimensions: '35x35x15 cm',
    warranty: 'N/A',
    image: null,
    status: 'active',
    createdAt: '2024-01-20',
    lastRestocked: '2024-12-01',
  },
  {
    id: 'PRD013',
    sku: 'EL-SO-001',
    barcode: '6901234567013',
    name: 'Double Socket Outlet',
    description: '13A, white, with USB ports',
    categoryId: 'CAT005-2',
    categoryName: 'Switches & Outlets',
    brand: 'Schneider',
    unit: 'piece',
    costPrice: 18,
    retailPrice: 32,
    wholesalePrice: 26,
    minWholesaleQty: 20,
    currentStock: 3,
    minStock: 15,
    maxStock: 50,
    reorderPoint: 20,
    location: 'E-02-01',
    supplierId: 'SUP006',
    supplierName: 'ElectroParts Co.',
    weight: 0.15,
    dimensions: '12x8x5 cm',
    warranty: '1 year',
    image: null,
    status: 'critical',
    createdAt: '2024-01-20',
    lastRestocked: '2024-10-15',
  },
  // Paint
  {
    id: 'PRD014',
    sku: 'PT-PN-001',
    barcode: '6901234567014',
    name: 'Interior Wall Paint White 4L',
    description: 'Matt finish, washable, low VOC',
    categoryId: 'CAT006-1',
    categoryName: 'Paints',
    brand: 'Jotun',
    unit: 'bucket',
    costPrice: 45,
    retailPrice: 75,
    wholesalePrice: 62,
    minWholesaleQty: 10,
    currentStock: 35,
    minStock: 15,
    maxStock: 60,
    reorderPoint: 20,
    location: 'F-01-01',
    supplierId: 'SUP007',
    supplierName: 'ColorWorld Trading',
    weight: 5.2,
    dimensions: '20x20x22 cm',
    warranty: 'N/A',
    image: null,
    status: 'active',
    createdAt: '2024-02-10',
    lastRestocked: '2024-12-08',
  },
  {
    id: 'PRD015',
    sku: 'PT-BR-001',
    barcode: '6901234567015',
    name: 'Paint Brush Set 5pc',
    description: 'Natural bristle, wooden handles, assorted sizes',
    categoryId: 'CAT006-2',
    categoryName: 'Brushes & Rollers',
    brand: 'ProBrush',
    unit: 'set',
    costPrice: 12,
    retailPrice: 22,
    wholesalePrice: 18,
    minWholesaleQty: 15,
    currentStock: 42,
    minStock: 20,
    maxStock: 80,
    reorderPoint: 25,
    location: 'F-02-01',
    supplierId: 'SUP007',
    supplierName: 'ColorWorld Trading',
    weight: 0.4,
    dimensions: '30x15x5 cm',
    warranty: 'N/A',
    image: null,
    status: 'active',
    createdAt: '2024-02-10',
    lastRestocked: '2024-11-25',
  },
  // Safety
  {
    id: 'PRD016',
    sku: 'SF-GL-001',
    barcode: '6901234567016',
    name: 'Work Gloves Heavy Duty',
    description: 'Leather palm, reinforced fingers, size L',
    categoryId: 'CAT007-1',
    categoryName: 'Gloves',
    brand: 'SafeHands',
    unit: 'pair',
    costPrice: 8,
    retailPrice: 15,
    wholesalePrice: 12,
    minWholesaleQty: 24,
    currentStock: 65,
    minStock: 30,
    maxStock: 100,
    reorderPoint: 40,
    location: 'G-01-01',
    supplierId: 'SUP008',
    supplierName: 'Safety First Qatar',
    weight: 0.2,
    dimensions: '28x12x3 cm',
    warranty: 'N/A',
    image: null,
    status: 'active',
    createdAt: '2024-03-01',
    lastRestocked: '2024-12-10',
  },
  {
    id: 'PRD017',
    sku: 'SF-EY-001',
    barcode: '6901234567017',
    name: 'Safety Glasses Clear',
    description: 'Anti-fog, scratch resistant, ANSI Z87.1 certified',
    categoryId: 'CAT007-2',
    categoryName: 'Eye Protection',
    brand: 'SafeVision',
    unit: 'piece',
    costPrice: 5,
    retailPrice: 12,
    wholesalePrice: 9,
    minWholesaleQty: 30,
    currentStock: 88,
    minStock: 40,
    maxStock: 150,
    reorderPoint: 50,
    location: 'G-01-02',
    supplierId: 'SUP008',
    supplierName: 'Safety First Qatar',
    weight: 0.05,
    dimensions: '18x8x6 cm',
    warranty: 'N/A',
    image: null,
    status: 'active',
    createdAt: '2024-03-01',
    lastRestocked: '2024-12-05',
  },
  // Adhesives
  {
    id: 'PRD018',
    sku: 'AD-GL-001',
    barcode: '6901234567018',
    name: 'Super Glue 20g',
    description: 'Industrial strength, instant bond',
    categoryId: 'CAT008-1',
    categoryName: 'Glues',
    brand: 'BondMax',
    unit: 'piece',
    costPrice: 3,
    retailPrice: 8,
    wholesalePrice: 6,
    minWholesaleQty: 50,
    currentStock: 145,
    minStock: 60,
    maxStock: 250,
    reorderPoint: 80,
    location: 'H-01-01',
    supplierId: 'SUP004',
    supplierName: 'FastenPro Industries',
    weight: 0.03,
    dimensions: '10x3x2 cm',
    warranty: 'N/A',
    image: null,
    status: 'active',
    createdAt: '2024-01-15',
    lastRestocked: '2024-12-12',
  },
  {
    id: 'PRD019',
    sku: 'AD-TP-001',
    barcode: '6901234567019',
    name: 'Duct Tape 50mm x 50m',
    description: 'Heavy duty, waterproof, silver',
    categoryId: 'CAT008-2',
    categoryName: 'Tapes',
    brand: 'TapePro',
    unit: 'roll',
    costPrice: 6,
    retailPrice: 12,
    wholesalePrice: 9,
    minWholesaleQty: 24,
    currentStock: 72,
    minStock: 30,
    maxStock: 120,
    reorderPoint: 40,
    location: 'H-01-02',
    supplierId: 'SUP004',
    supplierName: 'FastenPro Industries',
    weight: 0.4,
    dimensions: '15x15x5 cm',
    warranty: 'N/A',
    image: null,
    status: 'active',
    createdAt: '2024-01-15',
    lastRestocked: '2024-12-08',
  },
  {
    id: 'PRD020',
    sku: 'AD-SL-001',
    barcode: '6901234567020',
    name: 'Silicone Sealant Clear 280ml',
    description: 'Waterproof, mold resistant, indoor/outdoor',
    categoryId: 'CAT008-3',
    categoryName: 'Sealants',
    brand: 'SealPro',
    unit: 'tube',
    costPrice: 8,
    retailPrice: 15,
    wholesalePrice: 12,
    minWholesaleQty: 20,
    currentStock: 55,
    minStock: 25,
    maxStock: 80,
    reorderPoint: 30,
    location: 'H-02-01',
    supplierId: 'SUP005',
    supplierName: 'PlumbTech Supplies',
    weight: 0.35,
    dimensions: '22x5x5 cm',
    warranty: 'N/A',
    image: null,
    status: 'active',
    createdAt: '2024-02-01',
    lastRestocked: '2024-11-30',
  },
];

// Product Statuses
export const productStatuses = [
  { id: 'active', name: 'Active', color: '#10b981' },
  { id: 'low-stock', name: 'Low Stock', color: '#f59e0b' },
  { id: 'critical', name: 'Critical Stock', color: '#ef4444' },
  { id: 'out-of-stock', name: 'Out of Stock', color: '#64748b' },
  { id: 'discontinued', name: 'Discontinued', color: '#6b7280' },
];

// Suppliers
export const suppliers: Supplier[] = [
  {
    id: 'SUP001',
    name: 'ToolMaster Trading',
    contactPerson: 'Ahmed Al-Farsi',
    email: 'orders@toolmaster.qa',
    phone: '+974 4455 1001',
    address: 'Industrial Area, Street 45, Doha',
    categories: ['Hand Tools', 'Power Tools'],
    productCount: 85,
    totalPurchases: 125000,
    outstandingBalance: 8500,
    paymentTerms: 'Net 30',
    rating: 4.5,
    status: 'active',
    lastOrder: '2024-12-10',
    createdAt: '2022-06-15',
  },
  {
    id: 'SUP002',
    name: 'Euro Tools LLC',
    contactPerson: 'Marcus Weber',
    email: 'sales@eurotools.com',
    phone: '+974 4455 1002',
    address: 'Al Sadd, Building 12, Doha',
    categories: ['Hand Tools', 'Safety Equipment'],
    productCount: 42,
    totalPurchases: 85000,
    outstandingBalance: 0,
    paymentTerms: 'Net 15',
    rating: 4.8,
    status: 'active',
    lastOrder: '2024-11-25',
    createdAt: '2023-02-10',
  },
  {
    id: 'SUP003',
    name: 'PowerPro Equipment',
    contactPerson: 'John Smith',
    email: 'info@powerpro.qa',
    phone: '+974 4455 1003',
    address: 'Salwa Industrial Area, Doha',
    categories: ['Power Tools'],
    productCount: 38,
    totalPurchases: 210000,
    outstandingBalance: 15000,
    paymentTerms: 'Net 45',
    rating: 4.2,
    status: 'active',
    lastOrder: '2024-12-08',
    createdAt: '2021-09-20',
  },
  {
    id: 'SUP004',
    name: 'FastenPro Industries',
    contactPerson: 'Li Wei',
    email: 'export@fastenpro.cn',
    phone: '+974 4455 1004',
    address: 'Free Zone, Warehouse 8, Doha',
    categories: ['Fasteners', 'Adhesives & Tapes'],
    productCount: 150,
    totalPurchases: 95000,
    outstandingBalance: 5200,
    paymentTerms: 'Net 30',
    rating: 4.0,
    status: 'active',
    lastOrder: '2024-12-15',
    createdAt: '2022-01-05',
  },
  {
    id: 'SUP005',
    name: 'PlumbTech Supplies',
    contactPerson: 'Rashid Hassan',
    email: 'orders@plumbtech.qa',
    phone: '+974 4455 1005',
    address: 'Industrial Area, Street 32, Doha',
    categories: ['Plumbing'],
    productCount: 65,
    totalPurchases: 78000,
    outstandingBalance: 3200,
    paymentTerms: 'Net 30',
    rating: 4.6,
    status: 'active',
    lastOrder: '2024-12-05',
    createdAt: '2022-08-12',
  },
  {
    id: 'SUP006',
    name: 'ElectroParts Co.',
    contactPerson: 'Fatima Noor',
    email: 'sales@electroparts.qa',
    phone: '+974 4455 1006',
    address: 'Al Wakra, Industrial Zone, Qatar',
    categories: ['Electrical'],
    productCount: 58,
    totalPurchases: 145000,
    outstandingBalance: 0,
    paymentTerms: 'Net 15',
    rating: 4.7,
    status: 'active',
    lastOrder: '2024-12-01',
    createdAt: '2021-11-30',
  },
  {
    id: 'SUP007',
    name: 'ColorWorld Trading',
    contactPerson: 'Sara Ahmed',
    email: 'info@colorworld.qa',
    phone: '+974 4455 1007',
    address: 'C Ring Road, Doha',
    categories: ['Paint & Supplies'],
    productCount: 42,
    totalPurchases: 62000,
    outstandingBalance: 4800,
    paymentTerms: 'Net 30',
    rating: 4.3,
    status: 'active',
    lastOrder: '2024-12-08',
    createdAt: '2023-04-18',
  },
  {
    id: 'SUP008',
    name: 'Safety First Qatar',
    contactPerson: 'Mohammed Khalil',
    email: 'orders@safetyfirst.qa',
    phone: '+974 4455 1008',
    address: 'Industrial Area, Building 5, Doha',
    categories: ['Safety Equipment'],
    productCount: 28,
    totalPurchases: 35000,
    outstandingBalance: 0,
    paymentTerms: 'COD',
    rating: 4.4,
    status: 'active',
    lastOrder: '2024-12-10',
    createdAt: '2023-07-22',
  },
];

// Purchase Orders
export const purchaseOrders: PurchaseOrder[] = [
  {
    id: 'PO001',
    poNumber: 'PO-2024-0125',
    supplierId: 'SUP001',
    supplierName: 'ToolMaster Trading',
    items: [
      { productId: 'PRD001', productName: 'Professional Screwdriver Set 12pc', quantity: 20, unitCost: 45, total: 900 },
      { productId: 'PRD002', productName: 'Claw Hammer 16oz', quantity: 30, unitCost: 22, total: 660 },
    ],
    subtotal: 1560,
    tax: 0,
    shipping: 50,
    total: 1610,
    status: 'delivered',
    paymentStatus: 'paid',
    orderDate: '2024-12-01',
    expectedDelivery: '2024-12-10',
    deliveredDate: '2024-12-10',
    notes: 'Regular stock replenishment',
    createdBy: 'Admin',
    createdAt: '2024-12-01',
  },
  {
    id: 'PO002',
    poNumber: 'PO-2024-0126',
    supplierId: 'SUP003',
    supplierName: 'PowerPro Equipment',
    items: [
      { productId: 'PRD004', productName: 'Cordless Drill 20V', quantity: 8, unitCost: 180, total: 1440 },
      { productId: 'PRD005', productName: 'Impact Driver 18V', quantity: 5, unitCost: 150, total: 750 },
      { productId: 'PRD006', productName: 'Circular Saw 7-1/4 inch', quantity: 3, unitCost: 120, total: 360 },
    ],
    subtotal: 2550,
    tax: 0,
    shipping: 0,
    total: 2550,
    status: 'shipped',
    paymentStatus: 'pending',
    orderDate: '2024-12-15',
    expectedDelivery: '2024-12-25',
    deliveredDate: null,
    notes: 'Urgent - power tools running low',
    createdBy: 'Admin',
    createdAt: '2024-12-15',
  },
  {
    id: 'PO003',
    poNumber: 'PO-2024-0127',
    supplierId: 'SUP006',
    supplierName: 'ElectroParts Co.',
    items: [
      { productId: 'PRD013', productName: 'Double Socket Outlet', quantity: 50, unitCost: 18, total: 900 },
    ],
    subtotal: 900,
    tax: 0,
    shipping: 25,
    total: 925,
    status: 'confirmed',
    paymentStatus: 'pending',
    orderDate: '2024-12-20',
    expectedDelivery: '2024-12-28',
    deliveredDate: null,
    notes: 'Critical stock - expedite',
    createdBy: 'Admin',
    createdAt: '2024-12-20',
  },
  {
    id: 'PO004',
    poNumber: 'PO-2024-0128',
    supplierId: 'SUP002',
    supplierName: 'Euro Tools LLC',
    items: [
      { productId: 'PRD003', productName: 'Combination Pliers 8 inch', quantity: 25, unitCost: 35, total: 875 },
    ],
    subtotal: 875,
    tax: 0,
    shipping: 0,
    total: 875,
    status: 'draft',
    paymentStatus: 'unpaid',
    orderDate: '2024-12-22',
    expectedDelivery: null,
    deliveredDate: null,
    notes: '',
    createdBy: 'Admin',
    createdAt: '2024-12-22',
  },
];

export const poStatuses = [
  { id: 'draft', name: 'Draft', color: '#64748b' },
  { id: 'sent', name: 'Sent to Supplier', color: '#6366f1' },
  { id: 'confirmed', name: 'Confirmed', color: '#0ea5e9' },
  { id: 'shipped', name: 'Shipped', color: '#f59e0b' },
  { id: 'delivered', name: 'Delivered', color: '#10b981' },
  { id: 'cancelled', name: 'Cancelled', color: '#ef4444' },
];

// Sales
export const sales: Sale[] = [
  {
    id: 'SAL001',
    invoiceNumber: 'INV-2024-0512',
    items: [
      { productId: 'PRD001', productName: 'Professional Screwdriver Set 12pc', quantity: 2, unitPrice: 75, total: 150 },
      { productId: 'PRD018', productName: 'Super Glue 20g', quantity: 5, unitPrice: 8, total: 40 },
    ],
    subtotal: 190,
    discount: 0,
    discountType: null,
    tax: 0,
    total: 190,
    paymentMethod: 'cash',
    paymentStatus: 'paid',
    customerName: 'Walk-in Customer',
    customerPhone: null,
    priceType: 'retail',
    salesPerson: 'Mohammed',
    notes: '',
    createdAt: '2024-12-23T09:15:00',
  },
  {
    id: 'SAL002',
    invoiceNumber: 'INV-2024-0513',
    items: [
      { productId: 'PRD004', productName: 'Cordless Drill 20V', quantity: 1, unitPrice: 299, total: 299 },
      { productId: 'PRD007', productName: 'Wood Screws Assorted Box 500pc', quantity: 3, unitPrice: 32, total: 96 },
    ],
    subtotal: 395,
    discount: 20,
    discountType: 'fixed',
    tax: 0,
    total: 375,
    paymentMethod: 'card',
    paymentStatus: 'paid',
    customerName: 'Ali Construction',
    customerPhone: '+974 5588 1234',
    priceType: 'retail',
    salesPerson: 'Ahmed',
    notes: 'Regular contractor',
    createdAt: '2024-12-23T10:30:00',
  },
  {
    id: 'SAL003',
    invoiceNumber: 'INV-2024-0514',
    items: [
      { productId: 'PRD010', productName: 'PVC Pipe 4 inch x 10ft', quantity: 20, unitPrice: 18, total: 360 },
      { productId: 'PRD011', productName: 'Ball Valve 1/2 inch Brass', quantity: 15, unitPrice: 12, total: 180 },
      { productId: 'PRD020', productName: 'Silicone Sealant Clear 280ml', quantity: 10, unitPrice: 12, total: 120 },
    ],
    subtotal: 660,
    discount: 10,
    discountType: 'percent',
    tax: 0,
    total: 594,
    paymentMethod: 'credit',
    paymentStatus: 'pending',
    customerName: 'Doha Plumbing Co.',
    customerPhone: '+974 4488 5566',
    priceType: 'wholesale',
    salesPerson: 'Mohammed',
    notes: 'Wholesale order - credit 30 days',
    createdAt: '2024-12-23T11:45:00',
  },
  {
    id: 'SAL004',
    invoiceNumber: 'INV-2024-0515',
    items: [
      { productId: 'PRD014', productName: 'Interior Wall Paint White 4L', quantity: 5, unitPrice: 75, total: 375 },
      { productId: 'PRD015', productName: 'Paint Brush Set 5pc', quantity: 2, unitPrice: 22, total: 44 },
      { productId: 'PRD019', productName: 'Duct Tape 50mm x 50m', quantity: 3, unitPrice: 12, total: 36 },
    ],
    subtotal: 455,
    discount: 0,
    discountType: null,
    tax: 0,
    total: 455,
    paymentMethod: 'cash',
    paymentStatus: 'paid',
    customerName: 'Walk-in Customer',
    customerPhone: null,
    priceType: 'retail',
    salesPerson: 'Ahmed',
    notes: '',
    createdAt: '2024-12-23T14:20:00',
  },
  {
    id: 'SAL005',
    invoiceNumber: 'INV-2024-0516',
    items: [
      { productId: 'PRD016', productName: 'Work Gloves Heavy Duty', quantity: 24, unitPrice: 12, total: 288 },
      { productId: 'PRD017', productName: 'Safety Glasses Clear', quantity: 30, unitPrice: 9, total: 270 },
    ],
    subtotal: 558,
    discount: 5,
    discountType: 'percent',
    tax: 0,
    total: 530.1,
    paymentMethod: 'card',
    paymentStatus: 'paid',
    customerName: 'SafeBuild Contracting',
    customerPhone: '+974 5599 7788',
    priceType: 'wholesale',
    salesPerson: 'Mohammed',
    notes: 'Bulk safety equipment order',
    createdAt: '2024-12-23T15:30:00',
  },
];

// Stock Movements
export const stockMovements: StockMovement[] = [
  {
    id: 'SM001',
    productId: 'PRD001',
    productName: 'Professional Screwdriver Set 12pc',
    type: 'in',
    reason: 'purchase',
    quantity: 20,
    previousStock: 8,
    newStock: 28,
    reference: 'PO-2024-0125',
    notes: 'Stock replenishment',
    createdBy: 'Admin',
    createdAt: '2024-12-10T10:00:00',
  },
  {
    id: 'SM002',
    productId: 'PRD001',
    productName: 'Professional Screwdriver Set 12pc',
    type: 'out',
    reason: 'sale',
    quantity: 2,
    previousStock: 30,
    newStock: 28,
    reference: 'INV-2024-0512',
    notes: '',
    createdBy: 'Mohammed',
    createdAt: '2024-12-23T09:15:00',
  },
  {
    id: 'SM003',
    productId: 'PRD004',
    productName: 'Cordless Drill 20V',
    type: 'out',
    reason: 'sale',
    quantity: 1,
    previousStock: 13,
    newStock: 12,
    reference: 'INV-2024-0513',
    notes: '',
    createdBy: 'Ahmed',
    createdAt: '2024-12-23T10:30:00',
  },
  {
    id: 'SM004',
    productId: 'PRD010',
    productName: 'PVC Pipe 4 inch x 10ft',
    type: 'out',
    reason: 'sale',
    quantity: 20,
    previousStock: 95,
    newStock: 75,
    reference: 'INV-2024-0514',
    notes: 'Wholesale order',
    createdBy: 'Mohammed',
    createdAt: '2024-12-23T11:45:00',
  },
  {
    id: 'SM005',
    productId: 'PRD003',
    productName: 'Combination Pliers 8 inch',
    type: 'out',
    reason: 'damaged',
    quantity: 2,
    previousStock: 10,
    newStock: 8,
    reference: 'DMG-2024-001',
    notes: 'Damaged in storage - written off',
    createdBy: 'Admin',
    createdAt: '2024-12-20T16:00:00',
  },
  {
    id: 'SM006',
    productId: 'PRD007',
    productName: 'Wood Screws Assorted Box 500pc',
    type: 'in',
    reason: 'purchase',
    quantity: 50,
    previousStock: 38,
    newStock: 88,
    reference: 'PO-2024-0122',
    notes: '',
    createdBy: 'Admin',
    createdAt: '2024-12-15T09:30:00',
  },
  {
    id: 'SM007',
    productId: 'PRD013',
    productName: 'Double Socket Outlet',
    type: 'out',
    reason: 'sale',
    quantity: 12,
    previousStock: 15,
    newStock: 3,
    reference: 'INV-2024-0498',
    notes: '',
    createdBy: 'Ahmed',
    createdAt: '2024-12-18T14:20:00',
  },
  {
    id: 'SM008',
    productId: 'PRD016',
    productName: 'Work Gloves Heavy Duty',
    type: 'in',
    reason: 'return',
    quantity: 5,
    previousStock: 60,
    newStock: 65,
    reference: 'RET-2024-015',
    notes: 'Customer return - wrong size',
    createdBy: 'Mohammed',
    createdAt: '2024-12-21T11:00:00',
  },
];

export const movementTypes = [
  { id: 'in', name: 'Stock In', color: '#10b981', icon: 'ArrowDown' },
  { id: 'out', name: 'Stock Out', color: '#ef4444', icon: 'ArrowUp' },
];

export const movementReasons = [
  { id: 'purchase', name: 'Purchase', type: 'in' },
  { id: 'return', name: 'Customer Return', type: 'in' },
  { id: 'adjustment', name: 'Adjustment', type: 'in' },
  { id: 'transfer-in', name: 'Transfer In', type: 'in' },
  { id: 'sale', name: 'Sale', type: 'out' },
  { id: 'damaged', name: 'Damaged', type: 'out' },
  { id: 'expired', name: 'Expired', type: 'out' },
  { id: 'transfer-out', name: 'Transfer Out', type: 'out' },
  { id: 'count', name: 'Stock Count Adjustment', type: 'both' },
];

// Price Lists
export const priceLists: PriceList[] = [
  {
    id: 'PL001',
    name: 'Retail Price',
    code: 'RETAIL',
    description: 'Standard retail pricing for walk-in customers',
    discountPercent: 0,
    isDefault: true,
    status: 'active',
  },
  {
    id: 'PL002',
    name: 'Wholesale - Tier 1',
    code: 'WS-T1',
    description: 'Wholesale pricing for orders above QAR 1,000',
    discountPercent: 15,
    minOrderValue: 1000,
    isDefault: false,
    status: 'active',
  },
  {
    id: 'PL003',
    name: 'Wholesale - Tier 2',
    code: 'WS-T2',
    description: 'Wholesale pricing for orders above QAR 5,000',
    discountPercent: 20,
    minOrderValue: 5000,
    isDefault: false,
    status: 'active',
  },
  {
    id: 'PL004',
    name: 'Contractor Special',
    code: 'CONTRACTOR',
    description: 'Special pricing for registered contractors',
    discountPercent: 18,
    minOrderValue: 500,
    isDefault: false,
    status: 'active',
  },
  {
    id: 'PL005',
    name: 'Clearance',
    code: 'CLEARANCE',
    description: 'Discounted pricing for clearance items',
    discountPercent: 30,
    isDefault: false,
    status: 'active',
  },
];

// Low Stock Alerts
export const lowStockAlerts: LowStockAlert[] = [
  {
    id: 'ALT001',
    productId: 'PRD003',
    productName: 'Combination Pliers 8 inch',
    sku: 'HT-PL-001',
    currentStock: 8,
    minStock: 15,
    reorderPoint: 20,
    supplierId: 'SUP002',
    supplierName: 'Euro Tools LLC',
    suggestedOrder: 30,
    priority: 'high',
    status: 'pending',
    createdAt: '2024-12-20',
  },
  {
    id: 'ALT002',
    productId: 'PRD013',
    productName: 'Double Socket Outlet',
    sku: 'EL-SO-001',
    currentStock: 3,
    minStock: 15,
    reorderPoint: 20,
    supplierId: 'SUP006',
    supplierName: 'ElectroParts Co.',
    suggestedOrder: 50,
    priority: 'critical',
    status: 'ordered',
    createdAt: '2024-12-18',
  },
  {
    id: 'ALT003',
    productId: 'PRD006',
    productName: 'Circular Saw 7-1/4 inch',
    sku: 'PT-SW-001',
    currentStock: 4,
    minStock: 3,
    reorderPoint: 5,
    supplierId: 'SUP003',
    supplierName: 'PowerPro Equipment',
    suggestedOrder: 10,
    priority: 'medium',
    status: 'pending',
    createdAt: '2024-12-22',
  },
];

export const alertPriorities = [
  { id: 'critical', name: 'Critical', color: '#ef4444' },
  { id: 'high', name: 'High', color: '#f59e0b' },
  { id: 'medium', name: 'Medium', color: '#6366f1' },
  { id: 'low', name: 'Low', color: '#64748b' },
];

// Dashboard Stats
export const hardwareStats = {
  totalProducts: 420,
  totalCategories: 32,
  totalSuppliers: 8,
  lowStockItems: 12,
  criticalStockItems: 3,
  totalInventoryValue: 285000,
  todaySales: 2145,
  todayTransactions: 18,
  weekSales: 15680,
  monthSales: 68500,
  topSellingProducts: [
    { name: 'Wood Screws Assorted Box 500pc', sold: 145, revenue: 4640 },
    { name: 'Claw Hammer 16oz', sold: 89, revenue: 3382 },
    { name: 'Work Gloves Heavy Duty', sold: 156, revenue: 2340 },
    { name: 'PVC Pipe 4 inch x 10ft', sold: 120, revenue: 2640 },
  ],
  topCategories: [
    { name: 'Fasteners', revenue: 18500 },
    { name: 'Hand Tools', revenue: 15200 },
    { name: 'Plumbing', revenue: 12800 },
    { name: 'Electrical', revenue: 11500 },
  ],
  pendingPurchaseOrders: 3,
  pendingPayments: 25700,
};

// Sidebar Menu Items
export const hardwareMenuItems = [
  { id: 'hardware-products', label: 'Products', icon: Package, path: '/dashboard/hardware/products' },
  { id: 'hardware-categories', label: 'Categories', icon: Tags, path: '/dashboard/hardware/categories' },
  { id: 'hardware-inventory', label: 'Inventory', icon: ClipboardList, path: '/dashboard/hardware/inventory' },
  { id: 'hardware-movements', label: 'Stock Movements', icon: Truck, path: '/dashboard/hardware/stock-movements' },
  { id: 'hardware-suppliers', label: 'Suppliers', icon: Truck, path: '/dashboard/hardware/suppliers' },
  { id: 'hardware-purchases', label: 'Purchase Orders', icon: ClipboardList, path: '/dashboard/hardware/purchase-orders' },
  { id: 'hardware-pos', label: 'Sales (POS)', icon: ShoppingCart, path: '/dashboard/hardware/sales' },
  { id: 'hardware-sales-history', label: 'Sales History', icon: BarChart3, path: '/dashboard/hardware/sales-history' },
  { id: 'hardware-pricelists', label: 'Price Lists', icon: Tags, path: '/dashboard/hardware/price-lists' },
  { id: 'hardware-alerts', label: 'Low Stock Alerts', icon: AlertTriangle, path: '/dashboard/hardware/alerts' },
  { id: 'hardware-barcode', label: 'Barcode', icon: QrCode, path: '/dashboard/hardware/barcode' },
];

// Helper Functions
export const getProductById = (id: string): Product | undefined => {
  return products.find((p) => p.id === id);
};

export const getSupplierById = (id: string): Supplier | undefined => {
  return suppliers.find((s) => s.id === id);
};

export const getPurchaseOrderById = (id: string): PurchaseOrder | undefined => {
  return purchaseOrders.find((po) => po.id === id);
};

export const getSaleById = (id: string): Sale | undefined => {
  return sales.find((s) => s.id === id);
};

export const getCategoryById = (id: string): Category | undefined => {
  for (const cat of categories) {
    if (cat.id === id) return cat;
    if (cat.children) {
      const child = cat.children.find((c) => c.id === id);
      if (child) return child;
    }
  }
  return undefined;
};

export const formatCurrency = (amount: number): string => {
  return `QAR ${amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
};

export const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

export const formatDateTime = (dateString: string): string => {
  return new Date(dateString).toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

export const getStatusColor = (status: string): string => {
  const statusObj = productStatuses.find((s) => s.id === status);
  return statusObj?.color || '#64748b';
};

export const getPOStatusColor = (status: string): string => {
  const statusObj = poStatuses.find((s) => s.id === status);
  return statusObj?.color || '#64748b';
};

export const getAlertPriorityColor = (priority: string): string => {
  const priorityObj = alertPriorities.find((p) => p.id === priority);
  return priorityObj?.color || '#64748b';
};
