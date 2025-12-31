import { useState } from 'react';
import { motion } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Edit,
  Phone,
  Mail,
  Calendar,
  Home,
  Building,
  Clock,
  Plus,
  MessageSquare,
  Eye,
  Heart,
  CheckCircle,
} from 'lucide-react';
import { PageHeader } from '@/components/common';
import {
  leads,
  properties,
  getLeadStatusColor,
  getLeadTypeColor,
  formatCurrency,
} from '@/data/realestate/realestateData';

type TabType = 'profile' | 'properties' | 'activity' | 'notes';

export const LeadDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<TabType>('profile');

  const lead = leads.find((l) => l.id === id);

  if (!lead) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-white mb-2">Lead Not Found</h2>
          <p className="text-[#64748b] mb-4">The lead you're looking for doesn't exist.</p>
          <button
            onClick={() => navigate('/dashboard/realestate/leads')}
            className="text-indigo-400 hover:text-indigo-300"
          >
            Back to Leads
          </button>
        </div>
      </div>
    );
  }

  const tabs: { id: TabType; label: string }[] = [
    { id: 'profile', label: 'Profile' },
    { id: 'properties', label: 'Properties' },
    { id: 'activity', label: 'Activity' },
    { id: 'notes', label: 'Notes' },
  ];

  const viewedProperties = properties.filter((p) => lead.propertiesViewed?.includes(p.id));
  const favoriteProperties = properties.filter((p) => lead.favoriteProperties?.includes(p.id));

  return (
    <div className="space-y-6">
      <PageHeader
        title=""
        actions={
          <div className="flex items-center gap-2">
            <button
              onClick={() => navigate('/dashboard/realestate/leads')}
              className="flex items-center gap-2 rounded-lg border border-[#1e1e2e] px-3 py-2 text-sm text-[#94a3b8] hover:text-white hover:border-[#2e2e3e] transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </button>
            <button className="flex items-center gap-2 rounded-lg border border-[#1e1e2e] px-3 py-2 text-sm text-[#94a3b8] hover:text-white hover:border-[#2e2e3e] transition-colors">
              <Edit className="h-4 w-4" />
              Edit
            </button>
            <button className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 px-4 py-2 text-sm font-medium text-white hover:opacity-90 transition-opacity">
              <Calendar className="h-4 w-4" />
              Schedule Showing
            </button>
          </div>
        }
      />

      {/* Header */}
      <div className="rounded-xl border border-[#1e1e2e] bg-[#12121a] p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold text-xl">
              {lead.firstName.charAt(0)}{lead.lastName.charAt(0)}
            </div>
            <div>
              <div className="flex items-center gap-3 mb-1">
                <h1 className="text-2xl font-bold text-white">{lead.firstName} {lead.lastName}</h1>
                <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getLeadTypeColor(lead.type)}`}>
                  {lead.type.charAt(0).toUpperCase() + lead.type.slice(1)}
                </span>
                <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getLeadStatusColor(lead.status)}`}>
                  {lead.status.charAt(0).toUpperCase() + lead.status.slice(1)}
                </span>
              </div>
              <p className="text-[#64748b]">Lead ID: {lead.leadId}</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <a
              href={`tel:${lead.phone}`}
              className="flex items-center gap-2 rounded-lg border border-[#1e1e2e] px-4 py-2 text-sm text-[#94a3b8] hover:text-white hover:border-[#2e2e3e] transition-colors"
            >
              <Phone className="h-4 w-4" />
              {lead.phone}
            </a>
            <a
              href={`mailto:${lead.email}`}
              className="flex items-center gap-2 rounded-lg border border-[#1e1e2e] px-4 py-2 text-sm text-[#94a3b8] hover:text-white hover:border-[#2e2e3e] transition-colors"
            >
              <Mail className="h-4 w-4" />
              {lead.email}
            </a>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-[#1e1e2e]">
        <nav className="flex gap-4">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`relative px-4 py-3 text-sm font-medium transition-colors ${
                activeTab === tab.id ? 'text-white' : 'text-[#64748b] hover:text-white'
              }`}
            >
              {tab.label}
              {activeTab === tab.id && (
                <motion.div
                  layoutId="activeLeadTab"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-indigo-500 to-purple-500"
                />
              )}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {activeTab === 'profile' && (
            <>
              {/* Preferences */}
              {lead.preferences && (
                <div className="rounded-xl border border-[#1e1e2e] bg-[#12121a] p-6">
                  <h3 className="text-lg font-semibold text-white mb-4">Preferences</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-xs text-[#64748b] mb-1">Property Types</div>
                      <div className="flex flex-wrap gap-1">
                        {lead.preferences.propertyTypes.map((type) => (
                          <span key={type} className="px-2 py-1 rounded bg-[#1a1a24] text-sm text-[#94a3b8] capitalize">
                            {type}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-[#64748b] mb-1">Locations</div>
                      <div className="flex flex-wrap gap-1">
                        {lead.preferences.locations.map((loc) => (
                          <span key={loc} className="px-2 py-1 rounded bg-[#1a1a24] text-sm text-[#94a3b8]">
                            {loc}
                          </span>
                        ))}
                      </div>
                    </div>
                    {lead.preferences.bedrooms && (
                      <div>
                        <div className="text-xs text-[#64748b] mb-1">Bedrooms</div>
                        <span className="text-white">{lead.preferences.bedrooms.min} - {lead.preferences.bedrooms.max}</span>
                      </div>
                    )}
                    {lead.preferences.features && (
                      <div>
                        <div className="text-xs text-[#64748b] mb-1">Features</div>
                        <div className="flex flex-wrap gap-1">
                          {lead.preferences.features.map((feature) => (
                            <span key={feature} className="px-2 py-1 rounded bg-[#1a1a24] text-sm text-[#94a3b8] capitalize">
                              {feature.replace('-', ' ')}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Budget */}
              {lead.budget && (
                <div className="rounded-xl border border-[#1e1e2e] bg-[#12121a] p-6">
                  <h3 className="text-lg font-semibold text-white mb-4">Budget</h3>
                  <div className="flex items-center gap-4">
                    <div className="flex-1 p-4 rounded-lg bg-[#1a1a24]">
                      <div className="text-xs text-[#64748b] mb-1">Minimum</div>
                      <div className="text-xl font-bold text-white">{formatCurrency(lead.budget.min)}</div>
                    </div>
                    <div className="text-[#64748b]">—</div>
                    <div className="flex-1 p-4 rounded-lg bg-[#1a1a24]">
                      <div className="text-xs text-[#64748b] mb-1">Maximum</div>
                      <div className="text-xl font-bold text-white">{formatCurrency(lead.budget.max)}</div>
                    </div>
                  </div>
                </div>
              )}

              {/* Pre-Approval */}
              {lead.preApproved && (
                <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <CheckCircle className="h-6 w-6 text-emerald-400" />
                    <h3 className="text-lg font-semibold text-white">Pre-Approved</h3>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-xs text-[#64748b] mb-1">Amount</div>
                      <div className="text-xl font-bold text-emerald-400">{formatCurrency(lead.preApprovalAmount!)}</div>
                    </div>
                    <div>
                      <div className="text-xs text-[#64748b] mb-1">Lender</div>
                      <div className="text-white">{lead.preApprovalLender}</div>
                    </div>
                  </div>
                </div>
              )}

              {/* Seller Property */}
              {lead.propertyAddress && (
                <div className="rounded-xl border border-[#1e1e2e] bg-[#12121a] p-6">
                  <h3 className="text-lg font-semibold text-white mb-4">Property to Sell</h3>
                  <div className="flex items-center gap-4">
                    <div className="h-16 w-24 rounded-lg bg-[#1a1a24] flex items-center justify-center">
                      <Home className="h-8 w-8 text-[#2e2e3e]" />
                    </div>
                    <div>
                      <div className="text-white font-medium">{lead.propertyAddress}</div>
                      {lead.estimatedValue && (
                        <div className="text-sm text-emerald-400">Est. Value: {formatCurrency(lead.estimatedValue)}</div>
                      )}
                      {lead.motivation && (
                        <div className="text-xs text-[#64748b] mt-1">Motivation: {lead.motivation}</div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Notes */}
              <div className="rounded-xl border border-[#1e1e2e] bg-[#12121a] p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Notes</h3>
                <p className="text-[#94a3b8] leading-relaxed">{lead.notes}</p>
              </div>
            </>
          )}

          {activeTab === 'properties' && (
            <>
              {/* Viewed Properties */}
              <div className="rounded-xl border border-[#1e1e2e] bg-[#12121a] p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                    <Eye className="h-5 w-5 text-indigo-400" />
                    Viewed Properties ({viewedProperties.length})
                  </h3>
                </div>
                {viewedProperties.length > 0 ? (
                  <div className="space-y-3">
                    {viewedProperties.map((property) => (
                      <div
                        key={property.id}
                        className="flex items-center gap-4 p-3 rounded-lg bg-[#1a1a24] hover:bg-[#1e1e2e] cursor-pointer transition-colors"
                        onClick={() => navigate(`/dashboard/realestate/properties/${property.id}`)}
                      >
                        <div className="h-12 w-16 rounded-lg bg-[#0a0a0f] flex items-center justify-center">
                          <Building className="h-6 w-6 text-[#2e2e3e]" />
                        </div>
                        <div className="flex-1">
                          <div className="text-white font-medium">{property.title}</div>
                          <div className="text-xs text-[#64748b]">{property.address.street}, {property.address.city}</div>
                        </div>
                        <div className="text-right">
                          <div className="text-white font-semibold">${property.price.toLocaleString()}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-[#64748b] text-center py-4">No properties viewed yet</p>
                )}
              </div>

              {/* Favorite Properties */}
              <div className="rounded-xl border border-[#1e1e2e] bg-[#12121a] p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                    <Heart className="h-5 w-5 text-red-400" />
                    Favorite Properties ({favoriteProperties.length})
                  </h3>
                </div>
                {favoriteProperties.length > 0 ? (
                  <div className="space-y-3">
                    {favoriteProperties.map((property) => (
                      <div
                        key={property.id}
                        className="flex items-center gap-4 p-3 rounded-lg bg-[#1a1a24] hover:bg-[#1e1e2e] cursor-pointer transition-colors"
                        onClick={() => navigate(`/dashboard/realestate/properties/${property.id}`)}
                      >
                        <div className="h-12 w-16 rounded-lg bg-[#0a0a0f] flex items-center justify-center">
                          <Building className="h-6 w-6 text-[#2e2e3e]" />
                        </div>
                        <div className="flex-1">
                          <div className="text-white font-medium">{property.title}</div>
                          <div className="text-xs text-[#64748b]">{property.address.street}, {property.address.city}</div>
                        </div>
                        <div className="text-right">
                          <div className="text-white font-semibold">${property.price.toLocaleString()}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-[#64748b] text-center py-4">No favorite properties yet</p>
                )}
              </div>

              {/* Schedule Showing */}
              <button className="w-full flex items-center justify-center gap-2 rounded-xl border border-dashed border-[#2e2e3e] bg-[#12121a] p-6 text-[#94a3b8] hover:text-white hover:border-indigo-500/50 transition-colors">
                <Plus className="h-5 w-5" />
                Schedule a Property Showing
              </button>
            </>
          )}

          {activeTab === 'activity' && (
            <div className="rounded-xl border border-[#1e1e2e] bg-[#12121a] p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-white">Activity Timeline</h3>
                <button className="flex items-center gap-2 rounded-lg border border-[#1e1e2e] px-3 py-1.5 text-sm text-[#94a3b8] hover:text-white hover:border-[#2e2e3e] transition-colors">
                  <Plus className="h-4 w-4" />
                  Add Activity
                </button>
              </div>
              <div className="space-y-4">
                {lead.activities.map((activity, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="h-8 w-8 rounded-full bg-indigo-500/20 flex items-center justify-center">
                        <MessageSquare className="h-4 w-4 text-indigo-400" />
                      </div>
                      {index < lead.activities.length - 1 && (
                        <div className="w-px h-full bg-[#1e1e2e] my-2" />
                      )}
                    </div>
                    <div className="flex-1 pb-4">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-white font-medium capitalize">{activity.type}</span>
                        <span className="text-xs text-[#64748b]">{activity.date}</span>
                      </div>
                      <p className="text-sm text-[#94a3b8]">{activity.notes}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'notes' && (
            <div className="rounded-xl border border-[#1e1e2e] bg-[#12121a] p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-white">Notes</h3>
                <button className="flex items-center gap-2 rounded-lg border border-[#1e1e2e] px-3 py-1.5 text-sm text-[#94a3b8] hover:text-white hover:border-[#2e2e3e] transition-colors">
                  <Plus className="h-4 w-4" />
                  Add Note
                </button>
              </div>
              <div className="p-4 rounded-lg bg-[#1a1a24]">
                <p className="text-[#94a3b8]">{lead.notes}</p>
                <div className="text-xs text-[#64748b] mt-2">Added on {lead.createdAt}</div>
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Info */}
          <div className="rounded-xl border border-[#1e1e2e] bg-[#12121a] p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Quick Info</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-[#64748b]">Source</span>
                <span className="text-white">{lead.source}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#64748b]">Timeline</span>
                <span className="text-white">{lead.timeline}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#64748b]">Created</span>
                <span className="text-white">{lead.createdAt}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#64748b]">Last Contact</span>
                <span className="text-white">{lead.lastContact}</span>
              </div>
            </div>
          </div>

          {/* Assigned Agent */}
          <div className="rounded-xl border border-[#1e1e2e] bg-[#12121a] p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Assigned Agent</h3>
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold">
                {lead.assignedAgent.split(' ').map(n => n.charAt(0)).join('')}
              </div>
              <div>
                <div className="text-white font-medium">{lead.assignedAgent}</div>
                <div className="text-sm text-[#64748b]">Agent</div>
              </div>
            </div>
          </div>

          {/* Next Follow-up */}
          <div className="rounded-xl border border-amber-500/30 bg-amber-500/10 p-6">
            <h3 className="text-lg font-semibold text-white mb-2 flex items-center gap-2">
              <Clock className="h-5 w-5 text-amber-400" />
              Next Follow-up
            </h3>
            <p className="text-amber-400 font-medium">{lead.nextFollowUp}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
