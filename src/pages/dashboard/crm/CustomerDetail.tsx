import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  Building2,
  Mail,
  Phone,
  Globe,
  MapPin,
  Calendar,
  User,
  DollarSign,
  ShoppingBag,
  Edit,
  Plus,
  FileText,
  TrendingUp,
} from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { StatusBadge, Tabs, DataTable } from '@/components/common';
import {
  getCustomerById,
  getOpportunitiesByCustomer,
  getActivitiesByCustomer,
  getContractsByCustomer,
  segmentColors,
  pipelineStages,
  activityTypeIcons,
} from '@/data/crmData';

export const CustomerDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState('overview');

  const customer = useMemo(() => getCustomerById(id || ''), [id]);
  const opportunities = useMemo(() => customer ? getOpportunitiesByCustomer(customer.name) : [], [customer]);
  const activities = useMemo(() => customer ? getActivitiesByCustomer(customer.name) : [], [customer]);
  const contracts = useMemo(() => customer ? getContractsByCustomer(customer.name) : [], [customer]);

  if (!customer) {
    return (
      <div className="p-6">
        <div className="text-center py-12">
          <p className="text-[#64748b]">Customer not found</p>
          <button
            onClick={() => navigate('/dashboard/crm/customers')}
            className="mt-4 text-[#547792] hover:underline"
          >
            Back to Customers
          </button>
        </div>
      </div>
    );
  }

  const colors = segmentColors[customer.segment];

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'contacts', label: 'Contacts' },
    { id: 'opportunities', label: `Opportunities (${opportunities.length})` },
    { id: 'activities', label: `Activities (${activities.length})` },
    { id: 'documents', label: 'Documents' },
  ];

  const opportunityColumns = [
    {
      key: 'name',
      header: 'Opportunity',
      render: (opp: typeof opportunities[0]) => (
        <div>
          <p className="font-medium text-white">{opp.name}</p>
          <p className="text-xs text-[#64748b]">{opp.id}</p>
        </div>
      ),
    },
    {
      key: 'value',
      header: 'Value',
      render: (opp: typeof opportunities[0]) => (
        <span className="font-medium text-white">${opp.value.toLocaleString()}</span>
      ),
    },
    {
      key: 'stage',
      header: 'Stage',
      render: (opp: typeof opportunities[0]) => {
        const stage = pipelineStages.find(s => s.id === opp.stage);
        return (
          <span
            className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium"
            style={{ backgroundColor: `${stage?.color}20`, color: stage?.color }}
          >
            {stage?.name}
          </span>
        );
      },
    },
    {
      key: 'probability',
      header: 'Probability',
      render: (opp: typeof opportunities[0]) => (
        <span className="text-[#94a3b8]">{opp.probability}%</span>
      ),
    },
    {
      key: 'expectedClose',
      header: 'Expected Close',
      render: (opp: typeof opportunities[0]) => (
        <span className="text-[#94a3b8]">
          {new Date(opp.expectedClose).toLocaleDateString()}
        </span>
      ),
    },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Back Button */}
      <button
        onClick={() => navigate('/dashboard/crm/customers')}
        className="flex items-center gap-2 text-[#64748b] hover:text-white transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Customers
      </button>

      {/* Header */}
      <div className="bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] rounded-xl p-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-[#547792]/10">
              <Building2 className="h-8 w-8 text-[#547792]" />
            </div>
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-2xl font-bold text-white">{customer.name}</h1>
                <StatusBadge status={customer.status} />
              </div>
              <div className="flex items-center gap-3 mt-1">
                <span className="text-[#64748b]">{customer.industry}</span>
                <span className="text-[#2e2e3e]">•</span>
                <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${colors.bg} ${colors.text}`}>
                  {customer.segment}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 rounded-lg border border-[#2e2e3e] px-4 py-2 text-sm font-medium text-white hover:bg-[#1a1a24] transition-colors">
              <Edit className="h-4 w-4" />
              Edit
            </button>
            <button className="flex items-center gap-2 rounded-lg bg-[#547792] px-4 py-2 text-sm font-medium text-white hover:bg-[#5558e3] transition-colors">
              <Plus className="h-4 w-4" />
              Create Opportunity
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

      {/* Tab Content */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Company Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-2 bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] rounded-xl p-6"
          >
            <h3 className="text-lg font-semibold text-white mb-4">Company Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-[#64748b]" />
                  <div>
                    <p className="text-xs text-[#64748b]">Email</p>
                    <a href={`mailto:${customer.email}`} className="text-[#547792] hover:underline">
                      {customer.email}
                    </a>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-[#64748b]" />
                  <div>
                    <p className="text-xs text-[#64748b]">Phone</p>
                    <p className="text-white">{customer.phone}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Globe className="h-5 w-5 text-[#64748b]" />
                  <div>
                    <p className="text-xs text-[#64748b]">Website</p>
                    <a href={`https://${customer.website}`} target="_blank" rel="noopener noreferrer" className="text-[#547792] hover:underline">
                      {customer.website}
                    </a>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-[#64748b]" />
                  <div>
                    <p className="text-xs text-[#64748b]">Address</p>
                    <p className="text-white">{customer.address}</p>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Building2 className="h-5 w-5 text-[#64748b]" />
                  <div>
                    <p className="text-xs text-[#64748b]">Industry</p>
                    <p className="text-white">{customer.industry}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <User className="h-5 w-5 text-[#64748b]" />
                  <div>
                    <p className="text-xs text-[#64748b]">Account Manager</p>
                    <p className="text-white">{customer.accountManager}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar className="h-5 w-5 text-[#64748b]" />
                  <div>
                    <p className="text-xs text-[#64748b]">Customer Since</p>
                    <p className="text-white">{new Date(customer.createdAt).toLocaleDateString()}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar className="h-5 w-5 text-[#64748b]" />
                  <div>
                    <p className="text-xs text-[#64748b]">Last Contact</p>
                    <p className="text-white">{new Date(customer.lastContact).toLocaleDateString()}</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Financial Summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] rounded-xl p-6"
          >
            <h3 className="text-lg font-semibold text-white mb-4">Financial Summary</h3>
            <div className="space-y-4">
              <div className="p-4 bg-[#1a1a24] rounded-lg">
                <div className="flex items-center gap-2 text-[#64748b] mb-1">
                  <DollarSign className="h-4 w-4" />
                  <span className="text-sm">Total Revenue</span>
                </div>
                <p className="text-2xl font-bold text-white">
                  ${customer.totalRevenue.toLocaleString()}
                </p>
              </div>
              <div className="p-4 bg-[#1a1a24] rounded-lg">
                <div className="flex items-center gap-2 text-[#64748b] mb-1">
                  <ShoppingBag className="h-4 w-4" />
                  <span className="text-sm">Total Orders</span>
                </div>
                <p className="text-2xl font-bold text-white">{customer.totalOrders}</p>
              </div>
              <div className="p-4 bg-[#1a1a24] rounded-lg">
                <div className="flex items-center gap-2 text-[#64748b] mb-1">
                  <TrendingUp className="h-4 w-4" />
                  <span className="text-sm">Avg Order Value</span>
                </div>
                <p className="text-2xl font-bold text-white">
                  ${Math.round(customer.totalRevenue / customer.totalOrders).toLocaleString()}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Notes */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-3 bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] rounded-xl p-6"
          >
            <h3 className="text-lg font-semibold text-white mb-4">Notes</h3>
            <textarea
              defaultValue={customer.notes}
              className="w-full h-32 bg-[#1a1a24] border border-[#2e2e3e] rounded-lg p-4 text-white placeholder-[#64748b] focus:outline-none focus:border-[#547792] resize-none"
              placeholder="Add notes about this customer..."
            />
          </motion.div>
        </div>
      )}

      {activeTab === 'contacts' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] rounded-xl p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">Contacts</h3>
            <button className="flex items-center gap-2 rounded-lg bg-[#547792] px-3 py-1.5 text-sm font-medium text-white hover:bg-[#5558e3] transition-colors">
              <Plus className="h-4 w-4" />
              Add Contact
            </button>
          </div>
          <div className="text-center py-8 text-[#64748b]">
            <User className="h-12 w-12 mx-auto mb-3 opacity-50" />
            <p>No contacts added yet</p>
            <p className="text-sm mt-1">Add contacts to keep track of your relationships</p>
          </div>
        </motion.div>
      )}

      {activeTab === 'opportunities' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <DataTable
            columns={opportunityColumns}
            data={opportunities}
            keyExtractor={(o) => o.id}
            emptyMessage="No opportunities for this customer"
          />
        </motion.div>
      )}

      {activeTab === 'activities' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          {activities.length === 0 ? (
            <div className="bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] rounded-xl p-6 text-center text-[#64748b]">
              <Calendar className="h-12 w-12 mx-auto mb-3 opacity-50" />
              <p>No activities recorded</p>
            </div>
          ) : (
            activities.map((activity) => {
              const Icon = activityTypeIcons[activity.type];
              return (
                <div
                  key={activity.id}
                  className="bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] rounded-xl p-4 flex items-start gap-4"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#547792]/10">
                    <Icon className="h-5 w-5 text-[#547792]" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-white">{activity.subject}</p>
                    <p className="text-sm text-[#64748b]">
                      {activity.contact && `${activity.contact} • `}
                      {activity.date} {activity.time && `at ${activity.time}`}
                      {activity.duration && ` • ${activity.duration}`}
                    </p>
                    <p className="text-sm text-[#94a3b8] mt-1">{activity.outcome}</p>
                  </div>
                  <span className="text-xs text-[#64748b]">{activity.assignedTo}</span>
                </div>
              );
            })
          )}
        </motion.div>
      )}

      {activeTab === 'documents' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] rounded-xl p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">Documents</h3>
            <button className="flex items-center gap-2 rounded-lg bg-[#547792] px-3 py-1.5 text-sm font-medium text-white hover:bg-[#5558e3] transition-colors">
              <Plus className="h-4 w-4" />
              Upload Document
            </button>
          </div>

          {contracts.length > 0 ? (
            <div className="space-y-3">
              {contracts.map((contract) => (
                <div
                  key={contract.id}
                  className="flex items-center gap-4 p-4 bg-[#1a1a24] rounded-lg"
                >
                  <FileText className="h-8 w-8 text-[#547792]" />
                  <div className="flex-1">
                    <p className="font-medium text-white">{contract.title}</p>
                    <p className="text-sm text-[#64748b]">
                      {contract.type} • ${contract.value.toLocaleString()}
                    </p>
                  </div>
                  <StatusBadge status={contract.status} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-[#64748b]">
              <FileText className="h-12 w-12 mx-auto mb-3 opacity-50" />
              <p>No documents uploaded yet</p>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
};
