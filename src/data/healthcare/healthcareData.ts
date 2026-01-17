import {
  Users,
  Calendar,
  Stethoscope,
  Pill,
  TestTube,
  Scan,
  Building2,
  CreditCard,
  Shield,
  FileText,
  BarChart3,
  Bed,
} from 'lucide-react';

// Healthcare color theme
export const HEALTHCARE_COLOR = '#06b6d4';

// Types
export interface Patient {
  id: string;
  patientId: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: 'male' | 'female' | 'other';
  bloodType: string;
  phone: string;
  email: string;
  address: string;
  emergencyContact: {
    name: string;
    relationship: string;
    phone: string;
  };
  insuranceProvider?: string;
  insuranceNumber?: string;
  allergies: string[];
  chronicConditions: string[];
  registrationDate: string;
  status: 'active' | 'inactive' | 'deceased';
  lastVisit?: string;
}

export interface Appointment {
  id: string;
  patientId: string;
  patientName: string;
  doctorId: string;
  doctorName: string;
  department: string;
  date: string;
  time: string;
  duration: number;
  type: 'consultation' | 'follow-up' | 'emergency' | 'procedure' | 'check-up';
  status: 'scheduled' | 'confirmed' | 'in-progress' | 'completed' | 'cancelled' | 'no-show';
  reason: string;
  notes?: string;
}

export interface Consultation {
  id: string;
  appointmentId: string;
  patientId: string;
  patientName: string;
  doctorId: string;
  doctorName: string;
  date: string;
  chiefComplaint: string;
  symptoms: string[];
  diagnosis: string;
  diagnosisCode: string;
  vitals: {
    bloodPressure: string;
    heartRate: number;
    temperature: number;
    weight: number;
    height: number;
    oxygenSaturation: number;
  };
  treatment: string;
  prescriptions: string[];
  labOrders: string[];
  followUp?: string;
  notes?: string;
  status: 'in-progress' | 'completed';
}

export interface Prescription {
  id: string;
  patientId: string;
  patientName: string;
  doctorId: string;
  doctorName: string;
  date: string;
  medications: {
    name: string;
    dosage: string;
    frequency: string;
    duration: string;
    instructions: string;
  }[];
  status: 'active' | 'completed' | 'cancelled';
  dispensedDate?: string;
  dispensedBy?: string;
}

export interface LabTest {
  id: string;
  patientId: string;
  patientName: string;
  orderedBy: string;
  testType: string;
  category: 'blood' | 'urine' | 'stool' | 'culture' | 'imaging' | 'other';
  orderDate: string;
  sampleCollectedDate?: string;
  resultDate?: string;
  status: 'ordered' | 'sample-collected' | 'processing' | 'completed' | 'cancelled';
  priority: 'routine' | 'urgent' | 'stat';
  results?: string;
  normalRange?: string;
  attachments?: string[];
}

export interface RadiologyStudy {
  id: string;
  patientId: string;
  patientName: string;
  orderedBy: string;
  studyType: 'x-ray' | 'ct-scan' | 'mri' | 'ultrasound' | 'mammography' | 'pet-scan';
  bodyPart: string;
  orderDate: string;
  studyDate?: string;
  reportDate?: string;
  status: 'ordered' | 'scheduled' | 'in-progress' | 'completed' | 'cancelled';
  priority: 'routine' | 'urgent' | 'stat';
  findings?: string;
  impression?: string;
  radiologist?: string;
  images?: string[];
}

export interface Medication {
  id: string;
  name: string;
  genericName: string;
  category: string;
  dosageForm: 'tablet' | 'capsule' | 'syrup' | 'injection' | 'cream' | 'drops' | 'inhaler';
  strength: string;
  manufacturer: string;
  stock: number;
  reorderLevel: number;
  unitPrice: number;
  expiryDate: string;
  batchNumber: string;
  status: 'in-stock' | 'low-stock' | 'out-of-stock';
}

export interface Billing {
  id: string;
  invoiceNumber: string;
  patientId: string;
  patientName: string;
  date: string;
  dueDate: string;
  items: {
    description: string;
    quantity: number;
    unitPrice: number;
    total: number;
  }[];
  subtotal: number;
  tax: number;
  discount: number;
  total: number;
  paid: number;
  balance: number;
  paymentStatus: 'pending' | 'partial' | 'paid' | 'overdue';
  insuranceClaim?: {
    claimNumber: string;
    status: 'submitted' | 'approved' | 'rejected' | 'pending';
    amount: number;
  };
}

export interface Bed {
  id: string;
  bedNumber: string;
  ward: string;
  roomNumber: string;
  bedType: 'general' | 'icu' | 'private' | 'semi-private' | 'pediatric' | 'maternity';
  status: 'available' | 'occupied' | 'reserved' | 'maintenance';
  patientId?: string;
  patientName?: string;
  admissionDate?: string;
  expectedDischarge?: string;
  dailyRate: number;
}

export interface Doctor {
  id: string;
  name: string;
  specialization: string;
  department: string;
  phone: string;
  email: string;
  isActive: boolean;
}

// Mock Data
export const doctors: Doctor[] = [
  {
    id: 'doc-001',
    name: 'Dr. Ahmed Al-Rashid',
    specialization: 'Cardiologist',
    department: 'Cardiology',
    phone: '+974 5012 3456',
    email: 'ahmed.rashid@clinic.qa',
    isActive: true,
  },
  {
    id: 'doc-002',
    name: 'Dr. Fatima Hassan',
    specialization: 'General Practitioner',
    department: 'General Medicine',
    phone: '+974 5023 4567',
    email: 'fatima.hassan@clinic.qa',
    isActive: true,
  },
  {
    id: 'doc-003',
    name: 'Dr. Mohammed Al-Thani',
    specialization: 'Orthopedic Surgeon',
    department: 'Orthopedics',
    phone: '+974 5034 5678',
    email: 'mohammed.thani@clinic.qa',
    isActive: true,
  },
  {
    id: 'doc-004',
    name: 'Dr. Sarah Johnson',
    specialization: 'Pediatrician',
    department: 'Pediatrics',
    phone: '+974 5045 6789',
    email: 'sarah.johnson@clinic.qa',
    isActive: true,
  },
  {
    id: 'doc-005',
    name: 'Dr. Khalid Ibrahim',
    specialization: 'Neurologist',
    department: 'Neurology',
    phone: '+974 5056 7890',
    email: 'khalid.ibrahim@clinic.qa',
    isActive: true,
  },
];

export const patients: Patient[] = [
  {
    id: 'pat-001',
    patientId: 'P-2024-001',
    firstName: 'Omar',
    lastName: 'Al-Farsi',
    dateOfBirth: '1985-03-15',
    gender: 'male',
    bloodType: 'A+',
    phone: '+974 5512 3456',
    email: 'omar.farsi@email.com',
    address: 'Villa 42, West Bay, Doha',
    emergencyContact: {
      name: 'Aisha Al-Farsi',
      relationship: 'Wife',
      phone: '+974 5513 4567',
    },
    insuranceProvider: 'Qatar National Insurance',
    insuranceNumber: 'QNI-2024-78945',
    allergies: ['Penicillin'],
    chronicConditions: ['Hypertension'],
    registrationDate: '2023-06-15',
    status: 'active',
    lastVisit: '2024-01-10',
  },
  {
    id: 'pat-002',
    patientId: 'P-2024-002',
    firstName: 'Maryam',
    lastName: 'Hassan',
    dateOfBirth: '1990-07-22',
    gender: 'female',
    bloodType: 'O+',
    phone: '+974 5523 4567',
    email: 'maryam.hassan@email.com',
    address: 'Apartment 15, Pearl Tower, The Pearl',
    emergencyContact: {
      name: 'Ahmed Hassan',
      relationship: 'Brother',
      phone: '+974 5524 5678',
    },
    insuranceProvider: 'Daman Health Insurance',
    insuranceNumber: 'DHI-2024-45678',
    allergies: [],
    chronicConditions: ['Type 2 Diabetes'],
    registrationDate: '2023-08-20',
    status: 'active',
    lastVisit: '2024-01-12',
  },
  {
    id: 'pat-003',
    patientId: 'P-2024-003',
    firstName: 'Khalid',
    lastName: 'Al-Mahmoud',
    dateOfBirth: '1978-11-08',
    gender: 'male',
    bloodType: 'B+',
    phone: '+974 5534 5678',
    email: 'khalid.mahmoud@email.com',
    address: 'House 78, Al Sadd, Doha',
    emergencyContact: {
      name: 'Fatima Al-Mahmoud',
      relationship: 'Wife',
      phone: '+974 5535 6789',
    },
    insuranceProvider: 'Seha Insurance',
    insuranceNumber: 'SEH-2024-12345',
    allergies: ['Sulfa drugs', 'Latex'],
    chronicConditions: ['Asthma', 'High Cholesterol'],
    registrationDate: '2022-12-10',
    status: 'active',
    lastVisit: '2024-01-08',
  },
  {
    id: 'pat-004',
    patientId: 'P-2024-004',
    firstName: 'Noor',
    lastName: 'Al-Suwaidi',
    dateOfBirth: '2015-04-18',
    gender: 'female',
    bloodType: 'AB+',
    phone: '+974 5545 6789',
    email: 'parent.suwaidi@email.com',
    address: 'Villa 25, Lusail City',
    emergencyContact: {
      name: 'Hamad Al-Suwaidi',
      relationship: 'Father',
      phone: '+974 5546 7890',
    },
    insuranceProvider: 'Qatar National Insurance',
    insuranceNumber: 'QNI-2024-89012',
    allergies: ['Peanuts'],
    chronicConditions: [],
    registrationDate: '2023-01-05',
    status: 'active',
    lastVisit: '2024-01-15',
  },
  {
    id: 'pat-005',
    patientId: 'P-2024-005',
    firstName: 'Rashid',
    lastName: 'Mohammed',
    dateOfBirth: '1965-09-30',
    gender: 'male',
    bloodType: 'O-',
    phone: '+974 5556 7890',
    email: 'rashid.mohammed@email.com',
    address: 'Compound 12, Al Dafna',
    emergencyContact: {
      name: 'Salma Mohammed',
      relationship: 'Daughter',
      phone: '+974 5557 8901',
    },
    insuranceProvider: 'Daman Health Insurance',
    insuranceNumber: 'DHI-2024-67890',
    allergies: [],
    chronicConditions: ['Coronary Artery Disease', 'Type 2 Diabetes', 'Hypertension'],
    registrationDate: '2021-05-20',
    status: 'active',
    lastVisit: '2024-01-14',
  },
  {
    id: 'pat-006',
    patientId: 'P-2024-006',
    firstName: 'Layla',
    lastName: 'Ahmed',
    dateOfBirth: '1992-02-14',
    gender: 'female',
    bloodType: 'A-',
    phone: '+974 5567 8901',
    email: 'layla.ahmed@email.com',
    address: 'Apartment 8, Marina Residence',
    emergencyContact: {
      name: 'Youssef Ahmed',
      relationship: 'Husband',
      phone: '+974 5568 9012',
    },
    insuranceProvider: 'Seha Insurance',
    insuranceNumber: 'SEH-2024-23456',
    allergies: ['Aspirin'],
    chronicConditions: [],
    registrationDate: '2023-10-12',
    status: 'active',
    lastVisit: '2024-01-11',
  },
];

export const appointments: Appointment[] = [
  {
    id: 'apt-001',
    patientId: 'pat-001',
    patientName: 'Omar Al-Farsi',
    doctorId: 'doc-001',
    doctorName: 'Dr. Ahmed Al-Rashid',
    department: 'Cardiology',
    date: '2024-01-15',
    time: '09:00',
    duration: 30,
    type: 'follow-up',
    status: 'confirmed',
    reason: 'Blood pressure follow-up',
    notes: 'Patient requested morning slot',
  },
  {
    id: 'apt-002',
    patientId: 'pat-002',
    patientName: 'Maryam Hassan',
    doctorId: 'doc-002',
    doctorName: 'Dr. Fatima Hassan',
    department: 'General Medicine',
    date: '2024-01-15',
    time: '10:00',
    duration: 20,
    type: 'consultation',
    status: 'scheduled',
    reason: 'General check-up',
  },
  {
    id: 'apt-003',
    patientId: 'pat-003',
    patientName: 'Khalid Al-Mahmoud',
    doctorId: 'doc-003',
    doctorName: 'Dr. Mohammed Al-Thani',
    department: 'Orthopedics',
    date: '2024-01-15',
    time: '11:30',
    duration: 45,
    type: 'procedure',
    status: 'confirmed',
    reason: 'Knee joint injection',
    notes: 'Steroid injection for arthritis',
  },
  {
    id: 'apt-004',
    patientId: 'pat-004',
    patientName: 'Noor Al-Suwaidi',
    doctorId: 'doc-004',
    doctorName: 'Dr. Sarah Johnson',
    department: 'Pediatrics',
    date: '2024-01-15',
    time: '14:00',
    duration: 30,
    type: 'check-up',
    status: 'scheduled',
    reason: 'Annual vaccination',
  },
  {
    id: 'apt-005',
    patientId: 'pat-005',
    patientName: 'Rashid Mohammed',
    doctorId: 'doc-001',
    doctorName: 'Dr. Ahmed Al-Rashid',
    department: 'Cardiology',
    date: '2024-01-15',
    time: '15:30',
    duration: 45,
    type: 'consultation',
    status: 'in-progress',
    reason: 'Chest pain evaluation',
    notes: 'Urgent referral from GP',
  },
  {
    id: 'apt-006',
    patientId: 'pat-006',
    patientName: 'Layla Ahmed',
    doctorId: 'doc-005',
    doctorName: 'Dr. Khalid Ibrahim',
    department: 'Neurology',
    date: '2024-01-16',
    time: '09:30',
    duration: 30,
    type: 'follow-up',
    status: 'scheduled',
    reason: 'Migraine follow-up',
  },
  {
    id: 'apt-007',
    patientId: 'pat-001',
    patientName: 'Omar Al-Farsi',
    doctorId: 'doc-002',
    doctorName: 'Dr. Fatima Hassan',
    department: 'General Medicine',
    date: '2024-01-14',
    time: '10:00',
    duration: 20,
    type: 'consultation',
    status: 'completed',
    reason: 'Flu symptoms',
  },
  {
    id: 'apt-008',
    patientId: 'pat-002',
    patientName: 'Maryam Hassan',
    doctorId: 'doc-002',
    doctorName: 'Dr. Fatima Hassan',
    department: 'General Medicine',
    date: '2024-01-13',
    time: '11:00',
    duration: 30,
    type: 'follow-up',
    status: 'no-show',
    reason: 'Diabetes management',
  },
];

export const consultations: Consultation[] = [
  {
    id: 'con-001',
    appointmentId: 'apt-007',
    patientId: 'pat-001',
    patientName: 'Omar Al-Farsi',
    doctorId: 'doc-002',
    doctorName: 'Dr. Fatima Hassan',
    date: '2024-01-14',
    chiefComplaint: 'Fever and body aches for 3 days',
    symptoms: ['Fever', 'Body aches', 'Headache', 'Fatigue'],
    diagnosis: 'Viral Upper Respiratory Infection',
    diagnosisCode: 'J06.9',
    vitals: {
      bloodPressure: '130/85',
      heartRate: 88,
      temperature: 38.2,
      weight: 82,
      height: 178,
      oxygenSaturation: 97,
    },
    treatment: 'Symptomatic treatment with rest and fluids. Paracetamol for fever.',
    prescriptions: ['pres-001'],
    labOrders: [],
    followUp: '2024-01-21',
    notes: 'Patient advised to return if symptoms worsen',
    status: 'completed',
  },
  {
    id: 'con-002',
    appointmentId: 'apt-005',
    patientId: 'pat-005',
    patientName: 'Rashid Mohammed',
    doctorId: 'doc-001',
    doctorName: 'Dr. Ahmed Al-Rashid',
    date: '2024-01-15',
    chiefComplaint: 'Chest pain and shortness of breath',
    symptoms: ['Chest tightness', 'Dyspnea on exertion', 'Fatigue'],
    diagnosis: 'Angina Pectoris - Under evaluation',
    diagnosisCode: 'I20.9',
    vitals: {
      bloodPressure: '145/92',
      heartRate: 78,
      temperature: 36.8,
      weight: 88,
      height: 172,
      oxygenSaturation: 95,
    },
    treatment: 'ECG performed. Stress test ordered. Medication adjusted.',
    prescriptions: ['pres-002'],
    labOrders: ['lab-001', 'lab-002'],
    followUp: '2024-01-22',
    notes: 'Patient needs cardiac workup. Echo scheduled for next week.',
    status: 'completed',
  },
];

export const prescriptions: Prescription[] = [
  {
    id: 'pres-001',
    patientId: 'pat-001',
    patientName: 'Omar Al-Farsi',
    doctorId: 'doc-002',
    doctorName: 'Dr. Fatima Hassan',
    date: '2024-01-14',
    medications: [
      {
        name: 'Paracetamol 500mg',
        dosage: '500mg',
        frequency: 'Every 6 hours as needed',
        duration: '5 days',
        instructions: 'Take with food. Do not exceed 4g per day.',
      },
      {
        name: 'Vitamin C 1000mg',
        dosage: '1000mg',
        frequency: 'Once daily',
        duration: '7 days',
        instructions: 'Take in the morning with breakfast.',
      },
    ],
    status: 'active',
    dispensedDate: '2024-01-14',
    dispensedBy: 'Ahmed (Pharmacist)',
  },
  {
    id: 'pres-002',
    patientId: 'pat-005',
    patientName: 'Rashid Mohammed',
    doctorId: 'doc-001',
    doctorName: 'Dr. Ahmed Al-Rashid',
    date: '2024-01-15',
    medications: [
      {
        name: 'Aspirin 81mg',
        dosage: '81mg',
        frequency: 'Once daily',
        duration: 'Ongoing',
        instructions: 'Take with food to prevent stomach upset.',
      },
      {
        name: 'Atorvastatin 20mg',
        dosage: '20mg',
        frequency: 'Once daily at bedtime',
        duration: 'Ongoing',
        instructions: 'Take at the same time each day.',
      },
      {
        name: 'Metoprolol 50mg',
        dosage: '50mg',
        frequency: 'Twice daily',
        duration: 'Ongoing',
        instructions: 'Take with food. Do not stop abruptly.',
      },
    ],
    status: 'active',
  },
  {
    id: 'pres-003',
    patientId: 'pat-002',
    patientName: 'Maryam Hassan',
    doctorId: 'doc-002',
    doctorName: 'Dr. Fatima Hassan',
    date: '2024-01-10',
    medications: [
      {
        name: 'Metformin 500mg',
        dosage: '500mg',
        frequency: 'Twice daily',
        duration: 'Ongoing',
        instructions: 'Take with meals to reduce stomach upset.',
      },
      {
        name: 'Glimepiride 2mg',
        dosage: '2mg',
        frequency: 'Once daily before breakfast',
        duration: 'Ongoing',
        instructions: 'Take 15-30 minutes before first meal.',
      },
    ],
    status: 'active',
    dispensedDate: '2024-01-10',
    dispensedBy: 'Sara (Pharmacist)',
  },
];

export const labTests: LabTest[] = [
  {
    id: 'lab-001',
    patientId: 'pat-005',
    patientName: 'Rashid Mohammed',
    orderedBy: 'Dr. Ahmed Al-Rashid',
    testType: 'Complete Blood Count (CBC)',
    category: 'blood',
    orderDate: '2024-01-15',
    sampleCollectedDate: '2024-01-15',
    status: 'processing',
    priority: 'urgent',
  },
  {
    id: 'lab-002',
    patientId: 'pat-005',
    patientName: 'Rashid Mohammed',
    orderedBy: 'Dr. Ahmed Al-Rashid',
    testType: 'Cardiac Troponin',
    category: 'blood',
    orderDate: '2024-01-15',
    sampleCollectedDate: '2024-01-15',
    resultDate: '2024-01-15',
    status: 'completed',
    priority: 'stat',
    results: '0.02 ng/mL',
    normalRange: '< 0.04 ng/mL',
  },
  {
    id: 'lab-003',
    patientId: 'pat-002',
    patientName: 'Maryam Hassan',
    orderedBy: 'Dr. Fatima Hassan',
    testType: 'HbA1c',
    category: 'blood',
    orderDate: '2024-01-12',
    sampleCollectedDate: '2024-01-12',
    resultDate: '2024-01-14',
    status: 'completed',
    priority: 'routine',
    results: '7.2%',
    normalRange: '< 5.7%',
  },
  {
    id: 'lab-004',
    patientId: 'pat-003',
    patientName: 'Khalid Al-Mahmoud',
    orderedBy: 'Dr. Fatima Hassan',
    testType: 'Lipid Panel',
    category: 'blood',
    orderDate: '2024-01-14',
    status: 'ordered',
    priority: 'routine',
  },
  {
    id: 'lab-005',
    patientId: 'pat-001',
    patientName: 'Omar Al-Farsi',
    orderedBy: 'Dr. Fatima Hassan',
    testType: 'Urinalysis',
    category: 'urine',
    orderDate: '2024-01-14',
    sampleCollectedDate: '2024-01-14',
    resultDate: '2024-01-14',
    status: 'completed',
    priority: 'routine',
    results: 'Normal - No abnormalities detected',
  },
];

export const radiologyStudies: RadiologyStudy[] = [
  {
    id: 'rad-001',
    patientId: 'pat-005',
    patientName: 'Rashid Mohammed',
    orderedBy: 'Dr. Ahmed Al-Rashid',
    studyType: 'x-ray',
    bodyPart: 'Chest',
    orderDate: '2024-01-15',
    studyDate: '2024-01-15',
    status: 'completed',
    priority: 'urgent',
    findings: 'Mild cardiomegaly. No acute pulmonary infiltrates. Clear lung fields.',
    impression: 'Enlarged cardiac silhouette consistent with cardiomegaly.',
    radiologist: 'Dr. Nasser Al-Khulaifi',
  },
  {
    id: 'rad-002',
    patientId: 'pat-003',
    patientName: 'Khalid Al-Mahmoud',
    orderedBy: 'Dr. Mohammed Al-Thani',
    studyType: 'mri',
    bodyPart: 'Knee (Right)',
    orderDate: '2024-01-10',
    studyDate: '2024-01-14',
    reportDate: '2024-01-15',
    status: 'completed',
    priority: 'routine',
    findings: 'Grade II chondromalacia patella. Small joint effusion. Intact ACL and PCL.',
    impression: 'Degenerative changes of the right knee with patellofemoral involvement.',
    radiologist: 'Dr. Nasser Al-Khulaifi',
  },
  {
    id: 'rad-003',
    patientId: 'pat-005',
    patientName: 'Rashid Mohammed',
    orderedBy: 'Dr. Ahmed Al-Rashid',
    studyType: 'ultrasound',
    bodyPart: 'Heart (Echo)',
    orderDate: '2024-01-15',
    status: 'scheduled',
    priority: 'urgent',
  },
  {
    id: 'rad-004',
    patientId: 'pat-006',
    patientName: 'Layla Ahmed',
    orderedBy: 'Dr. Khalid Ibrahim',
    studyType: 'mri',
    bodyPart: 'Brain',
    orderDate: '2024-01-12',
    studyDate: '2024-01-14',
    status: 'in-progress',
    priority: 'routine',
  },
];

export const medications: Medication[] = [
  {
    id: 'med-001',
    name: 'Paracetamol',
    genericName: 'Acetaminophen',
    category: 'Analgesic',
    dosageForm: 'tablet',
    strength: '500mg',
    manufacturer: 'GSK',
    stock: 5000,
    reorderLevel: 1000,
    unitPrice: 0.5,
    expiryDate: '2025-06-30',
    batchNumber: 'PARA-2024-001',
    status: 'in-stock',
  },
  {
    id: 'med-002',
    name: 'Aspirin',
    genericName: 'Acetylsalicylic acid',
    category: 'Antiplatelet',
    dosageForm: 'tablet',
    strength: '81mg',
    manufacturer: 'Bayer',
    stock: 3000,
    reorderLevel: 500,
    unitPrice: 0.8,
    expiryDate: '2025-08-15',
    batchNumber: 'ASP-2024-002',
    status: 'in-stock',
  },
  {
    id: 'med-003',
    name: 'Metformin',
    genericName: 'Metformin HCl',
    category: 'Antidiabetic',
    dosageForm: 'tablet',
    strength: '500mg',
    manufacturer: 'Merck',
    stock: 2500,
    reorderLevel: 500,
    unitPrice: 1.2,
    expiryDate: '2025-04-20',
    batchNumber: 'MET-2024-003',
    status: 'in-stock',
  },
  {
    id: 'med-004',
    name: 'Atorvastatin',
    genericName: 'Atorvastatin calcium',
    category: 'Antilipidemic',
    dosageForm: 'tablet',
    strength: '20mg',
    manufacturer: 'Pfizer',
    stock: 800,
    reorderLevel: 200,
    unitPrice: 2.5,
    expiryDate: '2025-09-10',
    batchNumber: 'ATOR-2024-004',
    status: 'in-stock',
  },
  {
    id: 'med-005',
    name: 'Metoprolol',
    genericName: 'Metoprolol succinate',
    category: 'Beta Blocker',
    dosageForm: 'tablet',
    strength: '50mg',
    manufacturer: 'AstraZeneca',
    stock: 150,
    reorderLevel: 200,
    unitPrice: 3.0,
    expiryDate: '2025-07-25',
    batchNumber: 'METO-2024-005',
    status: 'low-stock',
  },
  {
    id: 'med-006',
    name: 'Amoxicillin',
    genericName: 'Amoxicillin trihydrate',
    category: 'Antibiotic',
    dosageForm: 'capsule',
    strength: '500mg',
    manufacturer: 'GSK',
    stock: 1200,
    reorderLevel: 300,
    unitPrice: 1.8,
    expiryDate: '2025-03-15',
    batchNumber: 'AMOX-2024-006',
    status: 'in-stock',
  },
  {
    id: 'med-007',
    name: 'Omeprazole',
    genericName: 'Omeprazole magnesium',
    category: 'Proton Pump Inhibitor',
    dosageForm: 'capsule',
    strength: '20mg',
    manufacturer: 'AstraZeneca',
    stock: 0,
    reorderLevel: 200,
    unitPrice: 2.2,
    expiryDate: '2025-05-30',
    batchNumber: 'OMEP-2024-007',
    status: 'out-of-stock',
  },
];

export const billings: Billing[] = [
  {
    id: 'bill-001',
    invoiceNumber: 'INV-2024-001',
    patientId: 'pat-001',
    patientName: 'Omar Al-Farsi',
    date: '2024-01-14',
    dueDate: '2024-02-14',
    items: [
      { description: 'Consultation - General Medicine', quantity: 1, unitPrice: 150, total: 150 },
      { description: 'Laboratory - Urinalysis', quantity: 1, unitPrice: 50, total: 50 },
      { description: 'Medications', quantity: 1, unitPrice: 45, total: 45 },
    ],
    subtotal: 245,
    tax: 0,
    discount: 0,
    total: 245,
    paid: 245,
    balance: 0,
    paymentStatus: 'paid',
    insuranceClaim: {
      claimNumber: 'CLM-2024-001',
      status: 'approved',
      amount: 200,
    },
  },
  {
    id: 'bill-002',
    invoiceNumber: 'INV-2024-002',
    patientId: 'pat-005',
    patientName: 'Rashid Mohammed',
    date: '2024-01-15',
    dueDate: '2024-02-15',
    items: [
      { description: 'Consultation - Cardiology', quantity: 1, unitPrice: 300, total: 300 },
      { description: 'ECG', quantity: 1, unitPrice: 100, total: 100 },
      { description: 'Chest X-Ray', quantity: 1, unitPrice: 150, total: 150 },
      { description: 'Laboratory - CBC', quantity: 1, unitPrice: 80, total: 80 },
      { description: 'Laboratory - Cardiac Troponin', quantity: 1, unitPrice: 120, total: 120 },
      { description: 'Medications', quantity: 1, unitPrice: 180, total: 180 },
    ],
    subtotal: 930,
    tax: 0,
    discount: 50,
    total: 880,
    paid: 300,
    balance: 580,
    paymentStatus: 'partial',
    insuranceClaim: {
      claimNumber: 'CLM-2024-002',
      status: 'pending',
      amount: 750,
    },
  },
  {
    id: 'bill-003',
    invoiceNumber: 'INV-2024-003',
    patientId: 'pat-003',
    patientName: 'Khalid Al-Mahmoud',
    date: '2024-01-14',
    dueDate: '2024-02-14',
    items: [
      { description: 'Consultation - Orthopedics', quantity: 1, unitPrice: 250, total: 250 },
      { description: 'MRI - Knee', quantity: 1, unitPrice: 800, total: 800 },
    ],
    subtotal: 1050,
    tax: 0,
    discount: 0,
    total: 1050,
    paid: 0,
    balance: 1050,
    paymentStatus: 'pending',
    insuranceClaim: {
      claimNumber: 'CLM-2024-003',
      status: 'submitted',
      amount: 900,
    },
  },
];

export const beds: Bed[] = [
  {
    id: 'bed-001',
    bedNumber: 'A-101',
    ward: 'General Ward A',
    roomNumber: '101',
    bedType: 'general',
    status: 'occupied',
    patientId: 'pat-005',
    patientName: 'Rashid Mohammed',
    admissionDate: '2024-01-15',
    expectedDischarge: '2024-01-18',
    dailyRate: 500,
  },
  {
    id: 'bed-002',
    bedNumber: 'A-102',
    ward: 'General Ward A',
    roomNumber: '101',
    bedType: 'general',
    status: 'available',
    dailyRate: 500,
  },
  {
    id: 'bed-003',
    bedNumber: 'ICU-01',
    ward: 'Intensive Care Unit',
    roomNumber: 'ICU-1',
    bedType: 'icu',
    status: 'available',
    dailyRate: 2500,
  },
  {
    id: 'bed-004',
    bedNumber: 'ICU-02',
    ward: 'Intensive Care Unit',
    roomNumber: 'ICU-2',
    bedType: 'icu',
    status: 'maintenance',
    dailyRate: 2500,
  },
  {
    id: 'bed-005',
    bedNumber: 'P-201',
    ward: 'Private Wing',
    roomNumber: '201',
    bedType: 'private',
    status: 'reserved',
    dailyRate: 1500,
  },
  {
    id: 'bed-006',
    bedNumber: 'P-202',
    ward: 'Private Wing',
    roomNumber: '202',
    bedType: 'private',
    status: 'available',
    dailyRate: 1500,
  },
  {
    id: 'bed-007',
    bedNumber: 'PED-01',
    ward: 'Pediatric Ward',
    roomNumber: 'P-101',
    bedType: 'pediatric',
    status: 'occupied',
    patientId: 'pat-004',
    patientName: 'Noor Al-Suwaidi',
    admissionDate: '2024-01-15',
    expectedDischarge: '2024-01-16',
    dailyRate: 600,
  },
  {
    id: 'bed-008',
    bedNumber: 'MAT-01',
    ward: 'Maternity Ward',
    roomNumber: 'M-101',
    bedType: 'maternity',
    status: 'available',
    dailyRate: 800,
  },
];

// Sidebar menu items for healthcare
export const healthcareMenuItems = [
  {
    id: 'healthcare-patients',
    label: 'Patients',
    icon: Users,
    path: '/dashboard/healthcare/patients',
  },
  {
    id: 'healthcare-appointments',
    label: 'Appointments',
    icon: Calendar,
    path: '/dashboard/healthcare/appointments',
  },
  {
    id: 'healthcare-consultations',
    label: 'Consultations',
    icon: Stethoscope,
    path: '/dashboard/healthcare/consultations',
  },
  {
    id: 'healthcare-prescriptions',
    label: 'Prescriptions',
    icon: Pill,
    path: '/dashboard/healthcare/prescriptions',
  },
  {
    id: 'healthcare-laboratory',
    label: 'Laboratory',
    icon: TestTube,
    path: '/dashboard/healthcare/laboratory',
  },
  {
    id: 'healthcare-radiology',
    label: 'Radiology',
    icon: Scan,
    path: '/dashboard/healthcare/radiology',
  },
  {
    id: 'healthcare-pharmacy',
    label: 'Pharmacy',
    icon: Building2,
    path: '/dashboard/healthcare/pharmacy',
  },
  {
    id: 'healthcare-billing',
    label: 'Billing',
    icon: CreditCard,
    path: '/dashboard/healthcare/billing',
  },
  {
    id: 'healthcare-insurance',
    label: 'Insurance Claims',
    icon: Shield,
    path: '/dashboard/healthcare/insurance',
  },
  {
    id: 'healthcare-medical-records',
    label: 'Medical Records',
    icon: FileText,
    path: '/dashboard/healthcare/medical-records',
  },
  {
    id: 'healthcare-reports',
    label: 'Reports & Analytics',
    icon: BarChart3,
    path: '/dashboard/healthcare/reports',
  },
  {
    id: 'healthcare-bed-management',
    label: 'Bed Management',
    icon: Bed,
    path: '/dashboard/healthcare/bed-management',
  },
];
