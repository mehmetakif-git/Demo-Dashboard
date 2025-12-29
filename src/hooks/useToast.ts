import { create } from 'zustand';
import type { Toast, ToastType } from '@/types';
import { generateId } from '@/utils/helpers';
import { TOAST_DURATION } from '@/utils/constants';

interface ToastState {
  toasts: Toast[];
  addToast: (type: ToastType, message: string, duration?: number) => void;
  removeToast: (id: string) => void;
  clearToasts: () => void;
}

export const useToastStore = create<ToastState>((set) => ({
  toasts: [],

  addToast: (type: ToastType, message: string, duration = TOAST_DURATION) => {
    const id = generateId();
    const toast: Toast = { id, type, message, duration };

    set((state) => ({
      toasts: [...state.toasts, toast],
    }));

    // Auto remove after duration
    if (duration > 0) {
      setTimeout(() => {
        set((state) => ({
          toasts: state.toasts.filter((t) => t.id !== id),
        }));
      }, duration);
    }
  },

  removeToast: (id: string) => {
    set((state) => ({
      toasts: state.toasts.filter((t) => t.id !== id),
    }));
  },

  clearToasts: () => {
    set({ toasts: [] });
  },
}));

// Hook for easy toast usage
export const useToast = () => {
  const { addToast, removeToast, clearToasts, toasts } = useToastStore();

  return {
    toasts,
    toast: {
      success: (message: string, duration?: number) =>
        addToast('success', message, duration),
      error: (message: string, duration?: number) =>
        addToast('error', message, duration),
      warning: (message: string, duration?: number) =>
        addToast('warning', message, duration),
      info: (message: string, duration?: number) =>
        addToast('info', message, duration),
    },
    removeToast,
    clearToasts,
  };
};
