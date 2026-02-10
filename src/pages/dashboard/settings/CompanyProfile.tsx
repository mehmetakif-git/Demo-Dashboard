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
  const { t } = useTranslation('common');
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
        title={t('settings.companyProfile', 'Company Profile')}
        subtitle="Manage your company information and branding"
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
              <span className="text-amber-400 text-sm">You have unsaved changes</span>
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
              <h3 className="font-semibold text-text-primary">Basic Information</h3>
              <p className="text-sm text-text-secondary">Company identity and details</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Logo Upload */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-text-secondary mb-2">Company Logo</label>
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
                    Upload Logo
                  </Button>
                  <p className="text-xs text-text-muted mt-2">PNG, JPG up to 2MB. Recommended: 200x200px</p>
                </div>
              </div>
            </div>

            <Input
              label="Company Name"
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              placeholder="Enter company name"
            />

            <Input
              label="Legal Name"
              value={formData.legalName}
              onChange={(e) => handleChange('legalName', e.target.value)}
              placeholder="Enter legal name"
            />

            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">Industry</label>
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
              label="Founded Year"
              value={formData.founded}
              onChange={(e) => handleChange('founded', e.target.value)}
              placeholder="e.g., 2015"
            />

            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">Employee Count</label>
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
              <h3 className="font-semibold text-text-primary">Contact Information</h3>
              <p className="text-sm text-text-secondary">How people can reach your company</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              label="Website"
              value={formData.website}
              onChange={(e) => handleChange('website', e.target.value)}
              placeholder="https://www.example.com"
              leftIcon={<Globe size={16} />}
            />

            <Input
              label="Email"
              type="email"
              value={formData.email}
              onChange={(e) => handleChange('email', e.target.value)}
              placeholder="contact@example.com"
              leftIcon={<Mail size={16} />}
            />

            <Input
              label="Phone"
              value={formData.phone}
              onChange={(e) => handleChange('phone', e.target.value)}
              placeholder="+1 (555) 123-4567"
              leftIcon={<Phone size={16} />}
            />

            <Input
              label="Fax (Optional)"
              value={formData.fax}
              onChange={(e) => handleChange('fax', e.target.value)}
              placeholder="+1 (555) 123-4568"
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
              <h3 className="font-semibold text-text-primary">Address</h3>
              <p className="text-sm text-text-secondary">Company physical location</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              label="Street Address"
              value={formData.address.street}
              onChange={(e) => handleAddressChange('street', e.target.value)}
              placeholder="123 Main Street"
            />

            <Input
              label="Suite / Unit"
              value={formData.address.suite}
              onChange={(e) => handleAddressChange('suite', e.target.value)}
              placeholder="Suite 100"
            />

            <Input
              label="City"
              value={formData.address.city}
              onChange={(e) => handleAddressChange('city', e.target.value)}
              placeholder="New York"
            />

            <Input
              label="State / Province"
              value={formData.address.state}
              onChange={(e) => handleAddressChange('state', e.target.value)}
              placeholder="NY"
            />

            <Input
              label="ZIP / Postal Code"
              value={formData.address.zipCode}
              onChange={(e) => handleAddressChange('zipCode', e.target.value)}
              placeholder="10001"
            />

            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">Country</label>
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
              <h3 className="font-semibold text-text-primary">Legal & Tax</h3>
              <p className="text-sm text-text-secondary">Legal identifiers and tax information</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              label="Tax ID / EIN"
              value={formData.taxId}
              onChange={(e) => handleChange('taxId', e.target.value)}
              placeholder="12-3456789"
            />

            <Input
              label="Registration Number"
              value={formData.registrationNumber}
              onChange={(e) => handleChange('registrationNumber', e.target.value)}
              placeholder="NYC-2020-12345"
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
              <h3 className="font-semibold text-text-primary">Regional Settings</h3>
              <p className="text-sm text-text-secondary">Localization and formatting preferences</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">Timezone</label>
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
              <label className="block text-sm font-medium text-text-secondary mb-2">Date Format</label>
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
              <label className="block text-sm font-medium text-text-secondary mb-2">Currency</label>
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
              <label className="block text-sm font-medium text-text-secondary mb-2">Language</label>
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
              <h3 className="font-semibold text-text-primary">Branding</h3>
              <p className="text-sm text-text-secondary">Company colors and visual identity</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">Primary Color</label>
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
              <label className="block text-sm font-medium text-text-secondary mb-2">Secondary Color</label>
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
              <label className="block text-sm font-medium text-text-secondary mb-2">Favicon</label>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-white/[0.05] border border-white/[0.08] flex items-center justify-center">
                  {formData.favicon ? (
                    <img src={formData.favicon} alt="Favicon" className="w-8 h-8" />
                  ) : (
                    <Building2 size={20} className="text-text-muted" />
                  )}
                </div>
                <Button variant="outline" size="sm" leftIcon={<Upload size={14} />}>
                  Upload Favicon
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
            Discard Changes
          </Button>
          <Button
            leftIcon={<Save size={16} />}
            onClick={handleSave}
            disabled={!hasChanges || isSaving}
          >
            {isSaving ? 'Saving...' : 'Save Changes'}
          </Button>
        </div>
      </div>
    </div>
  );
};
