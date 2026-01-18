import {
  Building,
  Home,
  Users,
  Eye,
  Handshake,
  FileSignature,
  DollarSign,
  UserCheck,
  User,
  Wrench,
  CreditCard,
  BarChart3,
} from 'lucide-react';
import { ROUTES } from '@/utils/constants';

// Color constants for Real Estate sector
export const REALESTATE_COLOR = '#10b981'; // emerald-500
export const REALESTATE_COLOR_LIGHT = '#34d399'; // emerald-400
export const REALESTATE_COLOR_DARK = '#059669'; // emerald-600

// Types
export interface Property {
  id: string;
  propertyCode: string;
  propertyType: 'Apartment' | 'Villa' | 'Office' | 'Warehouse' | 'Land';
  listingType: 'For Sale' | 'For Rent';
  title: string;
  location: string;
  address: string;
  bedrooms: number | null;
  bathrooms: number;
  area: number;
  unit: string;
  price: number | null;
  rentPrice: number | null;
  status: 'available' | 'rented' | 'under-offer' | 'sold';
  furnished: 'Fully Furnished' | 'Furnished' | 'Semi-Furnished' | 'Unfurnished';
  parking: number;
  amenities: string[];
  ownerType: 'landlord' | 'developer' | 'investor';
  ownerId: string;
  ownerName: string;
  agentId: string;
  agentName: string;
  listedDate: string;
  yearBuilt: number;
  description: string;
  features: string[];
  photos: number;
  currentTenantId?: string;
  leaseStart?: string;
  leaseEnd?: string;
  offerId?: string;
}

export interface Lead {
  id: string;
  leadNo: string;
  name: string;
  email: string;
  phone: string;
  leadSource: 'Website' | 'Referral' | 'Cold Call' | 'Walk-in' | 'Social Media';
  leadType: 'Buyer' | 'Seller' | 'Tenant' | 'Landlord';
  lookingFor: string;
  budget: number;
  minBedrooms: number | null;
  preferredLocations: string[];
  status: 'new' | 'contacted' | 'qualified' | 'viewing-scheduled' | 'converted' | 'lost';
  priority: 'high' | 'normal' | 'low';
  assignedAgent: string;
  agentName: string;
  createdDate: string;
  lastContact: string;
  nextFollowUp: string | null;
  notes: string;
}

export interface Viewing {
  id: string;
  propertyId: string;
  propertyCode: string;
  propertyTitle: string;
  leadId: string;
  leadName: string;
  viewingDate: string;
  viewingTime: string;
  duration: number;
  agentId: string;
  agentName: string;
  status: 'scheduled' | 'completed' | 'cancelled' | 'no-show';
  type: 'In-Person' | 'Virtual';
  meetingPoint: string;
  feedback: string | null;
  interested: boolean | null;
  notes: string;
}

export interface Offer {
  id: string;
  offerNo: string;
  propertyId: string;
  propertyCode: string;
  propertyTitle: string;
  buyerName: string;
  leadId: string | null;
  offerDate: string;
  offerType: 'Purchase' | 'Rental';
  offeredAmount: number;
  askingAmount: number;
  status: 'pending' | 'negotiating' | 'accepted' | 'rejected' | 'expired';
  validUntil: string;
  agentId: string;
  agentName: string;
  notes: string;
  counterOffer: number | null;
  ownerResponse: string | null;
}

export interface Contract {
  id: string;
  contractNo: string;
  contractType: 'Sale Agreement' | 'Lease Agreement';
  propertyId: string;
  propertyCode: string;
  propertyTitle: string;
  clientType: 'Buyer' | 'Tenant';
  clientName: string;
  ownerName: string;
  salePrice: number | null;
  rentAmount: number | null;
  contractDate: string;
  completionDate?: string;
  leaseStart?: string;
  leaseEnd?: string;
  leaseTerm?: number;
  status: 'pending-completion' | 'active' | 'completed' | 'cancelled';
  agentId: string;
  agentName: string;
  commission: number;
  commissionRate: number;
  depositPaid: number;
  balanceDue?: number;
  securityDeposit?: number;
  specialConditions: string | null;
  notes: string;
}

export interface Tenant {
  id: string;
  tenantNo: string;
  name: string;
  email: string;
  phone: string;
  idType: string;
  idNo: string;
  nationality: string;
  occupation: string;
  emergencyContact: string;
  propertyId: string;
  propertyCode: string;
  propertyTitle: string;
  leaseStart: string;
  leaseEnd: string;
  monthlyRent: number;
  securityDeposit: number;
  status: 'active' | 'expired' | 'terminated';
  moveInDate: string;
  notes: string;
}

export interface Landlord {
  id: string;
  landlordNo: string;
  name: string;
  type: 'Individual' | 'Corporate' | 'Developer';
  email: string;
  phone: string;
  address: string;
  idType: string;
  idNo: string;
  nationality: string;
  bankName: string;
  accountNo: string;
  properties: string[];
  totalProperties: number;
  activeTenancies: number;
  status: 'active' | 'inactive';
  notes: string;
}

export interface MaintenanceRequest {
  id: string;
  requestNo: string;
  propertyId: string;
  propertyCode: string;
  propertyTitle: string;
  tenantId: string;
  tenantName: string;
  category: 'Plumbing' | 'Electrical' | 'AC/HVAC' | 'General' | 'Carpentry' | 'Painting';
  priority: 'urgent' | 'high' | 'normal' | 'low';
  subject: string;
  description: string;
  reportedDate: string;
  status: 'pending' | 'assigned' | 'in-progress' | 'completed' | 'cancelled';
  assignedTo: string | null;
  scheduledDate: string | null;
  completedDate: string | null;
  estimatedCost: number;
  actualCost: number | null;
  notes: string;
}

export interface Payment {
  id: string;
  paymentNo: string;
  paymentType: 'Rent' | 'Security Deposit' | 'Commission' | 'Other';
  propertyId: string;
  propertyCode: string;
  tenantId: string | null;
  tenantName: string | null;
  landlordId: string;
  landlordName: string;
  dueDate: string;
  amount: number;
  paidAmount: number;
  paymentDate: string | null;
  paymentMethod: 'Bank Transfer' | 'Cash' | 'Cheque' | 'Card' | null;
  status: 'paid' | 'pending' | 'overdue';
  referenceNo: string | null;
  lateFee: number;
  notes: string;
}

export interface Agent {
  id: string;
  agentNo: string;
  name: string;
  email: string;
  phone: string;
  licenseNo: string;
  licenseExpiry: string;
  specialization: string[];
  activeListings: number;
  totalSales: number;
  totalCommission: number;
  status: 'active' | 'inactive';
  joinDate: string;
}

// Mock Data
export const properties: Property[] = [
  { id: 'PROP001', propertyCode: 'WB-APT-2401', propertyType: 'Apartment', listingType: 'For Sale', title: 'Luxury 3BR Apartment - West Bay', location: 'West Bay', address: 'Tower 15, Floor 25, West Bay, Doha', bedrooms: 3, bathrooms: 2, area: 180, unit: 'sqm', price: 2500000, rentPrice: null, status: 'available', furnished: 'Fully Furnished', parking: 2, amenities: ['Pool', 'Gym', 'Security', 'Sea View'], ownerType: 'landlord', ownerId: 'LAND001', ownerName: 'Ahmed Al-Mansouri', agentId: 'AGENT001', agentName: 'Fatma Yilmaz', listedDate: '2024-01-10', yearBuilt: 2020, description: 'Stunning 3-bedroom apartment with breathtaking sea views', features: ['Balcony', 'Built-in Wardrobes', 'Central AC', 'Kitchen Appliances'], photos: 12 },
  { id: 'PROP002', propertyCode: 'PRL-VIL-2402', propertyType: 'Villa', listingType: 'For Rent', title: 'Modern 5BR Villa - The Pearl', location: 'The Pearl', address: 'Qanat Quartier, Villa 45, The Pearl, Doha', bedrooms: 5, bathrooms: 4, area: 450, unit: 'sqm', price: null, rentPrice: 28000, status: 'rented', furnished: 'Unfurnished', parking: 3, amenities: ['Private Pool', 'Garden', 'Maid Room', 'Marina View'], ownerType: 'landlord', ownerId: 'LAND002', ownerName: 'Khalid Trading LLC', agentId: 'AGENT002', agentName: 'Mehmet Demir', listedDate: '2023-12-15', yearBuilt: 2019, description: 'Spacious family villa in prime location', features: ['Private Garden', 'Maid Room', 'Storage', 'BBQ Area'], photos: 18, currentTenantId: 'TEN001', leaseStart: '2024-01-01', leaseEnd: '2024-12-31' },
  { id: 'PROP003', propertyCode: 'LSL-OFF-2403', propertyType: 'Office', listingType: 'For Sale', title: 'Premium Office Space - Lusail', location: 'Lusail City', address: 'Marina District, Building 7, Floor 12, Lusail', bedrooms: null, bathrooms: 2, area: 320, unit: 'sqm', price: 4800000, rentPrice: null, status: 'under-offer', furnished: 'Unfurnished', parking: 5, amenities: ['Reception', 'Meeting Rooms', 'Pantry', 'City View'], ownerType: 'developer', ownerId: 'DEV001', ownerName: 'Lusail Developments', agentId: 'AGENT001', agentName: 'Fatma Yilmaz', listedDate: '2024-01-08', yearBuilt: 2021, description: 'Grade A office space in Lusail business district', features: ['Raised Flooring', 'Suspended Ceiling', 'VRV AC', 'High-speed Internet'], photos: 10, offerId: 'OFF002' },
  { id: 'PROP004', propertyCode: 'WB-APT-2404', propertyType: 'Apartment', listingType: 'For Rent', title: '2BR Apartment - West Bay', location: 'West Bay', address: 'Sky Tower, Floor 18, West Bay, Doha', bedrooms: 2, bathrooms: 2, area: 120, unit: 'sqm', price: null, rentPrice: 9500, status: 'available', furnished: 'Furnished', parking: 1, amenities: ['Pool', 'Gym', 'Concierge'], ownerType: 'investor', ownerId: 'INV001', ownerName: 'Can Arslan', agentId: 'AGENT003', agentName: 'Zeynep Kaya', listedDate: '2024-01-12', yearBuilt: 2018, description: 'Contemporary 2-bedroom apartment with modern finishes', features: ['Balcony', 'Open Kitchen', 'Master En-suite'], photos: 8 },
  { id: 'PROP005', propertyCode: 'IND-WH-2405', propertyType: 'Warehouse', listingType: 'For Rent', title: 'Industrial Warehouse - Industrial Area', location: 'Industrial Area', address: 'Street 45, Plot 12, Industrial Area, Doha', bedrooms: null, bathrooms: 2, area: 2000, unit: 'sqm', price: null, rentPrice: 45000, status: 'available', furnished: 'Unfurnished', parking: 10, amenities: ['Loading Dock', 'Office Space', '24/7 Access'], ownerType: 'landlord', ownerId: 'LAND003', ownerName: 'Industrial Properties LLC', agentId: 'AGENT002', agentName: 'Mehmet Demir', listedDate: '2024-01-05', yearBuilt: 2015, description: 'Large warehouse with excellent logistics access', features: ['High Ceiling', 'Roller Shutter', 'Office Mezzanine'], photos: 6 },
];

export const leads: Lead[] = [
  { id: 'LEAD001', leadNo: 'L-2024-001', name: 'Ali Hassan', email: 'ali.hassan@email.com', phone: '+974 5555 8001', leadSource: 'Website', leadType: 'Buyer', lookingFor: 'Apartment', budget: 2000000, minBedrooms: 3, preferredLocations: ['West Bay', 'The Pearl'], status: 'new', priority: 'high', assignedAgent: 'AGENT001', agentName: 'Fatma Yilmaz', createdDate: '2024-01-16', lastContact: '2024-01-16', nextFollowUp: '2024-01-18', notes: 'Looking for sea view apartment, ready buyer' },
  { id: 'LEAD002', leadNo: 'L-2024-002', name: 'Sarah Al-Thani', email: 'sarah@company.qa', phone: '+974 5555 8002', leadSource: 'Referral', leadType: 'Tenant', lookingFor: 'Villa', budget: 30000, minBedrooms: 4, preferredLocations: ['The Pearl', 'Lusail'], status: 'contacted', priority: 'normal', assignedAgent: 'AGENT002', agentName: 'Mehmet Demir', createdDate: '2024-01-14', lastContact: '2024-01-15', nextFollowUp: '2024-01-20', notes: 'Family of 5, needs furnished villa, flexible on location' },
  { id: 'LEAD003', leadNo: 'L-2024-003', name: 'Global Tech LLC', email: 'info@globaltech.qa', phone: '+974 5555 8003', leadSource: 'Cold Call', leadType: 'Tenant', lookingFor: 'Office', budget: 50000, minBedrooms: null, preferredLocations: ['West Bay', 'Lusail'], status: 'qualified', priority: 'high', assignedAgent: 'AGENT001', agentName: 'Fatma Yilmaz', createdDate: '2024-01-10', lastContact: '2024-01-16', nextFollowUp: '2024-01-19', notes: 'Looking for 300+ sqm office space, immediate requirement' },
  { id: 'LEAD004', leadNo: 'L-2024-004', name: 'Mohammed Youssef', email: 'mohammed.y@email.com', phone: '+974 5555 8004', leadSource: 'Walk-in', leadType: 'Seller', lookingFor: 'Apartment', budget: 0, minBedrooms: 2, preferredLocations: ['Al Sadd'], status: 'viewing-scheduled', priority: 'normal', assignedAgent: 'AGENT003', agentName: 'Zeynep Kaya', createdDate: '2024-01-12', lastContact: '2024-01-17', nextFollowUp: '2024-01-22', notes: 'Wants to sell 2BR apartment in Al Sadd, evaluation needed' },
  { id: 'LEAD005', leadNo: 'L-2024-005', name: 'Fatma Ibrahim', email: 'fatma.ibrahim@email.com', phone: '+974 5555 8005', leadSource: 'Social Media', leadType: 'Buyer', lookingFor: 'Villa', budget: 5000000, minBedrooms: 5, preferredLocations: ['The Pearl'], status: 'lost', priority: 'normal', assignedAgent: 'AGENT002', agentName: 'Mehmet Demir', createdDate: '2024-01-08', lastContact: '2024-01-15', nextFollowUp: null, notes: 'Purchased through another agent' },
];

export const viewings: Viewing[] = [
  { id: 'VIEW001', propertyId: 'PROP001', propertyCode: 'WB-APT-2401', propertyTitle: 'Luxury 3BR Apartment - West Bay', leadId: 'LEAD001', leadName: 'Ali Hassan', viewingDate: '2024-01-18', viewingTime: '10:00', duration: 60, agentId: 'AGENT001', agentName: 'Fatma Yilmaz', status: 'scheduled', type: 'In-Person', meetingPoint: 'Property Lobby', feedback: null, interested: null, notes: '' },
  { id: 'VIEW002', propertyId: 'PROP003', propertyCode: 'LSL-OFF-2403', propertyTitle: 'Premium Office Space - Lusail', leadId: 'LEAD003', leadName: 'Global Tech LLC', viewingDate: '2024-01-19', viewingTime: '14:00', duration: 90, agentId: 'AGENT001', agentName: 'Fatma Yilmaz', status: 'scheduled', type: 'In-Person', meetingPoint: 'Building Reception', feedback: null, interested: null, notes: 'Decision makers will attend' },
  { id: 'VIEW003', propertyId: 'PROP002', propertyCode: 'PRL-VIL-2402', propertyTitle: 'Modern 5BR Villa - The Pearl', leadId: 'LEAD002', leadName: 'Sarah Al-Thani', viewingDate: '2024-01-15', viewingTime: '16:00', duration: 60, agentId: 'AGENT002', agentName: 'Mehmet Demir', status: 'completed', type: 'In-Person', meetingPoint: 'Property Gate', feedback: 'Client loved the villa but found it slightly above budget', interested: true, notes: 'Negotiating on rent' },
  { id: 'VIEW004', propertyId: 'PROP004', propertyCode: 'WB-APT-2404', propertyTitle: '2BR Apartment - West Bay', leadId: 'LEAD004', leadName: 'Mohammed Youssef', viewingDate: '2024-01-22', viewingTime: '11:00', duration: 45, agentId: 'AGENT003', agentName: 'Zeynep Kaya', status: 'scheduled', type: 'In-Person', meetingPoint: 'Building Lobby', feedback: null, interested: null, notes: 'Comparative viewing' },
  { id: 'VIEW005', propertyId: 'PROP001', propertyCode: 'WB-APT-2401', propertyTitle: 'Luxury 3BR Apartment - West Bay', leadId: 'LEAD004', leadName: 'Mohammed Youssef', viewingDate: '2024-01-13', viewingTime: '15:00', duration: 45, agentId: 'AGENT001', agentName: 'Fatma Yilmaz', status: 'completed', type: 'Virtual', meetingPoint: 'Online', feedback: 'Not interested - looking for lower floor', interested: false, notes: 'Prefers lower floors due to children' },
];

export const offers: Offer[] = [
  { id: 'OFF001', offerNo: 'OFF-2024-001', propertyId: 'PROP002', propertyCode: 'PRL-VIL-2402', propertyTitle: 'Modern 5BR Villa - The Pearl', buyerName: 'Sarah Al-Thani', leadId: 'LEAD002', offerDate: '2024-01-16', offerType: 'Rental', offeredAmount: 26000, askingAmount: 28000, status: 'negotiating', validUntil: '2024-01-23', agentId: 'AGENT002', agentName: 'Mehmet Demir', notes: 'Client willing to sign 2-year contract at this price', counterOffer: 27000, ownerResponse: 'Counter-offered QAR 27,000/month' },
  { id: 'OFF002', offerNo: 'OFF-2024-002', propertyId: 'PROP003', propertyCode: 'LSL-OFF-2403', propertyTitle: 'Premium Office Space - Lusail', buyerName: 'Global Tech LLC', leadId: 'LEAD003', offerDate: '2024-01-14', offerType: 'Purchase', offeredAmount: 4500000, askingAmount: 4800000, status: 'accepted', validUntil: '2024-01-21', agentId: 'AGENT001', agentName: 'Fatma Yilmaz', notes: 'Cash buyer, no financing contingency', counterOffer: null, ownerResponse: 'Accepted on Jan 15' },
  { id: 'OFF003', offerNo: 'OFF-2024-003', propertyId: 'PROP001', propertyCode: 'WB-APT-2401', propertyTitle: 'Luxury 3BR Apartment - West Bay', buyerName: 'Investor Group', leadId: null, offerDate: '2024-01-12', offerType: 'Purchase', offeredAmount: 2300000, askingAmount: 2500000, status: 'rejected', validUntil: '2024-01-19', agentId: 'AGENT001', agentName: 'Fatma Yilmaz', notes: 'Low-ball offer', counterOffer: null, ownerResponse: 'Rejected - price too low' },
];

export const contracts: Contract[] = [
  { id: 'CONT001', contractNo: 'CONT-2024-001', contractType: 'Sale Agreement', propertyId: 'PROP003', propertyCode: 'LSL-OFF-2403', propertyTitle: 'Premium Office Space - Lusail', clientType: 'Buyer', clientName: 'Global Tech LLC', ownerName: 'Lusail Developments', salePrice: 4500000, rentAmount: null, contractDate: '2024-01-15', completionDate: '2024-02-15', status: 'pending-completion', agentId: 'AGENT001', agentName: 'Fatma Yilmaz', commission: 90000, commissionRate: 2, depositPaid: 450000, balanceDue: 4050000, specialConditions: 'Subject to final inspection', notes: 'Fast-track completion requested' },
  { id: 'CONT002', contractNo: 'CONT-2024-002', contractType: 'Lease Agreement', propertyId: 'PROP002', propertyCode: 'PRL-VIL-2402', propertyTitle: 'Modern 5BR Villa - The Pearl', clientType: 'Tenant', clientName: 'Sarah Al-Thani', ownerName: 'Khalid Trading LLC', salePrice: null, rentAmount: 27000, contractDate: '2023-12-20', leaseStart: '2024-01-01', leaseEnd: '2024-12-31', leaseTerm: 12, status: 'active', agentId: 'AGENT002', agentName: 'Mehmet Demir', commission: 27000, commissionRate: 100, depositPaid: 27000, securityDeposit: 27000, specialConditions: null, notes: '1-year renewable lease' },
  { id: 'CONT003', contractNo: 'CONT-2023-089', contractType: 'Sale Agreement', propertyId: 'PROP001', propertyCode: 'WB-APT-2401', propertyTitle: 'Luxury 3BR Apartment - West Bay', clientType: 'Buyer', clientName: 'Ahmed Al-Mansouri', ownerName: 'Previous Owner', salePrice: 2400000, rentAmount: null, contractDate: '2023-11-20', completionDate: '2023-12-20', status: 'completed', agentId: 'AGENT001', agentName: 'Fatma Yilmaz', commission: 48000, commissionRate: 2, depositPaid: 2400000, balanceDue: 0, specialConditions: null, notes: 'Owner purchased for investment' },
];

export const tenants: Tenant[] = [
  { id: 'TEN001', tenantNo: 'T-2024-001', name: 'Sarah Al-Thani', email: 'sarah@company.qa', phone: '+974 5555 8002', idType: 'QID', idNo: '28587654321', nationality: 'Qatari', occupation: 'Manager', emergencyContact: 'Ali Al-Thani - +974 5555 8010', propertyId: 'PROP002', propertyCode: 'PRL-VIL-2402', propertyTitle: 'Modern 5BR Villa - The Pearl', leaseStart: '2024-01-01', leaseEnd: '2024-12-31', monthlyRent: 27000, securityDeposit: 27000, status: 'active', moveInDate: '2024-01-01', notes: 'Excellent tenant, always on time' },
  { id: 'TEN002', tenantNo: 'T-2023-045', name: 'Tech Solutions Qatar', email: 'admin@techsolutions.qa', phone: '+974 5555 8011', idType: 'CR', idNo: 'CR-2021-98765', nationality: 'Qatari', occupation: 'IT Services', emergencyContact: 'Manager - +974 5555 8012', propertyId: 'PROP005', propertyCode: 'IND-WH-2405', propertyTitle: 'Industrial Warehouse - Industrial Area', leaseStart: '2023-06-01', leaseEnd: '2025-05-31', monthlyRent: 45000, securityDeposit: 90000, status: 'active', moveInDate: '2023-06-01', notes: '2-year contract, good payment history' },
];

export const landlords: Landlord[] = [
  { id: 'LAND001', landlordNo: 'LL-001', name: 'Ahmed Al-Mansouri', type: 'Individual', email: 'ahmed.mansouri@email.com', phone: '+974 5555 9001', address: 'West Bay, Doha', idType: 'QID', idNo: '28512345678', nationality: 'Qatari', bankName: 'Qatar National Bank', accountNo: 'QA58DOHB00001234567890ABCDEFG', properties: ['PROP001'], totalProperties: 1, activeTenancies: 0, status: 'active', notes: 'Investor - prefers long-term tenants' },
  { id: 'LAND002', landlordNo: 'LL-002', name: 'Khalid Trading LLC', type: 'Corporate', email: 'properties@khalidtrading.qa', phone: '+974 5555 9002', address: 'Industrial Area, Doha', idType: 'CR', idNo: 'CR-2015-12345', nationality: 'Qatari', bankName: 'Commercial Bank of Qatar', accountNo: 'QA58CBQA00001234567890ABCDEFG', properties: ['PROP002'], totalProperties: 1, activeTenancies: 1, status: 'active', notes: 'Corporate landlord, multiple properties' },
  { id: 'LAND003', landlordNo: 'LL-003', name: 'Industrial Properties LLC', type: 'Corporate', email: 'leasing@indproperties.qa', phone: '+974 5555 9003', address: 'Industrial Area, Doha', idType: 'CR', idNo: 'CR-2010-54321', nationality: 'Qatari', bankName: 'Doha Bank', accountNo: 'QA58DOHB00001234567890ABCDEFG', properties: ['PROP005'], totalProperties: 1, activeTenancies: 1, status: 'active', notes: 'Specializes in industrial properties' },
  { id: 'INV001', landlordNo: 'LL-004', name: 'Can Arslan', type: 'Individual', email: 'can.arslan@email.com', phone: '+974 5555 9004', address: 'Al Sadd, Doha', idType: 'QID', idNo: '28598765432', nationality: 'Turkish', bankName: 'Qatar Islamic Bank', accountNo: 'QA58QISB00001234567890ABCDEFG', properties: ['PROP004'], totalProperties: 1, activeTenancies: 0, status: 'active', notes: 'Individual investor' },
  { id: 'DEV001', landlordNo: 'LL-005', name: 'Lusail Developments', type: 'Developer', email: 'sales@lusaildev.qa', phone: '+974 5555 9005', address: 'Lusail City, Doha', idType: 'CR', idNo: 'CR-2018-11111', nationality: 'Qatari', bankName: 'Qatar National Bank', accountNo: 'QA58DOHB00001234567890ABCDEFG', properties: ['PROP003'], totalProperties: 1, activeTenancies: 0, status: 'active', notes: 'Developer - selling multiple units' },
];

export const maintenanceRequests: MaintenanceRequest[] = [
  { id: 'MAINT001', requestNo: 'MNT-2024-001', propertyId: 'PROP002', propertyCode: 'PRL-VIL-2402', propertyTitle: 'Modern 5BR Villa - The Pearl', tenantId: 'TEN001', tenantName: 'Sarah Al-Thani', category: 'Plumbing', priority: 'high', subject: 'Leaking kitchen faucet', description: 'Kitchen faucet has been leaking for 2 days, getting worse', reportedDate: '2024-01-16', status: 'assigned', assignedTo: 'Ali Maintenance Technician', scheduledDate: '2024-01-17', completedDate: null, estimatedCost: 350, actualCost: null, notes: 'Urgent - water damage risk' },
  { id: 'MAINT002', requestNo: 'MNT-2024-002', propertyId: 'PROP002', propertyCode: 'PRL-VIL-2402', propertyTitle: 'Modern 5BR Villa - The Pearl', tenantId: 'TEN001', tenantName: 'Sarah Al-Thani', category: 'AC/HVAC', priority: 'normal', subject: 'AC not cooling properly in master bedroom', description: 'AC running but not cooling effectively', reportedDate: '2024-01-15', status: 'in-progress', assignedTo: 'Hasan AC Technician', scheduledDate: '2024-01-16', completedDate: null, estimatedCost: 500, actualCost: null, notes: 'Gas refill may be needed' },
  { id: 'MAINT003', requestNo: 'MNT-2024-003', propertyId: 'PROP005', propertyCode: 'IND-WH-2405', propertyTitle: 'Industrial Warehouse - Industrial Area', tenantId: 'TEN002', tenantName: 'Tech Solutions Qatar', category: 'Electrical', priority: 'urgent', subject: 'Main circuit breaker tripping', description: 'Main power keeps cutting off, affecting operations', reportedDate: '2024-01-17', status: 'pending', assignedTo: null, scheduledDate: null, completedDate: null, estimatedCost: 0, actualCost: null, notes: 'Business impact - priority response needed' },
  { id: 'MAINT004', requestNo: 'MNT-2023-125', propertyId: 'PROP002', propertyCode: 'PRL-VIL-2402', propertyTitle: 'Modern 5BR Villa - The Pearl', tenantId: 'TEN001', tenantName: 'Sarah Al-Thani', category: 'General', priority: 'low', subject: 'Garden landscaping', description: 'Monthly garden maintenance', reportedDate: '2024-01-10', status: 'completed', assignedTo: 'Garden Services Co.', scheduledDate: '2024-01-11', completedDate: '2024-01-11', estimatedCost: 800, actualCost: 800, notes: 'Regular monthly service' },
];

export const payments: Payment[] = [
  { id: 'PAY001', paymentNo: 'PAY-2024-001', paymentType: 'Rent', propertyId: 'PROP002', propertyCode: 'PRL-VIL-2402', tenantId: 'TEN001', tenantName: 'Sarah Al-Thani', landlordId: 'LAND002', landlordName: 'Khalid Trading LLC', dueDate: '2024-01-01', amount: 27000, paidAmount: 27000, paymentDate: '2023-12-30', paymentMethod: 'Bank Transfer', status: 'paid', referenceNo: 'TRF-2023-1230-001', lateFee: 0, notes: 'Paid before due date' },
  { id: 'PAY002', paymentNo: 'PAY-2024-002', paymentType: 'Rent', propertyId: 'PROP002', propertyCode: 'PRL-VIL-2402', tenantId: 'TEN001', tenantName: 'Sarah Al-Thani', landlordId: 'LAND002', landlordName: 'Khalid Trading LLC', dueDate: '2024-02-01', amount: 27000, paidAmount: 0, paymentDate: null, paymentMethod: null, status: 'pending', referenceNo: null, lateFee: 0, notes: '' },
  { id: 'PAY003', paymentNo: 'PAY-2024-003', paymentType: 'Rent', propertyId: 'PROP005', propertyCode: 'IND-WH-2405', tenantId: 'TEN002', tenantName: 'Tech Solutions Qatar', landlordId: 'LAND003', landlordName: 'Industrial Properties LLC', dueDate: '2024-01-01', amount: 45000, paidAmount: 45000, paymentDate: '2024-01-02', paymentMethod: 'Cheque', status: 'paid', referenceNo: 'CHQ-123456', lateFee: 0, notes: 'Post-dated cheque cleared' },
  { id: 'PAY004', paymentNo: 'PAY-2024-004', paymentType: 'Security Deposit', propertyId: 'PROP002', propertyCode: 'PRL-VIL-2402', tenantId: 'TEN001', tenantName: 'Sarah Al-Thani', landlordId: 'LAND002', landlordName: 'Khalid Trading LLC', dueDate: '2023-12-20', amount: 27000, paidAmount: 27000, paymentDate: '2023-12-20', paymentMethod: 'Bank Transfer', status: 'paid', referenceNo: 'TRF-2023-1220-001', lateFee: 0, notes: 'Security deposit - refundable' },
  { id: 'PAY005', paymentNo: 'PAY-2024-005', paymentType: 'Commission', propertyId: 'PROP003', propertyCode: 'LSL-OFF-2403', tenantId: null, tenantName: null, landlordId: 'DEV001', landlordName: 'Lusail Developments', dueDate: '2024-02-15', amount: 90000, paidAmount: 0, paymentDate: null, paymentMethod: null, status: 'pending', referenceNo: null, lateFee: 0, notes: 'Commission due on completion' },
];

export const agents: Agent[] = [
  { id: 'AGENT001', agentNo: 'AGT-001', name: 'Fatma Yilmaz', email: 'fatma@realestate.qa', phone: '+974 5555 7001', licenseNo: 'RE-2020-12345', licenseExpiry: '2025-12-31', specialization: ['Residential', 'Commercial'], activeListings: 3, totalSales: 24, totalCommission: 2400000, status: 'active', joinDate: '2020-06-15' },
  { id: 'AGENT002', agentNo: 'AGT-002', name: 'Mehmet Demir', email: 'mehmet@realestate.qa', phone: '+974 5555 7002', licenseNo: 'RE-2019-54321', licenseExpiry: '2025-06-30', specialization: ['Residential', 'Luxury'], activeListings: 2, totalSales: 35, totalCommission: 3500000, status: 'active', joinDate: '2019-03-10' },
  { id: 'AGENT003', agentNo: 'AGT-003', name: 'Zeynep Kaya', email: 'zeynep@realestate.qa', phone: '+974 5555 7003', licenseNo: 'RE-2021-98765', licenseExpiry: '2026-09-30', specialization: ['Residential'], activeListings: 1, totalSales: 12, totalCommission: 840000, status: 'active', joinDate: '2021-09-01' },
];

// Helper functions
export const getStatusColor = (status: string) => {
  const colors: Record<string, string> = {
    'available': '#10b981',
    'rented': '#3b82f6',
    'under-offer': '#f59e0b',
    'sold': '#64748b',
    'new': '#0ea5e9',
    'contacted': '#3b82f6',
    'qualified': '#10b981',
    'viewing-scheduled': '#f59e0b',
    'converted': '#8b5cf6',
    'lost': '#ef4444',
    'scheduled': '#3b82f6',
    'completed': '#10b981',
    'cancelled': '#ef4444',
    'no-show': '#64748b',
    'pending': '#f59e0b',
    'negotiating': '#f59e0b',
    'accepted': '#10b981',
    'rejected': '#ef4444',
    'expired': '#64748b',
    'pending-completion': '#f59e0b',
    'active': '#10b981',
    'terminated': '#ef4444',
    'assigned': '#3b82f6',
    'in-progress': '#f59e0b',
    'paid': '#10b981',
    'overdue': '#ef4444',
  };
  return colors[status] || REALESTATE_COLOR;
};

export const getPriorityColor = (priority: string) => {
  const colors: Record<string, string> = {
    'urgent': '#ef4444',
    'high': '#f59e0b',
    'normal': '#3b82f6',
    'low': '#64748b',
  };
  return colors[priority] || REALESTATE_COLOR;
};

// Menu items for sidebar
export const realestateMenuItems = [
  { id: 'realestate-properties', label: 'Properties', icon: Building, path: ROUTES.realestate.properties, color: REALESTATE_COLOR },
  { id: 'realestate-listings', label: 'Listings', icon: Home, path: ROUTES.realestate.listings, color: REALESTATE_COLOR },
  { id: 'realestate-leads', label: 'Leads', icon: Users, path: ROUTES.realestate.leads, color: REALESTATE_COLOR },
  { id: 'realestate-viewings', label: 'Viewings', icon: Eye, path: ROUTES.realestate.viewings, color: REALESTATE_COLOR },
  { id: 'realestate-offers', label: 'Offers', icon: Handshake, path: ROUTES.realestate.offers, color: REALESTATE_COLOR },
  { id: 'realestate-contracts', label: 'Contracts', icon: FileSignature, path: ROUTES.realestate.contracts, color: REALESTATE_COLOR },
  { id: 'realestate-commissions', label: 'Commissions', icon: DollarSign, path: ROUTES.realestate.commissions, color: REALESTATE_COLOR },
  { id: 'realestate-tenants', label: 'Tenants', icon: UserCheck, path: ROUTES.realestate.tenants, color: REALESTATE_COLOR },
  { id: 'realestate-landlords', label: 'Landlords', icon: User, path: ROUTES.realestate.landlords, color: REALESTATE_COLOR },
  { id: 'realestate-maintenance', label: 'Maintenance', icon: Wrench, path: ROUTES.realestate.maintenance, color: REALESTATE_COLOR },
  { id: 'realestate-payments', label: 'Payments', icon: CreditCard, path: ROUTES.realestate.payments, color: REALESTATE_COLOR },
  { id: 'realestate-reports', label: 'Reports', icon: BarChart3, path: ROUTES.realestate.reports, color: REALESTATE_COLOR },
];
