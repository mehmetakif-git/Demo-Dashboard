import {
  Users,
  School,
  UserCheck,
  BookOpen,
  ClipboardCheck,
  FileText,
  CheckSquare,
  Award,
  UserPlus,
  Library,
  Bus,
  CreditCard,
} from 'lucide-react';
import { ROUTES } from '@/utils/constants';

// Education sector color
export const EDUCATION_COLOR = '#8b5cf6';

// Types
export interface Student {
  id: string;
  studentNo: string;
  name: string;
  tcNo: string;
  birthDate: string;
  age: number;
  gender: string;
  classId: string;
  className: string;
  grade: number;
  section: string;
  rollNo: number;
  phone: string;
  email: string;
  address: string;
  parentId: string;
  parentName: string;
  parentPhone: string;
  parentEmail: string;
  admissionDate: string;
  status: 'active' | 'inactive' | 'alumni';
  bloodGroup: string;
  emergencyContact: string;
  photo: string | null;
}

export interface Class {
  id: string;
  name: string;
  grade: number;
  section: string;
  academicYear: string;
  classTeacherId: string;
  classTeacherName: string;
  roomNo: string;
  capacity: number;
  currentStrength: number;
  subjects: string[];
  timetable: null;
}

export interface Teacher {
  id: string;
  employeeNo: string;
  name: string;
  email: string;
  phone: string;
  subjects: string[];
  qualifications: string[];
  experience: number;
  joinDate: string;
  classTeacherOf: string | null;
  status: 'active' | 'inactive';
  photo: string | null;
}

export interface Subject {
  id: string;
  name: string;
  code: string;
  grade: number;
  credits: number;
  teacher: string;
  teacherId: string;
  description: string;
}

export interface AttendanceRecord {
  id: string;
  studentId: string;
  studentName: string;
  classId: string;
  className: string;
  date: string;
  status: 'present' | 'absent' | 'late';
  arrivedAt: string | null;
  remarks: string;
}

export interface Exam {
  id: string;
  name: string;
  type: string;
  academicYear: string;
  term: string;
  startDate: string;
  endDate: string;
  status: 'completed' | 'upcoming' | 'scheduled' | 'ongoing';
  grades: number[];
}

export interface ExamSchedule {
  id: string;
  examId: string;
  examName: string;
  classId: string;
  className: string;
  subjectId: string;
  subjectName: string;
  date: string;
  time: string;
  duration: number;
  roomNo: string;
  invigilator: string;
}

export interface Assignment {
  id: string;
  title: string;
  subjectId: string;
  subjectName: string;
  teacherId: string;
  teacherName: string;
  classId: string;
  className: string;
  description: string;
  assignedDate: string;
  dueDate: string;
  maxScore: number;
  attachments: string[];
  submissionCount: number;
  totalStudents: number;
  status: 'active' | 'completed';
}

export interface Submission {
  id: string;
  assignmentId: string;
  studentId: string;
  studentName: string;
  submittedAt: string;
  status: 'submitted' | 'graded' | 'late';
  score: number | null;
  feedback: string | null;
  attachments: string[];
  gradedBy: string | null;
  gradedAt: string | null;
}

export interface Grade {
  id: string;
  studentId: string;
  studentName: string;
  classId: string;
  className: string;
  academicYear: string;
  term: string;
  subjectId: string;
  subjectName: string;
  midterm: number | null;
  final: number | null;
  assignments: number | null;
  average: number;
  grade: string;
  teacherId: string;
}

export interface Parent {
  id: string;
  name: string;
  email: string;
  phone: string;
  relation: string;
  occupation: string;
  students: string[];
  studentNames: string[];
  address: string;
  status: 'active' | 'inactive';
}

export interface LibraryBook {
  id: string;
  isbn: string;
  title: string;
  author: string;
  category: string;
  publisher: string;
  publicationYear: number;
  language: string;
  totalCopies: number;
  availableCopies: number;
  location: string;
  status: 'available' | 'borrowed' | 'reserved';
}

export interface Borrowing {
  id: string;
  bookId: string;
  bookTitle: string;
  studentId: string;
  studentName: string;
  borrowDate: string;
  dueDate: string;
  returnDate: string | null;
  status: 'active' | 'overdue' | 'returned';
  fine: number;
}

export interface BusRoute {
  id: string;
  routeNo: string;
  routeName: string;
  driverId: string;
  driverName: string;
  driverPhone: string;
  vehicleNo: string;
  capacity: number;
  studentCount: number;
  status: 'active' | 'inactive';
  stops: string[];
  startTime: string;
  endTime: string;
}

export interface TransportStudent {
  id: string;
  studentId: string;
  studentName: string;
  classId: string;
  className: string;
  routeId: string;
  routeNo: string;
  pickupPoint: string;
  dropPoint: string;
  status: 'active' | 'inactive';
}

export interface FeeStructure {
  id: string;
  grade: number;
  academicYear: string;
  tuitionFee: number;
  admissionFee: number;
  examFee: number;
  libraryFee: number;
  transportFee: number;
  total: number;
}

export interface FeePayment {
  id: string;
  studentId: string;
  studentName: string;
  classId: string;
  className: string;
  academicYear: string;
  totalFee: number;
  paidAmount: number;
  dueAmount: number;
  status: 'paid' | 'partial' | 'pending';
  payments: Array<{
    date: string;
    amount: number;
    method: string;
    receiptNo: string;
  }>;
}

// Mock Data
export const students: Student[] = [
  { id: 'STU001', studentNo: '2024001', name: 'Ahmet Yilmaz', tcNo: '12345678901', birthDate: '2010-03-15', age: 14, gender: 'Erkek', classId: 'CLS001', className: '9-A', grade: 9, section: 'A', rollNo: 1, phone: '+974 5555 1111', email: 'ahmet.student@school.com', address: 'Ataturk Cad. No:45 Doha', parentId: 'PAR001', parentName: 'Mehmet Yilmaz', parentPhone: '+974 5555 2222', parentEmail: 'mehmet@email.com', admissionDate: '2023-09-01', status: 'active', bloodGroup: 'A+', emergencyContact: 'Ayse Yilmaz - +974 5555 3333', photo: null },
  { id: 'STU002', studentNo: '2024002', name: 'Fatma Demir', tcNo: '98765432109', birthDate: '2010-07-22', age: 14, gender: 'Kiz', classId: 'CLS001', className: '9-A', grade: 9, section: 'A', rollNo: 2, phone: '+974 5555 4444', email: 'fatma.student@school.com', address: 'Merkez Mah. 12. Sok. Doha', parentId: 'PAR002', parentName: 'Ali Demir', parentPhone: '+974 5555 5555', parentEmail: 'ali@email.com', admissionDate: '2023-09-01', status: 'active', bloodGroup: 'B+', emergencyContact: 'Zeynep Demir - +974 5555 6666', photo: null },
  { id: 'STU003', studentNo: '2024003', name: 'Can Arslan', tcNo: '11122233344', birthDate: '2010-11-08', age: 14, gender: 'Erkek', classId: 'CLS001', className: '9-A', grade: 9, section: 'A', rollNo: 3, phone: '+974 5555 7777', email: 'can.student@school.com', address: 'Yeni Mah. 25. Cad. Doha', parentId: 'PAR003', parentName: 'Hasan Arslan', parentPhone: '+974 5555 8888', parentEmail: 'hasan@email.com', admissionDate: '2023-09-01', status: 'active', bloodGroup: 'O-', emergencyContact: 'Elif Arslan - +974 5555 9999', photo: null },
  { id: 'STU004', studentNo: '2024004', name: 'Zeynep Kaya', tcNo: '55566677788', birthDate: '2011-05-30', age: 13, gender: 'Kiz', classId: 'CLS002', className: '8-A', grade: 8, section: 'A', rollNo: 1, phone: '+974 5555 0001', email: 'zeynep.student@school.com', address: 'Sahil Cad. 8. Sk. Doha', parentId: 'PAR004', parentName: 'Burak Kaya', parentPhone: '+974 5555 0002', parentEmail: 'burak@email.com', admissionDate: '2023-09-01', status: 'active', bloodGroup: 'AB+', emergencyContact: 'Selin Kaya - +974 5555 0003', photo: null },
  { id: 'STU005', studentNo: '2024005', name: 'Mehmet Oz', tcNo: '33344455566', birthDate: '2009-09-18', age: 15, gender: 'Erkek', classId: 'CLS003', className: '10-B', grade: 10, section: 'B', rollNo: 5, phone: '+974 5555 0004', email: 'mehmet.student@school.com', address: 'Kultur Mah. 3. Cad. Doha', parentId: 'PAR005', parentName: 'Kemal Oz', parentPhone: '+974 5555 0005', parentEmail: 'kemal@email.com', admissionDate: '2022-09-01', status: 'active', bloodGroup: 'A-', emergencyContact: 'Ayse Oz - +974 5555 0006', photo: null },
  { id: 'STU006', studentNo: '2024006', name: 'Elif Celik', tcNo: '77788899900', birthDate: '2010-01-12', age: 14, gender: 'Kiz', classId: 'CLS004', className: '9-B', grade: 9, section: 'B', rollNo: 1, phone: '+974 5555 0007', email: 'elif.student@school.com', address: 'Park Sok. No:10 Doha', parentId: 'PAR006', parentName: 'Murat Celik', parentPhone: '+974 5555 0008', parentEmail: 'murat@email.com', admissionDate: '2023-09-01', status: 'active', bloodGroup: 'B-', emergencyContact: 'Sema Celik - +974 5555 0009', photo: null },
];

export const classes: Class[] = [
  { id: 'CLS001', name: '9-A', grade: 9, section: 'A', academicYear: '2024-2025', classTeacherId: 'TCH001', classTeacherName: 'Ayse Sahin', roomNo: '201', capacity: 30, currentStrength: 28, subjects: ['Matematik', 'Turkce', 'Ingilizce', 'Fen Bilgisi', 'Sosyal Bilgiler', 'Beden Egitimi'], timetable: null },
  { id: 'CLS002', name: '8-A', grade: 8, section: 'A', academicYear: '2024-2025', classTeacherId: 'TCH002', classTeacherName: 'Mehmet Yurt', roomNo: '105', capacity: 30, currentStrength: 25, subjects: ['Matematik', 'Turkce', 'Ingilizce', 'Fen Bilgisi', 'Sosyal Bilgiler', 'Beden Egitimi'], timetable: null },
  { id: 'CLS003', name: '10-B', grade: 10, section: 'B', academicYear: '2024-2025', classTeacherId: 'TCH003', classTeacherName: 'Zeynep Demir', roomNo: '305', capacity: 30, currentStrength: 27, subjects: ['Matematik', 'Turkce', 'Ingilizce', 'Fizik', 'Kimya', 'Biyoloji', 'Tarih', 'Cografya'], timetable: null },
  { id: 'CLS004', name: '9-B', grade: 9, section: 'B', academicYear: '2024-2025', classTeacherId: 'TCH004', classTeacherName: 'Can Yilmaz', roomNo: '202', capacity: 30, currentStrength: 29, subjects: ['Matematik', 'Turkce', 'Ingilizce', 'Fen Bilgisi', 'Sosyal Bilgiler', 'Beden Egitimi'], timetable: null },
];

export const teachers: Teacher[] = [
  { id: 'TCH001', employeeNo: 'EMP001', name: 'Ayse Sahin', email: 'ayse.sahin@school.com', phone: '+974 5555 1001', subjects: ['Matematik'], qualifications: ['Matematik Lisans', 'Pedagojik Formasyon'], experience: 12, joinDate: '2015-09-01', classTeacherOf: 'CLS001', status: 'active', photo: null },
  { id: 'TCH002', employeeNo: 'EMP002', name: 'Mehmet Yurt', email: 'mehmet.yurt@school.com', phone: '+974 5555 1002', subjects: ['Turkce', 'Edebiyat'], qualifications: ['Turk Dili ve Edebiyati Lisans'], experience: 8, joinDate: '2018-09-01', classTeacherOf: 'CLS002', status: 'active', photo: null },
  { id: 'TCH003', employeeNo: 'EMP003', name: 'Zeynep Demir', email: 'zeynep.demir@school.com', phone: '+974 5555 1003', subjects: ['Ingilizce'], qualifications: ['Ingiliz Dili ve Edebiyati Lisans', 'TESOL Sertifikasi'], experience: 10, joinDate: '2016-09-01', classTeacherOf: 'CLS003', status: 'active', photo: null },
  { id: 'TCH004', employeeNo: 'EMP004', name: 'Can Yilmaz', email: 'can.yilmaz@school.com', phone: '+974 5555 1004', subjects: ['Fizik', 'Kimya'], qualifications: ['Fizik Lisans', 'Yuksek Lisans'], experience: 15, joinDate: '2012-09-01', classTeacherOf: 'CLS004', status: 'active', photo: null },
  { id: 'TCH005', employeeNo: 'EMP005', name: 'Elif Ak', email: 'elif.ak@school.com', phone: '+974 5555 1005', subjects: ['Biyoloji', 'Fen Bilgisi'], qualifications: ['Biyoloji Lisans'], experience: 6, joinDate: '2020-09-01', classTeacherOf: null, status: 'active', photo: null },
  { id: 'TCH006', employeeNo: 'EMP006', name: 'Ali Kara', email: 'ali.kara@school.com', phone: '+974 5555 1006', subjects: ['Tarih', 'Sosyal Bilgiler'], qualifications: ['Tarih Lisans'], experience: 9, joinDate: '2017-09-01', classTeacherOf: null, status: 'active', photo: null },
];

export const subjects: Subject[] = [
  { id: 'SUB001', name: 'Matematik', code: 'MAT', grade: 9, credits: 6, teacher: 'Ayse Sahin', teacherId: 'TCH001', description: '9. Sinif Matematik' },
  { id: 'SUB002', name: 'Turkce', code: 'TUR', grade: 9, credits: 5, teacher: 'Mehmet Yurt', teacherId: 'TCH002', description: '9. Sinif Turkce' },
  { id: 'SUB003', name: 'Ingilizce', code: 'ENG', grade: 9, credits: 4, teacher: 'Zeynep Demir', teacherId: 'TCH003', description: '9. Sinif Ingilizce' },
  { id: 'SUB004', name: 'Fen Bilgisi', code: 'FEN', grade: 9, credits: 4, teacher: 'Elif Ak', teacherId: 'TCH005', description: '9. Sinif Fen Bilgisi' },
  { id: 'SUB005', name: 'Sosyal Bilgiler', code: 'SOS', grade: 9, credits: 3, teacher: 'Ali Kara', teacherId: 'TCH006', description: '9. Sinif Sosyal Bilgiler' },
  { id: 'SUB006', name: 'Fizik', code: 'FIZ', grade: 10, credits: 4, teacher: 'Can Yilmaz', teacherId: 'TCH004', description: '10. Sinif Fizik' },
  { id: 'SUB007', name: 'Kimya', code: 'KIM', grade: 10, credits: 4, teacher: 'Can Yilmaz', teacherId: 'TCH004', description: '10. Sinif Kimya' },
  { id: 'SUB008', name: 'Biyoloji', code: 'BIO', grade: 10, credits: 4, teacher: 'Elif Ak', teacherId: 'TCH005', description: '10. Sinif Biyoloji' },
];

export const attendance: AttendanceRecord[] = [
  { id: 'ATT001', studentId: 'STU001', studentName: 'Ahmet Yilmaz', classId: 'CLS001', className: '9-A', date: '2024-01-17', status: 'present', arrivedAt: '08:15', remarks: '' },
  { id: 'ATT002', studentId: 'STU002', studentName: 'Fatma Demir', classId: 'CLS001', className: '9-A', date: '2024-01-17', status: 'present', arrivedAt: '08:10', remarks: '' },
  { id: 'ATT003', studentId: 'STU003', studentName: 'Can Arslan', classId: 'CLS001', className: '9-A', date: '2024-01-17', status: 'late', arrivedAt: '08:45', remarks: 'Servis gec kaldi' },
  { id: 'ATT004', studentId: 'STU001', studentName: 'Ahmet Yilmaz', classId: 'CLS001', className: '9-A', date: '2024-01-16', status: 'absent', arrivedAt: null, remarks: 'Hasta (veli bildirdi)' },
  { id: 'ATT005', studentId: 'STU002', studentName: 'Fatma Demir', classId: 'CLS001', className: '9-A', date: '2024-01-16', status: 'present', arrivedAt: '08:12', remarks: '' },
  { id: 'ATT006', studentId: 'STU004', studentName: 'Zeynep Kaya', classId: 'CLS002', className: '8-A', date: '2024-01-17', status: 'present', arrivedAt: '08:20', remarks: '' },
];

export const exams: Exam[] = [
  { id: 'EXM001', name: '1. Donem Ara Sinav', type: 'Ara Sinav', academicYear: '2024-2025', term: '1. Donem', startDate: '2024-11-15', endDate: '2024-11-22', status: 'completed', grades: [9, 10, 11, 12] },
  { id: 'EXM002', name: '1. Donem Final', type: 'Final', academicYear: '2024-2025', term: '1. Donem', startDate: '2024-01-20', endDate: '2024-01-27', status: 'upcoming', grades: [9, 10, 11, 12] },
  { id: 'EXM003', name: '2. Donem Ara Sinav', type: 'Ara Sinav', academicYear: '2024-2025', term: '2. Donem', startDate: '2024-04-10', endDate: '2024-04-17', status: 'scheduled', grades: [9, 10, 11, 12] },
];

export const examSchedule: ExamSchedule[] = [
  { id: 'EXSCH001', examId: 'EXM002', examName: '1. Donem Final', classId: 'CLS001', className: '9-A', subjectId: 'SUB001', subjectName: 'Matematik', date: '2024-01-20', time: '09:00', duration: 90, roomNo: '201', invigilator: 'Ayse Sahin' },
  { id: 'EXSCH002', examId: 'EXM002', examName: '1. Donem Final', classId: 'CLS001', className: '9-A', subjectId: 'SUB002', subjectName: 'Turkce', date: '2024-01-21', time: '09:00', duration: 90, roomNo: '201', invigilator: 'Mehmet Yurt' },
  { id: 'EXSCH003', examId: 'EXM002', examName: '1. Donem Final', classId: 'CLS001', className: '9-A', subjectId: 'SUB003', subjectName: 'Ingilizce', date: '2024-01-22', time: '09:00', duration: 90, roomNo: '201', invigilator: 'Zeynep Demir' },
  { id: 'EXSCH004', examId: 'EXM002', examName: '1. Donem Final', classId: 'CLS001', className: '9-A', subjectId: 'SUB004', subjectName: 'Fen Bilgisi', date: '2024-01-23', time: '09:00', duration: 90, roomNo: '201', invigilator: 'Elif Ak' },
];

export const assignments: Assignment[] = [
  { id: 'ASG001', title: 'Karekoklu Ifadeler Calisma Yapragi', subjectId: 'SUB001', subjectName: 'Matematik', teacherId: 'TCH001', teacherName: 'Ayse Sahin', classId: 'CLS001', className: '9-A', description: 'Ders kitabi sayfa 45-48 sorular', assignedDate: '2024-01-15', dueDate: '2024-01-22', maxScore: 100, attachments: [], submissionCount: 15, totalStudents: 28, status: 'active' },
  { id: 'ASG002', title: 'Ingilizce Kompozisyon: My Family', subjectId: 'SUB003', subjectName: 'Ingilizce', teacherId: 'TCH003', teacherName: 'Zeynep Demir', classId: 'CLS001', className: '9-A', description: 'Aileniz hakkinda 200 kelimelik kompozisyon yaziniz', assignedDate: '2024-01-10', dueDate: '2024-01-20', maxScore: 100, attachments: [], submissionCount: 25, totalStudents: 28, status: 'active' },
  { id: 'ASG003', title: 'Ataturk Arastirma Projesi', subjectId: 'SUB005', subjectName: 'Sosyal Bilgiler', teacherId: 'TCH006', teacherName: 'Ali Kara', classId: 'CLS001', className: '9-A', description: 'Ataturkun hayati ve Turk tarihindeki onemi', assignedDate: '2024-01-05', dueDate: '2024-01-25', maxScore: 100, attachments: [], submissionCount: 20, totalStudents: 28, status: 'active' },
];

export const submissions: Submission[] = [
  { id: 'SUB001', assignmentId: 'ASG001', studentId: 'STU001', studentName: 'Ahmet Yilmaz', submittedAt: '2024-01-16 14:30:00', status: 'graded', score: 85, feedback: 'Iyi calisma, bazi islem hatalarina dikkat', attachments: [], gradedBy: 'Ayse Sahin', gradedAt: '2024-01-17 10:00:00' },
  { id: 'SUB002', assignmentId: 'ASG001', studentId: 'STU002', studentName: 'Fatma Demir', submittedAt: '2024-01-17 09:15:00', status: 'submitted', score: null, feedback: null, attachments: [], gradedBy: null, gradedAt: null },
  { id: 'SUB003', assignmentId: 'ASG002', studentId: 'STU001', studentName: 'Ahmet Yilmaz', submittedAt: '2024-01-18 16:00:00', status: 'late', score: 70, feedback: 'Gec teslim edildi, icerik iyi', attachments: [], gradedBy: 'Zeynep Demir', gradedAt: '2024-01-19 11:00:00' },
];

export const grades: Grade[] = [
  { id: 'GRD001', studentId: 'STU001', studentName: 'Ahmet Yilmaz', classId: 'CLS001', className: '9-A', academicYear: '2024-2025', term: '1. Donem', subjectId: 'SUB001', subjectName: 'Matematik', midterm: 75, final: null, assignments: 85, average: 80, grade: 'B', teacherId: 'TCH001' },
  { id: 'GRD002', studentId: 'STU001', studentName: 'Ahmet Yilmaz', classId: 'CLS001', className: '9-A', academicYear: '2024-2025', term: '1. Donem', subjectId: 'SUB002', subjectName: 'Turkce', midterm: 88, final: null, assignments: 90, average: 89, grade: 'A', teacherId: 'TCH002' },
  { id: 'GRD003', studentId: 'STU001', studentName: 'Ahmet Yilmaz', classId: 'CLS001', className: '9-A', academicYear: '2024-2025', term: '1. Donem', subjectId: 'SUB003', subjectName: 'Ingilizce', midterm: 70, final: null, assignments: 75, average: 72.5, grade: 'C', teacherId: 'TCH003' },
  { id: 'GRD004', studentId: 'STU002', studentName: 'Fatma Demir', classId: 'CLS001', className: '9-A', academicYear: '2024-2025', term: '1. Donem', subjectId: 'SUB001', subjectName: 'Matematik', midterm: 92, final: null, assignments: 95, average: 93.5, grade: 'A', teacherId: 'TCH001' },
];

export const parents: Parent[] = [
  { id: 'PAR001', name: 'Mehmet Yilmaz', email: 'mehmet@email.com', phone: '+974 5555 2222', relation: 'Baba', occupation: 'Muhendis', students: ['STU001'], studentNames: ['Ahmet Yilmaz'], address: 'Ataturk Cad. No:45 Doha', status: 'active' },
  { id: 'PAR002', name: 'Ali Demir', email: 'ali@email.com', phone: '+974 5555 5555', relation: 'Baba', occupation: 'Doktor', students: ['STU002'], studentNames: ['Fatma Demir'], address: 'Merkez Mah. 12. Sok. Doha', status: 'active' },
  { id: 'PAR003', name: 'Hasan Arslan', email: 'hasan@email.com', phone: '+974 5555 8888', relation: 'Baba', occupation: 'Isletmeci', students: ['STU003'], studentNames: ['Can Arslan'], address: 'Yeni Mah. 25. Cad. Doha', status: 'active' },
  { id: 'PAR004', name: 'Burak Kaya', email: 'burak@email.com', phone: '+974 5555 0002', relation: 'Baba', occupation: 'Ogretmen', students: ['STU004'], studentNames: ['Zeynep Kaya'], address: 'Sahil Cad. 8. Sk. Doha', status: 'active' },
  { id: 'PAR005', name: 'Kemal Oz', email: 'kemal@email.com', phone: '+974 5555 0005', relation: 'Baba', occupation: 'Avukat', students: ['STU005'], studentNames: ['Mehmet Oz'], address: 'Kultur Mah. 3. Cad. Doha', status: 'active' },
  { id: 'PAR006', name: 'Murat Celik', email: 'murat@email.com', phone: '+974 5555 0008', relation: 'Baba', occupation: 'Mimar', students: ['STU006'], studentNames: ['Elif Celik'], address: 'Park Sok. No:10 Doha', status: 'active' },
];

export const libraryBooks: LibraryBook[] = [
  { id: 'BOOK001', isbn: '978-3-16-148410-0', title: 'Tutunamayanlar', author: 'Oguz Atay', category: 'Roman', publisher: 'Iletisim Yayinlari', publicationYear: 1972, language: 'Turkce', totalCopies: 3, availableCopies: 2, location: 'Raf A-12', status: 'available' },
  { id: 'BOOK002', isbn: '978-0-14-017739-8', title: '1984', author: 'George Orwell', category: 'Roman', publisher: 'Penguin Books', publicationYear: 1949, language: 'Ingilizce', totalCopies: 5, availableCopies: 3, location: 'Raf B-05', status: 'available' },
  { id: 'BOOK003', isbn: '978-975-342-134-5', title: 'Matematik 9', author: 'MEB', category: 'Ders Kitabi', publisher: 'MEB Yayinlari', publicationYear: 2024, language: 'Turkce', totalCopies: 10, availableCopies: 8, location: 'Raf C-01', status: 'available' },
  { id: 'BOOK004', isbn: '978-605-07-0123-4', title: 'Suc ve Ceza', author: 'Fyodor Dostoyevski', category: 'Roman', publisher: 'Is Bankasi Kultur Yayinlari', publicationYear: 1866, language: 'Turkce', totalCopies: 4, availableCopies: 0, location: 'Raf A-15', status: 'borrowed' },
  { id: 'BOOK005', isbn: '978-975-510-001-2', title: 'Ingilizce Gramer', author: 'Raymond Murphy', category: 'Ders Kitabi', publisher: 'Cambridge', publicationYear: 2020, language: 'Ingilizce', totalCopies: 6, availableCopies: 4, location: 'Raf D-03', status: 'available' },
];

export const borrowings: Borrowing[] = [
  { id: 'BOR001', bookId: 'BOOK001', bookTitle: 'Tutunamayanlar', studentId: 'STU001', studentName: 'Ahmet Yilmaz', borrowDate: '2024-01-10', dueDate: '2024-01-24', returnDate: null, status: 'active', fine: 0 },
  { id: 'BOR002', bookId: 'BOOK004', bookTitle: 'Suc ve Ceza', studentId: 'STU002', studentName: 'Fatma Demir', borrowDate: '2024-01-08', dueDate: '2024-01-22', returnDate: null, status: 'overdue', fine: 0 },
  { id: 'BOR003', bookId: 'BOOK002', bookTitle: '1984', studentId: 'STU003', studentName: 'Can Arslan', borrowDate: '2024-01-05', dueDate: '2024-01-19', returnDate: '2024-01-15', status: 'returned', fine: 0 },
];

export const busRoutes: BusRoute[] = [
  { id: 'ROUTE001', routeNo: 'R1', routeName: 'Merkez Hatti', driverId: 'DRV001', driverName: 'Hasan Yurt', driverPhone: '+974 5555 3001', vehicleNo: '34-ABC-123', capacity: 40, studentCount: 35, status: 'active', stops: ['Merkez Durak', 'Ataturk Cad.', 'Okul Girisi'], startTime: '07:00', endTime: '08:30' },
  { id: 'ROUTE002', routeNo: 'R2', routeName: 'Sahil Hatti', driverId: 'DRV002', driverName: 'Kemal Ak', driverPhone: '+974 5555 3002', vehicleNo: '34-DEF-456', capacity: 40, studentCount: 30, status: 'active', stops: ['Sahil Cad.', 'Marina', 'Okul Girisi'], startTime: '07:15', endTime: '08:45' },
  { id: 'ROUTE003', routeNo: 'R3', routeName: 'Kuzey Hatti', driverId: 'DRV003', driverName: 'Ali Demir', driverPhone: '+974 5555 3003', vehicleNo: '34-GHI-789', capacity: 35, studentCount: 28, status: 'active', stops: ['Kuzey Mah.', 'Yesil Park', 'Okul Girisi'], startTime: '07:00', endTime: '08:30' },
];

export const transportStudents: TransportStudent[] = [
  { id: 'TRANS001', studentId: 'STU001', studentName: 'Ahmet Yilmaz', classId: 'CLS001', className: '9-A', routeId: 'ROUTE001', routeNo: 'R1', pickupPoint: 'Ataturk Cad.', dropPoint: 'Okul Girisi', status: 'active' },
  { id: 'TRANS002', studentId: 'STU002', studentName: 'Fatma Demir', classId: 'CLS001', className: '9-A', routeId: 'ROUTE001', routeNo: 'R1', pickupPoint: 'Merkez Durak', dropPoint: 'Okul Girisi', status: 'active' },
  { id: 'TRANS003', studentId: 'STU004', studentName: 'Zeynep Kaya', classId: 'CLS002', className: '8-A', routeId: 'ROUTE002', routeNo: 'R2', pickupPoint: 'Sahil Cad.', dropPoint: 'Okul Girisi', status: 'active' },
];

export const feeStructure: FeeStructure[] = [
  { id: 'FEE001', grade: 9, academicYear: '2024-2025', tuitionFee: 15000, admissionFee: 2000, examFee: 500, libraryFee: 300, transportFee: 1200, total: 19000 },
  { id: 'FEE002', grade: 10, academicYear: '2024-2025', tuitionFee: 16000, admissionFee: 0, examFee: 500, libraryFee: 300, transportFee: 1200, total: 18000 },
  { id: 'FEE003', grade: 8, academicYear: '2024-2025', tuitionFee: 14000, admissionFee: 2000, examFee: 500, libraryFee: 300, transportFee: 1200, total: 18000 },
];

export const feePayments: FeePayment[] = [
  { id: 'PAY001', studentId: 'STU001', studentName: 'Ahmet Yilmaz', classId: 'CLS001', className: '9-A', academicYear: '2024-2025', totalFee: 19000, paidAmount: 19000, dueAmount: 0, status: 'paid', payments: [{ date: '2023-09-01', amount: 19000, method: 'Bank Transfer', receiptNo: 'RCP-001' }] },
  { id: 'PAY002', studentId: 'STU002', studentName: 'Fatma Demir', classId: 'CLS001', className: '9-A', academicYear: '2024-2025', totalFee: 19000, paidAmount: 10000, dueAmount: 9000, status: 'partial', payments: [{ date: '2023-09-01', amount: 10000, method: 'Cash', receiptNo: 'RCP-002' }] },
  { id: 'PAY003', studentId: 'STU004', studentName: 'Zeynep Kaya', classId: 'CLS002', className: '8-A', academicYear: '2024-2025', totalFee: 18000, paidAmount: 0, dueAmount: 18000, status: 'pending', payments: [] },
];

// Menu items for sidebar
export const educationMenuItems = [
  { id: 'education-students', label: 'Students', icon: Users, path: ROUTES.education.students },
  { id: 'education-classes', label: 'Classes', icon: School, path: ROUTES.education.classes },
  { id: 'education-teachers', label: 'Teachers', icon: UserCheck, path: ROUTES.education.teachers },
  { id: 'education-curriculum', label: 'Curriculum', icon: BookOpen, path: ROUTES.education.curriculum },
  { id: 'education-attendance', label: 'Attendance', icon: ClipboardCheck, path: ROUTES.education.attendance },
  { id: 'education-exams', label: 'Exams', icon: FileText, path: ROUTES.education.exams },
  { id: 'education-assignments', label: 'Assignments', icon: CheckSquare, path: ROUTES.education.assignments },
  { id: 'education-grades', label: 'Grades', icon: Award, path: ROUTES.education.grades },
  { id: 'education-parents', label: 'Parents', icon: UserPlus, path: ROUTES.education.parents },
  { id: 'education-library', label: 'Library', icon: Library, path: ROUTES.education.library },
  { id: 'education-transport', label: 'Transport', icon: Bus, path: ROUTES.education.transport },
  { id: 'education-fees', label: 'Fees', icon: CreditCard, path: ROUTES.education.fees },
];
