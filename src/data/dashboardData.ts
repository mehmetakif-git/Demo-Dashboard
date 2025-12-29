export const revenueData = [
  { month: "Jan", value: 45000 },
  { month: "Feb", value: 52000 },
  { month: "Mar", value: 48000 },
  { month: "Apr", value: 61000 },
  { month: "May", value: 55000 },
  { month: "Jun", value: 67000 },
  { month: "Jul", value: 72000 },
  { month: "Aug", value: 69000 },
  { month: "Sep", value: 78000 },
  { month: "Oct", value: 85000 },
  { month: "Nov", value: 92000 },
  { month: "Dec", value: 98000 },
];

export const taskStatusData = [
  { name: "Completed", value: 45, color: "#10b981" },
  { name: "In Progress", value: 28, color: "#6366f1" },
  { name: "Pending", value: 23, color: "#f59e0b" },
  { name: "Overdue", value: 8, color: "#ef4444" },
];

export const recentActivities = [
  { id: 1, icon: "user", color: "#10b981", text: "New member registered: John Smith", time: "2 hours ago" },
  { id: 2, icon: "dollar", color: "#6366f1", text: "Invoice #1234 was paid", time: "3 hours ago" },
  { id: 3, icon: "check", color: "#10b981", text: "Task completed: Website redesign", time: "5 hours ago" },
  { id: 4, icon: "ticket", color: "#f59e0b", text: "New support ticket opened", time: "6 hours ago" },
  { id: 5, icon: "calendar", color: "#8b5cf6", text: "Employee leave approved", time: "8 hours ago" },
  { id: 6, icon: "file", color: "#6366f1", text: "Monthly report generated", time: "1 day ago" },
];

export const upcomingTasks = [
  { id: 1, title: "Review Q4 marketing plan", dueDate: "Today", priority: "high" as const, assignee: "JD" },
  { id: 2, title: "Client meeting preparation", dueDate: "Tomorrow", priority: "high" as const, assignee: "AS" },
  { id: 3, title: "Update employee handbook", dueDate: "Dec 28", priority: "medium" as const, assignee: "MK" },
  { id: 4, title: "Server maintenance", dueDate: "Dec 29", priority: "medium" as const, assignee: "RW" },
  { id: 5, title: "Annual report draft", dueDate: "Dec 30", priority: "low" as const, assignee: "LP" },
];

export const kpiData = {
  totalRevenue: {
    value: 124580,
    change: "+12.5%",
    changeType: "positive" as const,
    label: "from last month",
  },
  activeClients: {
    value: 1248,
    change: "+3.2%",
    changeType: "positive" as const,
    label: "from last month",
  },
  pendingTasks: {
    value: 23,
    change: "5 urgent",
    changeType: "warning" as const,
    label: "",
  },
  growthRate: {
    value: 18.2,
    change: "On track",
    changeType: "positive" as const,
    label: "",
  },
};
