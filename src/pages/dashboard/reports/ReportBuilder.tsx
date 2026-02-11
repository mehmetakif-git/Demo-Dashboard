import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  Search,
  TrendingUp,
  Users,
  DollarSign,
  Package,
  UserCircle,
  CheckSquare,
  Shield,
  Wallet,
  FileText,
  FileSpreadsheet,
  FileCode,
  Play,
  Clock,
  X,
  Calendar,
  BarChart3,
  Send,
  Download,
  Save,
  Loader2,
  CheckCircle,
} from 'lucide-react';
import { PageHeader, Card, Input, Button } from '@/components/common';
import {
  reportTemplates,
  reportCategories,
  getCategoryColor,
  getFormatColor,
  formatDate,
  type ReportTemplate,
} from '@/data/reportData';
import { useTranslation } from 'react-i18next';

export const ReportBuilder = () => {
  const { t } = useTranslation('reports');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState<ReportTemplate | null>(null);
  const [showConfigModal, setShowConfigModal] = useState(false);
  const [showProgressModal, setShowProgressModal] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationComplete, setGenerationComplete] = useState(false);

  // Form state
  const [dateRange, setDateRange] = useState('this-month');
  const [outputFormat, setOutputFormat] = useState('PDF');
  const [includeCharts, setIncludeCharts] = useState(true);
  const [includeSummary, setIncludeSummary] = useState(true);
  const [deliveryMethod, setDeliveryMethod] = useState<'download' | 'email' | 'schedule'>('download');
  const [emailRecipient, setEmailRecipient] = useState('');

  const filteredTemplates = useMemo(() => {
    let templates = [...reportTemplates];

    if (selectedCategory !== 'all') {
      templates = templates.filter(
        t => t.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      templates = templates.filter(
        t =>
          t.name.toLowerCase().includes(query) ||
          t.description.toLowerCase().includes(query)
      );
    }

    return templates;
  }, [selectedCategory, searchQuery]);

  const getTemplateIcon = (iconName: string) => {
    const icons: Record<string, React.ReactNode> = {
      TrendingUp: <TrendingUp size={24} />,
      Users: <Users size={24} />,
      DollarSign: <DollarSign size={24} />,
      Package: <Package size={24} />,
      UserCircle: <UserCircle size={24} />,
      CheckSquare: <CheckSquare size={24} />,
      Shield: <Shield size={24} />,
      Wallet: <Wallet size={24} />,
    };
    return icons[iconName] || <FileText size={24} />;
  };

  const getFormatIcon = (format: string) => {
    const icons: Record<string, React.ReactNode> = {
      PDF: <FileText size={14} />,
      Excel: <FileSpreadsheet size={14} />,
      CSV: <FileText size={14} />,
      JSON: <FileCode size={14} />,
    };
    return icons[format] || <FileText size={14} />;
  };

  const handleGenerate = (template: ReportTemplate) => {
    setSelectedTemplate(template);
    setOutputFormat(template.formats[0]);
    setShowConfigModal(true);
  };

  const startGeneration = () => {
    setShowConfigModal(false);
    setShowProgressModal(true);
    setIsGenerating(true);
    setGenerationComplete(false);

    // Simulate generation
    setTimeout(() => {
      setIsGenerating(false);
      setGenerationComplete(true);
    }, 3000);
  };

  const closeProgressModal = () => {
    setShowProgressModal(false);
    setIsGenerating(false);
    setGenerationComplete(false);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title={t('reportBuilder.title')}
        subtitle={t('reportBuilder.subtitle')}
      />

      {/* Category Tabs */}
      <div className="flex flex-wrap items-center gap-2">
        {reportCategories.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 ${
              selectedCategory === category.id
                ? 'bg-accent-primary text-white'
                : 'bg-white/[0.05] text-text-secondary hover:bg-white/[0.03] backdrop-blur-xl'
            }`}
          >
            {category.color && (
              <div
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: category.color }}
              />
            )}
            {category.name}
            <span className="text-xs opacity-70">({category.count})</span>
          </button>
        ))}
      </div>

      {/* Search Bar */}
      <Card className="p-4">
        <div className="max-w-md">
          <Input
            placeholder={t('reportBuilder.searchPlaceholder')}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            leftIcon={<Search size={16} />}
          />
        </div>
      </Card>

      {/* Report Templates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTemplates.map((template) => (
          <motion.div
            key={template.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -4 }}
          >
            <Card className="p-6 h-full flex flex-col">
              {/* Header */}
              <div className="flex items-start gap-4 mb-4">
                <div
                  className="w-12 h-12 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: `${getCategoryColor(template.category)}20` }}
                >
                  <div style={{ color: getCategoryColor(template.category) }}>
                    {getTemplateIcon(template.icon)}
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-text-primary">{template.name}</h3>
                  <span
                    className="inline-block px-2 py-0.5 rounded text-xs font-medium mt-1"
                    style={{
                      backgroundColor: `${getCategoryColor(template.category)}20`,
                      color: getCategoryColor(template.category),
                    }}
                  >
                    {template.category}
                  </span>
                </div>
              </div>

              {/* Description */}
              <p className="text-sm text-text-secondary mb-4 flex-1">
                {template.description}
              </p>

              {/* Formats */}
              <div className="flex items-center gap-2 mb-4">
                <span className="text-xs text-text-muted">{t('reportBuilder.formats')}:</span>
                <div className="flex items-center gap-1">
                  {template.formats.map((format) => (
                    <span
                      key={format}
                      className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium"
                      style={{
                        backgroundColor: `${getFormatColor(format)}20`,
                        color: getFormatColor(format),
                      }}
                    >
                      {getFormatIcon(format)}
                      {format}
                    </span>
                  ))}
                </div>
              </div>

              {/* Stats */}
              <div className="flex items-center justify-between text-xs text-text-muted mb-4 pt-4 border-t border-white/[0.08]">
                <span className="flex items-center gap-1">
                  <BarChart3 size={12} />
                  {t('reportBuilder.usedTimes', { count: template.usageCount })}
                </span>
                <span className="flex items-center gap-1">
                  <Clock size={12} />
                  {template.estimatedTime}
                </span>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between">
                <span className="text-xs text-text-muted">
                  {t('reportBuilder.lastUsed', { date: formatDate(template.lastUsed) })}
                </span>
                <Button
                  size="sm"
                  leftIcon={<Play size={14} />}
                  onClick={() => handleGenerate(template)}
                >
                  {t('reportBuilder.generate')}
                </Button>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Empty State */}
      {filteredTemplates.length === 0 && (
        <Card className="p-12 text-center">
          <FileText size={48} className="mx-auto mb-4 text-text-muted" />
          <p className="text-text-secondary">{t('reportBuilder.noTemplatesFound')}</p>
        </Card>
      )}

      {/* Configuration Modal */}
      {showConfigModal && selectedTemplate && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white/[0.03] backdrop-blur-xl rounded-xl max-w-lg w-full max-h-[90vh] overflow-y-auto"
          >
            {/* Header */}
            <div className="p-6 border-b border-white/[0.08]">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: `${getCategoryColor(selectedTemplate.category)}20` }}
                  >
                    <div style={{ color: getCategoryColor(selectedTemplate.category) }}>
                      {getTemplateIcon(selectedTemplate.icon)}
                    </div>
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-text-primary">
                      {selectedTemplate.name}
                    </h2>
                    <p className="text-sm text-text-muted">{t('reportBuilder.configureParameters')}</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowConfigModal(false)}
                  className="p-2 hover:bg-white/[0.05] rounded-lg"
                >
                  <X size={20} className="text-text-secondary" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">
              {/* Date Range */}
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  <Calendar size={14} className="inline mr-2" />
                  {t('reportBuilder.dateRange')}
                </label>
                <select
                  value={dateRange}
                  onChange={(e) => setDateRange(e.target.value)}
                  className="w-full px-3 py-2 bg-white/[0.05] border border-white/[0.08] rounded-lg text-text-primary focus:outline-none focus:border-accent-primary"
                >
                  <option value="today">{t('reportBuilder.today')}</option>
                  <option value="yesterday">{t('reportBuilder.yesterday')}</option>
                  <option value="this-week">{t('reportBuilder.thisWeek')}</option>
                  <option value="last-week">{t('reportBuilder.lastWeek')}</option>
                  <option value="this-month">{t('reportBuilder.thisMonth')}</option>
                  <option value="last-month">{t('reportBuilder.lastMonth')}</option>
                  <option value="this-quarter">{t('reportBuilder.thisQuarter')}</option>
                  <option value="custom">{t('reportBuilder.customRange')}</option>
                </select>
              </div>

              {/* Dynamic Filters */}
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  {t('reportBuilder.filters')}
                </label>
                <div className="space-y-3">
                  {selectedTemplate.fields.slice(1).map((field) => (
                    <div key={field}>
                      <label className="block text-xs text-text-muted mb-1">{field}</label>
                      <select className="w-full px-3 py-2 bg-white/[0.05] border border-white/[0.08] rounded-lg text-text-primary text-sm focus:outline-none focus:border-accent-primary">
                        <option value="all">{t('reportBuilder.all')}</option>
                        <option value="option1">Option 1</option>
                        <option value="option2">Option 2</option>
                      </select>
                    </div>
                  ))}
                </div>
              </div>

              {/* Output Format */}
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  {t('reportBuilder.outputFormat')}
                </label>
                <div className="flex flex-wrap gap-2">
                  {selectedTemplate.formats.map((format) => (
                    <button
                      key={format}
                      onClick={() => setOutputFormat(format)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors ${
                        outputFormat === format
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

              {/* Options */}
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  {t('reportBuilder.options')}
                </label>
                <div className="space-y-2">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={includeCharts}
                      onChange={(e) => setIncludeCharts(e.target.checked)}
                      className="w-4 h-4 rounded border-white/[0.08] text-accent-primary focus:ring-accent-primary"
                    />
                    <span className="text-sm text-text-secondary">{t('reportBuilder.includeCharts')}</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={includeSummary}
                      onChange={(e) => setIncludeSummary(e.target.checked)}
                      className="w-4 h-4 rounded border-white/[0.08] text-accent-primary focus:ring-accent-primary"
                    />
                    <span className="text-sm text-text-secondary">{t('reportBuilder.includeSummary')}</span>
                  </label>
                </div>
              </div>

              {/* Delivery Method */}
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  {t('reportBuilder.deliveryMethod')}
                </label>
                <div className="space-y-2">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="radio"
                      name="delivery"
                      checked={deliveryMethod === 'download'}
                      onChange={() => setDeliveryMethod('download')}
                      className="w-4 h-4 border-white/[0.08] text-accent-primary focus:ring-accent-primary"
                    />
                    <Download size={16} className="text-text-muted" />
                    <span className="text-sm text-text-secondary">{t('reportBuilder.downloadImmediately')}</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="radio"
                      name="delivery"
                      checked={deliveryMethod === 'email'}
                      onChange={() => setDeliveryMethod('email')}
                      className="w-4 h-4 border-white/[0.08] text-accent-primary focus:ring-accent-primary"
                    />
                    <Send size={16} className="text-text-muted" />
                    <span className="text-sm text-text-secondary">{t('reportBuilder.sendToEmail')}</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="radio"
                      name="delivery"
                      checked={deliveryMethod === 'schedule'}
                      onChange={() => setDeliveryMethod('schedule')}
                      className="w-4 h-4 border-white/[0.08] text-accent-primary focus:ring-accent-primary"
                    />
                    <Clock size={16} className="text-text-muted" />
                    <span className="text-sm text-text-secondary">{t('reportBuilder.scheduleReport')}</span>
                  </label>
                </div>

                {deliveryMethod === 'email' && (
                  <div className="mt-3">
                    <Input
                      placeholder={t('reportBuilder.enterEmail')}
                      value={emailRecipient}
                      onChange={(e) => setEmailRecipient(e.target.value)}
                      leftIcon={<Send size={14} />}
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-white/[0.08] bg-white/[0.05] flex items-center justify-between">
              <Button
                variant="ghost"
                leftIcon={<Save size={14} />}
                onClick={() => setShowConfigModal(false)}
              >
                {t('reportBuilder.saveAsTemplate')}
              </Button>
              <div className="flex items-center gap-3">
                <Button variant="secondary" onClick={() => setShowConfigModal(false)}>
                  {t('reportBuilder.cancel')}
                </Button>
                <Button leftIcon={<Play size={14} />} onClick={startGeneration}>
                  {t('reportBuilder.generateReport')}
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* Progress Modal */}
      {showProgressModal && selectedTemplate && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white/[0.03] backdrop-blur-xl rounded-xl max-w-md w-full p-6"
          >
            {isGenerating ? (
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-accent-primary/20 flex items-center justify-center">
                  <Loader2 size={32} className="text-accent-primary animate-spin" />
                </div>
                <h3 className="text-lg font-semibold text-text-primary mb-2">
                  {t('reportBuilder.generatingReport')}
                </h3>
                <p className="text-sm text-text-secondary mb-4">
                  {selectedTemplate.name}
                </p>
                <div className="w-full bg-white/[0.05] rounded-full h-2 mb-2">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 3 }}
                    className="bg-accent-primary h-2 rounded-full"
                  />
                </div>
                <p className="text-xs text-text-muted">
                  {t('reportBuilder.estimatedTime', { time: selectedTemplate.estimatedTime })}
                </p>
                <Button
                  variant="secondary"
                  size="sm"
                  className="mt-4"
                  onClick={closeProgressModal}
                >
                  {t('reportBuilder.cancel')}
                </Button>
              </div>
            ) : generationComplete ? (
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-500/20 flex items-center justify-center">
                  <CheckCircle size={32} className="text-green-500" />
                </div>
                <h3 className="text-lg font-semibold text-text-primary mb-2">
                  {t('reportBuilder.reportGenerated')}
                </h3>
                <p className="text-sm text-text-secondary mb-6">
                  {t('reportBuilder.readyForDownload')}
                </p>
                <div className="flex items-center justify-center gap-3">
                  <Button variant="secondary" onClick={closeProgressModal}>
                    {t('reportBuilder.close')}
                  </Button>
                  <Button leftIcon={<Download size={14} />}>
                    {t('reportBuilder.download')} {outputFormat}
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
