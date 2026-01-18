import {
  Factory,
  ClipboardList,
  Layers,
  Package,
  CheckSquare,
  Cog,
  Wrench,
  CalendarClock,
  PackageCheck,
  Trash2,
  Clock,
  BarChart3,
} from 'lucide-react';
import { ROUTES } from '@/utils/constants';

// Color constants for Manufacturing sector
export const MANUFACTURING_COLOR = '#64748b'; // slate-500
export const MANUFACTURING_COLOR_LIGHT = '#94a3b8'; // slate-400
export const MANUFACTURING_COLOR_DARK = '#475569'; // slate-600

// Types
export interface ProductionLine {
  id: string;
  lineName: string;
  department: string;
  capacity: number;
  unit: string;
  status: 'running' | 'maintenance' | 'idle';
  currentProduct: string | null;
  productName: string | null;
  efficiency: number;
  currentOutput: number;
  targetOutput: number;
  startTime: string | null;
  shift: string | null;
  supervisor: string;
  workers: number;
  downtime: number;
}

export interface WorkOrder {
  id: string;
  workOrderNo: string;
  productId: string;
  productName: string;
  quantity: number;
  unit: string;
  status: 'scheduled' | 'in-progress' | 'completed' | 'cancelled';
  priority: 'high' | 'normal' | 'low';
  startDate: string;
  dueDate: string;
  completedQty: number;
  productionLineId: string;
  lineName: string;
  batchNo: string;
  qualityChecks: number;
  passedChecks: number;
  createdBy: string;
  createdAt: string;
}

export interface BOMaterial {
  materialId: string;
  materialName: string;
  quantity: number;
  unit: string;
  unitCost: number;
  totalCost: number;
}

export interface BillOfMaterial {
  id: string;
  productId: string;
  productName: string;
  version: string;
  status: 'active' | 'inactive';
  totalCost: number;
  materials: BOMaterial[];
}

export interface RawMaterial {
  id: string;
  materialCode: string;
  materialName: string;
  category: string;
  unit: string;
  currentStock: number;
  minStock: number;
  maxStock: number;
  unitCost: number;
  supplier: string;
  location: string;
  lastRestocked: string;
  expiryDate: string | null;
  status: 'in-stock' | 'low-stock' | 'out-of-stock';
  reservedQty: number;
  availableQty: number;
}

export interface Defect {
  defectType: string;
  severity: 'Minor' | 'Major' | 'Critical';
  quantity: number;
  description: string;
}

export interface QualityCheck {
  id: string;
  workOrderId: string;
  workOrderNo: string;
  productName: string;
  checkDate: string;
  checkTime: string;
  checkType: string;
  inspector: string;
  sampleSize: number;
  defectsFound: number;
  defectRate: number;
  status: 'passed' | 'failed';
  notes: string;
  defects: Defect[];
}

export interface Machine {
  id: string;
  machineNo: string;
  machineName: string;
  category: string;
  manufacturer: string;
  model: string;
  serialNo: string;
  productionLineId: string;
  lineName: string;
  status: 'running' | 'idle' | 'maintenance' | 'out-of-service';
  installDate: string;
  lastMaintenance: string;
  nextMaintenance: string;
  operatingHours: number;
  maintenanceCost: number;
  efficiency: number;
  downtime: number;
}

export interface MaintenanceRecord {
  id: string;
  machineId: string;
  machineNo: string;
  machineName: string;
  maintenanceType: string;
  scheduledDate: string;
  completedDate: string | null;
  status: 'scheduled' | 'in-progress' | 'completed';
  technician: string;
  duration: number | null;
  description: string;
  parts: string[];
  cost: number;
  nextMaintenance: string;
}

export interface RequiredMaterial {
  materialId: string;
  materialName: string;
  required: number;
  available: number;
  shortage: number;
}

export interface ProductionPlan {
  id: string;
  planDate: string;
  productId: string;
  productName: string;
  plannedQty: number;
  productionLineId: string;
  lineName: string;
  shift: string;
  priority: 'high' | 'normal' | 'low';
  status: 'planned' | 'scheduled' | 'in-progress' | 'completed';
  requiredMaterials: RequiredMaterial[];
}

export interface FinishedGood {
  id: string;
  productId: string;
  productName: string;
  batchNo: string;
  quantity: number;
  unit: string;
  productionDate: string;
  expiryDate: string | null;
  location: string;
  status: 'in-stock' | 'in-production' | 'reserved';
  reservedQty: number;
  availableQty: number;
  costPerUnit: number;
  totalValue: number;
  qualityStatus: 'passed' | 'pending' | 'failed';
}

export interface WasteRecord {
  id: string;
  workOrderId: string;
  workOrderNo: string;
  productName: string;
  wasteDate: string;
  wasteType: string;
  quantity: number;
  unit: string;
  reason: string;
  cost: number;
  disposalMethod: string;
  disposedBy: string;
  notes: string;
}

export interface Shift {
  id: string;
  shiftName: string;
  startTime: string;
  endTime: string;
  duration: number;
  status: 'active' | 'inactive';
  days: string[];
}

export interface ShiftAssignment {
  id: string;
  shiftId: string;
  shiftName: string;
  date: string;
  productionLineId: string;
  lineName: string;
  supervisor: string;
  workers: number;
  status: 'active' | 'scheduled' | 'completed';
}

// Mock Data
export const productionLines: ProductionLine[] = [
  { id: 'LINE001', lineName: 'Assembly Line 1', department: 'Electronics Assembly', capacity: 500, unit: 'Units/Day', status: 'running', currentProduct: 'PROD001', productName: 'Smart TV 55"', efficiency: 92, currentOutput: 458, targetOutput: 500, startTime: '2024-01-17 06:00:00', shift: 'Morning Shift', supervisor: 'Ahmet Yilmaz', workers: 12, downtime: 0 },
  { id: 'LINE002', lineName: 'Assembly Line 2', department: 'Electronics Assembly', capacity: 500, unit: 'Units/Day', status: 'running', currentProduct: 'PROD002', productName: 'Laptop 15.6"', efficiency: 88, currentOutput: 425, targetOutput: 500, startTime: '2024-01-17 06:00:00', shift: 'Morning Shift', supervisor: 'Fatma Demir', workers: 12, downtime: 15 },
  { id: 'LINE003', lineName: 'Packaging Line 1', department: 'Packaging', capacity: 800, unit: 'Units/Day', status: 'running', currentProduct: 'PROD001', productName: 'Smart TV 55"', efficiency: 95, currentOutput: 740, targetOutput: 800, startTime: '2024-01-17 06:00:00', shift: 'Morning Shift', supervisor: 'Can Arslan', workers: 8, downtime: 0 },
  { id: 'LINE004', lineName: 'CNC Machining Line', department: 'Metal Fabrication', capacity: 200, unit: 'Parts/Day', status: 'maintenance', currentProduct: null, productName: null, efficiency: 0, currentOutput: 0, targetOutput: 200, startTime: null, shift: null, supervisor: 'Zeynep Kaya', workers: 0, downtime: 120 },
  { id: 'LINE005', lineName: 'Injection Molding 1', department: 'Plastics', capacity: 1000, unit: 'Parts/Day', status: 'running', currentProduct: 'PART015', productName: 'Plastic Housing', efficiency: 90, currentOutput: 875, targetOutput: 1000, startTime: '2024-01-17 06:00:00', shift: 'Morning Shift', supervisor: 'Mehmet Oz', workers: 6, downtime: 25 },
];

export const workOrders: WorkOrder[] = [
  { id: 'WO001', workOrderNo: 'WO-2024-001', productId: 'PROD001', productName: 'Smart TV 55"', quantity: 500, unit: 'Units', status: 'in-progress', priority: 'high', startDate: '2024-01-17', dueDate: '2024-01-18', completedQty: 458, productionLineId: 'LINE001', lineName: 'Assembly Line 1', batchNo: 'BATCH-TV-001', qualityChecks: 3, passedChecks: 3, createdBy: 'Production Manager', createdAt: '2024-01-16 14:00:00' },
  { id: 'WO002', workOrderNo: 'WO-2024-002', productId: 'PROD002', productName: 'Laptop 15.6"', quantity: 500, unit: 'Units', status: 'in-progress', priority: 'normal', startDate: '2024-01-17', dueDate: '2024-01-19', completedQty: 425, productionLineId: 'LINE002', lineName: 'Assembly Line 2', batchNo: 'BATCH-LAP-002', qualityChecks: 2, passedChecks: 2, createdBy: 'Production Manager', createdAt: '2024-01-16 15:00:00' },
  { id: 'WO003', workOrderNo: 'WO-2024-003', productId: 'PROD003', productName: 'Smartphone X10', quantity: 1000, unit: 'Units', status: 'scheduled', priority: 'normal', startDate: '2024-01-19', dueDate: '2024-01-21', completedQty: 0, productionLineId: 'LINE001', lineName: 'Assembly Line 1', batchNo: 'BATCH-PHN-003', qualityChecks: 0, passedChecks: 0, createdBy: 'Production Manager', createdAt: '2024-01-17 09:00:00' },
  { id: 'WO004', workOrderNo: 'WO-2024-004', productId: 'PART015', productName: 'Plastic Housing', quantity: 2000, unit: 'Parts', status: 'in-progress', priority: 'high', startDate: '2024-01-17', dueDate: '2024-01-18', completedQty: 875, productionLineId: 'LINE005', lineName: 'Injection Molding 1', batchNo: 'BATCH-PLS-004', qualityChecks: 1, passedChecks: 1, createdBy: 'Production Manager', createdAt: '2024-01-16 16:00:00' },
  { id: 'WO005', workOrderNo: 'WO-2024-005', productId: 'PROD001', productName: 'Smart TV 55"', quantity: 300, unit: 'Units', status: 'completed', priority: 'normal', startDate: '2024-01-15', dueDate: '2024-01-16', completedQty: 300, productionLineId: 'LINE001', lineName: 'Assembly Line 1', batchNo: 'BATCH-TV-005', qualityChecks: 3, passedChecks: 3, createdBy: 'Production Manager', createdAt: '2024-01-14 10:00:00' },
];

export const billOfMaterials: BillOfMaterial[] = [
  { id: 'BOM001', productId: 'PROD001', productName: 'Smart TV 55"', version: 'Rev 3', status: 'active', totalCost: 1250, materials: [
    { materialId: 'MAT001', materialName: '55" LCD Panel', quantity: 1, unit: 'Piece', unitCost: 450, totalCost: 450 },
    { materialId: 'MAT002', materialName: 'Main Board PCB', quantity: 1, unit: 'Piece', unitCost: 180, totalCost: 180 },
    { materialId: 'MAT003', materialName: 'Power Supply Unit', quantity: 1, unit: 'Piece', unitCost: 75, totalCost: 75 },
    { materialId: 'MAT004', materialName: 'Plastic Back Cover', quantity: 1, unit: 'Piece', unitCost: 35, totalCost: 35 },
    { materialId: 'MAT005', materialName: 'Remote Control', quantity: 1, unit: 'Piece', unitCost: 25, totalCost: 25 },
    { materialId: 'MAT006', materialName: 'Screws & Fasteners', quantity: 1, unit: 'Set', unitCost: 5, totalCost: 5 },
    { materialId: 'MAT007', materialName: 'Packaging Box', quantity: 1, unit: 'Piece', unitCost: 15, totalCost: 15 },
  ]},
  { id: 'BOM002', productId: 'PROD002', productName: 'Laptop 15.6"', version: 'Rev 2', status: 'active', totalCost: 1850, materials: [
    { materialId: 'MAT008', materialName: '15.6" LCD Screen', quantity: 1, unit: 'Piece', unitCost: 280, totalCost: 280 },
    { materialId: 'MAT009', materialName: 'Motherboard', quantity: 1, unit: 'Piece', unitCost: 350, totalCost: 350 },
    { materialId: 'MAT010', materialName: 'CPU - Intel i5', quantity: 1, unit: 'Piece', unitCost: 420, totalCost: 420 },
    { materialId: 'MAT011', materialName: 'RAM 8GB DDR4', quantity: 1, unit: 'Piece', unitCost: 85, totalCost: 85 },
    { materialId: 'MAT012', materialName: 'SSD 512GB', quantity: 1, unit: 'Piece', unitCost: 120, totalCost: 120 },
    { materialId: 'MAT013', materialName: 'Battery Pack', quantity: 1, unit: 'Piece', unitCost: 95, totalCost: 95 },
    { materialId: 'MAT014', materialName: 'Keyboard', quantity: 1, unit: 'Piece', unitCost: 45, totalCost: 45 },
    { materialId: 'MAT015', materialName: 'Plastic Chassis', quantity: 1, unit: 'Piece', unitCost: 55, totalCost: 55 },
  ]},
  { id: 'BOM003', productId: 'PART015', productName: 'Plastic Housing', version: 'Rev 1', status: 'active', totalCost: 18, materials: [
    { materialId: 'MAT016', materialName: 'ABS Plastic Granules', quantity: 0.5, unit: 'kg', unitCost: 28, totalCost: 14 },
    { materialId: 'MAT017', materialName: 'Color Pigment', quantity: 0.02, unit: 'kg', unitCost: 150, totalCost: 3 },
    { materialId: 'MAT018', materialName: 'Mold Release Agent', quantity: 0.005, unit: 'Liter', unitCost: 200, totalCost: 1 },
  ]},
];

export const rawMaterials: RawMaterial[] = [
  { id: 'MAT001', materialCode: 'LCD-55-001', materialName: '55" LCD Panel', category: 'Electronics', unit: 'Piece', currentStock: 850, minStock: 500, maxStock: 2000, unitCost: 450, supplier: 'Samsung Display', location: 'Warehouse A - Zone 1', lastRestocked: '2024-01-12', expiryDate: null, status: 'in-stock', reservedQty: 500, availableQty: 350 },
  { id: 'MAT002', materialCode: 'PCB-MB-002', materialName: 'Main Board PCB', category: 'Electronics', unit: 'Piece', currentStock: 1200, minStock: 600, maxStock: 2500, unitCost: 180, supplier: 'Foxconn', location: 'Warehouse A - Zone 2', lastRestocked: '2024-01-14', expiryDate: null, status: 'in-stock', reservedQty: 500, availableQty: 700 },
  { id: 'MAT008', materialCode: 'LCD-15-008', materialName: '15.6" LCD Screen', category: 'Electronics', unit: 'Piece', currentStock: 650, minStock: 400, maxStock: 1500, unitCost: 280, supplier: 'LG Display', location: 'Warehouse A - Zone 1', lastRestocked: '2024-01-10', expiryDate: null, status: 'in-stock', reservedQty: 500, availableQty: 150 },
  { id: 'MAT010', materialCode: 'CPU-I5-010', materialName: 'CPU - Intel i5', category: 'Electronics', unit: 'Piece', currentStock: 320, minStock: 200, maxStock: 800, unitCost: 420, supplier: 'Intel Corporation', location: 'Warehouse B - Secure', lastRestocked: '2024-01-15', expiryDate: null, status: 'low-stock', reservedQty: 500, availableQty: -180 },
  { id: 'MAT016', materialCode: 'PLS-ABS-016', materialName: 'ABS Plastic Granules', category: 'Plastics', unit: 'kg', currentStock: 5000, minStock: 2000, maxStock: 10000, unitCost: 28, supplier: 'Gulf Polymers', location: 'Warehouse C - Raw', lastRestocked: '2024-01-08', expiryDate: null, status: 'in-stock', reservedQty: 1000, availableQty: 4000 },
  { id: 'MAT004', materialCode: 'PLS-BCV-004', materialName: 'Plastic Back Cover', category: 'Plastics', unit: 'Piece', currentStock: 1500, minStock: 800, maxStock: 3000, unitCost: 35, supplier: 'Local Plastics Inc', location: 'Warehouse C - Parts', lastRestocked: '2024-01-11', expiryDate: null, status: 'in-stock', reservedQty: 500, availableQty: 1000 },
];

export const qualityChecks: QualityCheck[] = [
  { id: 'QC001', workOrderId: 'WO001', workOrderNo: 'WO-2024-001', productName: 'Smart TV 55"', checkDate: '2024-01-17', checkTime: '08:30', checkType: 'In-Process Inspection', inspector: 'Ali Quality Inspector', sampleSize: 50, defectsFound: 2, defectRate: 4, status: 'passed', notes: 'Minor cosmetic defects found, within acceptable limits', defects: [
    { defectType: 'Cosmetic', severity: 'Minor', quantity: 2, description: 'Small scratches on plastic cover' }
  ]},
  { id: 'QC002', workOrderId: 'WO001', workOrderNo: 'WO-2024-001', productName: 'Smart TV 55"', checkDate: '2024-01-17', checkTime: '12:00', checkType: 'Final Inspection', inspector: 'Fatma Quality Lead', sampleSize: 30, defectsFound: 0, defectRate: 0, status: 'passed', notes: 'All units passed final inspection', defects: []},
  { id: 'QC003', workOrderId: 'WO002', workOrderNo: 'WO-2024-002', productName: 'Laptop 15.6"', checkDate: '2024-01-17', checkTime: '10:15', checkType: 'In-Process Inspection', inspector: 'Can Quality Inspector', sampleSize: 40, defectsFound: 5, defectRate: 12.5, status: 'failed', notes: 'Keyboard issues detected, production line stopped for adjustment', defects: [
    { defectType: 'Functional', severity: 'Major', quantity: 3, description: 'Keyboard keys not responding' },
    { defectType: 'Assembly', severity: 'Minor', quantity: 2, description: 'Loose battery cover' }
  ]},
  { id: 'QC004', workOrderId: 'WO004', workOrderNo: 'WO-2024-004', productName: 'Plastic Housing', checkDate: '2024-01-17', checkTime: '09:00', checkType: 'Dimensional Check', inspector: 'Zeynep QC Technician', sampleSize: 100, defectsFound: 8, defectRate: 8, status: 'passed', notes: 'Dimensional variations within tolerance', defects: [
    { defectType: 'Dimensional', severity: 'Minor', quantity: 8, description: 'Slight thickness variation (+/- 0.2mm)' }
  ]},
];

export const machines: Machine[] = [
  { id: 'MCH001', machineNo: 'CNC-001', machineName: 'CNC Milling Machine', category: 'CNC', manufacturer: 'Haas Automation', model: 'VF-4', serialNo: 'VF4-2022-001', productionLineId: 'LINE004', lineName: 'CNC Machining Line', status: 'maintenance', installDate: '2022-08-15', lastMaintenance: '2024-01-16', nextMaintenance: '2024-02-16', operatingHours: 8520, maintenanceCost: 125000, efficiency: 0, downtime: 120 },
  { id: 'MCH002', machineNo: 'ASM-001', machineName: 'PCB Assembly Robot', category: 'Robotics', manufacturer: 'KUKA', model: 'KR-120', serialNo: 'KR120-2023-005', productionLineId: 'LINE001', lineName: 'Assembly Line 1', status: 'running', installDate: '2023-02-10', lastMaintenance: '2024-01-08', nextMaintenance: '2024-02-08', operatingHours: 6240, maintenanceCost: 45000, efficiency: 95, downtime: 0 },
  { id: 'MCH003', machineNo: 'INJ-001', machineName: 'Injection Molding Machine', category: 'Molding', manufacturer: 'Engel', model: 'e-victory 330', serialNo: 'EV330-2021-012', productionLineId: 'LINE005', lineName: 'Injection Molding 1', status: 'running', installDate: '2021-11-20', lastMaintenance: '2024-01-10', nextMaintenance: '2024-02-10', operatingHours: 12850, maintenanceCost: 185000, efficiency: 90, downtime: 25 },
  { id: 'MCH004', machineNo: 'PKG-001', machineName: 'Automated Packaging Machine', category: 'Packaging', manufacturer: 'Bosch Packaging', model: 'SVE 2520', serialNo: 'SVE-2023-008', productionLineId: 'LINE003', lineName: 'Packaging Line 1', status: 'running', installDate: '2023-04-05', lastMaintenance: '2024-01-12', nextMaintenance: '2024-02-12', operatingHours: 5420, maintenanceCost: 28000, efficiency: 96, downtime: 0 },
  { id: 'MCH005', machineNo: 'CNC-002', machineName: 'CNC Lathe', category: 'CNC', manufacturer: 'DMG MORI', model: 'NLX 2500', serialNo: 'NLX-2022-003', productionLineId: 'LINE004', lineName: 'CNC Machining Line', status: 'idle', installDate: '2022-09-10', lastMaintenance: '2024-01-14', nextMaintenance: '2024-02-14', operatingHours: 7680, maintenanceCost: 95000, efficiency: 0, downtime: 0 },
];

export const maintenanceSchedule: MaintenanceRecord[] = [
  { id: 'MAINT001', machineId: 'MCH001', machineNo: 'CNC-001', machineName: 'CNC Milling Machine', maintenanceType: 'Preventive Maintenance', scheduledDate: '2024-01-16', completedDate: '2024-01-16', status: 'completed', technician: 'Hasan Teknisyen', duration: 120, description: 'Spindle bearing replacement, lubrication, calibration', parts: ['Spindle Bearing Set', 'Lubrication Oil'], cost: 2500, nextMaintenance: '2024-02-16' },
  { id: 'MAINT002', machineId: 'MCH002', machineNo: 'ASM-001', machineName: 'PCB Assembly Robot', maintenanceType: 'Preventive Maintenance', scheduledDate: '2024-02-08', completedDate: null, status: 'scheduled', technician: 'Kemal Teknisyen', duration: 60, description: 'Robot arm calibration, sensor check', parts: [], cost: 0, nextMaintenance: '2024-03-08' },
  { id: 'MAINT003', machineId: 'MCH003', machineNo: 'INJ-001', machineName: 'Injection Molding Machine', maintenanceType: 'Breakdown Repair', scheduledDate: '2024-01-17', completedDate: null, status: 'in-progress', technician: 'Ali Teknisyen', duration: null, description: 'Hydraulic system leak repair', parts: ['Hydraulic Seal Kit'], cost: 1200, nextMaintenance: '2024-02-10' },
  { id: 'MAINT004', machineId: 'MCH004', machineNo: 'PKG-001', machineName: 'Automated Packaging Machine', maintenanceType: 'Preventive Maintenance', scheduledDate: '2024-02-12', completedDate: null, status: 'scheduled', technician: 'Hasan Teknisyen', duration: 45, description: 'Belt tension adjustment, cleaning', parts: [], cost: 0, nextMaintenance: '2024-03-12' },
];

export const productionPlan: ProductionPlan[] = [
  { id: 'PLAN001', planDate: '2024-01-18', productId: 'PROD001', productName: 'Smart TV 55"', plannedQty: 600, productionLineId: 'LINE001', lineName: 'Assembly Line 1', shift: 'Morning Shift', priority: 'high', status: 'scheduled', requiredMaterials: [
    { materialId: 'MAT001', materialName: '55" LCD Panel', required: 600, available: 350, shortage: 250 }
  ]},
  { id: 'PLAN002', planDate: '2024-01-18', productId: 'PROD002', productName: 'Laptop 15.6"', plannedQty: 500, productionLineId: 'LINE002', lineName: 'Assembly Line 2', shift: 'Morning Shift', priority: 'normal', status: 'scheduled', requiredMaterials: [
    { materialId: 'MAT008', materialName: '15.6" LCD Screen', required: 500, available: 150, shortage: 350 },
    { materialId: 'MAT010', materialName: 'CPU - Intel i5', required: 500, available: -180, shortage: 680 }
  ]},
  { id: 'PLAN003', planDate: '2024-01-19', productId: 'PROD003', productName: 'Smartphone X10', plannedQty: 1000, productionLineId: 'LINE001', lineName: 'Assembly Line 1', shift: 'Morning Shift', priority: 'normal', status: 'planned', requiredMaterials: []},
  { id: 'PLAN004', planDate: '2024-01-20', productId: 'PROD001', productName: 'Smart TV 55"', plannedQty: 500, productionLineId: 'LINE001', lineName: 'Assembly Line 1', shift: 'Morning Shift', priority: 'normal', status: 'planned', requiredMaterials: []},
];

export const finishedGoods: FinishedGood[] = [
  { id: 'FG001', productId: 'PROD001', productName: 'Smart TV 55"', batchNo: 'BATCH-TV-005', quantity: 300, unit: 'Units', productionDate: '2024-01-16', expiryDate: null, location: 'Finished Goods - Zone A', status: 'in-stock', reservedQty: 0, availableQty: 300, costPerUnit: 1250, totalValue: 375000, qualityStatus: 'passed' },
  { id: 'FG002', productId: 'PROD002', productName: 'Laptop 15.6"', batchNo: 'BATCH-LAP-001', quantity: 450, unit: 'Units', productionDate: '2024-01-15', expiryDate: null, location: 'Finished Goods - Zone B', status: 'in-stock', reservedQty: 200, availableQty: 250, costPerUnit: 1850, totalValue: 832500, qualityStatus: 'passed' },
  { id: 'FG003', productId: 'PROD001', productName: 'Smart TV 55"', batchNo: 'BATCH-TV-001', quantity: 458, unit: 'Units', productionDate: '2024-01-17', expiryDate: null, location: 'Production - Awaiting QC', status: 'in-production', reservedQty: 0, availableQty: 0, costPerUnit: 1250, totalValue: 572500, qualityStatus: 'pending' },
  { id: 'FG004', productId: 'PART015', productName: 'Plastic Housing', batchNo: 'BATCH-PLS-004', quantity: 875, unit: 'Parts', productionDate: '2024-01-17', expiryDate: null, location: 'Finished Goods - Zone C', status: 'in-stock', reservedQty: 500, availableQty: 375, costPerUnit: 18, totalValue: 15750, qualityStatus: 'passed' },
];

export const wasteRecords: WasteRecord[] = [
  { id: 'WASTE001', workOrderId: 'WO001', workOrderNo: 'WO-2024-001', productName: 'Smart TV 55"', wasteDate: '2024-01-17', wasteType: 'Defective Products', quantity: 5, unit: 'Units', reason: 'Screen defects during assembly', cost: 6250, disposalMethod: 'Recycling', disposedBy: 'Waste Management Team', notes: 'Screens sent for recycling, other parts salvaged' },
  { id: 'WASTE002', workOrderId: 'WO002', workOrderNo: 'WO-2024-002', productName: 'Laptop 15.6"', wasteDate: '2024-01-17', wasteType: 'Defective Products', quantity: 3, unit: 'Units', reason: 'Motherboard failure', cost: 5550, disposalMethod: 'Repair/Rework', disposedBy: 'Repair Department', notes: 'Units sent for motherboard replacement' },
  { id: 'WASTE003', workOrderId: 'WO004', workOrderNo: 'WO-2024-004', productName: 'Plastic Housing', wasteDate: '2024-01-17', wasteType: 'Scrap Material', quantity: 12, unit: 'kg', reason: 'Injection molding flash/excess', cost: 336, disposalMethod: 'Recycling', disposedBy: 'Waste Management Team', notes: 'Plastic scrap sent for re-granulation' },
  { id: 'WASTE004', workOrderId: 'WO001', workOrderNo: 'WO-2024-001', productName: 'Smart TV 55"', wasteDate: '2024-01-17', wasteType: 'Packaging Waste', quantity: 25, unit: 'kg', reason: 'Damaged packaging boxes', cost: 375, disposalMethod: 'Disposal', disposedBy: 'Waste Management Team', notes: 'Cardboard sent to waste facility' },
];

export const shifts: Shift[] = [
  { id: 'SHIFT001', shiftName: 'Morning Shift', startTime: '06:00', endTime: '14:00', duration: 8, status: 'active', days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'] },
  { id: 'SHIFT002', shiftName: 'Evening Shift', startTime: '14:00', endTime: '22:00', duration: 8, status: 'active', days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'] },
  { id: 'SHIFT003', shiftName: 'Night Shift', startTime: '22:00', endTime: '06:00', duration: 8, status: 'active', days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'] },
];

export const shiftAssignments: ShiftAssignment[] = [
  { id: 'ASSIGN001', shiftId: 'SHIFT001', shiftName: 'Morning Shift', date: '2024-01-17', productionLineId: 'LINE001', lineName: 'Assembly Line 1', supervisor: 'Ahmet Yilmaz', workers: 12, status: 'active' },
  { id: 'ASSIGN002', shiftId: 'SHIFT001', shiftName: 'Morning Shift', date: '2024-01-17', productionLineId: 'LINE002', lineName: 'Assembly Line 2', supervisor: 'Fatma Demir', workers: 12, status: 'active' },
  { id: 'ASSIGN003', shiftId: 'SHIFT001', shiftName: 'Morning Shift', date: '2024-01-17', productionLineId: 'LINE003', lineName: 'Packaging Line 1', supervisor: 'Can Arslan', workers: 8, status: 'active' },
  { id: 'ASSIGN004', shiftId: 'SHIFT002', shiftName: 'Evening Shift', date: '2024-01-17', productionLineId: 'LINE001', lineName: 'Assembly Line 1', supervisor: 'Zeynep Kaya', workers: 10, status: 'scheduled' },
];

// Menu items for Sidebar
export const manufacturingMenuItems = [
  { id: 'manufacturing-production', label: 'Production', icon: Factory, path: ROUTES.manufacturing.production, color: MANUFACTURING_COLOR },
  { id: 'manufacturing-work-orders', label: 'Work Orders', icon: ClipboardList, path: ROUTES.manufacturing.workOrders, color: MANUFACTURING_COLOR },
  { id: 'manufacturing-bom', label: 'BOM', icon: Layers, path: ROUTES.manufacturing.bom, color: MANUFACTURING_COLOR },
  { id: 'manufacturing-inventory', label: 'Raw Materials', icon: Package, path: ROUTES.manufacturing.inventory, color: MANUFACTURING_COLOR },
  { id: 'manufacturing-quality', label: 'Quality Control', icon: CheckSquare, path: ROUTES.manufacturing.quality, color: MANUFACTURING_COLOR },
  { id: 'manufacturing-machines', label: 'Machines', icon: Cog, path: ROUTES.manufacturing.machines, color: MANUFACTURING_COLOR },
  { id: 'manufacturing-maintenance', label: 'Maintenance', icon: Wrench, path: ROUTES.manufacturing.maintenance, color: MANUFACTURING_COLOR },
  { id: 'manufacturing-planning', label: 'Planning', icon: CalendarClock, path: ROUTES.manufacturing.planning, color: MANUFACTURING_COLOR },
  { id: 'manufacturing-finished-goods', label: 'Finished Goods', icon: PackageCheck, path: ROUTES.manufacturing.finishedGoods, color: MANUFACTURING_COLOR },
  { id: 'manufacturing-waste', label: 'Waste', icon: Trash2, path: ROUTES.manufacturing.waste, color: MANUFACTURING_COLOR },
  { id: 'manufacturing-shifts', label: 'Shifts', icon: Clock, path: ROUTES.manufacturing.shifts, color: MANUFACTURING_COLOR },
  { id: 'manufacturing-reports', label: 'Reports', icon: BarChart3, path: ROUTES.manufacturing.reports, color: MANUFACTURING_COLOR },
];

export default {
  productionLines,
  workOrders,
  billOfMaterials,
  rawMaterials,
  qualityChecks,
  machines,
  maintenanceSchedule,
  productionPlan,
  finishedGoods,
  wasteRecords,
  shifts,
  shiftAssignments,
  manufacturingMenuItems,
  MANUFACTURING_COLOR,
  MANUFACTURING_COLOR_LIGHT,
  MANUFACTURING_COLOR_DARK,
};
