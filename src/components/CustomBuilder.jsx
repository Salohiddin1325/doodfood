import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { builderIngredients } from '../data/builderData';
import { 
  ChefHat, 
  RotateCcw, 
  Check, 
  ShoppingBag 
} from 'lucide-react';

export const CustomBuilder = () => {
  const { lang, t, addToCart } = useApp();

  const [builderType, setBuilderType] = useState('burger'); // 'burger' | 'hamburger' | 'lavash' | 'doner' | 'clubSandwich'

  // Selected components
  const [selectedBase, setSelectedBase] = useState(() => 
    builderIngredients.bases.find(b => b.type === 'burger')
  );
  const [selectedMeat, setSelectedMeat] = useState(builderIngredients.meats[0]);
  const [selectedCheese, setSelectedCheese] = useState(builderIngredients.cheeses[0]);
  const [selectedVeggies, setSelectedVeggies] = useState([
    builderIngredients.veggies[0], // pickles
    builderIngredients.veggies[1], // jalapeno
    builderIngredients.veggies[3], // tomato
  ]);
  const [selectedSauce, setSelectedSauce] = useState(builderIngredients.sauces[0]);

  // Handle builder type switch
  const handleTypeSwitch = (type) => {
    setBuilderType(type);
    const newBase = builderIngredients.bases.find(b => b.type === type);
    if (newBase) setSelectedBase(newBase);

    if (type === 'lavash' || type === 'doner') {
      setSelectedMeat(builderIngredients.meats.find(m => m.id === 'shawarma-beef') || builderIngredients.meats[0]);
    } else if (type === 'clubSandwich') {
      setSelectedMeat(builderIngredients.meats.find(m => m.id === 'crispy-chicken') || builderIngredients.meats[0]);
    } else if (type === 'hamburger') {
      setSelectedMeat(builderIngredients.meats.find(m => m.id === 'beef-patty-150g') || builderIngredients.meats[0]);
    } else {
      setSelectedMeat(builderIngredients.meats.find(m => m.id === 'double-beef-patty') || builderIngredients.meats[0]);
    }
  };

  const toggleVeggie = (veggie) => {
    if (selectedVeggies.some(v => v.id === veggie.id)) {
      setSelectedVeggies(selectedVeggies.filter(v => v.id !== veggie.id));
    } else {
      setSelectedVeggies([...selectedVeggies, veggie]);
    }
  };

  const handleReset = () => {
    handleTypeSwitch(builderType);
    setSelectedCheese(builderIngredients.cheeses[0]);
    setSelectedVeggies([builderIngredients.veggies[0], builderIngredients.veggies[1]]);
    setSelectedSauce(builderIngredients.sauces[0]);
  };

  // Calculations
  const totalPrice = 
    (selectedBase?.price || 0) +
    (selectedMeat?.price || 0) +
    (selectedCheese?.price || 0) +
    selectedVeggies.reduce((sum, v) => sum + v.price, 0) +
    (selectedSauce?.price || 0);

  const totalCalories = 
    (selectedBase?.calories || 0) +
    (selectedMeat?.calories || 0) +
    (selectedCheese?.calories || 0) +
    selectedVeggies.reduce((sum, v) => sum + v.calories, 0) +
    (selectedSauce?.calories || 0);

  const handleAddCustomToCart = () => {
    const titles = {
      burger: { uz: "Maxsus Mualliflik Burgeri", ru: "Авторский Крафт-Бургер", en: "Custom Gourmet Burger" },
      hamburger: { uz: "Maxsus Mualliflik Gamburgeri", ru: "Авторский Крафт-Гамбургер", en: "Custom Gourmet Hamburger" },
      lavash: { uz: "Maxsus Mualliflik Lavashi", ru: "Авторский Крафт-Лаваш", en: "Custom Gourmet Lavash" },
      doner: { uz: "Maxsus Turkcha Doner", ru: "Авторский Турецкий Донер", en: "Custom Turkish Doner" },
      clubSandwich: { uz: "Maxsus Dood Club Sandwich", ru: "Авторский Клаб Сэндвич", en: "Custom Club Sandwich" },
    };

    const images = {
      burger: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80",
      hamburger: "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=800&q=80",
      lavash: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?auto=format&fit=crop&w=800&q=80",
      doner: "https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=800&q=80",
      clubSandwich: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=800&q=80",
    };

    const customItem = {
      id: `custom-${builderType}-${Date.now()}`,
      name: titles[builderType] || titles.burger,
      image: images[builderType] || images.burger,
      price: totalPrice,
      customNote: [
        selectedBase?.name[lang] || selectedBase?.name.uz,
        selectedMeat?.name[lang] || selectedMeat?.name.uz,
        selectedCheese?.name[lang] || selectedCheese?.name.uz,
        ...selectedVeggies.map(v => v.name[lang] || v.name.uz),
        selectedSauce?.name[lang] || selectedSauce?.name.uz,
      ].filter(Boolean).join(' • ')
    };

    const details = [
      selectedBase,
      selectedMeat,
      selectedCheese,
      ...selectedVeggies,
      selectedSauce,
    ].filter(Boolean);

    addToCart(customItem, details, totalPrice, customItem.name);
  };

  return (
    <section id="builder" className="py-16 sm:py-24 bg-gradient-to-b from-transparent via-amber-500/5 to-transparent relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-red-100 dark:bg-red-950/60 text-red-600 dark:text-red-400 text-xs font-black tracking-wider uppercase mb-3">
            <ChefHat className="w-3.5 h-3.5" />
            <span>{t.builder.badge}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight font-display">
            {t.builder.title}
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-400">
            {t.builder.subtitle}
          </p>

          {/* Builder Type Toggle (5 Base Food Items) */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2 p-2 rounded-2xl bg-slate-200/80 dark:bg-slate-800/80 shadow-inner">
            {[
              { id: 'burger', icon: '🍔', label: t.builder.typeBurger },
              { id: 'hamburger', icon: '🍔', label: t.builder.typeHamburger },
              { id: 'lavash', icon: '🌯', label: t.builder.typeLavash },
              { id: 'doner', icon: '🥙', label: t.builder.typeDoner },
              { id: 'clubSandwich', icon: '🥪', label: t.builder.typeClubSandwich },
            ].map(type => (
              <button
                key={type.id}
                type="button"
                onClick={() => handleTypeSwitch(type.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-black transition-all ${
                  builderType === type.id
                    ? 'bg-amber-500 text-slate-950 shadow-md scale-105'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <span>{type.icon}</span>
                <span>{type.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Builder Interactive Workspace */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Visual Food Stack Preview & Live Stats */}
          <div className="lg:col-span-5 sticky top-24">
            <div className="bg-white dark:bg-slate-800/95 rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-100 dark:border-slate-700/80 flex flex-col justify-between">
              
              {/* Header with live counters */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-700/60">
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">
                    {t.builder.currentPrice}
                  </span>
                  <span className="text-2xl sm:text-3xl font-black text-amber-500 font-display">
                    {totalPrice.toLocaleString()} <span className="text-xs font-semibold text-slate-400">{t.menu.currency}</span>
                  </span>
                </div>

                <div className="text-right">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">
                    {t.builder.currentCalories}
                  </span>
                  <span className="text-lg font-black text-slate-700 dark:text-slate-200">
                    🔥 {totalCalories} kcal
                  </span>
                </div>
              </div>

              {/* Dynamic Visual Burger / Lavash Stacker */}
              <div className="my-8 py-6 px-4 bg-slate-50 dark:bg-slate-900/60 rounded-2xl flex flex-col items-center justify-center min-h-[300px] relative overflow-hidden">
                
                {/* Floating steam or sparkles */}
                <div className="absolute top-2 left-1/2 -translate-x-1/2 flex gap-2 opacity-60">
                  <span className="text-xs animate-bounce delay-100">♨️</span>
                  <span className="text-xs animate-bounce delay-300">♨️</span>
                  <span className="text-xs animate-bounce delay-500">♨️</span>
                </div>

                {/* Burger / Lavash Visual Layers */}
                <div className="w-full max-w-[240px] flex flex-col items-center gap-1.5 transition-all duration-300">
                  
                  {/* Top Bun / Wrap / Bread Slice */}
                  {builderType === 'burger' && (
                    <div className="w-48 h-14 bg-gradient-to-b from-amber-400 to-amber-600 rounded-t-full shadow-md relative flex items-center justify-center text-[10px] font-bold text-amber-950 border-b-2 border-amber-700">
                      <span className="opacity-70">✦ ✦ ✦ (Briosh)</span>
                    </div>
                  )}
                  {builderType === 'hamburger' && (
                    <div className="w-48 h-12 bg-gradient-to-b from-amber-300 to-amber-500 rounded-t-full shadow-md relative flex items-center justify-center text-[10px] font-bold text-amber-950 border-b-2 border-amber-600">
                      <span className="opacity-80">••• Kunjutli Bulochka •••</span>
                    </div>
                  )}
                  {builderType === 'lavash' && (
                    <div className="w-52 h-9 bg-gradient-to-r from-amber-200 via-amber-100 to-amber-200 rounded-2xl shadow-sm border border-amber-300/80 flex items-center justify-center text-[10px] font-bold text-amber-900">
                      🌯 Yupqa Lavash Grilda
                    </div>
                  )}
                  {builderType === 'doner' && (
                    <div className="w-52 h-11 bg-gradient-to-b from-amber-300 via-amber-400 to-amber-500 rounded-t-3xl shadow-sm border-b-2 border-amber-600 flex items-center justify-center text-[10px] font-bold text-amber-950">
                      🥙 Turkcha Tombik Non
                    </div>
                  )}
                  {builderType === 'clubSandwich' && (
                    <div className="w-48 h-8 bg-gradient-to-r from-amber-100 via-amber-200 to-amber-300 rounded-lg shadow-sm border-2 border-amber-400/80 flex items-center justify-center text-[10px] font-bold text-amber-950">
                      🥪 Qovurilgan Tost Noni
                    </div>
                  )}

                  {/* Sauce Layer */}
                  {selectedSauce && (
                    <div 
                      className="w-44 h-2.5 rounded-full shadow-sm animate-pulse"
                      style={{ backgroundColor: selectedSauce.color }}
                      title={selectedSauce.name[lang] || selectedSauce.name.uz}
                    />
                  )}

                  {/* Veggies & Top-ins Layers */}
                  {selectedVeggies.map((veg) => (
                    <div
                      key={veg.id}
                      className="w-46 h-3 rounded-full flex items-center justify-center text-[9px] font-bold text-white shadow-sm transition-all"
                      style={{ backgroundColor: veg.color }}
                    >
                      {veg.name[lang] || veg.name.uz}
                    </div>
                  ))}

                  {/* Cheese Layer */}
                  {selectedCheese && selectedCheese.price > 0 && (
                    <div 
                      className="w-48 h-3.5 rounded-md shadow-sm transform -rotate-1 flex items-center justify-center text-[9px] font-extrabold text-amber-950"
                      style={{ backgroundColor: selectedCheese.color }}
                    >
                      🧀 {selectedCheese.name[lang] || selectedCheese.name.uz}
                    </div>
                  )}

                  {/* Meat Patty / Doner / Chicken */}
                  {selectedMeat && (
                    <div 
                      className="w-48 h-7 rounded-2xl shadow-md border-t border-amber-900/40 flex items-center justify-center text-[10px] font-black text-amber-100"
                      style={{ backgroundColor: selectedMeat.color }}
                    >
                      🥩 {selectedMeat.name[lang] || selectedMeat.name.uz}
                    </div>
                  )}

                  {/* Bottom Bun / Wrap / Bread Slice */}
                  {builderType === 'burger' && (
                    <div className="w-46 h-8 bg-gradient-to-t from-amber-600 to-amber-500 rounded-b-2xl shadow-md border-t-2 border-amber-700" />
                  )}
                  {builderType === 'hamburger' && (
                    <div className="w-46 h-7 bg-gradient-to-t from-amber-500 to-amber-400 rounded-b-xl shadow-md border-t-2 border-amber-600" />
                  )}
                  {builderType === 'lavash' && (
                    <div className="w-52 h-6 bg-gradient-to-r from-amber-200 via-amber-100 to-amber-200 rounded-xl shadow-sm border border-amber-300/80" />
                  )}
                  {builderType === 'doner' && (
                    <div className="w-52 h-7 bg-gradient-to-t from-amber-500 via-amber-400 to-amber-300 rounded-b-2xl shadow-sm border-t-2 border-amber-600" />
                  )}
                  {builderType === 'clubSandwich' && (
                    <div className="w-48 h-8 bg-gradient-to-r from-amber-100 via-amber-200 to-amber-300 rounded-lg shadow-sm border-2 border-amber-400/80" />
                  )}

                </div>
              </div>

              {/* Recipe Summary */}
              <div className="space-y-1.5 mb-6 text-xs text-slate-500 dark:text-slate-400">
                <div className="font-bold text-slate-700 dark:text-slate-300 text-xs mb-1">
                  {t.builder.previewTitle}
                </div>
                <div className="flex flex-wrap gap-1.5">
                  <span className="px-2 py-0.5 rounded-md bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 font-medium">
                    {selectedBase?.name[lang] || selectedBase?.name.uz}
                  </span>
                  <span className="px-2 py-0.5 rounded-md bg-red-100 dark:bg-red-950/60 text-red-800 dark:text-red-300 font-medium">
                    {selectedMeat?.name[lang] || selectedMeat?.name.uz}
                  </span>
                  {selectedCheese && selectedCheese.price > 0 && (
                    <span className="px-2 py-0.5 rounded-md bg-yellow-100 dark:bg-yellow-950/60 text-yellow-800 dark:text-yellow-300 font-medium">
                      {selectedCheese.name[lang] || selectedCheese.name.uz}
                    </span>
                  )}
                  {selectedVeggies.map(v => (
                    <span key={v.id} className="px-2 py-0.5 rounded-md bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 font-medium">
                      {v.name[lang] || v.name.uz}
                    </span>
                  ))}
                  <span className="px-2 py-0.5 rounded-md bg-orange-100 dark:bg-orange-950/60 text-orange-800 dark:text-orange-300 font-medium">
                    {selectedSauce?.name[lang] || selectedSauce?.name.uz}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={handleReset}
                  className="p-3.5 rounded-2xl bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
                  title={t.builder.reset}
                >
                  <RotateCcw className="w-5 h-5" />
                </button>

                <button
                  type="button"
                  onClick={handleAddCustomToCart}
                  className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-4 rounded-2xl bg-gradient-to-r from-red-600 via-amber-500 to-amber-600 hover:from-red-700 hover:to-amber-700 text-white font-black text-sm shadow-lg hover:shadow-glow-amber transition-all active:scale-95"
                >
                  <ShoppingBag className="w-5 h-5" />
                  <span>{t.builder.addToCartBtn}</span>
                </button>
              </div>

            </div>
          </div>

          {/* Right Column: Step-by-Step Ingredient Selectors */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Step 1: Base */}
            <div className="bg-white dark:bg-slate-800/90 rounded-3xl p-6 shadow-soft-card border border-slate-100 dark:border-slate-700/60">
              <h3 className="text-base font-black text-slate-900 dark:text-white mb-4 flex items-center gap-2 font-display">
                <span className="w-6 h-6 rounded-lg bg-amber-500/20 text-amber-500 text-xs flex items-center justify-center">1</span>
                <span>{t.builder.stepBase}</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {builderIngredients.bases
                  .filter(b => b.type === builderType)
                  .map((base) => {
                    const isSelected = selectedBase?.id === base.id;
                    return (
                      <button
                        key={base.id}
                        type="button"
                        onClick={() => setSelectedBase(base)}
                        className={`p-3.5 rounded-2xl border text-left flex items-center justify-between transition-all ${
                          isSelected
                            ? 'border-amber-500 bg-amber-50 dark:bg-amber-950/40 text-slate-900 dark:text-white shadow-sm'
                            : 'border-slate-200 dark:border-slate-700/60 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/40'
                        }`}
                      >
                        <div>
                          <div className="text-xs font-bold">{base.name[lang] || base.name.uz}</div>
                          <div className="text-[10px] text-slate-400">{base.calories} kcal</div>
                        </div>
                        <span className="text-xs font-black text-amber-500">
                          {base.price.toLocaleString()} {t.menu.currency}
                        </span>
                      </button>
                    );
                  })}
              </div>
            </div>

            {/* Step 2: Meat */}
            <div className="bg-white dark:bg-slate-800/90 rounded-3xl p-6 shadow-soft-card border border-slate-100 dark:border-slate-700/60">
              <h3 className="text-base font-black text-slate-900 dark:text-white mb-4 flex items-center gap-2 font-display">
                <span className="w-6 h-6 rounded-lg bg-red-500/20 text-red-500 text-xs flex items-center justify-center">2</span>
                <span>{t.builder.stepMeat}</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {builderIngredients.meats.map((meat) => {
                  const isSelected = selectedMeat?.id === meat.id;
                  return (
                    <button
                      key={meat.id}
                      type="button"
                      onClick={() => setSelectedMeat(meat)}
                      className={`p-3.5 rounded-2xl border text-left flex items-center justify-between transition-all ${
                        isSelected
                          ? 'border-red-500 bg-red-50 dark:bg-red-950/40 text-slate-900 dark:text-white shadow-sm'
                          : 'border-slate-200 dark:border-slate-700/60 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/40'
                      }`}
                    >
                      <div>
                        <div className="text-xs font-bold">{meat.name[lang] || meat.name.uz}</div>
                        <div className="text-[10px] text-slate-400">{meat.calories} kcal</div>
                      </div>
                      <span className="text-xs font-black text-red-500">
                        {meat.price.toLocaleString()} {t.menu.currency}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 3: Cheese */}
            <div className="bg-white dark:bg-slate-800/90 rounded-3xl p-6 shadow-soft-card border border-slate-100 dark:border-slate-700/60">
              <h3 className="text-base font-black text-slate-900 dark:text-white mb-4 flex items-center gap-2 font-display">
                <span className="w-6 h-6 rounded-lg bg-yellow-500/20 text-yellow-500 text-xs flex items-center justify-center">3</span>
                <span>{t.builder.stepCheese}</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {builderIngredients.cheeses.map((cheese) => {
                  const isSelected = selectedCheese?.id === cheese.id;
                  return (
                    <button
                      key={cheese.id}
                      type="button"
                      onClick={() => setSelectedCheese(cheese)}
                      className={`p-3.5 rounded-2xl border text-left flex items-center justify-between transition-all ${
                        isSelected
                          ? 'border-yellow-500 bg-yellow-50 dark:bg-yellow-950/40 text-slate-900 dark:text-white shadow-sm'
                          : 'border-slate-200 dark:border-slate-700/60 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/40'
                      }`}
                    >
                      <div>
                        <div className="text-xs font-bold">{cheese.name[lang] || cheese.name.uz}</div>
                        <div className="text-[10px] text-slate-400">{cheese.calories} kcal</div>
                      </div>
                      <span className="text-xs font-black text-yellow-600 dark:text-yellow-400">
                        {cheese.price === 0 ? "0" : `+${cheese.price.toLocaleString()}`} {t.menu.currency}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 4: Veggies & Extras (Multi-select) */}
            <div className="bg-white dark:bg-slate-800/90 rounded-3xl p-6 shadow-soft-card border border-slate-100 dark:border-slate-700/60">
              <h3 className="text-base font-black text-slate-900 dark:text-white mb-4 flex items-center gap-2 font-display">
                <span className="w-6 h-6 rounded-lg bg-emerald-500/20 text-emerald-500 text-xs flex items-center justify-center">4</span>
                <span>{t.builder.stepVeggies}</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {builderIngredients.veggies.map((veg) => {
                  const isChecked = selectedVeggies.some(v => v.id === veg.id);
                  return (
                    <button
                      key={veg.id}
                      type="button"
                      onClick={() => toggleVeggie(veg)}
                      className={`p-3.5 rounded-2xl border text-left flex items-center justify-between transition-all ${
                        isChecked
                          ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-slate-900 dark:text-white shadow-sm'
                          : 'border-slate-200 dark:border-slate-700/60 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/40'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <div className={`w-4 h-4 rounded-md flex items-center justify-center border ${isChecked ? 'bg-emerald-500 border-emerald-500 text-white' : 'border-slate-400'}`}>
                          {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                        </div>
                        <div>
                          <div className="text-xs font-bold">{veg.name[lang] || veg.name.uz}</div>
                          <div className="text-[10px] text-slate-400">{veg.calories} kcal</div>
                        </div>
                      </div>
                      <span className="text-xs font-black text-emerald-600 dark:text-emerald-400">
                        +{veg.price.toLocaleString()} {t.menu.currency}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 5: Sauces */}
            <div className="bg-white dark:bg-slate-800/90 rounded-3xl p-6 shadow-soft-card border border-slate-100 dark:border-slate-700/60">
              <h3 className="text-base font-black text-slate-900 dark:text-white mb-4 flex items-center gap-2 font-display">
                <span className="w-6 h-6 rounded-lg bg-orange-500/20 text-orange-500 text-xs flex items-center justify-center">5</span>
                <span>{t.builder.stepSauces}</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {builderIngredients.sauces.map((sauce) => {
                  const isSelected = selectedSauce?.id === sauce.id;
                  return (
                    <button
                      key={sauce.id}
                      type="button"
                      onClick={() => setSelectedSauce(sauce)}
                      className={`p-3.5 rounded-2xl border text-left flex items-center justify-between transition-all ${
                        isSelected
                          ? 'border-orange-500 bg-orange-50 dark:bg-orange-950/40 text-slate-900 dark:text-white shadow-sm'
                          : 'border-slate-200 dark:border-slate-700/60 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/40'
                      }`}
                    >
                      <div>
                        <div className="text-xs font-bold">{sauce.name[lang] || sauce.name.uz}</div>
                        <div className="text-[10px] text-slate-400">{sauce.calories} kcal</div>
                      </div>
                      <span className="text-xs font-black text-orange-500">
                        +{sauce.price.toLocaleString()} {t.menu.currency}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
