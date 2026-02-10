// Generate unique ID
export const generateId = (): string => {
  return Math.random().toString(36).substring(2, 9);
};

// Get current locale from i18n
const getLocale = (): string => {
  const lang = localStorage.getItem('i18nextLng')?.substring(0, 2);
  return lang === 'tr' ? 'tr-TR' : 'en-US';
};

// Format number with commas
export const formatNumber = (num: number): string => {
  return new Intl.NumberFormat(getLocale()).format(num);
};

// Format currency
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat(getLocale(), {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

// Format date with locale
export const formatDate = (date: Date, options?: Intl.DateTimeFormatOptions): string => {
  return date.toLocaleDateString(getLocale(), options);
};

// Format time with locale
export const formatTime = (date: Date, options?: Intl.DateTimeFormatOptions): string => {
  return date.toLocaleTimeString(getLocale(), options);
};

// Capitalize first letter
export const capitalize = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

// Truncate text
export const truncate = (str: string, length: number): string => {
  if (str.length <= length) return str;
  return `${str.slice(0, length)}...`;
};

// Delay function for async operations
export const delay = (ms: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

// Class name combiner utility
export const cn = (...classes: (string | boolean | undefined | null)[]): string => {
  return classes.filter(Boolean).join(' ');
};

// Validate email format
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Get initials from name
export const getInitials = (name: string): string => {
  return name
    .split(' ')
    .map((word) => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
};
