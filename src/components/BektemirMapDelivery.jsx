import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  MapPin, 
  Clock, 
  Phone, 
  Send, 
  Navigation, 
  Zap, 
  ShieldCheck, 
  ChevronRight, 
  Bike, 
  Sparkles 
} from 'lucide-react';

export const BektemirMapDelivery = () => {
  const { 
    lang, 
    t, 
    deliveryZone, 
    setDeliveryZone, 
    zonePricing, 
    currentZoneData 
  } = useApp();

  const zonesList = [
    { key: 'rohat', label: t.delivery.zoneRohat, distance: '1.2 km' },
    { key: 'center', label: t.delivery.zoneCenter, distance: '2.5 km' },
    { key: 'vodnik', label: t.delivery.zoneVodnik, distance: '4.1 km' },
    { key: 'binokor', label: t.delivery.zoneBinokor, distance: '5.8 km' },
    { key: 'majnuntol', label: t.delivery.zoneMajnuntol, distance: '3.4 km' },
    { key: 'qoyliq', label: t.delivery.zoneQoyliq, distance: '2.8 km' },
  ];

  return (
    <section id="delivery" className="py-16 sm:py-24 bg-slate-50/60 dark:bg-slate-900/40 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400 text-xs font-black tracking-wider uppercase mb-3">
            <MapPin className="w-3.5 h-3.5" />
            <span>{t.delivery.badge}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight font-display">
            {t.delivery.title}
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-400">
            {t.delivery.subtitle}
          </p>
        </div>

        {/* Grid: Zone Calculator + Interactive District Map + Info Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: Interactive Bektemir Zone Calculator */}
          <div className="lg:col-span-5 bg-white dark:bg-slate-800/90 rounded-3xl p-6 sm:p-8 shadow-soft-card border border-slate-100 dark:border-slate-700/60 flex flex-col justify-between">
            
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Bike className="w-5 h-5 text-amber-500" />
                <h3 className="text-lg font-black text-slate-900 dark:text-white font-display">
                  {t.delivery.calcTitle}
                </h3>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">
                {t.delivery.selectZone}
              </p>

              {/* Sub-District Selection Radio Chips */}
              <div className="space-y-2.5">
                {zonesList.map((z) => {
                  const isSelected = deliveryZone === z.key;
                  const priceInfo = zonePricing[z.key];

                  return (
                    <button
                      key={z.key}
                      type="button"
                      onClick={() => setDeliveryZone(z.key)}
                      className={`w-full p-3.5 rounded-2xl border text-left flex items-center justify-between transition-all ${
                        isSelected
                          ? 'border-amber-500 bg-amber-500/10 dark:bg-amber-500/15 text-slate-900 dark:text-white ring-2 ring-amber-500/30'
                          : 'border-slate-200 dark:border-slate-700/60 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/40'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <span className={`w-3 h-3 rounded-full border-2 flex items-center justify-center ${isSelected ? 'border-amber-500 bg-amber-500' : 'border-slate-400'}`} />
                        <div>
                          <div className="text-xs font-bold">{z.label}</div>
                          <div className="text-[10px] text-slate-400">Masofa: ~{z.distance}</div>
                        </div>
                      </div>

                      <div className="text-right">
                        <span className="text-xs font-black text-amber-600 dark:text-amber-400 block">
                          {priceInfo.fee.toLocaleString()} {t.menu.currency}
                        </span>
                        <span className="text-[10px] text-slate-400 font-medium">
                          ⚡ {priceInfo.time} daqiqa
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Selected Zone Result Box */}
            <div className="mt-6 pt-5 border-t border-slate-100 dark:border-slate-700/60">
              <div className="bg-gradient-to-r from-amber-500/10 to-red-500/10 rounded-2xl p-4 border border-amber-500/20">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-slate-600 dark:text-slate-300">
                    {t.delivery.estTime}
                  </span>
                  <span className="text-sm font-black text-red-600 dark:text-red-400 flex items-center gap-1">
                    <Zap className="w-4 h-4 fill-current" />
                    {currentZoneData.time} daqiqa
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-600 dark:text-slate-300">
                    {t.delivery.estCost}
                  </span>
                  <span className="text-base font-black text-slate-900 dark:text-white">
                    {currentZoneData.fee.toLocaleString()} {t.menu.currency}
                  </span>
                </div>

                <div className="mt-3 pt-2 border-t border-amber-500/20 text-[11px] font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{t.delivery.freeAbove}</span>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Stylized Bektemir Map Illustration & Action Pins */}
          <div className="lg:col-span-7 flex flex-col justify-between gap-6">
            
            {/* Interactive Vector Map Widget */}
            <div className="relative rounded-3xl overflow-hidden shadow-soft-card border border-slate-100 dark:border-slate-700/60 bg-slate-900 min-h-[340px] flex items-center justify-center p-6 group">
              
              {/* Stylized Dark Grid Map Background */}
              <div 
                className="absolute inset-0 opacity-25"
                style={{
                  backgroundImage: `radial-gradient(circle at 1px 1px, #f59e0b 1px, transparent 0)`,
                  backgroundSize: '28px 28px'
                }}
              />

              {/* Chirchiq River stylization wave line */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20" xmlns="http://www.w3.org/2000/svg">
                <path d="M-50,280 Q200,100 450,220 T950,140" fill="none" stroke="#0ea5e9" strokeWidth="18" strokeLinecap="round" />
                <path d="M-50,280 Q200,100 450,220 T950,140" fill="none" stroke="#38bdf8" strokeWidth="6" strokeLinecap="round" />
              </svg>

              {/* District Roads / Arterials */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-30" xmlns="http://www.w3.org/2000/svg">
                {/* Ohangaron highway */}
                <line x1="0" y1="20%" x2="100%" y2="80%" stroke="#e2e8f0" strokeWidth="4" strokeDasharray="6,6" />
                {/* Husayn Boyqaro st. */}
                <line x1="30%" y1="0%" x2="70%" y2="100%" stroke="#f59e0b" strokeWidth="5" />
              </svg>

              {/* Central Restaurant Pin (Rohat Hub) */}
              <div className="relative z-10 flex flex-col items-center animate-bounce-subtle">
                <div className="relative flex items-center justify-center">
                  {/* Radar pulse circles */}
                  <span className="animate-ping absolute inline-flex h-20 w-20 rounded-full bg-amber-500 opacity-40"></span>
                  <span className="animate-ping delay-300 absolute inline-flex h-32 w-32 rounded-full bg-red-500 opacity-20"></span>
                  
                  {/* Central Pin Icon */}
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-red-600 to-amber-500 flex items-center justify-center text-white shadow-2xl border-2 border-white">
                    <span className="text-2xl">🍔</span>
                  </div>
                </div>

                {/* Pin Label Card */}
                <div className="mt-3 bg-slate-900/90 backdrop-blur-md px-4 py-2 rounded-xl border border-amber-500/50 shadow-xl text-center">
                  <div className="text-xs font-black text-white font-display flex items-center justify-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                    <span>DOOD FOOD BEKTEMIR</span>
                  </div>
                  <div className="text-[10px] text-amber-400 font-semibold">
                    Husayn Boyqaro 42 (Rohat)
                  </div>
                </div>
              </div>

              {/* Surrounding Neighborhood Indicators */}
              <div className="absolute top-6 left-6 z-10 bg-slate-800/80 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-slate-700 text-[10px] font-bold text-slate-300">
                📍 Vodnik dahasi
              </div>
              <div className="absolute top-6 right-6 z-10 bg-slate-800/80 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-slate-700 text-[10px] font-bold text-slate-300">
                📍 Binokor qo'rg'oni
              </div>
              <div className="absolute bottom-6 left-6 z-10 bg-slate-800/80 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-slate-700 text-[10px] font-bold text-slate-300">
                📍 Qo'yliq chegarasi
              </div>
              <div className="absolute bottom-6 right-6 z-10 bg-slate-800/80 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-slate-700 text-[10px] font-bold text-slate-300">
                📍 Bektemir Hokimiyati
              </div>

              {/* Bottom Map Open CTA */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20">
                <a
                  href="https://yandex.uz/maps"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-black shadow-lg transition-transform hover:scale-105 active:scale-95"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>{t.delivery.openMaps}</span>
                </a>
              </div>

            </div>

            {/* Quick Contact & Working Hours Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* Working Hours */}
              <div className="bg-white dark:bg-slate-800/90 rounded-2xl p-4 shadow-sm border border-slate-100 dark:border-slate-700/60 flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Ish vaqti</div>
                  <div className="text-sm font-black text-slate-900 dark:text-white">24/7 Yetkazish</div>
                  <div className="text-[11px] text-slate-500">Zal: 10:00 - 03:00</div>
                </div>
              </div>

              {/* Telegram Order Bot CTA */}
              <a
                href="https://t.me/doodfood_bot"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 rounded-2xl p-4 shadow-sm text-white flex items-center justify-between group transition-all"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
                    <Send className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="text-xs font-medium text-sky-100">{t.delivery.orderTelegram}</div>
                    <div className="text-sm font-black font-display">@doodfood_bot</div>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
