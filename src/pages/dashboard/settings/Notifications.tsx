import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Bell,
  Mail,
  Smartphone,
  MessageSquare,
  Clock,
  Save,
  Send,
  Check,
} from 'lucide-react';
import { PageHeader, Card, Button, Input } from '@/components/common';
import {
  notificationSettings as initialSettings,
  type NotificationSettings,
} from '@/data/settingsData';

interface ToggleProps {
  enabled: boolean;
  onChange: (enabled: boolean) => void;
}

const Toggle = ({ enabled, onChange }: ToggleProps) => (
  <button
    onClick={() => onChange(!enabled)}
    className={`w-10 h-5 rounded-full transition-colors relative ${
      enabled ? 'bg-accent-primary' : 'bg-background-tertiary'
    }`}
  >
    <div
      className={`w-4 h-4 rounded-full bg-white absolute top-0.5 transition-transform ${
        enabled ? 'translate-x-5' : 'translate-x-0.5'
      }`}
    />
  </button>
);

export const Notifications = () => {
  const [settings, setSettings] = useState<NotificationSettings>(initialSettings);
  const [hasChanges, setHasChanges] = useState(false);
  const [testSent, setTestSent] = useState(false);

  const updateChannel = (
    channel: keyof NotificationSettings['channels'],
    field: string,
    value: boolean | string
  ) => {
    setSettings(prev => ({
      ...prev,
      channels: {
        ...prev.channels,
        [channel]: {
          ...prev.channels[channel],
          [field]: value,
        },
      },
    }));
    setHasChanges(true);
  };

  const updatePreference = (
    notification: keyof NotificationSettings['preferences'],
    channel: 'email' | 'push' | 'sms',
    value: boolean
  ) => {
    setSettings(prev => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        [notification]: {
          ...prev.preferences[notification],
          [channel]: value,
        },
      },
    }));
    setHasChanges(true);
  };

  const updateQuietHours = (field: keyof NotificationSettings['quietHours'], value: boolean | string) => {
    setSettings(prev => ({
      ...prev,
      quietHours: {
        ...prev.quietHours,
        [field]: value,
      },
    }));
    setHasChanges(true);
  };

  const updateDigest = (field: string, value: boolean | string) => {
    setSettings(prev => ({
      ...prev,
      [field]: value,
    }));
    setHasChanges(true);
  };

  const handleSave = () => {
    console.log('Saving notification settings:', settings);
    setHasChanges(false);
  };

  const handleTestNotification = async () => {
    setTestSent(true);
    setTimeout(() => setTestSent(false), 3000);
  };

  const notificationTypes = [
    { key: 'taskAssigned', label: 'Task Assigned', description: 'When a task is assigned to you' },
    { key: 'taskCompleted', label: 'Task Completed', description: 'When a task you created is completed' },
    { key: 'taskOverdue', label: 'Task Overdue', description: 'When a task becomes overdue' },
    { key: 'newMessage', label: 'New Message', description: 'When you receive a new message' },
    { key: 'newAnnouncement', label: 'New Announcement', description: 'When there\'s a company announcement' },
    { key: 'systemAlert', label: 'System Alert', description: 'Important system notifications' },
    { key: 'loginAlert', label: 'Login Alert', description: 'When someone logs into your account' },
    { key: 'reportReady', label: 'Report Ready', description: 'When a requested report is ready' },
    { key: 'backupComplete', label: 'Backup Complete', description: 'When a system backup completes' },
    { key: 'integrationError', label: 'Integration Error', description: 'When an integration fails' },
  ];

  return (
    <div className="space-y-6 pb-20">
      <PageHeader
        title="Notification Settings"
        subtitle="Manage how and when you receive notifications"
        actions={
          <Button
            variant="outline"
            leftIcon={testSent ? <Check size={16} className="text-green-400" /> : <Send size={16} />}
            onClick={handleTestNotification}
            disabled={testSent}
          >
            {testSent ? 'Test Sent!' : 'Test Notification'}
          </Button>
        }
      />

      {/* Notification Channels */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-accent-primary/20 flex items-center justify-center">
              <Bell size={20} className="text-accent-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-text-primary">Notification Channels</h3>
              <p className="text-sm text-text-secondary">Configure where you receive notifications</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Email */}
            <div className="p-4 bg-background-secondary rounded-lg">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <Mail size={20} className="text-blue-400" />
                  <span className="font-medium text-text-primary">Email</span>
                </div>
                <Toggle
                  enabled={settings.channels.email.enabled}
                  onChange={(v) => updateChannel('email', 'enabled', v)}
                />
              </div>
              {settings.channels.email.enabled && (
                <Input
                  placeholder="email@example.com"
                  value={settings.channels.email.address || ''}
                  onChange={(e) => updateChannel('email', 'address', e.target.value)}
                />
              )}
            </div>

            {/* Push */}
            <div className="p-4 bg-background-secondary rounded-lg">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <Bell size={20} className="text-purple-400" />
                  <span className="font-medium text-text-primary">Push Notifications</span>
                </div>
                <Toggle
                  enabled={settings.channels.push.enabled}
                  onChange={(v) => updateChannel('push', 'enabled', v)}
                />
              </div>
              {settings.channels.push.enabled && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-text-secondary">Browser</span>
                    <Toggle
                      enabled={settings.channels.push.browser || false}
                      onChange={(v) => updateChannel('push', 'browser', v)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-text-secondary">Mobile</span>
                    <Toggle
                      enabled={settings.channels.push.mobile || false}
                      onChange={(v) => updateChannel('push', 'mobile', v)}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* SMS */}
            <div className="p-4 bg-background-secondary rounded-lg">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <Smartphone size={20} className="text-green-400" />
                  <span className="font-medium text-text-primary">SMS</span>
                </div>
                <Toggle
                  enabled={settings.channels.sms.enabled}
                  onChange={(v) => updateChannel('sms', 'enabled', v)}
                />
              </div>
              {settings.channels.sms.enabled && (
                <Input
                  placeholder="+1 (555) 123-4567"
                  value={settings.channels.sms.phone || ''}
                  onChange={(e) => updateChannel('sms', 'phone', e.target.value)}
                />
              )}
            </div>

            {/* Slack */}
            <div className="p-4 bg-background-secondary rounded-lg">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <MessageSquare size={20} className="text-amber-400" />
                  <span className="font-medium text-text-primary">Slack</span>
                </div>
                <Toggle
                  enabled={settings.channels.slack.enabled}
                  onChange={(v) => updateChannel('slack', 'enabled', v)}
                />
              </div>
              {settings.channels.slack.enabled && (
                <Input
                  placeholder="#channel-name"
                  value={settings.channels.slack.channel || ''}
                  onChange={(e) => updateChannel('slack', 'channel', e.target.value)}
                />
              )}
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Notification Preferences */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center">
              <Check size={20} className="text-green-400" />
            </div>
            <div>
              <h3 className="font-semibold text-text-primary">Notification Preferences</h3>
              <p className="text-sm text-text-secondary">Choose which notifications you receive</p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border-default">
                  <th className="text-left py-3 text-sm font-medium text-text-secondary">Notification Type</th>
                  <th className="text-center py-3 px-4 text-sm font-medium text-text-secondary">
                    <Mail size={16} className="mx-auto" />
                  </th>
                  <th className="text-center py-3 px-4 text-sm font-medium text-text-secondary">
                    <Bell size={16} className="mx-auto" />
                  </th>
                  <th className="text-center py-3 px-4 text-sm font-medium text-text-secondary">
                    <Smartphone size={16} className="mx-auto" />
                  </th>
                </tr>
              </thead>
              <tbody>
                {notificationTypes.map((type) => {
                  const pref = settings.preferences[type.key as keyof NotificationSettings['preferences']];
                  return (
                    <tr key={type.key} className="border-b border-border-default hover:bg-background-tertiary/50">
                      <td className="py-4">
                        <p className="font-medium text-text-primary">{type.label}</p>
                        <p className="text-xs text-text-muted">{type.description}</p>
                      </td>
                      <td className="text-center py-4 px-4">
                        <button
                          onClick={() => updatePreference(type.key as keyof NotificationSettings['preferences'], 'email', !pref.email)}
                          className={`w-6 h-6 rounded border flex items-center justify-center transition-colors ${
                            pref.email
                              ? 'bg-accent-primary border-accent-primary'
                              : 'border-border-default hover:border-accent-primary'
                          }`}
                        >
                          {pref.email && <Check size={14} className="text-white" />}
                        </button>
                      </td>
                      <td className="text-center py-4 px-4">
                        <button
                          onClick={() => updatePreference(type.key as keyof NotificationSettings['preferences'], 'push', !pref.push)}
                          className={`w-6 h-6 rounded border flex items-center justify-center transition-colors ${
                            pref.push
                              ? 'bg-accent-primary border-accent-primary'
                              : 'border-border-default hover:border-accent-primary'
                          }`}
                        >
                          {pref.push && <Check size={14} className="text-white" />}
                        </button>
                      </td>
                      <td className="text-center py-4 px-4">
                        <button
                          onClick={() => updatePreference(type.key as keyof NotificationSettings['preferences'], 'sms', !pref.sms)}
                          className={`w-6 h-6 rounded border flex items-center justify-center transition-colors ${
                            pref.sms
                              ? 'bg-accent-primary border-accent-primary'
                              : 'border-border-default hover:border-accent-primary'
                          }`}
                        >
                          {pref.sms && <Check size={14} className="text-white" />}
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Card>
      </motion.div>

      {/* Quiet Hours & Digest */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Quiet Hours */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
                <Clock size={20} className="text-purple-400" />
              </div>
              <div>
                <h3 className="font-semibold text-text-primary">Quiet Hours</h3>
                <p className="text-sm text-text-secondary">Pause notifications during certain hours</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-text-primary">Enable Quiet Hours</span>
                <Toggle
                  enabled={settings.quietHours.enabled}
                  onChange={(v) => updateQuietHours('enabled', v)}
                />
              </div>

              {settings.quietHours.enabled && (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-text-muted mb-2">Start Time</label>
                    <input
                      type="time"
                      value={settings.quietHours.start}
                      onChange={(e) => updateQuietHours('start', e.target.value)}
                      className="w-full px-3 py-2 bg-background-tertiary border border-border-default rounded-lg text-text-primary focus:outline-none focus:border-accent-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-text-muted mb-2">End Time</label>
                    <input
                      type="time"
                      value={settings.quietHours.end}
                      onChange={(e) => updateQuietHours('end', e.target.value)}
                      className="w-full px-3 py-2 bg-background-tertiary border border-border-default rounded-lg text-text-primary focus:outline-none focus:border-accent-primary"
                    />
                  </div>
                </div>
              )}
            </div>
          </Card>
        </motion.div>

        {/* Digest Settings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
                <Mail size={20} className="text-blue-400" />
              </div>
              <div>
                <h3 className="font-semibold text-text-primary">Email Digest</h3>
                <p className="text-sm text-text-secondary">Receive a summary of notifications</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-text-primary">Enable Digest</span>
                <Toggle
                  enabled={settings.digestEnabled}
                  onChange={(v) => updateDigest('digestEnabled', v)}
                />
              </div>

              {settings.digestEnabled && (
                <>
                  <div>
                    <label className="block text-sm text-text-muted mb-2">Frequency</label>
                    <select
                      value={settings.digestFrequency}
                      onChange={(e) => updateDigest('digestFrequency', e.target.value)}
                      className="w-full px-3 py-2 bg-background-tertiary border border-border-default rounded-lg text-text-primary focus:outline-none focus:border-accent-primary"
                    >
                      <option value="daily">Daily</option>
                      <option value="weekly">Weekly</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm text-text-muted mb-2">Delivery Time</label>
                    <input
                      type="time"
                      value={settings.digestTime}
                      onChange={(e) => updateDigest('digestTime', e.target.value)}
                      className="w-full px-3 py-2 bg-background-tertiary border border-border-default rounded-lg text-text-primary focus:outline-none focus:border-accent-primary"
                    />
                  </div>
                </>
              )}
            </div>
          </Card>
        </motion.div>
      </div>

      {/* Sticky Save Button */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-background-primary border-t border-border-default">
        <div className="max-w-7xl mx-auto flex justify-end gap-4">
          <Button
            variant="outline"
            onClick={() => {
              setSettings(initialSettings);
              setHasChanges(false);
            }}
            disabled={!hasChanges}
          >
            Discard Changes
          </Button>
          <Button
            leftIcon={<Save size={16} />}
            onClick={handleSave}
            disabled={!hasChanges}
          >
            Save All Settings
          </Button>
        </div>
      </div>
    </div>
  );
};
