import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronDown, LogOut } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppStore } from '@/store/appStore';
import { useAuth } from '@/hooks/useAuth';
import { menuGroups } from '@/data/mockData';
import { gymMenuItems } from '@/data/gym/gymData';
import { staffingMenuItems } from '@/data/staffing/staffingData';
import { LAYOUT, ROUTES } from '@/utils/constants';
import type { MenuItem, MenuGroup } from '@/types';

export const Sidebar = () => {
  const { sidebarCollapsed, toggleSidebar, selectedSector } = useAppStore();
  const { logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

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

    return groups;
  }, [selectedSector]);

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
    <motion.aside
      initial={false}
      animate={{
        width: sidebarCollapsed
          ? LAYOUT.sidebarCollapsedWidth
          : LAYOUT.sidebarWidth,
      }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className="fixed left-0 top-0 z-40 flex h-screen flex-col border-r border-[#1e1e2e] bg-[#12121a]"
    >
      {/* Logo Section */}
      <div className="flex h-16 items-center justify-between border-b border-[#1e1e2e] px-4">
        <div className="flex items-center gap-3 overflow-hidden">
          <div
            className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg"
            style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' }}
          >
            <span className="text-lg font-bold text-white">E</span>
          </div>
          <motion.span
            initial={false}
            animate={{
              opacity: sidebarCollapsed ? 0 : 1,
              width: sidebarCollapsed ? 0 : 'auto',
            }}
            transition={{ duration: 0.2 }}
            className="whitespace-nowrap text-lg font-semibold text-white overflow-hidden"
          >
            Enterprise
          </motion.span>
        </div>
        <button
          onClick={toggleSidebar}
          className="flex h-8 w-8 items-center justify-center rounded-lg text-[#64748b] hover:bg-[#1a1a24] hover:text-[#94a3b8] transition-colors"
        >
          <ChevronLeft
            className={`h-5 w-5 transition-transform duration-300 ${sidebarCollapsed ? 'rotate-180' : ''}`}
          />
        </button>
      </div>

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
                        relative flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200
                        ${isActive
                          ? 'bg-gradient-to-r from-[#6366f1]/20 to-[#8b5cf6]/10 text-white shadow-[inset_0_0_20px_rgba(99,102,241,0.1)]'
                          : 'text-[#94a3b8] hover:bg-[#1a1a24] hover:text-white'
                        }
                      `}
                    >
                      {/* Active indicator bar */}
                      {isActive && (
                        <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-gradient-to-b from-[#6366f1] to-[#8b5cf6] rounded-r-full shadow-[0_0_10px_rgba(99,102,241,0.5)]" />
                      )}
                      <Icon
                        className={`h-5 w-5 flex-shrink-0 transition-colors ${isActive ? 'text-[#6366f1]' : 'text-[#64748b]'}`}
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
                        <span className="ml-auto rounded bg-[#6366f1]/20 px-1.5 py-0.5 text-[10px] font-semibold text-[#6366f1]">
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
                          <div className="mt-1 ml-4 pl-4 border-l border-[#1e1e2e] space-y-1">
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
                                      relative flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm transition-all duration-200
                                      ${isChildActive
                                        ? 'bg-gradient-to-r from-[#6366f1]/15 to-transparent text-white font-medium'
                                        : 'text-[#94a3b8] hover:bg-[#1a1a24] hover:text-white'
                                      }
                                    `}
                                  >
                                    {/* Active dot indicator */}
                                    {isChildActive && (
                                      <span className="absolute -left-4 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-[#6366f1] rounded-full shadow-[0_0_8px_rgba(99,102,241,0.6)]" />
                                    )}
                                    <ChildIcon
                                      className={`h-4 w-4 transition-colors ${isChildActive ? 'text-[#6366f1]' : 'text-[#64748b]'}`}
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

      {/* Logout Section */}
      <div className="border-t border-[#1e1e2e] p-4">
        <button
          onClick={handleLogout}
          className="flex w-full items-center justify-center gap-3 rounded-lg px-3 py-2.5 text-[#ef4444] hover:bg-[#ef4444]/10 transition-colors"
          title="Logout"
        >
          <LogOut className="h-5 w-5" />
          <motion.span
            initial={false}
            animate={{
              opacity: sidebarCollapsed ? 0 : 1,
              width: sidebarCollapsed ? 0 : 'auto',
            }}
            transition={{ duration: 0.2 }}
            className="text-sm font-medium whitespace-nowrap overflow-hidden"
          >
            Logout
          </motion.span>
        </button>
      </div>
    </motion.aside>
  );
};
