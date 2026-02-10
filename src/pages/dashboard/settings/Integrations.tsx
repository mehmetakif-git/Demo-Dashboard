import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  Link2,
  MessageSquare,
  Mail,
  CreditCard,
  Cloud,
  Phone,
  Calculator,
  FileText,
  Zap,
  Check,
  X,
  Settings,
  ExternalLink,
  Unplug,
} from 'lucide-react';
import { PageHeader, Card, StatsCard, Button } from '@/components/common';
import {
  integrations,
  formatDateTime,
  getStatusColor,
  type Integration,
} from '@/data/settingsData';
import { useTranslation } from 'react-i18next';

const iconMap: Record<string, React.ElementType> = {
  MessageSquare,
  Mail,
  CreditCard,
  Cloud,
  Phone,
  Calculator,
  FileText,
  Zap,
};

export const Integrations = () => {
  const { t } = useTranslation('common');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedIntegration, setSelectedIntegration] = useState<Integration | null>(null);

  const categories = ['all', 'Communication', 'Productivity', 'Payments', 'CRM', 'Finance', 'Automation'];

  const stats = useMemo(() => ({
    total: integrations.length,
    connected: integrations.filter(i => i.status === 'connected').length,
    disconnected: integrations.filter(i => i.status === 'disconnected').length,
    categories: new Set(integrations.map(i => i.category)).size,
  }), []);

  const filteredIntegrations = useMemo(() => {
    if (selectedCategory === 'all') return integrations;
    return integrations.filter(i => i.category === selectedCategory);
  }, [selectedCategory]);

  const getIcon = (iconName: string) => {
    return iconMap[iconName] || Link2;
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      Communication: '#3b82f6',
      Productivity: '#10b981',
      Payments: '#f59e0b',
      CRM: '#94B4C1',
      Finance: '#ef4444',
      Automation: '#ec4899',
    };
    return colors[category] || '#547792';
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title={t('settings.integrations', 'Integrations')}
        subtitle="Connect third-party services and apps"
      />

      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Total Integrations"
          value={stats.total.toString()}
          icon={Link2}
          iconColor="#547792"
        />
        <StatsCard
          title="Connected"
          value={stats.connected.toString()}
          icon={Check}
          iconColor="#10b981"
        />
        <StatsCard
          title="Disconnected"
          value={stats.disconnected.toString()}
          icon={Unplug}
          iconColor="#64748b"
        />
        <StatsCard
          title="Categories"
          value={stats.categories.toString()}
          icon={Settings}
          iconColor="#94B4C1"
        />
      </div>

      {/* Category Filter */}
      <Card className="p-4">
        <div className="flex flex-wrap gap-2">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedCategory === category
                  ? 'bg-accent-primary text-white'
                  : 'bg-white/[0.05] text-text-secondary hover:bg-background-primary hover:text-text-primary'
              }`}
            >
              {category === 'all' ? 'All' : category}
            </button>
          ))}
        </div>
      </Card>

      {/* Integrations Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredIntegrations.map((integration, index) => {
          const Icon = getIcon(integration.icon);
          const categoryColor = getCategoryColor(integration.category);

          return (
            <motion.div
              key={integration.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card className="p-6 hover:shadow-lg transition-all">
                <div className="flex items-start justify-between mb-4">
                  <div
                    className="w-12 h-12 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: `${categoryColor}20` }}
                  >
                    <Icon size={24} style={{ color: categoryColor }} />
                  </div>
                  <span
                    className="px-2 py-1 rounded text-xs font-medium"
                    style={{
                      backgroundColor: `${getStatusColor(integration.status)}20`,
                      color: getStatusColor(integration.status),
                    }}
                  >
                    {integration.status}
                  </span>
                </div>

                <h3 className="font-semibold text-text-primary mb-1">{integration.name}</h3>
                <p className="text-sm text-text-secondary mb-4">{integration.description}</p>

                <div className="flex items-center justify-between">
                  <span
                    className="px-2 py-1 rounded text-xs"
                    style={{ backgroundColor: `${categoryColor}20`, color: categoryColor }}
                  >
                    {integration.category}
                  </span>

                  {integration.status === 'connected' ? (
                    <Button
                      variant="outline"
                      size="sm"
                      leftIcon={<Settings size={14} />}
                      onClick={() => setSelectedIntegration(integration)}
                    >
                      Configure
                    </Button>
                  ) : (
                    <Button
                      size="sm"
                      leftIcon={<Link2 size={14} />}
                      onClick={() => setSelectedIntegration(integration)}
                    >
                      Connect
                    </Button>
                  )}
                </div>

                {integration.connectedAt && (
                  <p className="text-xs text-text-muted mt-4 pt-4 border-t border-white/[0.08]">
                    Connected {formatDateTime(integration.connectedAt)} by {integration.connectedBy}
                  </p>
                )}
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Integration Modal */}
      {selectedIntegration && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedIntegration(null)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-lg"
          >
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div
                    className="w-12 h-12 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: `${getCategoryColor(selectedIntegration.category)}20` }}
                  >
                    {(() => {
                      const Icon = getIcon(selectedIntegration.icon);
                      return <Icon size={24} style={{ color: getCategoryColor(selectedIntegration.category) }} />;
                    })()}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-text-primary">{selectedIntegration.name}</h3>
                    <p className="text-sm text-text-secondary">{selectedIntegration.description}</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedIntegration(null)}
                  className="p-2 hover:bg-white/[0.05] rounded transition-colors"
                >
                  <X size={20} className="text-text-muted" />
                </button>
              </div>

              {selectedIntegration.status === 'connected' ? (
                <>
                  {/* Connected State */}
                  <div className="space-y-4 mb-6">
                    <div className="p-4 bg-green-500/10 rounded-lg border border-green-500/30">
                      <div className="flex items-center gap-2">
                        <Check size={18} className="text-green-400" />
                        <span className="text-green-400 font-medium">Connected</span>
                      </div>
                      {selectedIntegration.connectedAt && (
                        <p className="text-sm text-text-secondary mt-1">
                          Since {formatDateTime(selectedIntegration.connectedAt)} by {selectedIntegration.connectedBy}
                        </p>
                      )}
                    </div>

                    {selectedIntegration.settings && (
                      <div>
                        <h4 className="font-medium text-text-primary mb-3">Settings</h4>
                        <div className="space-y-3">
                          {Object.entries(selectedIntegration.settings).map(([key, value]) => (
                            <div key={key} className="flex items-center justify-between py-2 border-b border-white/[0.08]">
                              <span className="text-text-secondary capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                              {typeof value === 'boolean' ? (
                                <button
                                  className={`w-10 h-5 rounded-full transition-colors relative ${
                                    value ? 'bg-accent-primary' : 'bg-white/[0.05]'
                                  }`}
                                >
                                  <div
                                    className={`w-4 h-4 rounded-full bg-white absolute top-0.5 transition-transform ${
                                      value ? 'translate-x-5' : 'translate-x-0.5'
                                    }`}
                                  />
                                </button>
                              ) : (
                                <span className="text-text-primary">{String(value)}</span>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="flex justify-between pt-4 border-t border-white/[0.08]">
                    <Button
                      variant="secondary"
                      className="text-red-400 hover:bg-red-500/10"
                      leftIcon={<Unplug size={16} />}
                    >
                      Disconnect
                    </Button>
                    <div className="flex gap-2">
                      <Button variant="outline" leftIcon={<ExternalLink size={16} />}>
                        View Docs
                      </Button>
                      <Button onClick={() => setSelectedIntegration(null)}>
                        Save Settings
                      </Button>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  {/* Disconnected State - Connect Flow */}
                  <div className="space-y-4 mb-6">
                    <div className="p-4 bg-white/[0.03] backdrop-blur-xl rounded-lg">
                      <h4 className="font-medium text-text-primary mb-2">Connect {selectedIntegration.name}</h4>
                      <p className="text-sm text-text-secondary">
                        Click the button below to authorize and connect {selectedIntegration.name} to your account.
                      </p>
                    </div>

                    <div className="p-4 bg-white/[0.03] backdrop-blur-xl rounded-lg">
                      <h4 className="font-medium text-text-primary mb-2">Permissions Required</h4>
                      <ul className="space-y-2">
                        <li className="flex items-center gap-2 text-sm text-text-secondary">
                          <Check size={14} className="text-green-400" />
                          Read your profile information
                        </li>
                        <li className="flex items-center gap-2 text-sm text-text-secondary">
                          <Check size={14} className="text-green-400" />
                          Send notifications on your behalf
                        </li>
                        <li className="flex items-center gap-2 text-sm text-text-secondary">
                          <Check size={14} className="text-green-400" />
                          Access data related to integration
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="flex justify-end gap-3 pt-4 border-t border-white/[0.08]">
                    <Button variant="outline" onClick={() => setSelectedIntegration(null)}>
                      Cancel
                    </Button>
                    <Button leftIcon={<Link2 size={16} />}>
                      Connect {selectedIntegration.name}
                    </Button>
                  </div>
                </>
              )}
            </Card>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};
