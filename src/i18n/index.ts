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
import enQrCodes from './locales/en/qrCodes.json';
import enGym from './locales/en/gym.json';
import enStaffing from './locales/en/staffing.json';
import enRealestate from './locales/en/realestate.json';
import enAgency from './locales/en/agency.json';
import enBeauty from './locales/en/beauty.json';
import enLaundry from './locales/en/laundry.json';
import enEcommerce from './locales/en/ecommerce.json';
import enHealthcare from './locales/en/healthcare.json';
import enHardware from './locales/en/hardware.json';
import enRestaurant from './locales/en/restaurant.json';
import enEvents from './locales/en/events.json';

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
import trQrCodes from './locales/tr/qrCodes.json';
import trGym from './locales/tr/gym.json';
import trStaffing from './locales/tr/staffing.json';
import trRealestate from './locales/tr/realestate.json';
import trAgency from './locales/tr/agency.json';
import trBeauty from './locales/tr/beauty.json';
import trLaundry from './locales/tr/laundry.json';
import trEcommerce from './locales/tr/ecommerce.json';
import trHealthcare from './locales/tr/healthcare.json';
import trHardware from './locales/tr/hardware.json';
import trRestaurant from './locales/tr/restaurant.json';
import trEvents from './locales/tr/events.json';

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
        qrCodes: enQrCodes,
        gym: enGym,
        staffing: enStaffing,
        realestate: enRealestate,
        agency: enAgency,
        beauty: enBeauty,
        laundry: enLaundry,
        ecommerce: enEcommerce,
        healthcare: enHealthcare,
        hardware: enHardware,
        restaurant: enRestaurant,
        events: enEvents,
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
        qrCodes: trQrCodes,
        gym: trGym,
        staffing: trStaffing,
        realestate: trRealestate,
        agency: trAgency,
        beauty: trBeauty,
        laundry: trLaundry,
        ecommerce: trEcommerce,
        healthcare: trHealthcare,
        hardware: trHardware,
        restaurant: trRestaurant,
        events: trEvents,
      },
    },
    fallbackLng: 'en',
    defaultNS: 'common',
    ns: ['common', 'auth', 'sidebar', 'dashboard', 'breadcrumb', 'errors', 'sectors', 'communication', 'hotel', 'construction', 'logistics', 'manufacturing', 'law', 'education', 'hr', 'accounting', 'crm', 'tasks', 'accessControl', 'reports', 'maintenance', 'signage', 'files', 'qrCodes', 'gym', 'staffing', 'realestate', 'agency', 'beauty', 'laundry', 'ecommerce', 'healthcare', 'hardware', 'restaurant', 'events'],
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
