import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { menuItems } from '../data/menuData';
import { 
  Search, 
  Flame, 
  Star, 
  Plus, 
  Check, 
  SlidersHorizontal, 
  UtensilsCrossed, 
  Layers, 
  Sparkles, 
  ShieldCheck, 
  Sandwich,
  X 
} from 'lucide-react';
import { handleImageError } from '../utils/imageFallback';

export const MenuSection = () => {
  const { lang, t, addToCart } = useApp();

  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterSpicyOnly, setFilterSpicyOnly] = useState(false);
  const [filterPopularOnly, setFilterPopularOnly] = useState(false);

  // Customization modal state
  const [selectedProductForCustomization, setSelectedProductForCustomization] = useState(null);
  const [customAddons, setCustomAddons] = useState([]);

  const categories = [
    { id: 'all', label: t.menu.all, icon: UtensilsCrossed },
    { id: 'burgers', label: t.menu.burgers, icon: Layers },
    { id: 'hamburgers', label: t.menu.hamburgers, icon: Layers },
    { id: 'lavash', label: t.menu.lavash, icon: Flame },
    { id: 'doners', label: t.menu.doners, icon: Flame },
    { id: 'clubSandwiches', label: t.menu.clubSandwiches, icon: Sandwich },
    { id: 'desserts', label: t.menu.desserts, icon: Star },
    { id: 'combos', label: t.menu.combos, icon: Sparkles },
  ];

  const availableOptions = [
    { id: 'extra-cheese', name: t.menu.extraCheese, price: 7000 },
    { id: 'jalapeno', name: t.menu.jalapeno, price: 4000 },
    { id: 'double-meat', name: t.menu.doubleMeat, price: 24000 },
    { id: 'garlic-sauce', name: t.menu.garlicSauce, price: 4000 },
  ];

  const filteredItems = useMemo(() => {
    return menuItems.filter((item) => {
      // Category match
      const matchCat = activeCategory === 'all' || item.category === activeCategory;

      // Search match
      const itemName = item.name[lang] || item.name.uz;
      const itemDesc = item.description[lang] || item.description.uz;
      const query = searchQuery.toLowerCase().trim();
      const matchSearch = !query || 
        itemName.toLowerCase().includes(query) || 
        itemDesc.toLowerCase().includes(query);

      // Filter toggles
      const matchSpicy = !filterSpicyOnly || item.isSpicy;
      const matchPopular = !filterPopularOnly || item.isPopular;

      return matchCat && matchSearch && matchSpicy && matchPopular;
    });
  }, [activeCategory, searchQuery, filterSpicyOnly, filterPopularOnly, lang]);

  const toggleAddon = (option) => {
    if (customAddons.some(a => a.id === option.id)) {
      setCustomAddons(customAddons.filter(a => a.id !== option.id));
    } else {
      setCustomAddons([...customAddons, option]);
    }
  };

  const handleOpenCustomizer = (product) => {
    setSelectedProductForCustomization(product);
    setCustomAddons([]);
  };

  const handleConfirmCustomAdd = () => {
    if (selectedProductForCustomization) {
      addToCart(selectedProductForCustomization, customAddons);
      setSelectedProductForCustomization(null);
      setCustomAddons([]);
    }
  };

  return (
    <section id="menu" className="py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400 text-xs font-black tracking-wider uppercase mb-3">
            <Flame className="w-3.5 h-3.5" />
            <span>{t.menu.title}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight font-display">
            {t.menu.title}
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-400">
            {t.menu.subtitle}
          </p>
        </div>

        {/* Search & Quick Filters Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
          
          {/* Search Input */}
          <div className="relative w-full md:w-96">
            <Search className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t.menu.searchPlaceholder}
              className="w-full pl-11 pr-4 py-3 rounded-2xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm shadow-sm transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Quick Dietary Filters */}
          <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto no-scrollbar pb-1 md:pb-0">
            <button
              onClick={() => setFilterPopularOnly(!filterPopularOnly)}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all shrink-0 whitespace-nowrap ${
                filterPopularOnly
                  ? 'bg-amber-500 text-slate-900 shadow-glow-amber'
                  : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
              }`}
            >
              <Star className="w-3.5 h-3.5 shrink-0" />
              <span>{t.menu.popular}</span>
            </button>

            <button
              onClick={() => setFilterSpicyOnly(!filterSpicyOnly)}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all shrink-0 whitespace-nowrap ${
                filterSpicyOnly
                  ? 'bg-red-500 text-white shadow-glow-red'
                  : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
              }`}
            >
              <Flame className="w-3.5 h-3.5 shrink-0" />
              <span>{t.menu.spicy}</span>
            </button>

            <div className="flex items-center gap-1 px-3 py-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 text-emerald-700 dark:text-emerald-400 text-xs font-bold shrink-0 whitespace-nowrap">
              <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
              <span>100% {t.menu.halal}</span>
            </div>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-3 mb-10 border-b border-slate-200/80 dark:border-slate-800 px-1">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isActive = activeCategory === cat.id;

            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center gap-2 px-5 py-3 rounded-2xl text-sm font-bold transition-all duration-200 whitespace-nowrap shrink-0 select-none ${
                  isActive
                    ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-md scale-100 sm:scale-105'
                    : 'bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-amber-400 dark:text-amber-500' : 'text-slate-400'}`} />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Product Cards Grid */}
        {filteredItems.length === 0 ? (
          <div className="text-center py-16 bg-white dark:bg-slate-800/50 rounded-3xl border border-dashed border-slate-200 dark:border-slate-700">
            <UtensilsCrossed className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-3" />
            <p className="text-base font-semibold text-slate-600 dark:text-slate-300">
              {t.menu.noResults}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="bg-white dark:bg-slate-800/90 rounded-3xl overflow-hidden shadow-soft-card border border-slate-100 dark:border-slate-700/60 flex flex-col justify-between group food-card-hover"
              >
                {/* Image Container with Badges */}
                <div className="relative aspect-[4/3] bg-slate-900 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name[lang] || item.name.uz}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                    onError={(e) => handleImageError(e, item.category)}
                  />

                  {/* Gradient bottom overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent pointer-events-none" />

                  {/* Top Badges */}
                  <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                    {item.isPopular && (
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-black bg-amber-500 text-slate-900 shadow-md">
                        ★ {t.menu.popular}
                      </span>
                    )}
                    {item.isSpicy && (
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-black bg-red-600 text-white shadow-md flex items-center gap-1">
                        <Flame className="w-3 h-3" />
                        {t.menu.spicy}
                      </span>
                    )}
                  </div>

                  {/* Calorie & Weight Badges */}
                  <div className="absolute bottom-3 right-3 flex items-center gap-1 text-[11px] font-bold text-white/90">
                    <span className="px-2 py-0.5 rounded-lg bg-black/60 backdrop-blur-md">
                      {item.weight}
                    </span>
                    <span className="px-2 py-0.5 rounded-lg bg-black/60 backdrop-blur-md text-amber-300">
                      {item.calories}
                    </span>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Rating & Reviews */}
                    <div className="flex items-center gap-1.5 text-xs text-amber-500 font-bold mb-1.5">
                      <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                      <span>{item.rating}</span>
                      <span className="text-slate-400 font-normal">({item.reviewsCount})</span>
                    </div>

                    {/* Name */}
                    <h3 className="text-lg font-black text-slate-900 dark:text-white group-hover:text-amber-500 transition-colors font-display line-clamp-1">
                      {item.name[lang] || item.name.uz}
                    </h3>

                    {/* Description */}
                    <p className="mt-1 text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                      {item.description[lang] || item.description.uz}
                    </p>
                  </div>

                  {/* Price & Action Button */}
                  <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-between gap-2">
                    <div className="flex flex-col">
                      <span className="text-xs text-slate-400 font-medium">Narxi</span>
                      <span className="text-lg font-black text-slate-900 dark:text-white font-display">
                        {item.price.toLocaleString()} <span className="text-xs font-semibold text-amber-500">{t.menu.currency}</span>
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      {/* Customize Options Button */}
                      {['burgers', 'hamburgers', 'lavash', 'doners', 'clubSandwiches'].includes(item.category) && (
                        <button
                          type="button"
                          onClick={() => handleOpenCustomizer(item)}
                          className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-700/80 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
                          title="Qo'shimchalar tanlash"
                        >
                          <SlidersHorizontal className="w-4 h-4 text-amber-500" />
                        </button>
                      )}

                      {/* Add to Cart Button */}
                      <button
                        type="button"
                        onClick={() => addToCart(item)}
                        className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-gradient-to-r from-red-600 to-amber-500 hover:from-red-700 hover:to-amber-600 text-white font-black text-xs shadow-md hover:shadow-glow-amber transition-all active:scale-95"
                      >
                        <Plus className="w-4 h-4" />
                        <span>{t.menu.addToCart}</span>
                      </button>
                    </div>
                  </div>

                </div>

              </div>
            ))}
          </div>
        )}

      </div>

      {/* Item Customization Modal */}
      {selectedProductForCustomization && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-100 dark:border-slate-800 relative">
            
            <button
              onClick={() => setSelectedProductForCustomization(null)}
              className="absolute top-4 right-4 p-2 rounded-xl text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <img
                src={selectedProductForCustomization.image}
                alt=""
                className="w-16 h-16 rounded-2xl object-cover shrink-0"
                onError={(e) => handleImageError(e, selectedProductForCustomization.category)}
              />
              <div>
                <h4 className="text-base font-black text-slate-900 dark:text-white font-display">
                  {selectedProductForCustomization.name[lang] || selectedProductForCustomization.name.uz}
                </h4>
                <p className="text-xs text-amber-500 font-bold">
                  {selectedProductForCustomization.price.toLocaleString()} {t.menu.currency}
                </p>
              </div>
            </div>

            <div className="mb-4">
              <span className="text-xs uppercase font-bold text-slate-400">
                {t.menu.customOptions}:
              </span>
              <div className="mt-2 space-y-2">
                {availableOptions.map((opt) => {
                  const isChecked = customAddons.some(a => a.id === opt.id);
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => toggleAddon(opt)}
                      className={`w-full flex items-center justify-between p-3 rounded-2xl border text-xs font-semibold transition-all ${
                        isChecked
                          ? 'border-amber-500 bg-amber-50 dark:bg-amber-950/30 text-amber-800 dark:text-amber-300'
                          : 'border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <div className={`w-4 h-4 rounded-md flex items-center justify-center border ${isChecked ? 'bg-amber-500 border-amber-500 text-slate-900' : 'border-slate-400'}`}>
                          {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                        </div>
                        <span>{opt.name}</span>
                      </div>
                      <span className="font-bold text-slate-900 dark:text-white">
                        +{opt.price.toLocaleString()} {t.menu.currency}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase text-slate-400 font-bold block">Jami</span>
                <span className="text-lg font-black text-slate-900 dark:text-white">
                  {(
                    selectedProductForCustomization.price +
                    customAddons.reduce((s, a) => s + a.price, 0)
                  ).toLocaleString()} {t.menu.currency}
                </span>
              </div>

              <button
                type="button"
                onClick={handleConfirmCustomAdd}
                className="px-6 py-3 rounded-2xl bg-gradient-to-r from-red-600 to-amber-500 hover:from-red-700 hover:to-amber-600 text-white font-black text-sm shadow-md"
              >
                {t.menu.addToCart}
              </button>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};
