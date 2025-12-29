import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { AccountType } from '@/types';
import { STORAGE_KEYS } from '@/utils/constants';

interface AppState {
  selectedSector: string | null;
  selectedAccountType: AccountType | null;
  sidebarCollapsed: boolean;
  setSector: (sector: string | null) => void;
  setAccountType: (type: AccountType | null) => void;
  toggleSidebar: () => void;
  setSidebarCollapsed: (collapsed: boolean) => void;
  reset: () => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      selectedSector: null,
      selectedAccountType: null,
      sidebarCollapsed: false,

      setSector: (sector: string | null) => {
        set({ selectedSector: sector });
      },

      setAccountType: (type: AccountType | null) => {
        set({ selectedAccountType: type });
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
          sidebarCollapsed: false,
        });
      },
    }),
    {
      name: STORAGE_KEYS.app,
      partialize: (state) => ({
        selectedSector: state.selectedSector,
        selectedAccountType: state.selectedAccountType,
        sidebarCollapsed: state.sidebarCollapsed,
      }),
    }
  )
);
