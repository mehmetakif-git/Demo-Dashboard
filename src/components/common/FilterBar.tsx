import { Search, Grid, List, Filter } from 'lucide-react';
import { motion } from 'framer-motion';

interface FilterOption {
  value: string;
  label: string;
}

interface FilterBarProps {
  searchValue: string;
  onSearchChange: (value: string) => void;
  searchPlaceholder?: string;
  filters?: {
    name: string;
    value: string;
    onChange: (value: string) => void;
    options: FilterOption[];
  }[];
  viewMode?: 'table' | 'grid';
  onViewModeChange?: (mode: 'table' | 'grid') => void;
  showViewToggle?: boolean;
}

export const FilterBar = ({
  searchValue,
  onSearchChange,
  searchPlaceholder = 'Search...',
  filters = [],
  viewMode = 'table',
  onViewModeChange,
  showViewToggle = false,
}: FilterBarProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="flex flex-col lg:flex-row gap-4 mb-6"
    >
      {/* Search */}
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
        <input
          type="text"
          value={searchValue}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder={searchPlaceholder}
          className="w-full pl-10 pr-4 py-2.5 bg-[#12121a] border border-[#1e1e2e] rounded-lg text-white placeholder:text-white/40 focus:outline-none focus:border-[#6366f1]/50 transition-colors text-sm"
        />
      </div>

      {/* Filters */}
      <div className="flex items-center gap-3 flex-wrap">
        {filters.map((filter) => (
          <div key={filter.name} className="relative">
            <select
              value={filter.value}
              onChange={(e) => filter.onChange(e.target.value)}
              className="appearance-none pl-3 pr-8 py-2.5 bg-[#12121a] border border-[#1e1e2e] rounded-lg text-white text-sm focus:outline-none focus:border-[#6366f1]/50 transition-colors cursor-pointer"
            >
              {filter.options.map((option) => (
                <option key={option.value} value={option.value} className="bg-[#12121a]">
                  {option.label}
                </option>
              ))}
            </select>
            <Filter className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40 pointer-events-none" />
          </div>
        ))}

        {/* View Toggle */}
        {showViewToggle && onViewModeChange && (
          <div className="flex items-center bg-[#12121a] border border-[#1e1e2e] rounded-lg p-1">
            <button
              onClick={() => onViewModeChange('table')}
              className={`p-2 rounded-md transition-colors ${
                viewMode === 'table'
                  ? 'bg-[#6366f1]/20 text-[#6366f1]'
                  : 'text-white/40 hover:text-white/60'
              }`}
            >
              <List className="w-4 h-4" />
            </button>
            <button
              onClick={() => onViewModeChange('grid')}
              className={`p-2 rounded-md transition-colors ${
                viewMode === 'grid'
                  ? 'bg-[#6366f1]/20 text-[#6366f1]'
                  : 'text-white/40 hover:text-white/60'
              }`}
            >
              <Grid className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </motion.div>
  );
};
