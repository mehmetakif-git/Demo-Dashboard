import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  Search,
  Shirt,
  Package,
  QrCode,
  MapPin,
  Clock,
  CheckCircle,
  AlertCircle,
  RefreshCw,
} from 'lucide-react';
import { PageHeader, Card, StatsCard, Input, Button } from '@/components/common';
import {
  garmentTracking,
  formatDateTime,
} from '@/data/laundry/laundryData';

export const GarmentTracking = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');

  const stats = useMemo(() => {
    const statusCounts = garmentTracking.reduce((acc, g) => {
      acc[g.status] = (acc[g.status] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return {
      total: garmentTracking.length,
      received: statusCounts['received'] || 0,
      processing: (statusCounts['washing'] || 0) + (statusCounts['drying'] || 0) + (statusCounts['ironing'] || 0),
      ready: statusCounts['ready'] || 0,
    };
  }, []);

  const filteredGarments = useMemo(() => {
    let filtered = [...garmentTracking];

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (g) =>
          g.barcode.toLowerCase().includes(query) ||
          g.orderNumber.toLowerCase().includes(query) ||
          g.garmentName.toLowerCase().includes(query)
      );
    }

    if (selectedStatus !== 'all') {
      filtered = filtered.filter((g) => g.status === selectedStatus);
    }

    return filtered;
  }, [searchQuery, selectedStatus]);

  const statusSteps = ['received', 'sorting', 'washing', 'drying', 'ironing', 'folding', 'packaging', 'ready'];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'received':
        return 'bg-purple-500/20 text-purple-400';
      case 'sorting':
        return 'bg-amber-500/20 text-amber-400';
      case 'washing':
        return 'bg-blue-500/20 text-blue-400';
      case 'drying':
        return 'bg-cyan-500/20 text-cyan-400';
      case 'ironing':
        return 'bg-orange-500/20 text-orange-400';
      case 'folding':
        return 'bg-pink-500/20 text-pink-400';
      case 'packaging':
        return 'bg-indigo-500/20 text-indigo-400';
      case 'ready':
        return 'bg-emerald-500/20 text-emerald-400';
      default:
        return 'bg-gray-500/20 text-gray-400';
    }
  };

  const getStepIndex = (status: string) => statusSteps.indexOf(status);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Garment Tracking"
        subtitle="Track individual garments through the cleaning process"
        actions={
          <Button variant="secondary" leftIcon={<QrCode size={16} />}>
            Scan Barcode
          </Button>
        }
      />

      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatsCard
          title="Total Garments"
          value={stats.total.toString()}
          icon={Shirt}
          iconColor="#0ea5e9"
        />
        <StatsCard
          title="Received"
          value={stats.received.toString()}
          icon={Package}
          iconColor="#8b5cf6"
        />
        <StatsCard
          title="Processing"
          value={stats.processing.toString()}
          icon={RefreshCw}
          iconColor="#f59e0b"
        />
        <StatsCard
          title="Ready"
          value={stats.ready.toString()}
          icon={CheckCircle}
          iconColor="#10b981"
        />
      </div>

      {/* Filter Bar */}
      <Card className="p-4">
        <div className="flex flex-wrap gap-4 items-center">
          <div className="flex-1 min-w-[200px] max-w-md">
            <Input
              placeholder="Search by barcode, order #, or garment..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              leftIcon={<Search size={16} />}
            />
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedStatus('all')}
              className={`px-3 py-1.5 rounded-lg text-sm transition-all cursor-pointer ${
                selectedStatus === 'all'
                  ? 'bg-sky-500/20 text-sky-400 border border-sky-500/50'
                  : 'bg-white/[0.05] text-text-secondary hover:bg-white/[0.08] border border-transparent'
              }`}
            >
              All
            </button>
            {statusSteps.map((status) => (
              <button
                key={status}
                onClick={() => setSelectedStatus(status)}
                className={`px-3 py-1.5 rounded-lg text-sm transition-all cursor-pointer capitalize ${
                  selectedStatus === status
                    ? 'bg-sky-500/20 text-sky-400 border border-sky-500/50'
                    : 'bg-white/[0.05] text-text-secondary hover:bg-white/[0.08] border border-transparent'
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>
      </Card>

      {/* Garment List */}
      <div className="space-y-4">
        {filteredGarments.map((garment, index) => {
          const currentStep = getStepIndex(garment.status);

          return (
            <motion.div
              key={garment.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card className="p-6">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-lg bg-sky-500/20 flex items-center justify-center">
                      <Shirt size={32} className="text-sky-400" />
                    </div>
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <h3 className="text-lg font-semibold text-text-primary">{garment.garmentName}</h3>
                        <span className={`px-2 py-0.5 rounded text-xs ${getStatusColor(garment.status)}`}>
                          {garment.status.charAt(0).toUpperCase() + garment.status.slice(1)}
                        </span>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-text-muted">
                        <div className="flex items-center gap-1">
                          <QrCode size={14} />
                          {garment.barcode}
                        </div>
                        <div className="flex items-center gap-1">
                          <Package size={14} />
                          {garment.orderNumber}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="flex items-center gap-2 text-text-secondary">
                      <MapPin size={14} className="text-text-muted" />
                      {garment.location}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-text-muted mt-1">
                      <Clock size={12} />
                      {formatDateTime(garment.lastUpdated)}
                    </div>
                  </div>
                </div>

                {/* Progress Steps */}
                <div className="relative">
                  <div className="flex items-center justify-between">
                    {statusSteps.map((step, idx) => {
                      const isCompleted = idx <= currentStep;
                      const isCurrent = idx === currentStep;

                      return (
                        <div key={step} className="flex flex-col items-center flex-1">
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center z-10 text-xs font-medium ${
                              isCompleted
                                ? 'bg-sky-500 text-white'
                                : 'bg-white/[0.05] text-text-muted'
                            } ${isCurrent ? 'ring-4 ring-sky-500/30' : ''}`}
                          >
                            {isCompleted ? <CheckCircle size={14} /> : idx + 1}
                          </div>
                          <p className={`mt-2 text-[10px] text-center capitalize ${
                            isCompleted ? 'text-text-primary' : 'text-text-muted'
                          }`}>
                            {step}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                  {/* Progress Line */}
                  <div
                    className="absolute top-4 left-0 right-0 h-0.5 bg-white/[0.1]"
                    style={{ transform: 'translateY(-50%)', margin: '0 4%' }}
                  >
                    <div
                      className="h-full bg-sky-500 transition-all"
                      style={{ width: `${(currentStep / (statusSteps.length - 1)) * 100}%` }}
                    />
                  </div>
                </div>

                {garment.notes && (
                  <div className="mt-4 p-3 bg-amber-500/10 border border-amber-500/20 rounded-lg">
                    <div className="flex items-center gap-2 text-amber-400">
                      <AlertCircle size={14} />
                      <span className="text-sm">{garment.notes}</span>
                    </div>
                  </div>
                )}
              </Card>
            </motion.div>
          );
        })}
      </div>

      {filteredGarments.length === 0 && (
        <Card className="p-12 text-center">
          <Shirt size={48} className="mx-auto mb-4 text-text-muted" />
          <p className="text-text-secondary">No garments found matching your search</p>
        </Card>
      )}
    </div>
  );
};
