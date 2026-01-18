import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronDown, LogOut } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppStore } from '@/store/appStore';
import { useAuth } from '@/hooks/useAuth';
import { menuGroups } from '@/data/mockData';
import { gymMenuItems } from '@/data/gym/gymData';
import { staffingMenuItems } from '@/data/staffing/staffingData';
import { realestateMenuItems } from '@/data/realestate/realestateData';
import { agencyMenuItems } from '@/data/agency/agencyData';
import { eventsMenuItems } from '@/data/events/eventsData';
import { beautyMenuItems } from '@/data/beauty/beautyData';
import { laundryMenuItems } from '@/data/laundry/laundryData';
import { hardwareMenuItems } from '@/data/hardware/hardwareData';
import { ecommerceMenuItems } from '@/data/ecommerce/ecommerceData';
import { restaurantMenuItems } from '@/data/restaurant/restaurantData';
import { healthcareMenuItems } from '@/data/healthcare/healthcareData';
import { educationMenuItems } from '@/data/education/educationData';
import { hotelMenuItems } from '@/data/hotel/hotelData';
import { constructionMenuItems } from '@/data/construction/constructionData';
import { LAYOUT, ROUTES } from '@/utils/constants';
import type { MenuItem, MenuGroup } from '@/types';
import AllyncLogo from '@/assets/images/logos/logo-white.svg';

// Module ID mapping for menu items
const moduleIdMap: Record<string, string> = {
  dashboard: 'dashboard',
  hr: 'hr',
  accounting: 'accounting',
  crm: 'crm',
  tasks: 'tasks',
  'access-control': 'access-control',
  signage: 'signage',
  communication: 'communication',
  files: 'files',
  reports: 'reports',
  maintenance: 'maintenance',
  'qr-codes': 'qr-codes',
  settings: 'settings',
  // Sector-specific modules
  gym: 'gym',
  staffing: 'staffing',
  realestate: 'realestate',
  agency: 'agency',
  events: 'events',
  beauty: 'beauty',
  laundry: 'laundry',
  hardware: 'hardware',
  ecommerce: 'ecommerce',
  restaurant: 'restaurant',
  healthcare: 'healthcare',
  education: 'education',
  hotel: 'hotel',
  construction: 'construction',
};

export const Sidebar = () => {
  const { sidebarCollapsed, toggleSidebar, selectedSector, isModuleEnabled } = useAppStore();
  const { logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  // Helper function to check if a menu item's module is enabled
  const isItemModuleEnabled = (itemId: string): boolean => {
    const moduleId = moduleIdMap[itemId];
    if (!moduleId) return true; // If no mapping, always show
    return isModuleEnabled(moduleId);
  };

  // Build dynamic menu groups based on selected sector
  const dynamicMenuGroups = useMemo((): MenuGroup[] => {
    const groups = [...menuGroups];

    // Add sector-specific menu groups
    if (selectedSector === 'gym-fitness') {
      // Insert gym management group after the MAIN group
      const gymGroup: MenuGroup = {
        id: 'gym-management',
        label: 'GYM MANAGEMENT',
        items: gymMenuItems.map(item => ({
          ...item,
          children: []
        }))
      };
      // Insert after MAIN (index 0)
      groups.splice(1, 0, gymGroup);
    }

    if (selectedSector === 'manpower-staffing') {
      // Insert staffing management group after the MAIN group
      const staffingGroup: MenuGroup = {
        id: 'staffing-management',
        label: 'STAFFING MANAGEMENT',
        items: staffingMenuItems.map(item => ({
          ...item,
          children: []
        }))
      };
      // Insert after MAIN (index 0)
      groups.splice(1, 0, staffingGroup);
    }

    if (selectedSector === 'real-estate') {
      // Insert real estate management group after the MAIN group
      const realestateGroup: MenuGroup = {
        id: 'realestate-management',
        label: 'REAL ESTATE',
        items: realestateMenuItems.map(item => ({
          ...item,
          children: []
        }))
      };
      // Insert after MAIN (index 0)
      groups.splice(1, 0, realestateGroup);
    }

    if (selectedSector === 'advertising-agency') {
      // Insert agency management group after the MAIN group
      const agencyGroup: MenuGroup = {
        id: 'agency-management',
        label: 'AGENCY MANAGEMENT',
        items: agencyMenuItems.map(item => ({
          ...item,
          children: []
        }))
      };
      // Insert after MAIN (index 0)
      groups.splice(1, 0, agencyGroup);
    }

    if (selectedSector === 'event-company') {
      // Insert events management group after the MAIN group
      const eventsGroup: MenuGroup = {
        id: 'events-management',
        label: 'EVENTS MANAGEMENT',
        items: eventsMenuItems.map(item => ({
          ...item,
          children: []
        }))
      };
      // Insert after MAIN (index 0)
      groups.splice(1, 0, eventsGroup);
    }

    if (selectedSector === 'beauty-salon') {
      // Insert beauty salon management group after the MAIN group
      const beautyGroup: MenuGroup = {
        id: 'beauty-management',
        label: 'BEAUTY SALON',
        items: beautyMenuItems.map(item => ({
          ...item,
          children: []
        }))
      };
      // Insert after MAIN (index 0)
      groups.splice(1, 0, beautyGroup);
    }

    if (selectedSector === 'laundry') {
      // Insert laundry management group after the MAIN group
      const laundryGroup: MenuGroup = {
        id: 'laundry-management',
        label: 'LAUNDRY',
        items: laundryMenuItems.map(item => ({
          ...item,
          children: []
        }))
      };
      // Insert after MAIN (index 0)
      groups.splice(1, 0, laundryGroup);
    }

    if (selectedSector === 'hardware') {
      // Insert hardware store management group after the MAIN group
      const hardwareGroup: MenuGroup = {
        id: 'hardware-management',
        label: 'HARDWARE STORE',
        items: hardwareMenuItems.map(item => ({
          ...item,
          children: []
        }))
      };
      // Insert after MAIN (index 0)
      groups.splice(1, 0, hardwareGroup);
    }

    if (selectedSector === 'ecommerce') {
      // Insert e-commerce management group after the MAIN group
      const ecommerceGroup: MenuGroup = {
        id: 'ecommerce-management',
        label: 'E-COMMERCE',
        items: ecommerceMenuItems.map(item => ({
          ...item,
          children: []
        }))
      };
      // Insert after MAIN (index 0)
      groups.splice(1, 0, ecommerceGroup);
    }

    if (selectedSector === 'restaurant') {
      // Insert restaurant management group after the MAIN group
      const restaurantGroup: MenuGroup = {
        id: 'restaurant-management',
        label: 'RESTAURANT',
        items: restaurantMenuItems.map(item => ({
          ...item,
          children: []
        }))
      };
      // Insert after MAIN (index 0)
      groups.splice(1, 0, restaurantGroup);
    }

    if (selectedSector === 'healthcare') {
      // Insert healthcare management group after the MAIN group
      const healthcareGroup: MenuGroup = {
        id: 'healthcare-management',
        label: 'HEALTHCARE',
        items: healthcareMenuItems.map(item => ({
          ...item,
          children: []
        }))
      };
      // Insert after MAIN (index 0)
      groups.splice(1, 0, healthcareGroup);
    }

    if (selectedSector === 'education') {
      // Insert education management group after the MAIN group
      const educationGroup: MenuGroup = {
        id: 'education-management',
        label: 'EDUCATION',
        items: educationMenuItems.map(item => ({
          ...item,
          children: []
        }))
      };
      // Insert after MAIN (index 0)
      groups.splice(1, 0, educationGroup);
    }

    if (selectedSector === 'hotel') {
      // Insert hotel management group after the MAIN group
      const hotelGroup: MenuGroup = {
        id: 'hotel-management',
        label: 'HOTEL MANAGEMENT',
        items: hotelMenuItems.map(item => ({
          ...item,
          children: []
        }))
      };
      // Insert after MAIN (index 0)
      groups.splice(1, 0, hotelGroup);
    }

    if (selectedSector === 'construction') {
      // Insert construction management group after the MAIN group
      const constructionGroup: MenuGroup = {
        id: 'construction-management',
        label: 'CONSTRUCTION',
        items: constructionMenuItems.map(item => ({
          ...item,
          children: []
        }))
      };
      // Insert after MAIN (index 0)
      groups.splice(1, 0, constructionGroup);
    }

    // Filter menu groups based on enabled modules
    return groups
      .map((group) => ({
        ...group,
        items: group.items.filter((item) => isItemModuleEnabled(item.id)),
      }))
      .filter((group) => group.items.length > 0);
  }, [selectedSector, isModuleEnabled]);

  // Auto-expand menus based on current route
  const getInitialExpandedMenus = (): string[] => {
    const expanded: string[] = [];
    dynamicMenuGroups.forEach((group) => {
      group.items.forEach((item) => {
        if (item.children && item.children.length > 0) {
          const isChildActive = item.children.some(
            (child) => child.path && location.pathname.startsWith(child.path)
          );
          if (isChildActive) {
            expanded.push(item.id);
          }
        }
      });
    });
    return expanded;
  };

  const [expandedMenus, setExpandedMenus] = useState<string[]>(getInitialExpandedMenus);

  // Update expanded menus when route changes
  useEffect(() => {
    dynamicMenuGroups.forEach((group) => {
      group.items.forEach((item) => {
        if (item.children && item.children.length > 0) {
          const isChildActive = item.children.some(
            (child) => child.path && location.pathname.startsWith(child.path)
          );
          if (isChildActive && !expandedMenus.includes(item.id)) {
            setExpandedMenus((prev) => [...prev, item.id]);
          }
        }
      });
    });
  }, [location.pathname, dynamicMenuGroups]);

  const handleLogout = () => {
    logout();
    navigate(ROUTES.login);
  };

  const handleMenuClick = (item: MenuItem) => {
    if (item.children && item.children.length > 0) {
      // Toggle submenu
      setExpandedMenus((prev) =>
        prev.includes(item.id)
          ? prev.filter((id) => id !== item.id)
          : [...prev, item.id]
      );
    } else if (item.path) {
      navigate(item.path);
    }
  };

  const isMenuActive = (item: MenuItem): boolean => {
    if (item.path && location.pathname.startsWith(item.path)) return true;
    if (item.children) {
      return item.children.some((child) => child.path && location.pathname.startsWith(child.path));
    }
    return false;
  };

  const isSubmenuActive = (path?: string): boolean => {
    return path ? location.pathname === path || location.pathname.startsWith(path + '/') : false;
  };

  const hasChildren = (item: MenuItem): boolean => {
    return !!(item.children && item.children.length > 0);
  };

  return (
    <aside
      id="dashboard-sidebar"
      style={{
        width: sidebarCollapsed ? LAYOUT.sidebarCollapsedWidth : LAYOUT.sidebarWidth,
      }}
      className="fixed left-0 top-0 z-40 flex h-screen flex-col bg-white/[0.03] backdrop-blur-xl border-r border-white/[0.08] transition-[width] duration-300 ease-out"
    >
      {/* Logo Section */}
      <div className={`flex h-16 items-center border-b border-white/[0.08] px-3 ${sidebarCollapsed ? 'justify-center' : 'justify-between'}`}>
        <div className="flex items-center gap-3 min-w-0">
          <div
            className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg"
            style={{ background: 'linear-gradient(135deg, #547792, #94B4C1)' }}
          >
            <img src={AllyncLogo} alt="Allync" className="h-6 w-6" />
          </div>
          {!sidebarCollapsed && (
            <span className="whitespace-nowrap text-lg font-semibold text-white">
              Allync
            </span>
          )}
        </div>
        {!sidebarCollapsed && (
          <button
            onClick={toggleSidebar}
            className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/[0.05] border border-white/[0.08] text-[#94a3b8] hover:bg-white/[0.1] hover:text-white hover:border-white/[0.15] transition-all cursor-pointer"
            title="Collapse sidebar"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Expand button when collapsed */}
      {sidebarCollapsed && (
        <button
          onClick={toggleSidebar}
          className="mx-auto mt-3 flex h-8 w-8 items-center justify-center rounded-lg bg-white/[0.05] border border-white/[0.08] text-[#94a3b8] hover:bg-white/[0.1] hover:text-white hover:border-white/[0.15] transition-all cursor-pointer"
          title="Expand sidebar"
        >
          <ChevronLeft className="h-4 w-4 rotate-180" />
        </button>
      )}

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4 no-scrollbar">
        {dynamicMenuGroups.map((group) => (
          <div key={group.id} className="mb-6">
            {/* Group Label */}
            <motion.div
              initial={false}
              animate={{
                opacity: sidebarCollapsed ? 0 : 1,
                height: sidebarCollapsed ? 0 : 'auto',
              }}
              className="mb-2 px-4 overflow-hidden"
            >
              <span className="text-[10px] font-semibold uppercase tracking-wider text-[#64748b]">
                {group.label}
              </span>
            </motion.div>

            {/* Menu Items */}
            <ul className="space-y-1 px-2">
              {group.items.map((item) => {
                const isActive = isMenuActive(item);
                const isExpanded = expandedMenus.includes(item.id);
                const Icon = item.icon;

                return (
                  <li key={item.id}>
                    <button
                      onClick={() => handleMenuClick(item)}
                      className={`
                        relative flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200 cursor-pointer
                        ${isActive
                          ? 'text-white'
                          : 'text-[#94a3b8] hover:bg-white/[0.05] hover:text-white'
                        }
                      `}
                      style={isActive ? {
                        background: `linear-gradient(to right, ${item.color || '#547792'}20, ${item.color || '#547792'}08)`,
                        boxShadow: `inset 0 0 20px ${item.color || '#547792'}15`
                      } : undefined}
                    >
                      {/* Active indicator bar */}
                      {isActive && (
                        <span
                          className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 rounded-r-full"
                          style={{
                            backgroundColor: item.color || '#547792',
                            boxShadow: `0 0 10px ${item.color || '#547792'}80`
                          }}
                        />
                      )}
                      <Icon
                        className="h-5 w-5 flex-shrink-0 transition-colors"
                        style={{ color: item.color || (isActive ? '#547792' : '#64748b') }}
                      />
                      <motion.span
                        initial={false}
                        animate={{
                          opacity: sidebarCollapsed ? 0 : 1,
                          width: sidebarCollapsed ? 0 : 'auto',
                        }}
                        transition={{ duration: 0.2 }}
                        className="whitespace-nowrap overflow-hidden flex-1 text-left"
                      >
                        {item.label}
                      </motion.span>
                      {/* Always show chevron for items with children */}
                      {hasChildren(item) && (
                        <motion.div
                          initial={false}
                          animate={{
                            rotate: isExpanded ? 180 : 0,
                            opacity: sidebarCollapsed ? 0 : 1,
                          }}
                          transition={{ duration: 0.2 }}
                        >
                          <ChevronDown className="h-4 w-4 text-[#64748b]" />
                        </motion.div>
                      )}
                      {item.badge && !sidebarCollapsed && (
                        <span
                          className="ml-auto rounded px-1.5 py-0.5 text-[10px] font-semibold"
                          style={{
                            backgroundColor: `${item.color || '#547792'}30`,
                            color: item.color || '#547792'
                          }}
                        >
                          {item.badge}
                        </span>
                      )}
                    </button>

                    {/* Submenu - show when item has children and is expanded */}
                    <AnimatePresence initial={false}>
                      {item.children && item.children.length > 0 && isExpanded && !sidebarCollapsed && (
                        <motion.ul
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden"
                        >
                          <div className="mt-1 ml-4 pl-4 border-l border-white/[0.08] space-y-1">
                            {item.children!.map((child) => {
                              const isChildActive = isSubmenuActive(child.path);
                              const ChildIcon = child.icon;
                              return (
                                <motion.li
                                  key={child.id}
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ duration: 0.15 }}
                                >
                                  <button
                                    onClick={() => child.path && navigate(child.path)}
                                    className={`
                                      relative flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm transition-all duration-200 cursor-pointer
                                      ${isChildActive
                                        ? 'text-white font-medium'
                                        : 'text-[#94a3b8] hover:bg-white/[0.05] hover:text-white'
                                      }
                                    `}
                                    style={isChildActive ? {
                                      background: `linear-gradient(to right, ${child.color || item.color || '#547792'}18, transparent)`
                                    } : undefined}
                                  >
                                    {/* Active dot indicator */}
                                    {isChildActive && (
                                      <span
                                        className="absolute -left-4 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full"
                                        style={{
                                          backgroundColor: child.color || item.color || '#547792',
                                          boxShadow: `0 0 8px ${child.color || item.color || '#547792'}99`
                                        }}
                                      />
                                    )}
                                    <ChildIcon
                                      className="h-4 w-4 transition-colors"
                                      style={{ color: child.color || item.color || (isChildActive ? '#547792' : '#64748b') }}
                                    />
                                    <span className="truncate">{child.label}</span>
                                  </button>
                                </motion.li>
                              );
                            })}
                          </div>
                        </motion.ul>
                      )}
                    </AnimatePresence>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      {/* Logout Section - mt-auto ensures it stays at bottom */}
      <div id="dashboard-logout" className="mt-auto border-t border-white/[0.08] p-4">
        <button
          onClick={handleLogout}
          className={`flex w-full items-center rounded-lg px-3 py-2.5 text-[#ef4444] hover:bg-[#ef4444]/10 transition-colors cursor-pointer ${sidebarCollapsed ? 'justify-center' : 'justify-center gap-3'}`}
          title="Logout"
        >
          <LogOut className="h-5 w-5 flex-shrink-0" />
          {!sidebarCollapsed && (
            <span className="text-sm font-medium whitespace-nowrap">
              Logout
            </span>
          )}
        </button>
      </div>
    </aside>
  );
};
