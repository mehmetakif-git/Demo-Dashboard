import { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import {
  PackageCheck,
  Search,
  MapPin,
  Calendar,
  MoreVertical,
  CheckCircle,
  Clock,
  AlertTriangle,
  DollarSign,
  Package,
} from 'lucide-react';
import { PageHeader, Card, Button, Input, Dropdown } from '@/components/common';
import { finishedGoods, MANUFACTURING_COLOR } from '@/data/manufacturing/manufacturingData';

export const FinishedGoods = () => {
  const { t } = useTranslation('manufacturing');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [qualityFilter, setQualityFilter] = useState<string>('all');

  const statusMap: Record<string, string> = {
    'all': t('status.all'),
    'in-stock': t('status.inStock'),
    'in-production': t('status.inProduction'),
    'reserved': t('status.reserved'),
  };

  const qualityMap: Record<string, string> = {
    'passed': t('finishedGoods.passed'),
    'pending': t('finishedGoods.pending'),
    'failed': t('finishedGoods.failed'),
  };

  const stats = useMemo(() => {
    const totalItems = finishedGoods.length;
    const totalValue = finishedGoods.reduce((acc, f) => acc + f.totalValue, 0);
    const inStock = finishedGoods.filter(f => f.status === 'in-stock').length;
    const awaitingQC = finishedGoods.filter(f => f.qualityStatus === 'pending').length;

    return { totalItems, totalValue, inStock, awaitingQC };
  }, []);

  const filteredGoods = useMemo(() => {
    return finishedGoods.filter(item => {
      const matchesSearch = item.productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.batchNo.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
      const matchesQuality = qualityFilter === 'all' || item.qualityStatus === qualityFilter;

      return matchesSearch && matchesStatus && matchesQuality;
    });
  }, [searchQuery, statusFilter, qualityFilter]);

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      'in-stock': '#10b981',
      'in-production': '#f59e0b',
      'reserved': '#3b82f6',
    };
    return colors[status] || MANUFACTURING_COLOR;
  };

  const getQualityColor = (status: string) => {
    const colors: Record<string, string> = {
      'passed': '#10b981',
      'pending': '#f59e0b',
      'failed': '#ef4444',
    };
    return colors[status] || MANUFACTURING_COLOR;
  };

  const getQualityIcon = (status: string) => {
    switch (status) {
      case 'passed': return CheckCircle;
      case 'pending': return Clock;
      case 'failed': return AlertTriangle;
      default: return Package;
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title={t('finishedGoods.title')}
        subtitle={t('finishedGoods.subtitle')}
        icon={PackageCheck}
      />

      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: t('finishedGoods.totalItems'), value: stats.totalItems, icon: PackageCheck, color: MANUFACTURING_COLOR },
          { label: t('finishedGoods.totalValue'), value: `QAR ${stats.totalValue.toLocaleString()}`, icon: DollarSign, color: '#10b981' },
          { label: t('finishedGoods.inStock'), value: stats.inStock, icon: CheckCircle, color: '#10b981' },
          { label: t('finishedGoods.awaitingQC'), value: stats.awaitingQC, icon: Clock, color: stats.awaitingQC > 0 ? '#f59e0b' : '#10b981' },
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
                    <p className="text-lg font-bold text-text-primary">{stat.value}</p>
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
              placeholder={t('finishedGoods.searchPlaceholder')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <select
            className="px-3 py-2 bg-background-secondary border border-border-default rounded-lg text-text-primary"
            value={qualityFilter}
            onChange={(e) => setQualityFilter(e.target.value)}
          >
            <option value="all">{t('finishedGoods.allQualityStatus')}</option>
            <option value="passed">{t('finishedGoods.passed')}</option>
            <option value="pending">{t('finishedGoods.pending')}</option>
            <option value="failed">{t('finishedGoods.failed')}</option>
          </select>
          <div className="flex gap-2">
            {['all', 'in-stock', 'in-production', 'reserved'].map((status) => (
              <Button
                key={status}
                variant={statusFilter === status ? 'primary' : 'ghost'}
                size="sm"
                onClick={() => setStatusFilter(status)}
              >
                {statusMap[status]}
              </Button>
            ))}
          </div>
        </div>
      </Card>

      {/* Finished Goods Table */}
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-background-tertiary">
              <tr>
                <th className="text-left py-3 px-4 text-sm font-medium text-text-muted">{t('finishedGoods.product')}</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-text-muted">{t('finishedGoods.batchNo')}</th>
                <th className="text-center py-3 px-4 text-sm font-medium text-text-muted">{t('finishedGoods.quantity')}</th>
                <th className="text-center py-3 px-4 text-sm font-medium text-text-muted">{t('finishedGoods.status')}</th>
                <th className="text-center py-3 px-4 text-sm font-medium text-text-muted">{t('finishedGoods.quality')}</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-text-muted">{t('finishedGoods.location')}</th>
                <th className="text-right py-3 px-4 text-sm font-medium text-text-muted">{t('finishedGoods.unitCost')}</th>
                <th className="text-right py-3 px-4 text-sm font-medium text-text-muted">{t('finishedGoods.totalValue2')}</th>
                <th className="text-center py-3 px-4 text-sm font-medium text-text-muted">{t('finishedGoods.actions')}</th>
              </tr>
            </thead>
            <tbody>
              {filteredGoods.map((item, index) => {
                const QualityIcon = getQualityIcon(item.qualityStatus);

                return (
                  <motion.tr
                    key={item.id}
                    className="border-b border-border-default last:border-b-0"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.03 }}
                  >
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-10 h-10 rounded-lg flex items-center justify-center"
                          style={{ backgroundColor: `${MANUFACTURING_COLOR}20` }}
                        >
                          <PackageCheck size={20} style={{ color: MANUFACTURING_COLOR }} />
                        </div>
                        <div>
                          <p className="font-medium text-text-primary">{item.productName}</p>
                          <p className="text-xs text-text-muted flex items-center gap-1">
                            <Calendar size={10} />
                            {new Date(item.productionDate).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className="font-mono text-text-secondary">{item.batchNo}</span>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <div>
                        <p className="font-medium text-text-primary">{item.quantity.toLocaleString()} {item.unit}</p>
                        <div className="text-xs text-text-muted">
                          <span className="text-success">{item.availableQty}</span>
                          {' / '}
                          <span className="text-warning">{item.reservedQty}</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span
                        className="px-2 py-1 rounded-full text-xs font-medium"
                        style={{ backgroundColor: `${getStatusColor(item.status)}20`, color: getStatusColor(item.status) }}
                      >
                        {statusMap[item.status]}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span
                        className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium"
                        style={{ backgroundColor: `${getQualityColor(item.qualityStatus)}20`, color: getQualityColor(item.qualityStatus) }}
                      >
                        <QualityIcon size={10} />
                        {qualityMap[item.qualityStatus]}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-1 text-sm text-text-secondary">
                        <MapPin size={12} />
                        <span>{item.location}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <span className="text-text-secondary">QAR {item.costPerUnit.toLocaleString()}</span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <span className="font-medium text-text-primary">QAR {item.totalValue.toLocaleString()}</span>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <Dropdown
                        trigger={
                          <Button variant="ghost" size="sm">
                            <MoreVertical size={16} />
                          </Button>
                        }
                        items={[
                          { id: 'view', label: t('finishedGoods.viewDetails'), onClick: () => {} },
                          { id: 'reserve', label: t('finishedGoods.reserve'), onClick: () => {} },
                          { id: 'release', label: t('finishedGoods.release'), onClick: () => {} },
                          { id: 'transfer', label: t('finishedGoods.transfer'), onClick: () => {} },
                        ]}
                      />
                    </td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>

      {filteredGoods.length === 0 && (
        <Card className="p-12 text-center">
          <PackageCheck size={48} className="mx-auto text-text-muted mb-4" />
          <p className="text-text-secondary">{t('finishedGoods.noFinishedGoodsFound')}</p>
        </Card>
      )}
    </div>
  );
};

export default FinishedGoods;
