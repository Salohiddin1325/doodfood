import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Tag, Copy, Check, Sparkles, Flame, Gift, Clock } from 'lucide-react';

export const SpecialOffers = () => {
  const { t, lang, showToast } = useApp();
  const [copiedCode, setCopiedCode] = useState(null);

  const copyToClipboard = (code) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    showToast(`${code} ${t.offers.copied}`);
    setTimeout(() => {
      setCopiedCode(null);
    }, 2500);
  };

  const deals = [
    {
      code: "DOOD20",
      badge: "-20% OFF",
      title: lang === 'uz' ? "Ilk Buyurtmaga Maxsus 20%" : lang === 'ru' ? "Скидка 20% на первый заказ" : "20% Off Your First Order",
      desc: lang === 'uz' ? "Dood Food ta'mini birinchi marta tatib ko'rayotganlar uchun barcha taomlarga 20% chegirma!" : lang === 'ru' ? "Для тех, кто пробует Dood Food впервые — скидка 20% на весь чек по промокоду!" : "Welcome gift: 20% discount on all menu items for your first delicious order!",
      bgGrad: "from-red-500/20 via-amber-500/10 to-transparent",
      borderColor: "border-red-500/30",
      icon: Flame,
    },
    {
      code: "DOODSTUDENT",
      badge: "-15% COMBO",
      title: t.offers.deal1Title,
      desc: t.offers.deal1Desc,
      bgGrad: "from-amber-500/20 via-yellow-500/10 to-transparent",
      borderColor: "border-amber-500/30",
      icon: Gift,
    },
    {
      code: "BEKTEMIR",
      badge: "BEKTEMIR VIP",
      title: t.offers.deal2Title,
      desc: t.offers.deal2Desc,
      bgGrad: "from-orange-500/20 via-red-500/10 to-transparent",
      borderColor: "border-orange-500/30",
      icon: Clock,
    }
  ];

  return (
    <section id="offers" className="py-12 sm:py-16 bg-slate-50/50 dark:bg-slate-900/40 border-y border-slate-100 dark:border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-red-100 dark:bg-red-950/50 text-red-600 dark:text-red-400 text-xs font-black tracking-wider uppercase mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t.offers.title}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight font-display">
            {t.offers.title}
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-600 dark:text-slate-400">
            {t.offers.subtitle}
          </p>
        </div>

        {/* Promo Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {deals.map((deal) => {
            const Icon = deal.icon;
            const isCopied = copiedCode === deal.code;

            return (
              <div
                key={deal.code}
                className={`relative rounded-3xl p-6 bg-white dark:bg-slate-800/90 shadow-soft-card border ${deal.borderColor} flex flex-col justify-between overflow-hidden group hover:shadow-xl transition-all duration-300`}
              >
                {/* Decorative background glow */}
                <div className={`absolute top-0 right-0 w-36 h-36 bg-gradient-to-br ${deal.bgGrad} rounded-full blur-2xl -z-0`} />

                <div>
                  {/* Top Badge & Icon */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-3 py-1 rounded-full text-xs font-black bg-gradient-to-r from-red-600 to-amber-500 text-white shadow-sm">
                      {deal.badge}
                    </span>
                    <div className="p-2.5 rounded-2xl bg-amber-500/10 text-amber-500">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-xl font-black text-slate-900 dark:text-white mb-2 font-display">
                    {deal.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
                    {deal.desc}
                  </p>
                </div>

                {/* Promo Code Box with Copy Button */}
                <div className="pt-3 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-between gap-2">
                  <div className="flex flex-col">
                    <span className="text-[10px] uppercase font-bold text-slate-400">
                      {t.offers.promoCode}
                    </span>
                    <span className="font-mono font-black text-base text-amber-600 dark:text-amber-400 tracking-wider">
                      {deal.code}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => copyToClipboard(deal.code)}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-slate-700 hover:bg-amber-500 hover:text-slate-900 text-slate-700 dark:text-slate-200 text-xs font-bold transition-all active:scale-95 shadow-sm"
                  >
                    {isCopied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                        <span className="text-emerald-600 dark:text-emerald-400">{t.offers.copied}</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>{t.offers.copyCode}</span>
                      </>
                    )}
                  </button>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
