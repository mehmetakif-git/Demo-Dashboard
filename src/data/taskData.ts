import { CheckSquare, Calendar, LayoutGrid, FolderKanban, CalendarDays } from 'lucide-react';

export interface Subtask {
  id: number;
  title: string;
  completed: boolean;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  project: string;
  projectId: string;
  status: 'todo' | 'in-progress' | 'review' | 'done';
  priority: 'urgent' | 'high' | 'medium' | 'low';
  assignee: string;
  assigneeId: string;
  reporter: string;
  dueDate: string;
  createdAt: string;
  updatedAt: string;
  tags: string[];
  subtasks: Subtask[];
  comments: number;
  attachments: number;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'planning' | 'completed' | 'on-hold';
  priority: 'urgent' | 'high' | 'medium' | 'low';
  progress: number;
  startDate: string;
  endDate: string;
  owner: string;
  team: string[];
  totalTasks: number;
  completedTasks: number;
  color: string;
}

export interface TaskStatus {
  id: string;
  name: string;
  color: string;
}

export interface TaskPriority {
  id: string;
  name: string;
  color: string;
}

export interface CalendarEvent {
  id: number;
  title: string;
  date: string;
  type: 'task' | 'meeting' | 'deadline';
  priority: 'urgent' | 'high' | 'medium' | 'low';
}

export const tasks: Task[] = [
  {
    id: "TSK001",
    title: "Review Q4 marketing plan",
    description: "Review and provide feedback on the Q4 marketing strategy document. Focus on budget allocation and campaign timelines.",
    project: "Marketing Campaign 2025",
    projectId: "PRJ001",
    status: "in-progress",
    priority: "high",
    assignee: "John Anderson",
    assigneeId: "EMP001",
    reporter: "Sarah Wilson",
    dueDate: "2024-12-22",
    createdAt: "2024-12-15",
    updatedAt: "2024-12-20",
    tags: ["marketing", "review", "q4"],
    subtasks: [
      { id: 1, title: "Review budget section", completed: true },
      { id: 2, title: "Check campaign timelines", completed: true },
      { id: 3, title: "Provide written feedback", completed: false }
    ],
    comments: 5,
    attachments: 2
  },
  {
    id: "TSK002",
    title: "Prepare client presentation",
    description: "Create presentation deck for Acme Corporation quarterly business review meeting.",
    project: "Client Management",
    projectId: "PRJ002",
    status: "todo",
    priority: "high",
    assignee: "Emily Chen",
    assigneeId: "EMP002",
    reporter: "John Anderson",
    dueDate: "2024-12-23",
    createdAt: "2024-12-18",
    updatedAt: "2024-12-18",
    tags: ["presentation", "client", "acme"],
    subtasks: [
      { id: 1, title: "Gather performance metrics", completed: false },
      { id: 2, title: "Design slide deck", completed: false },
      { id: 3, title: "Review with manager", completed: false }
    ],
    comments: 2,
    attachments: 0
  },
  {
    id: "TSK003",
    title: "Fix login page bug",
    description: "Users reporting intermittent login failures. Investigate and resolve the authentication issue.",
    project: "Platform Development",
    projectId: "PRJ003",
    status: "in-progress",
    priority: "urgent",
    assignee: "Robert Taylor",
    assigneeId: "EMP007",
    reporter: "Sarah Wilson",
    dueDate: "2024-12-21",
    createdAt: "2024-12-19",
    updatedAt: "2024-12-20",
    tags: ["bug", "authentication", "critical"],
    subtasks: [
      { id: 1, title: "Reproduce the issue", completed: true },
      { id: 2, title: "Identify root cause", completed: true },
      { id: 3, title: "Implement fix", completed: false },
      { id: 4, title: "Test solution", completed: false }
    ],
    comments: 8,
    attachments: 1
  },
  {
    id: "TSK004",
    title: "Update employee handbook",
    description: "Incorporate new remote work policies and updated benefits information into the employee handbook.",
    project: "HR Initiatives",
    projectId: "PRJ004",
    status: "todo",
    priority: "medium",
    assignee: "Jessica Martinez",
    assigneeId: "EMP006",
    reporter: "Amanda Lee",
    dueDate: "2024-12-28",
    createdAt: "2024-12-10",
    updatedAt: "2024-12-15",
    tags: ["hr", "documentation", "policy"],
    subtasks: [
      { id: 1, title: "Draft remote work section", completed: false },
      { id: 2, title: "Update benefits pages", completed: false },
      { id: 3, title: "Legal review", completed: false }
    ],
    comments: 3,
    attachments: 4
  },
  {
    id: "TSK005",
    title: "Server maintenance",
    description: "Perform scheduled maintenance on production servers. Includes security patches and performance optimization.",
    project: "IT Operations",
    projectId: "PRJ005",
    status: "todo",
    priority: "medium",
    assignee: "Chris Johnson",
    assigneeId: "EMP009",
    reporter: "Sarah Wilson",
    dueDate: "2024-12-29",
    createdAt: "2024-12-12",
    updatedAt: "2024-12-12",
    tags: ["maintenance", "server", "it"],
    subtasks: [
      { id: 1, title: "Backup all data", completed: false },
      { id: 2, title: "Apply security patches", completed: false },
      { id: 3, title: "Optimize database", completed: false },
      { id: 4, title: "Verify system stability", completed: false }
    ],
    comments: 1,
    attachments: 2
  },
  {
    id: "TSK006",
    title: "Design new landing page",
    description: "Create modern, conversion-optimized landing page design for the new product launch.",
    project: "Website Redesign",
    projectId: "PRJ006",
    status: "review",
    priority: "high",
    assignee: "Emily Chen",
    assigneeId: "EMP002",
    reporter: "Michael Roberts",
    dueDate: "2024-12-24",
    createdAt: "2024-12-08",
    updatedAt: "2024-12-19",
    tags: ["design", "website", "landing-page"],
    subtasks: [
      { id: 1, title: "Create wireframes", completed: true },
      { id: 2, title: "Design mockups", completed: true },
      { id: 3, title: "Stakeholder review", completed: false }
    ],
    comments: 12,
    attachments: 6
  },
  {
    id: "TSK007",
    title: "Quarterly financial report",
    description: "Compile and analyze Q4 financial data for the quarterly report to stakeholders.",
    project: "Finance Operations",
    projectId: "PRJ007",
    status: "in-progress",
    priority: "high",
    assignee: "David Kim",
    assigneeId: "EMP005",
    reporter: "Lisa Park",
    dueDate: "2024-12-30",
    createdAt: "2024-12-01",
    updatedAt: "2024-12-18",
    tags: ["finance", "report", "quarterly"],
    subtasks: [
      { id: 1, title: "Gather revenue data", completed: true },
      { id: 2, title: "Analyze expenses", completed: true },
      { id: 3, title: "Create visualizations", completed: false },
      { id: 4, title: "Write executive summary", completed: false }
    ],
    comments: 4,
    attachments: 3
  },
  {
    id: "TSK008",
    title: "Onboard new team member",
    description: "Complete onboarding process for the new marketing specialist joining on Monday.",
    project: "HR Initiatives",
    projectId: "PRJ004",
    status: "todo",
    priority: "medium",
    assignee: "Amanda Lee",
    assigneeId: "EMP008",
    reporter: "Amanda Lee",
    dueDate: "2024-12-23",
    createdAt: "2024-12-17",
    updatedAt: "2024-12-17",
    tags: ["onboarding", "hr", "new-hire"],
    subtasks: [
      { id: 1, title: "Prepare workstation", completed: false },
      { id: 2, title: "Create accounts", completed: false },
      { id: 3, title: "Schedule orientation", completed: false },
      { id: 4, title: "Assign mentor", completed: false }
    ],
    comments: 2,
    attachments: 1
  },
  {
    id: "TSK009",
    title: "API documentation update",
    description: "Update API documentation to reflect new endpoints and deprecated features.",
    project: "Platform Development",
    projectId: "PRJ003",
    status: "done",
    priority: "low",
    assignee: "John Anderson",
    assigneeId: "EMP001",
    reporter: "Sarah Wilson",
    dueDate: "2024-12-18",
    createdAt: "2024-12-10",
    updatedAt: "2024-12-17",
    tags: ["documentation", "api", "development"],
    subtasks: [
      { id: 1, title: "Document new endpoints", completed: true },
      { id: 2, title: "Mark deprecated features", completed: true },
      { id: 3, title: "Update code examples", completed: true }
    ],
    comments: 6,
    attachments: 0
  },
  {
    id: "TSK010",
    title: "Customer feedback analysis",
    description: "Analyze recent customer feedback and NPS survey results to identify improvement areas.",
    project: "Client Management",
    projectId: "PRJ002",
    status: "done",
    priority: "medium",
    assignee: "Michael Roberts",
    assigneeId: "EMP003",
    reporter: "Emily Chen",
    dueDate: "2024-12-15",
    createdAt: "2024-12-05",
    updatedAt: "2024-12-15",
    tags: ["customer", "feedback", "analysis"],
    subtasks: [
      { id: 1, title: "Export survey data", completed: true },
      { id: 2, title: "Categorize feedback", completed: true },
      { id: 3, title: "Create summary report", completed: true }
    ],
    comments: 7,
    attachments: 2
  },
  {
    id: "TSK011",
    title: "Social media content calendar",
    description: "Plan and schedule social media content for January 2025.",
    project: "Marketing Campaign 2025",
    projectId: "PRJ001",
    status: "todo",
    priority: "low",
    assignee: "Emily Chen",
    assigneeId: "EMP002",
    reporter: "Michael Roberts",
    dueDate: "2024-12-27",
    createdAt: "2024-12-18",
    updatedAt: "2024-12-18",
    tags: ["social-media", "content", "planning"],
    subtasks: [
      { id: 1, title: "Research trending topics", completed: false },
      { id: 2, title: "Create content drafts", completed: false },
      { id: 3, title: "Design graphics", completed: false },
      { id: 4, title: "Schedule posts", completed: false }
    ],
    comments: 0,
    attachments: 0
  },
  {
    id: "TSK012",
    title: "Vendor contract negotiation",
    description: "Negotiate renewal terms with software vendor for better pricing.",
    project: "Finance Operations",
    projectId: "PRJ007",
    status: "in-progress",
    priority: "medium",
    assignee: "Lisa Park",
    assigneeId: "EMP010",
    reporter: "Chris Johnson",
    dueDate: "2024-12-26",
    createdAt: "2024-12-14",
    updatedAt: "2024-12-20",
    tags: ["vendor", "negotiation", "contract"],
    subtasks: [
      { id: 1, title: "Review current terms", completed: true },
      { id: 2, title: "Prepare counter-proposal", completed: true },
      { id: 3, title: "Schedule meeting", completed: false },
      { id: 4, title: "Finalize agreement", completed: false }
    ],
    comments: 4,
    attachments: 3
  }
];

export const projects: Project[] = [
  {
    id: "PRJ001",
    name: "Marketing Campaign 2025",
    description: "Plan and execute comprehensive marketing campaign for 2025 product launches.",
    status: "active",
    priority: "high",
    progress: 35,
    startDate: "2024-12-01",
    endDate: "2025-03-31",
    owner: "Emily Chen",
    team: ["Emily Chen", "Michael Roberts", "John Anderson"],
    totalTasks: 12,
    completedTasks: 4,
    color: "#6366f1"
  },
  {
    id: "PRJ002",
    name: "Client Management",
    description: "Ongoing client relationship management and satisfaction initiatives.",
    status: "active",
    priority: "high",
    progress: 60,
    startDate: "2024-10-01",
    endDate: "2025-01-31",
    owner: "John Anderson",
    team: ["John Anderson", "Michael Roberts", "Sarah Wilson"],
    totalTasks: 8,
    completedTasks: 5,
    color: "#8b5cf6"
  },
  {
    id: "PRJ003",
    name: "Platform Development",
    description: "Core platform improvements and new feature development.",
    status: "active",
    priority: "urgent",
    progress: 45,
    startDate: "2024-11-01",
    endDate: "2025-02-28",
    owner: "Sarah Wilson",
    team: ["Sarah Wilson", "Robert Taylor", "John Anderson"],
    totalTasks: 15,
    completedTasks: 7,
    color: "#10b981"
  },
  {
    id: "PRJ004",
    name: "HR Initiatives",
    description: "Human resources improvement projects and policy updates.",
    status: "active",
    priority: "medium",
    progress: 25,
    startDate: "2024-12-01",
    endDate: "2025-02-28",
    owner: "Amanda Lee",
    team: ["Amanda Lee", "Jessica Martinez"],
    totalTasks: 10,
    completedTasks: 2,
    color: "#f59e0b"
  },
  {
    id: "PRJ005",
    name: "IT Operations",
    description: "Infrastructure maintenance and system improvements.",
    status: "active",
    priority: "medium",
    progress: 50,
    startDate: "2024-11-15",
    endDate: "2025-01-15",
    owner: "Chris Johnson",
    team: ["Chris Johnson", "Robert Taylor"],
    totalTasks: 6,
    completedTasks: 3,
    color: "#ec4899"
  },
  {
    id: "PRJ006",
    name: "Website Redesign",
    description: "Complete redesign of company website with modern UX.",
    status: "active",
    priority: "high",
    progress: 70,
    startDate: "2024-10-15",
    endDate: "2024-12-31",
    owner: "Emily Chen",
    team: ["Emily Chen", "Robert Taylor", "Michael Roberts"],
    totalTasks: 10,
    completedTasks: 7,
    color: "#14b8a6"
  },
  {
    id: "PRJ007",
    name: "Finance Operations",
    description: "Financial process improvements and reporting enhancements.",
    status: "active",
    priority: "medium",
    progress: 40,
    startDate: "2024-11-01",
    endDate: "2025-01-31",
    owner: "Lisa Park",
    team: ["Lisa Park", "David Kim"],
    totalTasks: 8,
    completedTasks: 3,
    color: "#f97316"
  },
  {
    id: "PRJ008",
    name: "Product Launch Q1",
    description: "Launch preparation for new product line in Q1 2025.",
    status: "planning",
    priority: "high",
    progress: 10,
    startDate: "2025-01-01",
    endDate: "2025-03-15",
    owner: "Sarah Wilson",
    team: ["Sarah Wilson", "Emily Chen", "John Anderson", "Michael Roberts"],
    totalTasks: 20,
    completedTasks: 2,
    color: "#a855f7"
  }
];

export const taskStatuses: TaskStatus[] = [
  { id: "todo", name: "To Do", color: "#64748b" },
  { id: "in-progress", name: "In Progress", color: "#6366f1" },
  { id: "review", name: "In Review", color: "#f59e0b" },
  { id: "done", name: "Done", color: "#10b981" }
];

export const taskPriorities: TaskPriority[] = [
  { id: "urgent", name: "Urgent", color: "#ef4444" },
  { id: "high", name: "High", color: "#f59e0b" },
  { id: "medium", name: "Medium", color: "#6366f1" },
  { id: "low", name: "Low", color: "#64748b" }
];

export const calendarEvents: CalendarEvent[] = [
  { id: 1, title: "Review Q4 marketing plan", date: "2024-12-22", type: "task", priority: "high" },
  { id: 2, title: "Client presentation - Acme", date: "2024-12-23", type: "task", priority: "high" },
  { id: 3, title: "Fix login page bug", date: "2024-12-21", type: "task", priority: "urgent" },
  { id: 4, title: "Team standup", date: "2024-12-23", type: "meeting", priority: "medium" },
  { id: 5, title: "Design review meeting", date: "2024-12-24", type: "meeting", priority: "high" },
  { id: 6, title: "Sprint planning", date: "2024-12-26", type: "meeting", priority: "medium" },
  { id: 7, title: "Server maintenance window", date: "2024-12-29", type: "task", priority: "medium" },
  { id: 8, title: "Quarterly report due", date: "2024-12-30", type: "deadline", priority: "high" }
];

// Task menu items for sidebar
export const taskMenuItems = [
  {
    label: 'My Tasks',
    path: '/dashboard/tasks/my-tasks',
    icon: CheckSquare,
  },
  {
    label: 'All Tasks',
    path: '/dashboard/tasks/all-tasks',
    icon: LayoutGrid,
  },
  {
    label: 'Kanban Board',
    path: '/dashboard/tasks/kanban',
    icon: FolderKanban,
  },
  {
    label: 'Calendar',
    path: '/dashboard/tasks/calendar',
    icon: CalendarDays,
  },
  {
    label: 'Projects',
    path: '/dashboard/tasks/projects',
    icon: Calendar,
  },
];

// Helper functions
export const getTasksByStatus = (status: string): Task[] => {
  return tasks.filter(task => task.status === status);
};

export const getTasksByProject = (projectId: string): Task[] => {
  return tasks.filter(task => task.projectId === projectId);
};

export const getTasksByAssignee = (assigneeId: string): Task[] => {
  return tasks.filter(task => task.assigneeId === assigneeId);
};

export const getProjectById = (id: string): Project | undefined => {
  return projects.find(project => project.id === id);
};

export const getTaskById = (id: string): Task | undefined => {
  return tasks.find(task => task.id === id);
};

export const getPriorityColor = (priority: string): string => {
  const found = taskPriorities.find(p => p.id === priority);
  return found?.color || '#64748b';
};

export const getStatusColor = (status: string): string => {
  const found = taskStatuses.find(s => s.id === status);
  return found?.color || '#64748b';
};

export const getStatusName = (status: string): string => {
  const found = taskStatuses.find(s => s.id === status);
  return found?.name || status;
};

export const getPriorityName = (priority: string): string => {
  const found = taskPriorities.find(p => p.id === priority);
  return found?.name || priority;
};
