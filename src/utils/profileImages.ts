// Profile Pictures Utility
// Import all profile pictures and map them to person names

// Profile for "You" user
import pp61 from '@/assets/images/profiles/pp-61.webp';

// Profile picture imports (pp-1 through pp-45)
import pp1 from '@/assets/images/profiles/pp-1.webp';
import pp2 from '@/assets/images/profiles/pp-2.webp';
import pp3 from '@/assets/images/profiles/pp-3.webp';
import pp4 from '@/assets/images/profiles/pp-4.webp';
import pp5 from '@/assets/images/profiles/pp-5.webp';
import pp6 from '@/assets/images/profiles/pp-6.webp';
import pp7 from '@/assets/images/profiles/pp-7.webp';
import pp8 from '@/assets/images/profiles/pp-8.webp';
import pp9 from '@/assets/images/profiles/pp-9.webp';
import pp10 from '@/assets/images/profiles/pp-10.webp';
import pp12 from '@/assets/images/profiles/pp-12.webp';
import pp13 from '@/assets/images/profiles/pp-13.webp';
import pp14 from '@/assets/images/profiles/pp-14.webp';
import pp15 from '@/assets/images/profiles/pp-15.webp';
import pp16 from '@/assets/images/profiles/pp-16.webp';
import pp17 from '@/assets/images/profiles/pp-17.webp';
import pp18 from '@/assets/images/profiles/pp-18.webp';
import pp19 from '@/assets/images/profiles/pp-19.webp';
import pp20 from '@/assets/images/profiles/pp-20.webp';
import pp21 from '@/assets/images/profiles/pp-21.webp';
import pp22 from '@/assets/images/profiles/pp-22.webp';
import pp23 from '@/assets/images/profiles/pp-23.webp';
import pp24 from '@/assets/images/profiles/pp-24.webp';
import pp25 from '@/assets/images/profiles/pp-25.webp';
import pp26 from '@/assets/images/profiles/pp-26.webp';
import pp27 from '@/assets/images/profiles/pp-27.webp';
import pp28 from '@/assets/images/profiles/pp-28.webp';
import pp29 from '@/assets/images/profiles/pp-29.webp';
import pp30 from '@/assets/images/profiles/pp-30.webp';
import pp31 from '@/assets/images/profiles/pp-31.webp';
import pp32 from '@/assets/images/profiles/pp-32.webp';
import pp33 from '@/assets/images/profiles/pp-33.webp';
import pp34 from '@/assets/images/profiles/pp-34.webp';
import pp35 from '@/assets/images/profiles/pp-35.webp';
import pp36 from '@/assets/images/profiles/pp-36.webp';
import pp37 from '@/assets/images/profiles/pp-37.webp';
import pp38 from '@/assets/images/profiles/pp-38.webp';
import pp39 from '@/assets/images/profiles/pp-39.webp';
import pp40 from '@/assets/images/profiles/pp-40.webp';
import pp41 from '@/assets/images/profiles/pp-41.webp';
import pp42 from '@/assets/images/profiles/pp-42.webp';
import pp43 from '@/assets/images/profiles/pp-43.webp';
import pp44 from '@/assets/images/profiles/pp-44.webp';
import pp45 from '@/assets/images/profiles/pp-45.webp';
import pp47 from '@/assets/images/profiles/pp-47.webp';
import pp48 from '@/assets/images/profiles/pp-48.webp';
import pp49 from '@/assets/images/profiles/pp-49.webp';
import pp50 from '@/assets/images/profiles/pp-50.webp';
import pp51 from '@/assets/images/profiles/pp-51.webp';
import pp52 from '@/assets/images/profiles/pp-52.webp';
import pp53 from '@/assets/images/profiles/pp-53.webp';
import pp54 from '@/assets/images/profiles/pp-54.webp';
import pp55 from '@/assets/images/profiles/pp-55.webp';
import pp56 from '@/assets/images/profiles/pp-56.webp';
import pp57 from '@/assets/images/profiles/pp-57.webp';
import pp58 from '@/assets/images/profiles/pp-58.webp';
import pp59 from '@/assets/images/profiles/pp-59.webp';
import pp60 from '@/assets/images/profiles/pp-60.webp';

// Company logo imports (comp1 through comp13)
import comp1 from '@/assets/images/profiles/comp1.webp';
import comp2 from '@/assets/images/profiles/comp2.webp';
import comp3 from '@/assets/images/profiles/comp3.webp';
import comp4 from '@/assets/images/profiles/comp4.webp';
import comp5 from '@/assets/images/profiles/comp5.webp';
import comp6 from '@/assets/images/profiles/comp6.webp';
import comp7 from '@/assets/images/profiles/comp7.webp';
import comp8 from '@/assets/images/profiles/comp8.webp';
import comp9 from '@/assets/images/profiles/comp9.webp';
import comp10 from '@/assets/images/profiles/comp10.webp';
import comp11 from '@/assets/images/profiles/comp11.webp';
import comp12 from '@/assets/images/profiles/comp12.webp';
import comp13 from '@/assets/images/profiles/comp13.webp';
import comp14 from '@/assets/images/profiles/comp14.webp';
import comp15 from '@/assets/images/profiles/comp15.webp';
import comp16 from '@/assets/images/profiles/comp16.webp';
import comp17 from '@/assets/images/profiles/comp17.webp';
import comp18 from '@/assets/images/profiles/comp18.webp';
import comp19 from '@/assets/images/profiles/comp19.webp';

// Map person full names to their profile pictures
export const profileImages: Record<string, string> = {
  // Main personas (User specified)
  'John Smith': pp9,
  'Emily Chen': pp6,
  'Michael Johnson': pp21,
  'Sarah Williams': pp8,
  'David Brown': pp15,
  'Jennifer Martinez': pp29,
  'Robert Taylor': pp30,
  'Amanda Garcia': pp43,

  // HR / Communication (1-15)
  'John Anderson': pp1,
  'Michael Roberts': pp3,
  'Sarah Wilson': pp4,
  'David Kim': pp5,
  'Jessica Martinez': pp7,
  'Amanda Lee': pp2,
  'Chris Johnson': pp10,
  'Lisa Park': pp55,
  'Alex Thompson': pp12,
  'Maria Garcia': pp13,
  'James Wilson': pp14,
  'Sophie Brown': pp16,
  'Daniel Lee': pp17,

  // Access Control (18-22)
  'Jessica Thompson': pp18,
  'David Chen': pp19,
  'Emma Williams': pp20,
  'James Anderson': pp22,
  'Sophia Garcia': pp23,
  'Oliver Martinez': pp24,
  'Michael Brown': pp53,

  // Gym Members (26-34)
  'Jessica Williams': pp26,
  'Marcus Chen': pp27,
  'Emma Rodriguez': pp28,
  'James Miller': pp31,
  'Sophia Lee': pp32,
  'Robert Brown': pp33,
  'Olivia Taylor': pp34,
  'Daniel Kim': pp35,

  // Gym Trainers (36-40)
  'Mike Johnson': pp36,
  'Sarah Davis': pp37,
  'David Park': pp38,
  'Emily Zhang': pp39,
  'Chris Martinez': pp40,

  // Events (41-45)
  'Jennifer Adams': pp41,
  'Lisa Rodriguez': pp42,
  'Rachel Green': pp44,
  'Thomas Wilson': pp45,
  'Michael Chen': pp1,

  // Staffing (47-48)
  'Robert Martinez': pp47,
  'Janet Adams': pp48,
  'Susan Lee': pp4,
  'Thomas Brown': pp5,
  'Lisa Anderson': pp35,
  'Kevin Thomas': pp40,
  'Peter Kim': pp47,

  // HR Additional
  'Rachel Adams': pp3,
  'Kevin White': pp1,
  'Jennifer Taylor': pp4,

  // Access Control
  'Emily Davis': pp8,
  'Thomas Lee': pp42,
  'Amanda White': pp44,
  'Christopher Garcia': pp48,

  // Additional mappings
  'John Mitchell': pp3,
  'Robert Williams': pp5,
  'Sarah Johnson': pp50,

  // Beauty / Spa (49-58)
  'Maryam Al-Thani': pp49,
  'Aisha Mahmoud': pp51,
  'Noura Hassan': pp52,
  'Maria Santos': pp54,
  'Fatima Al-Hassan': pp56,
  'Emma Wilson': pp57,
  'Sophie Chen': pp58,
  'Ahmed Khalil': pp7,
  'Jennifer Smith': pp60,

  // Real Estate Sector
  'Ali Hassan': pp19,
  'Sarah Al-Thani': pp10,
  'Mohammed Youssef': pp13,
  'Fatma Ibrahim': pp14,
  'Mehmet Demir': pp7,
  'Fatma Yilmaz': pp27,

  // Agency Sector - Talent
  'Emma Roberts': pp50,
  'Jason Lee': pp45,
  'Sophia Chen': pp48,
  'Marcus Thompson': pp47,

  // Agency Sector - Team
  'James Chen': pp42,
  'Amy Wilson': pp54,
  'Mark Johnson': pp45,
  'Tom Harris': pp40,
  'Nicole Wang': pp39,
  'Digital Team': comp19,

  // E-Commerce Reviews
  'Khalid Al-Mansouri': pp17,
  'Sarah Thompson': pp59,
  'Mohammed Hassan': pp22,
  'Fatima Al-Thani': pp55,

  // Restaurant Staff
  'Ahmed Al-Rashid': pp1,
  'Chef Mustafa': pp3,
  'Layla Hassan': pp25,
  'Mohammed Khalil': pp5,
  'Fatima Al-Sulaiti': pp6,
  'Sara Al-Mansour': pp8,
  'Omar Youssef': pp9,
  'Nadia Ahmed': pp12,
  'Rashid Al-Kuwari': pp15,

  // Restaurant Feedback
  'Ahmad Al-Farsi': pp32,
  'Sara Mohammed': pp37,
  'Youssef Al-Thani': pp40,
  'Nadia Hassan': pp48,

  // Current User (You)
  'You': pp61,
  'Demo User': pp61,
  'Guest User': pp61,
};

// Helper function to get profile image by name
export const getProfileImage = (name: string): string | undefined => {
  return profileImages[name];
};

// Helper function to get profile image by first and last name
export const getProfileImageByParts = (firstName: string, lastName: string): string | undefined => {
  return profileImages[`${firstName} ${lastName}`];
};

// Map company names to their logos
export const companyLogos: Record<string, string> = {
  'TechCorp Solutions': comp1,
  'DataFlow Inc.': comp2,
  'StartupXYZ': comp3,
  'CloudTech Systems': comp4,
  'AI Innovations': comp5,
  'MobileFirst Inc.': comp6,
  'LegacySoft Corp': comp7,
  // Real Estate Sector
  'Global Tech LLC': comp4,
  // Group Chats
  'Engineering Team': comp8,
  'Project Alpha': comp9,
  'All Hands': comp10,
  'IT Support': comp11,
  'HR Updates': comp12,
  'Marketing': comp13,
  // Agency Clients
  'TechGiant Inc': comp14,
  'Fashion Forward': comp15,
  'QuickShop': comp16,
  'BeautyGlow': comp17,
  'Legacy Financial': comp18,
  'Digital Team': comp19,
};

// Helper function to get company logo by name
export const getCompanyLogo = (companyName: string): string | undefined => {
  return companyLogos[companyName];
};
