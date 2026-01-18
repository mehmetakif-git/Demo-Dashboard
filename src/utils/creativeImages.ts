// Creative Assets Utility
// Import all creative thumbnail images

import creative1 from '@/assets/images/agency/creatives/creative-1.webp';
import creative2 from '@/assets/images/agency/creatives/creative-2.webp';
import creative3 from '@/assets/images/agency/creatives/creative-3.webp';
import creative4 from '@/assets/images/agency/creatives/creative-4.webp';
import creative5 from '@/assets/images/agency/creatives/creative-5.webp';

// Map asset IDs to their thumbnails
export const creativeThumbnails: Record<string, string> = {
  'AST001': creative1, // TechGiant Pro Hero Video 60s
  'AST002': creative2, // TechGiant Pro Banner 300x250
  'AST003': creative3, // Fashion Forward Holiday TVC 60s
  'AST004': creative4, // BeautyGlow Instagram Post
  'AST005': creative5, // TechGiant Pro Times Square Spectacular
};

// Helper function to get creative thumbnail by asset ID
export const getCreativeThumbnail = (assetId: string): string | undefined => {
  return creativeThumbnails[assetId];
};
