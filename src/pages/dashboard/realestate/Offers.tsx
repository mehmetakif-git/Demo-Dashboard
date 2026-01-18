import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  Handshake,
  Search,
  MoreVertical,
  Calendar,
  Building,
  User,
  TrendingUp,
  TrendingDown,
} from 'lucide-react';
import { PageHeader, Card, Button, Input, Dropdown } from '@/components/common';
import { offers, REALESTATE_COLOR, getStatusColor } from '@/data/realestate/realestateData';
import { getProfileImage, getCompanyLogo } from '@/utils/profileImages';

export const Offers = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');

  const stats = useMemo(() => {
    const total = offers.length;
    const pending = offers.filter(o => o.status === 'pending' || o.status === 'negotiating').length;
    const accepted = offers.filter(o => o.status === 'accepted').length;
    const totalValue = offers.filter(o => o.status === 'accepted').reduce((sum, o) => sum + o.offeredAmount, 0);

    return { total, pending, accepted, totalValue };
  }, []);

  const filteredOffers = useMemo(() => {
    return offers.filter(offer => {
      const matchesSearch = offer.propertyTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        offer.buyerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        offer.offerNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
        offer.propertyCode.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus = statusFilter === 'all' || offer.status === statusFilter;
      const matchesType = typeFilter === 'all' || offer.offerType === typeFilter;

      return matchesSearch && matchesStatus && matchesType;
    });
  }, [searchQuery, statusFilter, typeFilter]);

  const statuses = ['all', 'pending', 'negotiating', 'accepted', 'rejected', 'expired'];
  const types = ['all', 'Purchase', 'Rental'];

  const getDifferencePercent = (offered: number, asking: number) => {
    const diff = ((offered - asking) / asking) * 100;
    return diff.toFixed(1);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Offers"
        subtitle="Manage property offers and negotiations"
        icon={Handshake}
      />

      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Offers', value: stats.total, color: REALESTATE_COLOR },
          { label: 'Pending/Negotiating', value: stats.pending, color: '#f59e0b' },
          { label: 'Accepted', value: stats.accepted, color: '#10b981' },
          { label: 'Accepted Value', value: `QAR ${(stats.totalValue / 1000000).toFixed(1)}M`, color: '#8b5cf6' },
        ].map((stat, index) => (
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
                  <Handshake size={20} style={{ color: stat.color }} />
                </div>
                <div>
                  <p className="text-lg font-bold text-text-primary">{stat.value}</p>
                  <p className="text-xs text-text-muted">{stat.label}</p>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Filters */}
      <Card className="p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
            <Input
              placeholder="Search offers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 rounded-lg bg-background-secondary border border-border-default text-text-primary text-sm"
            >
              {statuses.map(status => (
                <option key={status} value={status}>
                  {status === 'all' ? 'All Status' : status.charAt(0).toUpperCase() + status.slice(1)}
                </option>
              ))}
            </select>
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="px-3 py-2 rounded-lg bg-background-secondary border border-border-default text-text-primary text-sm"
            >
              {types.map(type => (
                <option key={type} value={type}>
                  {type === 'all' ? 'All Types' : type}
                </option>
              ))}
            </select>
          </div>
        </div>
      </Card>

      {/* Offers Table */}
      <Card className="p-4">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-background-tertiary">
              <tr>
                <th className="text-left py-3 px-4 text-sm font-medium text-text-muted">Property</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-text-muted">Buyer</th>
                <th className="text-center py-3 px-4 text-sm font-medium text-text-muted">Type</th>
                <th className="text-right py-3 px-4 text-sm font-medium text-text-muted">Offered</th>
                <th className="text-right py-3 px-4 text-sm font-medium text-text-muted">Asking</th>
                <th className="text-center py-3 px-4 text-sm font-medium text-text-muted">Diff</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-text-muted">Valid Until</th>
                <th className="text-center py-3 px-4 text-sm font-medium text-text-muted">Status</th>
                <th className="text-center py-3 px-4 text-sm font-medium text-text-muted">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredOffers.map((offer, index) => {
                const diffPercent = parseFloat(getDifferencePercent(offer.offeredAmount, offer.askingAmount));
                const isPositive = diffPercent >= 0;

                return (
                  <motion.tr
                    key={offer.id}
                    className="border-b border-border-default last:border-b-0 hover:bg-background-secondary/50"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.03 }}
                  >
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-10 h-10 rounded-lg flex items-center justify-center"
                          style={{ backgroundColor: `${REALESTATE_COLOR}20` }}
                        >
                          <Building size={18} style={{ color: REALESTATE_COLOR }} />
                        </div>
                        <div>
                          <p className="font-medium text-text-primary">{offer.propertyTitle}</p>
                          <p className="text-xs text-text-muted font-mono">{offer.offerNo}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        {(() => {
                          const profileImg = getProfileImage(offer.buyerName);
                          const companyLogo = getCompanyLogo(offer.buyerName);
                          const image = profileImg || companyLogo;

                          if (image) {
                            return (
                              <img
                                src={image}
                                alt={offer.buyerName}
                                className="w-8 h-8 rounded-full object-cover"
                              />
                            );
                          }
                          return <User size={14} className="text-text-muted" />;
                        })()}
                        <span className="text-text-secondary">{offer.buyerName}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span
                        className="inline-flex px-2 py-1 rounded-full text-xs font-medium"
                        style={{
                          backgroundColor: offer.offerType === 'Purchase' ? '#10b98120' : '#3b82f620',
                          color: offer.offerType === 'Purchase' ? '#10b981' : '#3b82f6'
                        }}
                      >
                        {offer.offerType}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <span className="font-semibold" style={{ color: REALESTATE_COLOR }}>
                        QAR {offer.offeredAmount.toLocaleString()}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <span className="text-text-secondary">
                        QAR {offer.askingAmount.toLocaleString()}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <div className="flex items-center justify-center gap-1">
                        {isPositive ? (
                          <TrendingUp size={14} className="text-green-500" />
                        ) : (
                          <TrendingDown size={14} className="text-red-500" />
                        )}
                        <span className={`text-sm font-medium ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
                          {diffPercent}%
                        </span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-1 text-sm text-text-secondary">
                        <Calendar size={12} className="text-text-muted" />
                        <span>{offer.validUntil}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span
                        className="inline-flex px-2 py-1 rounded-full text-xs font-medium"
                        style={{ backgroundColor: `${getStatusColor(offer.status)}20`, color: getStatusColor(offer.status) }}
                      >
                        {offer.status.charAt(0).toUpperCase() + offer.status.slice(1)}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <Dropdown
                        trigger={
                          <Button variant="ghost" size="sm">
                            <MoreVertical size={16} />
                          </Button>
                        }
                        items={[
                          { id: 'view', label: 'View Details', onClick: () => {} },
                          { id: 'counter', label: 'Counter Offer', onClick: () => {} },
                          { id: 'accept', label: 'Accept', onClick: () => {} },
                        ]}
                      />
                    </td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {filteredOffers.length === 0 && (
          <div className="py-12 text-center text-text-muted">
            <Handshake size={48} className="mx-auto mb-4 opacity-50" />
            <p>No offers found</p>
          </div>
        )}
      </Card>
    </div>
  );
};

export default Offers;
