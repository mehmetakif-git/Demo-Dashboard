// Beauty Product Images Utility
// Import all product images and map them to product IDs

// Product image imports
import prd001 from '@/assets/images/products/prd-001.webp';
import prd002 from '@/assets/images/products/prd-002.webp';
import prd003 from '@/assets/images/products/prd-003.webp';
import prd004 from '@/assets/images/products/prd-004.webp';
import prd005 from '@/assets/images/products/prd-005.webp';
import prd006 from '@/assets/images/products/prd-006.webp';
import prd007 from '@/assets/images/products/prd-007.webp';
import prd008 from '@/assets/images/products/prd-008.webp';

// Map product IDs to their images
export const productImages: Record<string, string> = {
  'PRD001': prd001, // Professional Shampoo 500ml (Kerastase)
  'PRD002': prd002, // Deep Conditioning Mask (Olaplex)
  'PRD003': prd003, // Heat Protection Spray (GHD)
  'PRD004': prd004, // Gel Polish Set (OPI)
  'PRD005': prd005, // Cuticle Oil (CND)
  'PRD006': prd006, // Face Serum - Vitamin C (SkinCeuticals)
  'PRD007': prd007, // Moisturizer SPF 30 (La Roche-Posay)
  'PRD008': prd008, // Makeup Brush Set (MAC)
};

// Helper function to get product image by ID
export const getProductImage = (productId: string): string | undefined => {
  return productImages[productId];
};
