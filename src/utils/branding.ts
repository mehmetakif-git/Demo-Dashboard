/**
 * ╔═══════════════════════════════════════════════════════════════════════════╗
 * ║                                                                           ║
 * ║                              ALLYNC                                       ║
 * ║                   Enterprise Management Platform                          ║
 * ║                                                                           ║
 * ║   Website: https://allyncai.com | https://allync.com.tr                   ║
 * ║   Copyright (c) 2024-2025 Allync. All rights reserved.                    ║
 * ║                                                                           ║
 * ╚═══════════════════════════════════════════════════════════════════════════╝
 */

// ASCII Art Logo
const ALLYNC_ASCII = `
    ___    __    __    __  ___   ______
   /   |  / /   / /   / / / / | / / ____/
  / /| | / /   / /   / /_/ /  |/ / /
 / ___ |/ /___/ /___/ __  / /|  / /___
/_/  |_/_____/_____/_/ /_/_/ |_/\\____/
`;

// Styled console signature
const styles = {
  logo: [
    'color: #6366f1',
    'font-size: 12px',
    'font-family: monospace',
    'font-weight: bold',
  ].join(';'),
  title: [
    'color: #ffffff',
    'font-size: 16px',
    'font-weight: bold',
    'text-shadow: 0 0 10px #6366f1',
  ].join(';'),
  subtitle: [
    'color: #94a3b8',
    'font-size: 12px',
  ].join(';'),
  link: [
    'color: #8b5cf6',
    'font-size: 11px',
    'text-decoration: underline',
  ].join(';'),
  warning: [
    'color: #f59e0b',
    'font-size: 12px',
    'font-weight: bold',
  ].join(';'),
  info: [
    'color: #64748b',
    'font-size: 10px',
  ].join(';'),
};

/**
 * Display Allync branding in the browser console
 */
export const displayConsoleBranding = (): void => {
  // Clear console in production for clean branding
  if (import.meta.env.PROD) {
    console.clear();
  }

  // ASCII Logo
  console.log('%c' + ALLYNC_ASCII, styles.logo);

  // Title
  console.log(
    '%c ALLYNC %c Enterprise Management Platform',
    'background: linear-gradient(90deg, #6366f1, #8b5cf6); color: white; padding: 5px 10px; border-radius: 4px 0 0 4px; font-weight: bold;',
    'background: #1e1e2e; color: #e2e8f0; padding: 5px 10px; border-radius: 0 4px 4px 0;'
  );

  // Websites
  console.log(
    '%c🌐 Website: %chttps://allyncai.com %c| %chttps://allync.com.tr',
    styles.subtitle,
    styles.link,
    styles.subtitle,
    styles.link
  );

  // Divider
  console.log('%c─────────────────────────────────────────────────', styles.info);

  // Dev mode indicator
  if (import.meta.env.DEV) {
    console.log(
      '%c⚡ Development Mode %c- Hot reload enabled',
      'background: #22c55e; color: white; padding: 2px 6px; border-radius: 3px; font-weight: bold;',
      'color: #94a3b8;'
    );
  } else {
    console.log(
      '%c🚀 Production Mode',
      'background: #6366f1; color: white; padding: 2px 6px; border-radius: 3px; font-weight: bold;'
    );
  }

  // Security warning
  console.log(
    '%c⚠️ Security Warning:',
    styles.warning
  );
  console.log(
    '%cThis is a browser feature intended for developers. If someone told you to copy-paste something here, it is likely a scam.',
    styles.info
  );

  // Copyright
  console.log('%c─────────────────────────────────────────────────', styles.info);
  console.log(
    '%c© 2024-2025 Allync. All rights reserved.',
    'color: #64748b; font-size: 10px;'
  );

  // Easter egg for curious developers
  console.log(
    '%c💼 Looking for a job? We are hiring! info@allyncai.com',
    'color: #10b981; font-size: 10px; font-style: italic;'
  );
};

/**
 * Display a simple signature (for repeated logs)
 */
export const logWithSignature = (message: string, ...args: unknown[]): void => {
  console.log(
    '%c[Allync]%c ' + message,
    'color: #6366f1; font-weight: bold;',
    'color: inherit;',
    ...args
  );
};

/**
 * Display version info
 */
export const displayVersionInfo = (): void => {
  const version = import.meta.env.VITE_APP_VERSION || '1.0.0';
  const buildDate = import.meta.env.VITE_BUILD_DATE || new Date().toISOString().split('T')[0];

  console.log(
    '%c📦 Version: %c' + version + ' %c| Built: %c' + buildDate,
    styles.subtitle,
    'color: #6366f1; font-weight: bold;',
    styles.subtitle,
    'color: #94a3b8;'
  );
};

/**
 * Initialize all branding
 */
export const initBranding = (): void => {
  displayConsoleBranding();
  displayVersionInfo();

  // Add branding to window object for easy access
  if (typeof window !== 'undefined') {
    (window as Window & { Allync?: object }).Allync = {
      version: import.meta.env.VITE_APP_VERSION || '1.0.0',
      website: 'https://allyncai.com',
      websiteTR: 'https://allync.com.tr',
      contact: 'info@allyncai.com',
    };
  }
};

export default initBranding;
