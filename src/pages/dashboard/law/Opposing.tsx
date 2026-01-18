import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  UserX,
  Search,
  MoreVertical,
  Building,
  User,
  Phone,
  Mail,
  Briefcase,
} from 'lucide-react';
import { PageHeader, Card, Button, Input, Dropdown } from '@/components/common';
import { opposingParties, LAW_COLOR } from '@/data/law/lawData';

export const Opposing = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('all');

  const stats = useMemo(() => {
    const total = opposingParties.length;
    const individual = opposingParties.filter(o => o.type === 'Individual').length;
    const corporate = opposingParties.filter(o => o.type === 'Corporate').length;
    const government = opposingParties.filter(o => o.type === 'Government').length;

    return { total, individual, corporate, government };
  }, []);

  const filteredParties = useMemo(() => {
    return opposingParties.filter(party => {
      const matchesSearch = party.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        party.lawyerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        party.lawFirm.toLowerCase().includes(searchQuery.toLowerCase()) ||
        party.caseNo.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesType = typeFilter === 'all' || party.type === typeFilter;

      return matchesSearch && matchesType;
    });
  }, [searchQuery, typeFilter]);

  const getTypeColor = (type: string) => {
    const colors: Record<string, string> = {
      'Individual': '#8b5cf6',
      'Corporate': '#3b82f6',
      'Government': '#ef4444',
    };
    return colors[type] || LAW_COLOR;
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'Individual': return User;
      case 'Corporate': return Building;
      case 'Government': return Building;
      default: return User;
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Opposing Parties"
        subtitle="Manage opposing parties and their counsel"
        icon={UserX}
      />

      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Parties', value: stats.total, icon: UserX, color: LAW_COLOR },
          { label: 'Individual', value: stats.individual, icon: User, color: '#8b5cf6' },
          { label: 'Corporate', value: stats.corporate, icon: Building, color: '#3b82f6' },
          { label: 'Government', value: stats.government, icon: Building, color: '#ef4444' },
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
                    <p className="text-lg font-bold text-text-primary">{stat.value}</p>
                    <p className="text-xs text-text-muted">{stat.label}</p>
                  </div>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Filters */}
      <Card className="p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
            <Input
              placeholder="Search opposing parties..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2">
            {['all', 'Individual', 'Corporate', 'Government'].map((type) => (
              <Button
                key={type}
                variant={typeFilter === type ? 'primary' : 'ghost'}
                size="sm"
                onClick={() => setTypeFilter(type)}
              >
                {type === 'all' ? 'All Types' : type}
              </Button>
            ))}
          </div>
        </div>
      </Card>

      {/* Opposing Parties Table */}
      <Card className="p-4">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-background-tertiary">
              <tr>
                <th className="text-left py-3 px-4 text-sm font-medium text-text-muted">Party</th>
                <th className="text-center py-3 px-4 text-sm font-medium text-text-muted">Type</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-text-muted">Case</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-text-muted">Lawyer</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-text-muted">Law Firm</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-text-muted">Contact</th>
                <th className="text-center py-3 px-4 text-sm font-medium text-text-muted">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredParties.map((party, index) => {
                const TypeIcon = getTypeIcon(party.type);

                return (
                  <motion.tr
                    key={party.id}
                    className="border-b border-border-default last:border-b-0 hover:bg-background-secondary/50"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.03 }}
                  >
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-10 h-10 rounded-full flex items-center justify-center"
                          style={{ backgroundColor: `${getTypeColor(party.type)}20` }}
                        >
                          <TypeIcon size={18} style={{ color: getTypeColor(party.type) }} />
                        </div>
                        <div>
                          <p className="font-medium text-text-primary">{party.name}</p>
                          {party.notes && (
                            <p className="text-xs text-text-muted truncate max-w-[200px]">{party.notes}</p>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span
                        className="inline-flex px-2 py-1 rounded-full text-xs font-medium"
                        style={{ backgroundColor: `${getTypeColor(party.type)}20`, color: getTypeColor(party.type) }}
                      >
                        {party.type}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <Briefcase size={14} className="text-text-muted" />
                        <span className="font-mono text-sm text-text-secondary">{party.caseNo}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-text-secondary">{party.lawyerName}</span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-text-secondary">{party.lawFirm}</span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-sm">
                          <Phone size={12} className="text-text-muted" />
                          <span className="text-text-secondary">{party.phone}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Mail size={12} className="text-text-muted" />
                          <span className="text-text-secondary">{party.email}</span>
                        </div>
                      </div>
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
                          { id: 'edit', label: 'Edit', onClick: () => {} },
                          { id: 'contact', label: 'Contact', onClick: () => {} },
                        ]}
                      />
                    </td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {filteredParties.length === 0 && (
          <div className="py-12 text-center text-text-muted">
            <UserX size={48} className="mx-auto mb-4 opacity-50" />
            <p>No opposing parties found</p>
          </div>
        )}
      </Card>
    </div>
  );
};

export default Opposing;
