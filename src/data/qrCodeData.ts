// QR Code Types
export interface QRCodeStyle {
  foreground: string;
  background: string;
  foregroundColor: string;
  backgroundColor: string;
  logo: boolean;
  frame: 'none' | 'border' | 'rounded' | 'banner-bottom' | 'banner-top';
  cornerStyle: 'square' | 'rounded' | 'dots';
}

export interface QRCode {
  id: string;
  name: string;
  type: 'url' | 'vcard' | 'wifi' | 'text' | 'email' | 'phone' | 'sms' | 'location' | 'event';
  content: string | Record<string, unknown>;
  shortUrl: string | null;
  isDynamic: boolean;
  status: 'active' | 'expired' | 'disabled';
  scans: number;
  uniqueScans: number;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  folder: string;
  folderId: string;
  style: QRCodeStyle;
  lastScan: string | null;
  expiresAt: string | null;
}

export const qrCodes: QRCode[] = [
  {
    id: "QR001",
    name: "Company Website",
    type: "url",
    content: "https://www.company.com",
    shortUrl: "qr.company.com/web",
    isDynamic: true,
    status: "active",
    scans: 1248,
    uniqueScans: 892,
    createdAt: "2024-06-15 10:00:00",
    updatedAt: "2024-12-15 14:30:00",
    createdBy: "Admin",
    folder: "Marketing",
    folderId: "FLD001",
    style: {
      foreground: "#000000",
      background: "#FFFFFF",
      foregroundColor: "#000000",
      backgroundColor: "#FFFFFF",
      logo: true,
      frame: "rounded",
      cornerStyle: "rounded"
    },
    lastScan: "2024-12-20 09:45:00",
    expiresAt: null
  },
  {
    id: "QR002",
    name: "Product Catalog PDF",
    type: "url",
    content: "https://www.company.com/catalog.pdf",
    shortUrl: "qr.company.com/catalog",
    isDynamic: true,
    status: "active",
    scans: 567,
    uniqueScans: 423,
    createdAt: "2024-08-20 14:00:00",
    updatedAt: "2024-12-10 09:00:00",
    createdBy: "Emily Chen",
    folder: "Marketing",
    folderId: "FLD001",
    style: {
      foreground: "#6366f1",
      background: "#FFFFFF",
      foregroundColor: "#6366f1",
      backgroundColor: "#FFFFFF",
      logo: true,
      frame: "banner-bottom",
      cornerStyle: "square"
    },
    lastScan: "2024-12-19 16:20:00",
    expiresAt: null
  },
  {
    id: "QR003",
    name: "Office WiFi",
    type: "wifi",
    content: {
      ssid: "Company-Guest",
      password: "Welcome2024",
      encryption: "WPA2"
    },
    shortUrl: null,
    isDynamic: false,
    status: "active",
    scans: 342,
    uniqueScans: 215,
    createdAt: "2024-03-10 09:00:00",
    updatedAt: "2024-03-10 09:00:00",
    createdBy: "IT Department",
    folder: "Office",
    folderId: "FLD002",
    style: {
      foreground: "#10b981",
      background: "#FFFFFF",
      foregroundColor: "#10b981",
      backgroundColor: "#FFFFFF",
      logo: true,
      frame: "none",
      cornerStyle: "rounded"
    },
    lastScan: "2024-12-20 10:15:00",
    expiresAt: null
  },
  {
    id: "QR004",
    name: "CEO Contact Card",
    type: "vcard",
    content: {
      firstName: "John",
      lastName: "Smith",
      title: "Chief Executive Officer",
      company: "Company Inc.",
      email: "john.smith@company.com",
      phone: "+1 (555) 100-0001",
      website: "www.company.com"
    },
    shortUrl: null,
    isDynamic: false,
    status: "active",
    scans: 89,
    uniqueScans: 76,
    createdAt: "2024-05-20 11:00:00",
    updatedAt: "2024-05-20 11:00:00",
    createdBy: "Admin",
    folder: "Business Cards",
    folderId: "FLD003",
    style: {
      foreground: "#1e293b",
      background: "#FFFFFF",
      foregroundColor: "#1e293b",
      backgroundColor: "#FFFFFF",
      logo: true,
      frame: "border",
      cornerStyle: "rounded"
    },
    lastScan: "2024-12-18 14:30:00",
    expiresAt: null
  },
  {
    id: "QR005",
    name: "Customer Feedback Form",
    type: "url",
    content: "https://forms.company.com/feedback",
    shortUrl: "qr.company.com/feedback",
    isDynamic: true,
    status: "active",
    scans: 2156,
    uniqueScans: 1834,
    createdAt: "2024-04-01 08:00:00",
    updatedAt: "2024-11-15 10:00:00",
    createdBy: "Emily Chen",
    folder: "Marketing",
    folderId: "FLD001",
    style: {
      foreground: "#8b5cf6",
      background: "#FFFFFF",
      foregroundColor: "#8b5cf6",
      backgroundColor: "#FFFFFF",
      logo: true,
      frame: "banner-bottom",
      cornerStyle: "dots"
    },
    lastScan: "2024-12-20 11:05:00",
    expiresAt: null
  },
  {
    id: "QR006",
    name: "Holiday Promo 2024",
    type: "url",
    content: "https://www.company.com/promo/holiday2024",
    shortUrl: "qr.company.com/holiday24",
    isDynamic: true,
    status: "active",
    scans: 3421,
    uniqueScans: 2876,
    createdAt: "2024-11-15 09:00:00",
    updatedAt: "2024-12-01 14:00:00",
    createdBy: "Marketing Team",
    folder: "Campaigns",
    folderId: "FLD004",
    style: {
      foreground: "#ef4444",
      background: "#FFFFFF",
      foregroundColor: "#ef4444",
      backgroundColor: "#FFFFFF",
      logo: true,
      frame: "banner-top",
      cornerStyle: "rounded"
    },
    lastScan: "2024-12-20 10:58:00",
    expiresAt: "2025-01-15"
  },
  {
    id: "QR007",
    name: "Event Registration - Q1 Conference",
    type: "url",
    content: "https://events.company.com/q1-2025",
    shortUrl: "qr.company.com/q1conf",
    isDynamic: true,
    status: "active",
    scans: 456,
    uniqueScans: 398,
    createdAt: "2024-12-01 10:00:00",
    updatedAt: "2024-12-15 16:00:00",
    createdBy: "Event Team",
    folder: "Events",
    folderId: "FLD005",
    style: {
      foreground: "#0ea5e9",
      background: "#FFFFFF",
      foregroundColor: "#0ea5e9",
      backgroundColor: "#FFFFFF",
      logo: true,
      frame: "rounded",
      cornerStyle: "rounded"
    },
    lastScan: "2024-12-20 09:30:00",
    expiresAt: "2025-03-31"
  },
  {
    id: "QR008",
    name: "Employee Handbook",
    type: "url",
    content: "https://internal.company.com/handbook",
    shortUrl: "qr.company.com/handbook",
    isDynamic: true,
    status: "active",
    scans: 234,
    uniqueScans: 189,
    createdAt: "2024-02-15 14:00:00",
    updatedAt: "2024-10-01 09:00:00",
    createdBy: "HR Department",
    folder: "Internal",
    folderId: "FLD006",
    style: {
      foreground: "#6366f1",
      background: "#FFFFFF",
      foregroundColor: "#6366f1",
      backgroundColor: "#FFFFFF",
      logo: true,
      frame: "none",
      cornerStyle: "square"
    },
    lastScan: "2024-12-19 11:20:00",
    expiresAt: null
  },
  {
    id: "QR009",
    name: "Summer Sale 2024",
    type: "url",
    content: "https://www.company.com/promo/summer2024",
    shortUrl: "qr.company.com/summer24",
    isDynamic: true,
    status: "expired",
    scans: 5678,
    uniqueScans: 4532,
    createdAt: "2024-06-01 08:00:00",
    updatedAt: "2024-06-01 08:00:00",
    createdBy: "Marketing Team",
    folder: "Campaigns",
    folderId: "FLD004",
    style: {
      foreground: "#f59e0b",
      background: "#FFFFFF",
      foregroundColor: "#f59e0b",
      backgroundColor: "#FFFFFF",
      logo: true,
      frame: "banner-bottom",
      cornerStyle: "rounded"
    },
    lastScan: "2024-09-15 18:45:00",
    expiresAt: "2024-09-30"
  },
  {
    id: "QR010",
    name: "Meeting Room A Booking",
    type: "url",
    content: "https://booking.company.com/room-a",
    shortUrl: "qr.company.com/room-a",
    isDynamic: true,
    status: "active",
    scans: 567,
    uniqueScans: 234,
    createdAt: "2024-07-10 11:00:00",
    updatedAt: "2024-07-10 11:00:00",
    createdBy: "Facilities",
    folder: "Office",
    folderId: "FLD002",
    style: {
      foreground: "#14b8a6",
      background: "#FFFFFF",
      foregroundColor: "#14b8a6",
      backgroundColor: "#FFFFFF",
      logo: false,
      frame: "border",
      cornerStyle: "square"
    },
    lastScan: "2024-12-20 08:45:00",
    expiresAt: null
  },
  {
    id: "QR011",
    name: "Instagram Profile",
    type: "url",
    content: "https://instagram.com/companyofficial",
    shortUrl: "qr.company.com/ig",
    isDynamic: true,
    status: "active",
    scans: 892,
    uniqueScans: 756,
    createdAt: "2024-05-01 15:00:00",
    updatedAt: "2024-05-01 15:00:00",
    createdBy: "Social Media Team",
    folder: "Social Media",
    folderId: "FLD007",
    style: {
      foreground: "#e11d48",
      background: "#FFFFFF",
      foregroundColor: "#e11d48",
      backgroundColor: "#FFFFFF",
      logo: true,
      frame: "rounded",
      cornerStyle: "dots"
    },
    lastScan: "2024-12-20 10:30:00",
    expiresAt: null
  },
  {
    id: "QR012",
    name: "Location - Main Office",
    type: "location",
    content: {
      latitude: 40.7128,
      longitude: -74.0060,
      address: "123 Business Ave, New York, NY 10001"
    },
    shortUrl: null,
    isDynamic: false,
    status: "active",
    scans: 345,
    uniqueScans: 287,
    createdAt: "2024-04-15 09:00:00",
    updatedAt: "2024-04-15 09:00:00",
    createdBy: "Admin",
    folder: "Office",
    folderId: "FLD002",
    style: {
      foreground: "#3b82f6",
      background: "#FFFFFF",
      foregroundColor: "#3b82f6",
      backgroundColor: "#FFFFFF",
      logo: true,
      frame: "banner-bottom",
      cornerStyle: "rounded"
    },
    lastScan: "2024-12-18 16:00:00",
    expiresAt: null
  }
];

// QR Code Types
export interface QRCodeType {
  id: string;
  name: string;
  label: string;
  icon: string;
  description: string;
}

export const qrCodeTypes: QRCodeType[] = [
  { id: "url", name: "URL / Website", label: "URL", icon: "Link", description: "Link to any website or webpage" },
  { id: "vcard", name: "Contact Card (vCard)", label: "vCard", icon: "User", description: "Share contact information" },
  { id: "wifi", name: "WiFi Network", label: "WiFi", icon: "Wifi", description: "Connect to WiFi automatically" },
  { id: "text", name: "Plain Text", label: "Text", icon: "FileText", description: "Display text message" },
  { id: "email", name: "Email", label: "Email", icon: "Mail", description: "Pre-filled email composition" },
  { id: "phone", name: "Phone Number", label: "Phone", icon: "Phone", description: "Direct phone call" },
  { id: "sms", name: "SMS Message", label: "SMS", icon: "MessageSquare", description: "Pre-filled SMS message" },
  { id: "location", name: "Location", label: "Location", icon: "MapPin", description: "Open location in maps" },
  { id: "event", name: "Calendar Event", label: "Event", icon: "Calendar", description: "Add event to calendar" }
];

// QR Folders
export interface QRFolder {
  id: string;
  name: string;
  color: string;
  count: number;
  createdAt: string;
}

export const qrFolders: QRFolder[] = [
  { id: "FLD001", name: "Marketing", color: "#6366f1", count: 3, createdAt: "2024-01-15" },
  { id: "FLD002", name: "Office", color: "#10b981", count: 3, createdAt: "2024-01-15" },
  { id: "FLD003", name: "Business Cards", color: "#1e293b", count: 1, createdAt: "2024-02-01" },
  { id: "FLD004", name: "Campaigns", color: "#ef4444", count: 2, createdAt: "2024-03-10" },
  { id: "FLD005", name: "Events", color: "#0ea5e9", count: 1, createdAt: "2024-04-01" },
  { id: "FLD006", name: "Internal", color: "#8b5cf6", count: 1, createdAt: "2024-02-15" },
  { id: "FLD007", name: "Social Media", color: "#e11d48", count: 1, createdAt: "2024-05-01" }
];

// QR Templates
export interface QRTemplate {
  id: string;
  name: string;
  type: string;
  description: string;
  preview: string | null;
  style: QRCodeStyle;
  usageCount: number;
  isDefault: boolean;
}

export const qrTemplates: QRTemplate[] = [
  {
    id: "TPL001",
    name: "Corporate Standard",
    type: "url",
    description: "Clean professional design with company logo",
    preview: null,
    style: {
      foreground: "#1e293b",
      background: "#FFFFFF",
      foregroundColor: "#1e293b",
      backgroundColor: "#FFFFFF",
      logo: true,
      frame: "border",
      cornerStyle: "rounded"
    },
    usageCount: 45,
    isDefault: true
  },
  {
    id: "TPL002",
    name: "Marketing Vibrant",
    type: "url",
    description: "Eye-catching design for marketing materials",
    preview: null,
    style: {
      foreground: "#6366f1",
      background: "#FFFFFF",
      foregroundColor: "#6366f1",
      backgroundColor: "#FFFFFF",
      logo: true,
      frame: "banner-bottom",
      cornerStyle: "dots"
    },
    usageCount: 32,
    isDefault: false
  },
  {
    id: "TPL003",
    name: "Minimalist",
    type: "url",
    description: "Simple clean QR code without extras",
    preview: null,
    style: {
      foreground: "#000000",
      background: "#FFFFFF",
      foregroundColor: "#000000",
      backgroundColor: "#FFFFFF",
      logo: false,
      frame: "none",
      cornerStyle: "square"
    },
    usageCount: 28,
    isDefault: false
  },
  {
    id: "TPL004",
    name: "Social Media",
    type: "url",
    description: "Branded design for social profiles",
    preview: null,
    style: {
      foreground: "#e11d48",
      background: "#FFFFFF",
      foregroundColor: "#e11d48",
      backgroundColor: "#FFFFFF",
      logo: true,
      frame: "rounded",
      cornerStyle: "dots"
    },
    usageCount: 15,
    isDefault: false
  },
  {
    id: "TPL005",
    name: "Event Special",
    type: "event",
    description: "Festive design for events and promotions",
    preview: null,
    style: {
      foreground: "#f59e0b",
      background: "#FFFFFF",
      foregroundColor: "#f59e0b",
      backgroundColor: "#FFFFFF",
      logo: true,
      frame: "banner-top",
      cornerStyle: "rounded"
    },
    usageCount: 22,
    isDefault: false
  }
];

// QR Analytics
export interface QRAnalytics {
  totalScans: number;
  totalUniqueScans: number;
  totalQRCodes: number;
  activeQRCodes: number;
  scansToday: number;
  scansThisWeek: number;
  scansThisMonth: number;
  topPerformers: Array<{ id: string; name: string; scans: number }>;
  scansByDay: Array<{ date: string; scans: number }>;
  scansByDevice: Array<{ device: string; percentage: number; count: number }>;
  scansByLocation: Array<{ country: string; percentage: number; count: number }>;
  scansByHour: Array<{ hour: string; scans: number }>;
}

export const qrAnalytics: QRAnalytics = {
  totalScans: 15995,
  totalUniqueScans: 12712,
  totalQRCodes: 12,
  activeQRCodes: 11,
  scansToday: 156,
  scansThisWeek: 892,
  scansThisMonth: 3456,
  topPerformers: [
    { id: "QR006", name: "Holiday Promo 2024", scans: 3421 },
    { id: "QR005", name: "Customer Feedback Form", scans: 2156 },
    { id: "QR001", name: "Company Website", scans: 1248 },
    { id: "QR011", name: "Instagram Profile", scans: 892 },
    { id: "QR002", name: "Product Catalog PDF", scans: 567 }
  ],
  scansByDay: [
    { date: "2024-12-14", scans: 145 },
    { date: "2024-12-15", scans: 132 },
    { date: "2024-12-16", scans: 178 },
    { date: "2024-12-17", scans: 156 },
    { date: "2024-12-18", scans: 189 },
    { date: "2024-12-19", scans: 167 },
    { date: "2024-12-20", scans: 156 }
  ],
  scansByDevice: [
    { device: "iPhone", percentage: 45, count: 7198 },
    { device: "Android", percentage: 42, count: 6718 },
    { device: "Other", percentage: 13, count: 2079 }
  ],
  scansByLocation: [
    { country: "United States", percentage: 68, count: 10876 },
    { country: "Canada", percentage: 12, count: 1919 },
    { country: "United Kingdom", percentage: 8, count: 1280 },
    { country: "Germany", percentage: 5, count: 800 },
    { country: "Other", percentage: 7, count: 1120 }
  ],
  scansByHour: [
    { hour: "00-04", scans: 234 },
    { hour: "04-08", scans: 567 },
    { hour: "08-12", scans: 4523 },
    { hour: "12-16", scans: 5678 },
    { hour: "16-20", scans: 3456 },
    { hour: "20-24", scans: 1537 }
  ]
};

// Scan Logs
export interface ScanLog {
  id: number;
  qrCodeId: string;
  qrCodeName: string;
  timestamp: string;
  scannedAt: string;
  device: string;
  os: string;
  browser: string;
  country: string;
  city: string;
}

export const scanLogs: ScanLog[] = [
  { id: 1, qrCodeId: "QR006", qrCodeName: "Holiday Promo 2024", timestamp: "2024-12-20 10:58:00", scannedAt: "2024-12-20 10:58:00", device: "iPhone", os: "iOS 17", browser: "Safari", country: "United States", city: "New York" },
  { id: 2, qrCodeId: "QR005", qrCodeName: "Customer Feedback Form", timestamp: "2024-12-20 11:05:00", scannedAt: "2024-12-20 11:05:00", device: "Android", os: "Android 14", browser: "Chrome", country: "United States", city: "Los Angeles" },
  { id: 3, qrCodeId: "QR003", qrCodeName: "Office WiFi", timestamp: "2024-12-20 10:15:00", scannedAt: "2024-12-20 10:15:00", device: "iPhone", os: "iOS 17", browser: "Camera", country: "United States", city: "New York" },
  { id: 4, qrCodeId: "QR001", qrCodeName: "Company Website", timestamp: "2024-12-20 09:45:00", scannedAt: "2024-12-20 09:45:00", device: "Android", os: "Android 13", browser: "Chrome", country: "Canada", city: "Toronto" },
  { id: 5, qrCodeId: "QR011", qrCodeName: "Instagram Profile", timestamp: "2024-12-20 10:30:00", scannedAt: "2024-12-20 10:30:00", device: "iPhone", os: "iOS 16", browser: "Instagram", country: "United Kingdom", city: "London" },
  { id: 6, qrCodeId: "QR007", qrCodeName: "Event Registration", timestamp: "2024-12-20 09:30:00", scannedAt: "2024-12-20 09:30:00", device: "Android", os: "Android 14", browser: "Chrome", country: "United States", city: "Chicago" },
  { id: 7, qrCodeId: "QR010", qrCodeName: "Meeting Room A Booking", timestamp: "2024-12-20 08:45:00", scannedAt: "2024-12-20 08:45:00", device: "iPhone", os: "iOS 17", browser: "Safari", country: "United States", city: "New York" },
  { id: 8, qrCodeId: "QR002", qrCodeName: "Product Catalog PDF", timestamp: "2024-12-19 16:20:00", scannedAt: "2024-12-19 16:20:00", device: "Desktop", os: "Windows 11", browser: "Edge", country: "Germany", city: "Berlin" }
];

// Frame Options
export interface FrameOption {
  id: string;
  name: string;
  label: string;
  preview: string | null;
}

export const frameOptions: FrameOption[] = [
  { id: "none", name: "No Frame", label: "None", preview: null },
  { id: "border", name: "Simple Border", label: "Border", preview: null },
  { id: "rounded", name: "Rounded Border", label: "Rounded", preview: null },
  { id: "banner-bottom", name: "Banner Bottom", label: "Banner Bottom", preview: null },
  { id: "banner-top", name: "Banner Top", label: "Banner Top", preview: null }
];

// Corner Style Options
export interface CornerStyleOption {
  id: string;
  name: string;
  label: string;
  preview: string | null;
}

export const cornerStyleOptions: CornerStyleOption[] = [
  { id: "square", name: "Square", label: "Square", preview: null },
  { id: "rounded", name: "Rounded", label: "Rounded", preview: null },
  { id: "dots", name: "Dots", label: "Dots", preview: null }
];

// Helper functions
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
};

export const formatDateTime = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

export const formatNumber = (num: number): string => {
  return new Intl.NumberFormat('en-US').format(num);
};

export const getStatusColor = (status: string): string => {
  const colors: Record<string, string> = {
    active: '#10b981',
    expired: '#ef4444',
    disabled: '#64748b',
  };
  return colors[status] || '#64748b';
};

export const getTypeColor = (type: string): string => {
  const colors: Record<string, string> = {
    url: '#3b82f6',
    vcard: '#8b5cf6',
    wifi: '#10b981',
    text: '#64748b',
    email: '#f59e0b',
    phone: '#06b6d4',
    sms: '#ec4899',
    location: '#14b8a6',
    event: '#6366f1',
  };
  return colors[type] || '#64748b';
};

export const getTypeLabel = (type: string): string => {
  const labels: Record<string, string> = {
    url: 'URL',
    vcard: 'vCard',
    wifi: 'WiFi',
    text: 'Text',
    email: 'Email',
    phone: 'Phone',
    sms: 'SMS',
    location: 'Location',
    event: 'Event',
  };
  return labels[type] || type;
};
