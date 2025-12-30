// File Management Types
export interface FileItem {
  id: string;
  name: string;
  type: 'folder' | 'file';
  itemCount?: number;
  fileType?: 'document' | 'spreadsheet' | 'pdf' | 'image' | 'video' | 'presentation' | 'archive' | 'design' | 'code';
  extension?: string;
  size: string | null;
  modifiedAt: string;
  modifiedBy: string;
  shared: boolean;
  starred: boolean;
  color?: string;
  thumbnail?: string | null;
}

export interface SharedFile {
  id: string;
  name: string;
  type: 'folder' | 'file';
  itemCount?: number;
  fileType?: string;
  extension?: string;
  size: string | null;
  owner: string;
  sharedWith: string[];
  sharedAt: string;
  modifiedAt: string;
  permission: 'edit' | 'view';
  color?: string;
}

export interface ProjectFile {
  id: string;
  name: string;
  type: 'folder' | 'document' | 'spreadsheet' | 'pdf' | 'image' | 'design';
  size?: string;
  itemCount?: number;
  modifiedAt: string;
  modifiedBy: string;
}

export interface Project {
  id: string;
  projectName: string;
  projectColor: string;
  files: ProjectFile[];
  totalFiles: number;
  totalSize: string;
  lastActivity: string;
}

export interface RecentFile {
  id: string;
  name: string;
  type: string;
  size: string | null;
  accessedAt: string;
  location: string;
  action: 'edited' | 'viewed' | 'created' | 'shared';
}

export interface TrashFile {
  id: string;
  name: string;
  type: string;
  itemCount?: number;
  size: string | null;
  deletedAt: string;
  originalLocation: string;
  daysUntilPermanent: number;
}

export interface StorageBreakdown {
  type: string;
  size: number;
  color: string;
}

export interface StorageInfo {
  used: number;
  total: number;
  unit: string;
  breakdown: StorageBreakdown[];
}

// Mock Data
export const fileStructure: { myFiles: FileItem[]; documents: FileItem[] } = {
  myFiles: [
    {
      id: "FLD001",
      name: "Documents",
      type: "folder",
      itemCount: 12,
      size: null,
      modifiedAt: "2024-12-18 14:30:00",
      modifiedBy: "You",
      shared: false,
      starred: true,
      color: "#6366f1"
    },
    {
      id: "FLD002",
      name: "Projects",
      type: "folder",
      itemCount: 8,
      size: null,
      modifiedAt: "2024-12-20 09:15:00",
      modifiedBy: "You",
      shared: true,
      starred: true,
      color: "#10b981"
    },
    {
      id: "FLD003",
      name: "Reports",
      type: "folder",
      itemCount: 5,
      size: null,
      modifiedAt: "2024-12-19 16:45:00",
      modifiedBy: "You",
      shared: false,
      starred: false,
      color: "#f59e0b"
    },
    {
      id: "FLD004",
      name: "Images",
      type: "folder",
      itemCount: 24,
      size: null,
      modifiedAt: "2024-12-15 11:20:00",
      modifiedBy: "You",
      shared: false,
      starred: false,
      color: "#ec4899"
    },
    {
      id: "FILE001",
      name: "Q4 Budget Proposal.xlsx",
      type: "file",
      fileType: "spreadsheet",
      extension: "xlsx",
      size: "2.4 MB",
      modifiedAt: "2024-12-20 10:30:00",
      modifiedBy: "You",
      shared: true,
      starred: true,
      thumbnail: null
    },
    {
      id: "FILE002",
      name: "Meeting Notes - Dec 18.docx",
      type: "file",
      fileType: "document",
      extension: "docx",
      size: "156 KB",
      modifiedAt: "2024-12-18 15:00:00",
      modifiedBy: "You",
      shared: false,
      starred: false,
      thumbnail: null
    },
    {
      id: "FILE003",
      name: "Product Roadmap 2025.pdf",
      type: "file",
      fileType: "pdf",
      extension: "pdf",
      size: "4.8 MB",
      modifiedAt: "2024-12-17 09:45:00",
      modifiedBy: "You",
      shared: true,
      starred: true,
      thumbnail: null
    },
    {
      id: "FILE004",
      name: "Team Photo.jpg",
      type: "file",
      fileType: "image",
      extension: "jpg",
      size: "3.2 MB",
      modifiedAt: "2024-12-10 14:20:00",
      modifiedBy: "You",
      shared: false,
      starred: false,
      thumbnail: null
    },
    {
      id: "FILE005",
      name: "Presentation Draft.pptx",
      type: "file",
      fileType: "presentation",
      extension: "pptx",
      size: "8.5 MB",
      modifiedAt: "2024-12-19 11:30:00",
      modifiedBy: "You",
      shared: true,
      starred: false,
      thumbnail: null
    }
  ],
  documents: [
    {
      id: "FILE006",
      name: "Employee Handbook.pdf",
      type: "file",
      fileType: "pdf",
      extension: "pdf",
      size: "2.1 MB",
      modifiedAt: "2024-11-15 10:00:00",
      modifiedBy: "HR",
      shared: false,
      starred: false
    },
    {
      id: "FILE007",
      name: "Contract Template.docx",
      type: "file",
      fileType: "document",
      extension: "docx",
      size: "245 KB",
      modifiedAt: "2024-10-20 14:30:00",
      modifiedBy: "Legal",
      shared: false,
      starred: true
    },
    {
      id: "FILE008",
      name: "Expense Report Form.xlsx",
      type: "file",
      fileType: "spreadsheet",
      extension: "xlsx",
      size: "128 KB",
      modifiedAt: "2024-09-05 09:00:00",
      modifiedBy: "Finance",
      shared: false,
      starred: false
    }
  ]
};

export const sharedFiles: SharedFile[] = [
  {
    id: "SHR001",
    name: "Marketing Campaign Assets",
    type: "folder",
    itemCount: 15,
    size: null,
    owner: "Emily Chen",
    sharedWith: ["You", "Michael Roberts", "John Anderson"],
    sharedAt: "2024-12-15 10:00:00",
    modifiedAt: "2024-12-20 08:45:00",
    permission: "edit",
    color: "#8b5cf6"
  },
  {
    id: "SHR002",
    name: "Q4 Financial Report.xlsx",
    type: "file",
    fileType: "spreadsheet",
    extension: "xlsx",
    size: "5.2 MB",
    owner: "Lisa Park",
    sharedWith: ["You", "David Kim"],
    sharedAt: "2024-12-18 14:00:00",
    modifiedAt: "2024-12-19 16:30:00",
    permission: "view"
  },
  {
    id: "SHR003",
    name: "Product Specs Document.pdf",
    type: "file",
    fileType: "pdf",
    extension: "pdf",
    size: "1.8 MB",
    owner: "Sarah Wilson",
    sharedWith: ["You", "Robert Taylor", "John Anderson"],
    sharedAt: "2024-12-10 11:00:00",
    modifiedAt: "2024-12-17 09:15:00",
    permission: "edit"
  },
  {
    id: "SHR004",
    name: "Brand Guidelines",
    type: "folder",
    itemCount: 8,
    size: null,
    owner: "Emily Chen",
    sharedWith: ["All Employees"],
    sharedAt: "2024-06-01 09:00:00",
    modifiedAt: "2024-11-20 14:00:00",
    permission: "view",
    color: "#10b981"
  },
  {
    id: "SHR005",
    name: "Training Videos",
    type: "folder",
    itemCount: 12,
    size: null,
    owner: "Amanda Lee",
    sharedWith: ["All Employees"],
    sharedAt: "2024-03-15 10:00:00",
    modifiedAt: "2024-12-01 11:30:00",
    permission: "view",
    color: "#f59e0b"
  },
  {
    id: "SHR006",
    name: "API Documentation.md",
    type: "file",
    fileType: "document",
    extension: "md",
    size: "456 KB",
    owner: "John Anderson",
    sharedWith: ["Engineering Team"],
    sharedAt: "2024-12-05 15:00:00",
    modifiedAt: "2024-12-19 10:45:00",
    permission: "edit"
  }
];

export const projectFiles: Project[] = [
  {
    id: "PRJ001",
    projectName: "Marketing Campaign 2025",
    projectColor: "#6366f1",
    files: [
      { id: "PF001", name: "Campaign Brief.docx", type: "document", size: "324 KB", modifiedAt: "2024-12-18 09:00:00", modifiedBy: "Emily Chen" },
      { id: "PF002", name: "Budget Breakdown.xlsx", type: "spreadsheet", size: "156 KB", modifiedAt: "2024-12-17 14:30:00", modifiedBy: "Lisa Park" },
      { id: "PF003", name: "Creative Assets", type: "folder", itemCount: 24, modifiedAt: "2024-12-20 10:00:00", modifiedBy: "Emily Chen" },
      { id: "PF004", name: "Timeline.pdf", type: "pdf", size: "892 KB", modifiedAt: "2024-12-15 11:00:00", modifiedBy: "Emily Chen" }
    ],
    totalFiles: 28,
    totalSize: "145 MB",
    lastActivity: "2024-12-20 10:00:00"
  },
  {
    id: "PRJ002",
    projectName: "Platform Development",
    projectColor: "#10b981",
    files: [
      { id: "PF005", name: "Technical Specs.pdf", type: "pdf", size: "2.4 MB", modifiedAt: "2024-12-19 16:00:00", modifiedBy: "Sarah Wilson" },
      { id: "PF006", name: "Architecture Diagram.png", type: "image", size: "1.8 MB", modifiedAt: "2024-12-18 10:30:00", modifiedBy: "John Anderson" },
      { id: "PF007", name: "API Endpoints.xlsx", type: "spreadsheet", size: "245 KB", modifiedAt: "2024-12-20 09:15:00", modifiedBy: "Robert Taylor" },
      { id: "PF008", name: "Source Code", type: "folder", itemCount: 156, modifiedAt: "2024-12-20 11:00:00", modifiedBy: "John Anderson" },
      { id: "PF009", name: "Test Reports", type: "folder", itemCount: 12, modifiedAt: "2024-12-19 17:30:00", modifiedBy: "Robert Taylor" }
    ],
    totalFiles: 175,
    totalSize: "1.2 GB",
    lastActivity: "2024-12-20 11:00:00"
  },
  {
    id: "PRJ003",
    projectName: "Website Redesign",
    projectColor: "#8b5cf6",
    files: [
      { id: "PF010", name: "Wireframes.fig", type: "design", size: "12.5 MB", modifiedAt: "2024-12-16 14:00:00", modifiedBy: "Emily Chen" },
      { id: "PF011", name: "Mockups", type: "folder", itemCount: 18, modifiedAt: "2024-12-19 15:30:00", modifiedBy: "Emily Chen" },
      { id: "PF012", name: "Content Inventory.xlsx", type: "spreadsheet", size: "456 KB", modifiedAt: "2024-12-14 09:00:00", modifiedBy: "Michael Roberts" },
      { id: "PF013", name: "SEO Strategy.docx", type: "document", size: "234 KB", modifiedAt: "2024-12-17 11:00:00", modifiedBy: "Emily Chen" }
    ],
    totalFiles: 42,
    totalSize: "256 MB",
    lastActivity: "2024-12-19 15:30:00"
  },
  {
    id: "PRJ004",
    projectName: "HR Initiatives",
    projectColor: "#ec4899",
    files: [
      { id: "PF014", name: "Policy Updates.docx", type: "document", size: "567 KB", modifiedAt: "2024-12-18 10:00:00", modifiedBy: "Amanda Lee" },
      { id: "PF015", name: "Training Schedule.xlsx", type: "spreadsheet", size: "128 KB", modifiedAt: "2024-12-15 14:30:00", modifiedBy: "Jessica Martinez" },
      { id: "PF016", name: "Onboarding Checklist.pdf", type: "pdf", size: "345 KB", modifiedAt: "2024-12-10 09:00:00", modifiedBy: "Amanda Lee" }
    ],
    totalFiles: 15,
    totalSize: "45 MB",
    lastActivity: "2024-12-18 10:00:00"
  }
];

export const recentFiles: RecentFile[] = [
  { id: "FILE001", name: "Q4 Budget Proposal.xlsx", type: "spreadsheet", size: "2.4 MB", accessedAt: "2024-12-20 10:30:00", location: "My Files", action: "edited" },
  { id: "PF007", name: "API Endpoints.xlsx", type: "spreadsheet", size: "245 KB", accessedAt: "2024-12-20 09:15:00", location: "Platform Development", action: "viewed" },
  { id: "SHR003", name: "Product Specs Document.pdf", type: "pdf", size: "1.8 MB", accessedAt: "2024-12-20 08:45:00", location: "Shared with me", action: "viewed" },
  { id: "FILE005", name: "Presentation Draft.pptx", type: "presentation", size: "8.5 MB", accessedAt: "2024-12-19 16:30:00", location: "My Files", action: "edited" },
  { id: "PF001", name: "Campaign Brief.docx", type: "document", size: "324 KB", accessedAt: "2024-12-19 14:00:00", location: "Marketing Campaign 2025", action: "edited" },
  { id: "FILE003", name: "Product Roadmap 2025.pdf", type: "pdf", size: "4.8 MB", accessedAt: "2024-12-19 11:00:00", location: "My Files", action: "shared" },
  { id: "SHR006", name: "API Documentation.md", type: "document", size: "456 KB", accessedAt: "2024-12-19 10:45:00", location: "Shared with me", action: "edited" },
  { id: "FILE002", name: "Meeting Notes - Dec 18.docx", type: "document", size: "156 KB", accessedAt: "2024-12-18 15:00:00", location: "My Files", action: "created" },
  { id: "PF005", name: "Technical Specs.pdf", type: "pdf", size: "2.4 MB", accessedAt: "2024-12-18 10:30:00", location: "Platform Development", action: "viewed" },
  { id: "SHR001", name: "Marketing Campaign Assets", type: "folder", size: null, accessedAt: "2024-12-18 09:00:00", location: "Shared with me", action: "viewed" }
];

export const trashFiles: TrashFile[] = [
  { id: "TRS001", name: "Old Report Q2.xlsx", type: "spreadsheet", size: "1.2 MB", deletedAt: "2024-12-19 14:00:00", originalLocation: "My Files/Reports", daysUntilPermanent: 25 },
  { id: "TRS002", name: "Draft Notes.docx", type: "document", size: "89 KB", deletedAt: "2024-12-18 10:30:00", originalLocation: "My Files/Documents", daysUntilPermanent: 24 },
  { id: "TRS003", name: "Unused Images", type: "folder", itemCount: 5, size: "15 MB", deletedAt: "2024-12-15 16:00:00", originalLocation: "My Files/Images", daysUntilPermanent: 21 },
  { id: "TRS004", name: "Test File.pdf", type: "pdf", size: "234 KB", deletedAt: "2024-12-10 09:00:00", originalLocation: "My Files", daysUntilPermanent: 16 },
  { id: "TRS005", name: "Backup Copy.zip", type: "archive", size: "45 MB", deletedAt: "2024-12-05 11:30:00", originalLocation: "My Files/Projects", daysUntilPermanent: 11 }
];

export const storageInfo: StorageInfo = {
  used: 2.4,
  total: 10,
  unit: "GB",
  breakdown: [
    { type: "Documents", size: 0.8, color: "#6366f1" },
    { type: "Images", size: 0.6, color: "#ec4899" },
    { type: "Videos", size: 0.5, color: "#f59e0b" },
    { type: "Other", size: 0.5, color: "#64748b" }
  ]
};

// Helper functions
export const getFileTypeColor = (fileType: string): string => {
  const colors: Record<string, string> = {
    folder: '#6366f1',
    document: '#3b82f6',
    spreadsheet: '#10b981',
    pdf: '#ef4444',
    image: '#ec4899',
    video: '#f59e0b',
    presentation: '#f97316',
    archive: '#64748b',
    design: '#8b5cf6',
    code: '#8b5cf6',
    default: '#94a3b8',
  };
  return colors[fileType] || colors.default;
};

export const getFileTypeFromExtension = (extension: string): string => {
  const typeMap: Record<string, string> = {
    doc: 'document',
    docx: 'document',
    txt: 'document',
    md: 'document',
    xls: 'spreadsheet',
    xlsx: 'spreadsheet',
    csv: 'spreadsheet',
    pdf: 'pdf',
    jpg: 'image',
    jpeg: 'image',
    png: 'image',
    gif: 'image',
    svg: 'image',
    mp4: 'video',
    mov: 'video',
    avi: 'video',
    ppt: 'presentation',
    pptx: 'presentation',
    zip: 'archive',
    rar: 'archive',
    '7z': 'archive',
    fig: 'design',
    sketch: 'design',
    psd: 'design',
    js: 'code',
    ts: 'code',
    py: 'code',
    java: 'code',
  };
  return typeMap[extension.toLowerCase()] || 'default';
};

export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
};

export const formatDate = (dateStr: string): string => {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
};

export const formatDateTime = (dateStr: string): string => {
  const date = new Date(dateStr);
  return date.toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

export const getRelativeTime = (dateStr: string): string => {
  const date = new Date(dateStr);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins} min ago`;
  if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
  if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
  return formatDate(dateStr);
};
