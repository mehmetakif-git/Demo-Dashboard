import { useState } from 'react';
import { motion } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Edit,
  Share2,
  Calendar,
  Printer,
  MapPin,
  Bed,
  Bath,
  Square,
  Car,
  Home,
  Building,
  Eye,
  MessageSquare,
  Users,
  Clock,
  TrendingDown,
  ExternalLink,
  Phone,
  Mail,
  FileText,
  Play,
} from 'lucide-react';
import { PageHeader } from '@/components/common';
import {
  properties,
  formatPrice,
  getPropertyStatusColor,
} from '@/data/realestate/realestateData';

type TabType = 'overview' | 'details' | 'activity' | 'documents' | 'financials';

export const PropertyDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<TabType>('overview');

  const property = properties.find((p) => p.id === id);

  if (!property) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-white mb-2">Property Not Found</h2>
          <p className="text-[#64748b] mb-4">The property you're looking for doesn't exist.</p>
          <button
            onClick={() => navigate('/dashboard/realestate/properties')}
            className="text-[#547792] hover:text-indigo-300"
          >
            Back to Properties
          </button>
        </div>
      </div>
    );
  }

  const tabs: { id: TabType; label: string }[] = [
    { id: 'overview', label: 'Overview' },
    { id: 'details', label: 'Details' },
    { id: 'activity', label: 'Activity' },
    { id: 'documents', label: 'Documents' },
    ...(property.type === 'multi-family' || property.financials ? [{ id: 'financials' as TabType, label: 'Financials' }] : []),
  ];

  const formatFullAddress = () => {
    const parts = [property.address.street];
    if (property.address.unit) parts.push(property.address.unit);
    parts.push(`${property.address.city}, ${property.address.state} ${property.address.zipCode}`);
    return parts.join(', ');
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title=""
        actions={
          <div className="flex items-center gap-2">
            <button
              onClick={() => navigate('/dashboard/realestate/properties')}
              className="flex items-center gap-2 rounded-lg border border-white/[0.08] px-3 py-2 text-sm text-[#94a3b8] hover:text-white hover:border-[#2e2e3e] transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </button>
            <button className="flex items-center gap-2 rounded-lg border border-white/[0.08] px-3 py-2 text-sm text-[#94a3b8] hover:text-white hover:border-[#2e2e3e] transition-colors">
              <Edit className="h-4 w-4" />
              Edit
            </button>
            <button className="flex items-center gap-2 rounded-lg border border-white/[0.08] px-3 py-2 text-sm text-[#94a3b8] hover:text-white hover:border-[#2e2e3e] transition-colors">
              <Share2 className="h-4 w-4" />
              Share
            </button>
            <button className="flex items-center gap-2 rounded-lg border border-white/[0.08] px-3 py-2 text-sm text-[#94a3b8] hover:text-white hover:border-[#2e2e3e] transition-colors">
              <Calendar className="h-4 w-4" />
              Schedule Showing
            </button>
            <button className="flex items-center gap-2 rounded-lg border border-white/[0.08] px-3 py-2 text-sm text-[#94a3b8] hover:text-white hover:border-[#2e2e3e] transition-colors">
              <Printer className="h-4 w-4" />
              Print
            </button>
          </div>
        }
      />

      {/* Image Gallery */}
      <div className="grid grid-cols-4 gap-4">
        <div className="col-span-2 row-span-2 aspect-[4/3] rounded-xl bg-gradient-to-br from-[#1a1a24] to-[#0a0a0f] border border-white/[0.08] flex items-center justify-center">
          <Building className="h-24 w-24 text-[#2e2e3e]" />
        </div>
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="aspect-[4/3] rounded-xl bg-gradient-to-br from-[#1a1a24] to-[#0a0a0f] border border-white/[0.08] flex items-center justify-center"
          >
            <Building className="h-12 w-12 text-[#2e2e3e]" />
          </div>
        ))}
      </div>

      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <span className={`rounded-full px-3 py-1 text-xs font-medium ${getPropertyStatusColor(property.status)}`}>
              {property.status.charAt(0).toUpperCase() + property.status.slice(1)}
            </span>
            <span className={`rounded-full px-3 py-1 text-xs font-medium ${
              property.category === 'sale' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-blue-500/20 text-blue-400'
            }`}>
              {property.category === 'sale' ? 'For Sale' : 'For Rent'}
            </span>
            {property.mlsNumber && (
              <span className="text-xs text-[#64748b]">MLS# {property.mlsNumber}</span>
            )}
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">{property.title}</h1>
          <p className="text-[#94a3b8] flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            {formatFullAddress()}
          </p>
        </div>
        <div className="text-right">
          <div className="text-3xl font-bold text-white">
            {formatPrice(property.price, property.category)}
          </div>
          {property.pricePerSqft && (
            <p className="text-sm text-[#64748b]">${property.pricePerSqft}/sqft</p>
          )}
        </div>
      </div>

      {/* Key Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {property.size.bedrooms !== undefined && (
          <div className="rounded-xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl p-4 text-center">
            <Bed className="h-6 w-6 text-[#547792] mx-auto mb-2" />
            <div className="text-xl font-bold text-white">{property.size.bedrooms}</div>
            <div className="text-xs text-[#64748b]">Bedrooms</div>
          </div>
        )}
        {property.size.bathrooms !== undefined && (
          <div className="rounded-xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl p-4 text-center">
            <Bath className="h-6 w-6 text-[#547792] mx-auto mb-2" />
            <div className="text-xl font-bold text-white">{property.size.bathrooms}</div>
            <div className="text-xs text-[#64748b]">Bathrooms</div>
          </div>
        )}
        <div className="rounded-xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl p-4 text-center">
          <Square className="h-6 w-6 text-[#547792] mx-auto mb-2" />
          <div className="text-xl font-bold text-white">{property.size.sqft.toLocaleString()}</div>
          <div className="text-xs text-[#64748b]">Sqft</div>
        </div>
        <div className="rounded-xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl p-4 text-center">
          <Home className="h-6 w-6 text-[#547792] mx-auto mb-2" />
          <div className="text-xl font-bold text-white">{property.features.yearBuilt}</div>
          <div className="text-xs text-[#64748b]">Year Built</div>
        </div>
        <div className="rounded-xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl p-4 text-center">
          <Car className="h-6 w-6 text-[#547792] mx-auto mb-2" />
          <div className="text-xl font-bold text-white">{property.features.parking}</div>
          <div className="text-xs text-[#64748b]">Parking</div>
        </div>
        <div className="rounded-xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl p-4 text-center">
          <Clock className="h-6 w-6 text-[#547792] mx-auto mb-2" />
          <div className="text-xl font-bold text-white">{property.daysOnMarket}</div>
          <div className="text-xs text-[#64748b]">Days on Market</div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-white/[0.08]">
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
                  layoutId="activePropertyTab"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#547792] to-[#94B4C1]"
                />
              )}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {activeTab === 'overview' && (
            <>
              {/* Description */}
              <div className="rounded-xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Description</h3>
                <p className="text-[#94a3b8] leading-relaxed">{property.description}</p>
              </div>

              {/* Features */}
              <div className="rounded-xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Key Features</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {property.features.garage && (
                    <div className="flex items-center gap-2 text-sm text-[#94a3b8]">
                      <Car className="h-4 w-4 text-[#547792]" />
                      Garage
                    </div>
                  )}
                  {property.features.pool && (
                    <div className="flex items-center gap-2 text-sm text-[#94a3b8]">
                      <div className="h-4 w-4 text-[#547792]">🏊</div>
                      Pool
                    </div>
                  )}
                  {property.features.gym && (
                    <div className="flex items-center gap-2 text-sm text-[#94a3b8]">
                      <div className="h-4 w-4 text-[#547792]">💪</div>
                      Gym
                    </div>
                  )}
                  {property.features.doorman && (
                    <div className="flex items-center gap-2 text-sm text-[#94a3b8]">
                      <Users className="h-4 w-4 text-[#547792]" />
                      Doorman
                    </div>
                  )}
                  {property.features.elevator && (
                    <div className="flex items-center gap-2 text-sm text-[#94a3b8]">
                      <div className="h-4 w-4 text-[#547792]">🛗</div>
                      Elevator
                    </div>
                  )}
                  {property.features.laundry && (
                    <div className="flex items-center gap-2 text-sm text-[#94a3b8]">
                      <div className="h-4 w-4 text-[#547792]">🧺</div>
                      {property.features.laundry}
                    </div>
                  )}
                </div>
              </div>

              {/* Amenities */}
              <div className="rounded-xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Amenities</h3>
                <div className="flex flex-wrap gap-2">
                  {property.amenities.map((amenity) => (
                    <span
                      key={amenity}
                      className="rounded-full bg-[#1a1a24] px-3 py-1 text-sm text-[#94a3b8]"
                    >
                      {amenity}
                    </span>
                  ))}
                </div>
              </div>

              {/* Location Map Placeholder */}
              <div className="rounded-xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Location</h3>
                <div className="aspect-video rounded-lg bg-[#1a1a24] flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="h-12 w-12 text-[#2e2e3e] mx-auto mb-2" />
                    <p className="text-sm text-[#64748b]">Interactive map coming soon</p>
                  </div>
                </div>
              </div>
            </>
          )}

          {activeTab === 'details' && (
            <>
              {/* Property Specifications */}
              <div className="rounded-xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Property Specifications</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex justify-between py-2 border-b border-white/[0.08]">
                    <span className="text-[#64748b]">Property Type</span>
                    <span className="text-white capitalize">{property.type}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-white/[0.08]">
                    <span className="text-[#64748b]">Year Built</span>
                    <span className="text-white">{property.features.yearBuilt}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-white/[0.08]">
                    <span className="text-[#64748b]">Heating</span>
                    <span className="text-white capitalize">{property.features.heating || 'N/A'}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-white/[0.08]">
                    <span className="text-[#64748b]">Cooling</span>
                    <span className="text-white capitalize">{property.features.cooling || 'N/A'}</span>
                  </div>
                  {property.features.flooring && (
                    <div className="flex justify-between py-2 border-b border-white/[0.08]">
                      <span className="text-[#64748b]">Flooring</span>
                      <span className="text-white capitalize">{property.features.flooring.join(', ')}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* HOA Info */}
              {property.hoa && (
                <div className="rounded-xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl p-6">
                  <h3 className="text-lg font-semibold text-white mb-4">HOA Information</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-[#64748b]">Monthly Fee</span>
                      <span className="text-white">${property.hoa.fee.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#64748b]">Includes</span>
                      <span className="text-white capitalize">{property.hoa.includes.join(', ')}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Tax Info */}
              {property.taxInfo && (
                <div className="rounded-xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl p-6">
                  <h3 className="text-lg font-semibold text-white mb-4">Tax Information</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-[#64748b]">Annual Tax</span>
                      <span className="text-white">${property.taxInfo.annualTax.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#64748b]">Tax Year</span>
                      <span className="text-white">{property.taxInfo.taxYear}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Price History */}
              <div className="rounded-xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Price History</h3>
                <div className="space-y-3">
                  {property.priceHistory.map((history, index) => (
                    <div key={index} className="flex items-center justify-between py-2 border-b border-white/[0.08]">
                      <div className="flex items-center gap-3">
                        <TrendingDown className="h-4 w-4 text-[#64748b]" />
                        <span className="text-[#94a3b8]">{history.date}</span>
                        <span className="text-xs text-[#64748b]">{history.event}</span>
                      </div>
                      <span className="text-white font-medium">${history.price.toLocaleString()}</span>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {activeTab === 'activity' && (
            <>
              {/* Stats */}
              <div className="grid grid-cols-3 gap-4">
                <div className="rounded-xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl p-4 text-center">
                  <Eye className="h-6 w-6 text-[#547792] mx-auto mb-2" />
                  <div className="text-2xl font-bold text-white">{property.views.toLocaleString()}</div>
                  <div className="text-xs text-[#64748b]">Views</div>
                </div>
                <div className="rounded-xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl p-4 text-center">
                  <MessageSquare className="h-6 w-6 text-[#547792] mx-auto mb-2" />
                  <div className="text-2xl font-bold text-white">{property.inquiries}</div>
                  <div className="text-xs text-[#64748b]">Inquiries</div>
                </div>
                <div className="rounded-xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl p-4 text-center">
                  <Calendar className="h-6 w-6 text-[#547792] mx-auto mb-2" />
                  <div className="text-2xl font-bold text-white">{property.showings}</div>
                  <div className="text-xs text-[#64748b]">Showings</div>
                </div>
              </div>

              {/* Open House */}
              {property.openHouse?.scheduled && (
                <div className="rounded-xl border border-amber-500/30 bg-amber-500/10 p-6">
                  <h3 className="text-lg font-semibold text-white mb-2 flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-amber-400" />
                    Upcoming Open House
                  </h3>
                  <p className="text-[#94a3b8]">
                    {property.openHouse.date} at {property.openHouse.time}
                  </p>
                </div>
              )}

              {/* Activity Placeholder */}
              <div className="rounded-xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Recent Activity</h3>
                <div className="text-center py-8">
                  <Clock className="h-12 w-12 text-[#2e2e3e] mx-auto mb-3" />
                  <p className="text-[#64748b]">Activity timeline coming soon</p>
                </div>
              </div>
            </>
          )}

          {activeTab === 'documents' && (
            <div className="rounded-xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Documents</h3>
              <div className="space-y-3">
                {property.floorPlan && (
                  <div className="flex items-center justify-between p-3 rounded-lg bg-[#1a1a24] hover:bg-[#1e1e2e] transition-colors cursor-pointer">
                    <div className="flex items-center gap-3">
                      <FileText className="h-5 w-5 text-[#547792]" />
                      <span className="text-white">Floor Plan</span>
                    </div>
                    <ExternalLink className="h-4 w-4 text-[#64748b]" />
                  </div>
                )}
                {property.virtualTour && (
                  <div className="flex items-center justify-between p-3 rounded-lg bg-[#1a1a24] hover:bg-[#1e1e2e] transition-colors cursor-pointer">
                    <div className="flex items-center gap-3">
                      <Play className="h-5 w-5 text-[#547792]" />
                      <span className="text-white">Virtual Tour</span>
                    </div>
                    <ExternalLink className="h-4 w-4 text-[#64748b]" />
                  </div>
                )}
                <div className="flex items-center justify-between p-3 rounded-lg bg-[#1a1a24] hover:bg-[#1e1e2e] transition-colors cursor-pointer">
                  <div className="flex items-center gap-3">
                    <FileText className="h-5 w-5 text-[#547792]" />
                    <span className="text-white">Listing Agreement</span>
                  </div>
                  <ExternalLink className="h-4 w-4 text-[#64748b]" />
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-[#1a1a24] hover:bg-[#1e1e2e] transition-colors cursor-pointer">
                  <div className="flex items-center gap-3">
                    <FileText className="h-5 w-5 text-[#547792]" />
                    <span className="text-white">Property Disclosures</span>
                  </div>
                  <ExternalLink className="h-4 w-4 text-[#64748b]" />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'financials' && property.financials && (
            <>
              {/* Unit Mix */}
              {property.unitMix && (
                <div className="rounded-xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl p-6">
                  <h3 className="text-lg font-semibold text-white mb-4">Unit Mix</h3>
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-white/[0.08]">
                        <th className="py-2 text-left text-xs font-medium text-[#64748b]">Unit</th>
                        <th className="py-2 text-left text-xs font-medium text-[#64748b]">Beds/Baths</th>
                        <th className="py-2 text-left text-xs font-medium text-[#64748b]">Sqft</th>
                        <th className="py-2 text-left text-xs font-medium text-[#64748b]">Rent</th>
                        <th className="py-2 text-left text-xs font-medium text-[#64748b]">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {property.unitMix.map((unit) => (
                        <tr key={unit.unit} className="border-b border-white/[0.08]">
                          <td className="py-3 text-white">{unit.unit}</td>
                          <td className="py-3 text-[#94a3b8]">{unit.bedrooms}BR / {unit.bathrooms}BA</td>
                          <td className="py-3 text-[#94a3b8]">{unit.sqft.toLocaleString()}</td>
                          <td className="py-3 text-white">${unit.rent.toLocaleString()}/mo</td>
                          <td className="py-3">
                            <span className={`px-2 py-1 rounded-full text-xs ${
                              unit.status === 'occupied' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400'
                            }`}>
                              {unit.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {/* Financials */}
              <div className="rounded-xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Financial Summary</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-lg bg-[#1a1a24]">
                    <div className="text-[#64748b] text-sm mb-1">Gross Income</div>
                    <div className="text-xl font-bold text-white">${property.financials.grossIncome.toLocaleString()}/yr</div>
                  </div>
                  <div className="p-4 rounded-lg bg-[#1a1a24]">
                    <div className="text-[#64748b] text-sm mb-1">Expenses</div>
                    <div className="text-xl font-bold text-white">${property.financials.expenses.toLocaleString()}/yr</div>
                  </div>
                  <div className="p-4 rounded-lg bg-[#1a1a24]">
                    <div className="text-[#64748b] text-sm mb-1">NOI</div>
                    <div className="text-xl font-bold text-emerald-400">${property.financials.noi.toLocaleString()}/yr</div>
                  </div>
                  <div className="p-4 rounded-lg bg-[#1a1a24]">
                    <div className="text-[#64748b] text-sm mb-1">Cap Rate</div>
                    <div className="text-xl font-bold text-[#547792]">{property.financials.capRate}%</div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Agent Info */}
          <div className="rounded-xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Listing Agent</h3>
            <div className="flex items-center gap-4 mb-4">
              <div className="h-14 w-14 rounded-full bg-gradient-to-br from-[#547792] to-[#94B4C1] flex items-center justify-center text-white font-bold text-lg">
                {property.agent.name.charAt(0)}
              </div>
              <div>
                <div className="text-white font-medium">{property.agent.name}</div>
                <div className="text-sm text-[#64748b]">Listing Agent</div>
              </div>
            </div>
            <div className="space-y-3">
              {property.agent.phone && (
                <a href={`tel:${property.agent.phone}`} className="flex items-center gap-3 text-sm text-[#94a3b8] hover:text-white transition-colors">
                  <Phone className="h-4 w-4" />
                  {property.agent.phone}
                </a>
              )}
              {property.agent.email && (
                <a href={`mailto:${property.agent.email}`} className="flex items-center gap-3 text-sm text-[#94a3b8] hover:text-white transition-colors">
                  <Mail className="h-4 w-4" />
                  {property.agent.email}
                </a>
              )}
            </div>
          </div>

          {/* Owner Info */}
          <div className="rounded-xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Property Owner</h3>
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-lg bg-[#1a1a24] flex items-center justify-center">
                {property.owner.type === 'company' ? (
                  <Building className="h-6 w-6 text-[#64748b]" />
                ) : (
                  <Users className="h-6 w-6 text-[#64748b]" />
                )}
              </div>
              <div>
                <div className="text-white font-medium">{property.owner.name}</div>
                <div className="text-sm text-[#64748b] capitalize">{property.owner.type}</div>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="rounded-xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Quick Stats</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-[#64748b]">Listed</span>
                <span className="text-white">{property.listingDate}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#64748b]">Expires</span>
                <span className="text-white">{property.expirationDate}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#64748b]">Commission</span>
                <span className="text-white">{property.commission}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#64748b]">Views</span>
                <span className="text-white">{property.views.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#64748b]">Inquiries</span>
                <span className="text-white">{property.inquiries}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
