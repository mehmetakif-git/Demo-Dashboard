import { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '@/store/authStore';
import { useAppStore } from '@/store/appStore';
import { Layout } from '@/components/layout';
import { ToastContainer, Skeleton } from '@/components/common';
import { ROUTES } from '@/utils/constants';

// Lazy load pages for performance
const Login = lazy(() =>
  import('@/pages/auth/Login').then((module) => ({ default: module.Login }))
);
const SectorSelect = lazy(() =>
  import('@/pages/onboarding/SectorSelect').then((module) => ({
    default: module.SectorSelect,
  }))
);
const AccountTypeSelect = lazy(() =>
  import('@/pages/onboarding/AccountTypeSelect').then((module) => ({
    default: module.AccountTypeSelect,
  }))
);
const Dashboard = lazy(() =>
  import('@/pages/dashboard/Dashboard').then((module) => ({
    default: module.Dashboard,
  }))
);

// HR Pages
const EmployeeList = lazy(() =>
  import('@/pages/dashboard/hr/EmployeeList').then((module) => ({
    default: module.EmployeeList,
  }))
);
const EmployeeDetail = lazy(() =>
  import('@/pages/dashboard/hr/EmployeeDetail').then((module) => ({
    default: module.EmployeeDetail,
  }))
);
const Departments = lazy(() =>
  import('@/pages/dashboard/hr/Departments').then((module) => ({
    default: module.Departments,
  }))
);
const LeaveManagement = lazy(() =>
  import('@/pages/dashboard/hr/LeaveManagement').then((module) => ({
    default: module.LeaveManagement,
  }))
);
const Attendance = lazy(() =>
  import('@/pages/dashboard/hr/Attendance').then((module) => ({
    default: module.Attendance,
  }))
);
const Payroll = lazy(() =>
  import('@/pages/dashboard/hr/Payroll').then((module) => ({
    default: module.Payroll,
  }))
);
const Recruitment = lazy(() =>
  import('@/pages/dashboard/hr/Recruitment').then((module) => ({
    default: module.Recruitment,
  }))
);
const Performance = lazy(() =>
  import('@/pages/dashboard/hr/Performance').then((module) => ({
    default: module.Performance,
  }))
);

// Accounting Pages
const AccountingOverview = lazy(() =>
  import('@/pages/dashboard/accounting/Overview').then((module) => ({
    default: module.Overview,
  }))
);
const Income = lazy(() =>
  import('@/pages/dashboard/accounting/Income').then((module) => ({
    default: module.Income,
  }))
);
const Expenses = lazy(() =>
  import('@/pages/dashboard/accounting/Expenses').then((module) => ({
    default: module.Expenses,
  }))
);
const AccountingInvoices = lazy(() =>
  import('@/pages/dashboard/accounting/Invoices').then((module) => ({
    default: module.Invoices,
  }))
);
const BankAccounts = lazy(() =>
  import('@/pages/dashboard/accounting/BankAccounts').then((module) => ({
    default: module.BankAccounts,
  }))
);
const CashFlow = lazy(() =>
  import('@/pages/dashboard/accounting/CashFlow').then((module) => ({
    default: module.CashFlow,
  }))
);
const Tax = lazy(() =>
  import('@/pages/dashboard/accounting/Tax').then((module) => ({
    default: module.Tax,
  }))
);
const AccountingReports = lazy(() =>
  import('@/pages/dashboard/accounting/Reports').then((module) => ({
    default: module.Reports,
  }))
);

// CRM Pages
const CustomerList = lazy(() =>
  import('@/pages/dashboard/crm/CustomerList').then((module) => ({
    default: module.CustomerList,
  }))
);
const CustomerDetail = lazy(() =>
  import('@/pages/dashboard/crm/CustomerDetail').then((module) => ({
    default: module.CustomerDetail,
  }))
);
const CRMLeads = lazy(() =>
  import('@/pages/dashboard/crm/Leads').then((module) => ({
    default: module.Leads,
  }))
);
const Opportunities = lazy(() =>
  import('@/pages/dashboard/crm/Opportunities').then((module) => ({
    default: module.Opportunities,
  }))
);
const Quotes = lazy(() =>
  import('@/pages/dashboard/crm/Quotes').then((module) => ({
    default: module.Quotes,
  }))
);
const Contracts = lazy(() =>
  import('@/pages/dashboard/crm/Contracts').then((module) => ({
    default: module.Contracts,
  }))
);
const CRMActivities = lazy(() =>
  import('@/pages/dashboard/crm/Activities').then((module) => ({
    default: module.Activities,
  }))
);
const CRMReports = lazy(() =>
  import('@/pages/dashboard/crm/Reports').then((module) => ({
    default: module.Reports,
  }))
);

// Task Pages
const MyTasks = lazy(() =>
  import('@/pages/dashboard/tasks/MyTasks').then((module) => ({
    default: module.MyTasks,
  }))
);
const AllTasks = lazy(() =>
  import('@/pages/dashboard/tasks/AllTasks').then((module) => ({
    default: module.AllTasks,
  }))
);
const Kanban = lazy(() =>
  import('@/pages/dashboard/tasks/Kanban').then((module) => ({
    default: module.Kanban,
  }))
);
const TaskCalendar = lazy(() =>
  import('@/pages/dashboard/tasks/Calendar').then((module) => ({
    default: module.Calendar,
  }))
);
const TaskProjects = lazy(() =>
  import('@/pages/dashboard/tasks/Projects').then((module) => ({
    default: module.Projects,
  }))
);
const ProjectDetail = lazy(() =>
  import('@/pages/dashboard/tasks/ProjectDetail').then((module) => ({
    default: module.ProjectDetail,
  }))
);

// Access Control Pages
const CCTVMonitoring = lazy(() =>
  import('@/pages/dashboard/access-control/CCTVMonitoring').then((module) => ({
    default: module.CCTVMonitoring,
  }))
);
const Cameras = lazy(() =>
  import('@/pages/dashboard/access-control/Cameras').then((module) => ({
    default: module.Cameras,
  }))
);
const Recordings = lazy(() =>
  import('@/pages/dashboard/access-control/Recordings').then((module) => ({
    default: module.Recordings,
  }))
);
const DoorAccess = lazy(() =>
  import('@/pages/dashboard/access-control/DoorAccess').then((module) => ({
    default: module.DoorAccess,
  }))
);
const AccessCards = lazy(() =>
  import('@/pages/dashboard/access-control/AccessCards').then((module) => ({
    default: module.AccessCards,
  }))
);
const AccessLogs = lazy(() =>
  import('@/pages/dashboard/access-control/AccessLogs').then((module) => ({
    default: module.AccessLogs,
  }))
);
const Parking = lazy(() =>
  import('@/pages/dashboard/access-control/Parking').then((module) => ({
    default: module.Parking,
  }))
);
const Visitors = lazy(() =>
  import('@/pages/dashboard/access-control/Visitors').then((module) => ({
    default: module.Visitors,
  }))
);

// Digital Signage Pages
const Displays = lazy(() =>
  import('@/pages/dashboard/signage/Displays').then((module) => ({
    default: module.Displays,
  }))
);
const ContentLibrary = lazy(() =>
  import('@/pages/dashboard/signage/ContentLibrary').then((module) => ({
    default: module.ContentLibrary,
  }))
);
const SignagePlaylists = lazy(() =>
  import('@/pages/dashboard/signage/Playlists').then((module) => ({
    default: module.Playlists,
  }))
);
const SignageSchedule = lazy(() =>
  import('@/pages/dashboard/signage/Schedule').then((module) => ({
    default: module.Schedule,
  }))
);
const Broadcast = lazy(() =>
  import('@/pages/dashboard/signage/Broadcast').then((module) => ({
    default: module.Broadcast,
  }))
);

// Communication Pages
const Chat = lazy(() =>
  import('@/pages/dashboard/communication/Chat').then((module) => ({
    default: module.Chat,
  }))
);
const GroupChats = lazy(() =>
  import('@/pages/dashboard/communication/GroupChats').then((module) => ({
    default: module.GroupChats,
  }))
);
const CommunicationAnnouncements = lazy(() =>
  import('@/pages/dashboard/communication/Announcements').then((module) => ({
    default: module.Announcements,
  }))
);
const CommunicationDirectory = lazy(() =>
  import('@/pages/dashboard/communication/Directory').then((module) => ({
    default: module.Directory,
  }))
);

// File Management Pages
const FileMyFiles = lazy(() =>
  import('@/pages/dashboard/files/MyFiles').then((module) => ({
    default: module.MyFiles,
  }))
);
const FileSharedFiles = lazy(() =>
  import('@/pages/dashboard/files/SharedFiles').then((module) => ({
    default: module.SharedFiles,
  }))
);
const FileProjectFiles = lazy(() =>
  import('@/pages/dashboard/files/ProjectFiles').then((module) => ({
    default: module.ProjectFiles,
  }))
);
const FileRecentFiles = lazy(() =>
  import('@/pages/dashboard/files/RecentFiles').then((module) => ({
    default: module.RecentFiles,
  }))
);
const FileTrash = lazy(() =>
  import('@/pages/dashboard/files/Trash').then((module) => ({
    default: module.Trash,
  }))
);

// Reports Pages
const ReportBuilder = lazy(() =>
  import('@/pages/dashboard/reports/ReportBuilder').then((module) => ({
    default: module.ReportBuilder,
  }))
);
const SavedReports = lazy(() =>
  import('@/pages/dashboard/reports/SavedReports').then((module) => ({
    default: module.SavedReports,
  }))
);
const ExportCenter = lazy(() =>
  import('@/pages/dashboard/reports/ExportCenter').then((module) => ({
    default: module.ExportCenter,
  }))
);
const ImportCenter = lazy(() =>
  import('@/pages/dashboard/reports/ImportCenter').then((module) => ({
    default: module.ImportCenter,
  }))
);
const ReportHistory = lazy(() =>
  import('@/pages/dashboard/reports/History').then((module) => ({
    default: module.History,
  }))
);

// Maintenance Pages
const MaintenanceAssetList = lazy(() =>
  import('@/pages/dashboard/maintenance/AssetList').then((module) => ({
    default: module.AssetList,
  }))
);
const MaintenanceAssetDetail = lazy(() =>
  import('@/pages/dashboard/maintenance/AssetDetail').then((module) => ({
    default: module.AssetDetail,
  }))
);
const MaintenanceWorkOrders = lazy(() =>
  import('@/pages/dashboard/maintenance/WorkOrders').then((module) => ({
    default: module.WorkOrders,
  }))
);
const MaintenancePreventive = lazy(() =>
  import('@/pages/dashboard/maintenance/Preventive').then((module) => ({
    default: module.Preventive,
  }))
);
const MaintenanceRequests = lazy(() =>
  import('@/pages/dashboard/maintenance/Requests').then((module) => ({
    default: module.Requests,
  }))
);
const MaintenanceVendors = lazy(() =>
  import('@/pages/dashboard/maintenance/Vendors').then((module) => ({
    default: module.Vendors,
  }))
);
const MaintenanceInventory = lazy(() =>
  import('@/pages/dashboard/maintenance/Inventory').then((module) => ({
    default: module.Inventory,
  }))
);
const MaintenanceReports = lazy(() =>
  import('@/pages/dashboard/maintenance/Reports').then((module) => ({
    default: module.Reports,
  }))
);

// QR Code Pages
const QRCodeList = lazy(() =>
  import('@/pages/dashboard/qr-codes/QRCodeList').then((module) => ({
    default: module.QRCodeList,
  }))
);
const CreateQRCode = lazy(() =>
  import('@/pages/dashboard/qr-codes/CreateQRCode').then((module) => ({
    default: module.CreateQRCode,
  }))
);
const QRCodeDetail = lazy(() =>
  import('@/pages/dashboard/qr-codes/QRCodeDetail').then((module) => ({
    default: module.QRCodeDetail,
  }))
);
const QRTemplates = lazy(() =>
  import('@/pages/dashboard/qr-codes/Templates').then((module) => ({
    default: module.Templates,
  }))
);
const QRAnalytics = lazy(() =>
  import('@/pages/dashboard/qr-codes/Analytics').then((module) => ({
    default: module.Analytics,
  }))
);
const QRBulkCreate = lazy(() =>
  import('@/pages/dashboard/qr-codes/BulkCreate').then((module) => ({
    default: module.BulkCreate,
  }))
);
const QRDynamic = lazy(() =>
  import('@/pages/dashboard/qr-codes/DynamicQR').then((module) => ({
    default: module.DynamicQR,
  }))
);
const QRFolders = lazy(() =>
  import('@/pages/dashboard/qr-codes/Folders').then((module) => ({
    default: module.Folders,
  }))
);

// Settings Pages
const SettingsCompanyProfile = lazy(() =>
  import('@/pages/dashboard/settings/CompanyProfile').then((module) => ({
    default: module.CompanyProfile,
  }))
);
const SettingsUsers = lazy(() =>
  import('@/pages/dashboard/settings/Users').then((module) => ({
    default: module.Users,
  }))
);
const SettingsRoles = lazy(() =>
  import('@/pages/dashboard/settings/Roles').then((module) => ({
    default: module.Roles,
  }))
);
const SettingsModules = lazy(() =>
  import('@/pages/dashboard/settings/ModuleSettings').then((module) => ({
    default: module.ModuleSettings,
  }))
);
const SettingsAPIKeys = lazy(() =>
  import('@/pages/dashboard/settings/APIKeys').then((module) => ({
    default: module.APIKeys,
  }))
);
const SettingsIntegrations = lazy(() =>
  import('@/pages/dashboard/settings/Integrations').then((module) => ({
    default: module.Integrations,
  }))
);
const SettingsLogs = lazy(() =>
  import('@/pages/dashboard/settings/SystemLogs').then((module) => ({
    default: module.SystemLogs,
  }))
);
const SettingsBackup = lazy(() =>
  import('@/pages/dashboard/settings/Backup').then((module) => ({
    default: module.Backup,
  }))
);
const SettingsNotifications = lazy(() =>
  import('@/pages/dashboard/settings/Notifications').then((module) => ({
    default: module.Notifications,
  }))
);

// Gym Pages
const GymMemberList = lazy(() =>
  import('@/pages/dashboard/gym/MemberList').then((module) => ({
    default: module.MemberList,
  }))
);
const GymMemberDetail = lazy(() =>
  import('@/pages/dashboard/gym/MemberDetail').then((module) => ({
    default: module.MemberDetail,
  }))
);
const GymMembershipPlans = lazy(() =>
  import('@/pages/dashboard/gym/MembershipPlans').then((module) => ({
    default: module.MembershipPlans,
  }))
);
const GymClassSchedule = lazy(() =>
  import('@/pages/dashboard/gym/ClassSchedule').then((module) => ({
    default: module.ClassSchedule,
  }))
);
const GymTrainerList = lazy(() =>
  import('@/pages/dashboard/gym/TrainerList').then((module) => ({
    default: module.TrainerList,
  }))
);
const GymTrainerDetail = lazy(() =>
  import('@/pages/dashboard/gym/TrainerDetail').then((module) => ({
    default: module.TrainerDetail,
  }))
);
const GymEquipment = lazy(() =>
  import('@/pages/dashboard/gym/Equipment').then((module) => ({
    default: module.Equipment,
  }))
);
const GymAttendance = lazy(() =>
  import('@/pages/dashboard/gym/Attendance').then((module) => ({
    default: module.Attendance,
  }))
);
const GymPTSessions = lazy(() =>
  import('@/pages/dashboard/gym/PTSessions').then((module) => ({
    default: module.PTSessions,
  }))
);
const GymAssessments = lazy(() =>
  import('@/pages/dashboard/gym/Assessments').then((module) => ({
    default: module.Assessments,
  }))
);

// Staffing Pages
const StaffingCandidateList = lazy(() =>
  import('@/pages/dashboard/staffing/CandidateList').then((module) => ({
    default: module.CandidateList,
  }))
);
const StaffingCandidateDetail = lazy(() =>
  import('@/pages/dashboard/staffing/CandidateDetail').then((module) => ({
    default: module.CandidateDetail,
  }))
);
const StaffingJobOrders = lazy(() =>
  import('@/pages/dashboard/staffing/JobOrders').then((module) => ({
    default: module.JobOrders,
  }))
);
const StaffingJobOrderDetail = lazy(() =>
  import('@/pages/dashboard/staffing/JobOrderDetail').then((module) => ({
    default: module.JobOrderDetail,
  }))
);
const StaffingPlacements = lazy(() =>
  import('@/pages/dashboard/staffing/Placements').then((module) => ({
    default: module.Placements,
  }))
);
const StaffingClientList = lazy(() =>
  import('@/pages/dashboard/staffing/ClientList').then((module) => ({
    default: module.ClientList,
  }))
);
const StaffingClientDetail = lazy(() =>
  import('@/pages/dashboard/staffing/ClientDetail').then((module) => ({
    default: module.ClientDetail,
  }))
);
const StaffingTimesheets = lazy(() =>
  import('@/pages/dashboard/staffing/Timesheets').then((module) => ({
    default: module.Timesheets,
  }))
);
const StaffingPayroll = lazy(() =>
  import('@/pages/dashboard/staffing/Payroll').then((module) => ({
    default: module.Payroll,
  }))
);
const StaffingCompliance = lazy(() =>
  import('@/pages/dashboard/staffing/Compliance').then((module) => ({
    default: module.Compliance,
  }))
);
const StaffingInterviews = lazy(() =>
  import('@/pages/dashboard/staffing/Interviews').then((module) => ({
    default: module.Interviews,
  }))
);
const StaffingOnboarding = lazy(() =>
  import('@/pages/dashboard/staffing/Onboarding').then((module) => ({
    default: module.Onboarding,
  }))
);

// Loading fallback component
const PageLoader = () => (
  <div className="min-h-screen bg-background-primary flex items-center justify-center">
    <div className="space-y-4 w-full max-w-md px-8">
      <Skeleton width="60%" height={32} className="mx-auto" />
      <Skeleton width="80%" height={16} className="mx-auto" />
      <div className="h-8" />
      <Skeleton width="100%" height={44} />
      <Skeleton width="100%" height={44} />
      <Skeleton width="100%" height={44} />
    </div>
  </div>
);

// Route guard components
const RequireAuth = ({ children }: { children: React.ReactNode }) => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to={ROUTES.login} state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

const RequireSector = ({ children }: { children: React.ReactNode }) => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const selectedSector = useAppStore((state) => state.selectedSector);
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to={ROUTES.login} state={{ from: location }} replace />;
  }

  if (!selectedSector) {
    return <Navigate to={ROUTES.selectSector} replace />;
  }

  return <>{children}</>;
};

const RequireAccountType = ({ children }: { children: React.ReactNode }) => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const selectedSector = useAppStore((state) => state.selectedSector);
  const selectedAccountType = useAppStore((state) => state.selectedAccountType);
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to={ROUTES.login} state={{ from: location }} replace />;
  }

  if (!selectedSector) {
    return <Navigate to={ROUTES.selectSector} replace />;
  }

  if (!selectedAccountType) {
    return <Navigate to={ROUTES.selectAccount} replace />;
  }

  return <>{children}</>;
};

// Redirect authenticated users away from login
const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const selectedSector = useAppStore((state) => state.selectedSector);
  const selectedAccountType = useAppStore((state) => state.selectedAccountType);

  if (isAuthenticated) {
    if (!selectedSector) {
      return <Navigate to={ROUTES.selectSector} replace />;
    }
    if (!selectedAccountType) {
      return <Navigate to={ROUTES.selectAccount} replace />;
    }
    return <Navigate to={ROUTES.dashboard} replace />;
  }

  return <>{children}</>;
};

// Routes wrapper - Layout handles page animations internally
const AppRoutes = () => {
  return (
    <Routes>
      {/* Public routes with their own Suspense */}
      <Route
        path={ROUTES.login}
        element={
          <PublicRoute>
            <Suspense fallback={<PageLoader />}>
              <Login />
            </Suspense>
          </PublicRoute>
        }
      />

      {/* Onboarding routes */}
      <Route
        path={ROUTES.selectSector}
        element={
          <RequireAuth>
            <Suspense fallback={<PageLoader />}>
              <SectorSelect />
            </Suspense>
          </RequireAuth>
        }
      />
      <Route
        path={ROUTES.selectAccount}
        element={
          <RequireSector>
            <Suspense fallback={<PageLoader />}>
              <AccountTypeSelect />
            </Suspense>
          </RequireSector>
        }
      />

      {/* Protected routes with layout - Layout handles Suspense and animations */}
      <Route
        element={
          <RequireAccountType>
            <Layout />
          </RequireAccountType>
        }
      >
        <Route path={ROUTES.dashboard} element={<Dashboard />} />

        {/* HR Routes */}
        <Route path={ROUTES.hr.root} element={<Navigate to={ROUTES.hr.employees} replace />} />
        <Route path={ROUTES.hr.employees} element={<EmployeeList />} />
        <Route path={ROUTES.hr.employeeDetail} element={<EmployeeDetail />} />
        <Route path={ROUTES.hr.departments} element={<Departments />} />
        <Route path={ROUTES.hr.leave} element={<LeaveManagement />} />
        <Route path={ROUTES.hr.attendance} element={<Attendance />} />
        <Route path={ROUTES.hr.payroll} element={<Payroll />} />
        <Route path={ROUTES.hr.recruitment} element={<Recruitment />} />
        <Route path={ROUTES.hr.performance} element={<Performance />} />

        {/* Accounting Routes */}
        <Route path={ROUTES.accounting.root} element={<Navigate to={ROUTES.accounting.overview} replace />} />
        <Route path={ROUTES.accounting.overview} element={<AccountingOverview />} />
        <Route path={ROUTES.accounting.income} element={<Income />} />
        <Route path={ROUTES.accounting.expenses} element={<Expenses />} />
        <Route path={ROUTES.accounting.invoices} element={<AccountingInvoices />} />
        <Route path={ROUTES.accounting.bankAccounts} element={<BankAccounts />} />
        <Route path={ROUTES.accounting.cashFlow} element={<CashFlow />} />
        <Route path={ROUTES.accounting.tax} element={<Tax />} />
        <Route path={ROUTES.accounting.reports} element={<AccountingReports />} />

        {/* CRM Routes */}
        <Route path={ROUTES.crm.root} element={<Navigate to={ROUTES.crm.customers} replace />} />
        <Route path={ROUTES.crm.customers} element={<CustomerList />} />
        <Route path={ROUTES.crm.customerDetail} element={<CustomerDetail />} />
        <Route path={ROUTES.crm.leads} element={<CRMLeads />} />
        <Route path={ROUTES.crm.opportunities} element={<Opportunities />} />
        <Route path={ROUTES.crm.quotes} element={<Quotes />} />
        <Route path={ROUTES.crm.contracts} element={<Contracts />} />
        <Route path={ROUTES.crm.activities} element={<CRMActivities />} />
        <Route path={ROUTES.crm.reports} element={<CRMReports />} />

        {/* Task Routes */}
        <Route path={ROUTES.tasks.root} element={<Navigate to={ROUTES.tasks.myTasks} replace />} />
        <Route path={ROUTES.tasks.myTasks} element={<MyTasks />} />
        <Route path={ROUTES.tasks.allTasks} element={<AllTasks />} />
        <Route path={ROUTES.tasks.kanban} element={<Kanban />} />
        <Route path={ROUTES.tasks.calendar} element={<TaskCalendar />} />
        <Route path={ROUTES.tasks.projects} element={<TaskProjects />} />
        <Route path={ROUTES.tasks.projectDetail} element={<ProjectDetail />} />

        {/* Access Control Routes */}
        <Route path={ROUTES.accessControl.root} element={<Navigate to={ROUTES.accessControl.cctv} replace />} />
        <Route path={ROUTES.accessControl.cctv} element={<CCTVMonitoring />} />
        <Route path={ROUTES.accessControl.cameras} element={<Cameras />} />
        <Route path={ROUTES.accessControl.recordings} element={<Recordings />} />
        <Route path={ROUTES.accessControl.doors} element={<DoorAccess />} />
        <Route path={ROUTES.accessControl.cards} element={<AccessCards />} />
        <Route path={ROUTES.accessControl.logs} element={<AccessLogs />} />
        <Route path={ROUTES.accessControl.parking} element={<Parking />} />
        <Route path={ROUTES.accessControl.visitors} element={<Visitors />} />

        {/* Digital Signage Routes */}
        <Route path={ROUTES.signage.root} element={<Navigate to={ROUTES.signage.displays} replace />} />
        <Route path={ROUTES.signage.displays} element={<Displays />} />
        <Route path={ROUTES.signage.content} element={<ContentLibrary />} />
        <Route path={ROUTES.signage.playlists} element={<SignagePlaylists />} />
        <Route path={ROUTES.signage.schedule} element={<SignageSchedule />} />
        <Route path={ROUTES.signage.broadcast} element={<Broadcast />} />

        {/* Communication Routes */}
        <Route path={ROUTES.communication.root} element={<Navigate to={ROUTES.communication.chat} replace />} />
        <Route path={ROUTES.communication.chat} element={<Chat />} />
        <Route path={ROUTES.communication.groups} element={<GroupChats />} />
        <Route path={ROUTES.communication.announcements} element={<CommunicationAnnouncements />} />
        <Route path={ROUTES.communication.directory} element={<CommunicationDirectory />} />

        {/* File Management Routes */}
        <Route path={ROUTES.files.root} element={<Navigate to={ROUTES.files.myFiles} replace />} />
        <Route path={ROUTES.files.myFiles} element={<FileMyFiles />} />
        <Route path={ROUTES.files.shared} element={<FileSharedFiles />} />
        <Route path={ROUTES.files.projects} element={<FileProjectFiles />} />
        <Route path={ROUTES.files.recent} element={<FileRecentFiles />} />
        <Route path={ROUTES.files.trash} element={<FileTrash />} />

        {/* Reports Routes */}
        <Route path={ROUTES.reports.root} element={<Navigate to={ROUTES.reports.builder} replace />} />
        <Route path={ROUTES.reports.builder} element={<ReportBuilder />} />
        <Route path={ROUTES.reports.saved} element={<SavedReports />} />
        <Route path={ROUTES.reports.export} element={<ExportCenter />} />
        <Route path={ROUTES.reports.import} element={<ImportCenter />} />
        <Route path={ROUTES.reports.history} element={<ReportHistory />} />

        {/* Maintenance Routes */}
        <Route path={ROUTES.maintenance.root} element={<Navigate to={ROUTES.maintenance.assets} replace />} />
        <Route path={ROUTES.maintenance.assets} element={<MaintenanceAssetList />} />
        <Route path={ROUTES.maintenance.assetDetail} element={<MaintenanceAssetDetail />} />
        <Route path={ROUTES.maintenance.workOrders} element={<MaintenanceWorkOrders />} />
        <Route path={ROUTES.maintenance.preventive} element={<MaintenancePreventive />} />
        <Route path={ROUTES.maintenance.requests} element={<MaintenanceRequests />} />
        <Route path={ROUTES.maintenance.vendors} element={<MaintenanceVendors />} />
        <Route path={ROUTES.maintenance.inventory} element={<MaintenanceInventory />} />
        <Route path={ROUTES.maintenance.reports} element={<MaintenanceReports />} />

        {/* QR Code Routes */}
        <Route path={ROUTES.qrCodes.root} element={<Navigate to={ROUTES.qrCodes.list} replace />} />
        <Route path={ROUTES.qrCodes.list} element={<QRCodeList />} />
        <Route path={ROUTES.qrCodes.create} element={<CreateQRCode />} />
        <Route path={ROUTES.qrCodes.detail} element={<QRCodeDetail />} />
        <Route path={ROUTES.qrCodes.templates} element={<QRTemplates />} />
        <Route path={ROUTES.qrCodes.analytics} element={<QRAnalytics />} />
        <Route path={ROUTES.qrCodes.bulk} element={<QRBulkCreate />} />
        <Route path={ROUTES.qrCodes.dynamic} element={<QRDynamic />} />
        <Route path={ROUTES.qrCodes.folders} element={<QRFolders />} />

        {/* Settings Routes */}
        <Route path={ROUTES.settings.root} element={<Navigate to={ROUTES.settings.company} replace />} />
        <Route path={ROUTES.settings.company} element={<SettingsCompanyProfile />} />
        <Route path={ROUTES.settings.users} element={<SettingsUsers />} />
        <Route path={ROUTES.settings.roles} element={<SettingsRoles />} />
        <Route path={ROUTES.settings.modules} element={<SettingsModules />} />
        <Route path={ROUTES.settings.api} element={<SettingsAPIKeys />} />
        <Route path={ROUTES.settings.integrations} element={<SettingsIntegrations />} />
        <Route path={ROUTES.settings.logs} element={<SettingsLogs />} />
        <Route path={ROUTES.settings.backup} element={<SettingsBackup />} />
        <Route path={ROUTES.settings.notifications} element={<SettingsNotifications />} />

        {/* Gym Routes (Sector-specific) */}
        <Route path={ROUTES.gym.root} element={<Navigate to={ROUTES.gym.members} replace />} />
        <Route path={ROUTES.gym.members} element={<GymMemberList />} />
        <Route path={ROUTES.gym.memberDetail} element={<GymMemberDetail />} />
        <Route path={ROUTES.gym.memberships} element={<GymMembershipPlans />} />
        <Route path={ROUTES.gym.classes} element={<GymClassSchedule />} />
        <Route path={ROUTES.gym.trainers} element={<GymTrainerList />} />
        <Route path={ROUTES.gym.trainerDetail} element={<GymTrainerDetail />} />
        <Route path={ROUTES.gym.equipment} element={<GymEquipment />} />
        <Route path={ROUTES.gym.attendance} element={<GymAttendance />} />
        <Route path={ROUTES.gym.ptSessions} element={<GymPTSessions />} />
        <Route path={ROUTES.gym.assessments} element={<GymAssessments />} />

        {/* Staffing Routes (Sector-specific) */}
        <Route path={ROUTES.staffing.root} element={<Navigate to={ROUTES.staffing.candidates} replace />} />
        <Route path={ROUTES.staffing.candidates} element={<StaffingCandidateList />} />
        <Route path={ROUTES.staffing.candidateDetail} element={<StaffingCandidateDetail />} />
        <Route path={ROUTES.staffing.jobs} element={<StaffingJobOrders />} />
        <Route path={ROUTES.staffing.jobDetail} element={<StaffingJobOrderDetail />} />
        <Route path={ROUTES.staffing.placements} element={<StaffingPlacements />} />
        <Route path={ROUTES.staffing.clients} element={<StaffingClientList />} />
        <Route path={ROUTES.staffing.clientDetail} element={<StaffingClientDetail />} />
        <Route path={ROUTES.staffing.timesheets} element={<StaffingTimesheets />} />
        <Route path={ROUTES.staffing.payroll} element={<StaffingPayroll />} />
        <Route path={ROUTES.staffing.compliance} element={<StaffingCompliance />} />
        <Route path={ROUTES.staffing.interviews} element={<StaffingInterviews />} />
        <Route path={ROUTES.staffing.onboarding} element={<StaffingOnboarding />} />
      </Route>

      {/* Default redirect */}
      <Route path="/" element={<Navigate to={ROUTES.login} replace />} />
      <Route path="*" element={<Navigate to={ROUTES.login} replace />} />
    </Routes>
  );
};

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;
