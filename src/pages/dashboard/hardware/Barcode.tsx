import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  Search,
  QrCode,
  Printer,
  Download,
  Package,
  Tag,
  Copy,
  CheckCircle,
  Settings,
  Plus,
  Grid,
  List,
} from 'lucide-react';
import { PageHeader, Card, StatsCard, Input, Button } from '@/components/common';
import {
  products,
  categories,
  formatCurrency,
} from '@/data/hardware/hardwareData';
import { useTranslation } from 'react-i18next';

export const Barcode = () => {
  const { t } = useTranslation('common');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [copiedBarcode, setCopiedBarcode] = useState<string | null>(null);

  const stats = useMemo(() => ({
    totalProducts: products.length,
    withBarcode: products.filter((p) => p.barcode).length,
    withoutBarcode: products.filter((p) => !p.barcode).length,
    selectedCount: selectedProducts.length,
  }), [selectedProducts.length]);

  const filteredProducts = useMemo(() => {
    let filtered = [...products];

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.sku.toLowerCase().includes(query) ||
          p.barcode?.toLowerCase().includes(query)
      );
    }

    if (selectedCategory !== 'all') {
      filtered = filtered.filter((p) => p.categoryId === selectedCategory);
    }

    return filtered;
  }, [searchQuery, selectedCategory]);

  const mainCategories = categories.filter((c) => !c.parentId);

  const toggleProductSelection = (productId: string) => {
    setSelectedProducts((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  const selectAll = () => {
    setSelectedProducts(filteredProducts.map((p) => p.id));
  };

  const clearSelection = () => {
    setSelectedProducts([]);
  };

  const copyBarcode = (barcode: string) => {
    navigator.clipboard.writeText(barcode);
    setCopiedBarcode(barcode);
    setTimeout(() => setCopiedBarcode(null), 2000);
  };

  // Generate a simple visual barcode representation
  const generateBarcodeVisual = (barcode: string) => {
    const bars = [];
    for (let i = 0; i < barcode.length; i++) {
      const char = barcode.charCodeAt(i);
      bars.push(
        <div
          key={i}
          className="bg-white"
          style={{
            width: char % 2 === 0 ? '2px' : '1px',
            height: '40px',
          }}
        />,
        <div
          key={`s${i}`}
          className="bg-transparent"
          style={{ width: '1px', height: '40px' }}
        />
      );
    }
    return bars;
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title={t('hardware.barcodeManagement', 'Barcode Management')}
        subtitle="Generate and print product barcodes"
        actions={
          <div className="flex gap-2">
            <Button variant="secondary" leftIcon={<Settings size={16} />}>
              Settings
            </Button>
            <Button leftIcon={<Plus size={16} />}>Generate Barcodes</Button>
          </div>
        }
      />

      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatsCard
          title="Total Products"
          value={stats.totalProducts.toString()}
          icon={Package}
          iconColor="#f59e0b"
        />
        <StatsCard
          title="With Barcode"
          value={stats.withBarcode.toString()}
          icon={QrCode}
          iconColor="#10b981"
        />
        <StatsCard
          title="Without Barcode"
          value={stats.withoutBarcode.toString()}
          icon={Tag}
          iconColor="#ef4444"
        />
        <StatsCard
          title="Selected"
          value={stats.selectedCount.toString()}
          icon={CheckCircle}
          iconColor="#6366f1"
        />
      </div>

      {/* Selection Actions */}
      {selectedProducts.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card className="p-4 bg-amber-500/10 border-amber-500/30">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <CheckCircle size={20} className="text-amber-400" />
                <span className="text-text-primary">
                  {selectedProducts.length} product{selectedProducts.length !== 1 ? 's' : ''} selected
                </span>
              </div>
              <div className="flex gap-2">
                <Button variant="secondary" size="sm" onClick={clearSelection}>
                  Clear Selection
                </Button>
                <Button variant="secondary" size="sm" leftIcon={<Download size={14} />}>
                  Export Labels
                </Button>
                <Button size="sm" leftIcon={<Printer size={14} />}>
                  Print Labels
                </Button>
              </div>
            </div>
          </Card>
        </motion.div>
      )}

      {/* Filter Bar */}
      <Card className="p-4">
        <div className="flex flex-wrap gap-4 items-center justify-between">
          <div className="flex flex-wrap gap-4 items-center flex-1">
            <div className="flex-1 min-w-[200px] max-w-md">
              <Input
                placeholder="Search by name, SKU, or barcode..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                leftIcon={<Search size={16} />}
              />
            </div>

            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2 bg-white/[0.05] border border-white/[0.08] rounded-lg text-sm text-text-primary focus:outline-none focus:border-accent-primary cursor-pointer"
            >
              <option value="all">All Categories</option>
              {mainCategories.map((cat) => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>

            <Button variant="secondary" size="sm" onClick={selectAll}>
              Select All ({filteredProducts.length})
            </Button>
          </div>

          <div className="flex items-center gap-2 border border-white/[0.08] rounded-lg p-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded transition-all cursor-pointer ${
                viewMode === 'grid' ? 'bg-amber-500/20 text-amber-400' : 'text-text-muted hover:text-text-primary'
              }`}
            >
              <Grid size={16} />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded transition-all cursor-pointer ${
                viewMode === 'list' ? 'bg-amber-500/20 text-amber-400' : 'text-text-muted hover:text-text-primary'
              }`}
            >
              <List size={16} />
            </button>
          </div>
        </div>
      </Card>

      {/* Products Grid/List */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.02 }}
            >
              <Card
                className={`p-4 cursor-pointer transition-all ${
                  selectedProducts.includes(product.id)
                    ? 'border-amber-500/50 bg-amber-500/5'
                    : 'hover:border-white/[0.15]'
                }`}
                onClick={() => toggleProductSelection(product.id)}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded bg-amber-500/20 flex items-center justify-center">
                      <Package size={16} className="text-amber-400" />
                    </div>
                    <div>
                      <h4 className="font-medium text-text-primary text-sm line-clamp-1">{product.name}</h4>
                      <p className="text-xs text-text-muted">{product.sku}</p>
                    </div>
                  </div>
                  <div
                    className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
                      selectedProducts.includes(product.id)
                        ? 'bg-amber-500 border-amber-500'
                        : 'border-white/[0.2]'
                    }`}
                  >
                    {selectedProducts.includes(product.id) && (
                      <CheckCircle size={12} className="text-white" />
                    )}
                  </div>
                </div>

                {/* Barcode Display */}
                <div className="bg-white rounded-lg p-3 mb-3">
                  {product.barcode ? (
                    <div className="text-center">
                      <div className="flex justify-center gap-px mb-2">
                        {generateBarcodeVisual(product.barcode)}
                      </div>
                      <p className="text-black font-mono text-sm">{product.barcode}</p>
                    </div>
                  ) : (
                    <div className="text-center py-4">
                      <QrCode size={24} className="mx-auto mb-2 text-gray-400" />
                      <p className="text-gray-500 text-xs">No barcode</p>
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-amber-400 font-medium">
                    {formatCurrency(product.retailPrice)}
                  </span>
                  {product.barcode && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        copyBarcode(product.barcode!);
                      }}
                      className="p-1.5 rounded hover:bg-white/[0.1] text-text-muted hover:text-text-primary transition-colors cursor-pointer"
                    >
                      {copiedBarcode === product.barcode ? (
                        <CheckCircle size={14} className="text-emerald-400" />
                      ) : (
                        <Copy size={14} />
                      )}
                    </button>
                  )}
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      ) : (
        <Card>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/[0.08]">
                  <th className="text-left py-3 px-4 text-sm font-medium text-text-secondary w-12">
                    <input
                      type="checkbox"
                      checked={selectedProducts.length === filteredProducts.length && filteredProducts.length > 0}
                      onChange={(e) => e.target.checked ? selectAll() : clearSelection()}
                      className="cursor-pointer"
                    />
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-text-secondary">Product</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-text-secondary">SKU</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-text-secondary">Barcode</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-text-secondary">Price</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-text-secondary">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-default">
                {filteredProducts.map((product, index) => (
                  <motion.tr
                    key={product.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.02 }}
                    className={`hover:bg-white/[0.03] transition-colors ${
                      selectedProducts.includes(product.id) ? 'bg-amber-500/5' : ''
                    }`}
                  >
                    <td className="py-3 px-4">
                      <input
                        type="checkbox"
                        checked={selectedProducts.includes(product.id)}
                        onChange={() => toggleProductSelection(product.id)}
                        className="cursor-pointer"
                      />
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded bg-amber-500/20 flex items-center justify-center">
                          <Package size={14} className="text-amber-400" />
                        </div>
                        <span className="font-medium text-text-primary">{product.name}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-text-muted font-mono text-sm">{product.sku}</td>
                    <td className="py-3 px-4">
                      {product.barcode ? (
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-text-primary">{product.barcode}</span>
                          <button
                            onClick={() => copyBarcode(product.barcode!)}
                            className="p-1 rounded hover:bg-white/[0.1] text-text-muted cursor-pointer"
                          >
                            {copiedBarcode === product.barcode ? (
                              <CheckCircle size={14} className="text-emerald-400" />
                            ) : (
                              <Copy size={14} />
                            )}
                          </button>
                        </div>
                      ) : (
                        <span className="text-text-muted text-sm">No barcode</span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-amber-400 font-medium">
                      {formatCurrency(product.retailPrice)}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex gap-1">
                        <Button variant="ghost" size="sm" leftIcon={<Printer size={14} />}>
                          Print
                        </Button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {filteredProducts.length === 0 && (
        <Card className="p-12 text-center">
          <Package size={48} className="mx-auto mb-4 text-text-muted" />
          <p className="text-text-secondary">No products found</p>
        </Card>
      )}
    </div>
  );
};
