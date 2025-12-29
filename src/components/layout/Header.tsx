import { motion } from 'framer-motion';
import { Search, Bell, Mail, Menu, User, Settings, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '@/store/appStore';
import { useAuth } from '@/hooks/useAuth';
import { Dropdown, Avatar } from '@/components/common';
import { Breadcrumb } from './Breadcrumb';
import { LAYOUT, ROUTES } from '@/utils/constants';

export const Header = () => {
  const { sidebarCollapsed, toggleSidebar, selectedAccountType } = useAppStore();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate(ROUTES.login);
  };

  const profileMenuItems = [
    {
      id: 'profile',
      label: 'Profile',
      icon: <User className="h-4 w-4" />,
      onClick: () => {},
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: <Settings className="h-4 w-4" />,
      onClick: () => {},
    },
    {
      id: 'divider-1',
      label: '',
      divider: true,
    },
    {
      id: 'logout',
      label: 'Logout',
      icon: <LogOut className="h-4 w-4" />,
      onClick: handleLogout,
    },
  ];

  return (
    <motion.header
      initial={false}
      animate={{
        marginLeft: sidebarCollapsed
          ? LAYOUT.sidebarCollapsedWidth
          : LAYOUT.sidebarWidth,
      }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-[#1e1e2e] bg-[#0a0a0f]/80 backdrop-blur-lg px-6"
    >
      {/* Left Section */}
      <div className="flex items-center gap-4">
        {/* Mobile menu toggle (hidden on desktop) */}
        <button
          onClick={toggleSidebar}
          className="flex h-9 w-9 items-center justify-center rounded-lg text-[#64748b] hover:bg-[#1a1a24] hover:text-[#94a3b8] transition-colors lg:hidden"
        >
          <Menu className="h-5 w-5" />
        </button>

        {/* Breadcrumb */}
        <Breadcrumb />
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-2">
        {/* Search Button */}
        <button className="flex h-9 w-9 items-center justify-center rounded-lg text-[#64748b] hover:bg-[#1a1a24] hover:text-[#94a3b8] transition-colors">
          <Search className="h-5 w-5" />
        </button>

        {/* Notifications */}
        <button className="relative flex h-9 w-9 items-center justify-center rounded-lg text-[#64748b] hover:bg-[#1a1a24] hover:text-[#94a3b8] transition-colors">
          <Bell className="h-5 w-5" />
          {/* Notification badge */}
          <span className="absolute right-1.5 top-1.5 flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#6366f1] opacity-75"></span>
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[#6366f1]"></span>
          </span>
        </button>

        {/* Messages */}
        <button className="relative flex h-9 w-9 items-center justify-center rounded-lg text-[#64748b] hover:bg-[#1a1a24] hover:text-[#94a3b8] transition-colors">
          <Mail className="h-5 w-5" />
        </button>

        {/* Profile Dropdown */}
        <Dropdown
          trigger={
            <div className="flex items-center gap-2 rounded-lg py-1 pl-1 pr-3 hover:bg-[#1a1a24] transition-colors">
              <Avatar name={user?.name || 'User'} size="sm" />
              <div className="hidden sm:block text-left">
                <p className="text-sm font-medium text-white leading-tight">
                  {user?.name}
                </p>
                <p className="text-xs text-[#64748b] capitalize leading-tight">
                  {selectedAccountType || 'User'}
                </p>
              </div>
            </div>
          }
          items={profileMenuItems}
          align="right"
        />
      </div>
    </motion.header>
  );
};
