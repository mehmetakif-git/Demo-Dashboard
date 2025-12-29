import { Suspense } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { useAppStore } from '@/store/appStore';
import { LAYOUT } from '@/utils/constants';
import { Skeleton } from '@/components/common';

// Page loading skeleton
const PageLoader = () => (
  <div className="p-6 space-y-6">
    <Skeleton width="30%" height={32} />
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <Skeleton height={120} />
      <Skeleton height={120} />
      <Skeleton height={120} />
      <Skeleton height={120} />
    </div>
    <Skeleton width="100%" height={300} />
  </div>
);

export const Layout = () => {
  const { sidebarCollapsed } = useAppStore();
  const location = useLocation();

  return (
    <div className="flex h-screen bg-[#0a0a0f]">
      {/* Sidebar - stays mounted */}
      <Sidebar />

      {/* Main content area */}
      <main
        className="flex flex-1 flex-col overflow-hidden transition-all duration-300"
        style={{
          marginLeft: sidebarCollapsed ? LAYOUT.sidebarCollapsedWidth : LAYOUT.sidebarWidth,
        }}
      >
        {/* Header - stays mounted */}
        <Header />

        {/* Content - only this part animates on route change */}
        <div className="flex-1 overflow-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="h-full"
            >
              <Suspense fallback={<PageLoader />}>
                <Outlet />
              </Suspense>
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
};

export default Layout;
