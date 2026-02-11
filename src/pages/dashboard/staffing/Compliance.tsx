import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  Search,
  FileCheck,
  AlertTriangle,
  CheckCircle,
  Clock,
  XCircle,
  Upload,
  Eye,
} from 'lucide-react';
import { PageHeader, Card, StatsCard, Button } from '@/components/common';
import {
  complianceDocuments,
  getComplianceStatusBgColor,
  type ComplianceDocument,
} from '@/data/staffing/staffingData';
import { getProfileImage } from '@/utils/profileImages';
import { useTranslation } from 'react-i18next';

export const Compliance = () => {
  const { t } = useTranslation('staffing');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [selectedDoc, setSelectedDoc] = useState<ComplianceDocument | null>(null);

  // Get unique document types
  const documentTypes = useMemo(() => {
    const types = new Set(complianceDocuments.map((d) => d.type));
    return Array.from(types);
  }, []);

  // Filter documents
  const filteredDocs = useMemo(() => {
    return complianceDocuments.filter((doc) => {
      const matchesSearch =
        searchQuery === '' ||
        doc.candidateName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doc.type.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = statusFilter === 'all' || doc.status === statusFilter;
      const matchesType = typeFilter === 'all' || doc.type === typeFilter;
      return matchesSearch && matchesStatus && matchesType;
    });
  }, [searchQuery, statusFilter, typeFilter]);

  // Calculate stats
  const pendingDocs = complianceDocuments.filter((d) => d.status === 'pending').length;
  const expiredDocs = complianceDocuments.filter((d) => d.status === 'expired').length;
  const inProgressDocs = complianceDocuments.filter((d) => d.status === 'in-progress').length;
  const completedDocs = complianceDocuments.filter((d) => d.status === 'completed').length;

  const stats = [
    {
      title: t('compliance.pending'),
      value: pendingDocs.toString(),
      icon: Clock,
      iconColor: '#f59e0b',
    },
    {
      title: t('compliance.inProgress'),
      value: inProgressDocs.toString(),
      icon: FileCheck,
      iconColor: '#3b82f6',
    },
    {
      title: t('compliance.completed'),
      value: completedDocs.toString(),
      icon: CheckCircle,
      iconColor: '#10b981',
    },
    {
      title: t('compliance.expiredFailed'),
      value: expiredDocs.toString(),
      icon: AlertTriangle,
      iconColor: '#ef4444',
    },
  ];

  const getStatusIcon = (status: ComplianceDocument['status']) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-400" />;
      case 'in-progress':
        return <Clock className="h-4 w-4 text-blue-400" />;
      case 'pending':
        return <Clock className="h-4 w-4 text-amber-400" />;
      case 'expired':
      case 'failed':
        return <XCircle className="h-4 w-4 text-red-400" />;
      default:
        return null;
    }
  };

  const formatDocType = (type: string) => {
    return type
      .split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <PageHeader
        title={t('compliance.title')}
        subtitle={t('compliance.subtitle')}
        actions={
          <Button onClick={() => console.log('Add document')}>
            <Upload className="h-4 w-4 mr-2" />
            {t('compliance.uploadDocument')}
          </Button>
        }
      />

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <StatsCard
            key={stat.title}
            title={stat.title}
            value={stat.value}
            icon={stat.icon}
            iconColor={stat.iconColor}
          />
        ))}
      </div>

      {/* Alerts */}
      {(expiredDocs > 0 || pendingDocs > 0) && (
        <Card className="p-4 border-amber-500/30 bg-amber-500/5">
          <div className="flex items-center gap-3">
            <AlertTriangle className="h-5 w-5 text-amber-400" />
            <div>
              <p className="font-medium text-text-primary">{t('compliance.actionRequired')}</p>
              <p className="text-sm text-text-secondary">
                {expiredDocs > 0 && t('compliance.expiredNeedRenewal', { count: expiredDocs })}
                {pendingDocs > 0 && t('compliance.pendingSubmission', { count: pendingDocs })}
              </p>
            </div>
          </div>
        </Card>
      )}

      {/* Filters */}
      <Card className="p-4">
        <div className="flex flex-wrap gap-4">
          <div className="relative flex-1 min-w-[200px] max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-muted" />
            <input
              type="text"
              placeholder={t('compliance.searchDocuments')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white/[0.05] border border-white/[0.08] rounded-lg text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent-primary"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 bg-white/[0.05] border border-white/[0.08] rounded-lg text-text-primary focus:outline-none focus:border-accent-primary"
          >
            <option value="all">{t('compliance.allStatuses')}</option>
            <option value="pending">{t('compliance.pending')}</option>
            <option value="in-progress">{t('compliance.inProgress')}</option>
            <option value="completed">{t('compliance.completed')}</option>
            <option value="expired">{t('compliance.expired')}</option>
            <option value="failed">{t('compliance.failed')}</option>
          </select>

          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="px-3 py-2 bg-white/[0.05] border border-white/[0.08] rounded-lg text-text-primary focus:outline-none focus:border-accent-primary"
          >
            <option value="all">{t('compliance.allTypes')}</option>
            {documentTypes.map((type) => (
              <option key={type} value={type}>
                {formatDocType(type)}
              </option>
            ))}
          </select>
        </div>
      </Card>

      {/* Documents Table */}
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/[0.08]">
                <th className="text-left py-3 px-4 text-xs font-semibold text-text-secondary uppercase">
                  {t('compliance.candidate')}
                </th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-text-secondary uppercase">
                  {t('compliance.documentType')}
                </th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-text-secondary uppercase">
                  {t('compliance.status')}
                </th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-text-secondary uppercase">
                  {t('compliance.requiredBy')}
                </th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-text-secondary uppercase">
                  {t('compliance.expires')}
                </th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-text-secondary uppercase">
                  {t('compliance.actions')}
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredDocs.map((doc) => (
                <tr
                  key={doc.id}
                  className="border-b border-white/[0.08] hover:bg-white/[0.03] backdrop-blur-xl/50"
                >
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      {getProfileImage(doc.candidateName) ? (
                        <img
                          src={getProfileImage(doc.candidateName)}
                          alt={doc.candidateName}
                          className="w-10 h-10 rounded-full object-cover border border-white/10"
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-accent-primary to-accent-secondary flex items-center justify-center text-white text-sm font-bold">
                          {doc.candidateName
                            .split(' ')
                            .map((n) => n[0])
                            .join('')}
                        </div>
                      )}
                      <p className="font-medium text-text-primary">{doc.candidateName}</p>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-1 rounded-full text-xs font-medium bg-white/[0.05] text-text-primary">
                      {formatDocType(doc.type)}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(doc.status)}
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium border ${getComplianceStatusBgColor(
                          doc.status
                        )}`}
                      >
                        {doc.status.charAt(0).toUpperCase() + doc.status.slice(1).replace('-', ' ')}
                      </span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-text-secondary">
                    {doc.requiredBy ? new Date(doc.requiredBy).toLocaleDateString() : '-'}
                  </td>
                  <td className="py-3 px-4">
                    {doc.expiresAt ? (
                      <span
                        className={`text-sm ${
                          new Date(doc.expiresAt) < new Date() ? 'text-red-400' : 'text-text-secondary'
                        }`}
                      >
                        {new Date(doc.expiresAt).toLocaleDateString()}
                      </span>
                    ) : (
                      <span className="text-text-muted">-</span>
                    )}
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm" onClick={() => setSelectedDoc(doc)}>
                        <Eye className="h-4 w-4" />
                      </Button>
                      {doc.documentUrl && (
                        <Button variant="ghost" size="sm" onClick={() => console.log('Download', doc.id)}>
                          {t('compliance.view')}
                        </Button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {filteredDocs.length === 0 && (
        <Card className="p-12 text-center">
          <FileCheck className="h-12 w-12 text-text-muted mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-text-primary mb-2">{t('compliance.noDocumentsFound')}</h3>
          <p className="text-text-secondary">{t('compliance.tryAdjusting')}</p>
        </Card>
      )}

      {/* Document Detail Modal */}
      {selectedDoc && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] rounded-xl max-w-lg w-full"
          >
            <div className="p-6 border-b border-white/[0.08]">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-xl font-bold text-text-primary">{formatDocType(selectedDoc.type)}</h2>
                  <p className="text-text-secondary">{selectedDoc.candidateName}</p>
                </div>
                <button
                  onClick={() => setSelectedDoc(null)}
                  className="text-text-secondary hover:text-text-primary cursor-pointer"
                >
                  ×
                </button>
              </div>
            </div>

            <div className="p-6 space-y-4">
              <div className="flex items-center gap-2">
                {getStatusIcon(selectedDoc.status)}
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium border ${getComplianceStatusBgColor(
                    selectedDoc.status
                  )}`}
                >
                  {selectedDoc.status.charAt(0).toUpperCase() + selectedDoc.status.slice(1).replace('-', ' ')}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {selectedDoc.requiredBy && (
                  <div>
                    <p className="text-sm text-text-muted">{t('compliance.requiredBy')}</p>
                    <p className="text-text-primary">{new Date(selectedDoc.requiredBy).toLocaleDateString()}</p>
                  </div>
                )}
                {selectedDoc.completedAt && (
                  <div>
                    <p className="text-sm text-text-muted">{t('compliance.completedDate')}</p>
                    <p className="text-text-primary">{new Date(selectedDoc.completedAt).toLocaleDateString()}</p>
                  </div>
                )}
                {selectedDoc.expiresAt && (
                  <div>
                    <p className="text-sm text-text-muted">{t('compliance.expires')}</p>
                    <p
                      className={
                        new Date(selectedDoc.expiresAt) < new Date() ? 'text-red-400' : 'text-text-primary'
                      }
                    >
                      {new Date(selectedDoc.expiresAt).toLocaleDateString()}
                    </p>
                  </div>
                )}
              </div>

              {selectedDoc.notes && (
                <div>
                  <p className="text-sm text-text-muted mb-1">{t('compliance.notes')}</p>
                  <p className="text-text-secondary">{selectedDoc.notes}</p>
                </div>
              )}
            </div>

            <div className="p-6 border-t border-white/[0.08] flex gap-2">
              <Button variant="outline" className="flex-1" onClick={() => setSelectedDoc(null)}>
                {t('compliance.close')}
              </Button>
              {selectedDoc.documentUrl && (
                <Button className="flex-1" onClick={() => console.log('View document')}>
                  {t('compliance.viewDocument')}
                </Button>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
};
