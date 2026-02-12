import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Building2,
  Globe,
  Mail,
  Phone,
  MapPin,
  FileText,
  Settings,
  Save,
  Upload,
  AlertCircle,
} from 'lucide-react';
import { PageHeader, Card, Input, Button } from '@/components/common';
import {
  companyProfile,
  industries,
  employeeCounts,
  timezones,
  dateFormats,
  currencies,
  languages,
  countries,
  type CompanyProfile as CompanyProfileType,
} from '@/data/settingsData';
import { useTranslation } from 'react-i18next';

export const CompanyProfile = () => {
  const { t } = useTranslation('settings');
  const [formData, setFormData] = useState<CompanyProfileType>(companyProfile);
  const [hasChanges, setHasChanges] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setHasChanges(true);
  };

  const handleAddressChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      address: { ...prev.address, [field]: value }
    }));
    setHasChanges(true);
  };

  const handleSave = async () => {
    setIsSaving(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSaving(false);
    setHasChanges(false);
    console.log('Saving company profile:', formData);
  };

  return (
    <div className="space-y-6 pb-20">
      <PageHeader
        title={t('companyProfile.title')}
        subtitle={t('companyProfile.subtitle')}
      />

      {/* Unsaved Changes Banner */}
      {hasChanges && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card className="p-4 bg-amber-500/10 border-amber-500/30">
            <div className="flex items-center gap-3">
              <AlertCircle size={20} className="text-amber-400" />
              <span className="text-amber-400 text-sm">{t('companyProfile.unsavedChanges')}</span>
            </div>
          </Card>
        </motion.div>
      )}

      {/* Basic Information */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-accent-primary/20 flex items-center justify-center">
              <Building2 size={20} className="text-accent-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-text-primary">{t('companyProfile.basicInfo.title')}</h3>
              <p className="text-sm text-text-secondary">{t('companyProfile.basicInfo.subtitle')}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Logo Upload */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-text-secondary mb-2">{t('companyProfile.basicInfo.companyLogo')}</label>
              <div className="flex items-center gap-4">
                <div className="w-24 h-24 rounded-lg bg-white/[0.05] border-2 border-dashed border-white/[0.08] flex items-center justify-center">
                  {formData.logo ? (
                    <img src={formData.logo} alt="Logo" className="w-full h-full object-contain rounded-lg" />
                  ) : (
                    <Building2 size={32} className="text-text-muted" />
                  )}
                </div>
                <div>
                  <Button variant="outline" size="sm" leftIcon={<Upload size={14} />}>
                    {t('companyProfile.basicInfo.uploadLogo')}
                  </Button>
                  <p className="text-xs text-text-muted mt-2">{t('companyProfile.basicInfo.logoHint')}</p>
                </div>
              </div>
            </div>

            <Input
              label={t('companyProfile.basicInfo.companyName')}
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              placeholder={t('companyProfile.basicInfo.companyNamePlaceholder')}
            />

            <Input
              label={t('companyProfile.basicInfo.legalName')}
              value={formData.legalName}
              onChange={(e) => handleChange('legalName', e.target.value)}
              placeholder={t('companyProfile.basicInfo.legalNamePlaceholder')}
            />

            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">{t('companyProfile.basicInfo.industry')}</label>
              <select
                value={formData.industry}
                onChange={(e) => handleChange('industry', e.target.value)}
                className="w-full px-3 py-2 bg-white/[0.05] border border-white/[0.08] rounded-lg text-text-primary focus:outline-none focus:border-accent-primary"
              >
                {industries.map(industry => (
                  <option key={industry} value={industry}>{industry}</option>
                ))}
              </select>
            </div>

            <Input
              label={t('companyProfile.basicInfo.foundedYear')}
              value={formData.founded}
              onChange={(e) => handleChange('founded', e.target.value)}
              placeholder={t('companyProfile.basicInfo.foundedYearPlaceholder')}
            />

            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">{t('companyProfile.basicInfo.employeeCount')}</label>
              <select
                value={formData.employeeCount}
                onChange={(e) => handleChange('employeeCount', e.target.value)}
                className="w-full px-3 py-2 bg-white/[0.05] border border-white/[0.08] rounded-lg text-text-primary focus:outline-none focus:border-accent-primary"
              >
                {employeeCounts.map(count => (
                  <option key={count} value={count}>{count}</option>
                ))}
              </select>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Contact Information */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center">
              <Phone size={20} className="text-green-400" />
            </div>
            <div>
              <h3 className="font-semibold text-text-primary">{t('companyProfile.contact.title')}</h3>
              <p className="text-sm text-text-secondary">{t('companyProfile.contact.subtitle')}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              label={t('companyProfile.contact.website')}
              value={formData.website}
              onChange={(e) => handleChange('website', e.target.value)}
              placeholder={t('companyProfile.contact.websitePlaceholder')}
              leftIcon={<Globe size={16} />}
            />

            <Input
              label={t('companyProfile.contact.email')}
              type="email"
              value={formData.email}
              onChange={(e) => handleChange('email', e.target.value)}
              placeholder={t('companyProfile.contact.emailPlaceholder')}
              leftIcon={<Mail size={16} />}
            />

            <Input
              label={t('companyProfile.contact.phone')}
              value={formData.phone}
              onChange={(e) => handleChange('phone', e.target.value)}
              placeholder={t('companyProfile.contact.phonePlaceholder')}
              leftIcon={<Phone size={16} />}
            />

            <Input
              label={t('companyProfile.contact.fax')}
              value={formData.fax}
              onChange={(e) => handleChange('fax', e.target.value)}
              placeholder={t('companyProfile.contact.faxPlaceholder')}
            />
          </div>
        </Card>
      </motion.div>

      {/* Address */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
              <MapPin size={20} className="text-blue-400" />
            </div>
            <div>
              <h3 className="font-semibold text-text-primary">{t('companyProfile.address.title')}</h3>
              <p className="text-sm text-text-secondary">{t('companyProfile.address.subtitle')}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              label={t('companyProfile.address.street')}
              value={formData.address.street}
              onChange={(e) => handleAddressChange('street', e.target.value)}
              placeholder={t('companyProfile.address.streetPlaceholder')}
            />

            <Input
              label={t('companyProfile.address.suite')}
              value={formData.address.suite}
              onChange={(e) => handleAddressChange('suite', e.target.value)}
              placeholder={t('companyProfile.address.suitePlaceholder')}
            />

            <Input
              label={t('companyProfile.address.city')}
              value={formData.address.city}
              onChange={(e) => handleAddressChange('city', e.target.value)}
              placeholder={t('companyProfile.address.cityPlaceholder')}
            />

            <Input
              label={t('companyProfile.address.state')}
              value={formData.address.state}
              onChange={(e) => handleAddressChange('state', e.target.value)}
              placeholder={t('companyProfile.address.statePlaceholder')}
            />

            <Input
              label={t('companyProfile.address.zip')}
              value={formData.address.zipCode}
              onChange={(e) => handleAddressChange('zipCode', e.target.value)}
              placeholder={t('companyProfile.address.zipPlaceholder')}
            />

            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">{t('companyProfile.address.country')}</label>
              <select
                value={formData.address.country}
                onChange={(e) => handleAddressChange('country', e.target.value)}
                className="w-full px-3 py-2 bg-white/[0.05] border border-white/[0.08] rounded-lg text-text-primary focus:outline-none focus:border-accent-primary"
              >
                {countries.map(country => (
                  <option key={country} value={country}>{country}</option>
                ))}
              </select>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Legal & Tax */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-[#94B4C1]/20 flex items-center justify-center">
              <FileText size={20} className="text-[#94B4C1]" />
            </div>
            <div>
              <h3 className="font-semibold text-text-primary">{t('companyProfile.legal.title')}</h3>
              <p className="text-sm text-text-secondary">{t('companyProfile.legal.subtitle')}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              label={t('companyProfile.legal.taxId')}
              value={formData.taxId}
              onChange={(e) => handleChange('taxId', e.target.value)}
              placeholder={t('companyProfile.legal.taxIdPlaceholder')}
            />

            <Input
              label={t('companyProfile.legal.registrationNumber')}
              value={formData.registrationNumber}
              onChange={(e) => handleChange('registrationNumber', e.target.value)}
              placeholder={t('companyProfile.legal.registrationNumberPlaceholder')}
            />
          </div>
        </Card>
      </motion.div>

      {/* Regional Settings */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-orange-500/20 flex items-center justify-center">
              <Settings size={20} className="text-orange-400" />
            </div>
            <div>
              <h3 className="font-semibold text-text-primary">{t('companyProfile.regional.title')}</h3>
              <p className="text-sm text-text-secondary">{t('companyProfile.regional.subtitle')}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">{t('companyProfile.regional.timezone')}</label>
              <select
                value={formData.timezone}
                onChange={(e) => handleChange('timezone', e.target.value)}
                className="w-full px-3 py-2 bg-white/[0.05] border border-white/[0.08] rounded-lg text-text-primary focus:outline-none focus:border-accent-primary"
              >
                {timezones.map(tz => (
                  <option key={tz.value} value={tz.value}>{tz.label}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">{t('companyProfile.regional.dateFormat')}</label>
              <select
                value={formData.dateFormat}
                onChange={(e) => handleChange('dateFormat', e.target.value)}
                className="w-full px-3 py-2 bg-white/[0.05] border border-white/[0.08] rounded-lg text-text-primary focus:outline-none focus:border-accent-primary"
              >
                {dateFormats.map(df => (
                  <option key={df.value} value={df.value}>{df.label}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">{t('companyProfile.regional.currency')}</label>
              <select
                value={formData.currency}
                onChange={(e) => handleChange('currency', e.target.value)}
                className="w-full px-3 py-2 bg-white/[0.05] border border-white/[0.08] rounded-lg text-text-primary focus:outline-none focus:border-accent-primary"
              >
                {currencies.map(c => (
                  <option key={c.value} value={c.value}>{c.label}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">{t('companyProfile.regional.language')}</label>
              <select
                value={formData.language}
                onChange={(e) => handleChange('language', e.target.value)}
                className="w-full px-3 py-2 bg-white/[0.05] border border-white/[0.08] rounded-lg text-text-primary focus:outline-none focus:border-accent-primary"
              >
                {languages.map(lang => (
                  <option key={lang.value} value={lang.value}>{lang.label}</option>
                ))}
              </select>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Branding */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-pink-500/20 flex items-center justify-center">
              <div className="w-5 h-5 rounded" style={{ backgroundColor: formData.primaryColor }} />
            </div>
            <div>
              <h3 className="font-semibold text-text-primary">{t('companyProfile.branding.title')}</h3>
              <p className="text-sm text-text-secondary">{t('companyProfile.branding.subtitle')}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">{t('companyProfile.branding.primaryColor')}</label>
              <div className="flex items-center gap-3">
                <input
                  type="color"
                  value={formData.primaryColor}
                  onChange={(e) => handleChange('primaryColor', e.target.value)}
                  className="w-10 h-10 rounded cursor-pointer border border-white/[0.08]"
                />
                <input
                  type="text"
                  value={formData.primaryColor}
                  onChange={(e) => handleChange('primaryColor', e.target.value)}
                  className="flex-1 px-3 py-2 bg-white/[0.05] border border-white/[0.08] rounded-lg text-text-primary text-sm focus:outline-none focus:border-accent-primary"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">{t('companyProfile.branding.secondaryColor')}</label>
              <div className="flex items-center gap-3">
                <input
                  type="color"
                  value={formData.secondaryColor}
                  onChange={(e) => handleChange('secondaryColor', e.target.value)}
                  className="w-10 h-10 rounded cursor-pointer border border-white/[0.08]"
                />
                <input
                  type="text"
                  value={formData.secondaryColor}
                  onChange={(e) => handleChange('secondaryColor', e.target.value)}
                  className="flex-1 px-3 py-2 bg-white/[0.05] border border-white/[0.08] rounded-lg text-text-primary text-sm focus:outline-none focus:border-accent-primary"
                />
              </div>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-text-secondary mb-2">{t('companyProfile.branding.favicon')}</label>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-white/[0.05] border border-white/[0.08] flex items-center justify-center">
                  {formData.favicon ? (
                    <img src={formData.favicon} alt="Favicon" className="w-8 h-8" />
                  ) : (
                    <Building2 size={20} className="text-text-muted" />
                  )}
                </div>
                <Button variant="outline" size="sm" leftIcon={<Upload size={14} />}>
                  {t('companyProfile.branding.uploadFavicon')}
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Sticky Save Button */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-background-primary border-t border-white/[0.08]">
        <div className="max-w-7xl mx-auto flex justify-end gap-4">
          <Button
            variant="outline"
            onClick={() => {
              setFormData(companyProfile);
              setHasChanges(false);
            }}
            disabled={!hasChanges}
          >
            {t('companyProfile.discardChanges')}
          </Button>
          <Button
            leftIcon={<Save size={16} />}
            onClick={handleSave}
            disabled={!hasChanges || isSaving}
          >
            {isSaving ? t('companyProfile.saving') : t('companyProfile.saveChanges')}
          </Button>
        </div>
      </div>
    </div>
  );
};
