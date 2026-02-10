import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  ClipboardList,
  FileText,
  Download,
  Calendar,
  BarChart3,
  PieChart,
  TrendingUp,
  DollarSign,
  Users,
  Printer,
  Mail,
} from 'lucide-react';
import { PageHeader } from '@/components/common';
import { useTranslation } from 'react-i18next';

interface ReportType {
  id: string;
  name: string;
  description: string;
  icon: React.ElementType;
  category: string;
  lastGenerated?: string;
}

const reportTypes: ReportType[] = [
  {
    id: 'income-statement',
    name: 'Income Statement',
    description: 'Comprehensive profit and loss report showing revenues and expenses',
    icon: TrendingUp,
    category: 'Financial',
    lastGenerated: '2024-12-28',
  },
  {
    id: 'balance-sheet',
    name: 'Balance Sheet',
    description: 'Assets, liabilities, and equity at a specific point in time',
    icon: BarChart3,
    category: 'Financial',
    lastGenerated: '2024-12-27',
  },
  {
    id: 'cash-flow-statement',
    name: 'Cash Flow Statement',
    description: 'Cash inflows and outflows from operating, investing, and financing',
    icon: DollarSign,
    category: 'Financial',
    lastGenerated: '2024-12-26',
  },
  {
    id: 'expense-report',
    name: 'Expense Report',
    description: 'Detailed breakdown of all expenses by category',
    icon: PieChart,
    category: 'Operational',
    lastGenerated: '2024-12-25',
  },
  {
    id: 'accounts-receivable',
    name: 'Accounts Receivable Aging',
    description: 'Outstanding invoices organized by age',
    icon: FileText,
    category: 'Operational',
    lastGenerated: '2024-12-24',
  },
  {
    id: 'accounts-payable',
    name: 'Accounts Payable Aging',
    description: 'Outstanding bills and payments due',
    icon: FileText,
    category: 'Operational',
    lastGenerated: '2024-12-23',
  },
  {
    id: 'tax-summary',
    name: 'Tax Summary Report',
    description: 'Summary of all tax obligations and payments',
    icon: ClipboardList,
    category: 'Tax',
    lastGenerated: '2024-12-20',
  },
  {
    id: 'vendor-payments',
    name: 'Vendor Payment Report',
    description: 'All payments made to vendors and suppliers',
    icon: Users,
    category: 'Operational',
  },
];

const categories = ['All', 'Financial', 'Operational', 'Tax'];

export const Reports = () => {
  const { t } = useTranslation('common');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedPeriod, setSelectedPeriod] = useState('monthly');
  const [generatingReport, setGeneratingReport] = useState<string | null>(null);

  const filteredReports = reportTypes.filter(
    (report) => selectedCategory === 'All' || report.category === selectedCategory
  );

  const handleGenerateReport = (reportId: string) => {
    setGeneratingReport(reportId);
    // Simulate report generation
    setTimeout(() => {
      setGeneratingReport(null);
    }, 2000);
  };

  return (
    <div className="p-6 space-y-6">
      <PageHeader
        title={t('accounting.financialReports', 'Financial Reports')}
        subtitle="Generate and download financial reports"
        icon={ClipboardList}
      />

      {/* Report Settings */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] rounded-xl p-6"
      >
        <h3 className="text-lg font-semibold text-white mb-4">Report Settings</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Period Selection */}
          <div>
            <label className="block text-sm text-white/60 mb-2">Reporting Period</label>
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="w-full px-3 py-2.5 bg-[#1a1a24] border border-[#2e2e3e] rounded-lg text-white text-sm focus:outline-none focus:border-[#547792]/50 cursor-pointer"
            >
              <option value="monthly">Monthly</option>
              <option value="quarterly">Quarterly</option>
              <option value="yearly">Yearly</option>
              <option value="custom">Custom Range</option>
            </select>
          </div>

          {/* Date Range */}
          <div>
            <label className="block text-sm text-white/60 mb-2">Start Date</label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
              <input
                type="date"
                className="w-full pl-10 pr-4 py-2.5 bg-[#1a1a24] border border-[#2e2e3e] rounded-lg text-white text-sm focus:outline-none focus:border-[#547792]/50"
                defaultValue="2024-12-01"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm text-white/60 mb-2">End Date</label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
              <input
                type="date"
                className="w-full pl-10 pr-4 py-2.5 bg-[#1a1a24] border border-[#2e2e3e] rounded-lg text-white text-sm focus:outline-none focus:border-[#547792]/50"
                defaultValue="2024-12-31"
              />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Category Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex items-center gap-2"
      >
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
              selectedCategory === category
                ? 'bg-[#547792] text-white'
                : 'bg-white/[0.03] backdrop-blur-xl text-white/60 hover:text-white border border-white/[0.08]'
            }`}
          >
            {category}
          </button>
        ))}
      </motion.div>

      {/* Report Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredReports.map((report, index) => {
          const Icon = report.icon;
          const isGenerating = generatingReport === report.id;

          return (
            <motion.div
              key={report.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 + index * 0.05 }}
              className="bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] rounded-xl p-6 hover:border-[#2e2e3e] transition-colors"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-[#547792]/20 flex items-center justify-center">
                    <Icon className="w-6 h-6 text-[#547792]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">{report.name}</h3>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-white/5 text-white/40">
                      {report.category}
                    </span>
                  </div>
                </div>
              </div>

              {/* Description */}
              <p className="text-sm text-white/60 mb-4">{report.description}</p>

              {/* Last Generated */}
              {report.lastGenerated && (
                <p className="text-xs text-white/40 mb-4">
                  Last generated: {new Date(report.lastGenerated).toLocaleDateString()}
                </p>
              )}

              {/* Actions */}
              <div className="flex items-center gap-2 pt-4 border-t border-white/[0.08]">
                <button
                  onClick={() => handleGenerateReport(report.id)}
                  disabled={isGenerating}
                  className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg font-medium text-sm transition-all cursor-pointer ${
                    isGenerating
                      ? 'bg-[#547792]/50 text-white/50 cursor-not-allowed'
                      : 'bg-gradient-to-r from-[#547792] to-[#94B4C1] text-white hover:opacity-90'
                  }`}
                >
                  {isGenerating ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Download className="w-4 h-4" />
                      Generate Report
                    </>
                  )}
                </button>
                <button className="p-2.5 rounded-lg text-white/40 hover:text-white hover:bg-white/5 transition-colors cursor-pointer">
                  <Printer className="w-4 h-4" />
                </button>
                <button className="p-2.5 rounded-lg text-white/40 hover:text-white hover:bg-white/5 transition-colors cursor-pointer">
                  <Mail className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] rounded-xl p-6"
      >
        <h3 className="text-lg font-semibold text-white mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <button className="flex items-center gap-3 p-4 rounded-lg bg-[#1a1a24] hover:bg-[#1a1a24]/80 transition-colors cursor-pointer">
            <div className="p-2 rounded-lg bg-emerald-500/20">
              <Download className="w-5 h-5 text-emerald-400" />
            </div>
            <div className="text-left">
              <p className="text-white font-medium">Export All</p>
              <p className="text-xs text-white/40">Download all reports</p>
            </div>
          </button>

          <button className="flex items-center gap-3 p-4 rounded-lg bg-[#1a1a24] hover:bg-[#1a1a24]/80 transition-colors cursor-pointer">
            <div className="p-2 rounded-lg bg-blue-500/20">
              <Calendar className="w-5 h-5 text-blue-400" />
            </div>
            <div className="text-left">
              <p className="text-white font-medium">Schedule Reports</p>
              <p className="text-xs text-white/40">Set up auto-generation</p>
            </div>
          </button>

          <button className="flex items-center gap-3 p-4 rounded-lg bg-[#1a1a24] hover:bg-[#1a1a24]/80 transition-colors cursor-pointer">
            <div className="p-2 rounded-lg bg-purple-500/20">
              <Mail className="w-5 h-5 text-purple-400" />
            </div>
            <div className="text-left">
              <p className="text-white font-medium">Email Reports</p>
              <p className="text-xs text-white/40">Send to stakeholders</p>
            </div>
          </button>

          <button className="flex items-center gap-3 p-4 rounded-lg bg-[#1a1a24] hover:bg-[#1a1a24]/80 transition-colors cursor-pointer">
            <div className="p-2 rounded-lg bg-orange-500/20">
              <FileText className="w-5 h-5 text-orange-400" />
            </div>
            <div className="text-left">
              <p className="text-white font-medium">Custom Report</p>
              <p className="text-xs text-white/40">Build your own report</p>
            </div>
          </button>
        </div>
      </motion.div>
    </div>
  );
};
