/**
 * ╔═══════════════════════════════════════════════════════════════════════════╗
 * ║                              ALLYNC SECURITY                              ║
 * ║                     Client-Side Protection Layer                          ║
 * ╚═══════════════════════════════════════════════════════════════════════════╝
 *
 * WARNING: These are client-side deterrents, not foolproof protections.
 * Determined attackers can bypass these. Real security is server-side.
 */

// Security configuration
const SECURITY_CONFIG = {
  disableDevTools: true,
  disableRightClick: true,
  disableKeyboardShortcuts: true,
  enableDebuggerTrap: true,
  disableTextSelection: false, // Set to true if you want to disable text selection
  showConsoleWarnings: true,
};

/**
 * Detect if DevTools is open
 */
let devToolsOpen = false;

const detectDevTools = () => {
  const threshold = 160;
  const widthThreshold = window.outerWidth - window.innerWidth > threshold;
  const heightThreshold = window.outerHeight - window.innerHeight > threshold;

  if (widthThreshold || heightThreshold) {
    if (!devToolsOpen) {
      devToolsOpen = true;
      onDevToolsOpen();
    }
  } else {
    devToolsOpen = false;
  }
};

/**
 * Called when DevTools is detected
 */
const onDevToolsOpen = () => {
  if (SECURITY_CONFIG.showConsoleWarnings) {
    console.clear();
    console.log(
      '%c⛔ STOP!',
      'color: red; font-size: 60px; font-weight: bold; text-shadow: 2px 2px 0 black;'
    );
    console.log(
      '%cThis is a browser feature intended for developers.',
      'color: #f59e0b; font-size: 18px;'
    );
    console.log(
      '%cIf someone told you to copy-paste something here to enable a feature or "hack" something, it is a scam and will give them access to your account.',
      'color: #ef4444; font-size: 14px;'
    );
    console.log(
      '%cSee https://en.wikipedia.org/wiki/Self-XSS for more information.',
      'color: #64748b; font-size: 12px;'
    );
    console.log(
      '%c\n🔒 Allync Security Team\nhttps://allyncai.com',
      'color: #6366f1; font-size: 12px;'
    );
  }
};

/**
 * Disable right-click context menu
 */
const disableRightClick = () => {
  document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    return false;
  });
};

/**
 * Disable keyboard shortcuts for DevTools and view-source
 */
const disableKeyboardShortcuts = () => {
  document.addEventListener('keydown', (e) => {
    // F12 - DevTools
    if (e.key === 'F12') {
      e.preventDefault();
      return false;
    }

    // Ctrl+Shift+I - DevTools
    if (e.ctrlKey && e.shiftKey && e.key === 'I') {
      e.preventDefault();
      return false;
    }

    // Ctrl+Shift+J - Console
    if (e.ctrlKey && e.shiftKey && e.key === 'J') {
      e.preventDefault();
      return false;
    }

    // Ctrl+Shift+C - Element inspector
    if (e.ctrlKey && e.shiftKey && e.key === 'C') {
      e.preventDefault();
      return false;
    }

    // Ctrl+U - View source
    if (e.ctrlKey && e.key === 'u') {
      e.preventDefault();
      return false;
    }

    // Ctrl+S - Save page
    if (e.ctrlKey && e.key === 's') {
      e.preventDefault();
      return false;
    }

    // Ctrl+Shift+S - Save as
    if (e.ctrlKey && e.shiftKey && e.key === 'S') {
      e.preventDefault();
      return false;
    }

    // Ctrl+P - Print (can be used to save as PDF)
    if (e.ctrlKey && e.key === 'p') {
      e.preventDefault();
      return false;
    }
  });
};

/**
 * Debugger trap - triggers debugger when DevTools is open
 */
const enableDebuggerTrap = () => {
  // This will pause execution when DevTools is open
  const checkDebugger = () => {
    const start = performance.now();
    // eslint-disable-next-line no-debugger
    debugger;
    const end = performance.now();

    // If debugger took more than 100ms, DevTools is likely open
    if (end - start > 100) {
      onDevToolsOpen();
    }
  };

  // Run periodically but not too frequently to avoid performance issues
  // Disabled by default as it can be annoying during development
  if (import.meta.env.PROD && SECURITY_CONFIG.enableDebuggerTrap) {
    setInterval(checkDebugger, 1000);
  }
};

/**
 * Disable text selection (optional - can be annoying for users)
 */
const disableTextSelection = () => {
  document.addEventListener('selectstart', (e) => {
    // Allow selection in input fields
    const target = e.target as HTMLElement;
    if (
      target.tagName === 'INPUT' ||
      target.tagName === 'TEXTAREA' ||
      target.isContentEditable
    ) {
      return true;
    }
    e.preventDefault();
    return false;
  });

  // Add CSS to disable selection
  const style = document.createElement('style');
  style.textContent = `
    body {
      -webkit-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;
    }
    input, textarea, [contenteditable="true"] {
      -webkit-user-select: text;
      -moz-user-select: text;
      -ms-user-select: text;
      user-select: text;
    }
  `;
  document.head.appendChild(style);
};

/**
 * Disable drag and drop (prevents dragging images/content)
 */
const disableDragDrop = () => {
  document.addEventListener('dragstart', (e) => {
    e.preventDefault();
    return false;
  });

  document.addEventListener('drop', (e) => {
    e.preventDefault();
    return false;
  });
};

/**
 * Add invisible watermark to detect unauthorized copies
 */
const addWatermark = () => {
  const watermark = document.createElement('div');
  watermark.id = 'allync-watermark';
  watermark.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 99999;
    opacity: 0.003;
    background: repeating-linear-gradient(
      45deg,
      transparent,
      transparent 100px,
      rgba(99, 102, 241, 0.1) 100px,
      rgba(99, 102, 241, 0.1) 200px
    );
  `;
  watermark.setAttribute('data-allync', 'protected');
  document.body.appendChild(watermark);
};

/**
 * Console warnings for social engineering protection
 */
const showSecurityWarnings = () => {
  // Initial warning
  console.log(
    '%c⚠️ Security Notice',
    'color: #f59e0b; font-size: 14px; font-weight: bold;'
  );
  console.log(
    '%cThis browser console is intended for developers. Do not paste any code here that you do not understand.',
    'color: #94a3b8; font-size: 12px;'
  );

  // Override console methods to add prefix
  const originalLog = console.log;
  const originalWarn = console.warn;
  const originalError = console.error;

  // Don't override in development
  if (import.meta.env.PROD) {
    console.log = (...args) => {
      if (typeof args[0] === 'string' && !args[0].includes('[Allync]')) {
        originalLog('[Allync]', ...args);
      } else {
        originalLog(...args);
      }
    };

    console.warn = (...args) => {
      originalWarn('[Allync Security]', ...args);
    };

    console.error = (...args) => {
      originalError('[Allync Error]', ...args);
    };
  }
};

/**
 * Detect and block common scraping patterns
 */
const antiScraping = () => {
  // Detect headless browsers
  const isHeadless = () => {
    return (
      navigator.webdriver ||
      !navigator.languages ||
      navigator.languages.length === 0 ||
      /HeadlessChrome/.test(navigator.userAgent)
    );
  };

  if (isHeadless()) {
    console.warn('Automated browser detected');
    // You could redirect or show a captcha here
  }

  // Detect rapid requests (basic rate limiting hint)
  let requestCount = 0;
  const maxRequestsPerMinute = 100;

  setInterval(() => {
    requestCount = 0;
  }, 60000);

  // Intercept fetch to count requests
  const originalFetch = window.fetch;
  window.fetch = (...args) => {
    requestCount++;
    if (requestCount > maxRequestsPerMinute) {
      console.warn('Rate limit exceeded');
      // In production, you might want to block the request
    }
    return originalFetch(...args);
  };
};

/**
 * Initialize all security measures
 */
export const initSecurity = (): void => {
  // Only enable full security in production
  const isProduction = import.meta.env.PROD;

  if (SECURITY_CONFIG.disableRightClick && isProduction) {
    disableRightClick();
  }

  if (SECURITY_CONFIG.disableKeyboardShortcuts && isProduction) {
    disableKeyboardShortcuts();
  }

  if (SECURITY_CONFIG.enableDebuggerTrap && isProduction) {
    enableDebuggerTrap();
  }

  if (SECURITY_CONFIG.disableTextSelection && isProduction) {
    disableTextSelection();
  }

  if (SECURITY_CONFIG.showConsoleWarnings) {
    showSecurityWarnings();
  }

  // Always enable these
  disableDragDrop();
  addWatermark();
  antiScraping();

  // DevTools detection
  if (SECURITY_CONFIG.disableDevTools && isProduction) {
    setInterval(detectDevTools, 500);
    window.addEventListener('resize', detectDevTools);
  }

  // Block iframe embedding
  if (window.top !== window.self) {
    window.top!.location.href = window.self.location.href;
  }

  console.log(
    '%c🔒 Allync Security Initialized',
    'color: #10b981; font-size: 12px;'
  );
};

export default initSecurity;
