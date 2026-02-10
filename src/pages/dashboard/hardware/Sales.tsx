import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  Search,
  Package,
  Plus,
  Minus,
  Trash2,
  CreditCard,
  Banknote,
  ShoppingCart,
  Barcode,
  User,
  Calculator,
} from 'lucide-react';
import { PageHeader, Card, Input, Button } from '@/components/common';
import {
  products,
  categories,
  formatCurrency,
} from '@/data/hardware/hardwareData';
import { useTranslation } from 'react-i18next';

interface CartItem {
  productId: string;
  name: string;
  sku: string;
  price: number;
  quantity: number;
}

export const Sales = () => {
  const { t } = useTranslation('common');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [customerName, setCustomerName] = useState('');
  const [barcodeInput, setBarcodeInput] = useState('');

  const filteredProducts = useMemo(() => {
    let filtered = products.filter((p) => p.status === 'active' && p.currentStock > 0);

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

  const addToCart = (product: typeof products[0]) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.productId === product.id);
      if (existing) {
        return prev.map((item) =>
          item.productId === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [
        ...prev,
        {
          productId: product.id,
          name: product.name,
          sku: product.sku,
          price: product.retailPrice,
          quantity: 1,
        },
      ];
    });
  };

  const updateQuantity = (productId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.productId === productId
            ? { ...item, quantity: Math.max(0, item.quantity + delta) }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.productId !== productId));
  };

  const clearCart = () => {
    setCart([]);
    setCustomerName('');
  };

  const handleBarcodeInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && barcodeInput) {
      const product = products.find(
        (p) => p.barcode === barcodeInput || p.sku === barcodeInput
      );
      if (product && product.status === 'active' && product.currentStock > 0) {
        addToCart(product);
      }
      setBarcodeInput('');
    }
  };

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + tax;

  return (
    <div className="h-[calc(100vh-140px)] flex gap-6">
      {/* Products Section */}
      <div className="flex-1 flex flex-col min-w-0">
        <PageHeader
          title={t('hardware.pointOfSale', 'Point of Sale')}
          subtitle="Quick sales and checkout"
        />

        {/* Search & Filters */}
        <Card className="p-4 mt-6 mb-4">
          <div className="flex gap-4 items-center">
            <div className="flex-1">
              <Input
                placeholder="Search products by name, SKU..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                leftIcon={<Search size={16} />}
              />
            </div>
            <div className="w-64">
              <Input
                placeholder="Scan barcode..."
                value={barcodeInput}
                onChange={(e) => setBarcodeInput(e.target.value)}
                onKeyDown={handleBarcodeInput}
                leftIcon={<Barcode size={16} />}
              />
            </div>
          </div>

          {/* Category Filter */}
          <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-3 py-1.5 rounded-lg text-sm whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === 'all'
                  ? 'bg-amber-500/20 text-amber-400 border border-amber-500/50'
                  : 'bg-white/[0.05] text-text-secondary hover:bg-white/[0.08] border border-transparent'
              }`}
            >
              All Products
            </button>
            {mainCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 rounded-lg text-sm whitespace-nowrap transition-all cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-amber-500/20 text-amber-400 border border-amber-500/50'
                    : 'bg-white/[0.05] text-text-secondary hover:bg-white/[0.08] border border-transparent'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </Card>

        {/* Products Grid */}
        <div className="flex-1 overflow-y-auto">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.02 }}
              >
                <Card
                  className="p-4 cursor-pointer hover:border-amber-500/50 transition-all group"
                  onClick={() => addToCart(product)}
                >
                  <div className="w-full aspect-square rounded-lg bg-amber-500/10 flex items-center justify-center mb-3 group-hover:bg-amber-500/20 transition-colors">
                    <Package size={32} className="text-amber-400" />
                  </div>
                  <h4 className="font-medium text-text-primary text-sm truncate mb-1">
                    {product.name}
                  </h4>
                  <p className="text-xs text-text-muted mb-2">{product.sku}</p>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-amber-400">
                      {formatCurrency(product.retailPrice)}
                    </span>
                    <span className="text-xs text-text-muted">
                      Stock: {product.currentStock}
                    </span>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <Card className="p-12 text-center mt-4">
              <Package size={48} className="mx-auto mb-4 text-text-muted" />
              <p className="text-text-secondary">No products found</p>
            </Card>
          )}
        </div>
      </div>

      {/* Cart Section */}
      <div className="w-96 flex flex-col">
        <Card className="flex-1 flex flex-col">
          {/* Cart Header */}
          <div className="p-4 border-b border-white/[0.08]">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-text-primary flex items-center gap-2">
                <ShoppingCart size={20} className="text-amber-400" />
                Current Sale
              </h3>
              {cart.length > 0 && (
                <button
                  onClick={clearCart}
                  className="text-sm text-red-400 hover:text-red-300 cursor-pointer"
                >
                  Clear
                </button>
              )}
            </div>
            <Input
              placeholder="Customer name (optional)"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              leftIcon={<User size={16} />}
            />
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-4">
            {cart.length === 0 ? (
              <div className="h-full flex items-center justify-center text-center">
                <div>
                  <ShoppingCart size={48} className="mx-auto mb-4 text-text-muted" />
                  <p className="text-text-secondary">Cart is empty</p>
                  <p className="text-xs text-text-muted mt-1">
                    Click products or scan barcode to add
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                {cart.map((item) => (
                  <motion.div
                    key={item.productId}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center gap-3 p-3 bg-white/[0.03] rounded-lg"
                  >
                    <div className="w-10 h-10 rounded bg-amber-500/20 flex items-center justify-center flex-shrink-0">
                      <Package size={16} className="text-amber-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-text-primary text-sm truncate">
                        {item.name}
                      </p>
                      <p className="text-xs text-text-muted">
                        {formatCurrency(item.price)} each
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateQuantity(item.productId, -1)}
                        className="w-7 h-7 rounded bg-white/[0.1] flex items-center justify-center hover:bg-white/[0.15] cursor-pointer"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="w-8 text-center font-medium">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.productId, 1)}
                        className="w-7 h-7 rounded bg-white/[0.1] flex items-center justify-center hover:bg-white/[0.15] cursor-pointer"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.productId)}
                      className="text-red-400 hover:text-red-300 cursor-pointer p-1"
                    >
                      <Trash2 size={16} />
                    </button>
                  </motion.div>
                ))}
              </div>
            )}
          </div>

          {/* Cart Summary */}
          <div className="p-4 border-t border-white/[0.08] bg-white/[0.02]">
            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-text-muted">Subtotal ({cart.reduce((sum, i) => sum + i.quantity, 0)} items)</span>
                <span className="text-text-primary">{formatCurrency(subtotal)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-text-muted">Tax (8%)</span>
                <span className="text-text-primary">{formatCurrency(tax)}</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-white/[0.08]">
                <span className="font-semibold text-text-primary">Total</span>
                <span className="font-bold text-xl text-amber-400">{formatCurrency(total)}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Button
                variant="secondary"
                className="w-full"
                leftIcon={<Banknote size={16} />}
                disabled={cart.length === 0}
              >
                Cash
              </Button>
              <Button
                className="w-full"
                leftIcon={<CreditCard size={16} />}
                disabled={cart.length === 0}
              >
                Card
              </Button>
            </div>

            <Button
              variant="secondary"
              className="w-full mt-3"
              leftIcon={<Calculator size={16} />}
              disabled={cart.length === 0}
            >
              Split Payment
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};
