import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  QrCode,
  Download,
  Printer,
  Eye,
  Copy,
  RefreshCw,
  ExternalLink,
  CheckCircle,
} from 'lucide-react';
import { PageHeader, Card, Button } from '@/components/common';
import { tables } from '@/data/restaurant/restaurantData';
import { useTranslation } from 'react-i18next';

export const TableQRCodes = () => {
  const { t } = useTranslation('restaurant');
  const [selectedTables, setSelectedTables] = useState<string[]>([]);
  const [sectionFilter, setSectionFilter] = useState<string>('all');

  const sections = useMemo(() => {
    const uniqueSections = [...new Set(tables.map(t => t.section))];
    return ['all', ...uniqueSections];
  }, []);

  const filteredTables = useMemo(() => {
    if (sectionFilter === 'all') return tables;
    return tables.filter(t => t.section === sectionFilter);
  }, [sectionFilter]);

  const toggleTableSelection = (tableId: string) => {
    if (selectedTables.includes(tableId)) {
      setSelectedTables(selectedTables.filter(id => id !== tableId));
    } else {
      setSelectedTables([...selectedTables, tableId]);
    }
  };

  const selectAll = () => {
    if (selectedTables.length === filteredTables.length) {
      setSelectedTables([]);
    } else {
      setSelectedTables(filteredTables.map(t => t.id));
    }
  };

  const getQRUrl = (tableNumber: number) => {
    return `https://restaurant.app/menu?table=${tableNumber}`;
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title={t('tableQrCodes.title')}
        subtitle={t('tableQrCodes.subtitle')}
        icon={QrCode}
        actions={
          <div className="flex gap-2">
            {selectedTables.length > 0 && (
              <>
                <Button variant="secondary">
                  <Download size={18} />
                  {t('tableQrCodes.download', { count: selectedTables.length })}
                </Button>
                <Button variant="secondary">
                  <Printer size={18} />
                  {t('tableQrCodes.print', { count: selectedTables.length })}
                </Button>
              </>
            )}
            <Button>
              <RefreshCw size={18} />
              {t('tableQrCodes.regenerateAll')}
            </Button>
          </div>
        }
      />

      {/* Section Filter & Select All */}
      <Card className="p-4">
        <div className="flex flex-col md:flex-row justify-between gap-4">
          <div className="flex gap-2 flex-wrap">
            {sections.map((section) => (
              <Button
                key={section}
                variant={sectionFilter === section ? 'primary' : 'ghost'}
                size="sm"
                onClick={() => setSectionFilter(section)}
              >
                {section === 'all' ? t('tableQrCodes.allSections') : section}
              </Button>
            ))}
          </div>
          <Button
            variant="secondary"
            size="sm"
            onClick={selectAll}
          >
            {selectedTables.length === filteredTables.length ? t('tableQrCodes.deselectAll') : t('tableQrCodes.selectAll')}
          </Button>
        </div>
      </Card>

      {/* QR Codes Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {filteredTables.map((table, index) => {
          const isSelected = selectedTables.includes(table.id);
          const qrUrl = getQRUrl(table.number);

          return (
            <motion.div
              key={table.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.03 }}
            >
              <Card
                className={`p-4 cursor-pointer transition-all ${
                  isSelected ? 'ring-2 ring-[#f97316] bg-[#f97316]/5' : 'hover:bg-background-secondary'
                }`}
                onClick={() => toggleTableSelection(table.id)}
              >
                <div className="text-center">
                  {/* Selection Indicator */}
                  <div className="flex justify-end mb-2">
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      isSelected ? 'border-[#f97316] bg-[#f97316]' : 'border-border-default'
                    }`}>
                      {isSelected && <CheckCircle size={12} className="text-white" />}
                    </div>
                  </div>

                  {/* QR Code Placeholder */}
                  <div className="w-32 h-32 mx-auto bg-white rounded-lg p-2 mb-4">
                    <div className="w-full h-full bg-background-tertiary rounded flex items-center justify-center">
                      <QrCode size={80} className="text-text-primary" />
                    </div>
                  </div>

                  {/* Table Info */}
                  <h3 className="font-bold text-text-primary text-lg">{t('tableQrCodes.table', { number: table.number })}</h3>
                  <p className="text-xs text-text-muted mb-2">{table.section}</p>
                  <p className="text-xs text-text-secondary">{t('tableQrCodes.seats', { count: table.capacity })}</p>

                  {/* URL Preview */}
                  <div className="mt-3 p-2 bg-background-secondary rounded text-xs font-mono text-text-muted truncate">
                    {qrUrl}
                  </div>

                  {/* Actions */}
                  <div className="flex gap-1 mt-3" onClick={(e) => e.stopPropagation()}>
                    <Button variant="ghost" size="sm" className="flex-1">
                      <Eye size={14} />
                    </Button>
                    <Button variant="ghost" size="sm" className="flex-1">
                      <Copy size={14} />
                    </Button>
                    <Button variant="ghost" size="sm" className="flex-1">
                      <Download size={14} />
                    </Button>
                    <Button variant="ghost" size="sm" className="flex-1">
                      <ExternalLink size={14} />
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Instructions */}
      <Card className="p-6">
        <h3 className="font-semibold text-text-primary mb-4">{t('tableQrCodes.howToUse')}</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              step: 1,
              title: t('tableQrCodes.step1Title'),
              description: t('tableQrCodes.step1Desc'),
            },
            {
              step: 2,
              title: t('tableQrCodes.step2Title'),
              description: t('tableQrCodes.step2Desc'),
            },
            {
              step: 3,
              title: t('tableQrCodes.step3Title'),
              description: t('tableQrCodes.step3Desc'),
            },
          ].map((item) => (
            <div key={item.step} className="text-center">
              <div className="w-12 h-12 rounded-full bg-[#f97316]/20 flex items-center justify-center mx-auto mb-3">
                <span className="text-xl font-bold text-[#f97316]">{item.step}</span>
              </div>
              <h4 className="font-medium text-text-primary mb-2">{item.title}</h4>
              <p className="text-sm text-text-secondary">{item.description}</p>
            </div>
          ))}
        </div>
      </Card>

      {/* QR Code Settings */}
      <Card className="p-4">
        <h3 className="font-semibold text-text-primary mb-4">{t('tableQrCodes.qrSettings')}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-background-secondary rounded-lg">
            <p className="text-sm font-medium text-text-primary mb-2">{t('tableQrCodes.menuUrlBase')}</p>
            <p className="text-xs text-text-muted font-mono">https://restaurant.app/menu</p>
          </div>
          <div className="p-4 bg-background-secondary rounded-lg">
            <p className="text-sm font-medium text-text-primary mb-2">{t('tableQrCodes.qrFormat')}</p>
            <p className="text-xs text-text-muted">{t('tableQrCodes.qrFormatValue')}</p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default TableQRCodes;
