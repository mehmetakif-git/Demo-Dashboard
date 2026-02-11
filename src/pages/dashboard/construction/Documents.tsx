import { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import {
  FileText,
  Search,
  Plus,
  Download,
  Eye,
  Folder,
  Image,
  File,
  MoreVertical,
  Calendar,
  User,
  Tag,
} from 'lucide-react';
import { PageHeader, Card, Button, Input, Dropdown } from '@/components/common';
import { documents, projects, CONSTRUCTION_COLOR } from '@/data/construction/constructionData';

export const Documents = () => {
  const { t } = useTranslation('construction');
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [projectFilter, setProjectFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const statusMap: Record<string, string> = {
    'all': t('documents.all'),
    'draft': t('status.draft'),
    'under-review': t('status.underReview'),
    'approved': t('status.approved'),
  };

  const categories = useMemo(() => {
    return ['all', ...new Set(documents.map(d => d.category))];
  }, []);

  const stats = useMemo(() => {
    const total = documents.length;
    const byCategory = categories.filter(c => c !== 'all').reduce((acc, cat) => {
      acc[cat] = documents.filter(d => d.category === cat).length;
      return acc;
    }, {} as Record<string, number>);

    const recentUploads = documents.filter(d => {
      const uploadDate = new Date(d.uploadDate);
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      return uploadDate >= weekAgo;
    }).length;

    return { total, byCategory, recentUploads };
  }, [categories]);

  const filteredDocuments = useMemo(() => {
    return documents.filter(doc => {
      const matchesSearch = doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doc.fileName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doc.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesCategory = categoryFilter === 'all' || doc.category === categoryFilter;
      const matchesProject = projectFilter === 'all' || doc.projectId === projectFilter;
      const matchesStatus = statusFilter === 'all' || doc.status === statusFilter;

      return matchesSearch && matchesCategory && matchesProject && matchesStatus;
    });
  }, [searchQuery, categoryFilter, projectFilter, statusFilter]);

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      'draft': '#64748b',
      'under-review': '#f59e0b',
      'approved': '#10b981',
    };
    return colors[status] || CONSTRUCTION_COLOR;
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Drawings': return Image;
      case 'Specifications': return FileText;
      case 'Reports': return File;
      case 'Contracts': return FileText;
      case 'Permits': return File;
      default: return FileText;
    }
  };

  const getProjectName = (projectId: string) => {
    const project = projects.find(p => p.id === projectId);
    return project ? project.name : 'Unknown';
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
          { label: t('documents.totalDocuments'), value: stats.total, icon: FileText, color: CONSTRUCTION_COLOR },
          { label: t('documents.drawings'), value: stats.byCategory['Drawings'] || 0, icon: Image, color: '#3b82f6' },
          { label: t('documents.contracts'), value: stats.byCategory['Contracts'] || 0, icon: File, color: '#8b5cf6' },
          { label: t('documents.recentUploads'), value: stats.recentUploads, icon: Calendar, color: '#10b981' },
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
          <select
            className="px-3 py-2 bg-background-secondary border border-border-default rounded-lg text-text-primary"
            value={projectFilter}
            onChange={(e) => setProjectFilter(e.target.value)}
          >
            <option value="all">{t('documents.allProjects')}</option>
            {projects.map(p => (
              <option key={p.id} value={p.id}>{p.name}</option>
            ))}
          </select>
          <select
            className="px-3 py-2 bg-background-secondary border border-border-default rounded-lg text-text-primary"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat === 'all' ? t('documents.allCategories') : cat}</option>
            ))}
          </select>
          <div className="flex gap-2">
            {['all', 'draft', 'under-review', 'approved'].map((status) => (
              <Button
                key={status}
                variant={statusFilter === status ? 'primary' : 'ghost'}
                size="sm"
                onClick={() => setStatusFilter(status)}
              >
                {statusMap[status]}
              </Button>
            ))}
          </div>
        </div>
      </Card>

      {/* Documents Table */}
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-background-tertiary">
              <tr>
                <th className="text-left py-3 px-4 text-sm font-medium text-text-muted">{t('documents.document')}</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-text-muted">{t('documents.category')}</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-text-muted">{t('documents.project')}</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-text-muted">{t('documents.uploaded')}</th>
                <th className="text-center py-3 px-4 text-sm font-medium text-text-muted">{t('documents.version')}</th>
                <th className="text-center py-3 px-4 text-sm font-medium text-text-muted">{t('documents.status')}</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-text-muted">{t('documents.tags')}</th>
                <th className="text-center py-3 px-4 text-sm font-medium text-text-muted">{t('documents.actions')}</th>
              </tr>
            </thead>
            <tbody>
              {filteredDocuments.map((doc, index) => {
                const CategoryIcon = getCategoryIcon(doc.category);

                return (
                  <motion.tr
                    key={doc.id}
                    className="border-b border-border-default last:border-b-0"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.03 }}
                  >
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-10 h-10 rounded-lg flex items-center justify-center"
                          style={{ backgroundColor: `${CONSTRUCTION_COLOR}20` }}
                        >
                          <CategoryIcon size={20} style={{ color: CONSTRUCTION_COLOR }} />
                        </div>
                        <div>
                          <p className="font-medium text-text-primary">{doc.name}</p>
                          <p className="text-xs text-text-muted">{doc.fileName} • {doc.size}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-1">
                        <Folder size={14} className="text-text-muted" />
                        <span className="text-text-secondary">{doc.category}</span>
                      </div>
                      <p className="text-xs text-text-muted mt-0.5">{doc.subCategory}</p>
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-text-primary truncate block max-w-[150px]">
                        {getProjectName(doc.projectId)}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-1 text-text-primary">
                        <Calendar size={12} />
                        <span>{new Date(doc.uploadDate).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-text-muted mt-0.5">
                        <User size={10} />
                        <span>{doc.uploadedBy}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span className="text-text-primary font-mono text-sm">{doc.version}</span>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span
                        className="px-2 py-1 rounded-full text-xs font-medium"
                        style={{ backgroundColor: `${getStatusColor(doc.status)}20`, color: getStatusColor(doc.status) }}
                      >
                        {statusMap[doc.status]}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex flex-wrap gap-1">
                        {doc.tags.slice(0, 2).map((tag, i) => (
                          <span
                            key={i}
                            className="inline-flex items-center gap-0.5 px-1.5 py-0.5 bg-background-tertiary rounded text-xs text-text-muted"
                          >
                            <Tag size={10} />
                            {tag}
                          </span>
                        ))}
                        {doc.tags.length > 2 && (
                          <span className="text-xs text-text-muted">+{doc.tags.length - 2}</span>
                        )}
                      </div>
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
                            { id: 'edit', label: t('documents.editDetails'), onClick: () => {} },
                            { id: 'version', label: t('documents.versionHistory'), onClick: () => {} },
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
      </Card>

      {filteredDocuments.length === 0 && (
        <Card className="p-12 text-center">
          <FileText size={48} className="mx-auto text-text-muted mb-4" />
          <p className="text-text-secondary">{t('documents.noDocumentsFound')}</p>
        </Card>
      )}
    </div>
  );
};

export default Documents;
