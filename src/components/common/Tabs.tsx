import { motion } from 'framer-motion';

interface Tab {
  id: string;
  label: string;
  count?: number;
}

interface TabsProps {
  tabs: Tab[];
  activeTab: string;
  onChange: (tabId: string) => void;
}

export const Tabs = ({ tabs, activeTab, onChange }: TabsProps) => {
  return (
    <div className="flex items-center gap-1 p-1 bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] rounded-lg w-fit mb-6">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onChange(tab.id)}
          className={`relative px-4 py-2 text-sm font-medium rounded-md transition-colors cursor-pointer ${
            activeTab === tab.id
              ? 'text-white'
              : 'text-white/60 hover:text-white/80'
          }`}
        >
          {activeTab === tab.id && (
            <motion.div
              layoutId="activeTab"
              className="absolute inset-0 bg-[#6366f1]/20 border border-[#6366f1]/30 rounded-md"
              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            />
          )}
          <span className="relative flex items-center gap-2">
            {tab.label}
            {tab.count !== undefined && (
              <span className={`px-1.5 py-0.5 text-[10px] rounded-full ${
                activeTab === tab.id
                  ? 'bg-[#6366f1]/30 text-[#6366f1]'
                  : 'bg-white/10 text-white/60'
              }`}>
                {tab.count}
              </span>
            )}
          </span>
        </button>
      ))}
    </div>
  );
};
