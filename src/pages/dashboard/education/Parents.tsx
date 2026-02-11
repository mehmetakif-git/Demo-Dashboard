import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  UserPlus,
  Search,
  Plus,
  Phone,
  Mail,
  Users,
  Calendar,
  MoreVertical,
  Briefcase,
} from 'lucide-react';
import { PageHeader, Card, Button, Input, Dropdown } from '@/components/common';
import { parents, students, EDUCATION_COLOR } from '@/data/education/educationData';
import { getProfileImage } from '@/utils/profileImages';
import { useTranslation } from 'react-i18next';

export const Parents = () => {
  const { t } = useTranslation('education');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const stats = useMemo(() => ({
    total: parents.length,
    active: parents.filter(p => p.status === 'active').length,
    totalStudents: parents.reduce((acc, p) => acc + p.students.length, 0),
    meetingsThisMonth: 3,
  }), []);

  const filteredParents = useMemo(() => {
    return parents.filter(parent => {
      const matchesSearch = parent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        parent.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        parent.phone.toLowerCase().includes(searchQuery.toLowerCase()) ||
        parent.studentNames.some(n => n.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesStatus = statusFilter === 'all' || parent.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [searchQuery, statusFilter]);

  return (
    <div className="space-y-6">
      <PageHeader
        title={t('parents.title')}
        subtitle={t('parents.subtitle')}
        icon={UserPlus}
        actions={
          <Button>
            <Plus size={18} />
            {t('parents.addParent')}
          </Button>
        }
      />

      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: t('parents.totalParents'), value: stats.total, icon: UserPlus, color: EDUCATION_COLOR },
          { label: t('parents.activeParents'), value: stats.active, icon: Users, color: '#10b981' },
          { label: t('parents.totalStudents'), value: stats.totalStudents, icon: Users, color: '#f59e0b' },
          { label: t('parents.meetingsThisMonth'), value: stats.meetingsThisMonth, icon: Calendar, color: '#6366f1' },
        ].map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card className="p-4">
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: `${stat.color}20` }}
                  >
                    <Icon size={20} style={{ color: stat.color }} />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-text-primary">{stat.value}</p>
                    <p className="text-xs text-text-muted">{stat.label}</p>
                  </div>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Filters */}
      <Card className="p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
            <Input
              placeholder={t('parents.searchPlaceholder')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2">
            {(['all', 'active', 'inactive'] as const).map((status) => {
              const statusMap: Record<string, string> = {
                'all': t('status.all'),
                'active': t('status.active'),
                'inactive': t('status.inactive'),
              };
              return (
                <Button
                  key={status}
                  variant={statusFilter === status ? 'primary' : 'ghost'}
                  size="sm"
                  onClick={() => setStatusFilter(status)}
                >
                  {statusMap[status]}
                </Button>
              );
            })}
          </div>
        </div>
      </Card>

      {/* Parents List */}
      <div className="space-y-4">
        {filteredParents.map((parent, index) => {
          const parentStudents = students.filter(s => parent.students.includes(s.id));

          return (
            <motion.div
              key={parent.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card className="p-4">
                <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                  {/* Parent Info */}
                  <div className="flex items-center gap-4 flex-1">
                    {(() => {
                      const profileImg = getProfileImage(parent.name);
                      return profileImg ? (
                        <img
                          src={profileImg}
                          alt={parent.name}
                          className="w-14 h-14 rounded-full object-cover"
                        />
                      ) : (
                        <div
                          className="w-14 h-14 rounded-full flex items-center justify-center text-white font-bold text-lg"
                          style={{ backgroundColor: EDUCATION_COLOR }}
                        >
                          {parent.name.split(' ').map(n => n[0]).join('')}
                        </div>
                      );
                    })()}
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-semibold text-text-primary">{parent.name}</p>
                        <span className="px-2 py-0.5 rounded text-xs bg-background-secondary text-text-muted">
                          {parent.relation}
                        </span>
                      </div>
                      <div className="flex items-center gap-1 text-sm text-text-muted mt-1">
                        <Briefcase size={14} />
                        {parent.occupation}
                      </div>
                    </div>
                  </div>

                  {/* Contact Info */}
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-sm text-text-secondary">
                      <Mail size={14} />
                      {parent.email}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-text-secondary">
                      <Phone size={14} />
                      {parent.phone}
                    </div>
                  </div>

                  {/* Students */}
                  <div className="min-w-[200px]">
                    <p className="text-xs text-text-muted mb-2">{t('parents.studentsLabel')}</p>
                    <div className="flex flex-wrap gap-2">
                      {parentStudents.map((student) => {
                        const studentImg = getProfileImage(student.name);
                        return (
                          <div
                            key={student.id}
                            className="flex items-center gap-2 px-2 py-1 bg-background-secondary rounded"
                          >
                            {studentImg ? (
                              <img
                                src={studentImg}
                                alt={student.name}
                                className="w-6 h-6 rounded-full object-cover"
                              />
                            ) : (
                              <div
                                className="w-6 h-6 rounded-full flex items-center justify-center text-white text-xs"
                                style={{ backgroundColor: EDUCATION_COLOR }}
                              >
                                {student.name.split(' ').map(n => n[0]).join('')}
                              </div>
                            )}
                            <div>
                              <p className="text-xs font-medium text-text-primary">{student.name}</p>
                              <p className="text-xs text-text-muted">{student.className}</p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Status */}
                  <span
                    className="px-3 py-1 rounded-full text-xs font-medium"
                    style={{
                      backgroundColor: parent.status === 'active' ? '#10b98120' : '#64748b20',
                      color: parent.status === 'active' ? '#10b981' : '#64748b',
                    }}
                  >
                    {parent.status === 'active' ? t('status.active') : t('status.inactive')}
                  </span>

                  {/* Actions */}
                  <Dropdown
                    trigger={
                      <Button variant="ghost" size="sm">
                        <MoreVertical size={16} />
                      </Button>
                    }
                    items={[
                      { id: 'view', label: t('parents.viewProfile'), onClick: () => {} },
                      { id: 'contact', label: t('parents.contact'), onClick: () => {} },
                      { id: 'meeting', label: t('parents.scheduleMeeting'), onClick: () => {} },
                      { id: 'edit', label: t('parents.editDetails'), onClick: () => {} },
                    ]}
                  />
                </div>

                {/* Address */}
                <div className="mt-3 pt-3 border-t border-border-default">
                  <p className="text-xs text-text-muted">
                    <span className="font-medium">{t('parents.address')}</span> {parent.address}
                  </p>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {filteredParents.length === 0 && (
        <Card className="p-12 text-center">
          <UserPlus size={48} className="mx-auto text-text-muted mb-4" />
          <p className="text-text-secondary">{t('parents.noParentsFound')}</p>
        </Card>
      )}
    </div>
  );
};

export default Parents;
