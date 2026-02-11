import { useState, useMemo, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
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
  Scissors,
  Package,
  Gift,
  Star,
  CreditCard,
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useAppStore } from '@/store/appStore';
import { getSectorById } from '@/data/sectors';
import { GlareHover } from '@/components/common';
import { LeadCaptureWidget } from '@/components/widgets/LeadCaptureWidget';

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
// Keys must match sector IDs in sectors.ts exactly
const sectorModules: Record<string, ModuleDefinition[]> = {
  'gym-fitness': [
    { id: 'gym-members', name: 'Members', icon: Users, description: 'Member management, memberships', color: '#22c55e' }, // Green
    { id: 'gym-classes', name: 'Classes', icon: Calendar, description: 'Class schedule, reservations', color: '#f97316' }, // Orange
    { id: 'gym-trainers', name: 'Trainers', icon: Dumbbell, description: 'PT management, appointments', color: '#ef4444' }, // Red
    { id: 'gym-equipment', name: 'Equipment', icon: Wrench, description: 'Equipment tracking, maintenance', color: '#64748b' }, // Slate
    { id: 'gym-assessments', name: 'Assessments', icon: FileText, description: 'Fitness tests', color: '#06b6d4' }, // Cyan
  ],
  'manpower-staffing': [
    { id: 'staffing-candidates', name: 'Candidates', icon: Users, description: 'Candidate database', color: '#3b82f6' }, // Blue
    { id: 'staffing-jobs', name: 'Job Orders', icon: Briefcase, description: 'Open positions', color: '#8b5cf6' }, // Purple
    { id: 'staffing-placements', name: 'Placements', icon: Check, description: 'Active placements', color: '#22c55e' }, // Green
    { id: 'staffing-timesheets', name: 'Timesheets', icon: Calendar, description: 'Working hours', color: '#f59e0b' }, // Amber
    { id: 'staffing-payroll', name: 'Payroll', icon: Calculator, description: 'Payment management', color: '#10b981' }, // Emerald
  ],
  'real-estate': [
    { id: 'realestate-properties', name: 'Properties', icon: Building, description: 'Listing management', color: '#6366f1' }, // Indigo
    { id: 'realestate-leads', name: 'Leads', icon: Users, description: 'Buyer/tenant management', color: '#f97316' }, // Orange
    { id: 'realestate-showings', name: 'Showings', icon: Calendar, description: 'Appointment tracking', color: '#ec4899' }, // Pink
    { id: 'realestate-transactions', name: 'Transactions', icon: FileText, description: 'Sales/rentals', color: '#14b8a6' }, // Teal
    { id: 'realestate-commissions', name: 'Commissions', icon: Calculator, description: 'Commission tracking', color: '#22c55e' }, // Green
  ],
  'advertising-agency': [
    { id: 'agency-campaigns', name: 'Campaigns', icon: Megaphone, description: 'Campaign management', color: '#ef4444' }, // Red
    { id: 'agency-projects', name: 'Projects', icon: FolderOpen, description: 'Creative projects', color: '#f59e0b' }, // Amber
    { id: 'agency-media', name: 'Media Planning', icon: Monitor, description: 'Media buying', color: '#3b82f6' }, // Blue
    { id: 'agency-creatives', name: 'Creatives', icon: Sparkles, description: 'Visual/video content', color: '#ec4899' }, // Pink
    { id: 'agency-talent', name: 'Influencers', icon: Users, description: 'Influencer management', color: '#a855f7' }, // Purple
  ],
  'event-company': [
    { id: 'events-list', name: 'Events', icon: Calendar, description: 'Event management', color: '#8b5cf6' }, // Purple
    { id: 'events-venues', name: 'Venues', icon: Building, description: 'Venue database', color: '#6366f1' }, // Indigo
    { id: 'events-guests', name: 'Guests', icon: Users, description: 'Guest management', color: '#3b82f6' }, // Blue
    { id: 'events-catering', name: 'Catering', icon: UtensilsCrossed, description: 'Food organization', color: '#f97316' }, // Orange
    { id: 'events-budget', name: 'Budget', icon: Calculator, description: 'Event budget', color: '#10b981' }, // Emerald
  ],
  'beauty-salon': [
    { id: 'beauty-appointments', name: 'Appointments', icon: Calendar, description: 'Schedule & calendar', color: '#ec4899' }, // Pink
    { id: 'beauty-clients', name: 'Clients', icon: Users, description: 'Client management', color: '#8b5cf6' }, // Purple
    { id: 'beauty-services', name: 'Services', icon: Scissors, description: 'Service catalog', color: '#f97316' }, // Orange
    { id: 'beauty-staff', name: 'Staff', icon: Users, description: 'Stylists & technicians', color: '#10b981' }, // Emerald
    { id: 'beauty-products', name: 'Products', icon: Package, description: 'Inventory management', color: '#06b6d4' }, // Cyan
    { id: 'beauty-packages', name: 'Packages', icon: Gift, description: 'Service packages', color: '#f59e0b' }, // Amber
    { id: 'beauty-memberships', name: 'Memberships', icon: CreditCard, description: 'Member plans', color: '#6366f1' }, // Indigo
    { id: 'beauty-gift-cards', name: 'Gift Cards', icon: Gift, description: 'Gift card management', color: '#ef4444' }, // Red
    { id: 'beauty-reviews', name: 'Reviews', icon: Star, description: 'Ratings & feedback', color: '#eab308' }, // Yellow
  ],
  laundry: [
    { id: 'laundry-orders', name: 'Orders', icon: CheckSquare, description: 'Order management', color: '#0ea5e9' }, // Sky
    { id: 'laundry-customers', name: 'Customers', icon: Users, description: 'Customer database', color: '#8b5cf6' }, // Purple
    { id: 'laundry-services', name: 'Services', icon: Briefcase, description: 'Service & pricing', color: '#f97316' }, // Orange
    { id: 'laundry-delivery', name: 'Delivery', icon: Calendar, description: 'Pickup & delivery', color: '#06b6d4' }, // Cyan
    { id: 'laundry-garments', name: 'Garments', icon: Package, description: 'Garment tracking', color: '#ec4899' }, // Pink
    { id: 'laundry-inventory', name: 'Inventory', icon: Package, description: 'Supply management', color: '#10b981' }, // Emerald
    { id: 'laundry-complaints', name: 'Complaints', icon: Target, description: 'Issue tracking', color: '#ef4444' }, // Red
    { id: 'laundry-reports', name: 'Reports', icon: FileText, description: 'Analytics & reports', color: '#6366f1' }, // Indigo
  ],
  hardware: [
    { id: 'hardware-products', name: 'Products', icon: Package, description: 'Product catalog', color: '#f59e0b' }, // Amber
    { id: 'hardware-categories', name: 'Categories', icon: Target, description: 'Product categories', color: '#8b5cf6' }, // Purple
    { id: 'hardware-inventory', name: 'Inventory', icon: Package, description: 'Stock management', color: '#10b981' }, // Emerald
    { id: 'hardware-suppliers', name: 'Suppliers', icon: Users, description: 'Supplier database', color: '#0ea5e9' }, // Sky
    { id: 'hardware-purchases', name: 'Purchases', icon: FileText, description: 'Purchase orders', color: '#6366f1' }, // Indigo
    { id: 'hardware-sales', name: 'Sales (POS)', icon: CheckSquare, description: 'Point of sale', color: '#22c55e' }, // Green
    { id: 'hardware-alerts', name: 'Alerts', icon: Target, description: 'Low stock alerts', color: '#ef4444' }, // Red
    { id: 'hardware-barcode', name: 'Barcode', icon: QrCode, description: 'Barcode management', color: '#64748b' }, // Slate
  ],
  hotel: [
    { id: 'hotel', name: 'Hotel Management', icon: Building, description: 'Rooms, reservations, guests', color: '#14b8a6' }, // Teal
  ],
  ecommerce: [
    { id: 'ecommerce', name: 'E-Commerce', icon: Package, description: 'Online store management', color: '#10b981' }, // Emerald
  ],
  restaurant: [
    { id: 'restaurant', name: 'Restaurant', icon: UtensilsCrossed, description: 'Menu, orders, tables', color: '#f97316' }, // Orange
  ],
  healthcare: [
    { id: 'healthcare', name: 'Healthcare', icon: Users, description: 'Patients, appointments', color: '#06b6d4' }, // Cyan
  ],
  education: [
    { id: 'education', name: 'Education', icon: Users, description: 'Students, classes, curriculum', color: '#8b5cf6' }, // Purple
  ],
  construction: [
    { id: 'construction', name: 'Construction', icon: Building, description: 'Projects, sites, materials', color: '#f97316' }, // Orange
  ],
  logistics: [
    { id: 'logistics', name: 'Logistics', icon: Package, description: 'Fleet, shipments, tracking', color: '#3b82f6' }, // Blue
  ],
  manufacturing: [
    { id: 'manufacturing', name: 'Manufacturing', icon: Settings, description: 'Production, inventory', color: '#64748b' }, // Slate
  ],
  law: [
    { id: 'law', name: 'Law Firm', icon: FileText, description: 'Cases, clients, billing', color: '#f59e0b' }, // Amber
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
  const { t } = useTranslation('auth');
  const { t: tSector } = useTranslation('sectors');
  const sectorKey = (id: string) => id.replace(/-([a-z])/g, (_, c: string) => c.toUpperCase());
  const navigate = useNavigate();
  const { selectedSector, selectedAccountType, setSelectedModules } = useAppStore();

  const sector = selectedSector ? getSectorById(selectedSector) : null;
  const SectorIcon = sector?.icon;
  const AccountIcon = selectedAccountType === 'admin' ? Shield : Users;

  // Spotlight tour state (5 steps: 0=presets, 1=modules, 2=nav bar, 3=continue button, 4=chat widget)
  const [spotlightStep, setSpotlightStep] = useState(-1); // -1 = not started
  const [spotlightPosition, setSpotlightPosition] = useState({ x: 0, y: 0, width: 0, height: 0 });
  const [widgetVisible, setWidgetVisible] = useState(false); // Widget stays visible after step 4
  const presetsRef = useRef<HTMLDivElement>(null);
  const modulesRef = useRef<HTMLDivElement>(null);
  const navBarRef = useRef<HTMLDivElement>(null);
  const continueButtonRef = useRef<HTMLButtonElement>(null);
  const chatWidgetRef = useRef<HTMLButtonElement>(null);

  const spotlightConfigs = [
    { ref: presetsRef, title: t('moduleSelection.spotlight.step0title'), description: t('moduleSelection.spotlight.step0desc') },
    { ref: modulesRef, title: t('moduleSelection.spotlight.step1title'), description: t('moduleSelection.spotlight.step1desc') },
    { ref: navBarRef, title: t('moduleSelection.spotlight.step2title'), description: t('moduleSelection.spotlight.step2desc') },
    { ref: continueButtonRef, title: t('moduleSelection.spotlight.step3title'), description: t('moduleSelection.spotlight.step3desc') },
    { ref: chatWidgetRef, title: t('moduleSelection.spotlight.step4title'), description: t('moduleSelection.spotlight.step4desc') },
  ];

  // Start spotlight after delay (only if not shown before in this session)
  useEffect(() => {
    const hasSeenSpotlight = sessionStorage.getItem('moduleSelectionSpotlightShown');
    if (hasSeenSpotlight) {
      return; // Don't show spotlight again in this session
    }

    const timer = setTimeout(() => {
      setSpotlightStep(0);
      sessionStorage.setItem('moduleSelectionSpotlightShown', 'true');
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  // Make widget permanently visible when step 4 is reached
  useEffect(() => {
    if (spotlightStep === 4) {
      setWidgetVisible(true);
    }
  }, [spotlightStep]);

  // Disable scroll when spotlight is active (but keep scrollbar visible)
  useEffect(() => {
    if (spotlightStep < 0) return;

    const preventScroll = (e: Event) => {
      e.preventDefault();
    };

    const preventKeyScroll = (e: KeyboardEvent) => {
      if (['ArrowUp', 'ArrowDown', 'Space', 'PageUp', 'PageDown', 'Home', 'End'].includes(e.key)) {
        e.preventDefault();
      }
    };

    window.addEventListener('wheel', preventScroll, { passive: false });
    window.addEventListener('touchmove', preventScroll, { passive: false });
    window.addEventListener('keydown', preventKeyScroll);

    return () => {
      window.removeEventListener('wheel', preventScroll);
      window.removeEventListener('touchmove', preventScroll);
      window.removeEventListener('keydown', preventKeyScroll);
    };
  }, [spotlightStep]);

  // Update spotlight position when step changes
  useEffect(() => {
    if (spotlightStep >= 0 && spotlightStep < spotlightConfigs.length) {
      const currentRef = spotlightConfigs[spotlightStep].ref;

      // For chat widget step (4), add extra delay to wait for widget to mount
      const delay = spotlightStep === 4 ? 500 : 300;

      // Reset position immediately to prevent showing old position during transition
      setSpotlightPosition({ x: 0, y: 0, width: 0, height: 0 });

      const updatePosition = () => {
        if (currentRef.current) {
          const rect = currentRef.current.getBoundingClientRect();
          setSpotlightPosition({
            x: rect.left,
            y: rect.top,
            width: rect.width,
            height: rect.height
          });
        }
      };

      if (currentRef.current && spotlightStep !== 4) {
        // Scroll to element first (not for chat widget since it's fixed)
        currentRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }

      // Wait for scroll/mount to complete, then update position
      setTimeout(updatePosition, delay);
    }
  }, [spotlightStep]);

  // Handle window resize
  useEffect(() => {
    if (spotlightStep < 0 || spotlightStep >= spotlightConfigs.length) return;

    const handleResize = () => {
      const currentRef = spotlightConfigs[spotlightStep].ref;
      if (currentRef.current) {
        const rect = currentRef.current.getBoundingClientRect();
        setSpotlightPosition({
          x: rect.left,
          y: rect.top,
          width: rect.width,
          height: rect.height
        });
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [spotlightStep]);

  const handleSpotlightClick = () => {
    if (spotlightStep < spotlightConfigs.length - 1) {
      // For step 4 (chat widget), the widget itself handles dismiss via onSpotlightClick
      if (spotlightStep === 3) {
        // After continue button, go to chat widget step
        setSpotlightStep(4);
      } else {
        setSpotlightStep(spotlightStep + 1);
      }
    } else {
      setSpotlightStep(-1); // dismiss
      window.scrollTo({ top: 0, behavior: 'smooth' }); // scroll to top after tour ends
    }
  };

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
        name: t('moduleSelection.presets.full.name'),
        description: t('moduleSelection.presets.full.description'),
        getModules: (sectorIds: string[]) => [...commonModules.map((m) => m.id), ...sectorIds],
      },
      {
        id: 'essential',
        name: t('moduleSelection.presets.essential.name'),
        description: t('moduleSelection.presets.essential.description'),
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
        name: t('moduleSelection.presets.minimal.name'),
        description: t('moduleSelection.presets.minimal.description'),
        getModules: (sectorIds: string[]) => ['dashboard', 'settings', ...sectorIds],
      },
    ],
    [t]
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

    // Advance spotlight if on step 2 (modules)
    if (spotlightStep === 1) {
      setSpotlightStep(2);
    }
  };

  const applyPreset = (presetId: string) => {
    const preset = presets.find((p) => p.id === presetId);
    if (preset) {
      setLocalSelectedModules(preset.getModules(sectorModuleIds));
    }
    // Advance spotlight if on step 1 (presets)
    if (spotlightStep === 0) {
      setSpotlightStep(1);
    }
  };

  const handleContinue = () => {
    // If spotlight is on step 4 (continue button), go to step 5 (chat widget)
    if (spotlightStep === 3) {
      setSpotlightStep(4);
      return;
    }

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
          ref={navBarRef}
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className={`relative inline-flex items-center gap-3 mb-8 p-3 rounded-xl bg-white/[0.03] backdrop-blur-2xl border border-white/[0.08] before:absolute before:inset-0 before:rounded-xl before:bg-gradient-to-b before:from-white/[0.08] before:to-transparent before:pointer-events-none ${spotlightStep === 2 ? 'z-60' : ''}`}
        >
          <button
            onClick={() => {
              if (spotlightStep === 2) {
                setSpotlightStep(3);
                return;
              }
              navigate(-1);
            }}
            className="relative z-10 flex h-10 w-10 items-center justify-center rounded-lg bg-red-500/20 backdrop-blur-xl border border-red-500/40 text-red-400 hover:bg-red-500/30 hover:text-red-300 hover:border-red-500/60 transition-all cursor-pointer"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div
            className="relative z-10 flex items-center gap-3 px-4 py-2 rounded-lg bg-white/[0.08] border border-[#94B4C1]/50 cursor-default"
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
              <p className="text-xs text-text-muted">{t('moduleSelection.selectedIndustry')}</p>
              <h2 className="text-sm font-semibold text-white">
                {sector ? tSector(`${sectorKey(sector.id)}.name`, sector.name) : t('moduleSelection.unknownSector')}
              </h2>
            </div>
            <Check size={16} className="text-emerald-400 ml-2" />
          </div>
          <div
            className="relative z-10 flex items-center gap-3 px-4 py-2 rounded-lg bg-white/[0.08] border border-[#94B4C1]/50 cursor-default"
          >
            <div
              className="w-8 h-8 rounded-lg bg-white/[0.08] flex items-center justify-center"
              style={{ color: selectedAccountType === 'admin' ? '#f59e0b' : '#3b82f6' }}
            >
              <AccountIcon className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs text-text-muted">{t('moduleSelection.accountType')}</p>
              <h2 className="text-sm font-semibold text-white">
                {selectedAccountType === 'admin' ? t('moduleSelection.administrator') : t('moduleSelection.staffMember')}
              </h2>
            </div>
            <Check size={16} className="text-emerald-400 ml-2" />
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
            {t('moduleSelection.selectYourModules')}
          </motion.h1>
          <motion.p
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-white/60 text-lg"
          >
            {t('moduleSelection.selectYourModulesDescription')}
          </motion.p>
        </div>

        {/* Presets - Glassmorphism Style */}
        <motion.div
          ref={presetsRef}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className={`grid grid-cols-3 gap-4 mb-8 ${spotlightStep === 0 ? 'relative z-60' : ''}`}
        >
          {presets.map((preset) => {
            const presetModules = preset.getModules(sectorModuleIds);
            const isActive = activePreset === preset.id;
            return (
              <GlareHover
                key={preset.id}
                glareColor="#94B4C1"
                glareOpacity={0.2}
                glareAngle={-30}
                glareSize={300}
                transitionDuration={800}
                playOnce={false}
                onClick={() => spotlightStep === 0 ? setSpotlightStep(1) : applyPreset(preset.id)}
                className={`
                  p-4 rounded-xl text-left transition-all duration-300 group cursor-pointer
                  bg-white/[0.03] backdrop-blur-2xl border
                  before:absolute before:inset-0 before:rounded-xl before:bg-gradient-to-b before:from-white/[0.08] before:to-transparent before:pointer-events-none
                  ${isActive
                    ? 'border-[#94B4C1] bg-white/[0.08] shadow-[0_0_20px_rgba(148,180,193,0.3),inset_0_1px_0_rgba(255,255,255,0.1)]'
                    : 'border-white/[0.08] hover:border-[#94B4C1]/30 hover:scale-[1.02] hover:bg-white/[0.05]'
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
                <p className={`relative z-10 text-xs mt-2 ${isActive ? 'text-emerald-400' : 'text-[#94B4C1]'}`}>{presetModules.length} {t('moduleSelection.modules')}</p>
                {/* Hover Glow Effect */}
                <div className={`absolute inset-0 rounded-xl bg-gradient-to-br from-[#547792]/0 via-[#94B4C1]/15 to-[#547792]/0 transition-opacity pointer-events-none ${isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`} />
              </GlareHover>
            );
          })}
        </motion.div>

        {/* Common Modules */}
        <motion.div
          ref={modulesRef}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className={`mb-8 ${spotlightStep === 1 ? 'relative z-60' : ''}`}
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-white">{t('moduleSelection.weightedModules')}</h2>
            <span className="text-sm text-white/50">
              {commonModules.filter((m) => isModuleSelected(m.id)).length}/{commonModules.length} {t('moduleSelection.selected')}
            </span>
          </div>
          <div className="p-4 rounded-2xl bg-black/35 border border-white/[0.08]">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
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
                  onClick={() => spotlightStep === 1 ? setSpotlightStep(2) : (!isRequired && toggleModule(module.id))}
                  className={`
                    p-4 rounded-xl text-left transition-all duration-300 group
                    bg-white/[0.03] backdrop-blur-2xl border
                    before:absolute before:inset-0 before:rounded-xl before:bg-gradient-to-b before:from-white/[0.08] before:to-transparent before:pointer-events-none
                    ${isSelected
                      ? 'border-[#94B4C1] bg-white/[0.08]'
                      : 'border-white/[0.08] hover:border-[#94B4C1]/30 hover:scale-[1.02] hover:bg-white/[0.05]'
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
                  <h3 className="text-white font-medium text-sm mt-3">{t(`moduleSelection.commonModules.${module.id}.title`, module.name)}</h3>
                  <p className="text-white/40 text-xs mt-1">{t(`moduleSelection.commonModules.${module.id}.description`, module.description)}</p>
                  {isRequired && (
                    <span className="inline-block mt-2 text-xs text-[#94B4C1] bg-[#94B4C1]/10 px-2 py-0.5 rounded">
                      {t('moduleSelection.required')}
                    </span>
                  )}
                </GlareHover>
              );
            })}
            </div>
          </div>
        </motion.div>

        {/* Sector-Specific Modules */}
        {availableSectorModules.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mb-8"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-semibold text-white">{t('moduleSelection.sectorModules')}</h2>
                <span className="text-xs bg-[#94B4C1]/20 text-[#94B4C1] px-2 py-0.5 rounded capitalize">
                  {selectedSector}
                </span>
              </div>
              <span className="text-sm text-white/50">
                {availableSectorModules.filter((m) => isModuleSelected(m.id)).length}/
                {availableSectorModules.length} {t('moduleSelection.selected')}
              </span>
            </div>
            <div className="p-4 rounded-2xl bg-black/35 border border-white/[0.08]">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {availableSectorModules.map((module) => {
                const Icon = module.icon;

                return (
                  <GlareHover
                    key={module.id}
                    glareColor={module.color}
                    glareOpacity={0.2}
                    glareAngle={-30}
                    glareSize={300}
                    transitionDuration={800}
                    playOnce={false}
                    onClick={() => spotlightStep === 1 ? setSpotlightStep(2) : undefined}
                    className="p-4 rounded-xl text-left transition-all duration-300 group cursor-not-allowed opacity-70 bg-white/[0.03] backdrop-blur-2xl border border-[#94B4C1] before:absolute before:inset-0 before:rounded-xl before:bg-gradient-to-b before:from-white/[0.08] before:to-transparent before:pointer-events-none"
                  >
                    <div className="flex items-start justify-between">
                      <div
                        className="w-10 h-10 rounded-lg flex items-center justify-center border transition-colors bg-white/[0.05] border-white/[0.08]"
                        style={{ color: module.color }}
                      >
                        <Icon size={20} />
                      </div>
                      <div className="w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors z-10 bg-emerald-500 border-emerald-500">
                        <Check size={12} className="text-white" />
                      </div>
                    </div>
                    <h3 className="text-white font-medium text-sm mt-3">{t(`moduleSelection.sectorModuleItems.${module.id}.title`, module.name)}</h3>
                    <p className="text-white/40 text-xs mt-1">{t(`moduleSelection.sectorModuleItems.${module.id}.description`, module.description)}</p>
                    <span className="inline-block mt-2 text-xs text-[#94B4C1] bg-[#94B4C1]/10 px-2 py-0.5 rounded">
                      {t('moduleSelection.included')}
                    </span>
                  </GlareHover>
                );
              })}
              </div>
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
            <h4 className="text-[#60a5fa] font-medium text-sm">{t('moduleSelection.aboutModuleSelection')}</h4>
            <p className="text-[#93c5fd]/70 text-sm mt-1">
              {t('moduleSelection.aboutModuleSelectionDescription')}
            </p>
          </div>
        </motion.div>

        {/* Continue Button */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className={`flex justify-center ${spotlightStep === 3 ? 'relative z-60' : ''}`}
        >
          <button
            ref={continueButtonRef}
            onClick={handleContinue}
            className="relative px-8 py-3 bg-white/[0.03] backdrop-blur-2xl border border-white/[0.08] text-white font-semibold rounded-xl transition-all transform hover:scale-[1.02] active:scale-[0.98] flex items-center gap-2 cursor-pointer group overflow-hidden before:absolute before:inset-0 before:rounded-xl before:bg-gradient-to-r before:from-[#547792]/20 before:to-[#94B4C1]/20 before:opacity-100 hover:border-[#94B4C1]/50 hover:bg-white/[0.06] hover:shadow-[0_0_30px_rgba(148,180,193,0.3)]"
          >
            <span className="relative z-10">{t('moduleSelection.continueToPanel')}</span>
            <ChevronRight size={20} className="relative z-10 group-hover:translate-x-1 transition-transform" />
            {/* Animated gradient glow */}
            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#547792]/0 via-[#94B4C1]/20 to-[#547792]/0 opacity-0 group-hover:opacity-100 transition-opacity" />
          </button>
        </motion.div>
      </div>

      {/* Lead Capture Widget - visible after step 4 and stays visible */}
      {widgetVisible && (
        <LeadCaptureWidget
          forceShow={true}
          spotlightActive={spotlightStep === 4}
          onSpotlightClick={() => {
            setSpotlightStep(-1);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          buttonRef={chatWidgetRef}
        />
      )}

      {/* Spotlight Tour Overlay */}
      <AnimatePresence mode="sync">
        {spotlightStep >= 0 && spotlightStep < spotlightConfigs.length && spotlightPosition.width > 0 && (
          <motion.div
            key={`spotlight-step-${spotlightStep}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="fixed inset-0 z-50"
          >
            {/* Dark Overlay with Spotlight Cutout */}
            <div
              className="absolute inset-0 pointer-events-auto"
              onClick={handleSpotlightClick}
              style={{
                background: `radial-gradient(ellipse ${spotlightPosition.width + 40}px ${spotlightPosition.height + 40}px at ${spotlightPosition.x + spotlightPosition.width / 2}px ${spotlightPosition.y + spotlightPosition.height / 2}px, transparent 0%, rgba(0, 0, 0, 0.85) 100%)`
              }}
            />

            {/* Pulsing Ring around highlighted area */}
            <motion.div
              key={`ring-${spotlightStep}`}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="absolute pointer-events-none"
              style={{
                left: spotlightPosition.x - 4,
                top: spotlightPosition.y - 4,
                width: spotlightPosition.width + 8,
                height: spotlightPosition.height + 8,
              }}
            >
              <div className={`absolute inset-0 ${spotlightStep === 4 ? 'rounded-full' : 'rounded-xl'} border-2 border-[#94B4C1]/50 animate-pulse`} />
              <div className={`absolute inset-0 ${spotlightStep === 4 ? 'rounded-full' : 'rounded-xl'} border border-[#94B4C1]/30 animate-ping`} style={{ animationDuration: '2s' }} />
            </motion.div>

            {/* Tooltip */}
            <motion.div
              key={`tooltip-${spotlightStep}`}
              initial={{
                opacity: 0,
                x: spotlightStep === 1 ? -20 : (spotlightStep === 4 ? 20 : 0),
                y: spotlightStep === 3 ? 10 : (spotlightStep === 1 ? 0 : 10)
              }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1, ease: "easeOut" }}
              className="absolute pointer-events-none"
              style={spotlightStep === 1 ? {
                // Step 2: Position to the right of the modules section
                left: spotlightPosition.x + spotlightPosition.width + 20,
                top: spotlightPosition.y + 20,
              } : spotlightStep === 3 ? {
                // Step 4: Position above the continue button
                left: spotlightPosition.x + spotlightPosition.width / 2 - 140,
                top: spotlightPosition.y - 220,
              } : spotlightStep === 4 ? {
                // Step 5: Position to the left of the chat widget (bottom-right corner)
                left: spotlightPosition.x - 300,
                top: spotlightPosition.y - 120,
              } : {
                // Other steps: Position below
                left: spotlightPosition.x + spotlightPosition.width / 2 - 140,
                top: spotlightPosition.y + spotlightPosition.height + 20,
              }}
            >
              {/* Arrow - pointing left for step 2, pointing down for step 4, pointing right for step 5, pointing up for others */}
              {spotlightStep === 1 ? (
                <div className="absolute -left-2 top-8 w-0 h-0 border-t-8 border-t-transparent border-b-8 border-b-transparent border-r-8 border-r-white/10" />
              ) : spotlightStep === 3 ? (
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-8 border-l-transparent border-r-8 border-r-transparent border-t-8 border-t-white/10" />
              ) : spotlightStep === 4 ? (
                <div className="absolute -right-2 top-12 w-0 h-0 border-t-8 border-t-transparent border-b-8 border-b-transparent border-l-8 border-l-white/10" />
              ) : (
                <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-8 border-l-transparent border-r-8 border-r-transparent border-b-8 border-b-white/10" />
              )}

              {/* Tooltip Content */}
              <div className="relative bg-white/[0.05] backdrop-blur-2xl border border-white/[0.12] rounded-2xl p-5 w-[280px] shadow-2xl before:absolute before:inset-0 before:rounded-2xl before:bg-gradient-to-b before:from-white/[0.1] before:to-transparent before:pointer-events-none">
                {/* Step indicator */}
                <div className="relative z-10 flex items-center gap-2 mb-2">
                  <div className="flex gap-1">
                    {spotlightConfigs.map((_, i) => (
                      <div
                        key={i}
                        className={`w-2 h-2 rounded-full transition-colors ${i === spotlightStep ? 'bg-[#94B4C1]' : 'bg-white/20'}`}
                      />
                    ))}
                  </div>
                  <span className="text-white/40 text-xs">{spotlightStep + 1}/{spotlightConfigs.length}</span>
                </div>
                <div className="relative z-10 mb-2">
                  <span className="text-white text-lg font-bold">{spotlightConfigs[spotlightStep].title}</span>
                </div>
                <p className="relative z-10 text-white/90 text-sm font-medium leading-relaxed mb-3">
                  {spotlightConfigs[spotlightStep].description}
                </p>
                <p className="relative z-10 text-red-400 text-xs font-medium">
                  {spotlightStep < spotlightConfigs.length - 1 ? t('moduleSelection.spotlight.clickToContinue') : t('moduleSelection.spotlight.clickToDismiss')}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ModuleSelection;
