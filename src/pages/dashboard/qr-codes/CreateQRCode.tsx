import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  ArrowRight,
  Check,
  QrCode,
  Link,
  CreditCard,
  Wifi,
  Mail,
  Phone,
  MapPin,
  Calendar,
  MessageSquare,
  FileText,
  Palette,
  Eye,
  Download,
  Save,
  Image,
  Square,
  Circle,
  RectangleHorizontal,
} from 'lucide-react';
import { PageHeader, Card, Button, Input } from '@/components/common';
import {
  qrCodeTypes,
  qrFolders,
  qrTemplates,
  frameOptions,
  cornerStyleOptions,
  getTypeColor,
} from '@/data/qrCodeData';

type Step = 'type' | 'content' | 'style' | 'preview';

const steps: { id: Step; label: string; icon: React.ElementType }[] = [
  { id: 'type', label: 'Select Type', icon: QrCode },
  { id: 'content', label: 'Add Content', icon: FileText },
  { id: 'style', label: 'Customize', icon: Palette },
  { id: 'preview', label: 'Preview & Save', icon: Eye },
];

const typeIcons: Record<string, React.ElementType> = {
  url: Link,
  vcard: CreditCard,
  wifi: Wifi,
  email: Mail,
  phone: Phone,
  sms: MessageSquare,
  location: MapPin,
  event: Calendar,
  text: FileText,
};

export const CreateQRCode = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState<Step>('type');
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    content: {} as Record<string, string>,
    folder: 'folder-1',
    isDynamic: true,
    style: {
      foregroundColor: '#000000',
      backgroundColor: '#ffffff',
      cornerStyle: 'square',
      frame: 'none',
      logo: null as string | null,
    },
  });

  const currentStepIndex = steps.findIndex(s => s.id === currentStep);
  const isFirstStep = currentStepIndex === 0;
  const isLastStep = currentStepIndex === steps.length - 1;

  const canProceed = useMemo(() => {
    switch (currentStep) {
      case 'type':
        return formData.type !== '';
      case 'content':
        if (formData.type === 'url') return !!formData.content.url;
        if (formData.type === 'vcard') return !!formData.content.firstName && !!formData.content.lastName;
        if (formData.type === 'wifi') return !!formData.content.ssid;
        if (formData.type === 'email') return !!formData.content.email;
        if (formData.type === 'phone') return !!formData.content.phone;
        if (formData.type === 'sms') return !!formData.content.phone;
        if (formData.type === 'location') return !!formData.content.latitude && !!formData.content.longitude;
        if (formData.type === 'event') return !!formData.content.title && !!formData.content.startDate;
        if (formData.type === 'text') return !!formData.content.text;
        return false;
      case 'style':
        return true;
      case 'preview':
        return !!formData.name;
      default:
        return false;
    }
  }, [currentStep, formData]);

  const handleNext = () => {
    if (!isLastStep && canProceed) {
      setCurrentStep(steps[currentStepIndex + 1].id);
    }
  };

  const handleBack = () => {
    if (!isFirstStep) {
      setCurrentStep(steps[currentStepIndex - 1].id);
    }
  };

  const handleSave = () => {
    // In a real app, this would save to the backend
    console.log('Saving QR Code:', formData);
    navigate('/dashboard/qr-codes/list');
  };

  const updateContent = (key: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      content: { ...prev.content, [key]: value },
    }));
  };

  const updateStyle = (key: string, value: string | null) => {
    setFormData(prev => ({
      ...prev,
      style: { ...prev.style, [key]: value },
    }));
  };

  const renderTypeSelection = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-xl font-semibold text-text-primary mb-2">What type of QR code do you want to create?</h2>
        <p className="text-text-secondary">Select the content type for your QR code</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {qrCodeTypes.map((type) => {
          const Icon = typeIcons[type.id] || QrCode;
          const isSelected = formData.type === type.id;
          const color = getTypeColor(type.id as any);

          return (
            <motion.button
              key={type.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setFormData(prev => ({ ...prev, type: type.id, content: {} }))}
              className={`p-6 rounded-xl border-2 transition-all text-left ${
                isSelected
                  ? 'border-accent-primary bg-accent-primary/10'
                  : 'border-white/[0.08] hover:border-white/[0.12] bg-white/[0.03] backdrop-blur-xl'
              }`}
            >
              <div
                className="w-12 h-12 rounded-lg flex items-center justify-center mb-4"
                style={{ backgroundColor: `${color}20` }}
              >
                <Icon size={24} style={{ color }} />
              </div>
              <h3 className="font-semibold text-text-primary mb-1">{type.label}</h3>
              <p className="text-xs text-text-secondary">{type.description}</p>
              {isSelected && (
                <div className="mt-3">
                  <Check size={16} className="text-accent-primary" />
                </div>
              )}
            </motion.button>
          );
        })}
      </div>

      {/* Templates Section */}
      <div className="mt-8">
        <h3 className="text-lg font-semibold text-text-primary mb-4">Or start with a template</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {qrTemplates.map((template) => (
            <Card
              key={template.id}
              className="p-4 hover:shadow-lg transition-all cursor-pointer"
              onClick={() => {
                setFormData(prev => ({
                  ...prev,
                  type: template.type,
                  style: {
                    foregroundColor: template.style.foregroundColor,
                    backgroundColor: template.style.backgroundColor,
                    cornerStyle: template.style.cornerStyle as typeof prev.style.cornerStyle,
                    frame: template.style.frame as typeof prev.style.frame,
                    logo: template.style.logo ? '/logo.png' : null,
                  },
                }));
              }}
            >
              <div
                className="w-full aspect-square rounded-lg flex items-center justify-center mb-3"
                style={{
                  backgroundColor: template.style.backgroundColor,
                  border: `2px solid ${template.style.foregroundColor}`,
                }}
              >
                <QrCode size={40} style={{ color: template.style.foregroundColor }} />
              </div>
              <p className="text-sm font-medium text-text-primary text-center">{template.name}</p>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );

  const renderContentForm = () => {
    const selectedType = qrCodeTypes.find(t => t.id === formData.type);

    return (
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="text-center mb-8">
          <h2 className="text-xl font-semibold text-text-primary mb-2">Enter your {selectedType?.label} details</h2>
          <p className="text-text-secondary">Fill in the information for your QR code</p>
        </div>

        <Card className="p-6 space-y-4">
          {formData.type === 'url' && (
            <Input
              label="URL"
              placeholder="https://example.com"
              value={formData.content.url || ''}
              onChange={(e) => updateContent('url', e.target.value)}
            />
          )}

          {formData.type === 'vcard' && (
            <>
              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="First Name"
                  placeholder="John"
                  value={formData.content.firstName || ''}
                  onChange={(e) => updateContent('firstName', e.target.value)}
                />
                <Input
                  label="Last Name"
                  placeholder="Doe"
                  value={formData.content.lastName || ''}
                  onChange={(e) => updateContent('lastName', e.target.value)}
                />
              </div>
              <Input
                label="Organization"
                placeholder="Company Name"
                value={formData.content.organization || ''}
                onChange={(e) => updateContent('organization', e.target.value)}
              />
              <Input
                label="Title"
                placeholder="Job Title"
                value={formData.content.title || ''}
                onChange={(e) => updateContent('title', e.target.value)}
              />
              <Input
                label="Phone"
                placeholder="+1 234 567 8900"
                value={formData.content.phone || ''}
                onChange={(e) => updateContent('phone', e.target.value)}
              />
              <Input
                label="Email"
                placeholder="john@example.com"
                value={formData.content.email || ''}
                onChange={(e) => updateContent('email', e.target.value)}
              />
              <Input
                label="Website"
                placeholder="https://example.com"
                value={formData.content.website || ''}
                onChange={(e) => updateContent('website', e.target.value)}
              />
            </>
          )}

          {formData.type === 'wifi' && (
            <>
              <Input
                label="Network Name (SSID)"
                placeholder="MyWiFiNetwork"
                value={formData.content.ssid || ''}
                onChange={(e) => updateContent('ssid', e.target.value)}
              />
              <Input
                label="Password"
                type="password"
                placeholder="WiFi Password"
                value={formData.content.password || ''}
                onChange={(e) => updateContent('password', e.target.value)}
              />
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">Security Type</label>
                <select
                  value={formData.content.security || 'WPA'}
                  onChange={(e) => updateContent('security', e.target.value)}
                  className="w-full px-3 py-2 bg-white/[0.05] border border-white/[0.08] rounded-lg text-sm text-text-primary focus:outline-none focus:border-accent-primary"
                >
                  <option value="WPA">WPA/WPA2</option>
                  <option value="WEP">WEP</option>
                  <option value="nopass">No Password</option>
                </select>
              </div>
            </>
          )}

          {formData.type === 'email' && (
            <>
              <Input
                label="Email Address"
                placeholder="contact@example.com"
                value={formData.content.email || ''}
                onChange={(e) => updateContent('email', e.target.value)}
              />
              <Input
                label="Subject"
                placeholder="Email Subject"
                value={formData.content.subject || ''}
                onChange={(e) => updateContent('subject', e.target.value)}
              />
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">Message</label>
                <textarea
                  placeholder="Email body..."
                  value={formData.content.body || ''}
                  onChange={(e) => updateContent('body', e.target.value)}
                  className="w-full px-3 py-2 bg-white/[0.05] border border-white/[0.08] rounded-lg text-sm text-text-primary focus:outline-none focus:border-accent-primary min-h-24"
                />
              </div>
            </>
          )}

          {formData.type === 'phone' && (
            <Input
              label="Phone Number"
              placeholder="+1 234 567 8900"
              value={formData.content.phone || ''}
              onChange={(e) => updateContent('phone', e.target.value)}
            />
          )}

          {formData.type === 'sms' && (
            <>
              <Input
                label="Phone Number"
                placeholder="+1 234 567 8900"
                value={formData.content.phone || ''}
                onChange={(e) => updateContent('phone', e.target.value)}
              />
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">Message</label>
                <textarea
                  placeholder="SMS message..."
                  value={formData.content.message || ''}
                  onChange={(e) => updateContent('message', e.target.value)}
                  className="w-full px-3 py-2 bg-white/[0.05] border border-white/[0.08] rounded-lg text-sm text-text-primary focus:outline-none focus:border-accent-primary min-h-24"
                />
              </div>
            </>
          )}

          {formData.type === 'location' && (
            <>
              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="Latitude"
                  placeholder="40.7128"
                  value={formData.content.latitude || ''}
                  onChange={(e) => updateContent('latitude', e.target.value)}
                />
                <Input
                  label="Longitude"
                  placeholder="-74.0060"
                  value={formData.content.longitude || ''}
                  onChange={(e) => updateContent('longitude', e.target.value)}
                />
              </div>
              <Input
                label="Location Name (Optional)"
                placeholder="Empire State Building"
                value={formData.content.name || ''}
                onChange={(e) => updateContent('name', e.target.value)}
              />
            </>
          )}

          {formData.type === 'event' && (
            <>
              <Input
                label="Event Title"
                placeholder="Team Meeting"
                value={formData.content.title || ''}
                onChange={(e) => updateContent('title', e.target.value)}
              />
              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="Start Date & Time"
                  type="datetime-local"
                  value={formData.content.startDate || ''}
                  onChange={(e) => updateContent('startDate', e.target.value)}
                />
                <Input
                  label="End Date & Time"
                  type="datetime-local"
                  value={formData.content.endDate || ''}
                  onChange={(e) => updateContent('endDate', e.target.value)}
                />
              </div>
              <Input
                label="Location"
                placeholder="Conference Room A"
                value={formData.content.location || ''}
                onChange={(e) => updateContent('location', e.target.value)}
              />
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">Description</label>
                <textarea
                  placeholder="Event description..."
                  value={formData.content.description || ''}
                  onChange={(e) => updateContent('description', e.target.value)}
                  className="w-full px-3 py-2 bg-white/[0.05] border border-white/[0.08] rounded-lg text-sm text-text-primary focus:outline-none focus:border-accent-primary min-h-24"
                />
              </div>
            </>
          )}

          {formData.type === 'text' && (
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">Text Content</label>
              <textarea
                placeholder="Enter your text..."
                value={formData.content.text || ''}
                onChange={(e) => updateContent('text', e.target.value)}
                className="w-full px-3 py-2 bg-white/[0.05] border border-white/[0.08] rounded-lg text-sm text-text-primary focus:outline-none focus:border-accent-primary min-h-32"
              />
            </div>
          )}
        </Card>

        {/* Options */}
        <Card className="p-6 space-y-4">
          <h3 className="font-semibold text-text-primary">Options</h3>
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-2">Folder</label>
            <select
              value={formData.folder}
              onChange={(e) => setFormData(prev => ({ ...prev, folder: e.target.value }))}
              className="w-full px-3 py-2 bg-white/[0.05] border border-white/[0.08] rounded-lg text-sm text-text-primary focus:outline-none focus:border-accent-primary"
            >
              {qrFolders.map(folder => (
                <option key={folder.id} value={folder.id}>{folder.name}</option>
              ))}
            </select>
          </div>
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="isDynamic"
              checked={formData.isDynamic}
              onChange={(e) => setFormData(prev => ({ ...prev, isDynamic: e.target.checked }))}
              className="w-4 h-4 rounded border-white/[0.08] bg-white/[0.05] text-accent-primary focus:ring-accent-primary"
            />
            <label htmlFor="isDynamic" className="text-sm text-text-secondary">
              Create as Dynamic QR Code (allows editing content after creation)
            </label>
          </div>
        </Card>
      </div>
    );
  };

  const renderStyleCustomization = () => (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Style Options */}
      <div className="space-y-6">
        <Card className="p-6 space-y-4">
          <h3 className="font-semibold text-text-primary">Colors</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">Foreground Color</label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={formData.style.foregroundColor}
                  onChange={(e) => updateStyle('foregroundColor', e.target.value)}
                  className="w-10 h-10 rounded cursor-pointer border border-white/[0.08]"
                />
                <Input
                  value={formData.style.foregroundColor}
                  onChange={(e) => updateStyle('foregroundColor', e.target.value)}
                  className="flex-1"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">Background Color</label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={formData.style.backgroundColor}
                  onChange={(e) => updateStyle('backgroundColor', e.target.value)}
                  className="w-10 h-10 rounded cursor-pointer border border-white/[0.08]"
                />
                <Input
                  value={formData.style.backgroundColor}
                  onChange={(e) => updateStyle('backgroundColor', e.target.value)}
                  className="flex-1"
                />
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-6 space-y-4">
          <h3 className="font-semibold text-text-primary">Corner Style</h3>
          <div className="grid grid-cols-3 gap-3">
            {cornerStyleOptions.map((style) => {
              const icons: Record<string, React.ElementType> = {
                square: Square,
                rounded: RectangleHorizontal,
                circle: Circle,
              };
              const Icon = icons[style.id] || Square;
              return (
                <button
                  key={style.id}
                  onClick={() => updateStyle('cornerStyle', style.id)}
                  className={`p-4 rounded-lg border-2 transition-all flex flex-col items-center gap-2 ${
                    formData.style.cornerStyle === style.id
                      ? 'border-accent-primary bg-accent-primary/10'
                      : 'border-white/[0.08] hover:border-white/[0.12]'
                  }`}
                >
                  <Icon size={24} className="text-text-primary" />
                  <span className="text-sm text-text-secondary">{style.label}</span>
                </button>
              );
            })}
          </div>
        </Card>

        <Card className="p-6 space-y-4">
          <h3 className="font-semibold text-text-primary">Frame</h3>
          <div className="grid grid-cols-4 gap-3">
            {frameOptions.map((frame) => (
              <button
                key={frame.id}
                onClick={() => updateStyle('frame', frame.id)}
                className={`p-3 rounded-lg border-2 transition-all text-center ${
                  formData.style.frame === frame.id
                    ? 'border-accent-primary bg-accent-primary/10'
                    : 'border-white/[0.08] hover:border-white/[0.12]'
                }`}
              >
                <span className="text-sm text-text-secondary">{frame.label}</span>
              </button>
            ))}
          </div>
        </Card>

        <Card className="p-6 space-y-4">
          <h3 className="font-semibold text-text-primary">Logo</h3>
          <div className="border-2 border-dashed border-white/[0.08] rounded-lg p-8 text-center">
            <Image size={32} className="mx-auto mb-2 text-text-muted" />
            <p className="text-sm text-text-secondary mb-2">Drag & drop your logo here</p>
            <Button variant="outline" size="sm">
              Browse Files
            </Button>
          </div>
        </Card>
      </div>

      {/* Preview */}
      <div className="space-y-6">
        <Card className="p-6">
          <h3 className="font-semibold text-text-primary mb-4">Preview</h3>
          <div className="flex justify-center">
            <div
              className="w-64 h-64 rounded-xl flex items-center justify-center shadow-lg"
              style={{
                backgroundColor: formData.style.backgroundColor,
                border: `4px solid ${formData.style.foregroundColor}`,
              }}
            >
              <QrCode size={120} style={{ color: formData.style.foregroundColor }} />
            </div>
          </div>
          {formData.style.frame !== 'none' && (
            <div className="mt-4 text-center">
              <p className="text-sm text-text-secondary">Scan Me</p>
            </div>
          )}
        </Card>

        <Card className="p-6">
          <h3 className="font-semibold text-text-primary mb-4">Quick Presets</h3>
          <div className="grid grid-cols-4 gap-2">
            {[
              { fg: '#000000', bg: '#ffffff' },
              { fg: '#547792', bg: '#ffffff' },
              { fg: '#10b981', bg: '#ffffff' },
              { fg: '#f59e0b', bg: '#ffffff' },
              { fg: '#ffffff', bg: '#000000' },
              { fg: '#ffffff', bg: '#547792' },
              { fg: '#ffffff', bg: '#10b981' },
              { fg: '#ffffff', bg: '#ef4444' },
            ].map((preset, index) => (
              <button
                key={index}
                onClick={() => {
                  updateStyle('foregroundColor', preset.fg);
                  updateStyle('backgroundColor', preset.bg);
                }}
                className="w-full aspect-square rounded-lg border border-white/[0.08] overflow-hidden"
                style={{ backgroundColor: preset.bg }}
              >
                <div
                  className="w-full h-full flex items-center justify-center"
                >
                  <QrCode size={20} style={{ color: preset.fg }} />
                </div>
              </button>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );

  const renderPreview = () => (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-xl font-semibold text-text-primary mb-2">Review & Save Your QR Code</h2>
        <p className="text-text-secondary">Give your QR code a name and save it</p>
      </div>

      <Card className="p-6">
        <Input
          label="QR Code Name"
          placeholder="My Awesome QR Code"
          value={formData.name}
          onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
        />
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* QR Preview */}
        <Card className="p-6">
          <h3 className="font-semibold text-text-primary mb-4 text-center">QR Code Preview</h3>
          <div className="flex justify-center">
            <div
              className="w-48 h-48 rounded-xl flex items-center justify-center shadow-lg"
              style={{
                backgroundColor: formData.style.backgroundColor,
                border: `4px solid ${formData.style.foregroundColor}`,
              }}
            >
              <QrCode size={100} style={{ color: formData.style.foregroundColor }} />
            </div>
          </div>
          <div className="flex justify-center gap-2 mt-4">
            <Button variant="outline" size="sm" leftIcon={<Download size={14} />}>
              PNG
            </Button>
            <Button variant="outline" size="sm" leftIcon={<Download size={14} />}>
              SVG
            </Button>
            <Button variant="outline" size="sm" leftIcon={<Download size={14} />}>
              PDF
            </Button>
          </div>
        </Card>

        {/* Summary */}
        <Card className="p-6">
          <h3 className="font-semibold text-text-primary mb-4">Summary</h3>
          <div className="space-y-3">
            <div className="flex justify-between py-2 border-b border-white/[0.08]">
              <span className="text-text-secondary">Type</span>
              <span className="text-text-primary font-medium capitalize">{formData.type}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-white/[0.08]">
              <span className="text-text-secondary">Dynamic</span>
              <span className="text-text-primary font-medium">{formData.isDynamic ? 'Yes' : 'No'}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-white/[0.08]">
              <span className="text-text-secondary">Folder</span>
              <span className="text-text-primary font-medium">
                {qrFolders.find(f => f.id === formData.folder)?.name || 'None'}
              </span>
            </div>
            <div className="flex justify-between py-2 border-b border-white/[0.08]">
              <span className="text-text-secondary">Corner Style</span>
              <span className="text-text-primary font-medium capitalize">{formData.style.cornerStyle}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-white/[0.08]">
              <span className="text-text-secondary">Frame</span>
              <span className="text-text-primary font-medium capitalize">{formData.style.frame}</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-text-secondary">Colors</span>
              <div className="flex items-center gap-2">
                <div
                  className="w-6 h-6 rounded border border-white/[0.08]"
                  style={{ backgroundColor: formData.style.foregroundColor }}
                />
                <div
                  className="w-6 h-6 rounded border border-white/[0.08]"
                  style={{ backgroundColor: formData.style.backgroundColor }}
                />
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <PageHeader
        title="Create QR Code"
        subtitle="Generate a new QR code in a few simple steps"
        actions={
          <Button
            variant="outline"
            leftIcon={<ArrowLeft size={16} />}
            onClick={() => navigate('/dashboard/qr-codes/list')}
          >
            Back to List
          </Button>
        }
      />

      {/* Progress Steps */}
      <Card className="p-4">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => {
            const isCompleted = index < currentStepIndex;
            const isCurrent = step.id === currentStep;
            const Icon = step.icon;

            return (
              <div key={step.id} className="flex-1 flex items-center">
                <button
                  onClick={() => isCompleted && setCurrentStep(step.id)}
                  disabled={!isCompleted}
                  className={`flex items-center gap-3 ${isCompleted ? 'cursor-pointer' : 'cursor-default'}`}
                >
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                      isCompleted
                        ? 'bg-green-500 text-white'
                        : isCurrent
                        ? 'bg-accent-primary text-white'
                        : 'bg-white/[0.05] text-text-muted'
                    }`}
                  >
                    {isCompleted ? <Check size={18} /> : <Icon size={18} />}
                  </div>
                  <div className="hidden md:block">
                    <p className={`text-sm font-medium ${isCurrent ? 'text-text-primary' : 'text-text-secondary'}`}>
                      {step.label}
                    </p>
                  </div>
                </button>
                {index < steps.length - 1 && (
                  <div
                    className={`flex-1 h-0.5 mx-4 ${
                      isCompleted ? 'bg-green-500' : 'bg-white/[0.05]'
                    }`}
                  />
                )}
              </div>
            );
          })}
        </div>
      </Card>

      {/* Step Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.2 }}
        >
          {currentStep === 'type' && renderTypeSelection()}
          {currentStep === 'content' && renderContentForm()}
          {currentStep === 'style' && renderStyleCustomization()}
          {currentStep === 'preview' && renderPreview()}
        </motion.div>
      </AnimatePresence>

      {/* Navigation Buttons */}
      <Card className="p-4">
        <div className="flex justify-between">
          <Button
            variant="outline"
            leftIcon={<ArrowLeft size={16} />}
            onClick={handleBack}
            disabled={isFirstStep}
          >
            Back
          </Button>
          <div className="flex gap-2">
            {isLastStep ? (
              <Button
                leftIcon={<Save size={16} />}
                onClick={handleSave}
                disabled={!canProceed}
              >
                Save QR Code
              </Button>
            ) : (
              <Button
                rightIcon={<ArrowRight size={16} />}
                onClick={handleNext}
                disabled={!canProceed}
              >
                Continue
              </Button>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
};
