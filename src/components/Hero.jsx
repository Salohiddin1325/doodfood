import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  Zap, 
  Flame, 
  ShieldCheck, 
  Star, 
  ArrowRight, 
  ChefHat, 
  CheckCircle2 
} from 'lucide-react';
import { handleImageError } from '../utils/imageFallback';

export const Hero = () => {
  const { t } = useApp();

  return (
    <section className="relative overflow-hidden pt-8 pb-16 md:pt-14 md:pb-24">
      {/* Background radial gradient glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-amber-500/15 to-red-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: High-converting Copy & CTA */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Quick District Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-700/50 shadow-sm">
              <span className="flex h-2 w-2 rounded-full bg-amber-500 animate-ping"></span>
              <span className="text-xs sm:text-sm font-bold text-amber-800 dark:text-amber-300">
                {t.hero.badge}
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl xl:text-6xl font-black text-slate-900 dark:text-white tracking-tight leading-[1.1] font-display">
              {t.hero.titleStart}{' '}
              <span className="bg-gradient-to-r from-amber-500 via-red-500 to-amber-500 bg-clip-text text-transparent underline decoration-amber-400/40 decoration-wavy decoration-2">
                {t.hero.titleHighlight}
              </span>{' '}
              {t.hero.titleEnd}
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
              {t.hero.subtitle}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-4 pt-2">
              <a
                href="#menu"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl bg-gradient-to-r from-red-600 via-amber-500 to-amber-600 hover:from-red-700 hover:to-amber-700 text-white font-black text-base shadow-lg hover:shadow-glow-red transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <span>{t.hero.ctaOrder}</span>
                <ArrowRight className="w-5 h-5" />
              </a>

              <a
                href="#combos"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-2xl bg-gradient-to-r from-amber-500/15 to-red-500/15 hover:bg-amber-500/25 text-amber-800 dark:text-amber-300 font-black text-base border-2 border-amber-500/50 transition-all duration-300 transform hover:-translate-y-0.5"
              >
                <Flame className="w-5 h-5 text-amber-500 animate-pulse" />
                <span>{t.hero.ctaCombos}</span>
              </a>

              <a
                href="#builder"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-2xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700/80 text-slate-900 dark:text-white font-bold text-base border border-slate-200 dark:border-slate-700 transition-all duration-300 transform hover:-translate-y-0.5"
              >
                <ChefHat className="w-5 h-5 text-amber-500" />
                <span>{t.hero.ctaBuilder}</span>
              </a>
            </div>

            {/* Trust Badges / Stats Strip */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-slate-200/80 dark:border-slate-800">
              <div className="flex flex-col items-center lg:items-start">
                <div className="flex items-center gap-1.5 text-amber-500 font-black text-lg sm:text-2xl">
                  <Zap className="w-5 h-5 fill-amber-500 text-amber-500" />
                  <span>{t.hero.statDelivery}</span>
                </div>
                <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                  {t.hero.statDeliveryLabel}
                </span>
              </div>

              <div className="flex flex-col items-center lg:items-start">
                <div className="flex items-center gap-1.5 text-emerald-500 font-black text-lg sm:text-2xl">
                  <ShieldCheck className="w-5 h-5 text-emerald-500" />
                  <span>{t.hero.statHalal}</span>
                </div>
                <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                  {t.hero.statHalalLabel}
                </span>
              </div>

              <div className="flex flex-col items-center lg:items-start">
                <div className="flex items-center gap-1.5 text-amber-500 font-black text-lg sm:text-2xl">
                  <Star className="w-5 h-5 fill-amber-500 text-amber-500" />
                  <span>{t.hero.statRating}</span>
                </div>
                <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                  {t.hero.statRatingLabel}
                </span>
              </div>
            </div>

          </div>

          {/* Right Column: Hero Visual with Real Food Photography & Floating Badges */}
          <div className="lg:col-span-5 relative flex justify-center">
            
            {/* Visual Container */}
            <div className="relative w-full max-w-lg lg:max-w-none group">
              
              {/* Outer Glow Halo */}
              <div className="absolute -inset-2 bg-gradient-to-r from-amber-500 to-red-600 rounded-3xl opacity-30 blur-2xl group-hover:opacity-50 transition duration-500"></div>

              {/* Main Food Photo */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-2 border-white/20 dark:border-slate-700/60 bg-slate-900 aspect-[4/3] sm:aspect-[16/11]">
                <img
                  src="/images/hero.jpg"
                  alt="Dood Food Bektemir - Gourmet Burgers and Grilled Lavash"
                  className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-700 ease-out"
                  loading="eager"
                  onError={(e) => handleImageError(e, 'hero')}
                />

                {/* Subtle gradient vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />

                {/* Overlay Badge */}
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white text-xs font-semibold">
                  <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-black/60 backdrop-blur-md border border-white/10">
                    <Flame className="w-4 h-4 text-amber-400 animate-pulse" />
                    <span>Bektemir No.1 Fast Food</span>
                  </span>
                  <span className="px-3 py-1.5 rounded-xl bg-red-600 font-bold shadow-md">
                    {t.hero.saveBadge}
                  </span>
                </div>
              </div>

              {/* Floating Live Order Notification Card */}
              <div className="absolute -top-5 -left-4 sm:-left-6 max-w-[240px] sm:max-w-[270px] bg-white/95 dark:bg-slate-900/95 backdrop-blur-md p-3 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-800 animate-float-slow">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-[11px] font-bold text-slate-900 dark:text-white">
                        {t.hero.floatingOrderTitle}
                      </span>
                      <span className="text-[9px] text-emerald-500 font-extrabold uppercase">
                        {t.hero.timeAgo}
                      </span>
                    </div>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400 line-clamp-1">
                      {t.hero.floatingOrderDesc}
                    </p>
                  </div>
                </div>
              </div>

              {/* Floating Rating Pill */}
              <div className="absolute -bottom-5 -right-3 sm:-right-5 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md py-2.5 px-4 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-800 flex items-center gap-2.5">
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <div className="text-left">
                  <div className="text-xs font-black text-slate-900 dark:text-white">4.9 / 5.0</div>
                  <div className="text-[10px] text-slate-400">Bektemir Foodies</div>
                </div>
              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
