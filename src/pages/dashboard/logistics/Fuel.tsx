import { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import {
  Fuel,
  Search,
  Plus,
  Truck,
  User,
  Calendar,
  MoreVertical,
  DollarSign,
  Gauge,
  Droplets,
  MapPin,
} from 'lucide-react';
import { PageHeader, Card, Button, Input, Dropdown } from '@/components/common';
import { fuelRecords, vehicles, LOGISTICS_COLOR } from '@/data/logistics/logisticsData';

export const FuelPage = () => {
  const { t } = useTranslation('logistics');
  const [searchQuery, setSearchQuery] = useState('');
  const [vehicleFilter, setVehicleFilter] = useState<string>('all');
  const [paymentFilter, setPaymentFilter] = useState<string>('all');

  const stats = useMemo(() => {
    const totalCost = fuelRecords.reduce((acc, f) => acc + f.totalCost, 0);
    const totalLiters = fuelRecords.reduce((acc, f) => acc + f.quantity, 0);
    const avgEfficiency = fuelRecords.length > 0
      ? (fuelRecords.reduce((acc, f) => acc + f.fuelEfficiency, 0) / fuelRecords.length).toFixed(1)
      : '0';

    // Find top consumer
    const vehicleTotals: Record<string, number> = {};
    fuelRecords.forEach(f => {
      vehicleTotals[f.vehiclePlate] = (vehicleTotals[f.vehiclePlate] || 0) + f.totalCost;
    });
    const topConsumer = Object.entries(vehicleTotals).sort((a, b) => b[1] - a[1])[0];

    return { totalCost, totalLiters, avgEfficiency, topConsumer: topConsumer ? topConsumer[0] : 'N/A' };
  }, []);

  const filteredRecords = useMemo(() => {
    return fuelRecords.filter(record => {
      const matchesSearch = record.vehiclePlate.toLowerCase().includes(searchQuery.toLowerCase()) ||
        record.driverName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        record.station.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesVehicle = vehicleFilter === 'all' || record.vehicleId === vehicleFilter;
      const matchesPayment = paymentFilter === 'all' || record.paymentMethod === paymentFilter;

      return matchesSearch && matchesVehicle && matchesPayment;
    });
  }, [searchQuery, vehicleFilter, paymentFilter]);

  return (
    <div className="space-y-6">
      <PageHeader
        title={t('fuel.title')}
        subtitle={t('fuel.subtitle')}
        icon={Fuel}
        actions={
          <Button>
            <Plus size={18} />
            {t('fuel.addFuelRecord')}
          </Button>
        }
      />

      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: t('fuel.totalFuelCost'), value: `QAR ${stats.totalCost.toLocaleString()}`, icon: DollarSign, color: '#ef4444' },
          { label: t('fuel.totalLiters'), value: stats.totalLiters.toLocaleString(), icon: Droplets, color: LOGISTICS_COLOR },
          { label: t('fuel.avgEfficiency'), value: `${stats.avgEfficiency} ${t('fuel.kmPerLiter')}`, icon: Gauge, color: '#10b981' },
          { label: t('fuel.topConsumer'), value: stats.topConsumer, icon: Truck, color: '#f59e0b' },
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
              placeholder={t('fuel.searchPlaceholder')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <select
            className="px-3 py-2 bg-background-secondary border border-border-default rounded-lg text-text-primary"
            value={vehicleFilter}
            onChange={(e) => setVehicleFilter(e.target.value)}
          >
            <option value="all">{t('fuel.allVehicles')}</option>
            {vehicles.map(v => (
              <option key={v.id} value={v.id}>{v.plateNo}</option>
            ))}
          </select>
          <select
            className="px-3 py-2 bg-background-secondary border border-border-default rounded-lg text-text-primary"
            value={paymentFilter}
            onChange={(e) => setPaymentFilter(e.target.value)}
          >
            <option value="all">{t('fuel.allPaymentMethods')}</option>
            <option value="Company Card">{t('fuel.companyCard')}</option>
            <option value="Cash">{t('fuel.cash')}</option>
          </select>
        </div>
      </Card>

      {/* Fuel Records Table */}
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-background-tertiary">
              <tr>
                <th className="text-left py-3 px-4 text-sm font-medium text-text-muted">{t('fuel.dateTime')}</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-text-muted">{t('fuel.vehicle')}</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-text-muted">{t('fuel.driver')}</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-text-muted">{t('fuel.station')}</th>
                <th className="text-center py-3 px-4 text-sm font-medium text-text-muted">{t('fuel.quantity')}</th>
                <th className="text-right py-3 px-4 text-sm font-medium text-text-muted">{t('fuel.cost')}</th>
                <th className="text-center py-3 px-4 text-sm font-medium text-text-muted">{t('fuel.efficiency')}</th>
                <th className="text-center py-3 px-4 text-sm font-medium text-text-muted">{t('fuel.payment')}</th>
                <th className="text-center py-3 px-4 text-sm font-medium text-text-muted">{t('fuel.actions')}</th>
              </tr>
            </thead>
            <tbody>
              {filteredRecords.map((record, index) => (
                <motion.tr
                  key={record.id}
                  className="border-b border-border-default last:border-b-0"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.03 }}
                >
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <Calendar size={14} className="text-text-muted" />
                      <div>
                        <p className="text-sm text-text-primary">{new Date(record.fuelDate).toLocaleDateString()}</p>
                        <p className="text-xs text-text-muted">{record.fuelTime}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <Truck size={14} className="text-text-muted" />
                      <span className="font-medium text-text-primary">{record.vehiclePlate}</span>
                    </div>
                    <p className="text-xs text-text-muted mt-1">{t('fuel.mileage')} {record.mileage.toLocaleString()} km</p>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <User size={14} className="text-text-muted" />
                      <span className="text-text-secondary">{record.driverName}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <MapPin size={14} className="text-text-muted" />
                      <span className="text-text-secondary">{record.station}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <div className="flex items-center justify-center gap-1">
                      <Droplets size={14} style={{ color: LOGISTICS_COLOR }} />
                      <span className="font-medium text-text-primary">{record.quantity}</span>
                      <span className="text-text-muted text-xs">{t('fuel.liters')}</span>
                    </div>
                    <p className="text-xs text-text-muted mt-1">@ QAR {record.pricePerLiter}{t('fuel.perLiter')}</p>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <p className="font-medium text-text-primary">QAR {record.totalCost.toFixed(2)}</p>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <div className="flex items-center justify-center gap-1">
                      <Gauge size={14} className="text-text-muted" />
                      <span className={`font-medium ${record.fuelEfficiency >= 7 ? 'text-success' : 'text-warning'}`}>
                        {record.fuelEfficiency}
                      </span>
                      <span className="text-text-muted text-xs">{t('fuel.kmPerLiter')}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <span className="px-2 py-1 bg-background-tertiary rounded text-xs text-text-secondary">
                      {record.paymentMethod}
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
                        { id: 'view', label: t('fuel.viewDetails'), onClick: () => {} },
                        { id: 'edit', label: t('fuel.edit'), onClick: () => {} },
                        { id: 'delete', label: t('fuel.delete'), onClick: () => {} },
                      ]}
                    />
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {filteredRecords.length === 0 && (
        <Card className="p-12 text-center">
          <Fuel size={48} className="mx-auto text-text-muted mb-4" />
          <p className="text-text-secondary">{t('fuel.noFuelRecordsFound')}</p>
        </Card>
      )}
    </div>
  );
};

export default FuelPage;
