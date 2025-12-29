import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User } from '@/types';
import { DEMO_CREDENTIALS, STORAGE_KEYS } from '@/utils/constants';
import { useAppStore } from './appStore';

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  rememberMe: boolean;
  login: (email: string, password: string, rememberMe?: boolean) => boolean;
  logout: () => void;
  setUser: (user: User) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      isAuthenticated: false,
      user: null,
      rememberMe: false,

      login: (email: string, password: string, rememberMe = false): boolean => {
        // Check against demo credentials
        if (
          email === DEMO_CREDENTIALS.email &&
          password === DEMO_CREDENTIALS.password
        ) {
          set({
            isAuthenticated: true,
            user: DEMO_CREDENTIALS.user,
            rememberMe,
          });
          return true;
        }
        return false;
      },

      logout: () => {
        const { rememberMe, user } = get();

        if (rememberMe && user) {
          // Keep user info but mark as not authenticated (requires re-login but fields pre-filled)
          set({
            isAuthenticated: false,
          });
        } else {
          // Full logout - clear everything
          set({
            isAuthenticated: false,
            user: null,
            rememberMe: false,
          });
        }
        // Also reset app store
        useAppStore.getState().reset();
      },

      setUser: (user: User) => {
        set({ user });
      },
    }),
    {
      name: STORAGE_KEYS.auth,
      partialize: (state) => ({
        isAuthenticated: state.isAuthenticated,
        user: state.user,
        rememberMe: state.rememberMe,
      }),
    }
  )
);
