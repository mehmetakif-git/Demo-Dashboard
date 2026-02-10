import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  Plus,
  Search,
  Scissors,
  Clock,
  DollarSign,
  ChevronDown,
  ChevronRight,
  Edit,
  MoreVertical,
} from 'lucide-react';
import { PageHeader, Card, StatsCard, Input, Button } from '@/components/common';
import {
  serviceCategories,
  services,
  formatDuration,
  formatCurrency,
} from '@/data/beauty/beautyData';
import { useTranslation } from 'react-i18next';

export const Services = () => {
  const { t } = useTranslation('common');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedCategories, setExpandedCategories] = useState<string[]>(
    serviceCategories.map((c) => c.id)
  );

  const stats = useMemo(
    () => ({
      totalServices: services.length,
      categories: serviceCategories.length,
      avgPrice: Math.round(services.reduce((sum, s) => sum + s.price, 0) / services.length),
      avgDuration: Math.round(services.reduce((sum, s) => sum + s.duration, 0) / services.length),
    }),
    []
  );

  const filteredServices = useMemo(() => {
    if (!searchQuery) return services;
    const query = searchQuery.toLowerCase();
    return services.filter(
      (s) =>
        s.name.toLowerCase().includes(query) ||
        s.description.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  const getServicesByCategory = (categoryId: string) => {
    return filteredServices.filter((s) => s.category === categoryId);
  };

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title={t('beauty.services', 'Services')}
        subtitle="Manage your salon services"
        actions={<Button leftIcon={<Plus size={16} />}>Add Service</Button>}
      />

      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatsCard
          title="Total Services"
          value={stats.totalServices.toString()}
          icon={Scissors}
          iconColor="#ec4899"
        />
        <StatsCard
          title="Categories"
          value={stats.categories.toString()}
          icon={Scissors}
          iconColor="#8b5cf6"
        />
        <StatsCard
          title="Avg. Price"
          value={formatCurrency(stats.avgPrice)}
          icon={DollarSign}
          iconColor="#10b981"
        />
        <StatsCard
          title="Avg. Duration"
          value={formatDuration(stats.avgDuration)}
          icon={Clock}
          iconColor="#f59e0b"
        />
      </div>

      {/* Search */}
      <Card className="p-4">
        <div className="flex flex-wrap gap-4 items-center">
          <div className="flex-1 min-w-[200px] max-w-md">
            <Input
              placeholder="Search services..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              leftIcon={<Search size={16} />}
            />
          </div>
          <Button variant="secondary" leftIcon={<Plus size={16} />}>
            Add Category
          </Button>
        </div>
      </Card>

      {/* Service Categories */}
      <div className="space-y-4">
        {serviceCategories.map((category, catIndex) => {
          const categoryServices = getServicesByCategory(category.id);
          const isExpanded = expandedCategories.includes(category.id);

          if (categoryServices.length === 0 && searchQuery) return null;

          return (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: catIndex * 0.1 }}
            >
              <Card>
                {/* Category Header */}
                <div
                  className="p-4 flex items-center justify-between cursor-pointer hover:bg-white/[0.02] transition-colors"
                  onClick={() => toggleCategory(category.id)}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center"
                      style={{ backgroundColor: `${category.color}20` }}
                    >
                      <Scissors size={18} style={{ color: category.color }} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-text-primary">{category.name}</h3>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-text-muted">
                      {categoryServices.length} services
                    </span>
                    {isExpanded ? (
                      <ChevronDown size={20} className="text-text-muted" />
                    ) : (
                      <ChevronRight size={20} className="text-text-muted" />
                    )}
                  </div>
                </div>

                {/* Services List */}
                {isExpanded && categoryServices.length > 0 && (
                  <div className="border-t border-white/[0.08]">
                    {categoryServices.map((service, index) => (
                      <div
                        key={service.id}
                        className={`p-4 flex items-center justify-between hover:bg-white/[0.03] transition-colors ${
                          index !== categoryServices.length - 1
                            ? 'border-b border-white/[0.05]'
                            : ''
                        }`}
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-1 h-10 rounded-full bg-pink-500/50" />
                          <div>
                            <div className="flex items-center gap-2">
                              <h4 className="font-medium text-text-primary">{service.name}</h4>
                              {service.popularityScore >= 85 && (
                                <span className="px-2 py-0.5 bg-amber-500/20 text-amber-400 text-xs rounded">
                                  Popular
                                </span>
                              )}
                            </div>
                            <p className="text-sm text-text-secondary">{service.description}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-6">
                          <div className="text-right">
                            <p className="font-semibold text-text-primary">
                              {formatCurrency(service.price)}
                            </p>
                            <p className="text-sm text-text-muted">
                              {formatDuration(service.duration)}
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button variant="ghost" size="sm" leftIcon={<Edit size={14} />}>
                              Edit
                            </Button>
                            <button className="p-2 rounded hover:bg-white/[0.05] text-text-muted cursor-pointer">
                              <MoreVertical size={16} />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </Card>
            </motion.div>
          );
        })}
      </div>

      {filteredServices.length === 0 && searchQuery && (
        <Card className="p-12 text-center">
          <Scissors size={48} className="mx-auto mb-4 text-text-muted" />
          <p className="text-text-secondary">No services found matching "{searchQuery}"</p>
        </Card>
      )}
    </div>
  );
};
