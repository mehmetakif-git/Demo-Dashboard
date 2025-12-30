import { useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  Box,
  MapPin,
  Calendar,
  User,
  FileText,
  Wrench,
  Clock,
  Edit,
  Trash2,
  Plus,
  AlertTriangle,
  CheckCircle,
} from 'lucide-react';
import { PageHeader, Card, Button } from '@/components/common';
import {
  assets,
  workOrders,
  formatDate,
  formatCurrency,
  getStatusColor,
  getConditionColor,
  getPriorityColor,
  assetCategories,
  type Asset,
} from '@/data/maintenanceData';

export const AssetDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const asset = useMemo(() => assets.find(a => a.id === id), [id]);
  const assetWorkOrders = useMemo(
    () => workOrders.filter(wo => wo.assetId === id),
    [id]
  );

  if (!asset) {
    return (
      <div className="space-y-6">
        <PageHeader
          title="Asset Not Found"
          subtitle="The requested asset could not be found"
          actions={
            <Button
              variant="outline"
              leftIcon={<ArrowLeft size={16} />}
              onClick={() => navigate('/dashboard/maintenance/assets')}
            >
              Back to Assets
            </Button>
          }
        />
        <Card className="p-12 text-center">
          <Box size={48} className="mx-auto mb-4 text-text-muted" />
          <p className="text-text-secondary">Asset with ID "{id}" was not found</p>
        </Card>
      </div>
    );
  }

  const getStatusBadge = (status: Asset['status']) => {
    const config = {
      operational: { bg: 'bg-green-500/20', text: 'text-green-400', label: 'Operational' },
      'needs-repair': { bg: 'bg-yellow-500/20', text: 'text-yellow-400', label: 'Needs Repair' },
      'under-maintenance': { bg: 'bg-indigo-500/20', text: 'text-indigo-400', label: 'Under Maintenance' },
      'out-of-service': { bg: 'bg-red-500/20', text: 'text-red-400', label: 'Out of Service' },
    };
    const c = config[status];
    return (
      <span className={`px-3 py-1 rounded-full text-sm font-medium ${c.bg} ${c.text}`}>
        {c.label}
      </span>
    );
  };

  const getWorkOrderStatusBadge = (status: string) => {
    const config: Record<string, { bg: string; text: string; label: string }> = {
      scheduled: { bg: 'bg-indigo-500/20', text: 'text-indigo-400', label: 'Scheduled' },
      'in-progress': { bg: 'bg-yellow-500/20', text: 'text-yellow-400', label: 'In Progress' },
      'pending-parts': { bg: 'bg-purple-500/20', text: 'text-purple-400', label: 'Pending Parts' },
      completed: { bg: 'bg-green-500/20', text: 'text-green-400', label: 'Completed' },
      cancelled: { bg: 'bg-slate-500/20', text: 'text-slate-400', label: 'Cancelled' },
    };
    const c = config[status] || { bg: 'bg-slate-500/20', text: 'text-slate-400', label: status };
    return (
      <span className={`px-2 py-0.5 rounded text-xs font-medium ${c.bg} ${c.text}`}>
        {c.label}
      </span>
    );
  };

  const categoryColor = assetCategories.find(c => c.name === asset.category)?.color || '#64748b';

  return (
    <div className="space-y-6">
      <PageHeader
        title={asset.name}
        subtitle={`${asset.category} • ${asset.id}`}
        actions={
          <div className="flex gap-2">
            <Button
              variant="outline"
              leftIcon={<ArrowLeft size={16} />}
              onClick={() => navigate('/dashboard/maintenance/assets')}
            >
              Back
            </Button>
            <Button
              variant="outline"
              leftIcon={<Edit size={16} />}
            >
              Edit Asset
            </Button>
            <Button
              leftIcon={<Plus size={16} />}
            >
              Create Work Order
            </Button>
          </div>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Info */}
        <div className="lg:col-span-2 space-y-6">
          {/* Overview Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card className="p-6">
              <div
                className="absolute top-0 left-0 right-0 h-1 rounded-t-lg"
                style={{ backgroundColor: getStatusColor(asset.status) }}
              />

              <div className="flex items-start gap-4 pt-2">
                <div
                  className="w-16 h-16 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: `${categoryColor}20` }}
                >
                  <Box size={32} style={{ color: categoryColor }} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h2 className="text-xl font-semibold text-text-primary">{asset.name}</h2>
                    {getStatusBadge(asset.status)}
                  </div>
                  <p className="text-text-secondary mb-4">{asset.type}</p>
                  <div className="flex flex-wrap gap-4 text-sm">
                    <div className="flex items-center gap-2 text-text-secondary">
                      <MapPin size={16} />
                      <span>{asset.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-text-secondary">
                      <User size={16} />
                      <span>{asset.assignedTo}</span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Details Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-text-primary mb-4">Asset Details</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                <div>
                  <p className="text-sm text-text-secondary mb-1">Manufacturer</p>
                  <p className="font-medium text-text-primary">{asset.manufacturer}</p>
                </div>
                <div>
                  <p className="text-sm text-text-secondary mb-1">Model</p>
                  <p className="font-medium text-text-primary">{asset.model}</p>
                </div>
                <div>
                  <p className="text-sm text-text-secondary mb-1">Serial Number</p>
                  <p className="font-medium text-text-primary font-mono text-sm">{asset.serialNumber}</p>
                </div>
                <div>
                  <p className="text-sm text-text-secondary mb-1">Purchase Date</p>
                  <p className="font-medium text-text-primary">{formatDate(asset.purchaseDate)}</p>
                </div>
                <div>
                  <p className="text-sm text-text-secondary mb-1">Purchase Price</p>
                  <p className="font-medium text-text-primary">{formatCurrency(asset.purchasePrice)}</p>
                </div>
                <div>
                  <p className="text-sm text-text-secondary mb-1">Warranty Expiry</p>
                  <p className={`font-medium ${new Date(asset.warrantyExpiry) < new Date() ? 'text-red-400' : 'text-text-primary'}`}>
                    {formatDate(asset.warrantyExpiry)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-text-secondary mb-1">Condition</p>
                  <span
                    className="px-2 py-0.5 rounded text-xs font-medium capitalize"
                    style={{
                      backgroundColor: `${getConditionColor(asset.condition)}20`,
                      color: getConditionColor(asset.condition)
                    }}
                  >
                    {asset.condition}
                  </span>
                </div>
                <div>
                  <p className="text-sm text-text-secondary mb-1">Criticality</p>
                  <span
                    className="px-2 py-0.5 rounded text-xs font-medium capitalize"
                    style={{
                      backgroundColor: `${getPriorityColor(asset.criticality)}20`,
                      color: getPriorityColor(asset.criticality)
                    }}
                  >
                    {asset.criticality}
                  </span>
                </div>
                <div>
                  <p className="text-sm text-text-secondary mb-1">Maintenance History</p>
                  <p className="font-medium text-text-primary">{asset.maintenanceHistory} records</p>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Work Orders */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-text-primary">Work Orders</h3>
                <Button variant="outline" size="sm" leftIcon={<Plus size={14} />}>
                  New Work Order
                </Button>
              </div>

              {assetWorkOrders.length > 0 ? (
                <div className="space-y-3">
                  {assetWorkOrders.map(wo => (
                    <div
                      key={wo.id}
                      className="flex items-center justify-between p-4 bg-background-secondary rounded-lg hover:bg-background-tertiary transition-colors cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className="w-10 h-10 rounded-lg flex items-center justify-center"
                          style={{
                            backgroundColor: wo.type === 'preventive' ? '#6366f120' : wo.type === 'corrective' ? '#f59e0b20' : '#10b98120'
                          }}
                        >
                          <Wrench
                            size={20}
                            style={{
                              color: wo.type === 'preventive' ? '#6366f1' : wo.type === 'corrective' ? '#f59e0b' : '#10b981'
                            }}
                          />
                        </div>
                        <div>
                          <p className="font-medium text-text-primary">{wo.title}</p>
                          <p className="text-sm text-text-secondary">{wo.id} • {formatDate(wo.createdAt)}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        {getWorkOrderStatusBadge(wo.status)}
                        <span className="text-sm text-text-secondary">{wo.assignedTo}</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Wrench size={32} className="mx-auto mb-2 text-text-muted" />
                  <p className="text-text-secondary">No work orders for this asset</p>
                </div>
              )}
            </Card>
          </motion.div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Maintenance Schedule */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
          >
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-text-primary mb-4">Maintenance Schedule</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-3 bg-background-secondary rounded-lg">
                  <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center">
                    <CheckCircle size={20} className="text-green-400" />
                  </div>
                  <div>
                    <p className="text-sm text-text-secondary">Last Maintenance</p>
                    <p className="font-medium text-text-primary">{formatDate(asset.lastMaintenance)}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-background-secondary rounded-lg">
                  <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
                    <Calendar size={20} className="text-blue-400" />
                  </div>
                  <div>
                    <p className="text-sm text-text-secondary">Next Maintenance</p>
                    <p className="font-medium text-text-primary">{formatDate(asset.nextMaintenance)}</p>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Documents */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-text-primary">Documents</h3>
                <Button variant="ghost" size="sm" leftIcon={<Plus size={14} />}>
                  Add
                </Button>
              </div>
              <div className="space-y-2">
                {asset.documents.map((doc, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 p-3 bg-background-secondary rounded-lg hover:bg-background-tertiary transition-colors cursor-pointer"
                  >
                    <FileText size={18} className="text-accent-primary" />
                    <span className="text-sm text-text-primary">{doc}</span>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
          >
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-text-primary mb-4">Quick Actions</h3>
              <div className="space-y-2">
                <button className="w-full flex items-center gap-3 p-3 text-left hover:bg-background-tertiary rounded-lg transition-colors">
                  <Wrench size={18} className="text-accent-primary" />
                  <span className="text-sm text-text-primary">Schedule Maintenance</span>
                </button>
                <button className="w-full flex items-center gap-3 p-3 text-left hover:bg-background-tertiary rounded-lg transition-colors">
                  <AlertTriangle size={18} className="text-yellow-400" />
                  <span className="text-sm text-text-primary">Report Issue</span>
                </button>
                <button className="w-full flex items-center gap-3 p-3 text-left hover:bg-background-tertiary rounded-lg transition-colors">
                  <Clock size={18} className="text-blue-400" />
                  <span className="text-sm text-text-primary">View History</span>
                </button>
                <button className="w-full flex items-center gap-3 p-3 text-left hover:bg-red-500/10 rounded-lg transition-colors text-red-400">
                  <Trash2 size={18} />
                  <span className="text-sm">Delete Asset</span>
                </button>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
