import { Suspense } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { useAppStore } from '@/store/appStore';
import { LAYOUT } from '@/utils/constants';
import { Skeleton } from '@/components/common';
import LightPillar from '@/components/ui/LightPillar';

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
    <div className="flex h-screen bg-[#0a0a0f] relative">
      {/* Static Light Pillar Background - Same as OnboardingLayout but static for performance */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <LightPillar
          topColor="#5227FF"
          bottomColor="#FF9FFC"
          intensity={1}
          rotationSpeed={0.3}
          glowAmount={0.002}
          pillarWidth={3}
          pillarHeight={0.4}
          noiseIntensity={0.5}
          pillarRotation={25}
          interactive={false}
          mixBlendMode="normal"
          isStatic
          staticTime={2.5}
        />
      </div>

      {/* Sidebar - stays mounted */}
      <Sidebar />

      {/* Header - fixed at top, outside main for proper backdrop-blur */}
      <Header />

      {/* Main content area */}
      <main
        className="relative z-10 flex flex-1 flex-col overflow-hidden transition-all duration-300 pt-16"
        style={{
          marginLeft: sidebarCollapsed ? LAYOUT.sidebarCollapsedWidth : LAYOUT.sidebarWidth,
        }}
      >
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
