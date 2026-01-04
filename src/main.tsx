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

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@/styles/globals.css'
import App from './App'
import { initBranding } from '@/utils/branding'
import { initSecurity } from '@/utils/security'

// Initialize Allync branding (console signature)
initBranding()

// Initialize security measures (client-side protection)
initSecurity()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
