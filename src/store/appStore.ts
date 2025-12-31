import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { AccountType } from '@/types';
import { STORAGE_KEYS } from '@/utils/constants';

interface AppState {
  selectedSector: string | null;
  selectedAccountType: AccountType | null;
  selectedModules: string[];
  sidebarCollapsed: boolean;
  setSector: (sector: string | null) => void;
  setAccountType: (type: AccountType | null) => void;
  setSelectedModules: (modules: string[]) => void;
  toggleModule: (moduleId: string) => void;
  isModuleEnabled: (moduleId: string) => boolean;
  toggleSidebar: () => void;
  setSidebarCollapsed: (collapsed: boolean) => void;
  reset: () => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      selectedSector: null,
      selectedAccountType: null,
      selectedModules: [],
      sidebarCollapsed: false,

      setSector: (sector: string | null) => {
        set({ selectedSector: sector });
      },

      setAccountType: (type: AccountType | null) => {
        set({ selectedAccountType: type });
      },

      setSelectedModules: (modules: string[]) => {
        set({ selectedModules: modules });
      },

      toggleModule: (moduleId: string) => {
        set((state) => ({
          selectedModules: state.selectedModules.includes(moduleId)
            ? state.selectedModules.filter((id) => id !== moduleId)
            : [...state.selectedModules, moduleId],
        }));
      },

      isModuleEnabled: (moduleId: string) => {
        const state = get();
        // If no modules are selected, show all modules (default behavior)
        if (state.selectedModules.length === 0) return true;
        return state.selectedModules.includes(moduleId);
      },

      toggleSidebar: () => {
        set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed }));
      },

      setSidebarCollapsed: (collapsed: boolean) => {
        set({ sidebarCollapsed: collapsed });
      },

      reset: () => {
        set({
          selectedSector: null,
          selectedAccountType: null,
          selectedModules: [],
          sidebarCollapsed: false,
        });
      },
    }),
    {
      name: STORAGE_KEYS.app,
      partialize: (state) => ({
        selectedSector: state.selectedSector,
        selectedAccountType: state.selectedAccountType,
        selectedModules: state.selectedModules,
        sidebarCollapsed: state.sidebarCollapsed,
      }),
    }
  )
);
