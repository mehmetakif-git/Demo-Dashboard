import { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import {
  Warehouse,
  Search,
  Plus,
  Package,
  MapPin,
  MoreVertical,
  AlertTriangle,
  DollarSign,
  Building2,
} from 'lucide-react';
import { PageHeader, Card, Button, Input, Dropdown } from '@/components/common';
import { warehouseInventory, clients, LOGISTICS_COLOR } from '@/data/logistics/logisticsData';

export const WarehousePage = () => {
  const { t } = useTranslation('logistics');
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [clientFilter, setClientFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const statusFilterMap: Record<string, string> = {
    'all': t('status.all'),
    'in-stock': t('status.inStock'),
    'reserved': t('status.reserved'),
    'low-stock': t('status.lowStock'),
  };

  const itemStatusMap: Record<string, string> = {
    'in-stock': t('status.inStock'),
    'reserved': t('status.reserved'),
    'low-stock': t('status.lowStock'),
  };

  const categories = useMemo(() => {
    return ['all', ...new Set(warehouseInventory.map(i => i.category))];
  }, []);

  const stats = useMemo(() => {
    const totalItems = warehouseInventory.length;
    const totalValue = warehouseInventory.reduce((acc, i) => acc + i.value, 0);
    const totalClients = new Set(warehouseInventory.map(i => i.clientId)).size;
    const lowStock = warehouseInventory.filter(i => i.status === 'low-stock').length;

    return { totalItems, totalValue, totalClients, lowStock };
  }, []);

  const filteredInventory = useMemo(() => {
    return warehouseInventory.filter(item => {
      const matchesSearch = item.itemCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.itemName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.clientName.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory = categoryFilter === 'all' || item.category === categoryFilter;
      const matchesClient = clientFilter === 'all' || item.clientId === clientFilter;
      const matchesStatus = statusFilter === 'all' || item.status === statusFilter;

      return matchesSearch && matchesCategory && matchesClient && matchesStatus;
    });
  }, [searchQuery, categoryFilter, clientFilter, statusFilter]);

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      'in-stock': '#10b981',
      'reserved': '#3b82f6',
      'low-stock': '#f59e0b',
    };
    return colors[status] || LOGISTICS_COLOR;
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title={t('warehouse.title')}
        subtitle={t('warehouse.subtitle')}
        icon={Warehouse}
        actions={
          <Button>
            <Plus size={18} />
            {t('warehouse.receiveInventory')}
          </Button>
        }
      />

      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: t('warehouse.totalItems'), value: stats.totalItems, icon: Package, color: LOGISTICS_COLOR },
          { label: t('warehouse.totalValue'), value: `QAR ${stats.totalValue.toLocaleString()}`, icon: DollarSign, color: '#10b981' },
          { label: t('warehouse.clients'), value: stats.totalClients, icon: Building2, color: '#3b82f6' },
          { label: t('warehouse.lowStock'), value: stats.lowStock, icon: AlertTriangle, color: stats.lowStock > 0 ? '#f59e0b' : '#10b981' },
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
              placeholder={t('warehouse.searchPlaceholder')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <select
            className="px-3 py-2 bg-background-secondary border border-border-default rounded-lg text-text-primary"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat === 'all' ? t('warehouse.allCategories') : cat}</option>
            ))}
          </select>
          <select
            className="px-3 py-2 bg-background-secondary border border-border-default rounded-lg text-text-primary"
            value={clientFilter}
            onChange={(e) => setClientFilter(e.target.value)}
          >
            <option value="all">{t('warehouse.allClients')}</option>
            {clients.map(c => (
              <option key={c.id} value={c.id}>{c.companyName}</option>
            ))}
          </select>
          <div className="flex gap-2">
            {['all', 'in-stock', 'reserved', 'low-stock'].map((status) => (
              <Button
                key={status}
                variant={statusFilter === status ? 'primary' : 'ghost'}
                size="sm"
                onClick={() => setStatusFilter(status)}
              >
                {statusFilterMap[status]}
              </Button>
            ))}
          </div>
        </div>
      </Card>

      {/* Inventory Table */}
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-background-tertiary">
              <tr>
                <th className="text-left py-3 px-4 text-sm font-medium text-text-muted">{t('warehouse.item')}</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-text-muted">{t('warehouse.category')}</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-text-muted">{t('warehouse.client')}</th>
                <th className="text-center py-3 px-4 text-sm font-medium text-text-muted">{t('warehouse.quantity')}</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-text-muted">{t('warehouse.location')}</th>
                <th className="text-right py-3 px-4 text-sm font-medium text-text-muted">{t('warehouse.value')}</th>
                <th className="text-center py-3 px-4 text-sm font-medium text-text-muted">{t('warehouse.status')}</th>
                <th className="text-center py-3 px-4 text-sm font-medium text-text-muted">{t('warehouse.actions')}</th>
              </tr>
            </thead>
            <tbody>
              {filteredInventory.map((item, index) => (
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
                        style={{ backgroundColor: `${LOGISTICS_COLOR}20` }}
                      >
                        <Package size={20} style={{ color: LOGISTICS_COLOR }} />
                      </div>
                      <div>
                        <p className="font-medium text-text-primary">{item.itemName}</p>
                        <p className="text-xs font-mono text-text-muted">{item.itemCode}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span className="text-text-secondary">{item.category}</span>
                  </td>
                  <td className="py-3 px-4">
                    <span className="text-text-primary">{item.clientName}</span>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <div>
                      <p className="font-medium text-text-primary">{item.availableQty} / {item.quantity}</p>
                      <p className="text-xs text-text-muted">{item.unit}</p>
                      {item.reservedQty > 0 && (
                        <p className="text-xs text-info mt-1">{t('warehouse.reserved')} {item.reservedQty}</p>
                      )}
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-1 text-sm">
                      <MapPin size={12} className="text-text-muted" />
                      <span className="text-text-secondary">{item.location}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <p className="font-medium text-text-primary">QAR {item.value.toLocaleString()}</p>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <span
                      className="px-2 py-1 rounded-full text-xs font-medium"
                      style={{ backgroundColor: `${getStatusColor(item.status)}20`, color: getStatusColor(item.status) }}
                    >
                      {itemStatusMap[item.status] || item.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <Dropdown
                      trigger={
                        <Button variant="ghost" size="sm">
                          <MoreVertical size={16} />
                        </Button>
                      }
                      items={[
                        { id: 'view', label: t('warehouse.viewDetails'), onClick: () => {} },
                        { id: 'edit', label: t('warehouse.edit'), onClick: () => {} },
                        { id: 'reserve', label: t('warehouse.reserve'), onClick: () => {} },
                        { id: 'dispatch', label: t('warehouse.dispatch'), onClick: () => {} },
                      ]}
                    />
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {filteredInventory.length === 0 && (
        <Card className="p-12 text-center">
          <Warehouse size={48} className="mx-auto text-text-muted mb-4" />
          <p className="text-text-secondary">{t('warehouse.noItemsFound')}</p>
        </Card>
      )}
    </div>
  );
};

export default WarehousePage;
