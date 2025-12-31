import {
  Building,
  Home,
  Building2,
  Store,
  Mountain,
  Users,
  Calendar,
  DollarSign,
  UserCheck,
  Briefcase,
  Globe,
} from 'lucide-react';

// Types
export interface PropertyAddress {
  street: string;
  unit: string | null;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  neighborhood: string;
}

export interface PropertySize {
  sqft: number;
  bedrooms?: number;
  bathrooms?: number;
  halfBaths?: number;
  lotSize?: number;
  units?: number;
  frontage?: number;
  ceilingHeight?: number;
}

export interface PropertyFeatures {
  yearBuilt: number;
  parking: number;
  garage?: boolean;
  pool?: boolean;
  gym?: boolean;
  doorman?: boolean;
  elevator?: boolean;
  laundry?: string;
  heating?: string;
  cooling?: string;
  flooring?: string[];
  appliances?: string[];
  hvac?: boolean;
  sprinkler?: boolean;
  ada?: boolean;
  utilities?: string[];
}

export interface PriceHistory {
  date: string;
  price: number;
  event: string;
}

export interface OpenHouse {
  scheduled: boolean;
  date: string;
  time: string;
}

export interface PropertyOwner {
  id: string;
  name: string;
  type: 'individual' | 'company';
}

export interface PropertyAgent {
  id: string;
  name: string;
  phone?: string;
  email?: string;
}

export interface HOA {
  fee: number;
  frequency: string;
  includes: string[];
}

export interface RentalTerms {
  minLease: number;
  maxLease: number;
  securityDeposit: number;
  moveInCost: number;
  petPolicy?: string;
  petDeposit?: number;
  nnn?: boolean;
  camCharges?: number;
}

export interface UnitMix {
  unit: string;
  bedrooms: number;
  bathrooms: number;
  sqft: number;
  rent: number;
  status: string;
}

export interface PropertyFinancials {
  grossIncome: number;
  expenses: number;
  noi: number;
  capRate: number;
}

export interface Property {
  id: string;
  listingId: string;
  title: string;
  type: string;
  category: 'sale' | 'rent';
  status: string;
  featured: boolean;
  address: PropertyAddress;
  coordinates: { lat: number; lng: number };
  price: number;
  pricePerSqft: number | null;
  size: PropertySize;
  features: PropertyFeatures;
  amenities: string[];
  description: string;
  images: string[];
  virtualTour: string | null;
  floorPlan: string | null;
  owner: PropertyOwner;
  agent: PropertyAgent;
  coAgent: PropertyAgent | null;
  commission: number;
  listingDate: string;
  expirationDate: string;
  daysOnMarket: number;
  views: number;
  inquiries: number;
  showings: number;
  priceHistory: PriceHistory[];
  openHouse: OpenHouse | null;
  mlsNumber: string | null;
  taxInfo: { annualTax: number; taxYear: number } | null;
  hoa: HOA | null;
  rentalTerms?: RentalTerms;
  unitMix?: UnitMix[];
  financials?: PropertyFinancials;
  availableDate?: string;
  pendingOffer?: { amount: number; date: string };
  rentedInfo?: { tenant: string; leaseStart: string; leaseEnd: string; monthlyRent: number };
  createdAt: string;
  updatedAt: string;
}

export interface LeadActivity {
  date: string;
  type: string;
  notes: string;
}

export interface Lead {
  id: string;
  leadId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  type: 'buyer' | 'renter' | 'seller' | 'investor';
  status: string;
  source: string;
  budget?: { min: number; max: number };
  preferences?: {
    propertyTypes: string[];
    bedrooms?: { min: number; max: number };
    locations: string[];
    features?: string[];
    capRate?: { min: number; max: number };
  };
  preApproved: boolean;
  preApprovalAmount: number | null;
  preApprovalLender: string | null;
  timeline: string;
  notes: string;
  assignedAgent: string;
  assignedAgentId: string;
  propertiesViewed?: string[];
  favoriteProperties?: string[];
  lastContact: string;
  nextFollowUp: string;
  propertyAddress?: string;
  estimatedValue?: number;
  motivation?: string;
  investmentGoals?: string;
  createdAt: string;
  updatedAt: string;
  activities: LeadActivity[];
}

export interface Showing {
  id: string;
  propertyId: string;
  propertyAddress: string;
  leadId: string | null;
  leadName: string;
  agentId: string;
  agentName: string;
  date: string;
  startTime: string;
  endTime: string;
  status: 'scheduled' | 'completed' | 'cancelled';
  type: 'private' | 'open-house';
  notes: string;
  feedback: string | null;
  interestLevel?: number;
  followUp: string | null;
  attendees?: number;
  leadsGenerated?: number;
  createdAt: string;
}

export interface TransactionParty {
  name: string;
  email: string;
  phone: string;
  attorney?: string;
  employer?: string;
}

export interface TransactionTimeline {
  date: string;
  event: string;
  notes: string;
}

export interface TransactionCommission {
  total: number;
  listingSide?: number;
  buyerSide?: number;
  rate?: number;
  amount?: number;
  type?: string;
}

export interface Transaction {
  id: string;
  transactionId: string;
  type: 'sale' | 'lease';
  status: 'pending' | 'active' | 'closed';
  propertyId: string;
  propertyAddress: string;
  buyer?: TransactionParty;
  seller?: TransactionParty;
  tenant?: TransactionParty;
  landlord?: TransactionParty;
  listingAgent: PropertyAgent;
  buyerAgent?: PropertyAgent;
  listPrice?: number;
  salePrice?: number;
  offerPrice?: number;
  monthlyRent?: number;
  securityDeposit?: number;
  closingDate?: string;
  contractDate: string;
  listingDate: string;
  expectedClosing?: string;
  leaseStart?: string;
  leaseEnd?: string;
  leaseTerm?: number;
  daysOnMarket?: number;
  currentStep?: string;
  commission: TransactionCommission;
  timeline: TransactionTimeline[];
  documents: string[];
  notes: string;
  createdAt: string;
  updatedAt: string;
}

export interface AgentStats {
  activeListings: number;
  totalSalesYTD?: number;
  totalRentalsYTD?: number;
  transactionsYTD?: number;
  avgDaysOnMarket: number;
  listToSaleRatio?: number;
  clientSatisfaction?: number;
  avgCapRate?: number;
}

export interface Agent {
  id: string;
  name: string;
  email: string;
  phone: string;
  photo: string | null;
  title: string;
  licenseNumber: string;
  licenseExpiry: string;
  specializations: string[];
  bio: string;
  status: 'active' | 'inactive';
  joinDate: string;
  teamId: string | null;
  teamName: string | null;
  stats: AgentStats;
  commission: { split: number; ytdEarnings: number };
  reviews: number;
  rating: number;
  socialMedia: { linkedin: string; instagram: string | null };
}

export interface OwnerContact {
  name: string;
  title: string;
  email: string;
  phone: string;
}

export interface Owner {
  id: string;
  name: string;
  type: 'individual' | 'company';
  email: string;
  phone: string;
  address: string;
  properties: string[];
  totalProperties: number;
  activeListings: number;
  primaryContact: OwnerContact | null;
  preferredAgent: string;
  notes: string;
  createdAt: string;
}

export interface Commission {
  id: string;
  transactionId: string;
  propertyAddress: string;
  transactionType: 'sale' | 'lease';
  closeDate: string;
  salePrice?: number;
  monthlyRent?: number;
  totalCommission: number;
  agentId: string;
  agentName: string;
  side: 'listing' | 'buyer';
  grossCommission: number;
  split: number;
  netCommission: number;
  status: 'pending' | 'paid';
  paidDate: string | null;
  notes: string;
}

export interface RealEstateStats {
  activeListings: number;
  pendingTransactions: number;
  closedThisMonth: number;
  totalVolume: {
    thisMonth: number;
    lastMonth: number;
    ytd: number;
  };
  avgDaysOnMarket: number;
  listToSaleRatio: number;
  activeLeads: number;
  showingsThisWeek: number;
  commissionsPending: number;
  commissionsYTD: number;
}

// Mock Data
export const properties: Property[] = [
  {
    id: "PROP001",
    listingId: "RE-2024-001",
    title: "Luxury Penthouse with City Views",
    type: "apartment",
    category: "sale",
    status: "active",
    featured: true,
    address: {
      street: "500 Park Avenue",
      unit: "PH-A",
      city: "New York",
      state: "NY",
      zipCode: "10022",
      country: "USA",
      neighborhood: "Upper East Side"
    },
    coordinates: { lat: 40.7614, lng: -73.9716 },
    price: 8500000,
    pricePerSqft: 2125,
    size: {
      sqft: 4000,
      bedrooms: 4,
      bathrooms: 4.5,
      halfBaths: 1
    },
    features: {
      yearBuilt: 2018,
      parking: 2,
      garage: true,
      pool: false,
      gym: true,
      doorman: true,
      elevator: true,
      laundry: "in-unit",
      heating: "central",
      cooling: "central",
      flooring: ["hardwood", "marble"],
      appliances: ["dishwasher", "refrigerator", "wine-cooler", "washer", "dryer"]
    },
    amenities: ["Rooftop Terrace", "Private Elevator", "Wine Cellar", "Smart Home", "Concierge"],
    description: "Stunning full-floor penthouse offering breathtaking views of Central Park and the city skyline. This meticulously designed residence features floor-to-ceiling windows, chef's kitchen with top-of-the-line appliances, master suite with spa bathroom, and private rooftop terrace.",
    images: [],
    virtualTour: "https://tour.example.com/prop001",
    floorPlan: "floorplan_prop001.pdf",
    owner: {
      id: "OWN001",
      name: "Manhattan Holdings LLC",
      type: "company"
    },
    agent: {
      id: "AGT001",
      name: "Jennifer Martinez",
      phone: "+1 (555) 501-1001",
      email: "jennifer.m@realestate.com"
    },
    coAgent: null,
    commission: 3,
    listingDate: "2024-11-01",
    expirationDate: "2025-05-01",
    daysOnMarket: 49,
    views: 1245,
    inquiries: 32,
    showings: 18,
    priceHistory: [
      { date: "2024-11-01", price: 9000000, event: "Listed" },
      { date: "2024-12-01", price: 8500000, event: "Price Reduced" }
    ],
    openHouse: {
      scheduled: true,
      date: "2024-12-22",
      time: "14:00-17:00"
    },
    mlsNumber: "MLS-NYC-78452",
    taxInfo: {
      annualTax: 125000,
      taxYear: 2024
    },
    hoa: {
      fee: 4500,
      frequency: "monthly",
      includes: ["water", "trash", "doorman", "gym"]
    },
    createdAt: "2024-11-01",
    updatedAt: "2024-12-15"
  },
  {
    id: "PROP002",
    listingId: "RE-2024-002",
    title: "Modern Family Home with Pool",
    type: "house",
    category: "sale",
    status: "active",
    featured: true,
    address: {
      street: "245 Oak Valley Drive",
      unit: null,
      city: "Los Angeles",
      state: "CA",
      zipCode: "90049",
      country: "USA",
      neighborhood: "Brentwood"
    },
    coordinates: { lat: 34.0522, lng: -118.4744 },
    price: 4250000,
    pricePerSqft: 1062,
    size: {
      sqft: 4000,
      bedrooms: 5,
      bathrooms: 4,
      halfBaths: 1,
      lotSize: 12000
    },
    features: {
      yearBuilt: 2020,
      parking: 3,
      garage: true,
      pool: true,
      gym: false,
      doorman: false,
      elevator: false,
      laundry: "in-unit",
      heating: "central",
      cooling: "central",
      flooring: ["hardwood", "tile"],
      appliances: ["dishwasher", "refrigerator", "oven", "washer", "dryer"]
    },
    amenities: ["Swimming Pool", "Outdoor Kitchen", "Smart Home", "Solar Panels", "EV Charger"],
    description: "Stunning contemporary home in prime Brentwood location. Open floor plan with walls of glass overlooking the private backyard oasis. Gourmet kitchen, home office, and resort-style pool with spa.",
    images: [],
    virtualTour: "https://tour.example.com/prop002",
    floorPlan: "floorplan_prop002.pdf",
    owner: {
      id: "OWN002",
      name: "Robert & Sarah Williams",
      type: "individual"
    },
    agent: {
      id: "AGT002",
      name: "Michael Chen",
      phone: "+1 (555) 502-2002",
      email: "michael.c@realestate.com"
    },
    coAgent: null,
    commission: 2.5,
    listingDate: "2024-10-15",
    expirationDate: "2025-04-15",
    daysOnMarket: 66,
    views: 2156,
    inquiries: 45,
    showings: 28,
    priceHistory: [
      { date: "2024-10-15", price: 4500000, event: "Listed" },
      { date: "2024-11-20", price: 4250000, event: "Price Reduced" }
    ],
    openHouse: null,
    mlsNumber: "MLS-LA-45678",
    taxInfo: {
      annualTax: 52000,
      taxYear: 2024
    },
    hoa: null,
    createdAt: "2024-10-15",
    updatedAt: "2024-12-10"
  },
  {
    id: "PROP003",
    listingId: "RE-2024-003",
    title: "Downtown Luxury Condo",
    type: "condo",
    category: "sale",
    status: "pending",
    featured: false,
    address: {
      street: "888 Market Street",
      unit: "2401",
      city: "San Francisco",
      state: "CA",
      zipCode: "94102",
      country: "USA",
      neighborhood: "Financial District"
    },
    coordinates: { lat: 37.7849, lng: -122.4094 },
    price: 1850000,
    pricePerSqft: 1233,
    size: {
      sqft: 1500,
      bedrooms: 2,
      bathrooms: 2,
      halfBaths: 0
    },
    features: {
      yearBuilt: 2015,
      parking: 1,
      garage: true,
      pool: false,
      gym: true,
      doorman: true,
      elevator: true,
      laundry: "in-unit",
      heating: "central",
      cooling: "central",
      flooring: ["hardwood"],
      appliances: ["dishwasher", "refrigerator", "washer", "dryer"]
    },
    amenities: ["Rooftop Deck", "Fitness Center", "Concierge", "Business Center"],
    description: "Sophisticated high-floor condo with stunning bay views. Premium finishes throughout, open concept living, and building amenities including rooftop deck and 24-hour concierge.",
    images: [],
    virtualTour: null,
    floorPlan: "floorplan_prop003.pdf",
    owner: {
      id: "OWN003",
      name: "David Kim",
      type: "individual"
    },
    agent: {
      id: "AGT003",
      name: "Sarah Johnson",
      phone: "+1 (555) 503-3003",
      email: "sarah.j@realestate.com"
    },
    coAgent: {
      id: "AGT001",
      name: "Jennifer Martinez"
    },
    commission: 2.5,
    listingDate: "2024-09-20",
    expirationDate: "2025-03-20",
    daysOnMarket: 91,
    views: 3421,
    inquiries: 78,
    showings: 42,
    priceHistory: [
      { date: "2024-09-20", price: 1950000, event: "Listed" },
      { date: "2024-11-01", price: 1850000, event: "Price Reduced" }
    ],
    openHouse: null,
    mlsNumber: "MLS-SF-34521",
    taxInfo: {
      annualTax: 22000,
      taxYear: 2024
    },
    hoa: {
      fee: 850,
      frequency: "monthly",
      includes: ["water", "trash", "gym", "doorman"]
    },
    pendingOffer: {
      amount: 1800000,
      date: "2024-12-15"
    },
    createdAt: "2024-09-20",
    updatedAt: "2024-12-18"
  },
  {
    id: "PROP004",
    listingId: "RE-2024-004",
    title: "Charming Brownstone Rental",
    type: "townhouse",
    category: "rent",
    status: "active",
    featured: false,
    address: {
      street: "156 Bergen Street",
      unit: null,
      city: "Brooklyn",
      state: "NY",
      zipCode: "11217",
      country: "USA",
      neighborhood: "Boerum Hill"
    },
    coordinates: { lat: 40.6826, lng: -73.9856 },
    price: 8500,
    pricePerSqft: null,
    rentalTerms: {
      minLease: 12,
      maxLease: 24,
      securityDeposit: 17000,
      moveInCost: 25500,
      petPolicy: "allowed-with-deposit",
      petDeposit: 1000
    },
    size: {
      sqft: 2200,
      bedrooms: 3,
      bathrooms: 2.5,
      halfBaths: 0
    },
    features: {
      yearBuilt: 1890,
      parking: 0,
      garage: false,
      pool: false,
      gym: false,
      doorman: false,
      elevator: false,
      laundry: "in-unit",
      heating: "central",
      cooling: "window-units",
      flooring: ["hardwood"],
      appliances: ["dishwasher", "refrigerator", "washer", "dryer"]
    },
    amenities: ["Private Garden", "Exposed Brick", "Original Details", "Fireplace"],
    description: "Beautiful historic brownstone in prime Boerum Hill. Original details blend with modern updates. Three bedrooms, private garden, and quintessential Brooklyn charm.",
    images: [],
    virtualTour: null,
    floorPlan: null,
    owner: {
      id: "OWN004",
      name: "Brooklyn Properties Inc",
      type: "company"
    },
    agent: {
      id: "AGT004",
      name: "Amanda Lee",
      phone: "+1 (555) 504-4004",
      email: "amanda.l@realestate.com"
    },
    coAgent: null,
    commission: 15,
    listingDate: "2024-12-01",
    expirationDate: "2025-02-01",
    daysOnMarket: 19,
    views: 567,
    inquiries: 24,
    showings: 12,
    priceHistory: [
      { date: "2024-12-01", price: 8500, event: "Listed" }
    ],
    openHouse: {
      scheduled: true,
      date: "2024-12-21",
      time: "11:00-13:00"
    },
    mlsNumber: null,
    taxInfo: null,
    hoa: null,
    availableDate: "2025-01-15",
    createdAt: "2024-12-01",
    updatedAt: "2024-12-15"
  },
  {
    id: "PROP005",
    listingId: "RE-2024-005",
    title: "Commercial Retail Space",
    type: "commercial",
    category: "rent",
    status: "active",
    featured: false,
    address: {
      street: "750 Broadway",
      unit: "Ground Floor",
      city: "New York",
      state: "NY",
      zipCode: "10003",
      country: "USA",
      neighborhood: "NoHo"
    },
    coordinates: { lat: 40.7308, lng: -73.9917 },
    price: 45000,
    pricePerSqft: 150,
    rentalTerms: {
      minLease: 60,
      maxLease: 120,
      securityDeposit: 135000,
      moveInCost: 180000,
      nnn: true,
      camCharges: 12
    },
    size: {
      sqft: 3000,
      frontage: 25,
      ceilingHeight: 14
    },
    features: {
      yearBuilt: 1925,
      parking: 0,
      hvac: true,
      sprinkler: true,
      ada: true,
      flooring: ["concrete"],
      utilities: ["electric", "water", "gas"]
    },
    amenities: ["High Foot Traffic", "Corner Location", "Basement Storage", "Roll-Up Gate"],
    description: "Prime retail opportunity on Broadway in NoHo. High visibility corner location with excellent foot traffic. Ideal for restaurant, retail, or showroom.",
    images: [],
    virtualTour: null,
    floorPlan: "floorplan_prop005.pdf",
    owner: {
      id: "OWN005",
      name: "NoHo Retail Partners",
      type: "company"
    },
    agent: {
      id: "AGT001",
      name: "Jennifer Martinez",
      phone: "+1 (555) 501-1001",
      email: "jennifer.m@realestate.com"
    },
    coAgent: null,
    commission: 4,
    listingDate: "2024-11-15",
    expirationDate: "2025-05-15",
    daysOnMarket: 35,
    views: 234,
    inquiries: 8,
    showings: 5,
    priceHistory: [
      { date: "2024-11-15", price: 45000, event: "Listed" }
    ],
    openHouse: null,
    mlsNumber: null,
    taxInfo: null,
    hoa: null,
    availableDate: "2025-02-01",
    createdAt: "2024-11-15",
    updatedAt: "2024-12-10"
  },
  {
    id: "PROP006",
    listingId: "RE-2024-006",
    title: "Waterfront Studio Apartment",
    type: "apartment",
    category: "rent",
    status: "active",
    featured: false,
    address: {
      street: "200 Riverside Drive",
      unit: "8B",
      city: "Miami",
      state: "FL",
      zipCode: "33132",
      country: "USA",
      neighborhood: "Brickell"
    },
    coordinates: { lat: 25.7617, lng: -80.1918 },
    price: 2800,
    pricePerSqft: null,
    rentalTerms: {
      minLease: 12,
      maxLease: 24,
      securityDeposit: 5600,
      moveInCost: 8400,
      petPolicy: "small-pets-allowed",
      petDeposit: 500
    },
    size: {
      sqft: 650,
      bedrooms: 0,
      bathrooms: 1,
      halfBaths: 0
    },
    features: {
      yearBuilt: 2019,
      parking: 1,
      garage: true,
      pool: true,
      gym: true,
      doorman: true,
      elevator: true,
      laundry: "in-unit",
      heating: "central",
      cooling: "central",
      flooring: ["tile"],
      appliances: ["dishwasher", "refrigerator", "microwave"]
    },
    amenities: ["Bay Views", "Pool", "Fitness Center", "Rooftop Lounge", "Valet Parking"],
    description: "Stunning waterfront studio with breathtaking bay views. Modern finishes, full amenity building. Perfect for professionals seeking luxury living in Brickell.",
    images: [],
    virtualTour: "https://tour.example.com/prop006",
    floorPlan: null,
    owner: {
      id: "OWN006",
      name: "Brickell Investments LLC",
      type: "company"
    },
    agent: {
      id: "AGT005",
      name: "Carlos Rodriguez",
      phone: "+1 (555) 505-5005",
      email: "carlos.r@realestate.com"
    },
    coAgent: null,
    commission: 10,
    listingDate: "2024-12-10",
    expirationDate: "2025-02-10",
    daysOnMarket: 10,
    views: 189,
    inquiries: 15,
    showings: 8,
    priceHistory: [
      { date: "2024-12-10", price: 2800, event: "Listed" }
    ],
    openHouse: null,
    mlsNumber: null,
    taxInfo: null,
    hoa: null,
    availableDate: "2025-01-01",
    createdAt: "2024-12-10",
    updatedAt: "2024-12-15"
  },
  {
    id: "PROP007",
    listingId: "RE-2024-007",
    title: "Investment Property - 4 Unit Building",
    type: "multi-family",
    category: "sale",
    status: "active",
    featured: true,
    address: {
      street: "1842 North Avenue",
      unit: null,
      city: "Chicago",
      state: "IL",
      zipCode: "60622",
      country: "USA",
      neighborhood: "Wicker Park"
    },
    coordinates: { lat: 41.9088, lng: -87.6796 },
    price: 1650000,
    pricePerSqft: 344,
    size: {
      sqft: 4800,
      units: 4,
      lotSize: 3750
    },
    features: {
      yearBuilt: 1920,
      parking: 4,
      garage: true,
      pool: false,
      laundry: "common",
      heating: "individual",
      cooling: "window-units"
    },
    unitMix: [
      { unit: "1", bedrooms: 2, bathrooms: 1, sqft: 1000, rent: 2200, status: "occupied" },
      { unit: "2", bedrooms: 2, bathrooms: 1, sqft: 1000, rent: 2200, status: "occupied" },
      { unit: "3", bedrooms: 3, bathrooms: 1, sqft: 1400, rent: 2800, status: "occupied" },
      { unit: "4", bedrooms: 3, bathrooms: 1, sqft: 1400, rent: 2900, status: "occupied" }
    ],
    financials: {
      grossIncome: 121200,
      expenses: 36000,
      noi: 85200,
      capRate: 5.16
    },
    amenities: ["Fully Occupied", "Updated Units", "New Roof", "Separate Utilities"],
    description: "Excellent investment opportunity in hot Wicker Park. Fully occupied 4-unit building with strong rents. Recent updates include new roof, electrical, and common areas.",
    images: [],
    virtualTour: null,
    floorPlan: null,
    owner: {
      id: "OWN007",
      name: "Chicago Investment Group",
      type: "company"
    },
    agent: {
      id: "AGT006",
      name: "Thomas Wilson",
      phone: "+1 (555) 506-6006",
      email: "thomas.w@realestate.com"
    },
    coAgent: null,
    commission: 3,
    listingDate: "2024-11-20",
    expirationDate: "2025-05-20",
    daysOnMarket: 30,
    views: 567,
    inquiries: 18,
    showings: 6,
    priceHistory: [
      { date: "2024-11-20", price: 1650000, event: "Listed" }
    ],
    openHouse: null,
    mlsNumber: "MLS-CHI-89012",
    taxInfo: {
      annualTax: 28000,
      taxYear: 2024
    },
    hoa: null,
    createdAt: "2024-11-20",
    updatedAt: "2024-12-05"
  },
  {
    id: "PROP008",
    listingId: "RE-2024-008",
    title: "Cozy 1BR in Historic Building",
    type: "apartment",
    category: "rent",
    status: "rented",
    featured: false,
    address: {
      street: "45 Commonwealth Avenue",
      unit: "3A",
      city: "Boston",
      state: "MA",
      zipCode: "02116",
      country: "USA",
      neighborhood: "Back Bay"
    },
    coordinates: { lat: 42.3529, lng: -71.0738 },
    price: 3200,
    pricePerSqft: null,
    rentalTerms: {
      minLease: 12,
      maxLease: 12,
      securityDeposit: 3200,
      moveInCost: 9600,
      petPolicy: "no-pets"
    },
    size: {
      sqft: 750,
      bedrooms: 1,
      bathrooms: 1,
      halfBaths: 0
    },
    features: {
      yearBuilt: 1895,
      parking: 0,
      garage: false,
      pool: false,
      gym: false,
      doorman: false,
      elevator: true,
      laundry: "common",
      heating: "radiator",
      cooling: "window-units",
      flooring: ["hardwood"],
      appliances: ["refrigerator", "stove"]
    },
    amenities: ["Bay Windows", "High Ceilings", "Original Details", "Tree-Lined Street"],
    description: "Charming one bedroom in classic Back Bay brownstone. Bay windows, high ceilings, and original architectural details. Steps from Newbury Street shopping and dining.",
    images: [],
    virtualTour: null,
    floorPlan: null,
    owner: {
      id: "OWN008",
      name: "Back Bay Realty Trust",
      type: "company"
    },
    agent: {
      id: "AGT004",
      name: "Amanda Lee",
      phone: "+1 (555) 504-4004",
      email: "amanda.l@realestate.com"
    },
    coAgent: null,
    commission: 100,
    listingDate: "2024-10-01",
    expirationDate: "2025-01-01",
    daysOnMarket: 45,
    views: 892,
    inquiries: 34,
    showings: 18,
    priceHistory: [
      { date: "2024-10-01", price: 3200, event: "Listed" }
    ],
    openHouse: null,
    mlsNumber: null,
    taxInfo: null,
    hoa: null,
    rentedInfo: {
      tenant: "John Smith",
      leaseStart: "2024-11-15",
      leaseEnd: "2025-11-14",
      monthlyRent: 3200
    },
    createdAt: "2024-10-01",
    updatedAt: "2024-11-15"
  }
];

export const propertyTypes = [
  { id: "apartment", name: "Apartment", icon: Building },
  { id: "house", name: "House", icon: Home },
  { id: "condo", name: "Condo", icon: Building2 },
  { id: "townhouse", name: "Townhouse", icon: Building },
  { id: "multi-family", name: "Multi-Family", icon: Building },
  { id: "commercial", name: "Commercial", icon: Store },
  { id: "land", name: "Land", icon: Mountain }
];

export const propertyStatuses = [
  { id: "active", name: "Active", color: "#10b981" },
  { id: "pending", name: "Pending", color: "#f59e0b" },
  { id: "sold", name: "Sold", color: "#8b5cf6" },
  { id: "rented", name: "Rented", color: "#6366f1" },
  { id: "off-market", name: "Off Market", color: "#64748b" },
  { id: "coming-soon", name: "Coming Soon", color: "#0ea5e9" }
];

export const leads: Lead[] = [
  {
    id: "LEAD001",
    leadId: "RL-2024-001",
    firstName: "James",
    lastName: "Peterson",
    email: "james.peterson@email.com",
    phone: "+1 (555) 601-1001",
    type: "buyer",
    status: "hot",
    source: "Website",
    budget: { min: 1500000, max: 2000000 },
    preferences: {
      propertyTypes: ["condo", "apartment"],
      bedrooms: { min: 2, max: 3 },
      locations: ["Manhattan", "Brooklyn"],
      features: ["doorman", "gym", "laundry"]
    },
    preApproved: true,
    preApprovalAmount: 1800000,
    preApprovalLender: "Chase Bank",
    timeline: "1-3 months",
    notes: "Relocating from Chicago. Needs to be near subway. Prefers modern buildings.",
    assignedAgent: "Jennifer Martinez",
    assignedAgentId: "AGT001",
    propertiesViewed: ["PROP001", "PROP003"],
    favoriteProperties: ["PROP001"],
    lastContact: "2024-12-19",
    nextFollowUp: "2024-12-22",
    createdAt: "2024-11-15",
    updatedAt: "2024-12-19",
    activities: [
      { date: "2024-12-19", type: "showing", notes: "Viewed PROP001 - loved the views" },
      { date: "2024-12-15", type: "call", notes: "Discussed budget and preferences" },
      { date: "2024-11-15", type: "inquiry", notes: "Website inquiry for luxury condos" }
    ]
  },
  {
    id: "LEAD002",
    leadId: "RL-2024-002",
    firstName: "Emily",
    lastName: "Chang",
    email: "emily.chang@email.com",
    phone: "+1 (555) 602-2002",
    type: "renter",
    status: "active",
    source: "Referral",
    budget: { min: 3000, max: 4500 },
    preferences: {
      propertyTypes: ["apartment", "condo"],
      bedrooms: { min: 1, max: 2 },
      locations: ["Brooklyn", "Queens"],
      features: ["laundry", "pet-friendly"]
    },
    preApproved: false,
    preApprovalAmount: null,
    preApprovalLender: null,
    timeline: "Immediate",
    notes: "Has a small dog. Current lease ending Jan 31. Needs parking.",
    assignedAgent: "Amanda Lee",
    assignedAgentId: "AGT004",
    propertiesViewed: ["PROP004"],
    favoriteProperties: ["PROP004"],
    lastContact: "2024-12-18",
    nextFollowUp: "2024-12-20",
    createdAt: "2024-12-01",
    updatedAt: "2024-12-18",
    activities: [
      { date: "2024-12-18", type: "showing", notes: "Viewed PROP004 - interested in garden" },
      { date: "2024-12-10", type: "email", notes: "Sent listings matching criteria" },
      { date: "2024-12-01", type: "referral", notes: "Referred by past client Sarah Kim" }
    ]
  },
  {
    id: "LEAD003",
    leadId: "RL-2024-003",
    firstName: "Robert",
    lastName: "Williams",
    email: "robert.w@email.com",
    phone: "+1 (555) 603-3003",
    type: "buyer",
    status: "warm",
    source: "Open House",
    budget: { min: 800000, max: 1200000 },
    preferences: {
      propertyTypes: ["house", "townhouse"],
      bedrooms: { min: 3, max: 4 },
      locations: ["Westchester", "Connecticut"],
      features: ["garage", "backyard", "good-schools"]
    },
    preApproved: true,
    preApprovalAmount: 1000000,
    preApprovalLender: "Wells Fargo",
    timeline: "3-6 months",
    notes: "Growing family. Needs good school district. Work from home - needs office space.",
    assignedAgent: "Michael Chen",
    assignedAgentId: "AGT002",
    propertiesViewed: [],
    favoriteProperties: [],
    lastContact: "2024-12-10",
    nextFollowUp: "2024-12-23",
    createdAt: "2024-12-08",
    updatedAt: "2024-12-10",
    activities: [
      { date: "2024-12-10", type: "call", notes: "Initial consultation - discussed needs" },
      { date: "2024-12-08", type: "open-house", notes: "Met at PROP002 open house" }
    ]
  },
  {
    id: "LEAD004",
    leadId: "RL-2024-004",
    firstName: "Sarah",
    lastName: "Martinez",
    email: "sarah.m@email.com",
    phone: "+1 (555) 604-4004",
    type: "seller",
    status: "hot",
    source: "Website",
    propertyAddress: "350 East 72nd Street, Apt 12C, New York, NY",
    estimatedValue: 1200000,
    motivation: "Downsizing - kids moved out",
    timeline: "ASAP",
    notes: "Looking to sell and buy smaller unit. Wants to stay in Upper East Side.",
    assignedAgent: "Jennifer Martinez",
    assignedAgentId: "AGT001",
    preApproved: false,
    preApprovalAmount: null,
    preApprovalLender: null,
    lastContact: "2024-12-20",
    nextFollowUp: "2024-12-21",
    createdAt: "2024-12-15",
    updatedAt: "2024-12-20",
    activities: [
      { date: "2024-12-20", type: "meeting", notes: "Property walkthrough for listing" },
      { date: "2024-12-17", type: "call", notes: "Discussed selling process and timeline" },
      { date: "2024-12-15", type: "inquiry", notes: "Website inquiry - wants to sell" }
    ]
  },
  {
    id: "LEAD005",
    leadId: "RL-2024-005",
    firstName: "David",
    lastName: "Thompson",
    email: "david.t@email.com",
    phone: "+1 (555) 605-5005",
    type: "investor",
    status: "active",
    source: "LinkedIn",
    budget: { min: 1000000, max: 3000000 },
    preferences: {
      propertyTypes: ["multi-family", "commercial"],
      locations: ["Chicago", "Detroit", "Cleveland"],
      capRate: { min: 5, max: 8 },
      features: ["value-add", "stable-income"]
    },
    preApproved: false,
    preApprovalAmount: null,
    preApprovalLender: null,
    investmentGoals: "Cash flow and appreciation",
    timeline: "Opportunistic",
    notes: "Portfolio investor. Has purchased 3 properties through us. Prefers off-market deals.",
    assignedAgent: "Thomas Wilson",
    assignedAgentId: "AGT006",
    propertiesViewed: ["PROP007"],
    favoriteProperties: ["PROP007"],
    lastContact: "2024-12-16",
    nextFollowUp: "2024-12-24",
    createdAt: "2024-06-20",
    updatedAt: "2024-12-16",
    activities: [
      { date: "2024-12-16", type: "showing", notes: "Toured PROP007 - running numbers" },
      { date: "2024-12-01", type: "email", notes: "Sent new multi-family listings" },
      { date: "2024-11-15", type: "call", notes: "Quarterly check-in call" }
    ]
  }
];

export const leadStatuses = [
  { id: "new", name: "New", color: "#0ea5e9" },
  { id: "hot", name: "Hot", color: "#ef4444" },
  { id: "warm", name: "Warm", color: "#f59e0b" },
  { id: "active", name: "Active", color: "#10b981" },
  { id: "cold", name: "Cold", color: "#64748b" },
  { id: "converted", name: "Converted", color: "#8b5cf6" },
  { id: "lost", name: "Lost", color: "#1e293b" }
];

export const showings: Showing[] = [
  {
    id: "SHW001",
    propertyId: "PROP001",
    propertyAddress: "500 Park Avenue, PH-A, New York",
    leadId: "LEAD001",
    leadName: "James Peterson",
    agentId: "AGT001",
    agentName: "Jennifer Martinez",
    date: "2024-12-22",
    startTime: "14:00",
    endTime: "15:00",
    status: "scheduled",
    type: "private",
    notes: "Second showing. Bring comparable sales data.",
    feedback: null,
    followUp: null,
    createdAt: "2024-12-19"
  },
  {
    id: "SHW002",
    propertyId: "PROP004",
    propertyAddress: "156 Bergen Street, Brooklyn",
    leadId: "LEAD002",
    leadName: "Emily Chang",
    agentId: "AGT004",
    agentName: "Amanda Lee",
    date: "2024-12-21",
    startTime: "11:00",
    endTime: "12:00",
    status: "scheduled",
    type: "open-house",
    notes: "Open house - multiple attendees expected",
    feedback: null,
    followUp: null,
    createdAt: "2024-12-15"
  },
  {
    id: "SHW003",
    propertyId: "PROP001",
    propertyAddress: "500 Park Avenue, PH-A, New York",
    leadId: "LEAD001",
    leadName: "James Peterson",
    agentId: "AGT001",
    agentName: "Jennifer Martinez",
    date: "2024-12-19",
    startTime: "10:00",
    endTime: "11:30",
    status: "completed",
    type: "private",
    notes: "First showing",
    feedback: "Client loved the views and finishes. Concerned about HOA fees. Wants to see comparable sales.",
    interestLevel: 4,
    followUp: "Send comps and schedule second showing",
    createdAt: "2024-12-16"
  },
  {
    id: "SHW004",
    propertyId: "PROP007",
    propertyAddress: "1842 North Avenue, Chicago",
    leadId: "LEAD005",
    leadName: "David Thompson",
    agentId: "AGT006",
    agentName: "Thomas Wilson",
    date: "2024-12-16",
    startTime: "14:00",
    endTime: "16:00",
    status: "completed",
    type: "private",
    notes: "Investment property tour with full financials review",
    feedback: "Running cap rate analysis. Wants to negotiate on price based on deferred maintenance.",
    interestLevel: 3,
    followUp: "Prepare counter-offer strategy with seller",
    createdAt: "2024-12-12"
  },
  {
    id: "SHW005",
    propertyId: "PROP002",
    propertyAddress: "245 Oak Valley Drive, Los Angeles",
    leadId: null,
    leadName: "Open House Attendees",
    agentId: "AGT002",
    agentName: "Michael Chen",
    date: "2024-12-15",
    startTime: "14:00",
    endTime: "17:00",
    status: "completed",
    type: "open-house",
    notes: "Sunday open house",
    feedback: "15 groups attended. 3 strong prospects collected.",
    attendees: 15,
    leadsGenerated: 3,
    followUp: "Follow up with leads: Williams, Garcia, Kim families",
    createdAt: "2024-12-10"
  }
];

export const transactions: Transaction[] = [
  {
    id: "TRX001",
    transactionId: "TX-2024-001",
    type: "sale",
    status: "closed",
    propertyId: "PROP010",
    propertyAddress: "892 Madison Avenue, Apt 5B, New York",
    buyer: {
      name: "Michael & Lisa Roberts",
      email: "mroberts@email.com",
      phone: "+1 (555) 701-1001",
      attorney: "Smith & Associates"
    },
    seller: {
      name: "Estate of John Wilson",
      email: "jwilson.estate@email.com",
      phone: "+1 (555) 702-2002",
      attorney: "Johnson Legal"
    },
    listingAgent: {
      id: "AGT001",
      name: "Jennifer Martinez"
    },
    buyerAgent: {
      id: "AGT003",
      name: "Sarah Johnson"
    },
    listPrice: 2200000,
    salePrice: 2150000,
    closingDate: "2024-12-15",
    contractDate: "2024-11-01",
    listingDate: "2024-09-15",
    daysOnMarket: 47,
    commission: {
      total: 107500,
      listingSide: 53750,
      buyerSide: 53750,
      rate: 5
    },
    timeline: [
      { date: "2024-09-15", event: "Listed", notes: "" },
      { date: "2024-10-28", event: "Offer Received", notes: "Full price offer" },
      { date: "2024-11-01", event: "Contract Signed", notes: "" },
      { date: "2024-11-15", event: "Inspection Complete", notes: "Minor issues resolved" },
      { date: "2024-12-01", event: "Mortgage Approved", notes: "" },
      { date: "2024-12-15", event: "Closed", notes: "Smooth closing" }
    ],
    documents: ["Contract", "Inspection Report", "Appraisal", "Closing Statement"],
    notes: "Estate sale. Smooth transaction. Buyers relocating from Boston.",
    createdAt: "2024-09-15",
    updatedAt: "2024-12-15"
  },
  {
    id: "TRX002",
    transactionId: "TX-2024-002",
    type: "sale",
    status: "pending",
    propertyId: "PROP003",
    propertyAddress: "888 Market Street, #2401, San Francisco",
    buyer: {
      name: "Tech Ventures Inc",
      email: "acquisitions@techventures.com",
      phone: "+1 (555) 703-3003",
      attorney: "Bay Area Legal"
    },
    seller: {
      name: "David Kim",
      email: "david.kim@email.com",
      phone: "+1 (555) 704-4004",
      attorney: "Kim & Partners"
    },
    listingAgent: {
      id: "AGT003",
      name: "Sarah Johnson"
    },
    buyerAgent: {
      id: "AGT007",
      name: "External Agent - RE/MAX"
    },
    listPrice: 1850000,
    offerPrice: 1800000,
    contractDate: "2024-12-15",
    listingDate: "2024-09-20",
    expectedClosing: "2025-01-20",
    daysOnMarket: 86,
    commission: {
      total: 90000,
      listingSide: 45000,
      buyerSide: 45000,
      rate: 5
    },
    currentStep: "Due Diligence",
    timeline: [
      { date: "2024-09-20", event: "Listed", notes: "" },
      { date: "2024-12-10", event: "Offer Received", notes: "$50K below asking" },
      { date: "2024-12-15", event: "Contract Signed", notes: "After negotiation" },
      { date: "2024-12-20", event: "Inspection Scheduled", notes: "Dec 22" }
    ],
    documents: ["Contract", "Disclosures"],
    notes: "All-cash buyer. 30-day close requested.",
    createdAt: "2024-12-10",
    updatedAt: "2024-12-18"
  },
  {
    id: "TRX003",
    transactionId: "TX-2024-003",
    type: "lease",
    status: "active",
    propertyId: "PROP008",
    propertyAddress: "45 Commonwealth Avenue, #3A, Boston",
    tenant: {
      name: "John Smith",
      email: "john.smith@email.com",
      phone: "+1 (555) 705-5005",
      employer: "Boston Consulting Group"
    },
    landlord: {
      name: "Back Bay Realty Trust",
      email: "management@backbayrealty.com",
      phone: "+1 (555) 706-6006"
    },
    listingAgent: {
      id: "AGT004",
      name: "Amanda Lee"
    },
    monthlyRent: 3200,
    securityDeposit: 3200,
    leaseStart: "2024-11-15",
    leaseEnd: "2025-11-14",
    leaseTerm: 12,
    contractDate: "2024-11-01",
    listingDate: "2024-10-01",
    commission: {
      total: 3200,
      amount: 3200,
      type: "one-month"
    },
    timeline: [
      { date: "2024-10-01", event: "Listed", notes: "" },
      { date: "2024-10-28", event: "Application Received", notes: "" },
      { date: "2024-11-01", event: "Lease Signed", notes: "" },
      { date: "2024-11-15", event: "Move-In", notes: "" }
    ],
    documents: ["Lease Agreement", "Application", "Credit Check"],
    notes: "Professional tenant. Excellent references.",
    createdAt: "2024-11-01",
    updatedAt: "2024-11-15"
  }
];

export const agents: Agent[] = [
  {
    id: "AGT001",
    name: "Jennifer Martinez",
    email: "jennifer.m@realestate.com",
    phone: "+1 (555) 501-1001",
    photo: null,
    title: "Senior Sales Agent",
    licenseNumber: "NYS-RE-123456",
    licenseExpiry: "2025-12-31",
    specializations: ["Luxury", "Manhattan", "Investment"],
    bio: "Top-producing agent with 12 years of experience in Manhattan luxury real estate. Consistently ranked in top 1% of NYC agents.",
    status: "active",
    joinDate: "2018-03-15",
    teamId: "TEAM001",
    teamName: "Manhattan Luxury Team",
    stats: {
      activeListings: 8,
      totalSalesYTD: 45000000,
      transactionsYTD: 18,
      avgDaysOnMarket: 42,
      listToSaleRatio: 97.5
    },
    commission: {
      split: 70,
      ytdEarnings: 675000
    },
    reviews: 48,
    rating: 4.9,
    socialMedia: {
      linkedin: "linkedin.com/in/jennifermartinez",
      instagram: "@jennifer_realestate"
    }
  },
  {
    id: "AGT002",
    name: "Michael Chen",
    email: "michael.c@realestate.com",
    phone: "+1 (555) 502-2002",
    photo: null,
    title: "Sales Agent",
    licenseNumber: "CA-DRE-987654",
    licenseExpiry: "2026-06-30",
    specializations: ["Residential", "Los Angeles", "First-Time Buyers"],
    bio: "Dedicated agent helping families find their dream homes in Los Angeles. Specialized in Westside communities.",
    status: "active",
    joinDate: "2020-06-01",
    teamId: null,
    teamName: null,
    stats: {
      activeListings: 5,
      totalSalesYTD: 18000000,
      transactionsYTD: 12,
      avgDaysOnMarket: 38,
      listToSaleRatio: 96.2
    },
    commission: {
      split: 60,
      ytdEarnings: 324000
    },
    reviews: 32,
    rating: 4.8,
    socialMedia: {
      linkedin: "linkedin.com/in/michaelchen",
      instagram: null
    }
  },
  {
    id: "AGT003",
    name: "Sarah Johnson",
    email: "sarah.j@realestate.com",
    phone: "+1 (555) 503-3003",
    photo: null,
    title: "Associate Broker",
    licenseNumber: "CA-DRE-456789",
    licenseExpiry: "2025-09-30",
    specializations: ["San Francisco", "Tech Industry", "Condos"],
    bio: "Helping tech professionals navigate the San Francisco real estate market since 2015.",
    status: "active",
    joinDate: "2019-01-15",
    teamId: "TEAM002",
    teamName: "SF Bay Team",
    stats: {
      activeListings: 6,
      totalSalesYTD: 22000000,
      transactionsYTD: 15,
      avgDaysOnMarket: 35,
      listToSaleRatio: 98.1
    },
    commission: {
      split: 65,
      ytdEarnings: 357500
    },
    reviews: 41,
    rating: 4.9,
    socialMedia: {
      linkedin: "linkedin.com/in/sarahjohnson",
      instagram: "@sarahj_sfrealestate"
    }
  },
  {
    id: "AGT004",
    name: "Amanda Lee",
    email: "amanda.l@realestate.com",
    phone: "+1 (555) 504-4004",
    photo: null,
    title: "Rental Specialist",
    licenseNumber: "NYS-RE-789012",
    licenseExpiry: "2025-08-15",
    specializations: ["Rentals", "Brooklyn", "Relocations"],
    bio: "Brooklyn rental expert helping newcomers find their perfect neighborhood and apartment.",
    status: "active",
    joinDate: "2021-03-01",
    teamId: null,
    teamName: null,
    stats: {
      activeListings: 12,
      totalRentalsYTD: 85,
      avgDaysOnMarket: 14,
      clientSatisfaction: 98
    },
    commission: {
      split: 55,
      ytdEarnings: 156000
    },
    reviews: 67,
    rating: 4.8,
    socialMedia: {
      linkedin: "linkedin.com/in/amandalee",
      instagram: "@amanda_bklyn_rentals"
    }
  },
  {
    id: "AGT005",
    name: "Carlos Rodriguez",
    email: "carlos.r@realestate.com",
    phone: "+1 (555) 505-5005",
    photo: null,
    title: "Sales Agent",
    licenseNumber: "FL-RE-345678",
    licenseExpiry: "2026-03-31",
    specializations: ["Miami", "Waterfront", "International Buyers"],
    bio: "Bilingual agent specializing in Miami waterfront properties and international clientele.",
    status: "active",
    joinDate: "2020-09-15",
    teamId: "TEAM003",
    teamName: "Miami Luxury Team",
    stats: {
      activeListings: 7,
      totalSalesYTD: 28000000,
      transactionsYTD: 14,
      avgDaysOnMarket: 45,
      listToSaleRatio: 95.8
    },
    commission: {
      split: 60,
      ytdEarnings: 420000
    },
    reviews: 28,
    rating: 4.7,
    socialMedia: {
      linkedin: "linkedin.com/in/carlosrodriguez",
      instagram: "@carlos_miami_realestate"
    }
  },
  {
    id: "AGT006",
    name: "Thomas Wilson",
    email: "thomas.w@realestate.com",
    phone: "+1 (555) 506-6006",
    photo: null,
    title: "Commercial & Investment Specialist",
    licenseNumber: "IL-RE-567890",
    licenseExpiry: "2025-11-30",
    specializations: ["Commercial", "Multi-Family", "Investment"],
    bio: "Former financial analyst bringing analytical expertise to commercial and investment real estate.",
    status: "active",
    joinDate: "2019-06-01",
    teamId: null,
    teamName: null,
    stats: {
      activeListings: 4,
      totalSalesYTD: 15000000,
      transactionsYTD: 8,
      avgDaysOnMarket: 65,
      avgCapRate: 5.8
    },
    commission: {
      split: 65,
      ytdEarnings: 292500
    },
    reviews: 19,
    rating: 4.9,
    socialMedia: {
      linkedin: "linkedin.com/in/thomaswilson",
      instagram: null
    }
  }
];

export const owners: Owner[] = [
  {
    id: "OWN001",
    name: "Manhattan Holdings LLC",
    type: "company",
    email: "contact@manhattanholdings.com",
    phone: "+1 (555) 801-1001",
    address: "One Wall Street, New York, NY 10005",
    properties: ["PROP001"],
    totalProperties: 12,
    activeListings: 1,
    primaryContact: {
      name: "Richard Sterling",
      title: "Managing Director",
      email: "rsterling@manhattanholdings.com",
      phone: "+1 (555) 801-1002"
    },
    preferredAgent: "AGT001",
    notes: "Major developer. Multiple luxury properties in Manhattan.",
    createdAt: "2022-01-15"
  },
  {
    id: "OWN002",
    name: "Robert & Sarah Williams",
    type: "individual",
    email: "williams.family@email.com",
    phone: "+1 (555) 802-2002",
    address: "245 Oak Valley Drive, Los Angeles, CA 90049",
    properties: ["PROP002"],
    totalProperties: 1,
    activeListings: 1,
    primaryContact: null,
    preferredAgent: "AGT002",
    notes: "Relocating to East Coast. Motivated seller.",
    createdAt: "2024-10-10"
  },
  {
    id: "OWN003",
    name: "David Kim",
    type: "individual",
    email: "david.kim@email.com",
    phone: "+1 (555) 803-3003",
    address: "888 Market Street, #2401, San Francisco, CA 94102",
    properties: ["PROP003"],
    totalProperties: 1,
    activeListings: 1,
    primaryContact: null,
    preferredAgent: "AGT003",
    notes: "Job transfer to NYC. Needs quick sale.",
    createdAt: "2024-09-15"
  },
  {
    id: "OWN004",
    name: "Brooklyn Properties Inc",
    type: "company",
    email: "leasing@brooklynproperties.com",
    phone: "+1 (555) 804-4004",
    address: "100 Court Street, Brooklyn, NY 11201",
    properties: ["PROP004"],
    totalProperties: 45,
    activeListings: 8,
    primaryContact: {
      name: "Maria Santos",
      title: "Leasing Manager",
      email: "msantos@brooklynproperties.com",
      phone: "+1 (555) 804-4005"
    },
    preferredAgent: "AGT004",
    notes: "Large portfolio in Brooklyn. Regular client.",
    createdAt: "2020-03-01"
  }
];

export const commissions: Commission[] = [
  {
    id: "COM001",
    transactionId: "TRX001",
    propertyAddress: "892 Madison Avenue, Apt 5B, New York",
    transactionType: "sale",
    closeDate: "2024-12-15",
    salePrice: 2150000,
    totalCommission: 107500,
    agentId: "AGT001",
    agentName: "Jennifer Martinez",
    side: "listing",
    grossCommission: 53750,
    split: 70,
    netCommission: 37625,
    status: "paid",
    paidDate: "2024-12-18",
    notes: ""
  },
  {
    id: "COM002",
    transactionId: "TRX001",
    propertyAddress: "892 Madison Avenue, Apt 5B, New York",
    transactionType: "sale",
    closeDate: "2024-12-15",
    salePrice: 2150000,
    totalCommission: 107500,
    agentId: "AGT003",
    agentName: "Sarah Johnson",
    side: "buyer",
    grossCommission: 53750,
    split: 65,
    netCommission: 34937.50,
    status: "paid",
    paidDate: "2024-12-18",
    notes: ""
  },
  {
    id: "COM003",
    transactionId: "TRX003",
    propertyAddress: "45 Commonwealth Avenue, #3A, Boston",
    transactionType: "lease",
    closeDate: "2024-11-15",
    monthlyRent: 3200,
    totalCommission: 3200,
    agentId: "AGT004",
    agentName: "Amanda Lee",
    side: "listing",
    grossCommission: 3200,
    split: 55,
    netCommission: 1760,
    status: "paid",
    paidDate: "2024-11-20",
    notes: "One month commission"
  },
  {
    id: "COM004",
    transactionId: "TRX002",
    propertyAddress: "888 Market Street, #2401, San Francisco",
    transactionType: "sale",
    closeDate: "2025-01-20",
    salePrice: 1800000,
    totalCommission: 90000,
    agentId: "AGT003",
    agentName: "Sarah Johnson",
    side: "listing",
    grossCommission: 45000,
    split: 65,
    netCommission: 29250,
    status: "pending",
    paidDate: null,
    notes: "Expected closing Jan 20, 2025"
  }
];

export const realestateStats: RealEstateStats = {
  activeListings: 24,
  pendingTransactions: 8,
  closedThisMonth: 5,
  totalVolume: {
    thisMonth: 12500000,
    lastMonth: 9800000,
    ytd: 125000000
  },
  avgDaysOnMarket: 42,
  listToSaleRatio: 97.2,
  activeLeads: 45,
  showingsThisWeek: 18,
  commissionsPending: 185000,
  commissionsYTD: 3250000
};

// Helper functions
export const formatCurrency = (amount: number): string => {
  if (amount >= 1000000) {
    return `$${(amount / 1000000).toFixed(1)}M`;
  }
  if (amount >= 1000) {
    return `$${(amount / 1000).toFixed(0)}K`;
  }
  return `$${amount.toLocaleString()}`;
};

export const formatPrice = (price: number, category: 'sale' | 'rent'): string => {
  if (category === 'rent') {
    return `$${price.toLocaleString()}/mo`;
  }
  return `$${price.toLocaleString()}`;
};

export const getPropertyStatusColor = (status: string): string => {
  const statusColors: Record<string, string> = {
    active: 'bg-emerald-500/20 text-emerald-400',
    pending: 'bg-amber-500/20 text-amber-400',
    sold: 'bg-purple-500/20 text-purple-400',
    rented: 'bg-indigo-500/20 text-indigo-400',
    'off-market': 'bg-slate-500/20 text-slate-400',
    'coming-soon': 'bg-sky-500/20 text-sky-400',
  };
  return statusColors[status] || 'bg-slate-500/20 text-slate-400';
};

export const getLeadStatusColor = (status: string): string => {
  const statusColors: Record<string, string> = {
    new: 'bg-sky-500/20 text-sky-400',
    hot: 'bg-red-500/20 text-red-400',
    warm: 'bg-amber-500/20 text-amber-400',
    active: 'bg-emerald-500/20 text-emerald-400',
    cold: 'bg-slate-500/20 text-slate-400',
    converted: 'bg-purple-500/20 text-purple-400',
    lost: 'bg-slate-700/50 text-slate-500',
  };
  return statusColors[status] || 'bg-slate-500/20 text-slate-400';
};

export const getLeadTypeColor = (type: string): string => {
  const typeColors: Record<string, string> = {
    buyer: 'bg-emerald-500/20 text-emerald-400',
    renter: 'bg-blue-500/20 text-blue-400',
    seller: 'bg-purple-500/20 text-purple-400',
    investor: 'bg-amber-500/20 text-amber-400',
  };
  return typeColors[type] || 'bg-slate-500/20 text-slate-400';
};

export const getShowingStatusColor = (status: string): string => {
  const statusColors: Record<string, string> = {
    scheduled: 'bg-blue-500/20 text-blue-400',
    completed: 'bg-emerald-500/20 text-emerald-400',
    cancelled: 'bg-red-500/20 text-red-400',
  };
  return statusColors[status] || 'bg-slate-500/20 text-slate-400';
};

export const getTransactionStatusColor = (status: string): string => {
  const statusColors: Record<string, string> = {
    pending: 'bg-amber-500/20 text-amber-400',
    active: 'bg-emerald-500/20 text-emerald-400',
    closed: 'bg-purple-500/20 text-purple-400',
  };
  return statusColors[status] || 'bg-slate-500/20 text-slate-400';
};

export const getCommissionStatusColor = (status: string): string => {
  const statusColors: Record<string, string> = {
    pending: 'bg-amber-500/20 text-amber-400',
    paid: 'bg-emerald-500/20 text-emerald-400',
  };
  return statusColors[status] || 'bg-slate-500/20 text-slate-400';
};

// Menu items for sidebar
export const realestateMenuItems = [
  { id: 'properties', label: 'Properties', icon: Building, color: '#6366f1', path: '/dashboard/realestate/properties' },
  { id: 'leads', label: 'Leads', icon: Users, color: '#ef4444', path: '/dashboard/realestate/leads' },
  { id: 'showings', label: 'Showings', icon: Calendar, color: '#f59e0b', path: '/dashboard/realestate/showings' },
  { id: 'transactions', label: 'Transactions', icon: DollarSign, color: '#10b981', path: '/dashboard/realestate/transactions' },
  { id: 'owners', label: 'Owners', icon: UserCheck, color: '#8b5cf6', path: '/dashboard/realestate/owners' },
  { id: 'agents', label: 'Agents', icon: Briefcase, color: '#06b6d4', path: '/dashboard/realestate/agents' },
  { id: 'commissions', label: 'Commissions', icon: DollarSign, color: '#22c55e', path: '/dashboard/realestate/commissions' },
  { id: 'listings-portal', label: 'Listings Portal', icon: Globe, color: '#3b82f6', path: '/dashboard/realestate/listings-portal' },
];
