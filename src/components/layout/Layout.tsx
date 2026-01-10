import { Suspense, useState, useEffect, useCallback } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { useAppStore } from '@/store/appStore';
import { LAYOUT } from '@/utils/constants';
import { Skeleton, ErrorBoundary } from '@/components/common';
import LightPillar from '@/components/ui/LightPillar';
import { usePerformanceMode } from '@/hooks/usePerformanceMode';

// Hook for responsive zoom scaling
const useResponsiveZoom = () => {
  const [zoom, setZoom] = useState(1);

  useEffect(() => {
    const calculateZoom = () => {
      const width = window.innerWidth;

      // Base design width (15" laptop ~1440px)
      const baseWidth = 1440;

      // Only scale down for smaller screens, never scale up
      if (width >= baseWidth) {
        setZoom(1);
      } else if (width >= 1280) {
        // 13-14" laptops
        setZoom(0.9);
      } else if (width >= 1024) {
        // Small laptops / tablets landscape
        setZoom(0.8);
      } else {
        // Very small screens
        setZoom(0.75);
      }
    };

    calculateZoom();
    window.addEventListener('resize', calculateZoom);
    return () => window.removeEventListener('resize', calculateZoom);
  }, []);

  return zoom;
};

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

// Tour step titles and descriptions
const tourSteps = [
  {
    title: 'Navigation Sidebar',
    description: 'Access all your modules, manage your business areas, and navigate through different sections from here.',
  },
  {
    title: 'Top Header',
    description: 'Quick access to search, notifications, messages, and your profile settings.',
  },
  {
    title: 'Main Content Area',
    description: 'This is where all your dashboard data, charts, and widgets are displayed.',
  },
  {
    title: 'Logout Button',
    description: 'Click here when you want to safely log out of your account.',
  },
];

// Element IDs for each tour step
const tourElementIds = [
  'dashboard-sidebar',
  'dashboard-header',
  'dashboard-content',
  'dashboard-logout',
];

export const Layout = () => {
  const { sidebarCollapsed } = useAppStore();
  const location = useLocation();
  const zoom = useResponsiveZoom();
  const { shouldOptimize } = usePerformanceMode();

  // Spotlight tour state
  const [showSpotlight, setShowSpotlight] = useState(false);
  const [spotlightStep, setSpotlightStep] = useState(0);
  const [spotlightPosition, setSpotlightPosition] = useState({ x: 0, y: 0, width: 0, height: 0 });
  const [hasSeenTour, setHasSeenTour] = useState(false);

  // Tour resets on every page refresh (no persistence)

  // Show spotlight tour only on dashboard page and if not seen
  useEffect(() => {
    if (location.pathname === '/dashboard' && !hasSeenTour) {
      const timer = setTimeout(() => {
        setShowSpotlight(true);
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [location.pathname, hasSeenTour]);

  // Update spotlight position based on current step
  const updateSpotlightPosition = useCallback(() => {
    const elementId = tourElementIds[spotlightStep];
    const element = document.getElementById(elementId);
    if (element) {
      const rect = element.getBoundingClientRect();
      setSpotlightPosition({
        x: rect.left,
        y: rect.top,
        width: rect.width,
        height: rect.height,
      });
    }
  }, [spotlightStep]);

  // Update position when spotlight is shown or step changes
  useEffect(() => {
    if (showSpotlight) {
      // Small delay to ensure DOM is ready
      const timer = setTimeout(() => {
        updateSpotlightPosition();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [showSpotlight, spotlightStep, updateSpotlightPosition]);

  // Handle window resize
  useEffect(() => {
    if (!showSpotlight) return;

    const handleResize = () => {
      updateSpotlightPosition();
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [showSpotlight, updateSpotlightPosition]);

  // Disable scroll when spotlight is active (but keep scrollbar visible)
  useEffect(() => {
    if (!showSpotlight) return;

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
  }, [showSpotlight]);

  // Handle next step
  const handleNextStep = () => {
    if (spotlightStep < tourSteps.length - 1) {
      setSpotlightStep(prev => prev + 1);
    } else {
      // Tour completed
      dismissSpotlight();
    }
  };

  // Dismiss spotlight
  const dismissSpotlight = () => {
    setShowSpotlight(false);
    setSpotlightStep(0);
    setHasSeenTour(true);
  };

  // Get tooltip position based on current step
  const getTooltipPosition = () => {
    switch (spotlightStep) {
      case 0: // Sidebar - tooltip on the right
        return {
          left: spotlightPosition.x + spotlightPosition.width + 20,
          top: spotlightPosition.y + spotlightPosition.height / 2 - 80,
        };
      case 1: // Header - tooltip below
        return {
          left: spotlightPosition.x + spotlightPosition.width / 2 - 140,
          top: spotlightPosition.y + spotlightPosition.height + 20,
        };
      case 2: // Content - tooltip in center
        return {
          left: spotlightPosition.x + spotlightPosition.width / 2 - 140,
          top: spotlightPosition.y + spotlightPosition.height / 2 - 80,
        };
      case 3: // Logout - tooltip on the right
        return {
          left: spotlightPosition.x + spotlightPosition.width + 20,
          top: spotlightPosition.y - 120,
        };
      default:
        return { left: 0, top: 0 };
    }
  };

  // Get arrow direction based on step
  const getArrowClass = () => {
    switch (spotlightStep) {
      case 0: // Pointing left (to sidebar)
        return 'absolute -left-2 top-16 w-0 h-0 border-t-8 border-t-transparent border-b-8 border-b-transparent border-r-8 border-r-white/10';
      case 1: // Pointing up (to header)
        return 'absolute -top-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-8 border-l-transparent border-r-8 border-r-transparent border-b-8 border-b-white/10';
      case 2: // No arrow for center tooltip
        return 'hidden';
      case 3: // Pointing left (to logout)
        return 'absolute -left-2 top-8 w-0 h-0 border-t-8 border-t-transparent border-b-8 border-b-transparent border-r-8 border-r-white/10';
      default:
        return '';
    }
  };

  return (
    <div
      className="flex h-screen bg-background-primary relative"
      style={{
        zoom: zoom,
        // Compensate height for zoom
        minHeight: zoom < 1 ? `${100 / zoom}vh` : '100vh',
      }}
    >
      {/* Static Light Pillar Background - Disabled in performance mode */}
      {!shouldOptimize && (
        <div className="fixed inset-0 z-0 pointer-events-none">
          <LightPillar
            color1="#213448"
            color2="#547792"
            color3="#94B4C1"
            color4="#EAE0CF"
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
            color4GlowMultiplier={0.5}
          />
        </div>
      )}

      {/* Clean solid background in performance mode */}
      {shouldOptimize && (
        <div className="fixed inset-0 z-0 pointer-events-none bg-background-primary" />
      )}

      {/* Sidebar - stays mounted */}
      <div className={showSpotlight && spotlightStep === 0 ? 'relative z-60' : ''}>
        <Sidebar />
      </div>

      {/* Header - fixed at top, outside main for proper backdrop-blur */}
      <div className={showSpotlight && spotlightStep === 1 ? 'relative z-60' : ''}>
        <Header />
      </div>

      {/* Main content area */}
      <main
        id="dashboard-content"
        className={`relative flex flex-1 flex-col overflow-hidden transition-all duration-300 pt-16 ${showSpotlight && spotlightStep === 2 ? 'z-60' : 'z-10'}`}
        style={{
          marginLeft: sidebarCollapsed ? LAYOUT.sidebarCollapsedWidth : LAYOUT.sidebarWidth,
        }}
      >
        {/* Content - simple fade on route change */}
        <div className="flex-1 overflow-auto">
          <ErrorBoundary key={location.pathname}>
            <Suspense fallback={<PageLoader />}>
              <motion.div
                key={location.pathname}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.15 }}
                className="h-full"
              >
                <Outlet />
              </motion.div>
            </Suspense>
          </ErrorBoundary>
        </div>
      </main>

      {/* Spotlight Tour Overlay */}
      <AnimatePresence mode="sync">
        {showSpotlight && spotlightPosition.width > 0 && (
          <motion.div
            key="spotlight-container"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="fixed inset-0 z-[70]"
          >
            {/* Dark Overlay with Spotlight Cutout */}
            <div
              className="absolute inset-0 pointer-events-auto"
              onClick={handleNextStep}
              style={{
                background: `radial-gradient(ellipse ${spotlightPosition.width + 40}px ${spotlightPosition.height + 40}px at ${spotlightPosition.x + spotlightPosition.width / 2}px ${spotlightPosition.y + spotlightPosition.height / 2}px, transparent 0%, rgba(0, 0, 0, 0.85) 100%)`
              }}
            />

            {/* Pulsing Ring around highlighted element */}
            <motion.div
              key={`ring-${spotlightStep}`}
              initial={{ scale: 0.95, opacity: 0 }}
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
              <div className="absolute inset-0 rounded-xl border-2 border-[#94B4C1]/50 animate-pulse" />
              <div className="absolute inset-0 rounded-xl border border-[#94B4C1]/30 animate-ping" style={{ animationDuration: '2s' }} />
            </motion.div>

            {/* Tooltip */}
            <motion.div
              key={`tooltip-${spotlightStep}`}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.1, ease: "easeOut" }}
              className="absolute pointer-events-none"
              style={getTooltipPosition()}
            >
              {/* Arrow */}
              <div className={getArrowClass()} />

              {/* Tooltip Content */}
              <div className="relative bg-white/[0.05] backdrop-blur-2xl border border-white/[0.12] rounded-2xl p-5 w-[280px] shadow-2xl before:absolute before:inset-0 before:rounded-2xl before:bg-gradient-to-b before:from-white/[0.1] before:to-transparent before:pointer-events-none">
                {/* Step indicator */}
                <div className="relative z-10 flex items-center gap-2 mb-3">
                  {tourSteps.map((_, index) => (
                    <div
                      key={index}
                      className={`h-1.5 rounded-full transition-all ${
                        index === spotlightStep
                          ? 'w-6 bg-[#94B4C1]'
                          : index < spotlightStep
                          ? 'w-1.5 bg-[#94B4C1]/50'
                          : 'w-1.5 bg-white/20'
                      }`}
                    />
                  ))}
                  <span className="ml-auto text-xs text-white/40">
                    {spotlightStep + 1}/{tourSteps.length}
                  </span>
                </div>

                <div className="relative z-10 mb-2">
                  <span className="text-white text-lg font-bold">{tourSteps[spotlightStep].title}</span>
                </div>
                <p className="relative z-10 text-white/90 text-sm font-medium leading-relaxed mb-4">
                  {tourSteps[spotlightStep].description}
                </p>
                <div className="relative z-10 flex items-center justify-between">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      dismissSpotlight();
                    }}
                    className="text-white/40 text-xs hover:text-white/60 transition-colors pointer-events-auto cursor-pointer"
                  >
                    Skip tour
                  </button>
                  <span className="text-[#94B4C1] text-xs font-medium">
                    Click anywhere to continue
                  </span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Layout;
