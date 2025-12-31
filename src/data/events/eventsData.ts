// Events Management Module - Data and Types

// Types
export interface EventClient {
  id: string;
  name: string;
  contact: string;
  email: string;
  phone: string;
}

export interface EventVenueRef {
  id: string;
  name: string;
  address: string;
  capacity: number;
}

export interface EventDates {
  start: string;
  end: string;
  setupStart: string;
  teardownEnd: string;
}

export interface EventTimes {
  doorsOpen?: string;
  eventStart?: string;
  eventEnd?: string;
  ceremonyStart?: string;
  receptionStart?: string;
}

export interface TicketType {
  name: string;
  price: number;
  quantity: number;
  sold: number;
}

export interface EventBudgetSummary {
  estimated: number;
  actual: number;
  revenue: number;
  profit: number;
  donations?: number;
}

export interface EventTeamMember {
  id: string;
  name: string;
  role: string;
}

export interface EventSponsor {
  name: string;
  level: string;
  amount: number;
}

export interface AgendaDay {
  day: number;
  sessions: number;
  keynotes: number;
  workshops: number;
  networking: number;
}

export interface CateringInfo {
  provider: string;
  mealsIncluded: string[];
  dietaryOptions: string[];
}

export interface WeddingDetails {
  ceremony: string;
  theme: string;
  colors: string[];
  bridesmaids: number;
  groomsmen: number;
  photographer: string;
  florist: string;
  band: string;
  officiant: string;
}

export interface Entertainment {
  host?: string;
  band?: string;
  dj?: string;
  specialGuest?: string;
}

export interface SilentAuction {
  items: number;
  estimatedValue: number;
  targetRaise: number;
}

export interface Competition {
  totalStartups: number;
  rounds: string[];
  judges: number;
  prizes: { place: string; amount: number }[];
}

export interface Stage {
  name: string;
  capacity: number;
  headliner: string;
}

export interface Activity {
  name: string;
  day: number;
  time: string;
}

export interface Accommodations {
  rooms: number;
  type: string;
  nights: number;
}

export interface Awards {
  categories: number;
  nominees: number;
  winners: number;
}

export interface Event {
  id: string;
  eventId: string;
  name: string;
  type: string;
  category: string;
  status: string;
  description: string;
  client: EventClient;
  venue: EventVenueRef;
  dates: EventDates;
  times: EventTimes;
  expectedAttendees: number;
  registeredAttendees: number;
  checkedIn: number;
  ticketTypes: TicketType[];
  budget: EventBudgetSummary;
  team: EventTeamMember[];
  eventManager: string;
  sponsors: EventSponsor[];
  agenda?: AgendaDay[];
  vendors: string[];
  catering?: CateringInfo;
  equipment?: string[];
  weddingDetails?: WeddingDetails;
  entertainment?: Entertainment;
  silentAuction?: SilentAuction;
  competition?: Competition;
  stages?: Stage[];
  artists?: number;
  activities?: Activity[];
  accommodations?: Accommodations;
  awards?: Awards;
  notes: string;
  createdAt: string;
  updatedAt: string;
}

export interface EventType {
  id: string;
  name: string;
  icon: string;
  color: string;
}

export interface EventStatus {
  id: string;
  name: string;
  color: string;
}

export interface VenueCapacity {
  max: number;
  theater?: number;
  banquet?: number;
  classroom?: number;
  cocktail?: number;
  ceremony?: number;
  reception?: number;
  seated?: number;
  general?: number;
  conference?: number;
  outdoor?: number;
}

export interface VenueSpace {
  name: string;
  capacity: number;
  sqft: number;
}

export interface VenueContact {
  name: string;
  email: string;
  phone: string;
}

export interface VenuePricing {
  fullDay?: number;
  halfDay?: number;
  perHour?: number;
  weekend?: number;
  ceremony?: number;
  reception?: number;
  fullEvening?: number;
  minimumSpend?: number;
  perDay?: number;
  fullWeek?: number;
  perPerson?: number;
  meetingRoom?: number;
  fullBuyout?: number;
  evening?: number;
  nonprofit?: number;
}

export interface Venue {
  id: string;
  name: string;
  type: string;
  address: string;
  city: string;
  state: string;
  capacity: VenueCapacity;
  spaces: VenueSpace[];
  amenities: string[];
  contact: VenueContact;
  pricing: VenuePricing;
  rating: number;
  images: string[];
  notes: string;
  status: string;
  createdAt: string;
}

export interface VendorContact {
  name: string;
  email: string;
  phone: string;
}

export interface EventVendor {
  id: string;
  name: string;
  category: string;
  services: string[];
  contact: VendorContact;
  address: string;
  rating: number;
  priceRange: string;
  notes: string;
  status: string;
  createdAt: string;
}

export interface VendorCategory {
  id: string;
  name: string;
  icon: string;
}

export interface Guest {
  id: string;
  eventId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: string | null;
  title: string;
  ticketType: string | null;
  status: string;
  checkedIn: boolean;
  checkedInAt: string | null;
  tableNumber: string | null;
  dietaryRestrictions: string;
  specialRequests: string | null;
  registeredAt: string;
  source: string;
  tags: string[];
}

export interface GuestStatus {
  id: string;
  name: string;
  color: string;
}

export interface Equipment {
  id: string;
  name: string;
  category: string;
  vendor: string;
  vendorId: string;
  quantity: number;
  unitCost: number;
  totalCost: number;
  eventId: string;
  status: string;
  deliveryDate: string;
  returnDate: string;
  notes: string;
}

export interface BudgetCategory {
  id: string;
  name: string;
  icon: string;
}

export interface BudgetCategoryItem {
  category: string;
  budgeted: number;
  spent: number;
  committed: number;
}

export interface BudgetExpense {
  id: number;
  date: string;
  category: string;
  description: string;
  amount: number;
  vendor: string;
  status: string;
}

export interface BudgetRevenue {
  ticketSales: number;
  sponsorships: number;
  other: number;
  total: number;
}

export interface EventBudget {
  id: string;
  eventId: string;
  eventName: string;
  totalBudget: number;
  totalSpent: number;
  totalCommitted: number;
  remaining: number;
  categories: BudgetCategoryItem[];
  expenses: BudgetExpense[];
  revenue: BudgetRevenue;
  createdAt: string;
  updatedAt: string;
}

export interface EventsStats {
  totalEvents: number;
  upcomingEvents: number;
  activeEvents: number;
  completedEvents: number;
  totalRevenue: {
    ytd: number;
    thisMonth: number;
  };
  totalGuests: {
    registered: number;
    attended: number;
  };
  avgAttendanceRate: number;
  topVenues: { name: string; events: number }[];
  upcomingThisMonth: number;
}

// Mock Data
export const events: Event[] = [
  {
    id: "EVT001",
    eventId: "EV-2024-001",
    name: "TechConnect Summit 2025",
    type: "conference",
    category: "Corporate",
    status: "upcoming",
    description: "Annual technology conference bringing together industry leaders, innovators, and tech enthusiasts. Features keynotes, workshops, networking sessions, and product showcases.",
    client: {
      id: "ECLT001",
      name: "TechConnect Inc",
      contact: "Sarah Mitchell",
      email: "sarah@techconnect.com",
      phone: "+1 (555) 701-1001"
    },
    venue: {
      id: "VEN001",
      name: "Grand Convention Center",
      address: "500 Convention Blvd, San Francisco, CA 94102",
      capacity: 5000
    },
    dates: {
      start: "2025-03-15",
      end: "2025-03-17",
      setupStart: "2025-03-13",
      teardownEnd: "2025-03-18"
    },
    times: {
      doorsOpen: "08:00",
      eventStart: "09:00",
      eventEnd: "18:00"
    },
    expectedAttendees: 3500,
    registeredAttendees: 2847,
    checkedIn: 0,
    ticketTypes: [
      { name: "General Admission", price: 299, quantity: 2000, sold: 1650 },
      { name: "VIP Pass", price: 599, quantity: 500, sold: 423 },
      { name: "Workshop Add-on", price: 149, quantity: 1000, sold: 774 }
    ],
    budget: {
      estimated: 450000,
      actual: 425000,
      revenue: 687000,
      profit: 262000
    },
    team: [
      { id: "EMP001", name: "Jennifer Adams", role: "Event Director" },
      { id: "EMP002", name: "Michael Chen", role: "Production Manager" },
      { id: "EMP003", name: "Lisa Rodriguez", role: "Registration Lead" },
      { id: "EMP004", name: "David Kim", role: "Sponsorship Manager" }
    ],
    eventManager: "Jennifer Adams",
    sponsors: [
      { name: "TechGiant", level: "Platinum", amount: 100000 },
      { name: "CloudSoft", level: "Gold", amount: 50000 },
      { name: "DataFlow", level: "Silver", amount: 25000 }
    ],
    agenda: [
      { day: 1, sessions: 12, keynotes: 2, workshops: 4, networking: 2 },
      { day: 2, sessions: 15, keynotes: 1, workshops: 6, networking: 3 },
      { day: 3, sessions: 10, keynotes: 1, workshops: 4, networking: 2 }
    ],
    vendors: ["VND001", "VND002", "VND003", "VND004"],
    catering: {
      provider: "VND002",
      mealsIncluded: ["breakfast", "lunch"],
      dietaryOptions: ["vegetarian", "vegan", "gluten-free", "halal"]
    },
    equipment: ["EQP001", "EQP002", "EQP003"],
    notes: "Largest event of the year. CEO keynote on Day 1.",
    createdAt: "2024-09-01",
    updatedAt: "2024-12-20"
  },
  {
    id: "EVT002",
    eventId: "EV-2024-002",
    name: "Johnson-Williams Wedding",
    type: "wedding",
    category: "Social",
    status: "upcoming",
    description: "Elegant garden wedding ceremony and reception for Emily Johnson and Michael Williams. 200 guests expected.",
    client: {
      id: "ECLT002",
      name: "Johnson Family",
      contact: "Emily Johnson",
      email: "emily.johnson@email.com",
      phone: "+1 (555) 702-2001"
    },
    venue: {
      id: "VEN002",
      name: "Rosewood Garden Estate",
      address: "1200 Garden Lane, Napa Valley, CA 94558",
      capacity: 300
    },
    dates: {
      start: "2025-06-14",
      end: "2025-06-14",
      setupStart: "2025-06-13",
      teardownEnd: "2025-06-15"
    },
    times: {
      doorsOpen: "15:00",
      ceremonyStart: "16:00",
      receptionStart: "17:30",
      eventEnd: "23:00"
    },
    expectedAttendees: 200,
    registeredAttendees: 186,
    checkedIn: 0,
    ticketTypes: [],
    budget: {
      estimated: 85000,
      actual: 78000,
      revenue: 85000,
      profit: 7000
    },
    team: [
      { id: "EMP005", name: "Amanda Lee", role: "Wedding Coordinator" },
      { id: "EMP006", name: "Rachel Green", role: "Assistant Coordinator" }
    ],
    eventManager: "Amanda Lee",
    sponsors: [],
    vendors: ["VND005", "VND006", "VND007", "VND008", "VND009"],
    catering: {
      provider: "VND005",
      mealsIncluded: ["dinner", "cake", "cocktails"],
      dietaryOptions: ["vegetarian", "vegan", "gluten-free"]
    },
    weddingDetails: {
      ceremony: "Garden Ceremony",
      theme: "Romantic Garden",
      colors: ["Blush Pink", "Ivory", "Gold"],
      bridesmaids: 6,
      groomsmen: 6,
      photographer: "VND006",
      florist: "VND007",
      band: "VND008",
      officiant: "Rev. Thomas Brown"
    },
    notes: "Bride's parents handling most communication. Dietary restrictions for 12 guests.",
    createdAt: "2024-06-15",
    updatedAt: "2024-12-18"
  },
  {
    id: "EVT003",
    eventId: "EV-2024-003",
    name: "Global Marketing Awards 2024",
    type: "gala",
    category: "Corporate",
    status: "completed",
    description: "Annual black-tie gala celebrating excellence in marketing. Features award ceremony, dinner, entertainment, and networking.",
    client: {
      id: "ECLT003",
      name: "Marketing Association",
      contact: "Robert Taylor",
      email: "rtaylor@marketingassoc.org",
      phone: "+1 (555) 703-3001"
    },
    venue: {
      id: "VEN003",
      name: "The Grand Ballroom",
      address: "888 Luxury Ave, New York, NY 10019",
      capacity: 800
    },
    dates: {
      start: "2024-12-10",
      end: "2024-12-10",
      setupStart: "2024-12-09",
      teardownEnd: "2024-12-11"
    },
    times: {
      doorsOpen: "18:00",
      eventStart: "19:00",
      eventEnd: "23:30"
    },
    expectedAttendees: 600,
    registeredAttendees: 587,
    checkedIn: 572,
    ticketTypes: [
      { name: "Individual Seat", price: 500, quantity: 400, sold: 387 },
      { name: "Table of 10", price: 4500, quantity: 20, sold: 20 }
    ],
    budget: {
      estimated: 320000,
      actual: 298000,
      revenue: 393500,
      profit: 95500
    },
    team: [
      { id: "EMP001", name: "Jennifer Adams", role: "Event Director" },
      { id: "EMP007", name: "Thomas Wilson", role: "Production Manager" }
    ],
    eventManager: "Jennifer Adams",
    sponsors: [
      { name: "AdTech Pro", level: "Presenting", amount: 75000 },
      { name: "MediaMax", level: "Gold", amount: 35000 }
    ],
    vendors: ["VND010", "VND011", "VND012"],
    catering: {
      provider: "VND010",
      mealsIncluded: ["dinner", "cocktails", "dessert"],
      dietaryOptions: ["vegetarian", "vegan", "kosher", "halal"]
    },
    entertainment: {
      host: "Celebrity MC",
      band: "Jazz Ensemble",
      dj: "DJ Productions"
    },
    awards: {
      categories: 15,
      nominees: 45,
      winners: 15
    },
    notes: "Highly successful event. Record attendance.",
    createdAt: "2024-07-01",
    updatedAt: "2024-12-12"
  },
  {
    id: "EVT004",
    eventId: "EV-2024-004",
    name: "StartupFest Pitch Competition",
    type: "competition",
    category: "Corporate",
    status: "active",
    description: "Two-day startup pitch competition featuring 50 startups competing for $500,000 in prizes and investor meetings.",
    client: {
      id: "ECLT004",
      name: "Venture Capital Partners",
      contact: "Mark Stevens",
      email: "mark@vcpartners.com",
      phone: "+1 (555) 704-4001"
    },
    venue: {
      id: "VEN004",
      name: "Innovation Hub",
      address: "200 Startup Way, Austin, TX 78701",
      capacity: 1000
    },
    dates: {
      start: "2024-12-20",
      end: "2024-12-21",
      setupStart: "2024-12-19",
      teardownEnd: "2024-12-22"
    },
    times: {
      doorsOpen: "08:30",
      eventStart: "09:00",
      eventEnd: "18:00"
    },
    expectedAttendees: 800,
    registeredAttendees: 756,
    checkedIn: 623,
    ticketTypes: [
      { name: "General Admission", price: 99, quantity: 500, sold: 456 },
      { name: "Investor Pass", price: 299, quantity: 200, sold: 178 },
      { name: "Startup Competitor", price: 0, quantity: 150, sold: 122 }
    ],
    budget: {
      estimated: 180000,
      actual: 165000,
      revenue: 198000,
      profit: 33000
    },
    team: [
      { id: "EMP008", name: "Kevin Park", role: "Event Manager" },
      { id: "EMP009", name: "Sarah Kim", role: "Competition Coordinator" }
    ],
    eventManager: "Kevin Park",
    sponsors: [
      { name: "TechFund", level: "Title", amount: 100000 },
      { name: "StartupBank", level: "Gold", amount: 30000 }
    ],
    competition: {
      totalStartups: 50,
      rounds: ["Preliminary", "Semi-Final", "Final"],
      judges: 10,
      prizes: [
        { place: "1st", amount: 250000 },
        { place: "2nd", amount: 150000 },
        { place: "3rd", amount: 100000 }
      ]
    },
    vendors: ["VND001", "VND013"],
    catering: {
      provider: "VND013",
      mealsIncluded: ["breakfast", "lunch", "snacks"],
      dietaryOptions: ["vegetarian", "vegan"]
    },
    notes: "Day 1 complete. Finals tomorrow.",
    createdAt: "2024-10-01",
    updatedAt: "2024-12-20"
  },
  {
    id: "EVT005",
    eventId: "EV-2024-005",
    name: "Summer Music Festival 2025",
    type: "festival",
    category: "Entertainment",
    status: "planning",
    description: "Three-day outdoor music festival featuring 40+ artists across 4 stages. Expected 25,000 attendees.",
    client: {
      id: "ECLT005",
      name: "Festival Productions LLC",
      contact: "Alex Turner",
      email: "alex@festivalprod.com",
      phone: "+1 (555) 705-5001"
    },
    venue: {
      id: "VEN005",
      name: "Sunset Valley Amphitheater",
      address: "5000 Valley Road, Los Angeles, CA 90210",
      capacity: 30000
    },
    dates: {
      start: "2025-07-18",
      end: "2025-07-20",
      setupStart: "2025-07-10",
      teardownEnd: "2025-07-25"
    },
    times: {
      doorsOpen: "12:00",
      eventStart: "14:00",
      eventEnd: "23:00"
    },
    expectedAttendees: 25000,
    registeredAttendees: 8500,
    checkedIn: 0,
    ticketTypes: [
      { name: "General Admission - 3 Day", price: 299, quantity: 20000, sold: 6200 },
      { name: "VIP - 3 Day", price: 599, quantity: 3000, sold: 1450 },
      { name: "Single Day Pass", price: 129, quantity: 5000, sold: 850 }
    ],
    budget: {
      estimated: 2500000,
      actual: 0,
      revenue: 1850000,
      profit: 0
    },
    team: [
      { id: "EMP010", name: "Marcus Johnson", role: "Festival Director" },
      { id: "EMP011", name: "Emily White", role: "Artist Relations" },
      { id: "EMP012", name: "Chris Martinez", role: "Operations Manager" },
      { id: "EMP013", name: "Nicole Brown", role: "Marketing Manager" }
    ],
    eventManager: "Marcus Johnson",
    sponsors: [
      { name: "Energy Drink Co", level: "Title", amount: 500000 },
      { name: "Telecom Inc", level: "Presenting", amount: 250000 },
      { name: "Beer Brand", level: "Stage Sponsor", amount: 150000 }
    ],
    stages: [
      { name: "Main Stage", capacity: 15000, headliner: "TBD" },
      { name: "Electronic Stage", capacity: 5000, headliner: "TBD" },
      { name: "Indie Stage", capacity: 3000, headliner: "TBD" },
      { name: "Acoustic Stage", capacity: 2000, headliner: "TBD" }
    ],
    artists: 42,
    vendors: [],
    notes: "Artist booking 60% complete. Marketing campaign launching Feb 1.",
    createdAt: "2024-08-15",
    updatedAt: "2024-12-15"
  },
  {
    id: "EVT006",
    eventId: "EV-2024-006",
    name: "Corporate Team Building Retreat",
    type: "retreat",
    category: "Corporate",
    status: "upcoming",
    description: "Three-day team building retreat for TechCorp executive team. Includes workshops, outdoor activities, and strategy sessions.",
    client: {
      id: "ECLT006",
      name: "TechCorp",
      contact: "HR Director",
      email: "hr@techcorp.com",
      phone: "+1 (555) 706-6001"
    },
    venue: {
      id: "VEN006",
      name: "Mountain View Resort",
      address: "100 Resort Drive, Aspen, CO 81611",
      capacity: 200
    },
    dates: {
      start: "2025-02-12",
      end: "2025-02-14",
      setupStart: "2025-02-11",
      teardownEnd: "2025-02-15"
    },
    times: {
      eventStart: "09:00",
      eventEnd: "21:00"
    },
    expectedAttendees: 50,
    registeredAttendees: 48,
    checkedIn: 0,
    ticketTypes: [],
    budget: {
      estimated: 125000,
      actual: 118000,
      revenue: 125000,
      profit: 7000
    },
    team: [
      { id: "EMP014", name: "Anna Foster", role: "Event Coordinator" }
    ],
    eventManager: "Anna Foster",
    sponsors: [],
    activities: [
      { name: "Strategy Workshop", day: 1, time: "09:00-12:00" },
      { name: "Team Challenges", day: 1, time: "14:00-17:00" },
      { name: "Leadership Training", day: 2, time: "09:00-12:00" },
      { name: "Outdoor Adventure", day: 2, time: "14:00-17:00" },
      { name: "Vision Planning", day: 3, time: "09:00-12:00" }
    ],
    accommodations: {
      rooms: 25,
      type: "Suite",
      nights: 3
    },
    catering: {
      provider: "Resort In-House",
      mealsIncluded: ["all"],
      dietaryOptions: ["vegetarian", "vegan", "gluten-free"]
    },
    vendors: [],
    notes: "All-inclusive package. Focus on leadership development.",
    createdAt: "2024-11-01",
    updatedAt: "2024-12-10"
  },
  {
    id: "EVT007",
    eventId: "EV-2024-007",
    name: "Holiday Charity Gala",
    type: "gala",
    category: "Charity",
    status: "upcoming",
    description: "Annual holiday charity gala to raise funds for children's education. Silent auction, dinner, and entertainment.",
    client: {
      id: "ECLT007",
      name: "Education Foundation",
      contact: "Patricia Moore",
      email: "patricia@edufoundation.org",
      phone: "+1 (555) 707-7001"
    },
    venue: {
      id: "VEN007",
      name: "City Museum Grand Hall",
      address: "1000 Museum Way, Chicago, IL 60601",
      capacity: 500
    },
    dates: {
      start: "2024-12-28",
      end: "2024-12-28",
      setupStart: "2024-12-27",
      teardownEnd: "2024-12-29"
    },
    times: {
      doorsOpen: "18:00",
      eventStart: "19:00",
      eventEnd: "23:00"
    },
    expectedAttendees: 400,
    registeredAttendees: 378,
    checkedIn: 0,
    ticketTypes: [
      { name: "Individual Ticket", price: 250, quantity: 200, sold: 178 },
      { name: "Couple Ticket", price: 450, quantity: 100, sold: 85 },
      { name: "Table of 8", price: 1800, quantity: 15, sold: 12 }
    ],
    budget: {
      estimated: 95000,
      actual: 88000,
      revenue: 145000,
      donations: 275000,
      profit: 332000
    },
    team: [
      { id: "EMP005", name: "Amanda Lee", role: "Event Director" },
      { id: "EMP015", name: "Grace Chen", role: "Auction Coordinator" }
    ],
    eventManager: "Amanda Lee",
    sponsors: [
      { name: "Corporate Sponsor A", level: "Presenting", amount: 50000 },
      { name: "Corporate Sponsor B", level: "Gold", amount: 25000 }
    ],
    silentAuction: {
      items: 75,
      estimatedValue: 120000,
      targetRaise: 180000
    },
    entertainment: {
      band: "Holiday Jazz Band",
      specialGuest: "Local Celebrity"
    },
    vendors: [],
    notes: "Focus on fundraising. Goal is $500K total raised.",
    createdAt: "2024-09-15",
    updatedAt: "2024-12-19"
  }
];

export const eventTypes: EventType[] = [
  { id: "conference", name: "Conference", icon: "Users", color: "#6366f1" },
  { id: "wedding", name: "Wedding", icon: "Heart", color: "#ec4899" },
  { id: "gala", name: "Gala", icon: "Sparkles", color: "#8b5cf6" },
  { id: "festival", name: "Festival", icon: "Music", color: "#f59e0b" },
  { id: "competition", name: "Competition", icon: "Trophy", color: "#10b981" },
  { id: "retreat", name: "Retreat", icon: "Mountain", color: "#0ea5e9" },
  { id: "concert", name: "Concert", icon: "Mic", color: "#ef4444" },
  { id: "tradeshow", name: "Trade Show", icon: "Store", color: "#14b8a6" },
  { id: "seminar", name: "Seminar", icon: "BookOpen", color: "#64748b" },
  { id: "party", name: "Party", icon: "PartyPopper", color: "#f97316" }
];

export const eventStatuses: EventStatus[] = [
  { id: "planning", name: "Planning", color: "#6366f1" },
  { id: "upcoming", name: "Upcoming", color: "#0ea5e9" },
  { id: "active", name: "Active", color: "#10b981" },
  { id: "completed", name: "Completed", color: "#8b5cf6" },
  { id: "cancelled", name: "Cancelled", color: "#ef4444" },
  { id: "postponed", name: "Postponed", color: "#f59e0b" }
];

export const venues: Venue[] = [
  {
    id: "VEN001",
    name: "Grand Convention Center",
    type: "convention-center",
    address: "500 Convention Blvd, San Francisco, CA 94102",
    city: "San Francisco",
    state: "CA",
    capacity: {
      max: 5000,
      theater: 4500,
      banquet: 3000,
      classroom: 2000,
      cocktail: 5000
    },
    spaces: [
      { name: "Main Hall", capacity: 3000, sqft: 45000 },
      { name: "Ballroom A", capacity: 800, sqft: 12000 },
      { name: "Ballroom B", capacity: 800, sqft: 12000 },
      { name: "Meeting Rooms (10)", capacity: 50, sqft: 750 },
      { name: "Breakout Rooms (20)", capacity: 30, sqft: 500 }
    ],
    amenities: ["WiFi", "AV Equipment", "Catering Kitchen", "Parking", "Loading Dock", "Green Room"],
    contact: {
      name: "Events Sales Team",
      email: "events@grandconvention.com",
      phone: "+1 (555) 801-1001"
    },
    pricing: {
      fullDay: 25000,
      halfDay: 15000,
      perHour: 2500
    },
    rating: 4.8,
    images: [],
    notes: "Premium venue. Book 6+ months in advance.",
    status: "active",
    createdAt: "2023-01-15"
  },
  {
    id: "VEN002",
    name: "Rosewood Garden Estate",
    type: "estate",
    address: "1200 Garden Lane, Napa Valley, CA 94558",
    city: "Napa Valley",
    state: "CA",
    capacity: {
      max: 300,
      ceremony: 250,
      reception: 300,
      cocktail: 350
    },
    spaces: [
      { name: "Rose Garden", capacity: 250, sqft: 8000 },
      { name: "Grand Pavilion", capacity: 300, sqft: 6000 },
      { name: "Wine Cellar", capacity: 50, sqft: 1500 },
      { name: "Bridal Suite", capacity: 10, sqft: 800 }
    ],
    amenities: ["Gardens", "Bridal Suite", "Groom Suite", "Catering Kitchen", "Parking", "Shuttle Service"],
    contact: {
      name: "Wedding Coordinator",
      email: "weddings@rosewoodgarden.com",
      phone: "+1 (555) 802-2001"
    },
    pricing: {
      fullDay: 15000,
      weekend: 25000,
      ceremony: 5000,
      reception: 12000
    },
    rating: 4.9,
    images: [],
    notes: "Premier wedding venue. Exclusive use only.",
    status: "active",
    createdAt: "2022-06-01"
  },
  {
    id: "VEN003",
    name: "The Grand Ballroom",
    type: "ballroom",
    address: "888 Luxury Ave, New York, NY 10019",
    city: "New York",
    state: "NY",
    capacity: {
      max: 800,
      theater: 700,
      banquet: 500,
      cocktail: 800
    },
    spaces: [
      { name: "Grand Ballroom", capacity: 800, sqft: 15000 },
      { name: "Pre-Function Area", capacity: 300, sqft: 4000 },
      { name: "VIP Lounge", capacity: 50, sqft: 1000 }
    ],
    amenities: ["Crystal Chandeliers", "Stage", "Dance Floor", "AV System", "Valet Parking", "Coat Check"],
    contact: {
      name: "Ballroom Events",
      email: "events@grandballroom.com",
      phone: "+1 (555) 803-3001"
    },
    pricing: {
      fullEvening: 35000,
      halfDay: 20000,
      minimumSpend: 50000
    },
    rating: 4.9,
    images: [],
    notes: "Luxury venue. F&B minimum required.",
    status: "active",
    createdAt: "2021-03-15"
  },
  {
    id: "VEN004",
    name: "Innovation Hub",
    type: "conference-center",
    address: "200 Startup Way, Austin, TX 78701",
    city: "Austin",
    state: "TX",
    capacity: {
      max: 1000,
      theater: 900,
      classroom: 500,
      cocktail: 1000
    },
    spaces: [
      { name: "Main Auditorium", capacity: 500, sqft: 8000 },
      { name: "Exhibition Hall", capacity: 500, sqft: 10000 },
      { name: "Breakout Rooms (8)", capacity: 40, sqft: 600 },
      { name: "Rooftop Terrace", capacity: 200, sqft: 3000 }
    ],
    amenities: ["High-Speed WiFi", "AV Equipment", "Streaming Setup", "Startup Lounge", "Parking"],
    contact: {
      name: "Hub Events",
      email: "events@innovationhub.com",
      phone: "+1 (555) 804-4001"
    },
    pricing: {
      fullDay: 12000,
      halfDay: 7000,
      perHour: 1500
    },
    rating: 4.7,
    images: [],
    notes: "Tech-focused venue. Great for startups and tech events.",
    status: "active",
    createdAt: "2023-06-01"
  },
  {
    id: "VEN005",
    name: "Sunset Valley Amphitheater",
    type: "outdoor",
    address: "5000 Valley Road, Los Angeles, CA 90210",
    city: "Los Angeles",
    state: "CA",
    capacity: {
      max: 30000,
      seated: 20000,
      general: 30000
    },
    spaces: [
      { name: "Main Field", capacity: 25000, sqft: 200000 },
      { name: "VIP Section", capacity: 3000, sqft: 20000 },
      { name: "Backstage Area", capacity: 500, sqft: 10000 },
      { name: "Vendor Village", capacity: 2000, sqft: 30000 }
    ],
    amenities: ["Main Stage", "Multiple Stages", "VIP Viewing", "Food Courts", "Parking Lots", "Camping Area"],
    contact: {
      name: "Festival Booking",
      email: "booking@sunsetvalley.com",
      phone: "+1 (555) 805-5001"
    },
    pricing: {
      perDay: 75000,
      weekend: 180000,
      fullWeek: 400000
    },
    rating: 4.6,
    images: [],
    notes: "Premier outdoor festival venue. Permits required.",
    status: "active",
    createdAt: "2020-01-15"
  },
  {
    id: "VEN006",
    name: "Mountain View Resort",
    type: "resort",
    address: "100 Resort Drive, Aspen, CO 81611",
    city: "Aspen",
    state: "CO",
    capacity: {
      max: 200,
      conference: 150,
      banquet: 120,
      outdoor: 200
    },
    spaces: [
      { name: "Conference Center", capacity: 150, sqft: 3500 },
      { name: "Grand Dining Room", capacity: 120, sqft: 2800 },
      { name: "Mountain Terrace", capacity: 200, sqft: 5000 },
      { name: "Meeting Rooms (5)", capacity: 25, sqft: 400 }
    ],
    amenities: ["Spa", "Ski Access", "Restaurant", "Bar", "Outdoor Activities", "Team Building Facilities"],
    contact: {
      name: "Group Sales",
      email: "groups@mountainviewresort.com",
      phone: "+1 (555) 806-6001"
    },
    pricing: {
      perPerson: 450,
      meetingRoom: 1000,
      fullBuyout: 85000
    },
    rating: 4.8,
    images: [],
    notes: "All-inclusive resort. Corporate retreat specialist.",
    status: "active",
    createdAt: "2022-09-01"
  },
  {
    id: "VEN007",
    name: "City Museum Grand Hall",
    type: "museum",
    address: "1000 Museum Way, Chicago, IL 60601",
    city: "Chicago",
    state: "IL",
    capacity: {
      max: 500,
      seated: 400,
      cocktail: 500
    },
    spaces: [
      { name: "Grand Hall", capacity: 400, sqft: 8000 },
      { name: "Atrium", capacity: 200, sqft: 4000 },
      { name: "Gallery Spaces", capacity: 100, sqft: 2500 }
    ],
    amenities: ["Historic Architecture", "Art Backdrop", "Catering Kitchen", "Valet Parking", "AV Equipment"],
    contact: {
      name: "Private Events",
      email: "events@citymuseum.org",
      phone: "+1 (555) 807-7001"
    },
    pricing: {
      evening: 18000,
      fullDay: 28000,
      nonprofit: 12000
    },
    rating: 4.7,
    images: [],
    notes: "Unique venue. Museum galleries included for guests.",
    status: "active",
    createdAt: "2021-11-15"
  }
];

export const eventVendors: EventVendor[] = [
  {
    id: "VND001",
    name: "Pro AV Solutions",
    category: "av-equipment",
    services: ["Sound Systems", "Lighting", "Video Production", "LED Walls", "Streaming"],
    contact: {
      name: "Technical Sales",
      email: "sales@proavsolutions.com",
      phone: "+1 (555) 901-1001"
    },
    address: "150 Tech Park, San Francisco, CA",
    rating: 4.9,
    priceRange: "$$$",
    notes: "Premier AV provider. Used for all major conferences.",
    status: "preferred",
    createdAt: "2022-01-01"
  },
  {
    id: "VND002",
    name: "Gourmet Catering Co",
    category: "catering",
    services: ["Full Catering", "Buffet", "Plated Service", "Cocktail Reception", "Dietary Accommodations"],
    contact: {
      name: "Catering Director",
      email: "events@gourmetcatering.com",
      phone: "+1 (555) 902-2001"
    },
    address: "500 Culinary Way, San Francisco, CA",
    rating: 4.8,
    priceRange: "$$$",
    notes: "High-end catering. Excellent for corporate events.",
    status: "preferred",
    createdAt: "2021-06-15"
  },
  {
    id: "VND003",
    name: "Event Decor Plus",
    category: "decor",
    services: ["Floral Arrangements", "Table Settings", "Stage Design", "Themed Decor", "Lighting Design"],
    contact: {
      name: "Design Team",
      email: "design@eventdecorplus.com",
      phone: "+1 (555) 903-3001"
    },
    address: "200 Design District, San Francisco, CA",
    rating: 4.7,
    priceRange: "$$",
    notes: "Creative team. Good for themed events.",
    status: "active",
    createdAt: "2022-03-01"
  },
  {
    id: "VND004",
    name: "Security First Services",
    category: "security",
    services: ["Event Security", "Crowd Management", "VIP Protection", "Access Control"],
    contact: {
      name: "Operations",
      email: "ops@securityfirst.com",
      phone: "+1 (555) 904-4001"
    },
    address: "100 Safety Blvd, San Francisco, CA",
    rating: 4.8,
    priceRange: "$$",
    notes: "Professional security. Required for large events.",
    status: "preferred",
    createdAt: "2021-01-01"
  },
  {
    id: "VND005",
    name: "Elegant Wedding Catering",
    category: "catering",
    services: ["Wedding Catering", "Cake", "Cocktail Hour", "Brunch", "Rehearsal Dinner"],
    contact: {
      name: "Wedding Specialist",
      email: "weddings@elegantcatering.com",
      phone: "+1 (555) 905-5001"
    },
    address: "300 Celebration Ave, Napa, CA",
    rating: 4.9,
    priceRange: "$$$",
    notes: "Specialized in weddings. Award-winning cuisine.",
    status: "preferred",
    createdAt: "2020-08-01"
  },
  {
    id: "VND006",
    name: "Capture Photography",
    category: "photography",
    services: ["Event Photography", "Wedding Photography", "Videography", "Photo Booth", "Drone Photography"],
    contact: {
      name: "Booking",
      email: "book@capturephoto.com",
      phone: "+1 (555) 906-6001"
    },
    address: "450 Lens Lane, Los Angeles, CA",
    rating: 4.9,
    priceRange: "$$",
    notes: "Top-rated photographers. Book well in advance.",
    status: "preferred",
    createdAt: "2021-04-15"
  },
  {
    id: "VND007",
    name: "Bloom Floral Design",
    category: "florist",
    services: ["Wedding Flowers", "Event Florals", "Installations", "Bouquets", "Centerpieces"],
    contact: {
      name: "Lead Designer",
      email: "flowers@bloomfloral.com",
      phone: "+1 (555) 907-7001"
    },
    address: "75 Flower Market, San Francisco, CA",
    rating: 4.8,
    priceRange: "$$$",
    notes: "Luxury floral design. Beautiful installations.",
    status: "active",
    createdAt: "2022-02-01"
  },
  {
    id: "VND008",
    name: "The Party Band",
    category: "entertainment",
    services: ["Live Band", "DJ Services", "Ceremony Music", "Cocktail Hour"],
    contact: {
      name: "Booking Agent",
      email: "book@thepartyband.com",
      phone: "+1 (555) 908-8001"
    },
    address: "Studio Row, Los Angeles, CA",
    rating: 4.7,
    priceRange: "$$",
    notes: "Popular wedding band. Great for all ages.",
    status: "active",
    createdAt: "2021-09-01"
  },
  {
    id: "VND009",
    name: "Dream Wedding Rentals",
    category: "rentals",
    services: ["Tables", "Chairs", "Linens", "China", "Glassware", "Lounge Furniture"],
    contact: {
      name: "Rental Coordinator",
      email: "rentals@dreamwedding.com",
      phone: "+1 (555) 909-9001"
    },
    address: "800 Warehouse Way, Napa, CA",
    rating: 4.6,
    priceRange: "$$",
    notes: "Large inventory. Good for outdoor events.",
    status: "active",
    createdAt: "2020-05-01"
  },
  {
    id: "VND010",
    name: "Five Star Catering",
    category: "catering",
    services: ["Gala Catering", "Plated Dinners", "Cocktails", "Dessert Stations"],
    contact: {
      name: "Event Manager",
      email: "events@fivestarcatering.com",
      phone: "+1 (555) 910-0001"
    },
    address: "600 Fine Dining Blvd, New York, NY",
    rating: 4.9,
    priceRange: "$$$$",
    notes: "Luxury catering. Perfect for galas and high-end events.",
    status: "preferred",
    createdAt: "2019-11-01"
  }
];

export const vendorCategories: VendorCategory[] = [
  { id: "catering", name: "Catering", icon: "UtensilsCrossed" },
  { id: "av-equipment", name: "AV Equipment", icon: "Speaker" },
  { id: "photography", name: "Photography", icon: "Camera" },
  { id: "florist", name: "Florist", icon: "Flower" },
  { id: "entertainment", name: "Entertainment", icon: "Music" },
  { id: "decor", name: "Decor", icon: "Palette" },
  { id: "rentals", name: "Rentals", icon: "Package" },
  { id: "security", name: "Security", icon: "Shield" },
  { id: "transportation", name: "Transportation", icon: "Bus" },
  { id: "staffing", name: "Staffing", icon: "Users" }
];

export const guests: Guest[] = [
  {
    id: "GST001",
    eventId: "EVT001",
    firstName: "John",
    lastName: "Smith",
    email: "john.smith@techcorp.com",
    phone: "+1 (555) 111-0001",
    company: "TechCorp",
    title: "CEO",
    ticketType: "VIP Pass",
    status: "registered",
    checkedIn: false,
    checkedInAt: null,
    tableNumber: "VIP-1",
    dietaryRestrictions: "None",
    specialRequests: "Wheelchair accessible seating",
    registeredAt: "2024-11-15",
    source: "Direct",
    tags: ["speaker", "vip"]
  },
  {
    id: "GST002",
    eventId: "EVT001",
    firstName: "Sarah",
    lastName: "Johnson",
    email: "sarah.j@startup.io",
    phone: "+1 (555) 111-0002",
    company: "StartupIO",
    title: "CTO",
    ticketType: "General Admission",
    status: "registered",
    checkedIn: false,
    checkedInAt: null,
    tableNumber: null,
    dietaryRestrictions: "Vegetarian",
    specialRequests: null,
    registeredAt: "2024-11-20",
    source: "Website",
    tags: []
  },
  {
    id: "GST003",
    eventId: "EVT002",
    firstName: "Emily",
    lastName: "Johnson",
    email: "emily.j@email.com",
    phone: "+1 (555) 112-0001",
    company: null,
    title: "Bride",
    ticketType: null,
    status: "confirmed",
    checkedIn: false,
    checkedInAt: null,
    tableNumber: "Head Table",
    dietaryRestrictions: "None",
    specialRequests: null,
    registeredAt: "2024-06-15",
    source: "Invitation",
    tags: ["bride", "vip"]
  },
  {
    id: "GST004",
    eventId: "EVT002",
    firstName: "Michael",
    lastName: "Williams",
    email: "michael.w@email.com",
    phone: "+1 (555) 112-0002",
    company: null,
    title: "Groom",
    ticketType: null,
    status: "confirmed",
    checkedIn: false,
    checkedInAt: null,
    tableNumber: "Head Table",
    dietaryRestrictions: "None",
    specialRequests: null,
    registeredAt: "2024-06-15",
    source: "Invitation",
    tags: ["groom", "vip"]
  },
  {
    id: "GST005",
    eventId: "EVT003",
    firstName: "Robert",
    lastName: "Chen",
    email: "robert.chen@agency.com",
    phone: "+1 (555) 113-0001",
    company: "Top Agency",
    title: "Creative Director",
    ticketType: "Individual Seat",
    status: "attended",
    checkedIn: true,
    checkedInAt: "2024-12-10 18:15:00",
    tableNumber: "12",
    dietaryRestrictions: "Gluten-Free",
    specialRequests: null,
    registeredAt: "2024-10-20",
    source: "Sponsor",
    tags: ["nominee", "award-winner"]
  }
];

export const guestStatuses: GuestStatus[] = [
  { id: "invited", name: "Invited", color: "#6366f1" },
  { id: "registered", name: "Registered", color: "#0ea5e9" },
  { id: "confirmed", name: "Confirmed", color: "#10b981" },
  { id: "attended", name: "Attended", color: "#8b5cf6" },
  { id: "no-show", name: "No Show", color: "#f59e0b" },
  { id: "cancelled", name: "Cancelled", color: "#ef4444" }
];

export const eventEquipment: Equipment[] = [
  {
    id: "EQP001",
    name: "Main Stage Sound System",
    category: "audio",
    vendor: "Pro AV Solutions",
    vendorId: "VND001",
    quantity: 1,
    unitCost: 8500,
    totalCost: 8500,
    eventId: "EVT001",
    status: "reserved",
    deliveryDate: "2025-03-13",
    returnDate: "2025-03-18",
    notes: "Includes setup and tech support"
  },
  {
    id: "EQP002",
    name: "LED Video Wall 20x12",
    category: "video",
    vendor: "Pro AV Solutions",
    vendorId: "VND001",
    quantity: 1,
    unitCost: 12000,
    totalCost: 12000,
    eventId: "EVT001",
    status: "reserved",
    deliveryDate: "2025-03-13",
    returnDate: "2025-03-18",
    notes: "Main stage backdrop"
  },
  {
    id: "EQP003",
    name: "Wireless Microphone",
    category: "audio",
    vendor: "Pro AV Solutions",
    vendorId: "VND001",
    quantity: 20,
    unitCost: 150,
    totalCost: 3000,
    eventId: "EVT001",
    status: "reserved",
    deliveryDate: "2025-03-13",
    returnDate: "2025-03-18",
    notes: "For speakers and panelists"
  },
  {
    id: "EQP004",
    name: "Round Tables (8-person)",
    category: "furniture",
    vendor: "Dream Wedding Rentals",
    vendorId: "VND009",
    quantity: 25,
    unitCost: 45,
    totalCost: 1125,
    eventId: "EVT002",
    status: "reserved",
    deliveryDate: "2025-06-13",
    returnDate: "2025-06-15",
    notes: "White linens included"
  },
  {
    id: "EQP005",
    name: "Chiavari Chairs",
    category: "furniture",
    vendor: "Dream Wedding Rentals",
    vendorId: "VND009",
    quantity: 200,
    unitCost: 8,
    totalCost: 1600,
    eventId: "EVT002",
    status: "reserved",
    deliveryDate: "2025-06-13",
    returnDate: "2025-06-15",
    notes: "Gold finish"
  }
];

export const budgetCategories: BudgetCategory[] = [
  { id: "venue", name: "Venue", icon: "Building" },
  { id: "catering", name: "Catering", icon: "UtensilsCrossed" },
  { id: "av-production", name: "AV & Production", icon: "Speaker" },
  { id: "decor", name: "Decor & Florals", icon: "Flower" },
  { id: "entertainment", name: "Entertainment", icon: "Music" },
  { id: "photography", name: "Photography & Video", icon: "Camera" },
  { id: "rentals", name: "Rentals", icon: "Package" },
  { id: "staffing", name: "Staffing", icon: "Users" },
  { id: "marketing", name: "Marketing", icon: "Megaphone" },
  { id: "transportation", name: "Transportation", icon: "Bus" },
  { id: "miscellaneous", name: "Miscellaneous", icon: "MoreHorizontal" }
];

export const eventBudgets: EventBudget[] = [
  {
    id: "BUD001",
    eventId: "EVT001",
    eventName: "TechConnect Summit 2025",
    totalBudget: 450000,
    totalSpent: 425000,
    totalCommitted: 15000,
    remaining: 10000,
    categories: [
      { category: "venue", budgeted: 85000, spent: 85000, committed: 0 },
      { category: "catering", budgeted: 120000, spent: 115000, committed: 5000 },
      { category: "av-production", budgeted: 95000, spent: 92000, committed: 3000 },
      { category: "decor", budgeted: 35000, spent: 33000, committed: 2000 },
      { category: "entertainment", budgeted: 25000, spent: 22000, committed: 0 },
      { category: "staffing", budgeted: 45000, spent: 40000, committed: 5000 },
      { category: "marketing", budgeted: 30000, spent: 28000, committed: 0 },
      { category: "miscellaneous", budgeted: 15000, spent: 10000, committed: 0 }
    ],
    expenses: [
      { id: 1, date: "2024-10-15", category: "venue", description: "Venue Deposit", amount: 25000, vendor: "Grand Convention Center", status: "paid" },
      { id: 2, date: "2024-11-01", category: "av-production", description: "AV Equipment Deposit", amount: 30000, vendor: "Pro AV Solutions", status: "paid" },
      { id: 3, date: "2024-11-15", category: "marketing", description: "Digital Marketing Campaign", amount: 15000, vendor: "Marketing Agency", status: "paid" },
      { id: 4, date: "2024-12-01", category: "venue", description: "Venue Balance", amount: 60000, vendor: "Grand Convention Center", status: "paid" },
      { id: 5, date: "2024-12-15", category: "catering", description: "Catering Deposit", amount: 50000, vendor: "Gourmet Catering Co", status: "paid" }
    ],
    revenue: {
      ticketSales: 587000,
      sponsorships: 175000,
      other: 25000,
      total: 787000
    },
    createdAt: "2024-09-01",
    updatedAt: "2024-12-20"
  }
];

export const eventsStats: EventsStats = {
  totalEvents: 15,
  upcomingEvents: 6,
  activeEvents: 1,
  completedEvents: 8,
  totalRevenue: {
    ytd: 2850000,
    thisMonth: 485000
  },
  totalGuests: {
    registered: 8750,
    attended: 6234
  },
  avgAttendanceRate: 85,
  topVenues: [
    { name: "Grand Convention Center", events: 5 },
    { name: "The Grand Ballroom", events: 3 },
    { name: "Innovation Hub", events: 2 }
  ],
  upcomingThisMonth: 3
};

// Utility functions
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

export const formatNumber = (num: number): string => {
  if (num >= 1000000) {
    return `${(num / 1000000).toFixed(1)}M`;
  }
  if (num >= 1000) {
    return `${(num / 1000).toFixed(1)}K`;
  }
  return num.toString();
};

export const getEventStatusColor = (status: string): string => {
  const statusObj = eventStatuses.find(s => s.id === status);
  if (!statusObj) return 'bg-[#1e1e2e] text-[#94a3b8]';

  switch (status) {
    case 'planning':
      return 'bg-[#6366f1]/20 text-[#6366f1]';
    case 'upcoming':
      return 'bg-cyan-500/20 text-cyan-400';
    case 'active':
      return 'bg-emerald-500/20 text-emerald-400';
    case 'completed':
      return 'bg-[#8b5cf6]/20 text-[#8b5cf6]';
    case 'cancelled':
      return 'bg-red-500/20 text-red-400';
    case 'postponed':
      return 'bg-amber-500/20 text-amber-400';
    default:
      return 'bg-[#1e1e2e] text-[#94a3b8]';
  }
};

export const getEventTypeColor = (type: string): string => {
  const typeObj = eventTypes.find(t => t.id === type);
  if (!typeObj) return '#64748b';
  return typeObj.color;
};

export const getGuestStatusColor = (status: string): string => {
  switch (status) {
    case 'invited':
      return 'bg-[#6366f1]/20 text-[#6366f1]';
    case 'registered':
      return 'bg-cyan-500/20 text-cyan-400';
    case 'confirmed':
      return 'bg-emerald-500/20 text-emerald-400';
    case 'attended':
      return 'bg-[#8b5cf6]/20 text-[#8b5cf6]';
    case 'no-show':
      return 'bg-amber-500/20 text-amber-400';
    case 'cancelled':
      return 'bg-red-500/20 text-red-400';
    default:
      return 'bg-[#1e1e2e] text-[#94a3b8]';
  }
};

export const getVendorStatusColor = (status: string): string => {
  switch (status) {
    case 'preferred':
      return 'bg-emerald-500/20 text-emerald-400';
    case 'active':
      return 'bg-cyan-500/20 text-cyan-400';
    case 'inactive':
      return 'bg-[#1e1e2e] text-[#64748b]';
    default:
      return 'bg-[#1e1e2e] text-[#94a3b8]';
  }
};

export const getEquipmentStatusColor = (status: string): string => {
  switch (status) {
    case 'reserved':
      return 'bg-[#6366f1]/20 text-[#6366f1]';
    case 'delivered':
      return 'bg-emerald-500/20 text-emerald-400';
    case 'returned':
      return 'bg-[#8b5cf6]/20 text-[#8b5cf6]';
    case 'pending':
      return 'bg-amber-500/20 text-amber-400';
    default:
      return 'bg-[#1e1e2e] text-[#94a3b8]';
  }
};

export const getExpenseStatusColor = (status: string): string => {
  switch (status) {
    case 'paid':
      return 'bg-emerald-500/20 text-emerald-400';
    case 'pending':
      return 'bg-amber-500/20 text-amber-400';
    case 'overdue':
      return 'bg-red-500/20 text-red-400';
    default:
      return 'bg-[#1e1e2e] text-[#94a3b8]';
  }
};

// Menu items for sidebar
import {
  CalendarDays,
  PartyPopper,
  MapPin,
  Truck,
  Ticket,
  ClipboardList,
  Users,
  UtensilsCrossed,
  Package,
  DollarSign,
} from 'lucide-react';

export const eventsMenuItems = [
  {
    id: 'events-list',
    label: 'Events',
    icon: PartyPopper,
    color: '#ec4899',
    path: '/dashboard/events/events',
  },
  {
    id: 'events-calendar',
    label: 'Calendar',
    icon: CalendarDays,
    color: '#6366f1',
    path: '/dashboard/events/calendar',
  },
  {
    id: 'events-venues',
    label: 'Venues',
    icon: MapPin,
    color: '#f97316',
    path: '/dashboard/events/venues',
  },
  {
    id: 'events-vendors',
    label: 'Vendors',
    icon: Truck,
    color: '#8b5cf6',
    path: '/dashboard/events/vendors',
  },
  {
    id: 'events-tickets',
    label: 'Ticketing',
    icon: Ticket,
    color: '#f59e0b',
    path: '/dashboard/events/tickets',
  },
  {
    id: 'events-registrations',
    label: 'Registrations',
    icon: ClipboardList,
    color: '#3b82f6',
    path: '/dashboard/events/registrations',
  },
  {
    id: 'events-guests',
    label: 'Guests',
    icon: Users,
    color: '#06b6d4',
    path: '/dashboard/events/guests',
  },
  {
    id: 'events-catering',
    label: 'Catering',
    icon: UtensilsCrossed,
    color: '#ef4444',
    path: '/dashboard/events/catering',
  },
  {
    id: 'events-equipment',
    label: 'Equipment',
    icon: Package,
    color: '#14b8a6',
    path: '/dashboard/events/equipment',
  },
  {
    id: 'events-budget',
    label: 'Budget',
    icon: DollarSign,
    color: '#10b981',
    path: '/dashboard/events/budget',
  },
];
