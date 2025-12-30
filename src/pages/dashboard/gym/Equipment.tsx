import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  Plus,
  Search,
  Dumbbell,
  CheckCircle,
  AlertTriangle,
  XCircle,
  Wrench,
  Eye,
  Edit,
} from 'lucide-react';
import { PageHeader, Card, StatsCard, Button, Input } from '@/components/common';
import {
  gymEquipment,
  getEquipmentStatusColor,
  formatDate,
  formatCurrency,
  type GymEquipment,
} from '@/data/gym/gymData';

type StatusFilter = 'all' | 'operational' | 'maintenance' | 'out-of-order';

export const Equipment = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [locationFilter, setLocationFilter] = useState<string>('all');
  const [selectedEquipment, setSelectedEquipment] = useState<GymEquipment | null>(null);

  const categories = useMemo(() => {
    const cats = new Set(gymEquipment.map((e) => e.category));
    return Array.from(cats);
  }, []);

  const locations = useMemo(() => {
    const locs = new Set(gymEquipment.map((e) => e.location));
    return Array.from(locs);
  }, []);

  const filteredEquipment = useMemo(() => {
    return gymEquipment.filter((equipment) => {
      const searchMatch =
        searchQuery === '' ||
        equipment.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        equipment.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
        equipment.serialNumber.toLowerCase().includes(searchQuery.toLowerCase());

      const statusMatch = statusFilter === 'all' || equipment.status === statusFilter;
      const categoryMatch = categoryFilter === 'all' || equipment.category === categoryFilter;
      const locationMatch = locationFilter === 'all' || equipment.location === locationFilter;

      return searchMatch && statusMatch && categoryMatch && locationMatch;
    });
  }, [searchQuery, statusFilter, categoryFilter, locationFilter]);

  const stats = {
    total: gymEquipment.length,
    operational: gymEquipment.filter((e) => e.status === 'operational').length,
    maintenance: gymEquipment.filter((e) => e.status === 'maintenance').length,
    outOfOrder: gymEquipment.filter((e) => e.status === 'out-of-order').length,
  };

  const statCards = [
    { title: 'Total Equipment', value: stats.total.toString(), icon: Dumbbell, iconColor: '#6366f1' },
    { title: 'Operational', value: stats.operational.toString(), icon: CheckCircle, iconColor: '#10b981' },
    { title: 'Under Maintenance', value: stats.maintenance.toString(), icon: AlertTriangle, iconColor: '#f59e0b' },
    { title: 'Out of Order', value: stats.outOfOrder.toString(), icon: XCircle, iconColor: '#ef4444' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <PageHeader
        title="Equipment"
        subtitle="Manage gym equipment and maintenance"
        actions={
          <Button onClick={() => console.log('Add equipment')}>
            <Plus className="h-4 w-4 mr-2" />
            Add Equipment
          </Button>
        }
      />

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((stat) => (
          <StatsCard
            key={stat.title}
            title={stat.title}
            value={stat.value}
            icon={stat.icon}
            iconColor={stat.iconColor}
          />
        ))}
      </div>

      {/* Filters */}
      <Card className="p-4">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-secondary" />
            <Input
              placeholder="Search equipment..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as StatusFilter)}
            className="px-3 py-2 bg-background-tertiary border border-border-default rounded-lg text-text-primary focus:outline-none focus:border-accent-primary"
          >
            <option value="all">All Status</option>
            <option value="operational">Operational</option>
            <option value="maintenance">Under Maintenance</option>
            <option value="out-of-order">Out of Order</option>
          </select>

          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-3 py-2 bg-background-tertiary border border-border-default rounded-lg text-text-primary focus:outline-none focus:border-accent-primary"
          >
            <option value="all">All Categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>

          <select
            value={locationFilter}
            onChange={(e) => setLocationFilter(e.target.value)}
            className="px-3 py-2 bg-background-tertiary border border-border-default rounded-lg text-text-primary focus:outline-none focus:border-accent-primary"
          >
            <option value="all">All Locations</option>
            {locations.map((loc) => (
              <option key={loc} value={loc}>
                {loc}
              </option>
            ))}
          </select>
        </div>
      </Card>

      {/* Equipment Table */}
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border-default">
                <th className="text-left py-3 px-4 text-xs font-semibold text-text-secondary uppercase">
                  Equipment
                </th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-text-secondary uppercase">
                  Category
                </th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-text-secondary uppercase">
                  Brand/Model
                </th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-text-secondary uppercase">
                  Location
                </th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-text-secondary uppercase">
                  Status
                </th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-text-secondary uppercase">
                  Condition
                </th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-text-secondary uppercase">
                  Last Maintenance
                </th>
                <th className="text-right py-3 px-4 text-xs font-semibold text-text-secondary uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredEquipment.map((equipment) => (
                <tr
                  key={equipment.id}
                  className="border-b border-border-default hover:bg-background-secondary/50 cursor-pointer"
                  onClick={() => setSelectedEquipment(equipment)}
                >
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-accent-primary/10 flex items-center justify-center">
                        <Dumbbell className="h-5 w-5 text-accent-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-text-primary">{equipment.name}</p>
                        <p className="text-xs text-text-secondary font-mono">{equipment.serialNumber}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-1 rounded-full text-xs font-medium bg-background-tertiary text-text-primary">
                      {equipment.category}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-text-secondary">
                    {equipment.brand} {equipment.model}
                  </td>
                  <td className="py-3 px-4 text-text-secondary text-sm">{equipment.location}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium border ${getEquipmentStatusColor(
                        equipment.status
                      )}`}
                    >
                      {equipment.status === 'out-of-order'
                        ? 'Out of Order'
                        : equipment.status === 'maintenance'
                        ? 'Maintenance'
                        : 'Operational'}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        equipment.condition === 'excellent'
                          ? 'bg-green-500/10 text-green-400'
                          : equipment.condition === 'good'
                          ? 'bg-blue-500/10 text-blue-400'
                          : equipment.condition === 'fair'
                          ? 'bg-orange-500/10 text-orange-400'
                          : 'bg-red-500/10 text-red-400'
                      }`}
                    >
                      {equipment.condition.charAt(0).toUpperCase() + equipment.condition.slice(1)}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-text-secondary text-sm">
                    {formatDate(equipment.lastMaintenance)}
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedEquipment(equipment);
                        }}
                        className="p-1.5 text-text-secondary hover:text-accent-primary transition-colors"
                        title="View Details"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          console.log('Schedule maintenance', equipment.id);
                        }}
                        className="p-1.5 text-text-secondary hover:text-orange-400 transition-colors"
                        title="Schedule Maintenance"
                      >
                        <Wrench className="h-4 w-4" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          console.log('Edit', equipment.id);
                        }}
                        className="p-1.5 text-text-secondary hover:text-text-primary transition-colors"
                        title="Edit"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {filteredEquipment.length === 0 && (
        <Card className="p-12 text-center">
          <Dumbbell className="h-12 w-12 mx-auto text-text-muted mb-4" />
          <h3 className="text-lg font-medium text-text-primary mb-2">No equipment found</h3>
          <p className="text-text-secondary">Try adjusting your search or filter criteria</p>
        </Card>
      )}

      {/* Equipment Detail Modal */}
      {selectedEquipment && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-background-secondary border border-border-default rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="p-6 border-b border-border-default">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-lg bg-accent-primary/10 flex items-center justify-center">
                    <Dumbbell className="h-7 w-7 text-accent-primary" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-text-primary">{selectedEquipment.name}</h2>
                    <p className="text-text-secondary font-mono text-sm">
                      {selectedEquipment.serialNumber}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedEquipment(null)}
                  className="text-text-secondary hover:text-text-primary text-2xl"
                >
                  ×
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              <div className="flex flex-wrap gap-2">
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium border ${getEquipmentStatusColor(
                    selectedEquipment.status
                  )}`}
                >
                  {selectedEquipment.status === 'out-of-order'
                    ? 'Out of Order'
                    : selectedEquipment.status === 'maintenance'
                    ? 'Under Maintenance'
                    : 'Operational'}
                </span>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    selectedEquipment.condition === 'excellent'
                      ? 'bg-green-500/10 text-green-400'
                      : selectedEquipment.condition === 'good'
                      ? 'bg-blue-500/10 text-blue-400'
                      : selectedEquipment.condition === 'fair'
                      ? 'bg-orange-500/10 text-orange-400'
                      : 'bg-red-500/10 text-red-400'
                  }`}
                >
                  Condition: {selectedEquipment.condition.charAt(0).toUpperCase() + selectedEquipment.condition.slice(1)}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-text-secondary">Brand</p>
                  <p className="text-text-primary font-medium">{selectedEquipment.brand}</p>
                </div>
                <div>
                  <p className="text-sm text-text-secondary">Model</p>
                  <p className="text-text-primary font-medium">{selectedEquipment.model}</p>
                </div>
                <div>
                  <p className="text-sm text-text-secondary">Category</p>
                  <p className="text-text-primary font-medium">{selectedEquipment.category}</p>
                </div>
                <div>
                  <p className="text-sm text-text-secondary">Location</p>
                  <p className="text-text-primary font-medium">{selectedEquipment.location}</p>
                </div>
              </div>

              <div className="border-t border-border-default pt-4">
                <h3 className="text-sm font-semibold text-text-primary mb-3">Purchase Details</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-text-secondary">Purchase Date</p>
                    <p className="text-text-primary">{formatDate(selectedEquipment.purchaseDate)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-text-secondary">Purchase Price</p>
                    <p className="text-text-primary">{formatCurrency(selectedEquipment.purchasePrice)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-text-secondary">Warranty Expiry</p>
                    <p className="text-text-primary">{formatDate(selectedEquipment.warrantyExpiry)}</p>
                  </div>
                  {selectedEquipment.usageHours && (
                    <div>
                      <p className="text-sm text-text-secondary">Usage Hours</p>
                      <p className="text-text-primary">{selectedEquipment.usageHours.toLocaleString()} hours</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="border-t border-border-default pt-4">
                <h3 className="text-sm font-semibold text-text-primary mb-3">Maintenance</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-text-secondary">Last Maintenance</p>
                    <p className="text-text-primary">{formatDate(selectedEquipment.lastMaintenance)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-text-secondary">Next Maintenance</p>
                    <p className="text-text-primary">
                      {selectedEquipment.nextMaintenance
                        ? formatDate(selectedEquipment.nextMaintenance)
                        : 'Not scheduled'}
                    </p>
                  </div>
                </div>
              </div>

              {selectedEquipment.notes && (
                <div className="border-t border-border-default pt-4">
                  <h3 className="text-sm font-semibold text-text-primary mb-2">Notes</h3>
                  <p className="text-text-secondary">{selectedEquipment.notes}</p>
                </div>
              )}
            </div>

            <div className="p-6 border-t border-border-default flex gap-2">
              <Button variant="outline" className="flex-1" onClick={() => setSelectedEquipment(null)}>
                Close
              </Button>
              <Button
                variant="outline"
                className="flex-1 text-orange-400 border-orange-400/50 hover:bg-orange-400/10"
                onClick={() => console.log('Schedule maintenance')}
              >
                <Wrench className="h-4 w-4 mr-2" />
                Schedule Maintenance
              </Button>
              <Button className="flex-1" onClick={() => console.log('Edit equipment')}>
                <Edit className="h-4 w-4 mr-2" />
                Edit
              </Button>
            </div>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
};
