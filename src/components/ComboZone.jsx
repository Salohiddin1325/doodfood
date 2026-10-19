import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { combosData } from '../data/combosData';
import { 
  Sparkles, 
  Flame, 
  Users, 
  PartyPopper, 
  Moon, 
  SlidersHorizontal, 
  Plus, 
  Check, 
  Star 
} from 'lucide-react';
import { handleImageError } from '../utils/imageFallback';

export const ComboZone = () => {
  const { lang, t, addToCart } = useApp();
  const [activeTier, setActiveTier] = useState('all');
  
  // Customizer Modal State
  const [selectedComboForCustom, setSelectedComboForCustom] = useState(null);
  const [selectedSlots, setSelectedSlots] = useState({
    main: null,
    side: null,
    drink: null
  });

  const tierFilters = [
    { id: 'all', label: t.combos.filterAll, icon: Sparkles },
    { id: 'solo', label: t.combos.filterSolo, icon: Flame },
    { id: 'duo', label: t.combos.filterDuo, icon: Users },
    { id: 'family', label: t.combos.filterFamily, icon: PartyPopper },
    { id: 'night', label: t.combos.filterNight, icon: Moon },
  ];

  const filteredCombos = combosData.filter(combo => {
    if (activeTier === 'all') return true;
    return combo.tier === activeTier;
  });

  const handleOpenCustomizer = (combo) => {
    setSelectedComboForCustom(combo);
    // Initialize with default slot options (first option in each slot)
    setSelectedSlots({
      main: combo.slots.main?.options[0] || null,
      side: combo.slots.side?.options[0] || null,
      drink: combo.slots.drink?.options[0] || null
    });
  };

  const calculateCustomTotal = () => {
    if (!selectedComboForCustom) return 0;
    const base = selectedComboForCustom.basePrice;
    const extraMain = selectedSlots.main?.extraPrice || 0;
    const extraSide = selectedSlots.side?.extraPrice || 0;
    const extraDrink = selectedSlots.drink?.extraPrice || 0;
    return base + extraMain + extraSide + extraDrink;
  };

  const handleConfirmCustomCombo = () => {
    if (!selectedComboForCustom) return;
    
    const finalPrice = calculateCustomTotal();
    const customDetails = [];
    if (selectedSlots.main) customDetails.push(selectedSlots.main.name[lang] || selectedSlots.main.name.uz);
    if (selectedSlots.side) customDetails.push(selectedSlots.side.name[lang] || selectedSlots.side.name.uz);
    if (selectedSlots.drink) customDetails.push(selectedSlots.drink.name[lang] || selectedSlots.drink.name.uz);

    const comboCartItem = {
      id: `${selectedComboForCustom.id}-custom-${Date.now()}`,
      name: selectedComboForCustom.name,
      price: finalPrice,
      image: selectedComboForCustom.image,
      isCombo: true,
      customNote: customDetails.join(' • '),
      selectedOptions: customDetails
    };

    addToCart(comboCartItem);
    setSelectedComboForCustom(null);
  };

  const handleQuickAdd = (combo) => {
    // Quick add standard bundle
    const standardCartItem = {
      id: `${combo.id}-std`,
      name: combo.name,
      price: combo.basePrice,
      image: combo.image,
      isCombo: true,
      customNote: (combo.itemsSummary[lang] || combo.itemsSummary.uz).join(', ')
    };
    addToCart(standardCartItem);
  };

  const getBadgeStyle = (badgeType) => {
    switch (badgeType) {
      case 'bestValue':
        return 'bg-gradient-to-r from-amber-500 to-yellow-400 text-slate-950 shadow-glow-amber';
      case 'popular':
        return 'bg-gradient-to-r from-red-600 to-amber-500 text-white shadow-glow-red';
      case 'nightDeal':
        return 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white';
      case 'hotDeal':
      default:
        return 'bg-gradient-to-r from-orange-500 to-red-500 text-white';
    }
  };

  return (
    <section id="combos" className="py-16 sm:py-24 bg-gradient-to-b from-slate-100/70 via-amber-500/5 to-slate-100/70 dark:from-slate-900/60 dark:via-amber-500/5 dark:to-slate-900/60 border-y border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-red-500/10 via-amber-500/10 to-red-500/10 border border-amber-500/30 text-amber-700 dark:text-amber-400 text-xs sm:text-sm font-black tracking-wider uppercase mb-3">
            <Flame className="w-4 h-4 text-amber-500 animate-pulse" />
            <span>{t.combos.badge}</span>
          </div>
          
          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight font-display">
            {t.combos.title}
          </h2>
          
          <p className="mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-300">
            {t.combos.subtitle}
          </p>

          {/* Tier Filters */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 pt-6 pb-2 px-2 max-w-4xl mx-auto">
            {tierFilters.map((tier) => {
              const Icon = tier.icon;
              const isActive = activeTier === tier.id;
              return (
                <button
                  key={tier.id}
                  onClick={() => setActiveTier(tier.id)}
                  className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-black transition-all shrink-0 whitespace-nowrap select-none ${
                    isActive
                      ? 'bg-gradient-to-r from-red-600 to-amber-500 text-white shadow-lg shadow-amber-500/25 scale-100 sm:scale-105'
                      : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-amber-400'
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{tier.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Combos Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredCombos.map((combo) => {
            const comboName = combo.name[lang] || combo.name.uz;
            const comboDesc = combo.description[lang] || combo.description.uz;
            const items = combo.itemsSummary[lang] || combo.itemsSummary.uz;
            const badgeLabel = combo.badgeText[lang] || combo.badgeText.uz;

            return (
              <div 
                key={combo.id}
                className="bg-white dark:bg-slate-800/95 rounded-3xl overflow-hidden shadow-soft-card border-2 border-slate-200/80 dark:border-slate-700/80 hover:border-amber-500 dark:hover:border-amber-500/80 transition-all duration-300 flex flex-col md:flex-row group"
              >
                {/* Visual Card Image Side */}
                <div className="md:w-5/12 relative aspect-[4/3] md:aspect-auto bg-slate-900 overflow-hidden">
                  <img 
                    src={combo.image} 
                    alt={comboName} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                    loading="lazy"
                    onError={(e) => handleImageError(e, 'combos')}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />
                  
                  {/* Badge */}
                  <div className="absolute top-3 left-3">
                    <span className={`px-3 py-1.5 rounded-xl text-xs font-black uppercase tracking-wider flex items-center gap-1.5 ${getBadgeStyle(combo.badge)}`}>
                      <span>{badgeLabel}</span>
                    </span>
                  </div>

                  {/* Rating & Stats */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs font-bold">
                    <span className="px-2.5 py-1 rounded-lg bg-black/60 backdrop-blur-md flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      <span>{combo.rating} ({combo.reviewsCount})</span>
                    </span>
                    <span className="px-2.5 py-1 rounded-lg bg-black/60 backdrop-blur-md text-amber-300">
                      {combo.calories}
                    </span>
                  </div>
                </div>

                {/* Card Details Side */}
                <div className="md:w-7/12 p-6 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="text-xl font-black text-slate-900 dark:text-white font-display leading-tight">
                        {comboName}
                      </h3>
                    </div>

                    <p className="mt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400 line-clamp-2">
                      {comboDesc}
                    </p>

                    {/* Included Items Checklist */}
                    <div className="mt-4 p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800">
                      <div className="text-[11px] font-black text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                        <Check className="w-3.5 h-3.5 text-emerald-500" />
                        <span>{t.combos.includedInBundle}</span>
                      </div>
                      <ul className="space-y-1.5">
                        {items.map((itemStr, idx) => (
                          <li key={idx} className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0" />
                            <span className="line-clamp-1">{itemStr}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Pricing & Interactive Action Buttons */}
                  <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800">
                    <div className="flex items-baseline justify-between mb-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-2xl font-black text-slate-900 dark:text-white font-display">
                            {combo.basePrice.toLocaleString()}{' '}
                            <span className="text-sm font-bold text-amber-500">{t.menu.currency}</span>
                          </span>
                          <span className="text-xs line-through text-slate-400">
                            {combo.originalPrice.toLocaleString()} {t.menu.currency}
                          </span>
                        </div>
                        <span className="text-[11px] font-black text-emerald-600 dark:text-emerald-400">
                          {t.combos.saveText} {combo.saving.toLocaleString()} {t.menu.currency}
                        </span>
                      </div>

                      <span className="text-[11px] font-bold text-slate-400">
                        {combo.weight}
                      </span>
                    </div>

                    {/* Action buttons: Customize Slot & Quick Add */}
                    <div className="grid grid-cols-2 gap-2.5">
                      <button
                        onClick={() => handleOpenCustomizer(combo)}
                        className="px-3 py-2.5 rounded-xl border-2 border-amber-500/80 bg-amber-500/10 hover:bg-amber-500/20 text-amber-700 dark:text-amber-400 text-xs font-black transition-all flex items-center justify-center gap-1.5"
                      >
                        <SlidersHorizontal className="w-3.5 h-3.5" />
                        <span>{t.combos.customizeBtn}</span>
                      </button>

                      <button
                        onClick={() => handleQuickAdd(combo)}
                        className="px-3 py-2.5 rounded-xl bg-gradient-to-r from-red-600 to-amber-500 hover:from-red-700 hover:to-amber-600 text-white text-xs font-black shadow-md transition-all active:scale-95 flex items-center justify-center gap-1.5"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>{t.combos.quickAddBtn}</span>
                      </button>
                    </div>
                  </div>

                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* CUSTOMIZABLE COMBO SLOT MODAL */}
      {selectedComboForCustom && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 dark:border-slate-800 max-h-[90vh] overflow-y-auto">
            
            {/* Modal Header */}
            <div className="flex items-start justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
              <div>
                <span className="text-[11px] uppercase font-black text-amber-500 tracking-wider">
                  {t.combos.modalTitle}
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white font-display">
                  {selectedComboForCustom.name[lang] || selectedComboForCustom.name.uz}
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  {t.combos.modalSubtitle}
                </p>
              </div>
              <button 
                onClick={() => setSelectedComboForCustom(null)}
                className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors"
              >
                ✕
              </button>
            </div>

            {/* Slots Customization Forms */}
            <div className="py-5 space-y-5">
              
              {/* Slot 1: Main Dish */}
              {selectedComboForCustom.slots.main && (
                <div className="bg-slate-50 dark:bg-slate-800/60 p-4 rounded-2xl border border-slate-100 dark:border-slate-700/60">
                  <div className="text-xs font-black text-slate-800 dark:text-slate-200 uppercase tracking-wider mb-2.5 flex items-center justify-between">
                    <span>{selectedComboForCustom.slots.main.label[lang] || selectedComboForCustom.slots.main.label.uz}</span>
                    <span className="text-[10px] text-amber-500 font-bold">1 ta tanlang</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {selectedComboForCustom.slots.main.options.map((opt) => {
                      const isSelected = selectedSlots.main?.id === opt.id;
                      return (
                        <button
                          key={opt.id}
                          onClick={() => setSelectedSlots({ ...selectedSlots, main: opt })}
                          className={`p-3 rounded-xl border text-xs font-bold text-left transition-all flex items-center justify-between ${
                            isSelected
                              ? 'border-amber-500 bg-amber-500/10 text-amber-900 dark:text-amber-300 font-black shadow-sm'
                              : 'border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-amber-400'
                          }`}
                        >
                          <span className="line-clamp-1">{opt.name[lang] || opt.name.uz}</span>
                          <span className="text-[10px] font-black text-amber-600 dark:text-amber-400 ml-2 shrink-0">
                            {opt.extraPrice === 0 ? t.combos.standardIncluded : `+${opt.extraPrice.toLocaleString()} ${t.menu.currency}`}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Slot 2: Sides / Fries */}
              {selectedComboForCustom.slots.side && (
                <div className="bg-slate-50 dark:bg-slate-800/60 p-4 rounded-2xl border border-slate-100 dark:border-slate-700/60">
                  <div className="text-xs font-black text-slate-800 dark:text-slate-200 uppercase tracking-wider mb-2.5 flex items-center justify-between">
                    <span>{selectedComboForCustom.slots.side.label[lang] || selectedComboForCustom.slots.side.label.uz}</span>
                    <span className="text-[10px] text-amber-500 font-bold">1 ta tanlang</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {selectedComboForCustom.slots.side.options.map((opt) => {
                      const isSelected = selectedSlots.side?.id === opt.id;
                      return (
                        <button
                          key={opt.id}
                          onClick={() => setSelectedSlots({ ...selectedSlots, side: opt })}
                          className={`p-3 rounded-xl border text-xs font-bold text-left transition-all flex items-center justify-between ${
                            isSelected
                              ? 'border-amber-500 bg-amber-500/10 text-amber-900 dark:text-amber-300 font-black shadow-sm'
                              : 'border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-amber-400'
                          }`}
                        >
                          <span className="line-clamp-1">{opt.name[lang] || opt.name.uz}</span>
                          <span className="text-[10px] font-black text-amber-600 dark:text-amber-400 ml-2 shrink-0">
                            {opt.extraPrice === 0 ? t.combos.standardIncluded : `+${opt.extraPrice.toLocaleString()} ${t.menu.currency}`}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Slot 3: Drink */}
              {selectedComboForCustom.slots.drink && (
                <div className="bg-slate-50 dark:bg-slate-800/60 p-4 rounded-2xl border border-slate-100 dark:border-slate-700/60">
                  <div className="text-xs font-black text-slate-800 dark:text-slate-200 uppercase tracking-wider mb-2.5 flex items-center justify-between">
                    <span>{selectedComboForCustom.slots.drink.label[lang] || selectedComboForCustom.slots.drink.label.uz}</span>
                    <span className="text-[10px] text-amber-500 font-bold">1 ta tanlang</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {selectedComboForCustom.slots.drink.options.map((opt) => {
                      const isSelected = selectedSlots.drink?.id === opt.id;
                      return (
                        <button
                          key={opt.id}
                          onClick={() => setSelectedSlots({ ...selectedSlots, drink: opt })}
                          className={`p-3 rounded-xl border text-xs font-bold text-left transition-all flex items-center justify-between ${
                            isSelected
                              ? 'border-amber-500 bg-amber-500/10 text-amber-900 dark:text-amber-300 font-black shadow-sm'
                              : 'border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-amber-400'
                          }`}
                        >
                          <span className="line-clamp-1">{opt.name[lang] || opt.name.uz}</span>
                          <span className="text-[10px] font-black text-amber-600 dark:text-amber-400 ml-2 shrink-0">
                            {opt.extraPrice === 0 ? t.combos.standardIncluded : `+${opt.extraPrice.toLocaleString()} ${t.menu.currency}`}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

            </div>

            {/* Modal Footer with Dynamic Price Recalculation */}
            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <span className="text-xs text-slate-400 block font-bold">{t.combos.currentPrice}</span>
                <span className="text-2xl font-black text-amber-500 font-display">
                  {calculateCustomTotal().toLocaleString()} {t.menu.currency}
                </span>
              </div>

              <div className="flex gap-2 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={() => setSelectedComboForCustom(null)}
                  className="px-4 py-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs font-bold hover:bg-slate-200 transition-colors"
                >
                  Bekor qilish
                </button>
                <button
                  type="button"
                  onClick={handleConfirmCustomCombo}
                  className="flex-1 sm:flex-initial px-6 py-3 rounded-xl bg-gradient-to-r from-red-600 to-amber-500 text-white text-xs font-black shadow-md hover:shadow-glow-red transition-all active:scale-95 flex items-center justify-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  <span>{t.combos.addCustomizedToCart}</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};
