export interface Employee {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar: string | null;
  department: string;
  position: string;
  status: 'active' | 'on-leave' | 'inactive';
  type: 'full-time' | 'part-time' | 'contract';
  startDate: string;
  salary: number;
  manager: string;
  location: string;
}

export interface Department {
  id: number;
  name: string;
  head: string;
  employeeCount: number;
  budget: number;
  color: string;
}

export interface LeaveRequest {
  id: number;
  employee: string;
  type: string;
  startDate: string;
  endDate: string;
  days: number;
  status: 'pending' | 'approved' | 'rejected';
  reason: string;
}

export interface AttendanceRecord {
  id: number;
  employee: string;
  date: string;
  checkIn: string | null;
  checkOut: string | null;
  status: 'present' | 'late' | 'absent' | 'on-leave';
  hoursWorked: number;
}

export interface PayrollRecord {
  id: number;
  employee: string;
  month: string;
  baseSalary: number;
  bonus: number;
  deductions: number;
  netSalary: number;
  status: 'paid' | 'pending';
  paidDate: string | null;
}

export interface JobPosting {
  id: number;
  title: string;
  department: string;
  location: string;
  type: string;
  applicants: number;
  status: 'active' | 'closed' | 'on-hold';
  postedDate: string;
  salaryRange: string;
}

export interface PerformanceReview {
  id: number;
  employee: string;
  reviewer: string;
  period: string;
  rating: number | null;
  status: 'completed' | 'in-progress' | 'pending';
  completedDate: string | null;
}

export const employees: Employee[] = [
  {
    id: "EMP001",
    name: "John Anderson",
    email: "john.anderson@company.com",
    phone: "+1 (555) 123-4567",
    avatar: null,
    department: "Engineering",
    position: "Senior Developer",
    status: "active",
    type: "full-time",
    startDate: "2021-03-15",
    salary: 95000,
    manager: "Sarah Wilson",
    location: "New York Office"
  },
  {
    id: "EMP002",
    name: "Emily Chen",
    email: "emily.chen@company.com",
    phone: "+1 (555) 234-5678",
    avatar: null,
    department: "Marketing",
    position: "Marketing Manager",
    status: "active",
    type: "full-time",
    startDate: "2020-07-01",
    salary: 85000,
    manager: "Michael Brown",
    location: "Los Angeles Office"
  },
  {
    id: "EMP003",
    name: "Michael Roberts",
    email: "michael.roberts@company.com",
    phone: "+1 (555) 345-6789",
    avatar: null,
    department: "Sales",
    position: "Sales Representative",
    status: "active",
    type: "full-time",
    startDate: "2022-01-10",
    salary: 65000,
    manager: "Emily Chen",
    location: "Chicago Office"
  },
  {
    id: "EMP004",
    name: "Sarah Wilson",
    email: "sarah.wilson@company.com",
    phone: "+1 (555) 456-7890",
    avatar: null,
    department: "Engineering",
    position: "Engineering Director",
    status: "active",
    type: "full-time",
    startDate: "2019-05-20",
    salary: 145000,
    manager: "CEO",
    location: "New York Office"
  },
  {
    id: "EMP005",
    name: "David Kim",
    email: "david.kim@company.com",
    phone: "+1 (555) 567-8901",
    avatar: null,
    department: "Finance",
    position: "Financial Analyst",
    status: "on-leave",
    type: "full-time",
    startDate: "2021-09-01",
    salary: 75000,
    manager: "Lisa Park",
    location: "New York Office"
  },
  {
    id: "EMP006",
    name: "Jessica Martinez",
    email: "jessica.martinez@company.com",
    phone: "+1 (555) 678-9012",
    avatar: null,
    department: "HR",
    position: "HR Specialist",
    status: "active",
    type: "full-time",
    startDate: "2022-03-15",
    salary: 62000,
    manager: "Amanda Lee",
    location: "Los Angeles Office"
  },
  {
    id: "EMP007",
    name: "Robert Taylor",
    email: "robert.taylor@company.com",
    phone: "+1 (555) 789-0123",
    avatar: null,
    department: "Engineering",
    position: "Junior Developer",
    status: "active",
    type: "full-time",
    startDate: "2023-06-01",
    salary: 55000,
    manager: "John Anderson",
    location: "New York Office"
  },
  {
    id: "EMP008",
    name: "Amanda Lee",
    email: "amanda.lee@company.com",
    phone: "+1 (555) 890-1234",
    avatar: null,
    department: "HR",
    position: "HR Director",
    status: "active",
    type: "full-time",
    startDate: "2018-11-01",
    salary: 120000,
    manager: "CEO",
    location: "New York Office"
  },
  {
    id: "EMP009",
    name: "Chris Johnson",
    email: "chris.johnson@company.com",
    phone: "+1 (555) 901-2345",
    avatar: null,
    department: "Operations",
    position: "Operations Manager",
    status: "active",
    type: "full-time",
    startDate: "2020-02-15",
    salary: 88000,
    manager: "CEO",
    location: "Chicago Office"
  },
  {
    id: "EMP010",
    name: "Lisa Park",
    email: "lisa.park@company.com",
    phone: "+1 (555) 012-3456",
    avatar: null,
    department: "Finance",
    position: "Finance Director",
    status: "active",
    type: "full-time",
    startDate: "2019-08-01",
    salary: 135000,
    manager: "CEO",
    location: "New York Office"
  },
  {
    id: "EMP011",
    name: "Alex Thompson",
    email: "alex.thompson@company.com",
    phone: "+1 (555) 111-2222",
    avatar: null,
    department: "Engineering",
    position: "DevOps Engineer",
    status: "active",
    type: "full-time",
    startDate: "2022-08-15",
    salary: 92000,
    manager: "Sarah Wilson",
    location: "New York Office"
  },
  {
    id: "EMP012",
    name: "Maria Garcia",
    email: "maria.garcia@company.com",
    phone: "+1 (555) 222-3333",
    avatar: null,
    department: "Marketing",
    position: "Content Specialist",
    status: "active",
    type: "full-time",
    startDate: "2023-01-10",
    salary: 58000,
    manager: "Emily Chen",
    location: "Los Angeles Office"
  },
  {
    id: "EMP013",
    name: "James Wilson",
    email: "james.wilson@company.com",
    phone: "+1 (555) 333-4444",
    avatar: null,
    department: "Sales",
    position: "Account Executive",
    status: "active",
    type: "full-time",
    startDate: "2021-11-01",
    salary: 72000,
    manager: "Michael Roberts",
    location: "Chicago Office"
  },
  {
    id: "EMP014",
    name: "Sophie Brown",
    email: "sophie.brown@company.com",
    phone: "+1 (555) 444-5555",
    avatar: null,
    department: "Engineering",
    position: "QA Engineer",
    status: "active",
    type: "full-time",
    startDate: "2022-04-01",
    salary: 68000,
    manager: "John Anderson",
    location: "New York Office"
  },
  {
    id: "EMP015",
    name: "Daniel Lee",
    email: "daniel.lee@company.com",
    phone: "+1 (555) 555-6666",
    avatar: null,
    department: "Operations",
    position: "Logistics Coordinator",
    status: "inactive",
    type: "full-time",
    startDate: "2020-06-15",
    salary: 52000,
    manager: "Chris Johnson",
    location: "Chicago Office"
  },
  {
    id: "EMP016",
    name: "Rachel Adams",
    email: "rachel.adams@company.com",
    phone: "+1 (555) 666-7777",
    avatar: null,
    department: "Finance",
    position: "Accountant",
    status: "active",
    type: "full-time",
    startDate: "2023-03-01",
    salary: 65000,
    manager: "Lisa Park",
    location: "New York Office"
  },
  {
    id: "EMP017",
    name: "Kevin White",
    email: "kevin.white@company.com",
    phone: "+1 (555) 777-8888",
    avatar: null,
    department: "Sales",
    position: "Sales Manager",
    status: "active",
    type: "full-time",
    startDate: "2019-09-15",
    salary: 98000,
    manager: "CEO",
    location: "Chicago Office"
  },
  {
    id: "EMP018",
    name: "Jennifer Taylor",
    email: "jennifer.taylor@company.com",
    phone: "+1 (555) 888-9999",
    avatar: null,
    department: "HR",
    position: "Recruiter",
    status: "active",
    type: "part-time",
    startDate: "2023-07-01",
    salary: 45000,
    manager: "Amanda Lee",
    location: "Los Angeles Office"
  }
];

export const departments: Department[] = [
  { id: 1, name: "Engineering", head: "Sarah Wilson", employeeCount: 12, budget: 1500000, color: "#6366f1" },
  { id: 2, name: "Marketing", head: "Emily Chen", employeeCount: 8, budget: 800000, color: "#8b5cf6" },
  { id: 3, name: "Sales", head: "Kevin White", employeeCount: 15, budget: 600000, color: "#10b981" },
  { id: 4, name: "Finance", head: "Lisa Park", employeeCount: 6, budget: 400000, color: "#f59e0b" },
  { id: 5, name: "HR", head: "Amanda Lee", employeeCount: 4, budget: 300000, color: "#ec4899" },
  { id: 6, name: "Operations", head: "Chris Johnson", employeeCount: 10, budget: 500000, color: "#14b8a6" }
];

export const leaveRequests: LeaveRequest[] = [
  { id: 1, employee: "David Kim", type: "Annual Leave", startDate: "2024-12-23", endDate: "2024-12-27", days: 5, status: "approved", reason: "Family vacation" },
  { id: 2, employee: "John Anderson", type: "Sick Leave", startDate: "2024-12-20", endDate: "2024-12-20", days: 1, status: "approved", reason: "Medical appointment" },
  { id: 3, employee: "Emily Chen", type: "Annual Leave", startDate: "2025-01-02", endDate: "2025-01-05", days: 4, status: "pending", reason: "Personal travel" },
  { id: 4, employee: "Robert Taylor", type: "Work From Home", startDate: "2024-12-26", endDate: "2024-12-27", days: 2, status: "pending", reason: "Home renovation" },
  { id: 5, employee: "Jessica Martinez", type: "Annual Leave", startDate: "2025-01-10", endDate: "2025-01-15", days: 6, status: "pending", reason: "Wedding attendance" },
  { id: 6, employee: "Chris Johnson", type: "Sick Leave", startDate: "2024-12-18", endDate: "2024-12-19", days: 2, status: "rejected", reason: "Flu symptoms" },
  { id: 7, employee: "Sophie Brown", type: "Annual Leave", startDate: "2025-01-20", endDate: "2025-01-24", days: 5, status: "pending", reason: "Family visit" },
  { id: 8, employee: "Alex Thompson", type: "Work From Home", startDate: "2025-01-06", endDate: "2025-01-07", days: 2, status: "approved", reason: "Personal matters" }
];

export const attendanceRecords: AttendanceRecord[] = [
  { id: 1, employee: "John Anderson", date: "2024-12-20", checkIn: "08:55", checkOut: "18:10", status: "present", hoursWorked: 9.25 },
  { id: 2, employee: "Emily Chen", date: "2024-12-20", checkIn: "09:05", checkOut: "17:45", status: "present", hoursWorked: 8.67 },
  { id: 3, employee: "Michael Roberts", date: "2024-12-20", checkIn: "09:30", checkOut: "18:00", status: "late", hoursWorked: 8.5 },
  { id: 4, employee: "Sarah Wilson", date: "2024-12-20", checkIn: "08:45", checkOut: "19:00", status: "present", hoursWorked: 10.25 },
  { id: 5, employee: "David Kim", date: "2024-12-20", checkIn: null, checkOut: null, status: "on-leave", hoursWorked: 0 },
  { id: 6, employee: "Jessica Martinez", date: "2024-12-20", checkIn: "08:50", checkOut: "17:30", status: "present", hoursWorked: 8.67 },
  { id: 7, employee: "Robert Taylor", date: "2024-12-20", checkIn: "09:00", checkOut: "18:15", status: "present", hoursWorked: 9.25 },
  { id: 8, employee: "Amanda Lee", date: "2024-12-20", checkIn: "08:30", checkOut: "17:00", status: "present", hoursWorked: 8.5 },
  { id: 9, employee: "Chris Johnson", date: "2024-12-20", checkIn: "08:40", checkOut: "17:45", status: "present", hoursWorked: 9.08 },
  { id: 10, employee: "Lisa Park", date: "2024-12-20", checkIn: "08:35", checkOut: "18:30", status: "present", hoursWorked: 9.92 },
  { id: 11, employee: "Alex Thompson", date: "2024-12-20", checkIn: "09:15", checkOut: "18:00", status: "late", hoursWorked: 8.75 },
  { id: 12, employee: "Maria Garcia", date: "2024-12-20", checkIn: "08:55", checkOut: "17:55", status: "present", hoursWorked: 9.0 },
  { id: 13, employee: "James Wilson", date: "2024-12-20", checkIn: null, checkOut: null, status: "absent", hoursWorked: 0 },
  { id: 14, employee: "Sophie Brown", date: "2024-12-20", checkIn: "09:00", checkOut: "18:00", status: "present", hoursWorked: 9.0 }
];

export const payrollRecords: PayrollRecord[] = [
  { id: 1, employee: "John Anderson", month: "December 2024", baseSalary: 7916.67, bonus: 500, deductions: 1850, netSalary: 6566.67, status: "paid", paidDate: "2024-12-25" },
  { id: 2, employee: "Emily Chen", month: "December 2024", baseSalary: 7083.33, bonus: 300, deductions: 1620, netSalary: 5763.33, status: "paid", paidDate: "2024-12-25" },
  { id: 3, employee: "Sarah Wilson", month: "December 2024", baseSalary: 12083.33, bonus: 1000, deductions: 3100, netSalary: 9983.33, status: "pending", paidDate: null },
  { id: 4, employee: "David Kim", month: "December 2024", baseSalary: 6250, bonus: 0, deductions: 1450, netSalary: 4800, status: "pending", paidDate: null },
  { id: 5, employee: "Lisa Park", month: "December 2024", baseSalary: 11250, bonus: 800, deductions: 2850, netSalary: 9200, status: "paid", paidDate: "2024-12-25" },
  { id: 6, employee: "Michael Roberts", month: "December 2024", baseSalary: 5416.67, bonus: 200, deductions: 1280, netSalary: 4336.67, status: "paid", paidDate: "2024-12-25" },
  { id: 7, employee: "Jessica Martinez", month: "December 2024", baseSalary: 5166.67, bonus: 0, deductions: 1180, netSalary: 3986.67, status: "pending", paidDate: null },
  { id: 8, employee: "Robert Taylor", month: "December 2024", baseSalary: 4583.33, bonus: 100, deductions: 1070, netSalary: 3613.33, status: "paid", paidDate: "2024-12-25" },
  { id: 9, employee: "Amanda Lee", month: "December 2024", baseSalary: 10000, bonus: 750, deductions: 2550, netSalary: 8200, status: "paid", paidDate: "2024-12-25" },
  { id: 10, employee: "Chris Johnson", month: "December 2024", baseSalary: 7333.33, bonus: 400, deductions: 1780, netSalary: 5953.33, status: "pending", paidDate: null }
];

export const jobPostings: JobPosting[] = [
  { id: 1, title: "Senior React Developer", department: "Engineering", location: "New York", type: "Full-time", applicants: 45, status: "active", postedDate: "2024-12-01", salaryRange: "$90,000 - $120,000" },
  { id: 2, title: "Marketing Specialist", department: "Marketing", location: "Los Angeles", type: "Full-time", applicants: 32, status: "active", postedDate: "2024-12-10", salaryRange: "$55,000 - $70,000" },
  { id: 3, title: "Sales Executive", department: "Sales", location: "Chicago", type: "Full-time", applicants: 28, status: "active", postedDate: "2024-12-15", salaryRange: "$50,000 - $65,000" },
  { id: 4, title: "Financial Analyst", department: "Finance", location: "New York", type: "Full-time", applicants: 18, status: "closed", postedDate: "2024-11-15", salaryRange: "$70,000 - $85,000" },
  { id: 5, title: "HR Coordinator", department: "HR", location: "Remote", type: "Full-time", applicants: 56, status: "active", postedDate: "2024-12-18", salaryRange: "$45,000 - $55,000" },
  { id: 6, title: "DevOps Engineer", department: "Engineering", location: "New York", type: "Full-time", applicants: 23, status: "active", postedDate: "2024-12-20", salaryRange: "$85,000 - $110,000" },
  { id: 7, title: "Content Writer", department: "Marketing", location: "Remote", type: "Part-time", applicants: 41, status: "on-hold", postedDate: "2024-12-05", salaryRange: "$35,000 - $45,000" }
];

export const performanceReviews: PerformanceReview[] = [
  { id: 1, employee: "John Anderson", reviewer: "Sarah Wilson", period: "Q4 2024", rating: 4.5, status: "completed", completedDate: "2024-12-15" },
  { id: 2, employee: "Emily Chen", reviewer: "Michael Brown", period: "Q4 2024", rating: 4.2, status: "completed", completedDate: "2024-12-14" },
  { id: 3, employee: "Robert Taylor", reviewer: "John Anderson", period: "Q4 2024", rating: null, status: "pending", completedDate: null },
  { id: 4, employee: "Jessica Martinez", reviewer: "Amanda Lee", period: "Q4 2024", rating: 3.8, status: "completed", completedDate: "2024-12-16" },
  { id: 5, employee: "Michael Roberts", reviewer: "Emily Chen", period: "Q4 2024", rating: null, status: "in-progress", completedDate: null },
  { id: 6, employee: "Alex Thompson", reviewer: "Sarah Wilson", period: "Q4 2024", rating: 4.0, status: "completed", completedDate: "2024-12-17" },
  { id: 7, employee: "Maria Garcia", reviewer: "Emily Chen", period: "Q4 2024", rating: null, status: "pending", completedDate: null },
  { id: 8, employee: "Sophie Brown", reviewer: "John Anderson", period: "Q4 2024", rating: 4.3, status: "completed", completedDate: "2024-12-18" },
  { id: 9, employee: "Chris Johnson", reviewer: "CEO", period: "Q4 2024", rating: null, status: "in-progress", completedDate: null },
  { id: 10, employee: "Lisa Park", reviewer: "CEO", period: "Q4 2024", rating: 4.7, status: "completed", completedDate: "2024-12-12" }
];

// Helper functions
export const getEmployeeById = (id: string): Employee | undefined => {
  return employees.find(emp => emp.id === id);
};

export const getEmployeesByDepartment = (department: string): Employee[] => {
  return employees.filter(emp => emp.department === department);
};

export const getEmployeesByStatus = (status: Employee['status']): Employee[] => {
  return employees.filter(emp => emp.status === status);
};
