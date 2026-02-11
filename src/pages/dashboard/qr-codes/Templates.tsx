import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Plus,
  Search,
  QrCode,
  Edit,
  Trash2,
  Copy,
  Star,
  StarOff,
  LayoutGrid,
  List,
} from 'lucide-react';
import { PageHeader, Card, StatsCard, Input, Button } from '@/components/common';
import {
  qrTemplates,
  qrCodeTypes,
  getTypeColor,
  getTypeLabel,
  type QRTemplate,
} from '@/data/qrCodeData';
import { useTranslation } from 'react-i18next';

export const Templates = () => {
  const { t } = useTranslation('qrCodes');
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [showFavorites, setShowFavorites] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Add mock favorite state
  const [favorites, setFavorites] = useState<Set<string>>(new Set(['template-1', 'template-3']));

  const stats = useMemo(() => ({
    total: qrTemplates.length,
    favorites: favorites.size,
    custom: qrTemplates.filter(tp => !tp.isDefault).length,
    default: qrTemplates.filter(tp => tp.isDefault).length,
  }), [favorites]);

  const filteredTemplates = useMemo(() => {
    let filtered = [...qrTemplates];

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        tp =>
          tp.name.toLowerCase().includes(query) ||
          tp.type.toLowerCase().includes(query)
      );
    }

    if (selectedType !== 'all') {
      filtered = filtered.filter(tp => tp.type === selectedType);
    }

    if (showFavorites) {
      filtered = filtered.filter(tp => favorites.has(tp.id));
    }

    return filtered;
  }, [searchQuery, selectedType, showFavorites, favorites]);

  const toggleFavorite = (id: string) => {
    setFavorites(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const handleUseTemplate = (template: QRTemplate) => {
    navigate('/dashboard/qr-codes/create', { state: { template } });
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title={t('templates.title')}
        subtitle={t('templates.subtitle')}
        actions={
          <Button leftIcon={<Plus size={16} />}>
            {t('templates.createTemplate')}
          </Button>
        }
      />

      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title={t('templates.totalTemplates')}
          value={stats.total.toString()}
          icon={QrCode}
          iconColor="#547792"
        />
        <StatsCard
          title={t('templates.favoriteTemplates')}
          value={stats.favorites.toString()}
          icon={Star}
          iconColor="#f59e0b"
        />
        <StatsCard
          title={t('templates.customTemplates')}
          value={stats.custom.toString()}
          icon={Edit}
          iconColor="#10b981"
        />
        <StatsCard
          title={t('templates.defaultTemplates')}
          value={stats.default.toString()}
          icon={QrCode}
          iconColor="#94B4C1"
        />
      </div>

      {/* Filter Bar */}
      <Card className="p-4">
        <div className="flex flex-wrap gap-4 items-center justify-between">
          <div className="flex flex-wrap gap-4 items-center flex-1">
            <div className="flex-1 min-w-50 max-w-md">
              <Input
                placeholder={t('templates.searchPlaceholder')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                leftIcon={<Search size={16} />}
              />
            </div>

            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="px-3 py-2 bg-white/[0.05] border border-white/[0.08] rounded-lg text-sm text-text-primary focus:outline-none focus:border-accent-primary"
            >
              <option value="all">{t('templates.allTypes')}</option>
              {qrCodeTypes.map(type => (
                <option key={type.id} value={type.id}>{type.label}</option>
              ))}
            </select>

            <button
              onClick={() => setShowFavorites(!showFavorites)}
              className={`px-3 py-2 rounded-lg flex items-center gap-2 transition-all ${
                showFavorites
                  ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
                  : 'bg-white/[0.05] border border-white/[0.08] text-text-secondary hover:text-text-primary'
              }`}
            >
              <Star size={16} className={showFavorites ? 'fill-yellow-400' : ''} />
              <span className="text-sm">{t('templates.favorites')}</span>
            </button>
          </div>

          {/* View Toggle */}
          <div className="flex gap-1 p-1 bg-white/[0.03] backdrop-blur-xl rounded-lg">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded transition-all ${
                viewMode === 'grid'
                  ? 'bg-accent-primary text-white'
                  : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              <LayoutGrid size={16} />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded transition-all ${
                viewMode === 'list'
                  ? 'bg-accent-primary text-white'
                  : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              <List size={16} />
            </button>
          </div>
        </div>
      </Card>

      {/* Templates Grid/List */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredTemplates.map((template, index) => {
            const isFavorite = favorites.has(template.id);
            const typeColor = getTypeColor(template.type as any);

            return (
              <motion.div
                key={template.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card className="p-5 hover:shadow-lg transition-all group">
                  {/* Type Indicator */}
                  <div
                    className="absolute top-0 left-0 right-0 h-1 rounded-t-lg"
                    style={{ backgroundColor: typeColor }}
                  />

                  <div className="pt-1">
                    {/* Favorite Button */}
                    <button
                      onClick={() => toggleFavorite(template.id)}
                      className="absolute top-3 right-3 p-1 hover:bg-white/[0.05] rounded transition-colors"
                    >
                      {isFavorite ? (
                        <Star size={18} className="text-yellow-400 fill-yellow-400" />
                      ) : (
                        <StarOff size={18} className="text-text-muted hover:text-yellow-400" />
                      )}
                    </button>

                    {/* QR Code Preview */}
                    <div className="flex justify-center mb-4">
                      <div
                        className="w-24 h-24 rounded-lg flex items-center justify-center"
                        style={{
                          backgroundColor: template.style.backgroundColor,
                          border: `2px solid ${template.style.foregroundColor}`,
                        }}
                      >
                        <QrCode size={48} style={{ color: template.style.foregroundColor }} />
                      </div>
                    </div>

                    {/* Template Info */}
                    <div className="text-center mb-3">
                      <h3 className="font-semibold text-text-primary">{template.name}</h3>
                      <span
                        className="inline-block px-2 py-0.5 rounded text-xs font-medium mt-1"
                        style={{ backgroundColor: `${typeColor}20`, color: typeColor }}
                      >
                        {getTypeLabel(template.type as any)}
                      </span>
                    </div>

                    {/* Default Badge */}
                    {template.isDefault && (
                      <div className="flex justify-center mb-3">
                        <span className="px-2 py-0.5 bg-blue-500/20 text-blue-400 rounded text-xs font-medium">
                          {t('templates.defaultTemplate')}
                        </span>
                      </div>
                    )}

                    {/* Style Preview */}
                    <div className="flex items-center justify-center gap-2 mb-4">
                      <div className="flex items-center gap-1">
                        <div
                          className="w-4 h-4 rounded border border-white/[0.08]"
                          style={{ backgroundColor: template.style.foregroundColor }}
                        />
                        <div
                          className="w-4 h-4 rounded border border-white/[0.08]"
                          style={{ backgroundColor: template.style.backgroundColor }}
                        />
                      </div>
                      <span className="text-xs text-text-muted capitalize">{template.style.cornerStyle}</span>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2 pt-3 border-t border-white/[0.08]">
                      <Button
                        variant="primary"
                        size="sm"
                        className="flex-1"
                        onClick={() => handleUseTemplate(template)}
                      >
                        {t('templates.useTemplate')}
                      </Button>
                      <button className="p-2 hover:bg-white/[0.05] rounded text-text-secondary hover:text-blue-400">
                        <Edit size={16} />
                      </button>
                      <button className="p-2 hover:bg-white/[0.05] rounded text-text-secondary hover:text-green-400">
                        <Copy size={16} />
                      </button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>
      ) : (
        /* List View */
        <Card>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/[0.08]">
                  <th className="text-left py-3 px-4 text-sm font-medium text-text-secondary">{t('templates.template')}</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-text-secondary">{t('templates.type')}</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-text-secondary">{t('templates.style')}</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-text-secondary">{t('templates.frame')}</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-text-secondary">{t('templates.default')}</th>
                  <th className="text-right py-3 px-4 text-sm font-medium text-text-secondary">{t('templates.actions')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-default">
                {filteredTemplates.map((template, index) => {
                  const isFavorite = favorites.has(template.id);
                  const typeColor = getTypeColor(template.type as any);

                  return (
                    <motion.tr
                      key={template.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: index * 0.03 }}
                      className="hover:bg-white/[0.05] transition-colors"
                    >
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => toggleFavorite(template.id)}
                            className="p-1 hover:bg-white/[0.03] backdrop-blur-xl rounded"
                          >
                            {isFavorite ? (
                              <Star size={16} className="text-yellow-400 fill-yellow-400" />
                            ) : (
                              <StarOff size={16} className="text-text-muted" />
                            )}
                          </button>
                          <div
                            className="w-10 h-10 rounded-lg flex items-center justify-center"
                            style={{
                              backgroundColor: template.style.backgroundColor,
                              border: `1px solid ${template.style.foregroundColor}`,
                            }}
                          >
                            <QrCode size={18} style={{ color: template.style.foregroundColor }} />
                          </div>
                          <span className="font-medium text-text-primary">{template.name}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <span
                          className="px-2 py-0.5 rounded text-xs font-medium"
                          style={{ backgroundColor: `${typeColor}20`, color: typeColor }}
                        >
                          {getTypeLabel(template.type as any)}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <div
                            className="w-5 h-5 rounded border border-white/[0.08]"
                            style={{ backgroundColor: template.style.foregroundColor }}
                          />
                          <div
                            className="w-5 h-5 rounded border border-white/[0.08]"
                            style={{ backgroundColor: template.style.backgroundColor }}
                          />
                          <span className="text-xs text-text-muted capitalize">{template.style.cornerStyle}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-sm text-text-secondary capitalize">{template.style.frame}</td>
                      <td className="py-3 px-4">
                        {template.isDefault && (
                          <span className="px-2 py-0.5 bg-blue-500/20 text-blue-400 rounded text-xs font-medium">
                            Yes
                          </span>
                        )}
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center justify-end gap-1">
                          <Button size="sm" onClick={() => handleUseTemplate(template)}>
                            {t('templates.use')}
                          </Button>
                          <button className="p-2 hover:bg-white/[0.03] backdrop-blur-xl rounded text-text-secondary hover:text-blue-400">
                            <Edit size={14} />
                          </button>
                          <button className="p-2 hover:bg-white/[0.03] backdrop-blur-xl rounded text-text-secondary hover:text-green-400">
                            <Copy size={14} />
                          </button>
                          <button className="p-2 hover:bg-white/[0.03] backdrop-blur-xl rounded text-text-secondary hover:text-red-400">
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {filteredTemplates.length === 0 && (
        <Card className="p-12 text-center">
          <QrCode size={48} className="mx-auto mb-4 text-text-muted" />
          <p className="text-text-secondary">{t('templates.noTemplatesFound')}</p>
          <Button className="mt-4" leftIcon={<Plus size={16} />}>
            {t('templates.createFirstTemplate')}
          </Button>
        </Card>
      )}
    </div>
  );
};
