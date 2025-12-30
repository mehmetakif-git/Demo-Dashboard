import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  Download,
  FileText,
  FileSpreadsheet,
  FileCode,
  Database,
  Clock,
  X,
  CheckSquare,
  Square,
  Loader2,
  CheckCircle,
  Eye,
} from 'lucide-react';
import { PageHeader, Card, Button } from '@/components/common';
import {
  exportableData,
  getCategoryColor,
  getFormatColor,
  formatDateTime,
  type ExportableData,
} from '@/data/reportData';

const exportCategories = [
  { id: 'all', name: 'All Data' },
  { id: 'HR', name: 'HR' },
  { id: 'CRM', name: 'CRM' },
  { id: 'Finance', name: 'Finance' },
  { id: 'Operations', name: 'Operations' },
  { id: 'Security', name: 'Security' },
];

export const ExportCenter = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedData, setSelectedData] = useState<ExportableData | null>(null);
  const [showExportModal, setShowExportModal] = useState(false);
  const [showProgressModal, setShowProgressModal] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [exportComplete, setExportComplete] = useState(false);
  const [selectedFields, setSelectedFields] = useState<string[]>([]);
  const [selectedFormat, setSelectedFormat] = useState('Excel');

  const filteredData = useMemo(() => {
    if (selectedCategory === 'all') return exportableData;
    return exportableData.filter((d) => d.category === selectedCategory);
  }, [selectedCategory]);

  const getFormatIcon = (format: string, size: number = 16) => {
    const icons: Record<string, React.ReactNode> = {
      Excel: <FileSpreadsheet size={size} />,
      CSV: <FileText size={size} />,
      JSON: <FileCode size={size} />,
      PDF: <FileText size={size} />,
    };
    return icons[format] || <FileText size={size} />;
  };

  const handleExport = (data: ExportableData) => {
    setSelectedData(data);
    setSelectedFields([...data.fields]);
    setSelectedFormat(data.formats[0]);
    setShowExportModal(true);
  };

  const toggleField = (field: string) => {
    setSelectedFields((prev) =>
      prev.includes(field) ? prev.filter((f) => f !== field) : [...prev, field]
    );
  };

  const toggleAllFields = () => {
    if (selectedData) {
      if (selectedFields.length === selectedData.fields.length) {
        setSelectedFields([]);
      } else {
        setSelectedFields([...selectedData.fields]);
      }
    }
  };

  const startExport = () => {
    setShowExportModal(false);
    setShowProgressModal(true);
    setIsExporting(true);
    setExportComplete(false);

    setTimeout(() => {
      setIsExporting(false);
      setExportComplete(true);
    }, 2500);
  };

  const closeProgressModal = () => {
    setShowProgressModal(false);
    setIsExporting(false);
    setExportComplete(false);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Export Center"
        subtitle="Export your data in various formats"
      />

      <div className="flex gap-6">
        {/* Category Sidebar */}
        <Card className="w-64 p-4 h-fit sticky top-24">
          <h3 className="text-sm font-semibold text-text-primary mb-4">Categories</h3>
          <div className="space-y-1">
            {exportCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`w-full px-3 py-2 rounded-lg text-left text-sm transition-colors ${
                  selectedCategory === category.id
                    ? 'bg-accent-primary text-white'
                    : 'text-text-secondary hover:bg-background-tertiary'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </Card>

        {/* Data Cards */}
        <div className="flex-1">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredData.map((data) => (
              <motion.div
                key={data.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ y: -2 }}
              >
                <Card className="p-5">
                  {/* Header */}
                  <div className="flex items-start gap-3 mb-3">
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center"
                      style={{ backgroundColor: `${getCategoryColor(data.category)}20` }}
                    >
                      <Database size={20} style={{ color: getCategoryColor(data.category) }} />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-text-primary">{data.name}</h3>
                      <span
                        className="inline-block px-2 py-0.5 rounded text-xs font-medium mt-1"
                        style={{
                          backgroundColor: `${getCategoryColor(data.category)}20`,
                          color: getCategoryColor(data.category),
                        }}
                      >
                        {data.category}
                      </span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-text-secondary mb-4">{data.description}</p>

                  {/* Stats */}
                  <div className="flex items-center gap-4 mb-4 text-sm">
                    <span className="text-text-muted">
                      <strong className="text-text-primary">{data.recordCount.toLocaleString()}</strong> records
                    </span>
                    <span className="text-text-muted">
                      <strong className="text-text-primary">{data.fields.length}</strong> fields
                    </span>
                  </div>

                  {/* Formats */}
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-xs text-text-muted">Formats:</span>
                    {data.formats.map((format) => (
                      <span
                        key={format}
                        className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium"
                        style={{
                          backgroundColor: `${getFormatColor(format)}20`,
                          color: getFormatColor(format),
                        }}
                      >
                        {getFormatIcon(format, 12)}
                        {format}
                      </span>
                    ))}
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-4 border-t border-border-default">
                    <span className="flex items-center gap-1 text-xs text-text-muted">
                      <Clock size={12} />
                      Last exported: {formatDateTime(data.lastExported)}
                    </span>
                    <Button
                      size="sm"
                      leftIcon={<Download size={14} />}
                      onClick={() => handleExport(data)}
                    >
                      Export
                    </Button>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Empty State */}
          {filteredData.length === 0 && (
            <Card className="p-12 text-center">
              <Database size={48} className="mx-auto mb-4 text-text-muted" />
              <p className="text-text-secondary">No exportable data found in this category</p>
            </Card>
          )}
        </div>
      </div>

      {/* Export Configuration Modal */}
      {showExportModal && selectedData && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-background-secondary rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            {/* Header */}
            <div className="p-6 border-b border-border-default">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: `${getCategoryColor(selectedData.category)}20` }}
                  >
                    <Database size={20} style={{ color: getCategoryColor(selectedData.category) }} />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-text-primary">
                      Export {selectedData.name}
                    </h2>
                    <p className="text-sm text-text-muted">
                      {selectedData.recordCount.toLocaleString()} records available
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setShowExportModal(false)}
                  className="p-2 hover:bg-background-tertiary rounded-lg"
                >
                  <X size={20} className="text-text-secondary" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">
              {/* Fields Selection */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="text-sm font-medium text-text-primary">
                    Select Fields to Export
                  </label>
                  <button
                    onClick={toggleAllFields}
                    className="text-xs text-accent-primary hover:underline"
                  >
                    {selectedFields.length === selectedData.fields.length
                      ? 'Deselect All'
                      : 'Select All'}
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-2 p-4 bg-background-tertiary rounded-lg">
                  {selectedData.fields.map((field) => (
                    <label
                      key={field}
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <button
                        onClick={() => toggleField(field)}
                        className="text-accent-primary"
                      >
                        {selectedFields.includes(field) ? (
                          <CheckSquare size={18} />
                        ) : (
                          <Square size={18} />
                        )}
                      </button>
                      <span className="text-sm text-text-secondary">{field}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Filters */}
              <div>
                <label className="block text-sm font-medium text-text-primary mb-3">
                  Filters
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-text-muted mb-1">Date Range</label>
                    <select className="w-full px-3 py-2 bg-background-tertiary border border-border-default rounded-lg text-sm text-text-primary focus:outline-none focus:border-accent-primary">
                      <option value="all">All Time</option>
                      <option value="today">Today</option>
                      <option value="this-week">This Week</option>
                      <option value="this-month">This Month</option>
                      <option value="this-year">This Year</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs text-text-muted mb-1">Status</label>
                    <select className="w-full px-3 py-2 bg-background-tertiary border border-border-default rounded-lg text-sm text-text-primary focus:outline-none focus:border-accent-primary">
                      <option value="all">All</option>
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Format Selection */}
              <div>
                <label className="block text-sm font-medium text-text-primary mb-3">
                  Export Format
                </label>
                <div className="flex flex-wrap gap-2">
                  {selectedData.formats.map((format) => (
                    <button
                      key={format}
                      onClick={() => setSelectedFormat(format)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors ${
                        selectedFormat === format
                          ? 'border-accent-primary bg-accent-primary/10 text-accent-primary'
                          : 'border-border-default text-text-secondary hover:border-accent-primary'
                      }`}
                    >
                      <span style={{ color: getFormatColor(format) }}>
                        {getFormatIcon(format)}
                      </span>
                      {format}
                    </button>
                  ))}
                </div>
              </div>

              {/* Options */}
              <div>
                <label className="block text-sm font-medium text-text-primary mb-3">
                  Options
                </label>
                <div className="space-y-2">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      defaultChecked
                      className="w-4 h-4 rounded border-border-default text-accent-primary focus:ring-accent-primary"
                    />
                    <span className="text-sm text-text-secondary">Include headers</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      defaultChecked
                      className="w-4 h-4 rounded border-border-default text-accent-primary focus:ring-accent-primary"
                    />
                    <span className="text-sm text-text-secondary">UTF-8 encoding</span>
                  </label>
                </div>
              </div>

              {/* Preview */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Eye size={16} className="text-text-muted" />
                  <label className="text-sm font-medium text-text-primary">Preview (first 3 rows)</label>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs">
                    <thead>
                      <tr className="bg-background-tertiary">
                        {selectedFields.slice(0, 5).map((field) => (
                          <th key={field} className="px-3 py-2 text-left text-text-secondary font-medium">
                            {field}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {[1, 2, 3].map((row) => (
                        <tr key={row} className="border-b border-border-default">
                          {selectedFields.slice(0, 5).map((field) => (
                            <td key={field} className="px-3 py-2 text-text-muted">
                              Sample data {row}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-border-default bg-background-tertiary flex justify-end gap-3">
              <Button variant="secondary" onClick={() => setShowExportModal(false)}>
                Cancel
              </Button>
              <Button
                leftIcon={<Download size={14} />}
                onClick={startExport}
                disabled={selectedFields.length === 0}
              >
                Export {selectedData.recordCount.toLocaleString()} Records
              </Button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Progress Modal */}
      {showProgressModal && selectedData && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-background-secondary rounded-xl max-w-md w-full p-6"
          >
            {isExporting ? (
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-accent-primary/20 flex items-center justify-center">
                  <Loader2 size={32} className="text-accent-primary animate-spin" />
                </div>
                <h3 className="text-lg font-semibold text-text-primary mb-2">
                  Exporting Data...
                </h3>
                <p className="text-sm text-text-secondary mb-4">{selectedData.name}</p>
                <div className="w-full bg-background-tertiary rounded-full h-2 mb-2">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 2.5 }}
                    className="bg-accent-primary h-2 rounded-full"
                  />
                </div>
                <p className="text-xs text-text-muted">
                  Processing {selectedData.recordCount.toLocaleString()} records...
                </p>
                <Button
                  variant="secondary"
                  size="sm"
                  className="mt-4"
                  onClick={closeProgressModal}
                >
                  Cancel
                </Button>
              </div>
            ) : exportComplete ? (
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-500/20 flex items-center justify-center">
                  <CheckCircle size={32} className="text-green-500" />
                </div>
                <h3 className="text-lg font-semibold text-text-primary mb-2">
                  Export Complete!
                </h3>
                <p className="text-sm text-text-secondary mb-6">
                  {selectedData.recordCount.toLocaleString()} records exported successfully
                </p>
                <div className="flex items-center justify-center gap-3">
                  <Button variant="secondary" onClick={closeProgressModal}>
                    Close
                  </Button>
                  <Button leftIcon={<Download size={14} />}>
                    Download {selectedFormat}
                  </Button>
                </div>
              </div>
            ) : null}
          </motion.div>
        </div>
      )}
    </div>
  );
};
