import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  AlertTriangle,
  Send,
  Monitor,
  Clock,
  XCircle,
  CheckCircle,
  Eye,
  Radio,
  AlertCircle,
  StopCircle,
} from 'lucide-react';
import { PageHeader, Card, Input, Button } from '@/components/common';
import { broadcastHistory, displays, displayGroups, type BroadcastHistory } from '@/data/signageData';

const PRIORITY_COLORS = {
  normal: { bg: 'bg-blue-500', text: 'text-blue-400', label: 'Normal' },
  high: { bg: 'bg-orange-500', text: 'text-orange-400', label: 'High' },
  critical: { bg: 'bg-red-500', text: 'text-red-400', label: 'Critical' },
};

const DURATION_OPTIONS = [
  { value: '5', label: '5 minutes' },
  { value: '15', label: '15 minutes' },
  { value: '30', label: '30 minutes' },
  { value: '60', label: '1 hour' },
  { value: 'manual', label: 'Until manually stopped' },
];

export const Broadcast = () => {
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [selectedDisplays, setSelectedDisplays] = useState<string[]>([]);
  const [allDisplays, setAllDisplays] = useState(true);
  const [priority, setPriority] = useState<'normal' | 'high' | 'critical'>('normal');
  const [duration, setDuration] = useState('5');
  const [backgroundColor, setBackgroundColor] = useState('#ef4444');
  const [showPreview, setShowPreview] = useState(false);
  // Simulated active broadcast (null if no active broadcast)
  const [activeBroadcast] = useState<BroadcastHistory | null>(null);

  const getStatusBadge = (status: BroadcastHistory['status']) => {
    const config = {
      completed: { bg: 'bg-green-500/20', text: 'text-green-400', label: 'Completed', icon: CheckCircle },
      cancelled: { bg: 'bg-red-500/20', text: 'text-red-400', label: 'Cancelled', icon: XCircle },
      active: { bg: 'bg-orange-500/20', text: 'text-orange-400', label: 'Active', icon: Radio },
    };
    const c = config[status];
    const Icon = c.icon;
    return (
      <span className={`flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium ${c.bg} ${c.text}`}>
        <Icon size={12} />
        {c.label}
      </span>
    );
  };

  const handleDisplaySelect = (displayId: string) => {
    setSelectedDisplays(prev =>
      prev.includes(displayId)
        ? prev.filter(id => id !== displayId)
        : [...prev, displayId]
    );
  };

  const handleBroadcast = () => {
    // In a real app, this would send the broadcast
    console.log('Broadcasting:', { title, message, selectedDisplays, allDisplays, priority, duration, backgroundColor });
    alert('Broadcast sent! (Demo only)');
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Emergency Broadcast"
        subtitle="Send urgent messages to all or selected displays"
      />

      {/* Warning Banner */}
      <Card className="p-4 bg-red-500/10 border border-red-500/20">
        <div className="flex items-start gap-3">
          <AlertTriangle size={24} className="text-red-400 shrink-0" />
          <div>
            <p className="font-semibold text-red-400">Emergency Broadcast System</p>
            <p className="text-sm text-red-400/80 mt-1">
              Use this feature to immediately display urgent messages on all or selected displays.
              This will override any currently playing content.
            </p>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Broadcast Form */}
        <div className="lg:col-span-2 space-y-6">
          {/* Active Broadcast Status */}
          {activeBroadcast ? (
            <Card className="p-5 bg-orange-500/10 border border-orange-500/20">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Radio size={20} className="text-orange-400 animate-pulse" />
                    <h3 className="font-semibold text-orange-400">Active Broadcast</h3>
                  </div>
                  <h4 className="text-lg font-semibold text-text-primary">{activeBroadcast.title}</h4>
                  <p className="text-text-secondary mt-1">{activeBroadcast.message}</p>
                  <div className="flex items-center gap-4 mt-3 text-sm text-text-muted">
                    <span className="flex items-center gap-1">
                      <Clock size={14} />
                      Started {activeBroadcast.sentAt}
                    </span>
                    <span className="flex items-center gap-1">
                      <Monitor size={14} />
                      {activeBroadcast.displays}
                    </span>
                  </div>
                </div>
                <Button variant="secondary" leftIcon={<StopCircle size={16} />} className="text-red-400 hover:bg-red-500/20">
                  End Broadcast
                </Button>
              </div>
            </Card>
          ) : (
            <Card className="p-5 border border-green-500/20">
              <div className="flex items-center gap-3">
                <CheckCircle size={20} className="text-green-400" />
                <span className="text-text-secondary">No active broadcast. All displays showing scheduled content.</span>
              </div>
            </Card>
          )}

          {/* New Broadcast Form */}
          <Card className="p-5">
            <h3 className="font-semibold text-text-primary mb-4">New Broadcast</h3>

            <div className="space-y-4">
              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">
                  Title
                </label>
                <Input
                  placeholder="e.g., Fire Drill Announcement"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">
                  Message
                </label>
                <textarea
                  placeholder="Enter your emergency message here..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={4}
                  className="w-full px-3 py-2 bg-background-tertiary border border-border-default rounded-lg text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent-primary resize-none"
                />
              </div>

              {/* Display Selection */}
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">
                  Target Displays
                </label>
                <div className="space-y-3">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={allDisplays}
                      onChange={(e) => {
                        setAllDisplays(e.target.checked);
                        if (e.target.checked) setSelectedDisplays([]);
                      }}
                      className="rounded border-border-default"
                    />
                    <span className="text-text-primary font-medium">All Displays</span>
                    <span className="text-text-muted text-sm">({displays.length} displays)</span>
                  </label>

                  {!allDisplays && (
                    <div className="pl-6 space-y-2">
                      <p className="text-xs text-text-muted mb-2">Select specific displays or groups:</p>
                      <div className="grid grid-cols-2 gap-2">
                        {displays.filter(d => d.status === 'online').map(display => (
                          <label
                            key={display.id}
                            className={`flex items-center gap-2 p-2 rounded-lg border cursor-pointer transition-colors ${
                              selectedDisplays.includes(display.id)
                                ? 'border-accent-primary bg-accent-primary/10'
                                : 'border-border-default hover:border-border-hover'
                            }`}
                          >
                            <input
                              type="checkbox"
                              checked={selectedDisplays.includes(display.id)}
                              onChange={() => handleDisplaySelect(display.id)}
                              className="rounded border-border-default"
                            />
                            <div className="flex-1 min-w-0">
                              <p className="text-sm text-text-primary truncate">{display.name}</p>
                              <p className="text-xs text-text-muted truncate">{display.location}</p>
                            </div>
                          </label>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Priority */}
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">
                  Priority Level
                </label>
                <div className="flex gap-2">
                  {(['normal', 'high', 'critical'] as const).map(p => (
                    <button
                      key={p}
                      onClick={() => setPriority(p)}
                      className={`flex-1 py-2 px-4 rounded-lg border text-sm font-medium transition-colors ${
                        priority === p
                          ? `${PRIORITY_COLORS[p].bg} text-white border-transparent`
                          : 'border-border-default text-text-secondary hover:border-border-hover'
                      }`}
                    >
                      {PRIORITY_COLORS[p].label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Duration */}
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">
                  Duration
                </label>
                <select
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  className="w-full px-3 py-2 bg-background-tertiary border border-border-default rounded-lg text-text-primary focus:outline-none focus:border-accent-primary"
                >
                  {DURATION_OPTIONS.map(opt => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              </div>

              {/* Background Color */}
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">
                  Background Color
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    value={backgroundColor}
                    onChange={(e) => setBackgroundColor(e.target.value)}
                    className="w-12 h-10 rounded border-0 cursor-pointer"
                  />
                  <div className="flex gap-2">
                    {['#ef4444', '#f59e0b', '#3b82f6', '#10b981', '#8b5cf6'].map(color => (
                      <button
                        key={color}
                        onClick={() => setBackgroundColor(color)}
                        className={`w-8 h-8 rounded-lg border-2 transition-transform ${
                          backgroundColor === color ? 'border-white scale-110' : 'border-transparent'
                        }`}
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-4">
                <Button
                  variant="secondary"
                  className="flex-1"
                  leftIcon={<Eye size={16} />}
                  onClick={() => setShowPreview(true)}
                >
                  Preview
                </Button>
                <Button
                  className="flex-1 bg-red-500 hover:bg-red-600"
                  leftIcon={<Send size={16} />}
                  onClick={handleBroadcast}
                  disabled={!title || !message}
                >
                  Broadcast Now
                </Button>
              </div>
            </div>
          </Card>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-6">
          {/* Preview */}
          {showPreview && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-text-primary">Preview</h3>
                  <button
                    onClick={() => setShowPreview(false)}
                    className="p-1 hover:bg-background-tertiary rounded"
                  >
                    <XCircle size={16} className="text-text-secondary" />
                  </button>
                </div>
                <div
                  className="aspect-video rounded-lg flex flex-col items-center justify-center p-6 text-center"
                  style={{ backgroundColor }}
                >
                  <AlertCircle size={48} className="text-white mb-4" />
                  <h4 className="text-xl font-bold text-white mb-2">{title || 'Emergency Title'}</h4>
                  <p className="text-white/90">{message || 'Your message will appear here'}</p>
                </div>
              </Card>
            </motion.div>
          )}

          {/* Broadcast History */}
          <Card className="p-4">
            <h3 className="font-semibold text-text-primary mb-4">Broadcast History</h3>
            <div className="space-y-3">
              {broadcastHistory.map(broadcast => (
                <div
                  key={broadcast.id}
                  className="p-3 bg-background-tertiary rounded-lg hover:bg-background-secondary transition-colors cursor-pointer"
                >
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-medium text-text-primary text-sm">{broadcast.title}</h4>
                    {getStatusBadge(broadcast.status)}
                  </div>
                  <p className="text-xs text-text-secondary line-clamp-2 mb-2">{broadcast.message}</p>
                  <div className="flex items-center gap-3 text-xs text-text-muted">
                    <span className="flex items-center gap-1">
                      <Clock size={12} />
                      {new Date(broadcast.sentAt).toLocaleDateString()}
                    </span>
                    <span>{broadcast.duration}</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Quick Stats */}
          <Card className="p-4">
            <h3 className="font-semibold text-text-primary mb-4">Display Status</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-text-secondary">Online Displays</span>
                <span className="text-green-400 font-semibold">
                  {displays.filter(d => d.status === 'online').length}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-text-secondary">Offline Displays</span>
                <span className="text-red-400 font-semibold">
                  {displays.filter(d => d.status === 'offline').length}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-text-secondary">Total Groups</span>
                <span className="text-text-primary font-semibold">{displayGroups.length}</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
