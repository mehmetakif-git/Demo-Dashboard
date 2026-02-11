import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// EN translations
import enCommon from './locales/en/common.json';
import enAuth from './locales/en/auth.json';
import enSidebar from './locales/en/sidebar.json';
import enDashboard from './locales/en/dashboard.json';
import enBreadcrumb from './locales/en/breadcrumb.json';
import enErrors from './locales/en/errors.json';
import enSectors from './locales/en/sectors.json';
import enCommunication from './locales/en/communication.json';
import enHotel from './locales/en/hotel.json';
import enConstruction from './locales/en/construction.json';
import enLogistics from './locales/en/logistics.json';
import enManufacturing from './locales/en/manufacturing.json';
import enLaw from './locales/en/law.json';
import enEducation from './locales/en/education.json';
import enHr from './locales/en/hr.json';
import enAccounting from './locales/en/accounting.json';
import enCrm from './locales/en/crm.json';
import enTasks from './locales/en/tasks.json';
import enAccessControl from './locales/en/accessControl.json';
import enReports from './locales/en/reports.json';
import enMaintenance from './locales/en/maintenance.json';
import enSignage from './locales/en/signage.json';
import enFiles from './locales/en/files.json';

// TR translations
import trCommon from './locales/tr/common.json';
import trAuth from './locales/tr/auth.json';
import trSidebar from './locales/tr/sidebar.json';
import trDashboard from './locales/tr/dashboard.json';
import trBreadcrumb from './locales/tr/breadcrumb.json';
import trErrors from './locales/tr/errors.json';
import trSectors from './locales/tr/sectors.json';
import trCommunication from './locales/tr/communication.json';
import trHotel from './locales/tr/hotel.json';
import trConstruction from './locales/tr/construction.json';
import trLogistics from './locales/tr/logistics.json';
import trManufacturing from './locales/tr/manufacturing.json';
import trLaw from './locales/tr/law.json';
import trEducation from './locales/tr/education.json';
import trHr from './locales/tr/hr.json';
import trAccounting from './locales/tr/accounting.json';
import trCrm from './locales/tr/crm.json';
import trTasks from './locales/tr/tasks.json';
import trAccessControl from './locales/tr/accessControl.json';
import trReports from './locales/tr/reports.json';
import trMaintenance from './locales/tr/maintenance.json';
import trSignage from './locales/tr/signage.json';
import trFiles from './locales/tr/files.json';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        common: enCommon,
        auth: enAuth,
        sidebar: enSidebar,
        dashboard: enDashboard,
        breadcrumb: enBreadcrumb,
        errors: enErrors,
        sectors: enSectors,
        communication: enCommunication,
        hotel: enHotel,
        construction: enConstruction,
        logistics: enLogistics,
        manufacturing: enManufacturing,
        law: enLaw,
        education: enEducation,
        hr: enHr,
        accounting: enAccounting,
        crm: enCrm,
        tasks: enTasks,
        accessControl: enAccessControl,
        reports: enReports,
        maintenance: enMaintenance,
        signage: enSignage,
        files: enFiles,
      },
      tr: {
        common: trCommon,
        auth: trAuth,
        sidebar: trSidebar,
        dashboard: trDashboard,
        breadcrumb: trBreadcrumb,
        errors: trErrors,
        sectors: trSectors,
        communication: trCommunication,
        hotel: trHotel,
        construction: trConstruction,
        logistics: trLogistics,
        manufacturing: trManufacturing,
        law: trLaw,
        education: trEducation,
        hr: trHr,
        accounting: trAccounting,
        crm: trCrm,
        tasks: trTasks,
        accessControl: trAccessControl,
        reports: trReports,
        maintenance: trMaintenance,
        signage: trSignage,
        files: trFiles,
      },
    },
    fallbackLng: 'en',
    defaultNS: 'common',
    ns: ['common', 'auth', 'sidebar', 'dashboard', 'breadcrumb', 'errors', 'sectors', 'communication', 'hotel', 'construction', 'logistics', 'manufacturing', 'law', 'education', 'hr', 'accounting', 'crm', 'tasks', 'accessControl', 'reports', 'maintenance', 'signage', 'files'],
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
      lookupLocalStorage: 'i18nextLng',
    },
  });

export default i18n;
