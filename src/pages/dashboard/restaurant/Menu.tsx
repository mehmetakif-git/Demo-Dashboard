import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  UtensilsCrossed,
  Search,
  Plus,
  Edit,
  Leaf,
  Flame,
  Clock,
  Star,
  Eye,
  EyeOff,
} from 'lucide-react';
import { PageHeader, Card, Button, Input, StatusBadge } from '@/components/common';
import { menuItems, menuCategories } from '@/data/restaurant/restaurantData';
import { getMenuImage } from '@/utils/menuImages';
import { useTranslation } from 'react-i18next';

export const Menu = () => {
  const { t } = useTranslation('common');
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [showUnavailable, setShowUnavailable] = useState(true);

  const stats = useMemo(() => ({
    totalItems: menuItems.length,
    available: menuItems.filter(m => m.isAvailable).length,
    popular: menuItems.filter(m => m.isPopular).length,
    vegetarian: menuItems.filter(m => m.isVegetarian).length,
  }), []);

  const filteredItems = useMemo(() => {
    return menuItems.filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.nameAr.includes(searchQuery) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory = categoryFilter === 'all' || item.category === categoryFilter;
      const matchesAvailability = showUnavailable || item.isAvailable;

      return matchesSearch && matchesCategory && matchesAvailability;
    });
  }, [searchQuery, categoryFilter, showUnavailable]);

  return (
    <div className="space-y-6">
      <PageHeader
        title={t('restaurant.menuManagement', 'Menu Management')}
        subtitle="Manage your restaurant menu items"
        icon={UtensilsCrossed}
        actions={
          <Button>
            <Plus size={18} />
            Add Item
          </Button>
        }
      />

      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Items', value: stats.totalItems, icon: UtensilsCrossed, color: '#f97316' },
          { label: 'Available', value: stats.available, icon: Eye, color: '#10b981' },
          { label: 'Popular', value: stats.popular, icon: Star, color: '#f59e0b' },
          { label: 'Vegetarian', value: stats.vegetarian, icon: Leaf, color: '#22c55e' },
        ].map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card className="p-4">
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: `${stat.color}20` }}
                  >
                    <Icon size={20} style={{ color: stat.color }} />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-text-primary">{stat.value}</p>
                    <p className="text-xs text-text-muted">{stat.label}</p>
                  </div>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Categories */}
      <Card className="p-4">
        <div className="flex flex-wrap gap-2 mb-4">
          <Button
            variant={categoryFilter === 'all' ? 'primary' : 'ghost'}
            size="sm"
            onClick={() => setCategoryFilter('all')}
          >
            All Categories
          </Button>
          {menuCategories.map((cat) => (
            <Button
              key={cat.id}
              variant={categoryFilter === cat.id ? 'primary' : 'ghost'}
              size="sm"
              onClick={() => setCategoryFilter(cat.id)}
            >
              <span className="mr-1">{cat.icon}</span>
              {cat.name}
            </Button>
          ))}
        </div>
      </Card>

      {/* Search and Filters */}
      <Card className="p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
            <Input
              placeholder="Search menu items..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button
            variant={showUnavailable ? 'secondary' : 'ghost'}
            size="sm"
            onClick={() => setShowUnavailable(!showUnavailable)}
          >
            {showUnavailable ? <Eye size={16} className="mr-2" /> : <EyeOff size={16} className="mr-2" />}
            {showUnavailable ? 'Showing All' : 'Available Only'}
          </Button>
        </div>
      </Card>

      {/* Menu Items Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredItems.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.03 }}
          >
            <Card className={`overflow-hidden ${!item.isAvailable ? 'opacity-60' : ''}`}>
              <div className="h-40 bg-background-secondary relative">
                {(() => {
                  const menuImage = getMenuImage(item.id);
                  return menuImage ? (
                    <img
                      src={menuImage}
                      alt={item.name}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-6xl opacity-30">
                      {menuCategories.find(c => c.id === item.category)?.icon || '🍽️'}
                    </div>
                  );
                })()}
                {item.isPopular && (
                  <div className="absolute top-2 left-2">
                    <span className="px-2 py-1 bg-warning text-warning-foreground text-xs font-medium rounded-full flex items-center gap-1">
                      <Star size={12} fill="currentColor" />
                      Popular
                    </span>
                  </div>
                )}
                {!item.isAvailable && (
                  <div className="absolute top-2 right-2">
                    <StatusBadge status="inactive" />
                  </div>
                )}
              </div>
              <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="font-semibold text-text-primary">{item.name}</h3>
                    <p className="text-sm text-text-muted">{item.nameAr}</p>
                  </div>
                  <span className="text-lg font-bold text-[#f97316]">{item.price} QAR</span>
                </div>

                <p className="text-sm text-text-secondary mb-3 line-clamp-2">{item.description}</p>

                <div className="flex flex-wrap gap-2 mb-3">
                  {item.isVegetarian && (
                    <span className="px-2 py-1 bg-success/20 text-success text-xs rounded-full flex items-center gap-1">
                      <Leaf size={12} />
                      Vegetarian
                    </span>
                  )}
                  {item.isSpicy && (
                    <span className="px-2 py-1 bg-error/20 text-error text-xs rounded-full flex items-center gap-1">
                      <Flame size={12} />
                      Spicy
                    </span>
                  )}
                  <span className="px-2 py-1 bg-background-secondary text-text-muted text-xs rounded-full flex items-center gap-1">
                    <Clock size={12} />
                    {item.preparationTime} min
                  </span>
                </div>

                {item.calories && (
                  <p className="text-xs text-text-muted mb-3">{item.calories} calories</p>
                )}

                <div className="flex gap-2">
                  <Button variant="secondary" size="sm" className="flex-1">
                    <Edit size={14} className="mr-1" />
                    Edit
                  </Button>
                  <Button
                    variant={item.isAvailable ? 'ghost' : 'primary'}
                    size="sm"
                  >
                    {item.isAvailable ? <EyeOff size={14} /> : <Eye size={14} />}
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {filteredItems.length === 0 && (
        <Card className="p-12 text-center">
          <UtensilsCrossed size={48} className="mx-auto text-text-muted mb-4" />
          <p className="text-text-secondary">No menu items found</p>
        </Card>
      )}
    </div>
  );
};

export default Menu;
