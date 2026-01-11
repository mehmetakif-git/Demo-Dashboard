import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Plus,
  ChevronRight,
  ChevronDown,
  Wrench,
  Zap,
  CircleDot,
  Droplets,
  Plug,
  Paintbrush,
  HardHat,
  Layers,
  Edit,
  Trash2,
  Package,
} from 'lucide-react';
import { PageHeader, Card, Button } from '@/components/common';
import { categories } from '@/data/hardware/hardwareData';

const iconMap: Record<string, React.ElementType> = {
  Wrench,
  Zap,
  CircleDot,
  Droplets,
  Plug,
  Paintbrush,
  HardHat,
  Layers,
};

export const Categories = () => {
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories((prev) =>
      prev.includes(categoryId) ? prev.filter((id) => id !== categoryId) : [...prev, categoryId]
    );
  };

  const isExpanded = (categoryId: string) => expandedCategories.includes(categoryId);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Categories"
        subtitle="Manage product categories and hierarchy"
        actions={<Button leftIcon={<Plus size={16} />}>Add Category</Button>}
      />

      {/* Category Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <p className="text-sm text-text-muted mb-1">Main Categories</p>
          <p className="text-2xl font-semibold text-text-primary">{categories.length}</p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-text-muted mb-1">Subcategories</p>
          <p className="text-2xl font-semibold text-text-primary">
            {categories.reduce((sum, cat) => sum + (cat.children?.length || 0), 0)}
          </p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-text-muted mb-1">Total Products</p>
          <p className="text-2xl font-semibold text-amber-400">
            {categories.reduce((sum, cat) => sum + cat.productCount, 0)}
          </p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-text-muted mb-1">Avg Products/Category</p>
          <p className="text-2xl font-semibold text-text-primary">
            {Math.round(categories.reduce((sum, cat) => sum + cat.productCount, 0) / categories.length)}
          </p>
        </Card>
      </div>

      {/* Categories Tree */}
      <Card className="p-6">
        <div className="space-y-2">
          {categories.map((category, index) => {
            const Icon = iconMap[category.icon] || Package;
            const hasChildren = category.children && category.children.length > 0;
            const expanded = isExpanded(category.id);

            return (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                {/* Parent Category */}
                <div
                  className={`flex items-center justify-between p-4 rounded-lg transition-all ${
                    expanded ? 'bg-amber-500/10 border border-amber-500/20' : 'bg-white/[0.03] hover:bg-white/[0.05]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {hasChildren ? (
                      <button
                        onClick={() => toggleCategory(category.id)}
                        className="p-1 hover:bg-white/[0.1] rounded cursor-pointer"
                      >
                        {expanded ? (
                          <ChevronDown size={18} className="text-text-muted" />
                        ) : (
                          <ChevronRight size={18} className="text-text-muted" />
                        )}
                      </button>
                    ) : (
                      <div className="w-7" />
                    )}
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center"
                      style={{ backgroundColor: 'rgba(245, 158, 11, 0.2)' }}
                    >
                      <Icon size={20} className="text-amber-400" />
                    </div>
                    <div>
                      <p className="font-medium text-text-primary">{category.name}</p>
                      <p className="text-sm text-text-muted">
                        {category.productCount} products
                        {hasChildren && ` · ${category.children?.length} subcategories`}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm" leftIcon={<Plus size={14} />}>
                      Add Sub
                    </Button>
                    <Button variant="ghost" size="sm" leftIcon={<Edit size={14} />}>
                      Edit
                    </Button>
                    <Button variant="ghost" size="sm" leftIcon={<Trash2 size={14} />} className="text-red-400 hover:text-red-300">
                      Delete
                    </Button>
                  </div>
                </div>

                {/* Subcategories */}
                {hasChildren && expanded && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="ml-12 mt-2 space-y-2"
                  >
                    {category.children?.map((subcat) => (
                      <div
                        key={subcat.id}
                        className="flex items-center justify-between p-3 bg-white/[0.02] rounded-lg hover:bg-white/[0.05] transition-all"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-white/[0.05] flex items-center justify-center">
                            <Package size={14} className="text-text-muted" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-text-primary">{subcat.name}</p>
                            <p className="text-xs text-text-muted">{subcat.productCount} products</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="sm" leftIcon={<Edit size={12} />} />
                          <Button variant="ghost" size="sm" leftIcon={<Trash2 size={12} />} className="text-red-400" />
                        </div>
                      </div>
                    ))}
                  </motion.div>
                )}
              </motion.div>
            );
          })}
        </div>
      </Card>
    </div>
  );
};
