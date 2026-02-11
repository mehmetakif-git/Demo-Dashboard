import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  Folder,
  FileText,
  FileSpreadsheet,
  Image,
  File,
  Clock,
  Eye,
  Edit,
  Share2,
  Plus,
  Download,
  MoreVertical,
  Trash2,
  Presentation,
} from 'lucide-react';
import { PageHeader, Card, Button } from '@/components/common';
import { recentFiles, type RecentFile } from '@/data/fileData';
import { useTranslation } from 'react-i18next';

export const RecentFiles = () => {
  const { t } = useTranslation('files');
  const [filterAction, setFilterAction] = useState<string>('all');

  const groupedFiles = useMemo(() => {
    let files = [...recentFiles];

    if (filterAction !== 'all') {
      files = files.filter(f => f.action === filterAction);
    }

    // Group by time
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const yesterday = new Date(today.getTime() - 86400000);
    const thisWeekStart = new Date(today.getTime() - (today.getDay() * 86400000));
    const thisMonthStart = new Date(now.getFullYear(), now.getMonth(), 1);

    const groups: { label: string; files: RecentFile[] }[] = [
      { label: t('recentFiles.today'), files: [] },
      { label: t('recentFiles.yesterday'), files: [] },
      { label: t('recentFiles.thisWeek'), files: [] },
      { label: t('recentFiles.thisMonth'), files: [] },
      { label: t('recentFiles.older'), files: [] },
    ];

    files.forEach(file => {
      const fileDate = new Date(file.accessedAt);

      if (fileDate >= today) {
        groups[0].files.push(file);
      } else if (fileDate >= yesterday) {
        groups[1].files.push(file);
      } else if (fileDate >= thisWeekStart) {
        groups[2].files.push(file);
      } else if (fileDate >= thisMonthStart) {
        groups[3].files.push(file);
      } else {
        groups[4].files.push(file);
      }
    });

    return groups.filter(g => g.files.length > 0);
  }, [filterAction]);

  const getFileIcon = (type: string) => {
    const iconMap: Record<string, React.ReactNode> = {
      folder: <Folder size={20} className="text-[#547792]" />,
      document: <FileText size={20} className="text-blue-400" />,
      spreadsheet: <FileSpreadsheet size={20} className="text-green-400" />,
      pdf: <FileText size={20} className="text-red-400" />,
      image: <Image size={20} className="text-pink-400" />,
      presentation: <Presentation size={20} className="text-orange-400" />,
    };

    return iconMap[type] || <File size={20} className="text-gray-400" />;
  };

  const getActionBadge = (action: RecentFile['action']) => {
    const config = {
      edited: { bg: 'bg-blue-500/20', text: 'text-blue-400', icon: Edit, label: t('recentFiles.edited') },
      viewed: { bg: 'bg-gray-500/20', text: 'text-gray-400', icon: Eye, label: t('recentFiles.viewed') },
      created: { bg: 'bg-green-500/20', text: 'text-green-400', icon: Plus, label: t('recentFiles.created') },
      shared: { bg: 'bg-[#94B4C1]/20', text: 'text-[#94B4C1]', icon: Share2, label: t('recentFiles.shared') },
    };
    const c = config[action];
    const Icon = c.icon;
    return (
      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium ${c.bg} ${c.text}`}>
        <Icon size={12} />
        {c.label}
      </span>
    );
  };

  const formatTime = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title={t('recentFiles.title')}
        subtitle={t('recentFiles.subtitle')}
        actions={
          <Button variant="secondary" leftIcon={<Trash2 size={16} />}>
            {t('recentFiles.clearRecentActivity')}
          </Button>
        }
      />

      {/* Filter Bar */}
      <Card className="p-4">
        <div className="flex items-center gap-2">
          <span className="text-sm text-text-muted mr-2">{t('recentFiles.filterBy')}</span>
          {(['all', 'edited', 'viewed', 'created', 'shared'] as const).map((action) => (
            <button
              key={action}
              onClick={() => setFilterAction(action)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                filterAction === action
                  ? 'bg-accent-primary text-white'
                  : 'bg-white/[0.05] text-text-secondary hover:bg-white/[0.03] backdrop-blur-xl'
              }`}
            >
              {t(`recentFiles.${action}`)}
            </button>
          ))}
        </div>
      </Card>

      {/* Grouped Files */}
      <div className="space-y-6">
        {groupedFiles.map((group) => (
          <div key={group.label}>
            <h3 className="text-sm font-semibold text-text-secondary mb-3">{group.label}</h3>
            <div className="space-y-2">
              {group.files.map((file) => (
                <motion.div
                  key={file.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                >
                  <Card className="p-4 hover:shadow-lg transition-all cursor-pointer group">
                    <div className="flex items-center gap-4">
                      {/* Icon */}
                      <div className="w-10 h-10 rounded-lg bg-white/[0.05] flex items-center justify-center">
                        {getFileIcon(file.type)}
                      </div>

                      {/* File Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-medium text-text-primary truncate">{file.name}</h4>
                          {getActionBadge(file.action)}
                        </div>
                        <div className="flex items-center gap-3 text-sm text-text-muted">
                          <span className="flex items-center gap-1">
                            <Clock size={12} />
                            {formatTime(file.accessedAt)}
                          </span>
                          <span className="text-text-secondary">{file.location}</span>
                          {file.size && <span>{file.size}</span>}
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="p-2 hover:bg-white/[0.05] rounded-lg text-text-secondary hover:text-accent-primary">
                          <Eye size={16} />
                        </button>
                        <button className="p-2 hover:bg-white/[0.05] rounded-lg text-text-secondary hover:text-accent-primary">
                          <Download size={16} />
                        </button>
                        <button className="p-2 hover:bg-white/[0.05] rounded-lg text-text-secondary hover:text-accent-primary">
                          <Share2 size={16} />
                        </button>
                        <button className="p-2 hover:bg-white/[0.05] rounded-lg text-text-secondary">
                          <MoreVertical size={16} />
                        </button>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {groupedFiles.length === 0 && (
        <Card className="p-12 text-center">
          <Clock size={48} className="mx-auto mb-4 text-text-muted" />
          <p className="text-text-secondary">{t('recentFiles.noRecentActivity')}</p>
        </Card>
      )}
    </div>
  );
};
