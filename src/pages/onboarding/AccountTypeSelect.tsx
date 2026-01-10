import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, User, ArrowLeft, Check, ChevronRight } from 'lucide-react';
import { useAppStore } from '@/store/appStore';
import { getSectorById } from '@/data/sectors';
import { ROUTES } from '@/utils/constants';
import { GlareHover } from '@/components/common';
import type { AccountType } from '@/types';

interface AccountOption {
  type: AccountType;
  title: string;
  description: string;
  icon: typeof Shield | typeof User;
  color: string;
}

const accountOptions: AccountOption[] = [
  {
    type: 'admin',
    title: 'Administrator',
    description: 'Full access to all modules. Manage staff permissions and system settings.',
    icon: Shield,
    color: '#f59e0b', // Amber - authority, power
  },
  {
    type: 'staff',
    title: 'Staff Member',
    description: 'Access to assigned modules only. Limited administrative functions.',
    icon: User,
    color: '#3b82f6', // Blue - trust, team
  },
];

export const AccountTypeSelect = () => {
  const navigate = useNavigate();
  const { selectedSector, setAccountType, setSector } = useAppStore();
  const [selected, setSelected] = useState<AccountType | null>(null);

  // Spotlight tour state
  const [showSpotlight, setShowSpotlight] = useState(false);
  const [spotlightPosition, setSpotlightPosition] = useState({ x: 0, y: 0, width: 0, height: 0 });
  const firstCardRef = useRef<HTMLDivElement>(null);

  const sector = selectedSector ? getSectorById(selectedSector) : null;
  const SectorIcon = sector?.icon;

  // Show spotlight on every page load
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSpotlight(true);
    }, 2500);
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
    if (showSpotlight && firstCardRef.current) {
      // Scroll to element first
      firstCardRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });

      // Wait for scroll to complete, then update position
      setTimeout(() => {
        if (firstCardRef.current) {
          const rect = firstCardRef.current.getBoundingClientRect();
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
      if (firstCardRef.current) {
        const rect = firstCardRef.current.getBoundingClientRect();
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

  const handleBack = () => {
    setSector(null);
    navigate(ROUTES.selectSector);
  };

  const handleContinue = () => {
    if (selected) {
      setAccountType(selected);
      navigate(ROUTES.moduleSelection);
    }
  };

  const handleSelectOption = (type: AccountType) => {
    dismissSpotlight();
    setSelected(type);
  };

  return (
    <div className="min-h-screen p-8">
      <div className="mx-auto max-w-4xl">
        {/* Back Button and Sector Badge - Glass Container */}
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="relative inline-flex items-center gap-4 mb-12 p-3 rounded-xl bg-white/[0.03] backdrop-blur-2xl border border-white/[0.08] before:absolute before:inset-0 before:rounded-xl before:bg-gradient-to-b before:from-white/[0.08] before:to-transparent before:pointer-events-none"
        >
          <button
            onClick={handleBack}
            className="relative z-10 flex h-10 w-10 items-center justify-center rounded-lg bg-red-500/20 backdrop-blur-xl border border-red-500/40 text-red-400 hover:bg-red-500/30 hover:text-red-300 hover:border-red-500/60 transition-all cursor-pointer"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div className="relative z-10 flex items-center gap-3 px-4 py-2 rounded-lg bg-white/[0.05] border border-white/[0.08]">
            {SectorIcon && (
              <div
                className="w-8 h-8 rounded-lg bg-white/[0.08] flex items-center justify-center"
                style={{ color: sector?.color }}
              >
                <SectorIcon className="w-4 h-4" />
              </div>
            )}
            <div>
              <p className="text-xs text-text-muted">Selected Industry</p>
              <h2 className="text-sm font-semibold text-white">
                {sector?.name || 'Unknown Sector'}
              </h2>
            </div>
          </div>
        </motion.div>

        {/* Header */}
        <div className="text-center mb-12">
          <motion.h1
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-4xl font-bold text-white mb-3"
          >
            Select Account Type
          </motion.h1>
          <motion.p
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-white/60 text-lg"
          >
            Choose your access level for the demo
          </motion.p>
        </div>

        {/* Account Type Cards - Glassmorphism Style */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          {accountOptions.map((option, index) => {
            const Icon = option.icon;
            const isSelected = selected === option.type;
            const isFirstCard = index === 0;

            return (
              <motion.div
                key={option.type}
                ref={isFirstCard ? firstCardRef : undefined}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                className={isFirstCard && showSpotlight ? 'relative z-60' : ''}
              >
                <GlareHover
                  glareColor={option.color}
                  glareOpacity={0.25}
                  glareAngle={-30}
                  glareSize={300}
                  transitionDuration={800}
                  playOnce={false}
                  onClick={() => handleSelectOption(option.type)}
                  className={`
                    bg-white/[0.03] backdrop-blur-2xl border rounded-xl p-8
                    transition-all duration-300 cursor-pointer group
                    before:absolute before:inset-0 before:rounded-xl before:bg-gradient-to-b before:from-white/[0.08] before:to-transparent before:pointer-events-none
                    ${isSelected
                      ? 'border-[#94B4C1]/50 scale-[1.02] bg-white/[0.05]'
                      : 'border-white/[0.08] hover:border-[#94B4C1]/30 hover:scale-[1.02] hover:bg-white/[0.05]'
                    }
                  `}
                >
                  {/* Selection indicator */}
                  <div
                    className={`
                      absolute top-4 right-4 h-6 w-6 rounded-full border-2 transition-all flex items-center justify-center z-10
                      ${isSelected
                        ? 'border-emerald-500 bg-emerald-500'
                        : 'border-white/20 group-hover:border-white/40'
                      }
                    `}
                  >
                    {isSelected && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                      >
                        <Check className="w-3.5 h-3.5 text-white" />
                      </motion.div>
                    )}
                  </div>

                  {/* Icon */}
                  <div
                    className="relative z-10 w-16 h-16 rounded-xl flex items-center justify-center mb-6 bg-white/[0.08] border border-white/[0.1] group-hover:bg-white/[0.12]"
                    style={{ color: option.color }}
                  >
                    <Icon className="w-8 h-8" />
                  </div>

                  {/* Content */}
                  <h3 className="relative z-10 text-xl font-semibold text-white mb-2">
                    {option.title}
                  </h3>
                  <p className="relative z-10 text-white/60">
                    {option.description}
                  </p>

                  {/* Hover Glow Effect */}
                  <div className={`absolute inset-0 rounded-xl bg-gradient-to-br from-[#547792]/0 via-[#94B4C1]/10 to-[#547792]/0 transition-opacity pointer-events-none ${isSelected ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`} />
                </GlareHover>
              </motion.div>
            );
          })}
        </div>

        {/* Continue Button */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex justify-center"
        >
          <button
            onClick={handleContinue}
            disabled={!selected}
            className="relative px-8 py-3 bg-white/[0.03] backdrop-blur-2xl border border-white/[0.08] text-white font-semibold rounded-xl transition-all transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center gap-2 cursor-pointer group overflow-hidden before:absolute before:inset-0 before:rounded-xl before:bg-gradient-to-r before:from-[#547792]/20 before:to-[#94B4C1]/20 before:opacity-100 hover:border-[#94B4C1]/50 hover:bg-white/[0.06] hover:shadow-[0_0_30px_rgba(148,180,193,0.3)]"
          >
            <span className="relative z-10">Continue</span>
            <ChevronRight size={20} className="relative z-10 group-hover:translate-x-1 transition-transform" />
            {/* Animated gradient glow */}
            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#547792]/0 via-[#94B4C1]/20 to-[#547792]/0 opacity-0 group-hover:opacity-100 transition-opacity" />
          </button>
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
                  <span className="text-white text-lg font-bold">Choose Your Role!</span>
                </div>
                <p className="relative z-10 text-white/90 text-sm font-medium leading-relaxed mb-3">
                  Select Admin for full access or Staff for limited permissions in the demo.
                </p>
                <p className="relative z-10 text-red-400 text-xs font-medium">
                  Click anywhere to dismiss
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
