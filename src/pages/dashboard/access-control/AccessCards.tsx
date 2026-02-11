import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  Plus,
  Search,
  CreditCard,
  Building2,
  Shield,
  Calendar,
  MoreVertical,
  Edit,
  Trash2,
  Ban,
  CheckCircle,
  AlertTriangle,
  Clock,
  LayoutGrid,
  List,
} from 'lucide-react';
import { PageHeader, Card, StatsCard, Input, Button } from '@/components/common';
import { accessCards, getCardStatusColor, type AccessCard } from '@/data/accessControlData';
import { getProfileImage } from '@/utils/profileImages';
import { useTranslation } from 'react-i18next';

export const AccessCards = () => {
  const { t } = useTranslation('accessControl');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedDepartment, setSelectedDepartment] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const departments = useMemo(() => {
    const unique = [...new Set(accessCards.map(c => c.department))];
    return unique.sort();
  }, []);

  const stats = useMemo(() => ({
    total: accessCards.length,
    active: accessCards.filter(c => c.status === 'active').length,
    inactive: accessCards.filter(c => c.status === 'inactive').length,
    lost: accessCards.filter(c => c.status === 'lost').length,
    expired: accessCards.filter(c => c.status === 'expired').length,
  }), []);

  const filteredCards = useMemo(() => {
    let filtered = [...accessCards];

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        c =>
          c.holderName.toLowerCase().includes(query) ||
          c.cardNumber.toLowerCase().includes(query) ||
          c.department.toLowerCase().includes(query)
      );
    }

    if (selectedStatus !== 'all') {
      filtered = filtered.filter(c => c.status === selectedStatus);
    }

    if (selectedDepartment !== 'all') {
      filtered = filtered.filter(c => c.department === selectedDepartment);
    }

    return filtered;
  }, [searchQuery, selectedStatus, selectedDepartment]);

  const getStatusBadge = (status: AccessCard['status']) => {
    const config = {
      active: { bg: 'bg-green-500/20', text: 'text-green-400', label: t('accessCards.active'), icon: CheckCircle },
      inactive: { bg: 'bg-gray-500/20', text: 'text-gray-400', label: t('accessCards.inactive'), icon: Ban },
      lost: { bg: 'bg-red-500/20', text: 'text-red-400', label: t('accessCards.lost'), icon: AlertTriangle },
      expired: { bg: 'bg-yellow-500/20', text: 'text-yellow-400', label: t('accessCards.expired'), icon: Clock },
    };
    const c = config[status];
    const Icon = c.icon;
    return (
      <span className={`flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium ${c.bg} ${c.text}`}>
        <Icon size={12} />
        {c.label}
      </span>
    );
  };

  const isExpiringSoon = (expiryDate: string) => {
    const expiry = new Date(expiryDate);
    const now = new Date();
    const diffDays = Math.ceil((expiry.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    return diffDays > 0 && diffDays <= 30;
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title={t('accessCards.title')}
        subtitle={t('accessCards.subtitle')}
        actions={
          <div className="flex items-center gap-2">
            <Button variant="secondary" leftIcon={<Ban size={16} />}>
              {t('accessCards.revokeSelected')}
            </Button>
            <Button leftIcon={<Plus size={16} />}>
              {t('accessCards.issueCard')}
            </Button>
          </div>
        }
      />

      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <StatsCard
          title={t('accessCards.totalCards')}
          value={stats.total.toString()}
          icon={CreditCard}
          iconColor="#547792"
        />
        <StatsCard
          title={t('accessCards.active')}
          value={stats.active.toString()}
          icon={CheckCircle}
          iconColor="#10b981"
        />
        <StatsCard
          title={t('accessCards.inactive')}
          value={stats.inactive.toString()}
          icon={Ban}
          iconColor="#6b7280"
        />
        <StatsCard
          title={t('accessCards.lost')}
          value={stats.lost.toString()}
          icon={AlertTriangle}
          iconColor="#ef4444"
        />
        <StatsCard
          title={t('accessCards.expired')}
          value={stats.expired.toString()}
          icon={Clock}
          iconColor="#f59e0b"
        />
      </div>

      {/* Filter Bar */}
      <Card className="p-4">
        <div className="flex flex-wrap gap-4 items-center justify-between">
          <div className="flex flex-wrap gap-4 items-center flex-1">
            <div className="flex-1 min-w-50 max-w-md">
              <Input
                placeholder={t('accessCards.searchCards')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                leftIcon={<Search size={16} />}
              />
            </div>

            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-3 py-2 bg-white/[0.05] border border-white/[0.08] rounded-lg text-sm text-text-primary focus:outline-none focus:border-accent-primary"
            >
              <option value="all">{t('accessCards.allStatus')}</option>
              <option value="active">{t('accessCards.active')}</option>
              <option value="inactive">{t('accessCards.inactive')}</option>
              <option value="lost">{t('accessCards.lost')}</option>
              <option value="expired">{t('accessCards.expired')}</option>
            </select>

            <select
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
              className="px-3 py-2 bg-white/[0.05] border border-white/[0.08] rounded-lg text-sm text-text-primary focus:outline-none focus:border-accent-primary"
            >
              <option value="all">{t('accessCards.allDepartments')}</option>
              {departments.map(d => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </div>

          {/* View Toggle */}
          <div className="flex gap-1 p-1 bg-white/[0.03] backdrop-blur-xl rounded-lg">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded transition-all ${
                viewMode === 'grid'
                  ? 'bg-accent-primary text-white'
                  : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              <LayoutGrid size={16} />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded transition-all ${
                viewMode === 'list'
                  ? 'bg-accent-primary text-white'
                  : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              <List size={16} />
            </button>
          </div>
        </div>
      </Card>

      {/* Cards Grid/List */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredCards.map((card, index) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card className="p-5 hover:shadow-lg transition-all group">
                {/* Status Indicator */}
                <div
                  className="absolute top-0 left-0 right-0 h-1 rounded-t-lg"
                  style={{ backgroundColor: getCardStatusColor(card.status) }}
                />

                <div className="pt-1">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      {getProfileImage(card.holderName) ? (
                        <img
                          src={getProfileImage(card.holderName)}
                          alt={card.holderName}
                          className="w-12 h-12 rounded-full object-cover border border-white/10"
                        />
                      ) : (
                        <div className="w-12 h-12 rounded-full bg-accent-primary/20 flex items-center justify-center">
                          <span className="text-lg font-bold text-accent-primary">
                            {card.holderName.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                      )}
                      <div>
                        <h3 className="font-semibold text-text-primary">{card.holderName}</h3>
                        <p className="text-xs text-text-secondary font-mono">{card.cardNumber}</p>
                      </div>
                    </div>
                    <button className="p-1 hover:bg-white/[0.05] rounded opacity-0 group-hover:opacity-100 transition-opacity">
                      <MoreVertical size={16} className="text-text-secondary" />
                    </button>
                  </div>

                  {/* Status Badge */}
                  <div className="flex items-center gap-2 mb-4">
                    {getStatusBadge(card.status)}
                    {isExpiringSoon(card.expiryDate) && card.status === 'active' && (
                      <span className="px-2 py-0.5 rounded text-xs font-medium bg-orange-500/20 text-orange-400">
                        {t('accessCards.expiringSoon')}
                      </span>
                    )}
                  </div>

                  {/* Info */}
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm">
                      <Building2 size={14} className="text-text-muted" />
                      <span className="text-text-secondary">{card.department}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Shield size={14} className="text-text-muted" />
                      <span className="text-text-secondary">{card.accessLevel}</span>
                    </div>
                  </div>

                  {/* Dates */}
                  <div className="pt-3 border-t border-white/[0.08] space-y-2 text-xs">
                    <div className="flex items-center justify-between text-text-secondary">
                      <span className="flex items-center gap-1">
                        <Calendar size={12} />
                        {t('accessCards.issued')}
                      </span>
                      <span className="text-text-primary">
                        {new Date(card.issueDate).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-text-secondary">
                      <span className="flex items-center gap-1">
                        <Clock size={12} />
                        {t('accessCards.expires')}
                      </span>
                      <span className={isExpiringSoon(card.expiryDate) ? 'text-orange-400' : 'text-text-primary'}>
                        {new Date(card.expiryDate).toLocaleDateString()}
                      </span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 mt-4 pt-3 border-t border-white/[0.08]">
                    <button className="flex-1 flex items-center justify-center gap-1 py-2 text-sm text-text-secondary hover:text-accent-primary hover:bg-accent-primary/10 rounded transition-colors">
                      <Edit size={14} />
                      {t('accessCards.edit')}
                    </button>
                    {card.status === 'active' ? (
                      <button className="flex-1 flex items-center justify-center gap-1 py-2 text-sm text-text-secondary hover:text-yellow-400 hover:bg-yellow-400/10 rounded transition-colors">
                        <Ban size={14} />
                        {t('accessCards.revoke')}
                      </button>
                    ) : (
                      <button className="flex-1 flex items-center justify-center gap-1 py-2 text-sm text-text-secondary hover:text-green-400 hover:bg-green-400/10 rounded transition-colors">
                        <CheckCircle size={14} />
                        {t('accessCards.activate')}
                      </button>
                    )}
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      ) : (
        /* List View */
        <Card>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/[0.08]">
                  <th className="text-left py-3 px-4 text-sm font-medium text-text-secondary">
                    <input type="checkbox" className="rounded border-white/[0.08]" />
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-text-secondary">{t('accessCards.holder')}</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-text-secondary">{t('accessCards.cardNumber')}</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-text-secondary">{t('accessCards.department')}</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-text-secondary">{t('accessCards.accessLevel')}</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-text-secondary">{t('accessCards.allStatus')}</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-text-secondary">{t('accessCards.expiryDate')}</th>
                  <th className="text-right py-3 px-4 text-sm font-medium text-text-secondary">{t('accessCards.edit')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-default">
                {filteredCards.map((card, index) => (
                  <motion.tr
                    key={card.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.03 }}
                    className="hover:bg-white/[0.05] transition-colors"
                  >
                    <td className="py-3 px-4">
                      <input type="checkbox" className="rounded border-white/[0.08]" />
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        {getProfileImage(card.holderName) ? (
                          <img
                            src={getProfileImage(card.holderName)}
                            alt={card.holderName}
                            className="w-8 h-8 rounded-full object-cover border border-white/10"
                          />
                        ) : (
                          <div className="w-8 h-8 rounded-full bg-accent-primary/20 flex items-center justify-center">
                            <span className="text-xs font-bold text-accent-primary">
                              {card.holderName.split(' ').map(n => n[0]).join('')}
                            </span>
                          </div>
                        )}
                        <span className="font-medium text-text-primary">{card.holderName}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className="font-mono text-sm text-text-secondary">{card.cardNumber}</span>
                    </td>
                    <td className="py-3 px-4 text-sm text-text-secondary">{card.department}</td>
                    <td className="py-3 px-4 text-sm text-text-secondary">{card.accessLevel}</td>
                    <td className="py-3 px-4">{getStatusBadge(card.status)}</td>
                    <td className="py-3 px-4">
                      <span className={`text-sm ${isExpiringSoon(card.expiryDate) ? 'text-orange-400' : 'text-text-secondary'}`}>
                        {new Date(card.expiryDate).toLocaleDateString()}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center justify-end gap-1">
                        <button className="p-2 hover:bg-white/[0.03] backdrop-blur-xl rounded text-text-secondary hover:text-accent-primary">
                          <Edit size={14} />
                        </button>
                        <button className="p-2 hover:bg-white/[0.03] backdrop-blur-xl rounded text-text-secondary hover:text-red-400">
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {filteredCards.length === 0 && (
        <Card className="p-12 text-center">
          <CreditCard size={48} className="mx-auto mb-4 text-text-muted" />
          <p className="text-text-secondary">{t('accessCards.noCardsFound')}</p>
        </Card>
      )}
    </div>
  );
};
