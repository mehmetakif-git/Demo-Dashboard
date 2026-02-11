import { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import {
  Layers,
  Search,
  Plus,
  Package,
  DollarSign,
  MoreVertical,
  CheckCircle,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { PageHeader, Card, Button, Input, Dropdown } from '@/components/common';
import { billOfMaterials, MANUFACTURING_COLOR } from '@/data/manufacturing/manufacturingData';

export const BOM = () => {
  const { t } = useTranslation('manufacturing');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [expandedBOM, setExpandedBOM] = useState<string | null>(null);

  const statusMap: Record<string, string> = {
    'all': t('status.all'),
    'active': t('status.active'),
    'inactive': t('status.inactive'),
  };

  const stats = useMemo(() => {
    const totalProducts = billOfMaterials.length;
    const activeBOMs = billOfMaterials.filter(b => b.status === 'active').length;
    const avgMaterials = Math.round(billOfMaterials.reduce((acc, b) => acc + b.materials.length, 0) / billOfMaterials.length);
    const totalCost = billOfMaterials.reduce((acc, b) => acc + b.totalCost, 0);

    return { totalProducts, activeBOMs, avgMaterials, totalCost };
  }, []);

  const filteredBOMs = useMemo(() => {
    return billOfMaterials.filter(bom => {
      const matchesSearch = bom.productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        bom.version.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus = statusFilter === 'all' || bom.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [searchQuery, statusFilter]);

  const toggleExpand = (bomId: string) => {
    setExpandedBOM(expandedBOM === bomId ? null : bomId);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title={t('bom.title')}
        subtitle={t('bom.subtitle')}
        icon={Layers}
        actions={
          <Button>
            <Plus size={18} />
            {t('bom.createBOM')}
          </Button>
        }
      />

      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: t('bom.totalProducts'), value: stats.totalProducts, icon: Layers, color: MANUFACTURING_COLOR },
          { label: t('bom.activeBOMs'), value: stats.activeBOMs, icon: CheckCircle, color: '#10b981' },
          { label: t('bom.avgMaterials'), value: stats.avgMaterials, icon: Package, color: '#3b82f6' },
          { label: t('bom.avgCost'), value: `QAR ${Math.round(stats.totalCost / stats.totalProducts).toLocaleString()}`, icon: DollarSign, color: '#f59e0b' },
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
              placeholder={t('bom.searchPlaceholder')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2">
            {['all', 'active', 'inactive'].map((status) => (
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

      {/* BOMs List */}
      <div className="space-y-4">
        {filteredBOMs.map((bom, index) => (
          <motion.div
            key={bom.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <Card className="overflow-hidden">
              {/* Header */}
              <div
                className="p-4 flex items-center justify-between cursor-pointer hover:bg-background-tertiary/50 transition-colors"
                onClick={() => toggleExpand(bom.id)}
              >
                <div className="flex items-center gap-4">
                  <div
                    className="w-12 h-12 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: `${MANUFACTURING_COLOR}20` }}
                  >
                    <Layers size={24} style={{ color: MANUFACTURING_COLOR }} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-text-primary">{bom.productName}</h3>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="text-sm text-text-muted">{bom.version}</span>
                      <span
                        className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                          bom.status === 'active' ? 'bg-success/20 text-success' : 'bg-text-muted/20 text-text-muted'
                        }`}
                      >
                        {statusMap[bom.status]}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-lg font-bold text-text-primary">QAR {bom.totalCost.toLocaleString()}</p>
                    <p className="text-xs text-text-muted">{bom.materials.length} materials</p>
                  </div>
                  <Dropdown
                    trigger={
                      <Button variant="ghost" size="sm" onClick={(e) => e.stopPropagation()}>
                        <MoreVertical size={16} />
                      </Button>
                    }
                    items={[
                      { id: 'view', label: t('bom.viewDetails'), onClick: () => {} },
                      { id: 'edit', label: t('bom.edit'), onClick: () => {} },
                      { id: 'duplicate', label: t('bom.duplicate'), onClick: () => {} },
                      { id: 'toggle', label: bom.status === 'active' ? t('bom.deactivate') : t('bom.activate'), onClick: () => {} },
                    ]}
                  />
                  {expandedBOM === bom.id ? (
                    <ChevronUp size={20} className="text-text-muted" />
                  ) : (
                    <ChevronDown size={20} className="text-text-muted" />
                  )}
                </div>
              </div>

              {/* Materials Table (Expanded) */}
              {expandedBOM === bom.id && (
                <div className="border-t border-border-default">
                  <table className="w-full">
                    <thead className="bg-background-tertiary">
                      <tr>
                        <th className="text-left py-2 px-4 text-sm font-medium text-text-muted">{t('bom.material')}</th>
                        <th className="text-center py-2 px-4 text-sm font-medium text-text-muted">{t('bom.quantity')}</th>
                        <th className="text-center py-2 px-4 text-sm font-medium text-text-muted">{t('bom.unit')}</th>
                        <th className="text-right py-2 px-4 text-sm font-medium text-text-muted">{t('bom.unitCost')}</th>
                        <th className="text-right py-2 px-4 text-sm font-medium text-text-muted">{t('bom.totalCost')}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {bom.materials.map((material, idx) => (
                        <tr key={material.materialId} className={idx % 2 === 0 ? '' : 'bg-background-tertiary/30'}>
                          <td className="py-2 px-4">
                            <div className="flex items-center gap-2">
                              <Package size={14} className="text-text-muted" />
                              <span className="text-text-primary">{material.materialName}</span>
                            </div>
                          </td>
                          <td className="py-2 px-4 text-center text-text-primary">{material.quantity}</td>
                          <td className="py-2 px-4 text-center text-text-muted">{material.unit}</td>
                          <td className="py-2 px-4 text-right text-text-secondary">QAR {material.unitCost.toLocaleString()}</td>
                          <td className="py-2 px-4 text-right font-medium text-text-primary">QAR {material.totalCost.toLocaleString()}</td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot className="bg-background-tertiary">
                      <tr>
                        <td colSpan={4} className="py-2 px-4 text-right font-medium text-text-primary">{t('bom.totalCostLabel')}</td>
                        <td className="py-2 px-4 text-right font-bold text-text-primary">QAR {bom.totalCost.toLocaleString()}</td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              )}
            </Card>
          </motion.div>
        ))}
      </div>

      {filteredBOMs.length === 0 && (
        <Card className="p-12 text-center">
          <Layers size={48} className="mx-auto text-text-muted mb-4" />
          <p className="text-text-secondary">{t('bom.noBOMsFound')}</p>
        </Card>
      )}
    </div>
  );
};

export default BOM;
