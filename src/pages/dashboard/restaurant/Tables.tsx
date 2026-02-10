import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  LayoutGrid,
  Users,
  Clock,
  CheckCircle,
  AlertCircle,
  Sparkles,
  Eye,
  Plus,
} from 'lucide-react';
import { PageHeader, Card, Button } from '@/components/common';
import { tables } from '@/data/restaurant/restaurantData';
import { useTranslation } from 'react-i18next';

export const Tables = () => {
  const { t } = useTranslation('common');
  const [sectionFilter, setSectionFilter] = useState<string>('all');

  const sections = useMemo(() => {
    const uniqueSections = [...new Set(tables.map(t => t.section))];
    return ['all', ...uniqueSections];
  }, []);

  const stats = useMemo(() => ({
    total: tables.length,
    available: tables.filter(t => t.status === 'available').length,
    occupied: tables.filter(t => t.status === 'occupied').length,
    reserved: tables.filter(t => t.status === 'reserved').length,
    cleaning: tables.filter(t => t.status === 'cleaning').length,
  }), []);

  const filteredTables = useMemo(() => {
    if (sectionFilter === 'all') return tables;
    return tables.filter(t => t.section === sectionFilter);
  }, [sectionFilter]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available': return 'bg-success/20 border-success text-success';
      case 'occupied': return 'bg-error/20 border-error text-error';
      case 'reserved': return 'bg-warning/20 border-warning text-warning';
      case 'cleaning': return 'bg-accent-secondary/20 border-accent-secondary text-accent-secondary';
      default: return 'bg-background-secondary border-border-default text-text-muted';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'available': return CheckCircle;
      case 'occupied': return Users;
      case 'reserved': return Clock;
      case 'cleaning': return Sparkles;
      default: return AlertCircle;
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title={t('restaurant.tableManagement', 'Table Management')}
        subtitle="Monitor and manage restaurant tables"
        icon={LayoutGrid}
        actions={
          <Button>
            <Plus size={18} />
            Add Table
          </Button>
        }
      />

      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {[
          { label: 'Total Tables', value: stats.total, icon: LayoutGrid, color: '#f97316' },
          { label: 'Available', value: stats.available, icon: CheckCircle, color: '#10b981' },
          { label: 'Occupied', value: stats.occupied, icon: Users, color: '#ef4444' },
          { label: 'Reserved', value: stats.reserved, icon: Clock, color: '#f59e0b' },
          { label: 'Cleaning', value: stats.cleaning, icon: Sparkles, color: '#8b5cf6' },
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

      {/* Section Filter */}
      <Card className="p-4">
        <div className="flex flex-wrap gap-2">
          {sections.map((section) => (
            <Button
              key={section}
              variant={sectionFilter === section ? 'primary' : 'ghost'}
              size="sm"
              onClick={() => setSectionFilter(section)}
            >
              {section === 'all' ? 'All Sections' : section}
            </Button>
          ))}
        </div>
      </Card>

      {/* Tables Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {filteredTables.map((table, index) => {
          const StatusIcon = getStatusIcon(table.status);
          return (
            <motion.div
              key={table.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.03 }}
            >
              <Card
                className={`p-4 border-2 cursor-pointer transition-all hover:shadow-lg ${getStatusColor(table.status)}`}
              >
                <div className="text-center">
                  <div className="flex items-center justify-center mb-3">
                    <div className={`w-16 h-16 rounded-full flex items-center justify-center ${
                      table.status === 'available' ? 'bg-success/30' :
                      table.status === 'occupied' ? 'bg-error/30' :
                      table.status === 'reserved' ? 'bg-warning/30' : 'bg-accent-secondary/30'
                    }`}>
                      <span className="text-2xl font-bold">{table.number}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-center gap-1 mb-2">
                    <Users size={14} />
                    <span className="text-sm">{table.capacity} seats</span>
                  </div>

                  <div className="flex items-center justify-center gap-1 mb-3">
                    <StatusIcon size={14} />
                    <span className="text-xs capitalize">{table.status}</span>
                  </div>

                  <p className="text-xs text-text-muted mb-3">{table.section}</p>

                  {table.waiter && (
                    <p className="text-xs text-text-secondary mb-2">
                      Waiter: {table.waiter}
                    </p>
                  )}

                  {table.status === 'occupied' && table.occupiedSince && (
                    <p className="text-xs text-text-muted">
                      Since {new Date(table.occupiedSince).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  )}

                  <div className="mt-3 pt-3 border-t border-current/20">
                    <Button variant="ghost" size="sm" className="w-full">
                      <Eye size={14} className="mr-1" />
                      View
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Legend */}
      <Card className="p-4">
        <p className="text-sm text-text-secondary mb-3">Table Status Legend</p>
        <div className="flex flex-wrap gap-4">
          {[
            { status: 'available', label: 'Available', color: '#10b981' },
            { status: 'occupied', label: 'Occupied', color: '#ef4444' },
            { status: 'reserved', label: 'Reserved', color: '#f59e0b' },
            { status: 'cleaning', label: 'Cleaning', color: '#8b5cf6' },
          ].map((item) => (
            <div key={item.status} className="flex items-center gap-2">
              <div
                className="w-4 h-4 rounded-full"
                style={{ backgroundColor: item.color }}
              />
              <span className="text-sm text-text-secondary">{item.label}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default Tables;
