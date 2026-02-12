import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  Plus,
  Key,
  Copy,
  Eye,
  EyeOff,
  Trash2,
  AlertTriangle,
  Shield,
  Activity,
  X,
  Check,
} from 'lucide-react';
import { PageHeader, Card, StatsCard, Button, Input } from '@/components/common';
import {
  apiKeys,
  formatDateTime,
  getStatusColor,
  type APIKey,
} from '@/data/settingsData';
import { useTranslation } from 'react-i18next';

export const APIKeys = () => {
  const { t } = useTranslation('settings');
  const [selectedKey, setSelectedKey] = useState<APIKey | null>(null);
  const [showFullKey, setShowFullKey] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newKeyName, setNewKeyName] = useState('');
  const [newKeyType, setNewKeyType] = useState<'production' | 'development'>('development');
  const [newKeyPermissions, setNewKeyPermissions] = useState<string[]>(['read']);
  const [generatedKey, setGeneratedKey] = useState<string | null>(null);
  const [copiedKey, setCopiedKey] = useState(false);

  const stats = useMemo(() => ({
    total: apiKeys.length,
    active: apiKeys.filter(k => k.status === 'active').length,
    production: apiKeys.filter(k => k.type === 'production').length,
    totalUsage: apiKeys.reduce((sum, k) => sum + k.usageCount, 0),
  }), []);

  const handleCopyKey = async (key: string) => {
    await navigator.clipboard.writeText(key);
    setCopiedKey(true);
    setTimeout(() => setCopiedKey(false), 2000);
  };

  const handleGenerateKey = () => {
    // Simulate key generation
    const newKey = `pk_${newKeyType === 'production' ? 'live' : 'test'}_${Math.random().toString(36).substring(2, 34)}`;
    setGeneratedKey(newKey);
  };

  const handleCloseCreate = () => {
    setIsCreateModalOpen(false);
    setNewKeyName('');
    setNewKeyType('development');
    setNewKeyPermissions(['read']);
    setGeneratedKey(null);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title={t('apiKeys.title')}
        subtitle={t('apiKeys.subtitle')}
        actions={
          <Button leftIcon={<Plus size={16} />} onClick={() => setIsCreateModalOpen(true)}>
            {t('apiKeys.generateNewKey')}
          </Button>
        }
      />

      {/* Warning Banner */}
      <Card className="p-4 bg-amber-500/10 border-amber-500/30">
        <div className="flex items-start gap-3">
          <AlertTriangle size={20} className="text-amber-400 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-medium text-amber-400">{t('apiKeys.securityWarning.title')}</p>
            <p className="text-sm text-text-secondary">
              {t('apiKeys.securityWarning.description')}
            </p>
          </div>
        </div>
      </Card>

      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title={t('apiKeys.stats.totalKeys')}
          value={stats.total.toString()}
          icon={Key}
          iconColor="#547792"
        />
        <StatsCard
          title={t('apiKeys.stats.activeKeys')}
          value={stats.active.toString()}
          icon={Shield}
          iconColor="#10b981"
        />
        <StatsCard
          title={t('apiKeys.stats.productionKeys')}
          value={stats.production.toString()}
          icon={AlertTriangle}
          iconColor="#ef4444"
        />
        <StatsCard
          title={t('apiKeys.stats.totalRequests')}
          value={stats.totalUsage.toLocaleString()}
          icon={Activity}
          iconColor="#94B4C1"
        />
      </div>

      {/* API Keys Table */}
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-white/[0.05]">
              <tr>
                <th className="text-left p-4 text-sm font-medium text-text-secondary">{t('apiKeys.table.name')}</th>
                <th className="text-left p-4 text-sm font-medium text-text-secondary">{t('apiKeys.table.key')}</th>
                <th className="text-left p-4 text-sm font-medium text-text-secondary">{t('apiKeys.table.type')}</th>
                <th className="text-left p-4 text-sm font-medium text-text-secondary">{t('apiKeys.table.permissions')}</th>
                <th className="text-left p-4 text-sm font-medium text-text-secondary">{t('apiKeys.table.lastUsed')}</th>
                <th className="text-left p-4 text-sm font-medium text-text-secondary">{t('apiKeys.table.status')}</th>
                <th className="text-right p-4 text-sm font-medium text-text-secondary">{t('apiKeys.table.actions')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-default">
              {apiKeys.map((apiKey, index) => (
                <motion.tr
                  key={apiKey.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="hover:bg-white/[0.05]/50 transition-colors"
                >
                  <td className="p-4">
                    <div>
                      <p className="font-medium text-text-primary">{apiKey.name}</p>
                      <p className="text-xs text-text-muted">{t('apiKeys.createdBy', { name: apiKey.createdBy })}</p>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <code className="text-sm text-text-secondary font-mono bg-white/[0.05] px-2 py-1 rounded">
                        {apiKey.key}
                      </code>
                      <button
                        onClick={() => handleCopyKey(apiKey.key)}
                        className="p-1 hover:bg-white/[0.05] rounded transition-colors text-text-muted hover:text-text-primary"
                      >
                        <Copy size={14} />
                      </button>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      apiKey.type === 'production'
                        ? 'bg-red-500/20 text-red-400'
                        : 'bg-blue-500/20 text-blue-400'
                    }`}>
                      {apiKey.type}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex gap-1">
                      {apiKey.permissions.map(perm => (
                        <span key={perm} className="px-2 py-0.5 bg-white/[0.05] rounded text-xs text-text-secondary capitalize">
                          {perm}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="p-4 text-sm text-text-secondary">
                    {formatDateTime(apiKey.lastUsed)}
                  </td>
                  <td className="p-4">
                    <span
                      className="px-2 py-1 rounded text-xs font-medium"
                      style={{
                        backgroundColor: `${getStatusColor(apiKey.status)}20`,
                        color: getStatusColor(apiKey.status),
                      }}
                    >
                      {apiKey.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        onClick={() => setSelectedKey(apiKey)}
                        className="p-2 hover:bg-white/[0.05] rounded transition-colors text-text-secondary hover:text-text-primary"
                      >
                        <Eye size={16} />
                      </button>
                      <button
                        onClick={() => handleCopyKey(apiKey.keyFull)}
                        className="p-2 hover:bg-white/[0.05] rounded transition-colors text-text-secondary hover:text-blue-400"
                      >
                        <Copy size={16} />
                      </button>
                      <button className="p-2 hover:bg-white/[0.05] rounded transition-colors text-text-secondary hover:text-red-400">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* View Key Modal */}
      {selectedKey && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={() => { setSelectedKey(null); setShowFullKey(false); }}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-lg"
          >
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-text-primary">{t('apiKeys.viewModal.title')}</h3>
                <button
                  onClick={() => { setSelectedKey(null); setShowFullKey(false); }}
                  className="p-2 hover:bg-white/[0.05] rounded transition-colors"
                >
                  <X size={20} className="text-text-muted" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <p className="text-sm text-text-muted mb-1">{t('apiKeys.viewModal.name')}</p>
                  <p className="font-medium text-text-primary">{selectedKey.name}</p>
                </div>

                <div>
                  <p className="text-sm text-text-muted mb-1">{t('apiKeys.viewModal.apiKey')}</p>
                  <div className="flex items-center gap-2">
                    <code className="flex-1 text-sm bg-white/[0.05] p-3 rounded-lg font-mono text-text-primary break-all">
                      {showFullKey ? selectedKey.keyFull : selectedKey.key}
                    </code>
                    <button
                      onClick={() => setShowFullKey(!showFullKey)}
                      className="p-2 hover:bg-white/[0.05] rounded transition-colors text-text-secondary"
                    >
                      {showFullKey ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                    <button
                      onClick={() => handleCopyKey(selectedKey.keyFull)}
                      className="p-2 hover:bg-white/[0.05] rounded transition-colors text-text-secondary"
                    >
                      {copiedKey ? <Check size={18} className="text-green-400" /> : <Copy size={18} />}
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-text-muted mb-1">{t('apiKeys.viewModal.type')}</p>
                    <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${
                      selectedKey.type === 'production'
                        ? 'bg-red-500/20 text-red-400'
                        : 'bg-blue-500/20 text-blue-400'
                    }`}>
                      {selectedKey.type}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm text-text-muted mb-1">{t('apiKeys.viewModal.status')}</p>
                    <span
                      className="inline-block px-2 py-1 rounded text-xs font-medium"
                      style={{
                        backgroundColor: `${getStatusColor(selectedKey.status)}20`,
                        color: getStatusColor(selectedKey.status),
                      }}
                    >
                      {selectedKey.status}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-text-muted mb-1">{t('apiKeys.viewModal.created')}</p>
                    <p className="text-sm text-text-primary">{formatDateTime(selectedKey.createdAt)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-text-muted mb-1">{t('apiKeys.viewModal.expires')}</p>
                    <p className="text-sm text-text-primary">{selectedKey.expiresAt}</p>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-text-muted mb-1">{t('apiKeys.viewModal.usage')}</p>
                  <p className="text-sm text-text-primary">{t('apiKeys.viewModal.usageCount', { count: selectedKey.usageCount })}</p>
                </div>

                <div className="p-4 bg-amber-500/10 rounded-lg border border-amber-500/30">
                  <div className="flex items-start gap-2">
                    <AlertTriangle size={16} className="text-amber-400 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-amber-400">
                      {t('apiKeys.viewModal.securityWarning')}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-white/[0.08]">
                <Button
                  variant="secondary"
                  className="text-red-400 hover:bg-red-500/10"
                >
                  {t('apiKeys.viewModal.revokeKey')}
                </Button>
                <Button onClick={() => { setSelectedKey(null); setShowFullKey(false); }}>
                  {t('apiKeys.viewModal.close')}
                </Button>
              </div>
            </Card>
          </motion.div>
        </motion.div>
      )}

      {/* Create Key Modal */}
      {isCreateModalOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={handleCloseCreate}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-lg"
          >
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-text-primary">
                  {generatedKey ? t('apiKeys.createModal.titleNew') : t('apiKeys.createModal.titleGenerate')}
                </h3>
                <button
                  onClick={handleCloseCreate}
                  className="p-2 hover:bg-white/[0.05] rounded transition-colors"
                >
                  <X size={20} className="text-text-muted" />
                </button>
              </div>

              {!generatedKey ? (
                <div className="space-y-4">
                  <Input
                    label={t('apiKeys.createModal.keyName')}
                    value={newKeyName}
                    onChange={(e) => setNewKeyName(e.target.value)}
                    placeholder={t('apiKeys.createModal.keyNamePlaceholder')}
                  />

                  <div>
                    <label className="block text-sm font-medium text-text-secondary mb-2">{t('apiKeys.createModal.type')}</label>
                    <div className="flex gap-3">
                      <button
                        onClick={() => setNewKeyType('development')}
                        className={`flex-1 p-3 rounded-lg border transition-colors ${
                          newKeyType === 'development'
                            ? 'border-blue-500 bg-blue-500/10'
                            : 'border-white/[0.08] hover:border-white/[0.12]'
                        }`}
                      >
                        <p className="font-medium text-text-primary">{t('apiKeys.createModal.development')}</p>
                        <p className="text-xs text-text-muted">{t('apiKeys.createModal.developmentDesc')}</p>
                      </button>
                      <button
                        onClick={() => setNewKeyType('production')}
                        className={`flex-1 p-3 rounded-lg border transition-colors ${
                          newKeyType === 'production'
                            ? 'border-red-500 bg-red-500/10'
                            : 'border-white/[0.08] hover:border-white/[0.12]'
                        }`}
                      >
                        <p className="font-medium text-text-primary">{t('apiKeys.createModal.production')}</p>
                        <p className="text-xs text-text-muted">{t('apiKeys.createModal.productionDesc')}</p>
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-text-secondary mb-2">{t('apiKeys.createModal.permissions')}</label>
                    <div className="flex gap-3">
                      {['read', 'write'].map(perm => (
                        <button
                          key={perm}
                          onClick={() => {
                            setNewKeyPermissions(prev =>
                              prev.includes(perm)
                                ? prev.filter(p => p !== perm)
                                : [...prev, perm]
                            );
                          }}
                          className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors ${
                            newKeyPermissions.includes(perm)
                              ? 'border-accent-primary bg-accent-primary/10'
                              : 'border-white/[0.08] hover:border-white/[0.12]'
                          }`}
                        >
                          <div className={`w-4 h-4 rounded border flex items-center justify-center ${
                            newKeyPermissions.includes(perm)
                              ? 'bg-accent-primary border-accent-primary'
                              : 'border-white/[0.08]'
                          }`}>
                            {newKeyPermissions.includes(perm) && <Check size={10} className="text-white" />}
                          </div>
                          <span className="text-text-primary capitalize">{perm}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-white/[0.08]">
                    <Button variant="outline" onClick={handleCloseCreate}>
                      {t('apiKeys.createModal.cancel')}
                    </Button>
                    <Button
                      leftIcon={<Key size={16} />}
                      onClick={handleGenerateKey}
                      disabled={!newKeyName}
                    >
                      {t('apiKeys.createModal.generateKey')}
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="p-4 bg-green-500/10 rounded-lg border border-green-500/30">
                    <div className="flex items-start gap-2 mb-3">
                      <Check size={20} className="text-green-400 flex-shrink-0" />
                      <p className="text-green-400 font-medium">{t('apiKeys.createModal.successTitle')}</p>
                    </div>
                    <p className="text-sm text-text-secondary">
                      {t('apiKeys.createModal.successDescription')}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-text-muted mb-2">{t('apiKeys.createModal.yourApiKey')}</p>
                    <div className="flex items-center gap-2">
                      <code className="flex-1 text-sm bg-white/[0.05] p-3 rounded-lg font-mono text-text-primary break-all">
                        {generatedKey}
                      </code>
                      <button
                        onClick={() => handleCopyKey(generatedKey)}
                        className="p-2 hover:bg-white/[0.05] rounded transition-colors text-text-secondary"
                      >
                        {copiedKey ? <Check size={18} className="text-green-400" /> : <Copy size={18} />}
                      </button>
                    </div>
                  </div>

                  <div className="flex justify-end mt-6 pt-4 border-t border-white/[0.08]">
                    <Button onClick={handleCloseCreate}>
                      {t('apiKeys.createModal.done')}
                    </Button>
                  </div>
                </div>
              )}
            </Card>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};
