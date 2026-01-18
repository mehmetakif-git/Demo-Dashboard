import {
  Briefcase,
  Users,
  Calendar,
  FileText,
  FileSignature,
  DollarSign,
  CalendarDays,
  BookOpen,
  Clock,
  UserX,
  Handshake,
  BarChart3,
} from 'lucide-react';
import { ROUTES } from '@/utils/constants';

// Color constants for Law sector
export const LAW_COLOR = '#f59e0b'; // amber-500
export const LAW_COLOR_LIGHT = '#fbbf24'; // amber-400
export const LAW_COLOR_DARK = '#d97706'; // amber-600

// Types
export interface InvoiceItem {
  description: string;
  quantity: number;
  rate: number;
  total: number;
}

export interface Case {
  id: string;
  caseNo: string;
  caseTitle: string;
  caseType: 'Civil' | 'Commercial' | 'Criminal' | 'Family' | 'IP';
  practiceArea: string;
  clientId: string;
  clientName: string;
  opposingParty: string;
  court: string;
  judge: string;
  status: 'active' | 'settlement' | 'won' | 'lost' | 'closed';
  priority: 'urgent' | 'high' | 'normal' | 'low';
  openDate: string;
  nextHearing: string | null;
  assignedLawyer: string;
  assistantLawyer: string | null;
  estimatedValue: number;
  billingType: 'Hourly' | 'Flat Fee' | 'Contingency';
  hourlyRate: number;
  totalBilled: number;
  totalPaid: number;
  notes: string;
  closedDate?: string;
}

export interface Client {
  id: string;
  clientType: 'Individual' | 'Corporate';
  name: string | null;
  companyName: string | null;
  contactPerson: string | null;
  email: string;
  phone: string;
  address: string;
  idType: string;
  idNo: string;
  nationality: string;
  dateOfBirth: string | null;
  occupation: string;
  retainerAgreement: boolean;
  retainerAmount: number;
  activeCases: number;
  totalCases: number;
  totalBilled: number;
  totalPaid: number;
  outstandingBalance: number;
  status: 'active' | 'inactive';
  joinDate: string;
  notes: string;
}

export interface Hearing {
  id: string;
  caseId: string;
  caseNo: string;
  caseTitle: string;
  hearingDate: string;
  hearingTime: string;
  court: string;
  judge: string;
  hearingType: string;
  status: 'scheduled' | 'completed' | 'postponed' | 'cancelled';
  attendees: string[];
  preparation: string;
  outcome: string | null;
  nextHearing: string | null;
  notes: string;
}

export interface LegalDocument {
  id: string;
  caseId: string;
  caseNo: string;
  documentType: string;
  documentName: string;
  fileName: string;
  uploadedBy: string;
  uploadDate: string;
  size: string;
  version: string;
  status: 'draft' | 'reviewed' | 'filed' | 'sent';
  filedDate: string | null;
  tags: string[];
}

export interface Contract {
  id: string;
  contractType: string;
  contractTitle: string;
  clientId: string;
  clientName: string;
  startDate: string;
  endDate: string;
  value: number;
  status: 'active' | 'completed' | 'expired';
  assignedLawyer: string;
  autoRenew: boolean;
  paymentTerms: string;
  nextPaymentDate: string | null;
  notes: string;
}

export interface Invoice {
  id: string;
  invoiceNo: string;
  clientId: string;
  clientName: string;
  caseId: string | null;
  caseNo: string | null;
  invoiceDate: string;
  dueDate: string;
  items: InvoiceItem[];
  subtotal: number;
  tax: number;
  discount: number;
  total: number;
  paidAmount: number;
  balance: number;
  status: 'paid' | 'partial' | 'pending' | 'overdue';
  paymentDate: string | null;
  paymentMethod: string | null;
}

export interface TimeEntry {
  id: string;
  caseId: string;
  caseNo: string;
  lawyerId: string;
  lawyerName: string;
  date: string;
  startTime: string;
  endTime: string;
  duration: number;
  billableHours: number;
  hourlyRate: number;
  amount: number;
  activity: string;
  billable: boolean;
  billed: boolean;
  invoiceId: string | null;
}

export interface OpposingParty {
  id: string;
  name: string;
  type: 'Individual' | 'Corporate' | 'Government';
  caseId: string;
  caseNo: string;
  lawyerName: string;
  lawFirm: string;
  phone: string;
  email: string;
  address: string;
  notes: string;
}

export interface Settlement {
  id: string;
  caseId: string;
  caseNo: string;
  caseTitle: string;
  settlementDate: string;
  settlementType: string;
  status: 'pending-approval' | 'approved' | 'rejected';
  amount: number;
  terms: string;
  approvedBy: string | null;
  approvalDate: string | null;
  notes: string;
}

export interface LegalResearch {
  id: string;
  caseId: string | null;
  caseNo: string | null;
  researchTopic: string;
  researchedBy: string;
  researchDate: string;
  summary: string;
  relevantLaws: string[];
  precedents: string[];
  notes: string;
  documents: string[];
}

// Mock Data
export const cases: Case[] = [
  { id: 'CASE001', caseNo: '2024/001', caseTitle: 'Şahin vs. Yılmaz - Property Dispute', caseType: 'Civil', practiceArea: 'Real Estate', clientId: 'CLI001', clientName: 'Ahmet Şahin', opposingParty: 'Fatma Yılmaz', court: 'Doha Civil Court - Chamber 3', judge: 'Judge Ahmed Al-Mansouri', status: 'active', priority: 'high', openDate: '2024-01-05', nextHearing: '2024-01-25', assignedLawyer: 'Av. Mehmet Demir', assistantLawyer: 'Av. Zeynep Ak', estimatedValue: 2500000, billingType: 'Hourly', hourlyRate: 500, totalBilled: 12500, totalPaid: 5000, notes: 'Property ownership dispute over commercial building' },
  { id: 'CASE002', caseNo: '2024/002', caseTitle: 'Al-Khaled Trading LLC - Contract Dispute', caseType: 'Commercial', practiceArea: 'Contract Law', clientId: 'CLI002', clientName: 'Al-Khaled Trading LLC', opposingParty: 'Gulf Suppliers Co.', court: 'Qatar International Court', judge: 'Judge Sarah Johnson', status: 'active', priority: 'normal', openDate: '2024-01-08', nextHearing: '2024-02-05', assignedLawyer: 'Av. Ayşe Yurt', assistantLawyer: null, estimatedValue: 850000, billingType: 'Contingency', hourlyRate: 0, totalBilled: 0, totalPaid: 0, notes: 'Breach of supply contract' },
  { id: 'CASE003', caseNo: '2023/145', caseTitle: 'State vs. Can Arslan - Criminal Defense', caseType: 'Criminal', practiceArea: 'Criminal Law', clientId: 'CLI003', clientName: 'Can Arslan', opposingParty: 'Qatar Public Prosecutor', court: 'Doha Criminal Court', judge: 'Judge Mohammed Al-Thani', status: 'active', priority: 'urgent', openDate: '2023-11-20', nextHearing: '2024-01-22', assignedLawyer: 'Av. Hasan Öz', assistantLawyer: 'Av. Elif Kaya', estimatedValue: 0, billingType: 'Flat Fee', hourlyRate: 0, totalBilled: 45000, totalPaid: 45000, notes: 'White-collar crime defense' },
  { id: 'CASE004', caseNo: '2024/003', caseTitle: 'Demir Family - Divorce Settlement', caseType: 'Family', practiceArea: 'Family Law', clientId: 'CLI004', clientName: 'Ali Demir', opposingParty: 'Selin Demir', court: 'Doha Family Court', judge: 'Judge Fatma Al-Kuwari', status: 'settlement', priority: 'normal', openDate: '2024-01-10', nextHearing: null, assignedLawyer: 'Av. Zeynep Ak', assistantLawyer: null, estimatedValue: 0, billingType: 'Hourly', hourlyRate: 450, totalBilled: 8100, totalPaid: 8100, notes: 'Amicable divorce proceedings, asset division' },
  { id: 'CASE005', caseNo: '2023/098', caseTitle: 'Tech Innovations LLC - Intellectual Property', caseType: 'IP', practiceArea: 'Intellectual Property', clientId: 'CLI005', clientName: 'Tech Innovations LLC', opposingParty: 'CopyCat Technologies', court: 'Qatar IP Court', judge: 'Judge Hassan Ibrahim', status: 'won', priority: 'normal', openDate: '2023-08-15', nextHearing: null, assignedLawyer: 'Av. Mehmet Demir', assistantLawyer: 'Av. Ayşe Yurt', estimatedValue: 3500000, billingType: 'Contingency', hourlyRate: 0, totalBilled: 525000, totalPaid: 525000, notes: 'Patent infringement case - Won with QAR 3.5M damages awarded', closedDate: '2024-01-10' },
];

export const clients: Client[] = [
  { id: 'CLI001', clientType: 'Individual', name: 'Ahmet Şahin', companyName: null, contactPerson: null, email: 'ahmet.sahin@email.com', phone: '+974 5555 6001', address: 'West Bay, Tower 15, Floor 12, Doha', idType: 'QID', idNo: '28512345678', nationality: 'Turkish', dateOfBirth: '1978-05-20', occupation: 'Business Owner', retainerAgreement: true, retainerAmount: 25000, activeCases: 1, totalCases: 1, totalBilled: 12500, totalPaid: 5000, outstandingBalance: 7500, status: 'active', joinDate: '2024-01-05', notes: 'VIP client - property investor' },
  { id: 'CLI002', clientType: 'Corporate', name: null, companyName: 'Al-Khaled Trading LLC', contactPerson: 'Khalid Al-Mansouri', email: 'khalid@alkhaledtrading.qa', phone: '+974 5555 6002', address: 'Industrial Area, Street 45, Doha', idType: 'CR', idNo: 'CR-2020-12345', nationality: 'Qatari', dateOfBirth: null, occupation: 'Trading', retainerAgreement: true, retainerAmount: 50000, activeCases: 1, totalCases: 3, totalBilled: 125000, totalPaid: 125000, outstandingBalance: 0, status: 'active', joinDate: '2022-03-10', notes: 'Corporate client - ongoing advisory' },
  { id: 'CLI003', clientType: 'Individual', name: 'Can Arslan', companyName: null, contactPerson: null, email: 'can.arslan@email.com', phone: '+974 5555 6003', address: 'Al Sadd, Villa 23, Doha', idType: 'Passport', idNo: 'T12345678', nationality: 'Turkish', dateOfBirth: '1985-11-08', occupation: 'Finance Manager', retainerAgreement: false, retainerAmount: 0, activeCases: 1, totalCases: 1, totalBilled: 45000, totalPaid: 45000, outstandingBalance: 0, status: 'active', joinDate: '2023-11-20', notes: 'Criminal defense case' },
  { id: 'CLI004', clientType: 'Individual', name: 'Ali Demir', companyName: null, contactPerson: null, email: 'ali.demir@email.com', phone: '+974 5555 6004', address: 'The Pearl, Tower A, Apt 501, Doha', idType: 'QID', idNo: '28598765432', nationality: 'Turkish', dateOfBirth: '1982-07-15', occupation: 'Architect', retainerAgreement: false, retainerAmount: 0, activeCases: 1, totalCases: 1, totalBilled: 8100, totalPaid: 8100, outstandingBalance: 0, status: 'active', joinDate: '2024-01-10', notes: 'Family law - divorce' },
  { id: 'CLI005', clientType: 'Corporate', name: null, companyName: 'Tech Innovations LLC', contactPerson: 'Dr. Mehmet Yılmaz', email: 'mehmet@techinnovations.qa', phone: '+974 5555 6005', address: 'Lusail, Tech Park Building 7, Doha', idType: 'CR', idNo: 'CR-2019-54321', nationality: 'Qatari', dateOfBirth: null, occupation: 'Technology', retainerAgreement: true, retainerAmount: 75000, activeCases: 0, totalCases: 2, totalBilled: 625000, totalPaid: 625000, outstandingBalance: 0, status: 'active', joinDate: '2021-06-15', notes: 'IP litigation specialist' },
];

export const hearings: Hearing[] = [
  { id: 'HEAR001', caseId: 'CASE001', caseNo: '2024/001', caseTitle: 'Şahin vs. Yılmaz - Property Dispute', hearingDate: '2024-01-25', hearingTime: '10:00', court: 'Doha Civil Court - Chamber 3', judge: 'Judge Ahmed Al-Mansouri', hearingType: 'Preliminary Hearing', status: 'scheduled', attendees: ['Av. Mehmet Demir', 'Av. Zeynep Ak', 'Ahmet Şahin'], preparation: 'Prepare witness statements and property documents', outcome: null, nextHearing: null, notes: '' },
  { id: 'HEAR002', caseId: 'CASE003', caseNo: '2023/145', caseTitle: 'State vs. Can Arslan - Criminal Defense', hearingDate: '2024-01-22', hearingTime: '09:30', court: 'Doha Criminal Court', judge: 'Judge Mohammed Al-Thani', hearingType: 'Evidence Hearing', status: 'scheduled', attendees: ['Av. Hasan Öz', 'Av. Elif Kaya', 'Can Arslan'], preparation: 'Financial expert testimony, documentary evidence', outcome: null, nextHearing: null, notes: 'Critical hearing - expert witness' },
  { id: 'HEAR003', caseId: 'CASE002', caseNo: '2024/002', caseTitle: 'Al-Khaled Trading LLC - Contract Dispute', hearingDate: '2024-02-05', hearingTime: '14:00', court: 'Qatar International Court', judge: 'Judge Sarah Johnson', hearingType: 'Case Management Conference', status: 'scheduled', attendees: ['Av. Ayşe Yurt', 'Khalid Al-Mansouri'], preparation: 'Submit case management questionnaire by Jan 30', outcome: null, nextHearing: null, notes: '' },
  { id: 'HEAR004', caseId: 'CASE001', caseNo: '2024/001', caseTitle: 'Şahin vs. Yılmaz - Property Dispute', hearingDate: '2024-01-15', hearingTime: '10:00', court: 'Doha Civil Court - Chamber 3', judge: 'Judge Ahmed Al-Mansouri', hearingType: 'Initial Hearing', status: 'completed', attendees: ['Av. Mehmet Demir', 'Ahmet Şahin'], preparation: 'Case filing and initial pleadings', outcome: 'Preliminary hearing scheduled for Jan 25. Discovery period set until Feb 15.', nextHearing: '2024-01-25', notes: 'Judge ordered both parties to attempt mediation' },
  { id: 'HEAR005', caseId: 'CASE005', caseNo: '2023/098', caseTitle: 'Tech Innovations LLC - Intellectual Property', hearingDate: '2024-01-08', hearingTime: '11:00', court: 'Qatar IP Court', judge: 'Judge Hassan Ibrahim', hearingType: 'Final Judgment', status: 'completed', attendees: ['Av. Mehmet Demir', 'Av. Ayşe Yurt', 'Dr. Mehmet Yılmaz'], preparation: 'Closing arguments', outcome: 'Judgment in favor of plaintiff. Damages awarded: QAR 3,500,000. Injunction granted.', nextHearing: null, notes: 'Landmark IP case' },
];

export const documents: LegalDocument[] = [
  { id: 'DOC001', caseId: 'CASE001', caseNo: '2024/001', documentType: 'Pleading', documentName: 'Statement of Claim', fileName: 'SOC-2024-001.pdf', uploadedBy: 'Av. Mehmet Demir', uploadDate: '2024-01-06', size: '2.5 MB', version: 'Final', status: 'filed', filedDate: '2024-01-07', tags: ['Pleading', 'Initial Filing'] },
  { id: 'DOC002', caseId: 'CASE001', caseNo: '2024/001', documentType: 'Evidence', documentName: 'Property Title Deeds', fileName: 'Title-Deeds.pdf', uploadedBy: 'Av. Zeynep Ak', uploadDate: '2024-01-10', size: '5.8 MB', version: 'Original', status: 'reviewed', filedDate: null, tags: ['Evidence', 'Property Documents'] },
  { id: 'DOC003', caseId: 'CASE003', caseNo: '2023/145', documentType: 'Evidence', documentName: 'Financial Records 2022-2023', fileName: 'Financial-Records.xlsx', uploadedBy: 'Av. Hasan Öz', uploadDate: '2024-01-12', size: '1.2 MB', version: 'Final', status: 'filed', filedDate: '2024-01-13', tags: ['Evidence', 'Financial'] },
  { id: 'DOC004', caseId: 'CASE002', caseNo: '2024/002', documentType: 'Contract', documentName: 'Supply Agreement - Original', fileName: 'Supply-Agreement.pdf', uploadedBy: 'Av. Ayşe Yurt', uploadDate: '2024-01-09', size: '3.2 MB', version: 'Original', status: 'reviewed', filedDate: null, tags: ['Contract', 'Evidence'] },
  { id: 'DOC005', caseId: 'CASE001', caseNo: '2024/001', documentType: 'Correspondence', documentName: 'Letter to Opposing Counsel', fileName: 'Letter-Jan-14.pdf', uploadedBy: 'Av. Mehmet Demir', uploadDate: '2024-01-14', size: '0.3 MB', version: 'Final', status: 'sent', filedDate: null, tags: ['Correspondence'] },
  { id: 'DOC006', caseId: 'CASE005', caseNo: '2023/098', documentType: 'Judgment', documentName: 'Final Judgment - IP Case', fileName: 'Judgment-2023-098.pdf', uploadedBy: 'Court Registry', uploadDate: '2024-01-10', size: '4.5 MB', version: 'Official', status: 'filed', filedDate: '2024-01-10', tags: ['Judgment', 'Final'] },
];

export const contracts: Contract[] = [
  { id: 'CONT001', contractType: 'Retainer Agreement', contractTitle: 'Legal Services Retainer - Ahmet Şahin', clientId: 'CLI001', clientName: 'Ahmet Şahin', startDate: '2024-01-05', endDate: '2025-01-05', value: 25000, status: 'active', assignedLawyer: 'Av. Mehmet Demir', autoRenew: true, paymentTerms: 'Quarterly', nextPaymentDate: '2024-04-05', notes: 'General legal advisory and property matters' },
  { id: 'CONT002', contractType: 'Retainer Agreement', contractTitle: 'Corporate Retainer - Al-Khaled Trading LLC', clientId: 'CLI002', clientName: 'Al-Khaled Trading LLC', startDate: '2024-01-01', endDate: '2024-12-31', value: 50000, status: 'active', assignedLawyer: 'Av. Ayşe Yurt', autoRenew: true, paymentTerms: 'Annual', nextPaymentDate: null, notes: 'Corporate advisory and contract review' },
  { id: 'CONT003', contractType: 'Contingency Agreement', contractTitle: 'IP Litigation - Tech Innovations LLC', clientId: 'CLI005', clientName: 'Tech Innovations LLC', startDate: '2023-08-15', endDate: '2024-01-10', value: 0, status: 'completed', assignedLawyer: 'Av. Mehmet Demir', autoRenew: false, paymentTerms: 'Contingency - 15%', nextPaymentDate: null, notes: '15% of damages awarded. Successful outcome: QAR 525,000 fee' },
  { id: 'CONT004', contractType: 'Flat Fee Agreement', contractTitle: 'Criminal Defense - Can Arslan', clientId: 'CLI003', clientName: 'Can Arslan', startDate: '2023-11-20', endDate: '2024-06-30', value: 45000, status: 'active', assignedLawyer: 'Av. Hasan Öz', autoRenew: false, paymentTerms: 'Upfront', nextPaymentDate: null, notes: 'Full defense representation - fixed fee' },
];

export const invoices: Invoice[] = [
  { id: 'INV001', invoiceNo: 'INV-2024-001', clientId: 'CLI001', clientName: 'Ahmet Şahin', caseId: 'CASE001', caseNo: '2024/001', invoiceDate: '2024-01-15', dueDate: '2024-02-14', items: [
    { description: 'Legal Consultation - 10 hours', quantity: 10, rate: 500, total: 5000 },
    { description: 'Document Preparation', quantity: 8, rate: 500, total: 4000 },
    { description: 'Court Filing Fees', quantity: 1, rate: 500, total: 500 }
  ], subtotal: 9500, tax: 0, discount: 0, total: 9500, paidAmount: 5000, balance: 4500, status: 'partial', paymentDate: null, paymentMethod: null },
  { id: 'INV002', invoiceNo: 'INV-2024-002', clientId: 'CLI004', clientName: 'Ali Demir', caseId: 'CASE004', caseNo: '2024/003', invoiceDate: '2024-01-12', dueDate: '2024-02-11', items: [
    { description: 'Divorce Consultation & Filing', quantity: 12, rate: 450, total: 5400 },
    { description: 'Asset Division Analysis', quantity: 6, rate: 450, total: 2700 }
  ], subtotal: 8100, tax: 0, discount: 0, total: 8100, paidAmount: 8100, balance: 0, status: 'paid', paymentDate: '2024-01-13', paymentMethod: 'Bank Transfer' },
  { id: 'INV003', invoiceNo: 'INV-2024-003', clientId: 'CLI005', clientName: 'Tech Innovations LLC', caseId: 'CASE005', caseNo: '2023/098', invoiceDate: '2024-01-11', dueDate: '2024-02-10', items: [
    { description: 'Contingency Fee - 15% of QAR 3,500,000', quantity: 1, rate: 525000, total: 525000 }
  ], subtotal: 525000, tax: 0, discount: 0, total: 525000, paidAmount: 525000, balance: 0, status: 'paid', paymentDate: '2024-01-12', paymentMethod: 'Bank Transfer' },
];

export const timeEntries: TimeEntry[] = [
  { id: 'TIME001', caseId: 'CASE001', caseNo: '2024/001', lawyerId: 'LAW001', lawyerName: 'Av. Mehmet Demir', date: '2024-01-10', startTime: '09:00', endTime: '11:30', duration: 2.5, billableHours: 2.5, hourlyRate: 500, amount: 1250, activity: 'Client consultation and case strategy', billable: true, billed: false, invoiceId: null },
  { id: 'TIME002', caseId: 'CASE001', caseNo: '2024/001', lawyerId: 'LAW002', lawyerName: 'Av. Zeynep Ak', date: '2024-01-11', startTime: '14:00', endTime: '18:00', duration: 4, billableHours: 4, hourlyRate: 400, amount: 1600, activity: 'Legal research - property law precedents', billable: true, billed: false, invoiceId: null },
  { id: 'TIME003', caseId: 'CASE001', caseNo: '2024/001', lawyerId: 'LAW001', lawyerName: 'Av. Mehmet Demir', date: '2024-01-12', startTime: '10:00', endTime: '13:00', duration: 3, billableHours: 3, hourlyRate: 500, amount: 1500, activity: 'Document preparation - Statement of Claim', billable: true, billed: true, invoiceId: 'INV001' },
  { id: 'TIME004', caseId: 'CASE003', caseNo: '2023/145', lawyerId: 'LAW003', lawyerName: 'Av. Hasan Öz', date: '2024-01-15', startTime: '15:00', endTime: '17:30', duration: 2.5, billableHours: 0, hourlyRate: 0, amount: 0, activity: 'Case review and preparation', billable: false, billed: false, invoiceId: null },
  { id: 'TIME005', caseId: 'CASE002', caseNo: '2024/002', lawyerId: 'LAW004', lawyerName: 'Av. Ayşe Yurt', date: '2024-01-14', startTime: '09:30', endTime: '12:00', duration: 2.5, billableHours: 2.5, hourlyRate: 550, amount: 1375, activity: 'Contract analysis and breach assessment', billable: true, billed: false, invoiceId: null },
];

export const opposingParties: OpposingParty[] = [
  { id: 'OPP001', name: 'Fatma Yılmaz', type: 'Individual', caseId: 'CASE001', caseNo: '2024/001', lawyerName: 'Av. Kemal Arslan', lawFirm: 'Arslan & Partners', phone: '+974 5555 7001', email: 'kemal@arslanpartners.qa', address: 'Al Sadd, Doha', notes: 'Experienced in property litigation' },
  { id: 'OPP002', name: 'Gulf Suppliers Co.', type: 'Corporate', caseId: 'CASE002', caseNo: '2024/002', lawyerName: 'Av. Hassan Al-Thani', lawFirm: 'Al-Thani Legal Group', phone: '+974 5555 7002', email: 'hassan@althanilegal.qa', address: 'West Bay, Doha', notes: 'Large commercial law firm' },
  { id: 'OPP003', name: 'Qatar Public Prosecutor', type: 'Government', caseId: 'CASE003', caseNo: '2023/145', lawyerName: 'Public Prosecutor Ahmed', lawFirm: 'Public Prosecution Office', phone: '+974 4444 0001', email: 'prosecution@gov.qa', address: 'Government District, Doha', notes: 'State prosecution' },
  { id: 'OPP004', name: 'Selin Demir', type: 'Individual', caseId: 'CASE004', caseNo: '2024/003', lawyerName: 'Av. Ayşe Kara', lawFirm: 'Family Law Associates', phone: '+974 5555 7003', email: 'ayse@familylawqa.com', address: 'The Pearl, Doha', notes: 'Amicable proceedings' },
  { id: 'OPP005', name: 'CopyCat Technologies', type: 'Corporate', caseId: 'CASE005', caseNo: '2023/098', lawyerName: 'Av. Mohammed Ibrahim', lawFirm: 'Ibrahim & Co.', phone: '+974 5555 7004', email: 'mohammed@ibrahimco.qa', address: 'Lusail, Doha', notes: 'Lost case - damages awarded against them' },
];

export const settlements: Settlement[] = [
  { id: 'SETT001', caseId: 'CASE004', caseNo: '2024/003', caseTitle: 'Demir Family - Divorce Settlement', settlementDate: '2024-01-16', settlementType: 'Mediated Settlement', status: 'pending-approval', amount: 0, terms: 'Asset division: 60/40 split in favor of Mrs. Demir. Custody: Joint custody with primary residence with mother. Child support: QAR 8,000/month.', approvedBy: null, approvalDate: null, notes: 'Both parties agreed to terms during mediation session' },
  { id: 'SETT002', caseId: 'CASE005', caseNo: '2023/098', caseTitle: 'Tech Innovations LLC - Intellectual Property', settlementDate: '2024-01-08', settlementType: 'Court Judgment', status: 'approved', amount: 3500000, terms: 'Damages awarded: QAR 3,500,000. Permanent injunction against defendant. Defendant to cease all infringing activities immediately.', approvedBy: 'Judge Hassan Ibrahim', approvalDate: '2024-01-08', notes: 'Final judgment - case closed' },
];

export const legalResearch: LegalResearch[] = [
  { id: 'RES001', caseId: 'CASE001', caseNo: '2024/001', researchTopic: 'Property Ownership Disputes - Qatar Law', researchedBy: 'Av. Zeynep Ak', researchDate: '2024-01-11', summary: 'Analyzed Law No. 16 of 2018 on Real Estate Ownership. Key precedents: Case 45/2020 (similar property dispute), Case 78/2019 (title deed validity).', relevantLaws: ['Law No. 16 of 2018', 'Civil Code Article 823-850'], precedents: ['Case 45/2020 - Doha Civil Court', 'Case 78/2019 - Court of Appeal'], notes: 'Strong precedent supporting client\'s position', documents: ['DOC002'] },
  { id: 'RES002', caseId: 'CASE003', caseNo: '2023/145', researchTopic: 'White Collar Crime Defense Strategies', researchedBy: 'Av. Elif Kaya', researchDate: '2024-01-13', summary: 'Research on financial crime defenses under Qatar Penal Code. Expert testimony requirements, burden of proof analysis.', relevantLaws: ['Penal Code Law No. 11 of 2004', 'Commercial Companies Law'], precedents: ['Case 23/2022 - Criminal Court'], notes: 'Focus on lack of intent, procedural errors', documents: ['DOC003'] },
];

// Menu items for sidebar
export const lawMenuItems = [
  { id: 'law-cases', label: 'Cases', icon: Briefcase, path: ROUTES.law.cases, color: LAW_COLOR },
  { id: 'law-clients', label: 'Clients', icon: Users, path: ROUTES.law.clients, color: LAW_COLOR },
  { id: 'law-hearings', label: 'Hearings', icon: Calendar, path: ROUTES.law.hearings, color: LAW_COLOR },
  { id: 'law-documents', label: 'Documents', icon: FileText, path: ROUTES.law.documents, color: LAW_COLOR },
  { id: 'law-contracts', label: 'Contracts', icon: FileSignature, path: ROUTES.law.contracts, color: LAW_COLOR },
  { id: 'law-billing', label: 'Billing', icon: DollarSign, path: ROUTES.law.billing, color: LAW_COLOR },
  { id: 'law-calendar', label: 'Calendar', icon: CalendarDays, path: ROUTES.law.calendar, color: LAW_COLOR },
  { id: 'law-research', label: 'Legal Research', icon: BookOpen, path: ROUTES.law.research, color: LAW_COLOR },
  { id: 'law-time-tracking', label: 'Time Tracking', icon: Clock, path: ROUTES.law.timeTracking, color: LAW_COLOR },
  { id: 'law-opposing', label: 'Opposing Parties', icon: UserX, path: ROUTES.law.opposing, color: LAW_COLOR },
  { id: 'law-settlements', label: 'Settlements', icon: Handshake, path: ROUTES.law.settlements, color: LAW_COLOR },
  { id: 'law-reports', label: 'Reports', icon: BarChart3, path: ROUTES.law.reports, color: LAW_COLOR },
];
