import { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import {
  Trash2,
  Search,
  Plus,
  Calendar,
  MoreVertical,
  DollarSign,
  Recycle,
  AlertTriangle,
  Package,
  ClipboardList,
} from 'lucide-react';
import { PageHeader, Card, Button, Input, Dropdown } from '@/components/common';
import { wasteRecords, MANUFACTURING_COLOR } from '@/data/manufacturing/manufacturingData';

export const Waste = () => {
  const { t } = useTranslation('manufacturing');
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [methodFilter, setMethodFilter] = useState<string>('all');

  const wasteTypes = useMemo(() => {
    return ['all', ...new Set(wasteRecords.map(w => w.wasteType))];
  }, []);

  const disposalMethods = useMemo(() => {
    return ['all', ...new Set(wasteRecords.map(w => w.disposalMethod))];
  }, []);

  const stats = useMemo(() => {
    const totalRecords = wasteRecords.length;
    const totalCost = wasteRecords.reduce((acc, w) => acc + w.cost, 0);
    const recycled = wasteRecords.filter(w => w.disposalMethod === 'Recycling').length;
    const recyclingRate = totalRecords > 0 ? Math.round((recycled / totalRecords) * 100) : 0;

    return { totalRecords, totalCost, recycled, recyclingRate };
  }, []);

  const filteredWaste = useMemo(() => {
    return wasteRecords.filter(record => {
      const matchesSearch = record.workOrderNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
        record.productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        record.reason.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesType = typeFilter === 'all' || record.wasteType === typeFilter;
      const matchesMethod = methodFilter === 'all' || record.disposalMethod === methodFilter;

      return matchesSearch && matchesType && matchesMethod;
    });
  }, [searchQuery, typeFilter, methodFilter]);

  const getWasteTypeColor = (type: string) => {
    const colors: Record<string, string> = {
      'Defective Products': '#ef4444',
      'Scrap Material': '#f59e0b',
      'Packaging Waste': '#64748b',
    };
    return colors[type] || MANUFACTURING_COLOR;
  };

  const getDisposalColor = (method: string) => {
    const colors: Record<string, string> = {
      'Recycling': '#10b981',
      'Disposal': '#64748b',
      'Repair/Rework': '#3b82f6',
    };
    return colors[method] || MANUFACTURING_COLOR;
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title={t('waste.title')}
        subtitle={t('waste.subtitle')}
        icon={Trash2}
        actions={
          <Button>
            <Plus size={18} />
            {t('waste.recordWaste')}
          </Button>
        }
      />

      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: t('waste.totalRecords'), value: stats.totalRecords, icon: Trash2, color: MANUFACTURING_COLOR },
          { label: t('waste.totalCost'), value: `QAR ${stats.totalCost.toLocaleString()}`, icon: DollarSign, color: '#ef4444' },
          { label: t('waste.recycled'), value: stats.recycled, icon: Recycle, color: '#10b981' },
          { label: t('waste.recyclingRate'), value: `${stats.recyclingRate}%`, icon: Recycle, color: stats.recyclingRate >= 50 ? '#10b981' : '#f59e0b' },
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
              placeholder={t('waste.searchPlaceholder')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <select
            className="px-3 py-2 bg-background-secondary border border-border-default rounded-lg text-text-primary"
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
          >
            {wasteTypes.map(type => (
              <option key={type} value={type}>{type === 'all' ? t('waste.allTypes') : type}</option>
            ))}
          </select>
          <select
            className="px-3 py-2 bg-background-secondary border border-border-default rounded-lg text-text-primary"
            value={methodFilter}
            onChange={(e) => setMethodFilter(e.target.value)}
          >
            {disposalMethods.map(method => (
              <option key={method} value={method}>{method === 'all' ? t('waste.allDisposalMethods') : method}</option>
            ))}
          </select>
        </div>
      </Card>

      {/* Waste Records Table */}
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-background-tertiary">
              <tr>
                <th className="text-left py-3 px-4 text-sm font-medium text-text-muted">{t('waste.date')}</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-text-muted">{t('waste.workOrder')}</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-text-muted">{t('waste.product')}</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-text-muted">{t('waste.wasteType')}</th>
                <th className="text-center py-3 px-4 text-sm font-medium text-text-muted">{t('waste.quantity')}</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-text-muted">{t('waste.reason')}</th>
                <th className="text-center py-3 px-4 text-sm font-medium text-text-muted">{t('waste.disposal')}</th>
                <th className="text-right py-3 px-4 text-sm font-medium text-text-muted">{t('waste.cost')}</th>
                <th className="text-center py-3 px-4 text-sm font-medium text-text-muted">{t('waste.actions')}</th>
              </tr>
            </thead>
            <tbody>
              {filteredWaste.map((record, index) => (
                <motion.tr
                  key={record.id}
                  className="border-b border-border-default last:border-b-0"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.03 }}
                >
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-1 text-sm text-text-secondary">
                      <Calendar size={12} />
                      <span>{new Date(record.wasteDate).toLocaleDateString()}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-1 text-sm">
                      <ClipboardList size={12} className="text-text-muted" />
                      <span className="font-mono text-text-secondary">{record.workOrderNo}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <Package size={14} className="text-text-muted" />
                      <span className="text-text-primary">{record.productName}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className="px-2 py-1 rounded-full text-xs font-medium"
                      style={{ backgroundColor: `${getWasteTypeColor(record.wasteType)}20`, color: getWasteTypeColor(record.wasteType) }}
                    >
                      {record.wasteType}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <span className="font-medium text-text-primary">{record.quantity} {record.unit}</span>
                  </td>
                  <td className="py-3 px-4">
                    <span className="text-sm text-text-secondary">{record.reason}</span>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <span
                      className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium"
                      style={{ backgroundColor: `${getDisposalColor(record.disposalMethod)}20`, color: getDisposalColor(record.disposalMethod) }}
                    >
                      {record.disposalMethod === 'Recycling' && <Recycle size={10} />}
                      {record.disposalMethod}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <span className="font-medium text-error">QAR {record.cost.toLocaleString()}</span>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <Dropdown
                      trigger={
                        <Button variant="ghost" size="sm">
                          <MoreVertical size={16} />
                        </Button>
                      }
                      items={[
                        { id: 'view', label: t('waste.viewDetails'), onClick: () => {} },
                        { id: 'edit', label: t('waste.edit'), onClick: () => {} },
                      ]}
                    />
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Waste by Type Summary */}
      <Card className="p-4">
        <h3 className="font-semibold text-text-primary mb-4">{t('waste.wasteByType')}</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {wasteTypes.filter(wt => wt !== 'all').map((type, index) => {
            const typeRecords = wasteRecords.filter(w => w.wasteType === type);
            const totalQty = typeRecords.reduce((acc, w) => acc + w.quantity, 0);
            const totalCost = typeRecords.reduce((acc, w) => acc + w.cost, 0);

            return (
              <motion.div
                key={type}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="p-4 bg-background-tertiary rounded-lg"
              >
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle size={16} style={{ color: getWasteTypeColor(type) }} />
                  <span className="font-medium text-text-primary">{type}</span>
                </div>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span className="text-text-muted">{t('waste.records')}</span>
                    <span className="text-text-primary">{typeRecords.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-muted">{t('waste.quantityLabel')}</span>
                    <span className="text-text-primary">{totalQty.toLocaleString()} {t('waste.kg')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-muted">{t('waste.totalCostLabel')}</span>
                    <span className="text-error font-medium">QAR {totalCost.toLocaleString()}</span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </Card>

      {filteredWaste.length === 0 && (
        <Card className="p-12 text-center">
          <Trash2 size={48} className="mx-auto text-text-muted mb-4" />
          <p className="text-text-secondary">{t('waste.noWasteRecordsFound')}</p>
        </Card>
      )}
    </div>
  );
};

export default Waste;
