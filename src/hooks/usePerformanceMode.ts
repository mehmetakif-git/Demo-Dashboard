import { useState, useEffect } from 'react';
import { useAppStore } from '@/store/appStore';

interface BatteryManager extends EventTarget {
  charging: boolean;
  chargingTime: number;
  dischargingTime: number;
  level: number;
}

declare global {
  interface Navigator {
    getBattery?: () => Promise<BatteryManager>;
  }
}

interface PerformanceState {
  isLowPower: boolean;
  isOnBattery: boolean;
  batteryLevel: number | null;
  prefersReducedMotion: boolean;
}

/**
 * Hook to detect and manage performance mode
 * Returns whether performance optimizations should be active
 */
export const usePerformanceMode = () => {
  const { performanceMode } = useAppStore();

  const [state, setState] = useState<PerformanceState>({
    isLowPower: false,
    isOnBattery: false,
    batteryLevel: null,
    prefersReducedMotion: false,
  });

  // Check for prefers-reduced-motion
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setState(prev => ({ ...prev, prefersReducedMotion: mediaQuery.matches }));

    const handler = (e: MediaQueryListEvent) => {
      setState(prev => ({ ...prev, prefersReducedMotion: e.matches }));
    };

    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  // Check battery status
  useEffect(() => {
    const checkBattery = async () => {
      if (!navigator.getBattery) return;

      try {
        const battery = await navigator.getBattery();

        const updateBatteryState = () => {
          const isOnBattery = !battery.charging;
          const batteryLevel = battery.level;
          // Consider low power if on battery and below 30%
          const isLowPower = isOnBattery && batteryLevel < 0.3;

          setState(prev => ({
            ...prev,
            isOnBattery,
            batteryLevel,
            isLowPower,
          }));
        };

        updateBatteryState();

        battery.addEventListener('chargingchange', updateBatteryState);
        battery.addEventListener('levelchange', updateBatteryState);

        return () => {
          battery.removeEventListener('chargingchange', updateBatteryState);
          battery.removeEventListener('levelchange', updateBatteryState);
        };
      } catch {
        // Battery API not supported or failed
      }
    };

    checkBattery();
  }, []);

  // Determine if performance mode should be active
  const shouldOptimize = (): boolean => {
    switch (performanceMode) {
      case 'performance':
        // Always optimize
        return true;
      case 'quality':
        // Never optimize (unless system prefers reduced motion)
        return state.prefersReducedMotion;
      case 'auto':
      default:
        // Optimize if on battery, low power, or prefers reduced motion
        return state.isOnBattery || state.isLowPower || state.prefersReducedMotion;
    }
  };

  return {
    ...state,
    performanceMode,
    shouldOptimize: shouldOptimize(),
  };
};

/**
 * Lightweight hook that just returns whether to optimize
 * Use this in components that only need the boolean
 */
export const useShouldOptimize = () => {
  const { shouldOptimize } = usePerformanceMode();
  return shouldOptimize;
};
