import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Users, UserCheck, UserX, Building2, Plus, Eye, Pencil, Trash2 } from 'lucide-react';
import {
  PageHeader,
  StatsCard,
  FilterBar,
  DataTable,
  StatusBadge,
  Avatar,
} from '@/components/common';
import { employees, departments } from '@/data/hrData';
import type { Employee } from '@/data/hrData';
import { profileImages } from '@/utils/profileImages';
import { useTranslation } from 'react-i18next';

const ITEMS_PER_PAGE = 10;

export const EmployeeList = () => {
  const { t } = useTranslation('common');
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [viewMode, setViewMode] = useState<'table' | 'grid'>('table');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedEmployees, setSelectedEmployees] = useState<string[]>([]);

  // Stats
  const stats = useMemo(() => ({
    total: employees.length,
    active: employees.filter((e) => e.status === 'active').length,
    onLeave: employees.filter((e) => e.status === 'on-leave').length,
    departments: departments.length,
  }), []);

  // Filtered employees
  const filteredEmployees = useMemo(() => {
    return employees.filter((employee) => {
      const matchesSearch =
        employee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        employee.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        employee.id.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesDepartment =
        departmentFilter === 'all' || employee.department === departmentFilter;
      const matchesStatus =
        statusFilter === 'all' || employee.status === statusFilter;
      return matchesSearch && matchesDepartment && matchesStatus;
    });
  }, [searchQuery, departmentFilter, statusFilter]);

  // Pagination
  const totalPages = Math.ceil(filteredEmployees.length / ITEMS_PER_PAGE);
  const paginatedEmployees = filteredEmployees.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const columns = [
    {
      key: 'employee',
      header: 'Employee',
      render: (employee: Employee) => (
        <div className="flex items-center gap-3">
          <Avatar name={employee.name} src={profileImages[employee.name]} size="sm" />
          <div>
            <p className="font-medium text-white">{employee.name}</p>
            <p className="text-xs text-white/40">{employee.email}</p>
          </div>
        </div>
      ),
    },
    {
      key: 'id',
      header: 'ID',
      render: (employee: Employee) => (
        <span className="text-white/60 font-mono text-xs">{employee.id}</span>
      ),
    },
    {
      key: 'department',
      header: 'Department',
      render: (employee: Employee) => (
        <span className="text-white/80">{employee.department}</span>
      ),
    },
    {
      key: 'position',
      header: 'Position',
      render: (employee: Employee) => (
        <span className="text-white/80">{employee.position}</span>
      ),
    },
    {
      key: 'status',
      header: 'Status',
      render: (employee: Employee) => <StatusBadge status={employee.status} />,
    },
    {
      key: 'startDate',
      header: 'Start Date',
      render: (employee: Employee) => (
        <span className="text-white/60">
          {new Date(employee.startDate).toLocaleDateString()}
        </span>
      ),
    },
    {
      key: 'actions',
      header: 'Actions',
      render: (employee: Employee) => (
        <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
          <button
            onClick={() => navigate(`/dashboard/hr/employees/${employee.id}`)}
            className="p-2 rounded-lg text-white/40 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
            title="View"
          >
            <Eye className="w-4 h-4" />
          </button>
          <button
            className="p-2 rounded-lg text-white/40 hover:text-[#547792] hover:bg-[#547792]/10 transition-colors cursor-pointer"
            title="Edit"
          >
            <Pencil className="w-4 h-4" />
          </button>
          <button
            className="p-2 rounded-lg text-white/40 hover:text-red-400 hover:bg-red-400/10 transition-colors cursor-pointer"
            title="Delete"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="p-6 space-y-6">
      <PageHeader
        title={t('hr.employees', 'Employees')}
        subtitle={`Manage your team of ${stats.total} employees`}
        icon={Users}
        actions={
          <button className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-[#547792] to-[#94B4C1] hover:opacity-90 text-white font-medium rounded-lg transition-opacity cursor-pointer">
            <Plus className="w-4 h-4" />
            Add Employee
          </button>
        }
      />

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Total Employees"
          value={stats.total}
          icon={Users}
          iconColor="#547792"
          iconBg="rgba(84, 119, 146, 0.2)"
          delay={0.1}
        />
        <StatsCard
          title="Active"
          value={stats.active}
          icon={UserCheck}
          iconColor="#10b981"
          iconBg="rgba(16, 185, 129, 0.2)"
          delay={0.15}
        />
        <StatsCard
          title="On Leave"
          value={stats.onLeave}
          icon={UserX}
          iconColor="#f59e0b"
          iconBg="rgba(245, 158, 11, 0.2)"
          delay={0.2}
        />
        <StatsCard
          title="Departments"
          value={stats.departments}
          icon={Building2}
          iconColor="#94B4C1"
          iconBg="rgba(148, 180, 193, 0.2)"
          delay={0.25}
        />
      </div>

      {/* Filters */}
      <FilterBar
        searchValue={searchQuery}
        onSearchChange={setSearchQuery}
        searchPlaceholder="Search by name, email, or ID..."
        filters={[
          {
            name: 'department',
            value: departmentFilter,
            onChange: setDepartmentFilter,
            options: [
              { value: 'all', label: 'All Departments' },
              ...departments.map((d) => ({ value: d.name, label: d.name })),
            ],
          },
          {
            name: 'status',
            value: statusFilter,
            onChange: setStatusFilter,
            options: [
              { value: 'all', label: 'All Status' },
              { value: 'active', label: 'Active' },
              { value: 'on-leave', label: 'On Leave' },
              { value: 'inactive', label: 'Inactive' },
            ],
          },
        ]}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        showViewToggle
      />

      {/* Table or Grid */}
      {viewMode === 'table' ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] rounded-xl overflow-hidden"
        >
          <DataTable
            columns={columns}
            data={paginatedEmployees}
            keyExtractor={(e) => e.id}
            onRowClick={(e) => navigate(`/dashboard/hr/employees/${e.id}`)}
            selectable
            selectedItems={selectedEmployees}
            onSelectionChange={setSelectedEmployees}
            emptyMessage="No employees found"
            pagination={{
              currentPage,
              totalPages,
              totalItems: filteredEmployees.length,
              itemsPerPage: ITEMS_PER_PAGE,
              onPageChange: setCurrentPage,
            }}
          />
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
        >
          {paginatedEmployees.map((employee, index) => (
            <motion.div
              key={employee.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              onClick={() => navigate(`/dashboard/hr/employees/${employee.id}`)}
              className="bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] rounded-xl p-4 hover:border-accent-primary/30 transition-colors cursor-pointer"
            >
              <div className="flex items-start justify-between mb-4">
                <Avatar name={employee.name} src={profileImages[employee.name]} size="lg" />
                <StatusBadge status={employee.status} size="sm" />
              </div>
              <h3 className="font-medium text-white mb-1">{employee.name}</h3>
              <p className="text-sm text-white/60 mb-2">{employee.position}</p>
              <p className="text-xs text-white/40">{employee.department}</p>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
};
