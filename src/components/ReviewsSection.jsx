import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { reviewsData } from '../data/reviewsData';
import { Star, ChevronLeft, ChevronRight, Quote, ShieldCheck, Heart } from 'lucide-react';
import { handleImageError } from '../utils/imageFallback';

export const ReviewsSection = () => {
  const { lang, t } = useApp();
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevReview = () => {
    setCurrentIndex((prev) => (prev === 0 ? reviewsData.length - 1 : prev - 1));
  };

  const nextReview = () => {
    setCurrentIndex((prev) => (prev === reviewsData.length - 1 ? 0 : prev + 1));
  };

  return (
    <section id="reviews" className="py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400 text-xs font-black tracking-wider uppercase mb-3">
            <Heart className="w-3.5 h-3.5 fill-current" />
            <span>{t.reviews.title}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight font-display">
            {t.reviews.title}
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-400">
            {t.reviews.subtitle}
          </p>
        </div>

        {/* Reviews Carousel Container */}
        <div className="relative max-w-4xl mx-auto">
          
          {/* Main Active Testimonial Card */}
          <div className="bg-white dark:bg-slate-800/90 rounded-3xl p-8 sm:p-12 shadow-soft-card border border-slate-100 dark:border-slate-700/60 relative overflow-hidden transition-all duration-500">
            
            {/* Big quote icon watermark */}
            <Quote className="absolute -top-4 -right-4 w-32 h-32 text-amber-500/10 dark:text-amber-400/5 rotate-12 pointer-events-none" />

            <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center gap-6 mb-6">
              <img
                src={reviewsData[currentIndex].avatar}
                alt={reviewsData[currentIndex].name}
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border-2 border-amber-500 shadow-md"
                loading="lazy"
                onError={(e) => handleImageError(e, 'avatar')}
              />

              <div className="flex-1">
                <div className="flex items-center gap-1 text-amber-400 mb-1">
                  {[...Array(reviewsData[currentIndex].rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>

                <h3 className="text-xl font-black text-slate-900 dark:text-white font-display">
                  {reviewsData[currentIndex].name}
                </h3>

                <div className="flex flex-wrap items-center gap-2 mt-0.5 text-xs text-slate-500 dark:text-slate-400">
                  <span>📍 {reviewsData[currentIndex].location}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-bold">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    {t.reviews.verified}
                  </span>
                </div>
              </div>

              {/* Order tag badge */}
              <div className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-semibold">
                🛒 {reviewsData[currentIndex].order}
              </div>
            </div>

            {/* Comment Body */}
            <p className="text-base sm:text-lg text-slate-700 dark:text-slate-200 leading-relaxed italic relative z-10">
              "{reviewsData[currentIndex].comment[lang] || reviewsData[currentIndex].comment.uz}"
            </p>

          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between mt-8">
            {/* Dots */}
            <div className="flex items-center gap-2">
              {reviewsData.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-2.5 rounded-full transition-all ${
                    idx === currentIndex
                      ? 'w-8 bg-amber-500'
                      : 'w-2.5 bg-slate-300 dark:bg-slate-700'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            {/* Prev / Next Buttons */}
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={prevReview}
                className="p-3 rounded-2xl bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-amber-500 hover:text-slate-950 border border-slate-200 dark:border-slate-700 shadow-sm transition-all active:scale-95"
                aria-label="Previous Review"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={nextReview}
                className="p-3 rounded-2xl bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-amber-500 hover:text-slate-950 border border-slate-200 dark:border-slate-700 shadow-sm transition-all active:scale-95"
                aria-label="Next Review"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
