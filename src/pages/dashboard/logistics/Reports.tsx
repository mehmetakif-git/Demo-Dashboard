import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  BarChart3,
  Download,
  DollarSign,
  Package,
  Truck,
  Clock,
  Fuel,
  Wrench,
  Gauge,
  CheckCircle,
  TrendingUp,
  Users,
  Star,
} from 'lucide-react';
import { PageHeader, Card, Button } from '@/components/common';
import {
  shipments,
  vehicles,
  fuelRecords,
  maintenanceRecords,
  invoices,
  clients,
  drivers,
  LOGISTICS_COLOR,
} from '@/data/logistics/logisticsData';

export const Reports = () => {
  const [dateRange, setDateRange] = useState('month');

  const stats = useMemo(() => {
    const totalRevenue = invoices.reduce((acc, i) => acc + i.total, 0);
    const totalShipments = shipments.length;
    const totalDistance = vehicles.reduce((acc, v) => acc + v.mileage, 0);
    const avgDeliveryTime = 45; // Placeholder
    const fuelCost = fuelRecords.reduce((acc, f) => acc + f.totalCost, 0);
    const maintenanceCost = maintenanceRecords.filter(m => m.status === 'completed').reduce((acc, m) => acc + m.cost, 0);
    const fleetUtilization = Math.round((vehicles.filter(v => v.status === 'active' || v.status === 'on-route').length / vehicles.length) * 100);
    const onTimeDelivery = 92; // Placeholder

    return { totalRevenue, totalShipments, totalDistance, avgDeliveryTime, fuelCost, maintenanceCost, fleetUtilization, onTimeDelivery };
  }, []);

  const shipmentsByStatus = useMemo(() => {
    const statusCounts: Record<string, number> = {};
    shipments.forEach(s => {
      statusCounts[s.status] = (statusCounts[s.status] || 0) + 1;
    });
    return Object.entries(statusCounts).map(([status, count]) => ({ status, count }));
  }, []);

  const topClients = useMemo(() => {
    return [...clients].sort((a, b) => b.totalShipments - a.totalShipments).slice(0, 5);
  }, []);

  const driverPerformance = useMemo(() => {
    return [...drivers]
      .filter(d => d.status === 'active')
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 5);
  }, []);

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      'pending': '#64748b',
      'scheduled': '#3b82f6',
      'in-transit': '#f59e0b',
      'delivered': '#10b981',
      'cancelled': '#ef4444',
    };
    return colors[status] || LOGISTICS_COLOR;
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Reports & Analytics"
        subtitle="View performance metrics and generate reports"
        icon={BarChart3}
        actions={
          <div className="flex gap-2">
            <select
              className="px-3 py-2 bg-background-secondary border border-border-default rounded-lg text-text-primary"
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
            >
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="quarter">This Quarter</option>
              <option value="year">This Year</option>
            </select>
            <Button>
              <Download size={18} />
              Export Report
            </Button>
          </div>
        }
      />

      {/* Key Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Revenue', value: `QAR ${stats.totalRevenue.toLocaleString()}`, icon: DollarSign, color: '#10b981' },
          { label: 'Total Shipments', value: stats.totalShipments, icon: Package, color: LOGISTICS_COLOR },
          { label: 'Total Distance', value: `${(stats.totalDistance / 1000).toFixed(0)}K km`, icon: Truck, color: '#3b82f6' },
          { label: 'Avg Delivery Time', value: `${stats.avgDeliveryTime} min`, icon: Clock, color: '#f59e0b' },
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

      {/* Secondary Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Fuel Cost', value: `QAR ${stats.fuelCost.toLocaleString()}`, icon: Fuel, color: '#ef4444' },
          { label: 'Maintenance Cost', value: `QAR ${stats.maintenanceCost.toLocaleString()}`, icon: Wrench, color: '#f59e0b' },
          { label: 'Fleet Utilization', value: `${stats.fleetUtilization}%`, icon: Gauge, color: stats.fleetUtilization >= 70 ? '#10b981' : '#f59e0b' },
          { label: 'On-time Delivery', value: `${stats.onTimeDelivery}%`, icon: CheckCircle, color: stats.onTimeDelivery >= 90 ? '#10b981' : '#f59e0b' },
        ].map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: (index + 4) * 0.05 }}
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Shipments by Status */}
        <Card className="p-4">
          <h3 className="font-semibold text-text-primary mb-4">Shipments by Status</h3>
          <div className="space-y-3">
            {shipmentsByStatus.map((item, index) => {
              const percentage = Math.round((item.count / shipments.length) * 100);
              return (
                <motion.div
                  key={item.status}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-text-secondary capitalize">{item.status.replace(/-/g, ' ')}</span>
                    <span className="text-sm font-medium text-text-primary">{item.count} ({percentage}%)</span>
                  </div>
                  <div className="w-full bg-background-tertiary rounded-full h-2">
                    <div
                      className="h-2 rounded-full transition-all duration-500"
                      style={{ width: `${percentage}%`, backgroundColor: getStatusColor(item.status) }}
                    />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </Card>

        {/* Top Clients */}
        <Card className="p-4">
          <h3 className="font-semibold text-text-primary mb-4">Top Clients by Shipments</h3>
          <div className="space-y-3">
            {topClients.map((client, index) => (
              <motion.div
                key={client.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="flex items-center justify-between p-3 bg-background-tertiary rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: `${LOGISTICS_COLOR}20` }}
                  >
                    <span className="text-sm font-bold" style={{ color: LOGISTICS_COLOR }}>
                      {index + 1}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium text-text-primary">{client.companyName}</p>
                    <p className="text-xs text-text-muted">{client.industry}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium text-text-primary">{client.totalShipments}</p>
                  <p className="text-xs text-text-muted">shipments</p>
                </div>
              </motion.div>
            ))}
          </div>
        </Card>

        {/* Driver Performance */}
        <Card className="p-4">
          <h3 className="font-semibold text-text-primary mb-4">Driver Performance</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border-default">
                  <th className="text-left py-2 text-sm font-medium text-text-muted">Driver</th>
                  <th className="text-center py-2 text-sm font-medium text-text-muted">Trips</th>
                  <th className="text-center py-2 text-sm font-medium text-text-muted">Rating</th>
                </tr>
              </thead>
              <tbody>
                {driverPerformance.map((driver, index) => (
                  <motion.tr
                    key={driver.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.05 }}
                    className="border-b border-border-default last:border-b-0"
                  >
                    <td className="py-3">
                      <div className="flex items-center gap-2">
                        <Users size={14} className="text-text-muted" />
                        <span className="text-text-primary">{driver.name}</span>
                      </div>
                    </td>
                    <td className="py-3 text-center">
                      <span className="text-text-primary">{driver.totalTrips.toLocaleString()}</span>
                    </td>
                    <td className="py-3 text-center">
                      <div className="flex items-center justify-center gap-1">
                        <Star size={14} className="text-warning fill-warning" />
                        <span className="font-medium text-text-primary">{driver.rating}</span>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Revenue Placeholder Chart */}
        <Card className="p-4">
          <h3 className="font-semibold text-text-primary mb-4">Revenue Trend</h3>
          <div className="h-64 flex items-center justify-center bg-background-tertiary rounded-lg">
            <div className="text-center">
              <TrendingUp size={48} className="mx-auto text-text-muted mb-2" />
              <p className="text-text-muted">Chart placeholder</p>
              <p className="text-xs text-text-muted mt-1">Revenue trend visualization would appear here</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Export Options */}
      <Card className="p-4">
        <h3 className="font-semibold text-text-primary mb-4">Export Reports</h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {[
            { label: 'Financial Summary', icon: DollarSign },
            { label: 'Shipment Report', icon: Package },
            { label: 'Fleet Report', icon: Truck },
            { label: 'Fuel Report', icon: Fuel },
            { label: 'Maintenance Report', icon: Wrench },
          ].map((report, index) => {
            const Icon = report.icon;
            return (
              <motion.div
                key={report.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Button variant="ghost" className="w-full flex flex-col items-center gap-2 h-auto py-4">
                  <Icon size={24} style={{ color: LOGISTICS_COLOR }} />
                  <span className="text-xs">{report.label}</span>
                </Button>
              </motion.div>
            );
          })}
        </div>
      </Card>
    </div>
  );
};

export default Reports;
