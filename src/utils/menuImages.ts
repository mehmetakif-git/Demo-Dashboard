// Restaurant Menu Images Utility
// Import all menu item images

import menu1 from '@/assets/images/restaurant/menu/menu-1.webp';
import menu2 from '@/assets/images/restaurant/menu/menu-2.webp';
import menu3 from '@/assets/images/restaurant/menu/menu-3.webp';
import menu4 from '@/assets/images/restaurant/menu/menu-4.webp';
import menu5 from '@/assets/images/restaurant/menu/menu-5.webp';
import menu6 from '@/assets/images/restaurant/menu/menu-6.webp';
import menu7 from '@/assets/images/restaurant/menu/menu-7.webp';
import menu8 from '@/assets/images/restaurant/menu/menu-8.webp';
import menu9 from '@/assets/images/restaurant/menu/menu-9.webp';
import menu10 from '@/assets/images/restaurant/menu/menu-10.webp';
import menu11 from '@/assets/images/restaurant/menu/menu-11.webp';
import menu12 from '@/assets/images/restaurant/menu/menu-12.webp';
import menu13 from '@/assets/images/restaurant/menu/menu-13.webp';

// Map menu item IDs to their images
export const menuImages: Record<string, string> = {
  'menu-1': menu1,   // Hummus with Pita
  'menu-2': menu2,   // Grilled Chicken Wings
  'menu-3': menu3,   // Lentil Soup
  'menu-4': menu4,   // Caesar Salad
  'menu-5': menu5,   // Grilled Lamb Chops
  'menu-6': menu6,   // Mixed Grill Platter
  'menu-7': menu7,   // Grilled Salmon
  'menu-8': menu8,   // Spaghetti Carbonara
  'menu-9': menu9,   // Margherita Pizza
  'menu-10': menu10, // Chocolate Lava Cake
  'menu-11': menu11, // Fresh Orange Juice
  'menu-12': menu12, // Arabic Coffee
  'menu-13': menu13, // Extra item
};

// Helper function to get menu image by item ID
export const getMenuImage = (menuId: string): string | undefined => {
  return menuImages[menuId];
};
