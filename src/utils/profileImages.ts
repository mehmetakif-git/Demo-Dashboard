// Profile Pictures Utility
// Import all profile pictures and map them to person names

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
import pp11 from '@/assets/images/profiles/pp-11.webp';
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
import pp46 from '@/assets/images/profiles/pp-46.webp';
import pp47 from '@/assets/images/profiles/pp-47.webp';
import pp48 from '@/assets/images/profiles/pp-48.webp';

// Map person full names to their profile pictures
export const profileImages: Record<string, string> = {
  // HR / Communication (1-15)
  'John Anderson': pp1,
  'Emily Chen': pp2,
  'Michael Roberts': pp3,
  'Sarah Wilson': pp4,
  'David Kim': pp5,
  'Jessica Martinez': pp6,
  'Robert Taylor': pp7,
  'Amanda Lee': pp8,
  'Chris Johnson': pp9,
  'Lisa Park': pp10,
  'Alex Thompson': pp11,
  'Maria Garcia': pp12,
  'James Wilson': pp13,
  'Sophie Brown': pp14,
  'Daniel Lee': pp15,

  // Access Control (16-22)
  'Jessica Thompson': pp16,
  'David Chen': pp17,
  'Emma Williams': pp18,
  'James Anderson': pp19,
  'Sophia Garcia': pp20,
  'Oliver Martinez': pp21,
  'Michael Brown': pp22,

  // Gym Members (23-31)
  'Jessica Williams': pp23,
  'Marcus Chen': pp24,
  'Emma Rodriguez': pp25,
  'James Miller': pp26,
  'Sophia Lee': pp27,
  'Robert Brown': pp28,
  'Olivia Taylor': pp29,
  'Daniel Kim': pp30,
  'Amanda Garcia': pp31,

  // Gym Trainers (32-36)
  'Mike Johnson': pp32,
  'Sarah Davis': pp33,
  'David Park': pp34,
  'Emily Zhang': pp35,
  'Chris Martinez': pp36,

  // Events (37-41)
  'Jennifer Adams': pp37,
  'Lisa Rodriguez': pp38,
  'Rachel Green': pp39,
  'Thomas Wilson': pp40,
  'Michael Chen': pp41,

  // Staffing (42-45)
  'Robert Martinez': pp42,
  'Janet Adams': pp43,
  'Susan Lee': pp44,
  'Thomas Brown': pp45,

  // HR Additional (46-48)
  'Rachel Adams': pp46,
  'Kevin White': pp47,
  'Jennifer Taylor': pp48,
};

// Helper function to get profile image by name
export const getProfileImage = (name: string): string | undefined => {
  return profileImages[name];
};

// Helper function to get profile image by first and last name
export const getProfileImageByParts = (firstName: string, lastName: string): string | undefined => {
  return profileImages[`${firstName} ${lastName}`];
};
