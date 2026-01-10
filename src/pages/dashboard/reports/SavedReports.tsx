import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  Search,
  Plus,
  Play,
  Edit,
  Copy,
  Trash2,
  Pause,
  PlayCircle,
  FileText,
  FileSpreadsheet,
  Calendar,
  Clock,
  Mail,
  X,
  Save,
  Users,
  CheckCircle,
  AlertCircle,
} from 'lucide-react';
import { PageHeader, Card, Input, Button } from '@/components/common';
import {
  savedReports,
  scheduleOptions,
  formatDateTime,
  type SavedReport,
} from '@/data/reportData';

export const SavedReports = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [templateFilter, setTemplateFilter] = useState('all');
  const [scheduleFilter, setScheduleFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedReport, setSelectedReport] = useState<SavedReport | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);

  const templates = useMemo(() => {
    return [...new Set(savedReports.map((r) => r.template))];
  }, []);

  const filteredReports = useMemo(() => {
    let reports = [...savedReports];

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      reports = reports.filter(
        (r) =>
          r.name.toLowerCase().includes(query) ||
          r.template.toLowerCase().includes(query)
      );
    }

    if (templateFilter !== 'all') {
      reports = reports.filter((r) => r.template === templateFilter);
    }

    if (scheduleFilter !== 'all') {
      if (scheduleFilter === 'scheduled') {
        reports = reports.filter((r) => r.schedule !== 'None (Manual)');
      } else if (scheduleFilter === 'manual') {
        reports = reports.filter((r) => r.schedule === 'None (Manual)');
      }
    }

    if (statusFilter !== 'all') {
      reports = reports.filter((r) => r.status === statusFilter);
    }

    return reports;
  }, [searchQuery, templateFilter, scheduleFilter, statusFilter]);

  const stats = useMemo(() => ({
    total: savedReports.length,
    scheduled: savedReports.filter((r) => r.schedule !== 'None (Manual)').length,
    runToday: savedReports.filter((r) => {
      const lastRun = new Date(r.lastRun);
      const today = new Date();
      return lastRun.toDateString() === today.toDateString();
    }).length,
    active: savedReports.filter((r) => r.status === 'active').length,
  }), []);

  const getFormatIcon = (format: string) => {
    if (format === 'PDF') return <FileText size={16} className="text-red-400" />;
    if (format === 'Excel') return <FileSpreadsheet size={16} className="text-green-400" />;
    return <FileText size={16} className="text-blue-400" />;
  };

  const handleEdit = (report: SavedReport) => {
    setSelectedReport(report);
    setShowEditModal(true);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Saved Reports"
        subtitle="Manage your saved report configurations"
        actions={
          <Button leftIcon={<Plus size={16} />}>Create New</Button>
        }
      />

      {/* Stats Row */}
      <div className="grid grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-accent-primary/20 rounded-lg">
              <FileText size={20} className="text-accent-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold text-text-primary">{stats.total}</p>
              <p className="text-sm text-text-secondary">Total Saved</p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-[#94B4C1]/20 rounded-lg">
              <Calendar size={20} className="text-[#94B4C1]" />
            </div>
            <div>
              <p className="text-2xl font-bold text-text-primary">{stats.scheduled}</p>
              <p className="text-sm text-text-secondary">Scheduled</p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-500/20 rounded-lg">
              <Play size={20} className="text-blue-500" />
            </div>
            <div>
              <p className="text-2xl font-bold text-text-primary">{stats.runToday}</p>
              <p className="text-sm text-text-secondary">Run Today</p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-500/20 rounded-lg">
              <CheckCircle size={20} className="text-green-500" />
            </div>
            <div>
              <p className="text-2xl font-bold text-text-primary">{stats.active}</p>
              <p className="text-sm text-text-secondary">Active Schedules</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Filter Bar */}
      <Card className="p-4">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex-1 min-w-64 max-w-md">
            <Input
              placeholder="Search saved reports..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              leftIcon={<Search size={16} />}
            />
          </div>

          <select
            value={templateFilter}
            onChange={(e) => setTemplateFilter(e.target.value)}
            className="px-3 py-2 bg-white/[0.05] border border-white/[0.08] rounded-lg text-sm text-text-primary focus:outline-none focus:border-accent-primary"
          >
            <option value="all">All Templates</option>
            {templates.map((template) => (
              <option key={template} value={template}>
                {template}
              </option>
            ))}
          </select>

          <select
            value={scheduleFilter}
            onChange={(e) => setScheduleFilter(e.target.value)}
            className="px-3 py-2 bg-white/[0.05] border border-white/[0.08] rounded-lg text-sm text-text-primary focus:outline-none focus:border-accent-primary"
          >
            <option value="all">All Schedules</option>
            <option value="scheduled">Scheduled</option>
            <option value="manual">Manual</option>
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 bg-white/[0.05] border border-white/[0.08] rounded-lg text-sm text-text-primary focus:outline-none focus:border-accent-primary"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="paused">Paused</option>
          </select>
        </div>
      </Card>

      {/* Reports Table */}
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-white/[0.05] border-b border-white/[0.08]">
                <th className="px-4 py-3 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider">
                  Name
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider">
                  Template
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider">
                  Schedule
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider">
                  Last Run
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider">
                  Format
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider">
                  Status
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider">
                  Recipients
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredReports.map((report) => (
                <motion.tr
                  key={report.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="border-b border-white/[0.08] hover:bg-white/[0.05]"
                >
                  <td className="px-4 py-3">
                    <div>
                      <p className="font-medium text-text-primary">{report.name}</p>
                      <p className="text-xs text-text-muted">by {report.createdBy}</p>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-text-secondary">
                    {report.template}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2 text-sm text-text-secondary">
                      {report.schedule === 'None (Manual)' ? (
                        <span className="text-text-muted">Manual</span>
                      ) : (
                        <>
                          <Clock size={14} className="text-[#94B4C1]" />
                          {report.schedule}
                        </>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-text-secondary">
                    {formatDateTime(report.lastRun)}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      {getFormatIcon(report.format)}
                      <span className="text-sm text-text-secondary">{report.format}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium ${
                        report.status === 'active'
                          ? 'bg-green-500/20 text-green-400'
                          : 'bg-orange-500/20 text-orange-400'
                      }`}
                    >
                      {report.status === 'active' ? (
                        <CheckCircle size={12} />
                      ) : (
                        <AlertCircle size={12} />
                      )}
                      {report.status === 'active' ? 'Active' : 'Paused'}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1">
                      <Mail size={14} className="text-text-muted" />
                      <span className="text-sm text-text-secondary">
                        {report.recipients.length} recipient(s)
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1">
                      <button
                        className="p-1.5 hover:bg-white/[0.03] backdrop-blur-xl rounded text-text-secondary hover:text-green-400"
                        title="Run Now"
                      >
                        <Play size={14} />
                      </button>
                      <button
                        className="p-1.5 hover:bg-white/[0.03] backdrop-blur-xl rounded text-text-secondary hover:text-accent-primary"
                        title="Edit"
                        onClick={() => handleEdit(report)}
                      >
                        <Edit size={14} />
                      </button>
                      <button
                        className="p-1.5 hover:bg-white/[0.03] backdrop-blur-xl rounded text-text-secondary hover:text-blue-400"
                        title="Duplicate"
                      >
                        <Copy size={14} />
                      </button>
                      {report.status === 'active' ? (
                        <button
                          className="p-1.5 hover:bg-white/[0.03] backdrop-blur-xl rounded text-text-secondary hover:text-orange-400"
                          title="Pause"
                        >
                          <Pause size={14} />
                        </button>
                      ) : (
                        <button
                          className="p-1.5 hover:bg-white/[0.03] backdrop-blur-xl rounded text-text-secondary hover:text-green-400"
                          title="Resume"
                        >
                          <PlayCircle size={14} />
                        </button>
                      )}
                      <button
                        className="p-1.5 hover:bg-white/[0.03] backdrop-blur-xl rounded text-text-secondary hover:text-red-400"
                        title="Delete"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Empty State */}
      {filteredReports.length === 0 && (
        <Card className="p-12 text-center">
          <FileText size={48} className="mx-auto mb-4 text-text-muted" />
          <p className="text-text-secondary">No saved reports found</p>
        </Card>
      )}

      {/* Edit Modal */}
      {showEditModal && selectedReport && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white/[0.03] backdrop-blur-xl rounded-xl max-w-lg w-full max-h-[90vh] overflow-y-auto"
          >
            {/* Header */}
            <div className="p-6 border-b border-white/[0.08]">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-text-primary">
                  Edit Report Configuration
                </h2>
                <button
                  onClick={() => setShowEditModal(false)}
                  className="p-2 hover:bg-white/[0.05] rounded-lg"
                >
                  <X size={20} className="text-text-secondary" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">
              {/* Report Name */}
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Report Name
                </label>
                <Input defaultValue={selectedReport.name} />
              </div>

              {/* Template Info */}
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Template
                </label>
                <div className="p-3 bg-white/[0.05] rounded-lg">
                  <p className="text-text-secondary">{selectedReport.template}</p>
                </div>
              </div>

              {/* Parameters */}
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Parameters
                </label>
                <div className="space-y-3">
                  {Object.entries(selectedReport.parameters).map(([key, value]) => (
                    <div key={key}>
                      <label className="block text-xs text-text-muted mb-1 capitalize">
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                      </label>
                      <select
                        defaultValue={value}
                        className="w-full px-3 py-2 bg-white/[0.05] border border-white/[0.08] rounded-lg text-sm text-text-primary focus:outline-none focus:border-accent-primary"
                      >
                        <option value={value}>{value}</option>
                        <option value="Option 1">Option 1</option>
                        <option value="Option 2">Option 2</option>
                      </select>
                    </div>
                  ))}
                </div>
              </div>

              {/* Schedule */}
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  <Calendar size={14} className="inline mr-2" />
                  Schedule
                </label>
                <select
                  defaultValue={selectedReport.schedule.includes('Daily') ? 'daily' :
                    selectedReport.schedule.includes('Weekly') ? 'weekly' :
                    selectedReport.schedule.includes('Monthly') ? 'monthly' : 'none'}
                  className="w-full px-3 py-2 bg-white/[0.05] border border-white/[0.08] rounded-lg text-sm text-text-primary focus:outline-none focus:border-accent-primary"
                >
                  {scheduleOptions.map((option) => (
                    <option key={option.id} value={option.id}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Recipients */}
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  <Users size={14} className="inline mr-2" />
                  Recipients
                </label>
                <div className="space-y-2">
                  {selectedReport.recipients.map((email, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-2 bg-white/[0.05] rounded-lg"
                    >
                      <span className="text-sm text-text-secondary">{email}</span>
                      <button className="p-1 hover:bg-white/[0.03] backdrop-blur-xl rounded text-text-muted hover:text-red-400">
                        <X size={14} />
                      </button>
                    </div>
                  ))}
                  <Input placeholder="Add email address" leftIcon={<Mail size={14} />} />
                </div>
              </div>

              {/* Format */}
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Output Format
                </label>
                <div className="flex gap-2">
                  {['PDF', 'Excel', 'CSV'].map((format) => (
                    <button
                      key={format}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors ${
                        selectedReport.format === format
                          ? 'border-accent-primary bg-accent-primary/10 text-accent-primary'
                          : 'border-white/[0.08] text-text-secondary hover:border-accent-primary'
                      }`}
                    >
                      {getFormatIcon(format)}
                      {format}
                    </button>
                  ))}
                </div>
              </div>

              {/* Status */}
              <div>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    defaultChecked={selectedReport.status === 'active'}
                    className="w-4 h-4 rounded border-white/[0.08] text-accent-primary focus:ring-accent-primary"
                  />
                  <span className="text-sm text-text-secondary">Enable this report</span>
                </label>
              </div>
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-white/[0.08] bg-white/[0.05] flex justify-end gap-3">
              <Button variant="secondary" onClick={() => setShowEditModal(false)}>
                Cancel
              </Button>
              <Button leftIcon={<Save size={14} />}>Save Changes</Button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};
