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
