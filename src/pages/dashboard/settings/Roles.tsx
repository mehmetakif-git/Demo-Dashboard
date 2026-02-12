import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  Plus,
  Shield,
  Users,
  Copy,
  Trash2,
  Check,
  X,
  ChevronDown,
  ChevronUp,
  Lock,
} from 'lucide-react';
import { PageHeader, Card, StatsCard, Button } from '@/components/common';
import {
  roles,
  permissionModules,
  users,
  formatDate,
  type Role,
  type RolePermissions,
} from '@/data/settingsData';
import { useTranslation } from 'react-i18next';

export const Roles = () => {
  const { t } = useTranslation('settings');
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [expandedModule, setExpandedModule] = useState<string | null>(null);
  const [editedPermissions, setEditedPermissions] = useState<RolePermissions>({});
  const [newRoleName, setNewRoleName] = useState('');
  const [newRoleDescription, setNewRoleDescription] = useState('');

  const stats = useMemo(() => ({
    totalRoles: roles.length,
    systemRoles: roles.filter(r => r.isSystem).length,
    customRoles: roles.filter(r => !r.isSystem).length,
    totalUsers: users.length,
  }), []);

  const getRoleUsers = (roleId: string) => {
    return users.filter(u => u.roleId === roleId);
  };

  const handleSelectRole = (role: Role) => {
    setSelectedRole(role);
    setEditedPermissions({ ...role.permissions });
    setIsCreating(false);
  };

  const handleTogglePermission = (moduleId: string, action: string) => {
    setEditedPermissions(prev => {
      const modulePerms = prev[moduleId] || [];
      const hasPermission = modulePerms.includes(action);

      return {
        ...prev,
        [moduleId]: hasPermission
          ? modulePerms.filter(p => p !== action)
          : [...modulePerms, action],
      };
    });
  };

  const handleSelectAllModule = (moduleId: string, actions: string[]) => {
    const currentPerms = editedPermissions[moduleId] || [];
    const hasAll = actions.every(a => currentPerms.includes(a));

    setEditedPermissions(prev => ({
      ...prev,
      [moduleId]: hasAll ? [] : [...actions],
    }));
  };

  const handleCreateRole = () => {
    setSelectedRole(null);
    setIsCreating(true);
    setNewRoleName('');
    setNewRoleDescription('');
    setEditedPermissions({});
  };

  const handleSaveRole = () => {
    if (isCreating) {
      console.log('Creating role:', { name: newRoleName, description: newRoleDescription, permissions: editedPermissions });
    } else if (selectedRole) {
      console.log('Saving role:', { ...selectedRole, permissions: editedPermissions });
    }
    setSelectedRole(null);
    setIsCreating(false);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title={t('roles.title')}
        subtitle={t('roles.subtitle')}
        actions={
          <Button leftIcon={<Plus size={16} />} onClick={handleCreateRole}>
            {t('roles.createRole')}
          </Button>
        }
      />

      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title={t('roles.stats.totalRoles')}
          value={stats.totalRoles.toString()}
          icon={Shield}
          iconColor="#547792"
        />
        <StatsCard
          title={t('roles.stats.systemRoles')}
          value={stats.systemRoles.toString()}
          icon={Lock}
          iconColor="#f59e0b"
        />
        <StatsCard
          title={t('roles.stats.customRoles')}
          value={stats.customRoles.toString()}
          icon={Shield}
          iconColor="#10b981"
        />
        <StatsCard
          title={t('roles.stats.totalUsers')}
          value={stats.totalUsers.toString()}
          icon={Users}
          iconColor="#94B4C1"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Roles List */}
        <div className="lg:col-span-1">
          <Card className="p-4">
            <h3 className="font-semibold text-text-primary mb-4">{t('roles.allRoles')}</h3>
            <div className="space-y-2">
              {roles.map((role, index) => (
                <motion.button
                  key={role.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => handleSelectRole(role)}
                  className={`w-full text-left p-4 rounded-lg transition-all ${
                    selectedRole?.id === role.id
                      ? 'bg-accent-primary/10 border border-accent-primary/30'
                      : 'hover:bg-white/[0.05] border border-transparent'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        role.isSystem ? 'bg-amber-500/20' : 'bg-accent-primary/20'
                      }`}>
                        <Shield size={20} className={role.isSystem ? 'text-amber-400' : 'text-accent-primary'} />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-medium text-text-primary">{role.name}</p>
                          {role.isSystem && (
                            <span className="px-1.5 py-0.5 bg-amber-500/20 text-amber-400 text-[10px] font-medium rounded">
                              {t('roles.system')}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-text-muted">{t('roles.usersCount', { count: role.userCount })}</p>
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-text-secondary mt-2 line-clamp-2">{role.description}</p>
                </motion.button>
              ))}
            </div>
          </Card>
        </div>

        {/* Role Details / Edit */}
        <div className="lg:col-span-2">
          {(selectedRole || isCreating) ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              key={selectedRole?.id || 'new'}
            >
              <Card className="p-6">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                  <div>
                    {isCreating ? (
                      <div className="space-y-3">
                        <input
                          type="text"
                          value={newRoleName}
                          onChange={(e) => setNewRoleName(e.target.value)}
                          placeholder={t('roles.roleNamePlaceholder')}
                          className="text-lg font-semibold text-text-primary bg-transparent border-b border-white/[0.08] focus:outline-none focus:border-accent-primary w-full pb-1"
                        />
                        <input
                          type="text"
                          value={newRoleDescription}
                          onChange={(e) => setNewRoleDescription(e.target.value)}
                          placeholder={t('roles.roleDescriptionPlaceholder')}
                          className="text-sm text-text-secondary bg-transparent border-b border-white/[0.08] focus:outline-none focus:border-accent-primary w-full pb-1"
                        />
                      </div>
                    ) : (
                      <>
                        <h3 className="text-lg font-semibold text-text-primary">{selectedRole?.name}</h3>
                        <p className="text-sm text-text-secondary">{selectedRole?.description}</p>
                      </>
                    )}
                  </div>
                  <div className="flex gap-2">
                    {!isCreating && !selectedRole?.isSystem && (
                      <>
                        <button className="p-2 hover:bg-white/[0.05] rounded transition-colors text-text-secondary hover:text-text-primary">
                          <Copy size={18} />
                        </button>
                        <button className="p-2 hover:bg-white/[0.05] rounded transition-colors text-text-secondary hover:text-red-400">
                          <Trash2 size={18} />
                        </button>
                      </>
                    )}
                    <button
                      onClick={() => { setSelectedRole(null); setIsCreating(false); }}
                      className="p-2 hover:bg-white/[0.05] rounded transition-colors text-text-secondary"
                    >
                      <X size={18} />
                    </button>
                  </div>
                </div>

                {/* Info */}
                {selectedRole && !isCreating && (
                  <div className="grid grid-cols-3 gap-4 mb-6 p-4 bg-white/[0.03] backdrop-blur-xl rounded-lg">
                    <div>
                      <p className="text-xs text-text-muted">{t('roles.info.users')}</p>
                      <p className="text-lg font-semibold text-text-primary">{selectedRole.userCount}</p>
                    </div>
                    <div>
                      <p className="text-xs text-text-muted">{t('roles.info.created')}</p>
                      <p className="text-sm text-text-primary">{formatDate(selectedRole.createdAt)}</p>
                    </div>
                    <div>
                      <p className="text-xs text-text-muted">{t('roles.info.updated')}</p>
                      <p className="text-sm text-text-primary">{formatDate(selectedRole.updatedAt)}</p>
                    </div>
                  </div>
                )}

                {/* Permissions Matrix */}
                <div className="mb-6">
                  <h4 className="font-medium text-text-primary mb-4">{t('roles.permissions')}</h4>
                  <div className="space-y-2">
                    {permissionModules.map((module) => {
                      const modulePerms = editedPermissions[module.id] || [];
                      const isExpanded = expandedModule === module.id;
                      const hasAllPermissions = module.actions.every(a => modulePerms.includes(a));
                      const hasSomePermissions = modulePerms.length > 0 && !hasAllPermissions;

                      return (
                        <div
                          key={module.id}
                          className="border border-white/[0.08] rounded-lg overflow-hidden"
                        >
                          <button
                            onClick={() => setExpandedModule(isExpanded ? null : module.id)}
                            className="w-full flex items-center justify-between p-4 hover:bg-white/[0.05] transition-colors"
                          >
                            <div className="flex items-center gap-3">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleSelectAllModule(module.id, module.actions);
                                }}
                                className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${
                                  hasAllPermissions
                                    ? 'bg-accent-primary border-accent-primary'
                                    : hasSomePermissions
                                    ? 'bg-accent-primary/50 border-accent-primary'
                                    : 'border-white/[0.08] hover:border-accent-primary'
                                }`}
                              >
                                {(hasAllPermissions || hasSomePermissions) && (
                                  <Check size={12} className="text-white" />
                                )}
                              </button>
                              <span className="font-medium text-text-primary">{module.name}</span>
                            </div>
                            <div className="flex items-center gap-3">
                              <span className="text-sm text-text-muted">
                                {modulePerms.length} / {module.actions.length}
                              </span>
                              {isExpanded ? (
                                <ChevronUp size={18} className="text-text-muted" />
                              ) : (
                                <ChevronDown size={18} className="text-text-muted" />
                              )}
                            </div>
                          </button>

                          {isExpanded && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="border-t border-white/[0.08] bg-white/[0.03] backdrop-blur-xl px-4 py-3"
                            >
                              <div className="flex flex-wrap gap-3">
                                {module.actions.map((action) => {
                                  const hasPermission = modulePerms.includes(action);
                                  return (
                                    <button
                                      key={action}
                                      onClick={() => handleTogglePermission(module.id, action)}
                                      className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm transition-colors ${
                                        hasPermission
                                          ? 'bg-accent-primary/20 text-accent-primary'
                                          : 'bg-white/[0.05] text-text-secondary hover:bg-background-primary'
                                      }`}
                                    >
                                      <div className={`w-4 h-4 rounded border flex items-center justify-center ${
                                        hasPermission ? 'bg-accent-primary border-accent-primary' : 'border-white/[0.08]'
                                      }`}>
                                        {hasPermission && <Check size={10} className="text-white" />}
                                      </div>
                                      <span className="capitalize">{action}</span>
                                    </button>
                                  );
                                })}
                              </div>
                            </motion.div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Users with this role */}
                {selectedRole && !isCreating && selectedRole.userCount > 0 && (
                  <div className="mb-6">
                    <h4 className="font-medium text-text-primary mb-3">{t('roles.usersWithRole')}</h4>
                    <div className="flex flex-wrap gap-2">
                      {getRoleUsers(selectedRole.id).map((user) => (
                        <div
                          key={user.id}
                          className="flex items-center gap-2 px-3 py-1.5 bg-white/[0.03] backdrop-blur-xl rounded-full"
                        >
                          <div className="w-6 h-6 rounded-full bg-accent-primary/20 flex items-center justify-center text-accent-primary text-xs">
                            {user.name.split(' ').map(n => n[0]).join('')}
                          </div>
                          <span className="text-sm text-text-primary">{user.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Actions */}
                <div className="flex justify-end gap-3 pt-4 border-t border-white/[0.08]">
                  <Button
                    variant="outline"
                    onClick={() => { setSelectedRole(null); setIsCreating(false); }}
                  >
                    {t('roles.cancel')}
                  </Button>
                  <Button onClick={handleSaveRole}>
                    {isCreating ? t('roles.createRoleButton') : t('roles.saveChanges')}
                  </Button>
                </div>
              </Card>
            </motion.div>
          ) : (
            <Card className="p-12 text-center">
              <Shield size={48} className="mx-auto mb-4 text-text-muted" />
              <p className="text-text-secondary">{t('roles.selectRolePrompt')}</p>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};
