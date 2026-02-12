import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Users,
  Calculator,
  UserCircle,
  CheckSquare,
  Shield,
  Bell,
  Save,
  Plus,
  X,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { PageHeader, Card, Button, Input } from '@/components/common';
import { moduleSettings, months, weekDays, type ModuleSettings as ModuleSettingsType } from '@/data/settingsData';
import { useTranslation } from 'react-i18next';

interface ToggleProps {
  enabled: boolean;
  onChange: (enabled: boolean) => void;
  label: string;
  description?: string;
}

const Toggle = ({ enabled, onChange, label, description }: ToggleProps) => (
  <div className="flex items-center justify-between py-3">
    <div>
      <p className="text-text-primary font-medium">{label}</p>
      {description && <p className="text-sm text-text-muted">{description}</p>}
    </div>
    <button
      onClick={() => onChange(!enabled)}
      className={`w-12 h-6 rounded-full transition-colors relative ${
        enabled ? 'bg-accent-primary' : 'bg-white/[0.05]'
      }`}
    >
      <div
        className={`w-5 h-5 rounded-full bg-white absolute top-0.5 transition-transform ${
          enabled ? 'translate-x-6' : 'translate-x-0.5'
        }`}
      />
    </button>
  </div>
);

interface TagInputProps {
  label: string;
  tags: string[];
  onChange: (tags: string[]) => void;
  addPlaceholder?: string;
  addLabel?: string;
}

const TagInput = ({ label, tags, onChange, addPlaceholder, addLabel }: TagInputProps) => {
  const [inputValue, setInputValue] = useState('');

  const handleAdd = () => {
    if (inputValue.trim() && !tags.includes(inputValue.trim())) {
      onChange([...tags, inputValue.trim()]);
      setInputValue('');
    }
  };

  const handleRemove = (tag: string) => {
    onChange(tags.filter(item => item !== tag));
  };

  return (
    <div>
      <label className="block text-sm font-medium text-text-secondary mb-2">{label}</label>
      <div className="flex flex-wrap gap-2 mb-2">
        {tags.map(tag => (
          <span
            key={tag}
            className="inline-flex items-center gap-1 px-3 py-1 bg-white/[0.05] rounded-full text-sm text-text-primary"
          >
            {tag}
            <button
              onClick={() => handleRemove(tag)}
              className="hover:text-red-400 transition-colors"
            >
              <X size={14} />
            </button>
          </span>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleAdd()}
          placeholder={addPlaceholder}
          className="flex-1 px-3 py-2 bg-white/[0.05] border border-white/[0.08] rounded-lg text-text-primary text-sm focus:outline-none focus:border-accent-primary"
        />
        <Button size="sm" onClick={handleAdd} leftIcon={<Plus size={14} />}>
          {addLabel}
        </Button>
      </div>
    </div>
  );
};

export const ModuleSettings = () => {
  const { t } = useTranslation('settings');
  const [settings, setSettings] = useState<ModuleSettingsType>(moduleSettings);
  const [expandedModule, setExpandedModule] = useState<string | null>('hr');
  const [hasChanges, setHasChanges] = useState(false);

  const updateSettings = (
    module: keyof ModuleSettingsType,
    field: string,
    value: unknown
  ) => {
    setSettings(prev => ({
      ...prev,
      [module]: {
        ...prev[module],
        [field]: value
      } as ModuleSettingsType[typeof module]
    }));
    setHasChanges(true);
  };

  const handleSave = () => {
    console.log('Saving module settings:', settings);
    setHasChanges(false);
  };

  const modules = [
    {
      id: 'hr',
      name: t('moduleSettings.modules.hr'),
      icon: Users,
      color: '#547792',
      enabled: settings.hr.enabled,
    },
    {
      id: 'accounting',
      name: t('moduleSettings.modules.accounting'),
      icon: Calculator,
      color: '#10b981',
      enabled: settings.accounting.enabled,
    },
    {
      id: 'crm',
      name: t('moduleSettings.modules.crm'),
      icon: UserCircle,
      color: '#f59e0b',
      enabled: settings.crm.enabled,
    },
    {
      id: 'tasks',
      name: t('moduleSettings.modules.tasks'),
      icon: CheckSquare,
      color: '#94B4C1',
      enabled: settings.tasks.enabled,
    },
    {
      id: 'accessControl',
      name: t('moduleSettings.modules.accessControl'),
      icon: Shield,
      color: '#ef4444',
      enabled: settings.accessControl.enabled,
    },
    {
      id: 'notifications',
      name: t('moduleSettings.modules.notifications'),
      icon: Bell,
      color: '#3b82f6',
      enabled: true,
    },
  ];

  return (
    <div className="space-y-6 pb-20">
      <PageHeader
        title={t('moduleSettings.title')}
        subtitle={t('moduleSettings.subtitle')}
      />

      <div className="space-y-4">
        {modules.map((module, index) => {
          const isExpanded = expandedModule === module.id;
          const Icon = module.icon;

          return (
            <motion.div
              key={module.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card className="overflow-hidden">
                {/* Header */}
                <button
                  onClick={() => setExpandedModule(isExpanded ? null : module.id)}
                  className="w-full flex items-center justify-between p-4 hover:bg-white/[0.05]/50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div
                      className="w-12 h-12 rounded-lg flex items-center justify-center"
                      style={{ backgroundColor: `${module.color}20` }}
                    >
                      <Icon size={24} style={{ color: module.color }} />
                    </div>
                    <div className="text-left">
                      <h3 className="font-semibold text-text-primary">{module.name}</h3>
                      <p className="text-sm text-text-secondary">
                        {module.enabled ? t('moduleSettings.enabled') : t('moduleSettings.disabled')}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        if (module.id !== 'notifications') {
                          updateSettings(module.id as keyof ModuleSettingsType, 'enabled', !module.enabled);
                        }
                      }}
                      className={`w-12 h-6 rounded-full transition-colors relative ${
                        module.enabled ? 'bg-accent-primary' : 'bg-white/[0.05]'
                      }`}
                    >
                      <div
                        className={`w-5 h-5 rounded-full bg-white absolute top-0.5 transition-transform ${
                          module.enabled ? 'translate-x-6' : 'translate-x-0.5'
                        }`}
                      />
                    </button>
                    {isExpanded ? (
                      <ChevronUp size={20} className="text-text-muted" />
                    ) : (
                      <ChevronDown size={20} className="text-text-muted" />
                    )}
                  </div>
                </button>

                {/* Content */}
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    className="border-t border-white/[0.08] p-6"
                  >
                    {/* HR Module Settings */}
                    {module.id === 'hr' && (
                      <div className="space-y-6">
                        <TagInput
                          label={t('moduleSettings.hr.leaveTypes')}
                          tags={settings.hr.leaveTypes}
                          onChange={(tags) => updateSettings('hr', 'leaveTypes', tags)}
                          addPlaceholder={t('moduleSettings.addNew')}
                          addLabel={t('moduleSettings.add')}
                        />
                        <div>
                          <label className="block text-sm font-medium text-text-secondary mb-3">{t('moduleSettings.hr.workingDays')}</label>
                          <div className="flex flex-wrap gap-2">
                            {weekDays.map(day => (
                              <button
                                key={day}
                                onClick={() => {
                                  const newDays = settings.hr.workingDays.includes(day)
                                    ? settings.hr.workingDays.filter(d => d !== day)
                                    : [...settings.hr.workingDays, day];
                                  updateSettings('hr', 'workingDays', newDays);
                                }}
                                className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                                  settings.hr.workingDays.includes(day)
                                    ? 'bg-accent-primary text-white'
                                    : 'bg-white/[0.05] text-text-secondary hover:bg-background-primary'
                                }`}
                              >
                                {day}
                              </button>
                            ))}
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-text-secondary mb-2">{t('moduleSettings.hr.workStartTime')}</label>
                            <input
                              type="time"
                              value={settings.hr.workingHours.start}
                              onChange={(e) => updateSettings('hr', 'workingHours', { ...settings.hr.workingHours, start: e.target.value })}
                              className="w-full px-3 py-2 bg-white/[0.05] border border-white/[0.08] rounded-lg text-text-primary focus:outline-none focus:border-accent-primary"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-text-secondary mb-2">{t('moduleSettings.hr.workEndTime')}</label>
                            <input
                              type="time"
                              value={settings.hr.workingHours.end}
                              onChange={(e) => updateSettings('hr', 'workingHours', { ...settings.hr.workingHours, end: e.target.value })}
                              className="w-full px-3 py-2 bg-white/[0.05] border border-white/[0.08] rounded-lg text-text-primary focus:outline-none focus:border-accent-primary"
                            />
                          </div>
                        </div>
                        <Toggle
                          label={t('moduleSettings.hr.overtimeEnabled')}
                          description={t('moduleSettings.hr.overtimeEnabledDesc')}
                          enabled={settings.hr.overtimeEnabled}
                          onChange={(v) => updateSettings('hr', 'overtimeEnabled', v)}
                        />
                        <Input
                          label={t('moduleSettings.hr.probationPeriod')}
                          type="number"
                          value={settings.hr.probationPeriod.toString()}
                          onChange={(e) => updateSettings('hr', 'probationPeriod', parseInt(e.target.value) || 0)}
                        />
                      </div>
                    )}

                    {/* Accounting Module Settings */}
                    {module.id === 'accounting' && (
                      <div className="space-y-6">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-text-secondary mb-2">{t('moduleSettings.accounting.fiscalYearStart')}</label>
                            <select
                              value={settings.accounting.fiscalYearStart}
                              onChange={(e) => updateSettings('accounting', 'fiscalYearStart', e.target.value)}
                              className="w-full px-3 py-2 bg-white/[0.05] border border-white/[0.08] rounded-lg text-text-primary focus:outline-none focus:border-accent-primary"
                            >
                              {months.map(month => (
                                <option key={month} value={month}>{month}</option>
                              ))}
                            </select>
                          </div>
                          <Input
                            label={t('moduleSettings.accounting.taxRate')}
                            type="number"
                            value={settings.accounting.taxRate.toString()}
                            onChange={(e) => updateSettings('accounting', 'taxRate', parseFloat(e.target.value) || 0)}
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <Input
                            label={t('moduleSettings.accounting.invoicePrefix')}
                            value={settings.accounting.invoicePrefix}
                            onChange={(e) => updateSettings('accounting', 'invoicePrefix', e.target.value)}
                          />
                          <Input
                            label={t('moduleSettings.accounting.invoiceStartNumber')}
                            type="number"
                            value={settings.accounting.invoiceStartNumber.toString()}
                            onChange={(e) => updateSettings('accounting', 'invoiceStartNumber', parseInt(e.target.value) || 1)}
                          />
                        </div>
                        <Input
                          label={t('moduleSettings.accounting.paymentTerms')}
                          type="number"
                          value={settings.accounting.paymentTerms.toString()}
                          onChange={(e) => updateSettings('accounting', 'paymentTerms', parseInt(e.target.value) || 0)}
                        />
                        <Toggle
                          label={t('moduleSettings.accounting.autoReminders')}
                          description={t('moduleSettings.accounting.autoRemindersDesc')}
                          enabled={settings.accounting.autoReminders}
                          onChange={(v) => updateSettings('accounting', 'autoReminders', v)}
                        />
                      </div>
                    )}

                    {/* CRM Module Settings */}
                    {module.id === 'crm' && (
                      <div className="space-y-6">
                        <TagInput
                          label={t('moduleSettings.crm.leadSources')}
                          tags={settings.crm.leadSources}
                          onChange={(tags) => updateSettings('crm', 'leadSources', tags)}
                          addPlaceholder={t('moduleSettings.addNew')}
                          addLabel={t('moduleSettings.add')}
                        />
                        <TagInput
                          label={t('moduleSettings.crm.dealStages')}
                          tags={settings.crm.dealStages}
                          onChange={(tags) => updateSettings('crm', 'dealStages', tags)}
                          addPlaceholder={t('moduleSettings.addNew')}
                          addLabel={t('moduleSettings.add')}
                        />
                        <Toggle
                          label={t('moduleSettings.crm.autoAssignment')}
                          description={t('moduleSettings.crm.autoAssignmentDesc')}
                          enabled={settings.crm.autoAssignment}
                          onChange={(v) => updateSettings('crm', 'autoAssignment', v)}
                        />
                        <Toggle
                          label={t('moduleSettings.crm.leadScoring')}
                          description={t('moduleSettings.crm.leadScoringDesc')}
                          enabled={settings.crm.leadScoring}
                          onChange={(v) => updateSettings('crm', 'leadScoring', v)}
                        />
                      </div>
                    )}

                    {/* Task Module Settings */}
                    {module.id === 'tasks' && (
                      <div className="space-y-6">
                        <TagInput
                          label={t('moduleSettings.tasks.priorityLevels')}
                          tags={settings.tasks.priorities}
                          onChange={(tags) => updateSettings('tasks', 'priorities', tags)}
                          addPlaceholder={t('moduleSettings.addNew')}
                          addLabel={t('moduleSettings.add')}
                        />
                        <div>
                          <label className="block text-sm font-medium text-text-secondary mb-2">{t('moduleSettings.tasks.defaultView')}</label>
                          <select
                            value={settings.tasks.defaultView}
                            onChange={(e) => updateSettings('tasks', 'defaultView', e.target.value)}
                            className="w-full px-3 py-2 bg-white/[0.05] border border-white/[0.08] rounded-lg text-text-primary focus:outline-none focus:border-accent-primary"
                          >
                            <option value="list">{t('moduleSettings.tasks.listView')}</option>
                            <option value="kanban">{t('moduleSettings.tasks.kanbanBoard')}</option>
                            <option value="calendar">{t('moduleSettings.tasks.calendarView')}</option>
                          </select>
                        </div>
                        <Toggle
                          label={t('moduleSettings.tasks.allowSubtasks')}
                          description={t('moduleSettings.tasks.allowSubtasksDesc')}
                          enabled={settings.tasks.allowSubtasks}
                          onChange={(v) => updateSettings('tasks', 'allowSubtasks', v)}
                        />
                        <Toggle
                          label={t('moduleSettings.tasks.timeTracking')}
                          description={t('moduleSettings.tasks.timeTrackingDesc')}
                          enabled={settings.tasks.timeTracking}
                          onChange={(v) => updateSettings('tasks', 'timeTracking', v)}
                        />
                      </div>
                    )}

                    {/* Access Control Module Settings */}
                    {module.id === 'accessControl' && (
                      <div className="space-y-6">
                        <Input
                          label={t('moduleSettings.accessControl.defaultAccessLevel')}
                          value={settings.accessControl.defaultAccessLevel}
                          onChange={(e) => updateSettings('accessControl', 'defaultAccessLevel', e.target.value)}
                        />
                        <Input
                          label={t('moduleSettings.accessControl.visitorBadgeExpiry')}
                          type="number"
                          value={settings.accessControl.visitorBadgeExpiry.toString()}
                          onChange={(e) => updateSettings('accessControl', 'visitorBadgeExpiry', parseInt(e.target.value) || 24)}
                        />
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-text-secondary mb-2">{t('moduleSettings.accessControl.autoLockTime')}</label>
                            <input
                              type="time"
                              value={settings.accessControl.autoLockTime}
                              onChange={(e) => updateSettings('accessControl', 'autoLockTime', e.target.value)}
                              className="w-full px-3 py-2 bg-white/[0.05] border border-white/[0.08] rounded-lg text-text-primary focus:outline-none focus:border-accent-primary"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-text-secondary mb-2">{t('moduleSettings.accessControl.autoUnlockTime')}</label>
                            <input
                              type="time"
                              value={settings.accessControl.autoUnlockTime}
                              onChange={(e) => updateSettings('accessControl', 'autoUnlockTime', e.target.value)}
                              className="w-full px-3 py-2 bg-white/[0.05] border border-white/[0.08] rounded-lg text-text-primary focus:outline-none focus:border-accent-primary"
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Notifications Module Settings */}
                    {module.id === 'notifications' && (
                      <div className="space-y-6">
                        <Toggle
                          label={t('moduleSettings.notificationsModule.emailNotifications')}
                          description={t('moduleSettings.notificationsModule.emailNotificationsDesc')}
                          enabled={settings.notifications.emailNotifications}
                          onChange={(v) => updateSettings('notifications', 'emailNotifications', v)}
                        />
                        <Toggle
                          label={t('moduleSettings.notificationsModule.pushNotifications')}
                          description={t('moduleSettings.notificationsModule.pushNotificationsDesc')}
                          enabled={settings.notifications.pushNotifications}
                          onChange={(v) => updateSettings('notifications', 'pushNotifications', v)}
                        />
                        <Toggle
                          label={t('moduleSettings.notificationsModule.smsNotifications')}
                          description={t('moduleSettings.notificationsModule.smsNotificationsDesc')}
                          enabled={settings.notifications.smsNotifications}
                          onChange={(v) => updateSettings('notifications', 'smsNotifications', v)}
                        />
                        <div>
                          <label className="block text-sm font-medium text-text-secondary mb-2">{t('moduleSettings.notificationsModule.digestFrequency')}</label>
                          <select
                            value={settings.notifications.digestFrequency}
                            onChange={(e) => updateSettings('notifications', 'digestFrequency', e.target.value)}
                            className="w-full px-3 py-2 bg-white/[0.05] border border-white/[0.08] rounded-lg text-text-primary focus:outline-none focus:border-accent-primary"
                          >
                            <option value="realtime">{t('moduleSettings.notificationsModule.realtime')}</option>
                            <option value="hourly">{t('moduleSettings.notificationsModule.hourly')}</option>
                            <option value="daily">{t('moduleSettings.notificationsModule.daily')}</option>
                            <option value="weekly">{t('moduleSettings.notificationsModule.weekly')}</option>
                          </select>
                        </div>
                      </div>
                    )}
                  </motion.div>
                )}
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Sticky Save Button */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-background-primary border-t border-white/[0.08]">
        <div className="max-w-7xl mx-auto flex justify-end gap-4">
          <Button
            variant="outline"
            onClick={() => {
              setSettings(moduleSettings);
              setHasChanges(false);
            }}
            disabled={!hasChanges}
          >
            {t('moduleSettings.discardChanges')}
          </Button>
          <Button
            leftIcon={<Save size={16} />}
            onClick={handleSave}
            disabled={!hasChanges}
          >
            {t('moduleSettings.saveAllSettings')}
          </Button>
        </div>
      </div>
    </div>
  );
};
