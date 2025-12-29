import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LogOut } from 'lucide-react';
import { useAppStore } from '@/store/appStore';
import { useAuthStore } from '@/store/authStore';
import { sectors } from '@/data/sectors';
import { ROUTES } from '@/utils/constants';
import type { Sector } from '@/types';
import LightPillar from '@/components/ui/LightPillar';

export const SectorSelect = () => {
  const navigate = useNavigate();
  const { setSector } = useAppStore();
  const logout = useAuthStore((state) => state.logout);

  const handleSectorClick = (sector: Sector) => {
    if (!sector.isActive) return;
    setSector(sector.id);
    navigate(ROUTES.selectAccount);
  };

  const handleLogout = () => {
    logout();
    navigate(ROUTES.login);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] p-8 relative overflow-hidden">
      {/* Light Pillar Background Effect */}
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
      />

      <div className="max-w-7xl mx-auto relative z-10">
          {/* Logout Button */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={handleLogout}
            className="absolute top-0 right-0 flex items-center gap-2 px-4 py-2 bg-red-500/10 backdrop-blur-xl border border-red-500/20 rounded-lg text-red-400 cursor-pointer hover:bg-red-500/20 hover:border-red-500/30 hover:scale-105 active:scale-95 transition-all"
          >
            <LogOut className="w-4 h-4" />
            <span className="text-sm font-medium">Logout</span>
          </motion.button>

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl font-bold text-white mb-3">Select Your Industry</h1>
            <p className="text-white/60 text-lg">Configure your panel for your specific business needs</p>
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

              return (
                <motion.div
                  key={sector.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => handleSectorClick(sector)}
                  className={`
                    relative bg-white/[0.03] backdrop-blur-2xl border border-white/[0.08] rounded-xl p-6
                    transition-all duration-300 group overflow-hidden
                    before:absolute before:inset-0 before:rounded-xl before:bg-gradient-to-b before:from-white/[0.08] before:to-transparent before:pointer-events-none
                    ${isActive
                      ? 'cursor-pointer hover:border-[#8b5cf6]/50 hover:scale-[1.02] hover:bg-white/[0.05]'
                      : 'cursor-not-allowed opacity-50 grayscale'
                    }
                  `}
                >
                  {/* Soon Badge */}
                  {!isActive && (
                    <div className="absolute top-3 right-3 bg-white/[0.1] border border-white/[0.1] text-white/50 text-xs font-semibold px-2 py-1 rounded z-10">
                      SOON
                    </div>
                  )}

                  {/* Icon */}
                  <div className={`
                    relative z-10 w-12 h-12 rounded-lg flex items-center justify-center mb-4
                    ${isActive
                      ? 'bg-white/[0.08] border border-white/[0.1] text-[#8b5cf6] group-hover:bg-white/[0.12] group-hover:text-[#a78bfa]'
                      : 'bg-white/[0.05] border border-white/[0.05] text-white/40'
                    }
                  `}>
                    <Icon className="w-6 h-6" />
                  </div>

                  {/* Content */}
                  <h3 className="relative z-10 text-lg font-semibold text-white mb-1">{sector.name}</h3>
                  <p className="relative z-10 text-sm text-white/60">{sector.description}</p>

                  {/* Hover Glow Effect */}
                  {isActive && (
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-[#6366f1]/0 via-[#8b5cf6]/10 to-[#6366f1]/0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                  )}
                </motion.div>
              );
            })}
          </motion.div>
        </div>
    </div>
  );
};
