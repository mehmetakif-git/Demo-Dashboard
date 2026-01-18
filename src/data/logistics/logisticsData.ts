import {
  Truck,
  Route,
  Package,
  Warehouse,
  Users,
  Fuel,
  Wrench,
  MapPin,
  Receipt,
  Building2,
  BarChart3,
  FileCheck,
} from 'lucide-react';
import { ROUTES } from '@/utils/constants';

// Color constants for Logistics sector
export const LOGISTICS_COLOR = '#3b82f6';
export const LOGISTICS_COLOR_LIGHT = '#60a5fa';
export const LOGISTICS_COLOR_DARK = '#2563eb';

// Types
export interface Vehicle {
  id: string;
  plateNo: string;
  type: string;
  make: string;
  model: string;
  year: number;
  capacity: number;
  unit: string;
  fuelType: string;
  status: 'active' | 'on-route' | 'maintenance' | 'out-of-service';
  currentDriver: string | null;
  driverName: string | null;
  currentLocation: string;
  lastMaintenance: string;
  nextMaintenance: string;
  mileage: number;
  ownership: 'owned' | 'leased';
  purchaseDate: string;
  purchaseCost: number;
}

export interface Driver {
  id: string;
  employeeNo: string;
  name: string;
  licenseNo: string;
  licenseExpiry: string;
  phone: string;
  email: string;
  address: string;
  dateOfBirth: string;
  hireDate: string;
  status: 'active' | 'on-leave' | 'inactive';
  currentVehicle: string | null;
  vehiclePlate: string | null;
  rating: number;
  totalTrips: number;
  emergencyContact: string;
  medicalCheckup: string;
  nextMedicalCheckup: string;
}

export interface LogisticsRoute {
  id: string;
  routeName: string;
  origin: string;
  destination: string;
  distance: number;
  duration: number;
  status: 'active' | 'inactive';
  frequency: string;
  assignedVehicles: string[];
  waypoints: string[];
  trafficZone: string;
  tollCost: number;
  preferredTime: string;
}

export interface Shipment {
  id: string;
  trackingNo: string;
  clientId: string;
  clientName: string;
  origin: string;
  destination: string;
  routeId: string;
  vehicleId: string | null;
  vehiclePlate: string | null;
  driverId: string | null;
  driverName: string | null;
  status: 'pending' | 'scheduled' | 'in-transit' | 'delivered' | 'cancelled';
  pickupDate: string;
  pickupTime: string;
  estimatedDelivery: string;
  actualDelivery: string | null;
  weight: number;
  unit: string;
  dimensions: string;
  packageCount: number;
  value: number;
  shippingCost: number;
  priority: 'standard' | 'express';
  specialInstructions: string;
  podRequired: boolean;
  podSignature: string | null;
  currentLocation: string;
}

export interface WarehouseItem {
  id: string;
  itemCode: string;
  itemName: string;
  category: string;
  clientId: string;
  clientName: string;
  quantity: number;
  unit: string;
  location: string;
  dateReceived: string;
  status: 'in-stock' | 'reserved' | 'low-stock';
  value: number;
  weight: number;
  dimensions: string;
  expiryDate: string | null;
  reservedQty: number;
  availableQty: number;
}

export interface FuelRecord {
  id: string;
  vehicleId: string;
  vehiclePlate: string;
  driverId: string;
  driverName: string;
  fuelDate: string;
  fuelTime: string;
  station: string;
  fuelType: string;
  quantity: number;
  unit: string;
  pricePerLiter: number;
  totalCost: number;
  mileage: number;
  fuelEfficiency: number;
  paymentMethod: string;
}

export interface MaintenanceRecord {
  id: string;
  vehicleId: string;
  vehiclePlate: string;
  maintenanceDate: string;
  maintenanceType: string;
  description: string;
  serviceProvider: string;
  cost: number;
  mileage: number;
  nextServiceMileage: number | null;
  status: 'scheduled' | 'in-progress' | 'completed';
  parts: string[];
  laborHours: number;
  downtime: number | null;
}

export interface Client {
  id: string;
  companyName: string;
  contactPerson: string;
  phone: string;
  email: string;
  address: string;
  industry: string;
  status: 'active' | 'inactive';
  creditLimit: number;
  currentBalance: number;
  paymentTerms: string;
  rating: number;
  totalShipments: number;
  joinDate: string;
}

export interface InvoiceItem {
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

export interface Invoice {
  id: string;
  invoiceNo: string;
  clientId: string;
  clientName: string;
  invoiceDate: string;
  dueDate: string;
  shipments: string[];
  items: InvoiceItem[];
  subtotal: number;
  tax: number;
  total: number;
  paidAmount: number;
  balance: number;
  status: 'paid' | 'pending' | 'overdue' | 'cancelled';
  paymentDate: string | null;
  paymentMethod: string | null;
}

export interface ComplianceDocument {
  id: string;
  vehicleId?: string;
  vehiclePlate?: string;
  driverId?: string;
  driverName?: string;
  documentType: string;
  issueDate: string;
  expiryDate: string;
  status: 'valid' | 'expiring-soon' | 'expired';
  authority: string;
  documentNo: string;
  renewalRequired: boolean;
}

// Mock Data
export const vehicles: Vehicle[] = [
  { id: "VEH001", plateNo: "34-ABC-123", type: "Truck", make: "Mercedes", model: "Actros 1844", year: 2022, capacity: 18000, unit: "kg", fuelType: "Diesel", status: "active", currentDriver: "DRV001", driverName: "Ahmet Yilmaz", currentLocation: "Doha Warehouse", lastMaintenance: "2024-01-10", nextMaintenance: "2024-02-10", mileage: 45200, ownership: "owned", purchaseDate: "2022-06-15", purchaseCost: 320000 },
  { id: "VEH002", plateNo: "34-DEF-456", type: "Van", make: "Ford", model: "Transit", year: 2023, capacity: 3500, unit: "kg", fuelType: "Diesel", status: "on-route", currentDriver: "DRV002", driverName: "Fatma Demir", currentLocation: "En Route - Al Khor", lastMaintenance: "2024-01-12", nextMaintenance: "2024-02-12", mileage: 28500, ownership: "leased", purchaseDate: "2023-03-20", purchaseCost: 95000 },
  { id: "VEH003", plateNo: "34-GHI-789", type: "Truck", make: "Volvo", model: "FH16", year: 2021, capacity: 20000, unit: "kg", fuelType: "Diesel", status: "on-route", currentDriver: "DRV003", driverName: "Can Arslan", currentLocation: "En Route - Industrial Area", lastMaintenance: "2024-01-08", nextMaintenance: "2024-02-08", mileage: 62400, ownership: "owned", purchaseDate: "2021-09-10", purchaseCost: 380000 },
  { id: "VEH004", plateNo: "34-JKL-012", type: "Van", make: "Mercedes", model: "Sprinter", year: 2023, capacity: 2500, unit: "kg", fuelType: "Diesel", status: "maintenance", currentDriver: null, driverName: null, currentLocation: "Service Center", lastMaintenance: "2024-01-16", nextMaintenance: "2024-02-16", mileage: 18200, ownership: "leased", purchaseDate: "2023-05-15", purchaseCost: 85000 },
  { id: "VEH005", plateNo: "34-MNO-345", type: "Truck", make: "Scania", model: "R450", year: 2022, capacity: 22000, unit: "kg", fuelType: "Diesel", status: "active", currentDriver: "DRV004", driverName: "Zeynep Kaya", currentLocation: "Doha Warehouse", lastMaintenance: "2024-01-14", nextMaintenance: "2024-02-14", mileage: 51800, ownership: "owned", purchaseDate: "2022-11-05", purchaseCost: 350000 },
  { id: "VEH006", plateNo: "34-PQR-678", type: "Pickup", make: "Toyota", model: "Hilux", year: 2024, capacity: 1000, unit: "kg", fuelType: "Diesel", status: "active", currentDriver: "DRV005", driverName: "Mehmet Oz", currentLocation: "Office", lastMaintenance: "2024-01-05", nextMaintenance: "2024-02-05", mileage: 8500, ownership: "owned", purchaseDate: "2024-01-02", purchaseCost: 125000 }
];

export const drivers: Driver[] = [
  { id: "DRV001", employeeNo: "EMP-D001", name: "Ahmet Yilmaz", licenseNo: "TR-123456789", licenseExpiry: "2026-12-31", phone: "+974 5555 4001", email: "ahmet.driver@logistics.qa", address: "Ataturk Cad. Doha", dateOfBirth: "1985-03-15", hireDate: "2020-06-01", status: "active", currentVehicle: "VEH001", vehiclePlate: "34-ABC-123", rating: 4.8, totalTrips: 1250, emergencyContact: "Ayse Yilmaz - +974 5555 4002", medicalCheckup: "2023-11-20", nextMedicalCheckup: "2024-11-20" },
  { id: "DRV002", employeeNo: "EMP-D002", name: "Fatma Demir", licenseNo: "TR-987654321", licenseExpiry: "2027-06-30", phone: "+974 5555 4003", email: "fatma.driver@logistics.qa", address: "Merkez Mah. Doha", dateOfBirth: "1990-07-22", hireDate: "2021-03-15", status: "active", currentVehicle: "VEH002", vehiclePlate: "34-DEF-456", rating: 4.9, totalTrips: 850, emergencyContact: "Ali Demir - +974 5555 4004", medicalCheckup: "2023-12-10", nextMedicalCheckup: "2024-12-10" },
  { id: "DRV003", employeeNo: "EMP-D003", name: "Can Arslan", licenseNo: "TR-456789123", licenseExpiry: "2025-09-30", phone: "+974 5555 4005", email: "can.driver@logistics.qa", address: "Yeni Mah. Doha", dateOfBirth: "1988-11-08", hireDate: "2019-08-20", status: "active", currentVehicle: "VEH003", vehiclePlate: "34-GHI-789", rating: 4.7, totalTrips: 1580, emergencyContact: "Elif Arslan - +974 5555 4006", medicalCheckup: "2023-10-15", nextMedicalCheckup: "2024-10-15" },
  { id: "DRV004", employeeNo: "EMP-D004", name: "Zeynep Kaya", licenseNo: "TR-789123456", licenseExpiry: "2026-03-31", phone: "+974 5555 4007", email: "zeynep.driver@logistics.qa", address: "Sahil Cad. Doha", dateOfBirth: "1992-05-30", hireDate: "2022-01-10", status: "active", currentVehicle: "VEH005", vehiclePlate: "34-MNO-345", rating: 4.6, totalTrips: 520, emergencyContact: "Burak Kaya - +974 5555 4008", medicalCheckup: "2024-01-05", nextMedicalCheckup: "2025-01-05" },
  { id: "DRV005", employeeNo: "EMP-D005", name: "Mehmet Oz", licenseNo: "TR-321654987", licenseExpiry: "2027-12-31", phone: "+974 5555 4009", email: "mehmet.driver@logistics.qa", address: "Kultur Mah. Doha", dateOfBirth: "1995-09-18", hireDate: "2023-06-01", status: "active", currentVehicle: "VEH006", vehiclePlate: "34-PQR-678", rating: 4.5, totalTrips: 180, emergencyContact: "Ayse Oz - +974 5555 4010", medicalCheckup: "2023-09-10", nextMedicalCheckup: "2024-09-10" },
  { id: "DRV006", employeeNo: "EMP-D006", name: "Hasan Yurt", licenseNo: "TR-654987321", licenseExpiry: "2025-06-30", phone: "+974 5555 4011", email: "hasan.driver@logistics.qa", address: "Doha Central", dateOfBirth: "1987-12-12", hireDate: "2020-09-15", status: "on-leave", currentVehicle: null, vehiclePlate: null, rating: 4.7, totalTrips: 1120, emergencyContact: "Zehra Yurt - +974 5555 4012", medicalCheckup: "2023-08-20", nextMedicalCheckup: "2024-08-20" }
];

export const routes: LogisticsRoute[] = [
  { id: "ROUTE001", routeName: "Doha - Al Khor Express", origin: "Doha Warehouse", destination: "Al Khor Distribution Center", distance: 52, duration: 45, status: "active", frequency: "Daily", assignedVehicles: ["VEH002"], waypoints: ["Al Corniche", "Lusail"], trafficZone: "Highway", tollCost: 0, preferredTime: "08:00-18:00" },
  { id: "ROUTE002", routeName: "Industrial Area Circuit", origin: "Doha Warehouse", destination: "Industrial Area Zone 1", distance: 18, duration: 25, status: "active", frequency: "Multiple Daily", assignedVehicles: ["VEH003", "VEH005"], waypoints: ["Salwa Road", "Industrial Gate 2"], trafficZone: "City", tollCost: 0, preferredTime: "06:00-22:00" },
  { id: "ROUTE003", routeName: "West Bay Business District", origin: "Doha Warehouse", destination: "West Bay", distance: 12, duration: 20, status: "active", frequency: "As Needed", assignedVehicles: ["VEH002"], waypoints: ["Corniche", "City Center"], trafficZone: "City", tollCost: 0, preferredTime: "09:00-17:00" },
  { id: "ROUTE004", routeName: "Doha - Mesaieed Route", origin: "Doha Warehouse", destination: "Mesaieed Industrial City", distance: 48, duration: 40, status: "active", frequency: "Weekly", assignedVehicles: ["VEH001"], waypoints: ["Salwa Road", "Mesaieed Gate"], trafficZone: "Highway", tollCost: 0, preferredTime: "07:00-19:00" }
];

export const shipments: Shipment[] = [
  { id: "SHIP001", trackingNo: "QTR-2024-001", clientId: "CLI001", clientName: "Qatar Electronics Co.", origin: "Doha Warehouse", destination: "Al Khor Distribution Center", routeId: "ROUTE001", vehicleId: "VEH002", vehiclePlate: "34-DEF-456", driverId: "DRV002", driverName: "Fatma Demir", status: "in-transit", pickupDate: "2024-01-17", pickupTime: "08:30", estimatedDelivery: "2024-01-17 10:00", actualDelivery: null, weight: 2800, unit: "kg", dimensions: "120x80x100 cm", packageCount: 15, value: 125000, shippingCost: 850, priority: "standard", specialInstructions: "Fragile - Handle with care", podRequired: true, podSignature: null, currentLocation: "En Route - Lusail" },
  { id: "SHIP002", trackingNo: "QTR-2024-002", clientId: "CLI002", clientName: "Doha Retail Group", origin: "Doha Warehouse", destination: "Industrial Area Zone 1", routeId: "ROUTE002", vehicleId: "VEH003", vehiclePlate: "34-GHI-789", driverId: "DRV003", driverName: "Can Arslan", status: "in-transit", pickupDate: "2024-01-17", pickupTime: "09:00", estimatedDelivery: "2024-01-17 10:30", actualDelivery: null, weight: 8500, unit: "kg", dimensions: "Multiple packages", packageCount: 45, value: 85000, shippingCost: 1200, priority: "standard", specialInstructions: "", podRequired: true, podSignature: null, currentLocation: "En Route - Salwa Road" },
  { id: "SHIP003", trackingNo: "QTR-2024-003", clientId: "CLI003", clientName: "Gulf Pharmaceuticals", origin: "Doha Warehouse", destination: "West Bay", routeId: "ROUTE003", vehicleId: "VEH002", vehiclePlate: "34-DEF-456", driverId: "DRV002", driverName: "Fatma Demir", status: "delivered", pickupDate: "2024-01-16", pickupTime: "11:00", estimatedDelivery: "2024-01-16 12:00", actualDelivery: "2024-01-16 11:55", weight: 450, unit: "kg", dimensions: "80x60x40 cm", packageCount: 8, value: 45000, shippingCost: 600, priority: "express", specialInstructions: "Temperature controlled required", podRequired: true, podSignature: "Ahmed Receiver", currentLocation: "Delivered" },
  { id: "SHIP004", trackingNo: "QTR-2024-004", clientId: "CLI004", clientName: "Qatar Construction Supplies", origin: "Doha Warehouse", destination: "Mesaieed Industrial City", routeId: "ROUTE004", vehicleId: "VEH001", vehiclePlate: "34-ABC-123", driverId: "DRV001", driverName: "Ahmet Yilmaz", status: "scheduled", pickupDate: "2024-01-18", pickupTime: "07:00", estimatedDelivery: "2024-01-18 08:30", actualDelivery: null, weight: 15000, unit: "kg", dimensions: "Pallet - 200x120x150 cm", packageCount: 12, value: 180000, shippingCost: 2500, priority: "standard", specialInstructions: "Requires forklift at destination", podRequired: true, podSignature: null, currentLocation: "Warehouse - Ready for Pickup" },
  { id: "SHIP005", trackingNo: "QTR-2024-005", clientId: "CLI001", clientName: "Qatar Electronics Co.", origin: "Doha Warehouse", destination: "Al Khor Distribution Center", routeId: "ROUTE001", vehicleId: null, vehiclePlate: null, driverId: null, driverName: null, status: "pending", pickupDate: "2024-01-19", pickupTime: "08:00", estimatedDelivery: "2024-01-19 09:30", actualDelivery: null, weight: 3200, unit: "kg", dimensions: "140x90x110 cm", packageCount: 18, value: 140000, shippingCost: 900, priority: "standard", specialInstructions: "", podRequired: true, podSignature: null, currentLocation: "Warehouse - Awaiting Assignment" }
];

export const warehouseInventory: WarehouseItem[] = [
  { id: "INV001", itemCode: "ELEC-001", itemName: "LED TV 55 inch", category: "Electronics", clientId: "CLI001", clientName: "Qatar Electronics Co.", quantity: 85, unit: "Units", location: "Zone A - Shelf 12", dateReceived: "2024-01-10", status: "in-stock", value: 127500, weight: 850, dimensions: "125x75x10 cm", expiryDate: null, reservedQty: 15, availableQty: 70 },
  { id: "INV002", itemCode: "FURN-025", itemName: "Office Chair - Executive", category: "Furniture", clientId: "CLI002", clientName: "Doha Retail Group", quantity: 120, unit: "Units", location: "Zone B - Row 5", dateReceived: "2024-01-08", status: "in-stock", value: 96000, weight: 1200, dimensions: "65x65x120 cm", expiryDate: null, reservedQty: 45, availableQty: 75 },
  { id: "INV003", itemCode: "PHAR-140", itemName: "Medical Supplies - Sterile Gloves", category: "Pharmaceuticals", clientId: "CLI003", clientName: "Gulf Pharmaceuticals", quantity: 500, unit: "Boxes", location: "Zone C - Climate Controlled", dateReceived: "2024-01-12", status: "in-stock", value: 75000, weight: 250, dimensions: "30x20x15 cm", expiryDate: "2026-01-12", reservedQty: 8, availableQty: 492 },
  { id: "INV004", itemCode: "CONS-088", itemName: "Cement Bags - Type I", category: "Construction", clientId: "CLI004", clientName: "Qatar Construction Supplies", quantity: 2000, unit: "Bags", location: "Yard - Section D", dateReceived: "2024-01-05", status: "in-stock", value: 50000, weight: 100000, dimensions: "50x30x10 cm", expiryDate: null, reservedQty: 12, availableQty: 1988 },
  { id: "INV005", itemCode: "ELEC-015", itemName: "Laptop - Business Series", category: "Electronics", clientId: "CLI001", clientName: "Qatar Electronics Co.", quantity: 45, unit: "Units", location: "Zone A - Shelf 8", dateReceived: "2024-01-14", status: "in-stock", value: 135000, weight: 180, dimensions: "40x30x5 cm", expiryDate: null, reservedQty: 18, availableQty: 27 }
];

export const fuelRecords: FuelRecord[] = [
  { id: "FUEL001", vehicleId: "VEH001", vehiclePlate: "34-ABC-123", driverId: "DRV001", driverName: "Ahmet Yilmaz", fuelDate: "2024-01-16", fuelTime: "14:30", station: "Woqod - Salwa Road", fuelType: "Diesel", quantity: 185, unit: "Liters", pricePerLiter: 1.85, totalCost: 342.25, mileage: 45050, fuelEfficiency: 7.2, paymentMethod: "Company Card" },
  { id: "FUEL002", vehicleId: "VEH002", vehiclePlate: "34-DEF-456", driverId: "DRV002", driverName: "Fatma Demir", fuelDate: "2024-01-17", fuelTime: "09:15", station: "Woqod - Al Khor", fuelType: "Diesel", quantity: 55, unit: "Liters", pricePerLiter: 1.85, totalCost: 101.75, mileage: 28480, fuelEfficiency: 8.5, paymentMethod: "Company Card" },
  { id: "FUEL003", vehicleId: "VEH003", vehiclePlate: "34-GHI-789", driverId: "DRV003", driverName: "Can Arslan", fuelDate: "2024-01-15", fuelTime: "16:45", station: "Woqod - Industrial Area", fuelType: "Diesel", quantity: 210, unit: "Liters", pricePerLiter: 1.85, totalCost: 388.50, mileage: 62280, fuelEfficiency: 6.8, paymentMethod: "Company Card" },
  { id: "FUEL004", vehicleId: "VEH005", vehiclePlate: "34-MNO-345", driverId: "DRV004", driverName: "Zeynep Kaya", fuelDate: "2024-01-17", fuelTime: "08:00", station: "Woqod - Doha", fuelType: "Diesel", quantity: 195, unit: "Liters", pricePerLiter: 1.85, totalCost: 360.75, mileage: 51750, fuelEfficiency: 7.0, paymentMethod: "Company Card" }
];

export const maintenanceRecords: MaintenanceRecord[] = [
  { id: "MAINT001", vehicleId: "VEH001", vehiclePlate: "34-ABC-123", maintenanceDate: "2024-01-10", maintenanceType: "Routine Service", description: "Oil change, filter replacement, tire rotation", serviceProvider: "Mercedes Service Center", cost: 1200, mileage: 45000, nextServiceMileage: 50000, status: "completed", parts: ["Engine Oil 15W-40", "Oil Filter", "Air Filter"], laborHours: 2.5, downtime: 4 },
  { id: "MAINT002", vehicleId: "VEH004", vehiclePlate: "34-JKL-012", maintenanceDate: "2024-01-16", maintenanceType: "Repair", description: "Brake pad replacement, front and rear", serviceProvider: "Auto Care Workshop", cost: 850, mileage: 18200, nextServiceMileage: 23200, status: "in-progress", parts: ["Brake Pads - Front", "Brake Pads - Rear"], laborHours: 3, downtime: null },
  { id: "MAINT003", vehicleId: "VEH003", vehiclePlate: "34-GHI-789", maintenanceDate: "2024-01-08", maintenanceType: "Routine Service", description: "Full service - oil, filters, brake check", serviceProvider: "Volvo Service Center", cost: 1450, mileage: 62000, nextServiceMileage: 67000, status: "completed", parts: ["Engine Oil", "Oil Filter", "Fuel Filter", "Cabin Filter"], laborHours: 3.5, downtime: 5 },
  { id: "MAINT004", vehicleId: "VEH002", vehiclePlate: "34-DEF-456", maintenanceDate: "2024-01-12", maintenanceType: "Inspection", description: "Pre-trip safety inspection", serviceProvider: "In-house Inspection", cost: 0, mileage: 28450, nextServiceMileage: null, status: "completed", parts: [], laborHours: 1, downtime: 1 }
];

export const clients: Client[] = [
  { id: "CLI001", companyName: "Qatar Electronics Co.", contactPerson: "Ahmed Hassan", phone: "+974 5555 5001", email: "ahmed@qatarelectronics.qa", address: "West Bay, Doha", industry: "Electronics", status: "active", creditLimit: 500000, currentBalance: 125000, paymentTerms: "Net 30", rating: 4.8, totalShipments: 142, joinDate: "2022-03-15" },
  { id: "CLI002", companyName: "Doha Retail Group", contactPerson: "Mohammed Ali", phone: "+974 5555 5002", email: "mohammed@doharetail.qa", address: "Industrial Area, Doha", industry: "Retail", status: "active", creditLimit: 300000, currentBalance: 85000, paymentTerms: "Net 30", rating: 4.6, totalShipments: 98, joinDate: "2021-08-20" },
  { id: "CLI003", companyName: "Gulf Pharmaceuticals", contactPerson: "Dr. Fatma Youssef", phone: "+974 5555 5003", email: "fatma@gulfpharma.qa", address: "Al Sadd, Doha", industry: "Pharmaceuticals", status: "active", creditLimit: 400000, currentBalance: 45000, paymentTerms: "Net 15", rating: 4.9, totalShipments: 215, joinDate: "2020-05-10" },
  { id: "CLI004", companyName: "Qatar Construction Supplies", contactPerson: "Eng. Khalid Rahman", phone: "+974 5555 5004", email: "khalid@qcsupplies.qa", address: "Mesaieed, Qatar", industry: "Construction", status: "active", creditLimit: 600000, currentBalance: 180000, paymentTerms: "Net 45", rating: 4.5, totalShipments: 76, joinDate: "2022-11-05" },
  { id: "CLI005", companyName: "Lusail Trading LLC", contactPerson: "Saeed Abdullah", phone: "+974 5555 5005", email: "saeed@lusailtrading.qa", address: "Lusail City", industry: "General Trading", status: "active", creditLimit: 250000, currentBalance: 0, paymentTerms: "Net 30", rating: 4.7, totalShipments: 35, joinDate: "2023-06-01" }
];

export const invoices: Invoice[] = [
  { id: "INV001", invoiceNo: "QTL-2024-001", clientId: "CLI001", clientName: "Qatar Electronics Co.", invoiceDate: "2024-01-10", dueDate: "2024-02-09", shipments: ["SHIP003"], items: [{ description: "Freight - Doha to West Bay", quantity: 1, unitPrice: 600, total: 600 }], subtotal: 600, tax: 0, total: 600, paidAmount: 600, balance: 0, status: "paid", paymentDate: "2024-01-15", paymentMethod: "Bank Transfer" },
  { id: "INV002", invoiceNo: "QTL-2024-002", clientId: "CLI002", clientName: "Doha Retail Group", invoiceDate: "2024-01-12", dueDate: "2024-02-11", shipments: ["SHIP002"], items: [{ description: "Freight - Doha to Industrial Area", quantity: 1, unitPrice: 1200, total: 1200 }, { description: "Handling Fee", quantity: 45, unitPrice: 5, total: 225 }], subtotal: 1425, tax: 0, total: 1425, paidAmount: 0, balance: 1425, status: "pending", paymentDate: null, paymentMethod: null },
  { id: "INV003", invoiceNo: "QTL-2024-003", clientId: "CLI004", clientName: "Qatar Construction Supplies", invoiceDate: "2024-01-14", dueDate: "2024-02-28", shipments: ["SHIP004"], items: [{ description: "Freight - Doha to Mesaieed", quantity: 1, unitPrice: 2500, total: 2500 }, { description: "Heavy Load Surcharge", quantity: 1, unitPrice: 300, total: 300 }], subtotal: 2800, tax: 0, total: 2800, paidAmount: 0, balance: 2800, status: "pending", paymentDate: null, paymentMethod: null }
];

export const complianceDocuments: ComplianceDocument[] = [
  { id: "COMP001", vehicleId: "VEH001", vehiclePlate: "34-ABC-123", documentType: "Vehicle Registration", issueDate: "2023-06-15", expiryDate: "2024-06-15", status: "valid", authority: "Qatar Traffic Department", documentNo: "REG-2023-12345", renewalRequired: true },
  { id: "COMP002", vehicleId: "VEH001", vehiclePlate: "34-ABC-123", documentType: "Insurance", issueDate: "2024-01-01", expiryDate: "2025-01-01", status: "valid", authority: "Qatar Insurance Company", documentNo: "INS-2024-67890", renewalRequired: false },
  { id: "COMP003", vehicleId: "VEH002", vehiclePlate: "34-DEF-456", documentType: "Vehicle Registration", issueDate: "2023-03-20", expiryDate: "2024-03-20", status: "expiring-soon", authority: "Qatar Traffic Department", documentNo: "REG-2023-54321", renewalRequired: true },
  { id: "COMP004", driverId: "DRV001", driverName: "Ahmet Yilmaz", documentType: "Driving License", issueDate: "2022-01-01", expiryDate: "2026-12-31", status: "valid", authority: "Traffic Department", documentNo: "TR-123456789", renewalRequired: false },
  { id: "COMP005", driverId: "DRV003", driverName: "Can Arslan", documentType: "Driving License", issueDate: "2020-10-01", expiryDate: "2025-09-30", status: "expiring-soon", authority: "Traffic Department", documentNo: "TR-456789123", renewalRequired: true }
];

// Menu Items for Sidebar
export const logisticsMenuItems = [
  { id: 'logistics-fleet', label: 'Fleet', icon: Truck, path: ROUTES.logistics.fleet },
  { id: 'logistics-routes', label: 'Routes', icon: Route, path: ROUTES.logistics.routes },
  { id: 'logistics-shipments', label: 'Shipments', icon: Package, path: ROUTES.logistics.shipments },
  { id: 'logistics-warehouse', label: 'Warehouse', icon: Warehouse, path: ROUTES.logistics.warehouse },
  { id: 'logistics-drivers', label: 'Drivers', icon: Users, path: ROUTES.logistics.drivers },
  { id: 'logistics-fuel', label: 'Fuel', icon: Fuel, path: ROUTES.logistics.fuel },
  { id: 'logistics-maintenance', label: 'Maintenance', icon: Wrench, path: ROUTES.logistics.maintenance },
  { id: 'logistics-tracking', label: 'Tracking', icon: MapPin, path: ROUTES.logistics.tracking },
  { id: 'logistics-invoicing', label: 'Invoicing', icon: Receipt, path: ROUTES.logistics.invoicing },
  { id: 'logistics-clients', label: 'Clients', icon: Building2, path: ROUTES.logistics.clients },
  { id: 'logistics-reports', label: 'Reports', icon: BarChart3, path: ROUTES.logistics.reports },
  { id: 'logistics-compliance', label: 'Compliance', icon: FileCheck, path: ROUTES.logistics.compliance },
];
