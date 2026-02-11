import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Trash2,
  Folder,
  FileText,
  FileSpreadsheet,
  File,
  RotateCcw,
  AlertTriangle,
  Clock,
  FolderOpen,
  Archive,
} from 'lucide-react';
import { PageHeader, Card, Button } from '@/components/common';
import { trashFiles, formatDate } from '@/data/fileData';
import { useTranslation } from 'react-i18next';

export const Trash = () => {
  const { t } = useTranslation('files');
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showEmptyConfirm, setShowEmptyConfirm] = useState(false);

  const getFileIcon = (type: string) => {
    const iconMap: Record<string, React.ReactNode> = {
      folder: <Folder size={20} className="text-[#547792]" />,
      document: <FileText size={20} className="text-blue-400" />,
      spreadsheet: <FileSpreadsheet size={20} className="text-green-400" />,
      pdf: <FileText size={20} className="text-red-400" />,
      archive: <Archive size={20} className="text-gray-400" />,
    };

    return iconMap[type] || <File size={20} className="text-gray-400" />;
  };

  const toggleSelection = (id: string) => {
    setSelectedItems(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const selectAll = () => {
    if (selectedItems.length === trashFiles.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(trashFiles.map(f => f.id));
    }
  };

  const getDaysColor = (days: number) => {
    if (days <= 7) return 'text-red-400';
    if (days <= 14) return 'text-orange-400';
    return 'text-text-muted';
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title={t('trash.title')}
        subtitle={t('trash.subtitle')}
        actions={
          <Button
            variant="secondary"
            leftIcon={<Trash2 size={16} />}
            onClick={() => setShowEmptyConfirm(true)}
            disabled={trashFiles.length === 0}
            className="text-red-400 hover:bg-red-500/10"
          >
            {t('trash.emptyTrash')}
          </Button>
        }
      />

      {/* Info Banner */}
      <Card className="p-4 border-l-4 border-yellow-500 bg-yellow-500/10">
        <div className="flex items-center gap-3">
          <AlertTriangle size={20} className="text-yellow-500" />
          <p className="text-sm text-text-primary">
            {t('trash.trashWarning')}
          </p>
        </div>
      </Card>

      {/* Bulk Actions */}
      {selectedItems.length > 0 && (
        <Card className="p-4">
          <div className="flex items-center gap-4">
            <span className="text-sm text-text-secondary">{t('trash.selected', { count: selectedItems.length })}</span>
            <button
              onClick={() => setSelectedItems([])}
              className="text-sm text-accent-primary hover:underline"
            >
              {t('trash.clearSelection')}
            </button>
            <div className="flex-1" />
            <Button variant="secondary" size="sm" leftIcon={<RotateCcw size={14} />}>
              {t('trash.restoreSelected')}
            </Button>
            <Button
              variant="secondary"
              size="sm"
              leftIcon={<Trash2 size={14} />}
              onClick={() => setShowDeleteConfirm(true)}
              className="text-red-400 hover:bg-red-500/10"
            >
              {t('trash.deletePermanently')}
            </Button>
          </div>
        </Card>
      )}

      {/* Trash Files List */}
      {trashFiles.length > 0 ? (
        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-white/[0.05] border-b border-white/[0.08]">
                  <th className="px-4 py-3 w-12">
                    <div
                      className={`w-5 h-5 rounded border-2 transition-all cursor-pointer ${
                        selectedItems.length === trashFiles.length
                          ? 'bg-accent-primary border-accent-primary'
                          : 'border-white/[0.08]'
                      }`}
                      onClick={selectAll}
                    >
                      {selectedItems.length === trashFiles.length && (
                        <svg className="w-full h-full text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      )}
                    </div>
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider">
                    {t('trash.name')}
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider">
                    {t('trash.originalLocation')}
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider">
                    {t('trash.deleted')}
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider">
                    {t('trash.size')}
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider">
                    {t('trash.daysLeft')}
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider">
                    {t('trash.actions')}
                  </th>
                </tr>
              </thead>
              <tbody>
                {trashFiles.map((file) => (
                  <motion.tr
                    key={file.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className={`border-b border-white/[0.08] hover:bg-white/[0.05] ${
                      selectedItems.includes(file.id) ? 'bg-accent-primary/10' : ''
                    }`}
                  >
                    <td className="px-4 py-3">
                      <div
                        className={`w-5 h-5 rounded border-2 transition-all cursor-pointer ${
                          selectedItems.includes(file.id)
                            ? 'bg-accent-primary border-accent-primary'
                            : 'border-white/[0.08]'
                        }`}
                        onClick={() => toggleSelection(file.id)}
                      >
                        {selectedItems.includes(file.id) && (
                          <svg className="w-full h-full text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        {getFileIcon(file.type)}
                        <div>
                          <span className="font-medium text-text-primary">{file.name}</span>
                          {file.itemCount && (
                            <span className="text-sm text-text-muted ml-2">({file.itemCount} {t('trash.items')})</span>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2 text-sm text-text-secondary">
                        <FolderOpen size={14} className="text-text-muted" />
                        {file.originalLocation}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-text-secondary">
                      {formatDate(file.deletedAt)}
                    </td>
                    <td className="px-4 py-3 text-sm text-text-secondary">
                      {file.size}
                    </td>
                    <td className="px-4 py-3">
                      <div className={`flex items-center gap-1 text-sm ${getDaysColor(file.daysUntilPermanent)}`}>
                        <Clock size={14} />
                        {file.daysUntilPermanent} {t('trash.days')}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1">
                        <button className="p-1.5 hover:bg-white/[0.03] backdrop-blur-xl rounded text-text-secondary hover:text-green-400">
                          <RotateCcw size={14} />
                        </button>
                        <button className="p-1.5 hover:bg-white/[0.03] backdrop-blur-xl rounded text-text-secondary hover:text-red-400">
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
      ) : (
        <Card className="p-12 text-center">
          <Trash2 size={48} className="mx-auto mb-4 text-text-muted" />
          <p className="text-text-secondary">{t('trash.trashEmpty')}</p>
        </Card>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white/[0.03] backdrop-blur-xl rounded-xl max-w-md w-full p-6"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-red-500/20 rounded-full">
                <AlertTriangle size={24} className="text-red-500" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-text-primary">{t('trash.deletePermanentlyTitle')}</h3>
                <p className="text-sm text-text-secondary">
                  {t('trash.deletePermanentlyDescription', { count: selectedItems.length })}
                </p>
              </div>
            </div>
            <p className="text-text-secondary mb-6">
              {t('trash.deletePermanentlyWarning')}
            </p>
            <div className="flex items-center justify-end gap-3">
              <Button variant="secondary" onClick={() => setShowDeleteConfirm(false)}>
                {t('trash.cancel')}
              </Button>
              <Button
                variant="secondary"
                onClick={() => {
                  setShowDeleteConfirm(false);
                  setSelectedItems([]);
                }}
                className="text-red-400 hover:bg-red-500/10"
              >
                {t('trash.deletePermanently')}
              </Button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Empty Trash Confirmation Modal */}
      {showEmptyConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white/[0.03] backdrop-blur-xl rounded-xl max-w-md w-full p-6"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-red-500/20 rounded-full">
                <Trash2 size={24} className="text-red-500" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-text-primary">{t('trash.emptyTrashTitle')}</h3>
                <p className="text-sm text-text-secondary">
                  {t('trash.emptyTrashDescription', { count: trashFiles.length })}
                </p>
              </div>
            </div>
            <p className="text-text-secondary mb-6">
              {t('trash.emptyTrashWarning')}
            </p>
            <div className="flex items-center justify-end gap-3">
              <Button variant="secondary" onClick={() => setShowEmptyConfirm(false)}>
                {t('trash.cancel')}
              </Button>
              <Button
                variant="secondary"
                onClick={() => {
                  setShowEmptyConfirm(false);
                }}
                className="text-red-400 hover:bg-red-500/10"
              >
                {t('trash.emptyTrash')}
              </Button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};
