import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  CreditCard,
  Plus,
  Minus,
  Trash2,
  Search,
  Receipt,
  Banknote,
  Smartphone,
  Percent,
  Users,
  ShoppingBag,
  Bike,
} from 'lucide-react';
import { PageHeader, Card, Button, Input } from '@/components/common';
import { menuItems, menuCategories, tables } from '@/data/restaurant/restaurantData';
import { useTranslation } from 'react-i18next';

interface CartItem {
  menuItemId: string;
  name: string;
  price: number;
  quantity: number;
  notes?: string;
}

export const POS = () => {
  const { t } = useTranslation('common');
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [orderType, setOrderType] = useState<'dine-in' | 'takeaway' | 'delivery'>('dine-in');
  const [selectedTable, setSelectedTable] = useState<string>('');
  const [discount, setDiscount] = useState<number>(0);

  const filteredItems = useMemo(() => {
    return menuItems.filter(item => {
      if (!item.isAvailable) return false;
      const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = categoryFilter === 'all' || item.category === categoryFilter;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, categoryFilter]);

  const availableTables = useMemo(() => {
    return tables.filter(t => t.status === 'available');
  }, []);

  const addToCart = (item: typeof menuItems[0]) => {
    const existing = cart.find(c => c.menuItemId === item.id);
    if (existing) {
      setCart(cart.map(c =>
        c.menuItemId === item.id ? { ...c, quantity: c.quantity + 1 } : c
      ));
    } else {
      setCart([...cart, {
        menuItemId: item.id,
        name: item.name,
        price: item.price,
        quantity: 1,
      }]);
    }
  };

  const updateQuantity = (menuItemId: string, delta: number) => {
    setCart(cart.map(c => {
      if (c.menuItemId === menuItemId) {
        const newQty = c.quantity + delta;
        return newQty > 0 ? { ...c, quantity: newQty } : c;
      }
      return c;
    }).filter(c => c.quantity > 0));
  };

  const removeFromCart = (menuItemId: string) => {
    setCart(cart.filter(c => c.menuItemId !== menuItemId));
  };

  const clearCart = () => {
    setCart([]);
    setDiscount(0);
    setSelectedTable('');
  };

  const subtotal = useMemo(() => {
    return cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  }, [cart]);

  const discountAmount = useMemo(() => {
    return subtotal * (discount / 100);
  }, [subtotal, discount]);

  const tax = useMemo(() => {
    return (subtotal - discountAmount) * 0.05;
  }, [subtotal, discountAmount]);

  const total = useMemo(() => {
    return subtotal - discountAmount + tax;
  }, [subtotal, discountAmount, tax]);

  return (
    <div className="space-y-6">
      <PageHeader
        title={t('restaurant.pointOfSale', 'Point of Sale')}
        subtitle="Process orders and payments"
        icon={CreditCard}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Menu Section */}
        <div className="lg:col-span-2 space-y-4">
          {/* Order Type */}
          <Card className="p-4">
            <div className="flex gap-2">
              {[
                { type: 'dine-in' as const, label: 'Dine In', icon: Users },
                { type: 'takeaway' as const, label: 'Takeaway', icon: ShoppingBag },
                { type: 'delivery' as const, label: 'Delivery', icon: Bike },
              ].map((opt) => {
                const Icon = opt.icon;
                return (
                  <Button
                    key={opt.type}
                    variant={orderType === opt.type ? 'primary' : 'ghost'}
                    onClick={() => setOrderType(opt.type)}
                    className="flex-1"
                  >
                    <Icon size={18} className="mr-2" />
                    {opt.label}
                  </Button>
                );
              })}
            </div>
            {orderType === 'dine-in' && (
              <div className="mt-4">
                <p className="text-sm text-text-secondary mb-2">Select Table</p>
                <div className="flex flex-wrap gap-2">
                  {availableTables.map((table) => (
                    <Button
                      key={table.id}
                      variant={selectedTable === table.id ? 'primary' : 'secondary'}
                      size="sm"
                      onClick={() => setSelectedTable(table.id)}
                    >
                      Table {table.number} ({table.capacity})
                    </Button>
                  ))}
                </div>
              </div>
            )}
          </Card>

          {/* Search and Categories */}
          <Card className="p-4">
            <div className="relative mb-4">
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
              <Input
                placeholder="Search menu..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              <Button
                variant={categoryFilter === 'all' ? 'primary' : 'ghost'}
                size="sm"
                onClick={() => setCategoryFilter('all')}
              >
                All
              </Button>
              {menuCategories.map((cat) => (
                <Button
                  key={cat.id}
                  variant={categoryFilter === cat.id ? 'primary' : 'ghost'}
                  size="sm"
                  onClick={() => setCategoryFilter(cat.id)}
                >
                  {cat.icon} {cat.name}
                </Button>
              ))}
            </div>
          </Card>

          {/* Menu Items Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.02 }}
              >
                <Card
                  className="p-3 cursor-pointer hover:bg-background-secondary transition-colors"
                  onClick={() => addToCart(item)}
                >
                  <div className="text-2xl mb-2 text-center">
                    {menuCategories.find(c => c.id === item.category)?.icon || '🍽️'}
                  </div>
                  <p className="font-medium text-text-primary text-sm text-center truncate">
                    {item.name}
                  </p>
                  <p className="text-[#f97316] font-bold text-center mt-1">
                    {item.price} QAR
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Cart Section */}
        <div className="space-y-4">
          <Card className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-text-primary">Current Order</h3>
              {cart.length > 0 && (
                <Button variant="ghost" size="sm" onClick={clearCart}>
                  <Trash2 size={14} className="mr-1" />
                  Clear
                </Button>
              )}
            </div>

            {cart.length === 0 ? (
              <div className="text-center py-8">
                <Receipt size={48} className="mx-auto text-text-muted mb-2" />
                <p className="text-text-muted text-sm">Cart is empty</p>
              </div>
            ) : (
              <div className="space-y-3 max-h-[400px] overflow-y-auto">
                {cart.map((item) => (
                  <div key={item.menuItemId} className="flex items-center gap-3 p-2 bg-background-secondary rounded-lg">
                    <div className="flex-1">
                      <p className="text-sm font-medium text-text-primary">{item.name}</p>
                      <p className="text-xs text-text-muted">{item.price} QAR each</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => updateQuantity(item.menuItemId, -1)}
                      >
                        <Minus size={14} />
                      </Button>
                      <span className="w-8 text-center font-medium">{item.quantity}</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => updateQuantity(item.menuItemId, 1)}
                      >
                        <Plus size={14} />
                      </Button>
                    </div>
                    <p className="font-medium text-text-primary w-20 text-right">
                      {(item.price * item.quantity).toFixed(2)}
                    </p>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeFromCart(item.menuItemId)}
                    >
                      <Trash2 size={14} className="text-error" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </Card>

          {/* Discount */}
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <Percent size={18} className="text-text-muted" />
              <Input
                type="number"
                placeholder="Discount %"
                value={discount || ''}
                onChange={(e) => setDiscount(Math.min(100, Math.max(0, Number(e.target.value))))}
                className="flex-1"
              />
            </div>
          </Card>

          {/* Totals */}
          <Card className="p-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-text-muted">Subtotal</span>
                <span className="text-text-primary">{subtotal.toFixed(2)} QAR</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-text-muted">Discount ({discount}%)</span>
                  <span className="text-success">-{discountAmount.toFixed(2)} QAR</span>
                </div>
              )}
              <div className="flex justify-between text-sm">
                <span className="text-text-muted">Tax (5%)</span>
                <span className="text-text-primary">{tax.toFixed(2)} QAR</span>
              </div>
              <div className="flex justify-between text-lg font-bold pt-2 border-t border-border-default">
                <span className="text-text-primary">Total</span>
                <span className="text-[#f97316]">{total.toFixed(2)} QAR</span>
              </div>
            </div>
          </Card>

          {/* Payment Buttons */}
          <div className="space-y-2">
            <Button
              className="w-full bg-success hover:bg-success/90"
              disabled={cart.length === 0}
            >
              <Banknote size={18} className="mr-2" />
              Pay with Cash
            </Button>
            <Button
              className="w-full"
              disabled={cart.length === 0}
            >
              <CreditCard size={18} className="mr-2" />
              Pay with Card
            </Button>
            <Button
              variant="secondary"
              className="w-full"
              disabled={cart.length === 0}
            >
              <Smartphone size={18} className="mr-2" />
              Digital Payment
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default POS;
