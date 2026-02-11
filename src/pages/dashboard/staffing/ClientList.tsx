import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  Plus,
  Search,
  Eye,
  Building2,
  DollarSign,
  Users,
  Briefcase,
  MapPin,
  Phone,
  Mail,
} from 'lucide-react';
import { PageHeader, Card, StatsCard, Button } from '@/components/common';
import {
  clients,
  staffingStats,
  formatCurrency,
  getClientTierBgColor,
  type Client,
} from '@/data/staffing/staffingData';
import { ROUTES } from '@/utils/constants';
import { getCompanyLogo } from '@/utils/profileImages';
import { useTranslation } from 'react-i18next';

export const ClientList = () => {
  const { t } = useTranslation('staffing');
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [tierFilter, setTierFilter] = useState<string>('all');
  const [industryFilter, setIndustryFilter] = useState<string>('all');

  // Get unique industries
  const industries = useMemo(() => {
    const industrySet = new Set(clients.map((c) => c.industry));
    return Array.from(industrySet).sort();
  }, []);

  // Filter clients
  const filteredClients = useMemo(() => {
    return clients.filter((client) => {
      const matchesSearch =
        searchQuery === '' ||
        client.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        client.industry.toLowerCase().includes(searchQuery.toLowerCase()) ||
        client.primaryContact.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = statusFilter === 'all' || client.status === statusFilter;
      const matchesTier = tierFilter === 'all' || client.tier === tierFilter;
      const matchesIndustry = industryFilter === 'all' || client.industry === industryFilter;
      return matchesSearch && matchesStatus && matchesTier && matchesIndustry;
    });
  }, [searchQuery, statusFilter, tierFilter, industryFilter]);

  // Calculate stats
  const totalRevenue = clients.reduce((sum, c) => sum + c.totalRevenue, 0);
  const activePositions = clients.reduce((sum, c) => sum + c.activePositions, 0);

  const stats = [
    {
      title: t('clientList.totalClients'),
      value: staffingStats.totalClients.toString(),
      icon: Building2,
      iconColor: '#547792',
    },
    {
      title: t('clientList.activeClients'),
      value: staffingStats.activeClients.toString(),
      icon: Building2,
      iconColor: '#10b981',
    },
    {
      title: t('clientList.totalRevenue'),
      value: formatCurrency(totalRevenue),
      icon: DollarSign,
      iconColor: '#f59e0b',
    },
    {
      title: t('clientList.openPositions'),
      value: activePositions.toString(),
      icon: Briefcase,
      iconColor: '#94B4C1',
    },
  ];

  const handleViewClient = (clientId: string) => {
    navigate(ROUTES.staffing.clientDetail.replace(':id', clientId));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <PageHeader
        title={t('clientList.title')}
        subtitle={t('clientList.subtitle')}
        actions={
          <Button onClick={() => console.log('Add client')}>
            <Plus className="h-4 w-4 mr-2" />
            {t('clientList.addClient')}
          </Button>
        }
      />

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <StatsCard
            key={stat.title}
            title={stat.title}
            value={stat.value}
            icon={stat.icon}
            iconColor={stat.iconColor}
          />
        ))}
      </div>

      {/* Filters */}
      <Card className="p-4">
        <div className="flex flex-wrap gap-4">
          <div className="relative flex-1 min-w-[200px] max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-muted" />
            <input
              type="text"
              placeholder={t('clientList.searchClients')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white/[0.05] border border-white/[0.08] rounded-lg text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent-primary"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 bg-white/[0.05] border border-white/[0.08] rounded-lg text-text-primary focus:outline-none focus:border-accent-primary"
          >
            <option value="all">{t('clientList.allStatuses')}</option>
            <option value="active">{t('clientList.active')}</option>
            <option value="inactive">{t('clientList.inactive')}</option>
            <option value="prospect">{t('clientList.prospect')}</option>
          </select>

          <select
            value={tierFilter}
            onChange={(e) => setTierFilter(e.target.value)}
            className="px-3 py-2 bg-white/[0.05] border border-white/[0.08] rounded-lg text-text-primary focus:outline-none focus:border-accent-primary"
          >
            <option value="all">{t('clientList.allTiers')}</option>
            <option value="platinum">{t('clientList.platinum')}</option>
            <option value="gold">{t('clientList.gold')}</option>
            <option value="silver">{t('clientList.silver')}</option>
            <option value="bronze">{t('clientList.bronze')}</option>
          </select>

          <select
            value={industryFilter}
            onChange={(e) => setIndustryFilter(e.target.value)}
            className="px-3 py-2 bg-white/[0.05] border border-white/[0.08] rounded-lg text-text-primary focus:outline-none focus:border-accent-primary"
          >
            <option value="all">{t('clientList.allIndustries')}</option>
            {industries.map((industry) => (
              <option key={industry} value={industry}>
                {industry}
              </option>
            ))}
          </select>
        </div>
      </Card>

      {/* Results count */}
      <p className="text-sm text-text-secondary">
        {t('clientList.showingOf', { shown: filteredClients.length, total: clients.length })}
      </p>

      {/* Client Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredClients.map((client) => (
          <ClientCard key={client.id} client={client} onView={() => handleViewClient(client.id)} />
        ))}
      </div>

      {filteredClients.length === 0 && (
        <Card className="p-12 text-center">
          <Building2 className="h-12 w-12 text-text-muted mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-text-primary mb-2">{t('clientList.noClientsFound')}</h3>
          <p className="text-text-secondary">{t('clientList.tryAdjusting')}</p>
        </Card>
      )}
    </motion.div>
  );
};

interface ClientCardProps {
  client: Client;
  onView: () => void;
}

const ClientCard = ({ client, onView }: ClientCardProps) => {
  const { t } = useTranslation('staffing');

  return (
    <Card className="p-6 hover:border-accent-primary/50 transition-colors">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-4">
          {getCompanyLogo(client.companyName) ? (
            <img
              src={getCompanyLogo(client.companyName)}
              alt={client.companyName}
              className="w-14 h-14 rounded-lg object-cover border border-white/10"
            />
          ) : (
            <div className="w-14 h-14 rounded-lg bg-gradient-to-br from-accent-primary to-accent-secondary flex items-center justify-center text-white text-xl font-bold">
              {client.companyName.charAt(0)}
            </div>
          )}
          <div>
            <h3 className="font-semibold text-text-primary text-lg">{client.companyName}</h3>
            <p className="text-text-secondary text-sm">{client.industry}</p>
          </div>
        </div>
        <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getClientTierBgColor(client.tier)}`}>
          {client.tier.charAt(0).toUpperCase() + client.tier.slice(1)}
        </span>
      </div>

      <div className="space-y-3 mb-4">
        <div className="flex items-center gap-2 text-sm text-text-secondary">
          <Users className="h-4 w-4" />
          <span>{client.primaryContact.name}</span>
          <span className="text-text-muted">({client.primaryContact.title})</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-text-secondary">
          <MapPin className="h-4 w-4" />
          <span>
            {client.address.city}, {client.address.state}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 mb-4 text-center">
        <div className="bg-white/[0.05] rounded-lg p-2">
          <p className="text-text-primary font-bold">{client.totalPlacements}</p>
          <p className="text-xs text-text-muted">{t('clientList.placements')}</p>
        </div>
        <div className="bg-white/[0.05] rounded-lg p-2">
          <p className="text-text-primary font-bold">{client.activePositions}</p>
          <p className="text-xs text-text-muted">{t('clientList.open')}</p>
        </div>
        <div className="bg-white/[0.05] rounded-lg p-2">
          <p className="text-text-primary font-bold text-sm">{formatCurrency(client.totalRevenue / 1000)}k</p>
          <p className="text-xs text-text-muted">{t('clientList.revenue')}</p>
        </div>
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-white/[0.08]">
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${
            client.status === 'active'
              ? 'bg-green-500/10 text-green-400'
              : client.status === 'prospect'
              ? 'bg-blue-500/10 text-blue-400'
              : 'bg-gray-500/10 text-gray-400'
          }`}
        >
          {client.status.charAt(0).toUpperCase() + client.status.slice(1)}
        </span>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" onClick={() => window.open(`mailto:${client.primaryContact.email}`)}>
            <Mail className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" onClick={() => window.open(`tel:${client.primaryContact.phone}`)}>
            <Phone className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" onClick={onView}>
            <Eye className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
};
