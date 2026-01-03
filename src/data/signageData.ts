// Digital Signage Types
export interface Display {
  id: string;
  name: string;
  location: string;
  resolution: string;
  orientation: 'landscape' | 'portrait';
  status: 'online' | 'offline';
  currentContent: string;
  lastSeen: string;
  ipAddress: string;
  model: string;
  group: string;
}

export interface DisplayGroup {
  id: string;
  name: string;
  count: number;
  color: string;
}

export interface ContentItem {
  id: string;
  name: string;
  type: 'image' | 'video';
  format: string;
  resolution: string;
  fileSize: string;
  duration: string | null;
  thumbnail: string;
  uploadedBy: string;
  uploadedAt: string;
  tags: string[];
  folder: string;
}

export interface ContentFolder {
  id: string;
  name: string;
  count: number;
  color: string;
}

export interface PlaylistItem {
  contentId: string;
  duration: number;
  order: number;
}

export interface Playlist {
  id: string;
  name: string;
  description: string;
  items: PlaylistItem[];
  totalDuration: string;
  status: 'active' | 'inactive';
  assignedDisplays: number;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface Schedule {
  id: string;
  display: string;
  playlist: string;
  startTime: string;
  endTime: string;
  days: string[];
  status: 'active' | 'inactive';
}

export interface BroadcastHistory {
  id: string;
  title: string;
  message: string;
  sentBy: string;
  sentAt: string;
  displays: string;
  duration: string;
  status: 'completed' | 'cancelled' | 'active';
}

// Mock Data
export const displays: Display[] = [
  {
    id: "DSP001",
    name: "Lobby Main Screen",
    location: "Building A - Main Lobby",
    resolution: "3840x2160",
    orientation: "landscape",
    status: "online",
    currentContent: "Welcome Playlist",
    lastSeen: "2024-12-20 10:05:00",
    ipAddress: "192.168.2.101",
    model: "Samsung QM85R",
    group: "Lobby Displays"
  },
  {
    id: "DSP002",
    name: "Lobby Side Screen",
    location: "Building A - Main Lobby",
    resolution: "1920x1080",
    orientation: "landscape",
    status: "online",
    currentContent: "Company News",
    lastSeen: "2024-12-20 10:05:00",
    ipAddress: "192.168.2.102",
    model: "LG 55XE4F",
    group: "Lobby Displays"
  },
  {
    id: "DSP003",
    name: "Cafeteria Display",
    location: "Building A - Cafeteria",
    resolution: "1920x1080",
    orientation: "landscape",
    status: "online",
    currentContent: "Menu & Announcements",
    lastSeen: "2024-12-20 10:04:55",
    ipAddress: "192.168.2.103",
    model: "Samsung QM55R",
    group: "Cafeteria"
  },
  {
    id: "DSP004",
    name: "Floor 1 Info Board",
    location: "Building A - 1st Floor",
    resolution: "1920x1080",
    orientation: "landscape",
    status: "online",
    currentContent: "Department Updates",
    lastSeen: "2024-12-20 10:05:00",
    ipAddress: "192.168.2.104",
    model: "LG 49XE4F",
    group: "Floor Displays"
  },
  {
    id: "DSP005",
    name: "Floor 2 Info Board",
    location: "Building A - 2nd Floor",
    resolution: "1920x1080",
    orientation: "landscape",
    status: "offline",
    currentContent: "Department Updates",
    lastSeen: "2024-12-20 08:30:00",
    ipAddress: "192.168.2.105",
    model: "LG 49XE4F",
    group: "Floor Displays"
  },
  {
    id: "DSP006",
    name: "Meeting Room A Display",
    location: "Building A - Meeting Room A",
    resolution: "1920x1080",
    orientation: "landscape",
    status: "online",
    currentContent: "Room Schedule",
    lastSeen: "2024-12-20 10:05:00",
    ipAddress: "192.168.2.106",
    model: "Samsung QB50R",
    group: "Meeting Rooms"
  },
  {
    id: "DSP007",
    name: "Meeting Room B Display",
    location: "Building A - Meeting Room B",
    resolution: "1920x1080",
    orientation: "landscape",
    status: "online",
    currentContent: "Room Schedule",
    lastSeen: "2024-12-20 10:04:58",
    ipAddress: "192.168.2.107",
    model: "Samsung QB50R",
    group: "Meeting Rooms"
  },
  {
    id: "DSP008",
    name: "Warehouse Display",
    location: "Building B - Warehouse",
    resolution: "1920x1080",
    orientation: "landscape",
    status: "online",
    currentContent: "Safety Guidelines",
    lastSeen: "2024-12-20 10:05:00",
    ipAddress: "192.168.2.108",
    model: "LG 55XF3E",
    group: "Operations"
  },
  {
    id: "DSP009",
    name: "Reception Desk",
    location: "Building A - Reception",
    resolution: "1920x1080",
    orientation: "landscape",
    status: "online",
    currentContent: "Visitor Welcome",
    lastSeen: "2024-12-20 10:05:00",
    ipAddress: "192.168.2.109",
    model: "Samsung QM55R",
    group: "Lobby Displays"
  },
  {
    id: "DSP010",
    name: "Parking Entrance Sign",
    location: "Parking Lot - Entrance",
    resolution: "1920x1080",
    orientation: "landscape",
    status: "online",
    currentContent: "Parking Info",
    lastSeen: "2024-12-20 10:04:50",
    ipAddress: "192.168.2.110",
    model: "LG 49XE4F-M",
    group: "Outdoor"
  }
];

export const displayGroups: DisplayGroup[] = [
  { id: "lobby", name: "Lobby Displays", count: 3, color: "#6366f1" },
  { id: "floors", name: "Floor Displays", count: 2, color: "#8b5cf6" },
  { id: "meeting", name: "Meeting Rooms", count: 2, color: "#10b981" },
  { id: "cafeteria", name: "Cafeteria", count: 1, color: "#f59e0b" },
  { id: "operations", name: "Operations", count: 1, color: "#ec4899" },
  { id: "outdoor", name: "Outdoor", count: 1, color: "#14b8a6" }
];

export const contentLibrary: ContentItem[] = [
  {
    id: "CNT001",
    name: "Company Logo",
    type: "image",
    format: "PNG",
    resolution: "1920x1080",
    fileSize: "2.4 MB",
    duration: null,
    thumbnail: "/placeholder-image.jpg",
    uploadedBy: "Admin",
    uploadedAt: "2024-11-01",
    tags: ["logo", "branding"],
    folder: "Branding"
  },
  {
    id: "CNT002",
    name: "Welcome Video",
    type: "video",
    format: "MP4",
    resolution: "3840x2160",
    fileSize: "156 MB",
    duration: "00:02:30",
    thumbnail: "/placeholder-video.jpg",
    uploadedBy: "Marketing",
    uploadedAt: "2024-11-15",
    tags: ["welcome", "corporate"],
    folder: "Corporate"
  },
  {
    id: "CNT003",
    name: "Holiday Announcement",
    type: "image",
    format: "JPG",
    resolution: "1920x1080",
    fileSize: "1.8 MB",
    duration: null,
    thumbnail: "/placeholder-image.jpg",
    uploadedBy: "HR",
    uploadedAt: "2024-12-10",
    tags: ["holiday", "announcement"],
    folder: "Announcements"
  },
  {
    id: "CNT004",
    name: "Safety Guidelines",
    type: "video",
    format: "MP4",
    resolution: "1920x1080",
    fileSize: "85 MB",
    duration: "00:01:45",
    thumbnail: "/placeholder-video.jpg",
    uploadedBy: "Operations",
    uploadedAt: "2024-10-20",
    tags: ["safety", "training"],
    folder: "Safety"
  },
  {
    id: "CNT005",
    name: "Cafeteria Menu - Monday",
    type: "image",
    format: "PNG",
    resolution: "1920x1080",
    fileSize: "3.2 MB",
    duration: null,
    thumbnail: "/placeholder-image.jpg",
    uploadedBy: "Facilities",
    uploadedAt: "2024-12-16",
    tags: ["menu", "cafeteria"],
    folder: "Cafeteria"
  },
  {
    id: "CNT006",
    name: "Cafeteria Menu - Tuesday",
    type: "image",
    format: "PNG",
    resolution: "1920x1080",
    fileSize: "3.1 MB",
    duration: null,
    thumbnail: "/placeholder-image.jpg",
    uploadedBy: "Facilities",
    uploadedAt: "2024-12-16",
    tags: ["menu", "cafeteria"],
    folder: "Cafeteria"
  },
  {
    id: "CNT007",
    name: "Product Launch Teaser",
    type: "video",
    format: "MP4",
    resolution: "3840x2160",
    fileSize: "220 MB",
    duration: "00:00:45",
    thumbnail: "/placeholder-video.jpg",
    uploadedBy: "Marketing",
    uploadedAt: "2024-12-18",
    tags: ["product", "launch", "marketing"],
    folder: "Marketing"
  },
  {
    id: "CNT008",
    name: "Employee of the Month",
    type: "image",
    format: "PNG",
    resolution: "1920x1080",
    fileSize: "4.5 MB",
    duration: null,
    thumbnail: "/placeholder-image.jpg",
    uploadedBy: "HR",
    uploadedAt: "2024-12-01",
    tags: ["employee", "recognition"],
    folder: "HR"
  },
  {
    id: "CNT009",
    name: "Company Values",
    type: "image",
    format: "PNG",
    resolution: "1080x1920",
    fileSize: "2.8 MB",
    duration: null,
    thumbnail: "/placeholder-image.jpg",
    uploadedBy: "Admin",
    uploadedAt: "2024-09-15",
    tags: ["values", "culture", "portrait"],
    folder: "Corporate"
  },
  {
    id: "CNT010",
    name: "Meeting Room Instructions",
    type: "image",
    format: "PNG",
    resolution: "1920x1080",
    fileSize: "1.5 MB",
    duration: null,
    thumbnail: "/placeholder-image.jpg",
    uploadedBy: "IT",
    uploadedAt: "2024-08-20",
    tags: ["meeting", "instructions"],
    folder: "Facilities"
  },
  {
    id: "CNT011",
    name: "Parking Rules",
    type: "image",
    format: "JPG",
    resolution: "1920x1080",
    fileSize: "1.2 MB",
    duration: null,
    thumbnail: "/placeholder-image.jpg",
    uploadedBy: "Facilities",
    uploadedAt: "2024-07-10",
    tags: ["parking", "rules"],
    folder: "Facilities"
  },
  {
    id: "CNT012",
    name: "Q4 Results Presentation",
    type: "video",
    format: "MP4",
    resolution: "1920x1080",
    fileSize: "95 MB",
    duration: "00:05:20",
    thumbnail: "/placeholder-video.jpg",
    uploadedBy: "Finance",
    uploadedAt: "2024-12-15",
    tags: ["finance", "quarterly", "results"],
    folder: "Corporate"
  }
];

export const contentFolders: ContentFolder[] = [
  { id: "branding", name: "Branding", count: 1, color: "#6366f1" },
  { id: "corporate", name: "Corporate", count: 3, color: "#8b5cf6" },
  { id: "announcements", name: "Announcements", count: 1, color: "#10b981" },
  { id: "safety", name: "Safety", count: 1, color: "#ef4444" },
  { id: "cafeteria", name: "Cafeteria", count: 2, color: "#f59e0b" },
  { id: "marketing", name: "Marketing", count: 1, color: "#ec4899" },
  { id: "hr", name: "HR", count: 1, color: "#14b8a6" },
  { id: "facilities", name: "Facilities", count: 2, color: "#64748b" }
];

export const playlists: Playlist[] = [
  {
    id: "PL001",
    name: "Welcome Playlist",
    description: "Main lobby welcome content rotation",
    items: [
      { contentId: "CNT001", duration: 10, order: 1 },
      { contentId: "CNT002", duration: 150, order: 2 },
      { contentId: "CNT008", duration: 15, order: 3 },
      { contentId: "CNT007", duration: 45, order: 4 }
    ],
    totalDuration: "00:03:40",
    status: "active",
    assignedDisplays: 2,
    createdBy: "Admin",
    createdAt: "2024-11-01",
    updatedAt: "2024-12-18"
  },
  {
    id: "PL002",
    name: "Company News",
    description: "Corporate updates and announcements",
    items: [
      { contentId: "CNT003", duration: 15, order: 1 },
      { contentId: "CNT008", duration: 15, order: 2 },
      { contentId: "CNT012", duration: 320, order: 3 }
    ],
    totalDuration: "00:05:50",
    status: "active",
    assignedDisplays: 1,
    createdBy: "Marketing",
    createdAt: "2024-12-01",
    updatedAt: "2024-12-15"
  },
  {
    id: "PL003",
    name: "Menu & Announcements",
    description: "Cafeteria menu rotation with announcements",
    items: [
      { contentId: "CNT005", duration: 20, order: 1 },
      { contentId: "CNT006", duration: 20, order: 2 },
      { contentId: "CNT003", duration: 10, order: 3 }
    ],
    totalDuration: "00:00:50",
    status: "active",
    assignedDisplays: 1,
    createdBy: "Facilities",
    createdAt: "2024-12-16",
    updatedAt: "2024-12-16"
  },
  {
    id: "PL004",
    name: "Department Updates",
    description: "General department information",
    items: [
      { contentId: "CNT001", duration: 10, order: 1 },
      { contentId: "CNT009", duration: 15, order: 2 },
      { contentId: "CNT003", duration: 10, order: 3 }
    ],
    totalDuration: "00:00:35",
    status: "active",
    assignedDisplays: 2,
    createdBy: "Admin",
    createdAt: "2024-10-15",
    updatedAt: "2024-12-10"
  },
  {
    id: "PL005",
    name: "Room Schedule",
    description: "Meeting room booking display",
    items: [
      { contentId: "CNT010", duration: 30, order: 1 }
    ],
    totalDuration: "00:00:30",
    status: "active",
    assignedDisplays: 2,
    createdBy: "IT",
    createdAt: "2024-08-20",
    updatedAt: "2024-08-20"
  },
  {
    id: "PL006",
    name: "Safety Guidelines",
    description: "Warehouse safety content",
    items: [
      { contentId: "CNT004", duration: 105, order: 1 },
      { contentId: "CNT001", duration: 10, order: 2 }
    ],
    totalDuration: "00:01:55",
    status: "active",
    assignedDisplays: 1,
    createdBy: "Operations",
    createdAt: "2024-10-20",
    updatedAt: "2024-10-20"
  },
  {
    id: "PL007",
    name: "Visitor Welcome",
    description: "Reception area content",
    items: [
      { contentId: "CNT001", duration: 10, order: 1 },
      { contentId: "CNT002", duration: 150, order: 2 },
      { contentId: "CNT009", duration: 15, order: 3 }
    ],
    totalDuration: "00:02:55",
    status: "active",
    assignedDisplays: 1,
    createdBy: "Admin",
    createdAt: "2024-11-15",
    updatedAt: "2024-11-15"
  },
  {
    id: "PL008",
    name: "Parking Info",
    description: "Parking entrance information",
    items: [
      { contentId: "CNT011", duration: 20, order: 1 },
      { contentId: "CNT001", duration: 10, order: 2 }
    ],
    totalDuration: "00:00:30",
    status: "active",
    assignedDisplays: 1,
    createdBy: "Facilities",
    createdAt: "2024-07-10",
    updatedAt: "2024-07-10"
  },
  {
    id: "PL009",
    name: "Holiday Special",
    description: "Holiday themed content - inactive",
    items: [
      { contentId: "CNT003", duration: 15, order: 1 },
      { contentId: "CNT001", duration: 10, order: 2 }
    ],
    totalDuration: "00:00:25",
    status: "inactive",
    assignedDisplays: 0,
    createdBy: "Marketing",
    createdAt: "2024-12-10",
    updatedAt: "2024-12-10"
  }
];

export const schedules: Schedule[] = [
  { id: "SCH001", display: "Lobby Main Screen", playlist: "Welcome Playlist", startTime: "06:00", endTime: "22:00", days: ["Mon", "Tue", "Wed", "Thu", "Fri"], status: "active" },
  { id: "SCH002", display: "Lobby Main Screen", playlist: "Holiday Special", startTime: "06:00", endTime: "22:00", days: ["Sat", "Sun"], status: "active" },
  { id: "SCH003", display: "Lobby Side Screen", playlist: "Company News", startTime: "06:00", endTime: "22:00", days: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"], status: "active" },
  { id: "SCH004", display: "Cafeteria Display", playlist: "Menu & Announcements", startTime: "07:00", endTime: "19:00", days: ["Mon", "Tue", "Wed", "Thu", "Fri"], status: "active" },
  { id: "SCH005", display: "Floor 1 Info Board", playlist: "Department Updates", startTime: "08:00", endTime: "20:00", days: ["Mon", "Tue", "Wed", "Thu", "Fri"], status: "active" },
  { id: "SCH006", display: "Floor 2 Info Board", playlist: "Department Updates", startTime: "08:00", endTime: "20:00", days: ["Mon", "Tue", "Wed", "Thu", "Fri"], status: "inactive" },
  { id: "SCH007", display: "Meeting Room A Display", playlist: "Room Schedule", startTime: "00:00", endTime: "23:59", days: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"], status: "active" },
  { id: "SCH008", display: "Meeting Room B Display", playlist: "Room Schedule", startTime: "00:00", endTime: "23:59", days: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"], status: "active" },
  { id: "SCH009", display: "Warehouse Display", playlist: "Safety Guidelines", startTime: "05:00", endTime: "23:00", days: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"], status: "active" },
  { id: "SCH010", display: "Reception Desk", playlist: "Visitor Welcome", startTime: "07:00", endTime: "20:00", days: ["Mon", "Tue", "Wed", "Thu", "Fri"], status: "active" },
  { id: "SCH011", display: "Parking Entrance Sign", playlist: "Parking Info", startTime: "00:00", endTime: "23:59", days: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"], status: "active" }
];

export const broadcastHistory: BroadcastHistory[] = [
  { id: "BC001", title: "Fire Drill Announcement", message: "Fire drill in progress. Please evacuate using nearest exit.", sentBy: "Admin", sentAt: "2024-12-15 10:00:00", displays: "All Displays", duration: "5 min", status: "completed" },
  { id: "BC002", title: "System Maintenance", message: "Building systems maintenance at 6 PM today.", sentBy: "IT", sentAt: "2024-12-10 14:30:00", displays: "All Displays", duration: "2 hours", status: "completed" },
  { id: "BC003", title: "Weather Alert", message: "Severe weather warning. Please remain indoors.", sentBy: "Admin", sentAt: "2024-11-28 16:00:00", displays: "All Displays", duration: "3 hours", status: "completed" },
  { id: "BC004", title: "CEO Announcement", message: "All-hands meeting in 15 minutes at main auditorium.", sentBy: "Executive Office", sentAt: "2024-11-20 09:45:00", displays: "All Displays", duration: "15 min", status: "completed" }
];

// Helper functions
export const getDisplayStatusColor = (status: Display['status']): string => {
  const colors: Record<Display['status'], string> = {
    online: '#10b981',
    offline: '#ef4444',
  };
  return colors[status];
};

export const getContentTypeColor = (type: ContentItem['type']): string => {
  const colors: Record<ContentItem['type'], string> = {
    image: '#6366f1',
    video: '#f59e0b',
  };
  return colors[type];
};

export const getPlaylistStatusColor = (status: Playlist['status']): string => {
  const colors: Record<Playlist['status'], string> = {
    active: '#10b981',
    inactive: '#6b7280',
  };
  return colors[status];
};

export const getScheduleStatusColor = (status: Schedule['status']): string => {
  const colors: Record<Schedule['status'], string> = {
    active: '#10b981',
    inactive: '#6b7280',
  };
  return colors[status];
};

export const getBroadcastStatusColor = (status: BroadcastHistory['status']): string => {
  const colors: Record<BroadcastHistory['status'], string> = {
    completed: '#10b981',
    cancelled: '#ef4444',
    active: '#f59e0b',
  };
  return colors[status];
};
