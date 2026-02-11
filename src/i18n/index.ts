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
      },
    },
    fallbackLng: 'en',
    defaultNS: 'common',
    ns: ['common', 'auth', 'sidebar', 'dashboard', 'breadcrumb', 'errors', 'sectors', 'communication', 'hotel', 'construction', 'logistics', 'manufacturing', 'law', 'education', 'hr'],
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
