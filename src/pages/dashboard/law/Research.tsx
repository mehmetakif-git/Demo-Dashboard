import { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import {
  BookOpen,
  Search,
  Plus,
  MoreVertical,
  Calendar,
  User,
  FileText,
  Scale,
  Link,
} from 'lucide-react';
import { PageHeader, Card, Button, Input, Dropdown } from '@/components/common';
import { legalResearch, LAW_COLOR } from '@/data/law/lawData';

export const Research = () => {
  const { t } = useTranslation('law');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredResearch = useMemo(() => {
    return legalResearch.filter(research => {
      return research.researchTopic.toLowerCase().includes(searchQuery.toLowerCase()) ||
        research.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (research.caseNo?.toLowerCase() || '').includes(searchQuery.toLowerCase());
    });
  }, [searchQuery]);

  return (
    <div className="space-y-6">
      <PageHeader
        title={t('research.title')}
        subtitle={t('research.subtitle')}
        icon={BookOpen}
        actions={
          <Button>
            <Plus size={18} />
            {t('research.newResearchEntry')}
          </Button>
        }
      />

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: t('research.totalResearch'), value: legalResearch.length, icon: BookOpen, color: LAW_COLOR },
          { label: t('research.casesCovered'), value: new Set(legalResearch.filter(r => r.caseId).map(r => r.caseId)).size, icon: FileText, color: '#3b82f6' },
          { label: t('research.lawsReferenced'), value: legalResearch.reduce((acc, r) => acc + r.relevantLaws.length, 0), icon: Scale, color: '#10b981' },
          { label: t('research.precedents'), value: legalResearch.reduce((acc, r) => acc + r.precedents.length, 0), icon: Link, color: '#8b5cf6' },
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

      {/* Search */}
      <Card className="p-4">
        <div className="relative">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
          <Input
            placeholder={t('research.searchPlaceholder')}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </Card>

      {/* Research Entries */}
      <div className="space-y-4">
        {filteredResearch.map((research, index) => (
          <motion.div
            key={research.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <Card className="p-4">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start gap-3">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: `${LAW_COLOR}20` }}
                  >
                    <BookOpen size={18} style={{ color: LAW_COLOR }} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-text-primary">{research.researchTopic}</h3>
                    {research.caseNo && (
                      <span className="font-mono text-xs text-text-muted">{t('research.caseLabel')} {research.caseNo}</span>
                    )}
                  </div>
                </div>
                <Dropdown
                  trigger={
                    <Button variant="ghost" size="sm">
                      <MoreVertical size={16} />
                    </Button>
                  }
                  items={[
                    { id: 'view', label: t('research.viewDetails'), onClick: () => {} },
                    { id: 'edit', label: t('research.edit'), onClick: () => {} },
                    { id: 'print', label: t('research.printMemo'), onClick: () => {} },
                    { id: 'delete', label: t('research.delete'), onClick: () => {} },
                  ]}
                />
              </div>

              <div className="mb-4">
                <p className="text-sm text-text-secondary">{research.summary}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                {/* Relevant Laws */}
                <div className="p-3 bg-background-tertiary rounded-lg">
                  <h4 className="text-xs font-medium text-text-muted mb-2 flex items-center gap-1">
                    <Scale size={12} />
                    {t('research.relevantLaws')} ({research.relevantLaws.length})
                  </h4>
                  <div className="space-y-1">
                    {research.relevantLaws.map((law, i) => (
                      <p key={i} className="text-sm text-text-secondary">{law}</p>
                    ))}
                  </div>
                </div>

                {/* Precedents */}
                <div className="p-3 bg-background-tertiary rounded-lg">
                  <h4 className="text-xs font-medium text-text-muted mb-2 flex items-center gap-1">
                    <Link size={12} />
                    {t('research.precedents')} ({research.precedents.length})
                  </h4>
                  <div className="space-y-1">
                    {research.precedents.map((precedent, i) => (
                      <p key={i} className="text-sm text-text-secondary">{precedent}</p>
                    ))}
                  </div>
                </div>
              </div>

              {research.notes && (
                <div className="p-3 bg-amber-500/10 rounded-lg border border-amber-500/20 mb-4">
                  <p className="text-xs text-amber-600 mb-1">{t('research.notes')}</p>
                  <p className="text-sm text-text-primary">{research.notes}</p>
                </div>
              )}

              <div className="flex items-center justify-between pt-3 border-t border-border-default">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 text-sm text-text-muted">
                    <User size={14} />
                    <span>{research.researchedBy}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-text-muted">
                    <Calendar size={14} />
                    <span>{research.researchDate}</span>
                  </div>
                </div>
                {research.documents.length > 0 && (
                  <div className="flex items-center gap-1 text-sm text-text-muted">
                    <FileText size={14} />
                    <span>{t('research.linkedDocs', { count: research.documents.length })}</span>
                  </div>
                )}
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {filteredResearch.length === 0 && (
        <Card className="p-12 text-center">
          <BookOpen size={48} className="mx-auto text-text-muted mb-4" />
          <p className="text-text-secondary">{t('research.noResearchFound')}</p>
        </Card>
      )}
    </div>
  );
};

export default Research;
