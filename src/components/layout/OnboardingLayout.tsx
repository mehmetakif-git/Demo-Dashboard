import { Outlet, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import LightPillar from '@/components/ui/LightPillar';

// Page transition variants
const pageVariants = {
  initial: {
    opacity: 0,
    y: 20,
    scale: 0.98,
  },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.4,
      ease: [0.25, 0.46, 0.45, 0.94] as const,
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    scale: 0.98,
    transition: {
      duration: 0.3,
      ease: [0.25, 0.46, 0.45, 0.94] as const,
    },
  },
};

export const OnboardingLayout = () => {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-background-primary relative overflow-hidden">
      {/* Persistent Animated Light Pillar Background */}
      <div className="fixed inset-0 z-0">
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
          color4GlowMultiplier={0.5}
        />
      </div>

      {/* Animated Page Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          variants={pageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          className="relative z-10 min-h-screen"
        >
          <Outlet />
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default OnboardingLayout;
