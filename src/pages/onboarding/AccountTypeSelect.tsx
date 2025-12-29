import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Shield, User, ArrowLeft } from 'lucide-react';
import { useAppStore } from '@/store/appStore';
import { getSectorById } from '@/data/sectors';
import { Button } from '@/components/common';
import { ROUTES } from '@/utils/constants';
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
    color: '#6366f1',
  },
  {
    type: 'staff',
    title: 'Staff Member',
    description: 'Access to assigned modules only. Limited administrative functions.',
    icon: User,
    color: '#8b5cf6',
  },
];

export const AccountTypeSelect = () => {
  const navigate = useNavigate();
  const { selectedSector, setAccountType, setSector } = useAppStore();
  const [selected, setSelected] = useState<AccountType | null>(null);

  const sector = selectedSector ? getSectorById(selectedSector) : null;

  const handleBack = () => {
    setSector(null);
    navigate(ROUTES.selectSector);
  };

  const handleContinue = () => {
    if (selected) {
      setAccountType(selected);
      navigate(ROUTES.dashboard);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] p-8">
      <div className="mx-auto max-w-4xl">
        {/* Back Button and Sector Name */}
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="flex items-center gap-4 mb-12"
        >
          <button
            onClick={handleBack}
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#1e1e2e] bg-[#12121a] text-[#64748b] hover:bg-[#1a1a24] hover:text-white hover:border-[#2e2e3e] transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div>
            <p className="text-sm text-[#64748b]">Selected Industry</p>
            <h2 className="text-lg font-semibold text-white">
              {sector?.name || 'Unknown Sector'}
            </h2>
          </div>
        </motion.div>

        {/* Header */}
        <div className="text-center mb-12">
          <motion.h1
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-3xl font-bold text-white"
          >
            Select Account Type
          </motion.h1>
          <motion.p
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mt-3 text-[#94a3b8]"
          >
            Choose your access level for the demo
          </motion.p>
        </div>

        {/* Account Type Cards */}
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
                <button
                  onClick={() => setSelected(option.type)}
                  className={`
                    relative w-full rounded-xl p-8 text-left transition-all duration-300
                    ${isSelected
                      ? 'bg-[#12121a] shadow-lg'
                      : 'bg-[#12121a] border border-[#1e1e2e] hover:border-[#2e2e3e] hover:scale-[1.02]'
                    }
                  `}
                  style={isSelected ? {
                    boxShadow: `0 0 30px ${option.color}30`
                  } : undefined}
                >
                  {/* Gradient Border when selected */}
                  {isSelected && (
                    <div
                      className="absolute inset-0 rounded-xl p-[2px] -z-10"
                      style={{
                        background: `linear-gradient(135deg, ${option.color}, ${option.color}80)`
                      }}
                    >
                      <div className="h-full w-full rounded-xl bg-[#12121a]" />
                    </div>
                  )}

                  {/* Selection indicator */}
                  <div
                    className={`
                      absolute top-4 right-4 h-5 w-5 rounded-full border-2 transition-all flex items-center justify-center
                      ${isSelected ? '' : 'border-[#2e2e3e]'}
                    `}
                    style={isSelected ? {
                      borderColor: option.color,
                      backgroundColor: option.color
                    } : undefined}
                  >
                    {isSelected && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="h-2 w-2 rounded-full bg-white"
                      />
                    )}
                  </div>

                  {/* Icon */}
                  <div
                    className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl transition-colors"
                    style={isSelected ? {
                      background: `linear-gradient(135deg, ${option.color}, ${option.color}80)`,
                      color: 'white'
                    } : {
                      backgroundColor: '#1a1a24',
                      color: '#64748b'
                    }}
                  >
                    <Icon className="h-8 w-8" />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-semibold mb-2 text-white">
                    {option.title}
                  </h3>
                  <p className="text-[#94a3b8]">{option.description}</p>
                </button>
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
          <Button
            onClick={handleContinue}
            variant="primary"
            size="lg"
            disabled={!selected}
            className="min-w-[200px]"
          >
            Continue to Dashboard
          </Button>
        </motion.div>
      </div>
    </div>
  );
};
