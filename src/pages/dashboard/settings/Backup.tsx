import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Database,
  Download,
  Upload,
  Clock,
  HardDrive,
  Shield,
  Calendar,
  Save,
  Play,
  AlertTriangle,
  Trash2,
  RefreshCw,
} from 'lucide-react';
import { PageHeader, Card, StatsCard, Button, Input } from '@/components/common';
import {
  backups,
  backupSettings as initialBackupSettings,
  weekDays,
  formatDateTime,
  getStatusColor,
  type BackupSettings,
  type Backup as BackupType,
} from '@/data/settingsData';

export const Backup = () => {
  const [settings, setSettings] = useState<BackupSettings>(initialBackupSettings);
  const [hasChanges, setHasChanges] = useState(false);
  const [isCreatingBackup, setIsCreatingBackup] = useState(false);
  const [restoreBackup, setRestoreBackup] = useState<BackupType | null>(null);
  const [confirmText, setConfirmText] = useState('');

  const handleSettingChange = <K extends keyof BackupSettings>(
    key: K,
    value: BackupSettings[K]
  ) => {
    setSettings(prev => ({ ...prev, [key]: value }));
    setHasChanges(true);
  };

  const handleSaveSettings = () => {
    console.log('Saving backup settings:', settings);
    setHasChanges(false);
  };

  const handleCreateBackup = async () => {
    setIsCreatingBackup(true);
    // Simulate backup creation
    await new Promise(resolve => setTimeout(resolve, 3000));
    setIsCreatingBackup(false);
  };

  const handleRestore = () => {
    if (confirmText === 'RESTORE') {
      console.log('Restoring backup:', restoreBackup?.id);
      setRestoreBackup(null);
      setConfirmText('');
    }
  };

  return (
    <div className="space-y-6 pb-20">
      <PageHeader
        title="Backup & Restore"
        subtitle="Manage system backups and restore points"
      />

      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Total Backups"
          value={backups.length.toString()}
          icon={Database}
          iconColor="#6366f1"
        />
        <StatsCard
          title="Latest Backup"
          value="Today"
          icon={Clock}
          iconColor="#10b981"
        />
        <StatsCard
          title="Total Size"
          value="14.7 GB"
          icon={HardDrive}
          iconColor="#f59e0b"
        />
        <StatsCard
          title="Encryption"
          value={settings.encryptionEnabled ? 'Enabled' : 'Disabled'}
          icon={Shield}
          iconColor="#8b5cf6"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Backup Settings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-accent-primary/20 flex items-center justify-center">
                <Database size={20} className="text-accent-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-text-primary">Backup Settings</h3>
                <p className="text-sm text-text-secondary">Configure automatic backups</p>
              </div>
            </div>

            <div className="space-y-6">
              {/* Auto Backup Toggle */}
              <div className="flex items-center justify-between py-3 border-b border-border-default">
                <div>
                  <p className="text-text-primary font-medium">Auto Backup</p>
                  <p className="text-sm text-text-muted">Enable automatic backups</p>
                </div>
                <button
                  onClick={() => handleSettingChange('autoBackupEnabled', !settings.autoBackupEnabled)}
                  className={`w-12 h-6 rounded-full transition-colors relative ${
                    settings.autoBackupEnabled ? 'bg-accent-primary' : 'bg-background-tertiary'
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-full bg-white absolute top-0.5 transition-transform ${
                      settings.autoBackupEnabled ? 'translate-x-6' : 'translate-x-0.5'
                    }`}
                  />
                </button>
              </div>

              {/* Schedule */}
              <div>
                <p className="text-sm font-medium text-text-secondary mb-3">Backup Schedule</p>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-text-muted mb-1">Daily at</label>
                    <input
                      type="time"
                      value={settings.dailyBackupTime}
                      onChange={(e) => handleSettingChange('dailyBackupTime', e.target.value)}
                      className="w-full px-3 py-2 bg-background-tertiary border border-border-default rounded-lg text-text-primary focus:outline-none focus:border-accent-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-text-muted mb-1">Weekly on</label>
                    <select
                      value={settings.weeklyBackupDay}
                      onChange={(e) => handleSettingChange('weeklyBackupDay', e.target.value)}
                      className="w-full px-3 py-2 bg-background-tertiary border border-border-default rounded-lg text-text-primary focus:outline-none focus:border-accent-primary"
                    >
                      {weekDays.map(day => (
                        <option key={day} value={day}>{day}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Retention */}
              <div>
                <p className="text-sm font-medium text-text-secondary mb-3">Retention Period (days)</p>
                <div className="grid grid-cols-3 gap-4">
                  <Input
                    label="Daily"
                    type="number"
                    value={settings.dailyRetention.toString()}
                    onChange={(e) => handleSettingChange('dailyRetention', parseInt(e.target.value) || 30)}
                  />
                  <Input
                    label="Weekly"
                    type="number"
                    value={settings.weeklyRetention.toString()}
                    onChange={(e) => handleSettingChange('weeklyRetention', parseInt(e.target.value) || 90)}
                  />
                  <Input
                    label="Monthly"
                    type="number"
                    value={settings.monthlyRetention.toString()}
                    onChange={(e) => handleSettingChange('monthlyRetention', parseInt(e.target.value) || 365)}
                  />
                </div>
              </div>

              {/* Backup Options */}
              <div>
                <p className="text-sm font-medium text-text-secondary mb-3">Backup Options</p>
                <div className="space-y-3">
                  {[
                    { key: 'includeFiles', label: 'Include Files' },
                    { key: 'includeDatabase', label: 'Include Database' },
                    { key: 'encryptionEnabled', label: 'Enable Encryption' },
                  ].map(option => (
                    <div key={option.key} className="flex items-center justify-between">
                      <span className="text-text-primary">{option.label}</span>
                      <button
                        onClick={() => handleSettingChange(option.key as keyof BackupSettings, !settings[option.key as keyof BackupSettings])}
                        className={`w-10 h-5 rounded-full transition-colors relative ${
                          settings[option.key as keyof BackupSettings] ? 'bg-accent-primary' : 'bg-background-tertiary'
                        }`}
                      >
                        <div
                          className={`w-4 h-4 rounded-full bg-white absolute top-0.5 transition-transform ${
                            settings[option.key as keyof BackupSettings] ? 'translate-x-5' : 'translate-x-0.5'
                          }`}
                        />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Notification Options */}
              <div>
                <p className="text-sm font-medium text-text-secondary mb-3">Notifications</p>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-text-primary">Notify on Complete</span>
                    <button
                      onClick={() => handleSettingChange('notifyOnComplete', !settings.notifyOnComplete)}
                      className={`w-10 h-5 rounded-full transition-colors relative ${
                        settings.notifyOnComplete ? 'bg-accent-primary' : 'bg-background-tertiary'
                      }`}
                    >
                      <div
                        className={`w-4 h-4 rounded-full bg-white absolute top-0.5 transition-transform ${
                          settings.notifyOnComplete ? 'translate-x-5' : 'translate-x-0.5'
                        }`}
                      />
                    </button>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-text-primary">Notify on Failure</span>
                    <button
                      onClick={() => handleSettingChange('notifyOnFailure', !settings.notifyOnFailure)}
                      className={`w-10 h-5 rounded-full transition-colors relative ${
                        settings.notifyOnFailure ? 'bg-accent-primary' : 'bg-background-tertiary'
                      }`}
                    >
                      <div
                        className={`w-4 h-4 rounded-full bg-white absolute top-0.5 transition-transform ${
                          settings.notifyOnFailure ? 'translate-x-5' : 'translate-x-0.5'
                        }`}
                      />
                    </button>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-4 border-t border-border-default">
                <Button
                  variant="outline"
                  leftIcon={isCreatingBackup ? <RefreshCw size={16} className="animate-spin" /> : <Play size={16} />}
                  onClick={handleCreateBackup}
                  disabled={isCreatingBackup}
                >
                  {isCreatingBackup ? 'Creating...' : 'Create Backup Now'}
                </Button>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Backup History */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center">
                <HardDrive size={20} className="text-green-400" />
              </div>
              <div>
                <h3 className="font-semibold text-text-primary">Backup History</h3>
                <p className="text-sm text-text-secondary">Previous backup restore points</p>
              </div>
            </div>

            <div className="space-y-3">
              {backups.map((backup, index) => (
                <motion.div
                  key={backup.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="p-4 bg-background-secondary rounded-lg hover:bg-background-tertiary transition-colors"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="font-medium text-text-primary">{backup.name}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                          backup.type === 'automatic'
                            ? 'bg-blue-500/20 text-blue-400'
                            : 'bg-purple-500/20 text-purple-400'
                        }`}>
                          {backup.type}
                        </span>
                        <span
                          className="px-2 py-0.5 rounded text-xs font-medium"
                          style={{
                            backgroundColor: `${getStatusColor(backup.status)}20`,
                            color: getStatusColor(backup.status),
                          }}
                        >
                          {backup.status}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => {}}
                        className="p-2 hover:bg-background-primary rounded transition-colors text-text-muted hover:text-blue-400"
                      >
                        <Download size={16} />
                      </button>
                      <button
                        onClick={() => setRestoreBackup(backup)}
                        className="p-2 hover:bg-background-primary rounded transition-colors text-text-muted hover:text-green-400"
                      >
                        <Upload size={16} />
                      </button>
                      <button className="p-2 hover:bg-background-primary rounded transition-colors text-text-muted hover:text-red-400">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-text-muted">
                    <span className="flex items-center gap-1">
                      <Calendar size={12} />
                      {formatDateTime(backup.createdAt)}
                    </span>
                    <span className="flex items-center gap-1">
                      <HardDrive size={12} />
                      {backup.size}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock size={12} />
                      {backup.retention}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </Card>
        </motion.div>
      </div>

      {/* Restore Confirmation Modal */}
      {restoreBackup && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={() => { setRestoreBackup(null); setConfirmText(''); }}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md"
          >
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-red-500/20 flex items-center justify-center">
                  <AlertTriangle size={24} className="text-red-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-text-primary">Confirm Restore</h3>
                  <p className="text-sm text-text-secondary">This action cannot be undone</p>
                </div>
              </div>

              <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg mb-4">
                <p className="text-sm text-red-400">
                  Warning: Restoring this backup will replace all current data with the backup data.
                  All changes made after {formatDateTime(restoreBackup.createdAt)} will be lost.
                </p>
              </div>

              <div className="mb-4">
                <p className="text-sm text-text-muted mb-2">Backup Details:</p>
                <div className="p-3 bg-background-secondary rounded-lg">
                  <p className="font-medium text-text-primary">{restoreBackup.name}</p>
                  <p className="text-sm text-text-secondary">{restoreBackup.size} • {formatDateTime(restoreBackup.createdAt)}</p>
                </div>
              </div>

              <div className="mb-4">
                <p className="text-sm text-text-muted mb-2">Type RESTORE to confirm:</p>
                <input
                  type="text"
                  value={confirmText}
                  onChange={(e) => setConfirmText(e.target.value)}
                  placeholder="RESTORE"
                  className="w-full px-3 py-2 bg-background-tertiary border border-border-default rounded-lg text-text-primary focus:outline-none focus:border-red-500"
                />
              </div>

              <div className="flex justify-end gap-3">
                <Button variant="outline" onClick={() => { setRestoreBackup(null); setConfirmText(''); }}>
                  Cancel
                </Button>
                <Button
                  variant="secondary"
                  className="bg-red-500/20 text-red-400 hover:bg-red-500/30"
                  disabled={confirmText !== 'RESTORE'}
                  onClick={handleRestore}
                >
                  Restore Backup
                </Button>
              </div>
            </Card>
          </motion.div>
        </motion.div>
      )}

      {/* Sticky Save Button */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-background-primary border-t border-border-default">
        <div className="max-w-7xl mx-auto flex justify-end gap-4">
          <Button
            variant="outline"
            onClick={() => {
              setSettings(initialBackupSettings);
              setHasChanges(false);
            }}
            disabled={!hasChanges}
          >
            Discard Changes
          </Button>
          <Button
            leftIcon={<Save size={16} />}
            onClick={handleSaveSettings}
            disabled={!hasChanges}
          >
            Save Settings
          </Button>
        </div>
      </div>
    </div>
  );
};
