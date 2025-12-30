import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  Plus,
  Search,
  Users as UsersIcon,
  UserCheck,
  Shield,
  Clock,
  Edit,
  Key,
  Trash2,
  Mail,
  ShieldCheck,
  ShieldOff,
  X,
  Send,
} from 'lucide-react';
import { PageHeader, Card, StatsCard, Input, Button } from '@/components/common';
import {
  users,
  roles,
  departments,
  formatDateTime,
  getUserInitials,
  getStatusColor,
  type User,
} from '@/data/settingsData';

export const Users = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [departmentFilter, setDepartmentFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRole, setInviteRole] = useState('ROLE003');
  const [inviteDepartment, setInviteDepartment] = useState('Engineering');

  const stats = useMemo(() => ({
    total: users.length,
    active: users.filter(u => u.status === 'active').length,
    admins: users.filter(u => u.role === 'Admin').length,
    pending: users.filter(u => u.status === 'pending').length,
  }), []);

  const filteredUsers = useMemo(() => {
    let filtered = [...users];

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(u =>
        u.name.toLowerCase().includes(query) ||
        u.email.toLowerCase().includes(query)
      );
    }

    if (roleFilter !== 'all') {
      filtered = filtered.filter(u => u.role === roleFilter);
    }

    if (departmentFilter !== 'all') {
      filtered = filtered.filter(u => u.department === departmentFilter);
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter(u => u.status === statusFilter);
    }

    return filtered;
  }, [searchQuery, roleFilter, departmentFilter, statusFilter]);

  const handleInviteUser = () => {
    console.log('Inviting user:', { email: inviteEmail, role: inviteRole, department: inviteDepartment });
    setIsInviteModalOpen(false);
    setInviteEmail('');
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="User Management"
        subtitle="Manage user accounts and permissions"
        actions={
          <Button leftIcon={<Plus size={16} />} onClick={() => setIsInviteModalOpen(true)}>
            Invite User
          </Button>
        }
      />

      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Total Users"
          value={stats.total.toString()}
          icon={UsersIcon}
          iconColor="#6366f1"
        />
        <StatsCard
          title="Active Users"
          value={stats.active.toString()}
          icon={UserCheck}
          iconColor="#10b981"
        />
        <StatsCard
          title="Admins"
          value={stats.admins.toString()}
          icon={Shield}
          iconColor="#f59e0b"
        />
        <StatsCard
          title="Pending Invites"
          value={stats.pending.toString()}
          icon={Clock}
          iconColor="#64748b"
        />
      </div>

      {/* Filter Bar */}
      <Card className="p-4">
        <div className="flex flex-wrap gap-4 items-center">
          <div className="flex-1 min-w-48 max-w-md">
            <Input
              placeholder="Search by name or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              leftIcon={<Search size={16} />}
            />
          </div>
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="px-3 py-2 bg-background-tertiary border border-border-default rounded-lg text-sm text-text-primary focus:outline-none focus:border-accent-primary"
          >
            <option value="all">All Roles</option>
            {roles.map(role => (
              <option key={role.id} value={role.name}>{role.name}</option>
            ))}
          </select>
          <select
            value={departmentFilter}
            onChange={(e) => setDepartmentFilter(e.target.value)}
            className="px-3 py-2 bg-background-tertiary border border-border-default rounded-lg text-sm text-text-primary focus:outline-none focus:border-accent-primary"
          >
            <option value="all">All Departments</option>
            {departments.map(dept => (
              <option key={dept} value={dept}>{dept}</option>
            ))}
          </select>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 bg-background-tertiary border border-border-default rounded-lg text-sm text-text-primary focus:outline-none focus:border-accent-primary"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="pending">Pending</option>
          </select>
        </div>
      </Card>

      {/* Users Table */}
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-background-tertiary">
              <tr>
                <th className="text-left p-4 text-sm font-medium text-text-secondary">User</th>
                <th className="text-left p-4 text-sm font-medium text-text-secondary">Role</th>
                <th className="text-left p-4 text-sm font-medium text-text-secondary">Department</th>
                <th className="text-left p-4 text-sm font-medium text-text-secondary">Status</th>
                <th className="text-left p-4 text-sm font-medium text-text-secondary">Last Login</th>
                <th className="text-left p-4 text-sm font-medium text-text-secondary">2FA</th>
                <th className="text-right p-4 text-sm font-medium text-text-secondary">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-default">
              {filteredUsers.map((user, index) => (
                <motion.tr
                  key={user.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.03 }}
                  className="hover:bg-background-tertiary/50 transition-colors"
                >
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-accent-primary/20 flex items-center justify-center text-accent-primary font-medium">
                        {getUserInitials(user.name)}
                      </div>
                      <div>
                        <p className="font-medium text-text-primary">{user.name}</p>
                        <p className="text-sm text-text-muted">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      user.role === 'Admin'
                        ? 'bg-purple-500/20 text-purple-400'
                        : user.role === 'Manager'
                        ? 'bg-blue-500/20 text-blue-400'
                        : 'bg-slate-500/20 text-slate-400'
                    }`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="p-4 text-text-secondary">{user.department}</td>
                  <td className="p-4">
                    <span
                      className="px-2 py-1 rounded text-xs font-medium"
                      style={{
                        backgroundColor: `${getStatusColor(user.status)}20`,
                        color: getStatusColor(user.status),
                      }}
                    >
                      {user.status}
                    </span>
                  </td>
                  <td className="p-4 text-sm text-text-secondary">
                    {formatDateTime(user.lastLogin)}
                  </td>
                  <td className="p-4">
                    {user.twoFactorEnabled ? (
                      <ShieldCheck size={18} className="text-green-400" />
                    ) : (
                      <ShieldOff size={18} className="text-text-muted" />
                    )}
                  </td>
                  <td className="p-4">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        onClick={() => setSelectedUser(user)}
                        className="p-2 hover:bg-background-tertiary rounded transition-colors text-text-secondary hover:text-text-primary"
                      >
                        <Edit size={16} />
                      </button>
                      <button className="p-2 hover:bg-background-tertiary rounded transition-colors text-text-secondary hover:text-blue-400">
                        <Key size={16} />
                      </button>
                      <button className="p-2 hover:bg-background-tertiary rounded transition-colors text-text-secondary hover:text-red-400">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredUsers.length === 0 && (
          <div className="p-12 text-center">
            <UsersIcon size={48} className="mx-auto mb-4 text-text-muted" />
            <p className="text-text-secondary">No users found</p>
          </div>
        )}
      </Card>

      {/* Edit User Modal */}
      {selectedUser && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedUser(null)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-lg"
          >
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-text-primary">Edit User</h3>
                <button
                  onClick={() => setSelectedUser(null)}
                  className="p-2 hover:bg-background-tertiary rounded transition-colors"
                >
                  <X size={20} className="text-text-muted" />
                </button>
              </div>

              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-full bg-accent-primary/20 flex items-center justify-center text-accent-primary text-xl font-medium">
                  {getUserInitials(selectedUser.name)}
                </div>
                <div>
                  <p className="font-medium text-text-primary">{selectedUser.name}</p>
                  <p className="text-sm text-text-secondary">{selectedUser.email}</p>
                </div>
              </div>

              <div className="space-y-4">
                <Input
                  label="Name"
                  value={selectedUser.name}
                  onChange={() => {}}
                />
                <Input
                  label="Email"
                  type="email"
                  value={selectedUser.email}
                  onChange={() => {}}
                />
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-2">Role</label>
                  <select
                    value={selectedUser.roleId}
                    onChange={() => {}}
                    className="w-full px-3 py-2 bg-background-tertiary border border-border-default rounded-lg text-text-primary focus:outline-none focus:border-accent-primary"
                  >
                    {roles.map(role => (
                      <option key={role.id} value={role.id}>{role.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-2">Department</label>
                  <select
                    value={selectedUser.department}
                    onChange={() => {}}
                    className="w-full px-3 py-2 bg-background-tertiary border border-border-default rounded-lg text-text-primary focus:outline-none focus:border-accent-primary"
                  >
                    {departments.map(dept => (
                      <option key={dept} value={dept}>{dept}</option>
                    ))}
                  </select>
                </div>
                <div className="flex items-center justify-between py-3 border-t border-border-default">
                  <div>
                    <p className="font-medium text-text-primary">Two-Factor Authentication</p>
                    <p className="text-sm text-text-secondary">
                      {selectedUser.twoFactorEnabled ? 'Enabled' : 'Disabled'}
                    </p>
                  </div>
                  <button
                    className={`px-3 py-1 rounded text-sm font-medium ${
                      selectedUser.twoFactorEnabled
                        ? 'bg-green-500/20 text-green-400'
                        : 'bg-red-500/20 text-red-400'
                    }`}
                  >
                    {selectedUser.twoFactorEnabled ? 'Disable' : 'Enable'}
                  </button>
                </div>
              </div>

              <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-border-default">
                <Button variant="outline" onClick={() => setSelectedUser(null)}>
                  Cancel
                </Button>
                <Button onClick={() => setSelectedUser(null)}>
                  Save Changes
                </Button>
              </div>
            </Card>
          </motion.div>
        </motion.div>
      )}

      {/* Invite User Modal */}
      {isInviteModalOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={() => setIsInviteModalOpen(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-lg"
          >
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-text-primary">Invite User</h3>
                <button
                  onClick={() => setIsInviteModalOpen(false)}
                  className="p-2 hover:bg-background-tertiary rounded transition-colors"
                >
                  <X size={20} className="text-text-muted" />
                </button>
              </div>

              <div className="space-y-4">
                <Input
                  label="Email Address"
                  type="email"
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                  placeholder="user@example.com"
                  leftIcon={<Mail size={16} />}
                />
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-2">Role</label>
                  <select
                    value={inviteRole}
                    onChange={(e) => setInviteRole(e.target.value)}
                    className="w-full px-3 py-2 bg-background-tertiary border border-border-default rounded-lg text-text-primary focus:outline-none focus:border-accent-primary"
                  >
                    {roles.map(role => (
                      <option key={role.id} value={role.id}>{role.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-2">Department</label>
                  <select
                    value={inviteDepartment}
                    onChange={(e) => setInviteDepartment(e.target.value)}
                    className="w-full px-3 py-2 bg-background-tertiary border border-border-default rounded-lg text-text-primary focus:outline-none focus:border-accent-primary"
                  >
                    {departments.map(dept => (
                      <option key={dept} value={dept}>{dept}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-border-default">
                <Button variant="outline" onClick={() => setIsInviteModalOpen(false)}>
                  Cancel
                </Button>
                <Button
                  leftIcon={<Send size={16} />}
                  onClick={handleInviteUser}
                  disabled={!inviteEmail}
                >
                  Send Invite
                </Button>
              </div>
            </Card>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};
