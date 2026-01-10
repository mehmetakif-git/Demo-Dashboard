import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Upload,
  Download,
  FileText,
  FileSpreadsheet,
  Database,
  Clock,
  CheckCircle,
  AlertCircle,
  X,
  ArrowRight,
  ArrowLeft,
  Check,
  Loader2,
  Eye,
} from 'lucide-react';
import { PageHeader, Card, Button } from '@/components/common';
import {
  importTemplates,
  getCategoryColor,
  formatDateTime,
  type ImportTemplate,
} from '@/data/reportData';

type WizardStep = 'upload' | 'map' | 'validate' | 'complete';

export const ImportCenter = () => {
  const [selectedTemplate, setSelectedTemplate] = useState<ImportTemplate | null>(null);
  const [showWizard, setShowWizard] = useState(false);
  const [currentStep, setCurrentStep] = useState<WizardStep>('upload');
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  // Mock data for the wizard
  const mockFileColumns = ['Full Name', 'Email Address', 'Dept', 'Job Title', 'Phone Number'];
  const mockValidation = {
    valid: 142,
    warnings: 8,
    invalid: 3,
    total: 153,
  };

  const startImport = (template: ImportTemplate) => {
    setSelectedTemplate(template);
    setCurrentStep('upload');
    setUploadedFile(null);
    setShowWizard(true);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFile(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) {
      setUploadedFile(file);
    }
  };

  const nextStep = () => {
    if (currentStep === 'upload') setCurrentStep('map');
    else if (currentStep === 'map') {
      setIsProcessing(true);
      setTimeout(() => {
        setIsProcessing(false);
        setCurrentStep('validate');
      }, 1500);
    } else if (currentStep === 'validate') {
      setIsProcessing(true);
      setTimeout(() => {
        setIsProcessing(false);
        setCurrentStep('complete');
      }, 2000);
    }
  };

  const prevStep = () => {
    if (currentStep === 'map') setCurrentStep('upload');
    else if (currentStep === 'validate') setCurrentStep('map');
  };

  const closeWizard = () => {
    setShowWizard(false);
    setSelectedTemplate(null);
    setUploadedFile(null);
    setCurrentStep('upload');
  };

  const steps: { key: WizardStep; label: string; number: number }[] = [
    { key: 'upload', label: 'Upload File', number: 1 },
    { key: 'map', label: 'Map Fields', number: 2 },
    { key: 'validate', label: 'Validate', number: 3 },
    { key: 'complete', label: 'Complete', number: 4 },
  ];

  const getStepIndex = (step: WizardStep) => steps.findIndex((s) => s.key === step);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Import Center"
        subtitle="Import data from external files"
      />

      {/* Import Templates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {importTemplates.map((template) => (
          <motion.div
            key={template.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -4 }}
          >
            <Card className="p-6 h-full flex flex-col">
              {/* Header */}
              <div className="flex items-start gap-3 mb-4">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: `${getCategoryColor(template.category)}20` }}
                >
                  <Database size={20} style={{ color: getCategoryColor(template.category) }} />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-text-primary">{template.name}</h3>
                  <span
                    className="inline-block px-2 py-0.5 rounded text-xs font-medium mt-1"
                    style={{
                      backgroundColor: `${getCategoryColor(template.category)}20`,
                      color: getCategoryColor(template.category),
                    }}
                  >
                    {template.category}
                  </span>
                </div>
              </div>

              {/* Description */}
              <p className="text-sm text-text-secondary mb-4 flex-1">
                {template.description}
              </p>

              {/* Required Fields */}
              <div className="mb-3">
                <p className="text-xs text-text-muted mb-2">Required fields:</p>
                <div className="flex flex-wrap gap-1">
                  {template.requiredFields.map((field) => (
                    <span
                      key={field}
                      className="px-2 py-0.5 bg-red-500/10 text-red-400 rounded text-xs"
                    >
                      {field}
                    </span>
                  ))}
                </div>
              </div>

              {/* Optional Fields */}
              <div className="mb-4">
                <p className="text-xs text-text-muted mb-2">Optional fields:</p>
                <div className="flex flex-wrap gap-1">
                  {template.optionalFields.map((field) => (
                    <span
                      key={field}
                      className="px-2 py-0.5 bg-white/[0.05] text-text-secondary rounded text-xs"
                    >
                      {field}
                    </span>
                  ))}
                </div>
              </div>

              {/* Last Import Info */}
              <div className="text-xs text-text-muted mb-4 pt-4 border-t border-white/[0.08]">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1">
                    <Clock size={12} />
                    Last import: {formatDateTime(template.lastImport)}
                  </span>
                  <span className="text-text-secondary">
                    {template.lastImportCount} records
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2">
                <Button
                  variant="secondary"
                  size="sm"
                  leftIcon={<Download size={14} />}
                  className="flex-1"
                >
                  Download Template
                </Button>
                <Button
                  size="sm"
                  leftIcon={<Upload size={14} />}
                  className="flex-1"
                  onClick={() => startImport(template)}
                >
                  Start Import
                </Button>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Import Wizard Modal */}
      {showWizard && selectedTemplate && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white/[0.03] backdrop-blur-xl rounded-xl max-w-3xl w-full max-h-[90vh] overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="p-6 border-b border-white/[0.08]">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-text-primary">
                  Import: {selectedTemplate.name}
                </h2>
                <button
                  onClick={closeWizard}
                  className="p-2 hover:bg-white/[0.05] rounded-lg"
                >
                  <X size={20} className="text-text-secondary" />
                </button>
              </div>

              {/* Steps */}
              <div className="flex items-center justify-between">
                {steps.map((step, index) => (
                  <div key={step.key} className="flex items-center">
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                          getStepIndex(currentStep) >= index
                            ? 'bg-accent-primary text-white'
                            : 'bg-white/[0.05] text-text-muted'
                        }`}
                      >
                        {getStepIndex(currentStep) > index ? (
                          <Check size={16} />
                        ) : (
                          step.number
                        )}
                      </div>
                      <span
                        className={`text-sm ${
                          getStepIndex(currentStep) >= index
                            ? 'text-text-primary'
                            : 'text-text-muted'
                        }`}
                      >
                        {step.label}
                      </span>
                    </div>
                    {index < steps.length - 1 && (
                      <div
                        className={`w-16 h-0.5 mx-4 ${
                          getStepIndex(currentStep) > index
                            ? 'bg-accent-primary'
                            : 'bg-white/[0.05]'
                        }`}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6">
              {/* Step 1: Upload */}
              {currentStep === 'upload' && (
                <div className="space-y-6">
                  <div
                    onDrop={handleDrop}
                    onDragOver={(e) => e.preventDefault()}
                    className={`border-2 border-dashed rounded-xl p-12 text-center transition-colors ${
                      uploadedFile
                        ? 'border-green-500 bg-green-500/5'
                        : 'border-white/[0.08] hover:border-accent-primary'
                    }`}
                  >
                    {uploadedFile ? (
                      <div>
                        <CheckCircle size={48} className="mx-auto mb-4 text-green-500" />
                        <p className="text-lg font-medium text-text-primary mb-2">
                          {uploadedFile.name}
                        </p>
                        <p className="text-sm text-text-muted mb-4">
                          {(uploadedFile.size / 1024).toFixed(1)} KB
                        </p>
                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={() => setUploadedFile(null)}
                        >
                          Remove
                        </Button>
                      </div>
                    ) : (
                      <div>
                        <Upload size={48} className="mx-auto mb-4 text-text-muted" />
                        <p className="text-lg font-medium text-text-primary mb-2">
                          Drag and drop your file here
                        </p>
                        <p className="text-sm text-text-muted mb-4">
                          or click to browse
                        </p>
                        <label className="cursor-pointer">
                          <input
                            type="file"
                            accept=".xlsx,.csv"
                            onChange={handleFileUpload}
                            className="hidden"
                          />
                          <span className="inline-flex items-center justify-center px-4 py-2 bg-white/[0.05] border border-white/[0.08] rounded-lg text-sm font-medium text-text-secondary hover:bg-white/[0.03] backdrop-blur-xl transition-colors">
                            Browse Files
                          </span>
                        </label>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-4 text-sm text-text-muted">
                    <div className="flex items-center gap-2">
                      <FileSpreadsheet size={16} className="text-green-400" />
                      <span>.xlsx</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FileText size={16} className="text-blue-400" />
                      <span>.csv</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Map Fields */}
              {currentStep === 'map' && (
                <div className="space-y-4">
                  <p className="text-sm text-text-secondary mb-4">
                    Map the columns from your file to the target fields
                  </p>

                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="bg-white/[0.05]">
                          <th className="px-4 py-3 text-left text-xs font-semibold text-text-secondary uppercase">
                            Source Column
                          </th>
                          <th className="px-4 py-3 text-center text-xs font-semibold text-text-secondary uppercase">
                            →
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-semibold text-text-secondary uppercase">
                            Target Field
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-semibold text-text-secondary uppercase">
                            Sample Data
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-semibold text-text-secondary uppercase">
                            Status
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {mockFileColumns.map((column, index) => (
                          <tr key={column} className="border-b border-white/[0.08]">
                            <td className="px-4 py-3 text-sm text-text-primary">
                              {column}
                            </td>
                            <td className="px-4 py-3 text-center">
                              <ArrowRight size={16} className="text-text-muted mx-auto" />
                            </td>
                            <td className="px-4 py-3">
                              <select className="w-full px-3 py-1.5 bg-white/[0.05] border border-white/[0.08] rounded-lg text-sm text-text-primary focus:outline-none focus:border-accent-primary">
                                <option>
                                  {selectedTemplate.requiredFields[index] ||
                                    selectedTemplate.optionalFields[index - selectedTemplate.requiredFields.length] ||
                                    '-- Select --'}
                                </option>
                                {[...selectedTemplate.requiredFields, ...selectedTemplate.optionalFields].map(
                                  (field) => (
                                    <option key={field} value={field}>
                                      {field}
                                    </option>
                                  )
                                )}
                                <option value="">-- Skip --</option>
                              </select>
                            </td>
                            <td className="px-4 py-3 text-sm text-text-muted">
                              Sample value {index + 1}
                            </td>
                            <td className="px-4 py-3">
                              <CheckCircle size={16} className="text-green-500" />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Step 3: Validate */}
              {currentStep === 'validate' && !isProcessing && (
                <div className="space-y-6">
                  <div className="text-center mb-6">
                    <p className="text-lg font-medium text-text-primary mb-2">
                      Validation Complete
                    </p>
                    <p className="text-sm text-text-secondary">
                      {mockValidation.total} records found in your file
                    </p>
                  </div>

                  {/* Validation Summary */}
                  <div className="grid grid-cols-3 gap-4">
                    <Card className="p-4 text-center border-l-4 border-green-500">
                      <p className="text-2xl font-bold text-green-500">{mockValidation.valid}</p>
                      <p className="text-sm text-text-secondary">Valid Records</p>
                    </Card>
                    <Card className="p-4 text-center border-l-4 border-orange-500">
                      <p className="text-2xl font-bold text-orange-500">{mockValidation.warnings}</p>
                      <p className="text-sm text-text-secondary">With Warnings</p>
                    </Card>
                    <Card className="p-4 text-center border-l-4 border-red-500">
                      <p className="text-2xl font-bold text-red-500">{mockValidation.invalid}</p>
                      <p className="text-sm text-text-secondary">Invalid Records</p>
                    </Card>
                  </div>

                  {/* Error Details */}
                  {mockValidation.invalid > 0 && (
                    <Card className="p-4">
                      <div className="flex items-center gap-2 mb-3">
                        <AlertCircle size={16} className="text-red-500" />
                        <span className="text-sm font-medium text-text-primary">
                          Invalid Records Details
                        </span>
                      </div>
                      <div className="space-y-2">
                        <div className="p-3 bg-red-500/10 rounded-lg text-sm">
                          <p className="text-red-400">Row 45: Missing required field "Email"</p>
                        </div>
                        <div className="p-3 bg-red-500/10 rounded-lg text-sm">
                          <p className="text-red-400">Row 89: Invalid email format "john.doe"</p>
                        </div>
                        <div className="p-3 bg-red-500/10 rounded-lg text-sm">
                          <p className="text-red-400">Row 127: Duplicate entry for "jane@company.com"</p>
                        </div>
                      </div>
                    </Card>
                  )}

                  {/* Options */}
                  <div className="space-y-2">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        defaultChecked
                        className="w-4 h-4 rounded border-white/[0.08] text-accent-primary focus:ring-accent-primary"
                      />
                      <span className="text-sm text-text-secondary">Skip invalid records</span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        className="w-4 h-4 rounded border-white/[0.08] text-accent-primary focus:ring-accent-primary"
                      />
                      <span className="text-sm text-text-secondary">Update existing records</span>
                    </label>
                  </div>
                </div>
              )}

              {/* Step 4: Complete */}
              {currentStep === 'complete' && !isProcessing && (
                <div className="text-center py-8">
                  <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-green-500/20 flex items-center justify-center">
                    <CheckCircle size={40} className="text-green-500" />
                  </div>
                  <h3 className="text-xl font-semibold text-text-primary mb-2">
                    Import Successful!
                  </h3>
                  <p className="text-text-secondary mb-8">
                    Your data has been imported successfully
                  </p>

                  <div className="grid grid-cols-3 gap-4 max-w-md mx-auto mb-8">
                    <div className="p-4 bg-white/[0.05] rounded-lg">
                      <p className="text-2xl font-bold text-green-500">{mockValidation.valid}</p>
                      <p className="text-xs text-text-muted">Imported</p>
                    </div>
                    <div className="p-4 bg-white/[0.05] rounded-lg">
                      <p className="text-2xl font-bold text-blue-500">0</p>
                      <p className="text-xs text-text-muted">Updated</p>
                    </div>
                    <div className="p-4 bg-white/[0.05] rounded-lg">
                      <p className="text-2xl font-bold text-red-500">{mockValidation.invalid}</p>
                      <p className="text-xs text-text-muted">Skipped</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-center gap-3">
                    <Button variant="secondary" leftIcon={<Eye size={14} />}>
                      View Imported Data
                    </Button>
                    <Button leftIcon={<Upload size={14} />} onClick={closeWizard}>
                      Import Another
                    </Button>
                  </div>
                </div>
              )}

              {/* Processing State */}
              {isProcessing && (
                <div className="text-center py-12">
                  <Loader2 size={48} className="mx-auto mb-4 text-accent-primary animate-spin" />
                  <p className="text-lg font-medium text-text-primary mb-2">
                    {currentStep === 'map' ? 'Validating data...' : 'Importing records...'}
                  </p>
                  <p className="text-sm text-text-muted">Please wait</p>
                </div>
              )}
            </div>

            {/* Footer */}
            {currentStep !== 'complete' && !isProcessing && (
              <div className="p-6 border-t border-white/[0.08] bg-white/[0.05] flex justify-between">
                <Button
                  variant="secondary"
                  leftIcon={<ArrowLeft size={14} />}
                  onClick={prevStep}
                  disabled={currentStep === 'upload'}
                >
                  Back
                </Button>
                <Button
                  rightIcon={<ArrowRight size={14} />}
                  onClick={nextStep}
                  disabled={currentStep === 'upload' && !uploadedFile}
                >
                  {currentStep === 'validate' ? 'Import' : 'Next'}
                </Button>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </div>
  );
};
