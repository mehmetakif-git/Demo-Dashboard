import { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import {
  FileText,
  Search,
  Plus,
  MoreVertical,
  Download,
  Eye,
  Calendar,
  User,
  Tag,
  Folder,
} from 'lucide-react';
import { PageHeader, Card, Button, Input, Dropdown } from '@/components/common';
import { documents, LAW_COLOR } from '@/data/law/lawData';

export const Documents = () => {
  const { t } = useTranslation('law');

  const statusMap: Record<string, string> = {
    'all': t('documents.all'),
    'draft': t('status.draft'),
    'reviewed': t('status.reviewed'),
    'filed': t('status.filed'),
    'sent': t('status.sent'),
  };
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const documentTypes = useMemo(() => {
    return ['all', ...new Set(documents.map(d => d.documentType))];
  }, []);

  const stats = useMemo(() => {
    const totalDocs = documents.length;
    const filedDocs = documents.filter(d => d.status === 'filed').length;
    const reviewedDocs = documents.filter(d => d.status === 'reviewed').length;
    const recentUploads = documents.filter(d => {
      const uploadDate = new Date(d.uploadDate);
      const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
      return uploadDate >= weekAgo;
    }).length;

    return { totalDocs, filedDocs, reviewedDocs, recentUploads };
  }, []);

  const filteredDocuments = useMemo(() => {
    return documents.filter(doc => {
      const matchesSearch = doc.documentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doc.caseNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doc.fileName.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesType = typeFilter === 'all' || doc.documentType === typeFilter;
      const matchesStatus = statusFilter === 'all' || doc.status === statusFilter;

      return matchesSearch && matchesType && matchesStatus;
    });
  }, [searchQuery, typeFilter, statusFilter]);

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      'draft': '#64748b',
      'reviewed': '#3b82f6',
      'filed': '#10b981',
      'sent': '#8b5cf6',
    };
    return colors[status] || LAW_COLOR;
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'Pleading': return FileText;
      case 'Evidence': return Folder;
      case 'Contract': return FileText;
      case 'Correspondence': return FileText;
      case 'Judgment': return FileText;
      default: return FileText;
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title={t('documents.title')}
        subtitle={t('documents.subtitle')}
        icon={FileText}
        actions={
          <Button>
            <Plus size={18} />
            {t('documents.uploadDocument')}
          </Button>
        }
      />

      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: t('documents.totalDocuments'), value: stats.totalDocs, icon: FileText, color: LAW_COLOR },
          { label: t('documents.filed'), value: stats.filedDocs, icon: Folder, color: '#10b981' },
          { label: t('documents.reviewed'), value: stats.reviewedDocs, icon: Eye, color: '#3b82f6' },
          { label: t('documents.recentUploads'), value: stats.recentUploads, icon: Calendar, color: '#f59e0b' },
        ].map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card className="p-4">
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: `${stat.color}20` }}
                  >
                    <Icon size={20} style={{ color: stat.color }} />
                  </div>
                  <div>
                    <p className="text-lg font-bold text-text-primary">{stat.value}</p>
                    <p className="text-xs text-text-muted">{stat.label}</p>
                  </div>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Filters */}
      <Card className="p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
            <Input
              placeholder={t('documents.searchPlaceholder')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            {documentTypes.map((type) => (
              <Button
                key={type}
                variant={typeFilter === type ? 'primary' : 'ghost'}
                size="sm"
                onClick={() => setTypeFilter(type)}
              >
                {type === 'all' ? t('documents.allTypes') : type}
              </Button>
            ))}
          </div>
        </div>
        <div className="flex gap-2 mt-3 flex-wrap">
          <span className="text-sm text-text-muted mr-2">{t('documents.statusLabel')}</span>
          {['all', 'draft', 'reviewed', 'filed', 'sent'].map((status) => (
            <Button
              key={status}
              variant={statusFilter === status ? 'primary' : 'ghost'}
              size="sm"
              onClick={() => setStatusFilter(status)}
            >
              {statusMap[status] || status}
            </Button>
          ))}
        </div>
      </Card>

      {/* Documents Table */}
      <Card className="p-4">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-background-tertiary">
              <tr>
                <th className="text-left py-3 px-4 text-sm font-medium text-text-muted">{t('documents.document')}</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-text-muted">{t('documents.caseNo')}</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-text-muted">{t('documents.type')}</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-text-muted">{t('documents.uploadedBy')}</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-text-muted">{t('documents.date')}</th>
                <th className="text-center py-3 px-4 text-sm font-medium text-text-muted">{t('documents.size')}</th>
                <th className="text-center py-3 px-4 text-sm font-medium text-text-muted">{t('documents.status')}</th>
                <th className="text-center py-3 px-4 text-sm font-medium text-text-muted">{t('documents.actions')}</th>
              </tr>
            </thead>
            <tbody>
              {filteredDocuments.map((doc, index) => {
                const TypeIcon = getTypeIcon(doc.documentType);

                return (
                  <motion.tr
                    key={doc.id}
                    className="border-b border-border-default last:border-b-0 hover:bg-background-secondary/50"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.03 }}
                  >
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-10 h-10 rounded-lg flex items-center justify-center"
                          style={{ backgroundColor: `${LAW_COLOR}20` }}
                        >
                          <TypeIcon size={18} style={{ color: LAW_COLOR }} />
                        </div>
                        <div>
                          <p className="font-medium text-text-primary">{doc.documentName}</p>
                          <p className="text-xs text-text-muted">{doc.fileName}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className="font-mono text-sm text-text-secondary">{doc.caseNo}</span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-text-secondary">{doc.documentType}</span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <User size={14} className="text-text-muted" />
                        <span className="text-text-secondary text-sm">{doc.uploadedBy}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <Calendar size={14} className="text-text-muted" />
                        <span className="text-text-secondary text-sm">{doc.uploadDate}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span className="text-text-muted text-sm">{doc.size}</span>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span
                        className="inline-flex px-2 py-1 rounded-full text-xs font-medium"
                        style={{ backgroundColor: `${getStatusColor(doc.status)}20`, color: getStatusColor(doc.status) }}
                      >
                        {statusMap[doc.status] || doc.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <div className="flex items-center justify-center gap-1">
                        <Button variant="ghost" size="sm">
                          <Eye size={16} />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Download size={16} />
                        </Button>
                        <Dropdown
                          trigger={
                            <Button variant="ghost" size="sm">
                              <MoreVertical size={16} />
                            </Button>
                          }
                          items={[
                            { id: 'edit', label: t('documents.edit'), onClick: () => {} },
                            { id: 'delete', label: t('documents.delete'), onClick: () => {} },
                          ]}
                        />
                      </div>
                    </td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Tags Display */}
        {filteredDocuments.length > 0 && (
          <div className="mt-4 pt-4 border-t border-border-default">
            <div className="flex items-center gap-2 flex-wrap">
              <Tag size={14} className="text-text-muted" />
              <span className="text-xs text-text-muted">{t('documents.popularTags')}</span>
              {['Pleading', 'Evidence', 'Financial', 'Contract', 'Judgment'].map((tag) => (
                <span key={tag} className="text-xs px-2 py-1 bg-background-tertiary rounded text-text-secondary">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {filteredDocuments.length === 0 && (
          <div className="py-12 text-center text-text-muted">
            <FileText size={48} className="mx-auto mb-4 opacity-50" />
            <p>{t('documents.noDocumentsFound')}</p>
          </div>
        )}
      </Card>
    </div>
  );
};

export default Documents;
