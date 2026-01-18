import { useState, useMemo } from 'react';
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
        title="Document Management"
        subtitle="Manage legal documents and files"
        icon={FileText}
        actions={
          <Button>
            <Plus size={18} />
            Upload Document
          </Button>
        }
      />

      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Documents', value: stats.totalDocs, icon: FileText, color: LAW_COLOR },
          { label: 'Filed', value: stats.filedDocs, icon: Folder, color: '#10b981' },
          { label: 'Reviewed', value: stats.reviewedDocs, icon: Eye, color: '#3b82f6' },
          { label: 'Recent Uploads', value: stats.recentUploads, icon: Calendar, color: '#f59e0b' },
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
              placeholder="Search documents..."
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
                {type === 'all' ? 'All Types' : type}
              </Button>
            ))}
          </div>
        </div>
        <div className="flex gap-2 mt-3 flex-wrap">
          <span className="text-sm text-text-muted mr-2">Status:</span>
          {['all', 'draft', 'reviewed', 'filed', 'sent'].map((status) => (
            <Button
              key={status}
              variant={statusFilter === status ? 'primary' : 'ghost'}
              size="sm"
              onClick={() => setStatusFilter(status)}
            >
              {status === 'all' ? 'All' : status.charAt(0).toUpperCase() + status.slice(1)}
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
                <th className="text-left py-3 px-4 text-sm font-medium text-text-muted">Document</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-text-muted">Case No</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-text-muted">Type</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-text-muted">Uploaded By</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-text-muted">Date</th>
                <th className="text-center py-3 px-4 text-sm font-medium text-text-muted">Size</th>
                <th className="text-center py-3 px-4 text-sm font-medium text-text-muted">Status</th>
                <th className="text-center py-3 px-4 text-sm font-medium text-text-muted">Actions</th>
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
                        className="inline-flex px-2 py-1 rounded-full text-xs font-medium capitalize"
                        style={{ backgroundColor: `${getStatusColor(doc.status)}20`, color: getStatusColor(doc.status) }}
                      >
                        {doc.status}
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
                            { id: 'edit', label: 'Edit', onClick: () => {} },
                            { id: 'delete', label: 'Delete', onClick: () => {} },
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
              <span className="text-xs text-text-muted">Popular tags:</span>
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
            <p>No documents found</p>
          </div>
        )}
      </Card>
    </div>
  );
};

export default Documents;
