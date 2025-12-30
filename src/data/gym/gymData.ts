import {
  Users,
  CreditCard,
  Calendar,
  Dumbbell,
  UserCheck,
  Activity,
  ClipboardList,
  Heart,
} from 'lucide-react';

// Types
export interface EmergencyContact {
  name: string;
  phone: string;
  relationship: string;
}

export interface GymMember {
  id: string;
  memberId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  gender: 'male' | 'female' | 'other';
  photo: string | null;
  address: string;
  emergencyContact: EmergencyContact;
  membershipPlan: string;
  membershipPlanId: string;
  membershipStatus: 'active' | 'expiring' | 'expired' | 'frozen';
  membershipStart: string;
  membershipEnd: string;
  assignedTrainer: string | null;
  assignedTrainerId: string | null;
  joinDate: string;
  lastVisit: string;
  totalVisits: number;
  lockerNumber: string | null;
  balance: number;
  notes: string;
  goals: string[];
  healthConditions: string[];
  referredBy: string | null;
  freezeStart?: string;
  freezeEnd?: string;
}

export interface MembershipPlan {
  id: string;
  name: string;
  description: string;
  type: 'day' | 'monthly' | 'annual' | 'semester';
  price: number;
  setupFee: number;
  duration: number;
  durationUnit: 'day' | 'month';
  features: string[];
  restrictions: string[];
  color: string;
  activeMembers: number;
  status: 'active' | 'inactive';
}

export interface TrainerAvailability {
  monday: string[];
  tuesday: string[];
  wednesday: string[];
  thursday: string[];
  friday: string[];
  saturday: string[];
  sunday: string[];
}

export interface Trainer {
  id: string;
  name: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  photo: string | null;
  specializations: string[];
  certifications: string[];
  experience: number;
  bio: string;
  rating: number;
  reviewCount: number;
  hourlyRate: number;
  status: 'active' | 'inactive' | 'on-leave';
  availability: TrainerAvailability;
  activeClients: number;
  totalSessions: number;
  joinDate: string;
}

export interface ClassScheduleItem {
  day: string;
  time: string;
}

export interface GymClass {
  id: string;
  name: string;
  description: string;
  instructor: string;
  instructorId: string;
  category: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced' | 'all-levels';
  duration: number;
  maxCapacity: number;
  currentEnrollment: number;
  room: string;
  schedule: ClassScheduleItem[];
  status: 'active' | 'cancelled' | 'full';
  color: string;
}

export interface GymEquipment {
  id: string;
  name: string;
  category: string;
  brand: string;
  model: string;
  serialNumber: string;
  location: string;
  status: 'operational' | 'maintenance' | 'out-of-order';
  condition: 'excellent' | 'good' | 'fair' | 'poor';
  purchaseDate: string;
  purchasePrice: number;
  warrantyExpiry: string;
  lastMaintenance: string;
  nextMaintenance: string | null;
  usageHours: number | null;
  notes: string;
}

export interface AttendanceRecord {
  id: number;
  memberId: string;
  memberName: string;
  checkIn: string;
  checkOut: string | null;
  duration: string | null;
}

export interface PTSession {
  id: string;
  memberId: string;
  memberName: string;
  trainerId: string;
  trainerName: string;
  date: string;
  startTime: string;
  endTime: string;
  type: string;
  sessionType: string;
  duration: number;
  location: string;
  status: 'scheduled' | 'completed' | 'cancelled' | 'no-show';
  notes: string;
  price: number;
}

export interface AssessmentMetrics {
  weight: number;
  bodyFat: number;
  bodyFatPercentage: number;
  muscleMass: number;
  bmi: number;
  restingHeartRate: number;
  bloodPressure: string;
  vo2Max: number;
  flexibility: number;
  pushUps: number;
  sitUps: number;
  plankTime: number;
}

export interface AssessmentMeasurements {
  chest: number;
  waist: number;
  hips: number;
  bicepLeft: number;
  bicepRight: number;
  thighLeft: number;
  thighRight: number;
}

export interface StrengthTests {
  benchPress1RM: number | null;
  squat1RM: number | null;
  deadlift1RM: number | null;
  pullUps: number;
}

export interface Flexibility {
  sitAndReach: number;
  shoulderMobility: string;
}

export interface AssessmentComparison {
  weight?: { change: number; trend: 'improved' | 'declined' | 'same' };
  bodyFat?: { change: number; trend: 'improved' | 'declined' | 'same' };
  muscleMass?: { change: number; trend: 'improved' | 'declined' | 'same' };
}

export interface FitnessAssessment {
  id: string;
  memberId: string;
  memberName: string;
  date: string;
  assessmentDate: string;
  assessedBy: string;
  metrics: AssessmentMetrics;
  measurements: AssessmentMeasurements;
  strengthTests: StrengthTests;
  flexibility: Flexibility;
  notes: string;
  nextAssessment: string;
  goals?: string[];
  comparison?: AssessmentComparison;
}

export interface GymStats {
  totalMembers: number;
  activeMembers: number;
  newMembersThisMonth: number;
  expiringMemberships: number;
  todayCheckIns: number;
  averageDailyCheckIns: number;
  classAttendanceRate: number;
  ptSessionsThisMonth: number;
  revenue: {
    thisMonth: number;
    lastMonth: number;
    growth: number;
  };
  popularClasses: { name: string; attendance: number }[];
  peakHours: string[];
}

// Mock Data
export const gymMembers: GymMember[] = [
  {
    id: "MEM001",
    memberId: "GYM-2024-001",
    firstName: "Alex",
    lastName: "Thompson",
    email: "alex.thompson@email.com",
    phone: "+1 (555) 101-1001",
    dateOfBirth: "1990-05-15",
    gender: "male",
    photo: null,
    address: "123 Fitness Lane, New York, NY 10001",
    emergencyContact: {
      name: "Sarah Thompson",
      phone: "+1 (555) 101-1002",
      relationship: "Spouse"
    },
    membershipPlan: "Premium Annual",
    membershipPlanId: "PLAN003",
    membershipStatus: "active",
    membershipStart: "2024-01-15",
    membershipEnd: "2025-01-15",
    assignedTrainer: "Mike Johnson",
    assignedTrainerId: "TRN001",
    joinDate: "2024-01-15",
    lastVisit: "2024-12-20 08:30:00",
    totalVisits: 156,
    lockerNumber: "A-142",
    balance: 0,
    notes: "Interested in bodybuilding. Previous back injury - avoid heavy deadlifts.",
    goals: ["Build muscle", "Improve strength"],
    healthConditions: ["Lower back issue"],
    referredBy: null
  },
  {
    id: "MEM002",
    memberId: "GYM-2024-002",
    firstName: "Jessica",
    lastName: "Williams",
    email: "jessica.w@email.com",
    phone: "+1 (555) 102-2002",
    dateOfBirth: "1988-09-22",
    gender: "female",
    photo: null,
    address: "456 Health Street, New York, NY 10002",
    emergencyContact: {
      name: "David Williams",
      phone: "+1 (555) 102-2003",
      relationship: "Husband"
    },
    membershipPlan: "Premium Monthly",
    membershipPlanId: "PLAN002",
    membershipStatus: "active",
    membershipStart: "2024-11-01",
    membershipEnd: "2024-12-31",
    assignedTrainer: "Sarah Davis",
    assignedTrainerId: "TRN002",
    joinDate: "2024-03-10",
    lastVisit: "2024-12-19 17:45:00",
    totalVisits: 89,
    lockerNumber: "B-078",
    balance: 0,
    notes: "Training for marathon. Focus on cardio and endurance.",
    goals: ["Lose weight", "Run marathon"],
    healthConditions: [],
    referredBy: "MEM001"
  },
  {
    id: "MEM003",
    memberId: "GYM-2024-003",
    firstName: "Marcus",
    lastName: "Chen",
    email: "marcus.chen@email.com",
    phone: "+1 (555) 103-3003",
    dateOfBirth: "1995-03-08",
    gender: "male",
    photo: null,
    address: "789 Wellness Ave, New York, NY 10003",
    emergencyContact: {
      name: "Linda Chen",
      phone: "+1 (555) 103-3004",
      relationship: "Mother"
    },
    membershipPlan: "Basic Monthly",
    membershipPlanId: "PLAN001",
    membershipStatus: "active",
    membershipStart: "2024-12-01",
    membershipEnd: "2024-12-31",
    assignedTrainer: null,
    assignedTrainerId: null,
    joinDate: "2024-12-01",
    lastVisit: "2024-12-20 06:15:00",
    totalVisits: 15,
    lockerNumber: null,
    balance: 0,
    notes: "New member. Interested in group classes.",
    goals: ["General fitness", "Meet people"],
    healthConditions: [],
    referredBy: null
  },
  {
    id: "MEM004",
    memberId: "GYM-2024-004",
    firstName: "Emma",
    lastName: "Rodriguez",
    email: "emma.r@email.com",
    phone: "+1 (555) 104-4004",
    dateOfBirth: "1992-11-30",
    gender: "female",
    photo: null,
    address: "321 Strength Blvd, New York, NY 10004",
    emergencyContact: {
      name: "Carlos Rodriguez",
      phone: "+1 (555) 104-4005",
      relationship: "Brother"
    },
    membershipPlan: "Premium Annual",
    membershipPlanId: "PLAN003",
    membershipStatus: "active",
    membershipStart: "2024-06-01",
    membershipEnd: "2025-06-01",
    assignedTrainer: "Mike Johnson",
    assignedTrainerId: "TRN001",
    joinDate: "2023-06-01",
    lastVisit: "2024-12-20 07:00:00",
    totalVisits: 234,
    lockerNumber: "B-025",
    balance: 0,
    notes: "Competitive powerlifter. Needs access to competition equipment.",
    goals: ["Competition prep", "Increase total"],
    healthConditions: [],
    referredBy: null
  },
  {
    id: "MEM005",
    memberId: "GYM-2024-005",
    firstName: "James",
    lastName: "Miller",
    email: "james.miller@email.com",
    phone: "+1 (555) 105-5005",
    dateOfBirth: "1985-07-18",
    gender: "male",
    photo: null,
    address: "654 Cardio Court, New York, NY 10005",
    emergencyContact: {
      name: "Mary Miller",
      phone: "+1 (555) 105-5006",
      relationship: "Wife"
    },
    membershipPlan: "Premium Monthly",
    membershipPlanId: "PLAN002",
    membershipStatus: "expiring",
    membershipStart: "2024-12-01",
    membershipEnd: "2024-12-31",
    assignedTrainer: "David Park",
    assignedTrainerId: "TRN003",
    joinDate: "2022-01-15",
    lastVisit: "2024-12-18 18:30:00",
    totalVisits: 312,
    lockerNumber: "A-089",
    balance: 150,
    notes: "Long-time member. Prefers evening sessions. Owes balance for PT sessions.",
    goals: ["Weight management", "Stress relief"],
    healthConditions: ["Hypertension"],
    referredBy: null
  },
  {
    id: "MEM006",
    memberId: "GYM-2024-006",
    firstName: "Sophia",
    lastName: "Lee",
    email: "sophia.lee@email.com",
    phone: "+1 (555) 106-6006",
    dateOfBirth: "1998-01-25",
    gender: "female",
    photo: null,
    address: "987 Yoga Way, New York, NY 10006",
    emergencyContact: {
      name: "Kevin Lee",
      phone: "+1 (555) 106-6007",
      relationship: "Father"
    },
    membershipPlan: "Student Plan",
    membershipPlanId: "PLAN005",
    membershipStatus: "active",
    membershipStart: "2024-09-01",
    membershipEnd: "2025-05-31",
    assignedTrainer: null,
    assignedTrainerId: null,
    joinDate: "2024-09-01",
    lastVisit: "2024-12-20 16:00:00",
    totalVisits: 45,
    lockerNumber: null,
    balance: 0,
    notes: "University student. Mostly attends yoga and pilates classes.",
    goals: ["Flexibility", "Stress management"],
    healthConditions: [],
    referredBy: "MEM003"
  },
  {
    id: "MEM007",
    memberId: "GYM-2024-007",
    firstName: "Robert",
    lastName: "Brown",
    email: "robert.b@email.com",
    phone: "+1 (555) 107-7007",
    dateOfBirth: "1975-12-03",
    gender: "male",
    photo: null,
    address: "147 Senior Fitness Rd, New York, NY 10007",
    emergencyContact: {
      name: "Patricia Brown",
      phone: "+1 (555) 107-7008",
      relationship: "Wife"
    },
    membershipPlan: "Senior Plan",
    membershipPlanId: "PLAN006",
    membershipStatus: "active",
    membershipStart: "2024-01-01",
    membershipEnd: "2025-01-01",
    assignedTrainer: "Sarah Davis",
    assignedTrainerId: "TRN002",
    joinDate: "2020-03-15",
    lastVisit: "2024-12-19 09:00:00",
    totalVisits: 456,
    lockerNumber: "A-012",
    balance: 0,
    notes: "Senior member. Focus on mobility and light strength training.",
    goals: ["Maintain mobility", "Stay active"],
    healthConditions: ["Arthritis", "Diabetes Type 2"],
    referredBy: null
  },
  {
    id: "MEM008",
    memberId: "GYM-2024-008",
    firstName: "Olivia",
    lastName: "Taylor",
    email: "olivia.t@email.com",
    phone: "+1 (555) 108-8008",
    dateOfBirth: "1993-08-14",
    gender: "female",
    photo: null,
    address: "258 CrossFit Lane, New York, NY 10008",
    emergencyContact: {
      name: "Michael Taylor",
      phone: "+1 (555) 108-8009",
      relationship: "Husband"
    },
    membershipPlan: "Premium Annual",
    membershipPlanId: "PLAN003",
    membershipStatus: "frozen",
    membershipStart: "2024-03-01",
    membershipEnd: "2025-03-01",
    assignedTrainer: "Mike Johnson",
    assignedTrainerId: "TRN001",
    joinDate: "2023-03-01",
    lastVisit: "2024-10-15 07:30:00",
    totalVisits: 178,
    lockerNumber: "B-102",
    balance: 0,
    notes: "Membership frozen due to pregnancy. Expected return: March 2025.",
    goals: ["CrossFit competition"],
    healthConditions: ["Pregnant"],
    referredBy: null,
    freezeStart: "2024-10-15",
    freezeEnd: "2025-03-01"
  },
  {
    id: "MEM009",
    memberId: "GYM-2024-009",
    firstName: "Daniel",
    lastName: "Kim",
    email: "daniel.kim@email.com",
    phone: "+1 (555) 109-9009",
    dateOfBirth: "1987-04-20",
    gender: "male",
    photo: null,
    address: "369 Fitness Park, New York, NY 10009",
    emergencyContact: {
      name: "Grace Kim",
      phone: "+1 (555) 109-9010",
      relationship: "Sister"
    },
    membershipPlan: "Premium Monthly",
    membershipPlanId: "PLAN002",
    membershipStatus: "expired",
    membershipStart: "2024-10-01",
    membershipEnd: "2024-11-30",
    assignedTrainer: null,
    assignedTrainerId: null,
    joinDate: "2024-05-15",
    lastVisit: "2024-11-28 19:00:00",
    totalVisits: 67,
    lockerNumber: null,
    balance: 0,
    notes: "Membership expired. Contact for renewal.",
    goals: ["Weight loss"],
    healthConditions: [],
    referredBy: null
  },
  {
    id: "MEM010",
    memberId: "GYM-2024-010",
    firstName: "Amanda",
    lastName: "Garcia",
    email: "amanda.g@email.com",
    phone: "+1 (555) 110-0010",
    dateOfBirth: "1991-06-12",
    gender: "female",
    photo: null,
    address: "741 Pilates Plaza, New York, NY 10010",
    emergencyContact: {
      name: "Jose Garcia",
      phone: "+1 (555) 110-0011",
      relationship: "Husband"
    },
    membershipPlan: "Premium Annual",
    membershipPlanId: "PLAN003",
    membershipStatus: "active",
    membershipStart: "2024-02-01",
    membershipEnd: "2025-02-01",
    assignedTrainer: "Sarah Davis",
    assignedTrainerId: "TRN002",
    joinDate: "2022-02-01",
    lastVisit: "2024-12-20 10:00:00",
    totalVisits: 298,
    lockerNumber: "B-055",
    balance: 0,
    notes: "Loves group classes. Pilates instructor certification in progress.",
    goals: ["Become instructor", "Core strength"],
    healthConditions: [],
    referredBy: "MEM004"
  }
];

export const membershipPlans: MembershipPlan[] = [
  {
    id: "PLAN001",
    name: "Basic Monthly",
    description: "Access to gym floor and basic equipment",
    type: "monthly",
    price: 49,
    setupFee: 25,
    duration: 1,
    durationUnit: "month",
    features: [
      "Gym floor access",
      "Basic equipment",
      "Locker room access",
      "1 guest pass/month"
    ],
    restrictions: [
      "No group classes",
      "No pool access",
      "Peak hours only"
    ],
    color: "#64748b",
    activeMembers: 45,
    status: "active"
  },
  {
    id: "PLAN002",
    name: "Premium Monthly",
    description: "Full access with group classes",
    type: "monthly",
    price: 89,
    setupFee: 0,
    duration: 1,
    durationUnit: "month",
    features: [
      "Full gym access",
      "All equipment",
      "Unlimited group classes",
      "Pool & sauna access",
      "Locker room access",
      "2 guest passes/month",
      "Fitness assessment"
    ],
    restrictions: [],
    color: "#6366f1",
    activeMembers: 128,
    status: "active"
  },
  {
    id: "PLAN003",
    name: "Premium Annual",
    description: "Best value - full access for a year",
    type: "annual",
    price: 799,
    setupFee: 0,
    duration: 12,
    durationUnit: "month",
    features: [
      "Full gym access",
      "All equipment",
      "Unlimited group classes",
      "Pool & sauna access",
      "Locker room access",
      "4 guest passes/month",
      "Quarterly fitness assessment",
      "1 free PT session/month",
      "Nutrition consultation",
      "Freeze option (2 months)"
    ],
    restrictions: [],
    color: "#8b5cf6",
    activeMembers: 89,
    status: "active"
  },
  {
    id: "PLAN004",
    name: "Day Pass",
    description: "Single day access",
    type: "day",
    price: 20,
    setupFee: 0,
    duration: 1,
    durationUnit: "day",
    features: [
      "Full gym access for one day",
      "Locker room access"
    ],
    restrictions: [
      "No classes",
      "No pool access"
    ],
    color: "#f59e0b",
    activeMembers: 0,
    status: "active"
  },
  {
    id: "PLAN005",
    name: "Student Plan",
    description: "Discounted rate for students",
    type: "semester",
    price: 199,
    setupFee: 0,
    duration: 4,
    durationUnit: "month",
    features: [
      "Full gym access",
      "All equipment",
      "Group classes (off-peak)",
      "Locker room access"
    ],
    restrictions: [
      "Valid student ID required",
      "Off-peak hours (6am-4pm, after 8pm)"
    ],
    color: "#10b981",
    activeMembers: 34,
    status: "active"
  },
  {
    id: "PLAN006",
    name: "Senior Plan",
    description: "Special rate for 60+ members",
    type: "monthly",
    price: 39,
    setupFee: 0,
    duration: 1,
    durationUnit: "month",
    features: [
      "Full gym access",
      "Senior-focused classes",
      "Pool & sauna access",
      "Locker room access",
      "Quarterly health check"
    ],
    restrictions: [
      "Age 60+ only",
      "Off-peak hours recommended"
    ],
    color: "#ec4899",
    activeMembers: 28,
    status: "active"
  },
  {
    id: "PLAN007",
    name: "Corporate Plan",
    description: "Discounted rate for corporate partners",
    type: "monthly",
    price: 59,
    setupFee: 0,
    duration: 1,
    durationUnit: "month",
    features: [
      "Full gym access",
      "All equipment",
      "Unlimited group classes",
      "Pool access",
      "Locker room access"
    ],
    restrictions: [
      "Requires corporate partnership",
      "Minimum 10 employees"
    ],
    color: "#0ea5e9",
    activeMembers: 156,
    status: "active"
  }
];

export const trainers: Trainer[] = [
  {
    id: "TRN001",
    name: "Mike Johnson",
    firstName: "Mike",
    lastName: "Johnson",
    email: "mike.johnson@gym.com",
    phone: "+1 (555) 201-1001",
    photo: null,
    specializations: ["Strength Training", "Bodybuilding", "Powerlifting"],
    certifications: ["NASM CPT", "CSCS", "Precision Nutrition L1"],
    experience: 8,
    bio: "Former competitive bodybuilder with 8 years of personal training experience. Specializes in hypertrophy and strength programs.",
    rating: 4.9,
    reviewCount: 127,
    hourlyRate: 75,
    status: "active",
    availability: {
      monday: ["06:00-12:00", "16:00-20:00"],
      tuesday: ["06:00-12:00", "16:00-20:00"],
      wednesday: ["06:00-12:00"],
      thursday: ["06:00-12:00", "16:00-20:00"],
      friday: ["06:00-12:00", "16:00-20:00"],
      saturday: ["08:00-14:00"],
      sunday: []
    },
    activeClients: 18,
    totalSessions: 2456,
    joinDate: "2019-03-15"
  },
  {
    id: "TRN002",
    name: "Sarah Davis",
    firstName: "Sarah",
    lastName: "Davis",
    email: "sarah.davis@gym.com",
    phone: "+1 (555) 202-2002",
    photo: null,
    specializations: ["Weight Loss", "Functional Training", "Senior Fitness", "Post-Rehab"],
    certifications: ["ACE CPT", "FMS Level 2", "TRX Certified"],
    experience: 6,
    bio: "Passionate about helping clients achieve sustainable weight loss and improve functional movement. Experience with senior and post-rehabilitation clients.",
    rating: 4.8,
    reviewCount: 98,
    hourlyRate: 65,
    status: "active",
    availability: {
      monday: ["07:00-15:00"],
      tuesday: ["07:00-15:00"],
      wednesday: ["07:00-15:00"],
      thursday: ["07:00-15:00"],
      friday: ["07:00-13:00"],
      saturday: [],
      sunday: ["09:00-13:00"]
    },
    activeClients: 22,
    totalSessions: 1834,
    joinDate: "2020-06-01"
  },
  {
    id: "TRN003",
    name: "David Park",
    firstName: "David",
    lastName: "Park",
    email: "david.park@gym.com",
    phone: "+1 (555) 203-3003",
    photo: null,
    specializations: ["HIIT", "Boxing", "Athletic Performance", "CrossFit"],
    certifications: ["NASM CPT", "CrossFit L2", "USA Boxing Coach"],
    experience: 5,
    bio: "High-energy trainer specializing in HIIT and combat sports conditioning. Former amateur boxer with a passion for athletic performance.",
    rating: 4.7,
    reviewCount: 76,
    hourlyRate: 70,
    status: "active",
    availability: {
      monday: ["14:00-21:00"],
      tuesday: ["14:00-21:00"],
      wednesday: ["14:00-21:00"],
      thursday: ["14:00-21:00"],
      friday: ["14:00-21:00"],
      saturday: ["10:00-16:00"],
      sunday: []
    },
    activeClients: 15,
    totalSessions: 1245,
    joinDate: "2021-01-15"
  },
  {
    id: "TRN004",
    name: "Emily Zhang",
    firstName: "Emily",
    lastName: "Zhang",
    email: "emily.zhang@gym.com",
    phone: "+1 (555) 204-4004",
    photo: null,
    specializations: ["Yoga", "Pilates", "Flexibility", "Mind-Body"],
    certifications: ["RYT 500", "Pilates Method Alliance", "Meditation Teacher"],
    experience: 10,
    bio: "Dedicated yoga and pilates instructor with a holistic approach to fitness. Focuses on mind-body connection and injury prevention.",
    rating: 4.9,
    reviewCount: 156,
    hourlyRate: 60,
    status: "active",
    availability: {
      monday: ["06:00-14:00"],
      tuesday: ["06:00-14:00"],
      wednesday: ["06:00-14:00"],
      thursday: ["06:00-14:00"],
      friday: ["06:00-12:00"],
      saturday: ["07:00-12:00"],
      sunday: ["07:00-12:00"]
    },
    activeClients: 25,
    totalSessions: 3567,
    joinDate: "2018-09-01"
  },
  {
    id: "TRN005",
    name: "Chris Martinez",
    firstName: "Chris",
    lastName: "Martinez",
    email: "chris.martinez@gym.com",
    phone: "+1 (555) 205-5005",
    photo: null,
    specializations: ["Sports Performance", "Speed & Agility", "Youth Training"],
    certifications: ["NSCA CSCS", "USA Weightlifting L1", "Youth Fitness Specialist"],
    experience: 4,
    bio: "Former college athlete specializing in sports-specific training. Works with athletes of all ages to improve performance.",
    rating: 4.6,
    reviewCount: 45,
    hourlyRate: 65,
    status: "active",
    availability: {
      monday: ["15:00-21:00"],
      tuesday: ["15:00-21:00"],
      wednesday: ["15:00-21:00"],
      thursday: ["15:00-21:00"],
      friday: ["15:00-19:00"],
      saturday: ["09:00-15:00"],
      sunday: []
    },
    activeClients: 12,
    totalSessions: 678,
    joinDate: "2022-04-01"
  }
];

export const gymClasses: GymClass[] = [
  {
    id: "CLS001",
    name: "Power Yoga",
    description: "Dynamic yoga flow combining strength and flexibility",
    instructor: "Emily Zhang",
    instructorId: "TRN004",
    category: "Yoga",
    difficulty: "intermediate",
    duration: 60,
    maxCapacity: 20,
    currentEnrollment: 18,
    room: "Studio A",
    schedule: [
      { day: "Monday", time: "07:00" },
      { day: "Wednesday", time: "07:00" },
      { day: "Friday", time: "07:00" }
    ],
    status: "active",
    color: "#8b5cf6"
  },
  {
    id: "CLS002",
    name: "HIIT Blast",
    description: "High-intensity interval training for maximum calorie burn",
    instructor: "David Park",
    instructorId: "TRN003",
    category: "Cardio",
    difficulty: "advanced",
    duration: 45,
    maxCapacity: 25,
    currentEnrollment: 22,
    room: "Main Floor",
    schedule: [
      { day: "Tuesday", time: "18:00" },
      { day: "Thursday", time: "18:00" },
      { day: "Saturday", time: "10:00" }
    ],
    status: "active",
    color: "#ef4444"
  },
  {
    id: "CLS003",
    name: "Spin Class",
    description: "Indoor cycling with motivating music",
    instructor: "Sarah Davis",
    instructorId: "TRN002",
    category: "Cardio",
    difficulty: "all-levels",
    duration: 45,
    maxCapacity: 30,
    currentEnrollment: 28,
    room: "Spin Studio",
    schedule: [
      { day: "Monday", time: "06:00" },
      { day: "Wednesday", time: "06:00" },
      { day: "Friday", time: "06:00" },
      { day: "Saturday", time: "09:00" }
    ],
    status: "active",
    color: "#f59e0b"
  },
  {
    id: "CLS004",
    name: "Pilates Core",
    description: "Core-focused pilates for strength and stability",
    instructor: "Emily Zhang",
    instructorId: "TRN004",
    category: "Pilates",
    difficulty: "beginner",
    duration: 50,
    maxCapacity: 15,
    currentEnrollment: 12,
    room: "Studio B",
    schedule: [
      { day: "Tuesday", time: "09:00" },
      { day: "Thursday", time: "09:00" }
    ],
    status: "active",
    color: "#ec4899"
  },
  {
    id: "CLS005",
    name: "Boxing Fundamentals",
    description: "Learn boxing basics with cardio conditioning",
    instructor: "David Park",
    instructorId: "TRN003",
    category: "Combat",
    difficulty: "beginner",
    duration: 60,
    maxCapacity: 16,
    currentEnrollment: 14,
    room: "Boxing Area",
    schedule: [
      { day: "Monday", time: "19:00" },
      { day: "Wednesday", time: "19:00" }
    ],
    status: "active",
    color: "#1e293b"
  },
  {
    id: "CLS006",
    name: "Senior Fit",
    description: "Low-impact exercise for active seniors",
    instructor: "Sarah Davis",
    instructorId: "TRN002",
    category: "Senior",
    difficulty: "beginner",
    duration: 45,
    maxCapacity: 20,
    currentEnrollment: 15,
    room: "Studio A",
    schedule: [
      { day: "Tuesday", time: "10:30" },
      { day: "Thursday", time: "10:30" }
    ],
    status: "active",
    color: "#10b981"
  },
  {
    id: "CLS007",
    name: "Strength & Conditioning",
    description: "Full-body strength training with weights",
    instructor: "Mike Johnson",
    instructorId: "TRN001",
    category: "Strength",
    difficulty: "intermediate",
    duration: 60,
    maxCapacity: 15,
    currentEnrollment: 15,
    room: "Weight Room",
    schedule: [
      { day: "Monday", time: "17:00" },
      { day: "Wednesday", time: "17:00" },
      { day: "Friday", time: "17:00" }
    ],
    status: "active",
    color: "#6366f1"
  },
  {
    id: "CLS008",
    name: "Gentle Yoga",
    description: "Relaxing yoga for stress relief and flexibility",
    instructor: "Emily Zhang",
    instructorId: "TRN004",
    category: "Yoga",
    difficulty: "beginner",
    duration: 60,
    maxCapacity: 25,
    currentEnrollment: 19,
    room: "Studio A",
    schedule: [
      { day: "Sunday", time: "09:00" }
    ],
    status: "active",
    color: "#8b5cf6"
  }
];

export const gymEquipment: GymEquipment[] = [
  {
    id: "EQP001",
    name: "Treadmill #1",
    category: "Cardio",
    brand: "Life Fitness",
    model: "95T Elevation",
    serialNumber: "LF-TM-2022-001",
    location: "Cardio Floor - Row 1",
    status: "operational",
    condition: "excellent",
    purchaseDate: "2022-03-15",
    purchasePrice: 8500,
    warrantyExpiry: "2027-03-15",
    lastMaintenance: "2024-12-01",
    nextMaintenance: "2025-03-01",
    usageHours: 4567,
    notes: ""
  },
  {
    id: "EQP002",
    name: "Treadmill #2",
    category: "Cardio",
    brand: "Life Fitness",
    model: "95T Elevation",
    serialNumber: "LF-TM-2022-002",
    location: "Cardio Floor - Row 1",
    status: "operational",
    condition: "good",
    purchaseDate: "2022-03-15",
    purchasePrice: 8500,
    warrantyExpiry: "2027-03-15",
    lastMaintenance: "2024-12-01",
    nextMaintenance: "2025-03-01",
    usageHours: 5234,
    notes: ""
  },
  {
    id: "EQP003",
    name: "Rowing Machine #1",
    category: "Cardio",
    brand: "Concept2",
    model: "Model D",
    serialNumber: "C2-RM-2021-001",
    location: "Cardio Floor - Row 2",
    status: "operational",
    condition: "good",
    purchaseDate: "2021-06-20",
    purchasePrice: 1200,
    warrantyExpiry: "2026-06-20",
    lastMaintenance: "2024-11-15",
    nextMaintenance: "2025-02-15",
    usageHours: 3456,
    notes: ""
  },
  {
    id: "EQP004",
    name: "Bench Press Station",
    category: "Strength",
    brand: "Hammer Strength",
    model: "Olympic Flat Bench",
    serialNumber: "HS-BP-2020-001",
    location: "Free Weights Area",
    status: "operational",
    condition: "excellent",
    purchaseDate: "2020-01-10",
    purchasePrice: 2800,
    warrantyExpiry: "2025-01-10",
    lastMaintenance: "2024-10-01",
    nextMaintenance: "2025-01-01",
    usageHours: null,
    notes: "Most popular bench. Check padding monthly."
  },
  {
    id: "EQP005",
    name: "Squat Rack #1",
    category: "Strength",
    brand: "Rogue",
    model: "Monster Rack",
    serialNumber: "RG-SR-2021-001",
    location: "Free Weights Area",
    status: "operational",
    condition: "excellent",
    purchaseDate: "2021-02-15",
    purchasePrice: 3500,
    warrantyExpiry: "2026-02-15",
    lastMaintenance: "2024-11-01",
    nextMaintenance: "2025-02-01",
    usageHours: null,
    notes: ""
  },
  {
    id: "EQP006",
    name: "Cable Machine #1",
    category: "Strength",
    brand: "Technogym",
    model: "Selection Pro",
    serialNumber: "TG-CM-2022-001",
    location: "Machine Area",
    status: "maintenance",
    condition: "fair",
    purchaseDate: "2022-05-01",
    purchasePrice: 6500,
    warrantyExpiry: "2027-05-01",
    lastMaintenance: "2024-12-18",
    nextMaintenance: "2024-12-20",
    usageHours: 2890,
    notes: "Cable replacement needed. Parts ordered."
  },
  {
    id: "EQP007",
    name: "Spin Bike #1-10",
    category: "Cardio",
    brand: "Keiser",
    model: "M3i",
    serialNumber: "KS-SB-2023-001-010",
    location: "Spin Studio",
    status: "operational",
    condition: "excellent",
    purchaseDate: "2023-01-15",
    purchasePrice: 22000,
    warrantyExpiry: "2028-01-15",
    lastMaintenance: "2024-12-10",
    nextMaintenance: "2025-03-10",
    usageHours: 1567,
    notes: "10 bikes total"
  },
  {
    id: "EQP008",
    name: "Leg Press Machine",
    category: "Strength",
    brand: "Hammer Strength",
    model: "Linear Leg Press",
    serialNumber: "HS-LP-2021-001",
    location: "Machine Area",
    status: "operational",
    condition: "good",
    purchaseDate: "2021-04-20",
    purchasePrice: 4500,
    warrantyExpiry: "2026-04-20",
    lastMaintenance: "2024-11-20",
    nextMaintenance: "2025-02-20",
    usageHours: null,
    notes: ""
  },
  {
    id: "EQP009",
    name: "Smith Machine",
    category: "Strength",
    brand: "Life Fitness",
    model: "Signature Series",
    serialNumber: "LF-SM-2020-001",
    location: "Free Weights Area",
    status: "out-of-order",
    condition: "poor",
    purchaseDate: "2020-06-15",
    purchasePrice: 5200,
    warrantyExpiry: "2025-06-15",
    lastMaintenance: "2024-12-15",
    nextMaintenance: null,
    usageHours: null,
    notes: "Bearing replacement required. Awaiting parts - ETA Dec 28."
  },
  {
    id: "EQP010",
    name: "Dumbbells Set (5-100 lbs)",
    category: "Free Weights",
    brand: "Rogue",
    model: "Rubber Hex",
    serialNumber: "RG-DB-2022-SET",
    location: "Free Weights Area",
    status: "operational",
    condition: "good",
    purchaseDate: "2022-02-01",
    purchasePrice: 4800,
    warrantyExpiry: "2027-02-01",
    lastMaintenance: "2024-12-01",
    nextMaintenance: "2025-06-01",
    usageHours: null,
    notes: "Replace 35lb pair - rubber cracking"
  }
];

export const attendanceRecords: AttendanceRecord[] = [
  { id: 1, memberId: "MEM001", memberName: "Alex Thompson", checkIn: "2024-12-20 08:30:00", checkOut: "2024-12-20 10:15:00", duration: "1h 45m" },
  { id: 2, memberId: "MEM004", memberName: "Emma Rodriguez", checkIn: "2024-12-20 07:00:00", checkOut: "2024-12-20 08:45:00", duration: "1h 45m" },
  { id: 3, memberId: "MEM003", memberName: "Marcus Chen", checkIn: "2024-12-20 06:15:00", checkOut: "2024-12-20 07:30:00", duration: "1h 15m" },
  { id: 4, memberId: "MEM010", memberName: "Amanda Garcia", checkIn: "2024-12-20 10:00:00", checkOut: null, duration: null },
  { id: 5, memberId: "MEM006", memberName: "Sophia Lee", checkIn: "2024-12-20 16:00:00", checkOut: null, duration: null },
  { id: 6, memberId: "MEM002", memberName: "Jessica Williams", checkIn: "2024-12-19 17:45:00", checkOut: "2024-12-19 19:30:00", duration: "1h 45m" },
  { id: 7, memberId: "MEM005", memberName: "James Miller", checkIn: "2024-12-18 18:30:00", checkOut: "2024-12-18 20:00:00", duration: "1h 30m" },
  { id: 8, memberId: "MEM007", memberName: "Robert Brown", checkIn: "2024-12-19 09:00:00", checkOut: "2024-12-19 10:30:00", duration: "1h 30m" }
];

export const ptSessions: PTSession[] = [
  {
    id: "PT001",
    memberId: "MEM001",
    memberName: "Alex Thompson",
    trainerId: "TRN001",
    trainerName: "Mike Johnson",
    date: "2024-12-20",
    startTime: "09:00",
    endTime: "10:00",
    type: "Strength Training",
    sessionType: "strength",
    duration: 60,
    location: "Weight Room",
    status: "completed",
    notes: "Increased bench press by 10lbs. Focus on form for next session.",
    price: 75
  },
  {
    id: "PT002",
    memberId: "MEM004",
    memberName: "Emma Rodriguez",
    trainerId: "TRN001",
    trainerName: "Mike Johnson",
    date: "2024-12-20",
    startTime: "10:30",
    endTime: "11:30",
    type: "Competition Prep",
    sessionType: "strength",
    duration: 60,
    location: "Weight Room",
    status: "scheduled",
    notes: "Deadlift technique work",
    price: 75
  },
  {
    id: "PT003",
    memberId: "MEM002",
    memberName: "Jessica Williams",
    trainerId: "TRN002",
    trainerName: "Sarah Davis",
    date: "2024-12-20",
    startTime: "14:00",
    endTime: "15:00",
    type: "Cardio & Endurance",
    sessionType: "cardio",
    duration: 60,
    location: "Cardio Floor",
    status: "scheduled",
    notes: "Marathon training - interval work",
    price: 65
  },
  {
    id: "PT004",
    memberId: "MEM007",
    memberName: "Robert Brown",
    trainerId: "TRN002",
    trainerName: "Sarah Davis",
    date: "2024-12-21",
    startTime: "09:00",
    endTime: "10:00",
    type: "Senior Fitness",
    sessionType: "functional",
    duration: 60,
    location: "Studio A",
    status: "scheduled",
    notes: "Mobility and balance focus",
    price: 65
  },
  {
    id: "PT005",
    memberId: "MEM005",
    memberName: "James Miller",
    trainerId: "TRN003",
    trainerName: "David Park",
    date: "2024-12-19",
    startTime: "18:00",
    endTime: "19:00",
    type: "HIIT",
    sessionType: "hiit",
    duration: 60,
    location: "Main Floor",
    status: "completed",
    notes: "Great session. Increase intensity next time.",
    price: 70
  },
  {
    id: "PT006",
    memberId: "MEM010",
    memberName: "Amanda Garcia",
    trainerId: "TRN002",
    trainerName: "Sarah Davis",
    date: "2024-12-22",
    startTime: "11:00",
    endTime: "12:00",
    type: "Pilates",
    sessionType: "flexibility",
    duration: 60,
    location: "Studio B",
    status: "scheduled",
    notes: "Core strengthening for instructor prep",
    price: 65
  }
];

export const fitnessAssessments: FitnessAssessment[] = [
  {
    id: "ASM001",
    memberId: "MEM001",
    memberName: "Alex Thompson",
    date: "2024-12-15",
    assessmentDate: "2024-12-15",
    assessedBy: "Mike Johnson",
    metrics: {
      weight: 185,
      bodyFat: 14.5,
      bodyFatPercentage: 14.5,
      muscleMass: 158,
      bmi: 24.2,
      restingHeartRate: 58,
      bloodPressure: "118/76",
      vo2Max: 48,
      flexibility: 8,
      pushUps: 45,
      sitUps: 50,
      plankTime: 120
    },
    measurements: {
      chest: 42,
      waist: 32,
      hips: 38,
      bicepLeft: 15,
      bicepRight: 15.5,
      thighLeft: 24,
      thighRight: 24.5
    },
    strengthTests: {
      benchPress1RM: 245,
      squat1RM: 315,
      deadlift1RM: 365,
      pullUps: 18
    },
    flexibility: {
      sitAndReach: 8,
      shoulderMobility: "good"
    },
    notes: "Excellent progress. Ready to increase training volume.",
    nextAssessment: "2025-03-15",
    goals: ["Build muscle", "Increase strength", "Improve endurance"],
    comparison: {
      weight: { change: -2, trend: "improved" },
      bodyFat: { change: -1.5, trend: "improved" },
      muscleMass: { change: 3, trend: "improved" }
    }
  },
  {
    id: "ASM002",
    memberId: "MEM002",
    memberName: "Jessica Williams",
    date: "2024-12-10",
    assessmentDate: "2024-12-10",
    assessedBy: "Sarah Davis",
    metrics: {
      weight: 142,
      bodyFat: 22.5,
      bodyFatPercentage: 22.5,
      muscleMass: 110,
      bmi: 22.8,
      restingHeartRate: 62,
      bloodPressure: "112/72",
      vo2Max: 42,
      flexibility: 12,
      pushUps: 20,
      sitUps: 30,
      plankTime: 90
    },
    measurements: {
      chest: 36,
      waist: 27,
      hips: 36,
      bicepLeft: 11,
      bicepRight: 11,
      thighLeft: 21,
      thighRight: 21
    },
    strengthTests: {
      benchPress1RM: null,
      squat1RM: null,
      deadlift1RM: null,
      pullUps: 3
    },
    flexibility: {
      sitAndReach: 12,
      shoulderMobility: "excellent"
    },
    notes: "Good cardiovascular base. Continue building endurance for marathon.",
    nextAssessment: "2025-03-10",
    goals: ["Lose weight", "Run marathon", "Improve cardio"],
    comparison: {
      weight: { change: -3, trend: "improved" },
      bodyFat: { change: -2, trend: "improved" },
      muscleMass: { change: 1, trend: "improved" }
    }
  }
];

export const gymStats: GymStats = {
  totalMembers: 324,
  activeMembers: 287,
  newMembersThisMonth: 23,
  expiringMemberships: 15,
  todayCheckIns: 89,
  averageDailyCheckIns: 156,
  classAttendanceRate: 78,
  ptSessionsThisMonth: 145,
  revenue: {
    thisMonth: 45600,
    lastMonth: 42300,
    growth: 7.8
  },
  popularClasses: [
    { name: "Spin Class", attendance: 112 },
    { name: "HIIT Blast", attendance: 88 },
    { name: "Power Yoga", attendance: 72 }
  ],
  peakHours: ["07:00-09:00", "17:00-19:00"]
};

// Helper functions
export const getMemberStatusColor = (status: GymMember['membershipStatus']): string => {
  switch (status) {
    case 'active':
      return 'bg-green-500/10 text-green-400 border-green-500/20';
    case 'expiring':
      return 'bg-orange-500/10 text-orange-400 border-orange-500/20';
    case 'expired':
      return 'bg-red-500/10 text-red-400 border-red-500/20';
    case 'frozen':
      return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
    default:
      return 'bg-gray-500/10 text-gray-400 border-gray-500/20';
  }
};

export const getEquipmentStatusColor = (status: GymEquipment['status']): string => {
  switch (status) {
    case 'operational':
      return 'bg-green-500/10 text-green-400 border-green-500/20';
    case 'maintenance':
      return 'bg-orange-500/10 text-orange-400 border-orange-500/20';
    case 'out-of-order':
      return 'bg-red-500/10 text-red-400 border-red-500/20';
    default:
      return 'bg-gray-500/10 text-gray-400 border-gray-500/20';
  }
};

export const getSessionStatusColor = (status: PTSession['status']): string => {
  switch (status) {
    case 'completed':
      return '#10b981';
    case 'scheduled':
      return '#6366f1';
    case 'cancelled':
      return '#ef4444';
    case 'no-show':
      return '#f59e0b';
    default:
      return '#64748b';
  }
};

export const getDifficultyColor = (difficulty: GymClass['difficulty']): string => {
  switch (difficulty) {
    case 'beginner':
      return 'bg-green-500/10 text-green-400 border-green-500/20';
    case 'intermediate':
      return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
    case 'advanced':
      return 'bg-purple-500/10 text-purple-400 border-purple-500/20';
    case 'all-levels':
      return 'bg-gray-500/10 text-gray-400 border-gray-500/20';
    default:
      return 'bg-gray-500/10 text-gray-400 border-gray-500/20';
  }
};

export const getMemberInitials = (firstName: string, lastName: string): string => {
  return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
};

export const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

export const formatDateTime = (dateString: string): string => {
  return new Date(dateString).toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(amount);
};

// Sidebar menu items for gym sector
export const gymMenuItems = [
  { id: 'gym-members', label: 'Members', icon: Users, path: '/dashboard/gym/members' },
  { id: 'gym-memberships', label: 'Memberships', icon: CreditCard, path: '/dashboard/gym/memberships' },
  { id: 'gym-classes', label: 'Classes', icon: Calendar, path: '/dashboard/gym/classes' },
  { id: 'gym-trainers', label: 'Trainers', icon: UserCheck, path: '/dashboard/gym/trainers' },
  { id: 'gym-equipment', label: 'Equipment', icon: Dumbbell, path: '/dashboard/gym/equipment' },
  { id: 'gym-attendance', label: 'Attendance', icon: Activity, path: '/dashboard/gym/attendance' },
  { id: 'gym-pt-sessions', label: 'PT Sessions', icon: ClipboardList, path: '/dashboard/gym/pt-sessions' },
  { id: 'gym-assessments', label: 'Assessments', icon: Heart, path: '/dashboard/gym/assessments' },
];
