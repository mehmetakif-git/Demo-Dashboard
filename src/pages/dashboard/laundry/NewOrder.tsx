import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Plus,
  Minus,
  Search,
  User,
  Shirt,
  Zap,
} from 'lucide-react';
import { PageHeader, Card, Input, Button } from '@/components/common';
import {
  customers,
  serviceCategories,
  services,
  garmentTypes,
  formatCurrency,
} from '@/data/laundry/laundryData';
import { useTranslation } from 'react-i18next';

interface OrderItem {
  garmentTypeId: string;
  garmentName: string;
  serviceId: string;
  serviceName: string;
  quantity: number;
  unitPrice: number;
  specialInstructions: string;
}

export const NewOrder = () => {
  const { t } = useTranslation('common');
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState<string | null>(null);
  const [isExpress, setIsExpress] = useState(false);
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState(serviceCategories[0]?.id || '');
  const [selectedGarment, setSelectedGarment] = useState('');
  const [selectedService, setSelectedService] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [notes, setNotes] = useState('');

  const filteredCustomers = customers.filter(
    (c) =>
      `${c.firstName} ${c.lastName}`.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.phone.includes(searchQuery) ||
      c.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const categoryServices = services.filter((s) => s.categoryId === selectedCategory && s.status === 'active');

  const customer = selectedCustomer ? customers.find((c) => c.id === selectedCustomer) : null;

  const addItem = () => {
    const garment = garmentTypes.find((g) => g.id === selectedGarment);
    const service = services.find((s) => s.id === selectedService);

    if (garment && service) {
      const unitPrice = isExpress ? service.expressPrice : service.price;
      setOrderItems([
        ...orderItems,
        {
          garmentTypeId: garment.id,
          garmentName: garment.name,
          serviceId: service.id,
          serviceName: service.name,
          quantity,
          unitPrice,
          specialInstructions: notes,
        },
      ]);
      setSelectedGarment('');
      setSelectedService('');
      setQuantity(1);
      setNotes('');
    }
  };

  const removeItem = (index: number) => {
    setOrderItems(orderItems.filter((_, i) => i !== index));
  };

  const updateQuantity = (index: number, delta: number) => {
    const newItems = [...orderItems];
    newItems[index].quantity = Math.max(1, newItems[index].quantity + delta);
    setOrderItems(newItems);
  };

  const subtotal = orderItems.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
  const taxRate = 0.09;
  const taxAmount = subtotal * taxRate;
  const deliveryFee = 5.99;
  const total = subtotal + taxAmount + deliveryFee;

  return (
    <div className="space-y-6">
      <PageHeader
        title={t('laundry.newOrder', 'New Order')}
        subtitle="Create a new laundry order"
        actions={
          <Button variant="secondary" leftIcon={<ArrowLeft size={16} />} onClick={() => navigate(-1)}>
            Back
          </Button>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Customer & Items */}
        <div className="lg:col-span-2 space-y-6">
          {/* Customer Selection */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-text-primary mb-4">Customer</h3>
            {!selectedCustomer ? (
              <div className="space-y-4">
                <Input
                  placeholder="Search customer by name, phone, or email..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  leftIcon={<Search size={16} />}
                />
                {searchQuery && (
                  <div className="max-h-60 overflow-y-auto space-y-2">
                    {filteredCustomers.map((c) => (
                      <div
                        key={c.id}
                        className="p-3 bg-white/[0.03] rounded-lg hover:bg-white/[0.06] cursor-pointer transition-colors"
                        onClick={() => {
                          setSelectedCustomer(c.id);
                          setSearchQuery('');
                        }}
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-sky-500/20 flex items-center justify-center">
                            <span className="text-sm font-bold text-sky-400">
                              {c.firstName[0]}{c.lastName[0]}
                            </span>
                          </div>
                          <div>
                            <p className="font-medium text-text-primary">{c.firstName} {c.lastName}</p>
                            <p className="text-sm text-text-muted">{c.phone}</p>
                          </div>
                          {c.vipStatus && (
                            <span className="ml-auto px-2 py-0.5 bg-amber-500/20 text-amber-400 text-xs rounded">
                              VIP
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                    {filteredCustomers.length === 0 && (
                      <p className="text-center text-text-muted py-4">No customers found</p>
                    )}
                  </div>
                )}
                <Button variant="secondary" leftIcon={<User size={16} />} className="w-full">
                  Add New Customer
                </Button>
              </div>
            ) : (
              <div className="flex items-center justify-between p-4 bg-white/[0.03] rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-sky-500/20 flex items-center justify-center">
                    <span className="text-lg font-bold text-sky-400">
                      {customer?.firstName[0]}{customer?.lastName[0]}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium text-text-primary">{customer?.firstName} {customer?.lastName}</p>
                    <p className="text-sm text-text-muted">{customer?.phone}</p>
                    <p className="text-sm text-text-muted">{customer?.address}</p>
                  </div>
                </div>
                <Button variant="ghost" size="sm" onClick={() => setSelectedCustomer(null)}>
                  Change
                </Button>
              </div>
            )}
          </Card>

          {/* Add Items */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-text-primary">Add Items</h3>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isExpress}
                  onChange={(e) => setIsExpress(e.target.checked)}
                  className="w-4 h-4 rounded border-white/20 text-amber-500 focus:ring-amber-500"
                />
                <Zap size={16} className={isExpress ? 'text-amber-400' : 'text-text-muted'} />
                <span className={`text-sm ${isExpress ? 'text-amber-400' : 'text-text-secondary'}`}>
                  Express Service
                </span>
              </label>
            </div>

            {/* Category Selection */}
            <div className="flex flex-wrap gap-2 mb-4">
              {serviceCategories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3 py-1.5 rounded-lg text-sm transition-all cursor-pointer ${
                    selectedCategory === cat.id
                      ? 'bg-sky-500/20 text-sky-400 border border-sky-500/50'
                      : 'bg-white/[0.05] text-text-secondary hover:bg-white/[0.08] border border-transparent'
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>

            {/* Item Form */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
              <select
                value={selectedGarment}
                onChange={(e) => setSelectedGarment(e.target.value)}
                className="px-3 py-2 bg-white/[0.05] border border-white/[0.08] rounded-lg text-sm text-text-primary focus:outline-none focus:border-accent-primary cursor-pointer"
              >
                <option value="">Select Garment</option>
                {garmentTypes.map((g) => (
                  <option key={g.id} value={g.id}>{g.name}</option>
                ))}
              </select>

              <select
                value={selectedService}
                onChange={(e) => setSelectedService(e.target.value)}
                className="px-3 py-2 bg-white/[0.05] border border-white/[0.08] rounded-lg text-sm text-text-primary focus:outline-none focus:border-accent-primary cursor-pointer"
              >
                <option value="">Select Service</option>
                {categoryServices.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name} - {formatCurrency(isExpress ? s.expressPrice : s.price)}
                  </option>
                ))}
              </select>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-2 bg-white/[0.05] rounded-lg hover:bg-white/[0.1] transition-colors cursor-pointer"
                >
                  <Minus size={16} />
                </button>
                <span className="w-12 text-center text-text-primary">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-2 bg-white/[0.05] rounded-lg hover:bg-white/[0.1] transition-colors cursor-pointer"
                >
                  <Plus size={16} />
                </button>
              </div>

              <Button
                onClick={addItem}
                disabled={!selectedGarment || !selectedService}
                leftIcon={<Plus size={16} />}
              >
                Add
              </Button>
            </div>

            <Input
              placeholder="Special instructions (optional)"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </Card>

          {/* Order Items */}
          {orderItems.length > 0 && (
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-text-primary mb-4">Order Items</h3>
              <div className="space-y-3">
                {orderItems.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 bg-white/[0.03] rounded-lg"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-lg bg-sky-500/20 flex items-center justify-center">
                        <Shirt size={20} className="text-sky-400" />
                      </div>
                      <div>
                        <p className="font-medium text-text-primary">{item.garmentName}</p>
                        <p className="text-sm text-text-muted">{item.serviceName}</p>
                        {item.specialInstructions && (
                          <p className="text-xs text-text-muted mt-1">Note: {item.specialInstructions}</p>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQuantity(index, -1)}
                          className="p-1 bg-white/[0.05] rounded hover:bg-white/[0.1] transition-colors cursor-pointer"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="w-8 text-center text-text-primary">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(index, 1)}
                          className="p-1 bg-white/[0.05] rounded hover:bg-white/[0.1] transition-colors cursor-pointer"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                      <p className="font-medium text-text-primary w-20 text-right">
                        {formatCurrency(item.unitPrice * item.quantity)}
                      </p>
                      <button
                        onClick={() => removeItem(index)}
                        className="text-red-400 hover:text-red-300 cursor-pointer"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          )}
        </div>

        {/* Right Column - Order Summary */}
        <div className="space-y-6">
          <Card className="p-6 sticky top-6">
            <h3 className="text-lg font-semibold text-text-primary mb-4">Order Summary</h3>

            {isExpress && (
              <div className="mb-4 p-3 bg-amber-500/10 border border-amber-500/30 rounded-lg">
                <div className="flex items-center gap-2 text-amber-400">
                  <Zap size={16} />
                  <span className="text-sm font-medium">Express Service</span>
                </div>
                <p className="text-xs text-amber-400/70 mt-1">24-hour turnaround</p>
              </div>
            )}

            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-sm">
                <span className="text-text-muted">Items ({orderItems.length})</span>
                <span className="text-text-primary">{formatCurrency(subtotal)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-text-muted">Tax (9%)</span>
                <span className="text-text-primary">{formatCurrency(taxAmount)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-text-muted">Delivery Fee</span>
                <span className="text-text-primary">{formatCurrency(deliveryFee)}</span>
              </div>
              <div className="pt-3 border-t border-white/[0.08]">
                <div className="flex justify-between">
                  <span className="font-semibold text-text-primary">Total</span>
                  <span className="font-bold text-xl text-sky-400">{formatCurrency(total)}</span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <Button className="w-full" disabled={!selectedCustomer || orderItems.length === 0}>
                Create Order
              </Button>
              <Button variant="secondary" className="w-full" onClick={() => navigate(-1)}>
                Cancel
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
