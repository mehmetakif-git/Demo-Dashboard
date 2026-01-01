import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Shield, User, ArrowLeft, Check } from 'lucide-react';
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

  const sector = selectedSector ? getSectorById(selectedSector) : null;
  const SectorIcon = sector?.icon;

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
              <p className="text-xs text-[#64748b]">Selected Industry</p>
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

            return (
              <motion.div
                key={option.type}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
              >
                <GlareHover
                  glareColor={option.color}
                  glareOpacity={0.25}
                  glareAngle={-30}
                  glareSize={300}
                  transitionDuration={800}
                  playOnce={false}
                  onClick={() => setSelected(option.type)}
                  className={`
                    bg-white/[0.03] backdrop-blur-2xl border rounded-xl p-8
                    transition-all duration-300 cursor-pointer group
                    before:absolute before:inset-0 before:rounded-xl before:bg-gradient-to-b before:from-white/[0.08] before:to-transparent before:pointer-events-none
                    ${isSelected
                      ? 'border-[#8b5cf6]/50 scale-[1.02] bg-white/[0.05]'
                      : 'border-white/[0.08] hover:border-[#8b5cf6]/30 hover:scale-[1.02] hover:bg-white/[0.05]'
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
                  <div className={`absolute inset-0 rounded-xl bg-gradient-to-br from-[#6366f1]/0 via-[#8b5cf6]/10 to-[#6366f1]/0 transition-opacity pointer-events-none ${isSelected ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`} />
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
            className="px-8 py-3 bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] text-white font-semibold rounded-xl hover:opacity-90 transition-all transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none min-w-[200px] cursor-pointer"
          >
            Continue
          </button>
        </motion.div>
      </div>
    </div>
  );
};
