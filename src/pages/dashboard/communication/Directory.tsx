import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  Search,
  Grid3X3,
  List,
  Mail,
  Phone,
  MapPin,
  Building2,
  X,
  MessageSquare,
  Video,
  UserCircle,
  Users,
  Wifi,
} from 'lucide-react';
import { PageHeader, Card, Input, Button } from '@/components/common';
import { employeeDirectory, getStatusColor, type Employee } from '@/data/communicationData';

export const Directory = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState<string>('all');
  const [selectedLocation, setSelectedLocation] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);

  const departments = useMemo(() => {
    const depts = [...new Set(employeeDirectory.map((e: Employee) => e.department))];
    return depts.sort();
  }, []);

  const locations = useMemo(() => {
    const locs = [...new Set(employeeDirectory.map((e: Employee) => e.location))];
    return locs.sort();
  }, []);

  const filteredEmployees = useMemo(() => {
    let filtered = [...employeeDirectory];

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        e =>
          e.name.toLowerCase().includes(query) ||
          e.email.toLowerCase().includes(query) ||
          e.department.toLowerCase().includes(query) ||
          e.position.toLowerCase().includes(query)
      );
    }

    if (selectedDepartment !== 'all') {
      filtered = filtered.filter(e => e.department === selectedDepartment);
    }

    if (selectedLocation !== 'all') {
      filtered = filtered.filter(e => e.location === selectedLocation);
    }

    if (selectedStatus !== 'all') {
      filtered = filtered.filter(e => e.status === selectedStatus);
    }

    return filtered.sort((a, b) => a.name.localeCompare(b.name));
  }, [searchQuery, selectedDepartment, selectedLocation, selectedStatus]);

  const onlineCount = useMemo(() => {
    return employeeDirectory.filter((e: Employee) => e.status === 'online').length;
  }, []);

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const EmployeeCard = ({ employee }: { employee: Employee }) => (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ y: -2 }}
    >
      <Card
        className="p-5 hover:shadow-lg transition-all cursor-pointer"
        onClick={() => setSelectedEmployee(employee)}
      >
        {/* Avatar & Status */}
        <div className="flex flex-col items-center mb-4">
          <div className="relative">
            <div className="w-16 h-16 rounded-full bg-accent-primary/20 flex items-center justify-center">
              <span className="text-xl font-bold text-accent-primary">
                {getInitials(employee.name)}
              </span>
            </div>
            <div
              className="absolute bottom-0 right-0 w-4 h-4 rounded-full border-2 border-background-secondary"
              style={{ backgroundColor: getStatusColor(employee.status) }}
            />
          </div>
          <h3 className="font-semibold text-text-primary mt-3 text-center">{employee.name}</h3>
          <p className="text-sm text-text-secondary text-center">{employee.position}</p>
        </div>

        {/* Info */}
        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2 text-text-muted">
            <Building2 size={14} />
            <span className="truncate">{employee.department}</span>
          </div>
          <div className="flex items-center gap-2 text-text-muted">
            <MapPin size={14} />
            <span className="truncate">{employee.location}</span>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex items-center justify-center gap-2 mt-4 pt-4 border-t border-border-default">
          <button
            onClick={(e) => { e.stopPropagation(); window.location.href = `mailto:${employee.email}`; }}
            className="p-2 hover:bg-background-tertiary rounded-lg transition-colors"
          >
            <Mail size={16} className="text-text-secondary hover:text-accent-primary" />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); window.location.href = `tel:${employee.phone}`; }}
            className="p-2 hover:bg-background-tertiary rounded-lg transition-colors"
          >
            <Phone size={16} className="text-text-secondary hover:text-accent-primary" />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); }}
            className="p-2 hover:bg-background-tertiary rounded-lg transition-colors"
          >
            <MessageSquare size={16} className="text-text-secondary hover:text-accent-primary" />
          </button>
        </div>
      </Card>
    </motion.div>
  );

  const EmployeeRow = ({ employee }: { employee: Employee }) => (
    <motion.tr
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="border-b border-border-default hover:bg-background-tertiary cursor-pointer"
      onClick={() => setSelectedEmployee(employee)}
    >
      <td className="px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-10 h-10 rounded-full bg-accent-primary/20 flex items-center justify-center">
              <span className="text-sm font-bold text-accent-primary">
                {getInitials(employee.name)}
              </span>
            </div>
            <div
              className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-background-secondary"
              style={{ backgroundColor: getStatusColor(employee.status) }}
            />
          </div>
          <div>
            <p className="font-medium text-text-primary">{employee.name}</p>
            <p className="text-xs text-text-muted capitalize">{employee.status}</p>
          </div>
        </div>
      </td>
      <td className="px-4 py-3 text-sm text-text-secondary">{employee.position}</td>
      <td className="px-4 py-3 text-sm text-text-secondary">{employee.department}</td>
      <td className="px-4 py-3 text-sm text-text-secondary">{employee.location}</td>
      <td className="px-4 py-3">
        <a href={`mailto:${employee.email}`} className="text-sm text-accent-primary hover:underline">
          {employee.email}
        </a>
      </td>
      <td className="px-4 py-3 text-sm text-text-secondary">{employee.phone}</td>
      <td className="px-4 py-3">
        <div className="flex items-center gap-1">
          <button
            onClick={(e) => { e.stopPropagation(); window.location.href = `mailto:${employee.email}`; }}
            className="p-1.5 hover:bg-background-secondary rounded text-text-secondary hover:text-accent-primary"
          >
            <Mail size={14} />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); }}
            className="p-1.5 hover:bg-background-secondary rounded text-text-secondary hover:text-accent-primary"
          >
            <MessageSquare size={14} />
          </button>
        </div>
      </td>
    </motion.tr>
  );

  return (
    <div className="space-y-6">
      <PageHeader
        title="Employee Directory"
        subtitle="Find and connect with colleagues"
      />

      {/* Stats Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-accent-primary/20 rounded-lg">
              <Users size={20} className="text-accent-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold text-text-primary">{employeeDirectory.length}</p>
              <p className="text-sm text-text-secondary">Total Employees</p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-500/20 rounded-lg">
              <Wifi size={20} className="text-green-500" />
            </div>
            <div>
              <p className="text-2xl font-bold text-text-primary">{onlineCount}</p>
              <p className="text-sm text-text-secondary">Online Now</p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-500/20 rounded-lg">
              <Building2 size={20} className="text-purple-500" />
            </div>
            <div>
              <p className="text-2xl font-bold text-text-primary">{departments.length}</p>
              <p className="text-sm text-text-secondary">Departments</p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-500/20 rounded-lg">
              <MapPin size={20} className="text-blue-500" />
            </div>
            <div>
              <p className="text-2xl font-bold text-text-primary">{locations.length}</p>
              <p className="text-sm text-text-secondary">Locations</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Filter Bar */}
      <Card className="p-4">
        <div className="flex flex-wrap gap-4 items-center">
          <div className="flex-1 min-w-64 max-w-md">
            <Input
              placeholder="Search by name, email, department, position..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              leftIcon={<Search size={16} />}
            />
          </div>

          <select
            value={selectedDepartment}
            onChange={(e) => setSelectedDepartment(e.target.value)}
            className="px-3 py-2 bg-background-tertiary border border-border-default rounded-lg text-sm text-text-primary focus:outline-none focus:border-accent-primary"
          >
            <option value="all">All Departments</option>
            {departments.map((dept: string) => (
              <option key={dept} value={dept}>{dept}</option>
            ))}
          </select>

          <select
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)}
            className="px-3 py-2 bg-background-tertiary border border-border-default rounded-lg text-sm text-text-primary focus:outline-none focus:border-accent-primary"
          >
            <option value="all">All Locations</option>
            {locations.map((loc: string) => (
              <option key={loc} value={loc}>{loc}</option>
            ))}
          </select>

          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-3 py-2 bg-background-tertiary border border-border-default rounded-lg text-sm text-text-primary focus:outline-none focus:border-accent-primary"
          >
            <option value="all">All Status</option>
            <option value="online">Online</option>
            <option value="away">Away</option>
            <option value="busy">Busy</option>
            <option value="offline">Offline</option>
          </select>

          <div className="flex items-center border border-border-default rounded-lg overflow-hidden">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 transition-colors ${
                viewMode === 'grid'
                  ? 'bg-accent-primary text-white'
                  : 'bg-background-tertiary text-text-secondary hover:bg-background-secondary'
              }`}
            >
              <Grid3X3 size={18} />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 transition-colors ${
                viewMode === 'list'
                  ? 'bg-accent-primary text-white'
                  : 'bg-background-tertiary text-text-secondary hover:bg-background-secondary'
              }`}
            >
              <List size={18} />
            </button>
          </div>
        </div>
      </Card>

      {/* Results Count */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-text-muted">
          Showing {filteredEmployees.length} of {employeeDirectory.length} employees
        </p>
      </div>

      {/* Grid View */}
      {viewMode === 'grid' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredEmployees.map(employee => (
            <EmployeeCard key={employee.id} employee={employee} />
          ))}
        </div>
      )}

      {/* List View */}
      {viewMode === 'list' && (
        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-background-tertiary border-b border-border-default">
                  <th className="px-4 py-3 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider">
                    Employee
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider">
                    Position
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider">
                    Department
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider">
                    Location
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider">
                    Phone
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredEmployees.map(employee => (
                  <EmployeeRow key={employee.id} employee={employee} />
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* Empty State */}
      {filteredEmployees.length === 0 && (
        <Card className="p-12 text-center">
          <Users size={48} className="mx-auto mb-4 text-text-muted" />
          <p className="text-text-secondary">No employees found matching your criteria</p>
        </Card>
      )}

      {/* Employee Profile Modal */}
      {selectedEmployee && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-background-secondary rounded-xl max-w-lg w-full overflow-hidden"
          >
            {/* Modal Header */}
            <div className="p-6 border-b border-border-default">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <div className="w-16 h-16 rounded-full bg-accent-primary/20 flex items-center justify-center">
                      <span className="text-xl font-bold text-accent-primary">
                        {getInitials(selectedEmployee.name)}
                      </span>
                    </div>
                    <div
                      className="absolute bottom-0 right-0 w-4 h-4 rounded-full border-2 border-background-secondary"
                      style={{ backgroundColor: getStatusColor(selectedEmployee.status) }}
                    />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-text-primary">{selectedEmployee.name}</h2>
                    <p className="text-text-secondary">{selectedEmployee.position}</p>
                    <span className="inline-flex items-center gap-1 mt-1 px-2 py-0.5 bg-accent-primary/20 text-accent-primary text-xs rounded-full capitalize">
                      {selectedEmployee.status}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedEmployee(null)}
                  className="p-2 hover:bg-background-tertiary rounded-lg"
                >
                  <X size={20} className="text-text-secondary" />
                </button>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-3 p-3 bg-background-tertiary rounded-lg">
                  <Building2 size={18} className="text-text-muted" />
                  <div>
                    <p className="text-xs text-text-muted">Department</p>
                    <p className="text-sm font-medium text-text-primary">{selectedEmployee.department}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-background-tertiary rounded-lg">
                  <MapPin size={18} className="text-text-muted" />
                  <div>
                    <p className="text-xs text-text-muted">Location</p>
                    <p className="text-sm font-medium text-text-primary">{selectedEmployee.location}</p>
                  </div>
                </div>
              </div>

              <Card className="p-4">
                <h4 className="text-sm font-medium text-text-secondary mb-3">Contact Information</h4>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Mail size={16} className="text-text-muted" />
                    <a href={`mailto:${selectedEmployee.email}`} className="text-sm text-accent-primary hover:underline">
                      {selectedEmployee.email}
                    </a>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone size={16} className="text-text-muted" />
                    <a href={`tel:${selectedEmployee.phone}`} className="text-sm text-accent-primary hover:underline">
                      {selectedEmployee.phone}
                    </a>
                  </div>
                </div>
              </Card>
            </div>

            {/* Modal Footer */}
            <div className="p-6 border-t border-border-default bg-background-tertiary">
              <div className="flex items-center gap-3">
                <Button className="flex-1" leftIcon={<MessageSquare size={16} />}>
                  Send Message
                </Button>
                <Button variant="secondary" className="flex-1" leftIcon={<Video size={16} />}>
                  Video Call
                </Button>
                <Button variant="secondary" leftIcon={<UserCircle size={16} />}>
                  Full Profile
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};
