import React, { useState } from 'react';
import { CATEGORY_FALLBACKS, FALLBACK_FOOD_SVG } from '../utils/imageFallback';

/**
 * SafeImage Component
 * - Guarantees uniform aspect ratio and object-cover fit
 * - Handles image loading states with subtle pulse skeleton
 * - Automatically falls back to high-res category CDN URL or offline SVG graphic on error
 */
export const SafeImage = ({
  src,
  alt = '',
  className = '',
  containerClassName = '',
  category = 'burgers',
  fallbackSrc,
  aspectRatio = 'aspect-[4/3]',
  loading = 'lazy',
  ...props
}) => {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const primaryFallback = fallbackSrc || CATEGORY_FALLBACKS[category] || CATEGORY_FALLBACKS.burgers;
  const currentSrc = hasError ? primaryFallback : (src || primaryFallback);

  const handleError = (e) => {
    if (!hasError) {
      setHasError(true);
    } else {
      // If primary fallback also fails, use offline SVG data URI
      e.currentTarget.src = FALLBACK_FOOD_SVG;
      e.currentTarget.onerror = null;
    }
  };

  return (
    <div className={`relative overflow-hidden bg-slate-900 ${aspectRatio} ${containerClassName}`}>
      {/* Loading Skeleton */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-slate-200 dark:bg-slate-800 animate-pulse flex items-center justify-center">
          <div className="w-8 h-8 rounded-full border-2 border-amber-500/30 border-t-amber-500 animate-spin" />
        </div>
      )}

      {/* Actual Image */}
      <img
        src={currentSrc}
        alt={alt}
        loading={loading}
        onLoad={() => setIsLoaded(true)}
        onError={handleError}
        className={`w-full h-full object-cover transition-all duration-500 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        } ${className}`}
        {...props}
      />
    </div>
  );
};
