import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Check,
  ChevronRight,
  LayoutDashboard,
  Users,
  Calculator,
  Target,
  CheckSquare,
  Shield,
  Monitor,
  MessageCircle,
  FolderOpen,
  FileText,
  Wrench,
  QrCode,
  Settings,
  Dumbbell,
  Building,
  Briefcase,
  Megaphone,
  Calendar,
  Info,
  Sparkles,
  ArrowLeft,
  type LucideIcon,
  UtensilsCrossed,
} from 'lucide-react';
import { useAppStore } from '@/store/appStore';
import { getSectorById } from '@/data/sectors';
import { GlareHover } from '@/components/common';

// Module definition interface
interface ModuleDefinition {
  id: string;
  name: string;
  icon: LucideIcon;
  description: string;
  color: string;
  required?: boolean;
}

// Define all common modules with unique colors
const commonModules: ModuleDefinition[] = [
  {
    id: 'dashboard',
    name: 'Dashboard',
    icon: LayoutDashboard,
    description: 'Main control panel',
    color: '#8b5cf6', // Purple
    required: true,
  },
  { id: 'hr', name: 'HR / Human Resources', icon: Users, description: 'Employee management, leaves, payroll', color: '#3b82f6' }, // Blue
  { id: 'accounting', name: 'Accounting', icon: Calculator, description: 'Invoices, payments, reports', color: '#10b981' }, // Emerald
  { id: 'crm', name: 'CRM', icon: Target, description: 'Customer relationship management', color: '#f97316' }, // Orange
  { id: 'tasks', name: 'Task Management', icon: CheckSquare, description: 'Projects, tasks, kanban', color: '#06b6d4' }, // Cyan
  {
    id: 'access-control',
    name: 'Access Control',
    icon: Shield,
    description: 'CCTV, door access, visitors',
    color: '#ef4444', // Red
  },
  { id: 'signage', name: 'Digital Signage', icon: Monitor, description: 'Display management, content scheduling', color: '#ec4899' }, // Pink
  { id: 'communication', name: 'Communication', icon: MessageCircle, description: 'Chat, announcements, directory', color: '#14b8a6' }, // Teal
  { id: 'files', name: 'File Management', icon: FolderOpen, description: 'Documents, sharing, archive', color: '#f59e0b' }, // Amber
  { id: 'reports', name: 'Reports', icon: FileText, description: 'Report builder, export', color: '#6366f1' }, // Indigo
  {
    id: 'maintenance',
    name: 'Maintenance',
    icon: Wrench,
    description: 'Equipment, work orders, inventory',
    color: '#84cc16', // Lime
  },
  { id: 'qr-codes', name: 'QR Code Management', icon: QrCode, description: 'QR codes, analytics, templates', color: '#a855f7' }, // Purple lighter
  {
    id: 'settings',
    name: 'Settings',
    icon: Settings,
    description: 'System settings, users',
    color: '#64748b', // Slate
    required: true,
  },
];

// Sector-specific modules with unique colors
const sectorModules: Record<string, ModuleDefinition[]> = {
  gym: [
    { id: 'gym-members', name: 'Members', icon: Users, description: 'Member management, memberships', color: '#22c55e' }, // Green
    { id: 'gym-classes', name: 'Classes', icon: Calendar, description: 'Class schedule, reservations', color: '#f97316' }, // Orange
    { id: 'gym-trainers', name: 'Trainers', icon: Dumbbell, description: 'PT management, appointments', color: '#ef4444' }, // Red
    { id: 'gym-equipment', name: 'Equipment', icon: Wrench, description: 'Equipment tracking, maintenance', color: '#64748b' }, // Slate
    { id: 'gym-assessments', name: 'Assessments', icon: FileText, description: 'Fitness tests', color: '#06b6d4' }, // Cyan
  ],
  staffing: [
    { id: 'staffing-candidates', name: 'Candidates', icon: Users, description: 'Candidate database', color: '#3b82f6' }, // Blue
    { id: 'staffing-jobs', name: 'Job Orders', icon: Briefcase, description: 'Open positions', color: '#8b5cf6' }, // Purple
    { id: 'staffing-placements', name: 'Placements', icon: Check, description: 'Active placements', color: '#22c55e' }, // Green
    { id: 'staffing-timesheets', name: 'Timesheets', icon: Calendar, description: 'Working hours', color: '#f59e0b' }, // Amber
    { id: 'staffing-payroll', name: 'Payroll', icon: Calculator, description: 'Payment management', color: '#10b981' }, // Emerald
  ],
  realestate: [
    { id: 'realestate-properties', name: 'Properties', icon: Building, description: 'Listing management', color: '#6366f1' }, // Indigo
    { id: 'realestate-leads', name: 'Leads', icon: Users, description: 'Buyer/tenant management', color: '#f97316' }, // Orange
    { id: 'realestate-showings', name: 'Showings', icon: Calendar, description: 'Appointment tracking', color: '#ec4899' }, // Pink
    { id: 'realestate-transactions', name: 'Transactions', icon: FileText, description: 'Sales/rentals', color: '#14b8a6' }, // Teal
    { id: 'realestate-commissions', name: 'Commissions', icon: Calculator, description: 'Commission tracking', color: '#22c55e' }, // Green
  ],
  agency: [
    { id: 'agency-campaigns', name: 'Campaigns', icon: Megaphone, description: 'Campaign management', color: '#ef4444' }, // Red
    { id: 'agency-projects', name: 'Projects', icon: FolderOpen, description: 'Creative projects', color: '#f59e0b' }, // Amber
    { id: 'agency-media', name: 'Media Planning', icon: Monitor, description: 'Media buying', color: '#3b82f6' }, // Blue
    { id: 'agency-creatives', name: 'Creatives', icon: Sparkles, description: 'Visual/video content', color: '#ec4899' }, // Pink
    { id: 'agency-talent', name: 'Influencers', icon: Users, description: 'Influencer management', color: '#a855f7' }, // Purple
  ],
  events: [
    { id: 'events-list', name: 'Events', icon: Calendar, description: 'Event management', color: '#8b5cf6' }, // Purple
    { id: 'events-venues', name: 'Venues', icon: Building, description: 'Venue database', color: '#6366f1' }, // Indigo
    { id: 'events-guests', name: 'Guests', icon: Users, description: 'Guest management', color: '#3b82f6' }, // Blue
    { id: 'events-catering', name: 'Catering', icon: UtensilsCrossed, description: 'Food organization', color: '#f97316' }, // Orange
    { id: 'events-budget', name: 'Budget', icon: Calculator, description: 'Event budget', color: '#10b981' }, // Emerald
  ],
};

// Preset configurations
interface PresetConfig {
  id: string;
  name: string;
  description: string;
  getModules: (sectorModuleIds: string[]) => string[];
}

const ModuleSelection = () => {
  const navigate = useNavigate();
  const { selectedSector, selectedAccountType, setSelectedModules } = useAppStore();

  const sector = selectedSector ? getSectorById(selectedSector) : null;
  const SectorIcon = sector?.icon;
  const AccountIcon = selectedAccountType === 'admin' ? Shield : Users;

  // Get sector-specific modules
  const availableSectorModules = sectorModules[selectedSector || ''] || [];
  const sectorModuleIds = availableSectorModules.map((m) => m.id);

  // All module IDs
  const allModuleIds = useMemo(
    () => [...commonModules.map((m) => m.id), ...sectorModuleIds],
    [sectorModuleIds]
  );

  // Initialize with all modules selected
  const [localSelectedModules, setLocalSelectedModules] = useState<string[]>(allModuleIds);

  // Preset configurations
  const presets: PresetConfig[] = useMemo(
    () => [
      {
        id: 'full',
        name: 'Full Package',
        description: 'All modules enabled',
        getModules: (sectorIds: string[]) => [...commonModules.map((m) => m.id), ...sectorIds],
      },
      {
        id: 'essential',
        name: 'Essential Package',
        description: 'Most commonly used modules',
        getModules: (sectorIds: string[]) => [
          'dashboard',
          'hr',
          'accounting',
          'tasks',
          'files',
          'settings',
          ...sectorIds,
        ],
      },
      {
        id: 'minimal',
        name: 'Minimal Package',
        description: 'Sector modules only',
        getModules: (sectorIds: string[]) => ['dashboard', 'settings', ...sectorIds],
      },
    ],
    []
  );

  const toggleModule = (moduleId: string) => {
    // Don't allow toggling required modules
    const module = commonModules.find((m) => m.id === moduleId);
    if (module?.required) return;

    setLocalSelectedModules((prev) => {
      if (prev.includes(moduleId)) {
        return prev.filter((id) => id !== moduleId);
      } else {
        return [...prev, moduleId];
      }
    });
  };

  const applyPreset = (presetId: string) => {
    const preset = presets.find((p) => p.id === presetId);
    if (preset) {
      setLocalSelectedModules(preset.getModules(sectorModuleIds));
    }
  };

  const handleContinue = () => {
    // Save selected modules to store
    setSelectedModules(localSelectedModules);
    // Navigate to dashboard
    navigate('/dashboard');
  };

  const isModuleSelected = (moduleId: string) => localSelectedModules.includes(moduleId);

  const getActivePreset = () => {
    for (const preset of presets) {
      const presetModules = preset.getModules(sectorModuleIds);
      if (
        presetModules.length === localSelectedModules.length &&
        presetModules.every((m) => localSelectedModules.includes(m))
      ) {
        return preset.id;
      }
    }
    return null;
  };

  const activePreset = getActivePreset();

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        {/* Back Button, Sector Badge & Account Type - Glass Container */}
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="relative inline-flex items-center gap-3 mb-8 p-3 rounded-xl bg-white/[0.03] backdrop-blur-2xl border border-white/[0.08] before:absolute before:inset-0 before:rounded-xl before:bg-gradient-to-b before:from-white/[0.08] before:to-transparent before:pointer-events-none"
        >
          <button
            onClick={() => navigate(-1)}
            className="relative z-10 flex h-10 w-10 items-center justify-center rounded-lg bg-red-500/20 backdrop-blur-xl border border-red-500/40 text-red-400 hover:bg-red-500/30 hover:text-red-300 hover:border-red-500/60 transition-all cursor-pointer"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div
            onClick={() => navigate(-2)}
            className="relative z-10 flex items-center gap-3 px-4 py-2 rounded-lg bg-white/[0.05] border border-white/[0.08] cursor-pointer hover:bg-white/[0.08] hover:border-white/[0.12] transition-all"
          >
            {SectorIcon && (
              <div
                className="w-8 h-8 rounded-lg bg-white/[0.08] flex items-center justify-center"
                style={{ color: sector?.color }}
              >
                <SectorIcon className="w-4 h-4" />
              </div>
            )}
            <div>
              <p className="text-xs text-[#64748b]">Selected Industry</p>
              <h2 className="text-sm font-semibold text-white">
                {sector?.name || 'Unknown Sector'}
              </h2>
            </div>
          </div>
          <div
            onClick={() => navigate(-1)}
            className="relative z-10 flex items-center gap-3 px-4 py-2 rounded-lg bg-white/[0.05] border border-white/[0.08] cursor-pointer hover:bg-white/[0.08] hover:border-white/[0.12] transition-all"
          >
            <div
              className="w-8 h-8 rounded-lg bg-white/[0.08] flex items-center justify-center"
              style={{ color: selectedAccountType === 'admin' ? '#f59e0b' : '#3b82f6' }}
            >
              <AccountIcon className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs text-[#64748b]">Account Type</p>
              <h2 className="text-sm font-semibold text-white">
                {selectedAccountType === 'admin' ? 'Administrator' : 'Staff Member'}
              </h2>
            </div>
          </div>
        </motion.div>

        {/* Header */}
        <div className="text-center mb-8">
          <motion.h1
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-4xl font-bold text-white mb-3"
          >
            Select Your Modules
          </motion.h1>
          <motion.p
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-white/60 text-lg"
          >
            Choose the modules you need. You can change these later in settings.
          </motion.p>
        </div>

        {/* Presets - Glassmorphism Style */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-3 gap-4 mb-8"
        >
          {presets.map((preset) => {
            const presetModules = preset.getModules(sectorModuleIds);
            const isActive = activePreset === preset.id;
            return (
              <GlareHover
                key={preset.id}
                glareColor="#8b5cf6"
                glareOpacity={0.2}
                glareAngle={-30}
                glareSize={300}
                transitionDuration={800}
                playOnce={false}
                onClick={() => applyPreset(preset.id)}
                className={`
                  p-4 rounded-xl text-left transition-all duration-300 group cursor-pointer
                  bg-white/[0.03] backdrop-blur-2xl border
                  before:absolute before:inset-0 before:rounded-xl before:bg-gradient-to-b before:from-white/[0.08] before:to-transparent before:pointer-events-none
                  ${isActive
                    ? 'border-[#8b5cf6] bg-white/[0.08] shadow-[0_0_20px_rgba(139,92,246,0.3),inset_0_1px_0_rgba(255,255,255,0.1)]'
                    : 'border-white/[0.08] hover:border-[#8b5cf6]/30 hover:scale-[1.02] hover:bg-white/[0.05]'
                  }
                `}
              >
                {/* Selection indicator */}
                <div
                  className={`
                    absolute top-3 right-3 h-5 w-5 rounded-full border-2 transition-all flex items-center justify-center z-10
                    ${isActive
                      ? 'border-emerald-500 bg-emerald-500'
                      : 'border-white/20 group-hover:border-white/40'
                    }
                  `}
                >
                  {isActive && <Check size={12} className="text-white" />}
                </div>
                <h3 className="relative z-10 text-white font-medium mb-1">{preset.name}</h3>
                <p className="relative z-10 text-white/50 text-sm">{preset.description}</p>
                <p className={`relative z-10 text-xs mt-2 ${isActive ? 'text-emerald-400' : 'text-[#8b5cf6]'}`}>{presetModules.length} modules</p>
                {/* Hover Glow Effect */}
                <div className={`absolute inset-0 rounded-xl bg-gradient-to-br from-[#6366f1]/0 via-[#8b5cf6]/15 to-[#6366f1]/0 transition-opacity pointer-events-none ${isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`} />
              </GlareHover>
            );
          })}
        </motion.div>

        {/* Common Modules - Glassmorphism Container */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="relative bg-white/[0.03] backdrop-blur-2xl border border-white/[0.08] rounded-2xl p-6 mb-6 overflow-hidden before:absolute before:inset-0 before:rounded-2xl before:bg-gradient-to-b before:from-white/[0.08] before:to-transparent before:pointer-events-none"
        >
          <div className="relative z-10 flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-white">Common Modules</h2>
            <span className="text-sm text-white/50">
              {commonModules.filter((m) => isModuleSelected(m.id)).length}/{commonModules.length} selected
            </span>
          </div>
          <div className="relative z-10 grid grid-cols-2 md:grid-cols-3 gap-3">
            {commonModules.map((module) => {
              const Icon = module.icon;
              const isSelected = isModuleSelected(module.id);
              const isRequired = module.required;

              return (
                <GlareHover
                  key={module.id}
                  glareColor={module.color}
                  glareOpacity={0.2}
                  glareAngle={-30}
                  glareSize={300}
                  transitionDuration={800}
                  playOnce={false}
                  onClick={() => !isRequired && toggleModule(module.id)}
                  className={`
                    p-3 rounded-xl border text-left transition-all duration-300 group
                    bg-white/[0.03] backdrop-blur-xl
                    before:absolute before:inset-0 before:rounded-xl before:bg-gradient-to-b before:from-white/[0.08] before:to-transparent before:pointer-events-none
                    ${isSelected
                      ? 'border-[#8b5cf6]/50 bg-white/[0.06]'
                      : 'border-white/[0.08] hover:border-white/[0.15] hover:bg-white/[0.05]'
                    }
                    ${isRequired ? 'cursor-not-allowed opacity-70' : 'cursor-pointer'}
                  `}
                >
                  <div className="flex items-start justify-between">
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center border transition-colors bg-white/[0.05] border-white/[0.08]"
                      style={{ color: module.color }}
                    >
                      <Icon size={20} />
                    </div>
                    <div
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors z-10 ${
                        isSelected
                          ? 'bg-emerald-500 border-emerald-500'
                          : 'border-white/20 group-hover:border-white/40'
                      }`}
                    >
                      {isSelected && <Check size={12} className="text-white" />}
                    </div>
                  </div>
                  <h3 className="text-white font-medium text-sm mt-3">{module.name}</h3>
                  <p className="text-white/40 text-xs mt-1">{module.description}</p>
                  {isRequired && (
                    <span className="inline-block mt-2 text-xs text-[#8b5cf6] bg-[#8b5cf6]/10 px-2 py-0.5 rounded">
                      Required
                    </span>
                  )}
                </GlareHover>
              );
            })}
          </div>
        </motion.div>

        {/* Sector-Specific Modules - Glassmorphism Container */}
        {availableSectorModules.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="relative bg-white/[0.03] backdrop-blur-2xl border border-white/[0.08] rounded-2xl p-6 mb-6 overflow-hidden before:absolute before:inset-0 before:rounded-2xl before:bg-gradient-to-b before:from-white/[0.08] before:to-transparent before:pointer-events-none"
          >
            <div className="relative z-10 flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-semibold text-white">Sector Modules</h2>
                <span className="text-xs bg-[#8b5cf6]/20 text-[#a78bfa] px-2 py-0.5 rounded capitalize">
                  {selectedSector}
                </span>
              </div>
              <span className="text-sm text-white/50">
                {availableSectorModules.filter((m) => isModuleSelected(m.id)).length}/
                {availableSectorModules.length} selected
              </span>
            </div>
            <div className="relative z-10 grid grid-cols-2 md:grid-cols-3 gap-3">
              {availableSectorModules.map((module) => {
                const Icon = module.icon;
                const isSelected = isModuleSelected(module.id);

                return (
                  <GlareHover
                    key={module.id}
                    glareColor={module.color}
                    glareOpacity={0.2}
                    glareAngle={-30}
                    glareSize={300}
                    transitionDuration={800}
                    playOnce={false}
                    onClick={() => toggleModule(module.id)}
                    className={`
                      p-3 rounded-xl border text-left transition-all duration-300 group cursor-pointer
                      bg-white/[0.03] backdrop-blur-xl
                      before:absolute before:inset-0 before:rounded-xl before:bg-gradient-to-b before:from-white/[0.08] before:to-transparent before:pointer-events-none
                      ${isSelected
                        ? 'border-[#a78bfa]/50 bg-white/[0.06]'
                        : 'border-white/[0.08] hover:border-white/[0.15] hover:bg-white/[0.05]'
                      }
                    `}
                  >
                    <div className="flex items-start justify-between">
                      <div
                        className="w-10 h-10 rounded-lg flex items-center justify-center border transition-colors bg-white/[0.05] border-white/[0.08]"
                        style={{ color: module.color }}
                      >
                        <Icon size={20} />
                      </div>
                      <div
                        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors z-10 ${
                          isSelected
                            ? 'bg-emerald-500 border-emerald-500'
                            : 'border-white/20 group-hover:border-white/40'
                        }`}
                      >
                        {isSelected && <Check size={12} className="text-white" />}
                      </div>
                    </div>
                    <h3 className="text-white font-medium text-sm mt-3">{module.name}</h3>
                    <p className="text-white/40 text-xs mt-1">{module.description}</p>
                  </GlareHover>
                );
              })}
            </div>
          </motion.div>
        )}

        {/* Info Box - Glassmorphism Style */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="relative bg-[#3b82f6]/10 backdrop-blur-xl border border-[#3b82f6]/30 rounded-xl p-4 mb-6 flex items-start gap-3 overflow-hidden"
        >
          <Info size={20} className="text-[#60a5fa] flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="text-[#60a5fa] font-medium text-sm">About Module Selection</h4>
            <p className="text-[#93c5fd]/70 text-sm mt-1">
              Selected modules will appear in the sidebar menu. Disable unwanted modules for a cleaner
              interface. You can always change this from the Settings menu.
            </p>
          </div>
        </motion.div>

        {/* Continue Button */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="flex justify-center"
        >
          <button
            onClick={handleContinue}
            className="px-8 py-3 bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] text-white font-semibold rounded-xl hover:opacity-90 transition-all transform hover:scale-[1.02] active:scale-[0.98] flex items-center gap-2"
          >
            Continue to Dashboard
            <ChevronRight size={20} />
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default ModuleSelection;
