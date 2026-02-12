import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FolderTree,
  Plus,
  ChevronRight,
  ChevronDown,
  Edit,
  Trash2,
  Package,
} from 'lucide-react';
import { PageHeader, Card, Button } from '@/components/common';
import { categories } from '@/data/ecommerce/ecommerceData';
import { useTranslation } from 'react-i18next';

interface CategoryItemProps {
  category: typeof categories[0];
  level?: number;
}

const CategoryItem = ({ category, level = 0 }: CategoryItemProps) => {
  const { t } = useTranslation('ecommerce');
  const [isExpanded, setIsExpanded] = useState(true);
  const hasChildren = category.children && category.children.length > 0;

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        className={`flex items-center justify-between p-4 rounded-lg hover:bg-background-secondary/50 transition-colors cursor-pointer ${
          level > 0 ? 'ml-8 border-l-2 border-border-default' : ''
        }`}
        onClick={() => hasChildren && setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center gap-3">
          {hasChildren ? (
            <button className="text-text-muted hover:text-text-primary transition-colors">
              {isExpanded ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
            </button>
          ) : (
            <div className="w-[18px]" />
          )}
          <div className="w-10 h-10 rounded-lg bg-accent-primary/20 flex items-center justify-center">
            <FolderTree size={20} className="text-accent-primary" />
          </div>
          <div>
            <p className="font-medium text-text-primary">{category.name}</p>
            <p className="text-xs text-text-muted">{category.slug}</p>
          </div>
        </div>
        <div className="flex items-center gap-6">
          <div className="text-right">
            <p className="text-sm font-medium text-text-primary">{category.productCount}</p>
            <p className="text-xs text-text-muted">{t('categories.products')}</p>
          </div>
          <span className={`px-2 py-1 rounded text-xs font-medium ${
            category.status === 'active' ? 'bg-success/20 text-success' : 'bg-error/20 text-error'
          }`}>
            {category.status}
          </span>
          <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
            <Button variant="ghost" size="sm">
              <Plus size={16} />
            </Button>
            <Button variant="ghost" size="sm">
              <Edit size={16} />
            </Button>
            <Button variant="ghost" size="sm">
              <Trash2 size={16} />
            </Button>
          </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {isExpanded && hasChildren && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            {category.children?.map((child) => (
              <motion.div
                key={child.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center justify-between p-4 rounded-lg hover:bg-background-secondary/50 transition-colors ml-12 border-l-2 border-border-default"
              >
                <div className="flex items-center gap-3">
                  <div className="w-[18px]" />
                  <div className="w-8 h-8 rounded-lg bg-background-tertiary flex items-center justify-center">
                    <Package size={16} className="text-text-muted" />
                  </div>
                  <div>
                    <p className="font-medium text-text-primary">{child.name}</p>
                    <p className="text-xs text-text-muted">{child.slug}</p>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <p className="text-sm font-medium text-text-primary">{child.productCount}</p>
                    <p className="text-xs text-text-muted">{t('categories.products')}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm">
                      <Edit size={16} />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Trash2 size={16} />
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export const Categories = () => {
  const { t } = useTranslation('ecommerce');
  const totalCategories = categories.length + categories.reduce((acc, cat) => acc + (cat.children?.length || 0), 0);
  const totalProducts = categories.reduce((acc, cat) => acc + cat.productCount, 0);

  return (
    <div className="space-y-6">
      <PageHeader
        title={t('categories.title')}
        subtitle={t('categories.subtitle')}
        icon={FolderTree}
        actions={
          <Button>
            <Plus size={18} />
            {t('categories.addCategory')}
          </Button>
        }
      />

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <p className="text-sm text-text-secondary">{t('categories.totalCategories')}</p>
          <p className="text-2xl font-bold text-text-primary mt-1">{totalCategories}</p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-text-secondary">{t('categories.parentCategories')}</p>
          <p className="text-2xl font-bold text-text-primary mt-1">{categories.length}</p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-text-secondary">{t('categories.subCategories')}</p>
          <p className="text-2xl font-bold text-text-primary mt-1">
            {categories.reduce((acc, cat) => acc + (cat.children?.length || 0), 0)}
          </p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-text-secondary">{t('categories.totalProducts')}</p>
          <p className="text-2xl font-bold text-text-primary mt-1">{totalProducts}</p>
        </Card>
      </div>

      {/* Categories Tree */}
      <Card className="p-6">
        <div className="space-y-2">
          {categories.map((category) => (
            <CategoryItem key={category.id} category={category} />
          ))}
        </div>
      </Card>
    </div>
  );
};

export default Categories;
