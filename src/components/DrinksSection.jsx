import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { drinksData } from '../data/drinksData';
import { 
  Sparkles, 
  Droplets, 
  Coffee, 
  Plus, 
  Star, 
  SlidersHorizontal, 
  CupSoda 
} from 'lucide-react';
import { handleImageError } from '../utils/imageFallback';

export const DrinksSection = () => {
  const { lang, t, addToCart } = useApp();
  const [activeSubcategory, setActiveSubcategory] = useState('all');
  const [cardSizes, setCardSizes] = useState({}); // { [drinkId]: sizeId }

  // Customization Modal State for Drink
  const [selectedDrinkForConfig, setSelectedDrinkForConfig] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedIce, setSelectedIce] = useState('regular'); // 'none' | 'regular' | 'extra'
  const [selectedSugar, setSelectedSugar] = useState('regular'); // 'none' | 'half' | 'regular'

  const subCategories = [
    { id: 'all', label: t.drinks.filterAll, icon: Sparkles },
    { id: 'sodas', label: t.drinks.filterSodas, icon: CupSoda },
    { id: 'cold', label: t.drinks.filterCold, icon: Droplets },
    { id: 'hot', label: t.drinks.filterHot, icon: Coffee },
  ];

  const filteredDrinks = drinksData.filter(drink => {
    if (activeSubcategory === 'all') return true;
    return drink.subCategory === activeSubcategory;
  });

  const handleOpenConfig = (drink) => {
    const currentSizeId = cardSizes[drink.id] || (drink.sizes ? drink.sizes[0].id : null);
    const initialSize = drink.sizes ? (drink.sizes.find(s => s.id === currentSizeId) || drink.sizes[0]) : null;
    setSelectedDrinkForConfig(drink);
    setSelectedSize(initialSize);
    setSelectedIce('regular');
    setSelectedSugar('regular');
  };

  const getDrinkPrice = (drink, size) => {
    if (size) return size.price;
    return drink.basePrice || drink.price;
  };

  const handleAddConfiguredDrink = () => {
    if (!selectedDrinkForConfig) return;

    const currentPrice = getDrinkPrice(selectedDrinkForConfig, selectedSize);
    const tags = [];
    
    if (selectedSize) tags.push(selectedSize.label);
    if (selectedDrinkForConfig.supportsIce) {
      const iceLabels = {
        none: t.drinks.iceNone,
        regular: t.drinks.iceRegular,
        extra: t.drinks.iceExtra,
      };
      tags.push(iceLabels[selectedIce]);
    }
    if (selectedDrinkForConfig.supportsSugar) {
      const sugarLabels = {
        none: t.drinks.sugarNone,
        half: t.drinks.sugarHalf,
        regular: t.drinks.sugarRegular,
      };
      tags.push(sugarLabels[selectedSugar]);
    }

    const cartItem = {
      id: `${selectedDrinkForConfig.id}-${selectedSize?.id || 'std'}-${Date.now()}`,
      name: selectedDrinkForConfig.name,
      price: currentPrice,
      image: selectedDrinkForConfig.image,
      isDrink: true,
      customNote: tags.join(' • '),
      selectedOptions: tags
    };

    addToCart(cartItem);
    setSelectedDrinkForConfig(null);
  };

  const handleQuickAddDrink = (drink) => {
    const currentSizeId = cardSizes[drink.id] || (drink.sizes ? drink.sizes[0].id : null);
    const size = drink.sizes ? (drink.sizes.find(s => s.id === currentSizeId) || drink.sizes[0]) : null;
    const cartItem = {
      id: `${drink.id}-${size?.id || 'std'}-${Date.now()}`,
      name: drink.name,
      price: size ? size.price : (drink.basePrice || drink.price),
      image: drink.image,
      isDrink: true,
      customNote: size ? size.label : (drink.volume || "450 ml")
    };
    addToCart(cartItem);
  };

  const getBadgeStyle = (badge) => {
    switch (badge) {
      case 'popular':
        return 'bg-amber-500 text-slate-950';
      case 'bestValue':
        return 'bg-emerald-600 text-white';
      case 'hotDeal':
        return 'bg-red-600 text-white';
      case 'refreshing':
      default:
        return 'bg-sky-500 text-white';
    }
  };

  return (
    <section id="drinks" className="py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sky-100 dark:bg-sky-950/60 border border-sky-300 dark:border-sky-800 text-sky-800 dark:text-sky-300 text-xs sm:text-sm font-black tracking-wider uppercase mb-3">
            <Droplets className="w-4 h-4 text-sky-500 animate-bounce" />
            <span>{t.drinks.badge}</span>
          </div>
          
          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight font-display">
            {t.drinks.title}
          </h2>
          
          <p className="mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-300">
            {t.drinks.subtitle}
          </p>

          {/* Subcategory Filter Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 pt-6 pb-2 px-2 max-w-4xl mx-auto">
            {subCategories.map((cat) => {
              const Icon = cat.icon;
              const isActive = activeSubcategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveSubcategory(cat.id)}
                  className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-black transition-all shrink-0 whitespace-nowrap select-none ${
                    isActive
                      ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/25 scale-100 sm:scale-105'
                      : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-amber-400'
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Drinks Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredDrinks.map((drink) => {
            const drinkName = drink.name[lang] || drink.name.uz;
            const drinkDesc = drink.description[lang] || drink.description.uz;
            const currentActiveSize = drink.sizes 
              ? (drink.sizes.find(s => s.id === (cardSizes[drink.id] || drink.sizes[0].id)) || drink.sizes[0]) 
              : null;
            const displayPrice = currentActiveSize ? currentActiveSize.price : (drink.basePrice || drink.price);

            return (
              <div
                key={drink.id}
                className="bg-white dark:bg-slate-800/95 rounded-3xl overflow-hidden shadow-soft-card border border-slate-100 dark:border-slate-700/80 hover:border-amber-500 dark:hover:border-amber-500/80 transition-all duration-300 flex flex-col justify-between group food-card-hover"
              >
                {/* Visual Drink Image */}
                <div className="relative aspect-[4/3] bg-slate-900 overflow-hidden">
                  <img
                    src={drink.image}
                    alt={drinkName}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                    onError={(e) => handleImageError(e, drink.subCategory || 'drinks')}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                  {/* Badge */}
                  {drink.badge && (
                    <div className="absolute top-3 left-3">
                      <span className={`px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider ${getBadgeStyle(drink.badge)}`}>
                        {drink.badge === 'popular' ? t.combos.badgePopular : 
                         drink.badge === 'bestValue' ? t.combos.badgeBestValue : 
                         drink.badge === 'hotDeal' ? t.combos.badgeHotDeal : t.combos.badgeRefreshing}
                      </span>
                    </div>
                  )}

                  {/* Volume/Size Tag */}
                  <div className="absolute bottom-2 right-2 flex gap-1 text-[10px] font-bold text-white bg-black/60 px-2 py-0.5 rounded-lg backdrop-blur-sm">
                    {currentActiveSize ? (
                      <span>{currentActiveSize.label}</span>
                    ) : (
                      <span>{drink.volume || "450 ml"}</span>
                    )}
                  </div>
                </div>

                {/* Drink Details */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between text-xs text-amber-500 font-bold mb-1">
                      <div className="flex items-center gap-1">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        <span>{drink.rating} ({drink.reviewsCount})</span>
                      </div>
                      {drink.subCategory === 'sodas' && (
                        <span className="text-[10px] text-sky-500 dark:text-sky-400 font-bold">Gazlangan</span>
                      )}
                      {drink.subCategory === 'cold' && (
                        <span className="text-[10px] text-emerald-500 dark:text-emerald-400 font-bold">Muzdek Fresh</span>
                      )}
                      {drink.subCategory === 'hot' && (
                        <span className="text-[10px] text-amber-600 dark:text-amber-400 font-bold">Barista Qaynoq</span>
                      )}
                    </div>

                    <h3 className="text-base font-black text-slate-900 dark:text-white font-display line-clamp-1">
                      {drinkName}
                    </h3>

                    <p className="mt-1 text-xs text-slate-500 dark:text-slate-400 line-clamp-2">
                      {drinkDesc}
                    </p>

                    {/* Interactive Size Selector for Sodas (0.5L, 1.0L, 1.5L) */}
                    {drink.sizes && (
                      <div className="mt-3 pt-2.5 border-t border-slate-100 dark:border-slate-700/60">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1.5">
                          {t.drinks.selectSize}
                        </span>
                        <div className="grid grid-cols-3 gap-1">
                          {drink.sizes.map((sz) => {
                            const isSelected = (currentActiveSize?.id === sz.id);
                            return (
                              <button
                                key={sz.id}
                                type="button"
                                onClick={() => setCardSizes(prev => ({ ...prev, [drink.id]: sz.id }))}
                                className={`py-1 px-1.5 rounded-xl text-[11px] font-black transition-all ${
                                  isSelected
                                    ? 'bg-amber-500 text-slate-950 shadow-md font-black scale-102'
                                    : 'bg-slate-100 dark:bg-slate-700/70 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600'
                                }`}
                              >
                                {sz.id}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {/* Features indicator pills for single-size drinks */}
                    {!drink.sizes && (
                      <div className="flex flex-wrap gap-1 mt-3">
                        {drink.supportsIce && (
                          <span className="text-[10px] px-2 py-0.5 rounded-md bg-sky-50 dark:bg-sky-950/40 text-sky-600 dark:text-sky-300 font-bold">
                            🧊 Muz tanlovi
                          </span>
                        )}
                        {drink.supportsSugar && (
                          <span className="text-[10px] px-2 py-0.5 rounded-md bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-300 font-bold">
                            🍬 Shakar miqdori
                          </span>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Price & Action Buttons */}
                  <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-700 flex items-center justify-between gap-2">
                    <div>
                      <span className="text-base font-black text-slate-900 dark:text-white font-display">
                        {displayPrice.toLocaleString()}{' '}
                        <span className="text-xs font-semibold text-amber-500">{t.menu.currency}</span>
                      </span>
                      {currentActiveSize && (
                        <span className="text-[10px] text-slate-400 block -mt-0.5">{currentActiveSize.label}</span>
                      )}
                    </div>

                    <div className="flex gap-1.5">
                      {/* Configuration Modal button */}
                      {(drink.sizes || drink.supportsIce || drink.supportsSugar) ? (
                        <button
                          onClick={() => handleOpenConfig(drink)}
                          className="px-3 py-2 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-700 dark:text-amber-400 text-xs font-black transition-all flex items-center gap-1"
                          title="Sozlash"
                        >
                          <SlidersHorizontal className="w-3.5 h-3.5" />
                          <span className="hidden xs:inline">Tanlash</span>
                        </button>
                      ) : null}

                      {/* Quick Add */}
                      <button
                        onClick={() => handleQuickAddDrink(drink)}
                        className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-red-600 to-amber-500 hover:from-red-700 hover:to-amber-600 text-white text-xs font-black shadow-md transition-all active:scale-95 flex items-center gap-1"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>{t.menu.addToCart}</span>
                      </button>
                    </div>

                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>

      {/* DRINK CUSTOMIZATION & SIZE SELECTION MODAL */}
      {selectedDrinkForConfig && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 dark:border-slate-800">
            
            {/* Modal Header */}
            <div className="flex items-start justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
              <div>
                <span className="text-[11px] uppercase font-black text-sky-500 tracking-wider">
                  {t.drinks.customizeDrinkModal}
                </span>
                <h3 className="text-xl font-black text-slate-900 dark:text-white font-display">
                  {selectedDrinkForConfig.name[lang] || selectedDrinkForConfig.name.uz}
                </h3>
              </div>
              <button
                onClick={() => setSelectedDrinkForConfig(null)}
                className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors"
              >
                ✕
              </button>
            </div>

            {/* Customization Options */}
            <div className="py-4 space-y-4 text-xs">
              
              {/* 1. Size Selection (for Carbonated Sodas) */}
              {selectedDrinkForConfig.sizes && (
                <div>
                  <label className="font-black text-slate-700 dark:text-slate-300 block mb-2">
                    {t.drinks.selectSize}
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {selectedDrinkForConfig.sizes.map((sz) => {
                      const isSelected = selectedSize?.id === sz.id;
                      return (
                        <button
                          key={sz.id}
                          onClick={() => setSelectedSize(sz)}
                          className={`p-2.5 rounded-xl border text-center transition-all ${
                            isSelected
                              ? 'border-amber-500 bg-amber-500/10 text-amber-900 dark:text-amber-300 font-black shadow-sm'
                              : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'
                          }`}
                        >
                          <div className="font-black text-sm">{sz.id}</div>
                          <div className="text-[10px] text-amber-500 mt-0.5">{sz.price.toLocaleString()} {t.menu.currency}</div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* 2. Ice Level (if supported) */}
              {selectedDrinkForConfig.supportsIce && (
                <div>
                  <label className="font-black text-slate-700 dark:text-slate-300 block mb-2">
                    🧊 {t.drinks.iceLevelTitle}
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: 'none', label: t.drinks.iceNone },
                      { id: 'regular', label: t.drinks.iceRegular },
                      { id: 'extra', label: t.drinks.iceExtra }
                    ].map((iceOpt) => (
                      <button
                        key={iceOpt.id}
                        onClick={() => setSelectedIce(iceOpt.id)}
                        className={`p-2.5 rounded-xl border text-center transition-all ${
                          selectedIce === iceOpt.id
                            ? 'border-sky-500 bg-sky-500/10 text-sky-900 dark:text-sky-300 font-black'
                            : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'
                        }`}
                      >
                        {iceOpt.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* 3. Sugar Level (if supported) */}
              {selectedDrinkForConfig.supportsSugar && (
                <div>
                  <label className="font-black text-slate-700 dark:text-slate-300 block mb-2">
                    🍬 {t.drinks.sugarLevelTitle}
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: 'none', label: t.drinks.sugarNone },
                      { id: 'half', label: t.drinks.sugarHalf },
                      { id: 'regular', label: t.drinks.sugarRegular }
                    ].map((sugOpt) => (
                      <button
                        key={sugOpt.id}
                        onClick={() => setSelectedSugar(sugOpt.id)}
                        className={`p-2.5 rounded-xl border text-center transition-all ${
                          selectedSugar === sugOpt.id
                            ? 'border-amber-500 bg-amber-500/10 text-amber-900 dark:text-amber-300 font-black'
                            : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'
                        }`}
                      >
                        {sugOpt.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}

            </div>

            {/* Modal Footer with Calculated Total */}
            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-slate-400 uppercase font-bold block">Narxi:</span>
                <span className="text-xl font-black text-amber-500 font-display">
                  {getDrinkPrice(selectedDrinkForConfig, selectedSize).toLocaleString()} {t.menu.currency}
                </span>
              </div>

              <button
                onClick={handleAddConfiguredDrink}
                className="px-5 py-3 rounded-xl bg-gradient-to-r from-red-600 to-amber-500 text-white font-black text-xs shadow-md hover:shadow-glow-red transition-all active:scale-95 flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4" />
                <span>{t.drinks.addToCartWithConfig}</span>
              </button>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};
