import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { LogOut } from 'lucide-react';
import { useAppStore } from '@/store/appStore';
import { useAuthStore } from '@/store/authStore';
import { sectors } from '@/data/sectors';
import { ROUTES } from '@/utils/constants';
import { GlareHover } from '@/components/common';
import type { Sector } from '@/types';

export const SectorSelect = () => {
  const navigate = useNavigate();
  const { t } = useTranslation('auth');
  const { t: tSector } = useTranslation('sectors');
  const sectorKey = (id: string) => id.replace(/-([a-z])/g, (_, c: string) => c.toUpperCase());
  const { setSector } = useAppStore();
  const logout = useAuthStore((state) => state.logout);

  // Spotlight tour state
  const [showSpotlight, setShowSpotlight] = useState(false);
  const [spotlightPosition, setSpotlightPosition] = useState({ x: 0, y: 0, width: 0, height: 0 });
  const firstActiveCardRef = useRef<HTMLDivElement>(null);

  // Find first active sector index
  const firstActiveIndex = sectors.findIndex(s => s.isActive);

  // Show spotlight on every page load
  useEffect(() => {
    // Delay to allow user to see the page first
    const timer = setTimeout(() => {
      setShowSpotlight(true);
    }, 2500); // 2.5 seconds delay
    return () => clearTimeout(timer);
  }, []);

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

  // Update spotlight position when shown
  useEffect(() => {
    if (showSpotlight && firstActiveCardRef.current) {
      // Scroll to element first
      firstActiveCardRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });

      // Wait for scroll to complete, then update position
      setTimeout(() => {
        if (firstActiveCardRef.current) {
          const rect = firstActiveCardRef.current.getBoundingClientRect();
          setSpotlightPosition({
            x: rect.left,
            y: rect.top,
            width: rect.width,
            height: rect.height
          });
        }
      }, 300);
    }
  }, [showSpotlight]);

  // Handle window resize
  useEffect(() => {
    if (!showSpotlight) return;

    const handleResize = () => {
      if (firstActiveCardRef.current) {
        const rect = firstActiveCardRef.current.getBoundingClientRect();
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
  }, [showSpotlight]);

  const dismissSpotlight = () => {
    setShowSpotlight(false);
  };

  const handleSectorClick = (sector: Sector) => {
    if (!sector.isActive) return;
    if (showSpotlight) {
      dismissSpotlight();
      return; // Only dismiss tour, don't navigate
    }
    setSector(sector.id);
    navigate(ROUTES.selectAccount);
  };

  const handleLogout = () => {
    logout();
    navigate(ROUTES.login);
  };

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
          {/* Logout Button */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={handleLogout}
            className="absolute top-8 right-8 flex items-center gap-2 px-4 py-2 bg-red-500/10 backdrop-blur-xl border border-red-500/20 rounded-lg text-red-400 cursor-pointer hover:bg-red-500/20 hover:border-red-500/30 hover:scale-105 active:scale-95 transition-all"
          >
            <LogOut className="w-4 h-4" />
            <span className="text-sm font-medium">{t('sectorSelect.logout')}</span>
          </motion.button>

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl font-bold text-white mb-3">{t('sectorSelect.title')}</h1>
            <p className="text-white/60 text-lg">{t('sectorSelect.subtitle')}</p>
          </motion.div>

          {/* Sector Grid */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
          >
            {sectors.map((sector, index) => {
              const Icon = sector.icon;
              const isActive = sector.isActive;
              const isFirstActive = index === firstActiveIndex;

              return (
                <motion.div
                  key={sector.id}
                  ref={isFirstActive ? firstActiveCardRef : undefined}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className={isFirstActive && showSpotlight ? 'relative z-60' : ''}
                >
                  <GlareHover
                    glareColor={isActive ? sector.color : '#ffffff'}
                    glareOpacity={0.2}
                    glareAngle={-30}
                    glareSize={300}
                    transitionDuration={800}
                    playOnce={false}
                    onClick={() => handleSectorClick(sector)}
                    className={`
                      bg-white/[0.03] backdrop-blur-2xl border border-white/[0.08] rounded-xl p-6
                      transition-all duration-300 group
                      before:absolute before:inset-0 before:rounded-xl before:bg-gradient-to-b before:from-white/[0.08] before:to-transparent before:pointer-events-none
                      ${isActive
                        ? 'cursor-pointer hover:border-[#94B4C1]/50 hover:scale-[1.02] hover:bg-white/[0.05]'
                        : 'cursor-not-allowed opacity-50 grayscale'
                      }
                    `}
                  >
                    {/* Soon Badge */}
                    {!isActive && (
                      <div className="absolute top-3 right-3 bg-white/[0.1] border border-white/[0.1] text-white/50 text-xs font-semibold px-2 py-1 rounded z-10">
                        {t('sectorSelect.soon')}
                      </div>
                    )}

                    {/* Icon */}
                    <div
                      className={`
                        relative z-10 w-12 h-12 rounded-lg flex items-center justify-center mb-4
                        ${isActive
                          ? 'bg-white/[0.08] border border-white/[0.1] group-hover:bg-white/[0.12]'
                          : 'bg-white/[0.05] border border-white/[0.05] text-white/40'
                        }
                      `}
                      style={{ color: isActive ? sector.color : undefined }}
                    >
                      <Icon className="w-6 h-6" />
                    </div>

                    {/* Content */}
                    <h3 className="relative z-10 text-lg font-semibold text-white mb-1">{tSector(`${sectorKey(sector.id)}.name`, sector.name)}</h3>
                    <p className="relative z-10 text-sm text-white/60">{tSector(`${sectorKey(sector.id)}.description`, sector.description)}</p>

                    {/* Hover Glow Effect */}
                    {isActive && (
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-[#547792]/0 via-[#94B4C1]/10 to-[#547792]/0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                    )}
                  </GlareHover>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        {/* Spotlight Tour Overlay */}
        <AnimatePresence mode="sync">
          {showSpotlight && spotlightPosition.width > 0 && (
            <motion.div
              key="spotlight-container"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="fixed inset-0 z-50"
            >
              {/* Dark Overlay with Spotlight Cutout */}
              <div
                className="absolute inset-0 pointer-events-auto"
                onClick={dismissSpotlight}
                style={{
                  background: `radial-gradient(ellipse ${spotlightPosition.width + 40}px ${spotlightPosition.height + 40}px at ${spotlightPosition.x + spotlightPosition.width / 2}px ${spotlightPosition.y + spotlightPosition.height / 2}px, transparent 0%, rgba(0, 0, 0, 0.85) 100%)`
                }}
              />

              {/* Pulsing Ring around highlighted card */}
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
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
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.1, ease: "easeOut" }}
                className="absolute pointer-events-none"
                style={{
                  left: spotlightPosition.x + spotlightPosition.width + 20,
                  top: spotlightPosition.y + spotlightPosition.height / 2 - 60,
                }}
              >
                {/* Arrow pointing left */}
                <div className="absolute -left-2 top-12 w-0 h-0 border-t-8 border-t-transparent border-b-8 border-b-transparent border-r-8 border-r-white/10" />

                {/* Tooltip Content */}
                <div className="relative bg-white/[0.05] backdrop-blur-2xl border border-white/[0.12] rounded-2xl p-5 max-w-xs shadow-2xl before:absolute before:inset-0 before:rounded-2xl before:bg-gradient-to-b before:from-white/[0.1] before:to-transparent before:pointer-events-none">
                  <div className="relative z-10 mb-2">
                    <span className="text-white text-lg font-bold">{t('sectorSelect.spotlight.title')}</span>
                  </div>
                  <p className="relative z-10 text-white/90 text-sm font-medium leading-relaxed mb-3">
                    {t('sectorSelect.spotlight.description')}
                  </p>
                  <p className="relative z-10 text-red-400 text-xs font-medium">
                    {t('sectorSelect.spotlight.dismiss')}
                  </p>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
    </div>
  );
};
