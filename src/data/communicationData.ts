// Communication Types
export interface ChatUser {
  id: string;
  name: string;
  avatar: string | null;
  department: string;
  position: string;
  status: 'online' | 'away' | 'busy' | 'offline';
  lastSeen: string;
}

export interface DirectMessage {
  odConversationId: string;
  odParticipants: string[];
  otherUser: {
    id: string;
    name: string;
    status: 'online' | 'away' | 'busy' | 'offline';
  };
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
}

export interface Message {
  id: number;
  sender: string;
  senderName: string;
  content: string;
  timestamp: string;
  read: boolean;
}

export interface GroupChat {
  id: string;
  name: string;
  description: string;
  members: string[];
  memberCount: number;
  avatar: string | null;
  color: string;
  lastMessage: string;
  lastMessageSender: string;
  lastMessageTime: string;
  unreadCount: number;
  createdBy: string;
  createdAt: string;
}

export interface Attachment {
  name: string;
  size: string;
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  priority: 'high' | 'normal' | 'low';
  author: string;
  authorRole: string;
  publishedAt: string;
  expiresAt: string;
  targetAudience: string;
  readCount: number;
  totalRecipients: number;
  pinned: boolean;
  attachments: Attachment[];
}

export interface Employee {
  id: string;
  name: string;
  email: string;
  phone: string;
  department: string;
  position: string;
  location: string;
  manager: string;
  status: 'online' | 'away' | 'busy' | 'offline';
}

// Mock Data
export const chatUsers: ChatUser[] = [
  { id: "USR001", name: "John Anderson", avatar: null, department: "Engineering", position: "Senior Developer", status: "online", lastSeen: "2024-12-20 10:15:00" },
  { id: "USR002", name: "Emily Chen", avatar: null, department: "Marketing", position: "Marketing Manager", status: "online", lastSeen: "2024-12-20 10:14:00" },
  { id: "USR003", name: "Michael Roberts", avatar: null, department: "Sales", position: "Sales Representative", status: "away", lastSeen: "2024-12-20 09:45:00" },
  { id: "USR004", name: "Sarah Wilson", avatar: null, department: "Engineering", position: "Engineering Director", status: "online", lastSeen: "2024-12-20 10:15:00" },
  { id: "USR005", name: "David Kim", avatar: null, department: "Finance", position: "Financial Analyst", status: "offline", lastSeen: "2024-12-19 17:30:00" },
  { id: "USR006", name: "Jessica Martinez", avatar: null, department: "HR", position: "HR Specialist", status: "online", lastSeen: "2024-12-20 10:10:00" },
  { id: "USR007", name: "Robert Taylor", avatar: null, department: "Engineering", position: "Junior Developer", status: "online", lastSeen: "2024-12-20 10:12:00" },
  { id: "USR008", name: "Amanda Lee", avatar: null, department: "HR", position: "HR Director", status: "busy", lastSeen: "2024-12-20 10:00:00" },
  { id: "USR009", name: "Chris Johnson", avatar: null, department: "Operations", position: "Operations Manager", status: "online", lastSeen: "2024-12-20 10:08:00" },
  { id: "USR010", name: "Lisa Park", avatar: null, department: "Finance", position: "Finance Director", status: "away", lastSeen: "2024-12-20 09:30:00" }
];

export const directMessages: DirectMessage[] = [
  {
    odConversationId: "DM001",
    odParticipants: ["current-user", "USR001"],
    otherUser: { id: "USR001", name: "John Anderson", status: "online" },
    lastMessage: "Sure, I'll send over the API documentation shortly.",
    lastMessageTime: "2024-12-20 10:12:00",
    unreadCount: 0
  },
  {
    odConversationId: "DM002",
    odParticipants: ["current-user", "USR002"],
    otherUser: { id: "USR002", name: "Emily Chen", status: "online" },
    lastMessage: "The marketing report is ready for review.",
    lastMessageTime: "2024-12-20 10:05:00",
    unreadCount: 2
  },
  {
    odConversationId: "DM003",
    odParticipants: ["current-user", "USR004"],
    otherUser: { id: "USR004", name: "Sarah Wilson", status: "online" },
    lastMessage: "Let's schedule a meeting for tomorrow.",
    lastMessageTime: "2024-12-20 09:45:00",
    unreadCount: 1
  },
  {
    odConversationId: "DM004",
    odParticipants: ["current-user", "USR006"],
    otherUser: { id: "USR006", name: "Jessica Martinez", status: "online" },
    lastMessage: "The new employee onboarding is scheduled for Monday.",
    lastMessageTime: "2024-12-20 09:30:00",
    unreadCount: 0
  },
  {
    odConversationId: "DM005",
    odParticipants: ["current-user", "USR009"],
    otherUser: { id: "USR009", name: "Chris Johnson", status: "online" },
    lastMessage: "Server maintenance completed successfully.",
    lastMessageTime: "2024-12-19 18:20:00",
    unreadCount: 0
  }
];

export const conversationMessages: Record<string, Message[]> = {
  "DM001": [
    { id: 1, sender: "USR001", senderName: "John Anderson", content: "Hey, do you have the API documentation for the new payment module?", timestamp: "2024-12-20 09:55:00", read: true },
    { id: 2, sender: "current-user", senderName: "You", content: "Yes, I was just finishing it up. Which endpoints do you need specifically?", timestamp: "2024-12-20 09:58:00", read: true },
    { id: 3, sender: "USR001", senderName: "John Anderson", content: "The ones related to subscription billing and refunds.", timestamp: "2024-12-20 10:02:00", read: true },
    { id: 4, sender: "current-user", senderName: "You", content: "Got it. I'll include the webhook events documentation as well since you'll need those for real-time updates.", timestamp: "2024-12-20 10:05:00", read: true },
    { id: 5, sender: "USR001", senderName: "John Anderson", content: "That would be great, thanks!", timestamp: "2024-12-20 10:08:00", read: true },
    { id: 6, sender: "current-user", senderName: "You", content: "No problem. Give me about 30 minutes.", timestamp: "2024-12-20 10:10:00", read: true },
    { id: 7, sender: "USR001", senderName: "John Anderson", content: "Sure, I'll send over the API documentation shortly.", timestamp: "2024-12-20 10:12:00", read: true }
  ],
  "DM002": [
    { id: 1, sender: "USR002", senderName: "Emily Chen", content: "Hi! I've finished compiling the Q4 marketing metrics.", timestamp: "2024-12-20 09:30:00", read: true },
    { id: 2, sender: "current-user", senderName: "You", content: "Great! How are the numbers looking?", timestamp: "2024-12-20 09:35:00", read: true },
    { id: 3, sender: "USR002", senderName: "Emily Chen", content: "Really good actually. We exceeded our targets by 15%.", timestamp: "2024-12-20 09:40:00", read: true },
    { id: 4, sender: "USR002", senderName: "Emily Chen", content: "I've also included the campaign breakdown and ROI analysis.", timestamp: "2024-12-20 09:42:00", read: false },
    { id: 5, sender: "USR002", senderName: "Emily Chen", content: "The marketing report is ready for review.", timestamp: "2024-12-20 10:05:00", read: false }
  ],
  "DM003": [
    { id: 1, sender: "USR004", senderName: "Sarah Wilson", content: "Can we discuss the architecture changes for the new module?", timestamp: "2024-12-20 09:20:00", read: true },
    { id: 2, sender: "current-user", senderName: "You", content: "Of course. I had some ideas about the microservices approach.", timestamp: "2024-12-20 09:25:00", read: true },
    { id: 3, sender: "USR004", senderName: "Sarah Wilson", content: "Perfect. I think we should also involve the DevOps team.", timestamp: "2024-12-20 09:35:00", read: true },
    { id: 4, sender: "USR004", senderName: "Sarah Wilson", content: "Let's schedule a meeting for tomorrow.", timestamp: "2024-12-20 09:45:00", read: false }
  ],
  "DM004": [
    { id: 1, sender: "USR006", senderName: "Jessica Martinez", content: "Hi! Quick update on the new hire paperwork.", timestamp: "2024-12-20 09:00:00", read: true },
    { id: 2, sender: "current-user", senderName: "You", content: "Sure, what's the status?", timestamp: "2024-12-20 09:05:00", read: true },
    { id: 3, sender: "USR006", senderName: "Jessica Martinez", content: "Everything is ready. Just need the final sign-off.", timestamp: "2024-12-20 09:15:00", read: true },
    { id: 4, sender: "USR006", senderName: "Jessica Martinez", content: "The new employee onboarding is scheduled for Monday.", timestamp: "2024-12-20 09:30:00", read: true }
  ],
  "DM005": [
    { id: 1, sender: "USR009", senderName: "Chris Johnson", content: "FYI - Starting server maintenance now.", timestamp: "2024-12-19 17:00:00", read: true },
    { id: 2, sender: "current-user", senderName: "You", content: "Thanks for the heads up. How long will it take?", timestamp: "2024-12-19 17:05:00", read: true },
    { id: 3, sender: "USR009", senderName: "Chris Johnson", content: "Should be about an hour.", timestamp: "2024-12-19 17:10:00", read: true },
    { id: 4, sender: "USR009", senderName: "Chris Johnson", content: "Server maintenance completed successfully.", timestamp: "2024-12-19 18:20:00", read: true }
  ]
};

export const groupChats: GroupChat[] = [
  {
    id: "GRP001",
    name: "Engineering Team",
    description: "Main engineering discussion channel",
    members: ["USR001", "USR004", "USR007", "current-user"],
    memberCount: 12,
    avatar: null,
    color: "#6366f1",
    lastMessage: "Deployment completed successfully!",
    lastMessageSender: "Robert Taylor",
    lastMessageTime: "2024-12-20 10:10:00",
    unreadCount: 3,
    createdBy: "Sarah Wilson",
    createdAt: "2024-01-15"
  },
  {
    id: "GRP002",
    name: "Marketing",
    description: "Marketing team updates and discussions",
    members: ["USR002", "USR003", "current-user"],
    memberCount: 8,
    avatar: null,
    color: "#8b5cf6",
    lastMessage: "New campaign assets are ready for review",
    lastMessageSender: "Emily Chen",
    lastMessageTime: "2024-12-20 09:50:00",
    unreadCount: 0,
    createdBy: "Emily Chen",
    createdAt: "2024-02-01"
  },
  {
    id: "GRP003",
    name: "Project Alpha",
    description: "Project Alpha team communication",
    members: ["USR001", "USR002", "USR004", "USR007", "current-user"],
    memberCount: 6,
    avatar: null,
    color: "#10b981",
    lastMessage: "Sprint review meeting at 3 PM today",
    lastMessageSender: "Sarah Wilson",
    lastMessageTime: "2024-12-20 09:30:00",
    unreadCount: 5,
    createdBy: "Sarah Wilson",
    createdAt: "2024-10-01"
  },
  {
    id: "GRP004",
    name: "All Hands",
    description: "Company-wide announcements and discussions",
    members: ["USR001", "USR002", "USR003", "USR004", "USR005", "USR006", "USR007", "USR008", "USR009", "USR010", "current-user"],
    memberCount: 52,
    avatar: null,
    color: "#f59e0b",
    lastMessage: "Holiday schedule has been posted",
    lastMessageSender: "Amanda Lee",
    lastMessageTime: "2024-12-19 16:00:00",
    unreadCount: 0,
    createdBy: "Admin",
    createdAt: "2024-01-01"
  },
  {
    id: "GRP005",
    name: "IT Support",
    description: "IT support requests and updates",
    members: ["USR001", "USR007", "USR009", "current-user"],
    memberCount: 5,
    avatar: null,
    color: "#ef4444",
    lastMessage: "VPN issue has been resolved",
    lastMessageSender: "Chris Johnson",
    lastMessageTime: "2024-12-20 08:45:00",
    unreadCount: 1,
    createdBy: "Chris Johnson",
    createdAt: "2024-03-15"
  },
  {
    id: "GRP006",
    name: "HR Updates",
    description: "Human resources announcements",
    members: ["USR006", "USR008", "current-user"],
    memberCount: 4,
    avatar: null,
    color: "#ec4899",
    lastMessage: "New benefits package information attached",
    lastMessageSender: "Jessica Martinez",
    lastMessageTime: "2024-12-18 14:30:00",
    unreadCount: 0,
    createdBy: "Amanda Lee",
    createdAt: "2024-01-20"
  }
];

export const groupMessages: Record<string, Message[]> = {
  "GRP001": [
    { id: 1, sender: "USR004", senderName: "Sarah Wilson", content: "Good morning team! Quick update on the sprint progress.", timestamp: "2024-12-20 09:00:00", read: true },
    { id: 2, sender: "USR001", senderName: "John Anderson", content: "The API integration is about 80% complete.", timestamp: "2024-12-20 09:15:00", read: true },
    { id: 3, sender: "USR007", senderName: "Robert Taylor", content: "I've finished the unit tests for the auth module.", timestamp: "2024-12-20 09:30:00", read: true },
    { id: 4, sender: "current-user", senderName: "You", content: "Great progress everyone! I'll review the PRs this afternoon.", timestamp: "2024-12-20 09:45:00", read: true },
    { id: 5, sender: "USR004", senderName: "Sarah Wilson", content: "Perfect. Let's aim to deploy to staging by EOD.", timestamp: "2024-12-20 10:00:00", read: false },
    { id: 6, sender: "USR007", senderName: "Robert Taylor", content: "Deployment completed successfully!", timestamp: "2024-12-20 10:10:00", read: false }
  ],
  "GRP002": [
    { id: 1, sender: "USR002", senderName: "Emily Chen", content: "Team, the new campaign is launching next week.", timestamp: "2024-12-20 09:00:00", read: true },
    { id: 2, sender: "USR003", senderName: "Michael Roberts", content: "I've updated the sales deck accordingly.", timestamp: "2024-12-20 09:20:00", read: true },
    { id: 3, sender: "USR002", senderName: "Emily Chen", content: "New campaign assets are ready for review", timestamp: "2024-12-20 09:50:00", read: true }
  ],
  "GRP003": [
    { id: 1, sender: "USR004", senderName: "Sarah Wilson", content: "Team, we need to finalize the deliverables for Phase 2.", timestamp: "2024-12-20 08:30:00", read: true },
    { id: 2, sender: "USR002", senderName: "Emily Chen", content: "Marketing materials are ready on my end.", timestamp: "2024-12-20 08:45:00", read: true },
    { id: 3, sender: "USR001", senderName: "John Anderson", content: "Backend APIs are deployed and tested.", timestamp: "2024-12-20 09:00:00", read: true },
    { id: 4, sender: "USR007", senderName: "Robert Taylor", content: "Frontend is 90% done, just fixing some UI bugs.", timestamp: "2024-12-20 09:15:00", read: false },
    { id: 5, sender: "USR004", senderName: "Sarah Wilson", content: "Sprint review meeting at 3 PM today", timestamp: "2024-12-20 09:30:00", read: false }
  ],
  "GRP004": [
    { id: 1, sender: "USR008", senderName: "Amanda Lee", content: "Hello everyone! Reminder about the upcoming holiday schedule.", timestamp: "2024-12-19 15:30:00", read: true },
    { id: 2, sender: "USR008", senderName: "Amanda Lee", content: "Holiday schedule has been posted", timestamp: "2024-12-19 16:00:00", read: true }
  ],
  "GRP005": [
    { id: 1, sender: "USR009", senderName: "Chris Johnson", content: "Investigating VPN connectivity issues.", timestamp: "2024-12-20 08:00:00", read: true },
    { id: 2, sender: "USR001", senderName: "John Anderson", content: "I'm experiencing issues too.", timestamp: "2024-12-20 08:15:00", read: true },
    { id: 3, sender: "USR009", senderName: "Chris Johnson", content: "VPN issue has been resolved", timestamp: "2024-12-20 08:45:00", read: false }
  ],
  "GRP006": [
    { id: 1, sender: "USR006", senderName: "Jessica Martinez", content: "Hi team, new benefits information available.", timestamp: "2024-12-18 14:00:00", read: true },
    { id: 2, sender: "USR006", senderName: "Jessica Martinez", content: "New benefits package information attached", timestamp: "2024-12-18 14:30:00", read: true }
  ]
};

export const announcements: Announcement[] = [
  {
    id: "ANN001",
    title: "Holiday Office Hours",
    content: "Please note that the office will be closed from December 24th to January 1st for the holiday season. Emergency contacts will be available. We wish everyone a wonderful holiday!",
    priority: "high",
    author: "Amanda Lee",
    authorRole: "HR Director",
    publishedAt: "2024-12-18 09:00:00",
    expiresAt: "2025-01-02",
    targetAudience: "all",
    readCount: 48,
    totalRecipients: 52,
    pinned: true,
    attachments: [
      { name: "Holiday_Schedule_2024.pdf", size: "125 KB" }
    ]
  },
  {
    id: "ANN002",
    title: "Q4 All-Hands Meeting",
    content: "Join us for our quarterly all-hands meeting on December 22nd at 2:00 PM in the main auditorium. We'll be discussing company performance, upcoming initiatives, and celebrating our achievements. Remote employees can join via the video conference link.",
    priority: "normal",
    author: "Sarah Wilson",
    authorRole: "Engineering Director",
    publishedAt: "2024-12-15 14:00:00",
    expiresAt: "2024-12-23",
    targetAudience: "all",
    readCount: 45,
    totalRecipients: 52,
    pinned: false,
    attachments: []
  },
  {
    id: "ANN003",
    title: "New Health Benefits Package",
    content: "We're excited to announce improvements to our health benefits package starting January 1st, 2025. The new package includes expanded mental health coverage, increased dental benefits, and a new wellness program. Please review the attached documentation and contact HR with any questions.",
    priority: "high",
    author: "Jessica Martinez",
    authorRole: "HR Specialist",
    publishedAt: "2024-12-10 10:00:00",
    expiresAt: "2025-01-31",
    targetAudience: "all",
    readCount: 42,
    totalRecipients: 52,
    pinned: true,
    attachments: [
      { name: "Benefits_Overview_2025.pdf", size: "2.4 MB" },
      { name: "Enrollment_Form.pdf", size: "340 KB" }
    ]
  },
  {
    id: "ANN004",
    title: "IT System Maintenance",
    content: "Scheduled maintenance will be performed on our internal systems this Saturday, December 21st, from 10:00 PM to 2:00 AM. During this time, email and internal applications may be temporarily unavailable. Please save your work before leaving on Friday.",
    priority: "normal",
    author: "Chris Johnson",
    authorRole: "Operations Manager",
    publishedAt: "2024-12-16 11:00:00",
    expiresAt: "2024-12-22",
    targetAudience: "all",
    readCount: 38,
    totalRecipients: 52,
    pinned: false,
    attachments: []
  },
  {
    id: "ANN005",
    title: "Engineering Team Update",
    content: "The engineering team has successfully completed the migration to our new cloud infrastructure. This improvement will result in better performance and reliability. Special thanks to everyone involved in this project!",
    priority: "normal",
    author: "Sarah Wilson",
    authorRole: "Engineering Director",
    publishedAt: "2024-12-12 16:00:00",
    expiresAt: "2024-12-26",
    targetAudience: "engineering",
    readCount: 10,
    totalRecipients: 12,
    pinned: false,
    attachments: []
  },
  {
    id: "ANN006",
    title: "Parking Lot Resurfacing",
    content: "Parking lot Zone B will be closed for resurfacing from December 26th to 28th. Please use Zone A or Zone C during this period. Additional temporary parking will be available at the adjacent lot.",
    priority: "low",
    author: "Chris Johnson",
    authorRole: "Operations Manager",
    publishedAt: "2024-12-19 09:00:00",
    expiresAt: "2024-12-29",
    targetAudience: "all",
    readCount: 25,
    totalRecipients: 52,
    pinned: false,
    attachments: []
  }
];

export const employeeDirectory: Employee[] = [
  { id: "USR001", name: "John Anderson", email: "john.anderson@company.com", phone: "+1 (555) 123-4567", department: "Engineering", position: "Senior Developer", location: "New York Office", manager: "Sarah Wilson", status: "online" },
  { id: "USR002", name: "Emily Chen", email: "emily.chen@company.com", phone: "+1 (555) 234-5678", department: "Marketing", position: "Marketing Manager", location: "Los Angeles Office", manager: "Michael Brown", status: "online" },
  { id: "USR003", name: "Michael Roberts", email: "michael.roberts@company.com", phone: "+1 (555) 345-6789", department: "Sales", position: "Sales Representative", location: "Chicago Office", manager: "Emily Chen", status: "away" },
  { id: "USR004", name: "Sarah Wilson", email: "sarah.wilson@company.com", phone: "+1 (555) 456-7890", department: "Engineering", position: "Engineering Director", location: "New York Office", manager: "CEO", status: "online" },
  { id: "USR005", name: "David Kim", email: "david.kim@company.com", phone: "+1 (555) 567-8901", department: "Finance", position: "Financial Analyst", location: "New York Office", manager: "Lisa Park", status: "offline" },
  { id: "USR006", name: "Jessica Martinez", email: "jessica.martinez@company.com", phone: "+1 (555) 678-9012", department: "HR", position: "HR Specialist", location: "Los Angeles Office", manager: "Amanda Lee", status: "online" },
  { id: "USR007", name: "Robert Taylor", email: "robert.taylor@company.com", phone: "+1 (555) 789-0123", department: "Engineering", position: "Junior Developer", location: "New York Office", manager: "John Anderson", status: "online" },
  { id: "USR008", name: "Amanda Lee", email: "amanda.lee@company.com", phone: "+1 (555) 890-1234", department: "HR", position: "HR Director", location: "New York Office", manager: "CEO", status: "busy" },
  { id: "USR009", name: "Chris Johnson", email: "chris.johnson@company.com", phone: "+1 (555) 901-2345", department: "Operations", position: "Operations Manager", location: "Chicago Office", manager: "CEO", status: "online" },
  { id: "USR010", name: "Lisa Park", email: "lisa.park@company.com", phone: "+1 (555) 012-3456", department: "Finance", position: "Finance Director", location: "New York Office", manager: "CEO", status: "away" }
];

// Helper functions
export const getStatusColor = (status: ChatUser['status']): string => {
  const colors: Record<ChatUser['status'], string> = {
    online: '#10b981',
    away: '#f59e0b',
    busy: '#ef4444',
    offline: '#64748b',
  };
  return colors[status];
};

export const getPriorityColor = (priority: Announcement['priority']): string => {
  const colors: Record<Announcement['priority'], string> = {
    high: '#ef4444',
    normal: '#3b82f6',
    low: '#64748b',
  };
  return colors[priority];
};

export const getUserById = (id: string): ChatUser | undefined => {
  return chatUsers.find(u => u.id === id);
};

export const getEmployeeById = (id: string): Employee | undefined => {
  return employeeDirectory.find(e => e.id === id);
};
