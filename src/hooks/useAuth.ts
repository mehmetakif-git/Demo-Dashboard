import { useAuthStore } from '@/store/authStore';
import { useAppStore } from '@/store/appStore';

// Custom hook that combines auth functionality with app state reset
export const useAuth = () => {
  const { isAuthenticated, user, login, logout: authLogout, setUser } = useAuthStore();
  const { reset: resetApp } = useAppStore();

  // Enhanced logout that also resets app state
  const logout = () => {
    authLogout();
    resetApp();
  };

  return {
    isAuthenticated,
    user,
    login,
    logout,
    setUser,
  };
};
