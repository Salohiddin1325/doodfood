// Fallback SVG data URI (Zero external network dependencies, guaranteed offline display)
export const FALLBACK_FOOD_SVG = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300' width='400' height='300'%3E%3Cdefs%3E%3ClinearGradient id='bgGrad' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' stop-color='%231e293b'/%3E%3Cstop offset='100%25' stop-color='%230f172a'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='100%25' height='100%25' fill='url(%23bgGrad)'/%3E%3Ccircle cx='200' cy='125' r='52' fill='%23f59e0b' opacity='0.12'/%3E%3Cpath d='M170 120c0-16.57 13.43-30 30-30s30 13.43 30 30v6h-60v-6zm-6 16h72a4 4 0 0 1 4 4v4a4 4 0 0 1-4 4h-72a4 4 0 0 1-4-4v-4a4 4 0 0 1 4-4zm6 24h60c0 16.57-13.43 30-30 30s-30-13.43-30-30z' fill='%23f59e0b'/%3E%3Ctext x='200' y='215' font-family='system-ui,-apple-system,sans-serif' font-size='14' font-weight='800' fill='%23cbd5e1' text-anchor='middle' letter-spacing='2'%3EDOOD FOOD%3C/text%3E%3Ctext x='200' y='235' font-family='system-ui,-apple-system,sans-serif' font-size='11' font-weight='600' fill='%23f59e0b' text-anchor='middle'%3EBektemir 24/7%3C/text%3E%3C/svg%3E";

export const CATEGORY_FALLBACKS = {
  burgers: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80",
  hamburgers: "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=800&q=80",
  lavash: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?auto=format&fit=crop&w=800&q=80",
  doners: "https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=800&q=80",
  clubSandwiches: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=800&q=80",
  combos: "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?auto=format&fit=crop&w=800&q=80",
  sodas: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=800&q=80",
  drinks: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=800&q=80",
  cold: "https://images.unsplash.com/photo-1551538827-9c037cb4f32a?auto=format&fit=crop&w=800&q=80",
  hot: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80",
  coffee: "https://images.unsplash.com/photo-1534778101976-62847782c213?auto=format&fit=crop&w=800&q=80",
  desserts: "https://images.unsplash.com/photo-1562376552-0d160a2f238d?auto=format&fit=crop&w=800&q=80",
  hero: "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=1200&q=85",
  avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80",
};

/**
 * Global image error event handler
 * Safely replaces broken/missing src with high-quality category fallback or SVG placeholder.
 */
export const handleImageError = (e, category = 'burgers') => {
  const target = e.currentTarget;
  const fallback = CATEGORY_FALLBACKS[category] || CATEGORY_FALLBACKS.burgers;

  // If already at fallback, switch to SVG data URI to prevent infinite loop
  if (target.src === fallback) {
    target.src = FALLBACK_FOOD_SVG;
    return;
  }

  // First fallback attempt
  target.onerror = () => {
    target.src = FALLBACK_FOOD_SVG;
    target.onerror = null;
  };
  target.src = fallback;
};
