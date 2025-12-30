import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  Upload,
  FileSpreadsheet,
  Plus,
  Trash2,
  Download,
  Check,
  AlertCircle,
  FileText,
  Play,
  Pause,
  QrCode,
  Folder,
} from 'lucide-react';
import { PageHeader, Card, Button, Input } from '@/components/common';
import { qrFolders, qrCodeTypes } from '@/data/qrCodeData';

interface BulkQRItem {
  id: string;
  name: string;
  type: string;
  content: string;
  folder: string;
  status: 'pending' | 'processing' | 'completed' | 'error';
  error?: string;
}

export const BulkCreate = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'upload' | 'manual'>('upload');
  const [items, setItems] = useState<BulkQRItem[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedFolder, setSelectedFolder] = useState('folder-1');
  const [selectedType, setSelectedType] = useState('url');
  const [isDragging, setIsDragging] = useState(false);

  const handleFileUpload = (_file: File) => {
    // Mock file parsing - in real app would parse CSV/Excel
    const mockItems: BulkQRItem[] = [
      { id: '1', name: 'Website QR 1', type: 'url', content: 'https://example1.com', folder: selectedFolder, status: 'pending' },
      { id: '2', name: 'Website QR 2', type: 'url', content: 'https://example2.com', folder: selectedFolder, status: 'pending' },
      { id: '3', name: 'Website QR 3', type: 'url', content: 'https://example3.com', folder: selectedFolder, status: 'pending' },
      { id: '4', name: 'Website QR 4', type: 'url', content: 'https://example4.com', folder: selectedFolder, status: 'pending' },
      { id: '5', name: 'Website QR 5', type: 'url', content: 'https://example5.com', folder: selectedFolder, status: 'pending' },
    ];
    setItems(mockItems);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  const addManualItem = () => {
    const newItem: BulkQRItem = {
      id: Date.now().toString(),
      name: '',
      type: selectedType,
      content: '',
      folder: selectedFolder,
      status: 'pending',
    };
    setItems([...items, newItem]);
  };

  const updateItem = (id: string, field: keyof BulkQRItem, value: string) => {
    setItems(items.map(item =>
      item.id === id ? { ...item, [field]: value } : item
    ));
  };

  const removeItem = (id: string) => {
    setItems(items.filter(item => item.id !== id));
  };

  const processItems = async () => {
    setIsProcessing(true);
    for (let i = 0; i < items.length; i++) {
      setItems(prev => prev.map((item, idx) =>
        idx === i ? { ...item, status: 'processing' } : item
      ));
      await new Promise(resolve => setTimeout(resolve, 500));
      setItems(prev => prev.map((item, idx) =>
        idx === i ? { ...item, status: Math.random() > 0.1 ? 'completed' : 'error', error: Math.random() > 0.1 ? undefined : 'Invalid URL format' } : item
      ));
    }
    setIsProcessing(false);
  };

  const completedCount = items.filter(i => i.status === 'completed').length;
  const errorCount = items.filter(i => i.status === 'error').length;
  const pendingCount = items.filter(i => i.status === 'pending').length;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Bulk Create QR Codes"
        subtitle="Create multiple QR codes at once"
        actions={
          <div className="flex gap-2">
            <Button
              variant="outline"
              leftIcon={<ArrowLeft size={16} />}
              onClick={() => navigate('/dashboard/qr-codes/list')}
            >
              Back to List
            </Button>
            <Button variant="outline" leftIcon={<Download size={16} />}>
              Download Template
            </Button>
          </div>
        }
      />

      {/* Tabs */}
      <Card className="p-2">
        <div className="flex gap-2">
          <button
            onClick={() => setActiveTab('upload')}
            className={`flex-1 py-3 px-4 rounded-lg text-sm font-medium transition-all ${
              activeTab === 'upload'
                ? 'bg-accent-primary text-white'
                : 'text-text-secondary hover:bg-background-tertiary'
            }`}
          >
            <div className="flex items-center justify-center gap-2">
              <Upload size={18} />
              Upload File
            </div>
          </button>
          <button
            onClick={() => setActiveTab('manual')}
            className={`flex-1 py-3 px-4 rounded-lg text-sm font-medium transition-all ${
              activeTab === 'manual'
                ? 'bg-accent-primary text-white'
                : 'text-text-secondary hover:bg-background-tertiary'
            }`}
          >
            <div className="flex items-center justify-center gap-2">
              <FileText size={18} />
              Manual Entry
            </div>
          </button>
        </div>
      </Card>

      {/* Settings */}
      <Card className="p-6">
        <h3 className="font-semibold text-text-primary mb-4">Default Settings</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-2">Default Type</label>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full px-3 py-2 bg-background-tertiary border border-border-default rounded-lg text-sm text-text-primary focus:outline-none focus:border-accent-primary"
            >
              {qrCodeTypes.map(type => (
                <option key={type.id} value={type.id}>{type.label}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-2">Default Folder</label>
            <select
              value={selectedFolder}
              onChange={(e) => setSelectedFolder(e.target.value)}
              className="w-full px-3 py-2 bg-background-tertiary border border-border-default rounded-lg text-sm text-text-primary focus:outline-none focus:border-accent-primary"
            >
              {qrFolders.map(folder => (
                <option key={folder.id} value={folder.id}>{folder.name}</option>
              ))}
            </select>
          </div>
          <div className="flex items-end">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                defaultChecked
                className="w-4 h-4 rounded border-border-default bg-background-tertiary text-accent-primary focus:ring-accent-primary"
              />
              <span className="text-sm text-text-secondary">Create as Dynamic QR Codes</span>
            </label>
          </div>
        </div>
      </Card>

      {/* Upload Area */}
      {activeTab === 'upload' && items.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div
            className={`p-12 border-2 border-dashed rounded-xl bg-background-secondary transition-all ${
              isDragging ? 'border-accent-primary bg-accent-primary/5' : 'border-border-default'
            }`}
            onDragOver={(e: React.DragEvent) => { e.preventDefault(); setIsDragging(true); }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
          >
            <div className="text-center">
              <FileSpreadsheet size={48} className="mx-auto mb-4 text-text-muted" />
              <h3 className="text-lg font-semibold text-text-primary mb-2">Upload your file</h3>
              <p className="text-text-secondary mb-4">
                Drag and drop your CSV or Excel file here, or click to browse
              </p>
              <div className="flex items-center justify-center gap-4 mb-6">
                <span className="px-3 py-1 bg-background-tertiary rounded text-sm text-text-secondary">.csv</span>
                <span className="px-3 py-1 bg-background-tertiary rounded text-sm text-text-secondary">.xlsx</span>
                <span className="px-3 py-1 bg-background-tertiary rounded text-sm text-text-secondary">.xls</span>
              </div>
              <input
                type="file"
                accept=".csv,.xlsx,.xls"
                onChange={(e) => e.target.files?.[0] && handleFileUpload(e.target.files[0])}
                className="hidden"
                id="file-upload"
              />
              <label htmlFor="file-upload">
                <span className="inline-flex items-center gap-2 px-4 py-2 bg-accent-primary text-white rounded-lg font-medium cursor-pointer hover:bg-accent-primary/90 transition-colors">
                  <Upload size={16} />
                  Browse Files
                </span>
              </label>
            </div>
          </div>
        </motion.div>
      )}

      {/* Manual Entry */}
      {activeTab === 'manual' && items.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card className="p-12 text-center">
            <Plus size={48} className="mx-auto mb-4 text-text-muted" />
            <h3 className="text-lg font-semibold text-text-primary mb-2">Add QR Codes Manually</h3>
            <p className="text-text-secondary mb-4">
              Click the button below to start adding QR codes one by one
            </p>
            <Button leftIcon={<Plus size={16} />} onClick={addManualItem}>
              Add First QR Code
            </Button>
          </Card>
        </motion.div>
      )}

      {/* Items List */}
      {items.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {/* Progress Summary */}
          <Card className="p-4 mb-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <QrCode size={18} className="text-text-muted" />
                  <span className="text-sm text-text-secondary">Total: {items.length}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check size={18} className="text-green-400" />
                  <span className="text-sm text-green-400">Completed: {completedCount}</span>
                </div>
                <div className="flex items-center gap-2">
                  <AlertCircle size={18} className="text-red-400" />
                  <span className="text-sm text-red-400">Errors: {errorCount}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Folder size={18} className="text-yellow-400" />
                  <span className="text-sm text-yellow-400">Pending: {pendingCount}</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {activeTab === 'manual' && (
                  <Button variant="outline" size="sm" leftIcon={<Plus size={14} />} onClick={addManualItem}>
                    Add More
                  </Button>
                )}
                <Button
                  size="sm"
                  leftIcon={isProcessing ? <Pause size={14} /> : <Play size={14} />}
                  onClick={processItems}
                  disabled={isProcessing || pendingCount === 0}
                >
                  {isProcessing ? 'Processing...' : 'Start Processing'}
                </Button>
              </div>
            </div>
            {isProcessing && (
              <div className="mt-4">
                <div className="h-2 bg-background-tertiary rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-accent-primary"
                    initial={{ width: 0 }}
                    animate={{ width: `${((completedCount + errorCount) / items.length) * 100}%` }}
                  />
                </div>
              </div>
            )}
          </Card>

          {/* Items Table */}
          <Card>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border-default">
                    <th className="text-left py-3 px-4 text-sm font-medium text-text-secondary w-12">#</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-text-secondary">Name</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-text-secondary">Type</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-text-secondary">Content</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-text-secondary">Folder</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-text-secondary">Status</th>
                    <th className="text-right py-3 px-4 text-sm font-medium text-text-secondary w-20">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border-default">
                  {items.map((item, index) => (
                    <motion.tr
                      key={item.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.03 }}
                      className={`${
                        item.status === 'processing' ? 'bg-yellow-500/5' :
                        item.status === 'completed' ? 'bg-green-500/5' :
                        item.status === 'error' ? 'bg-red-500/5' :
                        'hover:bg-background-tertiary'
                      } transition-colors`}
                    >
                      <td className="py-3 px-4 text-sm text-text-muted">{index + 1}</td>
                      <td className="py-3 px-4">
                        {activeTab === 'manual' && item.status === 'pending' ? (
                          <Input
                            value={item.name}
                            onChange={(e) => updateItem(item.id, 'name', e.target.value)}
                            placeholder="QR Code Name"
                            className="w-full"
                          />
                        ) : (
                          <span className="text-sm text-text-primary">{item.name}</span>
                        )}
                      </td>
                      <td className="py-3 px-4">
                        {activeTab === 'manual' && item.status === 'pending' ? (
                          <select
                            value={item.type}
                            onChange={(e) => updateItem(item.id, 'type', e.target.value)}
                            className="px-2 py-1 bg-background-tertiary border border-border-default rounded text-sm text-text-primary"
                          >
                            {qrCodeTypes.map(type => (
                              <option key={type.id} value={type.id}>{type.label}</option>
                            ))}
                          </select>
                        ) : (
                          <span className="text-sm text-text-secondary capitalize">{item.type}</span>
                        )}
                      </td>
                      <td className="py-3 px-4">
                        {activeTab === 'manual' && item.status === 'pending' ? (
                          <Input
                            value={item.content}
                            onChange={(e) => updateItem(item.id, 'content', e.target.value)}
                            placeholder="https://example.com"
                            className="w-full"
                          />
                        ) : (
                          <span className="text-sm text-text-secondary truncate max-w-xs block">{item.content}</span>
                        )}
                      </td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-0.5 bg-background-tertiary rounded text-xs text-text-secondary">
                          {qrFolders.find(f => f.id === item.folder)?.name || 'None'}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        {item.status === 'pending' && (
                          <span className="px-2 py-0.5 bg-slate-500/20 text-slate-400 rounded text-xs font-medium">
                            Pending
                          </span>
                        )}
                        {item.status === 'processing' && (
                          <span className="px-2 py-0.5 bg-yellow-500/20 text-yellow-400 rounded text-xs font-medium flex items-center gap-1 w-fit">
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                            >
                              <Folder size={12} />
                            </motion.div>
                            Processing
                          </span>
                        )}
                        {item.status === 'completed' && (
                          <span className="px-2 py-0.5 bg-green-500/20 text-green-400 rounded text-xs font-medium flex items-center gap-1 w-fit">
                            <Check size={12} />
                            Completed
                          </span>
                        )}
                        {item.status === 'error' && (
                          <div>
                            <span className="px-2 py-0.5 bg-red-500/20 text-red-400 rounded text-xs font-medium flex items-center gap-1 w-fit">
                              <AlertCircle size={12} />
                              Error
                            </span>
                            {item.error && (
                              <p className="text-xs text-red-400 mt-1">{item.error}</p>
                            )}
                          </div>
                        )}
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center justify-end">
                          {item.status === 'pending' && (
                            <button
                              onClick={() => removeItem(item.id)}
                              className="p-2 hover:bg-background-secondary rounded text-text-secondary hover:text-red-400"
                            >
                              <Trash2 size={14} />
                            </button>
                          )}
                          {item.status === 'error' && (
                            <button
                              onClick={() => setItems(items.map(i => i.id === item.id ? { ...i, status: 'pending', error: undefined } : i))}
                              className="p-2 hover:bg-background-secondary rounded text-text-secondary hover:text-yellow-400"
                            >
                              <Play size={14} />
                            </button>
                          )}
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </motion.div>
      )}

      {/* Help Section */}
      <Card className="p-6">
        <h3 className="font-semibold text-text-primary mb-4">File Format Guide</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="text-sm font-medium text-text-secondary mb-2">Required Columns</h4>
            <ul className="space-y-2 text-sm text-text-muted">
              <li className="flex items-center gap-2">
                <Check size={14} className="text-green-400" />
                <code className="px-1 bg-background-tertiary rounded">name</code> - QR code name
              </li>
              <li className="flex items-center gap-2">
                <Check size={14} className="text-green-400" />
                <code className="px-1 bg-background-tertiary rounded">content</code> - URL or content
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-medium text-text-secondary mb-2">Optional Columns</h4>
            <ul className="space-y-2 text-sm text-text-muted">
              <li className="flex items-center gap-2">
                <AlertCircle size={14} className="text-yellow-400" />
                <code className="px-1 bg-background-tertiary rounded">type</code> - url, vcard, wifi, etc.
              </li>
              <li className="flex items-center gap-2">
                <AlertCircle size={14} className="text-yellow-400" />
                <code className="px-1 bg-background-tertiary rounded">folder</code> - Folder ID
              </li>
            </ul>
          </div>
        </div>
      </Card>
    </div>
  );
};
