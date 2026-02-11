import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  Plus,
  Search,
  Pin,
  Calendar,
  Users,
  Paperclip,
  Eye,
  Edit,
  Trash2,
  Download,
  X,
  Megaphone,
} from 'lucide-react';
import { PageHeader, Card, Input, Button } from '@/components/common';
import { announcements, getPriorityColor, type Announcement } from '@/data/communicationData';
import { getProfileImage } from '@/utils/profileImages';
import { useTranslation } from 'react-i18next';

export const Announcements = () => {
  const { t, i18n } = useTranslation('communication');
  const locale = i18n.language === 'tr' ? 'tr-TR' : 'en-US';
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPriority, setSelectedPriority] = useState<string>('all');
  const [selectedAnnouncement, setSelectedAnnouncement] = useState<Announcement | null>(null);

  const pinnedAnnouncements = useMemo(() => {
    return announcements.filter(a => a.pinned);
  }, []);

  const filteredAnnouncements = useMemo(() => {
    let filtered = announcements.filter(a => !a.pinned);

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        a =>
          a.title.toLowerCase().includes(query) ||
          a.content.toLowerCase().includes(query) ||
          a.author.toLowerCase().includes(query)
      );
    }

    if (selectedPriority !== 'all') {
      filtered = filtered.filter(a => a.priority === selectedPriority);
    }

    return filtered.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
  }, [searchQuery, selectedPriority]);

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString(locale, { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const formatTime = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleTimeString(locale, { hour: '2-digit', minute: '2-digit' });
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const getPriorityBadge = (priority: Announcement['priority']) => {
    const config = {
      high: { bg: 'bg-red-500/20', text: 'text-red-400', label: t('announcements.highPriority') },
      normal: { bg: 'bg-blue-500/20', text: 'text-blue-400', label: t('announcements.normal') },
      low: { bg: 'bg-gray-500/20', text: 'text-gray-400', label: t('announcements.lowPriority') },
    };
    const c = config[priority];
    return (
      <span className={`px-2 py-0.5 rounded text-xs font-medium ${c.bg} ${c.text}`}>
        {c.label}
      </span>
    );
  };

  const isExpiringSoon = (expiryDate: string) => {
    const expiry = new Date(expiryDate);
    const now = new Date();
    const diffDays = Math.ceil((expiry.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    return diffDays > 0 && diffDays <= 7;
  };

  const AnnouncementCard = ({ announcement, isPinned = false }: { announcement: Announcement; isPinned?: boolean }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <Card
        className={`p-5 hover:shadow-lg transition-all cursor-pointer group relative overflow-hidden ${
          isPinned ? 'border-accent-primary/30' : ''
        }`}
        onClick={() => setSelectedAnnouncement(announcement)}
      >
        {/* Priority Border */}
        <div
          className="absolute left-0 top-0 bottom-0 w-1"
          style={{ backgroundColor: getPriorityColor(announcement.priority) }}
        />

        <div className="pl-3">
          {/* Header */}
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                {isPinned && <Pin size={14} className="text-accent-primary" />}
                <h3 className="font-semibold text-text-primary text-lg">{t(`data.announcements.${announcement.id}.title`, { defaultValue: announcement.title })}</h3>
              </div>
              <div className="flex items-center gap-3">
                {getPriorityBadge(announcement.priority)}
                {announcement.targetAudience !== 'all' && (
                  <span className="px-2 py-0.5 rounded text-xs font-medium bg-[#94B4C1]/20 text-[#94B4C1] capitalize">
                    {announcement.targetAudience}
                  </span>
                )}
                {isExpiringSoon(announcement.expiresAt) && (
                  <span className="px-2 py-0.5 rounded text-xs font-medium bg-orange-500/20 text-orange-400">
                    {t('announcements.expiresSoon')}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Author */}
          <div className="flex items-center gap-3 mb-3">
            {(() => {
              const profileImg = getProfileImage(announcement.author);
              if (profileImg) {
                return (
                  <img
                    src={profileImg}
                    alt={announcement.author}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                );
              }
              return (
                <div className="w-8 h-8 rounded-full bg-accent-primary/20 flex items-center justify-center">
                  <span className="text-xs font-bold text-accent-primary">
                    {getInitials(announcement.author)}
                  </span>
                </div>
              );
            })()}
            <div>
              <p className="text-sm font-medium text-text-primary">{announcement.author}</p>
              <p className="text-xs text-text-secondary">{t(`data.positions.${announcement.authorRole}`, { defaultValue: announcement.authorRole })}</p>
            </div>
          </div>

          {/* Content Preview */}
          <p className="text-sm text-text-secondary line-clamp-2 mb-4">
            {t(`data.announcements.${announcement.id}.content`, { defaultValue: announcement.content })}
          </p>

          {/* Footer */}
          <div className="flex items-center justify-between pt-3 border-t border-white/[0.08]">
            <div className="flex items-center gap-4 text-xs text-text-muted">
              <span className="flex items-center gap-1">
                <Calendar size={12} />
                {formatDate(announcement.publishedAt)}
              </span>
              <span className="flex items-center gap-1">
                <Eye size={12} />
                {t('announcements.readCount', { read: announcement.readCount, total: announcement.totalRecipients })}
              </span>
              {announcement.attachments.length > 0 && (
                <span className="flex items-center gap-1">
                  <Paperclip size={12} />
                  {t('announcements.files', { count: announcement.attachments.length })}
                </span>
              )}
            </div>
            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                onClick={(e) => { e.stopPropagation(); }}
                className="p-1.5 hover:bg-white/[0.05] rounded text-text-secondary hover:text-accent-primary"
              >
                <Edit size={14} />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); }}
                className="p-1.5 hover:bg-white/[0.05] rounded text-text-secondary hover:text-red-400"
              >
                <Trash2 size={14} />
              </button>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );

  return (
    <div className="space-y-6">
      <PageHeader
        title={t('announcements.title')}
        subtitle={t('announcements.subtitle')}
        actions={
          <Button leftIcon={<Plus size={16} />}>
            {t('announcements.createAnnouncement')}
          </Button>
        }
      />

      {/* Filter Bar */}
      <Card className="p-4">
        <div className="flex flex-wrap gap-4 items-center">
          <div className="flex-1 min-w-50 max-w-md">
            <Input
              placeholder={t('announcements.searchAnnouncements')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              leftIcon={<Search size={16} />}
            />
          </div>

          <select
            value={selectedPriority}
            onChange={(e) => setSelectedPriority(e.target.value)}
            className="px-3 py-2 bg-white/[0.05] border border-white/[0.08] rounded-lg text-sm text-text-primary focus:outline-none focus:border-accent-primary"
          >
            <option value="all">{t('announcements.allPriorities')}</option>
            <option value="high">{t('announcements.highPriority')}</option>
            <option value="normal">{t('announcements.normal')}</option>
            <option value="low">{t('announcements.lowPriority')}</option>
          </select>
        </div>
      </Card>

      {/* Pinned Announcements */}
      {pinnedAnnouncements.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Pin size={16} className="text-accent-primary" />
            <h2 className="font-semibold text-text-primary">{t('announcements.pinnedAnnouncements')}</h2>
          </div>
          <div className="grid gap-4">
            {pinnedAnnouncements.map(announcement => (
              <AnnouncementCard key={announcement.id} announcement={announcement} isPinned />
            ))}
          </div>
        </div>
      )}

      {/* All Announcements */}
      <div className="space-y-4">
        <h2 className="font-semibold text-text-primary">{t('announcements.recentAnnouncements')}</h2>
        <div className="grid gap-4">
          {filteredAnnouncements.map(announcement => (
            <AnnouncementCard key={announcement.id} announcement={announcement} />
          ))}
        </div>
      </div>

      {filteredAnnouncements.length === 0 && pinnedAnnouncements.length === 0 && (
        <Card className="p-12 text-center">
          <Megaphone size={48} className="mx-auto mb-4 text-text-muted" />
          <p className="text-text-secondary">{t('announcements.noAnnouncements')}</p>
        </Card>
      )}

      {/* Announcement Detail Modal */}
      {selectedAnnouncement && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white/[0.03] backdrop-blur-xl rounded-xl max-w-2xl w-full max-h-[90vh] overflow-hidden"
          >
            {/* Modal Header */}
            <div className="p-6 border-b border-white/[0.08]">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    {selectedAnnouncement.pinned && <Pin size={16} className="text-accent-primary" />}
                    {getPriorityBadge(selectedAnnouncement.priority)}
                  </div>
                  <h2 className="text-xl font-bold text-text-primary">{t(`data.announcements.${selectedAnnouncement.id}.title`, { defaultValue: selectedAnnouncement.title })}</h2>
                </div>
                <button
                  onClick={() => setSelectedAnnouncement(null)}
                  className="p-2 hover:bg-white/[0.05] rounded-lg"
                >
                  <X size={20} className="text-text-secondary" />
                </button>
              </div>

              {/* Author */}
              <div className="flex items-center gap-3 mt-4">
                {(() => {
                  const profileImg = getProfileImage(selectedAnnouncement.author);
                  if (profileImg) {
                    return (
                      <img
                        src={profileImg}
                        alt={selectedAnnouncement.author}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                    );
                  }
                  return (
                    <div className="w-10 h-10 rounded-full bg-accent-primary/20 flex items-center justify-center">
                      <span className="text-sm font-bold text-accent-primary">
                        {getInitials(selectedAnnouncement.author)}
                      </span>
                    </div>
                  );
                })()}
                <div>
                  <p className="font-medium text-text-primary">{selectedAnnouncement.author}</p>
                  <p className="text-sm text-text-secondary">{t(`data.positions.${selectedAnnouncement.authorRole}`, { defaultValue: selectedAnnouncement.authorRole })}</p>
                </div>
                <span className="text-sm text-text-muted ml-auto">
                  {formatDate(selectedAnnouncement.publishedAt)} {t('announcements.at')} {formatTime(selectedAnnouncement.publishedAt)}
                </span>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6 overflow-y-auto max-h-[50vh]">
              <p className="text-text-primary whitespace-pre-wrap">{t(`data.announcements.${selectedAnnouncement.id}.content`, { defaultValue: selectedAnnouncement.content })}</p>

              {/* Attachments */}
              {selectedAnnouncement.attachments.length > 0 && (
                <div className="mt-6 pt-6 border-t border-white/[0.08]">
                  <h4 className="font-medium text-text-primary mb-3">{t('announcements.attachments')}</h4>
                  <div className="space-y-2">
                    {selectedAnnouncement.attachments.map((attachment, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 bg-white/[0.05] rounded-lg"
                      >
                        <div className="flex items-center gap-3">
                          <Paperclip size={16} className="text-text-muted" />
                          <div>
                            <p className="text-sm font-medium text-text-primary">{attachment.name}</p>
                            <p className="text-xs text-text-muted">{attachment.size}</p>
                          </div>
                        </div>
                        <button className="p-2 hover:bg-white/[0.03] backdrop-blur-xl rounded-lg text-text-secondary hover:text-accent-primary">
                          <Download size={16} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-6 border-t border-white/[0.08] bg-white/[0.05]">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 text-sm text-text-muted">
                  <span className="flex items-center gap-1">
                    <Users size={14} />
                    {selectedAnnouncement.targetAudience === 'all' ? t('announcements.allEmployees') : t(`data.departments.${selectedAnnouncement.targetAudience}`, { defaultValue: selectedAnnouncement.targetAudience })}
                  </span>
                  <span className="flex items-center gap-1">
                    <Eye size={14} />
                    {t('announcements.readCount', { read: selectedAnnouncement.readCount, total: selectedAnnouncement.totalRecipients })}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar size={14} />
                    {t('announcements.expires', { date: formatDate(selectedAnnouncement.expiresAt) })}
                  </span>
                </div>
                <Button variant="secondary" onClick={() => setSelectedAnnouncement(null)}>
                  {t('announcements.close')}
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};
