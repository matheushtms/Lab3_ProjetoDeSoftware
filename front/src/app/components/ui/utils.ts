import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const FALLBACK_IMAGES = [
  'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?w=400', // Lápis/Materiais
  'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400', // Comida
  'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400', // Academia
  'https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?w=400', // Roupas/Uniforme
  'https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=400'  // Escritório/Tech
];

export function getFallbackImage(id: number | string) {
  const numId = typeof id === 'number' ? id : parseInt(String(id), 10) || 0;
  return FALLBACK_IMAGES[numId % FALLBACK_IMAGES.length];
}
